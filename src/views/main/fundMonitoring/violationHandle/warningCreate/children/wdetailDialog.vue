<template v-loading="tableLoading">
  <vxe-modal
    v-model="detailVisible"
    :title="title"
    width="96%"
    class="wdetailDialop"
    height="90%"
    :show-footer="false"
    @close="dialogClose"
  >
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">

      <template v-slot:topTabPane>
        <BsTabPanel
          is-open
          is-hide-query
          :tab-status-btn-config="tabStatusBtnConfig"
          :tab-status-num-config="tabStatusNumConfig"
          @onQueryConditionsClick="onQueryConditionsClick1"
        >
          <template v-if="(tabSelect === '3' || tabSelect === '4' || tabSelect === '2') && (transJson($store.state.curNavModule.param5).isQuery !== 'true')" v-slot:preBtns>
            <vxe-button
              size="medium"
              @click="doBack"
            >退回</vxe-button>
          </template>
        </BsTabPanel>
      </template>
      <template v-slot:query>
        <div class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="queryConfig"
            :query-form-data="searchDataList"
            @onSearchClick="search"
            @onSearchResetClick="reset"
            @itemChange="itemChange"
          />
        </div>
      </template>
      <template v-if="showBuinessTree" v-slot:mainTree>
        <BsTreeSet
          ref="treeSet"
          v-model="leftTreeVisible"
          :tree-config="treeTypeConfig"
          @onChangeInput="(val) => { leftTreeFilterText = val }"
          @onAsideChange="asideChange"
          @onConfrimData="treeSetConfrimData"
        />
        <BsTree
          ref="leftTree"
          open-loading
          :filter-text="leftTreeFilterText"
          :tree-data="treeData"
          :current-node-key="currentNodeKey"
          :config="{ showFilter: false, treeProps: { nodeKey: 'code', label: 'label',children: 'children' } }"
          @onNodeClick="onClickmethod"
        />
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="mainTableRef"
          v-loading="tableLoadingState"
          :footer-config="tableFooterConfig"
          :table-config="tableConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :toolbar-config="tableToolbarConfig"
          :cell-style="cellStyle"
          :pager-config="pagerConfig"
          @ajaxData="ajaxTableData"
          @cellClick="cellClick"
          @onToolbarBtnClick="onToolbarBtnClick"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div v-if="leftTreeVisible === false && showBuinessTree === true" class="table-toolbar-contro-leftvisible" @click="leftTreeVisible = true"></div>
              <div class="table-toolbar-left-title">
                <span class="fn-inline">{{ title }}</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <ShowDialog
      v-if="showDialogVisible"
      :title="showDialogTitle"
      :warning-code="warningCode"
      :fi-rule-code="detailFiRuleCode"
      :is-create="isCreate"
      :is-done="isDone"
      :detail-data="showDetailData"
      :bussness-id="bussnessId"
      :regulation-class="regulationClass"
      :param5="param5"
      @close="closeHandle"
    />
    <GlAttachment
      v-if="showGlAttachmentDialog"
      :user-info="userInfo"
      :billguid="billguid"
      :billguid-list="billguidList"
      @close="closeAttachment"
    />
    <BsOperationLog :logs-data="logData" :show-log-view.sync="showLogView" />
  </vxe-modal>
</template>
<script>
import HttpModule from '@/api/frame/main/fundMonitoring/createProcessing.js'
import proconf, {
  statusButtons,
  curStatusButton,
  curStatusButton1,
  curStatusButton2,
  curStatusButton3,
  buttons1,
  buttons2
} from './column.js'
import GlAttachment from './common/GlAttachment'
import ShowDialog from './addDialog.vue'
import transJson from '@/utils/transformMenuQuery'
// import BsTable1 from '@/components/Table/Table.vue'
import moment from 'moment'

export default {
  name: 'DetailDialogs',
  components: {
    GlAttachment,
    ShowDialog
    // BsTable1
  },
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    }
  },
  props: {
    colourType: {
      type: String,
      default: ''
    },
    detailData: {
      type: Array,
      default() {
        return []
      }
    },
    selectBid: {
      type: String,
      default: '7'
    },
    regulationClass: {
      type: String,
      default: '0201'
    },
    queryData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      // 操作日志
      logData: [],
      showLogView: false,
      title: '',
      tableLoadingState: false,
      showDialogVisible: false,
      showDialogTitle: '',
      showDetailData: [],
      isCreate: false,
      isDone: false,
      warnLevel: '',
      status: null,
      isHandle: false,
      isNormal: false,
      isProcessed: false,
      isSign: '',
      userInfo: {},
      billguid: '',
      billguidList: [],
      showLog: false,
      showGlAttachmentDialog: false,
      tabStatusBtnConfig: {
        // changeBtns: true,
        buttons: statusButtons,
        curButton: curStatusButton,
        // buttonsInfo: buttons1,
        buttonsInfo: this.transJson(this.$store.state.curNavModule.param5)?.isQuery === 'true' ? buttons2 : buttons1,
        methods: {
          bsToolbarClickEvent: this.bsToolbarClickEvent
        }
      },
      tabStatusNumConfig: {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0
      },
      onQueryConditionsClick1(isOpen) {
        this.isShowQueryConditions = isOpen
      },
      agencyCodeList: [],
      isShowQueryConditions: true,
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      detailVisible: true,
      // 表格尾部合计配置
      tableFooterConfig: {
        totalObj: {
          paymentAmount: 0
        },
        combinedType: ['switchTotal'],
        showFooter: false
      },
      tableColumnsConfig: [
      ],
      pagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      tableData: [],
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: true, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: true, // 导出
        print: false, // 打印
        zoom: false, // 缩放
        custom: false, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      tableConfig: {
        renderers: {
          // 编辑 附件 操作日志
          $payVoucherInputGloableOptionRow: {
            renderDefault: (h, cellRender, params, context) => {
              let { row, column } = params
              return [
                <el-tooltip content="附件" placement="top" effect="light">
                  <a class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => this.onOptionRowClick({ row, column, optionType: 'attachment' })}>附件</a>,
                </el-tooltip>
              ]
            }
          },
          $ReportTaskGloableOptionRow: {
            renderDefault: (h, cellRender, params, context) => {
              let { row, column } = params
              return [
                <el-tooltip content="" placement="" effect="light">
                  <span style="color: #4293F4; text-decoration: underline" onClick={() => this.onOptionRowClick({ row, column, optionType: 'show' })}>查看</span>
                </el-tooltip>
              ]
            }
          },
          $gloableOptionRowLog1: {
            renderDefault: (h, cellRender, params, context) => {
              let { row, column } = params
              return [
                <el-tooltip content="" placement="" effect="light">
                  <span style="color: #4293F4; text-decoration: underline" onClick={() => this.onOptionRowClick({ row, column, optionType: 'viewLog' })}>查看</span>
                </el-tooltip>
              ]
            }
          }
        },
        methods: {
          onOptionRowClick: this.onOptionRowClick
        },
        globalConfig: {
          // 全局配置
          checkType: 'checkbox',
          seq: true, // 序号列
          useMoneyFilter: true
        }
      },
      params: {},
      condition: {},
      sDetailTitle: '',
      sDetailVisible: false,
      sDetailData: [],
      detailType: '',
      fiRuleCode: '',
      mofDivCode: '',
      warningCode: '',
      tableLoading: false,
      dialogVisibles: false,
      affirmDialogVisibles: false,
      dialogTitle1: '整改意见',
      fiscalYear: '',
      tabSelect: '',
      selectData: {},
      showBuinessTree: false,
      leftTreeVisible: false,
      leftTreeFilterText: '',
      treeData: [],
      bussnessId: '7',
      treeTypeConfig: {},
      currentNodeKey: '7',
      detailFiRuleCode: '' // 查看详情单独定义fiRuleCode 不影响查询
      // {
      //   children: [],
      //   code: '0',
      //   id: '0',
      //   label: '预算执行',
      //   name: '预算执行',
      //   parentId: null,
      //   parentRuleName: null,
      //   ruleLevel: 0,
      //   ruleName: '预算执行'
      // }, {
      //   children: [],
      //   code: '1',
      //   id: '1',
      //   label: '预算管理',
      //   name: '预算管理',
      //   parentId: null,
      //   parentRuleName: null,
      //   ruleLevel: 0,
      //   ruleName: '预算管理'
      // }
    }
  },
  methods: {
    /**
     *动态控制左侧树的显示  只有特定的路由才显示
     */
    setShowBusinesTree() {
      this.showLog = true
      // 可显示是左侧业务树的路由
      const showRouters = ['WarnRegionBySpecial']
      if (showRouters.includes(this.$route.name)) {
        this.showBuinessTree = true
        this.leftTreeVisible = true
        // 去发请求获取左侧数据
        this.getLeftTreeData()
      }
    },
    // table 右侧操作按钮
    asideChange() {
      this.leftTreeVisible = false
    },
    treeSetConfrimData(curTree) {
      this.treeQueryparams.elementCode = curTree.code
      this.$refs.leftTree.refreshTree()
    },
    onClickmethod({ node }) {
      if (node.code) {
        this.$refs.queryFrom.reset()
        this.condition = {}
        this.currentNodeKey = node.code
        // 根据业务渲染列表
        this.bussnessId = node.code.toString()
        this.tableColumnsConfig = proconf.getColumns(this.detailType, this.bussnessId, this.showLog, this.regulationClass)
        this.queryTableDatas()
      }
    },
    /**
     * 获取左侧树
     */
    getLeftTreeData() {
      let that = this
      const param = {
        businessType: 2,
        parentId: '1'// 预算管理一体化系统
      }
      HttpModule.getbusLists(param).then(res => {
        if (res.rscode === '100000') {
          let resData = res.data.results.filter(item => item.id !== '8')
          let treeResdata = that.getChildrenData(resData)
          that.treeData = treeResdata
          console.log(that.treeData)
        } else {
          this.$message.error('左侧树加载失败')
        }
      })
    },
    getChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        item.code = item.id
        item.label = item.businessName
        item.children = item.children || []
        if (item.children && item.children.length > 0) {
          that.getChildrenData(item.children)
        }
      })
      return datas
    },
    onOptionRowClick({ row, optionType }, context) {
      console.log(12312312321321, optionType)
      switch (optionType) {
        // 附件
        case 'attachment':
          this.showAttachment(row)
          break
        case 'show':
          this.show(row)
          break
        case 'viewLog':
          this.showLogModel(row)
          break
        default:
          break
      }
    },
    showLogModel(row) {
      this.queryActionLog(row)
    },
    // 操作日志
    queryActionLog(row) {
      HttpModule.getLogs(row.dealNo).then(res => {
        if (res.code === '000000') {
          let tempData = res.data.map(item => {
            return {
              logid: item['operationTypeCode'],
              nodeName: item['operationTypeName'],
              actionUser: item['operationUser'],
              actionName: item['operationTypeName'],
              actionTime: item['createdTime'] == null ? '' : item['createdTime'],
              message: item['operationComment']
            }
          })
          this.logData = tempData
          console.log(this.logData)
          this.showLogView = true
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 查看附件
    showAttachment(row) {
      console.log('查看附件', row)
      if (!row.attachmentids.length) {
        this.$message.warning('该数据无附件')
        return
      }
      // this.billguid = row.attachmentid1 === null ? row.attachmentid3 : row.attachmentid1
      // let billguidList = []
      // row.attachmentid1 && billguidList.push(row.attachmentid1)
      // row.attachmentid3 && billguidList.push(row.attachmentid3)
      this.billguidList = row.attachmentids.filter(item => { return Boolean(item) })
      this.showGlAttachmentDialog = true
    },
    // 查看详情
    show(val) {
      this.detailFiRuleCode = val.fiRuleCode || ''
      this.warningCode = val.warningCode || ''
      this.showDialogVisible = true
      this.showDialogTitle = '查看详情信息'
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.pagerConfig.currentPage = currentPage
      this.pagerConfig.pageSize = pageSize
      this.refresh()
    },
    refresh() {
      this.queryTableDatas()
      // this.queryTableDatasCount()
    },
    // 搜索
    search(val) {
      this.searchDataList = { ...val, ...this.searchDataList }
      let condition = this.getConditionList()
      for (let key in condition) {
        if (
          (this.searchDataList[key] !== undefined) &
          (this.searchDataList[key] !== null)
        ) {
          if (Array.isArray(this.searchDataList[key])) {
            condition[key] = this.searchDataList[key]
          } else if (typeof this.searchDataList[key] === 'string') {
            if (this.searchDataList[key].trim() !== '') {
              this.searchDataList[key].split(',').forEach((item) => {
                condition[key].push(item)
              })
            }
          }
        }
      }
      console.log(val, '-------------')
      // this.agencyCodeList = val.agencyCodeList_code__multiple
      this.condition = condition
      this.queryTableDatas()
    },
    closeHandle() {
      this.queryTableDatas()
      this.showDialogVisible = false
    },
    closeAttachment() {
      this.showGlAttachmentDialog = false
    },
    bsToolbarClickEvent(obj, $this) {
      if (!obj.type) {
        this.operationToolbarButtonClickEvent(obj)
        return
      }
      this.tabSelect = obj.curValue
      if (this.tabSelect === '1') {
        // this.tableColumnsConfig = proconf.undoNum
        this.tabStatusBtnConfig.curButton = curStatusButton
        switch (this.colourType) {
          case '3':
            this.detailType = 'yellowUndoNum'
            break
          case '2':
            this.detailType = 'orangeUndoNum'
            break
          case '1':
            this.detailType = 'redUndoNum'
            break
          case '5':
            this.detailType = 'greyUndoNum'
            break
          case '4':
            this.detailType = 'blueUndoNum'
            break
          default :
            break
        }
      } else if (this.tabSelect === '2') {
        // this.tableColumnsConfig = proconf.undoNum
        this.tabStatusBtnConfig.curButton = curStatusButton1
        switch (this.colourType) {
          case '3':
            this.detailType = 'yellowNormalNum'
            break
          case '2':
            this.detailType = 'orangeNormalNum'
            break
          case '1':
            this.detailType = 'redNormalNum'
            break
          case '5':
            this.detailType = 'greyNormalNum'
            break
          case '4':
            this.detailType = 'blueNormalNum'
            break
          default :
            break
        }
      } else if (this.tabSelect === '4') {
        // this.tableColumnsConfig = proconf.notRectifiedNum
        this.tabStatusBtnConfig.curButton = curStatusButton2
        switch (this.colourType) {
          case '3':
            this.detailType = 'yellowNotRectifiedNum'
            break
          case '2':
            this.detailType = 'orangeNotRectifiedNum'
            break
          case '1':
            this.detailType = 'redNotRectifiedNum'
            break
          case '5':
            this.detailType = 'greyNotRectifiedNum'
            break
          case '4':
            this.detailType = 'blueNotRectifiedNum'
            break
          default :
            break
        }
      } else if (this.tabSelect === '3') {
        // this.tableColumnsConfig = proconf.doneNum
        this.tabStatusBtnConfig.curButton = curStatusButton3
        switch (this.colourType) {
          case '3':
            this.detailType = 'yellowDoneNum'
            break
          case '2':
            this.detailType = 'orangeDoneNum'
            break
          case '1':
            this.detailType = 'redDoneNum'
            break
          case '5':
            this.detailType = 'greyDoneNum'
            break
          case '4':
            this.detailType = 'blueDoneNum'
            break
          default :
            break
        }
      }
      this.condition = {}
      this.pagerConfig.currentPage = 1
      this.$refs.mainTableRef.$refs.xGrid.clearScroll()
      this.showInfo()
      this.queryTableDatas()
      // this.params.status = this.tabSelect === '1' ? '0' : '1'
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      let self = this
      switch (obj.code) {
        case 'create': // 生成
          self.handleCreate(obj)
          break
        case 'normal': //
          self.handleNormal(obj)
          break
        // 查看详情
        case 'show_detail':
          this.showDetail()
          break
        default:
          break
      }
    },
    itemChange(obj, formRef) {
      let timeFiledList = ['warnStartDate', 'warnEndDate', 'dealWarnStartDate', 'dealWarnEndDate']
      if (timeFiledList.includes(obj.property)) {
        obj.renderOpts.props.value = moment(obj.itemValue).format('YYYY-MM-DD')
        this.searchDataList[obj.property] = obj.itemValue
      } else {
        this.searchDataList[obj.property] = obj.itemValue
      }
      if (obj.property === 'agencyCodeList') {
        let arr = []
        obj.itemValue.split(',')?.map(v => {
          if (v?.length > 0) {
            arr.push(v.split('#')[0])
          }
        })
        this.agencyCodeList = arr
      }
    },
    showDetail() {
      let selection = this.$refs.mainTableRef.selection
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.isDone = true
      this.isCreate = false
      this.showDetailData = selection
      this.showDialogVisible = true
      this.showDialogTitle = '监控问询单信息'
    },
    // 生成
    handleCreate() {
      let selection = this.$refs.mainTableRef.selection
      if (selection.length === 0) {
        this.$message.warning('请选择数据')
        return
      }
      let mofDivCodeList = {}
      let agencyCodeList = {}
      let fiRuleCodeList = {}
      selection.forEach(item => {
        mofDivCodeList[item.mofDivCode] = item.mofDivName
        agencyCodeList[item.agencyCode] = item.agencyCode
        fiRuleCodeList[item.fiRuleCode] = item.fiRuleCode
      })
      if (Object.keys(mofDivCodeList).length > 1) {
        this.$message.warning('请选择同一区划')
        return
      }
      if (Object.keys(agencyCodeList).length > 1 || Object.keys(fiRuleCodeList).length > 1) {
        this.$message.warning('请选择同一单位编码和同一规则编码')
        return
      }
      this.isDone = false
      this.isCreate = true
      this.showDetailData = selection
      this.showDialogVisible = true
      this.showDialogTitle = '监控问询单信息'
    },
    handleNormal() {
      let selection = this.$refs.mainTableRef.selection
      if (selection.length === 0) {
        this.$message.success('请选择数据')
        return
      }
      var warnIds = []
      selection.forEach(function(item, index) {
        warnIds.push(item.warnid)
      })
      this.$confirm('此操作将标记选中数据为正常, 是否继续?', '提示', {
        confirmButtonText: '标记',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableLoading = true
        HttpModule
          .handleNormal(warnIds)
          .then(res => {
            this.tableLoading = false
            if (res.code === '000000') {
              this.$message({
                type: 'success',
                message: '标记成功!'
              })
              this.queryTableDatas()
            }
          })
          .finally(() => {
            this.tableLoading = false
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消标记'
        })
      })
    },
    updateRectifyAsk() {
      this.dialogVisibles = true
      this.dialogTitle1 = '整改处理单'
    },
    updateRectifyAskup() {
      this.dialogVisibles = true
      this.dialogTitle1 = '修改整改处理单'
    },
    affirm() {
      this.affirmDialogVisibles = true
      this.dialogTitle1 = '认定处理单'
    },
    affirmUpdate() {
      this.affirmDialogVisibles = true
      this.dialogTitle1 = '修改认定处理单'
    },
    // 展开折叠查询框
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
    },
    // 初始化高级查询data
    getSearchDataList() {
      // 下拉树
      let searchDataObj = {}
      this.queryConfig.forEach((item) => {
        if (
          item.itemRender.name === '$formTreeInput' ||
          item.itemRender.name === '$vxeTree'
        ) {
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
      this.queryConfig.forEach((item) => {
        if (
          item.itemRender.name === '$formTreeInput' ||
          item.itemRender.name === '$vxeTree'
        ) {
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
      this.$parent.detailVisible = false
      if (this.transJson(this.$store.state.curNavModule.param5)?.isQuery === 'true') {
        return
      }
      this.$parent.queryTableDatas()
    },
    onToolbarBtnClick({ context, table, code }) {
      switch (code) {
        // 刷新
        case 'refresh':
          this.refresh()
          break
      }
    },
    showInfo() {
      this.fiRuleCode = this.detailData[1]
      this.mofDivCode = this.detailData[2]
      this.fiscalYear = this.detailData[3]
      // 这里在获取一个业务类型 然后依据业务类型和具体的状态去动态构造表头数据
      console.log('detailType:' + this.detailType)
      switch (this.detailType) {
        case 'redUndoNum':
          this.tableColumnsConfig = proconf.getColumns('redUndoNum', this.bussnessId, this.showLog)
          this.tabStatusBtnConfig.curButton = curStatusButton
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '1'
          this.isSign = 0
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '疑点信息明细'
          break
        case 'redNormalNum':
          this.tableColumnsConfig = proconf.getColumns('redNormalNum', this.bussnessId, this.showLog)
          this.tabStatusBtnConfig.curButton = curStatusButton1
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '1'
          this.isSign = '1'
          this.status = ''
          this.isNormal = true
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '认定正常明细'
          break
        case 'redNotRectifiedNum':
          // this.tableColumnsConfig = proconf.notRectifiedNum
          this.tableColumnsConfig = proconf.getColumns('redNotRectifiedNum', this.bussnessId, this.showLog)
          this.tabStatusBtnConfig.curButton = curStatusButton3
          this.tabStatusBtnConfig.buttons = statusButtons
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.warnLevel = '1'
          this.isSign = '2'
          this.status = 7
          this.title = '认定违规-待整改明细'
          break
        case 'redDoneNum':
          // this.tableColumnsConfig = proconf.doneNum
          this.tableColumnsConfig = proconf.getColumns('redDoneNum', this.bussnessId, this.showLog)
          this.tabStatusBtnConfig.curButton = curStatusButton2
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '1'
          this.isSign = '2'
          this.status = null
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = 7
          this.title = '认定违规-已整改明细'
          break
        case 'orangeUndoNum':
          //  this.tableColumnsConfig = proconf.undoNum
          this.tableColumnsConfig = proconf.getColumns('orangeUndoNum', this.bussnessId, this.showLog)
          this.tabStatusBtnConfig.curButton = curStatusButton
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '2'
          this.isSign = 0
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '预警数据明细'
          break
        case 'orangeNormalNum':
          // this.tableColumnsConfig = proconf.normalNum
          this.tableColumnsConfig = proconf.getColumns('orangeNormalNum', this.bussnessId, this.showLog)
          this.tabStatusBtnConfig.curButton = curStatusButton1
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '2'
          this.isSign = 2
          this.isNormal = true
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '认定正常明细'
          break
        case 'orangeNotRectifiedNum':
          // this.tableColumnsConfig = proconf.notRectifiedNum
          this.tableColumnsConfig = proconf.getColumns('orangeNotRectifiedNum', this.bussnessId, this.showLog)
          this.tabStatusBtnConfig.curButton = curStatusButton3
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '2'
          this.isSign = '2'
          this.isNormal = false
          this.isHandle = true
          this.isProcessed = false
          this.status = null
          this.title = '未完成明细'
          break
        case 'orangeDoneNum':
          // this.tableColumnsConfig = proconf.doneNum
          this.tableColumnsConfig = proconf.getColumns('orangeDoneNum', this.bussnessId, this.showLog)
          this.tabStatusBtnConfig.curButton = curStatusButton2
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '2'
          this.isSign = '2'
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = 7
          this.title = '已整改明细'
          break
        case 'yellowUndoNum':
          // this.tableColumnsConfig = proconf.undoNum
          this.tableColumnsConfig = proconf.getColumns('yellowUndoNum', this.bussnessId, this.showLog)
          this.tabStatusBtnConfig.curButton = curStatusButton
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '3'
          this.isSign = '0'
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '预警数据明细'
          break
        case 'yellowNormalNum':
          // this.tableColumnsConfig = proconf.normalNum
          this.tableColumnsConfig = proconf.getColumns('yellowNormalNum', this.bussnessId, this.showLog)
          this.tabStatusBtnConfig.curButton = curStatusButton1
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '3'
          this.isSign = '2'
          this.isNormal = true
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '认定正常明细'
          break
        case 'yellowNotRectifiedNum':
          // this.tableColumnsConfig = proconf.notRectifiedNum
          this.tableColumnsConfig = proconf.getColumns('yellowNotRectifiedNum', this.bussnessId, this.showLog)
          this.tabStatusBtnConfig.curButton = curStatusButton3
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '3'
          this.isSign = '2'
          this.isNormal = false
          this.isHandle = true
          this.isProcessed = false
          this.status = null
          this.title = '未完成明细'
          break
        case 'yellowDoneNum':
          // this.tableColumnsConfig = proconf.doneNum
          this.tableColumnsConfig = proconf.getColumns('yellowDoneNum', this.bussnessId, this.showLog)
          this.tabStatusBtnConfig.curButton = curStatusButton2
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '3'
          this.isSign = '2'
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = 7
          this.title = '已整改明细'
          break
        case 'blueUndoNum':
          // this.tableColumnsConfig = proconf.undoNum
          this.tableColumnsConfig = proconf.getColumns('blueUndoNum', this.bussnessId, this.showLog)
          this.tabStatusBtnConfig.curButton = curStatusButton
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '4'
          this.isSign = '0'
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '预警数据明细'
          break
        case 'blueNormalNum':
          // this.tableColumnsConfig = proconf.normalNum
          this.tableColumnsConfig = proconf.getColumns('blueNormalNum', this.bussnessId, this.showLog)
          this.tabStatusBtnConfig.curButton = curStatusButton1
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '4'
          this.isSign = '2'
          this.isNormal = true
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '认定正常明细'
          break
        case 'blueNotRectifiedNum':// 未完成
          // this.tableColumnsConfig = proconf.notRectifiedNum
          this.tableColumnsConfig = proconf.getColumns('blueNotRectifiedNum', this.bussnessId, this.showLog)
          this.tabStatusBtnConfig.curButton = curStatusButton3
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '4'
          this.isSign = '2'
          this.isNormal = false
          this.isHandle = true
          this.isProcessed = false
          this.status = null
          this.title = '未完成明细'
          break
        case 'blueDoneNum':
          // this.tableColumnsConfig = proconf.doneNum
          this.tableColumnsConfig = proconf.getColumns('blueDoneNum', this.bussnessId, this.showLog)
          this.tabStatusBtnConfig.curButton = curStatusButton2
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '4'
          this.isSign = '2'
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = 7
          this.title = '已整改明细'
          break
        default:
          break
        // case 'greyUndoNum':
        //   this.tableColumnsConfig = proconf.undoNum
        //   this.tabStatusBtnConfig.curButton = curStatusButton
        //   this.tabStatusBtnConfig.buttons = statusButtons
        //   this.warnLevel = '4'
        //   this.isSign = '0'
        //   this.status = ''
        //   this.title = '疑点信息明细'
        //   break
        // case 'greyNormalNum':
        //   this.tableColumnsConfig = proconf.undoNum
        //   this.tabStatusBtnConfig.curButton = curStatusButton1
        //   this.tabStatusBtnConfig.buttons = statusButtons
        //   this.warnLevel = '4'
        //   this.isSign = '1'
        //   this.status = ''
        //   this.title = '认定正常明细'
        //   break
        // case 'greyNotRectifiedNum':
        //   this.tableColumnsConfig = proconf.notRectifiedNum
        //   this.tabStatusBtnConfig.curButton = curStatusButton2
        //   this.tabStatusBtnConfig.buttons = statusButtons
        //   this.warnLevel = '4'
        //   this.isSign = '2'
        //   this.status = '1'
        //   this.title = '认定违规-待整改明细'
        //   break
        // case 'greyDoneNum':
        //   this.tableColumnsConfig = proconf.doneNum
        //   this.tabStatusBtnConfig.curButton = curStatusButton3
        //   this.tabStatusBtnConfig.buttons = statusButtons
        //   this.warnLevel = '4'
        //   this.isSign = '2'
        //   this.status = '2'
        //   this.title = '认定违规-已整改明细'
        //   break
      }
      switch (this.warnLevel) {
        case '1':
          this.title = '红色预警-' + this.title
          break
        case '2':
          this.title = '橙色预警-' + this.title
          break
        case '3':
          this.title = '黄色预警-' + this.title
          break
        // case '4':
        //   this.title = '灰色预警-' + this.title
        //   break
        case '4':
          this.title = '蓝色预警-' + this.title
          break
        default:
          break
      }
    },
    queryTableDatas() {
      let params = {
        page: this.pagerConfig.currentPage, // 页码
        pageSize: this.pagerConfig.pageSize, // 每页条数
        warnLevel: this.warnLevel,
        isSign: this.isSign,
        agencyCodeList: this.agencyCodeList,
        status: this.status,
        isNormal: this.isNormal,
        isHandle: this.isHandle,
        regulationClassName: this.condition.regulationClassName ? this.condition.regulationClassName[0] : '',
        warnTime: this.condition.warnTime ? this.condition.warnTime[0] : '',
        triggerClass: this.condition.triggerClass ? this.condition.triggerClass[0] : '',
        fiRuleName: this.condition.fiRuleName ? this.condition.fiRuleName[0] : '',
        businessNo: this.condition.businessNo ? this.condition.businessNo[0] : '',
        isFilterByPerm: transJson(this.$store.state.curNavModule.param5)?.isFilterByPerm,
        businessModuleCode: this.bussnessId || undefined,
        trackProName: this.condition.trackProName ? this.condition.trackProName[0] : '',
        roleguid: this.$store.state.curNavModule.roleguid,
        warnStartDate: this.searchDataList.warnStartDate && moment(this.searchDataList.warnStartDate).format('YYYY-MM-DD'),
        warnEndDate: this.searchDataList.warnEndDate && moment(this.searchDataList.warnEndDate).format('YYYY-MM-DD'),
        dealWarnStartDate: this.searchDataList.dealWarnStartDate && moment(this.searchDataList.dealWarnStartDate).format('YYYY-MM-DD'),
        dealWarnEndDate: this.searchDataList.dealWarnEndDate && moment(this.searchDataList.dealWarnEndDate).format('YYYY-MM-DD'),
        roleId: this.$store.state.curNavModule.roleguid,
        menuId: this.$store.state.curNavModule.guid
      }

      // 有菜单有主题参数则 则用主题参数
      if (transJson(this.$store.state.curNavModule.param5)?.regulationClass) {
        params.regulationClass = transJson(this.$store.state.curNavModule.param5)?.regulationClass
      }
      if (this.$store.state.curNavModule.f_FullName?.substring(0, 4) === '直达资金') {
        params.regulationClass = '0201'
      }
      if (this.detailData.length > 5) {
        let { xpayDate, triggerMonitorDate } = this.detailData[5]
        params = Object.assign(params, {
          xpayDate: xpayDate || undefined,
          triggerMonitorDate: triggerMonitorDate || undefined
        })
      }
      if (!params.warnTime && params.triggerMonitorDate) {
        params.warnTime = params.triggerMonitorDate
      }
      if (this.fiRuleCode === null || this.fiRuleCode === '') {
        params.mofDivCode = this.mofDivCode
        params.fiscalYear = this.fiscalYear
        this.tableLoadingState = true
        HttpModule.querySumByMof(params).then(res => {
          if (res.code === '000000') {
            this.tableFooterConfig.totalObj = res.data ? res.data[0] : 0
          } else {
            this.$message.error(res.result)
          }
        })
        HttpModule.queryDetailDatasByMof(params).then((res) => {
          this.tableLoadingState = false
          if (res.code === '000000') {
            this.tableData = res.data.results
            this.pagerConfig.total = res.data.totalCount
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        params.fiRuleCode = this.fiRuleCode
        this.tableLoadingState = true
        HttpModule.querySum(params).then(res => {
          if (res.code === '000000') {
            this.tableFooterConfig.totalObj = res.data ? res.data[0] : 0
          } else {
            this.$message.error(res.result)
          }
        })
        HttpModule.queryDetailDatas(params).then((res) => {
          this.tableLoadingState = false
          if (res.code === '000000') {
            this.tableData = res.data.results
            this.pagerConfig.total = res.data.totalCount
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    getAgency() {
      const param = {
        elementCode: 'AGENCY',
        date: this.$store.state.userInfo.year,
        tokenid: this.$store.getters.getLoginAuthentication.tokenid,
        appguid: 'apaas',
        year: this.$store.state.userInfo.year,
        mofDivCode: this.$store.state.userInfo.province,
        parameters: {}
      }
      HttpModule.getTreewhere(param).then(res => {
        let treeResdata = res.data
        this.queryConfig[0].itemRender.options = treeResdata
      })
    },
    getChildrenNewData1(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.text
        if (item.children) {
          that.getChildrenNewData1(item.children)
        }
      })
      return datas
    },
    handleDetail(type, diBillId, mofDivCode) {
      this.$parent.sdetailQueryParam = {
        diBillId: diBillId,
        fiscalYear: this.fiscalYear,
        mofDivCode: mofDivCode
      }
      this.$parent.sdetailVisible = true
    },
    cellStyle({ row, rowIndex, column }) {
      // 有效的cellValue
      const style = {}
      const validCellValue = (row[column.property] * 1)
      if (validCellValue && ['detail'].includes(column.property)) {
        style.color = '#4293F4'
        style.textDecoration = 'underline'
      } else if (['warnLevel'].includes(column.property)) {
        switch (row.warnLevel) {
          case 3:
            style.color = '#BBBB00'
            break
          case 2:
            style.color = 'orange'
            break
          case 1:
            style.color = 'red'
            break
          case 4:
            style.color = 'blue'
            break
          case 5:
            style.color = 'gray'
            break
          default:
            break
        }
      }
      return style
    },
    transJson(str) {
      if (!str) return
      var params = str.split(',')
      var result = {}
      if (params && params.length > 0) {
        for (var i = 0; i < params.length; i++) {
          var map = params[i].split('=')
          result[map[0]] = map[1]
        }
      }
      return result
    },
    reset() {
      this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'warnStartDate' })].itemRender.props['value'] = ''
      this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'warnEndDate' })].itemRender.props['value'] = ''
      this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'dealWarnStartDate' })].itemRender.props['value'] = ''
      this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'dealWarnEndDate' })].itemRender.props['value'] = ''
      this.$refs.queryFrom.reset()
      this.agencyCodeList = []
      this.searchDataList.agencyCodeList = []
      this.searchDataList.businessNo = ''
      this.searchDataList.fiRuleName = ''
      this.searchDataList.regulationClassName = ''
      this.searchDataList.trackProName = ''
      this.searchDataList.triggerClass = ''
      this.searchDataList.warnTime = ''
      this.searchDataList.warnStartDate = ''
      this.searchDataList.warnEndDate = ''
      this.searchDataList.dealWarnStartDate = ''
      this.searchDataList.dealWarnEndDate = ''
      this.condition.agencyCodeList = []
      this.condition.businessNo = ''
      this.condition.fiRuleName = ''
      this.condition.regulationClassName = ''
      this.condition.trackProName = ''
      this.condition.triggerClass = ''
      this.condition.warnTime = ''
      this.queryTableDatas()
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property

      // 无效的cellValue
      const isInvalidCellValue = !(obj.row[obj.column.property] * 1)
      if (isInvalidCellValue) return

      switch (key) {
        case 'detail':
          this.handleDetail('detail', obj.row.diBillId, obj.row.mofDivCode)
          this.$parent.sDetailTitle = '详细信息'
          break
      }
    },
    doBack() {
      let selection = this.$refs.mainTableRef.selection
      if (selection.length === 0) {
        this.$message.success('请至少选择一条数据')
        return
      }
      var backIds = []
      selection.forEach(function(item, index) {
        backIds.push({ warnid: item.warnid, dealNo: item.dealNo })
      })
      this.$confirm('确定退回选中数据?', '提示', {
        confirmButtonText: '退回',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableLoading = true
        HttpModule
          .doBack(backIds)
          .then(res => {
            this.tableLoading = false
            if (res.code === '000000') {
              this.$message({
                type: 'success',
                message: '退回成功!'
              })
              this.queryTableDatas()
            } else {
              this.$message.error(res.message)
            }
          })
          .finally(() => {
            this.tableLoading = false
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退回'
        })
      })
    }
  },
  mounted() {
    // 如果菜单参数有主题 当前模块就使用该主题查询
    if (transJson(this.$store.state.curNavModule.param5)?.regulationClassName) {
      const index = this.queryConfig.findIndex(item => item.field === 'regulationClass')
      index > -1 && this.queryConfig?.splice(index, 1)
    }
    this.detailType = this.detailData[0]
    this.bussnessId = this.selectBid.toString()
    this.getAgency()
    this.showInfo()
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  created() {
    this.param5 = this.transJson(this.$store.state.curNavModule.param5)
    console.log('this.param5', this.param5)
    this.userInfo = this.$store.state.userInfo
    this.setShowBusinesTree()
    this.$set(this.searchDataList, 'warnStartDate', this.queryData.warnStartDate && moment(this.queryData.warnStartDate).format('YYYY-MM-DD'))
    this.$set(this.searchDataList, 'warnEndDate', this.queryData.warnEndDate && moment(this.queryData.warnEndDate).format('YYYY-MM-DD'))
    this.$set(this.searchDataList, 'dealWarnStartDate', this.queryData.dealWarnStartDate && moment(this.queryData.dealWarnStartDate).format('YYYY-MM-DD'))
    this.$set(this.searchDataList, 'dealWarnEndDate', this.queryData.dealWarnEndDate && moment(this.queryData.dealWarnEndDate).format('YYYY-MM-DD'))
    // 回显时间
    this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'warnStartDate' })].itemRender.props['value'] = this.searchDataList.warnStartDate
    this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'warnEndDate' })].itemRender.props['value'] = this.searchDataList.warnEndDate
    this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'dealWarnStartDate' })].itemRender.props['value'] = this.searchDataList.dealWarnStartDate
    this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'dealWarnEndDate' })].itemRender.props['value'] = this.searchDataList.dealWarnEndDate
  }
}
</script>
<style lang="scss" >
.payVoucherInput {
  margin: 15px;
  .el-card {
    margin-top: 0;
  }
}
.vxe-modal--wrapper .vxe-modal--box {
  z-index: 0;
}
#bigbox {
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.3;
}
.el-row-item .font-set-small .hline {
  width: 72px;
}
.wdetailDialop .T-mainFormListLayout-modulebox .mmc-formlist .mmc-right{
  padding: 0;
}
.wdetailDialop .T-mainFormListLayout-modulebox{
  padding-top: 0 !important;
}
.wdetailDialop .unit-tree-main .el-tree-node__content .custom-node-bg{
  background-color: transparent;
}
</style>
