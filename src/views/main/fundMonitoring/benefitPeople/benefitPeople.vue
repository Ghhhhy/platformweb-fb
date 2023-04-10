<!--支付数据规范性检查-->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
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
        <FilterTreeInput
          :filter-text="treeFilterText"
          :expend.sync="leftTreeVisible"
          @search="searchTreeHandle"
        />
        <!-- <BsTreeSet
          ref="treeSet"
          v-model="leftTreeVisible"
          :tree-config="treeTypeConfig"
          @onChangeInput="changeInput"
          @onAsideChange="asideChange"
          @onConfrimData="treeSetConfrimData"
        /> -->
        <BsBossTree
          ref="leftTree"
          v-loading="treeLoadingState"
          :defaultexpandedkeys="['root']"
          style="overflow: hidden"
          :is-server="false"
          :ajax-type="treeAjaxType"
          :server-uri="treeServerUri"
          :datas="treeData"
          :queryparams="treeQueryparams"
          :global-config="treeGlobalConfig"
          :clickmethod="onClickmethod"
        />
        <div class="block">
          <el-pagination
            background
            small
            :pager-count="5"
            :current-page="treeCurrentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="treePageSize"
            layout="total, prev, pager, next"
            :total="proTotal"
            @current-change="handleCurrentChange"
          />
        </div>
      </template>
      <template v-slot:mainForm>
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
          style="height: 40%"
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
              <!--              <div v-if="leftTreeVisible === false" class="table-toolbar-contro-leftvisible" @click="leftTreeVisible = false"></div>-->
              <div class="table-toolbar-left-title">
                <span class="fn-inline">支付凭证信息</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTable>
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
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left" style="display: flex; align-items: center">
              <!--              <div v-if="leftTreeVisible === false" class="table-toolbar-contro-leftvisible" @click="leftTreeVisible = false"></div>-->
              <div class="table-toolbar-left-title left-title-clear-float">
                <span class="fn-inline">惠民支付明细数据</span>
                <i class="fn-inline"></i>
              </div>
              <div v-if="matchHoot">
                <span>匹配条件：</span>
                <el-checkbox v-model="isProName" @change="changes">项目名称</el-checkbox>
                <el-checkbox v-model="isAmount" @change="changes">金额</el-checkbox>
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
    <AddDialog
      v-if="addDialogVisible"
      :title="dialogTitle"
      :select-data="selectData"
    />
  </div>
</template>

<script>
import { proconf } from './benefitPeople'
import FilterTreeInput from './FilterTreeInput.vue'
import AddDialog from './children/AddDialog'
import ImportModel from '@/components/Table/import/import.vue'
import HttpModule from '@/api/frame/main/fundMonitoring/benefitPeople.js'

import { readLocalFile } from '@/utils/readLocalFile'
import { checkRscode } from '@/utils/checkRscode'
import { downloadByUrl } from '@/utils/download'
// import AddDialog from './children/addDialog'
// import HttpModule from '@/api/frame/main/Monitoring/WarningDetailsByCompartment.js'
export default {
  components: {
    FilterTreeInput,
    ImportModel,
    AddDialog
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
      selectData: {},
      addDialogVisible: false,
      // 左侧树过滤值
      treeFilterText: '',
      matchHoot: true,
      isProName: false,
      isAmount: false,
      importModalVisible: false, // 导入弹框
      fileConfig: {
        fileName: '',
        file: null,
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
        globalConfig: {
          checkType: 'checkbox',
          seq: true,
          filters: true,
          sortable: false
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
        await HttpModule.importPersonAndCompany(this.fileConfig)
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
      console.log(window.location)
      downloadByUrl(
        `./static/files/${localFileName}`,
        downloadFileName
      )
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
        this.$message.info('请选择一条支付凭证信息进行匹配')
      }
      if (this.isProName) {
        this.proName = datas1[0]?.proName
      } else {
        this.proName = ''
      }
      if (this.isAmount) {
        this.payAmt = datas1[0]?.payAmt
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
      console.log(obj.code, obj.code === '1')
      this.tableConfig.globalConfig = {
        checkType: obj.code === '1' ? 'checkbox' : false,
        seq: true,
        filters: true,
        sortable: false
      }
      this.condition = {}
      this.mainPagerConfig.currentPage = 1
      this.mainPagerConfig1.currentPage = 1
      this.refresh()
      this.refresh1()
      // this.$refs.mainTableRef.$refs.xGrid.clearScroll()
    },
    search(obj) {
      this.payCertNo = obj.payCertNo
      this.amount = obj.amount
      this.queryTableDatas()
      // this.queryTableDatasCount()
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
      this.queryTableDatas()
      this.queryTableDatas1()
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
    checkboxChange1(checked, row) {
      switch (this.toolBarStatusSelect.code) {
        case '1':
          if (checked.selection.length !== 1 && checked.selection.length !== 0) {
            this.$message.info('请选择一条支付凭证信息进行匹配')
            break
          }
          if (this.isProName && this.isAmount) {
            this.proName = checked.selection[0]?.proName
            this.amount = checked.selection[0]?.amount
            this.queryTableDatas()
            break
          }
          if (this.isProName) {
            this.proName = checked.selection[0]?.proName
            this.queryTableDatas()
            break
          }
          if (this.isAmount) {
            this.amount = checked.selection[0]?.amount
            this.queryTableDatas()
            break
          }
          break
        case '2':
          this.dtos.length = checked.selection.length
          for (let i = 0; i < this.dtos.length; i++) {
            this.$set(this.dtos, i, checked.selection[i].payCertId)
          }
          this.queryTableDatas()
          break
      }
    },
    // 切换操作按钮
    async operationToolbarButtonClickEvent(obj, context, e) {
      let datas1 = this.$refs.mainTableRef.getSelectionData()
      let datas2 = this.$refs.mainTableRef1.getSelectionData()
      switch (obj.code) {
        // 挂接
        case 'hook_set':
          // if (datas1.length !== 1) {
          //   this.$message.warning('请选择一条惠民支付明细数据')
          //   return
          // }
          if (datas2.length !== 1) {
            this.$message.warning('请选择一条支付凭证信息数据')
            return
          }
          this.hook(datas1, datas2[0])
          break
        // 手动读取
        case 'peo_read':
          this.read()
          break
        // 编辑
        case 'update':
          if (datas1.length !== 1) {
            this.$message.warning('请选择一条惠民支付明细数据')
            return
          }
          this.selectData = datas1[0]
          this.updateImport()
          break
        // 删除
        case 'delete':
          if (this.$refs.mainTableRef.getSelectionData().length === 0) {
            this.$message.warning('请选择需要删除的惠民支付明细数据')
            return
          }
          this.$confirm('确认删除！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let datas = this.$refs.mainTableRef.getSelectionData()
            this.delete(datas)
          })
          break
        // 取消挂接
        case 'hook_not':
          if (datas2.length === 0) {
            this.$message.warning('请选择支付凭证数据')
            return
          }
          this.notHook(datas2)
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
    delete(datas) {
      HttpModule.delete(datas).then(res => {
        if (res.code === '000000') {
          this.$message.success('删除成功')
          this.queryTableDatas()
        } else {
          this.$message.error(res.result)
        }
      })
    },
    updateImport() {
      this.addDialogVisible = true
      this.dialogTitle = '修改'
    },
    async importSuccessCallback(file) {

    },
    hook(datas1, datas2) {
      const param = {
        payCertNo: datas1.payCertNo,
        id: datas1.id,
        payCers: datas1,
        payCertId: datas2.payCertId
      }
      HttpModule.update(param).then(res => {
        if (res.code === '000000') {
          this.$message.success('挂接成功')
          this.queryTableDatas()
          this.queryTableDatas1()
        } else {
          this.$message.error(res.result)
        }
      })
    },
    notHook(datas2) {
      HttpModule.notHookByInterFace(datas2).then(res => {
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
          this.queryTableDatas()
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
    onClickmethod(node) {
      // if (node.children !== null && node.children.length !== 0 && node.id !== '0') {
      //   return
      // }
      if (node.id !== 'root') {
        this.proCode = node.code
      } else {
        this.condition = {}
        this.proCode = ''
      }
      this.queryTableDatas()
      this.queryTableDatas1()
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
        proCode: this.proCode,
        proName: this.proName,
        payCertNo: this.payCertNo,
        amount: this.amount,
        payAmt: this.payAmt,
        mofDivName: this.mofdivName,
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
          this.$message.error(res.result)
        }
      })
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
        mofDivName: this.mofdivName,
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
      this.offset = (that.treeCurrentPage - 1) * (this.treePageSize)
      this.treeLoadingState = true
      let params = {
        elementcode: 'pro',
        year: this.$store.state.userInfo.year,
        province: this.$store.state.userInfo.province,
        name: this.proName1,
        limit: this.treePageSize,
        offset: this.offset
      }
      this.wheresql && (params.wheresql = this.wheresql)

      HttpModule.getTreeData1(params).then(res => {
        if (res.code === '000000') {
          let treeResdata = res.data
          treeResdata.forEach(item => {
            item.label = item.code + '-' + item.name
          })
          const result = [
            {
              id: 'root',
              label: '全部',
              code: 'root',
              isleaf: '0',
              children: treeResdata
            }
          ]
          that.treeData = result
          that.proTotal = res.data.length
        } else {
          this.$message.error('左侧树加载失败')
        }
      }).finally(() => {
        this.treeLoadingState = false
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
</style>
