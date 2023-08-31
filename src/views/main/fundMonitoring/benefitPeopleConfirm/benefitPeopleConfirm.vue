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
      height="200"
      :show-footer="true"
      title="取消确认"
      @close="closeModal"
    >
      <el-form ref="showConfirForm" :model="formModelData" :rules="formModelRule" label-width="80px">
        <el-form-item label="取消说明" prop="cancelDescription" class="one-row">
          <el-input
            v-model="formModelData.cancelDescription"
            type="textarea"
            :maxlength="100"
            show-word-limit
            resize="none"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入取消说明"
          />
        </el-form-item>
      </el-form>
      <!-- <vxe-form ref="showConfirForm" :data="formModelData" :rules="formModelRule">
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
      </vxe-form> -->
      <div slot="footer" class="vxeModalUnique">
        <el-button size="small" @click="closeModal">取消</el-button>
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
        cancelDescription: ''
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
          { required: true, message: '请输入取消说明', trigger: 'blur' }
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
        '2': 0,
        '3': 0
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
    closeModal() {
      this.showConfirmModal = false
      this.formModelData.cancelDescription = ''
      this.$refs.showConfirForm.clearValidate()
    },
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
        case '3':
          this.isHook = '2'
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
          this.showConfirmModal = true
          this.clickRow = datas2
          // this.notHook(datas2)
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
                  row.xpayDate = timestamp ? getDateString(timestamp) : row.xpayDate
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
        payDetailIds: datas2.map(item => {
          let itemCopy = Object.assign({}, item, { xPayDate: item.xpayDate, isHook: this.isHook })
          delete itemCopy.xpayDate
          return itemCopy
        })
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
      const param = {
        payDetailIds: datas2.map(item => {
          let itemCopy = Object.assign({}, item, { xPayDate: item.xpayDate })
          delete itemCopy.xpayDate
          return itemCopy
        })
      }
      await this.$refs.showConfirForm.validate()
      HttpModule.notConfirm(param).then(res => {
        if (res.code === '000000') {
          this.closeModal()
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
