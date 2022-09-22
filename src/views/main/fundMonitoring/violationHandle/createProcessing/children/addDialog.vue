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
    <div v-if="title === '查看详情信息'" v-loading="addLoading" class="payVoucherInput">
      <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">规则信息</div>
      <BsTable
        ref="handleTableRef"
        height="200px"
        :footer-config="{}"
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
        />
      </div>
    </div>
    <div v-if="title === '监控处理单信息'" v-loading="addLoading" class="payVoucherInput">
      <div>
        <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">疑似违规信息</div>
        <BsForm
          ref="createRef"
          :form-items-config="createConfig"
          :form-data-list="createDataList"
          :is-editable="isCreate"
          @itemChange="itemChange"
        />
      </div>
      <el-col :span="24">
        <el-container>
          <el-main width="100%">
            <el-row style="display: flex">
              <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;疑似违规说明</div>
              <el-input
                v-model="doubtViolateExplain"
                type="textarea"
                :disabled="!isCreate"
                placeholder="疑似违规说明"
                style="width:90%"
              />
            </el-row>
          </el-main>
        </el-container>
      </el-col>
      <div v-if="param5.isRetroact === 'true' || param5.isCreate === 'true' || param5.isArchive === 'true' || param5.isQuery === 'true'" style="margin-top:10px">
        <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">预算单位整改信息</div>
        <el-row>
          <el-col :span="24">
            <el-container>
              <el-main width="100%">
                <el-row style="display: flex">
                  <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;整改意见</div>
                  <el-input
                    v-model="information1"
                    type="textarea"
                    :disabled="param5.retroact !== 'company'"
                    placeholder="预算单位整改意见"
                    style="width:90%"
                  />
                </el-row>
              </el-main>
            </el-container>
          </el-col>
          <el-col :span="8">
            <el-container>
              <el-main width="100%">
                <el-row style="display: flex">
                  <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;处理人</div>
                  <el-input
                    v-model="handler1"
                    disabled
                    placeholder="处理人"
                    style="width:45%"
                  />
                </el-row>
              </el-main>
            </el-container>
          </el-col>
          <el-col :span="8">
            <el-container>
              <el-main width="100%">
                <el-row style="display: flex">
                  <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;处理时间</div>
                  <el-input
                    v-model="updateTime1"
                    disabled
                    placeholder="处理时间"
                    style="width:45%"
                  />
                </el-row>
              </el-main>
            </el-container>
          </el-col>
        </el-row>
      </div>
      <div v-if="param5.retroact === 'department' || param5.retroact === 'branch' || param5.isCreate === 'true' || param5.isArchive === 'true' || param5.isQuery === 'true'" style="margin-top:10px">
        <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">主管部门整改信息</div>
        <el-row>
          <el-col :span="24">
            <el-container>
              <el-main width="100%">
                <el-row style="display: flex">
                  <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;整改意见</div>
                  <el-input
                    v-model="information2"
                    type="textarea"
                    :disabled="param5.retroact !== 'branch'"
                    placeholder="主管部门整改意见"
                    style="width:90%"
                  />
                </el-row>
              </el-main>
            </el-container>
          </el-col>
          <el-col :span="8">
            <el-container>
              <el-main width="100%">
                <el-row style="display: flex">
                  <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;处理人</div>
                  <el-input
                    v-model="handler2"
                    disabled
                    placeholder="处理人"
                    style="width:45%"
                  />
                </el-row>
              </el-main>
            </el-container>
          </el-col>
          <el-col :span="8">
            <el-container>
              <el-main width="100%">
                <el-row style="display: flex">
                  <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;处理时间</div>
                  <el-input
                    v-model="updateTime2"
                    disabled
                    placeholder="处理时间"
                    style="width:45%"
                  />
                </el-row>
              </el-main>
            </el-container>
          </el-col>
        </el-row>
      </div>
      <div v-if="param5.retroact === 'department' || param5.isCreate === 'true' || param5.isArchive === 'true' || param5.isQuery === 'true'" style="margin-top:10px">
        <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">主管处室整改信息</div>
        <el-row>
          <el-col :span="24">
            <el-container>
              <el-main width="100%">
                <el-row style="display: flex">
                  <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;主管处室整改意见</div>
                  <el-input
                    v-model="information3"
                    type="textarea"
                    :disabled="param5.retroact !== 'department'"
                    placeholder="主管处室整改意见"
                    style="width:90%"
                  />
                </el-row>
              </el-main>
            </el-container>
          </el-col>
          <el-col :span="8">
            <el-container>
              <el-main width="100%">
                <el-row style="display: flex">
                  <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;处理人</div>
                  <el-input
                    v-model="handler3"
                    disabled
                    placeholder="处理人"
                    style="width:45%"
                  />
                </el-row>
              </el-main>
            </el-container>
          </el-col>
          <el-col :span="8">
            <el-container>
              <el-main width="100%">
                <el-row style="display: flex">
                  <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;处理时间</div>
                  <el-input
                    v-model="updateTime3"
                    disabled
                    placeholder="处理时间"
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
          <vxe-button v-if="param5.isCreate === 'true' && title === '监控处理单信息'" status="primary" @click="doIssue">生成并下发</vxe-button>
          <vxe-button v-if="param5.isArchive === 'true' && title === '监控处理单信息'" status="primary" @click="doFile">归档</vxe-button>
          <vxe-button v-if="param5.isRetroact === 'true'" status="primary" @click="doFeedback">确定</vxe-button>
          <vxe-button @click="dialogClose">取消</vxe-button>
        </div>
      </div>
    </div>
  </vxe-modal>
</template>
<script>
import { proconf } from '../createProcessing.js'
import HttpModule from '@/api/frame/main/fundMonitoring/createProcessing.js'
import moment from 'moment'
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
    status: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // violateType: '', // 违规类型
      // fiRuleName: '', // 监控规则
      // warningLevel: '', // 预警级别
      // handleType: '', // 处理方式
      // mofdivCode: '', // 区划
      information1: '',
      updateTime1: '',
      handler1: '',
      information2: '',
      updateTime2: '',
      handler2: '',
      information3: '',
      updateTime3: '',
      handler3: '',
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
      handletableColumnsConfig: proconf.handletableColumnsConfig,
      createConfig: proconf.createConfig,
      createDataList: proconf.createDataList,
      handlemainPagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      handletableConfig: {
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
      commentDept: 'unit'
    }
  },
  methods: {
    itemChange({ $form, property, itemValue, data }, bsform) {
      console.log('fuck')
      // form表单联动当前字段change事件代理
      switch (property) {
        case 'violateType' :
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
    // ajaxData({ params, currentPage, pageSize }) {
    //   this.handlemainPagerConfig.currentPage = currentPage
    //   this.handlemainPagerConfig.pageSize = pageSize
    //   this.showInfo()
    // },
    dialogClose() {
      this.$parent.dialogVisible = false
      if (this.status === 0) {
        this.$parent.queryTableDatas()
      } else {
        this.$parent.getdata()
      }
    },
    // 回显
    showInfo() {
      this.addLoading = true
      if (this.isCreate === false) {
        this.createConfig = proconf.checkConfig
      }
      let code = this.warningCode + '/' + this.fiRuleCode
      if (this.title === '查看详情信息') {
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
              this.supplyDataList.deptEconomyType = res.data.executeData?.deptEconomyTypeCode + '-' + res.data.executeData?.deptEconomyType
              this.supplyDataList.govEconomyType = res.data.executeData?.govEconomyTypeCode + '-' + res.data.executeData?.govEconomyType
              this.supplyDataList.settlementMethod = res.data.executeData?.settlementMethodCode + '-' + res.data.executeData?.settlementMethod
              this.supplyDataList.directFund = res.data.executeData?.directFundCode + '-' + res.data.executeData?.directFund || ''
              this.supplyDataList.salaryMark = res.data.executeData?.salaryMarkCode + '-' + res.data.executeData?.salaryMark
              this.supplyDataList.isUnionFunds = res.data.executeData?.isUnionFunds + '-' + (res.data.executeData?.isUnionFunds === 1 ? '是' : '否')
              this.supplyDataList.fiDate = res.data.executeData?.fiDate
              this.supplyDataList.isThrExp = res.data.executeData?.isThrExp + (res.data.executeData?.thrExpName === null ? '' : '-' + res.data.executeData?.thrExpName)
            }
            this.handletableData = res.data?.regulationList
          } else {
            this.$message.error(res.message)
          }
        })
      } else if (this.title === '监控处理单信息') {
        this.createDataList.fiRuleName = this.detailData[0].fiRuleName
        this.createDataList.warnLevel = this.detailData[0].warnLevel
        this.createDataList.mofDivCode = this.detailData[0].mofDivCode
        this.createDataList.agencyCode = this.detailData[0].agencyCode
        this.createDataList.agencyName = this.detailData[0].agencyName
        this.createDataList.violateType = this.detailData[0].violateType
        this.createDataList.handleType = this.detailData[0].handleType
        this.createDataList.handleResult = this.detailData[0].handleResult
        this.doubtViolateExplain = this.detailData[0].doubtViolateExplain
        this.createDataList.issueTime = moment().format('YYYY-MM-DD HH:mm:ss')
        // HttpModule.getDetail(this.dealNo).then(res => {
        //   this.addLoading = false
        //   if (res.code === '000000') {
        // this.createDataList = res.data 疑似违规信息
        // this.information1
        // this.updateTime1
        // this.handler1
        // this.information2
        // this.updateTime2
        // this.handler2
        // this.information3
        // this.updateTime3
        // this.handler3
        // this.doubtViolateExplain
        let userInfo = this.$store.state.userInfo
        if (this.param5.isArchive === 'true' || this.param5.isQuery === 'true') {
          this.handler3 = this.detailData[0].handler3
          this.updateTime3 = this.detailData[0].updateTime3
          this.information3 = this.detailData[0].information3
          this.handler1 = this.detailData[0].handler1
          this.updateTime1 = this.detailData[0].updateTime1
          this.information1 = this.detailData[0].information1
          this.handler2 = this.detailData[0].handler2
          this.updateTime2 = this.detailData[0].updateTime2
          this.information2 = this.detailData[0].information2
        }
        switch (this.param5.retroact) {
          case 'company':
            this.handler1 = userInfo.name
            this.updateTime1 = moment().format('YYYY-MM-DD HH:mm:ss')
            this.commentDept = 1
            break
          case 'branch':
            debugger
            this.handler2 = userInfo.name
            this.updateTime2 = moment().format('YYYY-MM-DD HH:mm:ss')
            this.handler1 = this.detailData[0].handler1
            if (this.detailData[0].updateTime1) {
              this.updateTime1 = this.detailData[0].updateTime1
            }
            this.information1 = this.detailData[0].information1
            this.commentDept = 2
            break
          case 'department':
            this.handler3 = userInfo.name
            this.updateTime3 = moment().format('YYYY-MM-DD HH:mm:ss')
            this.handler1 = this.detailData[0].handler1
            if (this.detailData[0].updateTime1) {
              this.updateTime1 = this.detailData[0].updateTime1
            }
            if (this.detailData[0].updateTime2) {
              this.updateTime2 = this.detailData[0].updateTime2
            }
            this.information1 = this.detailData[0].information1
            this.handler2 = this.detailData[0].handler2
            this.information2 = this.detailData[0].information2
            this.commentDept = 3
            break
          default:
            break
        }
        //   } else {
        //     this.$message.error(res.message)
        //   }
        // })
      }
      this.getViolationType()
    },
    // 生成下发
    async doIssue() {
      let param = {
        agencyName: this.createDataList.agencyName,
        agencyCode: this.createDataList.agencyCode,
        violateType: this.createDataList.violateType, // 违规类型
        fiRuleName: this.createDataList.fiRuleName, // 监控规则
        warningLevel: this.createDataList.warnLevel, // 预警级别
        handleType: this.createDataList.handleType, // 处理方式
        mofDivCode: this.createDataList.mofDivCode, // 区划
        handleResult: this.createDataList.handleResult, // 处理结果
        issueTime: this.createDataList.issueTime,
        // information1: this.information1,
        // updateTime1: this.updateTime1,
        // handler1: this.handler1,
        // information2: this.information2,
        // updateTime2: this.updateTime2,
        // handler2: this.handler2,
        // information3: this.information3,
        // updateTime3: this.updateTime3,
        // handler3: this.handler3,
        doubtViolateExplain: this.doubtViolateExplain, // 疑似违规说明
        warnid: this.detailData[0].warnid,
        fiRuleCode: this.detailData[0].fiRuleCode,
        warningCode: this.detailData[0].warningCode
      }
      this.addLoading = true
      await HttpModule.handleAdd(param).then(res => {
        if (res.code === '000000') {
          this.addLoading = false
          if (res.code === '000000') {
            this.$message.success('生成并下发成功')
            this.$parent.dialogVisible = false
            this.$parent.queryTableDatas()
          } else {
            this.$message.error(res.message)
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 反馈
    doFeedback() {
      if (this.param5.retroact === 'company' && this.information1 === '') {
        this.$message.warning('请输入整改意见')
        return
      }
      if (this.param5.retroact === 'branch' && this.information2 === '') {
        this.$message.warning('请输入整改意见')
        return
      }
      if (this.param5.retroact === 'department' && this.information3 === '') {
        this.$message.warning('请输入整改意见')
        return
      }
      let param = {
        information1: this.information1,
        updateTime1: this.updateTime1,
        handler1: this.handler1,
        information2: this.information2,
        updateTime2: this.updateTime2,
        handler2: this.handler2,
        information3: this.information3,
        updateTime3: this.updateTime3,
        handler3: this.handler3,
        dealNo: this.detailData[0].dealNo,
        commentDept: this.commentDept
      }
      this.addLoading = true
      HttpModule.handleFeedback(param).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.$message.success('整改意见反馈成功')
          this.$parent.dialogVisible = false
          this.$parent.getdata()
        } else {
          this.$message.error(res.message)
        }
      })
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
            v.value = v.code
            v.label = v.name
          })
          this.createConfig[0].itemRender.options = res.data.results
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
