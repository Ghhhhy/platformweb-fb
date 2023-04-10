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
          :toolbar-config="tableToolbarConfig"
          :pager-config="pagerConfig"
          :tree-config="{ dblExpandAll: true, dblExpand: true, iconClose: 'el-icon-circle-plus', iconOpen: 'el-icon-remove' }"
          :title="menuName"
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
      :detail-data="detailData"
      :colour-type="colourType"
    />
  </div>
</template>

<script>
import getFormData from './warningQuery.js'
import DetailDialog from './children/wdetailDialog.vue'
import HttpModule from '@/api/frame/main/fundMonitoring/createProcessing.js'
export default {
  components: {
    DetailDialog
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
      colourType: '',
      warningCode: '',
      fiRuleCode: '',
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
      sdetailVisible: false,
      sdetailType: '',
      sdetailTitle: '',
      sdetailData: [],
      detailData: [],
      code: '',
      fiscalYear: ''
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
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property

      // 无效的cellValue
      const isInvalidCellValue = !(obj.row[obj.column.property] * 1)
      if (isInvalidCellValue) return

      switch (key) {
        case 'redUndoNum':
          this.detailData = ['redUndoNum', obj.row.fiRuleCode, obj.row.code, this.fiscalYear]
          this.colourType = '3'
          this.detailVisible = true
          break
        case 'redNormalNum':
          this.detailData = ['redNormalNum', obj.row.fiRuleCode, obj.row.code, this.fiscalYear]
          this.colourType = '3'
          this.detailVisible = true
          break
        case 'redNotRectifiedNum':
          this.detailData = ['redNotRectifiedNum', obj.row.fiRuleCode, obj.row.code, this.fiscalYear]
          this.colourType = '3'
          this.detailVisible = true
          break
        case 'redDoneNum':
          this.detailData = ['redDoneNum', obj.row.fiRuleCode, obj.row.code, this.fiscalYear]
          this.colourType = '3'
          this.detailVisible = true
          break
        case 'orangeUndoNum':
          this.detailData = ['orangeUndoNum', obj.row.fiRuleCode, obj.row.code, this.fiscalYear]
          this.colourType = '2'
          this.detailVisible = true
          break
        case 'orangeNormalNum':
          this.detailData = ['orangeNormalNum', obj.row.fiRuleCode, obj.row.code, this.fiscalYear]
          this.colourType = '2'
          this.detailVisible = true
          break
        case 'orangeNotRectifiedNum':
          this.detailData = ['orangeNotRectifiedNum', obj.row.fiRuleCode, obj.row.code, this.fiscalYear]
          this.colourType = '2'
          this.detailVisible = true
          break
        case 'orangeDoneNum':
          this.detailData = ['orangeDoneNum', obj.row.fiRuleCode, obj.row.code, this.fiscalYear]
          this.colourType = '2'
          this.detailVisible = true
          break
        case 'yellowUndoNum':
          this.detailData = ['yellowUndoNum', obj.row.fiRuleCode, obj.row.code, this.fiscalYear]
          this.colourType = '1'
          this.detailVisible = true
          break
        case 'yellowNormalNum':
          this.detailData = ['yellowNormalNum', obj.row.fiRuleCode, obj.row.code, this.fiscalYear]
          this.colourType = '1'
          this.detailVisible = true
          break
        case 'yellowNotRectifiedNum':
          this.detailData = ['yellowNotRectifiedNum', obj.row.fiRuleCode, obj.row.code, this.fiscalYear]
          this.colourType = '1'
          this.detailVisible = true
          break
        case 'yellowDoneNum':
          this.detailData = ['yellowDoneNum', obj.row.fiRuleCode, obj.row.code, this.fiscalYear]
          this.colourType = '1'
          this.detailVisible = true
          break
        case 'greyUndoNum':
          this.detailData = ['greyUndoNum', obj.row.fiRuleCode, obj.row.code, this.fiscalYear]
          this.colourType = '4'
          this.detailVisible = true
          break
        case 'greyNormalNum':
          this.detailData = ['greyNormalNum', obj.row.fiRuleCode, obj.row.code, this.fiscalYear]
          this.colourType = '4'
          this.detailVisible = true
          break
        case 'greyNotRectifiedNum':
          this.detailData = ['greyNotRectifiedNum', obj.row.fiRuleCode, obj.row.code, this.fiscalYear]
          this.colourType = '4'
          this.detailVisible = true
          break
        case 'greyDoneNum':
          this.detailData = ['greyDoneNum', obj.row.fiRuleCode, obj.row.code, this.fiscalYear]
          this.colourType = '4'
          this.detailVisible = true
          break
        case 'blueUndoNum':
          this.detailData = ['blueUndoNum', obj.row.fiRuleCode, obj.row.code, this.fiscalYear]
          this.colourType = '5'
          this.detailVisible = true
          break
        case 'blueNormalNum':
          this.detailData = ['blueNormalNum', obj.row.fiRuleCode, obj.row.code, this.fiscalYear]
          this.colourType = '5'
          this.detailVisible = true
          break
        case 'blueNotRectifiedNum':
          this.detailData = ['blueNotRectifiedNum', obj.row.fiRuleCode, obj.row.code, this.fiscalYear]
          this.colourType = '5'
          this.detailVisible = true
          break
        case 'blueDoneNum':
          this.detailData = ['blueDoneNum', obj.row.fiRuleCode, obj.row.code, this.fiscalYear]
          this.colourType = '5'
          this.detailVisible = true
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
        fiscalYear: this.condition.fiscalYear ? this.condition.fiscalYear[0] : ''
      }
      if (this.$store.state.curNavModule.f_FullName.substring(0, 4) === '直达资金') {
        param.regulationClass = '09'
      }
      this.tableLoading = true
      HttpModule.queryWarningByMof(param).then((res) => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data
          this.pagerConfig.total = res.data.totalCount
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
