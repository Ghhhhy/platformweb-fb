<!-- 问询函类型设置 -->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout>
      <template v-slot:topTap></template>
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          show-zero
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
      <!-- <template v-slot:mainTree>
        <BsTreeSet
          ref="treeSet"
          v-model="leftTreeVisible"
          :tree-config="false"
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
          @onNodeCheckClick="onNodeCheckClick"
          @onNodeClick="onClickmethod"
        />
      </template> -->
      <template v-slot:mainForm>
        <BsTable
          ref="mainTableRef"
          row-id="id"
          :footer-config="tableFooterConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :table-config="tableConfig"
          :pager-config="false"
          :toolbar-config="tableToolbarConfig"
          :tree-config="{
            dblExpandAll: true,
            dblExpand: true,
            accordion: false,
            iconClose: 'el-icon-circle-plus',
            iconOpen: 'el-icon-remove',
            expandRowKeys: defaultExpandKey,
          }"
          :default-money-unit="defaultMoneyUnit"
          :show-zero="true"
          :table-global-config="exportGlobalConfig"
          :cell-style="cellStyle"
          @onToolbarBtnClick="onToolbarBtnClick"
          @ajaxData="ajaxTableData"
          @cellClick="cellClick"
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
    <AddDialog
      v-if="dialogVisible"
      :title="dialogTitle"
      :data-id="dataId"
      :modify-data="modifyData"
    />
    <!-- 附件弹框 -->
    <BsAttachment v-if="showAttachmentDialog" refs="attachmentboss" :user-info="userInfo" :billguid="billguid" />
    <ThreeGuaranteesSummaryModal v-if="showModal" ref="ThreeGuaranteesSummaryModal" />
  </div>
</template>

<script>
import { proconf } from './ThreeGuaranteesSummary'
import AddDialog from './children/addDialog'
import HttpModule from '@/api/frame/main/baseConfigManage/ThreeGuaranteesSummary.js'
import moment from 'moment'
import ThreeGuaranteesSummaryModal from './children/ThreeGuaranteesSummaryModal.vue'
const cursionTreeList = (tree) => {
  const arr = []
  const levelNo = [0, 1]
  if (!Array.isArray(tree) || !tree.length) return
  const cursionTree = (tree, level = 0) => {
    tree.forEach((item) => {
      if (levelNo.includes(level)) {
        arr.push(item.id)
      }
      if (Array.isArray(item.children) && item.children && item.children.length) {
        cursionTree(item.children, level + 1)
      }
    })
  }
  cursionTree(tree)
  return arr
}
export default {
  components: {
    AddDialog,
    ThreeGuaranteesSummaryModal
  },
  computed: {
    exportGlobalConfig() {
      return {
        customExportConfig: {
          fileName: `${this.menuName}-${moment().format('YYYY-MM-DD')}`,
          showZero: true
        }
      }
    }
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  data() {
    return {
      defaultExpandKey: [],
      isShowQueryConditions: true,
      radioShow: true,
      breakRuleVisible: false,
      defaultMoneyUnit: 10000,
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
      leftTreeVisible: true,
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
      treeData: [],
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
      tableColumnsConfig: proconf.PoliciesTableColumns(this),
      tableData: [],
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: true, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: true, // 导出
        expandAll: false, // 展开所有
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
        globalConfig: {
          // 全局配置
          seq: true // 序号列
        },
        renderers: {
          // 编辑 附件 操作日志
          $payVoucherInputGloableOptionRow: proconf.gloableOptionRow
        },
        methods: {
          onOptionRowClick: this.onOptionRowClick
        }
      },
      tableFooterConfig: {
        totalObj: {
          total_yss: 0,
          total_zcs: 0,
          sbZbjeBjbms: 0,
          sbZxjeBjbms: 0,
          sbZbjeBgz: 0,
          sbZxjeBgz: 0,
          sbZbjeByz: 0,
          sbZxjeByz: 0
        },
        combinedType: ['switchTotal'],
        showFooter: false
      },
      // 操作日志
      logData: [],
      showLogView: false,
      showModal: false,
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
      param: '',
      dataId: '',
      param5: {},
      caliberDeclareContent: '' // 口径说明
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
          this.menuName = '“三保”支出统计汇总表'
          this.radioShow = true
          break
      }
      this.condition = {}
      this.mainPagerConfig.currentPage = 1
      this.refresh()
      // this.$refs.mainTableRef.$refs.xGrid.clearScroll()
    },
    // 搜索
    search(val) {
      console.log(val)
      this.searchDataList = val
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
      this.condition = condition
      this.queryTableDatas()
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
      this.dataId = selection[0].id
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
      this.node = node.node
      let code = node.node.code
      this.codeList = []
      let treeData = node.treeData
      this.getItem(code, treeData)
      const param = {
        mofDivCodeList: this.codeList
      }
      HttpModule.queryTableDatas(param).then((res) => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          let ysAmt = 0
          let payAmt = 0
          this.tableData.forEach((item) => {
            item.agency = item.agencyCode + '-' + item.agencyName
            if (item.ysAmt) {
              ysAmt += item.ysAmt
            }
            if (item.payAmt) {
              payAmt += item.payAmt
            }
          })
          this.tableFooterConfig.totalObj.ysAmt = ysAmt
          this.tableFooterConfig.totalObj.payAmt = payAmt
          this.mainPagerConfig.total = res.data.totalCount
          // this.tabStatusNumConfig[param.handleResult] = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
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
    // 查看附件
    showAttachment(row) {
      this.billguid = row.attachment_id
      this.showAttachmentDialog = true
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property
      console.log('=====当前点击行key====', key)
      console.log('=====当前点击行row====', obj.row)
      console.log('=====当前点击行column====', obj.column)
      const { canInsert } = obj.column.own
      if (canInsert) {
        this.showModal = true
        this.$nextTick(() => {
          if (obj.row.children && Array.isArray(obj.row.children)) {
            this.$refs.ThreeGuaranteesSummaryModal.clickType = 'total'
          } else {
            this.$refs.ThreeGuaranteesSummaryModal.clickType = 'region'
          }
          this.$refs.ThreeGuaranteesSummaryModal.clickColumnsInfo = obj.column.own
          this.$refs.ThreeGuaranteesSummaryModal.parentQueryData = this.searchDataList
          this.$refs.ThreeGuaranteesSummaryModal.clickRowInfo = obj.row
          this.$refs.ThreeGuaranteesSummaryModal.dialogVisible = true
          this.$refs.ThreeGuaranteesSummaryModal.init()
        })
      }
    },
    cellStyle(obj, context, e) {
      const { canInsert } = obj.column.own
      const validCellValue = (obj.row[obj.column.property] * 1)// 是否是有效值
      if (validCellValue && canInsert) {
        return {
          color: '#4293F4',
          textDecoration: 'underline'
          // cursor: 'pointer'
        }
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
      const param = this.searchDataList
      param['reportCode'] = this.param5.reportCode
      this.tableLoading = true
      HttpModule.queryTableDatas(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.defaultExpandKey = cursionTreeList(res.data.results)
          let sbZbjeBgz = 0
          let sbZxjeBgz = 0
          let sbZbjeByz = 0
          let sbZxjeByz = 0
          let sbZbjeBjbms = 0
          let sbZxjeBjbms = 0
          this.tableData.forEach((item) => {
            if (item.sbZbjeBgz) {
              sbZbjeBgz += item.sbZbjeBgz
            }
            if (item.sbZxjeBgz) {
              sbZxjeBgz += item.sbZxjeBgz
            }
            if (item.sbZbjeByz) {
              sbZbjeByz += item.sbZbjeByz
            }
            if (item.sbZxjeByz) {
              sbZxjeByz += item.sbZxjeByz
            }
            if (item.sbZbjeBjbms) {
              sbZbjeBjbms += item.sbZbjeBjbms
            }
            if (item.sbZxjeBjbms) {
              sbZxjeBjbms += item.sbZxjeBjbms
            }
          })
          this.tableFooterConfig.totalObj.sbZbjeBgz = sbZbjeBgz
          this.tableFooterConfig.totalObj.sbZxjeBgz = sbZxjeBgz
          this.tableFooterConfig.totalObj.sbZbjeByz = sbZbjeByz
          this.tableFooterConfig.totalObj.sbZxjeByz = sbZxjeByz
          this.tableFooterConfig.totalObj.sbZbjeBjbms = sbZbjeBjbms
          this.tableFooterConfig.totalObj.sbZxjeBjbms = sbZxjeBjbms
          this.mainPagerConfig.total = res.data.totalCount
          this.tabStatusNumConfig['1'] = res.data.totalCount
          this.caliberDeclareContent = res.data.description || ''
        } else {
          this.$message.error(res.message)
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
    initParams5() {
      // 初始化param5
      let param5Str = this.$store.state.curNavModule.param5
      if (param5Str && param5Str !== '') {
        let param5Strs = param5Str.split(',')
        param5Strs.forEach(s => {
          let ss = s.split('=')
          let key = ss[0]
          let value = ss[1]
          this.param5[key] = value
        })
      }
    }
  },
  created() {
    this.initParams5()
    // this.params5 = commonFn.transJson(this.$store.state.curNavModule.param5)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    if (this.$store.getters.isSx) {
      this.searchDataList.endTime = this.$XEUtils.toDateString(
        this.$XEUtils.getWhatDay(new Date()),
        'yyyy-MM-dd'
      )
    }
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
