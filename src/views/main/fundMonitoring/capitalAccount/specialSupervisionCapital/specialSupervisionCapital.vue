<!-- eslint-disable no-undef -->
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
            @onSearchClick="search"
            @itemChange="itemChange"
          />
        </div>
      </template>
      <template v-slot:mainForm>
        <BsTable
          id="1001"
          ref="bsTableRef"
          row-id="id"
          :table-config="tableConfig"
          :table-global-config="tableGlobalConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :calculate-constraint-config="calculateConstraintConfig"
          :tree-config="{ dblExpandAll: true, dblExpand: true, accordion: false, iconClose: 'el-icon-circle-plus', iconOpen: 'el-icon-remove' }"
          :toolbar-config="tableToolbarConfig"
          :pager-config="pagerConfig"
          :default-money-unit="10000"
          :export-modal-config="{ fileName: menuName, addReportTitleColumn: true, addUnitColumn: true }"
          :cell-style="cellStyle"
          :title="menuName"
          :show-zero="showZero"
          @editClosed="onEditClosed"
          @cellDblclick="cellDblclick"
          @onToolbarBtnClick="onToolbarBtnClick"
          @cellClick="cellClick"
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
          </template>
          <template v-slot:toolbar-custom-slot>
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
import getFormData from './specialSupervisionCapital.js'
import DetailDialog from '../children/zxdetailDialog.vue'
import SDetailDialog from '../children/sDetailDialog.vue'
import ImportModal from './components/ImportModal'
import HttpModule from '@/api/frame/main/fundMonitoring/budgetImplementationRegion.js'
import { checkRscode } from '@/utils/checkRscode'
// import proconf from '../children/column'
import capitalMixin from '../mixins/capitalMixin'
const dictionary = {
  '中央下达': 'amountZyxd',
  '支出-金额': 'amountPayAll',
  '省级分配本级': 'amountSnjbjfp',
  '省级分配下级': 'amountSnjxjfp',
  '市级分配本级': 'amountSbjfp',
  '市级分配下级': 'amountSxjfp',
  '县级已分配': 'amountXjfp'
}
export default {
  mixins: [capitalMixin],
  components: {
    DetailDialog,
    SDetailDialog,
    ImportModal
  },
  computed: {
    menuSettingConfig() { // 路由菜单配置信息
      return this.transJson2(this.$store.state.curNavModule.param5 || '')
    }
  },
  watch: {
    $refs: {
      handler(newval) {
      },
      deep: true,
      immediate: true
    },
    queryConfig() {
      this.getSearchDataList()
    }
  },
  data() {
    return {
      otherSysImportModal: false, // 华青数据导入弹窗显隐
      caliberDeclareContent: '', // 口径说明
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
      // table 相关配置
      tableGlobalConfig: {
        customExportConfig: {
          addUnitColumn: true,
          addReportTitleColumn: true,
          unit: '万元'
        }
      },
      tableLoading: false,
      tableConfig: getFormData('basicInfo', 'tableConfig'),
      tableColumnsConfig: getFormData('basicInfo', `tableColumnsConfig${this.transJson(this.$store?.state?.curNavModule?.param5)?.isCity ? 'City' : ''}`),
      tableData: [],
      showZero: this.transJson3(this.$store.state.curNavModule.param5).projectCode === 'SH',
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
      queryConfig: getFormData('highQueryConfig'),
      searchDataList: getFormData('highQueryData'),
      detailVisible: false,
      detailType: '',
      sDetailType: '',
      detailTitle: '',
      mofDivCodes: [],
      detailData: [],
      detailQueryParam: {},
      sDetailQueryParam: {}
    }
  },
  mounted() {
    // this.tableLoading = true
    // setTimeout(() => {
    //   this.tableLoading = false
    //   this.initTableData()
    // }, 2000)
    // this.initTableData()

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
      }
      if (Type === 'BsQuery') {
        let configData = await this.loadBsConfig(params)
        this.queryConfig = configData.itemsConfig
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
          this.menuName = '直达资金预算下达_分资金(单位:万元)'
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
      condition.mofDivCodes = condition.mofDivCodes?.split('##')[0]
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
      switch (code) {
        // 刷新
        case 'refresh':
          this.$confirm('重新加载数据可能需要等待较长时间，确认继续？', '操作确认提示', {
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
      let rowCodeHide = hideColumnLinkStr.rowCodeHide ? hideColumnLinkStr.rowCodeHide.split('#') : []
      let Arraya = hideColumnLinkStr.hideColumn_link ? hideColumnLinkStr.hideColumn_link.split('#') : []
      if (Arraya.length > 0 && rowCodeHide.length === 0) { // 只配置了隐藏行
        if (Arraya.includes(column)) {
          return
        }
      } else if (Arraya.length === 0 && rowCodeHide.length > 0) { // 只配置了隐藏列
        if (rowCodeHide.includes(row.code)) {
          return
        }
      } else if (Arraya.length > 0 && rowCodeHide.length > 0) { // 都配置了隐藏行 都配置了隐藏列 那就只隐藏交叉单元格
        if ((rowCodeHide.includes(row.code) && Arraya.includes(column))) {
          return
        }
      }
      let condition = ''
      if (this.transJson(this.$store?.state?.curNavModule?.param5)?.isCity || this.transJson2(this.params5 || '')?.projectCode === 'SH') {
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
      console.log('xxxxxxxxxx', this.searchDataList.mofDivCodes)
      reportCode = reportCode === 'zxjdxmmx_fzj_xj' ? 'zxjdxmmx_fzj' : reportCode
      reportCode = reportCode === 'zdzjxmmx_xj' ? 'zdzjxmmx' : reportCode
      this.detailQueryParam = {
        condition: condition,
        reportCode: reportCode,
        // proCodes: [proCode],
        proCode: proCode,
        column: column,
        speTypeCode: '',
        isBj: isBj,
        isCz: isCz,
        endTime: this.condition.endTime ? this.condition.endTime[0] : '',
        fiscalYear: this.searchDataList.fiscalYear,
        mofDivCodes: this.searchDataList.mofDivCodes === '' || this.searchDataList.mofDivCodes === undefined ? [] : this.getTrees(this.searchDataList.mofDivCodes),
        isCentral: this.searchDataList.isCentral || '',
        isZd: this.searchDataList.isZd || ''
      }
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
    // 表格单元行单击  'amountSnjbjfp', 'amountSbjfp', 'amountXjfp', 'amountPayAll'
    cellClick(obj, context, e) {
      const rowIndex = obj?.rowIndex
      if (!rowIndex) return
      let key = obj.column.property
      // 无效的cellValue
      const hideColumnLinkStr = this.transJson3(this.$store.state.curNavModule.param5)
      if (hideColumnLinkStr.projectCode !== 'SH') {
        const isInvalidCellValue = !(obj.row[obj.column.property] * 1)
        if (isInvalidCellValue) return
      }
      let xmSource = 'zdzjxmmx'
      let zcSource = 'zdzjzcmx_fzj'
      if (this.transJson(this.params5 || '')?.reportCode === 'zxjd_fzj' || this.transJson(this.params5 || '')?.reportCode === 'zxjd_fzj_central') {
        xmSource = 'zxjdxmmx_fzj'
        zcSource = 'zxjdzcmx_fzj'
      }
      const isSH = this.menuSettingConfig['projectCode'] === 'SH'// 判断上海项目
      const fpbjShow = this.menuSettingConfig['fpbjShow'] === 'false' // 省，市，县分配本级是否显示
      const fpxjShow = this.menuSettingConfig['fpxjShow'] === 'false'// 省，市分配下级是否显示
      const zcjeShow = this.menuSettingConfig['zcjeShow'] === 'false'// 支出-金额是否显示
      if (!zcjeShow && key === dictionary['支出-金额']) {
        this.handleDetail(zcSource, obj.row.code, key, obj.row)
        this.detailTitle = '支出明细'
        return
      }
      if (isSH && key === dictionary['中央下达']) { // 只有上海项目 这个才显示 并且不受其他参数控制
        this.handleDetail('zyxdxmmx_fzj', obj.row.code, key, obj.row)
        this.detailTitle = '中央下达明细'
        return
      }
      if (!fpbjShow && [dictionary['省级分配本级'], dictionary['市级分配本级'], dictionary['县级已分配']].includes(key)) {
        this.handleDetail(xmSource, obj.row.code, key, obj.row)
        this.detailTitle = '项目明细'
      } else if (!fpxjShow && [dictionary['省级分配下级'], dictionary['市级分配下级']].includes(key) && !isSH) {
        this.handleDetail(xmSource, obj.row.code, key, obj.row)
        this.detailTitle = '项目明细'
      } else if (!fpxjShow && [dictionary['省级分配下级'], dictionary['市级分配下级']].includes(key) && isSH) {
        this.handleDetail(xmSource + '_xj', obj.row.code, key, obj.row)
        this.detailTitle = '项目明细'
      }
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh(isFlush = true) {
      this.search(this.$refs.queryFrom.getFormData(), null, isFlush)
      // this.queryTableDatasCount()
    },
    getTrees(val) {
      let mofDivCodes = []
      if (val.trim() !== '') {
        val.split(',').forEach((item) => {
          mofDivCodes.push(item.split('##')[0])
        })
      }
      return mofDivCodes
    },
    // 查询 table 数据
    queryTableDatas(isFlush = false) {
      const param = {
        isFlush,
        reportCode: this.transJson(this.params5 || '')?.reportCode,
        fiscalYear: this.searchDataList.fiscalYear || '',
        endTime: this.condition.endTime ? this.condition.endTime[0] : '',
        mofDivCodes: this.searchDataList.mofDivCodes === '' ? [] : this.getTrees(this.searchDataList.mofDivCodes),
        isCentral: this.searchDataList.isCentral || '',
        isZd: this.searchDataList.isZd || ''
      }
      this.tableLoading = true
      HttpModule.queryTableDatas(param).then((res) => {
        if (res.code === '000000') {
          this.tableData = res.data.data
          this.reportTime = res.data.reportTime || ''
          this.caliberDeclareContent = res.data.description || ''
          this.tableLoading = false
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
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
    transJson3 (str) {
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
      if (!rowIndex) return
      // 有效的cellValue
      // 拿到那些可以进行超链接的表格行
      const hideColumnLinkStr = this.transJson3(this.$store.state.curNavModule.param5)
      if (hideColumnLinkStr.projectCode === 'SH') {
        // 判断只有最底层有超链接
        if (row.children !== undefined) return
      } else {
        const validCellValue = (row[column.property] * 1)
        if (!validCellValue) return
      }
      if (this.linkStyle(row, rowIndex, column)) {
        return {
          color: '#4293F4',
          textDecoration: 'underline'
        }
      }
    },
    linkStyle(row, rowIndex, column) { // 判断是否可以跳转
      const hideColumnLinkStr = this.transJson3(this.$store.state.curNavModule.param5)
      let Arraya = hideColumnLinkStr.hideColumn_link ? hideColumnLinkStr.hideColumn_link.split('#') : []
      // 根据code隐藏对应行
      let rowCodeHide = hideColumnLinkStr.rowCodeHide ? hideColumnLinkStr.rowCodeHide.split('#') : []
      if (Arraya.length > 0 && rowCodeHide.length === 0) { // 只配置了隐藏行
        if (['amountSnjbjfp', 'amountSbjfp', 'amountXjfp', 'amountPayAll', 'amountZyxd', 'amountSnjxjfp', 'amountSxjfp'].includes(column.property) && !Arraya.includes(column.property)) {
          return true
        }
      } else if (Arraya.length === 0 && rowCodeHide.length > 0) { // 只配置了隐藏列
        if (['amountSnjbjfp', 'amountSbjfp', 'amountXjfp', 'amountPayAll', 'amountZyxd', 'amountSnjxjfp', 'amountSxjfp'].includes(column.property) && !rowCodeHide.includes(row.code)) {
          return true
        }
      } else if (Arraya.length > 0 && rowCodeHide.length > 0) { // 都配置了隐藏行 都配置了隐藏列 那就只隐藏交叉单元格
        if (['amountSnjbjfp', 'amountSbjfp', 'amountXjfp', 'amountPayAll', 'amountZyxd', 'amountSnjxjfp', 'amountSxjfp'].includes(column.property) && (!rowCodeHide.includes(row.code) || !Arraya.includes(column.property))) {
          return true
        }
      } else {
        if (['amountSnjbjfp', 'amountSbjfp', 'amountXjfp', 'amountPayAll', 'amountZyxd', 'amountSnjxjfp', 'amountSxjfp'].includes(column.property)) {
          return true
        }
      }
      return false
    },
    transJson2(str) {
      if (!str) return
      let params = str.split(',')
      let result = {}
      if (params && params.length > 0) {
        for (let i = 0; i < params.length; i++) {
          let map = params[i].split('=')
          result[map[0]] = map[1]
        }
      }
      return result
    }
  },
  created() {
    this.params5 = this.$store.state.curNavModule.param5
    this.menuId = this.$store.state.curNavModule.guid
    this.menuName = this.$store.state.curNavModule.name
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.getMofDiv()
    this.queryTableDatas()
    if (this.transJson2(this.params5 || '')?.projectCode !== 'SH') {
      let arr = this.queryConfig.filter(item => {
        return item.field === 'fiscalYear' || item.field === 'mofDivCodes' || item.field === 'endTime'
      })
      this.$set(this, 'queryConfig', arr)
    }
    // 判断是否开放动态表格配置
    const hideColumnLinkStr = this.transJson3(this.$store.state.curNavModule.param5)
    if (hideColumnLinkStr && hideColumnLinkStr.isConfigTable === '1') {
      this.loadConfig('BsTable', 'Table101')
      this.loadConfig('BsQuery', 'Query101')
    }
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
