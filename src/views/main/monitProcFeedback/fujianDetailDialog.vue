<!--处理弹框-->
<template>
  <div>
    <vxe-modal
      v-model="fujianDialogVisible"
      :title="title"
      width="96%"
      height="90%"
      :show-footer="true"
      @close="dialogClose"
    >
      <div v-if="title === '查看详情信息'" v-loading="addLoading" class="payVoucherInput">
        <div>
          <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold;">明细信息
            <el-button v-param5Show="showKj" type="text" style="float:right" @click="dialogVisibleKjsm = true">口径说明</el-button>
            <el-dialog
              :visible.sync="dialogVisibleKjsm"
              width="50%"
            >
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
        <monitProcFeedbackFormInstance ref="monitProcFeedbackFormInstance" :default-form-data="defaultFormData" :warning-code="warningCode" />
      </div>
      <div slot="footer" style="height: 80px;margin:0 15px">
        <el-divider style="color:#E7EBF0" />
        <div type="flex" justify="space-around">
          <div>
            <vxe-button v-deClick v-loading="addLoading" status="primary" @click="doFeedback">确定</vxe-button>
            <vxe-button @click="dialogClose">取消</vxe-button>
          </div>
        </div>
      </div>
    </vxe-modal>
    <AddDialog
      v-if="dialogVisibleShow"
      :title="dialogTitle"
    />
    <RuleDialog v-if="ruleDialogShow" :code="rulesCode" />
  </div>
</template>
<script>
import { proconf } from '@/views/main/fundMonitoring/violationHandle/createProcessing/createProcessing.js'
import HttpModule from '@/api/frame/main/fundMonitoring/createProcessing.js'
import HttpDetailModule from '@/api/frame/main/Monitoring/WarningDataMager.js'
import monitProcFeedbackFormInstance from '@/views/main/monitProcFeedback/monitProcFeedbackFormInstance.vue'
import AddDialog from '@/views/main/MointoringMatters/BudgetAccountingWarningDataMager/children/addDialog.vue'
import RuleDialog from '@/views/main/monitProcFeedback/ruleDialog.vue'
export default {
  name: 'HandleDialog',
  components: { AddDialog, monitProcFeedbackFormInstance, RuleDialog },
  computed: {
    handletableColumnsConfig() {
      if (this.param5.retroact === 'company' || this.param5.tableHide) {
        console.log('compayHandletableColumnsConfig')
        return proconf.compayHandletableColumnsConfig
      } else { // 当配置了tableHide参数时，需要隐藏字段
        console.log('handletableColumnsConfig')
        return proconf.handletableColumnsConfig
      }
    },
    curNavModule() {
      return this.$store.state.curNavModule
    },
    footerConfig() {
      // if (!this.isXmProject) {
      //   return { 'footer-config': {} }
      // } else {
      return {}
      // }
    }
  },
  props: {
    defaultFormData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    title: {
      type: String,
      default: ''
    },
    param5: {
      type: Object,
      default() {
        return {}
      }
    },
    warningCode: {
      type: String,
      default: ''
    },
    fiRuleCode: {
      type: String,
      default: ''
    },
    dealNo: {
      type: String,
      default: ''
    },
    detailData: {
      type: Array,
      default() {
        return []
      }
    },
    isCreate: {
      type: Boolean,
      default: false
    },
    bussnessId: {
      type: String,
      default: '7'// 预算执行
    },
    regulationClass: {
      type: String,
      default: '0201'// 直达资金
    },
    isApprove: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ruleDialogShow: false,
      rulesCode: '',
      xmDisabled: false,
      // 规则详情信息
      DetailData: {},
      dialogVisibleShow: false,
      dialogVisibleKjsm: false,
      dialogTitle: '查看详情',
      options: [{
        value: '2',
        label: '认定正常'
      }, {
        value: '3',
        label: '需要核实（下发单位）'
      }],
      options2: [{
        value: '2',
        label: '认定正常'
      }, {
        value: '7',
        label: '已整改'
      }],
      value: '',
      value1: '',
      options1: [{
        value: '8',
        label: '退回'
      }, {
        value: '9',
        label: '通过'
      }],
      hsValue: '',
      hsOptions: [{
        value: '4',
        label: '核实无误'
      }, {
        value: '5',
        label: '已整改'
      }],
      // violateType: '', // 违规类型
      // fiRuleName: '', // 监控规则
      // warningLevel: '', // 预警级别
      // handleType: '', // 处理方式
      // mofdivCode: '', // 区划
      information1: '',
      returnReason: '',
      updateTime1: '',
      handler1: '',
      information2: '',
      updateTime2: '',
      handler2: '',
      information3: '',
      updateTime3: '',
      handler3: '',
      phone1: '',
      attachmentid1: '',
      phone2: '',
      attachmentid2: '',
      phone3: '',
      status: '',
      attachmentid3: '',
      doubtViolateExplain: '', // 疑似违规说明
      edit: false,
      handleResult: '',
      handlePersonName: '',
      handleTime: '',
      handleDesc: '',
      handleResultoptions: [
        { value: '1', label: '通过' },
        { value: '2', label: '退回' },
        { value: '3', label: '无需处理' }
      ],
      handletableData: [],
      incomeMsgConfig: proconf.incomeMsgConfig,
      supplyDataList: proconf.incomeMsgData,
      businessMsgConfig: proconf.businessMsgConfig,
      businessDataList: proconf.businessMsgData,
      checkDataList: {},
      // handletableColumnsConfig: proconf.handletableColumnsConfig,
      // compayHandletableColumnsConfig: proconf.compayHandletableColumnsConfig,
      createConfig: proconf.createConfig,
      createDataList: proconf.createDataList,
      createValidate: {
        violateType: [
          { required: true, message: '请选择违规类型', trigger: 'change' }
        ]
      },
      handlemainPagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      handletableConfig: {
      },
      fujianDialogVisible: true,
      addLoading: false,
      token: '',
      isContinuity: false,
      // 文件上传相关参数
      fileList: [],
      fileData: [],
      fileDataBakDel: [],
      fileList1: [],
      fileData1: [],
      fileDataBakDel1: [],
      fileList2: [],
      fileData2: [],
      fileDataBakDel2: [],
      fileList3: [],
      fileData3: [],
      fileDataBakDel3: [],
      attachmentId: '',
      showbox: false,
      showbtn: false,
      commentDept: 1,
      newWarn: '',
      routes: ['CompanyRetroactBySpecial', 'DepartmentRetroactBySpecial'],
      isManagement: false,
      // 口径说明是否显示
      kjbuttonVisable: '0'
    }
  },
  methods: {
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
    caliberDeclareHandle() {
      this.dialogVisibleKjsm = !this.dialogVisibleKjsm
    },
    itemChange({ $form, property, itemValue, data }, bsform) {
      console.log('fuck')
      // form表单联动当前字段change事件代理
      switch (property) {
        case 'violateType' :
          this.$refs.createRef?.$refs?.form?.clearValidate?.()
          this.createDataList.violateType = itemValue
          break
        case 'handleType' :
          this.createDataList.handleType = itemValue
          break
        case 'handleResult' :
          this.createDataList.handleResult = itemValue
          break
        default :
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
    // ajaxData({ params, currentPage, pageSize }) {
    //   this.handlemainPagerConfig.currentPage = currentPage
    //   this.handlemainPagerConfig.pageSize = pageSize
    //   this.showInfo()
    // },
    dialogClose() {
      this.$parent.fujianDialogVisible = false
      this.$parent.onSearch()
    },
    // 回显
    async showInfo() {
      this.addLoading = false
      if (this.isCreate === false) {
        if (this.isXmProject) {
          this.createConfig = proconf.checkConfig.filter(item1 => {
            return !['violateType'].includes(item1.field)
          })
        } else {
          this.createConfig = proconf.checkConfig
        }
      }
      let code = this.warningCode + '/' + this.fiRuleCode
      if (this.title === '查看详情信息') {
        let code2 = this.param5.show ? 1 : 0
        HttpModule.budgetgetDetail(code, code2).then(res => {
          this.addLoading = false
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
        })
      }
      this.getViolationType()
    },
    async changeValue() {
      // let serverTime = await HttpModule.getCurrentTime()
      let userInfo = this.$store.state.userInfo
      this.handler2 = userInfo.name
      // this.updateTime2 = serverTime.data
    },
    getCurrentServerTime() {
      HttpModule.getCurrentTime().then(res => {
        res.code === '000000' && (this.createDataList.issueTime = this.detailData[0].issueTime || res.data)
      })
    },
    // 审核改变
    changeValue1() {
      this.returnReason = ''
    },
    // 规则校验
    ruleTest() {
      this.businessDataList.fiRuleCode = this.detailData[0].fiRuleCode
      let param = {
        payVoucherDTO: this.businessDataList
      }
      this.addLoading = true
      HttpModule.ruleTest(param).then(res => {
        if (res.code === '000000') {
          this.addLoading = false
          if (res.data === true) {
            this.$message.success('规则校验通过!')
          } else {
            this.$message.error(this.detailData[0].fiRuleName + '规则校验未通过!')
          }
          this.$parent.dialogVisible = false
          this.$parent.getdata()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 反馈
    async doFeedback() {
      this.addLoading = true
      let result = await this.$refs.monitProcFeedbackFormInstance.doFeedback()
      console.log('result', result)
      this.addLoading = false
      if (result.code === '000000') {
        this.dialogClose()
      } else {
        this.$message.error(result.message)
      }
    },
    doFile() {
      let param = {
        dealNo: this.detailData[0].dealNo
      }
      HttpModule.handleFile(param).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.$message.success('归档成功')
          this.$parent.dialogVisible = false
          this.$parent.getdata()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getViolationType() {
      let params = {
        page: 1,
        size: 99999
      }
      HttpModule.queryViolationType(params).then(res => {
        if (res.code === '000000') {
          res.data.results.map(v => {
            v.value = v.name
            v.label = v.name
          })
          this.createConfig[0].itemRender.options = res.data.results
        }
      })
    },
    setFormItem() {
      if ([6, '6', 2, '2'].includes(this.bussnessId)) {
        if (this.regulationClass === '0207') {
          this.incomeMsgConfig = proconf.indexMsgConfig
          this.supplyDataList = proconf.indexMsgData
          this.kjbuttonVisable = '1'
        } else {
          this.incomeMsgConfig = proconf.bgtMsgConfig
          this.supplyDataList = proconf.incomeMsgData
        }
      } else {
        if (this.isXmProject) { // 项目项目隐藏三个字段
          this.createConfig = proconf.createConfig.filter(item1 => {
            return !['violateType'].includes(item1.field)
          })
        } else if (!this.param5.show) { // 现在默认隐藏3个字段
          this.incomeMsgConfig = proconf.incomeMsgConfig.filter(item => {
            return !['payBusType', 'todoName', 'voidOrNot'].includes(item.field)
          })
        }
        this.supplyDataList = proconf.incomeMsgData
      }
    }
  },
  watch: {
    value: {
      handler(curVal, preVal) {
        if (curVal !== preVal && curVal === '4') {
          this.information2 = ''
          this.phone2 = ''
        }
      },
      immediate: true
    },
    value1: {
      handler(curVal, preVal) {
        const { province } = this.$store.state.userInfo
        if (province?.slice(0, 4) === '3502') {
          if (curVal === '9') { // 通过
            this.xmDisabled = true
          } else if (curVal === '8') { // 退回
            this.xmDisabled = false
          }
        }
      },
      immediate: true
    }
  },
  created() {
    // 只有查看详情是才会动态渲染  且要根据路由去动态渲染
    console.log('进入福建查看详情')
    const routes = ['CompanyRetroactBySpecial', 'DepartmentRetroactBySpecial', 'DepartmentRetroact', 'CompanyRetroact', 'QueryProcessing']
    if (this.title === '查看详情信息' && routes.includes(this.$route.name)) {
      this.setFormItem()
    } else if (this.title === '查看详情信息' && !this.param5.show) { // 从事后监控跳转过来 隐藏3个字段
      this.incomeMsgConfig = proconf.incomeMsgConfig.filter(item => {
        return !['payBusType', 'todoName', 'voidOrNot'].includes(item.field)
      })
    }
    this.isManagement = this.title === '监控问询单信息' && this.routes.includes(this.$route.name) && [6, '6', 2, '2'].includes(this.bussnessId)
    if (this.isManagement) {
      this.options = this.options2
    }
    this.showInfo()
    if (this.title === '处理') {
      this.showbtn = true
    }
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
