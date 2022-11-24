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
        <template v-if="formVisible">
          <BsTable
            ref="mainTableRef"
            :footer-config="tableFooterConfig"
            :table-columns-config="totalTableColumnsConfig"
            :table-data="tableTotalData"
            :table-config="tableConfig"
            :pager-config="totalPagerConfig"
            :toolbar-config="tableToolbarConfig"
            @onToolbarBtnClick="onToolbarBtnClick"
            @ajaxData="ajaxTotalData"
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
        <template v-else>
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
import { proconf } from './BudgetAccountingWarningDataMager'
import AddDialog from './children/handleDialog'
import HttpModule from '@/api/frame/main/Monitoring/WarningDataMager.js'
import GlAttachment from '../common/GlAttachment'
export default {
  components: {
    AddDialog,
    GlAttachment
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  data() {
    return {
      currentTreeNode: null, // 左侧树选中的节点
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
          label: '待处理',
          code: '0',
          curValue: '0'
        },
        buttonsInfo: null,
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
        }
      },
      buttonsInfo: proconf.statusRightToolBarButton,
      buttons: proconf.statusRightToolBarButton,
      detailButtons: proconf.detailButtons,
      tabStatusNumConfig: {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0
      },
      // BsQuery 查询栏
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
      tableColumnsConfig: proconf.PoliciesTableColumns,
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
      totalPagerConfig: {
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
      dialogTitle: '详细信息',
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
      warningCode: '',
      businessId: '',
      formVisible: true,
      totalTableColumnsConfig: [
        {
          title: '触发菜单名称',
          field: 'businessFunctionName',
          align: 'left'
        },
        {
          title: '预警级别',
          field: 'warnLevel',
          align: 'center',
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' },
          tooltip: true
        },
        {
          title: '监控状态',
          field: 'controlType',
          sortable: true,
          align: 'center',
          combinedType: ['average'],
          editRender: {
            name: '$input',
            defaultValue: 1,
            props: {
              type: 'number',
              placeholder: '请输入金额',
              redonly: true
            }
          }
        },
        {
          title: '预警规则',
          field: 'fiRuleName',
          align: 'left'
        },
        {
          title: '预警数量',
          field: 'count',
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        },
        {
          title: '今日新增',
          field: 'nowCount',
          filters: [{ data: { vals: [], sVal: '' } }],
          filterRender: { name: 'FilterContent' }
        }
        // {
        //   title: '今日新增',
        //   className: 'cred',
        //   headerClassName: 'cred',
        //   field: 'newtimes',
        //   editRender: {
        //     name: '$select',
        //     defaultValue: '教育',
        //     options: [
        //       { value: '教育', label: '教育' },
        //       { value: '科研', label: '科研' },
        //       { value: '军事', label: '军事' }
        //     ],
        //     props: {
        //       placeholder: '请输入资金性质'
        //     }
        //   }
        // },
        // {
        //   title: '监控对象',
        //   field: 'dbname',
        //   editRender: {
        //     name: '$select',
        //     defaultValue: '学校',
        //     options: [
        //       { value: '学校', label: '学校' },
        //       { value: '航天研究所', label: '航天研究所' },
        //       { value: '军事研究所', label: '军事研究所' },
        //       { value: '卫星研究所', label: '卫星研究所' }
        //     ],
        //     props: {
        //       placeholder: '请输入收款机构'
        //     }
        //   }
        // }
      ],
      fiRuleCode: '',
      showGlAttachmentDialog: false,
      agencyCodeList: [],
      selectData: {}
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
          this.radioShow = true
          break
      }
      this.menuName = '预警数据列表'
      this.condition = {}
      this.mainPagerConfig.currentPage = 1
      this.totalPagerConfig.currentPage = 1
      this.refresh()
      this.$refs.mainTableRef.$refs.xGrid.clearScroll()
    },
    // 搜索
    search(val) {
      console.log(val)
      this.searchDataList = val
      this.agencyCodeList = val.agencyCodeList
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
      if (this.searchDataList.status && this.searchDataList.status.trim() !== '') {
        condition.status = this.searchDataList.status
      }
      if (this.searchDataList.businessFunctionCode && this.searchDataList.businessFunctionCode.trim() !== '') {
        condition.businessFunctionCode = this.searchDataList.businessFunctionCode
      }
      if (this.searchDataList.createTime && this.searchDataList.createTime.trim() !== '') {
        let createTime = this.searchDataList.createTime.toString()
        let createTime1 = createTime.substring(0, 10)
        condition.createTime = createTime1
      }
      this.condition = condition
      console.log(this.condition)
      if (this.formVisible) {
        const param = {
          page: this.mainPagerConfig.currentPage, // 页码
          pageSize: this.mainPagerConfig.pageSize, // 每页条数
          handleResult: this.toolBarStatusSelect.curValue,
          businessId: this.businessId,
          'status': this.condition.status ? this.condition.status.toString() : '',
          'payApplyNumber': this.condition.payApplyNumber ? this.condition.payApplyNumber.toString() : '',
          agencyCodeList: this.agencyCodeList === '' ? [] : this.getTrees(this.agencyCodeList),
          'createTime': this.condition.createTime.length !== 0 ? this.condition.createTime.toString() : null,
          businessFunctionName: this.currentTreeNode?.businessName
        }
        this.tableLoading = true
        HttpModule.getTotalTableData(param).then(res => {
          this.tableLoading = false
          if (res.code === '000000') {
            this.tableTotalData = res.data.results
            this.mainPagerConfig.total = res.data.totalCount
            this.tabStatusNumConfig[param.handleResult] = res.data.totalCount
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        const param = {
          page: this.mainPagerConfig.currentPage, // 页码
          pageSize: this.mainPagerConfig.pageSize, // 每页条数
          handleResult: this.toolBarStatusSelect.curValue,
          businessId: this.businessId,
          fiRuleCode: this.fiRuleCode,
          'status': this.condition.status ? this.condition.status.toString() : '',
          'payApplyNumber': this.condition.payApplyNumber ? this.condition.payApplyNumber.toString() : '',
          'createTime': this.condition.createTime.length !== 0 ? this.condition.createTime.toString() : null,
          agencyCodeList: this.agencyCodeList === '' ? [] : this.getTrees(this.agencyCodeList)
        }
        this.tableLoading = true
        HttpModule.queryTableDatas(param).then(res => {
          this.tableLoading = false
          if (res.code === '000000') {
            this.tableData = res.data.results
            this.tableData.forEach(item => {
              item.agency = item.agencyCode + '-' + item.agencyName
            })
            this.mainPagerConfig.total = res.data.totalCount
            this.tabStatusNumConfig[param.handleResult] = res.data.totalCount
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    getTrees(val) {
      let mofDivCodes = []
      if (val.trim() !== '') {
        val.split(',').forEach((item) => {
          mofDivCodes.push(item.split('##')[0])
        })
      }
      return mofDivCodes
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      console.log(obj.code)
      switch (obj.code) {
        // 新增
        case 'handle':
          this.handle(obj, context, e)
          break
        // 查看
        case 'lookDetail':
          this.lookDetail()
          break
        // 刷新
        case 'add-toolbar-refresh':
          this.refresh()
          break
        // 刷新
        case 'operation-toolbar-refresh':
          this.refresh()
          break
        case 'toorbar_checkinfo':
          if (this.$refs.mainTableRef.getSelectionData().length !== 1) {
            this.$message.warning('请选择一条汇总数据查看明细')
            return
          }
          this.formVisible = false
          this.buttonsInfo = this.detailButtons
          this.fiRuleCode = this.$refs.mainTableRef.getSelectionData()[0].fiRuleCode
          this.queryTableDatas()
          break
        case 'toorbar_checktotal':
          this.formVisible = true
          this.buttonsInfo = this.buttons
          this.getTotalTableData()
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
      this.dialogVisible = true
      this.dialogTitle = '详细信息'
    },
    // 处理
    handle() {
      if (this.toolBarStatusSelect.curValue !== '0') {
        this.$message.warning('请选择待处理数据')
        return
      }
      let selection = this.$refs.mainTableRef.getSelectionData()
      if (selection.length !== 1) {
        this.$message.warning('请选择一条数据')
        return
      }
      this.warningCode = selection[0].warningCode
      this.dialogVisible = true
      this.dialogTitle = '处理'
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
      this.currentTreeNode = node
      if (node.children !== null && node.children.length !== 0 && node.id !== '0') {
        return
      }
      if (this.formVisible) {
        const param = {
          page: this.mainPagerConfig.currentPage, // 页码
          pageSize: this.mainPagerConfig.pageSize, // 每页条数
          businessId: this.businessId,
          fiRuleCode: this.fiRuleCode,
          handleResult: this.toolBarStatusSelect.curValue,
          'status': this.condition.status ? this.condition.status.toString() : '',
          'businessFunctionCode': this.condition.businessFunctionCode ? this.condition.businessFunctionCode.toString() : '',
          'createTime': this.condition.createTime ? this.condition.createTime.toString() : null,
          businessFunctionName: this.currentTreeNode?.businessName
        }
        this.tableLoading = true
        HttpModule.getTotalTableData(param).then(res => {
          this.tableLoading = false
          if (res.code === '000000') {
            this.tableTotalData = res.data.results
            this.mainPagerConfig.total = res.data.totalCount
            this.totalPagerConfig.total = res.data.totalCount
            this.tabStatusNumConfig[param.handleResult] = res.data.totalCount
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        const param = {
          page: this.mainPagerConfig.currentPage, // 页码
          pageSize: this.mainPagerConfig.pageSize, // 每页条数
          businessId: this.businessId,
          fiRuleCode: this.fiRuleCode,
          handleResult: this.toolBarStatusSelect.curValue,
          'status': this.condition.status ? this.condition.status.toString() : '',
          'businessFunctionCode': this.condition.businessFunctionCode ? this.condition.businessFunctionCode.toString() : '',
          'createTime': this.condition.createTime ? this.condition.createTime.toString() : null,
          businessFunctionName: node.businessName
        }
        this.tableLoading = true
        HttpModule.queryTableDatas(param).then(res => {
          this.tableLoading = false
          if (res.code === '000000') {
            this.tableData = res.data.results
            this.tableData.forEach(item => {
              item.agency = item.agencyCode + '-' + item.agencyName
            })
            this.mainPagerConfig.total = res.data.totalCount
            this.tabStatusNumConfig[param.handleResult] = res.data.totalCount
          } else {
            this.$message.error(res.message)
          }
        })
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
      console.log('查看附件')
      if (row.attachmentid === null || row.attachmentid === '') {
        this.$message.warning('该数据无附件')
        return
      }
      this.billguid = row.attachmentid
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
      if (this.formVisible) {
        this.getTotalTableData()
      } else {
        this.queryTableDatas()
      }
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      this.queryTableDatas()
    },
    ajaxTotalData({ params, currentPage, pageSize }) {
      this.totalPagerConfig.currentPage = currentPage
      this.totalPagerConfig.pageSize = pageSize
      this.getTotalTableData()
    },
    getAllTotalTableData(params) {
      HttpModule.getAllTotalTableData().then(res => {
        if (res.code === '000000') {
          this.tabStatusNumConfig['0'] = res.data.noDealCount
          this.tabStatusNumConfig['1'] = res.data.dealCount
          this.tabStatusNumConfig['2'] = res.data.noPassCount
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getTotalTableData() {
      const param = {
        page: this.totalPagerConfig.currentPage, // 页码
        pageSize: this.totalPagerConfig.pageSize, // 每页条数
        handleResult: this.toolBarStatusSelect.curValue,
        businessId: this.businessId
      }
      this.tableLoading = true
      HttpModule.getTotalTableData(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableTotalData = res.data.results
          this.totalPagerConfig.total = res.data.totalCount
          this.tabStatusNumConfig[param.handleResult] = res.data.totalCount
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
        businessId: this.businessId,
        fiRuleCode: this.fiRuleCode,
        handleResult: this.toolBarStatusSelect.curValue,
        'status': this.condition.status ? this.condition.status.toString() : '',
        'businessFunctionCode': this.condition.businessFunctionCode ? this.condition.businessFunctionCode.toString() : '',
        'createTime': this.condition.createTime ? this.condition.createTime.toString() : null
      }
      this.tableLoading = true
      let that = this
      HttpModule.queryTableDatas(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          that.tableData = res.data.results
          this.tableData.forEach(item => {
            item.agency = item.agencyCode + '-' + item.agencyName
          })
          that.mainPagerConfig.total = res.data.totalCount
          that.tabStatusNumConfig[param.handleResult] = res.data.totalCount
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
        date: this.$store.state.userInfo.year,
        tokenid: this.$store.getters.getLoginAuthentication.tokenid,
        appguid: 'apaas',
        year: this.$store.state.userInfo.year,
        mofDivCode: this.$store.state.userInfo.province,
        parameters: {}
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
        if (item.children) {
          that.getChildrenNewData1(item.children)
        }
      })

      return datas
    }
  },
  mounted() {
  },
  created() {
    // this.params5 = commonFn.transJson(this.$store.state.curNavModule.param5)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.getAllTotalTableData()
    this.getAgency()
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
