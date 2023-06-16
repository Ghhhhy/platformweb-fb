<!-- 预警明细查询（按规则） -->
<template>
  <div v-loading="tableLoading" style="height: 100%" class="createProcessing">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible" :default-split-pane-left-width="14">
      <template v-slot:topTap></template>
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          :is-open="isShowQueryConditions"
          :tab-status-btn-config="toolBarStatusBtnConfig"
          @onQueryConditionsClick="onQueryConditionsClick"
          @btnClick="onTabPanelBtnClick"
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
      <template v-if="showBuinessTree" v-slot:mainTree>
        <BsTreeSet
          ref="treeSet"
          v-model="leftTreeVisible"
          :tree-config="treeTypeConfig"
          @onChangeInput="(val) => { leftTreeFilterText = val }"
          @onAsideChange="asideChange"
          @onConfrimData="treeSetConfrimData"
        />
        <BsTree
          ref="leftTree"
          open-loading
          :filter-text="leftTreeFilterText"
          :tree-data="treeData"
          :current-node-key="currentNodeKey"
          :config="{ showFilter: false, treeProps: { nodeKey: 'code', label: 'label',children: 'children' } }"
          @onNodeClick="onClickmethod"
        />
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="mainTableRef"
          :footer-config="tableFooterConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :table-config="tableConfig"
          :pager-config="mainPagerConfig"
          :toolbar-config="tableToolbarConfig"
          :cell-style="cellStyle"
          @onToolbarBtnClick="onToolbarBtnClick"
          @ajaxData="ajaxTableData"
          @cellClick="cellClick"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div v-if="leftTreeVisible === false && showBuinessTree === true" class="table-toolbar-contro-leftvisible" @click="leftTreeVisible = true"></div>
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
    <AddDialog
      v-if="dialogVisible"
      :title="dialogTitle"
      :param5="param5"
      :warning-code="warningCode"
      :fi-rule-code="fiRuleCode"
      :deal-no="dealNo"
      :detail-data="detailData"
      :is-create="isCreate"
      :bussness-id="bussnessId"
    />
    <FilePreview
      v-if="filePreviewDialogVisible"
      :visible.sync="filePreviewDialogVisible"
      :file-guid="fileGuid"
      :app-id="appId"
    />
    <GlAttachment
      v-if="showGlAttachmentDialog"
      :user-info="userInfo"
      :billguid="billguid"
      @close="closeAttachment"
    />
    <!-- 附件弹框 -->
    <BsAttachment v-if="showAttachmentDialog" refs="attachmentboss" :user-info="userInfo" :billguid="billguid" />
  </div>
</template>

<script>
import { proconf } from './createProcessing'
import AddDialog from './children/addDialog'
import HttpModule from '@/api/frame/main/Monitoring/WarningDetailsByCompartment.js'
import api from '@/api/frame/main/fundMonitoring/createProcessing.js'
import FilePreview from './children/filePreview'
import GlAttachment from './children/common/GlAttachment'

export default {
  components: {
    AddDialog,
    FilePreview,
    GlAttachment
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    },
    dialogVisible: {
      handler(newValue) {
        this.getCount()
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      // BsQuery 查询栏
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      radioShow: true,
      roleId: '',
      breakRuleVisible: false,
      treeData: [],
      treeTypeConfig: {
        curRadio: 'AGENCY'
      },
      treeGlobalConfig: {
        inputVal: ''
      },
      treeQueryparams: { elementCode: 'admdiv', province: '610000000', year: '2022', wheresql: 'and code like \'' + 61 + '%\'' },
      // treeServerUri: 'pay-clear-service/v2/lefttree',
      treeServerUri: '',
      treeAjaxType: 'get',
      leftTreeVisible: false,
      // 头部工具栏 BsTabPanel config
      toolBarStatusBtnConfig: {
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
        }
      },
      buttonsInfo: proconf.statusRightToolBarButtonByBusDept,
      tabStatusNumConfig: {
        'dcl': 0,
        'yxf': 0,
        'dsh': 0,
        'yth': 0,
        'rdzc': 0,
        'yzg': 0,
        'dhs': 0,
        'bth': 0,
        'hsww': 0,
        'dcszg': 0,
        'csysh': 0
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
      tableColumnsConfig: proconf.policiesTableColumns,
      tableData: [
      ],
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
      leftNode: {},
      regulationStatus: '1',
      mainPagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      tableConfig: {
        renderers: {
          // 修改 配置 下发 删除
          $CreateProcessingGloableOptionRow: proconf.gloableOptionRowDetail,
          $gloableAttach: proconf.gloableAttach,
          $gloableOptionRowLog: proconf.gloableOptionRowLog
        },
        methods: {
          onOptionRowClick: this.handleCheck

        }
      },
      tableFooterConfig: {
        showFooter: false
      },
      // 操作日志
      logData: [],
      showLogView: false,
      // 新增弹窗
      dialogVisible: false,
      dialogTitle: '查看详情信息',
      addTableData: [],
      // 请求 & 角色权限相关配置
      menuName: '监控问询单列表',
      params5: '',
      menuId: '',
      tokenid: '',
      userInfo: {},
      roleguid: this.$store.state.curNavModule.roleguid,
      appId: 'pay_voucher',
      isHaveZero: '0',
      // 文件
      showAttachmentDialog: false,
      showGlAttachmentDialog: false,
      billguid: '',
      condition: {},
      handleType: '',
      isEnable: '',
      agencyName: '',
      createTime: '',
      firulename: '',
      violationType: '',
      regulationType: '',
      warningLevel: '',
      DetailData: {},
      regulationclass: '',
      mofDivCode: '',
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
        clearable: true
      },
      param5: '',
      fiRuleCode: '',
      warningCode: '',
      dealNo: '',
      status: null,
      detailData: [],
      isCreate: false,
      isStatus: false, // 未整改标识
      unitStatus: '',
      departmentStatus: '',
      officeStatus: '',
      isIssue: false, // 已整改标识
      isArchive: false,
      codeList: [],
      violateType: '',
      isAgencyDone: false,
      isNormalDone: false,
      isProcessed: false,
      regulationClassName: '',
      warnTime: '',
      triggerClass: '',
      fiRuleName: '',
      filePreviewDialogVisible: false,
      fileGuid: '',
      bussnessId: '',
      showBuinessTree: false,
      leftTreeFilterText: '', // 展示左侧树 只有某些页面才展示
      selectBtnType: '',
      showLog: false,
      currentNodeKey: '7',
      trackProName: '',
      agencyCodeList: []
    }
  },
  activated() {
    this.updateRegulationClassNameFormConfig()
  },
  methods: {
    /**
     *动态控制左侧树的显示  只有特定的路由才显示
     */
    setShowBusinesTree() {
      // 可显示是左侧业务树的路由
      const showRouters = ['CompanyRetroactBySpecial', 'DepartmentRetroactBySpecial']
      if (showRouters.includes(this.$route.name)) {
        this.showLog = true
      }
      if (this.$route.name === 'DepartmentRetroactBySpecial') {
        this.showBuinessTree = true
        this.leftTreeVisible = true
        // 去发请求获取左侧数据
        this.getLeftTreeData()
      }
    },
    showLogModel(row) {
      this.showLogView = true
      this.queryActionLog(row)
    },
    // 操作日志
    queryActionLog(row) {
      api.getLogs(row.dealNo).then(res => {
        if (res.code === '000000') {
          let tempData = res.data.map(item => {
            return {
              logid: item['operationTypeCode'],
              nodeName: item['operationTypeName'],
              actionUser: item['operationUser'],
              actionName: item['operationTypeName'],
              actionTime: item['createdTime'] == null ? '' : item['createdTime'],
              message: item['operationComment']
            }
          })
          this.logData = tempData
          console.log(this.logData)
          this.showLogView = true
        } else {
          this.$message.error(res.message)
        }
      })
    },
    updateRegulationClassNameFormConfig () {
      // 如果菜单参数有主题 当前模块就使用该主题查询
      if (this.transJson(this.$store.state.curNavModule.param5)?.regulationClass) {
        const index = this.queryConfig.findIndex(item => item.field === 'regulationClassName')
        index > -1 && this.queryConfig?.splice(index, 1)
      }
    },
    search(obj) {
      console.log(obj)
      this.dealNo = obj.dealNo
      this.regulationClassName = obj.regulationClassName
      this.warnTime = obj.warnTime
      this.triggerClass = obj.triggerClass
      this.warningLevel = obj.warningLevel
      this.agencyName = obj.agencyName
      this.issueTime = obj.issueTime
      this.fiRuleName = obj.fiRuleName
      this.trackProName = obj.trackProName || ''
      this.violateType = obj.violateType
      this.agencyCodeList = obj.agencyCodeList_code__multiple
      if (this.menuName === '监控问询单列表' && this.status !== 0) {
        // this.status = obj.status === '' ? this.status : obj.status
        this.getdata()
      }
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
    handleCheck({ row, type }) {
      switch (type) {
        case 'view':
          this.fiRuleCode = row.fiRuleCode || ''
          this.warningCode = row.warningCode || ''
          this.dialogVisible = true
          this.dialogTitle = '查看详情信息'
          break
        case 'attach':
          this.showAttachment(row)
          break
        case 'viewLog':
          this.showLogModel(row)
          break
      }
    },
    changeVisible(val) {
      console.log(val, '输出')
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
    // 左侧树
    changeInput(val) {
      this.treeGlobalConfig.inputVal = val
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
    /**
     * 重置查询条件
     */
    resetQuery() {
      this.$refs.queryFrom.reset()
      this.dealNo = ''
      this.regulationClassName = ''
      this.warnTime = ''
      this.triggerClass = ''
      this.warningLevel = ''
      this.agencyName = ''
      this.issueTime = ''
      this.fiRuleName = ''
      this.violateType = ''
      this.trackProName = ''
    },
    onClickmethod({ node }) {
      if (node.code) {
        this.resetQuery()
        // 根据业务渲染列表
        this.currentNodeKey = node.code
        this.bussnessId = node.code
        this.tableColumnsConfig = proconf.getColumns(this.selectBtnType, this.bussnessId, this.showLog)
        this.getdata()
      }
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
      console.log('查看附件', row)
      if (row.attachmentid1 === null && row.attachmentid3 === null) {
        this.$message.warning('该数据无附件')
        return
      }
      this.billguid = row.attachmentid1 === null ? row.attachmentid3 : row.attachmentid1
      // this.showAttachmentDialog = true
      this.showGlAttachmentDialog = true
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property
      console.log(key, obj.row)
      switch (key) {
      }
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh() {
      if (this.menuName === '监控问询单列表' && this.status === 0) {
        this.queryTableDatas()
      } else if (this.menuName === '监控问询单列表' && this.status !== 0) {
        this.getdata()
      } else {
        this.getWarnData()
      }
    },
    closeAttachment() {
      this.showGlAttachmentDialog = false
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      if (this.menuName === '监控问询单列表' && this.status === 0) {
        this.queryTableDatas()
      } else if (this.menuName === '监控问询单列表' && this.status !== 0) {
        this.getdata()
      } else {
        this.getWarnData()
      }
    },
    // 展开折叠查询框
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
    },
    // 查询 table 数据
    queryTableDatas() {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        // agencyName: this.agencyName,
        agencyCodeList: this.agencyCodeList,
        issueTime: this.issueTime,
        fiRuleName: this.fiRuleName,
        violateType: this.violateType,
        status: this.status,
        mofDivCodeList: this.codeList,
        mofDivCode: this.mofDivCode || '',
        trackProName: this.trackProName || '',
        roleguid: this.roleguid
      }
      if (this.$store.state.curNavModule.f_FullName.substring(0, 4) === '直达资金') {
        param.regulationClass = '0201'
      }

      const regulationClass = this.transJson(this.$store.state.curNavModule.param5)?.regulationClass
      if (regulationClass) {
        param.regulationClass = regulationClass
      }

      this.tableLoading = true
      api.getMarkData(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          console.log(res.data.results)
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
          this.tabStatusNumConfig['unIssue'] = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getdata() {
      console.log('status1', this.status)
      let param = {
        page: this.mainPagerConfig.currentPage, // unitStatus页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        agencyName: this.agencyName,
        agencyCodeList: this.agencyCodeList,
        issueTime: this.issueTime,
        fiRuleName: this.fiRuleName,
        violateType: this.violateType,
        mofDivCode: this.mofDivCode || '',
        isUnit: this.param5.retroact,
        status: this.status,
        roleId: this.roleId,
        mofDivCodeList: this.codeList,
        dealNo: this.dealNo,
        isNormalDone: this.isNormalDone,
        isProcessed: this.isProcessed,
        isAgencyDone: this.isAgencyDone,
        regulationClassName: this.regulationClassName,
        warnTime: this.warnTime,
        triggerClass: this.triggerClass,
        warningLevel: this.warningLevel,
        businessModelCode: this.bussnessId || undefined,
        trackProName: this.trackProName || ''
      }
      if (this.$store.state.curNavModule.f_FullName.substring(0, 4) === '直达资金') {
        param.regulationClass = '0201'
      }

      const regulationClass = this.transJson(this.$store.state.curNavModule.param5)?.regulationClass
      if (regulationClass) {
        param.regulationClass = regulationClass
      }

      this.tableLoading = true
      api.getDetail(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
          if (this.status === 1) {
            this.tabStatusNumConfig['dcl'] = res.data.totalCount
          } else if (this.status === 2) {
            this.tabStatusNumConfig['rdzc'] = res.data.totalCount
          } else if (this.status === 3) {
            this.tabStatusNumConfig['yxf'] = res.data.totalCount
            this.tabStatusNumConfig['dhs'] = res.data.totalCount
          } else if (this.status === 4) {
            this.tabStatusNumConfig['hsww'] = res.data.totalCount
          } else if (this.status === 5) {
            this.tabStatusNumConfig['yzg'] = res.data.totalCount
          } else if (this.status === 6) {
            this.tabStatusNumConfig['hsww'] = res.data.totalCount
          } else if (this.status === 7) {
            this.tabStatusNumConfig['yzg'] = res.data.totalCount
          } else if (this.status === 8) {
            this.tabStatusNumConfig['bth'] = res.data.totalCount
            this.tabStatusNumConfig['yth'] = res.data.totalCount
          }
          if (this.isAgencyDone) {
            this.tabStatusNumConfig['dsh'] = res.data.totalCount
            this.tabStatusNumConfig['dcszg'] = res.data.totalCount
          }
          if (this.isNormalDone) {
            this.tabStatusNumConfig['rdzc'] = res.data.totalCount
          }
          if (this.isProcessed) {
            this.tabStatusNumConfig['csysh'] = res.data.totalCount
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 归档查询
    getNoFile() {
      let param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        agencyName: this.agencyName,
        issueTime: this.issueTime,
        fiRuleName: this.fiRuleName,
        violateType: this.violateType,
        mofDivCode: this.mofDivCode || ''
      }
      api.getNoFile(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
          this.tabStatusNumConfig['archive'] = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 生成
    handleCreate() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.isCreate = true
      this.detailData = selection
      this.dialogVisible = true
      this.dialogTitle = '监控问询单信息'
    },
    // 整改
    handleFeedback() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length === 0) {
        this.$message.warning('请选择一条数据')
        return
      }
      let batchIdObj = {}
      selection.forEach(item => {
        batchIdObj[item.batchId] = item.batchIdObj
      })
      console.log(77, batchIdObj)
      if (Object.keys(batchIdObj).length > 1) {
        this.$message.warning('请选择同一批次')
        return
      }
      this.detailData = selection
      this.dialogVisible = true
      this.dialogTitle = '监控问询单信息'
      console.log('status', this.status)
    },
    handleProcess() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.detailData = selection
      this.dialogVisible = true
      this.dialogTitle = '监控问询单信息'
      console.log('isAgencyDonesh', this.isAgencyDone)
    },
    queryBusinessData() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.detailData = selection
      this.dialogVisible = true
      this.dialogTitle = '业务数据信息'
    },
    handleArchiving() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.detailData = selection
      this.dialogVisible = true
      this.dialogTitle = '监控问询单信息'
    },
    handleDetail() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.detailData = selection
      this.dialogVisible = true
      this.dialogTitle = '监控问询单信息'
    },
    onTabPanelBtnClick(obj) { // 按钮点击
      let self = this
      switch (obj.code) {
        case 'create': // 生成
          self.handleCreate(obj)
          break
        case 'feedback': // 整改反馈
        case 'bth':
        case 'dcl':
          self.handleFeedback(obj)
          break
        case 'process': // 审核
          self.handleProcess(obj)
          break
        case 'queryBusinessData': // 联查业务数据
          self.queryBusinessData(obj)
          break
        case 'archiving': // 归档
          self.handleArchiving(obj)
          break
        case 'checkDetail': // 查看详情
          self.handleDetail(obj)
          break
        case 'check': // 校验
          self.check(obj)
          break
        case 'print': // 打印
          self.print(obj)
          break
        default:
          console.log('default fallback')
      }
    },
    getLeftTreeData() {
      let that = this
      const param = {
        businessType: 2,
        parentId: '1'// 预算管理一体化系统
      }
      api.getbusLists(param).then(res => {
        if (res.rscode === '100000') {
          let resData = res.data.results.filter(item => item.id !== '8')
          let treeResdata = that.getChildrenData(resData)
          that.treeData = treeResdata
        } else {
          this.$message.error('左侧树加载失败')
        }
      })
    },
    getChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        item.code = item.id
        item.label = item.businessName
        item.children = item.children || []
        if (item.children && item.children.length > 0) {
          that.getChildrenData(item.children)
        }
      })
      return datas
    },
    initButtons(param5) {
      let obj = {}
      console.log(param5)
      if (param5.isRetroact === 'true' && param5.retroact === 'department') { // 主管处室反馈
        this.toolBarStatusBtnConfig = { ...this.toolBarStatusBtnConfig, ...proconf.retroactMofBtnConfig }
        obj.code = 'dcl'
      } else if (param5.isRetroact === 'true' && param5.retroact === 'company') { // 单位反馈
        this.toolBarStatusBtnConfig = { ...this.toolBarStatusBtnConfig, ...proconf.retroactBtnConfig }
        obj.code = 'dhs'
      }
      //   } else {
      //     self.$message.error('区划配置信息初始化失败!')
      //   }
      // })
    },
    transJson(str) {
      if (!str) return
      var params = str.split(',')
      var result = {}
      if (params && params.length > 0) {
        for (var i = 0; i < params.length; i++) {
          var map = params[i].split('=')
          result[map[0]] = map[1]
        }
      }
      return result
    },
    getWarnData() {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        warn_level: this.warningLevel, // 预警级别
        regulation_type: this.regulationType,
        mofdivname: this.mofdivname,
        agencycode: this.agencycode,
        firulename: this.firulename,
        regulation_class: this.regulationclass,
        firulecode: this.fiRuleCode
      }
      this.tableLoading = true
      HttpModule.queryTableDatas(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
          this.tabStatusNumConfig['1'] = res.data.totalCount
        } else {
          this.$message.error(res.result)
        }
      })
    },
    // 切换状态栏
    onStatusTabClick(obj) {
      this.isStatus = false // 未整改标识
      this.isIssue = false // 已整改标识
      this.isArchive = false // 归档标识
      // 切换页签清空搜索栏
      this.resetQuery()
      this.status = null
      this.isAgencyDone = false
      this.isNormalDone = false
      this.isProcessed = false
      this.selectBtnType = obj.code
      console.log('ssss', this)
      console.log('ssss1', obj.code)

      switch (obj.code) {
        // 预警明细列表
        case 'warnList':
          this.tableColumnsConfig = proconf.warnTableColumns
          this.queryConfig = proconf.warnQueryConfig
          this.searchDataList = proconf.warnQueryData
          this.menuName = '预警明细列表'
          this.getWarnData()
          break
        // 待下发
        case 'unIssue':
          this.tableColumnsConfig = proconf.logoTableColumns
          this.queryConfig = proconf.createHighQueryConfig
          // proconf.highQueryConfig[1].itemRender.props.disabled = true
          // proconf.highQueryConfig[3].itemRender.props.disabled = true
          this.searchDataList = proconf.createHighQueryData
          this.$refs.queryFrom.onSearchResetClick()
          this.status = 0
          this.menuName = '监控问询单列表'
          this.queryTableDatas()
          break
        // 待处理
        case 'dcl':
          this.tableColumnsConfig = proconf.getColumns(obj.code, this.bussnessId, this.showLog)
          this.queryConfig = proconf.highQueryConfig
          this.searchDataList = proconf.highQueryData
          this.status = 1
          this.menuName = '监控问询单列表'
          this.getdata()
          break
        // 已下发
        // 待核实
        case 'yxf':
        case 'dhs':
        case 'feedback':
          // this.tableColumnsConfig = [...proconf.policiesTableColumns1, attachOption]
          this.tableColumnsConfig = proconf.getColumns(obj.code, this.bussnessId, this.showLog)
          this.queryConfig = proconf.highQueryConfig
          this.searchDataList = proconf.highQueryData
          this.status = 3
          this.menuName = '监控问询单列表'
          this.tableData = []
          this.getdata()
          break
        // 单位反馈待审核
        case 'dsh':
        case 'dcszg':
        case 'process':
        case 'queryBusinessData': // 联查业务数据
          // this.tableColumnsConfig = [...proconf.policiesTableColumns2, attachOption]
          this.tableColumnsConfig = proconf.getColumns(obj.code, this.bussnessId, this.showLog)
          this.queryConfig = proconf.highQueryConfig
          this.searchDataList = proconf.highQueryData
          this.isAgencyDone = true
          this.menuName = '监控问询单列表'
          this.tableData = []
          this.getdata()
          break
        // 已退回、被退回
        case 'bth':
        case 'yth':
          this.tableColumnsConfig = proconf.getColumns(obj.code, this.bussnessId, this.showLog)
          this.queryConfig = proconf.highQueryConfig
          this.searchDataList = proconf.highQueryData
          this.status = 8
          this.menuName = '监控问询单列表'
          this.tableData = []
          this.getdata()
          break
        // 认定正常
        case 'rdzc':
          this.tableColumnsConfig = proconf.getColumns(obj.code, this.bussnessId, this.showLog)
          this.queryConfig = proconf.highQueryConfig
          this.searchDataList = proconf.highQueryData
          this.isNormalDone = true
          this.menuName = '监控问询单列表'
          this.tableData = []
          this.getdata()
          break
        // 已整改
        case 'yzg':
          this.tableColumnsConfig = proconf.getColumns(obj.code, this.bussnessId, this.showLog)
          this.queryConfig = proconf.highQueryConfig
          this.searchDataList = proconf.highQueryData
          this.status = 7
          this.menuName = '监控问询单列表'
          this.tableData = []
          this.getdata()
          break
        case 'csysh':
          this.tableColumnsConfig = proconf.getColumns(obj.code, this.bussnessId, this.showLog)
          this.queryConfig = proconf.highQueryConfig
          this.searchDataList = proconf.highQueryData
          this.isProcessed = true
          this.menuName = '监控问询单列表'
          this.tableData = []
          this.getdata()
          break
        case 'search':
          this.tableColumnsConfig = proconf.getColumns(obj.code, this.bussnessId, this.showLog)
          this.queryConfig = proconf.highQueryConfig
          this.searchDataList = proconf.highQueryData
          this.menuName = '监控问询单列表'
          this.getdata()
          break
        default:
          // this.tableColumnsConfig = proconf.policiesTableColumns
          // this.queryConfig = proconf.highQueryConfig
          // this.searchDataList = proconf.highQueryData
          // this.queryTableDatas()
          break
      }
      this.condition = {}
      this.mainPagerConfig.currentPage = 1
      this.$refs.mainTableRef.$refs.xGrid.clearScroll()
    },
    getViolationType() {
      let params = {
        page: 1,
        size: 99999
      }
      api.queryViolationType(params).then(res => {
        if (res.code === '000000') {
          res.data.results.map(v => {
            v.value = v.code
            v.label = v.name
          })
          this.queryConfig[2].itemRender.options = res.data.results
        }
      })
    },
    getCount() {
      let param = {
        isUnit: this.transJson(this.$store.state.curNavModule.param5).retroact,
        roleId: this.$store.state.curNavModule.roleguid
      }
      if (this.$store.state.curNavModule.f_FullName.substring(0, 4) === '直达资金') {
        param.regulationClass = '0201'
      }

      const regulationClass = this.transJson(this.$store.state.curNavModule.param5)?.regulationClass
      if (regulationClass) {
        param.regulationClass = regulationClass
      }

      api.getCount(param).then(res => {
        if (res.code === '000000') {
          // 主管处室
          this.tabStatusNumConfig['dcl'] = res.data.dcl
          this.tabStatusNumConfig['yxf'] = res.data.yxf
          this.tabStatusNumConfig['dsh'] = res.data.dsh
          this.tabStatusNumConfig['yth'] = res.data.yth
          this.tabStatusNumConfig['rdzc'] = res.data.rdzc
          this.tabStatusNumConfig['yzg'] = res.data.yzg
          // 单位
          this.tabStatusNumConfig['dhs'] = res.data.dhs
          this.tabStatusNumConfig['dcszg'] = res.data.dcszg
          this.tabStatusNumConfig['csysh'] = res.data.csysh
          this.tabStatusNumConfig['bth'] = res.data.bth
        }
      })
    },
    check() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length === 0) {
        this.$message.warning('请选择数据')
        return
      }
      this.tableLoading = true
      HttpModule.check(selection[0].dealNo).then(res => {
        this.tableLoading = false
        if (res.code === '66020026') {
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    print() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      const params = {
        dealNo: selection[0].dealNo
      }
      this.tableLoading = true
      HttpModule.getReport(params).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          debugger
          this.fileGuid = res.data
          this.filePreviewDialogVisible = true
        } else {
          this.$message.error(res.message)
        }
      })
    },
    cellStyle({ row, rowIndex, column }) {
      if (['warnLevel'].includes(column.property)) {
        switch (row.warnLevel) {
          case 3:
            return {
              color: '#BBBB00'
            }
          case 2:
            return {
              color: 'orange'
            }
          case 1:
            return {
              color: 'red'
            }
          case 4:
            return {
              color: 'blue'
            }
          case 5:
            return {
              color: 'gray'
            }
          default:
            break
        }
      }
    },
    getAgency() {
      const param = {
        elementCode: 'AGENCY',
        date: this.$store.state.userInfo.year,
        tokenid: this.$store.getters.getLoginAuthentication.tokenid,
        appguid: 'apaas',
        year: this.$store.state.userInfo.year,
        mofDivCode: this.$store.state.userInfo.province,
        parameters: {}
      }
      api.getTreeAgency(param).then(res => {
        let treeResdata = res.data
        this.queryConfig[0].itemRender.options = treeResdata
      })
    }
  },
  mounted() {

  },
  created() {
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.roleId = this.$store.state.curNavModule.roleguid
    this.param5 = this.transJson(this.$store.state.curNavModule.param5)
    // 动态控制是否展示树
    this.setShowBusinesTree()
    // this.queryTableDatas()
    this.initButtons(this.param5)
    this.getViolationType()
    this.getAgency()
    // this.getCount()
  }
}
</script>
<style >
.createProcessing .radio-right{
float: right;
}
.createProcessing .Titans-table ::v-deep  .vxe-body--row.row-yellow {
  background-color: yellow;
  color: #fff;
}
.createProcessing .Titans-table ::v-deep  .vxe-body--row.row-blue {
  background-color: blue;
  color: #fff;
}
.createProcessing .Titans-table ::v-deep  .vxe-body--row.row-red {
  background-color: red;
  color: #fff;
}
 .createProcessing .unit-tree-main .el-tree-node__content .custom-node-bg{
  background-color: transparent !important;
}

</style>
