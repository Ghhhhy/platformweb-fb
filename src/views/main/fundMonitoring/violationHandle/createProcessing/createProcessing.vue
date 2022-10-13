<!-- 预警明细查询（按规则） -->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTap></template>
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          show-zero
          :tab-status-btn-config="toolBarStatusBtnConfig"
          :tab-status-num-config="tabStatusNumConfig"
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
      <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
      <template v-slot:mainTree>
        <BsTreeSet
          ref="treeSet"
          v-model="leftTreeVisible"
          :tree-config="treeTypeConfig"
          @onChangeInput="changeInput"
          @onAsideChange="asideChange"
          @onConfrimData="treeSetConfrimData"
        />
        <BsTree
          ref="leftTree"
          :defaultexpandedkeys="['0']"
          style="overflow: hidden"
          :tree-data="treeData"
          :filter-text="treeGlobalConfig.inputVal"
          :config="treeGlobalConfig.treeConfig"
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
          @onToolbarBtnClick="onToolbarBtnClick"
          @ajaxData="ajaxTableData"
          @cellClick="cellClick"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div v-if="leftTreeVisible === false" class="table-toolbar-contro-leftvisible" @click="leftTreeVisible = true"></div>
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
      :status="status"
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
export default {
  components: {
    AddDialog
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
        inputVal: '',
        treeConfig: { rootName: '全部', disabled: false, treeProps: { labelFormat: '{code}-{name}', nodeKey: 'code', label: 'name', children: 'children' } }
      },
      treeQueryparams: { elementCode: 'admdiv', province: this.$store.state.userInfo.province, year: this.$store.state.userInfo.year, wheresql: 'and code like \'' + 61 + '%\'' },
      // treeServerUri: 'pay-clear-service/v2/lefttree',
      treeServerUri: '',
      treeAjaxType: 'get',
      leftTreeVisible: true,
      // 头部工具栏 BsTabPanel config
      toolBarStatusBtnConfig: {
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
        }
      },
      buttonsInfo: proconf.statusRightToolBarButtonByBusDept,
      tabStatusNumConfig: {
        'unIssue': 0,
        'issued': 0,
        'rectify': 0,
        'rectified': 0,
        'archive': 0,
        'archived': 0,
        'search': 0
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
          $ReportTaskGloableOptionRow: proconf.gloableOptionRow
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
      menuName: '监控处理单列表',
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
      codeList: []
    }
  },
  mounted() {
  },
  methods: {
    search(obj) {
      console.log(obj)
      if (this.menuName === '监控处理单列表' && this.status === 0) {
        this.agencyName = obj.agencyName
        this.issueTime = obj.issueTime
        this.fiRuleName = obj.fiRuleName
        this.violateType = obj.violateType
        this.queryTableDatas()
      } else if (this.menuName === '监控处理单列表' && this.status !== 0 && !this.isArchive) {
        this.agencyName = obj.agencyName
        this.issueTime = obj.issueTime
        this.fiRuleName = obj.fiRuleName
        this.violateType = obj.violateTyp
        this.getdata()
      } else if (this.isArchive) {
        this.agencyName = obj.agencyName
        this.issueTime = obj.issueTime
        this.fiRuleName = obj.fiRuleName
        this.violateType = obj.violateType
        this.getNoFile()
      } else {
        this.firulename = obj.firulename
        this.regulationType = obj.regulationType
        this.warningLevel = obj.warningLevel
        this.getWarnData()
      }
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
    handleCheck(val) {
      console.log(val)
      this.fiRuleCode = val.row.fiRuleCode || ''
      this.warningCode = val.row.warningCode || ''
      this.dialogVisible = true
      this.dialogTitle = '查看详情信息'
      //   }
      // })
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
    onClickmethod({ node }) {
      // if (node.children !== null && node.children.length !== 0 && node.id !== '0') {
      //   return
      // }
      // let code = node.code
      // this.codeList = []
      // let treeData = node.treeData
      // this.getItem(code, treeData)
      // console.log(this.codeList)
      if (node.id !== '0') {
        this.mofDivCode = node.code
      } else {
        this.condition = {}
      }
      if (this.status === 0) {
        this.queryTableDatas()
      } else {
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
      this.billguid = row.attachment_id
      this.showAttachmentDialog = true
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
      this.queryTableDatas()
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
    // 查询 table 数据
    queryTableDatas() {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        agencyName: this.agencyName,
        issueTime: this.issueTime,
        fiRuleName: this.fiRuleName,
        violateType: this.violateType,
        status: this.status,
        mofDivCodeList: this.codeList,
        mofDivCode: this.mofDivCode || ''
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
      let param = {
        page: this.mainPagerConfig.currentPage, // unitStatus页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        agencyName: this.agencyName,
        issueTime: this.issueTime,
        fiRuleName: this.fiRuleName,
        violateType: this.violateType,
        mofDivCode: this.mofDivCode || '',
        unitStatus: this.unitStatus,
        departmentStatus: this.departmentStatus,
        officeStatus: this.officeStatus,
        status: this.status,
        mofDivCodeList: this.codeList
      }
      api.getDetail(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
          if (this.unitStatus === 0 || this.departmentStatus === 0 || this.officeStatus === 0) {
            this.tabStatusNumConfig['rectify'] = res.data.totalCount
          } else if (this.unitStatus === 1 || this.departmentStatus === 1 || this.officeStatus === 1) {
            this.tabStatusNumConfig['rectified'] = res.data.totalCount
          } else if (this.status === 1) {
            this.tabStatusNumConfig['issued'] = res.data.totalCount
          } else if (this.status === 5) {
            this.tabStatusNumConfig['archived'] = res.data.totalCount
            this.tabStatusNumConfig['search'] = res.data.totalCount
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
      this.dialogTitle = '监控处理单信息'
    },
    // 整改
    handleFeedback() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.detailData = selection
      this.dialogVisible = true
      this.dialogTitle = '监控处理单信息'
    },
    handleArchiving() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.detailData = selection
      this.dialogVisible = true
      this.dialogTitle = '监控处理单信息'
    },
    handleDetail() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.detailData = selection
      this.dialogVisible = true
      this.dialogTitle = '监控处理单信息'
    },
    onTabPanelBtnClick(obj) { // 按钮点击
      let self = this
      switch (obj.code) {
        case 'create': // 生成
          self.handleCreate(obj)
          break
        case 'feedback': // 整改反馈
          self.handleFeedback(obj)
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
        default:
          console.log('default fallback')
      }
    },
    getLeftTreeData() {
      let that = this
      let params = {}
      if (this.userInfo.province === '610000000') {
        params = {
          elementCode: 'admdiv',
          province: '610000000',
          year: '2021',
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
          province: this.$store.state.userInfo.province,
          year: this.$store.state.userInfo.year,
          wheresql: 'and code like \'' + this.userInfo.province.substring(0, 4) + '%\''
        }
      } else {
        params = {
          elementCode: 'admdiv',
          province: this.userInfo.province,
          year: '2021',
          wheresql: 'and code like \'' + this.userInfo.province.substring(0, 6) + '%\''
        }
      }
      HttpModule.getTreeData(params).then(res => {
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
          console.log(that.treeData)
        } else {
          this.$message.error('左侧树加载失败')
        }
      })
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
    initButtons(param5) {
      let obj = {}
      console.log(param5)
      if (param5.isCreate === 'true') { // 生成
        this.toolBarStatusBtnConfig = { ...this.toolBarStatusBtnConfig, ...proconf.createBtnConfig }
        obj.code = 'unIssue'
      } else if (param5.isRetroact === 'true') { // 反馈
        this.toolBarStatusBtnConfig = { ...this.toolBarStatusBtnConfig, ...proconf.retroactBtnConfig }
        obj.code = 'rectify'
      } else if (param5.isArchive === 'true') { // 归档
        this.toolBarStatusBtnConfig = { ...this.toolBarStatusBtnConfig, ...proconf.archiveBtnConfig }
        obj.code = 'archive'
      } else if (param5.isQuery === 'true') {
        this.toolBarStatusBtnConfig = { ...this.toolBarStatusBtnConfig, ...proconf.searchBtnConfig }
        obj.code = 'search'
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
          this.menuName = '监控处理单列表'
          this.queryTableDatas()
          break
        // 已下发
        case 'issued':
          this.tableColumnsConfig = proconf.policiesTableColumns
          this.queryConfig = proconf.highQueryConfig
          this.searchDataList = proconf.highQueryData
          this.status = 1
          this.menuName = '监控处理单列表'
          this.getdata()
          break
        // 待整改
        case 'rectify':
          this.tableColumnsConfig = proconf.policiesTableColumns
          this.queryConfig = proconf.highQueryConfig
          this.searchDataList = proconf.highQueryData
          this.status = 1
          if (this.param5.retroact === 'company') {
            this.unitStatus = 0 // 单位未整改标识
          } else if (this.param5.retroact === 'branch') {
            this.departmentStatus = 0 // 部门未整改标识
          } else {
            this.officeStatus = 0 // 处室未整改标识
          }
          this.menuName = '监控处理单列表'
          this.getdata()
          break
        // 已整改
        case 'rectified':
          this.tableColumnsConfig = proconf.policiesTableColumns
          this.queryConfig = proconf.highQueryConfig
          this.searchDataList = proconf.highQueryData
          this.status = ''
          if (this.param5.retroact === 'company') {
            this.unitStatus = 1 // 单位整改标识
          } else if (this.param5.retroact === 'branch') {
            this.departmentStatus = 1 // 部门整改标识
          } else {
            this.officeStatus = 1 // 处室未整改标识
          }
          this.menuName = '监控处理单列表'
          this.getdata()
          break
        // 待归档
        case 'archive':
          this.status = 1
          this.tableColumnsConfig = proconf.createTableColumns
          this.queryConfig = proconf.highQueryConfig
          this.searchDataList = proconf.highQueryData
          this.isArchive = true
          this.menuName = '监控处理单列表'
          this.getNoFile()
          break
        // 已归档
        case 'archived':
          this.tableColumnsConfig = proconf.createTableColumns
          this.queryConfig = proconf.highQueryConfig
          this.searchDataList = proconf.highQueryData
          this.status = 5
          this.menuName = '监控处理单列表'
          this.getdata()
          break
        case 'search':
          this.tableColumnsConfig = proconf.createTableColumns
          this.queryConfig = proconf.highQueryConfig
          this.searchDataList = proconf.highQueryData
          this.status = 5
          this.menuName = '监控处理单列表'
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
          this.queryConfig[1].itemRender.options = res.data.results
        }
      })
    },
    getCount() {
      api.getCount().then(res => {
        if (res.code === '000000') {
          this.tabStatusNumConfig['issued'] = res.data.issue
          this.tabStatusNumConfig['archived'] = res.data.fileCount
          if (this.param5.retroact === 'company') {
            this.tabStatusNumConfig['rectified'] = res.data.unitCount
          } else if (this.param5.retroact === 'branch') {
            this.tabStatusNumConfig['rectified'] = res.data.departmentCount
          } else if (this.param5.retroact === 'department') {
            this.tabStatusNumConfig['rectified'] = res.data.officeCount
          }
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
    }
  },
  created() {
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.param5 = this.transJson(this.$store.state.curNavModule.param5)
    this.getLeftTreeData()
    // this.queryTableDatas()
    this.initButtons(this.param5)
    this.getViolationType()
    this.getCount()
  }
}
</script>
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
