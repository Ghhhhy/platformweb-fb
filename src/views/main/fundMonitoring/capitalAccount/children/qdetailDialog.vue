<!--惠企利民明细-->
<template v-loading="tableLoading">
  <vxe-modal
    v-model="detailVisible"
    :title="title"
    width="96%"
    height="90%"
    :show-footer="!$store.getters.isSx"
    @close="dialogClose"
  >
    <BsTable
      ref="mainTableRef"
      :footer-config="$store.getters.isSx ? tableFooterConfigSx : tableFooterConfig"
      :table-config="$store.getters.isSx ? tableConfigSx : tableConfig"
      :table-columns-config="tableColumnsConfig"
      :table-data="tableData"
      :toolbar-config="tableToolbarConfig"
      :cell-style="cellStyle"
      :pager-config="pagerConfig"
      :export-modal-config="{ fileName: title }"
      @cellClick="cellClick"
      @onToolbarBtnClick="onToolbarBtnClick"
      @ajaxData="ajaxTableData"
    >
      <template v-slot:toolbarSlots>
        <div class="table-toolbar-left">
          <div class="table-toolbar-left-title">
            <span class="fn-inline">{{ title }}{{ !$store.getters.isSx ? "(单位:万元)" : "" }}</span>
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
    detailData: {
      type: Array || Object,
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
      detailVisible: true,
      tableFooterConfig: {
        showFooter: false
      },
      tableFooterConfigSx: {
        totalObj: {
          payAppAmt: 0,
          subsidyAmt: 0
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
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: this.$store.getters.isSx, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: this.$store.getters.isSx, // 导出
        print: false, // 打印
        zoom: this.$store.getters.isSx, // 缩放
        custom: false, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      tableConfig: {
        globalConfig: {
          // 全局配置
          seq: true // 序号列
        }
      },
      tableConfigSx: {
        globalConfig: {
          // 全局配置
          checkType: 'checkbox',
          seq: true, // 序号列
          useMoneyFilter: true
        }
      },
      params: {},
      sDetailTitle: '',
      sDetailVisible: false,
      sDetailData: []
    }
  },
  methods: {
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
    showInfo() {
      if (this.$store.getters.isSx) {
        switch (this.title) {
          case '项目惠及企业明细':
            this.tableColumnsConfig = proconf.ythzcColumn
            break
          case '项目惠及人员明细':
            this.tableColumnsConfig = proconf.yktzcColumn
            break
          default:
            break
        }
        this.queryTableDatas()
      } else {
        this.tableData = this.detailData
        console.log(proconf)
        switch (this.title) {
          case '项目惠及企业台账明细':
            this.tableColumnsConfig = proconf.businessColumn
            break
          case '项目惠及人员台账明细':
            this.tableColumnsConfig = proconf.personalColumn
            break
          default:
            break
        }
        this.queryTableDatas()
      }
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.pagerConfig.currentPage = currentPage
      this.pagerConfig.pageSize = pageSize
      this.refresh()
    },
    queryTableDatas() {
      if (this.$store.getters.isSx) {
        let params = this.detailData
        params.page = this.pagerConfig.currentPage // 页码
        params.pageSize = this.pagerConfig.pageSize // 每页条数
        this.$parent.tableLoading = true
        HttpModule.querySum(params).then(res => {
          this.$parent.tableLoading = false
          if (res.code === '000000') {
            this.tableFooterConfig.totalObj = res.data[0]
          } else {
            this.$message.error(res.result)
          }
        })
        this.$parent.tableLoading = true
        HttpModule.detailPageQuery(params).then((res) => {
          this.$parent.tableLoading = false
          if (res.code === '000000') {
            this.tableData = res.data.results
            this.pagerConfig.total = res.data.totalCount
          } else {
            this.$message.error(res.message)
          }
        })
      } else {
        let params = this.detailQueryParam
        params.page = this.pagerConfig.currentPage // 页码
        params.pageSize = this.pagerConfig.pageSize // 每页条数
        // params.proName = this.condition.proName ? this.condition.proName[0] : ''
        // params.manageMofDepName = this.condition.manageMofDepName ? this.condition.manageMofDepName[0] : ''
        // params.corBgtDocNo = this.condition.corBgtDocNo ? this.condition.corBgtDocNo[0] : ''
        // params.agencyName = this.condition.agencyName ? this.condition.agencyName[0] : ''
        // params.useDes = this.condition.useDes ? this.condition.useDes[0] : ''
        // params.payAcctNo = this.condition.payAcctNo ? this.condition.payAcctNo[0] : ''
        // params.payAcctName = this.condition.payAcctName ? this.condition.payAcctName[0] : ''
        // params.payeeAcctName = this.condition.payeeAcctName ? this.condition.payeeAcctName[0] : ''
        // params.payeeAcctNo = this.condition.payeeAcctNo ? this.condition.payeeAcctNo[0] : ''
        // params.xpayDate = this.condition.xpayDate ? this.condition.xpayDate[0] : ''
        this.$parent.tableLoading = true
        HttpModule.detailPageQuery(params).then((res) => {
          this.$parent.tableLoading = false
          if (res.code === '000000') {
            this.tableData = res.data.results
            this.pagerConfig.total = res.data.totalCount
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    handleDetail(type, speTypeCode, mofDivCode) {
      if (!this.$store.getters.isSx) {
        let params = {
          reportCode: type === 'fpAmount' ? 'zdzjzbmx_fdq' : 'zjzcmx_fdq',
          speTypeCode: speTypeCode,
          mofDivCode: mofDivCode,
          fiscalYear: this.$parent.condition.fiscalYear ? this.$parent.condition.fiscalYear[0] : ''
        }
        this.tableLoading = true

        HttpModule.queryTableDatas(params).then((res) => {
          this.tableLoading = false
          if (res.code === '000000') {
            this.$parent.sDetailData = res.data
            this.$parent.sDetailVisible = true
            this.$parent.sDetailType = type
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    cellStyle({ row, rowIndex, column }) {
      if (!this.$store.getters.isSx) {
        // 有效的cellValue
        const validCellValue = (row[column.property] * 1)
        if (validCellValue && ['fpAmount', 'payAppAmt'].includes(column.property) && column.title === '总金额') {
          return {
            color: '#4293F4',
            textDecoration: 'underline'
          }
        }
      }
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      if (!this.$store.getters.isSx) {
        let key = obj.column.property

        // 无效的cellValue
        const isInvalidCellValue = !(obj.row[obj.column.property] * 1)
        if (isInvalidCellValue) return

        if (this.title === '直达资金项目明细') {
          switch (key) {
            case 'fpAmount':
              this.handleDetail('fpAmount', obj.row.speTypeCode, obj.row.mofDivCode)
              this.$parent.sDetailTitle = '指标明细'
              break
            case 'payAppAmt':
              this.handleDetail('payAppAmt', obj.row.speTypeCode, obj.row.mofDivCode)
              this.$parent.sDetailTitle = '支出明细'
          }
        }
      }
    }
  },
  mounted() {
    this.showInfo()
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
