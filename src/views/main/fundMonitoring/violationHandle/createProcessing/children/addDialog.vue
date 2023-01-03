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
    <div v-if="title === '监控问询单信息'" v-loading="addLoading" class="payVoucherInput">
      <div>
        <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">疑似违规信息</div>
        <BsForm
          ref="createRef"
          :form-items-config="createConfig"
          :form-data-list="createDataList"
          :form-validation-config="createValidate"
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
      <div v-if="param5.retroact === 'department' || param5.retroact === 'company' || param5.isQuery === 'true' || status === 3 " style="margin-top:10px">
        <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">主管处室指导意见</div>
        <el-row>
          <el-col :span="24">
            <el-container>
              <el-main width="100%">
                <el-row style="display: flex">
                  <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;指导意见</div>
                  <el-input
                    v-model="information2"
                    type="textarea"
                    :disabled="param5.retroact !== 'department' || (status !== '1' && status !== 1)"
                    placeholder="主管处室指导意见"
                    style="width:90%"
                  />
                </el-row>
              </el-main>
            </el-container>
          </el-col>
          <el-col :span="6">
            <el-container>
              <el-main width="100%">
                <el-row style="display: flex">
                  <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;是否下发单位</div>
                  <el-select v-model="value" :disabled="param5.retroact !== 'department' || (status !== '1' && status !== 1)" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-row>
              </el-main>
            </el-container>
          </el-col>
          <el-col :span="6">
            <el-container>
              <el-main width="100%">
                <el-row style="display: flex">
                  <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;联系电话</div>
                  <el-input
                    v-model="phone2"
                    :disabled="param5.retroact !== 'department' || (status !== '1' && status !== 1)"
                    placeholder="联系电话"
                    style="width:45%"
                  />
                </el-row>
              </el-main>
            </el-container>
          </el-col>
          <el-col :span="6">
            <el-container>
              <el-main width="100%">
                <el-row style="display: flex">
                  <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;下发人</div>
                  <el-input
                    v-model="handler2"
                    disabled
                    placeholder="下发人"
                    style="width:45%"
                  />
                </el-row>
              </el-main>
            </el-container>
          </el-col>
          <el-col :span="6">
            <el-container>
              <el-main width="100%">
                <el-row style="display: flex">
                  <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;下发时间</div>
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
      <div v-if="param5.retroact === 'company' || param5.isQuery === 'true' || (status === '3' || status === 3) " style="margin-top:10px">
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
                  <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;联系电话</div>
                  <el-input
                    v-model="phone1"
                    :disabled="param5.retroact !== 'company'"
                    placeholder="联系电话"
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
        <BsUploadBak
          ref="myUpload"
          :attachment-id="attachmentid1"
          :file-list="fileList1"
          :file-data-bak-del.sync="fileDataBakDel1"
          :file-data.sync="fileData1"
          :disabled="param5.retroact !== 'company'"
          :is-upload="param5.retroact === 'company'"
        />
      </div>
      <div v-if=" (param5.retroact === 'department' && status !== 3) || param5.isQuery === 'true'" style="margin-top:10px">
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
                    :disabled="param5.retroact !== 'department' || (status !== '1' && status !== 1) "
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
                  <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;联系电话</div>
                  <el-input
                    v-model="phone3"
                    :disabled="param5.retroact !== 'department' || (status !== '1' && status !== 1)"
                    placeholder="联系电话"
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
        <BsUploadBak
          ref="myUpload"
          :disabled="param5.retroact !== 'department' || (status !== '1' && status !== 1)"
          :is-upload="param5.retroact === 'department' || status === '1' || status === 1"
          :attachment-id="attachmentid3"
          :file-list="fileList3"
          :file-data-bak-del.sync="fileDataBakDel3"
          :file-data.sync="fileData3"
        />
      </div>
      <div v-if="status === '3' || status === 3 || status === '4' || param5.isQuery === 'true'" style="margin-top:10px">
        <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">主管处室审核</div>
        <el-row>
          <el-col :span="6">
            <el-container>
              <el-main width="100%">
                <el-row style="display: flex">
                  <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;审核意见</div>
                  <el-select v-model="value1" :disabled="param5.retroact !== 'department' || (status !== '3' && status !== 3)" placeholder="请选择">
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
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
          <vxe-button v-if="param5.isCreate === 'true' && title === '监控问询单信息'" status="primary" @click="doIssue">生成并下发</vxe-button>
          <vxe-button v-if="param5.isRetroact === 'true' && title !== '查看详情信息'" status="primary" @click="doFeedback">确定</vxe-button>
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
    }
  },
  data() {
    return {
      options: [{
        value: '2',
        label: '下发给单位'
      }, {
        value: '4',
        label: '不下发'
      }],
      value: '',
      value1: '',
      options1: [{
        value: '2',
        label: '退回'
      }, {
        value: '4',
        label: '通过'
      }],
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
      phone1: '',
      attachmentid1: '',
      phone2: '',
      attachmentid2: '',
      phone3: '',
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
      handletableColumnsConfig: proconf.handletableColumnsConfig,
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
      dialogVisible: true,
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
      newWarn: ''
    }
  },
  methods: {
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
    // ajaxData({ params, currentPage, pageSize }) {
    //   this.handlemainPagerConfig.currentPage = currentPage
    //   this.handlemainPagerConfig.pageSize = pageSize
    //   this.showInfo()
    // },
    dialogClose() {
      this.$parent.dialogVisible = false
      if (this.param5.isCreate === 'true') {
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
              this.supplyDataList.proName = res.data.executeData?.proCode + '-' + res.data.executeData?.proName
              this.supplyDataList.natureOfFunds = res.data.executeData?.fundTypeCode + '-' + res.data.executeData?.fundTypeName
              this.supplyDataList.proCatName = res.data.executeData?.proCatCode + '-' + res.data.executeData?.proCatName
              this.supplyDataList.deptEconomyType = res.data.executeData?.depBgtEcoCode + '-' + res.data.executeData?.depBgtEcoName
              this.supplyDataList.govEconomyType = res.data.executeData?.govBgtEcoCode + '-' + res.data.executeData?.govBgtEcoName
              this.supplyDataList.settlementMethod = res.data.executeData?.setModeCode + '-' + res.data.executeData?.setModeName
              this.supplyDataList.directFund = res.data.executeData?.isDirCode + '-' + res.data.executeData?.isDirName || ''
              this.supplyDataList.salaryMark = res.data.executeData?.isSalCode + '-' + res.data.executeData?.isSalName
              this.supplyDataList.isUnionFunds = res.data.executeData?.isFunCode + '-' + (res.data.executeData?.isFunCode === 1 ? '是' : '否')
              this.supplyDataList.fiDate = res.data.executeData?.fiDate
              this.supplyDataList.funcType = res.data.executeData?.expFuncCode + '-' + res.data.executeData?.expFuncName
              this.supplyDataList.businessOffice = res.data.executeData?.manageMofDepCode + '-' + res.data.executeData?.manageMofDepName
              this.supplyDataList.paymentMethod = res.data.executeData?.payTypeCode + '-' + res.data.executeData?.payTypeName
              this.supplyDataList.isThrExp = res.data.executeData?.thrExpCode + (res.data.executeData?.thrExpName === null ? '' : '-' + res.data.executeData?.thrExpName)
            }
            this.handletableData = res.data?.regulationList
          } else {
            this.$message.error(res.message)
          }
        })
      } else if (this.title === '监控问询单信息') {
        this.createDataList.fiRuleName = this.detailData[0].fiRuleName
        this.createDataList.warnLevel = this.detailData[0].warnLevel
        this.createDataList.mofDivCode = this.detailData[0].mofDivCode
        this.createDataList.agencyId = this.detailData[0].agencyId
        this.createDataList.manageMofDepId = this.detailData[0].manageMofDepId
        this.createDataList.agencyCode = this.detailData[0].agencyCode
        this.createDataList.agencyName = this.detailData[0].agencyName
        this.createDataList.violateType = this.detailData[0].violateType
        this.createDataList.handleType = this.detailData[0].handleType
        this.createDataList.handleResult = this.detailData[0].handleResult
        this.doubtViolateExplain = this.detailData[0].doubtViolateExplain
        this.createDataList.issueTime = moment().format('YYYY-MM-DD HH:mm:ss')
        if (this.createDataList.warnLevel === '<span style="color:#BBBB00">黄色预警</span>') {
          this.createDataList.warnLevel = '3'
        } else if (this.createDataList.warnLevel === '<span style="color:orange">橙色预警</span>') {
          this.createDataList.warnLevel = '2'
        } else if (this.createDataList.warnLevel === '<span style="color:red">红色预警</span>') {
          this.createDataList.warnLevel = '1'
        } else if (this.createDataList.warnLevel === '<span style="color:blue">蓝色预警</span>') {
          this.createDataList.warnLevel = '4'
        } else if (this.createDataList.warnLevel === '<span style="color:gray">灰色预警</span>') {
          this.createDataList.warnLevel = '5'
        }
        let userInfo = this.$store.state.userInfo
        this.status = this.detailData[0].status
        console.log('this.param5', this.param5)
        console.log('this.status', this.detailData[0])
        if (this.param5.isQuery === 'true' || this.detailData[0].status === '3' || this.detailData[0].status === '4' || this.detailData[0].status === 3 || this.detailData[0].status === 4) {
          this.handler3 = this.detailData[0].handler3
          console.log('this.status1', this.detailData[0])
          this.updateTime3 = this.detailData[0].updateTime3
          this.information3 = this.detailData[0].information3
          this.attachmentid3 = this.detailData[0].attachmentid3
          this.phone3 = this.detailData[0].phone3
          this.handler1 = this.detailData[0].handler1
          this.updateTime1 = this.detailData[0].updateTime1
          this.information1 = this.detailData[0].information1
          this.attachmentid1 = this.detailData[0].attachmentid1
          this.phone1 = this.detailData[0].phone1
          this.handler2 = this.detailData[0].handler2
          this.updateTime2 = this.detailData[0].updateTime2
          this.information2 = this.detailData[0].information2
          this.phone2 = this.detailData[0].phone2
          if (this.detailData[0].status === '2' || this.detailData[0].status === '4' || this.detailData[0].status === 2 || this.detailData[0].status === 4) {
            this.value1 = this.detailData[0].status + ''
          }
          if (this.detailData[0].information2 !== null || this.detailData[0].information2 !== '') {
            this.value = '2'
          } else {
            this.value = '4'
          }
          if (this.attachmentid1 != null) {
            const param = {
              billguid: this.attachmentid1,
              year: this.$store.state.userInfo.year,
              province: this.$store.state.userInfo.province
            }
            HttpModule.getFile(param).then(res => {
              if (res.rscode === '100000') {
                // 获取附件信息
                this.fileData1 = JSON.parse(res.data)
              } else {
                this.$message.error(res.result)
              }
            })
          }
          if (this.attachmentid3 != null) {
            const param = {
              billguid: this.attachmentid3,
              year: this.$store.state.userInfo.year,
              province: this.$store.state.userInfo.province
            }
            HttpModule.getFile(param).then(res => {
              if (res.rscode === '100000') {
                // 获取附件信息
                this.fileData3 = JSON.parse(res.data)
              } else {
                this.$message.error(res.result)
              }
            })
          }
        }
        switch (this.param5.retroact) {
          case 'company':
            this.value = this.detailData[0].status + ''
            this.handler1 = userInfo.name
            this.updateTime1 = moment().format('YYYY-MM-DD HH:mm:ss')
            this.attachmentid1 = this.$ToolFn.utilFn.getUuid()
            this.attachmentid1 = this.attachmentid1 != null ? this.attachmentid1 : this.$ToolFn.utilFn.getUuid()
            if (this.attachmentid1 != null) {
              const param = {
                billguid: this.attachmentid1,
                year: this.$store.state.userInfo.year,
                province: this.$store.state.userInfo.province
              }
              HttpModule.getFile(param).then(res => {
                if (res.rscode === '100000') {
                  // 获取附件信息
                  this.fileData1 = JSON.parse(res.data)
                } else {
                  this.$message.error(res.result)
                }
              })
            }
            if (this.detailData[0].updateTime2) {
              this.updateTime2 = this.detailData[0].updateTime2
            }
            this.phone2 = this.detailData[0].phone2
            this.handler2 = this.detailData[0].handler2
            this.information2 = this.detailData[0].information2
            this.commentDept = 1
            break
          case 'department':
            this.handler3 = userInfo.name
            this.handler2 = userInfo.name
            this.updateTime2 = moment().format('YYYY-MM-DD HH:mm:ss')
            this.updateTime3 = moment().format('YYYY-MM-DD HH:mm:ss')
            this.attachmentid1 = this.detailData[0].attachmentid1
            this.attachmentid3 = (this.attachmentid3 != null && this.attachmentid3 !== '') ? this.attachmentid3 : this.$ToolFn.utilFn.getUuid()
            console.log('attachmentid3', this.attachmentid3)
            if (this.attachmentid3 != null) {
              const param = {
                billguid: this.attachmentid3,
                year: this.$store.state.userInfo.year,
                province: this.$store.state.userInfo.province
              }
              HttpModule.getFile(param).then(res => {
                if (res.rscode === '100000') {
                  // 获取附件信息
                  this.fileData3 = JSON.parse(res.data)
                } else {
                  this.$message.error(res.result)
                }
              })
            }
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
      await this.$refs.createRef?.$refs?.form?.validate?.()
      if (this.createDataList.warnLevel === '<span style="color:#BBBB00">黄色预警</span>') {
        this.newWarn = 3
      } else if (this.createDataList.warnLevel === '<span style="color:orange">橙色预警</span>') {
        this.newWarn = 2
      } else if (this.createDataList.warnLevel === '<span style="color:red">红色预警</span>') {
        this.newWarn = 1
      } else if (this.createDataList.warnLevel === '<span style="color:blue">蓝色预警</span>') {
        this.newWarn = 4
      } else if (this.createDataList.warnLevel === '<span style="color:gray">灰色预警</span>') {
        this.newWarn = 5
      }
      let param = {
        agencyId: this.createDataList.agencyId,
        manageMofDepId: this.createDataList.manageMofDepId,
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
      let flag = this.status
      if (this.param5.retroact === 'company' && this.information1 === '') {
        this.$message.warning('请输入整改意见')
        return
      }
      if (this.param5.retroact === 'department' && this.information3 === '' && this.value === '4') {
        this.$message.warning('请输入整改意见')
        return
      }
      if (this.param5.retroact === 'department' && this.information2 === '' && this.value === '2') {
        this.$message.warning('请输入指导意见')
        return
      }
      if (this.param5.retroact === 'department' && this.value === '' && (flag === '1' || flag === 1)) {
        this.$message.warning('请选择是否下发单位')
        return
      }
      if (this.param5.retroact === 'department' && this.value1 === '' && (flag === '3' || flag === 3)) {
        this.$message.warning('请选择审核意见')
        return
      }
      if (this.param5.retroact === 'company') {
        this.commentDept = '1'
        this.status = 3
      }
      if (this.param5.retroact === 'department' && this.value === '4' && (flag === '1' || flag === 1)) {
        this.commentDept = '3'
        this.status = 4
      }
      if (this.param5.retroact === 'department' && this.value === '2' && (flag === '1' || flag === 1)) {
        this.commentDept = '2'
        this.status = 2
      }
      // 退回
      if (this.param5.retroact === 'department' && this.value1 === '2' && (flag === '3' || flag === 3)) {
        this.commentDept = '4'
        this.status = 2
      }
      // 通过
      if (this.param5.retroact === 'department' && this.value1 === '4' && (flag === '3' || flag === 3)) {
        this.commentDept = '4'
        this.status = 4
      }
      let param = {
        information1: this.information1,
        updateTime1: this.updateTime1,
        handler1: this.handler1,
        phone1: this.phone1,
        attachmentid1: this.attachmentid1,
        information2: this.information2,
        updateTime2: this.updateTime2,
        handler2: this.handler2,
        phone2: this.phone2,
        information3: this.information3,
        updateTime3: this.updateTime3,
        handler3: this.handler3,
        phone3: this.phone3,
        status: this.status,
        attachmentid3: this.attachmentid3,
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
        size: 99999,
        enable: '0' // 只查启用数据
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
