<template>
  <div v-loading="tableLoading" style="height: 100%">
    <vxe-modal
      v-model="showViolations"
      v-loading="tableLoading"
      title="“三公”执行情况表"
      width="96%"
      height="96%"
      :show-footer="false"
      @close="dialogClose"
    >
      <BsTabPanel
        ref="tabPanel"
        show-zero
        :is-open="isShowQueryConditions"
        :tab-status-btn-config="toolBarStatusBtnConfig"
        :tab-status-num-config="tabStatusNumConfig"
        @onQueryConditionsClick="onQueryConditionsClick"
      />
      <div v-show="isShowQueryConditions" class="main-query">
        <BsQuery
          ref="queryFrom"
          :query-form-item-config="queryConfig"
          :query-form-data="searchDataList"
          @onSearchClick="search"
        />
      </div>
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
      />
    </vxe-modal>
    <ExecutionsDetailDialog
      v-if="executionsDetailVisible"
      :detail-query-param="detailQueryParam"
    />
    <BudgetDetailDialog
      v-if="budgetDetailVisible"
      :detail-query-param="detailQueryParam"
    />
  </div>
</template>

<script>
import { proconf } from './ThrExpReport'
import HttpModule from '@/api/frame/main/Monitoring/ThrExpReport.js'
import ExecutionsDetailDialog from './children/ExecutionsDetailDialog'
import BudgetDetailDialog from './children/BudgetDetailDialog'

export default {
  components: {
    ExecutionsDetailDialog,
    BudgetDetailDialog
  },
  props: {
    mofDivCode: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    }
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  data() {
    return {
      executionsDetailVisible: false,
      budgetDetailVisible: false,
      detailQueryParam: {},
      depBgtEcoCodeList: [],
      month: '',
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
      queryConfig: proconf.highQueryConfig1,
      searchDataList: proconf.highQueryData1,
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
      tableColumnsConfig: proconf.PoliciesTableColumns2,
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
        totalObj: {
          finalAccounts: 0,
          budgetAmount: 0,
          executionsAmount: 0,
          accountingAmount: 0,
          finalAccounts30212: 0,
          budgetAmount30212: 0,
          executionsAmount30212: 0,
          accountingAmount30212: 0,
          finalAccounts30217: 0,
          budgetAmount30217: 0,
          executionsAmount30217: 0,
          accountingAmount30217: 0,
          finalAccountsBus: 0,
          budgetAmountBus: 0,
          executionsAmountBus: 0,
          accountingAmountBus: 0,
          finalAccounts30913: 0,
          budgetAmount30913: 0,
          executionsAmount30913: 0,
          accountingAmount30913: 0,
          finalAccounts31013: 0,
          budgetAmount31013: 0,
          executionsAmount31013: 0,
          accountingAmount31013: 0,
          finalAccounts30231: 0,
          budgetAmount30231: 0,
          executionsAmount30231: 0,
          accountingAmount30231: 0,
          finalAccounts30215: 0,
          budgetAmount30215: 0,
          executionsAmount30215: 0,
          accountingAmount30215: 0,
          finalAccounts30216: 0,
          budgetAmount30216: 0,
          executionsAmount30216: 0,
          accountingAmount30216: 0
        },
        combinedType: ['switchTotal'],
        showFooter: true
      },
      // 操作日志
      logData: [],
      showLogView: false,
      // 新增弹窗
      dialogVisible: false,
      dialogTitle: '明细查看',
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
      showViolations: true,
      mofDivName: '',
      // mofDivCode: '',
      regulationType: '',
      status: '',
      treeQueryparams: { elementcode: 'admdiv', province: '610000000', year: '2021', wheresql: 'and code like \'' + 61 + '%\'' },
      // date: '',
      mofDivCodeList: [],
      agencyCodeList: []
    }
  },
  mounted() {
  },
  methods: {
    cellClick(obj, context, e) {
      console.log(obj)
      let key = obj.column.property
      if (key.includes('executionsAmount') || key.includes('ExecutionsAmount')) {
        this.mofDivCode = obj.row.mofDivCode
        this.executionsDetailVisible = true
        if (key === 'executionsAmount30212') {
          this.depBgtEcoCodeList = ['30212']
        }
        if (key === 'executionsAmount30217') {
          this.depBgtEcoCodeList = ['30217']
        }
        if (key === 'executionsAmount30913') {
          this.depBgtEcoCodeList = ['30913']
        }
        if (key === 'executionsAmount31013') {
          this.depBgtEcoCodeList = ['31013']
        }
        if (key === 'executionsAmount30231') {
          this.depBgtEcoCodeList = ['30231']
        }
        if (key === 'executionsAmountBus') {
          this.depBgtEcoCodeList = ['30231', '30913', '31013']
        }
        if (key === 'executionsAmount30215') {
          this.depBgtEcoCodeList = ['30215']
        }
        if (key === 'executionsAmount30216') {
          this.depBgtEcoCodeList = ['30216']
        }
        this.detailQueryParam = {
          mofDivCode: this.mofDivCode,
          date: this.date,
          depBgtEcoCodeList: this.depBgtEcoCodeList,
          agencyCode: obj.row.agencyCode
        }
      }

      if (key.includes('budgetAmount') || key.includes('BudgetAmount')) {
        this.mofDivCode = obj.row.mofDivCode
        this.budgetDetailVisible = true
        if (key === 'budgetAmount30212') {
          this.depBgtEcoCodeList = ['30212']
        }
        if (key === 'budgetAmount30217') {
          this.depBgtEcoCodeList = ['30217']
        }
        if (key === 'budgetAmount30913') {
          this.depBgtEcoCodeList = ['30913']
        }
        if (key === 'budgetAmount31013') {
          this.depBgtEcoCodeList = ['31013']
        }
        if (key === 'budgetAmount30231') {
          this.depBgtEcoCodeList = ['30231']
        }
        if (key === 'budgetAmountBus') {
          this.depBgtEcoCodeList = ['30231', '30913', '31013']
        }
        if (key === 'budgetAmount30215') {
          this.depBgtEcoCodeList = ['30215']
        }
        if (key === 'budgetAmount30216') {
          this.depBgtEcoCodeList = ['30216']
        }
        this.detailQueryParam = {
          mofDivCode: this.mofDivCode,
          date: this.date,
          depBgtEcoCodeList: this.depBgtEcoCodeList,
          agencyCode: obj.row.agencyCode
        }
      }
    },
    // 展开折叠查询框
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
    },
    dialogClose() {
      this.$parent.violationsView = false
      // this.$parent.queryTableDatas()
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
          this.menuName = '“三公”风险预警表'
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

      this.agencyCodeList = val.agencyCodeList_code__multiple
      this.queryTableDatas()
    },
    // 切换操作按钮
    operationToolbarButtonClickEvent(obj, context, e) {
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
    queryTableDatas() {
      const param = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        date: this.date,
        agencyCodeList: this.agencyCodeList,
        mofDivCode: this.mofDivCode
      }
      this.tableLoading = true
      HttpModule.fundMonitorByMofDiv(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
          this.tabStatusNumConfig['1'] = res.data.totalCount
          let progress = this.month / 12
          let finalAccounts = 0
          let budgetAmount = 0
          let executionsAmount = 0
          let accountingAmount = 0
          let finalAccounts30212 = 0
          let budgetAmount30212 = 0
          let executionsAmount30212 = 0
          let accountingAmount30212 = 0
          let finalAccounts30217 = 0
          let budgetAmount30217 = 0
          let executionsAmount30217 = 0
          let accountingAmount30217 = 0
          let finalAccountsBus = 0
          let budgetAmountBus = 0
          let executionsAmountBus = 0
          let accountingAmountBus = 0
          let finalAccounts30913 = 0
          let budgetAmount30913 = 0
          let executionsAmount30913 = 0
          let accountingAmount30913 = 0
          let finalAccounts31013 = 0
          let budgetAmount31013 = 0
          let executionsAmount31013 = 0
          let accountingAmount31013 = 0
          let finalAccounts30231 = 0
          let budgetAmount30231 = 0
          let executionsAmount30231 = 0
          let accountingAmount30231 = 0
          let finalAccounts30215 = 0
          let budgetAmount30215 = 0
          let executionsAmount30215 = 0
          let accountingAmount30215 = 0
          let finalAccounts30216 = 0
          let budgetAmount30216 = 0
          let executionsAmount30216 = 0
          let accountingAmount30216 = 0
          this.tableData.forEach(item => {
            if (item.finalAccounts) {
              finalAccounts += item.finalAccounts
            }
            if (item.budgetAmount) {
              budgetAmount += item.budgetAmount
            }
            if (item.executionsAmount) {
              executionsAmount += item.executionsAmount
            }
            if (item.accountingAmount) {
              accountingAmount += item.accountingAmount
            }

            if (item.finalAccounts30212) {
              finalAccounts30212 += item.finalAccounts30212
            }
            if (item.budgetAmount30212) {
              budgetAmount30212 += item.budgetAmount30212
            }
            if (item.executionsAmount30212) {
              executionsAmount30212 += item.executionsAmount30212
            }
            if (item.accountingAmount30212) {
              accountingAmount30212 += item.accountingAmount30212
            }
            if (item.finalAccounts30217) {
              finalAccounts30217 += item.finalAccounts30217
            }
            if (item.budgetAmount30217) {
              budgetAmount30217 += item.budgetAmount30217
            }
            if (item.executionsAmount30217) {
              executionsAmount30217 += item.executionsAmount30217
            }
            if (item.accountingAmount30217) {
              accountingAmount30217 += item.accountingAmount30217
            }
            if (item.finalAccountsBus) {
              finalAccountsBus += item.finalAccountsBus
            }
            if (item.budgetAmountBus) {
              budgetAmountBus += item.budgetAmountBus
            }
            if (item.executionsAmountBus) {
              executionsAmountBus += item.executionsAmountBus
            }
            if (item.accountingAmountBus) {
              accountingAmountBus += item.accountingAmountBus
            }
            if (item.finalAccounts30913) {
              finalAccounts30913 += item.finalAccounts30913
            }
            if (item.budgetAmount30913) {
              budgetAmount30913 += item.budgetAmount30913
            }
            if (item.executionsAmount30913) {
              executionsAmount30913 += item.executionsAmount30913
            }
            if (item.accountingAmount30913) {
              accountingAmount30913 += item.accountingAmount30913
            }
            if (item.finalAccounts31013) {
              finalAccounts31013 += item.finalAccounts31013
            }
            if (item.budgetAmount31013) {
              budgetAmount31013 += item.budgetAmount31013
            }
            if (item.executionsAmount31013) {
              executionsAmount31013 += item.executionsAmount31013
            }
            if (item.accountingAmount31013) {
              accountingAmount31013 += item.accountingAmount31013
            }
            if (item.finalAccounts30231) {
              finalAccounts30231 += item.finalAccounts30231
            }
            if (item.budgetAmount30231) {
              budgetAmount30231 += item.budgetAmount30231
            }
            if (item.executionsAmount30231) {
              executionsAmount30231 += item.executionsAmount30231
            }
            if (item.accountingAmount30231) {
              accountingAmount30231 += item.accountingAmount30231
            }
            if (item.finalAccounts30215) {
              finalAccounts30215 += item.finalAccounts30215
            }
            if (item.budgetAmount30215) {
              budgetAmount30215 += item.budgetAmount30215
            }
            if (item.executionsAmount30215) {
              executionsAmount30215 += item.executionsAmount30215
            }
            if (item.accountingAmount30215) {
              accountingAmount30215 += item.accountingAmount30215
            }
            if (item.finalAccounts30216) {
              finalAccounts30216 += item.finalAccounts30216
            }
            if (item.budgetAmount30216) {
              budgetAmount30216 += item.budgetAmount30216
            }
            if (item.executionsAmount30216) {
              executionsAmount30216 += item.executionsAmount30216
            }
            if (item.accountingAmount30216) {
              accountingAmount30216 += item.accountingAmount30216
            }
            Object.keys(item).forEach(t => {
              if (t.includes('Warn') || t.includes('warn')) {
                if (item[t] === '1') {
                  item[t] = '<span style="color:red">红色预警</span>'
                } else {
                  item[t] = '<span>正常</span>'
                }
              }
              if (t.includes('ExpenditureProgress')) {
                if (item[t] > progress) {
                  item[t] = '<span style="color:orange">' + item[t] + '</span>'
                } else {
                  item[t] = '<span>' + item[t] + '</span>'
                }
              }
            })
          })
          this.tableFooterConfig.totalObj.finalAccounts = finalAccounts
          this.tableFooterConfig.totalObj.budgetAmount = budgetAmount
          this.tableFooterConfig.totalObj.executionsAmount = executionsAmount
          this.tableFooterConfig.totalObj.accountingAmount = accountingAmount
          this.tableFooterConfig.totalObj.finalAccounts30212 = finalAccounts30212
          this.tableFooterConfig.totalObj.budgetAmount30212 = budgetAmount30212
          this.tableFooterConfig.totalObj.executionsAmount30212 = executionsAmount30212
          this.tableFooterConfig.totalObj.accountingAmount30212 = accountingAmount30212
          this.tableFooterConfig.totalObj.finalAccounts30217 = finalAccounts30217
          this.tableFooterConfig.totalObj.budgetAmount30217 = budgetAmount30217
          this.tableFooterConfig.totalObj.executionsAmount30217 = executionsAmount30217
          this.tableFooterConfig.totalObj.accountingAmount30217 = accountingAmount30217
          this.tableFooterConfig.totalObj.finalAccountsBus = finalAccountsBus
          this.tableFooterConfig.totalObj.budgetAmountBus = budgetAmountBus
          this.tableFooterConfig.totalObj.executionsAmountBus = executionsAmountBus
          this.tableFooterConfig.totalObj.accountingAmountBus = accountingAmountBus
          this.tableFooterConfig.totalObj.finalAccounts30913 = finalAccounts30913
          this.tableFooterConfig.totalObj.budgetAmount30913 = budgetAmount30913
          this.tableFooterConfig.totalObj.executionsAmount30913 = executionsAmount30913
          this.tableFooterConfig.totalObj.accountingAmount30913 = accountingAmount30913
          this.tableFooterConfig.totalObj.finalAccounts31013 = finalAccounts31013
          this.tableFooterConfig.totalObj.budgetAmount31013 = budgetAmount31013
          this.tableFooterConfig.totalObj.executionsAmount31013 = executionsAmount31013
          this.tableFooterConfig.totalObj.accountingAmount31013 = accountingAmount31013
          this.tableFooterConfig.totalObj.finalAccounts30231 = finalAccounts30231
          this.tableFooterConfig.totalObj.budgetAmount30231 = budgetAmount30231
          this.tableFooterConfig.totalObj.executionsAmount30231 = executionsAmount30231
          this.tableFooterConfig.totalObj.accountingAmount30231 = accountingAmount30231
          this.tableFooterConfig.totalObj.finalAccounts30215 = finalAccounts30215
          this.tableFooterConfig.totalObj.budgetAmount30215 = budgetAmount30215
          this.tableFooterConfig.totalObj.executionsAmount30215 = executionsAmount30215
          this.tableFooterConfig.totalObj.accountingAmount30215 = accountingAmount30215
          this.tableFooterConfig.totalObj.finalAccounts30216 = finalAccounts30216
          this.tableFooterConfig.totalObj.budgetAmount30216 = budgetAmount30216
          this.tableFooterConfig.totalObj.executionsAmount30216 = executionsAmount30216
          this.tableFooterConfig.totalObj.accountingAmount30216 = accountingAmount30216
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
        this.showLogView = true
      })
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
        this.queryConfig[0].itemRender.options = treeResdata
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
      let params = { ...that.treeQueryparams, ...this.$store.getters.treeQueryparamsCom }
      HttpModule.getLeftTree(params).then(res => {
        if (res.rscode === '100000') {
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
    // this.params5 = commonFn.transJson(this.$store.state.curNavModule.param5)
    this.menuId = this.$store.state.curNavModule.guid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.userInfo = this.$store.state.userInfo
    this.params5 = this.$store.state.curNavModule.param5
    this.tableColumnsConfig[1] = {
      title: '预算单位',
      field: 'agency',
      width: '190',
      sortable: false,
      align: 'left'
    }
    this.getAgency()
    this.queryTableDatas()
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
