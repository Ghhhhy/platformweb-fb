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
      <template v-slot:mainTree>
        <BsTreeSet
          ref="treeSet"
          v-model="leftTreeVisible"
          :tree-config="treeTypeConfig"
          @onChangeInput="changeInput"
          @onAsideChange="asideChange"
        />
        <BsTree
          ref="leftTree"
          open-loading
          :config="leftTreeConfig"
          :tree-data="treeData"
          @onNodeClick="onClickmethod"
        />
      </template>
      <template v-slot:mainForm>
        <!-- <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="queryConfig"
            :query-form-data="searchDataList"
            @onSearchClick="search"
          />
        </div> -->
        <!-- <BsTable
          ref="mainTableRef"
          v-loading="tableLoading1"
          style="height: 40%"
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
        </BsTable> -->
        <div v-show="isShowQueryConditions" class="main-query">
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
          style="height: 100%"
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
              <div v-if="leftTreeVisible === false" class="table-toolbar-contro-leftvisible" @click="leftTreeVisible = true"></div>
              <div class="table-toolbar-left-title">
                <span class="fn-inline">支付凭证信息</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTable>
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
    <vxe-modal
      v-model="showConfirmModal"
      width="600"
      height="280"
      :show-footer="true"
      title="取消确认"
    >
      <vxe-form ref="showConfirForm" :data="formModelData" :rules="formModelRule">
        <vxe-form-item title="取消说明" field="reason" required class="one-row">
          <el-input
            v-model="formModelData.reason"
            type="textarea"
            :maxlength="100"
            show-word-limit
            resize="none"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入取消说明"
          />
        </vxe-form-item>
      </vxe-form>
      <div slot="footer" class="vxeModalUnique">
        <el-button size="small" @click="showConfirmModal = false">取消</el-button>
        <el-button type="primary" size="small" @click="notHook(clickRow)">确定</el-button>
      </div>
    </vxe-modal>
  </div>
</template>

<script>
import { proconf, getDateString } from './benefitPeopleConfirm'
import ImportModel from '../../../../components/Table/import/import.vue'
import { Import } from '../../../../components/Table/import/import/import.js'
import HttpModule from '@/api/frame/main/fundMonitoring/benefitPeopleConfirm.js'
import { Export } from '../../../../components/Table/export/export/export'
import { repairExcelTimestamp } from '@/utils/excel'
// import AddDialog from './children/addDialog'
// import HttpModule from '@/api/frame/main/Monitoring/WarningDetailsByCompartment.js'
export default {
  components: {
    ImportModel
    // AddDialog
  },
  computed: {
    wheresql() {
      return `and name like '%${this.treeFilterText}%'`
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
      showConfirmModal: false,
      clickRow: {},
      formModelData: {
        reason: ''
      },
      // 左侧树过滤值
      treeFilterText: '',
      matchHoot: true,
      isProName: false,
      isAmount: false,
      codeList: [],
      importModalVisible: false, // 导入弹框
      fileConfig: {
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
      formModelRule: {
        reason: [
          { required: true }
        ]
      },
      treeQueryparams: { elementCode: 'admdiv', province: this.$store.state.userInfo.province, year: this.$store.state.userInfo.year, wheresql: 'and province =' + this.$store.state.userInfo.province },
      // treeServerUri: 'pay-clear-service/v2/lefttree',
      treeServerUri: '',
      treeAjaxType: 'get',
      leftTreeVisible: true,
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
        pageSize: 50
      },
      mainPagerConfig1: {
        total: 0,
        currentPage: 1,
        pageSize: 50
      },
      tableConfig: {
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
      payCertNo: '',
      proName: '',
      proName1: '',
      agencyName: '',
      corBgtDocNoName: '',
      useDes: '',
      dtos: [],
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
      payAmt: '',
      mofDivCode: this.$store.state.userInfo.province,
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
          labelFormat: '{code}-{name}', // {code}-{name}
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
    onImportClick() {
      // 导入提交
      if (!this.importData.length) {
        this.$XModal.message({ status: 'error', message: '无数据导入请重新导入数据！' })
      } else {
        this.importModalVisible = false
        if (typeof (this.importConfig.importSuccessCallback) === 'function') {
          this.importConfig.importSuccessCallback(this.importData)
        } else {
          this.$emit('importSuccessCallback', this.importData)
        }
      }
    },
    async onImportFileClick() {
      // 导入文件
      this.$Import = new Import()
      await this.$Import.importExcel({
      }, (result, filename) => {
        // this.tableDataIn = result
        this.importData = result
        this.fileConfig.fileName = filename
      })
    },
    onDownloadTemplateClick(obj) {
      // 下载模版
      if (typeof (this.importConfig.downloadTemplateCallback) === 'function') {
        this.importConfig.downloadTemplateCallback(this.importData)
      } else {
        this.importData = []
        const columns = this.tableColumnsConfig
        const selection = this.selection
        let defaultConfig = {
          isExportTree: !!self.treeConfigIn,
          saveType: '.xlsx',
          fileName: 'importTempplate', // 文件名
          dataType: 'fullData',
          isExportOnlySourceField: true, // 是否只导出数据源表头字段，
          isExportOnlyViewTitle: false, // 是否只导出数据表头名称，
          isExportHead: true, // 是否导出表头
          exportViewTitleType: 'nestTitle',
          isExportFooter: false, // 是否导出表尾部
          isExportOriginalData: true, // 是否导出源数据
          isExportData: true, // 是否导出数据
          columns: columns, // 表头配置
          datas: [], // 源数据,
          selection: selection, // 选中数据
          index: true, // 是否添加序号,
          ignoreColsTypes: [
            'dragSort',
            'seq',
            'checkbox',
            'radio',
            'optionRow',
            'expand',
            'attach',
            'ach',
            'list',
            'attachlist'
          ] // 忽略导出的列类型
        }
        this.$Export.exportExcel(obj ? Object.assign(defaultConfig, obj) : obj, this)
      }
    },
    downLoadImportTemplates() {
      // 下载导入模版
      const tableColumnsConfig = this.tableColumnsConfig
      // const unitLabel = this.toolbarConfigInCopy.moneyUnitOptions?.find(item => item.value === this.moneyUnit)?.label
      this.$Export = new Export({ unit: '元' })
      this.$Export.exportExcel({
        saveType: '.xlsx',
        fileName: '导入模版', // 文件名
        dataType: 'fullData',
        isExportOnlyViewTitle: true, // 是否只导出数据源表头字段，
        columns: tableColumnsConfig, // 表头配置
        index: false // 是否添加序号,
      }, this)
    },
    triggerImportOption(config = {}) {
      // 触发导入
      this.importData = []
      this.importConfig = config
      this.fileConfig.fileName = ''
      this.importModalVisible = true
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
      this.refresh1()
      // this.$refs.mainTableRef.$refs.xGrid.clearScroll()
    },
    search1(obj) {
      this.payCertNo = obj.payCertNo
      this.proName = obj.proName
      this.agencyName = obj.agencyName
      this.corBgtDocNoName = obj.corBgtDocNoName
      this.useDes = obj.useDes
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
          break
        case '2':
          this.isHook = '1'
          break
      }
      // this.queryTableDatas1()
    },
    checkboxChange(checked, row) {
      switch (this.toolBarStatusSelect.code) {
        case '1':
          break
        case '2':
          this.dtos.length = checked.selection.length
          for (let i = 0; i < this.dtos.length; i++) {
            this.$set(this.dtos, i, checked.selection[i].payCertId)
          }
          this.queryTableDatas1()
          break
      }
    },
    // checkboxChange1(checked, row) {
    //   switch (this.toolBarStatusSelect.code) {
    //     case '1':
    //       if (this.isProName && this.isAmount) {
    //         this.proName = checked.selection[0].proName
    //         this.amount = checked.selection[0].amount
    //         this.queryTableDatas()
    //         break
    //       }
    //       if (this.isProName) {
    //         this.proName = checked.selection[0].proName
    //         this.queryTableDatas()
    //         break
    //       }
    //       if (this.isAmount) {
    //         this.amount = checked.selection[0].amount
    //         this.queryTableDatas()
    //         break
    //       }
    //       break
    //     case '2':
    //       this.dtos.length = checked.selection.length
    //       for (let i = 0; i < this.dtos.length; i++) {
    //         this.$set(this.dtos, i, checked.selection[i].payCertId)
    //       }
    //       this.queryTableDatas()
    //       break
    //   }
    // },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      let self = this
      let datas2 = this.$refs.mainTableRef1.getSelectionData()
      switch (obj.code) {
        // 挂接
        case 'hook_set':
          if (datas2.length === 0) {
            this.$message.warning('请选择数据')
            return
          }
          this.hook(datas2)
          break
        // 手动读取
        case 'peo_read':
          this.read()
          break
        // 取消挂接
        case 'hook_not':
          if (datas2.length === 0) {
            this.$message.warning('请选择数据')
            return
          }
          // this.showConfirmModal = true
          // this.clickRow = datas2[0]
          this.notHook(datas2)
          break
        // 导入
        case 'import':
          this.triggerImportOption(
            {
              downloadTemplateCallback(Cb) {
                self.downLoadImportTemplates()
              },
              importSuccessCallback(res) {
                self.$refs.mainTableRef.deaImportViewData(
                  {
                    conlums: proconf.PoliciesTableColumns,
                    viewData: res
                  }
                )
                // 将导入的支付时间格式化
                res?.forEach(row => {
                  const timestamp = repairExcelTimestamp(row.xpayDate)
                  row.xPayDate = timestamp ? getDateString(timestamp) : row.xpayDate
                })
                self.importSuccessCallback(res)
              }
            }
          )
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
    hook(datas2) {
      const param = {
        payDetailIds: datas2
      }
      HttpModule.confirm(param).then(res => {
        if (res.code === '000000') {
          this.$message.success('确认成功')
          this.queryTableDatas1()
        } else {
          this.$message.error(res.result)
        }
      })
    },
    async notHook(datas2) {
      // await this.$refs.showConfirForm.validate()
      HttpModule.notConfirm(datas2).then(res => {
        if (res.code === '000000') {
          this.$message.success('取消成功')
          this.proCode = ''
          this.proName = ''
          this.payCertNo = ''
          this.amount = ''
          this.payAmt = ''
          this.mofdivName = ''
          this.agencyName = ''
          this.corBgtDocNoName = ''
          this.useDes = ''
          this.dtos = []
          this.queryTableDatas1()
        } else {
          this.$message.error(res.result)
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
    onClickmethod(node) {
      let code = node.node.code
      this.codeList = []
      let treeData = node.treeData
      // 非顶级区划则获取区划code，否则查询表体数据时codeList为空进行查询
      if (code !== node.treeData?.[0].code) {
        this.getItem(code, treeData)
      }
      if (node.id !== '0') {
        this.mofdivcode = node.node.code
      } else {
        this.mofdivcode = {}
      }
      this.queryTableDatas1()
    },
    getItem(code, data) {
      data.forEach(item => {
        if (code === item.code) {
          let data = []
          data.push(item)
          this.getCodeList(data)
        } else if (item.children) {
          this.getItem(code, item.children)
        }
      })
    },
    getCodeList(data) {
      data.forEach(item => {
        this.codeList.push(item.code)
        if (item.children) {
          this.getCodeList(item.children)
        }
      })
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
    refresh1() {
      this.queryTableDatas1()
      // this.queryTableDatasCount()
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
    // 查询 table1 数据
    queryTableDatas1() {
      const param = {
        page: this.mainPagerConfig1.currentPage, // 页码
        pageSize: this.mainPagerConfig1.pageSize, // 每页条数
        payCertNo: this.payCertNo,
        proName: this.proName,
        proCode: this.proCode,
        agencyName: this.agencyName,
        corBgtDocNoName: this.corBgtDocNoName,
        useDes: this.useDes,
        amount: this.amount,
        isHook: this.isHook,
        roleId: this.roleId,
        mofDivCode: this.mofDivCode, // 获取左侧树
        mofDivCodes: this.codeList,
        dtos: this.dtos
      }
      this.tableLoading2 = true
      HttpModule.pagePayQuery(param).then(res => {
        res = {
          'code': '000000',
          'message': 'success',
          'rscode': '100000',
          'data': {
            'totalCount': 1619,
            'results': [
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0042号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省高速公路集团有限公司',
                'payeeAcctNo': '35101560029036840000',
                'payeeAcctBankName': '国家开发银行福建省分行',
                'payAcctName': '福建省财政厅',
                'payAcctNo': '591902089810802',
                'payAcctBankName': '招商银行股份有限公司福州分行营业部',
                'agencyCode': '329605',
                'agencyName': '福建省高速公路建设总指挥部',
                'payCertId': 'A67D8174B71141B2BE49E8837F577612',
                'payCertNo': 'D012023-V02QMD-00005',
                'proCode': '350000223293110000043',
                'proName': '高速公路建设、管理养护及贴息专项资金',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-03-28 10:12:48',
                'useDes': '高速公路建设、管理养护及贴息专项资金',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 247700000,
                'payDetailId': 'BB35DAB055F94FB8972C82D47499BEBC',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '02',
                'isSubName': '补贴到企业项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0042号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省高速公路集团有限公司',
                'payeeAcctNo': '35101560029036840000',
                'payeeAcctBankName': '国家开发银行福建省分行',
                'payAcctName': '福建省财政厅',
                'payAcctNo': '591902089810802',
                'payAcctBankName': '招商银行股份有限公司福州分行营业部',
                'agencyCode': '329605',
                'agencyName': '福建省高速公路建设总指挥部',
                'payCertId': 'A67D8174B71141B2BE49E8837F577612',
                'payCertNo': 'D012023-V02QMD-00005',
                'proCode': '350000223293110000043',
                'proName': '高速公路建设、管理养护及贴息专项资金',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-03-28 10:12:48',
                'useDes': '高速公路建设、管理养护及贴息专项资金',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 30000,
                'payDetailId': '2F54B206794241CA992D1EDDA594B6F5',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '02',
                'isSubName': '补贴到企业项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': null,
                'mofDivCode': '350000000',
                'payeeAcctName': '张慧玲',
                'payeeAcctNo': '6217001820058049978',
                'payeeAcctBankName': '建设银行',
                'payAcctName': '福建工程学院',
                'payAcctNo': '35001610007058000369',
                'payAcctBankName': '中国建设银行股份有限公司福州城东支行',
                'agencyCode': '311632',
                'agencyName': '福建理工大学',
                'payCertId': '75939F9CD3D841C68ECD3A60B098BA91',
                'payCertNo': 'D012023-V02TLN-04847',
                'proCode': '350000223113210000016',
                'proName': '学生资助补助经费',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-06-15 16:12:47',
                'useDes': '4-5月学生助学金退款重汇',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 840,
                'payDetailId': '61524A0D64564E1DA183EDEEF488906A',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '01',
                'isSubName': '补贴到人项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': null,
                'mofDivCode': '350000000',
                'payeeAcctName': '魏存琛',
                'payeeAcctNo': '6217001820055145985',
                'payeeAcctBankName': '建设银行',
                'payAcctName': '福建工程学院',
                'payAcctNo': '35001610007058000369',
                'payAcctBankName': '中国建设银行股份有限公司福州城东支行',
                'agencyCode': '311632',
                'agencyName': '福建理工大学',
                'payCertId': '75939F9CD3D841C68ECD3A60B098BA91',
                'payCertNo': 'D012023-V02TLN-04847',
                'proCode': '350000223113210000016',
                'proName': '学生资助补助经费',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-06-15 16:12:47',
                'useDes': '4-5月学生助学金退款重汇',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 280,
                'payDetailId': 'A98F228CC88D4D468EAE01B7B3597F92',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '01',
                'isSubName': '补贴到人项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': null,
                'mofDivCode': '350000000',
                'payeeAcctName': '李雨晴',
                'payeeAcctNo': '6217001820051027450',
                'payeeAcctBankName': '建设银行',
                'payAcctName': '福建工程学院',
                'payAcctNo': '35001610007058000369',
                'payAcctBankName': '中国建设银行股份有限公司福州城东支行',
                'agencyCode': '311632',
                'agencyName': '福建理工大学',
                'payCertId': '75939F9CD3D841C68ECD3A60B098BA91',
                'payCertNo': 'D012023-V02TLN-04847',
                'proCode': '350000223113210000016',
                'proName': '学生资助补助经费',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-06-15 16:12:47',
                'useDes': '4-5月学生助学金退款重汇',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 560,
                'payDetailId': '4CCE1DCEBE81469C9BDF24965179E971',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '01',
                'isSubName': '补贴到人项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': null,
                'mofDivCode': '350000000',
                'payeeAcctName': '龙开堂',
                'payeeAcctNo': '6217001820055120913',
                'payeeAcctBankName': '建设银行',
                'payAcctName': '福建工程学院',
                'payAcctNo': '35001610007058000369',
                'payAcctBankName': '中国建设银行股份有限公司福州城东支行',
                'agencyCode': '311632',
                'agencyName': '福建理工大学',
                'payCertId': '75939F9CD3D841C68ECD3A60B098BA91',
                'payCertNo': 'D012023-V02TLN-04847',
                'proCode': '350000223113210000016',
                'proName': '学生资助补助经费',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-06-15 16:12:47',
                'useDes': '4-5月学生助学金退款重汇',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 900,
                'payDetailId': 'F95793789233488985424471EAC67B6E',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '01',
                'isSubName': '补贴到人项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': null,
                'mofDivCode': '350000000',
                'payeeAcctName': '杨聪',
                'payeeAcctNo': '6217007180004455579',
                'payeeAcctBankName': '建设银行',
                'payAcctName': '福建工程学院',
                'payAcctNo': '35001610007058000369',
                'payAcctBankName': '中国建设银行股份有限公司福州城东支行',
                'agencyCode': '311632',
                'agencyName': '福建理工大学',
                'payCertId': '75939F9CD3D841C68ECD3A60B098BA91',
                'payCertNo': 'D012023-V02TLN-04847',
                'proCode': '350000223113210000016',
                'proName': '学生资助补助经费',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-06-15 16:12:47',
                'useDes': '4-5月学生助学金退款重汇',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 1350,
                'payDetailId': '2C0BAC64F8974F0BB1723570FF65B2FD',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '01',
                'isSubName': '补贴到人项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': null,
                'mofDivCode': '350000000',
                'payeeAcctName': '曾文文',
                'payeeAcctNo': '6212252402000325736',
                'payeeAcctBankName': '工商银行',
                'payAcctName': '福建工程学院',
                'payAcctNo': '35001610007058000369',
                'payAcctBankName': '中国建设银行股份有限公司福州城东支行',
                'agencyCode': '311632',
                'agencyName': '福建理工大学',
                'payCertId': '75939F9CD3D841C68ECD3A60B098BA91',
                'payCertNo': 'D012023-V02TLN-04847',
                'proCode': '350000223113210000016',
                'proName': '学生资助补助经费',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-06-15 16:12:47',
                'useDes': '4-5月学生助学金退款重汇',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 840,
                'payDetailId': 'E3E92CBF68834A8DB516FBF3501B35DC',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '01',
                'isSubName': '补贴到人项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': null,
                'mofDivCode': '350000000',
                'payeeAcctName': '蔡瑞斌',
                'payeeAcctNo': '6215340302702645711',
                'payeeAcctBankName': '建设银行',
                'payAcctName': '福建工程学院',
                'payAcctNo': '35001610007058000369',
                'payAcctBankName': '中国建设银行股份有限公司福州城东支行',
                'agencyCode': '311632',
                'agencyName': '福建理工大学',
                'payCertId': '75939F9CD3D841C68ECD3A60B098BA91',
                'payCertNo': 'D012023-V02TLN-04847',
                'proCode': '350000223113210000016',
                'proName': '学生资助补助经费',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-06-15 16:12:47',
                'useDes': '4-5月学生助学金退款重汇',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 280,
                'payDetailId': '533C09912DC4434A933D0E0618626F08',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '01',
                'isSubName': '补贴到人项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': null,
                'mofDivCode': '350000000',
                'payeeAcctName': '马骋飞',
                'payeeAcctNo': '6217001820058056379',
                'payeeAcctBankName': '建设银行',
                'payAcctName': '福建工程学院',
                'payAcctNo': '35001610007058000369',
                'payAcctBankName': '中国建设银行股份有限公司福州城东支行',
                'agencyCode': '311632',
                'agencyName': '福建理工大学',
                'payCertId': '75939F9CD3D841C68ECD3A60B098BA91',
                'payCertNo': 'D012023-V02TLN-04847',
                'proCode': '350000223113210000016',
                'proName': '学生资助补助经费',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-06-15 16:12:47',
                'useDes': '4-5月学生助学金退款重汇',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 280,
                'payDetailId': 'EBA7F8A6505A4E3DA4E42AAC1E02F84D',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '01',
                'isSubName': '补贴到人项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': null,
                'mofDivCode': '350000000',
                'payeeAcctName': '张煜',
                'payeeAcctNo': '6217001820051032856',
                'payeeAcctBankName': '建设银行',
                'payAcctName': '福建工程学院',
                'payAcctNo': '35001610007058000369',
                'payAcctBankName': '中国建设银行股份有限公司福州城东支行',
                'agencyCode': '311632',
                'agencyName': '福建理工大学',
                'payCertId': '75939F9CD3D841C68ECD3A60B098BA91',
                'payCertNo': 'D012023-V02TLN-04847',
                'proCode': '350000223113210000016',
                'proName': '学生资助补助经费',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-06-15 16:12:47',
                'useDes': '4-5月学生助学金退款重汇',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 560,
                'payDetailId': '2B33672C873646C3B5E12244B55F1811',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '01',
                'isSubName': '补贴到人项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': null,
                'mofDivCode': '350000000',
                'payeeAcctName': '吴焱',
                'payeeAcctNo': '6217001930067054818',
                'payeeAcctBankName': '建设银行',
                'payAcctName': '福建工程学院',
                'payAcctNo': '35001610007058000369',
                'payAcctBankName': '中国建设银行股份有限公司福州城东支行',
                'agencyCode': '311632',
                'agencyName': '福建理工大学',
                'payCertId': '75939F9CD3D841C68ECD3A60B098BA91',
                'payCertNo': 'D012023-V02TLN-04847',
                'proCode': '350000223113210000016',
                'proName': '学生资助补助经费',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-06-15 16:12:47',
                'useDes': '4-5月学生助学金退款重汇',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 660,
                'payDetailId': '87863850544D41358EEF555A77768E50',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '01',
                'isSubName': '补贴到人项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': null,
                'mofDivCode': '350000000',
                'payeeAcctName': '焦一哲',
                'payeeAcctNo': '6236681470004326042',
                'payeeAcctBankName': '建设银行',
                'payAcctName': '福建工程学院',
                'payAcctNo': '35001610007058000369',
                'payAcctBankName': '中国建设银行股份有限公司福州城东支行',
                'agencyCode': '311632',
                'agencyName': '福建理工大学',
                'payCertId': '75939F9CD3D841C68ECD3A60B098BA91',
                'payCertNo': 'D012023-V02TLN-04847',
                'proCode': '350000223113210000016',
                'proName': '学生资助补助经费',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-06-15 16:12:47',
                'useDes': '4-5月学生助学金退款重汇',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 660,
                'payDetailId': '9E4C50B3923F4D0EAA80DA180CE2B785',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '01',
                'isSubName': '补贴到人项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': null,
                'mofDivCode': '350000000',
                'payeeAcctName': '刘光耀',
                'payeeAcctNo': '6215340302702645869',
                'payeeAcctBankName': '建设银行',
                'payAcctName': '福建工程学院',
                'payAcctNo': '35001610007058000369',
                'payAcctBankName': '中国建设银行股份有限公司福州城东支行',
                'agencyCode': '311632',
                'agencyName': '福建理工大学',
                'payCertId': '75939F9CD3D841C68ECD3A60B098BA91',
                'payCertNo': 'D012023-V02TLN-04847',
                'proCode': '350000223113210000016',
                'proName': '学生资助补助经费',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-06-15 16:12:47',
                'useDes': '4-5月学生助学金退款重汇',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 660,
                'payDetailId': '303CC56AA1024E0B8B8089124CE297D1',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '01',
                'isSubName': '补贴到人项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': null,
                'mofDivCode': '350000000',
                'payeeAcctName': '刘鑫阳',
                'payeeAcctNo': '6214671820004264693',
                'payeeAcctBankName': '建设银行',
                'payAcctName': '福建工程学院',
                'payAcctNo': '35001610007058000369',
                'payAcctBankName': '中国建设银行股份有限公司福州城东支行',
                'agencyCode': '311632',
                'agencyName': '福建理工大学',
                'payCertId': '75939F9CD3D841C68ECD3A60B098BA91',
                'payCertNo': 'D012023-V02TLN-04847',
                'proCode': '350000223113210000016',
                'proName': '学生资助补助经费',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-06-15 16:12:47',
                'useDes': '4-5月学生助学金退款重汇',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 660,
                'payDetailId': '3743278CF7894F229C97AA0A689F3BFF',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '01',
                'isSubName': '补贴到人项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': null,
                'mofDivCode': '350000000',
                'payeeAcctName': '叶飞宝',
                'payeeAcctNo': '6217001820051015018',
                'payeeAcctBankName': '建设银行',
                'payAcctName': '福建工程学院',
                'payAcctNo': '35001610007058000369',
                'payAcctBankName': '中国建设银行股份有限公司福州城东支行',
                'agencyCode': '311632',
                'agencyName': '福建理工大学',
                'payCertId': '75939F9CD3D841C68ECD3A60B098BA91',
                'payCertNo': 'D012023-V02TLN-04847',
                'proCode': '350000223113210000016',
                'proName': '学生资助补助经费',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-06-15 16:12:47',
                'useDes': '4-5月学生助学金退款重汇',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 660,
                'payDetailId': 'F6C331712C204026ACB057EEE608C299',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '01',
                'isSubName': '补贴到人项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': null,
                'mofDivCode': '350000000',
                'payeeAcctName': '邱道洋',
                'payeeAcctNo': '6217001820059770002',
                'payeeAcctBankName': '建设银行',
                'payAcctName': '福建工程学院',
                'payAcctNo': '35001610007058000369',
                'payAcctBankName': '中国建设银行股份有限公司福州城东支行',
                'agencyCode': '311632',
                'agencyName': '福建理工大学',
                'payCertId': '75939F9CD3D841C68ECD3A60B098BA91',
                'payCertNo': 'D012023-V02TLN-04847',
                'proCode': '350000223113210000016',
                'proName': '学生资助补助经费',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-06-15 16:12:47',
                'useDes': '4-5月学生助学金退款重汇',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 840,
                'payDetailId': 'C1DBC748CE8A446994503B9BDA3148ED',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '01',
                'isSubName': '补贴到人项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': null,
                'mofDivCode': '350000000',
                'payeeAcctName': '郑胜文',
                'payeeAcctNo': '6215340302702414266',
                'payeeAcctBankName': '建设银行',
                'payAcctName': '福建工程学院',
                'payAcctNo': '35001610007058000369',
                'payAcctBankName': '中国建设银行股份有限公司福州城东支行',
                'agencyCode': '311632',
                'agencyName': '福建理工大学',
                'payCertId': '75939F9CD3D841C68ECD3A60B098BA91',
                'payCertNo': 'D012023-V02TLN-04847',
                'proCode': '350000223113210000016',
                'proName': '学生资助补助经费',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-06-15 16:12:47',
                'useDes': '4-5月学生助学金退款重汇',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 660,
                'payDetailId': '419D2B9A8E9B45A0965D077FB9FF3FCE',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '01',
                'isSubName': '补贴到人项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': null,
                'mofDivCode': '350000000',
                'payeeAcctName': '汪弘健',
                'payeeAcctNo': '6217001820054261460',
                'payeeAcctBankName': '建设银行',
                'payAcctName': '福建工程学院',
                'payAcctNo': '35001610007058000369',
                'payAcctBankName': '中国建设银行股份有限公司福州城东支行',
                'agencyCode': '311632',
                'agencyName': '福建理工大学',
                'payCertId': '75939F9CD3D841C68ECD3A60B098BA91',
                'payCertNo': 'D012023-V02TLN-04847',
                'proCode': '350000223113210000016',
                'proName': '学生资助补助经费',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-06-15 16:12:47',
                'useDes': '4-5月学生助学金退款重汇',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 1700,
                'payDetailId': 'E02BF1C15AE94520A3E9F8D6E7ECAF13',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '01',
                'isSubName': '补贴到人项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': null,
                'mofDivCode': '350000000',
                'payeeAcctName': '杨克鸿',
                'payeeAcctNo': '6212261402023157362',
                'payeeAcctBankName': '工商银行',
                'payAcctName': '福建工程学院',
                'payAcctNo': '35001610007058000369',
                'payAcctBankName': '中国建设银行股份有限公司福州城东支行',
                'agencyCode': '311632',
                'agencyName': '福建理工大学',
                'payCertId': '75939F9CD3D841C68ECD3A60B098BA91',
                'payCertNo': 'D012023-V02TLN-04847',
                'proCode': '350000223113210000016',
                'proName': '学生资助补助经费',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-06-15 16:12:47',
                'useDes': '4-5月学生助学金退款重汇',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 660,
                'payDetailId': '9D6FC4B9DB4544CDBAB19527FAA33343',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '01',
                'isSubName': '补贴到人项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': null,
                'mofDivCode': '350000000',
                'payeeAcctName': '薛浩然',
                'payeeAcctNo': '6217007120007406799',
                'payeeAcctBankName': '建设银行',
                'payAcctName': '福建工程学院',
                'payAcctNo': '35001610007058000369',
                'payAcctBankName': '中国建设银行股份有限公司福州城东支行',
                'agencyCode': '311632',
                'agencyName': '福建理工大学',
                'payCertId': '75939F9CD3D841C68ECD3A60B098BA91',
                'payCertNo': 'D012023-V02TLN-04847',
                'proCode': '350000223113210000016',
                'proName': '学生资助补助经费',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-06-15 16:12:47',
                'useDes': '4-5月学生助学金退款重汇',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 990,
                'payDetailId': 'BBC725EF4F6A40E3AF02169BC9BD81D8',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '01',
                'isSubName': '补贴到人项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': null,
                'mofDivCode': '350000000',
                'payeeAcctName': '于长宏',
                'payeeAcctNo': '6217001820055309656',
                'payeeAcctBankName': '建设银行',
                'payAcctName': '福建工程学院',
                'payAcctNo': '35001610007058000369',
                'payAcctBankName': '中国建设银行股份有限公司福州城东支行',
                'agencyCode': '311632',
                'agencyName': '福建理工大学',
                'payCertId': '75939F9CD3D841C68ECD3A60B098BA91',
                'payCertNo': 'D012023-V02TLN-04847',
                'proCode': '350000223113210000016',
                'proName': '学生资助补助经费',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-06-15 16:12:47',
                'useDes': '4-5月学生助学金退款重汇',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 450,
                'payDetailId': '7256965971A44C2F8014C0366ADD853F',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '01',
                'isSubName': '补贴到人项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': null,
                'mofDivCode': '350000000',
                'payeeAcctName': '黄伟财',
                'payeeAcctNo': '6217003400002546201',
                'payeeAcctBankName': '建设银行',
                'payAcctName': '福建工程学院',
                'payAcctNo': '35001610007058000369',
                'payAcctBankName': '中国建设银行股份有限公司福州城东支行',
                'agencyCode': '311632',
                'agencyName': '福建理工大学',
                'payCertId': '75939F9CD3D841C68ECD3A60B098BA91',
                'payCertNo': 'D012023-V02TLN-04847',
                'proCode': '350000223113210000016',
                'proName': '学生资助补助经费',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-06-15 16:12:47',
                'useDes': '4-5月学生助学金退款重汇',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 990,
                'payDetailId': 'FDB23612E1B24D129913DD3561B62C79',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '01',
                'isSubName': '补贴到人项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省上杭白砂国有林场',
                'payeeAcctNo': '9090524010010000002328',
                'payeeAcctBankName': '福建上杭农商行白砂支行',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 7800,
                'payDetailId': 'C812E792D37F4214899CB543230A2010',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省长汀楼子坝国有林场',
                'payeeAcctNo': '35001697107050007425',
                'payeeAcctBankName': '建行长汀县支行',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 16400,
                'payDetailId': '038A69BF3EDD48BAA9D67557A11E456B',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省顺昌埔上国有林场',
                'payeeAcctNo': '197010100100179760',
                'payeeAcctBankName': '兴业银行股份公司顺昌县支行',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 2600,
                'payDetailId': '67C8D07501084888ACBE7EAD0EDAAAEE',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省永定仙岽国有林场',
                'payeeAcctNo': '13730901040000313',
                'payeeAcctBankName': '农业银行龙岩永定下洋支行',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 5300,
                'payDetailId': 'F7A629C6BC854AAD9D88940048CF2789',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省泰宁国有林场',
                'payeeAcctNo': '13885101040001113',
                'payeeAcctBankName': '泰宁县农业银行营业部',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 94800,
                'payDetailId': 'EF26E36D8FA0498896CAB298677B53D9',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省南靖永丰国有林场',
                'payeeAcctNo': '13680201040001704',
                'payeeAcctBankName': '农业银行股份有限公司南靖山城支行',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 1700,
                'payDetailId': 'E401EAB86BD24351A8F723D181AA10FF',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省古田国有林场',
                'payeeAcctNo': '13251001040004727',
                'payeeAcctBankName': '农业银行古田县翠屏湖支行',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 900,
                'payDetailId': 'D088AA1EDFFC43EF8DF760EE46852F5F',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省寿宁景山国有林场',
                'payeeAcctNo': '13270101040009994',
                'payeeAcctBankName': '农业银行寿宁支行',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 1800,
                'payDetailId': '2EAE7CBD9A674F18B252B8927DFEAA47',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省宁化国有林场',
                'payeeAcctNo': '13895101040000964',
                'payeeAcctBankName': '农业银行宁化县支行',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 5300,
                'payDetailId': 'BED3E4180C6547B384D96AFC4882522F',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省将乐国有林场',
                'payeeAcctNo': '13850301040000294',
                'payeeAcctBankName': '农业银行将乐县金溪支行',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 119700,
                'payDetailId': 'BE334C33762B4AE191E047487396A755',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省华安金山国有林场',
                'payeeAcctNo': '9081110010010000002080',
                'payeeAcctBankName': '华安县农村信用合作联社营业部',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 200,
                'payDetailId': 'F423A557448C498595DA3502409FCA76',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省沙县水南国有林场',
                'payeeAcctNo': '1404041909001008415',
                'payeeAcctBankName': '工商银行沙县支行',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 200,
                'payDetailId': '5C4B940B282540FC9A3B99A7E3A3837F',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省仙游溪口国有林场',
                'payeeAcctNo': '35001636307052501501',
                'payeeAcctBankName': '建设银行仙游支行',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 100,
                'payDetailId': '93EF73560B2C4F9A82796CEA6FA9A2BB',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省平和天马国有林场',
                'payeeAcctNo': '13690101040000508',
                'payeeAcctBankName': '农业银行股份公司平和县支行',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 700,
                'payDetailId': '13CE46DAC6EB47918FF1EEF70FE8F10E',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省安溪半林国有林场',
                'payeeAcctNo': '13560501040003195',
                'payeeAcctBankName': '农业银行安溪虎邱支行',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 45300,
                'payDetailId': '16DD9B5DBDE94F12A4069A4C6009B927',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省漳平五一国有林场',
                'payeeAcctNo': '172020100100040752',
                'payeeAcctBankName': '兴业银行漳平支行',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 4600,
                'payDetailId': '1B9B223A61C044CEB8EDA84182F8BC0B',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省武夷山国有林场',
                'payeeAcctNo': '935003010016046688',
                'payeeAcctBankName': '邮政储蓄银行武夷山市支行',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 4600,
                'payDetailId': 'B75E7E7120684C5F8E353D4E12501370',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省明溪国有林场',
                'payeeAcctNo': '13870101040000849',
                'payeeAcctBankName': '农业银行股份有限公司明溪县支行',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 500,
                'payDetailId': 'C570934C81EE46E5B646629F190273E7',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省长泰亭下国有林场',
                'payeeAcctNo': '13660101040000710',
                'payeeAcctBankName': '农业银行长泰县支行营业部',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 3000,
                'payDetailId': '227C92D231554F4CBC06C0274A14B692',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省永春碧卿国有林场',
                'payeeAcctNo': '13571201040000112',
                'payeeAcctBankName': '农业银行永春榜德支行',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 200,
                'payDetailId': 'D9E4946251C74C7C9B51C30F98F638BD',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省永安国有林场',
                'payeeAcctNo': '35001646007050007496',
                'payeeAcctBankName': '建行永安支行',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 200,
                'payDetailId': '1D69855E98E14EB49962D5E40CC736DB',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省同安双溪国有林场',
                'payeeAcctNo': '88352000666016',
                'payeeAcctBankName': '交通银行厦门分行银城支行',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 900,
                'payDetailId': '3F9BD5207C5043678087F8BEE9FAAC17',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省松溪国有林场',
                'payeeAcctNo': '13990501040001595',
                'payeeAcctBankName': '农业银行松溪县支行',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 60000,
                'payDetailId': 'B3AA75516FD24283B3FA153938D5F984',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省闽清美菰国有林场',
                'payeeAcctNo': '13185101040005293',
                'payeeAcctBankName': '农业银行闽清县支行',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 700,
                'payDetailId': '978396F4FCA349139C9D9C79318A0D17',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省连城邱家山国有林场',
                'payeeAcctNo': '9090822010010000001357',
                'payeeAcctBankName': '连城县农村信用合作联社姑田信用社',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 94900,
                'payDetailId': '61AD0B10F94A47C48A5FC1FF37FF4708',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省安溪丰田国有林场',
                'payeeAcctNo': '13561401040000284',
                'payeeAcctBankName': '农业银行安溪感德支行',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 3400,
                'payDetailId': '2D7E64BA87734D0892089ACEBF43F1D6',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              },
              {
                'fiscalYear': '2023',
                'corBgtDocNoCode': null,
                'corBgtDocNoName': '闽财指〔2023〕0065号',
                'mofDivCode': '350000000',
                'payeeAcctName': '福建省武平南坊国有林场',
                'payeeAcctNo': '13750101040000869',
                'payeeAcctBankName': '农业银行武平县支行',
                'payAcctName': '福建省国有林场发展中心',
                'payAcctNo': '7341010183100005319',
                'payAcctBankName': '中信银行福州分行',
                'agencyCode': '373605',
                'agencyName': '福建省国有林场发展中心（全省林场）',
                'payCertId': '5CBE7F5D2FD942A985927B4246011BEA',
                'payCertNo': 'D012023-V02S57-00090',
                'proCode': '350000233730310000061',
                'proName': '天然商品林（非国有）生态保护补偿',
                'expFuncCode': null,
                'expFuncName': null,
                'govBgtEcoCode': null,
                'govBgtEcoName': null,
                'fundTypeCode': '111',
                'fundTypeName': '一般公共预算资金',
                'amount': null,
                'xpayDate': '2023-04-23 09:56:53',
                'useDes': '非国有天然商品林保护修复补偿（场局202314号）',
                'payTypeName': '国库集中支付',
                'payTime': null,
                'setModeName': '电子转账支付',
                'payAmt': 8700,
                'payDetailId': '0BBC4B708A1B4C1CAADCFCFFDCA914EE',
                'payAppId': null,
                'isDirCode': null,
                'isSubCode': '03',
                'isSubName': '补贴到人和企业的项目'
              }
            ],
            'amountSum': null,
            'description': null
          }
        }
        this.tableLoading2 = false
        if (res.code === '000000') {
          this.tableData1 = res.data.results
          this.mainPagerConfig1.total = res.data.totalCount
        } else {
          this.$message.error(res.result)
        }
      })
    },
    // 操作日志
    queryActionLog(row) {
      // let data = {
      //   roleguid: this.$store.state.curNavModule.roleguid,
      //   data: {
      //     statusCode: this.toolBarStatusSelect.code,
      //     id: row.id,
      //     appId: 'pay_voucher'
      //   }
      // }
      // HttpModule.queryActionLog(data).then(res => {
      //   this.logData = res.data
      //   console.log(this.logData)
      //   this.showLogView = true
      // })
    },
    // 送审
    audieData(param) {
      // HttpModule.audieData(param).then(res => {
      //   if (res.code === '000000') {
      //     this.$message.warning('操作成功')
      //     this.queryTableDatas()
      //   }
      // })
    },
    /**
     * 左侧树过滤搜索
     * @returns {Promise<void>}
     */
    async searchTreeHandle(inputVal) {
      this.treeFilterText = inputVal
      this.treeCurrentPage = 1
      await this.getLeftTreeData()
    },
    getLeftTreeData() {
      let that = this
      let params = {}
      if (this.userInfo.province === '610000000') {
        params = {
          elementCode: 'admdiv',
          province: '610000000',
          year: this.userInfo.year,
          wheresql: 'and code like \'' + 61 + '%\''
        }
      } else if (
        this.userInfo.province === '610100000' ||
        this.userInfo.province === '610100000' ||
        this.userInfo.province === '610200000' ||
        this.userInfo.province === '610300000' ||
        this.userInfo.province === '610400000' ||
        this.userInfo.province === '610500000' ||
        this.userInfo.province === '610600000' ||
        this.userInfo.province === '610700000' ||
        this.userInfo.province === '610800000' ||
        this.userInfo.province === '610900000' ||
        this.userInfo.province === '611000000' ||
        this.userInfo.province === '611200000'
      ) {
        params = {
          elementCode: 'admdiv',
          province: this.userInfo.province,
          year: this.userInfo.year,
          wheresql: 'and code like \'' + this.userInfo.province.substring(0, 4) + '%\''
        }
      } else {
        params = {
          elementCode: 'admdiv',
          province: this.userInfo.province,
          year: this.userInfo.year,
          wheresql: 'and code like \'' + this.userInfo.province.substring(0, 6) + '%\''
        }
      }
      HttpModule.getTreeData1(params).then(res => {
        if (res.data) {
          // let treeResdata = that.getChildrenData(res.data)
          // treeResdata.forEach(item => {
          //   item.label = item.id + '-' + item.businessName
          // })
          // const result = [
          //   {
          //     id: 'root',
          //     label: '全部',
          //     code: 'root',
          //     isleaf: '0',
          //     children: treeResdata
          //   }
          // ]
          that.treeData = res.data
        } else {
          this.$message.error('左侧树加载失败')
        }
      })
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
    this.getLeftTreeData()
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
.one-row{
  width: 100%;
}
</style>
