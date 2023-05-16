<!-- 系统级规则审核 -->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout>
      <template v-slot:topTap></template>
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          show-zero
          :is-open="isShowQueryConditions"
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
    <!-- 附件弹框 -->
    <BsAttachment v-if="showAttachmentDialog" refs="attachmentboss" :user-info="userInfo" :billguid="billguid" />
    <GlAttachment
      v-if="showGlAttachmentDialog"
      :user-info="userInfo"
      :billguid="billguid"
    />
    <AddDialog
      v-if="dialogVisible"
      :title="dialogTitle"
      :modify-data="modifyData"
    />
    <FilePreview
      v-if="filePreviewDialogVisible"
      :visible.sync="filePreviewDialogVisible"
      :file-guid="fileGuid"
      :app-id="appId"
    />
  </div>
</template>

<script>
import { proconf } from './InquiryLetterRecords'
import AddDialog from './children/addDialog.vue'
import HttpModule from '@/api/frame/main/Monitoring/InquiryLetterRecords.js'
import GlAttachment from '../common/GlAttachment'
import FilePreview from './children/filePreview.vue'
export default {
  components: {
    AddDialog,
    GlAttachment,
    FilePreview
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  data() {
    return {
      showGlAttachmentDialog: false,
      buttonType: '',
      // BsQuery 查询栏
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      radioShow: true,
      breakRuleVisible: false,
      treeTypeConfig: {
        curRadio: 'AGENCY'
      },
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
      treeGlobalConfig: {
        inputVal: ''
      },
      // treeServerUri: 'pay-clear-service/v2/lefttree',
      treeServerUri: '',
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
          code: '4',
          curValue: '4'
        },
        buttonsInfo: proconf.statusRightToolBarButton,
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
        }
      },
      regulationStatus: 2,
      buttonsInfo: proconf.statusRightToolBarButtonByBusDept,
      tabStatusNumConfig: {
        '4': 0
      },
      leftNode: {},
      isShowQueryConditions: true,
      toolBarStatusSelect: {
        type: 'button',
        iconName: 'base-all.png',
        iconNameActive: 'base-all-active.png',
        iconUrl: '',
        label: '全部',
        code: '4',
        curValue: '4'
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
      modifyData: {},
      // 请求 & 角色权限相关配置
      menuName: '问询函列表',
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
      ruleFlowOpinion: '',
      askName: '',
      askType: '',
      createTime: '',
      provinceCode: [],
      treeQueryparams: { elementcode: 'admdiv', province: '610000000', year: '2021', wheresql: 'and code like \'' + 61 + '%\'' },
      filePreviewDialogVisible: false,
      fileGuid: ''
    }
  },
  mounted() {
  },
  methods: {
    getDetail(val) {
      HttpModule.getDetailData(val).then(res => {
        if (res.code === '000000') {
          this.DetailData = res.data
          this.DetailData.ruleFlowOpinion = this.ruleFlowOpinion
          this.dialogVisible = true
          this.dialogTitle = '查看详情'
        }
      })
    },
    search(val) {
      console.log(val)
      this.askName = val.askName
      this.askType = val.askType_name
      this.createTime = val.createTime.substring(0, 10)
      this.provinceCode = val.province_code__multiple
      if (this.createTime) {
        this.createTime = this.createTime + ' 00:00:00'
      }
      this.queryTableDatas()
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
    // 送审
    audieData(param) {
      HttpModule.audieData(param).then(res => {
        if (res.code === '000000') {
          this.$message.warning('操作成功')
          this.queryTableDatas()
          this.queryTableDatasCount()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      console.log(obj.code)
      this.buttonType = obj.code
      switch (obj.code) {
        // 新增
        case 'approval':
          this.onAddToolbarClickAdd(obj, context, e)
          break
        // 撤销
        case 'revoke':
          this.revoke(obj, context, e)
          break
        // 查看详情
        case 'check':
          this.check(obj, context, e)
          break
        // 打印
        case 'print':
          this.print()
          break
        default:
          break
      }
    },
    print() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      const params = {
        askCode: selection[0].askCode
      }
      HttpModule.print(params).then(res => {
        if (res.code === '000000') {
          this.filePreviewDialogVisible = true
          this.fileGuid = res.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
    check(obj, context, e) {
      let row = []
      row = this.$refs.mainTableRef.getSelectionData()
      if (row.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.modifyData = row[0]
      this.dialogVisible = true
      this.dialogTitle = '查看详情'
    },
    // 撤销
    revoke(obj, context, e) {
      let row = []
      row = this.$refs.mainTableRef.getSelectionData()
      if (row.length < 0) {
        this.$message.warning('请选择数据')
        return
      }
      let askCodes = []
      row.forEach(item => {
        askCodes.push(item.askCode)
      })
      const params = {
        menuId: this.menuId,
        askCodes: askCodes
      }
      HttpModule.revoke(params).then(res => {
        if (res.code === '000000') {
          this.$message.success('退回成功')
          this.queryTableDatas()
          this.queryTableDatasCount()
        } else {
          this.$message.error(res.result)
        }
      })
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
      console.log('查看附件')
      if (row.attachmentId === null || row.attachmentId === '') {
        this.$message.warning('该数据无附件')
        return
      }
      this.billguid = row.attachmentId
      // this.showAttachmentDialog = true
      this.showGlAttachmentDialog = true
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
      if (this.addTableData.length > 0) {
        this.addTableData = []
      }
      this.dialogTitle = '新增'
      this.addTableData.push(row)
      this.dialogVisible = true
    },
    // 点击回复
    onAddToolbarClickAdd(obj, context, e) {
      let row = []
      row = this.$refs.mainTableRef.getSelectionData()
      if (row.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.modifyData = row[0]
      this.dialogVisible = true
      this.dialogTitle = '问询函复核'
    },
    // queryTableDatasCount() {
    //   const params = {
    //     statusCodeArr: ['2', '4', '2,4'],
    //     menuId: this.menuId
    //   }
    //   HttpModule.queryTableDatasCount(params).then(res => {
    //     if (res.code === '000000') {
    //       this.tabStatusNumConfig['2'] = res.data.unHandle
    //       this.tabStatusNumConfig['4'] = res.data.handle
    //       this.tabStatusNumConfig['2,4'] = res.data.allCount
    //     }
    //   })
    // },
    queryTableDatasCount() {
      const params = {
        statusCodeArr: ['1', '2', '1,2'],
        menuId: this.menuId
      }
      HttpModule.queryTableDatasCount(params).then(res => {
        if (res.code === '000000') {
          this.tabStatusNumConfig['1'] = res.data.unHandle
          this.tabStatusNumConfig['2'] = res.data.handle
          this.tabStatusNumConfig['1,2'] = res.data.allCount
        }
      })
    },
    // 查询 table 数据
    queryTableDatas() {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        status: this.toolBarStatusSelect.curValue,
        askName: this.askName,
        askType: this.askType,
        createTime: this.createTime,
        provinceCode: this.provinceCode
      }
      this.tableLoading = true
      HttpModule.queryTableDatas(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
          this.tabStatusNumConfig['4'] = res.data.totalCount
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
    getLeftTreeData() {
      let that = this
      let params = {}
      if (this.$store.state.userInfo.province?.slice(0, 2) === '61') {
        params = {
          elementcode: 'admdiv',
          province: '610000000',
          year: '2021',
          wheresql: 'and code like \'' + 61 + '%\''
        }
      } else {
        params = {
          elementcode: 'admdiv',
          province: this.$store.state.userInfo.province,
          year: this.$store.state.userInfo.year,
          wheresql: 'and code like \'' + this.$store.state.userInfo.province.substring(0, 6) + '%\''
        }
      }
      HttpModule.getLeftTree(params).then(res => {
        if (res.rscode === '100000') {
          console.log(this.queryConfig)
          let treeResdata = that.getRegulationChildrenData(res.data)
          this.queryConfig[2].itemRender.options = treeResdata
        } else {
          this.$message.error('左侧树加载失败')
        }
      })
    },
    getRegulationChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.text
        if (item.children && item.children.length > 0) {
          that.getRegulationChildrenData(item.children)
          item.leaf = false
        } else {
          item.leaf = true
        }
      })

      return datas
    },
    getTypeList() {
      HttpModule.getTypeList().then(res => {
        res.data.forEach(item => {
          item.label = item.askTypeName
          item.name = item.askTypeName
        })
        this.queryConfig[1].itemRender.options = res.data
      })
    }
  },
  created() {
    let date = new Date()
    let year = date.toLocaleDateString().split('/')[0]
    let month = date.toLocaleDateString().split('/')[1]
    let day = date.toLocaleDateString().split('/')[2]
    this.searchDataList.createTime = year + '-' + month + '-' + day
    // this.params5 = commonFn.transJson(this.$store.state.curNavModule.param5)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.queryTableDatasCount()
    this.getLeftTreeData()
    this.getTypeList()
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
