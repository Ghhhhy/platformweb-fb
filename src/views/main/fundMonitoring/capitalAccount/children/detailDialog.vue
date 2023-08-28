<!--监控规则数据源管理新增页面弹框-->
<template v-loading="tableLoading">
  <vxe-modal
    v-model="detailVisible"
    :title="title"
    width="96%"
    height="90%"
    :show-footer="false"
    @close="dialogClose"
  >
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
      :table-config="tableConfig"
      :table-columns-config="tableColumnsConfig"
      :table-data="tableData"
      :toolbar-config="tableToolbarConfig"
      :cell-style="cellStyle"
      :pager-config="pagerConfig"
      :export-modal-config="{ fileName: title }"
      :default-money-unit="10000"
      @cellClick="cellClick"
      @onToolbarBtnClick="onToolbarBtnClick"
      @ajaxData="ajaxTableData"
    >
      <template v-slot:toolbarSlots>
        <div class="table-toolbar-left">
          <div class="table-toolbar-left-title">
            <span class="fn-inline">{{ title }}</span>
            <i class="fn-inline"></i>
          </div>
        </div>
      </template>
    </BsTable>
  </vxe-modal>
</template>
<script>
import HttpModule from '@/api/frame/main/fundMonitoring/budgetImplementationRegion.js'
import proconf from './column.js'
export default {
  name: 'DetailDialog',
  components: {
  },
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    detailType: {
      type: String,
      default: ''
    },
    detailData: {
      type: Array,
      default() {
        return []
      }
    },
    detailQueryParam: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isShowQueryConditions: true,
      queryConfig: proconf.highQueryConfig,
      searchDataList: proconf.highQueryData,
      detailVisible: true,
      // 表格尾部合计配置
      tableFooterConfig: {
        totalObj: {
          payAppAmt: 0,
          payAppAmtZd: 0,
          fpAmount: 0,
          amountbjfp: 0,
          amountZyxd: 0,
          amountxjfp: 0,
          amount: 0,
          amountZd: 0,
          amount_yszyap: 0,
          amount_zczyap: 0
        },
        combinedType: ['switchTotal'],
        showFooter: true
      },
      tableColumnsConfig: [
      ],
      pagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      tableData: [],
      condition: {},
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: true, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: true, // 导出
        print: false, // 打印
        zoom: false, // 缩放
        custom: false, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      tableConfig: {
        globalConfig: {
          // 全局配置
          checkType: this.$store.getters.isSx ? 'checkbox' : '',
          seq: true, // 序号列
          useMoneyFilter: true
        }
      },
      params: {},
      sDetailTitle: '',
      sDetailVisible: false,
      sDetailData: [],
      reportType: ''
    }
  },
  methods: {
    // 搜索
    search(val) {
      this.searchDataList = val
      console.log(val)
      let condition = this.getConditionList()
      for (let key in condition) {
        if (
          (this.searchDataList[key] !== undefined) &
          (this.searchDataList[key] !== null)
        ) {
          if (Array.isArray(this.searchDataList[key])) {
            condition[key] = this.searchDataList[key]
          } else if (typeof this.searchDataList[key] === 'string') {
            if (this.searchDataList[key].trim() !== '') {
              this.searchDataList[key].split(',').forEach((item) => {
                condition[key].push(item)
              })
            }
          }
        }
      }
      this.condition = condition
      this.queryTableDatas()
    },
    // 初始化高级查询参数condition
    getConditionList() {
      let condition = {}
      this.queryConfig.forEach((item) => {
        if (
          item.itemRender.name === '$formTreeInput' ||
          item.itemRender.name === '$vxeTree'
        ) {
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
    dialogClose() {
      this.$parent.detailVisible = false
    },
    onToolbarBtnClick({ context, table, code }) {
      switch (code) {
        // 刷新
        case 'refresh':
          this.refresh()
          break
      }
    },
    refresh() {
      this.queryTableDatas()
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.pagerConfig.currentPage = currentPage
      this.pagerConfig.pageSize = pageSize
      this.queryTableDatas()
    },
    queryTableDatas() {
      let params = this.detailQueryParam
      params.page = this.pagerConfig.currentPage // 页码
      params.pageSize = this.pagerConfig.pageSize // 每页条数
      params.proName = this.condition.proName ? this.condition.proName[0] : ''
      if (this.$store.getters.isSx) {
        params.cenTraProName1 = this.condition.cenTraProName ? this.condition.cenTraProName[0] : ''
        params.expFuncName = this.condition.expFuncName ? this.condition.expFuncName[0] : ''
      }
      params.manageMofDepName = this.condition.manageMofDepName ? this.condition.manageMofDepName[0] : ''
      params.corBgtDocNo = this.condition.corBgtDocNo ? this.condition.corBgtDocNo[0] : ''
      if (this.$store.getters.isSx) {
        params.corBgtDocNoName = this.condition.corBgtDocNoName ? this.condition.corBgtDocNoName[0] : ''
      }
      params.agencyName = this.condition.agencyName ? this.condition.agencyName[0] : ''
      params.useDes = this.condition.useDes ? this.condition.useDes[0] : ''
      params.payAcctNo = this.condition.payAcctNo ? this.condition.payAcctNo[0] : ''
      params.payAcctName = this.condition.payAcctName ? this.condition.payAcctName[0] : ''
      params.payeeAcctName = this.condition.payeeAcctName ? this.condition.payeeAcctName[0] : ''
      params.payeeAcctNo = this.condition.payeeAcctNo ? this.condition.payeeAcctNo[0] : ''
      params.xpayDate = this.condition.xpayDate ? this.condition.xpayDate[0] : ''
      if (this.$store.getters.isSx) {
        params.payAppNo = this.condition.payAppNo ? this.condition.payAppNo[0] : ''
        params.speTypeName = this.condition.speTypeName ? this.condition.speTypeName[0] : ''
        params.xjExpFuncName = this.condition.xjExpFuncName ? this.condition.xjExpFuncName[0] : ''
        params.sSpeTypeName = this.condition.sSpeTypeName ? this.condition.sSpeTypeName[0] : ''
        this.$parent.tableLoading = true
        HttpModule.querySum(params).then(res => {
          if (res.code === '000000') {
            this.tableFooterConfig.totalObj = res.data[0]
          } else {
            this.$message.error(res.result)
          }
        })
      }
      this.$parent.tableLoading = true
      HttpModule.detailPageQuery(params).then((res) => {
        if (this.$store.getters.isSx) {
          this.$parent.tableLoading = false
        }
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.pagerConfig.total = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.$parent.tableLoading = false
      })
    },
    showInfo() {
      // this.tableData = this.detailData
      console.log(this.detailType)
      // 区分直达资金分资金和分地区报表做个临时转换，不改动后端代码
      if (this.detailType === 'zdzjxmmx_fzj' || this.detailType === 'zdzjxmmx_fdq') {
        this.detailQueryParam.reportCode = 'zdzjxmmx'
      }

      switch (this.detailType) {
        // 支出明细
        case 'zjzcmx_fdq':
          this.tableColumnsConfig = proconf.expenditureColumn
          break
        case 'zjzcmx_fzj':
          this.tableColumnsConfig = proconf.expenditureColumn
          break
        case 'zdzjzcmx_fdq':
        case 'zdzjzcmx_fzj':
        case 'zxjdzcmx_fzj':
        case 'zxjdzcmx_fdq':
        case 'zyzfzcmx_fdq':
          this.tableColumnsConfig = proconf.payColumn
          this.queryConfig = proconf.highQueryConfig2
          this.searchDataList = proconf.highQueryData2
          break
        // 项目明细
        case 'zdzjxmmx_fzj':
        case 'zyzfxmmx':
          this.tableColumnsConfig = proconf.projectColumn
          break
        case 'zdzjxmmx_fdq':
          this.tableColumnsConfig = proconf.projectColumn
          break
        // 中央下达项目明细
        case 'czzdzjxmmx_fdq_zyxd':
        case 'czzdzjxmmx_fzj_zyxd':
          this.tableColumnsConfig = proconf.zyxdProColumn
          break
        case 'zdzjxmmx_fzj_zyxd':
        case 'zdzjxmmx_fdq_zyxd':
          this.tableColumnsConfig = proconf.zyxdProfzjColumn
          break
        case 'zdzjxmmx_fzj_zyxdh':
        case 'zdzjxmmx_fzj_zyxdx':
          this.tableColumnsConfig = proconf.zyxdProfzjhColumn
          break
        case 'zdzjxmmx_fzj_wfp':
          this.tableColumnsConfig = proconf.zyxdProfzjwfpColumn
          break
        case 'zdzjxmmx_fzj_wfpx':
          this.tableColumnsConfig = proconf.zyxdProfzjwfpxColumn
          break
        case 'zdzjzbmx_fzjfp':
          this.tableColumnsConfig = proconf.targetColumn
          this.queryConfig = proconf.highQueryConfig1
          this.searchDataList = proconf.highQueryData1
          break
        // case 'zdzjxmmx':
        //   this.tableColumnsConfig = proconf.projectColumn
        //   break
        case 'zdzjzcmx':
          this.tableColumnsConfig = proconf.expenditureColumn
          break
        case 'zdzjxmmx_dfap':
        case 'sbjfpaAmount':
        case 'shbjfpaAmount':
        case 'xyfpaAmount':
          this.tableColumnsConfig = proconf.zdzjprojectColumn
          break
        case 'zdzjxmmx':
        case 'zxjdxmmx_fzj':
        case 'zxjdxmmx_fdq':
          // 上海项目加一列分配时间
          if (this.transJson(this.params5 || '')?.projectCode === 'SH') {
            this.tableColumnsConfig = proconf.projectColumn.concat([{
              title: '分配时间',
              field: 'fpTime',
              sortable: false,
              align: 'center'
            }])
          } else {
            this.tableColumnsConfig = proconf.projectColumn
          }
          break
        default:
          break
      }
      this.queryTableDatas()
    },
    showInfoSx() {
      // this.tableData = this.detailData
      console.log(proconf)
      switch (this.detailType) {
        // 支出明细
        case 'zjzcmx_fdq':
          this.tableColumnsConfig = proconf.expenditureColumn
          break
        case 'zjzcmx_fzj':
          this.tableColumnsConfig = proconf.expenditureColumn
          break
        case 'zdzjzcmx_fdq':
          this.tableColumnsConfig = proconf.payColumn
          this.queryConfig = proconf.highQueryConfig2
          this.searchDataList = proconf.highQueryData2
          break
        // 项目明细
        case 'zdzjxmmx_fzj':
          this.tableColumnsConfig = proconf.projectColumn
          break
        case 'zdzjxmmx_fdq':
          this.tableColumnsConfig = proconf.projectColumn
          break
        // 中央下达项目明细
        case 'czzdzjxmmx_fdq_zyxd':
        case 'czzdzjxmmx_fzj_zyxd':
          this.tableColumnsConfig = proconf.zyxdProColumn
          break
        case 'zdzjxmmx_fzj_zyxd':
        case 'zdzjxmmx_fdq_zyxd':
          this.tableColumnsConfig = proconf.zyxdProfzjColumn
          break
        case 'zdzjxmmx_fzj_zyxdh':
        case 'zdzjxmmx_fzj_zyxdx':
        case 'qszjzl':
          this.tableColumnsConfig = proconf.zyxdProfzjhColumn
          break
        case 'zdzjxmmx_fzj_wfp':
          this.tableColumnsConfig = proconf.zyxdProfzjwfpColumn
          break
        case 'zdzjxmmx_fzj_wfpx':
          this.tableColumnsConfig = proconf.zyxdProfzjwfpxColumn
          break
        case 'zdzjzbmx_fzjfp':
          this.tableColumnsConfig = proconf.targetColumn
          this.queryConfig = proconf.highQueryConfig1
          this.searchDataList = proconf.highQueryData1
          break
        case 'fdqzdzjxmmx':
          this.tableColumnsConfig = proconf.proColumn
          this.queryConfig = proconf.highQueryConfig4
          this.searchDataList = proconf.highQueryData4
          break
        case 'fdqzcmx':
          this.tableColumnsConfig = proconf.fdqzcmxColumn
          this.queryConfig = proconf.highQueryConfig3
          this.searchDataList = proconf.highQueryData3
          break
        case 'zcmx(czb)':
          this.tableColumnsConfig = proconf.fdqzcmxColumn
          this.queryConfig = proconf.highQueryConfig3
          this.searchDataList = proconf.highQueryData3
          break
        case 'zdzjxmmx(czb)':
          this.tableColumnsConfig = proconf.proColumn
          this.queryConfig = proconf.highQueryConfig4
          this.searchDataList = proconf.highQueryData4
          break
        case 'zyzdzjmx':
        case 'zyzdzjmx_qx':
        case 'zyzdzjmx_xq':
        case 'zyzdzjmx_bj':
          this.tableColumnsConfig = proconf.zyzdzjmxColumn
          this.queryConfig = proconf.highQueryConfig7
          this.searchDataList = proconf.highQueryData7
          break
        default:
          break
      }
      this.queryTableDatas()
    },
    handleDetail(reportCode, row) {
      if (this.$store.getters.isSx) {
        let params = {
          reportCode: reportCode,
          cenTraProName: row.cenTraProName,
          agencyCode: row.agencyCode,
          proCode1: row.proCode,
          expFuncCode: row.expFuncCode,
          mofDivCode: this.detailQueryParam.mofDivCode,
          fiscalYear: this.detailQueryParam.fiscalYear,
          condition: this.detailQueryParam.condition,
          endTime: this.detailQueryParam.endTime ? this.detailQueryParam.endTime : ''
        }
        this.$parent.sDetailQueryParam = params
        this.$parent.sDetailVisible = true
        this.$parent.sDetailType = reportCode
      } else {
        let params = {
          reportCode: reportCode,
          proCode1: row.proCode,
          trackProCode: row.trackProCode,
          agencyCode: row.agencyCode,
          xjExpFuncCode: row.xjExpFuncCode,
          manageMofDepName: row.manageMofDepName,
          bgtMofDepCode: row.bgtMofDepCode,
          xjCorBgtDocNo: row.corBgtDocNo,
          isCz: this.detailQueryParam.isCz,
          condition: this.detailQueryParam.condition,
          mofDivCode: this.detailQueryParam.mofDivCode,
          fiscalYear: this.$parent.fiscalYear
        }
        this.$parent.sDetailQueryParam = params
        this.$parent.sDetailVisible = true
        this.$parent.sDetailType = reportCode
      }
    },
    handleDetailfzj(reportCode, proCode) {
      let params = {
        reportCode: reportCode,
        proCodes: [proCode],
        mofDivCode: this.detailQueryParam.mofDivCode,
        fiscalYear: this.$parent.searchDataList.fiscalYear,
        condition: this.detailQueryParam.condition
      }
      this.$parent.sDetailQueryParam = params
      this.$parent.sDetailVisible = true
      this.$parent.sDetailType = reportCode
    },
    cellStyle({ row, rowIndex, column }) {
      if (this.$store.getters.isSx) {
        if ((this.detailType === 'fdqzdzjxmmx' || this.detailType === 'zdzjxmmx(czb)') && row.cenTraProName !== '合计') {
          if (['amount', 'payAppAmt'].includes(column.property)) {
            return {
              color: '#4293F4',
              textDecoration: 'underline'
            }
          }
        }
      } else {
        if (!rowIndex) return
        // 有效的cellValue
        const validCellValue = (row[column.property] * 1)
        if (validCellValue && ['amountbjfpsnjap', 'amountbjfpzyap', 'amountbjfpsjap', 'amountbjfpxjap', 'amountZdzjFp', 'amountpayzyap', 'amountPayZdzj'].includes(column.property)) {
          return {
            color: '#4293F4',
            textDecoration: 'underline'
          }
        }
      }
    }
  },
  // 表格单元行单击
  cellClick(obj, context, e) {
    if (this.$store.getters.isSx) {
      let key = obj.column.property
      switch (key) {
        case 'fpAmount':
          if (this.detailType === 'zdzjxmmx_fdq_zyxd') {
            // this.handleDetail('zdzjzbmx_fdq', obj.row.proCode, obj.row.mofDivCode, obj.row.manageMofDepName, obj.row.corBgtDocNo)
            // this.$parent.sDetailTitle = '可执行指标明细'
          } else if (this.detailType === 'zdzjxmmx_fzj_zyxd') {
            // this.handleDetailfzj('zdzjzbmx_fdq', obj.row.proCode)
            // this.$parent.sDetailTitle = '可执行指标明细'
          } else if (this.detailType === 'czzdzjxmmx_fdq_zyxd') {
            this.handleDetail('czzdzjzbmx_fdq', obj.row.proCode, obj.row.mofDivCode)
            this.$parent.sDetailTitle = '可执行指标明细'
          } else if (this.detailType === 'czzdzjxmmx_fzj_zyxd') {
            this.handleDetailfzj('czzdzjzbmx_fdq', obj.row.proCode)
            this.$parent.sDetailTitle = '可执行指标明细'
          }
          break
        // case 'payAppAmt':
        //   this.handleDetail('zjzcmx_fdq', obj.row.speTypeCode, obj.row.mofDivCode)
        //   this.$parent.sDetailTitle = '支出明细'
        case 'amount':
          if ((this.detailType === 'fdqzdzjxmmx' || this.detailType === 'zdzjxmmx(czb)') && obj.row.cenTraProName !== '合计') {
            this.handleDetail('zbmx(czb)', obj.row)
            this.$parent.sDetailTitle = '指标明细'
            // this.$parent.sDetailTitle = '可执行指标明细'
          }
          break
        case 'payAppAmt':
          if ((this.detailType === 'fdqzdzjxmmx' || this.detailType === 'zdzjxmmx(czb)') && obj.row.cenTraProName !== '合计') {
            this.handleDetail('zcmx(czb)', obj.row)
            this.$parent.sDetailTitle = '支出明细'
            // this.$parent.sDetailTitle = '可执行指标明细'
          }
          break
      }
    } else {
      const rowIndex = obj?.rowIndex
      if (!rowIndex) return
      let key = obj.column.property

      // 无效的cellValue
      const isInvalidCellValue = !(obj.row[obj.column.property] * 1)
      if (isInvalidCellValue) return

      switch (key) {
        case 'amountZdzjFp':
          let zcSource = 'zdzjzbmx_fzjfp'
          if (this.transJson(this.params5 || '')?.reportCode === 'zxjdxmmx_fzj') {
            zcSource = 'zxjdzbmx_fzjfp'
          }
          if (this.detailType === 'zyzfxmmx') {
            zcSource = 'zyzfzbmx_fzjfp'
          }
          if (this.detailType === 'zdzjxmmx' || this.detailType === 'zdzjxmmx_dfap' || this.detailType === 'zxjdxmmx_fzj' ||
            this.detailType === 'zdzjxmmx_fdq' || this.detailType === 'zdzjxmmx_fzj'
          ) {
            this.handleDetail(zcSource, obj.row)
            this.$parent.sDetailTitle = obj.row.trackProName + '资金支出台账明细'
          }
          break
        case 'amountPayZdzj':
          console.info(this.detailType)
          let zcSource2 = 'zdzjzcmx_fdq'
          if (this.detailType === 'zdzjxmmx_fzj') {
            zcSource2 = 'zdzjzcmx_fzj'
          }
          if (this.detailType === 'zyzfxmmx') {
            zcSource2 = 'zyzfzcmx_fdq'
          }
          if (this.detailType === 'zdzjxmmx' || this.detailType === 'zdzjxmmx_dfap' ||
            this.detailType === 'zdzjzcmx_fdq' || this.detailType === 'zdzjxmmx_fzj' ||
            this.detailType === 'zdzjxmmx_fdq' || this.detailType === 'zdzjxmmx_fzj') {
            this.handleDetail(zcSource2, obj.row)
            this.$parent.sDetailTitle = obj.row.trackProName + '资金支出台账明细'
          }
          break
        case 'amountpayzyap':
          this.handleDetail('zdzjzcmx_fdq', obj.row)
          this.$parent.sDetailTitle = '支出明细'
          break

        case 'amountbjfpsnjap':
        case 'amountbjfpzyap':
        case 'amountbjfpsjap':
        case 'amountbjfpxjap':
          this.handleDetail('zdzjzbmx_fzj', obj.row)
          this.$parent.sDetailTitle = '支出台账明细'
          break
      }
    }
  },
  mounted() {
    if (this.$store.getters.isSx) {
      this.showInfoSx()
    } else {
      this.showInfo()
    }
  },
  watch: {},
  created() {
  }
}
</script>
<style lang="scss">
.payVoucherInput {
  margin: 15px;
  .el-card {
    margin-top: 0;
  }
}
.vxe-modal--wrapper .vxe-modal--box {
  z-index: 0;
}
#bigbox {
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.3;
}
.el-row-item .font-set-small .hline {
  width: 72px;
}
</style>
