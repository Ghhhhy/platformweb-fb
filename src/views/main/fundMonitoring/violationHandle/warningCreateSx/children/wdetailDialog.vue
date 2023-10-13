<template v-loading="tableLoading">
  <vxe-modal
    v-model="detailVisible"
    :title="title"
    width="96%"
    height="90%"
    :show-footer="false"
    @close="dialogClose"
  >
    <BsTabPanel
      is-open
      is-hide-query
      :tab-status-btn-config="tabStatusBtnConfig"
      :tab-status-num-config="tabStatusNumConfig"
      @onQueryConditionsClick="onQueryConditionsClick1"
    />
    <BsQuery
      ref="queryFrom"
      :query-form-item-config="queryConfig"
      :query-form-data="searchDataList"
      @onSearchClick="search"
    />
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
      :default-money-unit="10000"
      style="height: calc(100% - 108px)"
      @ajaxData="ajaxTableData"
      @cellClick="cellClick"
      @onOptionRowClick="onOptionRowClick"
      @onToolbarBtnClick="onToolbarBtnClick"
    >
      <template v-slot:toolbarSlots>
        <div class="table-toolbar-left">
          <div class="table-toolbar-left-title">
            <span class="fn-inline">{{ title }}</span>
            <i class="fn-inline"></i>
          </div>
        </div>
      </template>
    </BsTable>
    <ShowDialog
      v-if="showDialogVisible"
      ref="ShowDialog"
      :title="showDialogTitle"
      :warning-code="selecetedWarningCode"
      :fi-rule-code="selecetedFiRuleCode"
      :is-create="isCreate"
      :is-done="isDone"
      :deal-no="dealNo"
      :detail-data="showDetailData"
      :bussness-id="bussnessId"
      @close="closeHandle"
    />
    <GlAttachment
      v-if="showGlAttachmentDialog"
      :user-info="userInfo"
      :billguid="billguid"
      @close="closeAttachment"
    />
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
  buttons2,
  monitorResultPages
} from './column.js'
import GlAttachment from './common/GlAttachment'
import ShowDialog from './addDialog.vue'

export default {
  name: 'DetailDialogs',
  components: {
    GlAttachment,
    ShowDialog
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
    }
  },
  data() {
    return {
      bussnessId: '7',
      title: '',
      tableLoadingState: false,
      showDialogVisible: false,
      showDialogTitle: '',
      showDetailData: [],
      isCreate: false,
      isDone: false,
      warnLevel: '',
      isSign: null,
      status: null,
      isHandle: false,
      isNormal: false,
      isProcessed: false,
      dealNo: '',
      userInfo: {},
      billguid: '',
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
        showFooter: true
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
          $payVoucherInputGloableOptionRow: proconf.gloableOptionRow,
          $ReportTaskGloableOptionRow: proconf.gloableOptionRowDetial
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
      fiRuleCode1: '',
      mofDivCode: '',
      warningCode: '',
      selectedWarningCode: '',
      selectedFiRuleCode: '',
      tableLoading: false,
      dialogVisibles: false,
      affirmDialogVisibles: false,
      dialogTitle1: '整改意见',
      fiscalYear: '',
      selectData: {}
    }
  },
  methods: {
    // table 右侧操作按钮
    onOptionRowClick({ row, optionType }, context) {
      switch (optionType) {
        // 附件
        case 'attachment':
          this.showAttachment(row)
          break
        case 'show':
          this.show(row)
          break
        default:
      }
    },
    // 查看附件
    showAttachment(row) {
      console.log('查看附件', row)
      if (row.attachmentid1 === null && row.attachmentid3 === null) {
        this.$message.warning('该数据无附件')
        return
      }
      this.billguid = row.attachmentid1 === null ? row.attachmentid3 : row.attachmentid1
      this.showGlAttachmentDialog = true
    },
    // 查看详情
    show(val) {
      this.selecetedFiRuleCode = val.fiRuleCode || ''
      this.selecetedWarningCode = val.warningCode || ''
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
      this.searchDataList = val
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
      this.agencyCodeList = val.agencyCodeList_code__multiple
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
        // this.title = '红色预警-未处理明细'
        // this.detailType = 'redUndoNum'
        this.tableColumnsConfig = proconf.undoNum
        this.tabStatusBtnConfig.curButton = curStatusButton
        switch (this.colourType) {
          case '1':
            this.detailType = 'yellowUndoNum'
            break
          case '2':
            this.detailType = 'orangeUndoNum'
            break
          case '3':
            this.detailType = 'redUndoNum'
            break
          case '4':
            this.detailType = 'greyUndoNum'
            break
          case '5':
            this.detailType = 'blueUndoNum'
            break
          default :
            break
        }
      } else if (this.tabSelect === '2') {
        this.tableColumnsConfig = proconf.undoNum
        this.tabStatusBtnConfig.curButton = curStatusButton1
        switch (this.colourType) {
          case '1':
            this.detailType = 'yellowNormalNum'
            break
          case '2':
            this.detailType = 'orangeNormalNum'
            break
          case '3':
            this.detailType = 'redNormalNum'
            break
          case '4':
            this.detailType = 'greyNormalNum'
            break
          case '5':
            this.detailType = 'blueNormalNum'
            break
          default :
            break
        }
      } else if (this.tabSelect === '3') {
        this.tableColumnsConfig = proconf.doneNum
        this.tabStatusBtnConfig.curButton = curStatusButton2
        switch (this.colourType) {
          case '1':
            this.detailType = 'yellowDoneNum'
            break
          case '2':
            this.detailType = 'orangeDoneNum'
            break
          case '3':
            this.detailType = 'redDoneNum'
            break
          case '4':
            this.detailType = 'greyDoneNum'
            break
          case '5':
            this.detailType = 'blueDoneNum'
            break
          default :
            break
        }
      } else if (this.tabSelect === '4') {
        this.tableColumnsConfig = proconf.notRectifiedNum
        this.tabStatusBtnConfig.curButton = curStatusButton3
        switch (this.colourType) {
          case '1':
            this.detailType = 'yellowNotRectifiedNum'
            break
          case '2':
            this.detailType = 'orangeNotRectifiedNum'
            break
          case '3':
            this.detailType = 'redNotRectifiedNum'
            break
          case '4':
            this.detailType = 'greyNotRectifiedNum'
            break
          case '5':
            this.detailType = 'blueNotRectifiedNum'
            break
          default :
            break
        }
      }
      this.condition = {}
      this.pagerConfig.currentPage = 1
      this.$refs.mainTableRef.$refs.xGrid.clearScroll()
      this.tabShowInfo()
      this.queryTableDatas()
      this.params.status = this.tabSelect === '1' ? '0' : '1'
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
        case 'queryBusinessData': // 联查业务数据
          self.queryBusinessData(obj)
          break
        // 查看详情
        case 'show_detail':
          this.showDetail()
          break
        default:
          break
      }
    },
    queryBusinessData() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.showDetailData = selection
      this.showDialogVisible = true
      this.showDialogTitle = '业务数据信息'
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
    async handleCreate() {
      let selection = this.$refs.mainTableRef.selection
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      await this.getDealNo()
      this.selectedFiRuleCode = selection[0].fiRuleCode || ''
      this.selectedWarningCode = selection[0].warningCode || ''
      let code = this.selectedWarningCode + '/' + this.selectedFiRuleCode
      HttpModule.budgetgetDetail(code).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          if (res.data.payVoucherVo !== null) {
            if (res.data.payVoucherVo.voidOrNot === '是') {
              this.$confirm('此操作将生成并下发已作废的数据, 是否继续?', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.isDone = false
                this.isCreate = true
                this.showDetailData = selection
                this.showDialogVisible = true
                this.showDialogTitle = '监控问询单信息'
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                })
              })
            } else {
              this.isDone = false
              this.isCreate = true
              this.showDetailData = selection
              this.showDialogVisible = true
              this.showDialogTitle = '监控问询单信息'
            }
          } else {
            this.$confirm('此操作将生成并下发作废字段为空的数据, 是否继续?', '提示', {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.isDone = false
              this.isCreate = true
              this.showDetailData = selection
              this.showDialogVisible = true
              this.showDialogTitle = '监控问询单信息'
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              })
            })
          }
          this.handletableData = res.data?.regulationList
        } else {
          this.$message.error(res.message)
        }
      })
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
    tabShowInfo() {
      this.fiRuleCode = this.detailData[1]
      this.mofDivCode = this.detailData[2]
      this.fiscalYear = this.detailData[3]
      this.fiRuleCode1 = this.detailData[4]
      console.log('this.detailType', this.detailType)
      switch (this.detailType) {
        case 'orangeUndoNum':
          this.tableColumnsConfig = proconf.undoNum
          // this.tabStatusBtnConfig.curButton = curStatusButton
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
          this.tableColumnsConfig = proconf.normalNum
          // this.tabStatusBtnConfig.curButton = curStatusButton1
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
          this.tableColumnsConfig = proconf.notRectifiedNum
          // this.tabStatusBtnConfig.curButton = curStatusButton2
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '2'
          this.isSign = 2
          this.isNormal = false
          this.isHandle = true
          this.isProcessed = false
          this.status = null
          this.title = '未完成明细'
          break
        case 'orangeDoneNum':
          this.tableColumnsConfig = proconf.doneNum
          // this.tabStatusBtnConfig.curButton = curStatusButton3
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '2'
          this.isSign = 2
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = 7
          this.title = '已整改明细'
          break
        case 'yellowUndoNum':
          this.tableColumnsConfig = proconf.undoNum
          // this.tabStatusBtnConfig.curButton = curStatusButton
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '1'
          this.isSign = 0
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '预警数据明细'
          break
        case 'yellowNormalNum':
          this.tableColumnsConfig = proconf.normalNum
          // this.tabStatusBtnConfig.curButton = curStatusButton1
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '1'
          this.isSign = '2'
          this.isNormal = true
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '认定正常明细'
          break
        case 'yellowNotRectifiedNum':
          this.tableColumnsConfig = proconf.notRectifiedNum
          // this.tabStatusBtnConfig.curButton = curStatusButton2
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '1'
          this.isSign = 2
          this.isNormal = false
          this.isHandle = true
          this.isProcessed = false
          this.status = null
          this.title = '未完成明细'
          break
        case 'yellowDoneNum':
          this.tableColumnsConfig = proconf.doneNum
          // this.tabStatusBtnConfig.curButton = curStatusButton3
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '1'
          this.isSign = 2
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = 7
          this.title = '已整改明细'
          break
        case 'blueUndoNum':
          this.tableColumnsConfig = proconf.undoNum
          // this.tabStatusBtnConfig.curButton = curStatusButton
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '5'
          this.isSign = 0
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '预警数据明细'
          break
        case 'blueNormalNum':
          this.tableColumnsConfig = proconf.normalNum
          this.tabStatusBtnConfig.curButton = curStatusButton1
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '5'
          this.isSign = 2
          this.isNormal = true
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '认定正常明细'
          break
        case 'blueNotRectifiedNum':
          this.tableColumnsConfig = proconf.notRectifiedNum
          // this.tabStatusBtnConfig.curButton = curStatusButton3
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '5'
          this.isSign = 2
          this.isNormal = false
          this.isHandle = true
          this.isProcessed = false
          this.status = null
          this.title = '未完成明细'
          break
        case 'blueDoneNum':
          this.tableColumnsConfig = proconf.doneNum
          // this.tabStatusBtnConfig.curButton = curStatusButton2
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '5'
          this.isSign = 2
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = 7
          this.title = '已整改明细'
          break
        case 'redUndoNum':
          this.tableColumnsConfig = proconf.undoNum
          // this.tabStatusBtnConfig.curButton = curStatusButton
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '3'
          this.isSign = 0
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '预警数据明细'
          break
        case 'redNormalNum':
          this.tableColumnsConfig = proconf.normalNum
          // this.tabStatusBtnConfig.curButton = curStatusButton1
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '3'
          this.isSign = 2
          this.isNormal = true
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '认定正常明细'
          break
        case 'redNotRectifiedNum':
          this.tableColumnsConfig = proconf.notRectifiedNum
          // this.tabStatusBtnConfig.curButton = curStatusButton3
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '3'
          this.isSign = 2
          this.isNormal = false
          this.isHandle = true
          this.isProcessed = false
          this.status = null
          this.title = '未完成明细'
          break
        case 'redDoneNum':
          this.tableColumnsConfig = proconf.doneNum
          // this.tabStatusBtnConfig.curButton = curStatusButton2
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '3'
          this.isSign = 2
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = 7
          this.title = '已整改明细'
          break
        case 'greyUndoNum':
          this.tableColumnsConfig = proconf.undoNum
          // this.tabStatusBtnConfig.curButton = curStatusButton
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '4'
          this.isSign = 0
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '预警数据明细'
          break
        case 'greyNormalNum':
          this.tableColumnsConfig = proconf.normalNum
          // this.tabStatusBtnConfig.curButton = curStatusButton1
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '4'
          this.isSign = 2
          this.isNormal = true
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '认定正常明细'
          break
        case 'greyNotRectifiedNum':
          this.tableColumnsConfig = proconf.notRectifiedNum
          // this.tabStatusBtnConfig.curButton = curStatusButton3
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '4'
          this.isSign = 2
          this.isNormal = false
          this.isHandle = true
          this.isProcessed = false
          this.status = null
          this.title = '未完成明细'
          break
        case 'greyDoneNum':
          this.tableColumnsConfig = proconf.doneNum
          // this.tabStatusBtnConfig.curButton = curStatusButton2
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '4'
          this.isSign = 2
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = 7
          this.title = '已整改明细'
          break
        default:
          break
      }
      switch (this.warnLevel) {
        case '2':
          this.title = '橙色预警-' + this.title
          break
        case '1':
          this.title = '黄色预警-' + this.title
          break
        case '3':
          this.title = '红色预警-' + this.title
          break
        case '4':
          this.title = '灰色预警-' + this.title
          break
        case '5':
          this.title = '蓝色预警-' + this.title
          break
        default:
          break
      }
    },
    showInfo() {
      this.fiRuleCode = this.detailData[1]
      this.mofDivCode = this.detailData[2]
      this.fiscalYear = this.detailData[3]
      this.fiRuleCode1 = this.detailData[4]
      console.log('this.detailType', this.detailType)
      switch (this.detailType) {
        case 'orangeUndoNum':
          this.tableColumnsConfig = proconf.undoNum
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
          this.tableColumnsConfig = proconf.normalNum
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
          this.tableColumnsConfig = proconf.notRectifiedNum
          this.tabStatusBtnConfig.curButton = curStatusButton3
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '2'
          this.isSign = 2
          this.isNormal = false
          this.isHandle = true
          this.isProcessed = false
          this.status = null
          this.title = '未完成明细'
          break
        case 'orangeDoneNum':
          this.tableColumnsConfig = proconf.doneNum
          this.tabStatusBtnConfig.curButton = curStatusButton2
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '2'
          this.isSign = 2
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = 7
          this.title = '已整改明细'
          break
        case 'yellowUndoNum':
          this.tableColumnsConfig = proconf.undoNum
          this.tabStatusBtnConfig.curButton = curStatusButton
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '1'
          this.isSign = 0
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '预警数据明细'
          break
        case 'yellowNormalNum':
          this.tableColumnsConfig = proconf.normalNum
          this.tabStatusBtnConfig.curButton = curStatusButton1
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '1'
          this.isSign = '2'
          this.isNormal = true
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '认定正常明细'
          break
        case 'yellowNotRectifiedNum':
          this.tableColumnsConfig = proconf.notRectifiedNum
          this.tabStatusBtnConfig.curButton = curStatusButton3
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '1'
          this.isSign = 2
          this.isNormal = false
          this.isHandle = true
          this.isProcessed = false
          this.status = null
          this.title = '未完成明细'
          break
        case 'yellowDoneNum':
          this.tableColumnsConfig = proconf.doneNum
          this.tabStatusBtnConfig.curButton = curStatusButton2
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '1'
          this.isSign = 2
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = 7
          this.title = '已整改明细'
          break
        case 'blueUndoNum':
          this.tableColumnsConfig = proconf.undoNum
          this.tabStatusBtnConfig.curButton = curStatusButton
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '5'
          this.isSign = 0
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '预警数据明细'
          break
        case 'blueNormalNum':
          this.tableColumnsConfig = proconf.normalNum
          this.tabStatusBtnConfig.curButton = curStatusButton1
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '5'
          this.isSign = 2
          this.isNormal = true
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '认定正常明细'
          break
        case 'blueNotRectifiedNum':
          this.tableColumnsConfig = proconf.notRectifiedNum
          this.tabStatusBtnConfig.curButton = curStatusButton3
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '5'
          this.isSign = 2
          this.isNormal = false
          this.isHandle = true
          this.isProcessed = false
          this.status = null
          this.title = '未完成明细'
          break
        case 'blueDoneNum':
          this.tableColumnsConfig = proconf.doneNum
          this.tabStatusBtnConfig.curButton = curStatusButton2
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '5'
          this.isSign = 2
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = 7
          this.title = '已整改明细'
          break
        case 'redUndoNum':
          this.tableColumnsConfig = proconf.undoNum
          this.tabStatusBtnConfig.curButton = curStatusButton
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '3'
          this.isSign = 0
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '预警数据明细'
          break
        case 'redNormalNum':
          this.tableColumnsConfig = proconf.normalNum
          this.tabStatusBtnConfig.curButton = curStatusButton1
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '3'
          this.isSign = 2
          this.isNormal = true
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '认定正常明细'
          break
        case 'redNotRectifiedNum':
          this.tableColumnsConfig = proconf.notRectifiedNum
          this.tabStatusBtnConfig.curButton = curStatusButton3
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '3'
          this.isSign = 2
          this.isNormal = false
          this.isHandle = true
          this.isProcessed = false
          this.status = null
          this.title = '未完成明细'
          break
        case 'redDoneNum':
          this.tableColumnsConfig = proconf.doneNum
          this.tabStatusBtnConfig.curButton = curStatusButton2
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '3'
          this.isSign = 2
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = 7
          this.title = '已整改明细'
          break
        case 'greyUndoNum':
          this.tableColumnsConfig = proconf.undoNum
          this.tabStatusBtnConfig.curButton = curStatusButton
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '4'
          this.isSign = 0
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '预警数据明细'
          break
        case 'greyNormalNum':
          this.tableColumnsConfig = proconf.normalNum
          this.tabStatusBtnConfig.curButton = curStatusButton1
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '4'
          this.isSign = 2
          this.isNormal = true
          this.isHandle = false
          this.isProcessed = false
          this.status = null
          this.title = '认定正常明细'
          break
        case 'greyNotRectifiedNum':
          this.tableColumnsConfig = proconf.notRectifiedNum
          this.tabStatusBtnConfig.curButton = curStatusButton3
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '4'
          this.isSign = 2
          this.isNormal = false
          this.isHandle = true
          this.isProcessed = false
          this.status = null
          this.title = '未完成明细'
          break
        case 'greyDoneNum':
          this.tableColumnsConfig = proconf.doneNum
          this.tabStatusBtnConfig.curButton = curStatusButton2
          this.tabStatusBtnConfig.buttons = statusButtons
          this.warnLevel = '4'
          this.isSign = 2
          this.isNormal = false
          this.isHandle = false
          this.isProcessed = false
          this.status = 7
          this.title = '已整改明细'
          break
        default:
          break
      }
      switch (this.warnLevel) {
        case '2':
          this.title = '橙色预警-' + this.title
          break
        case '1':
          this.title = '黄色预警-' + this.title
          break
        case '3':
          this.title = '红色预警-' + this.title
          break
        case '4':
          this.title = '灰色预警-' + this.title
          break
        case '5':
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
        warnStartTime: this.condition.warnStartTime ? this.condition.warnStartTime[0] : '',
        triggerClass: this.condition.triggerClass ? this.condition.triggerClass[0] : '',
        fiRuleName: this.condition.fiRuleName ? this.condition.fiRuleName[0] : '',
        businessNo: this.condition.businessNo ? this.condition.businessNo[0] : '',
        dealNo: this.condition.dealNo ? this.condition.dealNo[0] : ''
      }
      if (this.$store.state.curNavModule.f_FullName.substring(0, 4) === '直达资金') {
        params.regulationClass = '0201'
      }

      const regulationClass = this.transJson(this.$store.state.curNavModule.param5)?.regulationClass
      if (regulationClass) {
        params.regulationClass = regulationClass
      }

      console.log('fiRuleCode:', this.fiRuleCode)
      console.log('mofDivCode:', this.mofDivCode)
      if (this.fiRuleCode === null || this.fiRuleCode === '') {
        params.mofDivCode = this.mofDivCode
        params.fiRuleCode = this.fiRuleCode1
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
            this.tableData.forEach(item => {
              if (item.warnLevel === 1) {
                item.warnLevel = '<span style="color:#BBBB00">黄色预警</span>'
              } else if (item.warnLevel === 2) {
                item.warnLevel = '<span style="color:orange">橙色预警</span>'
              } else if (item.warnLevel === 3) {
                item.warnLevel = '<span style="color:red">红色预警</span>'
              } else if (item.warnLevel === 5) {
                item.warnLevel = '<span style="color:blue">蓝色预警</span>'
              } else if (item.warnLevel === 4) {
                item.warnLevel = '<span style="color:gray">灰色预警</span>'
              }
            })
            this.pagerConfig.total = res.data.totalCount
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        params.fiRuleCode = this.fiRuleCode
        // 根据参数判断权限，监控预警结果查询用区划权限，生成用本级区划权限
        if (monitorResultPages.includes(this.$route.name) || ['CreateProcessingBySpecial', 'CreateProcessing'].includes(this.$route.name)) {
          params.monitorResultPages = '1'
        }
        this.tableLoadingState = true
        HttpModule.querySum(params).then(res => {
          if (res.code === '000000') {
            this.tableFooterConfig.totalObj = res.data ? res.data[0] : 0
          } else {
            this.$message.error(res.result)
          }
        })
        let createProcessingAxios = 'queryWarning'
        const ruleMap = {
          0: this.$route.name.indexOf('CreateProcessing') > -1,
          1: this.$route.name.indexOf('QueryProcessingBySpecial') > -1
        }
        if (Object.keys(ruleMap).some(item => item)) { // 违规单生成的时候  需要更换切口 违规单查询（全辖查询）不变
          createProcessingAxios = 'queryDetailDatas'
        }
        console.log(789, this.$route.name)
        HttpModule[createProcessingAxios](params).then((res) => {
          this.tableLoadingState = false
          if (res.code === '000000') {
            this.tableData = res.data.results
            this.tableData.forEach(item => {
              if (item.warnLevel === 1) {
                item.warnLevel = '<span style="color:#BBBB00">黄色预警</span>'
              } else if (item.warnLevel === 2) {
                item.warnLevel = '<span style="color:orange">橙色预警</span>'
              } else if (item.warnLevel === 3) {
                item.warnLevel = '<span style="color:red">红色预警</span>'
              } else if (item.warnLevel === 5) {
                item.warnLevel = '<span style="color:blue">蓝色预警</span>'
              } else if (item.warnLevel === 4) {
                item.warnLevel = '<span style="color:gray">灰色预警</span>'
              }
            })
            this.pagerConfig.total = res.data.totalCount
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    getAgency() {
      const param = {
        wheresql: 'and province =' + this.$store.state.userInfo.province,
        elementCode: 'AGENCY',
        // elementCode: 'AGENCY',
        year: this.$store.state.userInfo.year,
        province: this.$store.state.userInfo.province
      }
      HttpModule.getTreewhere(param).then(res => {
        let treeResdata = this.getChildrenNewData1(res.data)
        let index = this.queryConfig.findIndex(item => item.field === 'agencyCodeList')
        this.queryConfig[index].itemRender.options = treeResdata
      })
    },
    getDealNo() {
      return HttpModule.queryDealNo().then(res => {
        this.dealNo = res.data
      })
    },
    getChildrenNewData1(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.name
        item.id = item.guid
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
      if (['detail'].includes(column.property)) {
        return {
          color: '#4293F4',
          textDecoration: 'underline'
        }
      }
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
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property
      switch (key) {
        case 'detail':
          this.handleDetail('detail', obj.row.diBillId, obj.row.mofDivCode)
          this.$parent.sDetailTitle = '详细信息'
          break
      }
    }
  },
  mounted() {
    this.detailType = this.detailData[0]
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
    this.bussnessId = this.selectBid.toString()
    if (monitorResultPages.includes(this.$route.name)) {
      this.tabStatusBtnConfig.buttonsInfo['1'] = []
    }
  }
}
</script>
<style lang="scss">
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
</style>
