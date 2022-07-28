<template>
  <vxe-modal
    ref="checkAuditDialog"
    v-model="dialogVisible"
    resize
    width="90%"
    height="80%"
    :position="{ top: '5%',left: '5%' }"
    transfer
    title="预览"
    @close="closeDialog"
  >
    <div style="height:calc(100% - 50px)">
      <BsTable
        ref="bsTableRef"
        :table-columns-config="tableCols"
        :table-data="tableData"
        :toolbar-config="false"
        :pager-config="false"
        :cell-style="cellStyle"
      />
    </div>
  </vxe-modal>
</template>

<script>
import resolveResult from '@/utils/result.js'

export default {
  name: 'ReportPreviewDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default() {
        return false
      }
    },
    curReportId: {
      type: String,
      default() {
        return 1
      }
    }
  },
  data() {
    return {
      tableCols: [],
      tableData: []
    }
  },
  methods: {
    ...resolveResult,
    showLoading() {
      return this.$loading({
        lock: true,
        text: '正在加载中...请您稍后',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    cellStyle(row, column, rowIndex, columnIndex) {
      // console.log(row.column.property === 'auditFlag')
      if (row.row.auditFlag === 1) {
        return 'color:green!important;'
      } else {
        return 'color:red!important;'
      }
    },
    previewReport() {
      if (this.curReportId) {
        this.loadingPage = this.showLoading()
        this.$http.get('bisReport/queryBossFiscalTableConfig?reportguid=' + this.curReportId).then(res => {
          this.resolveResult(data => {
            this.tableCols = data.columns
          }, res)
          let params = {}
          params.reportguid = this.curReportId
          let queryConditions = {}
          queryConditions.agencyguid = ''
          params.queryConditions = queryConditions
          // params.pageSize = self.queryBossDesignReportData.pageSize
          // params.currentPage = self.queryBossDesignReportData.currentPage
          this.$http.post('bisReport/queryBossDesignReportData', params).then(data => {
            this.loadingPage.close()
            if (data) {
              try {
                let dataResult = data.data.dataList
                if (dataResult && dataResult.length > 0 && dataResult[0].itemcode !== undefined) {
                  dataResult.sort((a, b) => a.itemcode.localeCompare(b.itemcode))
                }
                let resDat = dataResult.filter(item => { return item !== null })
                this.tableData = resDat
              } catch (err) {
                console.log(err)
                this.tableData = []
              }
            } else {
              this.tableData = []
            }
          })
        }).catch(e => {
          this.$XModal.message({ status: 'error', message: '预览报表失败' + e })
          this.loadingPage.close()
        })
      } else {
        this.tableCols = []
        this.tableData = []
      }
    },
    closeDialog() {
      this.$emit('update:dialogVisible', false)
    }
  },
  mounted() {
    this.previewReport()
  },
  watch: {
    dialogVisible: {
      handler(newval) {
        this.$emit('update:dialogVisible', newval)
      },
      deep: true,
      immediate: true
    },
    govBudgetStatus: {
      handler(newValue, oldValue) {
        console(newValue, oldValue)
        if (newValue & oldValue) {
          this.govBudgetStatus = newValue
        }
      }
    }
  }

}
</script>

<style scoped>
</style>
