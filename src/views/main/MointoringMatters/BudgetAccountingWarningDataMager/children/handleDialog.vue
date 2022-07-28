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
      <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">规则信息</div>
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
        <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">明细信息</div>
        <BsForm
          ref="incomeMsgRef"
          :form-items-config="incomeMsgConfig"
          :form-data-list="supplyDataList"
          :form-config="formConfig"
        />
      </div>
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
      this.$parent.fiRuleCode = ''
      this.$parent.queryTableDatas()
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
            this.supplyDataList.agencyName = res.data.executeData.agencyCode + '-' + res.data.executeData.agencyName
            this.supplyDataList.deptEconomyType = res.data.executeData.deptEconomyTypeCode + '-' + res.data.executeData.deptEconomyType
            this.supplyDataList.govEconomyType = res.data.executeData.govEconomyTypeCode + '-' + res.data.executeData.govEconomyType
            this.supplyDataList.settlementMethod = res.data.executeData.settlementMethodCode + '-' + res.data.executeData.settlementMethod
            this.supplyDataList.directFund = res.data.executeData.directFundCode + '-' + res.data.executeData.directFund
            this.supplyDataList.salaryMark = res.data.executeData.salaryMarkCode + '-' + res.data.executeData.salaryMark
            this.supplyDataList.isUnionFunds = res.data.executeData.isUnionFunds + '-' + (res.data.executeData.isUnionFunds === 1 ? '是' : '否')
            this.supplyDataList.fiDate = res.data.executeData.fiDate
            this.supplyDataList.isThrExp = res.data.executeData.isThrExp + (res.data.executeData.thrExpName === null ? '' : '-' + res.data.executeData.thrExpName)
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
