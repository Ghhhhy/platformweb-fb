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
          :default-money-unit="defaultMoneyUnit"
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
    <ThrExpReportImplementationByMofDiv
      v-if="violationsView"
      :date="date"
      :mof-div-code="mofDivCode"
      :title="dialogTitle"
    />
    <ExecutionsDetailDialog
      v-if="executionsDetailVisible"
      :detail-query-param="detailQueryParam"
      :title="dialogTitle"
    />
    <BudgetDetailDialog
      v-if="budgetDetailVisible"
      :detail-query-param="detailQueryParam"
      :title="dialogTitle"
    />
  </div>
</template>

<script>
import ExecutionsDetailDialog from './children/ExecutionsDetailDialog.vue'
import BudgetDetailDialog from './children/BudgetDetailDialog.vue'
import { proconf } from './ThrExpReport'
import ThrExpReportImplementationByMofDiv from './ThrExpReportImplementationByMofDiv'
import HttpModule from '@/api/frame/main/Monitoring/ThrExpReport.js'

export default {
  components: {
    ThrExpReportImplementationByMofDiv,
    ExecutionsDetailDialog,
    BudgetDetailDialog
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  data() {
    return {
      executionsDetailVisible: false,
      budgetDetailVisible: false,
      defaultMoneyUnit: 10000,
      detailQueryParam: {},
      depBgtEcoCodeList: [],
      violationsView: false,
      month: '',
      isShowQueryConditions: true,
      radioShow: true,
      breakRuleVisible: false,
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
      tabStatusNumConfig: {
        '1': 0
      },
      // BsQuery 查询栏
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
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
      tableColumnsConfig: proconf.PoliciesTableColumns1,
      tableData: [],
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: true, // 是否有金额转换
        search: false, // 是否有search
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
        totalObj: {
          beginningBudgetAmount: 0,
          budgetAdjustmentAmount: 0,
          adjustedBudgetAmount: 0,
          executionsAmount: 0,
          unlistedAmount: 0,
          goAbroadBeginningBudgetAmount: 0,
          goAbroadBudgetAdjustmentAmount: 0,
          goAbroadAdjustedBudgetAmount: 0,
          goAbroadExecutionsAmount: 0,
          goAbroadUnlistedAmount: 0,
          receptionBeginningBudgetAmount: 0,
          receptionBudgetAdjustmentAmnt: 0,
          receptionAdjustedBudgetAmount: 0,
          receptionExecutionsAmount: 0,
          receptionUnlistedAmount: 0,
          vehicleSubtotalBeginBugtAmnt: 0,
          vehicleSubtotalBudgetAdjstAmnt: 0,
          vehicleSubtotalAdjstBugtAmnt: 0,
          vehicleSubtotalExecuAmnt: 0,
          vehicleSubtotalUnlistedAmount: 0,
          vehiclePurchaseBeginningBudgetAmount: 0,
          vehiclePurchaseBudgetAdjustmentAmount: 0,
          vehiclePrcheAdjstBugtAmnt30913: 0,
          vehiclePurchaseExecuAmnt30913: 0,
          vehiclePrcasUnlistedAmnt30913: 0,
          vehiclePrcasAdjstBugtAmnt31013: 0,
          vehiclePurchaseExecuAmnt31013: 0,
          vehiclePurchaseUnlistAmnt31013: 0,
          vehicleDevopsBeginBugtAmnt: 0,
          vehicleDevopsBugtAdjstAmnt: 0,
          vehicleDevopsAdjustedBugtAmnt: 0,
          vehicleDevopsExecutionsAmount: 0,
          vehicleDevopsUnlistedAmount: 0,
          meetingBeginningBudgetAmount: 0,
          meetingBudgetAdjustmentAmount: 0,
          meetingAdjustedBudgetAmount: 0,
          meetingExecutionsAmount: 0,
          meetingUnlistedAmount: 0,
          trainBeginningBudgetAmount: 0,
          trainBudgetAdjustmentAmount: 0,
          trainAdjustedBudgetAmount: 0,
          trainExecutionsAmount: 0,
          trainUnlistedAmount: 0
        },
        combinedType: ['switchTotal'],
        showFooter: true
      },
      // 操作日志
      logData: [],
      showLogView: false,
      // 新增弹窗
      dialogVisible: false,
      dialogTitle: '明细查看',
      addTableData: [],
      modifyData: {},
      // 请求 & 角色权限相关配置
      menuName: '',
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
      showViolations: false,
      mofDivName: '',
      mofDivCode: '',
      regulationType: '',
      status: '',
      treeQueryparams: { elementcode: 'admdiv', province: '610000000', year: '2021', wheresql: 'and code like \'' + 61 + '%\'' },
      date: '',
      mofDivCodeList: [],
      agencyCodeList: []
    }
  },
  mounted() {
  },
  methods: {
    cellClick(obj, context, e) {
      console.log(obj)
      let key = obj.column.property
      if (
        key === 'mofDiv'
      ) {
        this.mofDivCode = obj.row.mofDivCode
        this.violationsView = true
      }
      if (key.includes('executionsAmount') || key.includes('ExecutionsAmount')) {
        this.mofDivCode = obj.row.mofDivCode
        this.executionsDetailVisible = true
        this.depBgtEcoCodeList = []
        if (key === 'goAbroadExecutionsAmount') {
          this.depBgtEcoCodeList = ['30212']
        }
        if (key === 'receptionExecutionsAmount') {
          this.depBgtEcoCodeList = ['30217']
        }
        if (key === 'vehiclePurchaseExecuAmnt30913') {
          this.depBgtEcoCodeList = ['30913']
        }
        if (key === 'vehiclePurchaseExecuAmnt31013') {
          this.depBgtEcoCodeList = ['31013']
        }
        if (key === 'vehicleDevopsExecutionsAmount') {
          this.depBgtEcoCodeList = ['30231']
        }
        if (key === 'vehicleSubtotalExecuAmnt') {
          this.depBgtEcoCodeList = ['30231', '30913', '31013']
        }
        if (key === 'meetingExecutionsAmount') {
          this.depBgtEcoCodeList = ['30215']
        }
        if (key === 'trainExecutionsAmount') {
          this.depBgtEcoCodeList = ['30216']
        }
        this.detailQueryParam = {
          mofDivCode: this.mofDivCode,
          date: this.date,
          depBgtEcoCodeList: this.depBgtEcoCodeList
        }
      }

      if (key.includes('adjustedBudgetAmount') || key.includes('AdjustedBudgetAmount')) {
        this.mofDivCode = obj.row.mofDivCode
        this.budgetDetailVisible = true
        this.depBgtEcoCodeList = []
        if (key === 'goAbroadAdjustedBudgetAmount') {
          this.depBgtEcoCodeList = ['30212']
        }
        if (key === 'receptionAdjustedBudgetAmount') {
          this.depBgtEcoCodeList = ['30217']
        }
        if (key === 'vehiclePrcheAdjstBugtAmnt30913') {
          this.depBgtEcoCodeList = ['30913']
        }
        if (key === 'vehiclePrcasAdjstBugtAmnt31013') {
          this.depBgtEcoCodeList = ['31013']
        }
        if (key === 'vehicleDevopsAdjustedBugtAmnt') {
          this.depBgtEcoCodeList = ['30231']
        }
        if (key === 'vehicleSubtotalAdjstBugtAmnt') {
          this.depBgtEcoCodeList = ['30231', '30913', '31013']
        }
        if (key === 'meetingAdjustedBudgetAmount') {
          this.depBgtEcoCodeList = ['30215']
        }
        if (key === 'trainAdjustedBudgetAmount') {
          this.depBgtEcoCodeList = ['30216']
        }
        this.detailQueryParam = {
          mofDivCode: this.mofDivCode,
          date: this.date,
          depBgtEcoCodeList: this.depBgtEcoCodeList
        }
      }
    },
    // 展开折叠查询框
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
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
      if (!obj.type) {
        this.operationToolbarButtonClickEvent(obj)
        return
      }
      this.toolBarStatusSelect = obj
      switch (obj.curValue) {
        // 全部
        case '1':
          this.menuName = '“三公”执行情况表'
          this.radioShow = true
          break
      }
      this.condition = {}
      this.mainPagerConfig.currentPage = 1
      this.refresh()
      this.$refs.mainTableRef.$refs.xGrid.clearScroll()
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
          } else if (typeof (this.searchDataList[key]) === 'string') {
            if (this.searchDataList[key].trim() !== '') {
              this.searchDataList[key].split(',').forEach(item => {
                condition[key].push(item)
              })
            }
          }
        }
      }
      if (this.searchDataList.mofDivName && this.searchDataList.mofDivName.trim() !== '') {
        this.mofDivName = this.searchDataList.mofDivName
      }
      this.condition = condition
      if (this.condition.date.length > 0) {
        this.date = this.condition.date[0]
      } else {
        this.date = ''
      }
      this.mofDivCodeList = val.mofDivCodeList_code__multiple

      this.queryTableDatas()
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      switch (obj.code) {
        // 刷新
        case 'add-toolbar-refresh':
          this.refresh()
          break
        // 刷新
        case 'operation-toolbar-refresh':
          this.refresh()
          break
        default:
          break
      }
    },
    // table 右侧操作按钮
    onOptionRowClick({ row, optionType }, context) {
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
    // 查看附件
    showAttachment(row) {
      this.billguid = row.attachment_id
      this.showAttachmentDialog = true
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
    // 查询 table 数据
    queryTableDatas() {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        date: this.searchDataList.date
      }
      this.date = this.searchDataList.date
      this.tableLoading = true
      HttpModule.implementation(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
          this.tabStatusNumConfig['1'] = res.data.totalCount
          let progress = this.month / 0.12

          let beginningBudgetAmount = 0
          let budgetAdjustmentAmount = 0
          let adjustedBudgetAmount = 0
          let executionsAmount = 0
          let unlistedAmount = 0
          let goAbroadBeginningBudgetAmount = 0
          let goAbroadBudgetAdjustmentAmount = 0
          let goAbroadAdjustedBudgetAmount = 0
          let goAbroadExecutionsAmount = 0
          let goAbroadUnlistedAmount = 0
          let receptionBeginningBudgetAmount = 0
          let receptionBudgetAdjustmentAmnt = 0
          let receptionAdjustedBudgetAmount = 0
          let receptionExecutionsAmount = 0
          let receptionUnlistedAmount = 0
          let vehicleSubtotalBeginBugtAmnt = 0
          let vehicleSubtotalBudgetAdjstAmnt = 0
          let vehicleSubtotalAdjstBugtAmnt = 0
          let vehicleSubtotalExecuAmnt = 0
          let vehicleSubtotalUnlistedAmount = 0
          let vehiclePurchaseBeginningBudgetAmount = 0
          let vehiclePurchaseBudgetAdjustmentAmount = 0
          let vehiclePrcheAdjstBugtAmnt30913 = 0
          let vehiclePurchaseExecuAmnt30913 = 0
          let vehiclePrcasUnlistedAmnt30913 = 0
          let vehiclePrcasAdjstBugtAmnt31013 = 0
          let vehiclePurchaseExecuAmnt31013 = 0
          let vehiclePurchaseUnlistAmnt31013 = 0
          let vehicleDevopsBeginBugtAmnt = 0
          let vehicleDevopsBugtAdjstAmnt = 0
          let vehicleDevopsAdjustedBugtAmnt = 0
          let vehicleDevopsExecutionsAmount = 0
          let vehicleDevopsUnlistedAmount = 0
          let meetingBeginningBudgetAmount = 0
          let meetingBudgetAdjustmentAmount = 0
          let meetingAdjustedBudgetAmount = 0
          let meetingExecutionsAmount = 0
          let meetingUnlistedAmount = 0
          let trainBeginningBudgetAmount = 0
          let trainBudgetAdjustmentAmount = 0
          let trainAdjustedBudgetAmount = 0
          let trainExecutionsAmount = 0
          let trainUnlistedAmount = 0
          this.tableData.forEach(item => {
            if (item.beginningBudgetAmount) {
              beginningBudgetAmount += item.beginningBudgetAmount
            }
            if (item.budgetAdjustmentAmount) {
              budgetAdjustmentAmount += item.budgetAdjustmentAmount
            }
            if (item.adjustedBudgetAmount) {
              adjustedBudgetAmount += item.adjustedBudgetAmount
            }
            if (item.executionsAmount) {
              executionsAmount += item.executionsAmount
            }

            if (item.unlistedAmount) {
              unlistedAmount += item.unlistedAmount
            }
            if (item.goAbroadBeginningBudgetAmount) {
              goAbroadBeginningBudgetAmount += item.goAbroadBeginningBudgetAmount
            }
            if (item.goAbroadBudgetAdjustmentAmount) {
              goAbroadBudgetAdjustmentAmount += item.goAbroadBudgetAdjustmentAmount
            }
            if (item.goAbroadAdjustedBudgetAmount) {
              goAbroadAdjustedBudgetAmount += item.goAbroadAdjustedBudgetAmount
            }
            if (item.goAbroadExecutionsAmount) {
              goAbroadExecutionsAmount += item.goAbroadExecutionsAmount
            }
            if (item.goAbroadUnlistedAmount) {
              goAbroadUnlistedAmount += item.goAbroadUnlistedAmount
            }
            if (item.receptionBeginningBudgetAmount) {
              receptionBeginningBudgetAmount += item.receptionBeginningBudgetAmount
            }
            if (item.receptionBudgetAdjustmentAmnt) {
              receptionBudgetAdjustmentAmnt += item.receptionBudgetAdjustmentAmnt
            }
            if (item.receptionAdjustedBudgetAmount) {
              receptionAdjustedBudgetAmount += item.receptionAdjustedBudgetAmount
            }
            if (item.receptionExecutionsAmount) {
              receptionExecutionsAmount += item.receptionExecutionsAmount
            }
            if (item.receptionUnlistedAmount) {
              receptionUnlistedAmount += item.receptionUnlistedAmount
            }
            if (item.vehicleSubtotalBeginBugtAmnt) {
              vehicleSubtotalBeginBugtAmnt += item.vehicleSubtotalBeginBugtAmnt
            }
            if (item.vehicleSubtotalBudgetAdjstAmnt) {
              vehicleSubtotalBudgetAdjstAmnt += item.vehicleSubtotalBudgetAdjstAmnt
            }
            if (item.vehicleSubtotalAdjstBugtAmnt) {
              vehicleSubtotalAdjstBugtAmnt += item.vehicleSubtotalAdjstBugtAmnt
            }
            if (item.vehicleSubtotalExecuAmnt) {
              vehicleSubtotalExecuAmnt += item.vehicleSubtotalExecuAmnt
            }
            if (item.vehicleSubtotalUnlistedAmount) {
              vehicleSubtotalUnlistedAmount += item.vehicleSubtotalUnlistedAmount
            }
            if (item.vehiclePurchaseBeginningBudgetAmount) {
              vehiclePurchaseBeginningBudgetAmount += item.vehiclePurchaseBeginningBudgetAmount
            }
            if (item.vehiclePurchaseBudgetAdjustmentAmount) {
              vehiclePurchaseBudgetAdjustmentAmount += item.vehiclePurchaseBudgetAdjustmentAmount
            }
            if (item.vehiclePrcheAdjstBugtAmnt30913) {
              vehiclePrcheAdjstBugtAmnt30913 += item.vehiclePrcheAdjstBugtAmnt30913
            }
            if (item.vehiclePurchaseExecuAmnt30913) {
              vehiclePurchaseExecuAmnt30913 += item.vehiclePurchaseExecuAmnt30913
            }
            if (item.vehiclePrcasUnlistedAmnt30913) {
              vehiclePrcasUnlistedAmnt30913 += item.vehiclePrcasUnlistedAmnt30913
            }
            if (item.vehiclePrcasAdjstBugtAmnt31013) {
              vehiclePrcasAdjstBugtAmnt31013 += item.vehiclePrcasAdjstBugtAmnt31013
            }
            if (item.vehiclePurchaseExecuAmnt31013) {
              vehiclePurchaseExecuAmnt31013 += item.vehiclePurchaseExecuAmnt31013
            }
            if (item.vehiclePurchaseUnlistAmnt31013) {
              vehiclePurchaseUnlistAmnt31013 += item.vehiclePurchaseUnlistAmnt31013
            }
            if (item.vehicleDevopsBeginBugtAmnt) {
              vehicleDevopsBeginBugtAmnt += item.vehicleDevopsBeginBugtAmnt
            }
            if (item.vehicleDevopsBugtAdjstAmnt) {
              vehicleDevopsBugtAdjstAmnt += item.vehicleDevopsBugtAdjstAmnt
            }
            if (item.vehicleDevopsAdjustedBugtAmnt) {
              vehicleDevopsAdjustedBugtAmnt += item.vehicleDevopsAdjustedBugtAmnt
            }
            if (item.vehicleDevopsExecutionsAmount) {
              vehicleDevopsExecutionsAmount += item.vehicleDevopsExecutionsAmount
            }
            if (item.vehicleDevopsUnlistedAmount) {
              vehicleDevopsUnlistedAmount += item.vehicleDevopsUnlistedAmount
            }
            if (item.meetingBeginningBudgetAmount) {
              meetingBeginningBudgetAmount += item.meetingBeginningBudgetAmount
            }
            if (item.meetingBudgetAdjustmentAmount) {
              meetingBudgetAdjustmentAmount += item.meetingBudgetAdjustmentAmount
            }
            if (item.meetingAdjustedBudgetAmount) {
              meetingAdjustedBudgetAmount += item.meetingAdjustedBudgetAmount
            }
            if (item.meetingExecutionsAmount) {
              meetingExecutionsAmount += item.meetingExecutionsAmount
            }
            if (item.meetingUnlistedAmount) {
              meetingUnlistedAmount += item.meetingUnlistedAmount
            }
            if (item.trainBeginningBudgetAmount) {
              trainBeginningBudgetAmount += item.trainBeginningBudgetAmount
            }
            if (item.trainBudgetAdjustmentAmount) {
              trainBudgetAdjustmentAmount += item.trainBudgetAdjustmentAmount
            }
            if (item.trainAdjustedBudgetAmount) {
              trainAdjustedBudgetAmount += item.trainAdjustedBudgetAmount
            }
            if (item.trainExecutionsAmount) {
              trainExecutionsAmount += item.trainExecutionsAmount
            }
            if (item.trainUnlistedAmount) {
              trainUnlistedAmount += item.trainUnlistedAmount
            }
            Object.keys(item).forEach(t => {
              if (t.includes('ExpenditureProgress') || t.includes('expenditureProgress')) {
                if (item[t] === null) {
                  item[t] = '<span>0</span>'
                } else if ((item[t] * 100) > progress) {
                  item[t] = '<span style="color:red">' + parseFloat((item[t] * 100).toFixed(2)) + '%</span>'
                } else {
                  item[t] = '<span>' + parseFloat((item[t] * 100).toFixed(2)) + '%</span>'
                }
              }
            })
            /* if (item['executionsAmount'] > item['adjustedBudgetAmount']) {
              item['executionsAmount'] = '<span style="color:red">' + item['executionsAmount'] + '</span>'
            }
            if (item['goAbroadExecutionsAmount'] > item['goAbroadAdjustedBudgetAmount']) {
              item['goAbroadExecutionsAmount'] = '<span style="color:red">' + item['goAbroadExecutionsAmount'] + '</span>'
            }
            if (item['receptionExecutionsAmount'] > item['receptionAdjustedBudgetAmount']) {
              item['receptionExecutionsAmount'] = '<span style="color:red">' + item['receptionExecutionsAmount'] + '</span>'
            }
            if (item['vehicleSubtotalExecuAmnt'] > item['vehicleSubtotalAdjstBugtAmnt']) {
              item['vehicleSubtotalExecuAmnt'] = '<span style="color:red">' + item['vehicleSubtotalExecuAmnt'] + '</span>'
            }
            if (item['vehiclePurchaseExecuAmnt30913'] > item['vehiclePrcheAdjstBugtAmnt30913']) {
              item['vehiclePurchaseExecuAmnt30913'] = '<span style="color:red">' + item['vehiclePurchaseExecuAmnt30913'] + '</span>'
            }
            if (item['vehiclePurchaseExecuAmnt31013'] > item['vehiclePrcasAdjstBugtAmnt31013']) {
              item['vehiclePurchaseExecuAmnt31013'] = '<span style="color:red">' + item['vehiclePurchaseExecuAmnt31013'] + '</span>'
            }
            if (item['vehicleDevopsExecutionsAmount'] > item['adjustedBudgetAmount']) {
              item['vehicleDevopsExecutionsAmount'] = '<span style="color:red">' + item['vehicleDevopsExecutionsAmount'] + '</span>'
            }
            if (item['executionsAmount'] > item['vehicleDevopsAdjustedBugtAmnt']) {
              item['executionsAmount'] = '<span style="color:red">' + item['executionsAmount'] + '</span>'
            }
            if (item['meetingExecutionsAmount'] > item['meetingAdjustedBudgetAmount']) {
              item['meetingExecutionsAmount'] = '<span style="color:red">' + item['meetingExecutionsAmount'] + '</span>'
            }
            if (item['trainExecutionsAmount'] > item['trainAdjustedBudgetAmount']) {
              item['trainExecutionsAmount'] = '<span style="color:red">' + item['trainExecutionsAmount'] + '</span>'
            } */
          })
          this.tableFooterConfig.totalObj.beginningBudgetAmount = beginningBudgetAmount
          this.tableFooterConfig.totalObj.budgetAdjustmentAmount = budgetAdjustmentAmount
          this.tableFooterConfig.totalObj.adjustedBudgetAmount = adjustedBudgetAmount
          this.tableFooterConfig.totalObj.executionsAmount = executionsAmount
          this.tableFooterConfig.totalObj.unlistedAmount = unlistedAmount
          this.tableFooterConfig.totalObj.goAbroadBeginningBudgetAmount = goAbroadBeginningBudgetAmount
          this.tableFooterConfig.totalObj.goAbroadBudgetAdjustmentAmount = goAbroadBudgetAdjustmentAmount
          this.tableFooterConfig.totalObj.goAbroadAdjustedBudgetAmount = goAbroadAdjustedBudgetAmount
          this.tableFooterConfig.totalObj.goAbroadExecutionsAmount = goAbroadExecutionsAmount
          this.tableFooterConfig.totalObj.goAbroadUnlistedAmount = goAbroadUnlistedAmount
          this.tableFooterConfig.totalObj.receptionBeginningBudgetAmount = receptionBeginningBudgetAmount
          this.tableFooterConfig.totalObj.receptionBudgetAdjustmentAmnt = receptionBudgetAdjustmentAmnt
          this.tableFooterConfig.totalObj.receptionAdjustedBudgetAmount = receptionAdjustedBudgetAmount
          this.tableFooterConfig.totalObj.receptionExecutionsAmount = receptionExecutionsAmount
          this.tableFooterConfig.totalObj.receptionUnlistedAmount = receptionUnlistedAmount
          this.tableFooterConfig.totalObj.vehicleSubtotalBeginBugtAmnt = vehicleSubtotalBeginBugtAmnt
          this.tableFooterConfig.totalObj.vehicleSubtotalBudgetAdjstAmnt = vehicleSubtotalBudgetAdjstAmnt
          this.tableFooterConfig.totalObj.vehicleSubtotalAdjstBugtAmnt = vehicleSubtotalAdjstBugtAmnt
          this.tableFooterConfig.totalObj.vehicleSubtotalExecuAmnt = vehicleSubtotalExecuAmnt
          this.tableFooterConfig.totalObj.vehicleSubtotalUnlistedAmount = vehicleSubtotalUnlistedAmount
          this.tableFooterConfig.totalObj.vehiclePurchaseBeginningBudgetAmount = vehiclePurchaseBeginningBudgetAmount
          this.tableFooterConfig.totalObj.vehiclePurchaseBudgetAdjustmentAmount = vehiclePurchaseBudgetAdjustmentAmount
          this.tableFooterConfig.totalObj.vehiclePrcheAdjstBugtAmnt30913 = vehiclePrcheAdjstBugtAmnt30913
          this.tableFooterConfig.totalObj.vehiclePurchaseExecuAmnt30913 = vehiclePurchaseExecuAmnt30913
          this.tableFooterConfig.totalObj.vehiclePrcasUnlistedAmnt30913 = vehiclePrcasUnlistedAmnt30913
          this.tableFooterConfig.totalObj.vehiclePrcasAdjstBugtAmnt31013 = vehiclePrcasAdjstBugtAmnt31013
          this.tableFooterConfig.totalObj.vehiclePurchaseExecuAmnt31013 = vehiclePurchaseExecuAmnt31013
          this.tableFooterConfig.totalObj.vehiclePurchaseUnlistAmnt31013 = vehiclePurchaseUnlistAmnt31013
          this.tableFooterConfig.totalObj.vehicleDevopsBeginBugtAmnt = vehicleDevopsBeginBugtAmnt
          this.tableFooterConfig.totalObj.vehicleDevopsBugtAdjstAmnt = vehicleDevopsBugtAdjstAmnt
          this.tableFooterConfig.totalObj.vehicleDevopsAdjustedBugtAmnt = vehicleDevopsAdjustedBugtAmnt
          this.tableFooterConfig.totalObj.vehicleDevopsExecutionsAmount = vehicleDevopsExecutionsAmount
          this.tableFooterConfig.totalObj.vehicleDevopsUnlistedAmount = vehicleDevopsUnlistedAmount
          this.tableFooterConfig.totalObj.meetingBeginningBudgetAmount = meetingBeginningBudgetAmount
          this.tableFooterConfig.totalObj.meetingBudgetAdjustmentAmount = meetingBudgetAdjustmentAmount
          this.tableFooterConfig.totalObj.meetingAdjustedBudgetAmount = meetingAdjustedBudgetAmount
          this.tableFooterConfig.totalObj.meetingExecutionsAmount = meetingExecutionsAmount
          this.tableFooterConfig.totalObj.meetingUnlistedAmount = meetingUnlistedAmount
          this.tableFooterConfig.totalObj.trainBeginningBudgetAmount = trainBeginningBudgetAmount
          this.tableFooterConfig.totalObj.trainBudgetAdjustmentAmount = trainBudgetAdjustmentAmount
          this.tableFooterConfig.totalObj.trainAdjustedBudgetAmount = trainAdjustedBudgetAmount
          this.tableFooterConfig.totalObj.trainExecutionsAmount = trainExecutionsAmount
          this.tableFooterConfig.totalObj.trainUnlistedAmount = trainUnlistedAmount
        } else {
          this.$message.error(res.message)
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
        this.showLogView = true
      })
    },
    getLeftTreeData() {
      let that = this
      let params = { ...that.treeQueryparams, ...this.$store.getters.treeQueryparamsCom }
      HttpModule.getLeftTree(params).then(res => {
        if (res.rscode === '100000') {
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
    }
  },
  created() {
    let date = new Date()
    let year = date.toLocaleDateString().split('/')[0]
    let month = date.toLocaleDateString().split('/')[1]
    let day = date.toLocaleDateString().split('/')[2]
    this.searchDataList.date = year + '-' + month + '-' + day
    this.month = month
    // this.params5 = commonFn.transJson(this.$store.state.curNavModule.param5)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.params5 = this.$store.state.curNavModule.param5
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
