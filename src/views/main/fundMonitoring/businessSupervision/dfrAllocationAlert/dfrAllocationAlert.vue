<!-- 直达资金分配预警表 -->
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
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :footer-config="tableFooterConfig"
          :calculate-constraint-config="calculateConstraintConfig"
          :tree-config="{ dblExpandAll: true, dblExpand: true, accordion: false, iconClose: 'el-icon-circle-plus', iconOpen: 'el-icon-remove' }"
          :toolbar-config="tableToolbarConfig"
          :pager-config="pagerConfig"
          :default-money-unit="10000"
          :cell-style="cellStyle"
          :export-modal-config="{ fileName: menuName }"
          @editClosed="onEditClosed"
          @ajaxData="ajaxTableData"
          @cellDblclick="cellDblclick"
          @onToolbarBtnClick="onToolbarBtnClick"
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
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <BsOperationLog :logs-data="logData" :show-log-view="showLogView" />
  </div>
</template>

<script>
import getFormData from './dfrAllocationAlert.js'
import HttpModule from '@/api/frame/main/fundMonitoring/dfrAllocationAlert.js'
import { querySum, queryCaliberDeclareContent } from '@/api/frame/common/tree/mofDivTree'
export default {
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
        colFormulaConfig: {
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
        total: 0,
        currentPage: 1,
        pageSize: 20
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
        totalObj: {
          amount: 0,
          fpAmount: 0,
          zjBjamount: 0,
          zjXjamount: 0
        },
        combinedType: ['switchTotal'],
        showFooter: this.$store.getters.isSx
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
    // 计算天数
    DateDiff(sDate1, sDate2) {
      // sDate1和sDate2是yyyy-MM-dd格式
      var aDate, oDate1, oDate2, iDays
      aDate = sDate1.split('-')
      oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) // 转换为yyyy-MM-dd格式
      aDate = sDate2.split('-')
      oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
      iDays = Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24 // 把相差的毫秒数转换为天数
      iDays = iDays.toFixed(2) // 天数保留两位小数
      return parseInt(iDays)
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
    ajaxTableData({ params, currentPage, pageSize }) {
      this.pagerConfig.currentPage = currentPage
      this.pagerConfig.pageSize = pageSize
      this.queryTableDatas()
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
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh() {
      this.queryTableDatas()
      // this.queryTableDatasCount()
    },
    queryCaliberDeclareContent(val) {
      const param = {
        reportCode: 'zdzjfpyjb'
      }
      this.tableLoading = true
      queryCaliberDeclareContent(param).then((res) => {
        if (res.code === '000000') {
          this.caliberDeclareContent = res.data || ''
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 查询 table 数据
    queryTableDatas(val) {
      let param = {
        reportCode: this.transJson(this.params5 || '')?.reportCode,
        page: this.pagerConfig.currentPage, // 页码
        pageSize: this.pagerConfig.pageSize, // 每页条数
        fiscalYear: this.condition.fiscalYear ? this.condition.fiscalYear[0] : ''
      }
      if (this.$store.getters.isSx) {
        param = {
          reportCode: 'zdzjfpyjb',
          page: this.pagerConfig.currentPage, // 页码
          pageSize: this.pagerConfig.pageSize, // 每页条数
          fiscalYear: this.searchDataList.fiscalYear ? this.searchDataList.fiscalYear : ''
        }
        querySum(param).then(res => {
          if (res.code === '000000') {
            this.tableFooterConfig.totalObj = res.data[0]
          } else {
            this.$message.error(res.result)
          }
        })
      }
      this.tableLoading = true
      let axiosQueryUrl = 'queryTableDatas'
      this.$store.getters.isSx && (axiosQueryUrl = 'queryTableDatasSx')
      HttpModule[axiosQueryUrl](param).then((res) => {
        if (res.code === '000000') {
          res.data.results.forEach(item => {
            item.expFuncName = item.expFuncCode && item.expFuncName ? item.expFuncCode + '-' + item.expFuncName : ''
            item.govBgtEcoName = item.govBgtEcoCode && item.govBgtEcoName ? item.govBgtEcoCode + '-' + item.govBgtEcoName : ''
            item.depBgtEcoName = item.depBgtEcoCode && item.depBgtEcoName ? item.depBgtEcoCode + '-' + item.depBgtEcoName : ''
          })
          this.tableData = res.data.results
          this.pagerConfig.total = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    cellDblclick(obj) {
      // console.log('双击', obj)
    },
    cellStyle({ row, rowIndex, column }) {
      if (['wdjWarn', 'ydjwfpWarn', 'yfpwzjWarn'].includes(column.property)) {
        return {
          color: '#fc0303'
        }
      }
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
    this.menuName = this.$store.state.curNavModule.name
    this.queryTableDatas()
    this.$store.getters.isSx && this.queryCaliberDeclareContent()
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
