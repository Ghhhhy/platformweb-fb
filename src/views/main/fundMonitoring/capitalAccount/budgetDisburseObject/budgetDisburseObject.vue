<!-- 直达资金项目库 -->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTap></template>
      <!--      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          show-zero
          :tab-status-btn-config="toolBarStatusBtnConfig"
          :tab-status-num-config="tabStatusNumConfig"
          @onQueryConditionsClick="onQueryConditionsClick"
        />
      </template>-->
      <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="queryConfig"
            :query-form-data="searchDataList"
            @onSearchClick="search"
            @itemChange="itemChange"
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
        <BsTable
          ref="mainTableRef"
          :footer-config="tableFooterConfig"
          :table-global-config="tableGlobalConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :table-config="tableConfig"
          :default-money-unit="10000"
          :title="menuName"
          :pager-config="mainPagerConfig"
          :toolbar-config="tableToolbarConfig"
          @onToolbarBtnClick="onToolbarBtnClick"
          @ajaxData="ajaxTableData"
          @cellClick="cellClick"
          @switchMoneyUnit="switchMoneyUnit"
        >
          <!--口径说明插槽-->
          <template v-if="caliberDeclareContent" v-slot:caliberDeclare>
            <p v-html="caliberDeclareContent"></p>
          </template>
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
    <!-- <AddDialog
      v-if="dialogVisible"
      :title="dialogTitle"
    /> -->
    <!-- 附件弹框 -->
    <BsAttachment v-if="showAttachmentDialog" refs="attachmentboss" :user-info="userInfo" :billguid="billguid" />
  </div>
</template>

<script>
import { proconf } from './budgetDisburseObject'
import HttpModule from '@/api/frame/main/fundMonitoring/budgetImplementationRegion.js'
// import store from '@/store/index'
// import AddDialog from './children/addDialog'
// import HttpModule from '@/api/frame/main/Monitoring/WarningDetailsByCompartment.js'
import regionMixin from '../mixins/regionMixin'
export default {
  mixins: [regionMixin],
  components: {
    // AddDialog
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  data() {
    return {
      // BsQuery 查询栏
      caliberDeclareContent: '', // 口径说明
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      radioShow: true,
      codeList: [],
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
      treeQueryparams: { elementCode: 'admdiv', province: this.$store.state.userInfo.province, year: this.$store.state.userInfo.year, wheresql: 'and province =' + this.$store.state.userInfo.province },
      // treeServerUri: 'pay-clear-service/v2/lefttree',
      treeServerUri: '',
      treeAjaxType: 'get',
      leftTreeVisible: true,
      // 头部工具栏 BsTabPanel config
      toolBarStatusBtnConfig: {
        changeBtns: true,
        buttons: [
          {
            type: 'button',
            label: '待下发',
            code: 'unIssue',
            iconName: 'base-daiban.png',
            iconNameActive: 'base-daiban-active.png'
          },
          {
            type: 'button',
            label: '已下发',
            code: 'issued',
            iconName: 'base-zhibaio.png',
            iconNameActive: 'base-zhibaio-active.png'
          }
        ],
        curButton: {
          label: '待下发',
          code: 'unIssue',
          type: 'button'
        },
        buttonsInfo: {
          'unIssue': [
            {
              label: '生成',
              code: 'create',
              status: 'primary'
            }
          ],
          'issued': [
          ]
        }
      },
      buttonsInfo: proconf.statusRightToolBarButtonByBusDept,
      tabStatusNumConfig: {
        '1': 2,
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
      tableGlobalConfig: {
        customExportConfig: {
          addUnitColumn: true,
          addReportTitleColumn: true,
          unit: '万元'
        }
      },
      tableLoading: false,
      tableColumnsConfig: proconf[`PoliciesTableColumns${this.transJson(this.$store?.state?.curNavModule?.param5)?.isCity ? 'City' : ''}`],
      // tableData: [],
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
      leftNode: {},
      regulationStatus: '1',
      mainPagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      tableConfig: proconf.tableConfig,
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
      // 请求 & 角色权限相关配置
      menuName: '系统级监控规则',
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
      tableData: [],
      // tableData: [
      //   {
      //     mofDivName: '合计',
      //     proCode: '',
      //     proCodeName: '',
      //     yaAmount: 1522615641.58,
      //     yzyapAmount: 941648.5,
      //     ysjapAmount: 949219.64,
      //     yshjapAmount: 818,
      //     yxjapAmount: 8597,
      //     zaAmount: 7974456.95,
      //     zzyapAmount: 9874,
      //     zsjapAmount: 811874,
      //     zshjapAmount: 5298,
      //     zxjapAmount: 4819.85,
      //     amountName: '',
      //     agencyCodeName: '',
      //     xjExpFuncName: '',
      //     sfUseful: '',
      //     grantFrom: '',
      //     sfaccount: ''
      //   },
      //   {
      //     mofDivName: '[6100]陕西省本级',
      //     proCode: '610000000000021041340',
      //     proCodeName: '优抚对象补助资金',
      //     yaAmount: 1522615641.58,
      //     yzyapAmount: 941648.5,
      //     ysjapAmount: 949219.64,
      //     yshjapAmount: 818,
      //     yxjapAmount: 8597,
      //     zaAmount: 7974456.95,
      //     zzyapAmount: 9874,
      //     zsjapAmount: 811874,
      //     zshjapAmount: 5298,
      //     zxjapAmount: 4819.85,
      //     amountName: '学生资助补助经费',
      //     agencyCodeName: '[208003]西安理工大学',
      //     xjExpFuncName: '[2050299]其他普通教育支出',
      //     sfUseful: '利民',
      //     grantFrom: '',
      //     sfaccount: '是'
      //   },
      //   {
      //     mofDivName: '[6100]陕西省本级',
      //     proCode: '61000000000002116515',
      //     proCodeName: '高校学生国家奖助学金',
      //     yaAmount: 1525641.58,
      //     yzyapAmount: 9648.5,
      //     ysjapAmount: 94919.64,
      //     yshjapAmount: 18,
      //     yxjapAmount: 8497,
      //     zaAmount: 79756.95,
      //     zzyapAmount: 98754,
      //     zsjapAmount: 8118474,
      //     zshjapAmount: 52948,
      //     zxjapAmount: 4819.5,
      //     amountName: '优抚对象补助经费',
      //     agencyCodeName: '[208001]省教育厅机关',
      //     xjExpFuncName: '[2080899]其他优抚支出',
      //     sfUseful: '利民',
      //     grantFrom: '',
      //     sfaccount: '是'
      //   },
      //   {
      //     mofDivName: '[6100]陕西省本级',
      //     proCode: '610000000000021046440',
      //     proCodeName: '家庭经济困难学生生活补助',
      //     yaAmount: 1521.58,
      //     yzyapAmount: 948.5,
      //     ysjapAmount: 949.64,
      //     yshjapAmount: 88,
      //     yxjapAmount: 97,
      //     zaAmount: 797.95,
      //     zzyapAmount: 74,
      //     zsjapAmount: 814,
      //     zshjapAmount: 52,
      //     zxjapAmount: 49.85,
      //     amountName: '学生资助补助经费',
      //     agencyCodeName: '[208007]陕西科技大学',
      //     xjExpFuncName: '[2050299]其他普通教育支出',
      //     sfUseful: '利民',
      //     grantFrom: '',
      //     sfaccount: '是'
      //   }
      // ],
      mofDivCode: this.$store.state.userInfo.province,
      fiscalYear: '',
      speTypeName: '',
      expFuncName: '',
      proName: '',
      hqlm: '',
      endTime: '',
      leftTreeConfig: { // 左侧单位树配置
        showFilter: false, // 是否显示过滤
        isInitLoadData: false,
        scrollLoad: false, // 是否开启滚动加载
        isleaf: 0, // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
        levelno: -1, // 可选层级
        valueKeys: ['code', 'name', 'id', 'codeFragment'],
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
        clearable: true
      }
    }
  },
  mounted() {
  },
  methods: {
    switchMoneyUnit(level) {
      this.tableGlobalConfig.customExportConfig.unit = level === 1 ? '元' : '万元'
    },
    search(obj) {
      console.log(obj)
      this.searchDataList = obj
      this.fiscalYear = obj.fiscalYear ? this.$store.state.userInfo.year : obj.fiscalYear
      this.speTypeName = obj.speTypeName
      this.expFuncName = obj.expFuncName
      this.proName = obj.proName
      this.hqlm = obj.hqlm
      this.endTime = obj.endTime
      this.proCodes = obj.proCodes_code__multiple
      this.expFuncCodes = obj.expFuncCodes_code__multiple
      this.manageMofDeps = obj.manageMofDeps_code__multiple
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
      console.log(obj)
      if (!obj.type) {
        this.operationToolbarButtonClickEvent(obj)
        return
      }
      this.toolBarStatusSelect = obj
      switch (obj.code) {
        // 全部
        case 'check':

          break
      }
      this.regulationStatus = obj.curValue
      this.queryTableDatas()
    },
    deleteList() {
      // let datas = this.$refs.mainTableRef.getSelectionData()
      // if (datas.length === 0) {
      //   this.$message.warning('请选择数据')
      //   return
      // }
      // let arr = []
      // datas.forEach(res => {
      //   arr.push(res.regulationCode)
      // })
      // HttpModule.delete(arr).then(res => {
      //   if (res.code === '000000') {
      //     this.$message.warning('删除成功')
      //     this.queryTableDatas()
      //     // this.queryTableDatasCount()
      //   }
      // })
    },
    changeData(val) {
      // HttpModule.getDetailData(val).then(res => {
      //   if (res.code === '000000') {
      //     this.DetailData = res.data
      //     this.dialogVisible = true
      //     this.dialogTitle = '修改'
      //   }
      // })
    },
    getDetail(val) {
      // HttpModule.getDetailData(val).then(res => {
      //   if (res.code === '000000') {
      //     this.DetailData = res.data
      //     this.dialogVisible = true
      //     this.dialogTitle = '查看详情'
      //   }
      // })
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      console.log(obj.code)
      let datas3 = this.$refs.mainTableRef.getSelectionData()
      let regulationCodes = []

      switch (obj.code) {
        // 新增
        case 'add':
          this.onAddToolbarClickAdd(obj, context, e)
          break
        // 送审
        case 'approval':
          if (datas3.length === 0) {
            this.$message.warning('请选择数据')
            return
          }
          for (let i = 0; i < datas3.length; i++) {
            regulationCodes.push(datas3[i].regulationCode)
          }
          // this.auditByCheck(obj, context, e)// 经过监控的送审
          this.audieData({ operate: 1, regulationCodes: regulationCodes })
          break
        // 撤销
        case 'revoke':
          if (datas3.length === 0) {
            this.$message.warning('请选择数据')
            return
          }
          for (let i = 0; i < datas3.length; i++) {
            regulationCodes.push(datas3[i].regulationCode)
          }
          // this.auditByCheck(obj, context, e)// 经过监控的送审
          this.audieData({ operate: 3, regulationCodes: regulationCodes })
          break
        // 查看
        case 'check':

          if (datas3.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          // this.cancelCheck()
          let datas = this.$refs.mainTableRef.getSelectionData()
          if (datas.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          this.getDetail(datas[0].regulationCode)
          break
        // 修改
        case 'change':
          let datas2 = this.$refs.mainTableRef.getSelectionData()
          if (datas2.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          this.changeData(datas2[0].regulationCode)
          break
        // 删除
        case 'del':
          this.deleteList()
          break
        // 全量监控
        case 'monitor':
          // this.doDiscard(obj, context, e)
          break
        // // 刷新
        // case 'add-toolbar-refresh':
        //   this.refresh()
        //   break
        // // 刷新
        // case 'operation-toolbar-refresh':
        //   this.refresh()
        //   break
        default:
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
    // onClickmethod({ node }) {
    //   // if (node.children !== null && node.children.length !== 0 && node.id !== '0') {
    //   //   return
    //   // }
    //   if (node.id !== '0') {
    //     console.log(node)
    //     this.mofDivCode = node.code
    //   } else {
    //     this.condition = {}
    //   }
    //   this.queryTableDatas()
    // },
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
      this.queryTableDatas()
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
    getManageMofDep() {
      HttpModule.getManageMofDepTreeData().then(res => {
        if (res.code === '000000') {
          let treeResdata = this.getChildrenNewData1(res.data)
          this.queryConfig[1].itemRender.options = treeResdata
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getPro(fiscalYear = this.$store.state.userInfo?.year) {
      HttpModule.getProTreeData({ fiscalYear }).then(res => {
        if (res.code === '000000') {
          let treeResdata = this.getChildrenNewData1(res.data)
          this.queryConfig[2].itemRender.options = treeResdata
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getExcFunc() {
      HttpModule.getExpFuncTreeData().then(res => {
        if (res.code === '000000') {
          let treeResdata = this.getChildrenNewData1(res.data)
          this.queryConfig[3].itemRender.options = treeResdata
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
    // 查询 table 数据
    queryTableDatas() {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        fiscalYear: this.searchDataList.fiscalYear === '' ? this.$store.state.userInfo.year : this.searchDataList.fiscalYear,
        mofDivCode: this.mofDivCode, // 获取左侧树
        speTypeName: this.speTypeName,
        expFuncName: this.expFuncName,
        proName: this.proName,
        endTime: this.endTime,
        hqlm: this.hqlm,
        iscz: this.transJson(this.params5)?.iscz || false, // 菜单参照直达标识
        mofDivCodes: this.codeList,
        proCodes: this.proCodes === '' ? [] : this.proCodes,
        expFuncCodes: this.expFuncCodes === '' ? [] : this.expFuncCodes,
        manageMofDeps: this.manageMofDeps === '' ? [] : this.manageMofDeps
      }
      this.tableLoading = true
      HttpModule.xmPageQuery(param).then(res => {
        if (res.code === '000000') {
          if (res.data) {
            this.tableData = res.data.results
            this.mainPagerConfig.total = res.data.totalCount
            this.tabStatusNumConfig['1'] = res.data.totalCount
          }
        } else {
          this.$message.error(res.result)
        }
      }).finally(() => {
        this.tableLoading = false
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
        } else {
          this.$message.error('左侧树加载失败')
        }
      })
    },
    getChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.text || item.name
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
    this.params5 = this.$store.state.curNavModule.param5
    this.getPro()
    this.getManageMofDep()
    this.getExcFunc()
    this.getLeftTreeData()
    this.queryTableDatas()
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
