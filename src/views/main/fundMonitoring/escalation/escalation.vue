<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTap></template>
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          :is-open="isShowQueryConditions"
          :tab-status-btn-config="toolBarStatusBtnConfig"
          :tab-status-num-config="tabStatusNumConfig"
          @onQueryConditionsClick="onQueryConditionsClick"
        />
      </template>
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
      <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
      <template v-slot:mainForm>
        <div style="height: 100%; overflow-y: hidden;">
          <BsSplitPane
            split="horizontal"
            :min-percent="0"
          >
            <template slot="paneL">
              <BsTable
                ref="mainTableRef"
                v-loading="tableLoading1"
                style="height: calc(100% - 20px)"
                :footer-config="tableFooterConfig"
                :table-columns-config="tableColumnsConfig"
                :table-data="tableData"
                :table-config="tableConfig"
                :pager-config="mainPagerConfig"
                :toolbar-config="tableToolbarConfig"
                @checkboxChange="checkboxChange"
                @checkboxAll="checkboxChange"
                @onToolbarBtnClick="onToolbarBtnClick"
                @ajaxData="ajaxTableData"
              >
                <template v-slot:toolbarSlots>
                  <div class="table-toolbar-left">
                    <div class="table-toolbar-left-title">
                      <span class="fn-inline">财政上报列表</span>
                      <i class="fn-inline"></i>
                    </div>
                  </div>
                </template>
              </BsTable>
            </template>
            <template slot="paneR">
              <BsTable
                ref="mainTableRef1"
                v-loading="tableLoading2"
                style="height: calc(100% - 10px); position: relative; z-index: 10"
                :footer-config="tableFooterConfig1"
                :table-columns-config="tableColumnsConfig1"
                :table-data="tableData1"
                :table-config="tableConfig1"
                :pager-config="mainPagerConfig1"
                :toolbar-config="tableToolbarConfig1"
                :cell-style="cellStyle"
                @cellClick="cellClick"
              >
                <template v-slot:toolbarSlots>
                  <div class="table-toolbar-left">
                    <div class="table-toolbar-left-title">
                      <span class="fn-inline">财政上报明细</span>
                      <i class="fn-inline"></i>
                    </div>
                  </div>
                </template>
              </BsTable>
            </template>
          </BsSplitPane>
        </div>
      </template>
    </BsMainFormListLayout>
    <AddDialog
      v-if="addDialogVisible"
      :title="dialogTitle"
      :select-data="selectData"
    />
    <DetailDialog
      v-if="detailVisible"
      :title="detailTitle"
      :amount-unit="amountUnit"
      :detail-type="detailType"
      :detail-query-param="detailQueryParam"
    />
    <SDetailDialog
      v-if="sDetailVisible"
      :title="sDetailTitle"
      :amt-unit="amtUnit"
      :s-detail-data="sDetailData"
      :s-detail-query-param="sDetailQueryParam"
      :s-detail-type="sDetailType"
    />
    <ZbDetailDialog
      v-if="zbDetailVisible"
      :title="zbDetailTitle"
      :zb-amt-unit="zbAmtUnit"
      :zb-detail-data="zbDetailData"
      :zb-detail-query-param="zbDetailQueryParam"
      :zb-detail-type="zbDetailType"
    />
  </div>
</template>

<script>
import { proconf } from './escalation'
import DetailDialog from './children/detailDialog.vue'
import SDetailDialog from './children/sDetailDialog.vue'
import ZbDetailDialog from './children/zbDetailDialog.vue'
import AddDialog from './children/AddDialog'
import HttpModule from '@/api/frame/main/fundMonitoring/escalation.js'
export default {
  components: {
    AddDialog,
    DetailDialog,
    ZbDetailDialog,
    SDetailDialog
  },
  computed: {
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    },
    queryConfig1() {
      this.getSearchDataList1()
    }
  },
  data() {
    return {
      sDetailQueryParam: {},
      sDetailType: '',
      sDetailVisible: false,
      sDetailTitle: '',
      sDetailData: [],
      zbDetailQueryParam: {},
      zbDetailType: '',
      zbDetailVisible: false,
      zbDetailTitle: '',
      zbDetailData: [],
      detailTitle: '',
      detailVisible: false,
      detailQueryParam: {},
      detailType: '',
      addDialogVisible: false,
      selectData: {},
      // 左侧树过滤值
      treeFilterText: '',
      matchHoot: true,
      isProName: false,
      isAmount: false,
      importModalVisible: false, // 导入弹框
      row1: {},
      proTotal: 0,
      treePageSize: 200,
      offset: 0,
      treeCurrentPage: 1,
      // BsQuery 查询栏
      leftTreeVisible: false,
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      radioShow: true,
      breakRuleVisible: false,
      treeTypeConfig: {
        curRadio: 'AGENCY'
      },
      treeGlobalConfig: {
        inputVal: ''
      },
      // 头部工具栏 BsTabPanel config
      toolBarStatusBtnConfig: {
        buttons: proconf.statusButtons,
        curButton: proconf.curStatusButton,
        buttonsInfo: proconf.buttons,
        methods: {
          bsToolbarClickEvent: this.bsToolbarClickEvent
        }
      },
      tabStatusNumConfig: {
        '1': 0
      },
      isShowQueryConditions: true,
      toolBarStatusSelect: {
        type: 'button',
        iconName: 'base-all.png',
        iconNameActive: 'base-all-active.png',
        iconUrl: '',
        label: '全部',
        code: '1',
        curValue: '1'
      },
      amountUnit: '',
      amtUnit: '',
      zbAmtUnit: '',
      // table 相关配置
      tableLoading: false,
      tableLoading1: false,
      tableLoading2: false,
      tableColumnsConfig: proconf.PoliciesTableColumns,
      tableColumnsConfig1: proconf.PoliciesTableColumns1,
      tableData: [],
      tableData1: [],
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
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
      tableToolbarConfig1: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        import: false, // 导入
        export: false, // 导出
        print: false, // 打印
        zoom: false, // 缩放
        custom: false, // 选配展示列
        refresh: false,
        calculator: false,
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      leftNode: {},
      regulationStatus: '1',
      mainPagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 200
      },
      mainPagerConfig1: {
        autoHidden: true,
        total: 1,
        currentPage: 1,
        pageSize: 999999
      },
      tableConfig: {
        globalConfig: {
          checkType: 'checkbox',
          seq: true,
          cellClickCheck: true
        }
      },
      tableConfig1: {
        globalConfig: {
          // 全局配置
          seq: true, // 序号列
          useMoneyFilter: true
        }
      },
      tableFooterConfig: {
        showFooter: false
      },
      tableFooterConfig1: {
        showFooter: false
      },
      fiscalYear: '',
      isHook: '0',
      proCode1: '',
      proCode: '',
      payCertNo: '',
      proName: '',
      proName1: '',
      agencyName: '',
      corBgtDocNoName: '',
      useDes: '',
      dtos: [],
      mofDivCodes: '',
      generateStatus: '',
      confirmStatus: '',
      escalationStatus: '',
      // 新增弹窗
      dialogVisible: false,
      dialogTitle: '生成',
      addTableData: [],
      // 请求 & 角色权限相关配置
      menuName: '财政上报',
      roleId: '',
      params5: '',
      menuId: '',
      tokenid: '',
      userInfo: {},
      roleguid: this.$store.state.curNavModule.roleguid,
      appId: 'pay_voucher',
      isHaveZero: '0',
      // 文件
      showAttachmentDialog: false,
      billguid: '',
      condition: {},
      handleType: '',
      isEnable: '',
      regulationType: '',
      warningLevel: '',
      DetailData: {},
      regulationclass: '',
      firulename: '',
      payAmt: '',
      mofdivcode: '',
      selectionData: [],
      importData: [], // 导入数据
      treeLoadingState: false
    }
  },
  mounted() {
  },
  methods: {
    changes() {
      let datas1 = this.$refs.mainTableRef1.getSelectionData()
      if (datas1.length !== 1 && datas1.length !== 0) {
        this.$message.info('请选择一条支付凭证信息进行匹配')
      }
      if (this.isProName) {
        this.proName = datas1[0].proName
      } else {
        this.proName = ''
      }
      if (this.isAmount) {
        this.payAmt = datas1[0].payAmt
      } else {
        this.payAmt = ''
      }
      this.queryTableDatas()
    },
    bsToolbarClickEvent(obj, $this) {
      if (!obj.type) {
        this.operationToolbarButtonClickEvent(obj)
        return
      }
      this.toolBarStatusSelect = obj
      this.condition = {}
      this.mainPagerConfig.currentPage = 1
      this.mainPagerConfig1.currentPage = 1
      this.refresh()
      // this.$refs.mainTableRef.$refs.xGrid.clearScroll()
    },
    search(obj) {
      this.mofDivCodes = obj.mofDivCodes
      this.generateStatus = obj.generateStatus
      this.confirmStatus = obj.confirmStatus
      this.escalationStatus = obj.escalationStatus
      this.queryTableDatas()
      // this.queryTableDatasCount()
    },
    // 初始化高级查询data
    getSearchDataList() {
      // 下拉树
      let searchDataObj = {}
      this.queryConfig.forEach(item => {
        if (item.itemRender.name === '$formTreeInput' || item.itemRender.name === '$vxeTree') {
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
    // 初始化高级查询data
    getSearchDataList1() {
      // 下拉树
      let searchDataObj = {}
      this.queryConfig.forEach(item => {
        if (item.itemRender.name === '$formTreeInput' || item.itemRender.name === '$vxeTree') {
          if (item.field) {
            searchDataObj[item.field + 'code'] = ''
          }
        } else {
          if (item.field) {
            searchDataObj[item.field] = ''
          }
        }
      })
      this.searchDataList1 = searchDataObj
    },
    // 初始化高级查询参数condition
    getConditionList() {
      let condition = {}
      this.queryConfig.forEach(item => {
        if (item.itemRender.name === '$formTreeInput' || item.itemRender.name === '$vxeTree') {
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
      switch (obj.code) {
        case '1':
          this.isHook = '0'
          break
        case '2':
          this.isHook = '1'
          break
      }
      this.queryTableDatas()
    },
    checkboxChange(checked, row) {
      this.selectionData.length = checked.selection.length
      this.selectionData = checked.selection
      if (this.selectionData.length > 0) {
        this.queryTableDatas1()
      } else {
        this.tableData1 = []
      }
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      let datas = this.$refs.mainTableRef.getSelectionData()
      console.log('datas:', datas[0])
      switch (obj.code) {
        // 上报
        case 'confirm_escalation':
          let isqr = true
          let isScw = true
          if (datas.length === 0) {
            this.$message.info('请选择数据！')
            return
          }
          datas.forEach((item) => {
            if (item.confirmStatus === '0') {
              isqr = false
            }
            if (item.generateStatus === '0') {
              isScw = false
            }
          })
          if (!isqr) {
            this.$message.info('请选择已确认的数据！')
            return
          }
          if (!isScw) {
            this.$message.info('请选择生成完成的数据！')
            return
          }
          this.confirmEscalation(datas)
          break
        // 撤销上报
        case 'cancel_escalation':
          let isSb = true
          if (datas.length === 0) {
            this.$message.info('请选择数据！')
            return
          }
          datas.forEach((item) => {
            if (item.escalationStatus === '0') {
              isSb = false
            }
          })
          if (!isSb) {
            this.$message.info('请选择已上报的数据！')
            return
          }
          this.cancelEscalation(datas)
          break
        // 生成
        case 'add_log':
          this.addLog()
          break
        // 重新生成
        case 'refresh_log':
          let isSc = true
          let isqr1 = true
          if (datas.length === 0) {
            this.$message.info('请选择数据！')
            return
          }
          datas.forEach((item) => {
            if (item.generateStatus === '0') {
              isSc = false
            }
            if (item.confirmStatus === '1') {
              isqr1 = false
            }
          })
          if (!isSc) {
            this.$message.info('请选择生成完成的数据！')
            return
          }
          if (!isqr1) {
            this.$message.info('请选择未确认的数据！')
            return
          }
          this.refreshLog(datas)
          break
        default:
          break
      }
    },
    addLog() {
      this.addDialogVisible = true
      this.dialogTitle = '生成'
    },
    confirmEscalation(datas) {
      this.$confirm('此操作将上报选中数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableLoading1 = true
        var _this = this
        HttpModule
          .confirmEscalation(datas)
          .then(res => {
            _this.tableLoading1 = false
            if (res.code === '000000') {
              this.$message({
                type: 'success',
                message: '上报中!'
              })
              _this.queryTableDatas()
            }
          })
          .catch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消上报'
        })
      })
    },
    cancelEscalation(datas) {
      this.$confirm('此操作将撤销选中数据的上报, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableLoading1 = true
        var _this = this
        HttpModule
          .cancelEscalation(datas)
          .then(res => {
            _this.tableLoading1 = false
            if (res.code === '000000') {
              this.$message({
                type: 'success',
                message: '撤销成功!'
              })
              _this.queryTableDatas()
            }
          })
          .catch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消撤销'
        })
      })
    },
    refreshLog(datas) {
      this.$confirm('此操作将重新生成选中数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableLoading1 = true
        var _this = this
        HttpModule
          .refreshLog(datas)
          .then(res => {
            _this.tableLoading1 = false
            if (res.code === '000000') {
              this.$message({
                type: 'success',
                message: '生成中!'
              })
              this.tableData1 = []
              _this.queryTableDatas()
            }
          })
          .catch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消撤销'
        })
      })
    },
    changeVisible(val) {
      this.breakRuleVisible = val
    },
    onToolbarBtnClick({ context, table, code }) {
      switch (code) {
        // 刷新
        case 'refresh':
          this.refresh()
          break
      }
    },
    onToolbarBtnClick1({ context, table, code }) {
      switch (code) {
        // 刷新
        case 'refresh':
          this.refresh1()
          break
      }
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property

      // 无效的cellValue
      const isInvalidCellValue = !(obj.row[obj.column.property] * 1)
      if (isInvalidCellValue) return

      if (['reportName'].includes(key)) {
        this.handleDetail(obj.row, key)
      }
    },
    queryUnit() {
      let params = this.detailQueryParam
      this.tableLoading = true
      HttpModule.queryUnit(params).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.amountUnit = res.data?.amtUnit
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleDetail(row, column) {
      let params = {
        reportCode: row.reportCode,
        mofDivCode: row.mofDivCode,
        escalationStatus: row.escalationStatus,
        version: row.version
      }
      this.detailTitle = row.reportName
      this.detailQueryParam = params
      this.queryUnit()
      this.detailType = row.reportCode
      this.detailVisible = true
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh() {
      this.mainPagerConfig.currentPage = 1
      this.tableData1 = []
      this.queryTableDatas()
      // this.queryTableDatasCount()
    },
    refresh1() {
      this.queryTableDatas1()
      // this.queryTableDatasCount()
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      this.queryTableDatas()
    },
    // 展开折叠查询框
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
    },
    // 新增或修改弹框
    clickAddBtn(row) {
      // if (this.addTableData.length > 0) {
      //   this.addTableData = []
      // }
      this.dialogTitle = '新增'
      // this.addTableData.push(row)
      this.dialogVisible = true
    },
    // 点击新增
    onAddToolbarClickAdd(obj, context, e) {
      // let row = []
      // row = this.$refs.mainTableRef.getSelectionData()[0]
      // if (this.$refs.mainTableRef.getSelectionData().length !== 1) {
      //   this.$message.warning('请选择一条数据')
      //   return
      // }
      // this.addTableData = this.$refs.mainTableRef.getSelectionData()
      this.dialogVisible = true
      // this.selectSumId = this.$refs.mainTableRef.getSelectionData()[0].sum_id
      this.dialogTitle = '新增'
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
    queryTableDatas() {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        mofDivCodes: this.mofDivCodes === '' ? [] : this.getTrees(this.mofDivCodes),
        generateStatus: this.generateStatus,
        confirmStatus: this.confirmStatus,
        escalationStatus: this.escalationStatus
      }
      this.tableLoading1 = true
      HttpModule.queryTableDatas(param).then(res => {
        this.tableLoading1 = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
          // this.tabStatusNumConfig['1'] = res.data.totalCount
        } else {
          this.$message.error(res.result)
        }
      })
    },
    // 查询 table1 数据
    queryTableDatas1() {
      // const param = {
      //   page: this.mainPagerConfig1.currentPage, // 页码
      //   pageSize: this.mainPagerConfig1.pageSize, // 每页条数
      //   mofDivCode: this.mofDivCode
      // }
      this.tableLoading2 = true
      HttpModule.queryLogDetail(this.selectionData).then(res => {
        this.tableLoading2 = false
        if (res.code === '000000') {
          this.tableData1 = res.data
          this.mainPagerConfig1.total = res.data.totalCount
        } else {
          this.$message.error(res.result)
        }
      })
    },

    handleSizeChange(val) {
    },
    getMofDiv() {
      HttpModule.getMofTreeData().then(res => {
        if (res.code === '000000') {
          console.log('data', res.data)
          let treeResdata = this.getChildrenNewData1(res.data)
          this.queryConfig[0].itemRender.options = treeResdata
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
    getChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.text
        if (item.children) {
          that.getChildrenData(item.children)
        }
      })

      return datas
    },
    cellStyle({ row, rowIndex, column }) {
      // 有效的cellValue
      const validCellValue = (row[column.property] * 1)
      if (validCellValue && ['reportName'].includes(column.property)) {
        return {
          color: '#4293F4',
          textDecoration: 'underline'
        }
      }
    }
  },
  created() {
    console.log('this.$store.state.curNavModule', this.$store.state.curNavModule)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.menuName = this.$store.state.curNavModule.name
    this.roleId = this.$store.state.curNavModule.roleguid
    this.getMofDiv()
    // this.queryTableDatas()
    // this.queryTableDatas1()
  }
}
</script>
<style scoped lang="scss">
.T-mainFormListLayout-modulebox .table-toolbar-left {
  font-size: 14px;
}
.Titans-table .table-toolbar-left .table-toolbar-left-title.left-title-clear-float {
  float: none;
  margin-bottom: 4px;
}
</style>
<style scoped>
.radio-right{
  float: right;
}
.Titans-table ::v-deep  .vxe-body--row.row-yellow {
  background-color: yellow;
  color: #fff;
}
.Titans-table ::v-deep  .vxe-body--row.row-blue {
  background-color: blue;
  color: #fff;
}
.Titans-table ::v-deep  .vxe-body--row.row-red {
  background-color: red;
  color: #fff;
}
</style>
