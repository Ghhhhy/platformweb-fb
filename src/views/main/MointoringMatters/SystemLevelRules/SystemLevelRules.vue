<!-- 系统级规则管理 -->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
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
      <template v-slot:mainTree>
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
      </template>
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
              <div v-if="leftTreeVisible === false" class="table-toolbar-contro-leftvisible" @click="leftTreeVisible = true"></div>
              <div class="table-toolbar-left-title">
                <span class="fn-inline">{{ menuName }}</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <BsOperationLog :logs-data="logData" :show-log-view="showLogView" />
    <AddDialog
      v-if="dialogVisible"
      :title="dialogTitle"
    />
    <!-- 附件弹框 -->
    <BsAttachment v-if="showAttachmentDialog" refs="attachmentboss" :user-info="userInfo" :billguid="billguid" />
  </div>
</template>

<script>
import { proconf } from './SystemLevelRules'
import AddDialog from './children/addDialog'
import HttpModule from '@/api/frame/main/Monitoring/levelRules.js'
export default {
  components: {
    AddDialog
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  data() {
    return {
      // BsQuery 查询栏
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
      formDatas: {},
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
      DetailData: {}
    }
  },
  mounted() {
  },
  methods: {
    search(obj) {
      console.log(obj)
      this.warningLevel = obj.warningLevel
      this.handleType = obj.handleType
      this.isEnable = obj.isEnable
      this.warningLevel = obj.warningLevel
      this.regulationName = obj.regulationName
      this.regulationClass = obj.regulationClass_code
      this.queryTableDatas()
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
      this.$confirm('确认删除！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let arr = []
        datas.forEach(res => {
          arr.push(res.regulationCode)
        })
        HttpModule.delete(arr).then(res => {
          if (res.code === '000000') {
            this.$message.success('删除成功')
            this.queryTableDatas()
            this.queryTableDatasCount()
          }
        })
      })
    },
    changeData(val) {
      HttpModule.getDetailData(val).then(res => {
        if (res.code === '000000') {
          this.DetailData = res.data
          this.dialogVisible = true
          this.dialogTitle = '修改'
        }
      })
    },
    getDetail(val) {
      HttpModule.getDetailData(val).then(res => {
        if (res.code === '000000') {
          this.DetailData = res.data
          this.dialogVisible = true
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
          this.audieData({ operate: 1, regulationCodes: regulationCodes, menuName: this.$store.state.curNavModule.name })
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
          this.audieData({ operate: 3, regulationCodes: regulationCodes, menuName: this.$store.state.curNavModule.name })
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
          this.formDatas = datas[0].ruleElement
          this.getDetail(datas[0].regulationCode)
          break
        // 修改
        case 'change':
          let datas2 = this.$refs.mainTableRef.getSelectionData()
          if (datas2.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          this.formDatas = datas2[0].ruleElement
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
        // // 刷新
        // case 'add-toolbar-refresh':
        //   this.refresh()
        //   break
        // // 刷新
        // case 'operation-toolbar-refresh':
        //   this.refresh()
        //   break
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
      this.queryTableDatasCount()
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
      this.dialogVisible = true
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
      this.dialogVisible = true
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
      console.log(this.$store.state.curNavModule.f_FullName.substring(0, 3))
      let regulationType = this.$store.state.curNavModule.f_FullName.substring(0, 3)
      if (regulationType === '系统级') {
        regulationType = '1'
      } else if (regulationType === '部门级') {
        regulationType = '3'
      } else if (regulationType === '财政级') {
        regulationType = '2'
      }

      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        'regulationType': regulationType, // 规则类型：1.系统级  2.财政级  3.部门级
        'warningLevel': this.warningLevel, // 预警级别
        'handleType': this.handleType, // 处理方式
        'businessModelCode': '', // 业务模块
        'businessFeaturesCode': '', // 业务功能
        'regulationStatus': this.regulationStatus, // 规则状态：1.新增  2.送审  3.审核
        'isEnable': this.isEnable,
        'regulationName': this.regulationName,
        regulationClass: this.regulationClass,
        id: this.condition.agency_code,
        menuType: 1
      }
      if (this.leftNode.businessType === 2) {
        param.businessModelCode = this.leftNode.code
      } else if (this.leftNode.businessType === 3) {
        param.businessFeaturesCode = this.leftNode.code
      }
      this.tableLoading = true
      HttpModule.getMainTableDataList(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
          this.queryTableDatasCount()
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
          this.$message.success('操作成功')
          this.queryTableDatas()
          this.queryTableDatasCount()
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
    },
    getRegulation() {
      HttpModule.getTree(0).then(res => {
        if (res.code === '000000') {
          let treeResdata = this.getRegulationChildrenData1(res.data)
          this.queryConfig[0].itemRender.options = treeResdata
        } else {
          this.$message.error('下拉树加载失败')
        }
      })
    },
    getRegulationChildrenData1(datas) {
      let that = this
      datas.forEach(item => {
        // item.code = item.code
        item.name = item.ruleName
        item.label = item.code + '-' + item.ruleName
        if (item.children.length > 0) {
          that.getRegulationChildrenData(item.children)
          item.leaf = false
        } else {
          item.leaf = true
        }
      })

      return datas
    }
  },
  created() {
    console.log('this.$store.state.curNavModule', this.$store.state.curNavModule)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.menuName = this.$store.state.curNavModule.name.substring(0, 5)
    this.getRegulation()
    this.getLeftTreeData()
    this.queryTableDatas()
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
