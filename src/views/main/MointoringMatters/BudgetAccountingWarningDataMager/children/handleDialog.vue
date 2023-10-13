<!--处理弹框-->
<template>
  <div>
    <vxe-modal
      v-model="dialogVisible"
      :title="title"
      width="96%"
      height="90%"
      :show-footer="true"
      @close="dialogClose"
    >
      <div v-loading="addLoading" class="payVoucherInput">
        <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">规则信息</div>
        <BsTable
          ref="handleTableRef"
          height="70px"
          :footer-config="false"
          :table-columns-config="handletableColumnsConfig"
          :table-data="handletableData"
          :table-config="handletableConfig"
          :toolbar-config="false"
          :pager-config="false"
          @cellClick="cellClick"
        />
        <div>
          <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">明细信息</div>
          <BsForm
            ref="incomeMsgRef"
            :form-items-config="incomeMsgConfig"
            :form-data-list="supplyDataList"
            :form-config="formConfig"
          />
        </div>
        <template v-if="violationShow">
          <div style="margin-top:10px">
            <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">违规信息</div>
            <el-row>
              <el-col>
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px">&nbsp;违规信息</div>
                      <el-input
                        v-model="warnMsg"
                        :disabled="edit"
                        placeholder="违规信息"
                        style="width:90%"
                        :rows="2"
                        type="textarea"
                      />
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
            </el-row>
          </div>
        </template>
        <template v-if="violationShow">
          <div style="margin-top:10px">
            <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">处理信息</div>
            <el-row>
              <el-col :span="12">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px">&nbsp;处理结果</div>
                      <el-select
                        v-model="handleResult"
                        :disabled="edit"
                        placeholder="处理结果"
                        style="width:45%"
                      >
                        <el-option
                          v-for="item in handleResultoptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
              <el-col v-if="showbtn === false" :span="12">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px">&nbsp;处理人</div>
                      <el-input
                        v-model="handlePersonName"
                        :disabled="edit"
                        placeholder="处理人"
                        style="width:45%"
                      />
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
              <el-col v-if="showbtn === false" :span="12">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px">&nbsp;处理时间</div>
                      <el-input
                        v-model="handleTime"
                        :disabled="edit"
                        placeholder="处理时间"
                        style="width:45%"
                      />
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
              <el-col :span="12">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px">&nbsp;处理意见</div>
                      <el-input
                        v-model="handleDesc"
                        :disabled="edit"
                        placeholder="处理意见"
                        style="width:45%"
                      />
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
            </el-row>
          </div>
        </template>
      </div>
      <div slot="footer" style="height: 80px;margin:0 15px">
        <div v-if="showbox" id="bigbox"></div>
        <el-divider style="color:#E7EBF0" />
        <div type="flex" justify="space-around">
          <div>
            <vxe-button id="savebutton" @click="showAttachmentMask">附件预览</vxe-button>
            <vxe-button @click="dialogClose">取消</vxe-button>
            <vxe-button v-if="showbtn === true" id="savebutton" status="primary" @click="doInsert">确定</vxe-button>
          </div>
        </div>
      </div>
    </vxe-modal>
    <AddDialog
      v-if="dialogVisibleShow"
      :title="dialogTitle"
    />
  </div>
</template>
<script>
import { proconf } from '../BudgetAccountingWarningDataMager.js'
import HttpModule from '@/api/frame/main/Monitoring/WarningDataMager.js'
import AddDialog from './addDialog'
export default {
  name: 'HandleDialog',
  components: {
    AddDialog
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
    warningCode: {
      type: String,
      default: ''
    },
    fiRuleCode: {
      type: String,
      default: ''
    },
    isNeedFiRuleCode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      violationShow: true,
      warnMsg: '',
      dialogVisibleShow: false,
      dialogTitle: '查看详情',
      edit: false,
      handleResult: '1',
      handlePersonName: '',
      handleTime: '',
      handleDesc: '',
      handleResultoptions: [
        { value: '1', label: '放行' },
        { value: '2', label: '改正' },
        { value: '3', label: '禁止' }
      ],
      handletableData: [],
      incomeMsgConfig: proconf.incomeMsgConfig,
      incomeMsgConfig2: proconf.incomeMsgConfig2,
      supplyDataList: proconf.incomeMsgData,
      formConfig: proconf.formConfig,
      formValidationConfig: proconf.formValidationConfig,
      handletableColumnsConfig: proconf.handletableColumnsConfig,
      handlemainPagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      handletableConfig: {
        renderers: {
          // 编辑 附件 操作日志
          $payVoucherInputGloableOptionRow: proconf.gloableOptionRow
        },
        methods: {
          onOptionRowClick: this.onOptionRowClick
        }
      },
      dialogVisible: true,
      addLoading: false,
      token: '',
      isContinuity: false,
      // 文件上传相关参数
      fileList: [],
      fileData: [],
      fileDataBakDel: [],
      attachmentId: '',
      showbox: false,
      showbtn: false,
      DetailData: {}
    }
  },
  methods: {
    // ajaxData({ params, currentPage, pageSize }) {
    //   this.handlemainPagerConfig.currentPage = currentPage
    //   this.handlemainPagerConfig.pageSize = pageSize
    //   this.showInfo()
    // },
    dialogClose() {
      this.$parent.dialogVisible = false
      if (!this.isNeedFiRuleCode) {
        this.$parent.fiRuleCode = ''
      }
      // this.$parent.queryTableDatas()
    },
    moneyFormat(amt) {
      const num = Math.round(amt * 100) / 100
      let c = (num.toString().indexOf('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      if (c.length >= 3 & c.indexOf('.', c.length - 2) === c.length - 2) {
        c = c + '0'
      }
      if (c.indexOf('.') === -1) {
        c = c + '.00'
      }
      return c
    },
    // 回显
    showInfo() {
      this.addLoading = true
      let code = this.warningCode + '/' + this.fiRuleCode
      console.log(this.warningCode)
      console.log(this.fiRuleCode)
      HttpModule.budgetgetDetail(code).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          // let handledata = res.data.executeData
          // handledata.createTime = res.data.createTime
          // handledata.createTime = res.data.warningCode
          // handledata.createTime=res.data.createTime
          // this.supplyDataList = handledata
          this.supplyDataList = { ...res.data, ...res.data.executeData }
          this.warnMsg = res.data.warnMsg
          if (res.data.executeData !== null) {
            this.supplyDataList.pay_app_amt = this.moneyFormat(this.supplyDataList.pay_app_amt)
            this.supplyDataList.agency_name = res.data.executeData.agency_code + '-' + res.data.executeData.agency_name
            this.supplyDataList.pro_name = res.data.executeData.pro_code + '-' + res.data.executeData.pro_name
            this.supplyDataList.pro_cat_name = res.data.executeData.pro_cat_code + '-' + res.data.executeData.pro_cat_name
            this.supplyDataList.pay_type_name = res.data.executeData.pay_type_code + '-' + res.data.executeData.pay_type_name
            this.supplyDataList.is_fun_name = res.data.executeData.is_fun_code === null ? '' : res.data.executeData.is_fun_code + '-' + res.data.executeData.is_fun_name === null ? '' : res.data.executeData.is_fun_name
            this.supplyDataList.exp_func_name = res.data.executeData.exp_func_code + '-' + res.data.executeData.exp_func_name
            this.supplyDataList.dep_bgt_eco_name = res.data.executeData.dep_bgt_eco_code + '-' + res.data.executeData.dep_bgt_eco_name
            this.supplyDataList.gov_bgt_eco_name = res.data.executeData.gov_bgt_eco_code + '-' + res.data.executeData.gov_bgt_eco_name
            this.supplyDataList.set_mode_name = res.data.executeData.set_mode_code + '-' + res.data.executeData.set_mode_name
            this.supplyDataList.is_dir_name = (res.data.executeData.is_dir_code === null ? '' : res.data.executeData.is_dir_code) + '-' + (res.data.executeData.is_dir_name === null ? '' : res.data.executeData.is_dir_name)
            this.supplyDataList.is_sal_name = res.data.executeData.is_sal_code + '-' + res.data.executeData.is_sal_name
            this.supplyDataList.manage_mof_dep_name = res.data.executeData.manage_mof_dep_code + '-' + res.data.executeData.manage_mof_dep_name
            this.supplyDataList.isUnionFunds = res.data.executeData.isUnionFunds + '-' + (res.data.executeData.isUnionFunds === 1 ? '是' : '否')
            this.supplyDataList.fiDate = res.data.executeData.fiDate
            this.supplyDataList.thr_exp_name = res.data.executeData.thr_exp_code + (res.data.executeData.thr_exp_name === null ? '' : '-' + res.data.executeData.thr_exp_name)
            this.supplyDataList.applyName = res.data.executeData.applyName
            this.supplyDataList.applyDial = res.data.executeData.applyDial
            this.supplyDataList.payAppNo = res.data.executeData.payAppNo
            this.supplyDataList.payeeAcctName = res.data.executeData.payeeAcctName
            this.supplyDataList.payeeAcctNo = res.data.executeData.payeeAcctNo
            this.supplyDataList.payeeAcctBankName = res.data.executeData.payeeAcctBankName
            this.supplyDataList.corBgtDocNoName = res.data.executeData.corBgtDocNoName
            this.supplyDataList.proName = res.data.executeData.proCode + '-' + res.data.executeData.proName
          }
          if (res.data.payVoucherVo !== null) {
            this.supplyDataList.payBusType = res.data.payVoucherVo.payBusType
            this.supplyDataList.todoName = res.data.payVoucherVo.todoName
            this.supplyDataList.voidOrNot = res.data.payVoucherVo.voidOrNot
          }
          this.handletableData = res.data.regulationList
          this.handleDesc = res.data?.oldHandleDesc || ''

          if (this.title === '详细信息') {
            this.edit = true
            this.handleResult = res.data.handleResult ? res.data.handleResult.toString() : ''
            this.handleDesc = res.data.handleDesc
            this.handlePersonName = res.data.handlePersonName
            this.handleTime = res.data.handleTime
            if (this.handletableData[0].regulationClass === '0104') {
              this.showForm()
            }
            if (this.handletableData[0].regulationClass === '0103') {
              this.showForm1()
            }
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    showForm() {
      this.incomeMsgConfig = proconf.incomeMsgConfig1
      this.addLoading = true
      let code = this.warningCode + '/' + this.fiRuleCode
      console.log(this.warningCode)
      console.log(this.fiRuleCode)
      HttpModule.budgetpayDetail(code).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.supplyDataList = { ...res.data, ...res.data.baBgtInfoEntity }
          this.supplyDataList.amount = this.moneyFormat(this.supplyDataList.amount)
          this.supplyDataList.curAmt = this.moneyFormat(this.supplyDataList.curAmt)
          // if (res.data.executeData !== null) {
          //   this.supplyDataList.pay_app_amt = this.moneyFormat(this.supplyDataList.pay_app_amt)
          //   this.supplyDataList.agency_name = res.data.executeData.agency_code + '-' + res.data.executeData.agency_name
          //   this.supplyDataList.pro_name = res.data.executeData.pro_code + '-' + res.data.executeData.pro_name
          //   this.supplyDataList.pro_cat_name = res.data.executeData.pro_cat_code + '-' + res.data.executeData.pro_cat_name
          //   this.supplyDataList.pay_type_name = res.data.executeData.pay_type_code + '-' + res.data.executeData.pay_type_name
          //   this.supplyDataList.is_fun_name = res.data.executeData.is_fun_code + '-' + res.data.executeData.is_fun_name
          //   this.supplyDataList.exp_func_name = res.data.executeData.exp_func_code + '-' + res.data.executeData.exp_func_name
          //   this.supplyDataList.dep_bgt_eco_name = res.data.executeData.dep_bgt_eco_code + '-' + res.data.executeData.dep_bgt_eco_name
          //   this.supplyDataList.gov_bgt_eco_name = res.data.executeData.gov_bgt_eco_code + '-' + res.data.executeData.gov_bgt_eco_name
          //   this.supplyDataList.set_mode_name = res.data.executeData.set_mode_code + '-' + res.data.executeData.set_mode_name
          //   this.supplyDataList.is_dir_name = (res.data.executeData.is_dir_code === null ? '' : res.data.executeData.is_dir_code) + '-' + (res.data.executeData.is_dir_name === null ? '' : res.data.executeData.is_dir_name)
          //   this.supplyDataList.is_sal_name = res.data.executeData.is_sal_code + '-' + res.data.executeData.is_sal_name
          //   this.supplyDataList.manage_mof_dep_name = res.data.executeData.manage_mof_dep_code + '-' + res.data.executeData.manage_mof_dep_name
          //   this.supplyDataList.isUnionFunds = res.data.executeData.isUnionFunds + '-' + (res.data.executeData.isUnionFunds === 1 ? '是' : '否')
          //   this.supplyDataList.fiDate = res.data.executeData.fiDate
          //   this.supplyDataList.thr_exp_name = res.data.executeData.thr_exp_code + (res.data.executeData.thr_exp_name === null ? '' : '-' + res.data.executeData.thr_exp_name)
          // }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    showForm1() {
      this.incomeMsgConfig = this.incomeMsgConfig2
      this.addLoading = true
      let code = this.warningCode + '/' + this.fiRuleCode
      console.log(this.warningCode)
      console.log(this.fiRuleCode)
      HttpModule.budgetgetDetail(code).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.supplyDataList = { ...res.data, ...res.data.baBgtPmAnnualEntity }
          this.supplyDataList.amount = this.moneyFormat(this.supplyDataList.amount)
          this.supplyDataList.curAmt = this.moneyFormat(this.supplyDataList.curAmt)
          // if (res.data.executeData !== null) {
          //   this.supplyDataList.pay_app_amt = this.moneyFormat(this.supplyDataList.pay_app_amt)
          //   this.supplyDataList.agency_name = res.data.executeData.agency_code + '-' + res.data.executeData.agency_name
          //   this.supplyDataList.pro_name = res.data.executeData.pro_code + '-' + res.data.executeData.pro_name
          //   this.supplyDataList.pro_cat_name = res.data.executeData.pro_cat_code + '-' + res.data.executeData.pro_cat_name
          //   this.supplyDataList.pay_type_name = res.data.executeData.pay_type_code + '-' + res.data.executeData.pay_type_name
          //   this.supplyDataList.is_fun_name = res.data.executeData.is_fun_code + '-' + res.data.executeData.is_fun_name
          //   this.supplyDataList.exp_func_name = res.data.executeData.exp_func_code + '-' + res.data.executeData.exp_func_name
          //   this.supplyDataList.dep_bgt_eco_name = res.data.executeData.dep_bgt_eco_code + '-' + res.data.executeData.dep_bgt_eco_name
          //   this.supplyDataList.gov_bgt_eco_name = res.data.executeData.gov_bgt_eco_code + '-' + res.data.executeData.gov_bgt_eco_name
          //   this.supplyDataList.set_mode_name = res.data.executeData.set_mode_code + '-' + res.data.executeData.set_mode_name
          //   this.supplyDataList.is_dir_name = (res.data.executeData.is_dir_code === null ? '' : res.data.executeData.is_dir_code) + '-' + (res.data.executeData.is_dir_name === null ? '' : res.data.executeData.is_dir_name)
          //   this.supplyDataList.is_sal_name = res.data.executeData.is_sal_code + '-' + res.data.executeData.is_sal_name
          //   this.supplyDataList.manage_mof_dep_name = res.data.executeData.manage_mof_dep_code + '-' + res.data.executeData.manage_mof_dep_name
          //   this.supplyDataList.isUnionFunds = res.data.executeData.isUnionFunds + '-' + (res.data.executeData.isUnionFunds === 1 ? '是' : '否')
          //   this.supplyDataList.fiDate = res.data.executeData.fiDate
          //   this.supplyDataList.thr_exp_name = res.data.executeData.thr_exp_code + (res.data.executeData.thr_exp_name === null ? '' : '-' + res.data.executeData.thr_exp_name)
          // }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 处理
    doInsert() {
      if (this.handleResult === '') {
        this.$message.warning('请选择处理结果')
        return
      }
      if (this.handleDesc === '') {
        this.$message.warning('请输入处理意见')
        return
      }
      if (this.title === '处理') {
        let param = {
          'warningCode': this.warningCode,
          'handleResult': this.handleResult,
          'handleDesc': this.handleDesc,
          'warningMsg': this.warnMsg,
          fiRuleCode: this.fiRuleCode
        }
        this.addLoading = true
        HttpModule.budgethandleDetail(param).then(res => {
          this.addLoading = false
          if (res.code === '000000') {
            this.$message.success('处理成功')
            this.$parent.dialogVisible = false
            this.$parent.queryTableDatas()
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    // 附件预览
    showAttachmentMask() {
      this.$parent.showAttachment(this.$parent.selectData)
    },
    cellClick(obj, context, e) {
      console.log(obj)
      let key = obj.column.property
      switch (key) {
        case 'regulationName':
          HttpModule.getDetailData(obj.row.regulationCode).then((res) => {
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
    getDetail(val) {
      HttpModule.getDetailData(val).then(res => {
        if (res.code === '000000') {
          this.DetailData = res.data
          this.dialogVisibleShow = true
          this.dialogTitle = '查看详情'
        }
      })
    }
  },
  watch: {
  },
  created() {
    this.showInfo()
    if (this.title === '处理') {
      this.showbtn = true
    }
  }
}
</script>
<style lang="scss">
  .payVoucherInput {
    margin: 15px;
    .el-card {
      margin-top: 0
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
