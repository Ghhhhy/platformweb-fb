<template>
  <vxe-modal
    ref="checkAuditDialog"
    v-model="dialogVisible"
    resize
    width="90%"
    height="80%"
    :position="{ top: '5%',left: '5%' }"
    transfer
    title="勾稽审核"
    @close="closeDialog"
  >
    <div class="container-project">
      <div class="container-project-bottom">
        <div class="option-line-group" style="text-align:right!important;">
          <div class="fn-inline option-line-group-btn">
            <vxe-button status="primary" @click="checkAudit">勾稽审核</vxe-button></vxe-button>
            <vxe-button @click="closeDialog">取消</vxe-button>
          </div>
        </div>
      </div>
    </div>
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
  name: 'CheckAuditDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      tableCols: [
        { align: 'left', extendProps: {}, field: 'auditName', itemRender: { name: '$vxeInput', props: { clearable: false, disabled: true } }, required: true, span: 180, title: '审核内容', visible: true },
        { align: 'left', extendProps: {}, field: 'auditResult', itemRender: { name: '$vxeInput', props: { clearable: false, disabled: true } }, required: true, span: 180, title: '审核结果', visible: true },
        { align: 'left',
          extendProps: {},
          field: 'auditFlag',
          itemRender: { name: '$vxeInput', props: { clearable: false, disabled: true } },
          required: true,
          span: 180,
          title: '是否成功',
          visible: true,
          formatter: (value, column) => {
            switch (value.row.auditFlag) {
              case 0:
                return '失败'
              case 1:
                return '成功'
              default:
                return value.row.auditFlag
            }
          } }
      ],
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
    checkAudit() {
      this.loadingPage = this.showLoading()
      this.$http.post('bisGovbudget/govFiscal/govSummary/check/audit', { menuGuid: this.$store.state.curNavModule.guid, menuName: this.$store.state.curNavModule.name }).then(res => {
        this.loadingPage.close()
        this.resolveResult(data => {
          this.checkAuditResult()
        }, res)
      }).catch(e => {
        this.$XModal.message({ status: 'error', message: '勾稽审核失败' + e })
        this.loadingPage.close()
      })
    },
    checkAuditResult() {
      // this.loadingPage = this.showLoading()
      // this.$http.post('bisGovbudget/govFiscal/govSummary/check/result', { menuGuid: this.$store.state.curNavModule.guid, menuName: this.$store.state.curNavModule.name }).then(res => {
      //   this.loadingPage.close()
      //   this.resolveResult(data => {
      //     this.tableData = data
      //   }, res)
      // }).catch(e => {
      //   this.$XModal.message({ status: 'error', message: '勾稽审核查询失败' + e })
      //   this.loadingPage.close()
      // })
    },
    closeDialog() {
      this.$emit('update:dialogVisible', false)
    }
  },
  mounted() {
    this.checkAuditResult()
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
