<!-- 预警明细查询（按规则） -->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <vxe-modal
      v-model="showInfo"
      title="查看详情"
      width="80%"
      height="646px"
      :show-footer="true"
      @close="dialogClose"
    >
      <div v-loading="tableLoading" style="height: 100%">
        <BsMainFormListLayout>
          <template v-slot:topTap></template>
          <template v-slot:topTabPane>
            <BsTabPanel
              ref="tabPanel"
              show-zero
              :tab-status-btn-config="toolBarStatusBtnConfig"
              :tab-status-num-config="tabStatusNumConfig"
              @onQueryConditionsClick="onQueryConditionsClick"
            />
          </template>
          <template v-slot:query>
            <div v-show="isShowQueryConditions" class="main-query">
              <BsQuery
                ref="queryFrom"
                :query-form-item-config="queryConfig"
                :query-form-data="searchDataList"
                @onSearchClick="search"
              />
            </div>
          </template>
          <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
          <!-- <template v-slot:mainTree>
            <BsTreeSet
              ref="treeSet"
              v-model="leftTreeVisible"
              :tree-config="treeTypeConfig"
              @onChangeInput="changeInput"
              @onAsideChange="asideChange"
              @onConfrimData="treeSetConfrimData"
            />
            <BsBossTree
              ref="leftTree"
              open-loading
              :defaultexpandedkeys="['0']"
              style="overflow: hidden"
              :is-server="false"
              :ajax-type="treeAjaxType"
              :server-uri="treeServerUri"
              :datas="treeData"
              :queryparams="treeQueryparams"
              :global-config="treeGlobalConfig"
              :clickmethod="onClickmethod"
            />
          </template> -->
          <template v-slot:mainForm>
            <BsTable
              ref="mainTableRef"
              :footer-config="tableFooterConfig"
              :table-columns-config="tableColumnsConfig"
              :table-data="tableData"
              :table-config="tableConfig"
              :pager-config="mainPagerConfig"
              :toolbar-config="tableToolbarConfig"
              @onToolbarBtnClick="onToolbarBtnClick"
              @ajaxData="ajaxTableData"
              @cellClick="cellClick"
            >
              <template v-slot:toolbarSlots>
                <div class="table-toolbar-left">
                  <div
                    v-if="leftTreeVisible === false"
                    class="table-toolbar-contro-leftvisible"
                    @click="leftTreeVisible = true"
                  >
                  </div>
                  <div class="table-toolbar-left-title">
                    <span class="fn-inline">违规数据明细</span>
                    <i class="fn-inline"></i>
                  </div>
                </div>
              </template>
            </BsTable>
          </template>
        </BsMainFormListLayout>
        <BsOperationLog
          :logs-data="logData"
          :show-log-view="showLogView"
        />
        <!-- <AddDialog
          v-if="showInfo"
          :title="dialogTitle"
        /> -->
        <!-- 附件弹框 -->
        <BsAttachment
          v-if="showAttachmentDialog"
          refs="attachmentboss"
          :user-info="userInfo"
          :billguid="billguid"
        />
      </div>
    </vxe-modal>
    <DetailDialog
      v-if="dialogVisible"
      :title="dialogTitle"
      :warning-code="warningCode"
      :fi-rule-code="fiRuleCode"
    />
    <HsDetailDialog
      v-if="dialogHsVisible"
      :title="dialogTitle"
      :warning-code="warningCode"
      :fi-rule-code="fiRuleCode"
    />
  </div>
</template>

<script>
import { proconf } from './WarningDetails'
import DetailDialog from '@/views/main/MointoringMatters/BudgetAccountingWarningDataMager/children/handleDialog.vue'
import HsDetailDialog from '@/views/main/MointoringMatters/BudgetAccountingWarningDataMager/children/hsHandleDialog.vue'
import HttpModule from '@/api/frame/main/Monitoring/WarningDetailsByRule.js'
export default {
  name: 'WarningDetails',
  components: {
    DetailDialog,
    HsDetailDialog
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  props: {
    id: {
      type: Number,
      default: 1
    },
    functionCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // BsQuery 查询栏
      dialogHsVisible: false,
      showInfo: true,
      warningCode: '',
      fiRuleCode: '',
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      radioShow: true,
      breakRuleVisible: false,
      treeData: [{
        children: [],
        code: 0,
        id: 0,
        label: '0-全部分类',
        name: '全部分类',
        parentId: null,
        parentRuleName: null,
        ruleLevel: 0,
        ruleName: '全部分类'
      }],
      treeTypeConfig: {
        curRadio: 'AGENCY'
      },
      treeGlobalConfig: {
        inputVal: ''
      },
      treeQueryparams: { },
      // treeServerUri: 'pay-clear-service/v2/lefttree',
      treeServerUri: 'large-monitor-platform/lmp/businessFunctions/tree',
      treeAjaxType: 'get',
      leftTreeVisible: true,
      // 头部工具栏 BsTabPanel config
      toolBarStatusBtnConfig: {
        changeBtns: true,
        buttons: proconf.toolBarStatusButtons,
        curButton: {
          type: 'button',
          iconName: 'base-all.png',
          iconNameActive: 'base-all-active.png',
          iconUrl: '',
          label: '全部',
          code: '1',
          curValue: '1'
        },
        buttonsInfo: proconf.statusRightToolBarButton,
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
        }
      },
      buttonsInfo: proconf.statusRightToolBarButtonByBusDept,
      tabStatusNumConfig: {
        '1': 2,
        '2': 0,
        '3': 0
      },
      isShowQueryConditions: true,
      toolBarStatusSelect: {
        type: 'button',
        iconName: 'base-all.png',
        iconNameActive: 'base-all-active.png',
        iconUrl: '',
        label: '全部',
        code: '1',
        curValue: '1'
      },
      // table 相关配置
      tableLoading: false,
      tableColumnsConfig: proconf.PoliciesTableColumns,
      tableData: [],
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        import: false, // 导入
        export: true, // 导出
        print: false, // 打印
        zoom: true, // 缩放
        custom: true, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      leftNode: {},
      regulationStatus: '1',
      mainPagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      tableConfig: {
        renderers: {
          // 编辑 附件 操作日志
          $payVoucherInputGloableOptionRow: proconf.gloableOptionRow
        },
        methods: {
          onOptionRowClick: this.onOptionRowClick
        }
      },
      tableFooterConfig: {
        showFooter: false
      },
      // 操作日志
      logData: [],
      showLogView: false,
      // 新增弹窗
      dialogVisible: false,
      dialogTitle: '新增',
      addTableData: [],
      // 请求 & 角色权限相关配置
      menuName: '系统级监控规则',
      params5: '',
      menuId: '',
      tokenid: '',
      userInfo: {},
      roleguid: this.$store.state.curNavModule.roleguid,
      appId: 'pay_voucher',
      isHaveZero: '0',
      // 文件
      showAttachmentDialog: false,
      billguid: '',
      condition: {},
      handleType: '',
      isEnable: '',
      regulationType: '',
      warningLevel: '',
      DetailData: {},
      regulationClass: '',
      firulename: '',
      fivouno: '',
      useoffunds: ''
    }
  },
  mounted() {
  },
  methods: {
    search(obj) {
      console.log(obj)
      this.warningLevel = obj.warningLevel
      this.regulationtype = obj.regulationType
      this.firulename = obj.firulename
      this.fivouno = obj.fivouno
      this.useoffunds = obj.useoffunds
      this.queryTableDatas()
      // this.queryTableDatasCount()
    },
    // 初始化高级查询data
    getSearchDataList() {
      // 下拉树
      let searchDataObj = {}
      this.queryConfig.forEach(item => {
        if (item.itemRender.name === '$formTreeInput' || item.itemRender.name === '$vxeTree') {
          if (item.field) {
            searchDataObj[item.field + 'code'] = ''
          }
        } else {
          if (item.field) {
            searchDataObj[item.field] = ''
          }
        }
      })
      this.searchDataList = searchDataObj
    },
    // 初始化高级查询参数condition
    getConditionList() {
      let condition = {}
      this.queryConfig.forEach(item => {
        if (item.itemRender.name === '$formTreeInput' || item.itemRender.name === '$vxeTree') {
          if (item.field) {
            if (item.field === 'cor_bgt_doc_no_') {
              condition[item.field + 'name'] = []
            } else {
              condition[item.field + 'code'] = []
            }
          }
        } else {
          if (item.field) {
            condition[item.field] = []
          }
        }
      })
      return condition
    },
    dialogClose() {
      this.$parent.warningDetailsByRuleView = false
    },
    // 切换状态栏
    onStatusTabClick(obj) {
      console.log(obj)
      if (!obj.type) {
        this.operationToolbarButtonClickEvent(obj)
        return
      }
      this.toolBarStatusSelect = obj
      switch (obj.code) {
        // 全部
        case 'check':

          break
      }
      this.regulationStatus = obj.curValue
      this.queryTableDatas()
    },
    deleteList() {
      let datas = this.$refs.mainTableRef.getSelectionData()
      if (datas.length === 0) {
        this.$message.warning('请选择数据')
        return
      }
      let arr = []
      datas.forEach(res => {
        arr.push(res.regulationCode)
      })
      HttpModule.delete(arr).then(res => {
        if (res.code === '000000') {
          this.$message.warning('删除成功')
          this.queryTableDatas()
          // this.queryTableDatasCount()
        }
      })
    },
    changeData(val) {
      HttpModule.getDetailData(val).then(res => {
        if (res.code === '000000') {
          this.DetailData = res.data
          this.showInfo = true
          this.dialogTitle = '修改'
        }
      })
    },
    getDetail(val) {
      HttpModule.getDetailData(val).then(res => {
        if (res.code === '000000') {
          this.DetailData = res.data
          this.showInfo = true
          this.dialogTitle = '查看详情'
        }
      })
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      console.log(obj.code)
      let datas3 = this.$refs.mainTableRef.getSelectionData()
      let regulationCodes = []

      switch (obj.code) {
        // 新增
        case 'add':
          this.onAddToolbarClickAdd(obj, context, e)
          break
        // 送审
        case 'approval':
          if (datas3.length === 0) {
            this.$message.warning('请选择数据')
            return
          }
          for (let i = 0; i < datas3.length; i++) {
            regulationCodes.push(datas3[i].regulationCode)
          }
          // this.auditByCheck(obj, context, e)// 经过监控的送审
          this.audieData({ operate: 1, regulationCodes: regulationCodes })
          break
        // 撤销
        case 'revoke':
          if (datas3.length === 0) {
            this.$message.warning('请选择数据')
            return
          }
          for (let i = 0; i < datas3.length; i++) {
            regulationCodes.push(datas3[i].regulationCode)
          }
          // this.auditByCheck(obj, context, e)// 经过监控的送审
          this.audieData({ operate: 3, regulationCodes: regulationCodes })
          break
        // 查看
        case 'check':

          if (datas3.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          // this.cancelCheck()
          let datas = this.$refs.mainTableRef.getSelectionData()
          if (datas.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          this.getDetail(datas[0].regulationCode)
          break
        // 修改
        case 'change':
          let datas2 = this.$refs.mainTableRef.getSelectionData()
          if (datas2.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          this.changeData(datas2[0].regulationCode)
          break
        // 删除
        case 'del':
          this.deleteList()
          break
        // 全量监控
        case 'monitor':
          // this.doDiscard(obj, context, e)
          break
        case 'detail':
          let selection = this.$refs.mainTableRef.getSelectionData()
          if (selection.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          this.selectData = selection[0]
          if (this.selectData.regulationClass === '07') {
            this.dialogHsVisible = true
          } else {
            this.dialogVisible = true
          }
          this.dialogTitle = '详细信息'
          this.warningCode = this.selectData.warningCode
          this.fiRuleCode = this.selectData.firulecode
          break
        default:
          break
      }
    },
    changeVisible(val) {
      console.log(val, '输出')
      this.breakRuleVisible = val
    },
    // table 右侧操作按钮
    onOptionRowClick({ row, optionType }, context) {
      // console.log(context.$parent.$parent.$parent)
      console.log(row.attachment_id)
      switch (optionType) {
        // 新增
        case 'add':
          this.clickAddBtn(row)
          break
        // 操作日志
        case 'report':
          this.queryActionLog(row)
          break
        // 附件
        case 'attachment':
          this.showAttachment(row)
          break
        default:
      }
    },
    onToolbarBtnClick({ context, table, code }) {
      switch (code) {
        // 刷新
        case 'refresh':
          this.refresh()
          break
      }
    },
    // 左侧树
    changeInput(val) {
      this.treeGlobalConfig.inputVal = val
    },
    onClickmethod(node) {
      // if (node.children !== null && node.children.length !== 0 && node.id !== '0') {
      //   return
      // }
      if (node.id !== '0') {
        let key =
          this.$refs.treeSet.treeConfigIn.curRadio.toLowerCase() + '_code'
        this.condition[key] = node.code
        this.regulationClass = node.id
      } else {
        this.condition = {}
      }
      this.queryTableDatas()
    },
    treeSetConfrimData(curTree) {
      this.treeQueryparams.elementCode = curTree.code
      this.$refs.leftTree.refreshTree()
    },
    asideChange() {
      this.leftTreeVisible = false
    },
    // 查看附件
    showAttachment(row) {
      this.billguid = row.attachment_id
      this.showAttachmentDialog = true
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property
      console.log(key, obj.row)
      switch (key) {
      }
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh() {
      this.queryTableDatas()
      // this.queryTableDatasCount()
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      this.queryTableDatas()
    },
    // 展开折叠查询框
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
    },
    // 新增或修改弹框
    clickAddBtn(row) {
      // if (this.addTableData.length > 0) {
      //   this.addTableData = []
      // }
      this.dialogTitle = '新增'
      // this.addTableData.push(row)
      this.showInfo = true
    },
    // 点击新增
    onAddToolbarClickAdd(obj, context, e) {
      // let row = []
      // row = this.$refs.mainTableRef.getSelectionData()[0]
      // if (this.$refs.mainTableRef.getSelectionData().length !== 1) {
      //   this.$message.warning('请选择一条数据')
      //   return
      // }
      // this.addTableData = this.$refs.mainTableRef.getSelectionData()
      this.showInfo = true
      // this.selectSumId = this.$refs.mainTableRef.getSelectionData()[0].sum_id
      this.dialogTitle = '新增'
    },
    queryTableDatasCount() {
      let that = this
      let regulationType = this.$store.state.curNavModule.f_FullName.substring(0, 3)
      if (regulationType === '系统级') {
        regulationType = '1'
      } else if (regulationType === '部门级') {
        regulationType = '3'
      } else if (regulationType === '财政级') {
        regulationType = '2'
      }
      const params = {
        menuType: 1,
        regulationType: regulationType,
        id: this.condition.agency_code
      }
      HttpModule.queryTableDatasCount(params).then(res => {
        console.log('res.code', res.code)
        that.tabStatusNumConfig['1'] = res.data.unHandle
        that.tabStatusNumConfig['2'] = res.data.handle
        that.tabStatusNumConfig['3'] = res.data.unHandle + res.data.handle
      })
    },
    // 查询 table 数据
    queryTableDatas() {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        warn_level: this.warningLevel, // 预警级别
        regulation_type: this.regulationtype,
        mofdivname: this.mofdivname,
        agencycode: this.agencycode,
        firulename: this.firulename,
        fivouno: this.fivouno,
        useoffunds: this.useoffunds,
        regulation_class: this.regulationClass,
        warnLogId: this.id
      }
      console.log('-----=====', this.id)
      this.tableLoading = true
      HttpModule.getViolationsDetailDataByLogId(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
          this.tabStatusNumConfig['1'] = res.data.totalCount
        } else {
          this.$message.error(res.result)
        }
      })
    },
    // 操作日志
    queryActionLog(row) {
      let data = {
        roleguid: this.$store.state.curNavModule.roleguid,
        data: {
          statusCode: this.toolBarStatusSelect.code,
          id: row.id,
          appId: 'pay_voucher'
        }
      }
      HttpModule.queryActionLog(data).then(res => {
        this.logData = res.data
        console.log(this.logData)
        this.showLogView = true
      })
    },
    // 送审
    audieData(param) {
      HttpModule.audieData(param).then(res => {
        if (res.code === '000000') {
          this.$message.warning('操作成功')
          this.queryTableDatas()
        }
      })
    },
    getChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.code + '-' + item.ruleName
        // item.code = item.code
        item.name = item.ruleName
        if (item.children) {
          that.getChildrenData(item.children)
        }
      })

      return datas
    },
    getLeftTreeData() {
      let that = this
      HttpModule.getTreeData(0).then(res => {
        if (res.code === '000000') {
          let treeResdata = that.getChildrenData(res.data)
          // treeResdata.forEach(item => {
          //   item.label = item.id + '-' + item.businessName
          // })
          // const result = [
          //   {
          //     id: 'root',
          //     label: '全部',
          //     code: 'root',
          //     isleaf: '0',
          //     children: treeResdata
          //   }
          // ]
          that.treeData[0].children = treeResdata
        } else {
          this.$message.error('左侧树加载失败')
        }
      })
    }
  },
  created() {
    console.log('this.$store.state.curNavModule', this.$store.state.curNavModule)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.menuName = this.$store.state.curNavModule.name.substring(0, 5)
    this.getLeftTreeData()
    // this.queryTableDatas()
  }
}
</script>
<style scoped>
.radio-right{
  float: right;
}
.Titans-table ::v-deep  .vxe-body--row.row-yellow {
  background-color: yellow;
  color: #fff;
}
.Titans-table ::v-deep  .vxe-body--row.row-blue {
  background-color: blue;
  color: #fff;
}
.Titans-table ::v-deep  .vxe-body--row.row-red {
  background-color: red;
  color: #fff;
}
</style>
