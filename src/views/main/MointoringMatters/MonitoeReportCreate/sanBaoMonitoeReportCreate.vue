<!-- 监控规则查看 -->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTap></template>
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          show-zero
          :show-num="true"
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
      <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
      <template v-slot:mainTree>
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
    />
    <GlAttachment
      v-if="showGlAttachmentDialog"
      :user-info="userInfo"
      :billguid="billguid"
    />
    <!-- 附件弹框 -->
    <BsAttachment v-if="showAttachmentDialog" refs="attachmentboss" :user-info="userInfo" :billguid="billguid" />
    <FilePreview
      v-if="filePreviewDialogVisible"
      :visible.sync="filePreviewDialogVisible"
      :file-guid="fileGuid"
      :app-id="appId"
      :del-id="delId"
      :file-name="propsFileName"
      :preview-year="previewYear"
      :preview-start-month="previewStartMonth"
      :preview-end-month="previewEndMonth"
      :province-name-list="provinceNameList"
      :province-code="provinceCode"
      :province-name="provinceName"
      :report-type="reportType"
    />
  </div>
</template>

<script>
import { proconf } from './sanBaoMonitoeReportCreate'
import AddDialog from './children/sangongaddDialog'
import HttpModule from '@/api/frame/main/Monitoring/MonitoeReportCreate.js'
import GlAttachment from '../common/GlAttachment'
import FilePreview from './children/filePreview.vue'
const routerMap = {
  'sanGongMonitoeReportCreate': {
    axiosStr: 'sangongCreate',
    code: '2'
  },
  'SpeProMonitoeReportCreate': {
    axiosStr: 'speProCreate',
    code: '3'
  },
  'sanBaoMonitoeReportCreate': {
    axiosStr: 'sanbaoCreate',
    code: '4'
  },
  'dynamicMonitoeReportCreate': {
    axiosStr: 'dynamicCreate',
    code: '5'
  },
  'directFundsCreate': {
    axiosStr: 'directFundsCreate',
    code: '6'
  }
}
export default {
  components: {
    AddDialog, GlAttachment, FilePreview
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  data() {
    return {
      // BsQuery 查询栏
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      radioShow: true,
      breakRuleVisible: false,
      treeGlobalConfig: {
        inputVal: ''
      },
      // treeServerUri: 'pay-clear-service/v2/lefttree',
      treeQueryparams: { elementcode: 'admdiv', province: '610000000', year: '2021', wheresql: 'and code like \'' + 61 + '%\'' },
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
      // menuName: '监控规则列表',
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
      regulationModelName: '',
      DetailData: {},
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
      treeType: '1',
      codeList: [],
      showGlAttachmentDialog: false,
      node: {},
      filePreviewDialogVisible: false,
      fileGuid: '',
      delId: '',
      year: '',
      startMonth: '',
      endMonth: '',
      createTime: '',
      fileName: '',
      propsFileName: '',
      createPerson: '',
      previewYear: '',
      previewStartMonth: '',
      previewEndMonth: '',
      previewCode: '',
      previewName: '',
      provinceNameList: '',
      provinceCode: '',
      provinceName: '',
      reportType: ''
    }
  },
  mounted() {
  },

  methods: {
    search(obj) {
      console.log(obj)
      this.year = Number(obj.year)
      this.startMonth = Number(obj.startMonth)
      this.endMonth = Number(obj.endMonth)
      this.createTime = obj.createTime.substring(0, 10)
      this.fileName = obj.fileName
      this.createPerson = obj.createPerson
      if (this.createTime) {
        this.createTime = this.createTime + ' 00:00:00'
      }
      this.queryTableDatas()
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
      switch (obj.code) {
        // 全部
        case 'check':
          break
      }
      this.regulationStatus = obj.curValue
      this.queryTableDatas()
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      switch (obj.code) {
        case 'create':
          this.create()
          break
        case 'delete':
          this.delete()
          break
        default:
          break
      }
    },
    create() {
      this.dialogVisible = true
    },
    delete() {
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length === 0) {
        this.$message.warning('请选择数据')
        return
      }
      this.$confirm('是否确定删除 ?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = []
        selection.forEach(item => {
          ids.push(item.id)
        })
        const params = {
          ids: ids
        }
        this.tableLoading = true
        HttpModule.delete(params).then(res => {
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
      this.node = node.node
      let code = node.node.code
      console.log(node)
      this.codeList = []
      let treeData = node.treeData
      this.getItem(code, treeData)
      console.log(this.codeList)
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        'regulationType': this.regulationType, // 规则类型：1.系统级  2.财政级  3.部门级
        'warningLevel': this.warningLevel, // 预警级别
        'handleType': this.handleType, // 处理方式
        'businessModelCode': '', // 业务模块
        'businessFeaturesCode': '', // 业务功能
        'regulationStatus': this.regulationStatus, // 规则状态：1.新增  2.送审  3.审核
        'isEnable': this.isEnable,
        'regulationName': this.regulationName,
        'regulationModelName': this.regulationModelName,
        id: this.condition.agency_code,
        menuType: 1,
        province: '',
        mofDivCodeList: this.codeList,
        reportType: routerMap[this.$route.name].code
      }
      if (this.leftNode.businessType === 2) {
        param.businessModelCode = this.leftNode.code
      } else if (this.leftNode.businessType === 3) {
        param.businessFeaturesCode = this.leftNode.code
      }
      this.tableLoading = true
      HttpModule.queryMonitorTableDatas(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
        } else {
          this.$message.error(res.result)
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
      console.log('查看附件')
      if (row.regulationsCode === null || row.regulationsCode === '') {
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
        year: this.year,
        startMonth: this.startMonth,
        // endMonth: this.endMonth,
        createTime: this.createTime,
        fileName: this.fileName,
        createPerson: this.createPerson,
        reportType: routerMap[this.$route.name].code,
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize // 每页条数
      }
      if (this.leftNode.businessType === 2) {
        param.businessModelCode = this.leftNode.code
      } else if (this.leftNode.businessType === 3) {
        param.businessFeaturesCode = this.leftNode.code
      }
      this.tableLoading = true
      HttpModule.queryMonitorTableDatas(param).then(res => {
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
    getLeftTreeData() {
      console.log(this.userInfo)
      let params = this.$store.getters.treeQueryparamsCom
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
    }
  },
  created() {
    let date = new Date()
    let year = date.toLocaleDateString().split('/')[0]
    let month = date.toLocaleDateString().split('/')[1]
    let day = date.toLocaleDateString().split('/')[2]
    this.searchDataList.year = year
    this.searchDataList.createTime = year + '-' + month + '-' + day
    this.searchDataList.endMonth = month
    // this.params5 = commonFn.transJson(this.$store.state.curNavModule.param5)
    this.menuId = this.$store.state.curNavModule.guid
    this.menuName = this.$store.state.curNavModule.name
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.getLeftTreeData()
    // this.queryTableDatas()
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
