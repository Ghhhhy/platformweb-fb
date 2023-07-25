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
            @onSearchClick="search"
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
          :export-modal-config="{ fileName: menuName, addReportTitleColumn: true , addUnitColumn: true }"
          :title="menuName"
          :default-money-unit="10000"
          :cell-style="cellStyle"
          :show-zero="false"
          :formula-digits="1"
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
  </div>
</template>

<script>
import getFormData from './budgetImplementationRegion.js'
import DetailDialog from '../children/detailDialog.vue'
import SDetailDialog from '../children/sDetailDialog.vue'
import HttpModule from '@/api/frame/main/fundMonitoring/budgetImplementationRegion.js'
import regionMixin from '../mixins/regionMixin'
export default {
  mixins: [regionMixin],
  components: {
    DetailDialog,
    SDetailDialog
  },
  computed: {
    isSx() {
      return this.$store.getters.isSx
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
      // // 头部工具栏 BsTabPanel config
      // toolBarStatusBtnConfig: {
      //   changeBtns: true,
      //   // buttons: getFormData('toolBarStatusButtons'),
      //   curButton: {
      //     type: 'button',
      //     iconName: 'base-all.png',
      //     iconNameActive: 'base-all-active.png',
      //     iconUrl: '',
      //     label: '全部',
      //     code: '1',
      //     curValue: '1'
      //   },
      //   buttonsInfo: getFormData('statusRightToolBarButton'),
      //   methods: {
      //     bsToolbarClickEvent: this.onStatusTabClick
      //   }
      // },
      buttonsInfo: getFormData('statusRightToolBarButtonByBusDept'),
      tabStatusNumConfig: {
        1: 0
      },
      // table 相关配置
      tableLoading: false,
      tableConfig: getFormData('basicInfo', 'tableConfig'),
      tableColumnsConfig: getFormData('basicInfo', `tableColumnsConfig${this.transJson(this.$store?.state?.curNavModule?.param5)?.isCity ? 'City' : ''}`),
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
      // mainPagerConfig: {
      //   total: 0,
      //   currentPage: 1,
      //   pageSize: 20
      // },
      tableFooterConfig: {
        showFooter: false
      },
      expandConfig: {
        showIcon: false,
        lazy: true,
        expandAll: true
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
      detailData: [],
      detailQueryParam: {},
      sDetailQueryParam: {}
    }
  },
  mounted() {
    this.getNewData()
  },
  methods: {
    switchMoneyUnit(level) {
      this.tableGlobalConfig.customExportConfig.unit = level === 1 ? '元' : '万元'
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
          this.menuName = '直达资金预算下达_分地区(单位:万元)'
          this.radioShow = true
          break
      }
      this.condition = {}
      this.mainPagerConfig.currentPage = 1
      this.queryTableDatas()
      this.queryTableDatasCount()
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
    handleDetail(reportCode, mofDivCode, column) {
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
      } else {
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
        reportCode: reportCode,
        mofDivCode: mofDivCode,
        speTypeCode: '',
        isBj: isBj,
        isCz: isCz,
        fiscalYear: this.searchDataList.fiscalYear,
        condition: condition,
        endTime: this.condition.endTime ? this.condition.endTime[0] : '',
        proCodes: this.searchDataList.proCodes === '' ? [] : this.getTrees(this.searchDataList.proCodes)
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
      switch (key) {
        // 省本级分配走直达资金项目明细
        case 'amountSnjbjfp':
        case 'amountSbjfp':
        case 'amountXjfp':
          this.handleDetail(xmSource, obj.row.code, key)
          this.detailTitle = '项目明细'
          break
        // 支出走地区支付明细
        case 'amountPayAll':
          this.handleDetail(zcSource, obj.row.code, key)
          this.detailTitle = obj.row.name + '支出明细'
      }
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh(isFlush = true) {
      this.search(this.$refs.queryFrom.getFormData(), '', isFlush)
      // this.queryTableDatasCount()
    },
    getPro(fiscalYear = this.$store.state.userInfo?.year) {
      HttpModule.getProTreeData({ fiscalYear }).then(res => {
        if (res.code === '000000') {
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
    getTrees(val) {
      let proCodes = []
      if (val.trim() !== '') {
        val.split(',').forEach((item) => {
          proCodes.push(item.split('##')[0])
        })
      }
      return proCodes
    },
    // 查询 table 数据
    queryTableDatas(isFlush = true) {
      const param = {
        isFlush,
        reportCode: this.transJson(this.params5 || '')?.reportCode,
        fiscalYear: this.searchDataList.fiscalYear || '',
        endTime: this.condition.endTime ? this.condition.endTime[0] : '',
        proCodes: this.searchDataList.proCodes === '' ? [] : this.getTrees(this.searchDataList.proCodes)
      }
      this.tableLoading = true
      HttpModule.queryTableDatas(param).then((res) => {
        if (res.code === '000000') {
          if (res.data) {
            this.tableData = res.data.data
            this.reportTime = res.data.reportTime || ''
            this.caliberDeclareContent = res.data.description || ''
          }
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.tableLoading = false
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
    getNewData() {
      // this.tableLoading = true
      // setTimeout(() => {
      //   this.tableLoading = false
      //   // this.tableData = getFormData('basicInfo', 'tableData')
      //   this.initTableData(getFormData('basicInfo', 'tableData'))
      // }, 2000)
      // this.initTableData(getFormData('basicInfo', 'tableData'))
    },
    cellDblclick(obj) {
      // console.log('双击', obj)
    },
    onEditClosed(obj, bsTable, xGrid) {
      bsTable.performTableDataCalculate(obj)
    },
    cellStyle({ row, rowIndex, column }) {
      if (!rowIndex) return
      // 有效的cellValue
      const validCellValue = (row[column.property] * 1)
      if (validCellValue && ['amountSnjbjfp', 'amountSbjfp', 'amountXjfp', 'amountPayAll'].includes(column.property)) {
        return {
          color: '#4293F4',
          textDecoration: 'underline'
        }
      }
    }
  },
  created() {
    this.params5 = this.$store.state.curNavModule.param5
    this.menuId = this.$store.state.curNavModule.guid
    this.menuName = this.$store.state.curNavModule.name
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.getPro()
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
