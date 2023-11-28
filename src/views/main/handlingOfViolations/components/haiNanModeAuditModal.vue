<!--处理弹框-->
<template>
  <div>
    <div v-loading="addLoading" class="payVoucherInput">
      <div>
        <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold;">明细信息
          <el-button v-param5Show="showKj" type="text" style="float:right" @click="dialogVisibleKjsm = true">口径说明</el-button>
          <el-dialog :visible.sync="dialogVisibleKjsm" width="50%">
            <div style="font-size:14px;margin:15px 10px 10px 15px">
              指标接收时间：上级转移支付指标登记日期。<br>
              接收金额：上级转移支付下达金额。<br>
              已分配金额：根据上级转移支付的待分预算已经形成可执行指标金额。<br>
              指标余额：指标接收金额减去已分配金额。<br>
              超时下达时间：指标接收时间后30天。<br>
              超时下达金额：超时下达时间后已分配金额，及可执行指标的创建日期大于超时下达时间指标金额。
            </div>
          </el-dialog>
        </div>
        <BsForm
          ref="incomeMsgRef"
          :form-items-config="incomeMsgConfig"
          :form-data-list="supplyDataList"
        />
      </div>
      <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold;">规则信息</div>
      <BsTable
        ref="handleTableRef"
        height="200px"
        v-bind="footerConfig"
        :table-columns-config="handletableColumnsConfig"
        :table-data="handletableData"
        :table-config="handletableConfig"
        :toolbar-config="false"
        :pager-config="false"
        @cellClick="cellClick"
      />
      <monitProcFeedbackFormInstance ref="monitProcFeedbackFormInstance" :default-form-data="defaultFormData" />
    </div>
    <AddDialog
      v-if="dialogVisibleShow"
      :title="dialogTitle"
    />
    <RuleDialog v-if="ruleDialogShow" :code="rulesCode" />
  </div>
</template>
<script>
import { proconf } from '@/views/main/fundMonitoring/violationHandle/createProcessing/createProcessing.js'
import HttpDetailModule from '@/api/frame/main/Monitoring/WarningDataMager.js'
import monitProcFeedbackFormInstance from '@/views/main/monitProcFeedback/monitProcFeedbackFormInstance.vue'
import AddDialog from '@/views/main/MointoringMatters/BudgetAccountingWarningDataMager/children/addDialog.vue'
import RuleDialog from '@/views/main/monitProcFeedback/ruleDialog.vue'
export default {
  name: 'HaiNanModeAuditModal',
  components: { AddDialog, monitProcFeedbackFormInstance, RuleDialog },
  computed: {
    defaultFormData() {
      let formItemText = this.selectedRow?.mflowBizInfoList || []// 拿到上一个节点表单结构
      let preNodeFormObj = {}// 上一个节点表单填得值
      if (formItemText && formItemText.length) {
        formItemText.forEach(item => {
          preNodeFormObj[item.bizKey] = item.bizValue
        })
      }
      let ortherData = {
        // serverTime: this.serverTime,
        // createdAttachmentid: this.$ToolFn.utilFn.getUuid(),
        // userName: this.$store.getters.getuserInfo.name,
        // menuName: this.$store.state.curNavModule.name
      }
      return { ...this.selectedRow, ...preNodeFormObj, ...ortherData }
      // this.fujianDialogVisible = true
    },
    handletableColumnsConfig() {
      if (this.param5.retroact === 'company' || this.param5.tableHide) {
        return proconf.compayHandletableColumnsConfig
      } else { // 当配置了tableHide参数时，需要隐藏字段
        return proconf.handletableColumnsConfig
      }
    },
    curNavModule() {
      return this.$store.state.curNavModule
    },
    footerConfig() {
      return {}
    }
  },
  props: {
    selectedRow: {
      type: Object,
      default: () => {
        return {}
      }
    },
    param5: {
      type: Object,
      default() {
        return {}
      }
    },
    bussnessId: {
      type: String,
      default: '7'// 预算执行
    }
  },
  data() {
    return {
      ruleDialogShow: false,
      rulesCode: '',
      serverTime: '',
      // 规则详情信息
      DetailData: {},
      dialogVisibleShow: false,
      dialogVisibleKjsm: false,
      dialogTitle: '查看详情',
      // ---
      handletableData: [],
      incomeMsgConfig: proconf.incomeMsgConfig,
      supplyDataList: {},
      checkDataList: {},
      handletableConfig: {},
      addLoading: false
    }
  },
  methods: {
    getServerTime() {
      this.$http.post(BSURL.lmp_commomGetCurrentTime).then(res => {
        res.code === '000000' && (this.serverTime = res.res.data)
      })
    },
    showKj() {
      if ((String(this.bussnessId) === '6' && this.param5.regulationClass === '0207')) {
        return true
      } else if (this.param5.kjbtnVisable === 'false' || this.param5.kjbtnVisable === '0') {
        return false
      } else {
        return false
      }
    },
    cellClick(obj, context, e) {
      let key = obj.column.property
      switch (key) {
        case 'regulationsName':
          if (obj.row.regulationsCode) {
            this.rulesCode = obj.row.regulationsCode
            this.ruleDialogShow = true
          }
          break
      }
      if (this.param5?.retroact === 'company' || this.param5?.tableHide) {
        return
      }
      switch (key) {
        case 'regulationName':
          HttpDetailModule.getDetailData(obj.row.regulationCode).then((res) => {
            if (res.code === '000000') {
              this.DetailData = res.data
              this.dialogTitle = '查看详情'
              this.dialogVisibleShow = true
            }
          })
          break
        default:
          break
      }
    },
    // 重新组装数据
    reassemblingParameters(pickFiledObject = {}) {
      const defaultReassemblingGroup = ['Code', 'Name']

      // 指定哪些key需要pick 默认取filed
      const filedList = this.incomeMsgConfig.map(item => item.field)
      // 以下特殊key对应取后面值的code+name形式
      const filedReassemblingGroup = {
        natureOfFunds: 'fundTypeCode',
        deptEconomyType: 'depBgtEcoCode',
        govEconomyType: 'govBgtEcoCode',
        settlementMethod: 'setModeCode',
        directFund: 'isDirCode',
        salaryMark: 'isSalCode',
        funcType: 'expFuncCode',
        businessOffice: 'manageMofDepCode',
        paymentMethod: 'payTypeCode',
        isThrExp: 'thrExpCode',
        payBusType: 'payBusTypeCode'
      }
      const newParameters = {}
      filedList.forEach(field => {
        let valueList = [pickFiledObject[field]]
        if (filedReassemblingGroup[field]) {
          valueList = defaultReassemblingGroup.map(replaceField => filedReassemblingGroup[field].replace('Code', replaceField)).map(newField => pickFiledObject[newField])
        }
        let newValueString = valueList.filter(Boolean).join('-') || ''// 去掉无用值 拼接
        newParameters[field] = newValueString
      })
      return newParameters
    },
    async showInfo() {
      let code = [this.selectedRow?.warningCode, this.selectedRow?.fiRuleCode].filter(Boolean).join('/')
      this.$http.get(`${BSURL.lmp_executeWarnGetDetail}${code}/0`).then(res => {
        if (res.code === '000000') {
          let supplayObject = {}
          if (res.data.executeData) {
            supplayObject = this.reassemblingParameters({ ...res.data, ...res.data.executeData })
            supplayObject.isUnionFunds = res.data.executeData?.proCatCode === null ? '' : res.data.executeData?.isFunCode + '-' + (res.data.executeData?.isFunCode === 1 ? '是' : '否')
            supplayObject.payBusType = res.data.executeData.payBusTypeCode === null ? '' : res.data.executeData.payBusTypeCode + '_' + res.data.executeData.payBusTypeName
          }
          if (res.data.payVoucherVo !== null) {
            supplayObject = { ...supplayObject, ...this.reassemblingParameters(res.data.payVoucherVo) }
          }
          if (res.data.baBgtInfoEntity !== null) {
            supplayObject = { ...supplayObject, ...this.reassemblingParameters(res.data.baBgtInfoEntity) }
          }
          this.supplyDataList = supplayObject
          this.handletableData = res.data?.regulationList
        } else {
          this.$message.error(res.message)
        }
      }).finally(() => {
        this.addLoading = false
      })
    }
  },
  watch: {},
  created() {
    if (!this.param5.show) { // 隐藏3个字段
      this.incomeMsgConfig = proconf.incomeMsgConfig.filter(item => {
        return !['payBusType', 'todoName', 'voidOrNot'].includes(item.field)
      })
    }
    this.showInfo()
  }
}
</script>
<style lang="scss" scoped>
  .payVoucherInput {
    .el-main{
      min-width: 480px;
    }
    margin: 15px;
    .el-card {
      margin-top: 0
    }
    /deep/ .fundPlanBody{
      height:auto !important;
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
    opacity: .3;
  }
  .el-row-item .font-set-small .hline{
    width:72px;
  }
</style>
