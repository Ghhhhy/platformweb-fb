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
          @btnClick="operationToolbarButtonClickEvent"
          @tabClick="bsToolbarClickEvent"
        >
          <template v-if="['2','3','4'].includes(tabSelect) && param5.isQuery !== 'true' && param5.isShowBack !== 'false'" v-slot:preBtns>
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
          :table-columns-config="tableColumnsConfigComputed.arr"
          :table-data="tableData"
          :toolbar-config="tableToolbarConfig"
          :cell-style="cellStyle"
          :pager-config="pagerConfig"
          highlight-current-row
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
      :is-flow="isFlow"
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
    <HandleInitialScreeningModal
      v-model="showHandleInitialScreeningModal"
      :selected-data="showDetailData"
      :show-type="showType"
      :bussness-id="bussnessId"
      @close="refresh"
    />
    <FuJianHaiNanModal v-model="showFuJianHaiNanModal" :param5="param5" :selected-row="fuSelectedRow" />
  </vxe-modal>
</template>
<script>
import HttpModule from '@/api/frame/main/fundMonitoring/createProcessing.js'
import HandleInitialScreeningModal from './handleInitialScreeningModal.vue'
import proconf, {
  statusButtons,
  curStatusButton,
  curStatusButton1,
  curStatusButton2,
  curStatusButton3
} from './column.js'
import GlAttachment from './common/GlAttachment'
import ShowDialog from './addDialog.vue'
import transJson from '@/utils/transformMenuQuery'
import { filterText } from '@/utils/customerUtils'
import FuJianHaiNanModal from '@/views/main/fundMonitoring/violationHandle/warningCreate/children/fjHaiNanModeModal.vue'
// import BsTable1 from '@/components/Table/Table.vue'
import moment from 'moment'
const tabSelectActionTypeMap = {
  '1': 'UndoNum',
  '2': 'NormalNum',
  '3': 'DoneNum',
  '4': 'NotRectifiedNum'
}
const sqlWarnLevelForColorFieldMapping = { // 从处室生成/查询过来得colorType
  '1': 'red',
  '2': 'orange',
  '3': 'yellow',
  '4': 'blue',
  '5': 'gray'// 目前只有陕西有灰
}
export default {
  name: 'DetailDialogs',
  components: {
    GlAttachment,
    ShowDialog,
    HandleInitialScreeningModal,
    FuJianHaiNanModal
    // BsTable1
  },
  computed: {
    isZX() { // 判断是专项还是直达资金
      return this.$route.name === 'WarnRegionBySpecial'// 专项
    },
    tabStatusBtnConfig() {
      let firstBtn = [{ label: '生成', code: 'create', status: 'primary' }]
      if (this.transJson(this.$store.state.curNavModule.param5)?.isQuery) {
        firstBtn = []
      } else if (this.$store.getters.isFuJian || this.$store.getters.isQingHai || this.$store.getters.isNeiMeng) {
        firstBtn = [{ label: '初筛', code: 'initialScreening', status: 'primary' }]
      }
      return {
        changeBtns: true,
        buttons: statusButtons,
        curButton: statusButtons.find(item => item.code === this.tabSelect),
        buttonsInfo: {
          1: firstBtn,
          2: [],
          3: [{ label: '整改详情', code: 'show_detail', status: 'primary' }],
          4: []
        }
      }
    },
    curNavModule() {
      return this.$store.state.curNavModule
    },
    tableColumnsConfigComputed() {
      let detailColumns = this.getDetailFormItem()
      let detailAddArr = []
      let arr = Object.assign([], this.tableColumnsConfig)
      if (this.$store.getters.isNeiMeng) {
        detailColumns.forEach(item => {
          let arr2 = arr?.map(item => item.field)
          if (!arr2.includes(item.field)) {
            arr.push(item)
            detailAddArr.push(item)
          }
        })
        arr = arr?.map(item => { return { ...item, sortable: true } })
      }
      return { arr, detailAddArr }
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
    warnLevel: {
      type: String,
      default: ''
    },
    dealLevel: {
      type: String,
      default: ''
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
      tabSelect: '1', // 设置默认
      isFlow: false,
      showHandleInitialScreeningModal: false,
      showFuJianHaiNanModal: false,
      fuSelectedRow: {},
      showType: '',
      param5: {},
      logData: [],
      showLogView: false,
      title: '',
      tableLoadingState: false,
      showDialogVisible: false,
      showDialogTitle: '',
      showDetailData: [],
      isCreate: false,
      isDone: false,
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
      selectData: {},
      showBuinessTree: false,
      leftTreeVisible: false,
      leftTreeFilterText: '',
      treeData: [],
      bussnessId: '7',
      clickRowBussnessId: '',
      treeTypeConfig: {},
      currentNodeKey: '7',
      backType: '',
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
    // 获取追踪项目下拉树
    getPro(fiscalYear = this.$store.state.userInfo?.year) {
      let queryUrl = 'getProSpeTreeData'
      if (!this.isZX) queryUrl = 'getProTreeData'
      HttpModule[queryUrl]({ fiscalYear }).then(res => {
        if (res.code === '000000') {
          let treeResdata = this.getChildrenNewData1(res.data)
          this.queryConfig.forEach(item => {
            if (item.field === 'proCodes') {
              this.$set(item.itemRender, 'options', treeResdata)
              // item.itemRender.options = treeResdata
            }
          })
        } else {
          this.$message.error(res.message)
        }
      })
    },
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
        this.tableColumnsConfig = proconf.getColumns(this.detailType, this.bussnessId, this.showLog, this.regulationClass, this.isFlow)
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
          let tempData = res.data?.map(item => {
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
      if (this.$store.getters.isFuJian) {
        this.showFuJianHaiNanModal = true
        this.fuSelectedRow = val
        return
      }
      this.detailFiRuleCode = val.fiRuleCode || ''
      this.warningCode = val.warningCode || ''
      this.showDialogVisible = true
      this.showDialogTitle = '查看详情信息'
      // this.clickRowBussnessId = val.businessModuleCode
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
      this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'ruleCodes' })].itemRender.props['value'] = val.ruleCodes
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
              this.searchDataList[key]?.split(',').forEach((item) => {
                condition[key].push(item)
              })
            }
          }
        }
      }
      console.log(val, '-------------')
      // this.agencyCodeList = val.agencyCodeList_code__multiple
      this.condition = condition
      this.searchDataList.proCodes = this.searchDataList?.proCodes?.split(',')
      this.searchDataList.proCodes = this.searchDataList.proCodes?.map(item => {
        return item?.split('##')[0]
      })
      console.log(this.searchDataList, this.condition)
      this.queryTableDatas()
    },
    closeHandle(titleName) {
      titleName !== '查看详情信息' && this.queryTableDatas()
      this.showDialogVisible = false
    },
    closeAttachment() {
      this.showGlAttachmentDialog = false
    },
    bsToolbarClickEvent(obj, $this) {
      this.tabSelect = obj.curValue
      const tabSelectActionType = tabSelectActionTypeMap[String(obj.curValue)]
      const colorType = sqlWarnLevelForColorFieldMapping[String(this.warnLevel)]
      this.detailType = colorType + tabSelectActionType
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
        case 'initialScreening': //
          self.handleInitialScreening(obj)
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
      console.log(111, obj)
      let timeFiledList = ['warnStartDate', 'warnEndDate', 'dealWarnStartDate', 'dealWarnEndDate', 'recStartTime', 'recEndTime', 'xPayDateStart', 'xPayDateEnd']
      if (timeFiledList.includes(obj.property)) {
        obj.renderOpts.props.value = moment(obj.itemValue).format('YYYY-MM-DD')
        this.searchDataList[obj.property] = obj.itemValue
      } else {
        this.searchDataList[obj.property] = obj.itemValue
      }
      if (obj.property === 'agencyCodeList') {
        let arr = []
        obj.itemValue && obj.itemValue?.split(',')?.map(v => {
          if (v?.length > 0) {
            arr.push(v?.split('#')[0])
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
    handleInitialScreening(obj) {
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
      this.showDetailData = selection
      this.showType = 'add'
      this.showHandleInitialScreeningModal = true
    },
    handleNormal() {
      let selection = this.$refs.mainTableRef.selection
      if (selection.length === 0) {
        this.$message.success('请选择数据')
        return
      }
      var warnIds = []
      selection.forEach(function (item, index) {
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
      this.searchDataList.payCertNo = ''
      this.searchDataList.warnStartTime = ''
      this.searchDataList.warnTime = ''
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
      // debugger
      this.fiRuleCode = this.detailData[1]
      this.mofDivCode = this.detailData[2]
      this.fiscalYear = this.detailData[3]
      // 这里在获取一个业务类型 然后依据业务类型和具体的状态去动态构造表头数据
      switch (this.detailType) {
        case 'redUndoNum':
          this.tableColumnsConfig = proconf.getColumns('redUndoNum', this.bussnessId, this.showLog, '', this.isFlow)
          this.tabSelect = curStatusButton.curValue
          this.isSign = 0
          this.isNormal = false
          this.isHandle = false
          this.status = null
          this.backType = ''
          this.title = `${this.$store.getters.dict.find(item => item.value === this.warnLevel)?.label}-疑点信息明细`
          break
        case 'redNormalNum':
          this.tableColumnsConfig = proconf.getColumns('redNormalNum', this.bussnessId, this.showLog, '', this.isFlow)
          this.tabSelect = curStatusButton1.curValue
          this.isSign = '1'
          this.status = ''
          this.isNormal = true
          this.isHandle = false
          this.status = null
          this.backType = ''
          this.title = `${this.$store.getters.dict.find(item => item.value === this.warnLevel)?.label}-认定正常明细`
          break
        case 'redNotRectifiedNum':
          // this.tableColumnsConfig = proconf.notRectifiedNum
          this.tableColumnsConfig = proconf.getColumns('redNotRectifiedNum', this.bussnessId, this.showLog, '', this.isFlow)
          this.tabSelect = curStatusButton3.curValue
          this.isNormal = false
          this.isHandle = false
          this.isSign = '2'
          this.status = 7
          this.backType = ''
          this.title = `${this.$store.getters.dict.find(item => item.value === this.warnLevel)?.label}-认定违规-待整改明细`
          break
        case 'redDoneNum':
          // this.tableColumnsConfig = proconf.doneNum
          this.tableColumnsConfig = proconf.getColumns('redDoneNum', this.bussnessId, this.showLog, '', this.isFlow)
          this.tabSelect = curStatusButton2.curValue
          this.isSign = '2'
          this.status = null
          this.isNormal = false
          this.isHandle = false
          this.status = 7
          this.backType = ''
          this.title = `${this.$store.getters.dict.find(item => item.value === this.warnLevel)?.label}-认定违规-已整改明细`
          break
        case 'orangeUndoNum':
          //  this.tableColumnsConfig = proconf.undoNum
          this.tableColumnsConfig = proconf.getColumns('orangeUndoNum', this.bussnessId, this.showLog, '', this.isFlow)
          this.tabSelect = curStatusButton.curValue
          this.isSign = 0
          this.isNormal = false
          this.isHandle = false
          this.status = null
          this.backType = ''
          this.title = `${this.$store.getters.dict.find(item => item.value === this.warnLevel)?.label}-预警数据明细`
          break
        case 'orangeNormalNum':
          // this.tableColumnsConfig = proconf.normalNum
          this.tableColumnsConfig = proconf.getColumns('orangeNormalNum', this.bussnessId, this.showLog, '', this.isFlow)
          this.tabSelect = curStatusButton1.curValue
          this.isSign = 2
          this.isNormal = true
          this.isHandle = false
          this.status = null
          this.backType = ''
          this.title = `${this.$store.getters.dict.find(item => item.value === this.warnLevel)?.label}-认定正常明细`
          break
        case 'orangeNotRectifiedNum':
          // this.tableColumnsConfig = proconf.notRectifiedNum
          this.tableColumnsConfig = proconf.getColumns('orangeNotRectifiedNum', this.bussnessId, this.showLog, '', this.isFlow)
          this.tabSelect = curStatusButton3.curValue
          this.isSign = '2'
          this.isNormal = false
          this.isHandle = true
          this.status = null
          this.backType = '1'
          this.title = `${this.$store.getters.dict.find(item => item.value === this.warnLevel)?.label}-未完成明细`
          break
        case 'orangeDoneNum':
          // this.tableColumnsConfig = proconf.doneNum
          this.tableColumnsConfig = proconf.getColumns('orangeDoneNum', this.bussnessId, this.showLog, '', this.isFlow)
          this.tabSelect = curStatusButton2.curValue
          this.isSign = '2'
          this.isNormal = false
          this.isHandle = false
          this.status = 7
          this.backType = ''
          this.title = `${this.$store.getters.dict.find(item => item.value === this.warnLevel)?.label}-已整改明细`
          break
        case 'yellowUndoNum':
          // this.tableColumnsConfig = proconf.undoNum
          this.tableColumnsConfig = proconf.getColumns('yellowUndoNum', this.bussnessId, this.showLog, '', this.isFlow)
          this.tabSelect = curStatusButton.curValue
          this.isSign = '0'
          this.isNormal = false
          this.isHandle = false
          this.status = null
          this.backType = ''
          this.title = `${this.$store.getters.dict.find(item => item.value === this.warnLevel)?.label}-预警数据明细`
          break
        case 'yellowNormalNum':
          // this.tableColumnsConfig = proconf.normalNum
          this.tableColumnsConfig = proconf.getColumns('yellowNormalNum', this.bussnessId, this.showLog)
          this.tabSelect = curStatusButton1.curValue
          this.isSign = '2'
          this.isNormal = true
          this.isHandle = false
          this.status = null
          this.backType = ''
          this.title = `${this.$store.getters.dict.find(item => item.value === this.warnLevel)?.label}-认定正常明细`
          break
        case 'yellowNotRectifiedNum':
          // this.tableColumnsConfig = proconf.notRectifiedNum
          this.tableColumnsConfig = proconf.getColumns('yellowNotRectifiedNum', this.bussnessId, this.showLog, '', this.isFlow)
          this.tabSelect = curStatusButton3.curValue
          this.isSign = '2'
          this.isNormal = false
          this.isHandle = true
          this.status = null
          this.backType = '1'
          this.title = `${this.$store.getters.dict.find(item => item.value === this.warnLevel)?.label}-未完成明细`
          break
        case 'yellowDoneNum':
          // this.tableColumnsConfig = proconf.doneNum
          this.tableColumnsConfig = proconf.getColumns('yellowDoneNum', this.bussnessId, this.showLog, '', this.isFlow)
          this.tabSelect = curStatusButton2.curValue
          this.isSign = '2'
          this.isNormal = false
          this.isHandle = false
          this.status = 7
          this.backType = ''
          this.title = `${this.$store.getters.dict.find(item => item.value === this.warnLevel)?.label}-已整改明细`
          break
        case 'blueUndoNum':
          // this.tableColumnsConfig = proconf.undoNum
          this.tableColumnsConfig = proconf.getColumns('blueUndoNum', this.bussnessId, this.showLog, '', this.isFlow)
          this.tabSelect = curStatusButton.curValue
          this.isSign = '0'
          this.isNormal = false
          this.isHandle = false
          this.status = null
          this.backType = ''
          this.title = `${this.$store.getters.dict.find(item => item.value === this.warnLevel)?.label}-预警数据明细`
          break
        case 'blueNormalNum':
          // this.tableColumnsConfig = proconf.normalNum
          this.tableColumnsConfig = proconf.getColumns('blueNormalNum', this.bussnessId, this.showLog, '', this.isFlow)
          this.tabSelect = curStatusButton1.curValue
          this.isSign = '2'
          this.isNormal = true
          this.isHandle = false
          this.status = null
          this.backType = ''
          this.title = `${this.$store.getters.dict.find(item => item.value === this.warnLevel)?.label}-认定正常明细`
          break
        case 'blueNotRectifiedNum':// 未完成
          // this.tableColumnsConfig = proconf.notRectifiedNum
          this.tableColumnsConfig = proconf.getColumns('blueNotRectifiedNum', this.bussnessId, this.showLog, '', this.isFlow)
          this.tabSelect = curStatusButton3.curValue
          this.isSign = '2'
          this.isNormal = false
          this.isHandle = true
          this.status = null
          this.backType = '1'
          this.title = `${this.$store.getters.dict.find(item => item.value === this.warnLevel)?.label}-未完成明细`
          break
        case 'blueDoneNum':
          // this.tableColumnsConfig = proconf.doneNum
          this.tableColumnsConfig = proconf.getColumns('blueDoneNum', this.bussnessId, this.showLog, '', this.isFlow)
          this.tabSelect = curStatusButton2.curValue
          this.isSign = '2'
          this.isNormal = false
          this.isHandle = false
          this.status = 7
          this.backType = ''
          this.title = `${this.$store.getters.dict.find(item => item.value === this.warnLevel)?.label}-已整改明细`
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
      // this.tabSelect = this.tabStatusBtnConfig.curButton.code
    },
    queryTableDatas() {
      let curFormData = { ...this.searchDataList }
      if (curFormData['warnTime'] !== null && curFormData['warnTime'] !== undefined && curFormData['warnTime'].toString().length > 8) {
        if (curFormData['warnStartTime'].toString() > curFormData['warnTime'].toString()) {
          this.$message({
            type: 'warning',
            message: '选择违规时间范围时开始时间应小于结束时间，请重新选择!'
          })
          return
        }
      }
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
        warnStartTime: curFormData.warnStartTime,
        warnTime: curFormData.warnTime,
        triggerClass: this.condition.triggerClass ? this.condition.triggerClass[0] : '',
        fiRuleName: this.condition.fiRuleName ? this.condition.fiRuleName[0] : '',
        businessNo: this.condition.businessNo ? this.condition.businessNo[0] : '',
        isFilterByPerm: transJson(this.$store.state.curNavModule.param5)?.isFilterByPerm,
        businessModuleCode: this.bussnessId || undefined,
        proCodes: this.searchDataList.proCodes ? this.searchDataList.proCodes : [],
        roleguid: this.$store.state.curNavModule.roleguid,
        warnStartDate: this.searchDataList.warnStartDate && moment(this.searchDataList.warnStartDate).format('YYYY-MM-DD'),
        warnEndDate: this.searchDataList.warnEndDate && moment(this.searchDataList.warnEndDate).format('YYYY-MM-DD'),
        dealWarnStartDate: this.searchDataList.dealWarnStartDate && moment(this.searchDataList.dealWarnStartDate).format('YYYY-MM-DD'),
        dealWarnEndDate: this.searchDataList.dealWarnEndDate && moment(this.searchDataList.dealWarnEndDate).format('YYYY-MM-DD'),
        payCertNo: this.searchDataList.payCertNo,
        recStartTime: this.searchDataList.recStartTime,
        recEndTime: this.searchDataList.recEndTime,
        xPayDateStart: this.searchDataList.xPayDateStart,
        xPayDateEnd: this.searchDataList.xPayDateEnd,
        roleId: this.$store.state.curNavModule.roleguid,
        menuId: this.$store.state.curNavModule.guid,
        ruleCodes: []
      }
      if (this.searchDataList.ruleCodes && typeof this.searchDataList.ruleCodes === 'string') {
        params.ruleCodes = this.searchDataList.ruleCodes?.split(',')?.map(item => {
          return item?.split('##')[0]
        })
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
        params.warnTime = params.triggerMonitorDate + ' 00:00:00'
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
            this.pagerConfig.total = res.data.totalCount
            if (this.$store.state.userInfo.province.slice(0, 2) === '15') {
              this.tableData = res.data.results?.map(item => {
                let detailFormData = this.pickDetailData({ data: item.executeDataDetailVO })
                return Object.assign({}, item, this.pickObjectField(detailFormData, this.tableColumnsConfigComputed.detailAddArr?.map(item => item.field)))
              })
              this.tableData = this.tableData?.map(item => {
                return {
                  ...item,
                  bgtMofDepCode: item?.executeDataDetailVO?.executeData?.bgtMofDepCode,
                  bgtMofDepName: item?.executeDataDetailVO?.executeData?.bgtMofDepName,
                  manageMofDepCode: item?.executeDataDetailVO?.executeData?.manageMofDepCode
                }
              })
              return
            }
            this.tableData = res.data.results
            this.tableData = this.tableData.map(item => {
              return {
                ...item,
                bgtMofDepCode: item?.executeDataDetailVO?.executeData?.bgtMofDepCode,
                bgtMofDepName: item?.executeDataDetailVO?.executeData?.bgtMofDepName,
                manageMofDepCode: item?.executeDataDetailVO?.executeData?.manageMofDepCode
              }
            })
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
            this.pagerConfig.total = res.data.totalCount
            if (this.$store.state.userInfo.province.slice(0, 2) === '15') {
              this.tableData = res.data.results?.map(item => {
                let detailFormData = this.pickDetailData({ data: item.executeDataDetailVO })
                return Object.assign({}, item, this.pickObjectField(detailFormData, this.tableColumnsConfigComputed.detailAddArr?.map(item => item.field)))
              })
              this.tableData = this.tableData?.map(item => {
                return {
                  ...item,
                  bgtMofDepCode: item?.executeDataDetailVO?.executeData?.bgtMofDepCode,
                  bgtMofDepName: item?.executeDataDetailVO?.executeData?.bgtMofDepName,
                  manageMofDepCode: item?.executeDataDetailVO?.executeData?.manageMofDepCode
                }
              })
              return
            }
            this.tableData = res.data.results
            this.tableData = this.tableData?.map(item => {
              return {
                ...item,
                bgtMofDepCode: item?.executeDataDetailVO?.executeData?.bgtMofDepCode,
                bgtMofDepName: item?.executeDataDetailVO?.executeData?.bgtMofDepName,
                manageMofDepCode: item?.executeDataDetailVO?.executeData?.manageMofDepCode
              }
            })
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
      }
      return style
    },
    transJson(str) {
      if (!str) return
      var params = str?.split(',')
      var result = {}
      if (params && params.length > 0) {
        for (var i = 0; i < params.length; i++) {
          var map = params[i]?.split('=')
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
      this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'recStartTime' })].itemRender.props['value'] = ''
      this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'recEndTime' })].itemRender.props['value'] = ''
      this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'xPayDateStart' })].itemRender.props['value'] = ''
      this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'xPayDateEnd' })].itemRender.props['value'] = ''
      this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'ruleCodes' })].itemRender.props['value'] = ''
      this.$refs.queryFrom.reset()
      this.agencyCodeList = []
      this.searchDataList.agencyCodeList = []
      this.searchDataList.ruleCodes = ''
      if (this.searchDataList.payCertNo) {
        this.searchDataList.payCertNo = ''
      }
      this.searchDataList.businessNo = ''
      this.searchDataList.fiRuleName = ''
      this.searchDataList.regulationClassName = ''
      this.searchDataList.proCodes = ''
      this.searchDataList.triggerClass = ''
      this.searchDataList.warnStartTime = ''
      this.searchDataList.warnTime = ''
      this.searchDataList.warnStartDate = ''
      this.searchDataList.warnEndDate = ''
      this.searchDataList.dealWarnStartDate = ''
      this.searchDataList.dealWarnEndDate = ''
      this.searchDataList.recStartTime = ''
      this.searchDataList.recEndTime = ''
      this.searchDataList.xPayDateStart = ''
      this.searchDataList.xPayDateEnd = ''
      this.condition.agencyCodeList = []
      if (this.condition.payCertNo) {
        this.condition.payCertNo = ''
      }
      this.condition.businessNo = ''
      this.condition.fiRuleName = ''
      this.condition.regulationClassName = ''
      this.condition.proCodes = ''
      this.condition.triggerClass = ''
      this.condition.warnStartTime = ''
      this.condition.warnTime = ''
      this.queryTableDatas()
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property
      this.$refs.mainTableRef.$refs.xGrid.setCurrentRow(obj.row)
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
    pickObjectField(obj = {}, field) {
      let newObj = {}
      Object.keys(obj)?.map(item => {
        if (field.includes(item)) {
          newObj[item] = obj[item]
        }
      })
      return newObj
    },
    //
    pickDetailData(res) {
      let detailData = {}
      if (res.data && res.data.executeData !== null) {
        detailData = Object.assign({}, { ...res.data, ...res.data.executeData })
        detailData.agencyName = res.data.executeData.agencyCode === null ? '' : res.data.executeData?.agencyCode + '-' + res.data.executeData?.agencyName
        detailData.proName = res.data.executeData.proCode === null ? '' : res.data.executeData?.proCode + '-' + res.data.executeData?.proName
        detailData.natureOfFunds = res.data.executeData.fundTypeCode === null ? '' : res.data.executeData?.fundTypeCode + '-' + res.data.executeData?.fundTypeName
        detailData.proCatName = res.data.executeData?.proCatCode === null ? '' : res.data.executeData?.proCatCode + '-' + res.data.executeData?.proCatName || ''
        detailData.deptEconomyType = res.data.executeData?.depBgtEcoCode === null ? '' : res.data.executeData?.depBgtEcoCode + '-' + res.data.executeData?.depBgtEcoName
        detailData.govEconomyType = res.data.executeData?.govBgtEcoCode + '-' + res.data.executeData?.govBgtEcoName
        detailData.settlementMethod = res.data.executeData?.setModeCode + '-' + res.data.executeData?.setModeName
        detailData.directFund = res.data.executeData?.isDirCode === null ? '' : res.data.executeData?.isDirCode + '-' + res.data.executeData?.isDirName || ''
        detailData.salaryMark = res.data.executeData?.isSalCode === null ? '' : res.data.executeData?.isSalCode + '-' + res.data.executeData?.isSalName === null ? '' : res.data.executeData?.isSalName
        detailData.isUnionFunds = filterText(res.data.executeData?.isFunCode, res.data.executeData?.isFunCode === 1 ? '是' : '否')
        detailData.fiDate = res.data.executeData?.fiDate
        detailData.funcType = res.data.executeData?.expFuncCode + '-' + res.data.executeData?.expFuncName
        detailData.businessOffice = res.data.executeData?.manageMofDepCode + '-' + res.data.executeData?.manageMofDepName
        detailData.paymentMethod = res.data.executeData?.payTypeCode + '-' + res.data.executeData?.payTypeName
        detailData.isThrExp = filterText(res.data.executeData?.thrExpCode, res.data.executeData?.thrExpName)
        detailData.proCodes = res.data.executeData && res.data.executeData?.trackProCode && res.data.executeData?.proCodes ? res.data.executeData?.trackProCode + '_' + res.data.executeData?.proCodes : ''
        detailData.useDes = res.data.executeData && res.data.executeData?.useDes
        detailData.payBusType = res.data.executeData.payBusTypeCode === null ? '' : res.data.executeData.payBusTypeCode + '_' + res.data.executeData.payBusTypeName
        detailData.xpayDate = res.data.executeData?.xpayDate
      }
      if (res.data && res.data.payVoucherVo !== null) {
        detailData.payBusType = res.data.payVoucherVo.payBusType
        detailData.todoName = res.data.payVoucherVo.todoName
        detailData.voidOrNot = res.data.payVoucherVo.voidOrNot
      }
      if (res.data && res.data.baBgtInfoEntity !== null) {
        let { agencyCode, agencyName, timeoutIssueType, corBgtDocNo, fiscalYear, recDivName, mofDivName, proCode, proName, recTime, recAmount, allocationAmount, timeoutIssueAmount, timeoutIssueTime, curAmt } = res.data.baBgtInfoEntity
        detailData.agencyName = agencyCode + '-' + agencyName
        detailData.proName = proCode + '-' + proName
        detailData.timeoutIssueType = timeoutIssueType || ''
        detailData.corBgtDocNo = corBgtDocNo || ''
        detailData.fiscalYear = fiscalYear || ''
        detailData.recDivName = recDivName || ''
        detailData.mofDivName = mofDivName || ''
        detailData.proCode = proCode// 项目类别
        detailData.proName = proName || ''
        detailData.recTime = recTime || ''
        detailData.recAmount = recAmount || ''
        detailData.allocationAmount = allocationAmount || ''
        detailData.timeoutIssueAmount = timeoutIssueAmount || ''
        detailData.timeoutIssueTime = timeoutIssueTime || ''
        detailData.curAmt = curAmt || ''

        detailData.corBgtDocNo = res.data.baBgtInfoEntity.corBgtDocNo
        detailData.bgtDocTitle = res.data.baBgtInfoEntity.bgtDocTitle
        detailData.bgtDec = res.data.baBgtInfoEntity.bgtDec
        detailData.proCode = res.data.baBgtInfoEntity.proCode
        detailData.settlementMethod = res.data.baBgtInfoEntity.proName
        detailData.sourceTypeName = res.data.baBgtInfoEntity.sourceTypeName
        detailData.fundTypeName = res.data.baBgtInfoEntity.fundTypeName
        detailData.expFuncName = res.data.baBgtInfoEntity.expFuncName
        detailData.govBgtEcoName = res.data.baBgtInfoEntity.govBgtEcoName
        detailData.bgtMofDepCode = res.data.baBgtInfoEntity.bgtMofDepCode
        detailData.bgtMofDepName = res.data.baBgtInfoEntity.bgtMofDepName
      }
      return detailData
      // this.handletableData = res.data?.regulationList
    },
    getFiRule() {
      const param = {
        fiscalYear: this.$store.state.userInfo.year
      }
      if (this.$store.state.curNavModule.f_FullName?.substring(0, 4) === '直达资金') {
        param.regulationClass = '0201'
      }
      const regulationClass = transJson(this.$store.state.curNavModule.param5)?.regulationClass
      if (regulationClass) {
        param.regulationClass = regulationClass
      }
      HttpModule.getRuleTreeData(param).then(res => {
        if (res.code === '000000') {
          console.log('data', res.data)
          let treeResdata = res.data
          let index = this.queryConfig.findIndex(item => item.field === 'ruleCodes')
          this.queryConfig[index].itemRender.options = treeResdata
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getDetailFormItem() {
      let detailColumns = []
      if (['6', 2, '2'].includes(this.bussnessId)) {
        if (this.regulationClass === '0207') {
          detailColumns = proconf.indexMsgConfig
        } else {
          detailColumns = proconf.bgtMsgConfig
        }
      } else if (!this.param5?.show) {
        detailColumns = proconf.msgConfig.filter(item => {
          return !['payBusType', 'todoName', 'voidOrNot'].includes(item.field)
        })
      }
      // 查看违规详情的form配置和其冲突，列配置将code过滤，单独写
      detailColumns = detailColumns.filter(item => item.field !== 'bgtMofDepCode')
      return detailColumns?.map(item => {
        return { ...item, width: 180 }
      })
    },
    doBack() {
      let selection = this.$refs.mainTableRef.selection
      if (selection.length === 0) {
        this.$message.success('请至少选择一条数据')
        return
      }
      var backIds = []
      selection.forEach(function (item, index) {
        backIds.push({ warnid: item.warnid, dealNo: item.dealNo, dealId: item.dealId })
      })
      let params = {
        reqParams: backIds,
        menuId: this.$store.state.curNavModule.guid,
        type: this.backType
      }
      this.$confirm('确定退回选中数据?', '提示', {
        confirmButtonText: '退回',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableLoading = true
        HttpModule
          .doBack(params)
          .then(res => {
            this.tableLoading = false
            console.log('回退结果', res)
            if (res.code === '000000') {
              this.$message({
                type: 'success',
                message: '退回成功!'
              })
              this.queryTableDatas()
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              })
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
    },
    isXmProject() { // 是否是厦门项目
      return this.$store.getters.isXm
    }
  },
  async mounted() {
    // 如果菜单参数有主题 当前模块就使用该主题查询
    if (transJson(this.$store.state.curNavModule.param5)?.regulationClassName) {
      const index = this.queryConfig.findIndex(item => item.field === 'regulationClass')
      index > -1 && this.queryConfig?.splice(index, 1)
    }
    this.detailType = this.detailData[0]
    console.log('detailType', this.detailType)
    this.bussnessId = this.selectBid.toString()
    let { data } = await HttpModule.getIsFlow()// 判断是不是走工作流
    this.isFlow = data
    this.getAgency()
    this.showInfo()
    this.queryTableDatas()
    console.log(this.tabStatusBtnConfig, 333)
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
    this.getFiRule()
    this.getPro()
    this.$set(this.searchDataList, 'warnStartDate', this.queryData.warnStartDate && moment(this.queryData.warnStartDate).format('YYYY-MM-DD'))
    this.$set(this.searchDataList, 'warnEndDate', this.queryData.warnEndDate && moment(this.queryData.warnEndDate).format('YYYY-MM-DD'))
    this.$set(this.searchDataList, 'dealWarnStartDate', this.queryData.dealWarnStartDate && moment(this.queryData.dealWarnStartDate).format('YYYY-MM-DD'))
    this.$set(this.searchDataList, 'dealWarnEndDate', this.queryData.dealWarnEndDate && moment(this.queryData.dealWarnEndDate).format('YYYY-MM-DD'))
    this.$set(this.searchDataList, 'recStartTime', this.queryData.recStartTime)
    this.$set(this.searchDataList, 'recEndTime', this.queryData.recEndTime)
    this.$set(this.searchDataList, 'xPayDateStart', this.queryData.xPayDateStart)
    this.$set(this.searchDataList, 'xPayDateEnd', this.queryData.xPayDateEnd)
    this.$set(this.searchDataList, 'ruleCodes', this.queryData.ruleCodes)
    this.$set(this.searchDataList, 'proCodes', this.queryData.proCodes)
    // 回显时间
    this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'warnStartDate' })].itemRender.props['value'] = this.searchDataList.warnStartDate
    this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'warnEndDate' })].itemRender.props['value'] = this.searchDataList.warnEndDate
    this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'dealWarnStartDate' })].itemRender.props['value'] = this.searchDataList.dealWarnStartDate
    this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'dealWarnEndDate' })].itemRender.props['value'] = this.searchDataList.dealWarnEndDate
    this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'recStartTime' })].itemRender.props['value'] = this.searchDataList.recStartTime
    this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'recEndTime' })].itemRender.props['value'] = this.searchDataList.recEndTime
    this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'xPayDateStart' })].itemRender.props['value'] = this.searchDataList.xPayDateStart
    this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'xPayDateEnd' })].itemRender.props['value'] = this.searchDataList.xPayDateEnd
    this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'ruleCodes' })].itemRender.props['value'] = this.searchDataList.ruleCodes
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
