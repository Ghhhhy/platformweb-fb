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
import ExecutionsDetailDialog from './children/ExecutionsDetailDialog.vue'
import BudgetDetailDialog from './children/BudgetDetailDialog.vue'
import { proconf } from './ThrExpReport'
import HttpModule from '@/api/frame/main/Monitoring/ThrExpReport.js'

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
        totalObj: {
          adjustedBudgetAmount: 0,
          executionsAmount: 0,
          goAbroadAdjustedBudgetAmount: 0,
          goAbroadExecutionsAmount: 0,
          receptionAdjustedBudgetAmount: 0,
          receptionExecutionsAmount: 0,
          vehicleSubtotalAdjstBugtAmnt: 0,
          vehicleSubtotalExecuAmnt: 0,
          vehiclePrcheAdjstBugtAmnt30913: 0,
          vehiclePurchaseExecuAmnt30913: 0,
          vehiclePrcasAdjstBugtAmnt31013: 0,
          vehiclePurchaseExecuAmnt31013: 0,
          vehicleDevopsAdjustedBugtAmnt: 0,
          vehicleDevopsExecutionsAmount: 0,
          meetingAdjustedBudgetAmount: 0,
          meetingExecutionsAmount: 0,
          trainAdjustedBudgetAmount: 0,
          trainExecutionsAmount: 0
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
        if (key === 'goAbroadExecutionsAmount') {
          this.depBgtEcoCodeList = ['30212']
        }
        if (key === 'receptionExecutionsAmount') {
          this.depBgtEcoCodeList = ['30217']
        }
        if (key === 'vehiclePurchaseExecuAmnt30913') {
          this.depBgtEcoCodeList = ['30913']
        }
        if (key === 'vehiclePurchaseExecuAmnt31013') {
          this.depBgtEcoCodeList = ['31013']
        }
        if (key === 'vehicleDevopsExecutionsAmount') {
          this.depBgtEcoCodeList = ['30231']
        }
        if (key === 'vehicleSubtotalExecuAmnt') {
          this.depBgtEcoCodeList = ['30231', '30913', '31013']
        }
        if (key === 'meetingExecutionsAmount') {
          this.depBgtEcoCodeList = ['30215']
        }
        if (key === 'trainExecutionsAmount') {
          this.depBgtEcoCodeList = ['30216']
        }
        this.detailQueryParam = {
          mofDivCode: this.mofDivCode,
          date: this.date,
          depBgtEcoCodeList: this.depBgtEcoCodeList,
          agencyCode: obj.row.agencyCode
        }
      }

      if (key.includes('adjustedBudgetAmount') || key.includes('AdjustedBudgetAmount')) {
        this.mofDivCode = obj.row.mofDivCode
        this.budgetDetailVisible = true
        if (key === 'goAbroadAdjustedBudgetAmount') {
          this.depBgtEcoCodeList = ['30212']
        }
        if (key === 'receptionAdjustedBudgetAmount') {
          this.depBgtEcoCodeList = ['30217']
        }
        if (key === 'vehiclePrcheAdjstBugtAmnt30913') {
          this.depBgtEcoCodeList = ['30913']
        }
        if (key === 'vehiclePrcasAdjstBugtAmnt31013') {
          this.depBgtEcoCodeList = ['31013']
        }
        if (key === 'vehicleDevopsAdjustedBugtAmnt') {
          this.depBgtEcoCodeList = ['30231']
        }
        if (key === 'vehicleSubtotalAdjstBugtAmnt') {
          this.depBgtEcoCodeList = ['30231', '30913', '31013']
        }
        if (key === 'meetingAdjustedBudgetAmount') {
          this.depBgtEcoCodeList = ['30215']
        }
        if (key === 'trainAdjustedBudgetAmount') {
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
      HttpModule.riskWarnByMofDiv(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
          this.tabStatusNumConfig['1'] = res.data.totalCount
          let progress = this.month / 12
          let adjustedBudgetAmount = 0
          let executionsAmount = 0
          let goAbroadAdjustedBudgetAmount = 0
          let goAbroadExecutionsAmount = 0
          let receptionAdjustedBudgetAmount = 0
          let receptionExecutionsAmount = 0
          let vehicleSubtotalAdjstBugtAmnt = 0
          let vehicleSubtotalExecuAmnt = 0
          let vehiclePrcheAdjstBugtAmnt30913 = 0
          let vehiclePurchaseExecuAmnt30913 = 0
          let vehiclePrcasAdjstBugtAmnt31013 = 0
          let vehiclePurchaseExecuAmnt31013 = 0
          let vehicleDevopsAdjustedBugtAmnt = 0
          let vehicleDevopsExecutionsAmount = 0
          let meetingAdjustedBudgetAmount = 0
          let meetingExecutionsAmount = 0
          let trainAdjustedBudgetAmount = 0
          let trainExecutionsAmount = 0
          this.tableData.forEach(item => {
            if (item.adjustedBudgetAmount) {
              adjustedBudgetAmount += item.adjustedBudgetAmount
            }
            if (item.executionsAmount) {
              executionsAmount += item.executionsAmount
            }
            if (item.goAbroadAdjustedBudgetAmount) {
              goAbroadAdjustedBudgetAmount += item.goAbroadAdjustedBudgetAmount
            }
            if (item.goAbroadExecutionsAmount) {
              goAbroadExecutionsAmount += item.goAbroadExecutionsAmount
            }

            if (item.receptionAdjustedBudgetAmount) {
              receptionAdjustedBudgetAmount += item.receptionAdjustedBudgetAmount
            }
            if (item.receptionExecutionsAmount) {
              receptionExecutionsAmount += item.receptionExecutionsAmount
            }
            if (item.vehicleSubtotalAdjstBugtAmnt) {
              vehicleSubtotalAdjstBugtAmnt += item.vehicleSubtotalAdjstBugtAmnt
            }
            if (item.vehicleSubtotalExecuAmnt) {
              vehicleSubtotalExecuAmnt += item.vehicleSubtotalExecuAmnt
            }
            if (item.vehiclePrcheAdjstBugtAmnt30913) {
              vehiclePrcheAdjstBugtAmnt30913 += item.vehiclePrcheAdjstBugtAmnt30913
            }
            if (item.vehiclePurchaseExecuAmnt30913) {
              vehiclePurchaseExecuAmnt30913 += item.vehiclePurchaseExecuAmnt30913
            }
            if (item.vehiclePrcasAdjstBugtAmnt31013) {
              vehiclePrcasAdjstBugtAmnt31013 += item.vehiclePrcasAdjstBugtAmnt31013
            }
            if (item.vehiclePurchaseExecuAmnt31013) {
              vehiclePurchaseExecuAmnt31013 += item.vehiclePurchaseExecuAmnt31013
            }
            if (item.vehicleDevopsAdjustedBugtAmnt) {
              vehicleDevopsAdjustedBugtAmnt += item.vehicleDevopsAdjustedBugtAmnt
            }
            if (item.vehicleDevopsExecutionsAmount) {
              vehicleDevopsExecutionsAmount += item.vehicleDevopsExecutionsAmount
            }
            if (item.meetingAdjustedBudgetAmount) {
              meetingAdjustedBudgetAmount += item.meetingAdjustedBudgetAmount
            }
            if (item.meetingExecutionsAmount) {
              meetingExecutionsAmount += item.meetingExecutionsAmount
            }
            if (item.trainAdjustedBudgetAmount) {
              trainAdjustedBudgetAmount += item.trainAdjustedBudgetAmount
            }
            if (item.trainExecutionsAmount) {
              trainExecutionsAmount += item.trainExecutionsAmount
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
          this.tableFooterConfig.totalObj.adjustedBudgetAmount = adjustedBudgetAmount
          this.tableFooterConfig.totalObj.executionsAmount = executionsAmount
          this.tableFooterConfig.totalObj.goAbroadAdjustedBudgetAmount = goAbroadAdjustedBudgetAmount
          this.tableFooterConfig.totalObj.goAbroadExecutionsAmount = goAbroadExecutionsAmount
          this.tableFooterConfig.totalObj.receptionAdjustedBudgetAmount = receptionAdjustedBudgetAmount
          this.tableFooterConfig.totalObj.receptionExecutionsAmount = receptionExecutionsAmount
          this.tableFooterConfig.totalObj.vehicleSubtotalAdjstBugtAmnt = vehicleSubtotalAdjstBugtAmnt
          this.tableFooterConfig.totalObj.vehicleSubtotalExecuAmnt = vehicleSubtotalExecuAmnt
          this.tableFooterConfig.totalObj.vehiclePrcheAdjstBugtAmnt30913 = vehiclePrcheAdjstBugtAmnt30913
          this.tableFooterConfig.totalObj.vehiclePurchaseExecuAmnt30913 = vehiclePurchaseExecuAmnt30913
          this.tableFooterConfig.totalObj.vehiclePrcasAdjstBugtAmnt31013 = vehiclePrcasAdjstBugtAmnt31013
          this.tableFooterConfig.totalObj.vehiclePurchaseExecuAmnt31013 = vehiclePurchaseExecuAmnt31013
          this.tableFooterConfig.totalObj.vehicleDevopsAdjustedBugtAmnt = vehicleDevopsAdjustedBugtAmnt
          this.tableFooterConfig.totalObj.vehicleDevopsExecutionsAmount = vehicleDevopsExecutionsAmount
          this.tableFooterConfig.totalObj.meetingAdjustedBudgetAmount = meetingAdjustedBudgetAmount
          this.tableFooterConfig.totalObj.meetingExecutionsAmount = meetingExecutionsAmount
          this.tableFooterConfig.totalObj.trainAdjustedBudgetAmount = trainAdjustedBudgetAmount
          this.tableFooterConfig.totalObj.trainExecutionsAmount = trainExecutionsAmount
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
