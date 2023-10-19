<!--支付数据规范性检查-->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTap></template>
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          :tab-status-btn-config="toolBarStatusBtnConfig"
          :tab-status-num-config="tabStatusNumConfig"
          @onQueryConditionsClick="onQueryConditionsClick"
        />
      </template>
      <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
      <template v-slot:mainForm>
        <div style="height: 100%; overflow-y: hidden;">
          <BsSplitPane
            split="horizontal"
            :min-percent="0"
          >
            <template slot="paneL">
              <div v-show="isShowQueryConditions" class="main-query">
                <BsQuery
                  ref="queryFrom"
                  :query-form-item-config="queryConfig"
                  :query-form-data="searchDataList"
                  @onSearchClick="search"
                />
              </div>
              <BsTable
                ref="mainTableRef"
                v-loading="tableLoading1"
                style="height: calc(100% - 80px)"
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
                @cellClick="cellClick"
              >
                <template v-slot:toolbarSlots>
                  <div class="table-toolbar-left">
                    <div class="table-toolbar-left-title left-title-clear-float">
                      <span class="fn-inline">惠民支付明细数据</span>
                      <i class="fn-inline"></i>
                    </div>
                    <div v-if="matchHoot">
                      <span>匹配条件：</span>
                      <el-checkbox v-model="isCorBgtDocNo" @change="changes">指标文号</el-checkbox>
                      <el-checkbox v-model="isAmount" @change="changes">金额</el-checkbox>
                    </div>
                  </div>
                </template>
              </BsTable>
            </template>
            <template slot="paneR">
              <div v-show="isShowQueryConditions" class="main-query" style="position: relative; z-index: 10">
                <BsQuery
                  ref="queryFrom"
                  :query-form-item-config="queryConfig1"
                  :query-form-data="searchDataList1"
                  @onSearchClick="search1"
                />
              </div>
              <BsTable
                ref="mainTableRef1"
                v-loading="tableLoading2"
                style="height: calc(100% - 80px); position: relative; z-index: 10"
                :footer-config="tableFooterConfig1"
                :table-columns-config="tableColumnsConfig1"
                :table-data="tableData1"
                :table-config="tableConfig1"
                :pager-config="mainPagerConfig1"
                :toolbar-config="tableToolbarConfig1"
                @checkboxChange="checkboxChange1"
                @checkboxAll="checkboxChange1"
                @onToolbarBtnClick="onToolbarBtnClick1"
                @ajaxData="ajaxTableData1"
                @cellClick="cellClick"
              >
                <template v-slot:toolbarSlots>
                  <div class="table-toolbar-left">
                    <div class="table-toolbar-left-title">
                      <span class="fn-inline">指标信息</span>
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
    <BsOperationLog :logs-data="logData" :show-log-view="showLogView" />
    <ImportModel
      :file-config="fileConfig"
      :import-modal-visible.sync="importModalVisible"
      @onDownloadTemplateClick="onDownloadTemplateClick"
      @onImportClick="onImportClick"
      @onImportFileClick="onImportFileClick"
    />
  </div>
</template>

<script>
import { proconf } from './benefitPeople'
import ImportModel from '@/components/Table/import/import.vue'
import HttpModule from '@/api/frame/main/fundMonitoring/benefitPeople.js'
import { Export } from '@/components/Table/export/export/export'
// import AddDialog from './children/addDialog'
// import HttpModule from '@/api/frame/main/Monitoring/WarningDetailsByCompartment.js'
import { downloadByUrl } from '@/utils/download'
import { readLocalFile } from '@/utils/readLocalFile'
import { checkRscode } from '@/utils/checkRscode'
export default {
  components: {
    ImportModel
    // AddDialog
  },
  computed: {
    wheresql() {
      return this.treeFilterText.trim() ? `and name like '%${this.treeFilterText}%'` : ''
    }
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
      // 左侧树过滤值
      treeFilterText: '',
      matchHoot: true,
      isCorBgtDocNo: false,
      isAmount: false,
      importModalVisible: false, // 导入弹框
      fileConfig: {
        file: null,
        fileName: '',
        maxSize: 1024 * 1024 * 10
      }, // 导入文件配置
      row1: {},
      proTotal: 0,
      treePageSize: 200,
      offset: 0,
      treeCurrentPage: 1,
      // BsQuery 查询栏
      queryConfig: proconf.highQueryConfig,
      queryConfig1: proconf.highQueryConfig1,
      searchDataList: proconf.highQueryData,
      searchDataList1: proconf.highQueryData1,
      radioShow: true,
      breakRuleVisible: false,
      treeData: [{
        children: [],
        code: 0,
        id: 0,
        label: '0-全部分类',
        name: '全部分类',
        parentId: null,
        parentRuleName: null,
        ruleLevel: 0,
        ruleName: '全部分类'
      }],
      treeTypeConfig: {
        curRadio: 'AGENCY'
      },
      treeGlobalConfig: {
        inputVal: ''
      },
      treeQueryparams: {
        elementcode: 'pro',
        year: this.$store.state.userInfo.year,
        province: this.$store.state.userInfo.province,
        proName: this.proName1,
        limit: 2000,
        offset: 1
      },
      // treeServerUri: 'pay-clear-service/v2/lefttree',
      treeServerUri: '',
      treeAjaxType: 'get',
      leftTreeVisible: false,
      // 头部工具栏 BsTabPanel config
      toolBarStatusBtnConfig: {
        buttons: proconf.statusButtons,
        curButton: proconf.curStatusButton,
        buttonsInfo: proconf.buttons,
        methods: {
          bsToolbarClickEvent: this.bsToolbarClickEvent
        }
      },
      buttonsInfo: proconf.statusRightToolBarButtonByBusDept,
      tabStatusNumConfig: {
        '1': 0,
        '2': 0
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
      bgtId: '',
      realBgtIds: [],
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
        export: true, // 导出
        print: false, // 打印
        zoom: true, // 缩放
        custom: true, // 选配展示列
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
        total: 0,
        currentPage: 1,
        pageSize: 200
      },
      tableConfig: {
        globalConfig: {
          checkType: 'checkbox',
          seq: false,
          cellClickCheck: true
        }
      },
      tableConfig1: {
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
      agencyCode: '',
      corBgtDocNo: '',
      // 匹配指标文号
      corBgtDocNoMatch: '',
      payCertNo: '',
      proName: '',
      proName1: '',
      agencyName: '',
      corBgtDocNoName: '',
      useDes: '',
      dtos: [],
      bgtIds: [],
      amount: '',
      mofdivName: '',
      payAcctNameStr: '',
      payAcctNoStr: '',
      payeeAcctNameStr: '',
      payeeAcctNoStr: '',
      proNameStr: '',
      payTimeStr: '',
      // 操作日志
      logData: [],
      showLogView: false,
      // 新增弹窗
      dialogVisible: false,
      dialogTitle: '新增',
      addTableData: [],
      // 请求 & 角色权限相关配置
      menuName: '系统级监控规则',
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
      // 匹配金额
      amtMatch: '',
      mofdivcode: '',
      leftTreeConfig: { // 左侧单位树配置
        showFilter: false, // 是否显示过滤
        isInitLoadData: false,
        scrollLoad: false, // 是否开启滚动加载
        isleaf: 0, // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
        levelno: -1, // 可选层级
        valueKeys: ['code', 'name', 'id'],
        format: '{code}-{name}',
        placeholder: '请选择',
        multipleValueType: 'String', // 多选值类型 String[逗号分割]，Array //废弃
        treeProps: {
          // 树配置选项
          labelFormat: '{label}', // {code}-{name}
          nodeKey: 'code', // 树的主键
          label: 'name', // 树的显示lalel字段
          children: 'children' // 树的嵌套字段
        },
        multiple: false, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true,
        clearable: true,
        tabSelect: '0'
      },
      importData: [], // 导入数据
      treeLoadingState: false
    }
  },
  mounted() {
  },
  methods: {
    async onImportClick() {
      if (!this.fileConfig?.file) {
        this.$message.warning('请先选择导入文件')
        return
      }
      checkRscode(
        await HttpModule.importBenefit(this.fileConfig)
      )
      this.$message.success('导入成功')
      this.dtos = []
      this.importModalVisible = false

      this.queryTableDatas()
      this.queryTableDatas1()
    },
    async onImportFileClick() {
      const { file } = await readLocalFile({
        types: ['xlsx', 'xls']
      })
      this.fileConfig.file = file
      this.fileConfig.fileName = file.name
    },
    onDownloadTemplateClick() {
      const fileMap = {
        1: {
          localFileName: 'benefitPeopleByPerson.xls',
          downloadFileName: '到人到户资金发放明细表模板.xls'
        },
        2: {
          localFileName: 'benefitPeopleByCompany.xls',
          downloadFileName: '企业补贴发放明细表模板.xls'
        }
      }
      const { localFileName, downloadFileName } = fileMap[this.fileConfig.fileType] || fileMap[1]
      downloadByUrl(
        `/static/files/${localFileName}`,
        downloadFileName
      )
    },
    downLoadImportTemplates() {
      // 下载导入模版
      const tableColumnsConfig = this.tableColumnsConfig
      console.log(tableColumnsConfig)
      // const unitLabel = this.toolbarConfigInCopy.moneyUnitOptions?.find(item => item.value === this.moneyUnit)?.label
      this.$Export = new Export({ unit: '元' })
      this.$Export.exportExcel({
        saveType: '.xlsx',
        fileName: '导入模版', // 文件名
        dataType: 'fullData',
        isExportOnlyViewTitle: true, // 是否只导出数据源表头字段，
        columns: tableColumnsConfig, // 表头配置
        index: true, // 是否添加序号
        ignoreColsTypes: [
          'dragSort',
          // 'seq',
          'checkbox',
          'radio',
          'optionRow',
          'expand',
          'attach',
          'ach',
          'list',
          'attachlist'
        ]
      }, this)
    },
    triggerImportOption(config = {}) {
      // 触发导入
      this.importData = []
      this.importConfig = config
      this.fileConfig.fileName = ''
      this.importModalVisible = true
    },
    changes() {
      let datas1 = this.$refs.mainTableRef1.getSelectionData()
      if (datas1.length !== 1 && datas1.length !== 0) {
        this.$message.info('请选择一条指标信息进行匹配')
      }
      if (this.isCorBgtDocNo) {
        this.corBgtDocNoMatch = datas1[0].corBgtDocNo
      } else {
        this.corBgtDocNoMatch = ''
      }
      if (this.isAmount) {
        this.amtMatch = datas1[0].amount - datas1[0].hookAmt
      } else {
        this.amtMatch = ''
      }
      this.queryTableDatas()
    },
    bsToolbarClickEvent(obj, $this) {
      if (!obj.type) {
        this.operationToolbarButtonClickEvent(obj)
        return
      }
      this.toolBarStatusSelect = obj
      switch (obj.code) {
        case '1':
          this.isHook = '0'
          this.matchHoot = true
          this.proCode = ''
          this.proName = ''
          this.payCertNo = ''
          this.amount = ''
          this.payAmt = ''
          this.mofdivName = ''
          this.payMonth = ''
          this.agencyName = ''
          this.corBgtDocNoName = ''
          this.useDes = ''
          this.dtos = []
          break
        case '2':
          this.isHook = '1'
          this.matchHoot = false
          this.proCode = ''
          this.proName = ''
          this.payCertNo = ''
          this.amount = ''
          this.payAmt = ''
          this.payMonth = ''
          this.mofdivName = ''
          this.agencyName = ''
          this.corBgtDocNoName = ''
          this.useDes = ''
          this.dtos = []
          break
      }
      this.condition = {}
      this.mainPagerConfig.currentPage = 1
      this.mainPagerConfig1.currentPage = 1
      this.refresh()
      this.refresh1()
      // this.$refs.mainTableRef.$refs.xGrid.clearScroll()
    },
    search(obj) {
      this.bgtId = obj.bgtId
      this.amount = obj.amount
      this.corBgtDocNo = obj.corBgtDocNo
      this.proName = obj.proName
      this.queryTableDatas()
      // this.queryTableDatasCount()
    },
    search1(obj) {
      this.bgtId = obj.bgtId
      this.proName = obj.proName
      this.agencyCode = obj.agencyCode
      this.corBgtDocNo = obj.corBgtDocNo
      this.amount = obj.amount
      this.queryTableDatas1()
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
          this.bgtIds = []
          this.realBgtIds = []
          this.corBgtDocNoMatch = ''
          this.amtMatch = ''
          break
        case '2':
          this.isHook = '1'
          this.bgtIds = []
          this.realBgtIds = []
          this.corBgtDocNoMatch = ''
          this.amtMatch = ''
          break
      }
      this.queryTableDatas()
      this.queryTableDatas1()
    },
    checkboxChange(checked, row) {
      switch (this.toolBarStatusSelect.code) {
        case '1':
          break
        case '2':
          this.realBgtIds.length = checked.selection.length
          for (let i = 0; i < this.realBgtIds.length; i++) {
            this.$set(this.realBgtIds, i, checked.selection[i].realBgtId)
          }
          this.queryTableDatas1()
          break
      }
    },
    checkboxChange1(checked, row) {
      switch (this.toolBarStatusSelect.code) {
        case '1':
          if (checked.selection.length !== 1 && checked.selection.length !== 0) {
            this.$message.info('请选择一条指标信息进行匹配或挂接！')
            break
          }
          if (this.isCorBgtDocNo && this.isAmount) {
            this.corBgtDocNoMatch = checked.selection[0].corBgtDocNo
            this.amtMatch = checked.selection[0].amount - checked.selection[0].hookAmt
            this.queryTableDatas()
            break
          }
          if (this.isCorBgtDocNo) {
            this.corBgtDocNoMatch = checked.selection[0].corBgtDocNo
            this.queryTableDatas()
            break
          }
          if (this.isAmount) {
            this.amtMatch = checked.selection[0].amount - checked.selection[0].hookAmt
            this.queryTableDatas()
            break
          }
          break
        case '2':
          this.bgtIds.length = checked.selection.length
          for (let i = 0; i < this.bgtIds.length; i++) {
            this.$set(this.bgtIds, i, checked.selection[i].bgtId)
          }
          this.queryTableDatas()
          break
      }
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      let datas1 = this.$refs.mainTableRef.getSelectionData()
      let datas2 = this.$refs.mainTableRef1.getSelectionData()
      switch (obj.code) {
        // 挂接
        case 'hook_set':
          if (datas1.length < 1) {
            this.$message.warning('请至少选择一条惠民支付明细数据')
            return
          }
          if (datas2.length !== 1) {
            this.$message.warning('请选择一条指标数据')
            return
          }
          let curAmt = datas2[0].amount - datas2[0].hookAmt
          let hookingAmt = 0.0
          datas1.forEach(p => {
            hookingAmt = p.amount + hookingAmt
          })
          if (hookingAmt > curAmt) {
            this.$message.warning('挂接的总金额大于指标未挂接金额，请重新选择！')
            return
          }
          this.hook(datas1, datas2[0])
          break
        // 手动读取
        case 'peo_read':
          this.read()
          break
        // 取消挂接
        case 'hook_not':
          if (datas1.length === 0) {
            this.$message.warning('请至少选择一条利民数据')
            return
          }
          this.notHook(datas1)
          break
        case 'person-import':
        case 'company-import':
          this.importModalVisible = true
          this.fileConfig = {
            fileName: '',
            file: null,
            fileType: obj.code === 'person-import' ? '1' : '2'
          }
          break
        default:
          break
      }
    },
    importSuccessCallback(res) {
      console.log('res:', res)
      HttpModule.importBenefit(res).then(res => {
        if (res.code === '000000') {
          this.$message.success('导入成功')
        } else {
          this.$message.error(res.result)
        }
      })
      this.refresh()
    },
    hook(datas1, datas2) {
      const param = {
        bgtId: datas2.bgtId,
        benefitPeopleList: datas1
      }
      HttpModule.update(param).then(res => {
        if (res.code === '000000') {
          this.$message.success('挂接成功')
          this.proName = ''
          this.bgtId = ''
          this.bgtIds = []
          this.amount = ''
          this.corBgtDocNoMatch = ''
          this.amtMatch = ''
          this.corBgtDocNo = ''
          this.realBgtIds = []
          this.corBgtDocNo = ''
          this.agencyCode = ''
          this.queryTableDatas()
          this.queryTableDatas1()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    notHook(datas1) {
      HttpModule.notHook(datas1).then(res => {
        if (res.code === '000000') {
          this.$message.success('取消成功')
          this.bgtIds = []
          this.realBgtIds = []
          this.queryTableDatas()
          this.queryTableDatas1()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    read() {
      const param = {
      }
      this.tableLoading = true
      HttpModule.addBenefitPeople(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.$message.success('读取成功')
          this.queryTableDatas()
          this.queryTableDatas1()
        } else {
          this.$message.error(res.result)
        }
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
    // 左侧树
    changeInput(val) {
      this.treeGlobalConfig.inputVal = val
    },
    treeSetConfrimData(curTree) {
      this.treeQueryparams.elementCode = curTree.code
      this.$refs.leftTree.refreshTree()
    },
    asideChange() {
      this.leftTreeVisible = false
    },
    // 查看附件
    showAttachment(row) {
      this.billguid = row.attachment_id
      this.showAttachmentDialog = true
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property
      switch (key) {
      }
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh() {
      this.mainPagerConfig.currentPage = 1
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
    ajaxTableData1({ params, currentPage, pageSize }) {
      this.mainPagerConfig1.currentPage = currentPage
      this.mainPagerConfig1.pageSize = pageSize
      this.queryTableDatas1()
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
    // 查询 table 数据
    queryTableDatas() {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        isHook: this.isHook,
        proName: this.proName,
        bgtId: this.bgtId,
        bgtIds: this.bgtIds,
        amount: this.amount,
        amtMatch: this.amtMatch,
        corBgtDocNoMatch: this.corBgtDocNoMatch,
        corBgtDocNo: this.corBgtDocNo,
        dtos: this.dtos
      }
      this.tableLoading1 = true
      HttpModule.pageQuery(param).then(res => {
        this.tableLoading1 = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
          // this.tabStatusNumConfig['1'] = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
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
    // 查询 table1 数据
    queryTableDatas1() {
      const param = {
        page: this.mainPagerConfig1.currentPage, // 页码
        pageSize: this.mainPagerConfig1.pageSize, // 每页条数
        bgtId: this.bgtId,
        realBgtIds: this.realBgtIds,
        corBgtDocNo: this.corBgtDocNo,
        proName: this.proName,
        agencyCode: this.agencyCode === '' ? '' : this.getTrees(this.agencyCode)[0],
        amount: this.amount,
        isHook: this.isHook,
        roleId: this.roleId,
        dtos: this.dtos
      }
      this.tableLoading2 = true
      HttpModule.pagePayQuery(param).then(res => {
        this.tableLoading2 = false
        if (res.code === '000000') {
          this.tableData1 = res.data.results
          this.mainPagerConfig1.total = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getAgency() {
      const param = {
        wheresql: 'and province =' + this.$store.state.userInfo.province,
        elementCode: 'AGENCY',
        // elementCode: 'AGENCY',
        year: this.$store.state.userInfo.year,
        province: this.$store.state.userInfo.province
      }
      HttpModule.getTreewhere(param).then(res => {
        let treeResdata = this.getChildrenNewData1(res.data)
        this.queryConfig1[4].itemRender.options = treeResdata
      })
    },
    getChildrenNewData1(datas) {
      let that = this
      datas?.forEach(item => {
        item.label = item.text
        if (item.children) {
          that.getChildrenNewData1(item.children)
        }
      })

      return datas
    },
    handleCurrentChange(val) {
      this.treeCurrentPage = val
      this.getLeftTreeData()
    },
    handleSizeChange(val) {
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
    this.getAgency()
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
