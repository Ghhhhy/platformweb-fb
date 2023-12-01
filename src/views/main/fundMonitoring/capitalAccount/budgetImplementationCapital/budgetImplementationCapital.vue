<!-- 直达资金预算下达_分资金 -->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="queryConfig"
            :query-form-data="searchDataList"
            @onSearchClick="(e1,e2) => { search(e1,e2,false) }"
            @itemChange="itemChange"
          >
            <template v-if="isSx" v-slot:action-button-before>
              <vxe-button
                content="人工读取"
                status="primary"
                size="medium"
                @click="onToolbarBtnClick({ code: 'refresh' })"
              />
            </template>
          </BsQuery>
        </div>
      </template>
      <template v-slot:mainForm>
        <BsTable
          id="1001"
          ref="bsTableRef"
          row-id="id"
          :table-config="tableConfig"
          :table-global-config="tableGlobalConfigCop"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :export-visible-width="$store.getters.isFuJian"
          :export-modal-config="{ fileName: menuName, addReportTitleColumn: true , addUnitColumn: true }"
          :calculate-constraint-config="calculateConstraintConfig"
          :tree-config="{ dblExpandAll: true, dblExpand: true, accordion: false, iconClose: 'el-icon-circle-plus', iconOpen: 'el-icon-remove' }"
          :toolbar-config="tableToolbarConfig"
          :pager-config="pagerConfig"
          :default-money-unit="10000"
          :title="menuName"
          :cell-style="cellStyle"
          :show-zero="showZeroState"
          :formula-digits="1"
          @editClosed="onEditClosed"
          @cellDblclick="cellDblclick"
          @onToolbarBtnClick="onToolbarBtnClick"
          @cellClick="handleCellClick"
          @switchMoneyUnit="switchMoneyUnit"
        >
          <!--口径说明插槽-->
          <template v-if="caliberDeclareContent" v-slot:caliberDeclare>
            <p v-html="caliberDeclareContent"></p>
          </template>
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div class="table-toolbar-left-title">
                <span class="fn-inline">{{ menuName }}</span>
                <i class="fn-inline"></i>
              </div>
            </div>
            <div v-if="isSx" class="timeRefreshTip">
              <div>系统自动更新时间点：1.早上8：00前更新完成。</div>
            </div>
          </template>
          <template v-if="!isSx" v-slot:toolbar-custom-slot>
            <vxe-button
              v-if="transJson($store.state.curNavModule.param5).incrementUpdateBtnVisible !== false"
              :loading="dataSourceAddLoading"
              style="margin-right: 8px;"
              @click="incrementHandle"
            >
              数据增量同步
            </vxe-button>
            <vxe-button
              v-if="transJson($store.state.curNavModule.param5).otherSysImportBtnVisible !== false"
              style="margin-right: 8px;"
              @click="otherSysImportModal = true"
            >
              华青数据导入
            </vxe-button>
          </template>
          <template v-slot:toolbar-custom-slot>
            <div class="dfr-report-time-wrapper">
              <el-tooltip effect="light" :content="`报表最近取数时间：${reportTime}`" placement="top">
                <div class="dfr-report-time-content">
                  <i class="ri-history-fill"></i>
                  <span class="dfr-report-time">{{ reportTime }}</span>
                </div>
              </el-tooltip>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <BsOperationLog :logs-data="logData" :show-log-view="showLogView" />
    <DetailDialog
      v-if="detailVisible"
      :title="detailTitle"
      :detail-type="detailType"
      :detail-data="detailData"
      :detail-query-param="detailQueryParam"
    />
    <SDetailDialog
      v-if="sDetailVisible"
      :title="sDetailTitle"
      :s-detail-data="sDetailData"
      :s-detail-query-param="sDetailQueryParam"
      :s-detail-type="sDetailType"
    />
    <ImportModal
      v-if="otherSysImportModal"
      v-model="otherSysImportModal"
    />
  </div>
</template>

<script>
import getFormData from './budgetImplementationCapital.js'
import DetailDialog from '../children/detailDialog.vue'
import SDetailDialog from '../children/sDetailDialog.vue'
import ImportModal from './components/ImportModal'
import HttpModule from '@/api/frame/main/fundMonitoring/budgetImplementationRegion.js'
import { checkRscode } from '@/utils/checkRscode'
// import proconf from '../children/column'
import store from '@/store/index'
import capitalMixin from '../mixins/capitalMixin'
import moment from 'moment'
export default {
  mixins: [capitalMixin],
  components: {
    DetailDialog,
    SDetailDialog,
    ImportModal
  },
  computed: {
    isSx() {
      return this.$store.getters.isSx
    },
    tableGlobalConfigCop() {
      let dataType = this.transJson(this.$store.state.curNavModule.param5 || '').exportModalDefaultSelect || 'fullData'
      return {
        customExportConfig: {
          ...this.tableGlobalConfig.customExportConfig,
          dataType,
          fileName: this.menuName
        }
      }
    }
  },
  watch: {
    // $refs: {
    //   handler(newval) {
    //   },
    //   deep: true,
    //   immediate: true
    // },
    // queryConfig() {
    // this.getSearchDataList()
    // }
  },
  data() {
    return {
      isFlush: false,
      otherSysImportModal: false, // 华青数据导入弹窗显隐
      caliberDeclareContent: '', // 口径说明
      hideColumnLinkStr: this.transJson3(this.$store.state.curNavModule.param5), // 菜单配置信息
      showZeroState: this.transJson3(this.$store.state.curNavModule.param5).projectCode === 'SH' || this.$store.getters.isSx,
      reportTime: '', // 拉取支付报表的最新时间
      leftTreeVisible: false,
      sDetailVisible: false,
      sDetailTitle: '',
      sDetailData: [],
      isShowQueryConditions: true,
      radioShow: true,
      breakRuleVisible: false,
      // 头部工具栏 BsTabPanel config
      dataSourceAddLoading: false,
      buttonsInfo: getFormData('statusRightToolBarButtonByBusDept'),
      tabStatusNumConfig: {
        1: 0
      },
      tableGlobalConfig: {
        customExportConfig: {
          addUnitColumn: true,
          addReportTitleColumn: true,
          unit: '万元'
        }
      },
      // table 相关配置
      tableLoading: false,
      paramS5: this.transJson3(this.$store.state.curNavModule.param5),
      tableConfig: getFormData('basicInfo', 'tableConfig'),
      tableColumnsConfig: getFormData('basicInfo', `tableColumnsConfig${this.transJson(this.$store?.state?.curNavModule?.param5)?.isCity ? 'City' : ''}`),
      tableData: [],
      calculateConstraintConfig: {
        enabled: true,
        extendMapInfoField: true, // 是否扩展mapInfo字段
        // gradedSummaryFields: ['bonus', 'income'],
        calcAndConstraintItemCodeField: 'itemCode',
        // 示例中1001为tableId
        // rowCodeFormulaConfig: {
        //   // 单元格交叉计算
        //   // rowFormulaMap= { "colField:itemcode":"{tableId:colField:itemcode}[运算符]" }
        //   '00:jOut': '{00:sbpayAppAmt}+{00:spayAppAmt}+{00:xpayAppAmt}'
        //   // '10:bonus': '{1001:income:10}+{1001:bonus:10}',
        //   // '20:bonus': '{1001:income:30}*{1001:age:30}+{1001:bonus:40}'
        // },
        cellDataConfig: [// 提取和计算

        ],
        // colFormulaConfig: {
        //   jOut: '{sbpayAppAmt}+{spayAppAmt}+{xpayAppAmt}',
        //   jLoad: '{jOut}/{sbjAmount}*100',
        //   sUnassigned: '{sbjAmount}-{sbbjfpAmount}-{sbxjfpAmount}',
        //   sLoad: '({sbbjfpAmount}+{sbxjfpAmount})/{sbjAmount}*100',
        //   aUnassigned: '{sbjAmount}-{sbbjfpAmount}-{sbjfpAmount}-{sxjfpAmount}',
        //   aLoad: '({sbjfpAmount}+{sxjfpAmount})/{sbjAmount}*100',
        //   xUnassigned: '{sbjAmount}-{sbbjfpAmount}-{sbjfpAmount}-{xbjfpAmount}',
        //   xLoad: '{xbjfpAmount}/{sbjAmount}*100'
        // },
        getDataAxiosConfig: { // 跨表提取请求配置
          dataField: 'data', // 数据字段
          successCode: '100000', // 成功code
          statusField: 'rscode',
          method: 'get', // 请求方式
          url: '' // 'queryTreeAssistData', //
          //  [{ itemCode: "002", colField: "f005", value: "1500.0" }, { itemCode: "002001", colField: "f005", value: "500.0" }]
        },
        getDataParams: { // 提取公共参数

        },
        colConstraintConfig: {
          // 'age': 'income::value::{age}>=18?Math.pow({age},4)/2:0--&&--name::style::{age}>18&&{age}<=60--??--color=#F00&fontSize=20px--+--{age}>60--??--color=#ff0&fontSize=20px'
        },
        rowCodeConstraintConfig: { // 表间约束配置
          // '20:age': '10:income::value::{1001:age:20}>=18?Math.pow({1001:age:20},4)/2:0--&&--10:bonus::editable::{1001:age:20}>=18?true:false--&&--30:bonus::clear::{1001:age:20}<=18?true:false--&&--10:name::style::{1001:age:20}>18&&{1001:age:20}<=60--??--color=#F00&fontSize=20px--+--{1001:age:1001}>60--??--color=#ff0&fontSize=20px'
        }
      },
      toolbarConfig: {
        disabledMoneyConversion: false,
        ...getFormData('basicInfo', 'toolbarConfig')
      },
      // editRules: getFormData('basicInfo', 'editRules'),
      ifRenderExpandContentTable: true,
      pagerConfig: {
        autoHidden: true,
        total: 1,
        currentPage: 1,
        pageSize: 999999
      },
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: true, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: true, // 导出
        caliberDeclare: true, //
        expandAll: true, // 展开所有
        print: false, // 打印
        zoom: true, // 缩放
        custom: true, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      // mainPagerConfig: {
      //   total: 0,
      //   currentPage: 1,
      //   pageSize: 20
      // },
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
      menuName: '',
      params5: '',
      menuId: '',
      tokenid: '',
      userInfo: {},
      roleguid: this.$store.state.curNavModule.roleguid,
      appId: 'pay_voucher',
      isHaveZero: '0',
      billguid: '',
      condition: {},
      selectData: '',
      queryConfig: store.getters.isSx ? getFormData('highQueryConfigToSx') : getFormData('highQueryConfig'),
      searchDataList: getFormData('highQueryData'),
      detailVisible: false,
      detailType: '',
      sDetailType: '',
      detailTitle: '',
      mofDivCodes: [],
      detailData: [],
      detailQueryParam: {},
      sDetailQueryParam: {},
      fjColorConfig: [], // 福建 颜色配置
      cellStyleFiledList: [] // 颜色列field
    }
  },
  methods: {
    // 载入表头
    async loadConfig(Type, id) {
      let params = {
        tableId: {
          id: id,
          fiscalyear: this.$store.state.userInfo.year,
          mof_div_code: this.$store.state.userInfo.province,
          menuguid: this.$store.state.curNavModule.guid
        }
      }
      if (Type === 'BsTable') {
        let configData = await this.loadBsConfig(params)
        this.tableColumnsConfig = configData.itemsConfig
        this.getMofDiv()
      }
      if (Type === 'BsQuery') {
        let configData = await this.loadBsConfig(params)
        this.queryConfig = configData.itemsConfig
        this.searchDataList.fiscalYear = new Date().getFullYear()
      }
    },
    switchMoneyUnit(level) {
      this.tableGlobalConfig.customExportConfig.unit = level === 1 ? '元' : '万元'
    },
    // 增量同步
    async incrementHandle() {
      this.dataSourceAddLoading = true
      try {
        checkRscode(await HttpModule.doDataSourceAdd())
        this.$message.success('同步成功')
      } finally {
        this.dataSourceAddLoading = false
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
      this.searchDataList.fiscalYear = new Date().getFullYear()
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
              if (!this.$store.getters.isSx) {
                condition[item.field + 'code'] = []
              }
            }
            if (this.$store.getters.isSx && item.field === 'mofDivCodes') {
              condition[item.field] = []
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
          this.menuName = `直达资金预算下达_分资金(单位:${this.tableGlobalConfig.customExportConfig.unit})`
          this.radioShow = true
          break
      }
      this.condition = {}
      this.mainPagerConfig.currentPage = 1
      this.queryTableDatas()
      this.$refs.mainTableRef.$refs.xGrid.clearScroll()
    },
    // 搜索
    search(val, multipleValue = {}, isFlush = false) {
      console.log(this.searchDataList)
      if (!this.$store.getters.isSx) {
        this.searchDataList = val
      }
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
      if (!this.$store.getters.isSx) {
        condition.mofDivCodes = condition.mofDivCodes?.split('##')[0]
      } else {
        condition.mofDivCodes = condition.mofDivCodes[0]?.split('##')[0]
      }
      this.condition = condition
      this.queryTableDatas(isFlush)
    },
    // 切换操作按钮
    // operationToolbarButtonClickEvent(obj, context, e) {
    //   switch (obj.code) {
    //     // 导出
    //     case 'export':
    //       this.exportPolicies(obj, context, e)
    //       break
    //     default:
    //       break
    //   }
    // },
    onToolbarBtnClick({ context, table, code }) {
      let refreshTips = '重新加载数据可能需要等待较长时间，确认继续？'
      if (this.isSx) refreshTips = '此操作会读取最新业务数据情况，报表分析最新业务数据进行展示，等待时间较长，请确认读取'
      switch (code) {
        // 刷新
        case 'refresh':
          this.$confirm(refreshTips, '操作确认提示', {
            type: 'warning'
          }).then(() => {
            this.refresh(true)
          })
          break
      }
    },
    changeVisible(val) {
      this.breakRuleVisible = val
    },
    onClickmethod(node) {
      if (node.id !== '0') {
        let key =
          this.$refs.treeSet.treeConfigIn.curRadio.toLowerCase() + '_code'
        this.condition[key] = node.id
      } else {
        this.condition = {}
      }

      this.queryTableDatas(node.guid)
    },
    handleDetail(reportCode, proCode, column, row) {
      let that = this
      // 拿到那些可以进行超链接的表格行
      const hideColumnLinkStr = that.transJson3(this.$store.state.curNavModule.param5)
      if (hideColumnLinkStr.projectCode === 'SH') {
        if (row.children !== undefined) return
      }
      let condition = ''
      if (this.transJson(this.$store?.state?.curNavModule?.param5)?.isCity) {
        switch (column) {
          case 'amountSnjwfp':
          case 'amountSnjxd':
          case 'amountSnjpay':
          case 'amountSnjbjfp':
          case 'amountSnjxjfp':
            condition = 'substr(mof_div_code,3,7) = \'0000000\'  '
            break
          case 'amountSjxd':
          case 'amountSjpay':
          case 'amountSjwfp':
          case 'amountSbjfp':
          case 'amountSxjfp':
            condition = ' substr(mof_div_code,5,5) <> \'00000\' and substr(mof_div_code,7,3)=\'000\' '
            break
          case 'amountXjxd':
          case 'amountXjpay':
          case 'amountXjwfp':
          case 'amountXjfp':
            condition = ' substr(mof_div_code,7,3) <> \'000\' '
            break
        }
      } else if (this.$store.state.userInfo.province?.slice(0, 4) === '3502') {
        switch (column) {
          case 'amountSnjwfp':
          case 'amountSnjxd':
          case 'amountSnjpay':
          case 'amountSnjbjfp':
          case 'amountSnjxjfp':
            condition = ' substr(mof_div_code,5,5) = \'00000\' and mof_div_code not like \'%35\''
            break
          case 'amountSjxd':
          case 'amountSjpay':
          case 'amountSjwfp':
          case 'amountSbjfp':
          case 'amountSxjfp':
            condition = ' substr(mof_div_code,5,5) = \'00000\' and mof_div_code  like \'%35\' '
            break
          case 'amountXjxd':
          case 'amountXjpay':
          case 'amountXjwfp':
          case 'amountXjfp':
            condition = ' substr(mof_div_code,5,5) <> \'00000\' and substr(mof_div_code,7,3)=\'000\' '
            break
        }
      } else if (this.$store.state.userInfo.province?.slice(0, 2) === '22') {
        switch (column) {
          case 'amountSnjwfp':
          case 'amountSnjxd':
          case 'amountSnjpay':
          case 'amountSnjbjfp':
          case 'amountSnjxjfp':
            condition = 'substr(mof_div_code,3,7) = \'0000000\'  '
            break
          case 'amountSjxd':
          case 'amountSjpay':
          case 'amountSjwfp':
          case 'amountSbjfp':
          case 'amountSxjfp':
            condition = ' substr(mof_div_code,3,7) <> \'0000000\' and substr(mof_div_code,5,5)=\'00000\' '
            break
          case 'amountXjxd':
          case 'amountXjpay':
          case 'amountXjwfp':
          case 'amountXjfp':
            condition = ' substr(mof_div_code,5,5) <> \'00000\''
            break
        }
      } else {
        switch (column) {
          // 支出明细
          case 'amountSnjwfp':
          case 'amountSnjxd':
          case 'amountSnjpay':
          case 'amountSnjbjfp':
          case 'amountSnjxjfp':
            condition = 'substr(mof_div_code,3,7) = \'0000000\'  '
            break
          case 'amountSjxd':
          case 'amountSjpay':
          case 'amountSjwfp':
          case 'amountSbjfp':
          case 'amountSxjfp':
            condition = ' substr(mof_div_code,3,7) <> \'0000000\' and substr(mof_div_code,5,5)=\'00000\' '
            break
          case 'amountXjxd':
          case 'amountXjpay':
          case 'amountXjwfp':
          case 'amountXjfp':
            condition = ' substr(mof_div_code,5,5) <> \'00000\' and substr(mof_div_code,7,3)=\'000\' '
            break
        }
      }
      let isBj = ''
      switch (column) {
        case 'amountSnjbjfp':
        case 'amountSbjfp':
          isBj = '1'
          break
        case 'amountSnjxjfp':
        case 'amountSxjfp':
          isBj = '2'
          break
        case 'amountXjfp':
          isBj = '3'
          break
      }
      let isCz = ''
      if (this.transJson(this.params5 || '')?.reportCode !== '' && this.transJson(this.params5 || '')?.reportCode.includes('cz')) {
        isCz = '2'
      } else {
        isCz = '1'
      }
      let params = {
        condition: condition,
        reportCode: reportCode,
        // proCodes: [proCode],
        proCode: proCode,
        speTypeCode: '',
        isBj: isBj,
        isCz: isCz,
        startTime: this.condition.startTime ? this.condition.startTime[0] : '',
        endTime: this.condition.endTime ? this.condition.endTime[0] : '',
        fiscalYear: this.searchDataList.fiscalYear,
        mofDivCodes: (this.searchDataList.mofDivCodes && typeof this.searchDataList.mofDivCodes === 'string') ? this.getTrees(this.searchDataList.mofDivCodes) : []
      }
      this.detailQueryParam = params
      this.detailType = reportCode
      this.detailVisible = true
      // this.tableLoading = true
      // HttpModule.queryTableDatas(params).then((res) => {
      //   this.tableLoading = false
      //   if (res.code === '000000') {
      //     this.detailData = res.data
      //     this.detailType = type
      //   } else {
      //     this.$message.error(res.message)
      //   }
      // })
    },
    handleDetailSx(reportCode, proCode, column) {
      let condition = ''
      switch (column) {
        // 支出明细
        case 'amountSnjwfp':
        case 'amountSnjxd':
        case 'amountSnjpay':
        case 'amountSnjbjfp':
        case 'amountSnjxjfp':
          condition = 'substr(mof_div_code,3,7) = \'0000000\'  '
          break
        case 'amountSjxd':
        case 'amountSjpay':
        case 'amountSjwfp':
        case 'amountSbjfp':
        case 'amountSxjfp':
          condition = ' substr(mof_div_code,3,7) <> \'0000000\' and substr(mof_div_code,5,5)=\'00000\' '
          break
        case 'amountXjxd':
        case 'amountXjpay':
        case 'amountXjwfp':
        case 'amountXjfp':
        case 'amountXbjfp':
        case 'amountXxjfp':
          condition = ' substr(mof_div_code,5,5) <> \'00000\' and substr(mof_div_code,7,3)=\'000\' '
          break
        case 'amountZjxd':
        case 'amountZjpay':
        case 'amountZjwfp':
        case 'amountZjfp':
          condition = ' substr(mof_div_code,7,3) <> \'000\' '
          break
      }
      let isBj = ''
      switch (column) {
        case 'amountSnjbjfp':
        case 'amountSbjfp':
        case 'amountXbjfp':
          isBj = '1'
          break
        case 'amountSnjxjfp':
        case 'amountSxjfp':
        case 'amountXxjfp':
          isBj = '2'
          break
        case 'amountXjfp':
        case 'amountZjfp':
          isBj = '3'
          break
      }
      let isCz = ''
      if (this.params5 === 'zyzdzjyszxqkfzj') {
        isCz = '1' // 中央直达
      } else {
        isCz = '2' // 中央参照直达
      }
      let params = {
        condition: condition,
        reportCode: reportCode,
        // proCodes: [proCode],
        proCode: proCode,
        isCz: isCz,
        speTypeCode: '',
        isBj: isBj,
        startTime: this.condition.startTime ? this.condition.startTime[0] : '',
        endTime: this.condition.endTime ? this.condition.endTime[0] : '',
        fiscalYear: this.searchDataList.fiscalYear,
        mofDivCodes: this.searchDataList?.mofDivCodes_code__multiple || []
      }
      this.detailQueryParam = params
      this.detailType = reportCode
      this.detailVisible = true
      // this.tableLoading = true
      // HttpModule.queryTableDatas(params).then((res) => {
      //   this.tableLoading = false
      //   if (res.code === '000000') {
      //     this.detailData = res.data
      //     this.detailType = type
      //   } else {
      //     this.$message.error(res.message)
      //   }
      // })
    },
    handleCellClick(obj, context, e) {
      if (this.isSx) {
        this.cellClickSx(obj, context, e)
      } else {
        this.cellClick(obj, context, e)
      }
    },
    cellHide(hideStr, column, row) {
      /**
       * hideCell=col:amountZyxd;row:10000013Z135050009055&10000013Z135060000035;amountSnjbjfp:10000013Z135080000029&10000013Z135110079006;10000013Z135080000005:amountSnjxjfp&amountSnjbjfp;
       * 以对象的形式配置  col:所需隐藏的列的filed  row:所需隐藏行的code  列filed:某x行code&某y行code  行code:某列field&某列field
       */
      let hideSetting = hideStr.split(';')
      hideSetting.length && (hideSetting = hideSetting.filter(item => item !== ''))
      let settingItemList = hideSetting.map((item, index) => {
        let itemArr = item.split(':')
        if (!itemArr[0] || !itemArr[1] || itemArr.length !== 2) {
          let str = ''
          if (index === 0) {
            str = '第1个\';\'前面'
          } else if (index === hideSetting.length - 1) {
            str = '最后一个\';\'后面'
          } else {
            str = `第${index}个';'后面${index + 1}个';'前面`
          }
          this.$message({
            duration: 0,
            showClose: true,
            message: `${str}的隐藏列配置项语法错误 请检查菜单配置的隐藏参数 错误配置参数为  ${item}`,
            type: 'error'
          })
          throw new Error(`${str}的隐藏列配置项语法错误 请检查菜单配置的隐藏参数 错误配置参数为  ${item}`)
        }
        let obj = {}
        obj[itemArr[0]] = itemArr[1]
        return obj
      })
      let cellCol = column.property
      let cellRow = row.code
      for (let i = 0; i < settingItemList.length; i++) {
        const item = settingItemList[i]
        // 隐藏整列判断
        if ('col' in item && item['col'].split('&').includes(cellCol)) {
          return true
        }
        // 隐藏整行判断
        if ('row' in item && item['row'].split('&').includes(cellRow)) {
          return true
        }
        // 隐藏某列下的 每行对应的code
        if ('cellCol' in item && item[cellCol].split('&').includes(cellRow)) {
          return true
        }
        // 隐藏某行下 对应每列的点
        if ('cellRow' in item && item[cellRow].split('&').includes(cellCol)) {
          return true
        }
      }
    },
    // 表格单元行单击  'amountSnjbjfp', 'amountSbjfp', 'amountXjfp', 'amountPayAll'
    cellClick(obj, context, e) {
      const rowIndex = obj?.rowIndex
      if (!rowIndex) return
      const hideColumnLinkStr = this.transJson3(this.$store.state.curNavModule.param5)
      if (hideColumnLinkStr.hideCell && this.cellHide(hideColumnLinkStr.hideCell, obj.column, obj.row)) return
      let key = obj.column.property

      // 无效的cellValue
      const isInvalidCellValue = !(obj.row[obj.column.property] * 1)
      if (isInvalidCellValue) return
      let xmSource = 'zdzjxmmx_fzj'
      let zcSource = 'zdzjzcmx_fzj'
      if (this.transJson(this.params5 || '')?.reportCode === 'zxjd_fzj') {
        xmSource = 'zxjdxmmx_fzj'
        zcSource = 'zxjdzcmx_fzj'
      }
      if (this.transJson(this.params5 || '')?.reportCode === 'zyzfyszxqkfzj') {
        xmSource = 'zyzfxmmx'
        zcSource = 'zyzfzcmx_fzj'
      }

      switch (key) {
        // 省本级分配走直达资金项目明细
        case 'amountSnjbjfp':
        case 'amountSbjfp':
        case 'amountXjfp':
          this.handleDetail(xmSource, obj.row.code, key, obj.row)
          this.detailTitle = '项目明细'
          break
        // 支出走地区支付明细
        case 'amountPayAll':
          this.handleDetail(zcSource, obj.row.code, key, obj.row)
          this.detailTitle = '支出明细'
          break
      }
    },
    // 表格单元行单击
    cellClickSx(obj, context, e) {
      let key = obj.column.property
      switch (key) {
        case 'recAmount':
          if (obj.row.recAmount?.length) {
            this.handleDetailSx('zyzdzjmx', obj.row.code, key)
            this.detailTitle = '中央直达资金明细'
          }
          break
        case 'amountSnjxd':
        case 'amountSjxd':
        case 'amountXjxd':
          this.handleDetailSx('zdzjxmmx_fzj_zyxd', obj.row.code, key)
          this.detailTitle = '直达资金项目明细'
          break
        case 'amountZyxd':
          this.handleDetailSx('qszjzl', obj.row.code, key)
          this.detailTitle = '直达资金项目明细'
          break
        case 'amountZjxd':
          this.handleDetailSx('zdzjxmmx_fzj_zyxdx', obj.row.code, key)
          this.detailTitle = '直达资金项目明细'
          break
        case 'amountPayAll':
        case 'amountSnjpay':
        case 'amountSjpay':
        case 'amountXjpay':
        case 'amountZjpay':
          this.handleDetailSx('zdzjzcmx_fdq', obj.row.code, key)
          this.detailTitle = '直达资金支出明细'
          break
        // 'amountSnjwfp', 'amountSjwfp', 'amountXjwfp'
        case 'amountSnjwfp':
        case 'amountSjwfp':
        case 'amountXjwfp':
          this.handleDetailSx('zdzjxmmx_fzj_wfp', obj.row.code, key)
          this.detailTitle = '直达资金项目明细'
          break
        case 'amountZjwfp':
          this.handleDetailSx('zdzjxmmx_fzj_wfpx', obj.row.code, key)
          this.detailTitle = '直达资金项目明细'
          break
        // 'amountSnjbjfp', 'amountSnjxjfp', 'amountSbjfp', 'amountSxjfp', 'amountXjfp'
        case 'amountSnjbjfp':
        case 'amountSnjxjfp':
        case 'amountSbjfp':
        case 'amountSxjfp':
        case 'amountXjfp':
        case 'amountZjfp':
        case 'amountXbjfp':
        case 'amountXxjfp':
          this.handleDetailSx('zdzjzbmx_fzjfp', obj.row.code, key)
          this.detailTitle = '直达资金指标明细'
          break
        // case 'amountSnjpay':
        //   this.handleDetail('zjzcmx_fdq', obj.row.recDivCode)
        //   this.detailTitle = '支出明细'
        //   break
        // case 'amountSjpay':
        //   this.handleDetail('zjzcmx_fdq', obj.row.recDivCode)
        //   this.detailTitle = '支出明细'
        //   break
        // case 'amountXjpay':
        //   this.handleDetail('zjzcmx_fdq', obj.row.recDivCode)
        //   this.detailTitle = '支出明细'
        //   break
      }
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh(isFlush = true) {
      this.isFlush = true
      this.search(this.$refs.queryFrom.getFormData(), null, isFlush)
      // this.queryTableDatasCount()
    },
    getTrees(val) {
      let mofDivCodes = []
      if (typeof val !== 'string') return mofDivCodes
      if (val && val?.trim() !== '') {
        val.split(',').forEach((item) => {
          mofDivCodes.push(item.split('##')[0])
        })
      }
      return mofDivCodes
    },
    // 福建 如果返回的字段columns的字段  则不用公司 用返回的字段
    fuJianUseField(columns, row) {
      let fieldList = Object.keys(row)
      let deepCopy = window.deepCopy(columns)
      let cursionTree = (columns, fieldList) => {
        columns.forEach(item => {
          if (Array.isArray(item.children) && item.children.length) {
            cursionTree(item.children, fieldList)
          } else if (fieldList.includes(item.field)) {
            delete item.formula
          }
        })
      }
      cursionTree(deepCopy, fieldList)
      return deepCopy
    },
    // 查询 table 数据
    queryTableDatas(isFlush = false) {
      const param = {
        // isFlush,
        reportCode: this.transJson(this.params5 || '')?.reportCode || 'zyzdzjyszxqkfzj',
        fiscalYear: this.searchDataList.fiscalYear || '',
        startTime: this.condition.startTime ? this.condition.startTime[0] : '',
        endTime: this.condition.endTime ? this.condition.endTime[0] : '',
        mofDivCodes: this.searchDataList.mofDivCodes === ('' || undefined) ? [] : this.getTrees(this.searchDataList.mofDivCodes)
      }
      if (this.isSx && param.startTime !== '' && param.endTime !== '' && param.startTime > param.endTime) {
        this.$message.info('开始时间不能大于结束时间！')
        return
      }
      this.isFlush && (param.isFlush = true)
      this.tableLoading = true
      HttpModule.queryTableDatas(param).then((res) => {
        if (res.code === '000000') {
          this.tableData = res.data.data
          if (this.$store.getters.isFuJian) {
            this.tableColumnsConfig = this.fuJianUseField(this.tableColumnsConfig, this.tableData[0])
          }
          this.reportTime = res.data.reportTime || ''
          this.caliberDeclareContent = res.data.description || ''
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.isFlush = false
        this.tableLoading = false
      })
    },
    initTableData() {
      // let tableDataTest = getFormData('basicInfo', 'tableData')
      // this.tableData = tableDataTest
      // this.initTableData(getFormData('basicInfo', 'tableData'))
    },
    cellDblclick(obj) {
      // console.log('双击', obj)
    },
    onEditClosed(obj, bsTable, xGrid) {
      bsTable.performTableDataCalculate(obj)
    },
    getMofDiv(fiscalYear = this.$store.state.userInfo?.year) {
      HttpModule.getMofTreeData({ fiscalYear }).then(res => {
        if (res.code === '000000') {
          console.log('data', res.data)
          let treeResdata = this.getChildrenNewData1(res.data)
          this.queryConfig[1].itemRender.options = treeResdata
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getChildrenNewData1(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.name
        if (item.children) {
          that.getChildrenNewData1(item.children)
        }
      })
      return datas
    },
    transJson3(str) {
      let strTwo = ''
      str.split(',').reduce((acc, curr) => {
        const [key, value] = curr.split('=')
        acc[key] = value
        strTwo = acc
        return acc
      }, {})
      return strTwo
    },
    cellStyle({ row, rowIndex, column }) {
      // 拿到那些可以进行超链接的表格行
      const hideColumnLinkStr = this.transJson3(this.$store.state.curNavModule.param5)
      if (hideColumnLinkStr.projectCode === 'SH') {
        // 判断只有最底层有超链接
        if (row.children !== undefined) return
      }
      if (hideColumnLinkStr.hideCell && this.cellHide(hideColumnLinkStr.hideCell, column, row)) return
      if (this.isSx) {
        if (['recAmount', 'amountZyxd', 'amountSnjxd', 'amountSjxd', 'amountXjxd', 'amountZjxd', 'amountPayAll', 'amountSnjpay', 'amountSjpay', 'amountXjpay', 'amountZjpay', 'amountSnjwfp', 'amountSjwfp', 'amountXjwfp', 'amountZjwfp', 'amountSnjbjfp', 'amountSnjxjfp', 'amountSbjfp', 'amountSxjfp', 'amountXbjfp', 'amountXxjfp', 'amountZjfp'].includes(column.property)) {
          return {
            color: '#4293F4',
            textDecoration: 'underline'
          }
        }
      } else {
        if (!rowIndex) return
        // 有效的cellValue
        const validCellValue = (row[column.property] * 1)
        if (!validCellValue) return
        const staticStyle = {}
        if (this.fjColorConfig.length && this.cellStyleFiledList.includes(column.property)) {
          this.setColumnBgColor(staticStyle, column, row)
        }
        if (['amountSnjbjfp', 'amountSbjfp', 'amountXjfp', 'amountPayAll'].includes(column.property)) {
          staticStyle.color = '#4293F4'
          staticStyle.textDecoration = 'underline'
        }
        return staticStyle
      }
    },
    isConfigTable() {
      this.loadConfig('BsTable', 'Table101')
      this.loadConfig('BsQuery', 'Query101')
    },
    loadFuJianColorConfig() {
      if (this.$store.getters.isFuJian) {
        let params = {
          menuguid: this.$store.state.curNavModule.guid,
          mof_div_code: this.$store.state.userInfo.province, // 区划
          fiscalyear: this.$store.state.userInfo.year // 年份
        }
        return this.$http.get(BSURL.api_tableconfMenuguid, params).then(res => {
          if (res.rscode === '100000' && Array.isArray(res.data)) {
            let configString = res.data.find(item => item.type === 'colorConfig')?.configure || ''
            let configObject = JSON.parse(configString) || {}
            this.fjColorConfig = configObject?.itemsConfig || []
            this.cellStyleFiledList = this.fjColorConfig.map(item => item.field)
          }
        })
      }
    },
    setColumnBgColor(staticStyle, column, row) {
      let colorItem = this.fjColorConfig.find(item => item.field === column.property)
      if (colorItem) {
        const getCurMonth = moment(this.searchDataList.endTime || Date.now()).month() + 1// moment获取的月份序号(0-11)
        let timeSeqProcess = parseFloat((getCurMonth / 12).toFixed(3)) * 100// 序时进度
        const value = parseFloat(row[column.property] || 0)
        if (value > timeSeqProcess) {
          staticStyle['background-color'] = colorItem.setting?.low || '#ffffff'
        } else if (value < timeSeqProcess) {
          staticStyle['background-color'] = colorItem.setting?.high || '#ffffff'
        }
      }
    }
  },
  mounted() {
    if (this.hideColumnLinkStr.isConfigTable === '1') {
      this.isConfigTable()
    }
  },
  created() {
    this.searchDataList.endTime = this.$XEUtils.toDateString(
      this.$XEUtils.getWhatDay(new Date(), -1),
      'yyyy-MM-dd'
    )
    if (!this.isSx) {
      this.searchDataList.mofDivCodes_name = ''
      this.searchDataList.mofDivCodes = []
    } else {
      this.searchDataList.mofDivCodes = store.state?.userInfo?.province + '##' + store.state?.userInfo?.admdivname + '##'
    }
    this.params5 = this.$store.state.curNavModule.param5
    this.menuId = this.$store.state.curNavModule.guid
    this.menuName = this.$store.state.curNavModule.name
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.getMofDiv()
    this.loadFuJianColorConfig()
    this.queryTableDatas()
  }
}
</script>
<style scoped>
.radio-right {
  float: right;
}
.Titans-table ::v-deep .vxe-body--row.row-yellow {
  background-color: yellow;
  color: #fff;
}
.Titans-table ::v-deep .vxe-body--row.row-blue {
  background-color: blue;
  color: #fff;
}
.Titans-table ::v-deep .vxe-body--row.row-red {
  background-color: red;
  color: #fff;
}
</style>
