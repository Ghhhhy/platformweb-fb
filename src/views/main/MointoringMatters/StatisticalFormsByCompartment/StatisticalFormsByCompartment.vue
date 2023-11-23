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
            @itemChange="FormItemChange"
          />
        </div>
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="mainTableRef"
          :footer-config="tableFooterConfig"
          :table-columns-config="params5 === '1=1' ? tableColumnsConfigWithRate : tableColumnsConfig"
          :table-data="tableData"
          :table-config="tableConfig"
          :pager-config="mainPagerConfig"
          :toolbar-config="tableToolbarConfig"
          :cell-style="cellStyle"
          :default-money-unit="10000"
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
    <BsOperationLog :logs-data="logData" :show-log-view="showLogView" />
    <detailDialog
      v-if="showViolations"
      :title="dialogTitle"
      :warn-level="warnLevel"
      :status="status"
      :regulation-type="regulationType"
      :mof-div-code="mofDivCode"
      :fiscal-year="fiscalYear"
      :agency-code-list="agencyCodeList"
    />
    <!-- 附件弹框 -->
    <BsAttachment v-if="showAttachmentDialog" refs="attachmentboss" :user-info="userInfo" :billguid="billguid" />
  </div>
</template>

<script>

import { proconf } from './StatisticalFormsByCompartment'
import detailDialog from './children/detailDialog.vue'
import HttpModule from '@/api/frame/main/Monitoring/StatisticalFormsByCompartment.js'

export default {
  name: 'Test',
  components: { detailDialog },
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
      tableColumnsConfigWithRate: proconf.PoliciesTableColumnsWithRate,
      tableColumnsConfig: proconf.PoliciesTableColumns,
      tableData: [],
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: true, // 是否有金额转换
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
      dialogTitle: '违规情况查看',
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
      warnLevel: '',
      showViolations: false,
      regulationType: '',
      status: '',
      mofDivCode: '',
      treeQueryparams: this.$store.getters.treeQueryparamsCom,
      fiscalYear: '',
      mofDivCodeList: [],
      agencyCodeList: []
    }
  },
  mounted() {
  },
  methods: {
    FormItemChange(obj, row) {
      if (obj.property === 'mofDivCodeList' && obj.node.code) {
        this.getAgency(obj.node.code || this.$store.getters.getuserInfo.province)
      }
    },
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
        column.property !== 'correctedAmount') {
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
          this.menuName = '统计分析查询（区划+预警级别）'
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
      if (this.searchDataList.businessModuleCode && this.searchDataList.businessModuleCode.trim() !== '') {
        condition.businessModuleCode = this.searchDataList.businessModuleCode
      }
      this.condition = condition
      console.log(this.condition)
      let fiscalYear = this.condition.fiscalYear[0]
      this.fiscalYear = fiscalYear
      this.agencyCodeList = val.agencyCodeList_code__multiple
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
      let key = obj.column.property
      if (key.substring(0, 3) === 'red' || key.substring(0, 6) === 'yellow' || key.substring(0, 6) === 'orange' || key.substring(0, 4) === 'blue') {
        if (key.substring(0, 3) === 'red') {
          this.warnLevel = '3'
        }
        if (key.substring(0, 6) === 'yellow') {
          this.warnLevel = '1'
        }
        if (key.substring(0, 6) === 'orange') {
          this.warnLevel = '2'
        }
        if (key.substring(0, 4) === 'blue') {
          this.warnLevel = '5'
        }
        if (key.indexOf('Sys') !== -1) {
          this.regulationType = '1'
        } else if (key.indexOf('Fin') !== -1) {
          this.regulationType = '2'
        } else {
          this.regulationType = ''
        }
        if (obj.column.title === '累计预警') {
          this.status = ''
        } else if (obj.column.title === '已处理') {
          this.status = '2'
        } else {
          this.status = '1'
        }
        this.mofDivCode = obj.row.mofDivCode
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
    // 处理数据 主要是过于预警数据为零的项
    handleQueryData(datas) {
      if (datas.length === 0) return datas
      let tempData = [].concat(datas[0])
      datas.slice(1).forEach((item, index) => {
        let zeroNums = 0
        Object.keys(item).forEach(key => {
          if (key !== 'mofDivName' && key !== 'mofDivCode') {
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
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        fiscalYear: fiscalYear || this.$store.state.userInfo.year,
        regulationClass: this.params5,
        agencyCodeList: this.agencyCodeList,
        mofDivCodeList: this.mofDivCodeList,
        roleId: this.roleguid,
        jurisdiction: this.$store.getters.getIsJurisdiction,
        startTime: this.searchDataList.startTime,
        endTime: this.searchDataList.endTime
      }
      this.tableLoading = true
      HttpModule.queryTableDatas(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          // 处理数据全为0的过滤掉

          let resData = this.handleQueryData(res.data)
          resData.forEach(item => {
            if (
              item.mofDivCode !== null && item.mofDivCode !== ''
            ) {
              if (item.mofDivCode.endsWith('00000')) {
                item.mofDivName = '    ' + item.mofDivName
              } else if (item.mofDivCode.endsWith('000')) {
                item.mofDivName = '         ' + item.mofDivName
              } else {
                item.mofDivName = '               ' + item.mofDivName
              }
            }
          })
          this.tableData = resData
          this.mainPagerConfig.total = resData.length
          this.tabStatusNumConfig['1'] = resData.length
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
    getAgency(province) {
      let obj = {
        elementCode: 'AGENCY',
        province: province,
        year: this.$store.state.userInfo.year,
        wheresql: 'and province like \'' + 61 + '%\''
      }
      if (province.substring(2, 9) === '0000000') {
        obj.wheresql = 'and province like \'' + province.substring(0, 2) + '%\''
      } else if (
        province.substring(4, 9) === '00000' && province.substring(2, 9) !== '0000000'
      ) {
        obj.wheresql = 'and province like \'' + province.substring(0, 4) + '%\''
      } else {
        obj.wheresql = 'and province like \'' + province.substring(0, 6) + '%\''
      }
      HttpModule.getTreewhere(obj).then(res => {
        let treeResdata = this.getChildrenNewData1(res.data)
        this.queryConfig[2].itemRender.options = treeResdata
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
      this.treeQueryparams.elementCode = this.treeQueryparams.elementCode ? this.treeQueryparams.elementCode : this.treeQueryparams.elementcode
      HttpModule.getLeftTree(this.treeQueryparams).then(res => {
        if (res.rscode === '100000') {
          console.log(this.queryConfig)
          let treeResdata = this.getRegulationChildrenData(res.data)
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
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.params5 = this.$store.getters.getRegulationClass
    this.searchDataList.fiscalYear = this.$store.state.userInfo.year
    this.fiscalYear = this.$store.state.userInfo.year
    this.getLeftTreeData()
    this.getAgency(this.$store.getters.getuserInfo.province)
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
