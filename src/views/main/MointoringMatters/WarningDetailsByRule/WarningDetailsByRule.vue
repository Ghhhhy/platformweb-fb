<!-- 预警明细查询（按规则） -->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <!-- <BsMainFormListLayout> -->
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
          open-loading
          :config="leftTreeConfig"
          :tree-data="treeData"
          :default-expanded-keys="defaultExpandedKeysIn"
          @onNodeClick="onClickmethod"
        />
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="mainTableRef"
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
    <!-- <AddDialog
      v-if="dialogVisible"
      :title="dialogTitle"
    /> -->
    <!-- 附件弹框 -->
    <BsAttachment v-if="showAttachmentDialog" refs="attachmentboss" :user-info="userInfo" :billguid="billguid" />
    <DetailDialog
      v-if="dialogVisible"
      :title="dialogTitle"
      :warning-code="warningCode"
      :fi-rule-code="fiRuleCode"
    />
    <HsDetailDialog
      v-if="dialogHsVisible"
      :title="dialogTitle"
      :warning-code="warningCode"
      :fi-rule-code="fiRuleCode"
    />
    <GlAttachment
      v-if="showGlAttachmentDialog"
      :user-info="userInfo"
      :billguid="billguid"
    />
  </div>
</template>

<script>
import { proconf } from './WarningDetailsByRule'
// import AddDialog from './children/addDialog'
import DetailDialog from '@/views/main/MointoringMatters/BudgetAccountingWarningDataMager/children/handleDialog.vue'
import HsDetailDialog from '@/views/main/MointoringMatters/BudgetAccountingWarningDataMager/children/hsHandleDialog.vue'
import HttpModule from '@/api/frame/main/Monitoring/WarningDetailsByRule.js'
import GlAttachment from '../common/GlAttachment'
export default {
  components: {
    DetailDialog,
    HsDetailDialog,
    GlAttachment
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  data() {
    return {
      // BsQuery 查询栏
      dialogHsVisible: false,
      warningCode: '',
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      radioShow: true,
      breakRuleVisible: false,
      treeData: [{
        children: [],
        code: '',
        id: '0',
        label: '全部',
        name: '全部',
        parentId: null,
        parentRuleName: null,
        ruleLevel: 0,
        text: '全部'
      }],
      treeTypeConfig: {
        curRadio: '1',
        radioGroup: [
          {
            code: '1',
            label: '区划树'
          },
          {
            code: '2',
            label: '规则树'
          }
        ]
      },
      codeList: [],
      treeType: '1',
      treeGlobalConfig: {
        inputVal: ''
      },
      treeQueryparams: { },
      // treeServerUri: 'pay-clear-service/v2/lefttree',
      treeServerUri: 'large-monitor-platform/lmp/businessFunctions/tree',
      treeAjaxType: 'get',
      leftTreeVisible: true,
      // 头部工具栏 BsTabPanel config
      toolBarStatusBtnConfig: {
        changeBtns: true,
        buttons: proconf.toolBarStatusButtons,
        curButton: {
          type: 'button',
          iconName: 'base-all.png',
          iconNameActive: 'base-all-active.png',
          iconUrl: '',
          label: '全部',
          code: '1',
          curValue: '1'
        },
        buttonsInfo: proconf.statusRightToolBarButton1,
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
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
      tableLoading: false,
      tableColumnsConfig: proconf.PoliciesTableColumns1,
      tableData: [],
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
          // 编辑 附件 操作日志
          $payVoucherInputGloableOptionRow: proconf.gloableOptionRow
        },
        methods: {
          onOptionRowClick: this.onOptionRowClick
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
      regulation_class: '',
      warningLevel: '',
      DetailData: {},
      regulationclass: '',
      firulename: '',
      fiRuleCode: '',
      businessTime: '',
      endTime: '',
      showGlAttachmentDialog: false,
      regulation_type: '',
      regulation_code: '',
      useDes: '',
      defaultExpandedKeysIn: ['0'],
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
        leftTreeFilterText: ''
      }
    }
  },
  mounted() {
  },
  methods: {
    search(obj) {
      console.log(obj)
      this.warningLevel = obj.warningLevel
      this.regulationType = obj.regulationType
      this.regulation_type = obj.regulationType
      this.firulename = obj.firulename
      this.triggerClass = obj.triggerClass
      this.isSign = obj.isSign
      this.regulation_class = obj.regulation_class
      this.businessTime = obj.businessTime
      this.endTime = obj.endTime
      this.useDes = obj.useDes
      this.searchDataList.businessNo = obj.businessNo
      if (this.endTime) {
        this.endTime = this.endTime + ' 23:59:59'
      }
      if (this.businessTime) {
        this.businessTime = this.businessTime + ' 00:00:00'
      }
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
      let datas = this.$refs.mainTableRef.getSelectionData()
      if (datas.length === 0) {
        this.$message.warning('请选择数据')
        return
      }
      let arr = []
      datas.forEach(res => {
        arr.push(res.regulationCode)
      })
      HttpModule.delete(arr).then(res => {
        if (res.code === '000000') {
          this.$message.warning('删除成功')
          this.queryTableDatas()
          // this.queryTableDatasCount()
        }
      })
    },
    changeData(val) {
      HttpModule.getDetailData(val).then(res => {
        if (res.code === '000000') {
          this.DetailData = res.data
          this.dialogVisible = true
          this.dialogTitle = '修改'
        }
      })
    },
    getDetail(val) {
      HttpModule.getDetailData(val).then(res => {
        if (res.code === '000000') {
          this.DetailData = res.data
          this.dialogVisible = true
          this.dialogTitle = '查看详情'
        }
      })
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
        case 'detail':
          let selection = this.$refs.mainTableRef.getSelectionData()
          if (selection.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          this.selectData = selection[0]
          if (this.selectData.regulationClass === '0107') {
            this.dialogHsVisible = true
          } else {
            this.dialogVisible = true
          }
          this.dialogTitle = '详细信息'
          this.warningCode = this.selectData.warningCode
          this.fiRuleCode = this.selectData.fiRuleCode
          // this.mainPagerConfig.currentPage = 1
          break
        case 'violation':
          let selectionData = this.$refs.mainTableRef.getSelectionData()
          if (selectionData.length !== 1) {
            this.$message.warning('请选择一条数据')
            return
          }
          this.selectData = selectionData[0]
          this.violation()
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
    // table 右侧操作按钮
    onOptionRowClick({ row, optionType }, context) {
      // console.log(context.$parent.$parent.$parent)
      console.log(row.attachment_id)
      switch (optionType) {
        // 新增
        case 'add':
          this.clickAddBtn(row)
          break
        // 操作日志
        case 'report':
          this.queryActionLog(row)
          break
        // 附件
        case 'attachment':
          this.showAttachment(row)
          break
        default:
      }
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
    onClickmethod(node) {
      if (this.treeType === '1') {
        // if (node.node.code === '') {
        //   return
        // }
        let code = node.node.code
        this.codeList = []
        let treeData = node.treeData
        this.getItem(code, treeData)
        console.log(this.codeList)
        this.queryTableDatas()
      } else {
        let code = node.node.code
        let regulationClass = ''
        let regulationType = ''
        let regulationCode = ''
        if (code.length === 4) {
          regulationClass = node.node.code
        } else if (node.node.code.length === 6) {
          regulationClass = node.node.superguid
          regulationType = node.node.code.substr(-1, 1)
        } else {
          regulationClass = node.node.superguid
          regulationType = node.node.bsTreePid.substr(-1, 1)
          regulationCode = node.node.code
        }
        this.regulation_class = regulationClass
        this.regulation_type = regulationType
        this.regulation_code = regulationCode
        this.queryTableDatas()
      }
    },
    treeSetConfrimData(curTree) {
      console.log(curTree)
      if (curTree.code === '1') {
        this.treeType = '1'
        this.getLeftTreeData()
      } else {
        this.treeType = '2'
        this.getLeftTreeData1()
      }
    },
    asideChange() {
      this.leftTreeVisible = false
    },
    onTabPanelBtnClick(obj) { // 按钮点击
      let temp = this.$refs.mainTableRef.getSelectionData()
      let warnids = []
      let param = {
        warnids
      }
      switch (obj.code) {
        case 'sign': // 生成
          if (temp.length >= 1) {
            temp.forEach(v => {
              warnids.push(v.warnid)
            })
            this.tableLoading = true
            HttpModule.doMark(param).then(res => {
              this.tableLoading = false
              if (res.code === '000000') {
                this.$message.success('标记成功！请前往监控问询单生成界面查看')
                this.refresh()
              } else {
                this.$message.error(res.message)
              }
            })
          } else {
            this.$message.warning('请至少选择一条数据')
          }
          break
        default:
          console.log('default fallback')
      }
    },
    // 查看附件
    showAttachment(row) {
      console.log('查看附件')
      if (row.attachmentId === null || row.attachmentId === '') {
        this.$message.warning('该数据无附件')
        return
      }
      this.billguid = row.attachmentId
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
    queryTableDatasCount() {
      let that = this
      let regulationType = this.$store.state.curNavModule.f_FullName.substring(0, 3)
      if (regulationType === '系统级') {
        regulationType = '1'
      } else if (regulationType === '部门级') {
        regulationType = '3'
      } else if (regulationType === '财政级') {
        regulationType = '2'
      }
      const params = {
        menuType: 1,
        regulationType: regulationType,
        id: this.condition.agency_code
      }
      HttpModule.queryTableDatasCount(params).then(res => {
        console.log('res.code', res.code)
        that.tabStatusNumConfig['1'] = res.data.unHandle
        that.tabStatusNumConfig['2'] = res.data.handle
        that.tabStatusNumConfig['3'] = res.data.unHandle + res.data.handle
      })
    },
    // 查询 table 数据
    queryTableDatas() {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        warn_level: this.warningLevel, // 预警级别
        mofdivname: this.mofdivname,
        agencycode: this.agencycode,
        firulename: this.firulename,
        regulationClass: this.params5,
        firulecode: this.regulation_code,
        triggerClass: this.triggerClass,
        isSign: this.isSign,
        businessTime: this.businessTime,
        businessNo: this.searchDataList.businessNo,
        endTime: this.endTime,
        mofDivCodeList: this.codeList,
        regulation_code: this.regulation_code,
        regulation_class: this.regulation_class,
        regulation_type: this.regulation_type,
        jurisdiction: this.$store.getters.getIsJurisdiction,
        useDes: this.useDes,
        roleId: this.roleguid
      }
      this.tableLoading = true
      HttpModule.queryTableDatas(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.tableData.forEach(item => {
            if (item.handleTime === null) {
              item.handleTime = '-'
            }
            if (item.warnLevel === 1) {
              item.warnLevel = '<span style="color:#BBBB00">黄色预警</span>'
            } else if (item.warnLevel === 2) {
              item.warnLevel = '<span style="color:orange">橙色预警</span>'
            } else if (item.warnLevel === 3) {
              item.warnLevel = '<span style="color:red">红色预警</span>'
            } else if (item.warnLevel === 5) {
              item.warnLevel = '<span style="color:blue">蓝色预警</span>'
            } else if (item.warnLevel === 4) {
              item.warnLevel = '<span style="color:gray">灰色预警</span>'
            }
          })
          this.mainPagerConfig.total = res.data.totalCount
          this.tabStatusNumConfig['1'] = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 操作日志
    queryActionLog(row) {
      let data = {
        roleguid: this.$store.state.curNavModule.roleguid,
        data: {
          statusCode: this.toolBarStatusSelect.code,
          id: row.id,
          appId: 'pay_voucher'
        }
      }
      HttpModule.queryActionLog(data).then(res => {
        this.logData = res.data
        console.log(this.logData)
        this.showLogView = true
      })
    },
    // 送审
    audieData(param) {
      HttpModule.audieData(param).then(res => {
        if (res.code === '000000') {
          this.$message.warning('操作成功')
          this.queryTableDatas()
        }
      })
    },
    violation() {
      this.$message.info('疑似违规')
    },
    getChildrenData1(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.code + '-' + item.ruleName
        // item.code = item.code
        item.value = item.code
        if (item.children) {
          that.getChildrenData1(item.children)
        }
      })

      return datas
    },
    getTree() {
      let that = this
      HttpModule.getTree(3).then(res => {
        if (res.code === '000000') {
          let treeResdata = that.getChildrenData1(res.data)
          that.queryConfig[3].itemRender.options = treeResdata
          console.log(treeResdata)
        } else {
          that.$message.error('下拉树加载失败')
        }
      })
    },
    getLeftTreeData() {
      console.log(this.userInfo)
      let params = {}
      if (this.userInfo.province === '610000000') {
        params = {
          elementcode: 'admdiv',
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
          elementcode: 'admdiv',
          province: this.userInfo.province,
          year: this.userInfo.year,
          wheresql: 'and code like \'' + this.userInfo.province.substring(0, 4) + '%\''
        }
      } else {
        params = {
          elementcode: 'admdiv',
          province: this.userInfo.province,
          year: this.userInfo.year,
          wheresql: 'and code like \'' + this.userInfo.province.substring(0, 6) + '%\''
        }
      }
      let that = this
      HttpModule.getLeftTree(params).then(res => {
        if (res.rscode === '100000') {
          let treeResdata = that.getChildrenData(res.data)
          that.treeData = treeResdata
        } else {
          this.$message.error('左侧树加载失败')
        }
      })
    },
    getLeftTreeData1() {
      let that = this
      if (this.params5 === 'dfr') { // 如果是直达资金监控规则库 显示预警级别树
        that.treeData = proconf.leftYjjbData
        return
      }
      HttpModule.getLeftTree1().then(res => {
        if (res.code === '000000') {
          let arr = []
          // if (this.params5 === 'dfr') {
          //   res.data.children.forEach(item1 => {
          //     if (item1.code === '09') {
          //       this.children = item1
          //     }
          //   })
          //   arr.push(this.children)
          //   let treeResdata = that.getChildrenData(arr)
          //   that.treeData = treeResdata
          // } else {
          arr.push(res.data)
          let treeResdata = that.getChildrenData(arr)
          that.treeData = treeResdata
          // }
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
    }
  },
  created() {
    let date = new Date()
    let year = date.toLocaleDateString().split('/')[0]
    let month = date.toLocaleDateString().split('/')[1]
    let day = date.toLocaleDateString().split('/')[2]
    this.searchDataList.endTime = year + '-' + month + '-' + day
    // this.getTree()
    console.log('this.$store.state.curNavModule', this.$store.state.curNavModule)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.menuName = this.$store.state.curNavModule.name
    this.params5 = this.$store.getters.getRegulationClass
    if (this.params5 === '6') {
      this.tableColumnsConfig = proconf.PoliciesTableColumns
    }
    if (this.$route.name === 'WarningDetailsByRuleAllSpe') { // 平台【预警明细查询】（专项）不展示管理级次
      this.tableColumnsConfig.splice(this.tableColumnsConfig.findIndex(item => item.field === 'regulationtype'), 1)
    }
    if (this.params5 === '06' || this.params5 === '07' || this.params5 === '0106' || this.params5 === '0107') {
      this.toolBarStatusBtnConfig.buttonsInfo = proconf.statusRightToolBarButton
    }
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
