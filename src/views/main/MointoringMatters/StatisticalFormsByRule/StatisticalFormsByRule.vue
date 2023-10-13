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
          :pager-config="mainPagerConfig"
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
    <DetailDialog
      v-if="showViolations"
      :title="dialogTitle"
      :fi-rule-code="fiRuleCode"
      :status="status"
      :regulation-type="regulationType"
      :mof-div-code="mofDivCode"
      :fiscal-year="fiscalYear"
      :agency-code-list="agencyCodeList"
      :regulation-class="params5"
      :warn-level="warnLevel"
      :search-list="searchDataList"
    />
    <BsOperationLog :logs-data="logData" :show-log-view="showLogView" />
    <!-- 附件弹框 -->
    <BsAttachment v-if="showAttachmentDialog" refs="attachmentboss" :user-info="userInfo" :billguid="billguid" />
  </div>
</template>

<script>
import DetailDialog from './children/detailDialog.vue'
import { proconf } from './StatisticalFormsByRule'
import HttpModule from '@/api/frame/main/Monitoring/StatisticalFormsByRule.js'

export default {
  components: { DetailDialog },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  data() {
    return {
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
      tableColumnsConfig1: proconf.PoliciesTableColumns,
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
      mofDivCode: '',
      regulationType: '',
      status: '',
      treeQueryparams: { elementcode: 'admdiv', province: this.$store.state.userInfo.province, year: this.$store.state.userInfo.year, wheresql: 'and code like \'' + 61 + '%\'' },
      fiscalYear: '',
      mofDivCodeList: [],
      agencyCodeList: [],
      warnLevel: ''
    }
  },
  mounted() {
  },
  methods: {
    cellStyle ({ row, rowIndex, column }) {
      if (
        column.property !== undefined &&
        column.property !== 'fiRuleName' &&
        column.property !== 'wholeCount' &&
        column.property !== 'wholeHandleCount' &&
        column.property !== 'wholeNoHandleCount' &&
        column.property !== 'wholeProcessingProgress' &&
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
          this.menuName = '统计分析查询（规则+区划）'
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
      if (this.searchDataList.fiRuleName && this.searchDataList.fiRuleName.trim() !== '') {
        this.fiRuleName = this.searchDataList.fiRuleName
      }
      if (this.searchDataList.businessModuleCode && this.searchDataList.businessModuleCode.trim() !== '') {
        condition.businessModuleCode = this.searchDataList.businessModuleCode
      }
      this.condition = condition
      console.log(this.condition)
      let fiscalYear = this.condition.fiscalYear[0]

      this.agencyCodeList = val.agencyCodeList_code__multiple
      this.fiscalYear = val.fiscalYear
      this.mofDivCodeList = val.mofDivCodeList_code__multiple

      this.queryTableDatas(fiscalYear)
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
        key !== 'fiRuleName' &&
        key !== 'wholeCount' &&
        key !== 'wholeHandleCount' &&
        key !== 'wholeNoHandleCount' &&
        key !== 'wholeProcessingProgress' &&
        key !== 'orderCorrectionCount' &&
        key !== 'orderCorrectionAmount' &&
        key !== 'correctedCount' &&
        key !== 'correctedAmount' &&
        key !== 'wholeProcessingProgress'
      ) {
        if (key.indexOf('Count') !== -1) {
          this.mofDivCode = key.substring(0, 9)
        }
        console.log('obj.row', obj.row)
        if (obj.row.fiRuleCode === '1') {
          this.regulationType = '1'
          this.fiRuleCode = ''
        } else if (obj.row.fiRuleCode === '2') {
          this.regulationType = '2'
          this.fiRuleCode = ''
        } else if (obj.row.fiRuleCode === '3') {
          this.regulationType = '3'
          this.fiRuleCode = ''
        } else if (obj.row.fiRuleName === '合计') {
          this.fiRuleCode = ''
        } else {
          this.regulationType = ''
          this.fiRuleCode = obj.row.fiRuleCode
        }
        if (obj.column.title === '累计违规' || obj.column.title === '累计预警') {
          this.status = ''
          this.warnLevel = ''
        } else if (obj.column.title === '其中红色预警') {
          this.status = ''
          this.warnLevel = 3
        } else if (obj.column.title === '红色预警未处理') {
          this.status = '1'
          this.warnLevel = 3
        } else {
          this.status = ''
          this.warnLevel = ''
        }
        console.log('2222222222', this.condition)
        this.showViolations = true
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
    // 处理数据 主要是过于预警数据为零的
    handleQueryData(datas) {
      if (datas.length === 0) return datas
      // 保留合计行
      let tempData = [].concat(datas[0])
      datas.slice(1).forEach((item, index) => {
        let zeroNums = 0
        Object.keys(item).forEach(key => {
          if (key !== 'fiRuleName' && key !== 'fiRuleCode') {
            (!item[key] || item[key] === 0 || item[key] === '0' || item[key] === '0.00%') && zeroNums++
          }
        })
        if (zeroNums !== Object.keys(item).length - 2) {
          tempData.push(item)
        }
      })
      return tempData
    },
    // 查询 table 数据
    queryTableDatas(fiscalYear) {
      const param = {
        fiscalYear: fiscalYear || this.$store.state.userInfo.year,
        page: this.mainPagerConfig.currentPage,
        pageSize: this.mainPagerConfig.pageSize,
        regulationClass: this.params5,
        fiRuleName: this.fiRuleName,
        agencyCodeList: this.agencyCodeList,
        mofDivCodeList: this.mofDivCodeList,
        warnLevel: this.warnLevel,
        jurisdiction: this.$store.getters.getIsJurisdiction,
        roleId: this.roleguid
      }
      const tableColumnsConfig2 = [
        {
          title: '规则名称',
          field: 'fiRuleName',
          maxWidth: '700px',
          minWidth: '150px',
          sortable: false,
          fixed: 'left',
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
              title: '其中红色预警',
              field: 'wholeHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '红色预警未处理',
              field: 'wholeNoHandleCount',
              width: '150',
              align: 'center'
            },
            {
              title: '处理进度',
              field: 'processingProgress',
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
      this.tableLoading = true
      HttpModule.queryTableDatas(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          if (res.data.titleList.length) {
            res.data.titleList.forEach((item, index) => {
              tableColumnsConfig2.splice(2 + index, 0, {
                title: item.mofDivName,
                field: item.mofDivCode,
                sortable: false,
                align: 'left',
                children: [
                  {
                    title: '累计预警',
                    field: item.warnCount,
                    width: '150',
                    align: 'center'
                  },
                  {
                    title: '其中红色预警',
                    field: item.warnHandleCount,
                    width: '150',
                    align: 'center'
                  },
                  {
                    title: '红色预警未处理',
                    field: item.warnNoHandleCount,
                    width: '150',
                    align: 'center'
                  },
                  {
                    title: '处理进度',
                    field: item.processingProgress,
                    width: '150',
                    align: 'center'
                  }
                ]
              })
            })
          }
          this.tableColumnsConfig = tableColumnsConfig2
          this.tableData = this.handleQueryData(res.data.dataList)
          this.tableData.forEach(item => {
            if (
              item.fiRuleName !== '合计' &&
              item.fiRuleName !== '系统级' &&
              item.fiRuleName !== '部门级' &&
              item.fiRuleName !== '财政级'
            ) {
              item.fiRuleName = '          ' + item.fiRuleName
            } else if (
              item.fiRuleName === '系统级' ||
              item.fiRuleName === '部门级' ||
              item.fiRuleName === '财政级'
            ) {
              item.fiRuleName = '     ' + item.fiRuleName
            }
          })
          this.mainPagerConfig.total = this.tableData.length
          this.tabStatusNumConfig['1'] = this.tableData.length
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
    // // 获取生效范围
    // getWhereTree() {
    //   let that = this
    //   let param = {
    //     elementCode: 'admdiv',
    //     year: this.$store.state.userInfo.year,
    //     province: this.$store.state.userInfo.province
    //   }
    //   HttpModule.getTreewhere(param).then(res => {
    //     that.treeData = that.getChildrenNewData(res.data)
    //     console.log(this.queryConfig[1].itemRender.props.treeData)
    //     this.queryConfig[1].itemRender.props.config.treeData = that.getChildrenNewData(res.data)
    //   })
    // },
    // getChildrenNewData(datas) {
    //   let that = this
    //   datas.forEach(item => {
    //     item.label = item.text
    //     item.code = item.id
    //     item.guid = item.id
    //     item.name = item.text
    //     if (item.children) {
    //       that.getChildrenNewData(item.children)
    //     }
    //   })

    //   return datas
    // }
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
          this.queryConfig[2].itemRender.options = treeResdata
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
    // let date = new Date()
    // let year = date.toLocaleDateString().split('/')[0]
    // this.searchDataList.fiscalYear = year
    // this.params5 = commonFn.transJson(this.$store.state.curNavModule.param5)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.params5 = this.$store.getters.getRegulationClass
    this.searchDataList.fiscalYear = this.$store.state.userInfo.year
    this.fiscalYear = this.$store.state.userInfo.year
    this.getLeftTreeData()
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
