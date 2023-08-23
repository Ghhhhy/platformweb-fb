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
          :export-modal-config="{ fileName: menuName }"
          :table-config="tableConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :calculate-constraint-config="calculateConstraintConfig"
          :tree-config="{ dblExpandAll: true, dblExpand: true, accordion: false, iconClose: 'el-icon-circle-plus', iconOpen: 'el-icon-remove' }"
          :toolbar-config="tableToolbarConfig"
          :table-global-config="tableGlobalConfigCop"
          :pager-config="pagerConfig"
          :default-money-unit="10000"
          @editClosed="onEditClosed"
          @cellDblclick="cellDblclick"
          @cellClick="cellClick"
          @onToolbarBtnClick="onToolbarBtnClick"
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
    <DetailDialog
      v-if="detailVisible"
      :title="detailTitle"
      :detail-data="detailData"
    />
    <vxe-modal
      v-if="warnRegionSummaryVisible"
      v-model="warnRegionSummaryVisible"
      width="100%"
      height="90%"
      :show-footer="false"
      :title="regionTitle"
    >
      <SpecialWarnRegionSummary
        :region-title="regionTitle"
        :region-data="regionData"
      />
    </vxe-modal>

  </div>
</template>

<script>
import getFormData from './specialWarnRuleSummary.js'
import DetailDialog from './children/wdetailDialog.vue'
import HttpModule from '@/api/frame/main/fundMonitoring/warnRuleSummary.js'
import SpecialWarnRegionSummary from '@/views/main/fundMonitoring/specialWarnRegionSummary/specialWarnRegionSummary.vue'
import moment from 'moment'

export default {
  components: {
    DetailDialog,
    SpecialWarnRegionSummary
  },
  computed: {
    tableGlobalConfigCop() {
      let dataType = this.transJson(this.$store.state.curNavModule.param5 || '').exportModalDefaultSelect || 'fullData'
      return {
        customExportConfig: {
          dataType: dataType,
          addUnitColumn: true,
          addReportTitleColumn: true,
          fileName: this.menuName
        }
      }
    }
  },
  props: {
    ruleTitle: {
      type: String,
      default: ''
    },
    ruleData: {
      type: Array,
      default() {
        return []
      }
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
      leftTreeVisible: false,
      sDetailVisible: false,
      sDetailTitle: '',
      sDetailData: [],
      isShowQueryConditions: true,
      radioShow: true,
      breakRuleVisible: false,
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
      tableColumnsConfig: getFormData('basicInfo', 'tableColumnsConfig'),
      tableData: [],
      obj: {},
      calculateConstraintConfig: {
        enabled: true,
        extendMapInfoField: true, // 是否扩展mapInfo字段
        // gradedSummaryFields: ['bonus', 'income'],
        calcAndConstraintItemCodeField: 'itemCode',
        // 示例中1001为tableId
        rowCodeFormulaConfig: {
          // 单元格交叉计算
          // rowFormulaMap= { 'colField:itemcode':'{tableId:colField:itemcode}[运算符]' }
          '00:jOut': '{00:sbpayAppAmt}+{00:spayAppAmt}+{00:xpayAppAmt}'
          // '10:bonus': '{1001:income:10}+{1001:bonus:10}',
          // '20:bonus': '{1001:income:30}*{1001:age:30}+{1001:bonus:40}'
        },
        cellDataConfig: [// 提取和计算

        ],
        colFormulaConfig: {
        },
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
        moneyConversion: false, // 是否有金额转换
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
      detailTitle: '',
      regionTitle: '',
      fiscalYear: '',
      detailData: [],
      regionData: [],
      warnRegionSummaryVisible: false,
      proCodes: [],
      mofDivCodes: [],
      ruleCodes: [],
      warnStartDate: '',
      warnEndDate: ''
    }
  },
  mounted() {
    // this.showInfo()
    // this.getNewData()
  },
  methods: {
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
          this.menuName = '直达资金地方预警汇总'
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
      condition.proCodes = condition.proCodes?.split('##')[0]
      condition.mofDivCodes = condition.mofDivCodes?.split('##')[0]
      condition.ruleCodes = condition.ruleCodes?.split('##')[0]
      this.condition = condition
      this.queryTableDatas()
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
          this.refresh()
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
    handleDetail(type, mofDivCode) {
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property

      // 无效的cellValue
      // const isInvalidCellValue = !(obj.row[obj.column.property] * 1)
      // if (isInvalidCellValue) return
      this.fiscalYear = this.searchDataList.fiscalYear === '' ? this.$store.state.userInfo.curyear : this.searchDataList.fiscalYear
      this.mofDivCodes = this.searchDataList.mofDivCodes === '' ? [] : this.getTrees(this.searchDataList.mofDivCodes)
      this.proCodes = this.searchDataList.proCodes === '' ? this.proCodes : this.getTrees(this.searchDataList.proCodes)
      this.warnStartDate = this.searchDataList.warnStartDate === '' || this.searchDataList.warnStartDate === undefined ? '' : moment(this.searchDataList.warnStartDate).format('YYYY-MM-DD') + ' 00:00:00'
      this.warnEndDate = this.searchDataList.warnEndDate === '' || this.searchDataList.warnEndDate === undefined ? '' : moment(this.searchDataList.warnEndDate).format('YYYY-MM-DD') + ' 23:59:59'
      switch (key) {
        case 'name':
          console.info(obj.row.id.length)
          if (obj.row.id.length > 4) {
            this.regionData = ['name', obj.row.code, this.fiscalYear, this.proCodes, this.mofDivCodes, this.warnStartDate, this.warnEndDate]
            this.regionTitle = '专项监督预警汇总_分地区'
            this.warnRegionSummaryVisible = true
          }
          break
        case 'numbernofileNum':
          this.detailData = ['numbernofileNum', obj.row.code, this.fiscalYear, this.proCodes, this.mofDivCodes, this.warnStartDate, this.warnEndDate]
          this.detailTitle = '指标预警-待整改明细'
          this.detailType = 'numbernofileNum'
          this.detailVisible = true
          break
        case 'numberfileNum':
          this.detailData = ['numberfileNum', obj.row.code, this.fiscalYear, this.proCodes, this.mofDivCodes, this.warnStartDate, this.warnEndDate]
          this.detailTitle = '指标预警-已整改明细'
          this.detailVisible = true
          this.detailType = 'numberfileNum'
          break
        case 'numberwarnUndoNum':
          this.detailData = ['numberwarnUndoNum', obj.row.code, this.fiscalYear, this.proCodes, this.mofDivCodes, this.warnStartDate, this.warnEndDate]
          this.detailTitle = '支出预警-未认定明细'
          this.detailVisible = true
          this.detailType = 'numberwarnUndoNum'
          break
        case 'numberwarndoNum':
          this.detailData = ['numberwarndoNum', obj.row.code, this.fiscalYear, this.proCodes, this.mofDivCodes, this.warnStartDate, this.warnEndDate]
          this.detailTitle = '支出预警-已认定明细'
          this.detailVisible = true
          this.detailType = 'numberwarndoNum'
          break
        case 'numberwarnUndoNoNum':
          this.detailData = ['numberwarnUndoNoNum', obj.row.code, this.fiscalYear, this.proCodes, this.mofDivCodes, this.warnStartDate, this.warnEndDate]
          this.detailTitle = '支出预警-待整改明细'
          this.detailVisible = true
          this.detailType = 'numberwarnUndoNoNum'
          break
        case 'numberwarndidNum':
          this.detailData = ['numberwarndidNum', obj.row.code, this.fiscalYear, this.proCodes, this.mofDivCodes, this.warnStartDate, this.warnEndDate]
          this.detailTitle = '支出预警-已整改明细'
          this.detailVisible = true
          this.detailType = 'numberwarndidNum'
          break
        case 'numberhqlmUndoNum':
          this.detailData = ['numberhqlmUndoNum', obj.row.code, this.fiscalYear, this.proCodes, this.mofDivCodes, this.warnStartDate, this.warnEndDate]
          this.detailTitle = '未导入惠企利民明细-未处理明细'
          this.detailVisible = true
          this.detailType = 'numberhqlmUndoNum'
          break
        case 'numberhqlmdoNum':
          this.detailData = ['numberhqlmdoNum', obj.row.code, this.fiscalYear, this.proCodes, this.mofDivCodes, this.warnStartDate, this.warnEndDate]
          this.detailTitle = '未导入惠企利民明细-已整改明细'
          this.detailVisible = true
          this.detailType = 'numberhqlmdoNum'
          break
      }
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh() {
      this.queryTableDatas()
      // this.queryTableDatasCount()
    },
    // 查询 table 数据
    queryTableDatas(val) {
      const param = {
        fiscalYear: this.searchDataList.fiscalYear === '' ? this.$store.state.userInfo.curyear : this.searchDataList.fiscalYear,
        regulationClass: this.transJson(this.$store.state.curNavModule?.param5)?.regulationClass || '09',
        proCodes: this.searchDataList.proCodes === '' ? this.proCodes : this.getTrees(this.searchDataList.proCodes),
        mofDivCodes: this.searchDataList.mofDivCodes === '' ? [] : this.getDivTrees(this.searchDataList.mofDivCodes),
        ruleCodes: this.ruleCodes,
        affirmTimeStartDate: this.searchDataList.affirmTimeStartDate,
        affirmTimeEndDate: this.searchDataList.affirmTimeEndDate,
        warnEndDate: this.searchDataList.warnEndDate && moment(this.searchDataList.warnEndDate).format('YYYY-MM-DD') + ' 23:59:59',
        warnStartDate: this.searchDataList.warnStartDate && moment(this.searchDataList.warnStartDate).format('YYYY-MM-DD') + ' 00:00:00'
      }
      this.tableLoading = true
      HttpModule.queryTableDatas(param).then((res) => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
    cellDblclick(obj) {
      // console.log('双击', obj)
    },
    onEditClosed(obj, bsTable, xGrid) {
      bsTable.performTableDataCalculate(obj)
    },
    showInfo() {
      if (this.ruleData && this.ruleData.length > 0) {
        this.menuName = this.ruleTitle
        this.proCodes.push(this.ruleData[1])
        this.mofDivCodes = this.ruleData[3]
        this.ruleCodes = this.ruleData[4]
      }
    },
    getMofDiv(fiscalYear = this.$store.state.userInfo?.year) {
      HttpModule.getMofTreeData({ fiscalYear }).then(res => {
        if (res.code === '000000') {
          console.log('data', res.data)
          let treeResdata = this.getChildrenNewData(res.data)
          this.queryConfig[1].itemRender.options = treeResdata
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getChildrenNewData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.name
        if (item.children) {
          that.getChildrenNewData(item.children)
        }
      })
      return datas
    },
    getPro(fiscalYear = this.$store.state.userInfo?.year) {
      HttpModule.getProSpeTreeData({
        fiscalYear: fiscalYear
      }).then(res => {
        if (res.code === '000000') {
          let treeResdata = this.getChildrenNewData1(res.data)
          this.queryConfig[2].itemRender.options = treeResdata
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
    getDivTrees(val) {
      let mofDivCodes = []
      if (val.trim() !== '') {
        val.split(',').forEach((item) => {
          mofDivCodes.push(item.split('##')[0])
        })
      }
      return mofDivCodes
    }
  },
  created() {
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.menuName = this.$store.state.curNavModule.name
    this.showInfo()
    this.getMofDiv()
    this.getPro()
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
