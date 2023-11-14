<!-- 预算执行预警数据管理 -->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTap></template>
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          :is-open="isShowQueryConditions"
          :buttons-info="buttonsInfo"
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
        <BsBossTree
          ref="leftTree"
          open-loading
          :defaultexpandedkeys="['7']"
          style="overflow: hidden"
          :is-server="true"
          :ajax-type="treeAjaxType"
          :server-uri="treeServerUri"
          :datas="treeData"
          :queryparams="treeQueryparams"
          :global-config="treeGlobalConfig"
          :clickmethod="onClickmethod"
        />
      </template>
      <template v-slot:mainForm>
        <template>
          <BsTable
            ref="mainTableRef"
            :table-columns-config="tableColumnsConfig"
            :table-data="tableData"
            v-bind="detailTableProperty"
            :table-config="tableConfig"
            :pager-config="mainPagerConfig"
            :toolbar-config="tableToolbarConfig"
            @onToolbarBtnClick="onToolbarBtnClick"
            @ajaxData="ajaxTableData"
          >
            <template v-slot:toolbarSlots>
              <div class="table-toolbar-left">
                <div v-if="leftTreeVisible === false" class="table-toolbar-contro-leftvisible" @click="leftTreeVisible = true"></div>
                <div class="table-toolbar-left-title">
                  <span class="fn-inline">{{ menuNames }}</span>
                  <i class="fn-inline"></i>
                </div>
              </div>
            </template>
          </BsTable>
        </template>
      </template>
    </BsMainFormListLayout>
    <BsOperationLog :logs-data="logData" :show-log-view="showLogView" />
    <AddDialog
      v-if="dialogVisible"
      :title="dialogTitle"
      :warning-code="warningCode"
      :fi-rule-code="fiRuleCode"
      :is-need-fi-rule-code="isNeedFiRuleCode"
    />
    <BatchHandleDialog
      v-if="batchDialogVisible"
      :title="dialogTitle"
      :warning-info-id="warningInfoId"
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
import { proconf } from './BudgetAccountingWarningBatchManage'
import AddDialog from './children/handleDialog'
import BatchHandleDialog from './children/batchHandleDialog'
import HttpModule from '@/api/frame/main/Monitoring/WarningDataMager.js'
import GlAttachment from '../common/GlAttachment'
export default {
  components: {
    AddDialog,
    GlAttachment,
    BatchHandleDialog
  },
  computed: {
    tableColumnsConfig() {
      let defaultColumns = proconf.PoliciesTableColumns
      if (this.$store.getters.isSx) {
        const diffItemList = ['govEconomyType', 'deptEconomyType']
        return defaultColumns.map(item => {
          if (diffItemList.includes(item.field)) {
            const key1 = item.field.replace('Type', 'Code')
            const key2 = item.field.replace('Type', 'Name')
            return {
              ...item,
              formatter({ row }) {
                return row[key1] && row[key2] ? `${row[key1]}-${row[key2]}` : row[key2]
              }
            }
          }
          return item
        })
      }
      return defaultColumns
    },
    detailTableProperty() {
      const property = {
        footerConfig: {
          combinedType: [
            'total'
          ],
          showFooter: false
        }
      }
      if (this.$store.getters.isSx) {
        property.footerConfig.showFooter = true
      }
      return property
    }
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  data() {
    return {
      controlTypeByNumber: '',
      // 表尾合计
      footerConfig: {
        showFooter: true,
        totalObj: {
          count: 0,
          nowCount: 0
        },
        combinedType: ['switchTotal']
      },
      flag: 2,
      isNeedFiRuleCode: true,
      isShowQueryConditions: true,
      radioShow: true,
      breakRuleVisible: false,
      treeTypeConfig: {
        curRadio: 'AGENCY'
      },
      treeGlobalConfig: {
        inputVal: ''
      },
      treeQueryparams: { },
      treeServerUri: 'large-monitor-platform/lmp/businessFunctions/getBusinessTree/7',
      treeAjaxType: 'post',
      treeData: [],
      leftTreeVisible: false,
      // 头部工具栏 BsTabPanel config
      toolBarStatusBtnConfig: {
        changeBtns: true,
        buttons: proconf.batchToolBarStatusButtons,
        curButton: {
          type: 'button',
          iconName: 'base-all.png',
          iconNameActive: 'base-all-active.png',
          iconUrl: '',
          label: '待处理',
          code: '0',
          curValue: '0'
        },
        buttonsInfo: null,
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
        }
      },
      buttonsInfo: proconf.detailButtons,
      buttons: proconf.statusRightToolBarButton,
      detailButtons: proconf.detailButtons,
      tabStatusNumConfig: {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0
      },
      // BsQuery 查询栏
      warnLevel: '3',
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      toolBarStatusSelect: {
        type: 'button',
        iconName: 'base-all.png',
        iconNameActive: 'base-all-active.png',
        iconUrl: '',
        label: '待处理',
        code: '0',
        curValue: '0'
      },
      // table 相关配置
      tableLoading: false,
      tableData: [],
      tableTotalData: [],
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
      batchDialogVisible: false,
      dialogTitle: '详细信息',
      addTableData: [],
      modifyData: {},
      // 请求 & 角色权限相关配置
      menuName: '',
      menuNames: '',
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
      warningCode: '',
      businessId: '',
      formVisible: true,

      fiRuleCode: '',
      showGlAttachmentDialog: false,
      agencyCodeList: [],
      selectData: {},
      warningInfoId: []
    }
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
    deepCopy(obj) {
      // 深拷贝通用方法
      let me = this
      if (typeof obj !== 'object' || obj === null) return obj
      let newObj = obj instanceof Array ? [] : {}
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] =
            typeof obj[key] === 'object' ? me.deepCopy(obj[key]) : obj[key]
        }
      }
      return newObj
    },
    // 切换状态栏
    onStatusTabClick(obj) {
      if (!obj.type) {
        this.operationToolbarButtonClickEvent(obj)
        return
      }
      this.toolBarStatusSelect = obj
      this.menuNames = '预警数据列表'
      this.condition = {}
      this.mainPagerConfig.currentPage = 1
      this.refresh()
      this.$refs.mainTableRef.$refs.xGrid.clearScroll()
    },
    // 搜索
    search(val) {
      this.searchDataList.agencyCodeList = val.agencyCodeList_code__multiple
      this.searchDataList.payApplyNumber = val.payApplyNumber
      this.searchDataList.fiRuleName = val.fiRuleName
      this.searchDataList.regulationClassList = val.regulationClass_code__multiple
      this.queryTableDatas()
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      switch (obj.code) {
        // 查看
        case 'lookDetail':
          this.lookDetail()
          break
        case 'batch-handle':
          this.handle()
          break
        case 'batch-revoke':
          this.revoke()
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
    lookDetail() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.selectData = selection[0]
      this.warningCode = selection[0].warningCode
      this.fiRuleCode = selection[0].fiRuleCode
      this.dialogVisible = true
      this.dialogTitle = '详细信息'
    },
    // 批量处理
    handle() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length === 0) {
        this.$message.warning('请至少选择一条数据！')
        return
      }
      const tempWarnIdList = Array.from(new Set(selection.map(item => item.warningInfoId)))
      this.warningInfoId = tempWarnIdList
      this.batchDialogVisible = true
      this.dialogTitle = '处理'
    },
    // 单笔撤销
    revoke() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据进行撤销操作！')
        return
      }
      const tempWarnIdList = Array.from(new Set(selection.map(item => item.warningInfoId)))
      this.warningInfoId = tempWarnIdList
      this.batchDialogVisible = true
      this.dialogTitle = '处理'
    },
    changeVisible(val) {
      this.breakRuleVisible = val
    },
    // table 右侧操作按钮
    onOptionRowClick({ row, optionType }, context) {
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
      if (node.children !== null && node.children.length !== 0 && node.id !== '0') {}
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
      if (row.attachmentid === null || row.attachmentid === '') {
        this.$message.warning('该数据无附件')
        return
      }
      this.billguid = row.attachmentid
      this.showGlAttachmentDialog = true
    },
    // 刷新按钮 刷新查询栏，提示刷新 table 数据
    refresh() {
      this.getAgency()
      this.queryConfig = proconf.highQueryConfig
      this.searchDataList = proconf.highQueryData
      this.queryTableDatas()
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      this.queryTableDatas()
    },
    // 查询 table 数据
    queryTableDatas() {
      const param = {
        ...this.searchDataList,
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        businessId: this.businessId,
        handleResult: this.toolBarStatusSelect.curValue,
        agencyCodeList: this.agencyCodeList,
        controlType: this.controlTypeByNumber,
        warnLevel: this.warnLevel,
        menuName: this.menuName
      }
      if (this.toolBarStatusSelect.curValue === '4') {
        param.voidOrNot = 1
      }
      this.tableLoading = true
      let that = this
      HttpModule.queryTableDatas(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          that.tableData = res.data.results
          this.tableData.forEach(item => {
            item.agency = item.agencyCode + '-' + item.agencyName
            item.deptEconomyCode = item.depBgtEcoCode
            item.deptEconomyName = item.depBgtEcoName
            item.govEconomyCode = item.govBgtEcoCode
            item.govEconomyName = item.govBgtEcoName
          })
          that.mainPagerConfig.total = res.data.totalCount
          const param = {
            fiRuleCode: '',
            menuNameList: this.menuName,
            flag: this.flag,
            warnLevel: this.warnLevel
          }
          HttpModule.getAllTotalTableData(param).then(res => {
            if (res.code === '000000') {
              this.tabStatusNumConfig['0'] = res.data.noDealCount
              this.tabStatusNumConfig['1'] = res.data.dealCount
              this.tabStatusNumConfig['2'] = res.data.noPassCount
              this.tabStatusNumConfig['4'] = res.data.obsoleteCount
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          that.$message.error(res.message)
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
    getAgency() {
      const param = {
        wheresql: 'and province =' + this.$store.state.userInfo.province,
        elementCode: 'AGENCY',
        year: this.$store.state.userInfo.year,
        province: this.$store.state.userInfo.province
      }
      HttpModule.getTreewhere(param).then(res => {
        let treeResdata = this.getChildrenNewData1(res.data)
        this.queryConfig[3].itemRender.options = treeResdata
      })
    },
    getChildrenNewData1(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.text
        if (!item.label) {
          item.label = item.code + '-' + item.name
        }
        if (item.children) {
          that.getChildrenNewData1(item.children)
        }
      })
      return datas
    },
    getRegulation() {
      let self = this
      HttpModule.getTree(0).then(res => {
        if (res.code === '000000') {
          let treeResdata = this.getRegulationChildrenData1(res.data)
          self.queryConfig[1].itemRender.options = treeResdata
        } else {
          this.$message.error('下拉树加载失败')
        }
      })
    },
    getRegulationChildrenData1(datas) {
      let that = this
      datas.forEach(item => {
        // item.code = item.code
        item.name = item.ruleName
        item.label = item.code + '-' + item.ruleName
        if (item.children.length > 0) {
          that.getRegulationChildrenData1(item.children)
          item.leaf = false
        } else {
          item.leaf = true
        }
      })
      return datas
    }
  },
  mounted() {
    this.getAgency()
    this.queryTableDatas()
  },
  created() {
    this.params5 = this.$store.state.curNavModule.param5
    // this.params5 = commonFn.transJson(this.$store.state.curNavModule.param5)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.getRegulation()
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
