<!-- 重点关注 -->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTap></template>
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          show-zero
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
            :query-config="queryConfigIn"
            :query-form-item-config="queryConfig"
            :query-form-data="searchDataList"
            @onSearchClick="search"
          >
            <template #action-button-before>
              <vxe-button size="medium" status="primary" @click="onSearchClick">搜索</vxe-button>
              <vxe-button size="medium" status="primary" @click="onSearchResetClick">重置</vxe-button>
            </template>
          </BsQuery>
        </div>
      </template>
      <template v-slot:mainTree>
        <BsTreeSet
          ref="treeSet"
          v-model="leftTreeVisible"
          :tree-config="{}"
          @onChangeInput="changeInput"
          @onAsideChange="asideChange"
          @onConfrimData="treeSetConfrimData"
        />
        <BsTree
          ref="leftTree"
          open-loading
          :config="leftTreeConfig"
          :tree-data="treeData"
          :filter-text="treeGlobalConfig.inputVal"
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
          :formula-digits="2"
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
      :data-source-code="dataSourceCode"
      :modify-data="modifyData"
    />
    <!-- 附件弹框 -->
    <BsAttachment v-if="showAttachmentDialog" refs="attachmentboss" :user-info="userInfo" :billguid="billguid" />
  </div>
</template>

<script>
import { proconf } from './Focus'
import AddDialog from './children/addDialog'
import HttpModule from '@/api/frame/main/baseConfigManage/InquiryLetterType.js'
export default {
  components: {
    AddDialog
  },
  computed: {
    isSx() {
      return this.$store.getters.isSx
    }
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  data() {
    return {
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
          nodeKey: 'id', // 树的主键
          label: 'name', // 树的显示lalel字段
          children: 'children' // 树的嵌套字段
        },
        multiple: false, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true,
        clearable: true
      },
      isShowQueryConditions: true,
      radioShow: true,
      breakRuleVisible: false,
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
        buttonsInfo: proconf.statusRightToolBarButton,
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
        }
      },
      buttonsInfo: proconf.statusRightToolBarButtonByBusDept,
      tabStatusNumConfig: {
        '1': 0
      },
      // BsQuery 查询栏
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
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
      tableColumnsConfig: proconf.PoliciesTableColumns,
      tableData: [],
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        search: false, // 是否有search
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
        },
        globalConfig: {
          // 全局配置
          checkType: 'checkbox',
          seq: false, // 序号列
          useMoneyFilter: true
        }
      },
      tableFooterConfig: {
        totalObj: {
          payAmt: 0
        },
        combinedType: ['switchTotal'],
        showFooter: this.$store.getters.isSx
      },
      treeQueryparams: this.$store.getters.treeQueryparamsCom,
      // 操作日志
      logData: [],
      showLogView: false,
      // 新增弹窗
      dialogVisible: false,
      dialogTitle: '新增',
      addTableData: [],
      modifyData: {},
      // 请求 & 角色权限相关配置
      menuName: '',
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
      dataSourceCode: '',
      leftTreeVisible: true,
      proName: '',
      proCodeList: [],
      payAppNumber: '',
      param: '',
      useDes: '',
      payAcctName: '',
      payeeAcctName: '',
      xpayDate: '',
      setModeName: '',
      year: '',
      agencyCode: '',
      mofdivcode: '',
      codeList: [],
      queryConfigIn: {
        searchBtnText: '',
        resetBtnText: '',
        moreBtnText: '更多查询'
      },
      proCodes: '',
      treeGlobalConfig: {
        inputVal: ''
      },
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
      }]
    }
  },
  mounted() {
  },
  methods: {
    // 展开折叠查询框
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
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
      if (!obj.type) {
        this.operationToolbarButtonClickEvent(obj)
        return
      }
      this.toolBarStatusSelect = obj
      switch (obj.curValue) {
        // 全部
        case '1':
          this.menuName = '直达资金支出明细'
          this.radioShow = true
          break
      }
      this.condition = {}
      this.mainPagerConfig.currentPage = 1
      this.refresh()
      this.$refs.mainTableRef.$refs.xGrid.clearScroll()
    },
    // 搜索
    search(val) {
      console.log(val)
      this.searchDataList = val
      this.proName = val.proName
      this.payAppNumber = val.payAppNumber
      this.useDes = val.useDes
      this.payAcctName = val.payAcctName
      this.payeeAcctName = val.payeeAcctName
      this.xpayDate = val.xpayDate.substring(0, 10)
      this.setModeName = val.setModeName
      this.year = val.year
      this.agencyCode = val.agencyCode_code
      this.proCodes = val.proCodes
      let condition = this.getConditionList()
      for (let key in condition) {
        if (
          (this.searchDataList[key] !== undefined) &
          (this.searchDataList[key] !== null)
        ) {
          if (Array.isArray(this.searchDataList[key])) {
            condition[key] = this.searchDataList[key]
          } else if (typeof (this.searchDataList[key]) === 'string') {
            if (this.searchDataList[key].trim() !== '') {
              this.searchDataList[key].split(',').forEach(item => {
                condition[key].push(item)
              })
            }
          }
        }
      }
      if (this.searchDataList.dataSourceName && this.searchDataList.dataSourceName.trim() !== '') {
        condition.dataSourceName = this.searchDataList.dataSourceName
      }
      if (this.searchDataList.businessModuleName && this.searchDataList.businessModuleName.trim() !== '') {
        condition.businessModuleName = this.searchDataList.businessModuleName
      }
      this.condition = condition
      console.log(this.condition)
      this.queryTableDatas()
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
        this.queryConfig[this.queryConfig.findIndex(item => { return item.field === 'agencyCode' })].itemRender.options = treeResdata
      })
    },
    getChildrenNewData1(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.code + '-' + item.name
        if (item.children) {
          that.getChildrenNewData1(item.children)
        }
      })

      return datas
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      console.log(obj.code)
      switch (obj.code) {
        // 新增
        case 'add':
          this.onAddToolbarClickAdd(obj, context, e)
          break
        // 修改
        case 'change':
          this.changePolices()
          break
        // 删除
        case 'del':
          this.delPolicies(obj, context, e)
          break
        // 刷新
        case 'add-toolbar-refresh':
          this.refresh()
          break
        // 刷新
        case 'operation-toolbar-refresh':
          this.refresh()
          break
        default:
          break
      }
    },
    // 删除
    delPolicies() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length === 0) {
        this.$message.warning('请选择数据')
        return
      }
      let askTypeCode = []
      selection.forEach(item => {
        askTypeCode.push(item.askTypeCode)
      })
      let param = {
        askTypeCode: askTypeCode
      }
      this.$confirm('是否确定删除 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableLoading = true
        HttpModule.delPolicies(param).then(res => {
          this.tableLoading = false
          if (res.code === '000000') {
            this.$message.success('删除成功')
            this.queryTableDatas()
          } else {
            this.$message.error(res.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 修改
    changePolices() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.id = selection[0].id
      this.modifyData = selection[0]
      this.dialogVisible = true
      this.dialogTitle = '修改'
    },
    // 新增
    onAddToolbarClickAdd() {
      this.dialogVisible = true
      this.dialogTitle = '新增'
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
    onClickmethod(node) {
      let code = node.node.code
      this.codeList = []
      let treeData = node.treeData
      this.getItem(code, treeData)
      console.log('codeList', this.codeList)
      if (node.id !== '0') {
        console.log(node)
        this.mofdivcode = node.code
      } else {
        this.condition = {}
      }
      this.queryTableDatas()
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
    queryTableDatasCount() {
      // const params = {
      //   statusCodeArr: ['1'],
      //   menuId: this.menuId,
      //   isHaveZero: this.isHaveZero,
      //   appId: 'pay_voucher',
      //   roleId: this.$store.state.curNavModule.roleguid,
      //   params: this.params5,
      //   isInput: '9',
      //   condition: this.differConditon
      // }
      // HttpModule.queryTableDatasCount(params).then(res => {
      //   if (res.rscode === '200') {
      //     this.tabStatusNumConfig = res.data
      //     this.tabStatusNumConfig = Object.assign(res.data)
      //   }
      // })
    },
    // 查询 table 数据
    queryTableDatas() {
      let queryObj = {
        payAppNumber: this.$refs.queryFrom.getFormData().payAppNumber,
        // year: this.$refs.queryFrom.year,
        // agencyCode: this.$refs.queryFrom.getFormData().agencyCode,
        proName: this.$refs.queryFrom.getFormData().proName,
        useDes: this.$refs.queryFrom.getFormData().useDes,
        payAcctName: this.$refs.queryFrom.getFormData().payAcctName,
        payeeAcctName: this.$refs.queryFrom.getFormData().payeeAcctName,
        setModeName: this.$refs.queryFrom.getFormData().setModeName,
        xpayDate: this.$refs.queryFrom.getFormData().xpayDate
      }
      const param = {
        reportCode: 'zdzjzcmx',
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        // proName: this.proName,
        // payAppNumber: this.payAppNumber,
        // useDes: this.useDes,
        // payAcctName: this.payAcctName,
        // xpayDate: this.xpayDate,
        // payeeAcctName: this.payeeAcctName,
        fiscalYear: this.$refs.queryFrom.getFormData().year,
        // setModeName: this.setModeName,
        agencyCode: this.agencyCode,
        mofDivCodeList: this.codeList,
        proCodes: this.proCodes === '' ? [] : this.getTrees(this.proCodes),
        ...queryObj
        // dataSourceName: this.condition.dataSourceName ? this.condition.dataSourceName.toString() : '',
        // businessModuleName: this.condition.businessModuleName ? this.condition.businessModuleName.toString() : ''
      }
      this.tableLoading = true
      HttpModule.querySum(param).then(res => {
        if (res.code === '000000') {
          this.tableFooterConfig.totalObj = res.data[0]
        } else {
          this.$message.error(res.result)
        }
      })
      let axiosUrl = 'queryTableDatas1'
      this.isSx && (axiosUrl = 'queryTableDatas1Sx')
      HttpModule[axiosUrl](param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
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
    getLeftTreeData() {
      let params = this.treeQueryparams

      HttpModule.getLeftTree(params).then(res => {
        if (res.data) {
          this.treeData = res.data
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
    },
    reset() {
      // 重置
      let self = this.$refs.queryFrom
      self.defaultQueryFormData.fiscalYear = this.searchDataList.fiscalYear
      return new Promise((resolve, reject) => {
        self.queryFormDataIn = self.resetMultipleData(Object.assign(self.$refs.queryForm.getFormData(), self.defaultQueryFormData))
        self.queryFormItemConfigIn = []
        self.$nextTick().then(() => {
          self.onMoreSearchClick(self.isMoreSearch)
          resolve(self.queryFormDataIn)
        })
      })
    },
    onSearchClick() {
      this.$refs.queryFrom.onSearchClick()
    },
    onSearchResetClick() {
      let self = this.$refs.queryFrom
      this.reset().then((res) => {
        if (self.$listeners.onSearchResetClick) {
          self.$emit('onSearchResetClick', self.queryFormDataIn)
        } else {
          self.$emit('onSearchClick', self.queryFormDataIn, self.getMultipleValue(self.queryFormItemConfig, self.queryFormDataIn), false)
        }
      })
    },
    getProTreeData() {
      HttpModule.getProTreeData().then(res => {
        if (res.code === '000000') {
          let treeResdata = this.getChildrenNewData1(res.data)
          let index = this.queryConfig.findIndex(item => item.field === 'proCodes')
          this.queryConfig[index].itemRender.options = treeResdata
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getPro() {
      let self = this
      const param = {
        elementCode: 'AGENCY',
        date: this.$store.state.userInfo.year,
        tokenid: this.$store.getters.getLoginAuthentication.tokenid,
        appguid: 'apaas',
        year: this.$store.state.userInfo.year,
        mofDivCode: this.$store.state.userInfo.province,
        parameters: {}
      }
      HttpModule.getTreeAgency(param).then(res => {
        if (res.code === '000000') {
          let treeResdata = self.getChildrenNewData(res.data)
          treeResdata.forEach(item => {
            item['id'] = item.guid
          })
          self.queryConfig[2].itemRender.options = treeResdata
          self.searchDataList = { ...this.searchDataList }
        } else {
          self.$message.error(res.message)
        }
      })
    },
    getChildrenNewData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.name
        if (item.children) {
          that.getChildrenNewData1(item.children)
        }
      })
      return datas
    }
  },
  created() {
    let date = new Date()
    let year = date.toLocaleDateString().split('/')[0]
    // let month = date.toLocaleDateString().split('/')[1]
    // let day = date.toLocaleDateString().split('/')[2]
    this.searchDataList.year = year
    // this.searchDataList.xpayDate = year + '-' + month + '-' + day
    // this.params5 = commonFn.transJson(this.$store.state.curNavModule.param5)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.getLeftTreeData()
    this.getAgency()
    this.getPro()
    this.getProTreeData()
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
