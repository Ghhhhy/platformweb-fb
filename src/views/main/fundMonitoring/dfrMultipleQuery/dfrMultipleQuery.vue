<!--支付数据规范性检查-->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTap>
        <BsTab :tab-list="toptabList" tab-class="main-modulebox-tab" :default-select="tabSelect" @onTabClick="onTopTabClick" />
      </template>
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
            @onSearchResetClick="reset"
            @onSearchClick="search"
          />
        </div>
      </template>
      <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
      <template v-slot:mainTree>
        <!--        <FilterTreeInput
          :filter-text="treeFilterText"
          :expend.sync="leftTreeVisible"
          @search="searchTreeHandle"
        />-->
        <BsTreeSet
          ref="treeSet"
          v-model="leftTreeVisible"
          :tree-config="treeTypeConfig"
          @onChangeInput="changeInput"
          @onAsideChange="asideChange"
          @onConfrimData="treeSetConfrimData"
        />
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
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="mainTableRef"
          v-loading="tableLoading1"
          style="height: 50%"
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
              <div v-if="leftTreeVisible === false" class="table-toolbar-contro-leftvisible" @click="leftTreeVisible = true"></div>
            </div>
          </template>
        </BsTable>
        <BsTable
          ref="mainTableRef1"
          v-loading="tableLoading2"
          style="height: 50%"
          :footer-config="tableFooterConfig1"
          :table-columns-config="tableColumnsConfig1"
          :table-data="tableData1"
          :table-config="tableConfig1"
          :pager-config="mainPagerConfig1"
          :toolbar-config="tableToolbarConfig1"
          @onToolbarBtnClick="onToolbarBtnClick1"
          @ajaxData="ajaxTableData1"
          @cellClick="cellClick"
        />
      </template>
    </BsMainFormListLayout>
  </div>
</template>

<script>
import { proconf } from './dfrMultipleQuery'
// import AddDialog from './children/addDialog'
import HttpModule from '@/api/frame/main/fundMonitoring/dfrMultipleQuery.js'
export default {
  components: {
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
      toptabList: [
        {
          label: '处室指标查询',
          code: 1,
          datatype: '(\'15\')'
        },
        {
          label: '单位指标查询',
          code: 2,
          datatype: '(\'16\',\'85\',\'241\',\'242\',\'301\',\'302\')'
        },
        {
          label: '区级指标查询',
          code: 3,
          datatype: '(\'3\',\'14\',\'17\',\'23\',\'25\',\'32\')'
        }
      ],
      tabSelect: {
        label: '处室指标查询',
        code: 1,
        datatype: '(\'15\')'
      },
      // 左侧树过滤值
      treeFilterText: '',
      matchHoot: true,
      isProName: false,
      isAmount: false,
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
        inputVal: ''
      },
      treeQueryparams: {
        elementcode: 'dept',
        year: this.$store.state.userInfo.year,
        province: this.$store.state.userInfo.province,
        limit: 2000,
        offset: 1
      },
      // treeServerUri: 'pay-clear-service/v2/lefttree',
      treeServerUri: '',
      treeAjaxType: 'get',
      leftTreeVisible: true,
      // 头部工具栏 BsTabPanel config
      toolBarStatusBtnConfig: {
        changeBtns: true,
        buttons: proconf.statusButtons,
        curButton: proconf.curStatusButton,
        buttonsInfo: {},
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
      tableColumnsConfig: [],
      tableColumnsConfig1: [],
      tableData: [],
      tableData1: [],
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: true, // 是否有金额转换
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
        moneyConversion: true, // 是否有金额转换
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
      expFuncCode: '',
      proCodes: '',
      isHook: '0',
      proCode1: '',
      bgtMofDepCode: '',
      agencyCode: '',
      mofDivCode: '',
      recDivCode: '',
      codeList: [],
      payCertNo: '',
      proName: '',
      proName1: '',
      agencyName: '',
      corBgtDocNoName: '',
      useDes: '',
      dtos: [],
      queryDtos: [],
      queryDto: {
        bgtMofDepCode: '',
        corBgtDocNoName: '',
        proCode: '',
        expFuncCode: ''
      },
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
      bgtId: '',
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
      panStatus: 0, // 页签标识
      treeLoadingState: false
    }
  },
  mounted() {
  },
  methods: {
    onTopTabClick(obj) {
      let self = this
      if (obj.code === this.tabSelect.code) {
        return
      }
      this.tabSelect = obj
      if (obj.code === 1) {
        // 处室指标查询
        self.toolBarStatusBtnConfig.buttons = proconf.statusButtons
        self.toolBarStatusBtnConfig.curButton = proconf.curStatusButton
        self.toolBarStatusBtnConfig.methods = {
          bsToolbarClickEvent: this.bsToolbarClickEvent
        }
        this.panStatus = 0
        // this.$refs.tabPanel.initFirst()
        this.tableColumnsConfig = proconf.PoliciesTableColumns
        this.tableColumnsConfig1 = proconf.PoliciesTableColumns1
        // this.$refs.mainTableRef.initFirst()
        // this.$refs.mainTableRef1.initFirst()
        this.fiscalYear = ''
        this.bgtMofDepCode = ''
        this.queryDtos = []
        this.condition = {}
        this.mainPagerConfig.currentPage = 1
        this.mainPagerConfig1.currentPage = 1
        this.getLeftTreeData()
        this.refresh()
        // this.refresh1()
      } else if (obj.code === 2) {
        // 单位指标查询
        self.toolBarStatusBtnConfig.buttons = proconf.statusButtons1
        self.toolBarStatusBtnConfig.curButton = proconf.curStatusButton1
        self.toolBarStatusBtnConfig.methods = {
          bsToolbarClickEvent: this.bsToolbarClickEvent1
        }
        // console.log('55555555555555', this.$refs.tabPanel)
        // this.$refs.tabPanel.initFirst()
        this.panStatus = 2
        this.tableColumnsConfig = proconf.AgencyPoliciesTableColumns
        this.tableColumnsConfig1 = proconf.AgencyPoliciesTableColumns1
        // this.$refs.mainTableRef.initFirst()
        // this.$refs.mainTableRef1.initFirst()
        this.fiscalYear = ''
        this.bgtMofDepCode = ''
        this.agencyCode = ''
        this.queryDtos = []
        this.condition = {}
        this.mainPagerConfig.currentPage = 1
        this.mainPagerConfig1.currentPage = 1
        this.getLeftTreeData()
        this.refresh()
        // this.refresh1()
      } else if (obj.code === 3) {
        // 市县指标查询
        this.toolBarStatusBtnConfig.buttons = proconf.statusButtons2
        this.toolBarStatusBtnConfig.curButton = proconf.curStatusButton2
        self.toolBarStatusBtnConfig.methods = {
          bsToolbarClickEvent: this.bsToolbarClickEvent2
        }
        // this.$refs.tabPanel.initFirst()
        this.panStatus = 5
        this.tableColumnsConfig = proconf.MofDivPoliciesTableColumns
        this.tableColumnsConfig1 = proconf.MofDivPoliciesTableColumns1
        // this.$refs.mainTableRef.initFirst()
        // this.$refs.mainTableRef1.initFirst()
        this.fiscalYear = ''
        this.bgtMofDepCode = ''
        this.agencyCode = ''
        this.mofDivCode = ''
        this.queryDtos = []
        this.condition = {}
        this.mainPagerConfig.currentPage = 1
        this.mainPagerConfig1.currentPage = 1
        this.getLeftTreeData()
        this.refresh()
        // this.refresh1()
      }
    },
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
      switch (obj.code) {
        case '1':
          this.panStatus = 0
          this.tableColumnsConfig = proconf.PoliciesTableColumns
          this.tableColumnsConfig1 = proconf.PoliciesTableColumns1
          // this.$refs.mainTableRef.initFirst()
          // this.$refs.mainTableRef1.initFirst()
          break
        case '2':
          this.panStatus = 1
          this.tableColumnsConfig = proconf.PoliciesTableColumns2
          this.tableColumnsConfig1 = proconf.PoliciesTableColumns1
          // this.$refs.mainTableRef.initFirst()
          // this.$refs.mainTableRef1.initFirst()
          break
      }
      this.fiscalYear = ''
      this.bgtMofDepCode = ''
      this.queryDtos = []
      this.condition = {}
      this.mainPagerConfig.currentPage = 1
      this.mainPagerConfig1.currentPage = 1
      this.refresh()
      // this.refresh1()
      // this.$refs.mainTableRef.$refs.xGrid.clearScroll()
    },
    bsToolbarClickEvent1(obj, $this) {
      if (!obj.type) {
        this.operationToolbarButtonClickEvent(obj)
        return
      }
      this.toolBarStatusSelect = obj
      switch (obj.code) {
        case '1':
          this.fiscalYear = ''
          this.bgtMofDepCode = ''
          this.queryDtos = []
          this.panStatus = 2
          this.tableColumnsConfig = proconf.AgencyPoliciesTableColumns
          this.tableColumnsConfig1 = proconf.AgencyPoliciesTableColumns1
          this.$refs.mainTableRef.initFirst()
          this.$refs.mainTableRef1.initFirst()
          break
        case '2':
          this.fiscalYear = ''
          this.bgtMofDepCode = ''
          this.queryDtos = []
          this.panStatus = 3
          this.tableColumnsConfig = proconf.AgencyPoliciesTableColumns2
          this.tableColumnsConfig1 = proconf.AgencyPoliciesTableColumns1
          // this.$refs.mainTableRef.initFirst()
          // this.$refs.mainTableRef1.initFirst()
          break
        case '3':
          this.fiscalYear = ''
          this.bgtMofDepCode = ''
          this.queryDtos = []
          this.panStatus = 4
          this.tableColumnsConfig = proconf.PoliciesTableColumns2
          this.tableColumnsConfig1 = proconf.PoliciesTableColumns1
          // this.$refs.mainTableRef.initFirst()
          // this.$refs.mainTableRef1.initFirst()
          break
      }
      this.condition = {}
      this.mainPagerConfig.currentPage = 1
      this.mainPagerConfig1.currentPage = 1
      this.refresh()
      // this.refresh1()
      // this.$refs.mainTableRef.$refs.xGrid.clearScroll()
    },
    bsToolbarClickEvent2(obj, $this) {
      if (!obj.type) {
        this.operationToolbarButtonClickEvent(obj)
        return
      }
      this.toolBarStatusSelect = obj
      switch (obj.code) {
        case '1':
          this.fiscalYear = ''
          this.bgtMofDepCode = ''
          this.queryDtos = []
          this.panStatus = 5
          this.tableColumnsConfig = proconf.MofDivPoliciesTableColumns
          this.tableColumnsConfig1 = proconf.MofDivPoliciesTableColumns1
          // this.$refs.mainTableRef.initFirst()
          // this.$refs.mainTableRef1.initFirst()
          break
        case '2':
          this.fiscalYear = ''
          this.bgtMofDepCode = ''
          this.queryDtos = []
          this.panStatus = 6
          this.tableColumnsConfig = proconf.MofDivPoliciesTableColumns2
          this.tableColumnsConfig1 = proconf.MofDivPoliciesTableColumns1
          // this.$refs.mainTableRef.initFirst()
          // this.$refs.mainTableRef1.initFirst()
          break
      }
      this.condition = {}
      this.mainPagerConfig.currentPage = 1
      this.mainPagerConfig1.currentPage = 1
      this.refresh()
      // this.refresh1()
      // this.$refs.mainTableRef.$refs.xGrid.clearScroll()
    },
    search(obj) {
      this.fiscalYear = obj.fiscalYear
      this.proCodes = obj.proCodes
      this.expFuncCode = obj.expFuncCode
      this.refresh()
      // this.refresh1()
      // this.queryTableDatasCount()
    },
    reset(obj) {
      this.bgtId = ''
      this.fiscalYear = obj.fiscalYear
      this.proCodes = obj.proCodes
      this.expFuncCode = obj.expFuncCode
      this.refresh()
      // this.refresh1()
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
    checkboxChange(checked, row) {
      this.bgtId = checked.row.bgtId || ''
      this.mofDivCode = checked.row.mofDivCode || ''
      this.queryDtos = []
      if (this.tabSelect.code === 1) {
        switch (this.toolBarStatusSelect.code) {
          case '1':
            for (let i = 0; i < checked.selection.length; i++) {
              let queryDto = {
                bgtMofDepCode: '',
                corBgtDocNoName: '',
                proName: '',
                expFuncCode: ''
              }
              queryDto.bgtMofDepCode = checked.selection[i].bgtMofDepName?.split('-')[0]
              queryDto.corBgtDocNoName = checked.selection[i].corBgtDocNoName
              queryDto.proName = checked.selection[i].proName
              queryDto.expFuncCode = checked.selection[i].expFuncName?.split('-')[0]
              this.queryDtos[i] = queryDto
            }
            this.queryTableDatas1()
            break
          case '2':
            for (let i = 0; i < checked.selection.length; i++) {
              let queryDto = {
                bgtMofDepCode: '',
                proCode: '',
                expFuncCode: ''
              }
              queryDto.bgtMofDepCode = checked.selection[i].bgtMofDepName.split('-')[0]
              queryDto.corBgtDocNoName = ''
              queryDto.proName = checked.selection[i].proName
              queryDto.expFuncCode = checked.selection[i].expFuncName.split('-')[0]
              this.queryDtos[i] = queryDto
            }
            this.queryTableDatasByDep1()
            break
        }
      } else if (this.tabSelect.code === 2) {
        switch (this.toolBarStatusSelect.code) {
          case '1':
            for (let i = 0; i < checked.selection.length; i++) {
              let queryDto = {
                bgtMofDepCode: '',
                corBgtDocNoName: '',
                proName: '',
                expFuncCode: '',
                agencyCode: ''
              }
              queryDto.bgtMofDepCode = checked.selection[i].bgtMofDepName.split('-')[0]
              queryDto.corBgtDocNoName = checked.selection[i].corBgtDocNoName
              queryDto.proName = checked.selection[i].proName
              queryDto.expFuncCode = checked.selection[i].expFuncName.split('-')[0]
              queryDto.agencyCode = checked.selection[i].agencyName.split('-')[0]
              this.queryDtos[i] = queryDto
            }
            this.queryTableDatasByAgency1()
            break
          case '2':
            for (let i = 0; i < checked.selection.length; i++) {
              let queryDto = {
                bgtMofDepCode: '',
                corBgtDocNoName: '',
                proName: '',
                expFuncCode: '',
                agencyCode: ''
              }
              queryDto.bgtMofDepCode = checked.selection[i].bgtMofDepName.split('-')[0]
              queryDto.corBgtDocNoName = checked.selection[i].corBgtDocNoName
              queryDto.proName = checked.selection[i].proName
              queryDto.expFuncCode = checked.selection[i].expFuncName.split('-')[0]
              queryDto.agencyCode = checked.selection[i].agencyName.split('-')[0]
              this.queryDtos[i] = queryDto
            }
            this.queryTableByAgency1()
            break
          case '3':
            break
        }
      } else if (this.tabSelect.code === 3) {
        switch (this.toolBarStatusSelect.code) {
          case '1':
            for (let i = 0; i < checked.selection.length; i++) {
              let queryDto = {
                bgtMofDepCode: '',
                corBgtDocNoName: '',
                recDivCode: '',
                expFuncCode: '',
                proName: ''
              }
              queryDto.bgtMofDepCode = checked.selection[i].bgtMofDepName.split('-')[0]
              queryDto.corBgtDocNoName = checked.selection[i].corBgtDocNoName
              queryDto.proName = checked.selection[i].proName
              queryDto.expFuncCode = checked.selection[i].expFuncName.split('-')[0]
              queryDto.recDivCode = checked.selection[i].recDivName.split('-')[0]
              this.queryDtos[i] = queryDto
            }
            this.queryDetailMofDiv()
            break
          case '2':
            for (let i = 0; i < checked.selection.length; i++) {
              let queryDto = {
                bgtMofDepCode: '',
                corBgtDocNoName: '',
                recDivCode: '',
                expFuncCode: '',
                proName: ''
              }
              queryDto.bgtMofDepCode = checked.selection[i].bgtMofDepName.split('-')[0]
              queryDto.corBgtDocNoName = checked.selection[i].corBgtDocNoName
              queryDto.proName = checked.selection[i].proName
              queryDto.expFuncCode = checked.selection[i].expFuncName.split('-')[0]
              queryDto.recDivCode = checked.selection[i].recDivName.split('-')[0]
              this.queryDtos[i] = queryDto
            }
            this.queryDetailMofDiv1()
            break
        }
      }
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
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
    onClickmethod(node) {
      // if (node.children !== null && node.children.length !== 0 && node.id !== '0') {
      //   return
      // }
      if (this.panStatus === 0) {
        if (node.id !== 'root') {
          this.bgtMofDepCode = node.code
        } else {
          this.condition = {}
          this.bgtMofDepCode = ''
        }
        this.queryTableDatas()
        // this.queryTableDatas1()
      } else if (this.panStatus === 1) {
        if (node.id !== 'root') {
          this.bgtMofDepCode = node.code
        } else {
          this.condition = {}
          this.bgtMofDepCode = ''
        }
        this.queryTableDatasByDep()
        // this.queryTableDatasByDep1()
      } else if (this.panStatus === 2) {
        if (node.id !== 'root') {
          this.agencyCode = node.code
        } else {
          this.condition = {}
          this.agencyCode = ''
        }
        this.queryTableDatasByAgency()
        // this.queryTableDatasByAgency1()
      } else if (this.panStatus === 3) {
        if (node.id !== 'root') {
          this.agencyCode = node.code
        } else {
          this.condition = {}
          this.agencyCode = ''
        }
        this.queryTableByAgency()
        // this.queryTableByAgency1()
      } else if (this.panStatus === 5) {
        if (node.id !== 'root') {
          let code = node.code
          this.codeList = []
          this.getItem(code, this.treeData)
          // this.recDivCode = node.code
        } else {
          this.condition = {}
          this.recDivCode = ''
        }
        this.queryMofDiv()
        // this.queryDetailMofDiv()
      } else if (this.panStatus === 6) {
        if (node.id !== 'root') {
          let code = node.code
          this.codeList = []
          this.getItem(code, this.treeData)
        } else {
          this.condition = {}
          this.recDivCode = ''
        }
        this.queryMofDiv1()
        // this.queryDetailMofDiv1()
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
      switch (key) {
      }
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh() {
      this.mainPagerConfig.currentPage = 1
      if (this.panStatus === 0) {
        this.queryTableDatas()
      } else if (this.panStatus === 1) {
        this.queryTableDatasByDep()
      } else if (this.panStatus === 2) {
        this.queryTableDatasByAgency()
      } else if (this.panStatus === 3) {
        this.queryTableByAgency()
      } else if (this.panStatus === 5) {
        this.queryMofDiv()
      } else if (this.panStatus === 6) {
        this.queryMofDiv1()
      }
      // this.queryTableDatasCount()
    },
    refresh1() {
      this.mainPagerConfig.currentPage = 1
      if (this.panStatus === 0) {
        this.queryTableDatas1()
      } else if (this.panStatus === 1) {
        this.queryTableDatasByDep1()
      } else if (this.panStatus === 2) {
        this.queryTableDatasByAgency1()
      } else if (this.panStatus === 3) {
        this.queryTableByAgency1()
      } else if (this.panStatus === 5) {
        this.queryDetailMofDiv()
      } else if (this.panStatus === 6) {
        this.queryDetailMofDiv1()
      }
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
    getTrees(val) {
      let proCodes = []
      if (val.trim() !== '') {
        val.split(',').forEach((item) => {
          proCodes.push(item.split('##')[0])
        })
      }
      return proCodes
    },
    // 查询 table 数据
    // 综合查询处室指标综合查看文号汇总
    queryTableDatas() {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        fiscalYear: this.fiscalYear,
        bgtMofDepCode: this.bgtMofDepCode,
        trackProCodeList: this.proCodes === '' ? [] : this.getTrees(this.proCodes),
        expFuncCode: this.expFuncCode,
        sqlCode: 'zhcx_cszbzhckwhhz'
      }
      this.tableLoading1 = true
      HttpModule.queryTableDatas(param).then(res => {
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
    // 综合查询处室指标综合查看汇总
    queryTableDatasByDep() {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        fiscalYear: this.fiscalYear,
        bgtMofDepCode: this.bgtMofDepCode,
        trackProCodeList: this.proCodes === '' ? [] : this.getTrees(this.proCodes),
        expFuncCode: this.expFuncCode,
        sqlCode: 'zhcx_cszbzhckhz'
      }
      this.tableLoading1 = true
      HttpModule.queryTableDatasByDep(param).then(res => {
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
    // 综合查询处室指标综合查看文号汇总明细
    queryTableDatas1() {
      const param = {
        page: this.mainPagerConfig1.currentPage, // 页码
        pageSize: this.mainPagerConfig1.pageSize, // 每页条数
        fiscalYear: this.fiscalYear,
        bgtMofDepCode: this.bgtMofDepCode,
        queryDtos: this.queryDtos,
        bgtId: this.bgtId,
        mofDivCode: this.mofDivCode,
        trackProCodeList: this.proCodes === '' ? [] : this.getTrees(this.proCodes),
        expFuncCode: this.expFuncCode,
        sqlCode: 'zhcx_cszbzhckwhhz_mx'
      }
      this.tableLoading2 = true
      HttpModule.queryTableDatas1(param).then(res => {
        this.tableLoading2 = false
        if (res.code === '000000') {
          this.tableData1 = res.data.results
          this.mainPagerConfig1.total = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 综合查询单位指标综合查看文号汇总
    queryTableDatasByAgency() {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        fiscalYear: this.fiscalYear,
        agencyCode: this.agencyCode,
        trackProCodeList: this.proCodes === '' ? [] : this.getTrees(this.proCodes),
        expFuncCode: this.expFuncCode,
        sqlCode: 'zhcx_dwzbzhckwhhz'
      }
      this.tableLoading1 = true
      HttpModule.queryTableDatasByAgency(param).then(res => {
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
    // 查询 table1 数据
    // 综合查询单位指标综合查看文号汇总明细
    queryTableDatasByAgency1() {
      const param = {
        page: this.mainPagerConfig1.currentPage, // 页码
        pageSize: this.mainPagerConfig1.pageSize, // 每页条数
        fiscalYear: this.$refs.queryFrom.$refs.queryForm.getFormData().fiscalYear,
        agencyCode: this.agencyCode,
        queryDtos: this.queryDtos,
        bgtId: this.bgtId,
        mofDivCode: this.$refs.queryFrom.$refs.queryForm.getFormData().mofDivCode,
        trackProCodeList: this.proCodes === '' ? [] : this.getTrees(this.proCodes),
        expFuncCode: this.$refs.queryFrom.$refs.queryForm.getFormData().expFuncCode,
        sqlCode: 'zhcx_dwzbzhckwhhz_mx'
      }
      this.tableLoading2 = true
      HttpModule.queryTableDatasByAgency1(param).then(res => {
        this.tableLoading2 = false
        if (res.code === '000000') {
          this.tableData1 = res.data.results
          this.mainPagerConfig1.total = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    queryTableByAgency() {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        fiscalYear: this.fiscalYear,
        agencyCode: this.agencyCode,
        trackProCodeList: this.proCodes === '' ? [] : this.getTrees(this.proCodes),
        expFuncCode: this.expFuncCode,
        sqlCode: 'zhcx_dwzbzhckhz'
      }
      this.tableLoading1 = true
      HttpModule.queryTableByAgency(param).then(res => {
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
    // 查询 table1 数据
    // 综合查询处室指标综合查看汇总
    queryTableByAgency1() {
      const param = {
        page: this.mainPagerConfig1.currentPage, // 页码
        pageSize: this.mainPagerConfig1.pageSize, // 每页条数
        fiscalYear: this.$refs.queryFrom.$refs.queryForm.getFormData().fiscalYear,
        agencyCode: this.agencyCode,
        queryDtos: this.queryDtos,
        bgtId: this.bgtId,
        mofDivCode: this.$refs.queryFrom.$refs.queryForm.getFormData().mofDivCode,
        trackProCodeList: this.proCodes === '' ? [] : this.getTrees(this.proCodes),
        expFuncCode: this.$refs.queryFrom.$refs.queryForm.getFormData().expFuncCode,
        sqlCode: 'zhcx_dwzbzhckhz_mx'
      }
      this.tableLoading2 = true
      HttpModule.queryTableByAgency1(param).then(res => {
        this.tableLoading2 = false
        if (res.code === '000000') {
          this.tableData1 = res.data.results
          this.mainPagerConfig1.total = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 综合查询处室指标综合查看汇总明细
    queryTableDatasByDep1() {
      const param = {
        page: this.mainPagerConfig1.currentPage, // 页码
        pageSize: this.mainPagerConfig1.pageSize, // 每页条数
        fiscalYear: this.fiscalYear,
        bgtMofDepCode: this.bgtMofDepCode,
        queryDtos: this.queryDtos,
        trackProCodeList: this.proCodes === '' ? [] : this.getTrees(this.proCodes),
        expFuncCode: this.expFuncCode,
        bgtId: this.bgtId,
        mofDivCode: this.mofDivCode,
        sqlCode: 'zhcx_cszbzhckhz_mx'
      }
      this.tableLoading2 = true
      HttpModule.queryTableDatasByDep1(param).then(res => {
        this.tableLoading2 = false
        if (res.code === '000000') {
          this.tableData1 = res.data.results
          this.mainPagerConfig1.total = res.data.totalCount
        } else {
          this.$message.error(res.result)
        }
      })
    },
    // 综合查询市县补助指标文号汇总
    queryMofDiv() {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        fiscalYear: this.fiscalYear,
        recDivCodeList: this.codeList,
        recDivCode: this.recDivCode,
        trackProCodeList: this.proCodes === '' ? [] : this.getTrees(this.proCodes),
        expFuncCode: this.expFuncCode,
        sqlCode: 'zhcx_sxbzzbwhhz'
      }
      this.tableLoading1 = true
      HttpModule.queryMofDiv(param).then(res => {
        this.tableLoading1 = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 综合查询市县补助指标文号汇总明细
    queryDetailMofDiv() {
      const param = {
        page: this.mainPagerConfig1.currentPage, // 页码
        pageSize: this.mainPagerConfig1.pageSize, // 每页条数
        fiscalYear: this.fiscalYear,
        recDivCode: this.recDivCode,
        recDivCodeList: this.codeList,
        queryDtos: this.queryDtos,
        trackProCodeList: this.proCodes === '' ? [] : this.getTrees(this.proCodes),
        expFuncCode: this.expFuncCode,
        bgtId: this.bgtId,
        mofDivCode: this.mofDivCode,
        sqlCode: 'zhcx_sxbzzbwhhz_mx'
      }
      this.tableLoading2 = true
      HttpModule.queryDetailMofDiv(param).then(res => {
        this.tableLoading2 = false
        if (res.code === '000000') {
          this.tableData1 = res.data.results
          this.mainPagerConfig1.total = res.data.totalCount
          // this.tabStatusNumConfig['1'] = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    queryMofDiv1() {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        fiscalYear: this.fiscalYear,
        recDivCodeList: this.codeList,
        recDivCode: this.recDivCode,
        trackProCodeList: this.proCodes === '' ? [] : this.getTrees(this.proCodes),
        expFuncCode: this.expFuncCode,
        sqlCode: 'zhcx_sxbzzbhz'
      }
      this.tableLoading1 = true
      HttpModule.queryMofDiv1(param).then(res => {
        this.tableLoading1 = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    queryDetailMofDiv1() {
      const param = {
        page: this.mainPagerConfig1.currentPage, // 页码
        pageSize: this.mainPagerConfig1.pageSize, // 每页条数
        fiscalYear: this.fiscalYear,
        recDivCode: this.recDivCode,
        recDivCodeList: this.codeList,
        queryDtos: this.queryDtos,
        bgtId: this.bgtId,
        mofDivCode: this.mofDivCode,
        trackProCodeList: this.proCodes === '' ? [] : this.getTrees(this.proCodes),
        expFuncCode: this.expFuncCode,
        sqlCode: 'zhcx_sxbzzbhz_mx'
      }
      this.tableLoading2 = true
      HttpModule.queryDetailMofDiv1(param).then(res => {
        this.tableLoading2 = false
        if (res.code === '000000') {
          this.tableData1 = res.data.results
          this.mainPagerConfig1.total = res.data.totalCount
          // this.tabStatusNumConfig['1'] = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
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
      this.offset = 0
      this.treeLoadingState = true
      let params = {}
      if (this.tabSelect.code === 1) {
        params = {
          elementCode: 'DEPARTMENT',
          year: this.$store.state.userInfo.year,
          province: this.$store.state.userInfo.province,
          limit: this.treePageSize,
          offset: this.offset
        }
        this.wheresql && (params.wheresql = this.wheresql)
      } else if (this.tabSelect.code === 2) {
        params = {
          elementCode: 'AGENCY',
          year: this.$store.state.userInfo.year,
          province: this.$store.state.userInfo.province,
          limit: this.treePageSize,
          offset: this.offset
        }
        this.wheresql && (params.wheresql = this.wheresql)
      } else if (this.tabSelect.code === 3) {
        if (this.userInfo.province === '610000000') {
          params = {
            elementCode: 'admdiv',
            province: '610000000',
            year: '2021',
            wheresql: 'and code like \'' + 61 + '%\' and code != \'610000000\' '
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
            elementcode: 'admdiv',
            province: this.userInfo.province,
            year: '2021',
            wheresql: 'and code like \'' + this.userInfo.province.substring(0, 4) + '%\''
          }
        } else {
          params = {
            elementcode: 'admdiv',
            province: this.userInfo.province,
            year: '2021',
            wheresql: 'and code like \'' + this.userInfo.province.substring(0, 6) + '%\''
          }
        }
      }

      HttpModule.getTreeData1(params).then(res => {
        if (res.code === '000000') {
          let treeResdata = that.getChildrenData(res.data)
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
          this.treeData = result
          that.proTotal = res.data.length
        } else {
          this.$message.error('左侧树加载失败')
        }
      }).finally(() => {
        this.treeLoadingState = false
      })
    },
    handleSizeChange(val) {
    },
    getChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.text || (`${item.code}-${item.name}`)
        if (item.children) {
          that.getChildrenData(item.children)
        }
      })

      return datas
    },
    getPro() {
      HttpModule.getProTreeData().then(res => {
        if (res.code === '000000') {
          console.log('data', res.data)
          let treeResdata1 = this.getChildrenNewData1(res.data)
          this.queryConfig[1].itemRender.options = treeResdata1
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
    initTables() {
      if (this.panStatus === 0) {
        this.tableColumnsConfig = proconf.PoliciesTableColumns
        this.tableColumnsConfig1 = proconf.PoliciesTableColumns1
      } else if (this.panStatus === 1) {
        this.tableColumnsConfig = proconf.PoliciesTableColumns2
        this.tableColumnsConfig1 = proconf.PoliciesTableColumns1
      } else if (this.panStatus === 2) {
        this.tableColumnsConfig = proconf.AgencyPoliciesTableColumns
        this.tableColumnsConfig1 = proconf.AgencyPoliciesTableColumns1
      } else if (this.panStatus === 3) {
        this.tableColumnsConfig = proconf.AgencyPoliciesTableColumns2
        this.tableColumnsConfig1 = proconf.AgencyPoliciesTableColumns1
      } else if (this.panStatus === 4) {
        this.tableColumnsConfig = proconf.MofDivPoliciesTableColumns
        this.tableColumnsConfig1 = proconf.MofDivPoliciesTableColumns1
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
    this.getLeftTreeData()
    this.getPro()
    this.initTables()
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
