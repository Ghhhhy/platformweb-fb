<!--惠企利民明细-->
<template v-loading="tableLoading">
  <vxe-modal
    v-model="detailVisible"
    :title="title"
    width="96%"
    height="90%"
    :show-footer="false"
    @close="dialogClose"
  >
    <div style="height: calc(100% - 120px)">
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
        :footer-config="tableFooterConfig"
        :table-config="tableConfig"
        :table-columns-config="tableColumnsConfig"
        :table-data="tableData"
        :toolbar-config="tableToolbarConfig"
        :cell-style="cellStyle"
        :pager-config="pagerConfig"
        :default-money-unit="10000"
        @cellClick="cellClick"
        @ajaxData="ajaxTableData"
        @onOptionRowClick="onOptionRowClick"
        @onToolbarBtnClick="onToolbarBtnClick"
      >
        <template v-slot:toolbarSlots>
          <div class="table-toolbar-left">
            <div class="table-toolbar-left-title">
              <span class="fn-inline">{{ title }}(单位:万元)</span>
              <i class="fn-inline"></i>
            </div>
          </div>
        </template>
      </BsTable>
    </div>
    <AddDialogs
      v-if="dialogVisibles"
      :title="dialogTitle1"
      :select-data="selectData"
      :select-ids="selectIds"
      @close="closeHandle"
    />
    <AffirmDialogs
      v-if="affirmDialogVisibles"
      :title="dialogTitle1"
      :select-data="selectData"
      :select-ids="selectIds"
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
import HttpModule from '@/api/frame/main/fundMonitoring/warningResultHandleRule.js'
import proconf, {
  buttons1,
  buttons2,
  curStatusButton,
  statusButtons,
  curStatusButton3,
  curStatusButton4,
  curStatusButton1,
  statusButtons1,
  statusButtons0,
  // statusButtons3,
  // curStatusButton8,
  // curStatusButton9,
  curStatusButton10,
  // curStatusButton12,
  // curStatusButton15,
  // curStatusButton14,
  // curStatusButton13,
  curStatusButton11, curStatusButton5, curStatusButton6
} from './column.js'
import AddDialogs from './children/AddDialogs'
import AffirmDialogs from './children/AffirmDialogs'
import GlAttachment from './common/GlAttachment'
import { BENEFIT_ENTERPRISES_AND_PEOPLE_FI_RULE_CODE } from '@/common/model/data'
export default {
  name: 'DetailDialogs',
  components: {
    AddDialogs,
    GlAttachment,
    AffirmDialogs
  },
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    detailData: {
      type: Array,
      default() {
        return []
      }
    },
    propsAffirmTimeEndDate: {
      type: String,
      default: ''
    },
    propsAffirmTimeStartDate: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectIds: [],
      userInfo: {},
      billguid: '',
      showGlAttachmentDialog: false,
      tabStatusBtnConfig: {
        // changeBtns: true,
        buttons: statusButtons,
        curButton: curStatusButton,
        buttonsInfo: this.detailData[1] === BENEFIT_ENTERPRISES_AND_PEOPLE_FI_RULE_CODE ? [] : this.$store.state.curNavModule.name === '直达资金监控预警结果' ? buttons2 : buttons1,
        methods: {
          bsToolbarClickEvent: this.bsToolbarClickEvent
        }
      },
      tabStatusNumConfig: {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0,
        '8': 0,
        '9': 0,
        '10': 0,
        '11': 0,
        '12': 0,
        '13': 0
      },
      onQueryConditionsClick1(isOpen) {
        this.isShowQueryConditions = isOpen
      },
      isShowQueryConditions: true,
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      detailVisible: true,
      tableFooterConfig: {
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
          $payVoucherInputGloableOptionRow: proconf.gloableOptionRow,
          $payVoucherInputGloableOptionRow1: proconf.gloableOptionRow1
        },
        methods: {
          onOptionRowClick: this.onOptionRowClick
        }
      },
      params: {},
      condition: {},
      sDetailTitle: '',
      sDetailVisible: false,
      sDetailData: [],
      detailType: '',
      mofDivCode: '',
      tableLoading: false,
      dialogVisibles: false,
      affirmDialogVisibles: false,
      dialogTitle1: '整改意见',
      fiscalYear: '',
      selectData: {},
      trackProCodes: []
    }
  },
  methods: {
    // table 右侧操作按钮
    onOptionRowClick({ row, optionType }, context) {
      console.log(row.dfrFileCode)
      switch (optionType) {
        // 附件
        case 'attachment':
          this.showAttachment(row)
          break
        case 'attachment1':
          this.showAttachment1(row)
          break
        default:
      }
    },
    // 查看附件
    showAttachment(row) {
      console.log('查看整改附件', row)
      if (row.dfrFileCode === null || row.dfrFileCode === '') {
        this.$message.warning('该数据无附件')
        return
      }
      this.billguid = row.dfrFileCode
      this.showGlAttachmentDialog = true
    },
    // 查看附件
    showAttachment1(row) {
      console.log('查看认定附件', row)
      if (row.affirmFileCode === null || row.affirmFileCode === '') {
        this.$message.warning('该数据无附件')
        return
      }
      this.billguid = row.affirmFileCode
      this.showGlAttachmentDialog = true
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.pagerConfig.currentPage = currentPage
      this.pagerConfig.pageSize = pageSize
      this.refresh()
    },
    refresh() {
      this.queryTableDatas(this.detailType, this.mofDivCode)
      // this.queryTableDatasCount()
    },
    // 搜索
    search(val) {
      this.searchDataList = val
      console.log(val)
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
      this.condition = condition
      this.queryTableDatas(this.detailType, this.mofDivCode)
    },
    closeHandle() {
      this.queryTableDatas(this.detailType, this.mofDivCode)
      this.dialogVisibles = false
      this.affirmDialogVisibles = false
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
      let diffColumns = []
      if (this.tabSelect === '1') {
        this.title = '红灯-未处理明细'
        this.detailType = 'numbernofileNum'
        diffColumns = proconf.redUndoNum
      } else if (this.tabSelect === '2') {
        this.title = '红灯-已整改明细'
        this.detailType = 'numberfileNum'
        diffColumns = proconf.redDoneNum
      } else if (this.tabSelect === '5') {
        this.title = '黄灯-未处理明细'
        this.detailType = 'numberwarnUndoNum'
        diffColumns = proconf.orangeUndoNum
      } else if (this.tabSelect === '6') {
        this.title = '黄灯-已认定明细'
        this.detailType = 'numberwarndoNum'
        diffColumns = proconf.orangeDoneNum
      } else if (this.tabSelect === '7') {
        this.title = '黄灯-认定违规-未处理明细'
        this.detailType = 'numberwarnUndoNoNum'
        diffColumns = proconf.yellowUndoNum
      } else if (this.tabSelect === '8') {
        this.title = '黄灯-认定违规-已认定明细'
        diffColumns = proconf.yellowDoneNum
        this.detailType = 'numberwarndidNum'
      } else if (this.tabSelect === '9') {
        this.title = '黄色警铃-未处理明细'
        this.detailType = 'numberhqlmUndoNum'
        diffColumns = proconf.yellowUndoNumw
      } else if (this.tabSelect === '10') {
        this.title = '黄色警铃-已整改明细'
        this.detailType = 'numberhqlmdoNum'
        diffColumns = proconf.yellowDoneNumw
      } else {
        this.tableColumnsConfig1 = this.tableColumnsConfig
        this.params.status = '1'
      }
      this.tableColumnsConfig = diffColumns
      if (this.$store.getters.isFuJian) { // 福建个性化需求
        const specialColumns = [
          {
            title: '资金归口',
            field: 'bgtMofDepName',
            width: 140,
            align: 'left',
            filters: false
          }
        ]
        this.tableColumnsConfig = diffColumns.concat(specialColumns)
      }
      this.condition = {}
      this.pagerConfig.currentPage = 1
      this.refresh()
      this.$refs.mainTableRef.$refs.xGrid.clearScroll()
      // this.params.status = this.tabSelect === '1' ? '0' : '1'
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      console.log(obj.code)
      const selection = this.$refs.mainTableRef.selection
      switch (obj.code) {
        // 整改意见
        case 'rectify_ask':
          if (selection.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          this.selectData = selection[0]
          this.updateRectifyAsk(0)
          break
        case 'batch_rectify_ask':
          if (selection.length === 0) {
            this.$message.warning('请至少选择一条数据')
            return
          }
          this.selectData = selection[0]
          this.updateRectifyAsk(1)
          break
        // 整改意见
        case 'rectify_ask_update':
          if (selection.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          this.selectData = selection[0]
          this.updateRectifyAskup()
          break
        // 人工认定
        case 'peo_set':
          if (selection.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          let title = '认定处理单'
          this.selectData = selection[0]
          this.affirm(title)
          break
        // 人工认定
        case 'peo_set_update':
          if (selection.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          this.selectData = selection[0]
          this.affirmUpdate()
          break
        // 批量认定
        case 'batch_set':
          if (selection.length < 1) {
            this.$message.warning('请至少选择一条数据')
            return
          }
          let stitle = '批量认定处理单'
          this.selectData = selection[0]
          this.selectIds = selection.map((item, index, array) => {
            return item.diBillId
          })
          this.affirm(stitle)
          break
        default:
          break
      }
    },
    updateRectifyAsk(type = 0) {
      let prefixStr = ''
      if (type === 1) {
        prefixStr = '批量'
      }
      this.dialogVisibles = true
      this.dialogTitle1 = `${prefixStr}整改处理单`
    },
    updateRectifyAskup() {
      this.dialogVisibles = true
      this.dialogTitle1 = '修改整改处理单'
    },
    affirm(title) {
      this.affirmDialogVisibles = true
      this.dialogTitle1 = title
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
    showInfo() {
      // this.tableData = this.detailData
      this.detailType = this.detailData[0]
      this.mofDivCode = this.detailData[1]
      this.fiscalYear = this.detailData[2]
      this.trackProCodes = this.detailData[3]
      let diffColumns = []
      switch (this.title) {
        case '红灯-未处理明细':
          diffColumns = proconf.redUndoNum
          this.tabStatusBtnConfig.buttons = statusButtons
          this.tabStatusBtnConfig.curButton = curStatusButton
          break
        case '红灯-已整改明细':
          diffColumns = proconf.redDoneNum
          this.tabStatusBtnConfig.buttons = statusButtons
          this.tabStatusBtnConfig.curButton = curStatusButton1
          break
        case '黄灯-未处理明细':
          diffColumns = proconf.orangeUndoNum
          this.tabStatusBtnConfig.buttons = statusButtons1
          this.tabStatusBtnConfig.curButton = curStatusButton3
          break
        case '黄灯-已认定明细':
          diffColumns = proconf.orangeDoneNum
          this.tabStatusBtnConfig.buttons = statusButtons1
          this.tabStatusBtnConfig.curButton = curStatusButton4
          break
        case '黄灯-认定违规-未处理明细':
          diffColumns = proconf.yellowUndoNum
          this.tabStatusBtnConfig.buttons = statusButtons1
          this.tabStatusBtnConfig.curButton = curStatusButton5
          break
        case '黄灯-认定违规-已认定明细':
          diffColumns = proconf.yellowDoneNum
          this.tabStatusBtnConfig.buttons = statusButtons1
          this.tabStatusBtnConfig.curButton = curStatusButton6
          break
        case '黄色警铃-未处理明细':
          diffColumns = proconf.yellowUndoNumw
          this.tabStatusBtnConfig.curButton = curStatusButton10
          this.tabStatusBtnConfig.buttons = statusButtons0
          break
        case '黄色警铃-已整改明细':
          diffColumns = proconf.yellowDoneNumw
          this.tabStatusBtnConfig.curButton = curStatusButton11
          this.tabStatusBtnConfig.buttons = statusButtons0
          break
        default:
          break
      }
      this.tableColumnsConfig = diffColumns
      if (this.$store.getters.isFuJian) { // 福建个性化需求
        const specialColumns = [
          {
            title: '资金归口',
            field: 'bgtMofDepName',
            width: 140,
            align: 'left',
            filters: false
          }
        ]
        this.tableColumnsConfig = diffColumns.concat(specialColumns)
      }
    },
    queryTableDatas(type, mofDivCode) {
      let params = {
        field: type,
        mofDivCode: mofDivCode,
        page: this.pagerConfig.currentPage, // 页码
        pageSize: this.pagerConfig.pageSize, // 每页条数
        agencyName: this.condition.agencyName ? this.condition.agencyName[0] : '',
        fiscalYear: this.fiscalYear,
        trackProCodes: this.trackProCodes,
        affirmTimeStartDate: this.propsAffirmTimeStartDate,
        affirmTimeEndDate: this.propsAffirmTimeEndDate,
        isSuperPermissions: !!this.transJson(this.$store.state.curNavModule?.param5).isSuperPermissions,
        regulationClass: this.transJson(this.$store.state.curNavModule?.param5).regulationClass || '09'
      }
      this.tableLoading = true
      // this.dialogVisibles = false
      HttpModule.queryDetailDatas(params).then((res) => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.pagerConfig.total = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
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
      const validCellValue = (row[column.property] * 1)
      if (validCellValue && ['detail'].includes(column.property)) {
        return {
          color: '#4293F4',
          textDecoration: 'underline'
        }
      }
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property

      // 无效的cellValue
      // const isInvalidCellValue = !(obj.row[obj.column.property] * 1)
      // if (isInvalidCellValue) return

      switch (key) {
        case 'detail':
          this.handleDetail('detail', obj.row.diBillId, obj.row.mofDivCode)
          this.$parent.sDetailTitle = '详细信息'
          break
      }
    }
  },
  mounted() {
    this.showInfo()
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  created() {
    this.userInfo = this.$store.state.userInfo
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
