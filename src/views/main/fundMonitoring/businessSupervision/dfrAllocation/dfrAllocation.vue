<!-- 直达资金分配表 -->
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
      <!--      <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="queryConfig"
            :query-form-data="searchDataList"
            @onSearchClick="search"
          />
        </div>
      </template>-->
      <template v-slot:mainForm>
        <BsTable
          id="1001"
          ref="bsTableRef"
          row-id="id"
          :table-config="tableConfig"
          :footer-config="tableFooterConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :calculate-constraint-config="calculateConstraintConfig"
          :tree-config="{ dblExpandAll: true, dblExpand: true, accordion: false, iconClose: 'el-icon-circle-plus', iconOpen: 'el-icon-remove' }"
          :toolbar-config="tableToolbarConfig"
          :pager-config="pagerConfig"
          :default-money-unit="10000"
          :export-modal-config="{ fileName: menuName }"
          @editClosed="onEditClosed"
          @cellDblclick="cellDblclick"
          @onToolbarBtnClick="onToolbarBtnClick"
          @ajaxData="ajaxTableData"
        >
          <!--口径说明插槽-->
          <template v-if="caliberDeclareContent && $store.getters.isSx" v-slot:caliberDeclare>
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
import getFormData from './dfrAllocation.js'
import HttpModule from '@/api/frame/main/fundMonitoring/dfrAllocation.js'
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
      tableFooterConfig: {
        totalObj: {
          budgetSum: 0,
          xdamount: 0,
          payAppAmt: 0
        },
        combinedType: ['switchTotal'],
        showFooter: this.$store.getters.isSx
      },
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
        // autoHidden: true,
        total: 1,
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
        // expandAll: true, // 展开所有
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
      tableData1: [],
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
    ajaxTableData({ params, currentPage, pageSize }) {
      this.pagerConfig.currentPage = currentPage
      this.pagerConfig.pageSize = pageSize
      this.queryTableDatas()
    },
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
    initTableData(tableDataTest) {
      let arr = JSON.parse(JSON.stringify(tableDataTest))
      arr.map(v => {
        if (v.speTypeCode - 0 === 0) {
          v.type = 1
        } else if (v.speTypeCode - 0 !== 0 && (parseFloat(v.speTypeCode)).toString().length === 1) {
          v.type = 2
        } else if ((parseFloat(v.speTypeCode)).toString().length === 4) {
          v.type = 3
        } else if ((parseFloat(v.speTypeCode)).toString().length === 6) {
          v.type = 4
        }
      })
      this.obj = {}
      arr.forEach(item => {
        if (item.type === 1) {
          this.obj[0] = item
          item.children = []
          this.tableData1.push(item)
        } else if (item.type === 2) {
          this.obj[item.speTypeCode.substring(0, 1)] = item
          item.children = []
          this.tableData1[0].children.push(item)
        } else if (item.type === 3) {
          item.children = []
          this.obj[item.speTypeCode.substring(0, 4)] = item
        } else if (item.type === 4) {
          item.children = []
          this.obj[item.speTypeCode.substring(0, 4)] = item
        }
      })
      for (const key in this.obj) {
        // const i = key.length - 2
        // const pkey = key.substring(0, i)
        for (var a = 0; a < this.tableData1[0].children.length; a++) {
          if (this.tableData1[0].children[a] !== this.obj[key] && this.tableData1[0].children[a].speTypeCode.substring(0, 1) === this.obj[key].speTypeCode.substring(0, 1) && this.tableData1[0].children[a].type <= this.obj[key].type - 1) {
            this.tableData1[0].children[a].children.push(this.obj[key])
          }
        }
      }
      this.tableData1[0].speTypeCode = ''
      this.tableData1[0].children[0].speTypeCode = ''
      this.tableData1[0].children[1].speTypeCode = ''
      console.log('tabledata1', this.tableData1)
      return this.tableData1
    },
    // 查询 table 数据
    queryTableDatas(val) {
      const param = {
        reportCode: this.transJson(this.params5 || '')?.reportCode || 'zdzjfpb',
        speTypeName: this.condition.speTypeName ? this.condition.speTypeName[0] : '',
        page: this.pagerConfig.currentPage, // 页码
        pageSize: this.pagerConfig.pageSize // 每页条数
      }
      this.tableLoading = true
      if (this.$store.getters.isSx) {
        querySum(param).then(res => {
          if (res.code === '000000') {
            this.tableFooterConfig.totalObj = res.data[0]
          } else {
            this.$message.error(res.result)
          }
        })
      }
      let axiosQueryUrl = 'queryTableDatas'
      this.$store.getters.isSx && (axiosQueryUrl = 'queryTableDatasSx')
      HttpModule[axiosQueryUrl](param).then((res) => {
        this.tableLoading = false
        if (res.code === '000000') {
          if (this.$store.getters.isSx) {
            this.tableData = res.data.results
          } else {
            this.tableData = res.data
          }
          this.pagerConfig.total = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    queryCaliberDeclareContent(val) {
      const param = {
        reportCode: 'zdzjfpb'
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
