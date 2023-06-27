<!-- 政策法规管理 -->
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
            :query-form-item-config="queryConfig"
            :query-form-data="searchDataList"
            @onSearchClick="search"
          />
        </div>
      </template>
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
          :filter-text="leftTreeFilterText"
          :config="leftTreeConfig"
          :tree-data="treeData"
          :default-expanded-keys="defaultExpandedKeysIn"
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
    <!-- 附件弹框 -->
    <BsAttachment v-if="showAttachmentDialog" refs="attachmentboss" :user-info="userInfo" :billguid="billguid" />
    <RuleModal ref="RuleModal" />
  </div>
</template>

<script>
import { proconf } from './columns'
import RuleModal from './ruleModal.vue'
import HttpModule from '@/api/frame/main/Monitoring/Policies.js'

export default {
  components: {
    RuleModal
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  data() {
    return {
      mofDivCode: '',
      showGlAttachmentDialog: false,
      // BsQuery 查询栏
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      defaultCheckedKeys: [],
      radioShow: true,
      breakRuleVisible: false,
      leftTreeFilterText: '',
      defaultExpandedKeysIn: [],
      // 头部工具栏 BsTabPanel config
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
        codeList: []
      },
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
      tabStatusNumConfig: {
        '1': 0
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
          $gloableOptionRow: proconf.gloableOptionRow
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
      showDetail: false,
      dialogTitle: '新增',
      addTableData: [],
      regulationsCode: '',
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
      detailTitle: '详情',
      detailData: {},
      leftTreeVisible: true,
      treeTypeConfig: {
        curRadio: 'AGENCY'
      },
      treeAjaxType: 'get',
      treeServerUri: 'large-monitor-platform/lmp/businessFunctions/tree',
      treeData: [{
        children: [],
        code: 0,
        id: 0,
        label: '全部分类',
        name: '全部分类',
        parentId: null,
        parentRuleName: null,
        ruleLevel: 0,
        ruleName: '全部分类'
      }],
      treeQueryparams: { },
      treeGlobalConfig: {
        inputVal: ''
      }
    }
  },
  mounted() {
  },
  methods: {
    getLeftTreeData() {
      console.log('getLeftTreeData')
      let that = this
      let params = {}
      if (this.$store.state.province === '610000000') {
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
          province: this.$store.state.userInfo.province,
          year: this.$store.state.userInfo.year,
          wheresql: 'and code like \'' + this.userInfo.province.substring(0, 6) + '%\''
        }
      }
      HttpModule.getLeftTree(params).then(res => {
        if (res.data) {
          let treeResdata = that.getChildrenData(res.data)
          that.treeData = treeResdata
        } else {
          this.$message.error('左侧树加载失败')
        }
      })
    },
    getChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.text || `${item.code}-${item.name}`
        if (item.children) {
          that.getChildrenData(item.children)
        }
      })

      return datas
    },
    // 左侧树
    changeInput(val) {
      this.treeGlobalConfig.inputVal = val
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
    search(obj) {
      this.mainPagerConfig.currentPage = 1
      this.searchDataList.regulationName = obj.regulationName
      this.searchDataList.warningLevel = obj.warningLevel
      this.searchDataList.regulationType = obj.regulationType
      this.searchDataList.ruleTypeCode = obj.ruleTypeCode
      this.queryTableDatas()
    },
    onNodeCheckClick(data) {
      console.log(data.nodes)
      let arr = []

      let regulationType = this.$store.state.curNavModule.f_FullName.substring(0, 3)
      if (regulationType === '系统级') {
        data.nodes.forEach(item => {
          if (item.isleaf) {
            let obj = {
              mofDivCode: '',
              agencyCode: '',
              mofDiv: ''
            }
            obj.mofDivId = item.code
            obj.mofDivCode = item.name.split('-')[0]
            arr.push(obj)
          }
        })
      } else if (regulationType === '部门级') {
        data.nodes.forEach(item => {
          if (item.isleaf) {
            let obj = {
              mofDivCode: '',
              agencyCode: ''
            }
            obj.mofDivId = item.code
            arr.push(obj)
          }
        })
      } else if (regulationType === '财政级') {
        data.nodes.forEach(item => {
          if (item.isleaf) {
            let obj = {
              mofDivCode: '',
              agencyCode: ''
            }
            obj.mofDivId = item.code
            obj.mofDivCode = item.name.split('-')[0]
            arr.push(obj)
          }
        })
      }
      console.log('arr', arr)
      this.scope = arr
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
          this.menuName = '政策法规库管理'
          // this.getSearchDataList()
          this.radioShow = true
          break
      }
      this.condition = {}
      this.mainPagerConfig.currentPage = 1
      this.refresh()
      this.$refs.mainTableRef.$refs.xGrid.clearScroll()
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      console.log(obj.code)
      switch (obj.code) {
        case 'setup':
        case 'edit':
          let selection = this.$refs.mainTableRef.getSelectionData()
          if (selection.length < 1) {
            this.$message.warning('请至少选择一条数据')
            return
          }
          this.$refs.RuleModal.dialogVisible = true
          this.$refs.RuleModal.selection = selection
          // this.$refs.RuleModal.createDataList = selection
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
      switch (optionType) {
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
    onClickmethod(node) {
      this.mofDivCode = node.node.code
      // console.log(777, node)
      // let code = node.node.code
      // this.codeList = []
      // let treeData = node.treeData
      // this.getItem(code, treeData)
      // console.log(this.codeList)
      // if (node.id !== '0') {
      //   console.log(node)
      //   this.mofDivCode = ''
      // } else {
      //   this.condition = {}
      // }
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
      console.log('查看附件')
      if (row.regulationsCode === null || row.regulationsCode === '') {
        this.$message.warning('该数据无附件')
        return
      }
      this.billguid = row.regulationsCode
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
    // 点击新增
    onAddToolbarClickAdd(obj, context, e) {
      this.regulationsCode = ''
      this.dialogVisible = true
      this.dialogTitle = '新增'
    },
    // 删除
    delPolicies() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length < 1) {
        this.$message.warning('请选择数据')
        return
      }
      let regulationsCodes = []
      selection.forEach(item => {
        regulationsCodes.push(item.regulationsCode)
      })
      let param = {
        regulationsCodes: regulationsCodes
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
      this.regulationsCode = selection[0].regulationsCode
      this.dialogVisible = true
      this.dialogTitle = '修改'
    },
    detail() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.showDetail = true
      this.detailData = selection[0]
    },
    // 查询 table 数据
    queryTableDatas(province) {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        regulationClass: this.searchDataList.regulationClass,
        regulationName: this.searchDataList.regulationName,
        ruleTypeCode: this.searchDataList.ruleTypeCode,
        regulationType: this.searchDataList.regulationType,
        warningLevel: this.searchDataList.warningLevel,
        mofDivCode: this.mofDivCode
      }
      this.tableLoading = true
      HttpModule.getTableDate2(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
          this.tabStatusNumConfig['1'] = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
    }
  },
  created() {
    // this.params5 = commonFn.transJson(this.$store.state.curNavModule.param5)
    this.menuId = this.$store.state.curNavModule.guid
    if (this.menuId === '266A441A752111ECA9A7B8F0F910FFFB') {
      this.toolBarStatusBtnConfig.buttonsInfo = proconf.statusRightToolBarSelectButton
    }
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.getLeftTreeData()
  }
}
</script>
<style scoped lang="scss">
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
/deep/ .boss-slect__toolbar .boss-toolbar__content .toolbar-btns .select-tab-li{
  max-width: inherit;
}
.warningLevel1{
  color: red;
}
.warningLevel2{
  color:#FF6F20
}
.warningLevel3{
  color: #FFD43C;
}
.warningLevel4{
  color: #F1F1F1;
}
</style>
