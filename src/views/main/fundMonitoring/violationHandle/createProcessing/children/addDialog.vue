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
            <el-col :span="6">
              <el-container>
                <el-main width="100%">
                  <el-row style="display: flex">
                    <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0"><font color="red">*</font>&nbsp;处室意见</div>
                    <el-select v-model="value" :disabled="param5.retroact !== 'department' || (status !== '1' && status !== 1)" placeholder="请选择" @change="changeValue">
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
                    <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0"><font v-if="param5.retroact === 'department' && (status === '1' || status === 1)" color="red">*</font>&nbsp;联系电话</div>
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
            <el-col :span="24">
              <el-container>
                <el-main width="100%">
                  <el-row style="display: flex">
                    <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0"><font v-if="param5.retroact === 'department' && (status === '1' || status === 1) && value === '3'" color="red">*</font>&nbsp;指导意见</div>
                    <el-input
                      v-model="information2"
                      type="textarea"
                      :disabled="param5.retroact !== 'department' || (status !== '1' && status !== 1) || value === '2'"
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
          ref="myUpload"
          :disabled="param5.retroact !== 'department' || status !== '1'"
          :allow-delete="param5.retroact === 'department' && status === '1'"
          :allow-download="true"
          :allow-preview="true"
          :is-upload="param5.retroact === 'department' && status === '1' "
          :attachment-id="attachmentid3"
          :file-list="fileList3"
          :file-data-bak-del.sync="fileDataBakDel3"
          :file-data.sync="fileData3"
        />
        <div v-if="param5.retroact === 'company' || param5.isQuery === 'true' || (status === '3' || status === 3) || (status === '4' || status === 4) || (status === '5' || status === 5) " style="margin-top:10px">
          <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">预算单位核实信息</div>
          <el-row>
            <el-col :span="6">
              <el-container>
                <el-main width="100%">
                  <el-row style="display: flex">
                    <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0"><font color="red">*</font>&nbsp;核实意见</div>
                    <el-select v-model="hsValue" :disabled="param5.retroact !== 'company'" placeholder="请选择">
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
                    <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0"><font v-if="param5.retroact === 'company'" color="red">*</font>&nbsp;联系电话</div>
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
                    <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0"><font v-if="param5.retroact === 'company'" color="red">*</font>&nbsp;核实意见说明</div>
                    <el-input
                      v-model="information1"
                      type="textarea"
                      :disabled="param5.retroact !== 'company'"
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
            v-if="param5.retroact === 'company' || param5.isQuery === 'true' || (status === '3' || status === 3) || (status === '4' || status === 4) || (status === '5' || status === 5) "
            ref="myUpload"
            :attachment-id="attachmentid1"
            :file-list="fileList1"
            :file-data-bak-del.sync="fileDataBakDel1"
            :file-data.sync="fileData1"
            :allow-download="true"
            :allow-preview="true"
            :disabled="param5.retroact !== 'company'"
            :allow-delete="param5.retroact === 'company'"
            :is-upload="param5.retroact === 'company'"
          />
        </el-row>
        <div v-if="status === '4' || status === '5' || status === '8' || status === '6' || status === '7' || param5.isQuery === 'true'" style="margin-top:10px">
          <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">主管处室审核意见</div>
          <el-row>
            <el-col :span="6">
              <el-container>
                <el-main width="100%">
                  <el-row style="display: flex">
                    <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0"><font color="red">*</font>&nbsp;&nbsp;审核意见</div>
                    <el-select v-model="value1" :disabled="param5.retroact !== 'department' || !(status === '4' || status === '5') " placeholder="请选择" @change="changeValue1">
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
            <el-col v-if="(param5.retroact === 'department' && (status === '4' || status === '5')) || (param5.retroact === 'company' && (status === '6' || status === '7' || status === '8'))" :span="24">
              <el-container>
                <el-main width="100%">
                  <el-row style="display: flex">
                    <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0"><font v-if="value1 === '8'" color="red">*</font>&nbsp;退回原因说明</div>
                    <el-input
                      v-model="returnReason"
                      type="textarea"
                      :disabled="param5.retroact !== 'department' || !(status === '4' || status === '5') || value1 !== '8'"
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
            <vxe-button v-if="param5.isCreate === 'true' && title === '监控问询单信息'" status="primary" @click="doIssue">生成并下发</vxe-button>
            <vxe-button v-if="param5.isRetroact === 'true' && title !== '查看详情信息' && title !== '业务数据信息'" status="primary" @click="doFeedback">确定</vxe-button>
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
import { proconf } from '../createProcessing.js'
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
      newWarn: '',
      routes: ['CompanyRetroactBySpecial', 'DepartmentRetroactBySpecial'],
      isManagement: false
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
              this.supplyDataList.agencyName = res.data.executeData?.agency_code + '-' + res.data.executeData?.agency_name
              this.supplyDataList.proName = res.data.executeData?.pro_code + '-' + res.data.executeData?.pro_name
              this.supplyDataList.natureOfFunds = res.data.executeData?.fund_type_code + '-' + res.data.executeData?.fund_type_name
              this.supplyDataList.proCatName = res.data.executeData?.pro_cat_code + '-' + res.data.executeData?.pro_cat_name
              this.supplyDataList.deptEconomyType = res.data.executeData?.dep_bgt_eco_code + '-' + res.data.executeData?.dep_bgt_eco_name
              this.supplyDataList.govEconomyType = res.data.executeData?.gov_bgt_eco_code + '-' + res.data.executeData?.gov_bgt_eco_name
              this.supplyDataList.settlementMethod = res.data.executeData?.set_mode_code + '-' + res.data.executeData?.set_mode_name
              this.supplyDataList.directFund = res.data.executeData?.is_dir_code === null ? '' : res.data.executeData?.is_dir_code + '-' + res.data.executeData?.is_dir_name || ''
              this.supplyDataList.salaryMark = res.data.executeData?.is_sal_code + '-' + res.data.executeData?.is_sal_name
              this.supplyDataList.isUnionFunds = res.data.executeData?.is_fun_code + '-' + (res.data.executeData?.is_fun_code === 1 ? '是' : '否')
              this.supplyDataList.fiDate = res.data.executeData?.fiDate
              this.supplyDataList.funcType = res.data.executeData?.exp_func_code + '-' + res.data.executeData?.exp_func_name
              this.supplyDataList.businessOffice = res.data.executeData?.manage_mof_dep_code + '-' + res.data.executeData?.manage_mof_dep_name
              this.supplyDataList.paymentMethod = res.data.executeData?.pay_type_code + '-' + res.data.executeData?.pay_type_name
              this.supplyDataList.isThrExp = res.data.executeData?.thr_exp_code + (res.data.executeData?.thr_exp_name === null ? '' : '-' + res.data.executeData?.thr_exp_name)
            }
            if (res.data.payVoucherVo !== null) {
              this.supplyDataList.payBusType = res.data.payVoucherVo.payBusType
              this.supplyDataList.todoName = res.data.payVoucherVo.todoName
              this.supplyDataList.voidOrNot = res.data.payVoucherVo.voidOrNot
            }
            if (res.data.baBgtInfoEntity !== null) {
              let { agencyCode, agencyName, timeoutIssueType, corBgtDocNo, fiscalYear, recDivName, mofDivName, proCode, proName, recTime, recAmount, allocationAmount, fiRuleName } = res.data.baBgtInfoEntity
              this.supplyDataList.agencyName = agencyCode + '-' + agencyName
              this.supplyDataList.proName = proCode + '-' + proName
              this.supplyDataList.timeoutIssueType = timeoutIssueType || ''
              this.supplyDataList.corBgtDocNo = corBgtDocNo || ''
              this.supplyDataList.fiscalYear = fiscalYear || ''
              this.supplyDataList.recDivName = recDivName || ''
              this.supplyDataList.mofDivName = mofDivName || ''
              this.supplyDataList.proCode = proCode// 项目类别
              this.supplyDataList.proName = proName || ''
              this.supplyDataList.recTime = recTime || ''
              this.supplyDataList.recAmount = recAmount || ''
              this.supplyDataList.allocationAmount = allocationAmount || ''
              this.supplyDataList.fiRuleName = fiRuleName || ''
              this.supplyDataList.violateType11 = ''// 违规责任单位
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
        this.createDataList.issueTime = this.detailData[0].issueTime ? this.detailData[0].issueTime : moment().format('YYYY-MM-DD HH:mm:ss')
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
        this.status = this.detailData[0].status + ''
        console.log('this.param5', this.param5)
        console.log('this.status', this.detailData[0])
        if (this.param5.isQuery === 'true') {
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
          if (this.detailData[0].agencyStatus === 1) {
            this.hsValue = '5'
          }
          if (this.detailData[0].agencyStatus === 2) {
            this.hsValue = '4'
          }
          if (this.detailData[0].status === '2') {
            this.value = '2'
          } else if (this.isManagement) {
            this.value = '7'
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
        switch (this.param5.retroact) {
          case 'company':
            this.value = this.status === '2' ? '2' : '3'
            if (this.status === '8') {
              this.handler1 = userInfo.name
              this.updateTime1 = moment().format('YYYY-MM-DD HH:mm:ss')
              this.attachmentid1 = this.$ToolFn.utilFn.getUuid()
            } else {
              this.handler1 = this.detailData[0].handler1 ? this.detailData[0].handler1 : userInfo.name
              this.updateTime1 = this.detailData[0].updateTime1 ? this.detailData[0].updateTime1 : moment().format('YYYY-MM-DD HH:mm:ss')
              this.attachmentid1 = this.detailData[0].attachmentid1 ? this.detailData[0].attachmentid1 : this.$ToolFn.utilFn.getUuid()
            }
            this.returnReason = this.detailData[0].returnReason
            this.value1 = this.status === '8' ? '8' : '9'
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
            this.attachmentid3 = this.detailData[0].attachmentid3
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
            this.commentDept = 1
            break
          case 'department':
            this.value = this.detailData[0].status + '' === '2' ? '2' : '3'
            this.hsValue = this.detailData[0].status + '' === '4' ? '4' : '5'
            this.handler2 = this.detailData[0].handler2 ? this.detailData[0].handler2 : userInfo.name
            this.phone2 = this.detailData[0].phone2
            this.updateTime2 = this.detailData[0].updateTime2 ? this.detailData[0].updateTime2 : moment().format('YYYY-MM-DD HH:mm:ss')
            this.information2 = this.detailData[0].information2
            this.attachmentid1 = this.detailData[0].attachmentid1
            this.handler1 = this.detailData[0].handler1
            this.phone1 = this.detailData[0].phone1
            this.updateTime1 = this.detailData[0].updateTime1
            this.information1 = this.detailData[0].information1
            this.attachmentid1 = this.attachmentid1 ? this.attachmentid1 : this.$ToolFn.utilFn.getUuid()
            this.attachmentid3 = this.detailData[0].attachmentid3 ? this.detailData[0].attachmentid3 : this.$ToolFn.utilFn.getUuid()
            if (this.attachmentid3) {
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
            if (this.attachmentid1) {
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
            if (this.isManagement) {
              this.value = '7'
            }
            break
          default:
            break
        }
        //   } else {
        //     this.$message.error(res.message)
        //   }
        // })
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
    changeValue() {
      let userInfo = this.$store.state.userInfo
      this.handler2 = userInfo.name
      this.updateTime2 = moment().format('YYYY-MM-DD HH:mm:ss')
    },
    // 审核改变
    changeValue1() {
      this.returnReason = ''
    },
    // 生成下发
    async doIssue() {
      await this.$refs.createRef?.$refs?.form?.validate?.()
      // if (this.createDataList.warnLevel === '<span style="color:#BBBB00">黄色预警</span>') {
      //   this.newWarn = 1
      // } else if (this.createDataList.warnLevel === '<span style="color:orange">橙色预警</span>') {
      //   this.newWarn = 2
      // } else if (this.createDataList.warnLevel === '<span style="color:red">红色预警</span>') {
      //   this.newWarn = 3
      // } else if (this.createDataList.warnLevel === '<span style="color:blue">蓝色预警</span>') {
      //   this.newWarn = 4
      // } else if (this.createDataList.warnLevel === '<span style="color:gray">灰色预警</span>') {
      //   this.newWarn = 5
      // }
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
            this.$parent.getdata()
          } else {
            this.$message.error(res.message)
          }
        } else {
          this.$message.error(res.message)
        }
      })
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
    doFeedback() {
      let flag = this.status
      let re = /^1\d{10}$/
      let re1 = /^\d{3}-\d{8}$|\d{4}-\d{7}$/
      if (this.phone2) {
        if (!re.test(this.phone2)) {
          if (!re1.test(this.phone2)) {
            this.$message.warning('请输入正确的电话号码')
            return
          }
        }
      }
      if (this.phone3) {
        if (!re.test(this.phone3)) {
          if (!re1.test(this.phone3)) {
            this.$message.warning('请输入正确的电话号码')
            return
          }
        }
      }
      if (this.phone1) {
        if (!re.test(this.phone1)) {
          if (!re1.test(this.phone1)) {
            this.$message.warning('请输入正确的电话号码')
            return
          }
        }
      }
      if (this.param5.retroact === 'company' && !this.hsValue && (flag === '3' || flag === 3)) {
        this.$message.warning('请选择核实意见')
        return
      }
      if (this.param5.retroact === 'company' && !this.information1) {
        this.$message.warning('请输入核实意见说明意见')
        return
      }
      if (this.param5.retroact === 'company' && !this.phone1) {
        this.$message.warning('请输入联系电话')
        return
      }
      if (this.param5.retroact === 'department' && !this.phone2) {
        this.$message.warning('请输入联系电话')
        return
      }
      if (this.param5.retroact === 'department' && !this.information2 && this.value === '3') {
        this.$message.warning('请输入指导意见')
        return
      }
      if (this.param5.retroact === 'department' && !this.value && (flag === '1' || flag === 1)) {
        this.$message.warning('请选择处室意见!')
        return
      }
      if (this.param5.retroact === 'department' && !this.value1 && (flag === '4' || flag === 4 || flag === '5' || flag === 5)) {
        this.$message.warning('请选择审核意见')
        return
      }
      if (this.param5.retroact === 'department' && this.value1 === '8' && !this.returnReason) {
        this.$message.warning('请输入退回原因说明')
        return
      }
      if (this.param5.retroact === 'company') {
        this.commentDept = '1'
        this.status = this.hsValue
      }
      if (this.param5.retroact === 'department' && this.value === '3' && (flag === '1' || flag === 1)) {
        this.commentDept = '3'
        this.status = 3
      }
      if (this.param5.retroact === 'department' && this.value === '2' && (flag === '1' || flag === 1)) {
        this.commentDept = '2'
        this.status = 2
      }
      // 退回
      if (this.param5.retroact === 'department' && this.value1 === '8' && this.returnReason) {
        this.commentDept = '4'
        this.status = 8
      }
      // 通过
      if (this.param5.retroact === 'department' && this.value1 === '9') {
        this.commentDept = '4'
        this.status = this.hsValue === '4' ? '6' : '7'
      }
      if (this.isManagement && this.param5.retroact === 'department' && this.value === '7') {
        this.commentDept = '7'
        this.status = 7
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
        returnReason: this.returnReason,
        commentDept: this.commentDept
      }
      this.addLoading = true
      HttpModule.handleFeedback(param).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.$message.success('操作成功')
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
            v.value = v.name
            v.label = v.name
          })
          this.createConfig[0].itemRender.options = res.data.results
        }
      })
    },
    setFormItem() {
      if ([6, '6', 2, '2'].includes(this.bussnessId)) {
        this.incomeMsgConfig = proconf.indexMsgConfig
        this.supplyDataList = proconf.indexMsgData
      } else {
        this.incomeMsgConfig = proconf.incomeMsgConfig
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
    }
  },
  created() {
    // 只有查看详情是才会动态渲染  且要根据路由去动态渲染

    if (this.title === '查看详情信息' && this.routes.includes(this.$route.name)) {
      this.setFormItem()
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
