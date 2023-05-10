<!-- 直达资金监控预警结果（全省） -->
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
          :tree-config="{ dblExpandAll: true, dblExpand: true, accordion: false, iconClose: 'el-icon-circle-plus', iconOpen: 'el-icon-remove' }"
          :table-data="tableData"
          :toolbar-config="tableToolbarConfig"
          :pager-config="pagerConfig"
          :default-money-unit="10000"
          :export-modal-config="{ fileName: menuName }"
          @editClosed="onEditClosed"
          @ajaxData="ajaxTableData"
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
    <sDetailDialog
      v-if="sdetailVisible"
      :title="sdetailTitle"
      :s-detail-query-param="sdetailQueryParam"
      :detail-data="sDetailData"
    />
  </div>
</template>

<script>
import getFormData from './specialWarningResultHandleRegion.js'
import DetailDialog from './children/wdetailDialog.vue'
import sDetailDialog from './children/detailDialog.vue'
import HttpModule from '@/api/frame/main/fundMonitoring/warningResultHandleRegion.js'
export default {
  components: {
    DetailDialog,
    sDetailDialog
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
      sDetailQueryParam: {},
      leftTreeVisible: false,
      sDetailVisible: false,
      sDetailTitle: '',
      sDetailData: [],
      isShowQueryConditions: true,
      radioShow: true,
      breakRuleVisible: false,
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
      toolbarConfig: {
        disabledMoneyConversion: false,
        ...getFormData('basicInfo', 'toolbarConfig')
      },
      // editRules: getFormData('basicInfo', 'editRules'),
      ifRenderExpandContentTable: true,
      pagerConfig: {
        autoHidden: true,
        total: 0,
        currentPage: 1,
        pageSize: 20
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
      sdetailVisible: false,
      sdetailType: '',
      sdetailTitle: '',
      sdetailData: [],
      detailData: [],
      code: '',
      fiscalYear: '',
      trackProCodes: [],
      proCodes: [],
      mofDivCodes: [],
      ruleCodes: []
    }
  },
  mounted() {
  },
  methods: {
    ajaxTableData({ params, currentPage, pageSize }) {
      this.pagerConfig.currentPage = currentPage
      this.pagerConfig.pageSize = pageSize
      this.queryTableDatas(this.detailType, this.code)
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
      this.condition = condition
      this.queryTableDatas(this.detailType, this.code)
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
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property

      // 无效的cellValue
      const isInvalidCellValue = !(obj.row[obj.column.property] * 1)
      if (isInvalidCellValue) return

      this.fiscalYear = this.searchDataList.fiscalYear
      this.trackProCodes = this.searchDataList.trackProCode === '' ? [] : this.getTrees(this.searchDataList.trackProCode)
      switch (key) {
        case 'numbernofileNum':
          this.detailData = ['numbernofileNum', obj.row.code, this.fiscalYear, this.trackProCodes]
          this.detailTitle = '红灯-未处理明细'
          this.detailType = 'numbernofileNum'
          this.detailVisible = true
          break
        case 'numberfileNum':
          this.detailData = ['numberfileNum', obj.row.code, this.fiscalYear, this.trackProCodes]
          this.detailTitle = '红灯-已整改明细'
          this.detailVisible = true
          this.detailType = 'numberfileNum'
          break
        case 'numberwarnUndoNum':
          this.detailData = ['numberwarnUndoNum', obj.row.code, this.fiscalYear, this.trackProCodes]
          this.detailTitle = '黄灯-未处理明细'
          this.detailVisible = true
          this.detailType = 'numberwarnUndoNum'
          break
        case 'numberwarndoNum':
          this.detailData = ['numberwarndoNum', obj.row.code, this.fiscalYear, this.trackProCodes]
          this.detailTitle = '黄灯-已认定明细'
          this.detailVisible = true
          this.detailType = 'numberwarndoNum'
          break
        case 'numberwarnUndoNoNum':
          this.detailData = ['numberwarnUndoNoNum', obj.row.code, this.fiscalYear, this.trackProCodes]
          this.detailTitle = '黄灯-认定违规-未处理明细'
          this.detailVisible = true
          this.detailType = 'numberwarnUndoNoNum'
          break
        case 'numberwarndidNum':
          this.detailData = ['numberwarndidNum', obj.row.code, this.fiscalYear, this.trackProCodes]
          this.detailTitle = '黄灯-认定违规-已认定明细'
          this.detailVisible = true
          this.detailType = 'numberwarndidNum'
          break
        case 'numberhqlmUndoNum':
          this.detailData = ['numberhqlmUndoNum', obj.row.code, this.fiscalYear, this.trackProCodes]
          this.detailTitle = '黄色警铃-未处理明细'
          this.detailVisible = true
          this.detailType = 'numberhqlmUndoNum'
          break
        case 'numberhqlmdoNum':
          this.detailData = ['numberhqlmdoNum', obj.row.code, this.fiscalYear, this.trackProCodes]
          this.detailTitle = '黄色警铃-已整改明细'
          this.detailVisible = true
          this.detailType = 'numberhqlmdoNum'
          break
      }
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh() {
      this.queryTableDatas(this.detailType, this.code)
      // this.queryTableDatasCount()
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
    getPro() {
      HttpModule.getCapitalTreeData().then(res => {
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
    // 查询 table 数据
    queryTableDatas(val) {
      const param = {
        fiscalYear: this.searchDataList.fiscalYear,
        trackProCodes: this.searchDataList.trackProCode === '' ? [] : this.getTrees(this.searchDataList.trackProCode),
        isSuperPermissions: !!this.transJson(this.$store.state.curNavModule?.param5).isSuperPermissions,
        regulationClass: this.transJson(this.$store.state.curNavModule?.param5)?.regulationClass || '09',
        proCodes: this.proCodes,
        mofDivCodes: this.mofDivCodes,
        ruleCodes: this.ruleCodes
      }
      this.tableLoading = true
      HttpModule.queryTableDatas(param).then((res) => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data
          // this.pagerConfig.total = res.data.totalCount
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
