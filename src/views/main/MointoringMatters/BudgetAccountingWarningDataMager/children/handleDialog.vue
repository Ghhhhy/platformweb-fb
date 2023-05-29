<!--处理弹框-->
<template>
  <vxe-modal
    v-model="dialogVisible"
    :title="title"
    width="96%"
    height="90%"
    :show-footer="true"
    @close="dialogClose"
  >
    <div v-loading="addLoading" class="payVoucherInput">
      <div style="margin-bottom:5px;font-size:16px;font-weight:bold" class="detail-title">规则信息</div>
      <BsTable
        ref="handleTableRef"
        height="200px"
        :footer-config="false"
        :table-columns-config="handletableColumnsConfig"
        :table-data="handletableData"
        :table-config="handletableConfig"
        :toolbar-config="false"
        :pager-config="false"
      />
      <div>
        <div style="margin-bottom:5px;font-size:16px;font-weight:bold" class="detail-title">明细信息</div>
        <BsForm
          ref="incomeMsgRef"
          :form-items-config="incomeMsgConfig"
          :form-data-list="supplyDataList"
          :form-config="formConfig"
        />
      </div>
      <div style="margin-top:10px">
        <div style="margin-bottom:5px;font-size:16px;font-weight:bold" class="detail-title">处理信息</div>
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
                  </el-select>
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
</template>
<script>
import { proconf } from '../BudgetAccountingWarningDataMager.js'
import HttpModule from '@/api/frame/main/Monitoring/WarningDataMager.js'
export default {
  name: 'HandleDialog',
  components: {},
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
      edit: false,
      handleResult: '',
      handlePersonName: '',
      handleTime: '',
      handleDesc: '',
      handleResultoptions: [
        { value: '1', label: '通过' },
        { value: '2', label: '退回' }
      ],
      handletableData: [],
      incomeMsgConfig: proconf.incomeMsgConfig,
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
      showbtn: false
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

          if (res.data.executeData !== null) {
            this.supplyDataList.agencyName = res.data.executeData?.agencyCode + '-' + res.data.executeData?.agencyName
            this.supplyDataList.proName = res.data.executeData?.proCode + '-' + res.data.executeData?.proName
            this.supplyDataList.natureOfFunds = res.data.executeData?.fundTypeCode + '-' + res.data.executeData?.fundTypeName
            this.supplyDataList.proCatName = res.data.executeData?.proCatCode === null ? '' : res.data.executeData?.proCatCode + '-' + res.data.executeData?.proCatName || ''
            this.supplyDataList.deptEconomyType = res.data.executeData?.depBgtEcoCode + '-' + res.data.executeData?.depBgtEcoName
            this.supplyDataList.govEconomyType = res.data.executeData?.govBgtEcoCode + '-' + res.data.executeData?.govBgtEcoName
            this.supplyDataList.settlementMethod = res.data.executeData?.setModeCode + '-' + res.data.executeData?.setModeName
            this.supplyDataList.directFund = res.data.executeData?.isDirCode === null ? '' : res.data.executeData?.isDirCode + '-' + res.data.executeData?.isDirName || ''
            this.supplyDataList.salaryMark = res.data.executeData?.isSalCode + '-' + res.data.executeData?.isSalName
            this.supplyDataList.isUnionFunds = res.data.executeData?.isFunCode + '-' + (res.data.executeData?.isFunCode === 1 ? '是' : '否')
            this.supplyDataList.fiDate = res.data.executeData?.fiDate
            this.supplyDataList.funcType = res.data.executeData?.expFuncCode + '-' + res.data.executeData?.expFuncName
            this.supplyDataList.businessOffice = res.data.executeData?.manageMofDepCode + '-' + res.data.executeData?.manageMofDepName
            this.supplyDataList.paymentMethod = res.data.executeData?.payTypeCode + '-' + res.data.executeData?.payTypeName
            this.supplyDataList.isThrExp = res.data.executeData?.thrExpCode + (res.data.executeData?.thrExpName === null ? '' : '-' + res.data.executeData?.thrExpName)
            this.supplyDataList.trackProName = res.data.executeData && res.data.executeData?.trackProCode && res.data.executeData?.trackProName ? res.data.executeData?.trackProCode + '_' + res.data.executeData?.trackProName : ''
            this.supplyDataList.useDes = res.data.executeData && res.data.executeData?.useDes
            this.supplyDataList.payBusType = res.data.executeData.payBusTypeCode + '_' + res.data.executeData.payBusTypeName
          }

          this.handletableData = res.data.regulationList
          if (this.title === '详细信息') {
            this.edit = true
            this.handleResult = res.data.handleResult ? res.data.handleResult.toString() : ''
            this.handleDesc = res.data.handleDesc
            this.handlePersonName = res.data.handlePersonName
            this.handleTime = res.data.handleTime
          }
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
