<!--处理弹框-->
<template>
  <div>
    <vxe-modal
      v-model="showDialogVisible"
      :title="title"
      width="96%"
      height="90%"
      :show-footer="true"
      @close="dialogClose"
    >
      <div v-if="title === '业务数据信息'" v-loading="addLoading" class="payVoucherInput">
        <div>
          <BsForm
            ref="businessMsgRef"
            :form-items-config="businessMsgConfig"
            :form-data-list="businessDataList"
          />
        </div>
      </div>
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
          @cellClick="cellClick"
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
        <el-row>
          <el-col :span="24">
            <div style="display: flex; align-content: center">
              <span class="sub-title-add" style="text-align: right;width:168px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;疑似违规说明</span>
              <el-input
                v-model="doubtViolateExplain"
                type="textarea"
                :disabled="!isCreate"
                placeholder="疑似违规说明"
                style="width:90%"
              />
            </div>
          </el-col>
        </el-row>
        <div v-if="isDone" style="margin-top:10px">
          <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">主管处室指导意见</div>
          <el-row>
            <el-col :span="6">
              <el-container>
                <el-main width="100%">
                  <el-row style="display: flex">
                    <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0"><font color="red">*</font>&nbsp;处室意见</div>
                    <el-select v-model="value" :disabled="true" placeholder="请选择">
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
                    <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0"><font color="red">*</font>&nbsp;联系电话</div>
                    <el-input
                      v-model="phone2"
                      :disabled="true"
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
            <el-col :span="24">
              <el-container>
                <el-main width="100%">
                  <el-row style="display: flex">
                    <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;指导意见</div>
                    <el-input
                      v-model="information2"
                      type="textarea"
                      :disabled="true"
                      placeholder="主管处室指导意见"
                      style="width:90%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
        </div>
        <BsUploadBak
          v-if="isDone"
          ref="myUpload"
          :disabled="true"
          :allow-delete="false"
          :allow-download="true"
          :allow-preview="true"
          :is-upload="false"
          :attachment-id="attachmentid3"
          :file-list="fileList3"
          :file-data-bak-del.sync="fileDataBakDel3"
          :file-data.sync="fileData3"
        />
        <div v-if="isDone" style="margin-top:10px">
          <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">预算单位核实信息</div>
          <el-row>
            <el-col :span="6">
              <el-container>
                <el-main width="100%">
                  <el-row style="display: flex">
                    <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;核实意见</div>
                    <el-select v-model="hsValue" :disabled="true" placeholder="请选择">
                      <el-option
                        v-for="item in hsOptions"
                        :key="item.hsValue"
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
                      v-model="phone1"
                      :disabled="true"
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
            <el-col :span="6">
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
            <el-col :span="24">
              <el-container>
                <el-main width="100%">
                  <el-row style="display: flex">
                    <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;核实意见说明</div>
                    <el-input
                      v-model="information1"
                      type="textarea"
                      :disabled="true"
                      placeholder="核实意见说明"
                      style="width:90%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
        </div>
        <el-row>
          <BsUploadBak
            v-if="isDone "
            ref="myUpload"
            :attachment-id="attachmentid1"
            :file-list="fileList1"
            :file-data-bak-del.sync="fileDataBakDel1"
            :file-data.sync="fileData1"
            :allow-download="true"
            :allow-preview="true"
            :disabled="true"
            :allow-delete="false"
            :is-upload="false"
          />
        </el-row>
        <div v-if="isDone" style="margin-top:10px">
          <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">主管处室审核意见</div>
          <el-row>
            <el-col :span="6">
              <el-container>
                <el-main width="100%">
                  <el-row style="display: flex">
                    <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;&nbsp;审核意见</div>
                    <el-select v-model="value1" :disabled="true" placeholder="请选择">
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
            <el-col v-if="isDone && value1 === '8'" :span="24">
              <el-container>
                <el-main width="100%">
                  <el-row style="display: flex">
                    <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0"><font v-if="value1 === '8'" color="red">*</font>&nbsp;退回原因说明</div>
                    <el-input
                      v-model="returnReason"
                      type="textarea"
                      :disabled="true"
                      placeholder="退回原因说明"
                      style="width:90%"
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
            <vxe-button v-if="title === '监控问询单信息' && !isDone" :disabled="addLoading" status="primary" @click="doIssue">生成并下发</vxe-button>
            <vxe-button v-if="title === '业务数据信息'" status="primary" @click="ruleTest">规则校验</vxe-button>
            <vxe-button @click="dialogClose">取消</vxe-button>
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
import proconf from './column.js'
import HttpModule from '@/api/frame/main/fundMonitoring/createProcessing.js'
import HttpDetailModule from '@/api/frame/main/Monitoring/WarningDataMager.js'
import moment from 'moment'
import AddDialog from '@/views/main/MointoringMatters/BudgetAccountingWarningDataMager/children/addDialog.vue'
export default {
  name: 'HandleDialog',
  components: { AddDialog },
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
    isDone: {
      type: Boolean,
      default: false
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
    dealNo: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 规则详情信息
      DetailData: {},
      dialogVisibleShow: false,
      dialogTitle: '查看详情',
      options: [{
        value: '2',
        label: '认定正常'
      }, {
        value: '3',
        label: '需要核实（下发单位）'
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
      incomeMsgConfig: proconf.msgConfig,
      supplyDataList: proconf.msgData,
      handletableColumnsConfig: proconf.handletableColumnsConfig,
      createConfig: proconf.createConfig,
      createDataList: proconf.createDataList,
      businessMsgConfig: proconf.businessMsgConfig,
      businessDataList: proconf.businessMsgData,
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
      showDialogVisible: true,
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
    cellClick(obj, context, e) {
      let key = obj.column.property
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
    itemChange({ $form, property, itemValue, data }, bsform) {
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
        case 'dealType' :
          this.createDataList.dealType = itemValue
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
      this.$emit('close')
      this.$parent.showDialogVisible = false
      // if (this.param5.isCreate === 'true') {
      //   this.$parent.queryTableDatas()
      // } else {
      //   this.$parent.getdata()
      // }
    },
    // 回显
    showInfo() {
      let code = this.warningCode + '/' + this.fiRuleCode
      if (this.isCreate === false) {
        this.createConfig = proconf.checkConfig
      }
      if (this.title === '查看详情信息') {
        this.addLoading = true
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
              // this.supplyDataList.agencyName = res.data.executeData?.agencyCode + '-' + res.data.executeData?.agencyName
              // this.supplyDataList.proName = res.data.executeData?.proCode + '-' + res.data.executeData?.proName
              // this.supplyDataList.natureOfFunds = res.data.executeData?.fundTypeCode + '-' + res.data.executeData?.fundTypeName
              // this.supplyDataList.proCatName = res.data.executeData?.proCatCode + '-' + res.data.executeData?.proCatName
              // this.supplyDataList.deptEconomyType = res.data.executeData?.depBgtEcoCode + '-' + res.data.executeData?.depBgtEcoName
              // this.supplyDataList.govEconomyType = res.data.executeData?.govBgtEcoCode + '-' + res.data.executeData?.govBgtEcoName
              // this.supplyDataList.settlementMethod = res.data.executeData?.setModeCode + '-' + res.data.executeData?.setModeName
              // this.supplyDataList.directFund = res.data.executeData?.isDirCode === null ? '' : res.data.executeData?.isDirCode + '-' + res.data.executeData?.is_dir_name || ''
              // this.supplyDataList.salaryMark = res.data.executeData?.isSalCode + '-' + res.data.executeData?.isSalName
              // this.supplyDataList.isUnionFunds = res.data.executeData?.isFunCode + '-' + (res.data.executeData?.isFunCode === 1 ? '是' : '否')
              // this.supplyDataList.fiDate = res.data.executeData?.fiDate
              // this.supplyDataList.funcType = res.data.executeData?.expFuncCode + '-' + res.data.executeData?.expFuncName
              // this.supplyDataList.businessOffice = res.data.executeData?.manageMofDepCode + '-' + res.data.executeData?.manageMofDepName
              // this.supplyDataList.paymentMethod = res.data.executeData?.payTypeCode + '-' + res.data.executeData?.payTypeName
              // this.supplyDataList.isThrExp = res.data.executeData?.thrExpCode + (res.data.executeData?.thrExpName === null ? '' : '-' + res.data.executeData?.thr_exp_name)

              this.supplyDataList.payAppAmt = this.moneyFormat(res.data.executeData.payAppAmt)
              this.supplyDataList.agencyName = res.data.executeData.agencyCode + '-' + res.data.executeData.agencyName
              this.supplyDataList.proName = res.data.executeData.proCode + '-' + res.data.executeData.proName
              // this.supplyDataList.pro_cat_name = res.data.executeData.pro_cat_code + '-' + res.data.executeData.pro_cat_name
              this.supplyDataList.payTypeName = res.data.executeData.payTypeCode + '-' + res.data.executeData.payTypeName
              this.supplyDataList.expFuncName = res.data.executeData.expFuncCode + '-' + res.data.executeData.expFuncName
              this.supplyDataList.depBgtEcoName = res.data.executeData.depBgtEcoCode + '-' + res.data.executeData.depBgtEcoName
              this.supplyDataList.govBgtEcoName = res.data.executeData.govBgtEcoCode + '-' + res.data.executeData.govBgtEcoName
              this.supplyDataList.setModeName = res.data.executeData.setModeCode + '-' + res.data.executeData.setModeName
              this.supplyDataList.isDirName = (res.data.executeData.isDirCode === null ? '' : res.data.executeData.isDirCode) + '-' + (res.data.executeData.isDirName === null ? '' : res.data.executeData.isDirName)
              this.supplyDataList.isSalName = res.data.executeData.isSalCode + '-' + res.data.executeData.isSalName
              this.supplyDataList.manageMofDepName = res.data.executeData.manageMofDepCode + '-' + res.data.executeData.manageMofDepName
              this.supplyDataList.isFunName = res.data.executeData.isFunCode + '-' + (res.data.executeData.isFunCode === 1 ? '是' : '否')
              this.supplyDataList.fiDate = res.data.executeData.fiDate
              this.supplyDataList.thrExpName = res.data.executeData.thrExpCode + (res.data.executeData.thrExpCode === null ? '' : '-' + res.data.executeData.thrExpName)
              this.supplyDataList.applyName = res.data.executeData.applyName
              this.supplyDataList.applyDial = res.data.executeData.applyDial
              this.supplyDataList.payAppNo = res.data.executeData.payAppNo
              this.supplyDataList.payeeAcctName = res.data.executeData.payeeAcctName
              this.supplyDataList.payeeAcctNo = res.data.executeData.payeeAcctNo
              this.supplyDataList.payeeAcctBankName = res.data.executeData.payeeAcctBankName
              this.supplyDataList.corBgtDocNoName = res.data.executeData.corBgtDocNoName
              this.supplyDataList.payAcctName = res.data.executeData.payAcctName
              this.supplyDataList.payAcctNo = res.data.executeData.payAcctNo
              this.supplyDataList.payAcctBankName = res.data.executeData.payAcctBankName
              this.supplyDataList.useDes = res.data.executeData.useDes
            }

            if (res.data.payVoucherVo !== null) {
              this.supplyDataList.payBusType = res.data.payVoucherVo.payBusType
              this.supplyDataList.todoName = res.data.payVoucherVo.todoName
              this.supplyDataList.voidOrNot = res.data.payVoucherVo.voidOrNot
            }
            this.supplyDataList.businessTime = res.data.businessTime
            this.handletableData = res.data?.regulationList
          } else {
            this.$message.error(res.message)
          }
        })
      } else if (this.title === '监控问询单信息') {
        console.log('11111111111111:', this.dealNo)
        this.createDataList.fiRuleName = this.detailData[0].fiRuleName
        this.createDataList.dealNo = this.dealNo
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
        this.createDataList.issueTime = this.detailData[0].issueTime ? this.detailData[0].issueTime : moment().format('YYYY-MM-DD HH:mm:ss')
        if (this.createDataList.warnLevel === '<span style="color:#BBBB00">黄色预警</span>') {
          this.createDataList.warnLevel = '1'
        } else if (this.createDataList.warnLevel === '<span style="color:orange">橙色预警</span>') {
          this.createDataList.warnLevel = '2'
        } else if (this.createDataList.warnLevel === '<span style="color:red">红色预警</span>') {
          this.createDataList.warnLevel = '3'
        } else if (this.createDataList.warnLevel === '<span style="color:blue">蓝色预警</span>') {
          this.createDataList.warnLevel = '5'
        } else if (this.createDataList.warnLevel === '<span style="color:gray">灰色预警</span>') {
          this.createDataList.warnLevel = '4'
        }
        this.status = this.detailData[0].status + ''
        if (this.isDone === true) {
          this.handler3 = this.detailData[0].handler3
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
          if (this.detailData[0].agencyStatus === 1) {
            this.hsValue = '5'
          }
          if (this.detailData[0].agencyStatus === 2) {
            this.hsValue = '4'
          }
          if (this.detailData[0].status === '2') {
            this.value = '2'
          } else {
            this.value = '3'
          }
          if (this.detailData[0].status === '8') {
            this.value1 = '8'
          } else {
            this.value1 = '9'
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
      } else if (this.title === '业务数据信息') {
        const param = {
          payAppId: this.detailData[0].payAppId
        }
        HttpModule.queryBusinessData(param).then(res => {
          this.addLoading = false
          if (res.code === '000000') {
            this.businessDataList = { ...res.data }
            if (res.data !== null) {
              this.businessDataList.agencyName = res.data?.agency_code + '-' + res.data?.agency_name
              this.businessDataList.proName = res.data?.pro_code + '-' + res.data?.pro_name
              this.businessDataList.natureOfFunds = res.data?.fund_type_code + '-' + res.data?.fund_type_name
              this.businessDataList.proCatName = res.data?.pro_cat_code + '-' + res.data?.pro_cat_name
              this.businessDataList.deptEconomyType = res.data?.dep_bgt_eco_code + '-' + res.data?.dep_bgt_eco_name
              this.businessDataList.govEconomyType = res.data?.gov_bgt_eco_code + '-' + res.data?.gov_bgt_eco_name
              this.businessDataList.settlementMethod = res.data?.set_mode_code + '-' + res.data?.set_mode_name
              this.businessDataList.directFund = res.data?.is_dir_code === null ? '' : res.data?.is_dir_code + '-' + res.data?.is_dir_name || ''
              this.businessDataList.salaryMark = res.data?.is_sal_code + '-' + res.data?.is_sal_name
              this.businessDataList.isUnionFunds = res.data?.is_fun_code + '-' + (res.data?.is_fun_code === 1 ? '是' : '否')
              this.businessDataList.fiDate = res.data?.fiDate
              this.businessDataList.funcType = res.data?.exp_func_code + '-' + res.data?.exp_func_name
              this.businessDataList.businessOffice = res.data?.manage_mof_dep_code + '-' + res.data?.manage_mof_dep_name
              this.businessDataList.paymentMethod = res.data?.pay_type_code + '-' + res.data?.pay_type_name
              this.businessDataList.isThrExp = res.data?.thr_exp_code + (res.data?.thr_exp_name === null ? '' : '-' + res.data?.thr_exp_name)
              this.businessDataList.payBusType = res.data?.pay_bus_type_code + '-' + res.data?.pay_bus_type_name
              this.businessDataList.todoName = res.data?.todo_name
              this.businessDataList.voidOrNot = res.data?.is_deleted + '-' + (res.data?.is_deleted === '2' ? '否' : '是')
            }
          } else {
            this.$message.error(res.message)
          }
        })
      }
      this.getViolationType()
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
          this.$emit('close')
        } else {
          this.addLoading = false
          this.$message.error(res.message)
        }
      })
    },
    // 生成下发
    async doIssue() {
      await this.$refs.createRef?.$refs?.form?.validate?.()
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
        doubtViolateExplain: this.doubtViolateExplain, // 疑似违规说明
        warnid: this.detailData[0].warnid,
        fiRuleCode: this.detailData[0].fiRuleCode,
        warningCode: this.detailData[0].warningCode,
        dealNo: this.createDataList.dealNo,
        dealType: this.createDataList.dealType
      }
      this.addLoading = true
      HttpModule.handleAdd({ dataList: [param] })
        .then(res => {
          if (res.code === '000000') {
            if (res.code === '000000') {
              this.$message.success('生成并下发成功')
              this.$emit('close')
            } else {
              this.$message.error(res.message)
            }
          } else {
            this.$message.error(res.message)
          }
        })
        .finally(() => {
          this.addLoading = false
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
          let config = this.createConfig
          for (let i = 0; i < config.length; i++) {
            const element = config[i]
            if (element.field === 'violateType') {
              config[i].itemRender.options = res.data.results
            }
          }
        }
      })
    }
  },
  watch: {
  },
  created() {
    console.log('this.isDone', this.isDone)
    console.log('this.isCreate', this.isCreate)
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
