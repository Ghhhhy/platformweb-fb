<!-- 结转资金预算下达_分地区 -->
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
            :query-form-item-config="projectSearchForm"
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
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :calculate-constraint-config="calculateConstraintConfig"
          :tree-config="{ dblExpandAll: true, dblExpand: true, accordion: false, iconClose: 'el-icon-circle-plus', iconOpen: 'el-icon-remove' }"
          :toolbar-config="tableToolbarConfig"
          :table-global-config="{
            customExportConfig,
          }"
          :pager-config="pagerConfig"
          :default-money-unit="10000"
          :show-zero="false"
          :cell-style="cellStyle"
          @editClosed="onEditClosed"
          @cellDblclick="cellDblclick"
          @onToolbarBtnClick="onToolbarBtnClick"
          @switchMoneyUnit="switchMoneyUnit"
          @cellClick="cellClick"
        >
          <!--口径说明插槽-->
          <template v-if="caliberDeclareContent" v-slot:caliberDeclare>
            <p v-html="caliberDeclareContent"></p>
          </template>
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div class="table-toolbar-left-title">
                <span class="fn-inline">结转资金预算下达_分地区(单位:{{ moneyUnit }})</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <BsOperationLog :logs-data="logData" :show-log-view="showLogView" />
    <CarryImplementationRegionModal ref="CarryImplementationRegionModal" />
  </div>
</template>

<script>
import getFormData from './carryImplementationRegion.js'
import HttpModule from '@/api/frame/main/fundMonitoring/budgetImplementationRegion.js'
import CarryImplementationRegionModal from './carryImplementationRegionModal.vue'
export default {
  components: {
    CarryImplementationRegionModal
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
  computed: {
    customExportConfig() {
      return {
        dataType: this.transJson(this.$store.state.curNavModule.param5 || '').exportModalDefaultSelect || 'fullData',
        fileName: `结转资金预算下达_分地区(单位: ${this.tableGlobalConfig.customExportConfig.unit} )`
      }
    },
    moneyUnit() {
      const moneyUnitValue = this.$refs?.bsTableRef?.moneyUnit || 10000
      const moneyUnitMap = { 10000: '万元', 1: '元' }
      return moneyUnitMap[moneyUnitValue]
    },
    projectSearchForm() { // 福建需要新增2个搜索条件
      if (this.$store.getters.isFuJian) {
        return this.queryConfig.filter(item => {
          return item.field !== 'fiscalYear'
        })
      }
      return this.queryConfig.filter(item => {
        return !['proCodes', 'endTime'].includes(item.field)
      })
    }
  },
  data() {
    return {
      // table 相关配置
      tableGlobalConfig: {
        customExportConfig: {
          // addUnitColumn: true,
          // addReportTitleColumn: true,
          unit: '万元'
        }
      },
      caliberDeclareContent: '', // 口径说明
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
      detailData: []
    }
  },
  mounted() {
    // this.getNewData()
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
    // 搜索
    search(val, multipleValue = {}, isFlush = false) {
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
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh(isFlush = true) {
      // this.queryTableDatas(true)
      this.search(this.$refs.queryFrom.getFormData(), null, isFlush)
      // this.queryTableDatasCount()
    },
    // 查询 table 数据
    queryTableDatas(isFlush = true) {
      const param = {
        reportCode: 'jzzjysxd_fdq',
        isFlush,
        fiscalYear: this.condition.fiscalYear ? this.condition.fiscalYear[0] : this.userInfo.year
      }
      if (this.$store.getters.isFuJian) {
        param.endTime = this.searchDataList.endTime
        param.proCodes = this.searchDataList.proCodes ? this.getTrees(this.searchDataList.proCodes) : []
      }
      this.tableLoading = true
      HttpModule.queryTableDatas(param).then((res) => {
        if (res.code === '000000') {
          if (res.data) {
            this.tableData = res.data.data
            this.caliberDeclareContent = res.data.description || ''
          }
          this.tableLoading = false
        } else {
          this.$message.error(res.message)
        }
      })
    },
    cellStyle({ row, rowIndex, column }) {
      if (!rowIndex) return
      // 有效的cellValue
      const validCellValue = (row[column.property] * 1)

      if (validCellValue && !row.children && column.own.canInsert) {
        return {
          color: '#4293F4',
          textDecoration: 'underline'
        }
      }
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      const rowIndex = obj?.rowIndex
      if (!rowIndex) return
      // let key = obj.column.property
      // 无效的cellValue
      const isInvalidCellValue = !(obj.row[obj.column.property] * 1)
      if (isInvalidCellValue || obj.row.children || !obj.column.own.canInsert) return
      // switch (key) {
      //   case 'amountsjfpbjall':
      this.$refs.CarryImplementationRegionModal.dialogVisible = true
      this.$refs.CarryImplementationRegionModal.injectData = obj.row
      this.$refs.CarryImplementationRegionModal.init()
      // break
      // }
    },
    getPro(fiscalYear = this.$store.state.userInfo?.year) {
      HttpModule.getProTreeData({ fiscalYear }).then(res => {
        if (res.code === '000000') {
          let treeResdata = this.getChildrenNewData1(res.data)
          this.queryConfig[this.queryConfig.findIndex(item => item.field === 'proCodes')].itemRender.options = treeResdata
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
      if (val === undefined) {
        return
      }
      let mofDivCodes = []
      if (val.trim() !== '') {
        val.split(',').forEach((item) => {
          mofDivCodes.push(item.split('##')[0])
        })
      }
      return mofDivCodes
    },
    cellDblclick(obj) {
      // console.log('双击', obj)
    },
    onEditClosed(obj, bsTable, xGrid) {
      bsTable.performTableDataCalculate(obj)
    }
  },
  created() {
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.queryTableDatas(false)
    this.getPro()
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
