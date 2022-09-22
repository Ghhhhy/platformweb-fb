<!-- 监控事项申报-部门 -->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout><!-- <BsMainFormListLayout :left-visible.sync="leftTreeVisible"> -->
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
      <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
      <!-- <template v-slot:mainTree>
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
          open-loading
          :defaultexpandedkeys="['0']"
          style="overflow: hidden"
          :is-server="false"
          :ajax-type="treeAjaxType"
          :server-uri="treeServerUri"
          :datas="treeData"
          :queryparams="treeQueryparams"
          :global-config="treeGlobalConfig"
          :clickmethod="onClickmethod"
        />
      </template> -->
      <template v-slot:mainForm>
        <BsTable
          ref="mainTableRef"
          v-loading="tableLoading"
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
      :declare-code="declareCode"
    />
    <LookDialog
      v-if="lookdialogVisible"
      title="查看"
      :declare-code="declareCode"
    />
    <!-- 附件弹框 -->
    <BsAttachment v-if="showAttachmentDialog" refs="attachmentboss" :user-info="userInfo" :billguid="billguid" />
    <GlAttachment
      v-if="showGlAttachmentDialog"
      :user-info="userInfo"
      :billguid="billguid"
    />
  </div>
</template>

<script>
import { proconf } from './DeclarationOfMonitoringItemsDepartment'
import AddDialog from './children/addDialog'
import LookDialog from './children/lookDialog'
import HttpModule from '@/api/frame/main/Monitoring/Declaration.js'
import GlAttachment from '../common/GlAttachment'
export default {
  components: {
    AddDialog,
    GlAttachment,
    LookDialog
  },
  watch: {
  },
  data() {
    return {
      lookdialogVisible: false,
      showGlAttachmentDialog: false,
      declareCode: '',
      radioShow: true,
      breakRuleVisible: false,
      treeTypeConfig: {
        curRadio: 'AGENCY'
      },
      treeGlobalConfig: {
        inputVal: ''
      },
      treeQueryparams: { elementcode: 'AGENCY', province: '610000000', year: '2021', wheresql: '' },
      treeServerUri: 'http://10.77.18.172:32303/v2/basedata/simpletree/where',
      treeAjaxType: 'get',
      treeData: [],
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
          label: '待送审',
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
        label: '待送审',
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
      dialogTitle: '新增',
      addTableData: [],
      modifyData: {},
      // 请求 & 角色权限相关配置
      menuName: '监控事项列表',
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
      agencyCodes: []
    }
  },
  mounted() {
  },
  methods: {
    getChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.code + '-' + item.name
        if (item.children) {
          that.getChildrenData(item.children)
        }
      })

      return datas
    },
    getLeftTreeData() {
      let that = this
      HttpModule.getLeftTree(that.treeQueryparams).then(res => {
        if (res.rscode === '100000') {
          let treeResdata = that.getChildrenData(res.data)
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
          that.treeData = treeResdata
        } else {
          this.$message.error('左侧树加载失败')
        }
      })
    },
    // 切换状态栏
    onStatusTabClick(obj) {
      if (!obj.type) {
        this.operationToolbarButtonClickEvent(obj)
        return
      }
      this.toolBarStatusSelect = obj
      switch (obj.curValue) {
        // 待送审
        case '1':
          this.radioShow = true
          break
        // 已送审
        case '2':
          this.radioShow = true
          break
        // 全部
        case '3':
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
        // 新增
        case 'add':
          this.onAddToolbarClickAdd(obj, context, e)
          break
        // 送审
        case 'approval':
          this.approval(obj, context, e)// 经过监控的送审
          break
        // 撤销
        case 'revoke':
          this.revokeData(obj, context, e)
          break
        // 删除
        case 'del':
          this.delPolicies(obj, context, e)
          break
        // 查看
        case 'check':
          this.lookData()
          break
        // 修改
        case 'change':
          this.changePolices()
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
    // 查看
    lookData() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.lookdialogVisible = true
      this.declareCode = selection[0].declareCode
    },
    // 送审
    approval() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length < 1) {
        this.$message.warning('请选择数据')
        return
      }
      let declareCodes = []
      selection.forEach(item => {
        declareCodes.push(item.declareCode)
      })
      let param = {
        'declareCodes': declareCodes,
        'flowOperation': 1,
        'flowOpinion': '',
        menuId: this.$store.state.curNavModule.guid,
        menuName: this.$store.state.curNavModule.name
      }
      this.$confirm('是否确定送审 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableLoading = true
        HttpModule.flow(param).then(res => {
          this.tableLoading = false
          if (res.code === '000000') {
            this.$message.success('送审成功')
            this.queryTableDatas()
            this.queryTableDatasCount()
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
    // 撤销
    revokeData() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length < 1) {
        this.$message.warning('请选择数据')
        return
      }
      let declareCodes = []
      selection.forEach(item => {
        declareCodes.push(item.declareCode)
      })
      const param = {
        menuId: this.$store.state.curNavModule.guid,
        declareCodes: declareCodes,
        menuName: this.$store.state.curNavModule.name
      }
      this.$confirm('是否确定撤销 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableLoading = true
        HttpModule.flowRevoke(param).then(res => {
          this.tableLoading = false
          if (res.code === '000000') {
            this.$message.success('撤销成功')
            this.queryTableDatas()
            this.queryTableDatasCount()
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
    // 删除
    delPolicies() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length < 1) {
        this.$message.warning('请选择数据')
        return
      }
      let declareCodes = []
      selection.forEach(item => {
        declareCodes.push(item.declareCode)
      })
      let param = {
        'declareCodes': declareCodes
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
            this.queryTableDatasCount()
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
      this.declareCode = selection[0].declareCode
      this.dialogVisible = true
      this.dialogTitle = '修改'
    },
    changeVisible(val) {
      console.log(val, '输出')
      this.breakRuleVisible = val
    },
    // table 右侧操作按钮
    onOptionRowClick({ row, optionType }, context) {
      // console.log(context.$parent.$parent.$parent)
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
      // if (node.code === 'root' || node.levelno === 1) {
      //   return
      // }
      if (node.id !== '0') {
        let key =
          this.$refs.treeSet.treeConfigIn.curRadio.toLowerCase() + '_code'
        this.condition[key] = node.code
      } else {
        this.condition = {}
      }
      console.log(this.condition)
      this.agencyCodes = []
      this.agencyCodes.push(this.condition.agency_code)
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
      console.log('查看附件')
      if (row.declareCode === null || row.declareCode === '') {
        this.$message.warning('该数据无附件')
        return
      }
      this.billguid = row.declareCode
      // this.showAttachmentDialog = true
      this.showGlAttachmentDialog = true
    },
    // 查看附件
    showAttachment1(row) {
      this.billguid = row
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
      this.agencyCodes = []
      this.manageMofCodes = []
      this.mofDivCodes = []
      this.queryTableDatas()
      this.queryTableDatasCount()
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
      if (this.addTableData.length > 0) {
        this.addTableData = []
      }
      this.dialogTitle = '新增'
      this.addTableData.push(row)
      this.dialogVisible = true
    },
    // 点击新增
    onAddToolbarClickAdd(obj, context, e) {
      this.declareCode = ''
      this.dialogVisible = true
      this.dialogTitle = '新增'
    },
    queryTableDatasCount() {
      const params = {
        menuId: this.$store.state.curNavModule.guid
      }
      HttpModule.queryTableDatasCount(params).then(res => {
        if (res.code === '000000') {
          this.tabStatusNumConfig['1'] = res.data.waitFlowCount
          this.tabStatusNumConfig['2'] = res.data.alreadyFlowCount
          this.tabStatusNumConfig['3'] = res.data.allFlowCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 查询 table 数据
    queryTableDatas() {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        declareName: '',
        agencyCodes: this.agencyCodes,
        manageMofCodes: [],
        mofDivCodes: [],
        menuId: this.$store.state.curNavModule.guid,
        flowStatus: this.toolBarStatusSelect.curValue
      }
      this.tableLoading = true
      HttpModule.queryTableDatas(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 操作日志
    queryActionLog(row) {
      const param = {
        menuId: this.$store.state.curNavModule.guid,
        menuName: this.$store.state.curNavModule.name,
        declareCode: row.declareCode
      }
      HttpModule.queryActionLog(param).then(res => {
        this.logData = res.data
        console.log(this.logData)
        this.showLogView = true
      })
    }
  },
  created() {
    // this.params5 = commonFn.transJson(this.$store.state.curNavModule.param5)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.getLeftTreeData()
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
