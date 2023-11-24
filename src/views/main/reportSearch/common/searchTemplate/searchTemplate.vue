<!-- 直达资金预算下达_分地区 -->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTap></template>
      <!-- <template v-slot:topTabPane>
        <BsTabPanel
          ref='tabPanel'
          :is-open='isShowQueryConditions'
          :tab-status-btn-config='toolBarStatusBtnConfig'
          :tab-status-num-config='tabStatusNumConfig'
          @onQueryConditionsClick='onQueryConditionsClick'
        />
      </template> -->
      <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="queryConfig"
            :query-form-data="searchDataList"
            @onSearchClick="(e1,e2) => { searchFun(e1,e2,false) }"
            @onSearchResetClick="resetFun"
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
          id="searchReportTemplate"
          ref="bsTableRef"
          row-id="id"
          :table-config="tableConfig"
          :table-columns-config="tableColumnsConfig"
          :table-global-config="tableGlobalConfigCop"
          :table-data="tableData"
          :calculate-constraint-config="calculateConstraintConfig"
          :tree-config="{ dblExpandAll: true, dblExpand: true, accordion: false, iconClose: 'el-icon-circle-plus', iconOpen: 'el-icon-remove' }"
          :toolbar-config="tableToolbarConfig"
          :pager-config="pagerConfig"
          :export-modal-config="{ fileName: menuName, addReportTitleColumn: true , addUnitColumn: true }"
          :title="menuName"
          :default-money-unit="1"
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
    <TotalDetailDialog
      v-if="totalDetailVisible"
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
  </div>
</template>

<script>
import DetailDialog from '../children/detailDialog.vue'
import TotalDetailDialog from '../children/totalDetailDialog.vue'
import SDetailDialog from '../children/sDetailDialog.vue'
import regionMixin from '../mixins/regionMixin.js'
export default {
  mixins: [regionMixin],
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
  components: {
    DetailDialog,
    SDetailDialog,
    TotalDetailDialog
  },
  watch: {
    $refs: {
      handler(newval) {
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      totalDetailVisible: false,
      hideColumnLinkStr: this.transJson3(this.$store.state.curNavModule.param5), // 菜单配置信息
      showZeroState: this.transJson3(this.$store.state.curNavModule.param5).projectCode === 'SH',
      roleguid: this.$store.state.curNavModule.roleguid,
      reportTime: '',
      caliberDeclareContent: '', // 口径说明
      leftTreeVisible: false,
      sDetailVisible: false,
      sDetailTitle: '',
      sDetailData: [],
      isShowQueryConditions: true,
      radioShow: true,
      breakRuleVisible: false,
      tableGlobalConfig: {
        customExportConfig: {
          addUnitColumn: true,
          addReportTitleColumn: true,
          unit: '万元'
        }
      },
      tabStatusNumConfig: {
        1: 0
      },
      // table 相关配置
      tableLoading: false,
      tableConfig: {},
      tableColumnsConfig: [],
      tableData: [],
      obj: {},
      calculateConstraintConfig: {
        enabled: true,
        extendMapInfoField: true, // 是否扩展mapInfo字段
        // gradedSummaryFields: ['bonus', 'income'],
        calcAndConstraintItemCodeField: 'itemCode',
        // 示例中1001为tableId
        // rowCodeFormulaConfig: {
        //   // 单元格交叉计算
        //   // rowFormulaMap= { 'colField:itemcode':'{tableId:colField:itemcode}[运算符]' }
        //   '00:jOut': '{00:amountSbpayApp}+{00:amountSpayApp}+{00:amountXpayApp}'
        //   // '10:bonus': '{1001:income:10}+{1001:bonus:10}',
        //   // '20:bonus': '{1001:income:30}*{1001:age:30}+{1001:bonus:40}'
        // },
        // cellDataConfig: [// 提取和计算
        //
        // ],
        // colFormulaConfig: {
        //   jOut: '{amountSbpayApp}+{amountSpayApp}+{amountXpayApp}',
        //   jLoad: '{jOut}/{jAmount}*100',
        //   sUnassigned: '{jAmount}-{sbbjfpAmount}-{sbxjfpAmount}',
        //   sLoad: '({sbbjfpAmount}+{sbxjfpAmount})/{jAmount}*100',
        //   aUnassigned: '{jAmount}-{sbbjfpAmount}-{sbjfpAmount}-{sxjfpAmount}',
        //   aLoad: '({sbjfpAmount}+{sxjfpAmount})*100',
        //   xUnassigned: '{jAmount}-{sbbjfpAmount}-{sbjfpAmount}-{xbjfpAmount}',
        //   xLoad: '{xbjfpAmount}/{jAmount}*100'
        // },
        getDataAxiosConfig: { // 跨表提取请求配置
          dataField: 'data', // 数据字段
          successCode: '100000', // 成功code
          statusField: 'rscode',
          method: 'get', // 请求方式
          url: '' // 'queryTreeAssistData', //
          //  [{ itemCode: '002', colField: 'f005', value: '1500.0' }, { itemCode: '002001', colField: 'f005', value: '500.0' }]
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
        disabledMoneyConversion: false
      },
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
        print: false, // 打印
        expandAll: true, // 展开所有
        caliberDeclare: true, //
        zoom: true, // 缩放
        custom: true, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      // 操作日志
      logData: [],
      showLogView: false,
      // 请求 & 角色权限相关配置
      menuName: '',
      params5: '',
      menuId: '',
      tokenid: '',
      userInfo: {},
      condition: {},
      queryConfig: [],
      recordSearchDataList: {},
      searchDataList: {},
      detailVisible: false,
      detailType: '',
      sDetailType: '',
      detailTitle: '',
      detailData: [],
      detailQueryParam: {},
      sDetailQueryParam: {}
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
      }
      if (Type === 'BsQuery') {
        let configData = await this.loadBsConfig(params)
        this.queryConfig = configData.itemsConfig
      }
    },
    switchMoneyUnit(level) {
      this.tableGlobalConfig.customExportConfig.unit = level === 1 ? '元' : '万元'
    },
    // 展开折叠查询框
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
    },
    // 初始化高级查询参数condition
    clearConditionList() {
      let clearCondition = {}
      this.queryConfig.forEach((item) => {
        let fieldValue = item.field
        if (item.itemRender.name === '$vxeTree') {
          if (fieldValue) {
            clearCondition[item.field] = []
          }
        } else if (item.itemRender.name === '$formTreeInput') {
          if (item.field === 'incomeSort') {
            clearCondition[item.field + 'Name'] = ''
            clearCondition[item.field + 'Code'] = ''
          }
        } else if (item.itemRender.name === '$vxeSelect') {
          clearCondition[item.field] = []
          if (item.field === 'month') {
            clearCondition[item.field] = ''
          }
        } else {
          if (item.field) {
            clearCondition[fieldValue] = ''
          }
        }
      })
      return clearCondition
    },
    // 初始化高级查询参数condition
    getConditionList() {
      let condition = {}
      this.queryConfig.forEach((item) => {
        let fieldValue = item.field
        let curValue = this.searchDataList[fieldValue]
        if (item.itemRender.name === '$vxeTree') {
          if (fieldValue) {
            if (fieldValue === 'mofDivCodes') {
              if (Array.isArray(this.searchDataList[item.field])) {
                condition[fieldValue] = curValue
              } else {
                let newFieldName = fieldValue + '_code__multiple'
                if (this.searchDataList[newFieldName]) {
                  condition[fieldValue] = this.searchDataList[newFieldName]
                } else {
                  if (curValue.trim() !== '') {
                    condition[fieldValue] = []
                    curValue.split(',').forEach((item) => {
                      condition[fieldValue].push(item)
                    })
                  }
                }
              }
            } else {
              condition[item.field] = curValue
            }
          }
        } else if (item.itemRender.name === '$formTreeInput') {
          if (item.field === 'incomeSort') {
            condition[item.field + 'Name'] = this.searchDataList[item.field + 'name']
            condition[item.field + 'Code'] = this.searchDataList[item.field + 'code']
          }
        } else if (item.itemRender.name === '$vxeSelect') {
          let levelsArr = []
          if (item.field === 'levels') {
            if (curValue) {
              levelsArr.push(curValue)
            }
            condition[item.field] = levelsArr
          }
          if (item.field === 'month') {
            condition[item.field] = curValue
          }
        } else if (item.itemRender.name === '$vxeMoney') {
          let newFieldName = fieldValue + '__moneySwitchinput'
          if (this.searchDataList[newFieldName]) {
            condition[fieldValue] = this.searchDataList[newFieldName]
          } else {
            condition[fieldValue] = curValue
          }
        } else {
          if (item.field) {
            condition[fieldValue] = curValue
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
          this.menuName = '直达资金预算下达_分地区(单位:万元)'
          this.radioShow = true
          break
      }
      this.condition = {}
      this.mainPagerConfig.currentPage = 1
      this.queryTableDatas()
      this.$refs.mainTableRef.$refs.xGrid.clearScroll()
    },
    // 前端筛选过滤数据
    frontQueryTableDatas(val, multipleValue = {}) {
      let curTableData = window.deepCopy(this.tableData)
      this.queryConfig.forEach((item) => {
        if (
          item.itemRender.name === '$formTreeInput' ||
          item.itemRender.name === '$vxeTree'
        ) {
          if (item.field && val[item.field + 'code']) {
            curTableData = curTableData.filter(l =>
              l[item.field] === val[item.field + 'code']
            )
          }
        } else if (item.type === 'fuzzyQuery') {
          if (item.field && val[item.field]) {
            curTableData = curTableData.filter(m =>
              m[item.field].indexOf(val[item.field]) !== -1
            )
          }
        } else if (item.type === 'miniRange') {
          if (item.field && val[item.field]) {
            curTableData = curTableData.filter(n =>
              n[item.field] > val[item.field]
            )
          }
        } else if (item.type === 'maxRange') {
          if (item.field && val[item.field]) {
            curTableData = curTableData.filter(k =>
              k[item.field] < val[item.field]
            )
          }
        } else if (item.type === 'vxeSelect') {
          if (item.field && val[item.field]) {
            curTableData = curTableData.filter(k =>
              k[item.field] === val[item.field]
            )
          }
        }
      })
      this.tableData = curTableData
    },
    // 搜索
    search(val, multipleValue = {}) {
      this.searchDataList = val
      let condition = this.getConditionList()
      this.recordSearchDataList = condition
      this.queryTableDatas()
    },
    // 重置功能方法
    resetFun() {
      let clearCondition = this.clearConditionList()
      this.recordSearchDataList = clearCondition
      this.queryTableDatas()
    },
    // 搜索功能方法
    searchFun(val, multipleValue = {}) {
      // if (this.pagerConfig.pageSize === 999999) {
      //   this.tableLoading = true
      //   this.frontQueryTableDatas(val, multipleValue)
      // }
      this.search(val, multipleValue)
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
    handleDetail(reportCode, row, column) {
      let that = this
      // 拿到那些可以进行超链接的表格行
      const hideColumnLinkStr = that.transJson3(this.$store.state.curNavModule.param5)
      if (hideColumnLinkStr.projectCode === 'SH') {
        if (row.children !== undefined) return
      }
      let condition = ''
      let areaType = column.own.areaType
      if (this.transJson(this.$store?.state?.curNavModule?.param5)?.isCity) { // 判断是不是city
        if (areaType === 'city') {
          condition = 'substr(mof_div_code,3,7) = \'0000000\'  '
        } else if (areaType === 'region') {
          condition = ' substr(mof_div_code,5,5) <> \'00000\' and substr(mof_div_code,7,3)=\'000\' '
        } else if (areaType === 'town') {
          condition = ' substr(mof_div_code,7,3) <> \'000\' '
        }
      } else if (this.$store.state.userInfo.province?.slice(0, 4) === '3502') { // 判断上海项目
        if (areaType === 'province') {
          condition = ' substr(mof_div_code,5,5) = \'00000\' and mof_div_code not like \'%35\''
        } else if (areaType === 'city') {
          condition = ' substr(mof_div_code,5,5) = \'00000\' and mof_div_code  like \'%35\' '
        } else if (areaType === 'county') {
          condition = ' substr(mof_div_code,5,5) <> \'00000\' and substr(mof_div_code,7,3)=\'000\' '
        }
      } else if (this.$store.state.userInfo.province?.slice(0, 2) === '22') {
        if (areaType === 'province') {
          condition = 'substr(mof_div_code,3,7) = \'0000000\'  '
        } else if (areaType === 'city') {
          condition = ' substr(mof_div_code,3,7) <> \'0000000\' and substr(mof_div_code,5,5)=\'00000\' '
        } else if (areaType === 'county') {
          condition = ' substr(mof_div_code,5,5) <> \'00000\''
        }
      } else {
        if (areaType === 'province') {
          condition = 'substr(mof_div_code,3,7) = \'0000000\'  '
        } else if (areaType === 'city') {
          condition = ' substr(mof_div_code,3,7) <> \'0000000\' and substr(mof_div_code,5,5)=\'00000\' '
        } else if (areaType === 'county') {
          condition = ' substr(mof_div_code,5,5) <> \'00000\' and substr(mof_div_code,7,3)=\'000\' '
        }
      }
      let isBj = ''
      switch (column.property) {
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
        reportCode: reportCode,
        mofDivCodes: row.mofDivCode,
        speTypeCode: '',
        isBj: isBj,
        isCz: isCz,
        fiscalYear: this.$store.state.userInfo?.year || new Date().getFullYear(),
        condition: condition
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
    // 表格单元行单击
    cellClick(obj, context, e) {
      const rowIndex = obj?.rowIndex
      if (!rowIndex) return
      let key = obj.column.property
      // 无效的cellValue
      const isInvalidCellValue = !(obj.row[obj.column.property] * 1)
      if (isInvalidCellValue) return
      let xmSource = 'zdzjxmmx_fdq'
      let zcSource = 'zdzjzcmx_fdq'
      if (this.transJson(this.params5 || '')?.reportCode === 'zxjd_fdq') {
        xmSource = 'zxjdxmmx_fdq'
        zcSource = 'zxjdzcmx_fdq'
      }
      if (this.transJson(this.params5 || '')?.reportCode === 'zyzfyszxqkfdq') {
        xmSource = 'zyzfxmmx'
        zcSource = 'zyzfzcmx_fdq'
      }
      switch (key) {
        // 省本级分配走直达资金项目明细
        case 'amountSnjbjfp':
        case 'amountSbjfp':
        case 'amountXjfp':
          this.handleDetail(xmSource, obj.row, obj.column)
          this.detailTitle = '项目明细'
          break
        // 支出走地区支付明细
        case 'amountPayAll':
          this.handleDetail(zcSource, obj.row, obj.column)
          this.detailTitle = obj.row.name + '支出明细'
      }
    },
    handleCellClick(obj, context, e) {
      let routerNameValue = this.$route.name
      if (this.isSx) {
        this.cellClickSx(obj, context, e)
      } else if (routerNameValue === 'totalReportSearch') {
        this.cellClickTotal(obj, context, e)
      } else {
        this.cellClick(obj, context, e)
      }
    },
    // 表格单元行单击
    cellClickSx(obj, context, e) {
    },
    cellClickTotal(obj) {
      // const rowIndex = obj?.rowIndex
      // if (!rowIndex) return
      let key = obj.column.property
      let map = {
        'am': {
          url: 'generallyIncomeChain',
          reportCode: 'srcx-ybggyssrdyhbzf',
          name: '一般公共预算收入当月环比增幅超过50%'
        },
        'bm': {
          url: 'generallyIncomeCompare',
          reportCode: 'srcx-ybggyssrdytbzf',
          name: '一般公共预算收入当月同比增幅超过50%'
        },
        'cm': {
          url: 'generallyIncomeAddCompare',
          reportCode: 'srcx-ybggyssrljtbzf',
          name: '一般公共预算收入累计同比增幅超20%%'
        },
        'dm': {
          url: 'revenueAddCompare',
          reportCode: 'srcx-sssrejkmljtbzf',
          name: '税收收入二级科目累计同比增幅超50%'
        },
        'em': {
          url: 'nonTaxAddCompare',
          reportCode: 'srcx-fssrejkmljtbzf',
          name: '非税收入二级科目累计同比增幅超50%'
        },
        'fm': {
          url: 'landIncomeCompare',
          reportCode: 'srcx-tdcrljsrtbzf',
          name: '土地出让累计收入同比增幅超100%'
        },
        'gm': {
          url: 'revenueProportion',
          reportCode: 'srcx-sszbxy',
          name: '税收占比小于80%'
        },
        'hm': {
          url: 'landIncomePassBudget',
          reportCode: 'srcx-tdcrsrdyybggyssr',
          name: '土地出让收入大于一般公共预算收入'
        },
        'sm': {
          url: 'threeDefendPayManage',
          reportCode: 'srcx-sbzcgl',
          name: '“三保”支出管理'
        }
      }
      let routeKey = key.substring(0, 2)
      let param = { ...map[routeKey] }
      if (key !== 'sb') {
        let month = key.substring(key.length - 1, key.length)
        param.month = month
      }
      param.mofDivCode = obj.row.code
      const reportCode = map[routeKey].reportCode
      if (obj.column.own.canInsert === false) return
      this.detailQueryParam = param
      this.detailType = reportCode
      this.totalDetailVisible = true
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh() {
      this.search(this.$refs.queryFrom.getFormData(), '')
    },
    // 获取表格数据
    async queryTableDatas() {
      let curThis = this
      let infoValue = ''
      this.queryConfig.forEach((item) => {
        let fieldValue = item.field
        let fieldName = item.typeKeyValue
        if (fieldName && (fieldValue === 'min' + fieldName)) {
          let minValue = this.recordSearchDataList['min' + item.typeKeyValue]
          let maxValue = this.recordSearchDataList['max' + item.typeKeyValue]
          if (minValue && maxValue && (Number(maxValue) < Number(minValue))) {
            let curTitle = item.title
            let maxTitle = curTitle.replace('小', '大')
            let messageValue = curTitle + '应小于' + maxTitle + ','
            infoValue = infoValue + messageValue
          }
        }
      })
      if (infoValue) {
        infoValue = infoValue + '请修改搜索条件！'
        this.$message.info(infoValue)
        return
      }
      let curParam = {
        page: curThis.pagerConfig.currentPage, // 页码
        pageSize: curThis.pagerConfig.pageSize, // 每页条数
        fiscalYear: curThis.$store.state.userInfo?.year || new Date().getFullYear(),
        reportCode: curThis.transJson(curThis.params5 || '')?.reportCode || 'wfszbmxcx'
      }
      curParam = { ...curParam, ...curThis.recordSearchDataList }
      console.log(curThis)
      if (Array.isArray(curParam.month) && curParam.month.length === 0) {
        curParam.month = ''
      }
      curThis.tableLoading = true
      // dfr-monitor-service/dfr/zdzjledger/query
      // dfr-monitor-service/dfr/supervision/query
      await curThis.$http.post('dfr-monitor-service/dfr/supervision/query', curParam).then((res) => {
        if (res.code === '000000') {
          if (res.data) {
            curThis.tableData = res.data
            curThis.reportTime = res.data.reportTime || ''
            curThis.caliberDeclareContent = res.data.description || ''
          }
        } else {
          curThis.$message.error(res.message)
        }
      }).finally(() => {
        curThis.tableLoading = false
      })
    },
    initTableData(tableDataTest) {
      let arr = JSON.parse(JSON.stringify(tableDataTest))
      arr.map(v => {
        if ((parseFloat(v.recDivCode) / 10000000).toString().length === 2) {
          v.type = 1
        } else if ((parseFloat(v.recDivCode) / 10000000).toString().length === 5) {
          v.type = 2
        } else if ((parseFloat(v.recDivCode) / 10000000).toString().length === 7) {
          v.type = 3
        }
      })
      this.obj = {}
      arr.forEach(item => {
        if (item.type === 1) {
          this.obj[item.recDivCode.substring(0, 2)] = item
          item.children = []
          this.tableData.push(item)
        } else if (item.type === 2) {
          this.obj[item.recDivCode.substring(0, 5)] = item
          item.children = []
          this.tableData[0].children.push(item)
        } else if (item.type === 3) {
          this.obj[item.recDivCode.substring(0, 7)] = item
        }
      })
      for (const key in this.obj) {
        // const i = key.length - 2
        // const pkey = key.substring(0, i)
        for (var a = 0; a < this.tableData[0].children.length; a++) {
          if (this.tableData[0].children[a] !== this.obj[key] && this.tableData[0].children[a].recDivCode.substring(0, 4) === this.obj[key].recDivCode.substring(0, 4) && this.tableData[0].children[a].type < this.obj[key].type) {
            this.tableData[0].children[a].children.push(this.obj[key])
          }
        }
      }
      return this.tableData
    },
    cellDblclick(obj) {
      // console.log('双击', obj)
    },
    onEditClosed(obj, bsTable, xGrid) {
      bsTable.performTableDataCalculate(obj)
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
      // 拿到那些可以进行超链接的表格行
      const hideColumnLinkStr = this.transJson3(this.$store.state.curNavModule.param5)
      if (hideColumnLinkStr.projectCode === 'SH') {
        // 判断只有最底层有超链接
        if (row.children !== undefined) return
      }
      if (!rowIndex) return
      // 有效的cellValue
      const validCellValue = (row[column.property] * 1)
      if (column.own.canInsert === false) return
      if (validCellValue && ['amountSnjbjfp', 'amountSbjfp', 'amountXjfp', 'amountPayAll'].includes(column.property)) {
        return {
          color: '#4293F4',
          textDecoration: 'underline'
        }
      }
      if (validCellValue && (column.property.indexOf('month') !== -1 || column.property === 'sbzcgl')) {
        return {
          color: '#4293F4',
          textDecoration: 'underline'
        }
      }
    },
    isConfigTable() {
      this.loadConfig('BsTable', 'Table101')
      this.loadConfig('BsQuery', 'Query101')
    }
  },
  mounted() {
    if (this.hideColumnLinkStr?.isConfigTable === '1') {
      this.isConfigTable()
    }
  },
  created() {
    this.params5 = this.$store.state.curNavModule.param5
    this.menuId = this.$store.state.curNavModule.guid
    this.menuName = this.$store.state.curNavModule.name
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    let routerNameValue = this.$route.name
    console.log(this.$route)
    if (routerNameValue !== 'searchTemplate') {
      this.getFormData = require(`../js/${routerNameValue}.js`).default
    } else {
      this.getFormData = require('./searchTemplate.js').default
    }
    this.tableConfig = this.getFormData('basicInfo', 'tableConfig')
    this.tableColumnsConfig = this.getFormData('basicInfo', `tableColumnsConfig${this.transJson(this.$store?.state?.curNavModule?.param5)?.isCity ? 'City' : ''}`)
    this.queryConfig = this.getFormData('highQueryConfig')
    let clearCondition = this.clearConditionList()
    this.recordSearchDataList = clearCondition
    this.queryTableDatas(false)
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
