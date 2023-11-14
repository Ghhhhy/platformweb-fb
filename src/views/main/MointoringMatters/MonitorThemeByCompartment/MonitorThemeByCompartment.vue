<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout>
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
      <template v-slot:mainForm>
        <BsTable
          ref="mainTableRef"
          :footer-config="tableFooterConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :table-config="tableConfig"
          :pager-config="false"
          :toolbar-config="tableToolbarConfig"
          :cell-style="cellStyle"
          @onToolbarBtnClick="onToolbarBtnClick"
          @ajaxData="ajaxTableData"
          @cellClick="cellClick"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div class="table-toolbar-left-title">
                <span class="fn-inline">{{ menuName }}</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <violationsDialog
      v-if="violationsView"
      :title="dialogTitle"
      :status="status"
      :mof-div-code="mofDivCode"
      :regulation-class="regulationClass"
    />
    <BsOperationLog :logs-data="logData" :show-log-view="showLogView" />
    <!-- 附件弹框 -->
    <BsAttachment v-if="showAttachmentDialog" refs="attachmentboss" :user-info="userInfo" :billguid="billguid" />
  </div>
</template>

<script>
import violationsDialog from './children/violationsDialog.vue'
import { proconf } from './MonitorThemeByCompartment'
import HttpModule from '@/api/frame/main/Monitoring/MonitorThemeByCompartment.js'

export default {
  components: { violationsDialog },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  data() {
    return {
      startTime: '',
      endTime: '',
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
      dialogTitle: '预警明细查看',
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
      showViolations: false,
      fiRuleCode: '',
      fiRuleName: '',
      mofDivName: '',
      regulationType: '',
      status: '',
      violationsView: false,
      regulationClass: '',
      treeQueryparams: { elementcode: 'admdiv', province: this.$store.state.userInfo.province, year: this.$store.state.userInfo.year, wheresql: 'and code like \'' + 61 + '%\'' },
      fiscalYear: '',
      mofDivCodeList: [],
      regulationClassQuery: [],
      agencyCodeList: []
    }
  },
  mounted() {
  },
  methods: {
    cellStyle ({ row, rowIndex, column }) {
      if (
        column.property !== undefined &&
        column.property !== 'mofDivName' &&
        column.property !== 'wholeCount' &&
        column.property !== 'wholeHandleCount' &&
        column.property !== 'wholeNoHandleCount' &&
        column.property !== 'orderCorrectionCount' &&
        column.property !== 'orderCorrectionAmount' &&
        column.property !== 'correctedCount' &&
        column.property !== 'correctedAmount'
      ) {
        return {
          fontWeight: '700'
        }
      }
    },
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
          this.menuName = '监控主题分析（区划+主题）'
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
      this.agencyCodeList = val.agencyCodeList_code__multiple
      this.fiscalYear = val.fiscalYear
      this.mofDivCodeList = val.mofDivCodeList_code__multiple
      this.regulationClassQuery = val.regulationClass_code__multiple
      if (val.endTime.length !== 0) {
        this.endTime = val.endTime.toString().substring(0, 10) + ' 23:59:59'
      } else {
        this.endTime = ''
      }
      if (val.startTime.length !== 0) {
        this.startTime = val.startTime.toString().substring(0, 10) + ' 00:00:00'
      } else {
        this.startTime = ''
      }
      this.queryTableDatas()
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
      console.log(obj.code)
      switch (obj.code) {
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
    // 查看附件
    showAttachment(row) {
      this.billguid = row.attachment_id
      this.showAttachmentDialog = true
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      console.log(obj)
      let key = obj.column.property
      console.log(key, obj.row)
      if (
        key !== 'mofDivName' &&
        key !== 'wholeCount' &&
        key !== 'wholeHandleCount' &&
        key !== 'wholeNoHandleCount' &&
        key !== 'orderCorrectionCount' &&
        key !== 'orderCorrectionAmount' &&
        key !== 'correctedCount' &&
        key !== 'correctedAmount'
      ) {
        if (obj.column.title === '累计预警') {
          this.status = ''
        } else if (obj.column.title === '已处理') {
          this.status = '2'
        } else {
          this.status = '1'
        }
        this.regulationClass = key.substring(0, 4)
        this.mofDivCode = obj.row.mofDivCode
        this.violationsView = true
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
    // 查询 table 数据
    queryTableDatas(fiscalYear) {
      const param = {
        agencyCodeList: this.agencyCodeList,
        mofDivCodeList: this.mofDivCodeList,
        // regulationClass: this.regulationClassQuery || '0106',
        fiscalYear: this.fiscalYear || this.$store.state.userInfo.year,
        'regulationClassList': this.regulationClassQuery,
        jurisdiction: this.$store.getters.getIsJurisdiction,
        startTime: this.startTime,
        endTime: this.endTime
      }
      this.tableLoading = true
      this.tableColumnsConfig = [
        {
          title: '地区名称',
          field: 'mofDivName',
          width: '150',
          sortable: false,
          align: 'left'
        },
        {
          title: '整体预警情况',
          field: 'totals',
          sortable: false,
          align: 'left',
          children: [
            {
              title: '累计预警',
              field: 'wholeCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'wholeHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '未处理',
              field: 'wholeNoHandleCount',
              width: '150',
              align: 'center'
            }
          ]
        },
        {
          title: '监控问询情况',
          field: 'thing',
          sortable: false,
          align: 'left',
          children: [
            {
              title: '累计问询单',
              field: 'correctedCount',
              width: '150',
              align: 'center'
            },
            {
              title: '涉及金额',
              field: 'correctedAmount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理',
              field: 'orderCorrectionCount',
              width: '150',
              align: 'center'
            },
            {
              title: '已处理涉及金额',
              field: 'orderCorrectionAmount',
              width: '150',
              align: 'center'
            }
          ]
        }
      ]
      HttpModule.queryTableDatas(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          const columns = [...proconf.PoliciesTableColumns]
          columns.splice(2, 0, ...res.data?.titleList?.map(item => {
            return this.generateColumn(item)
          }))
          this.tableColumnsConfig = columns

          this.tableData = res.data.dataList
          this.tableData.forEach(item => {
            if (
              item.mofDivCode !== null && item.mofDivCode !== ''
            ) {
              if (item.mofDivCode.endsWith('00000')) {
                item.mofDivName = '' + item.mofDivName
              } else if (item.mofDivCode.endsWith('000')) {
                item.mofDivName = '    ' + item.mofDivName
              } else {
                item.mofDivName = '          ' + item.mofDivName
              }
            }
          })
          this.mainPagerConfig.total = res.data.dataList.length
          this.tabStatusNumConfig['1'] = res.data.dataList.length
        } else {
          this.$message.error(res.message)
        }
      })
    },
    generateColumn({ regulationClassName, regulationClass, warnNoHandleCount, warnHandleCount, warnCount }) {
      return {
        title: regulationClassName,
        field: regulationClass,
        sortable: false,
        align: 'center',
        children: [
          {
            title: '累计预警',
            field: warnCount,
            width: '150',
            align: 'center'
          },
          {
            title: '已处理',
            field: warnHandleCount,
            width: '150',
            align: 'center'
          },
          {
            title: '未处理',
            field: warnNoHandleCount,
            width: '150',
            align: 'center'
          }
        ]
      }
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
    },
    getRegulation() {
      HttpModule.getTree(0).then(res => {
        if (res.code === '000000') {
          let treeResdata = this.getRegulationChildrenData1(res.data)
          this.queryConfig[2].itemRender.options = treeResdata
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
    },
    getLeftTreeData() {
      let that = this
      let params = {}
      if (this.$store.state.userInfo.province.substring(2, 9) === '0000000') {
        params = {
          elementcode: 'admdiv',
          province: this.$store.state.userInfo.province,
          year: this.$store.state.userInfo.year,
          wheresql: 'and code like \'' + this.$store.state.userInfo.province.substring(0, 2) + '%\'' + 'and code not like \'%998\''
        }
      } else if (
        this.$store.state.userInfo.province.substring(4, 9) === '00000' && this.$store.state.userInfo.province.substring(2, 9) !== '0000000'
      ) {
        params = {
          elementcode: 'admdiv',
          province: this.$store.state.userInfo.province,
          year: this.$store.state.userInfo.year,
          wheresql: 'and code like \'' + this.$store.state.userInfo.province.substring(0, 4) + '%\'' + 'and code not like \'%998\''
        }
      } else {
        params = {
          elementcode: 'admdiv',
          province: this.$store.state.userInfo.province,
          year: this.$store.state.userInfo.year,
          wheresql: 'and code like \'' + this.$store.state.userInfo.province.substring(0, 6) + '%\'' + 'and code not like \'%998\''
        }
      }
      HttpModule.getLeftTree(params).then(res => {
        if (res.rscode === '100000') {
          console.log(this.queryConfig)
          let treeResdata = that.getRegulationChildrenData(res.data)
          this.queryConfig[1].itemRender.options = treeResdata
        } else {
          this.$message.error('左侧树加载失败')
        }
      })
    },
    getRegulationChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.text
        if (item.children && item.children.length > 0) {
          that.getRegulationChildrenData(item.children)
          item.leaf = false
        } else {
          item.leaf = true
        }
      })

      return datas
    }
  },
  created() {
    let date = new Date()
    let year = date.toLocaleDateString().split('/')[0]
    this.searchDataList.fiscalYear = year
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.params5 = this.$store.state.curNavModule.param5
    this.getLeftTreeData()
    this.getRegulation()
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
