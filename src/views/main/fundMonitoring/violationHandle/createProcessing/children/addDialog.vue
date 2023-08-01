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
          v-bind="footerConfig"
          :table-columns-config=" handletableColumnsConfig"
          :table-data="handletableData"
          :table-config="handletableConfig"
          :toolbar-config="false"
          :pager-config="false"
          @cellClick="cellClick"
        />
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
                    <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0"><font v-if="phoneIsRequire" color="red">*</font>&nbsp;联系电话</div>
                    <el-input
                      v-model="phone2"
                      :disabled="param5.retroact !== 'department' || (status !== '1' && status !== 1)"
                      placeholder="联系电话"
                      style="width:55%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="6">
              <el-container>
                <el-main width="100%">
                  <el-row style="display: flex">
                    <div class="sub-title-add" style="text-align: right;width:100px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;下发人</div>
                    <el-input
                      v-model="handler2"
                      disabled
                      placeholder="下发人"
                      style="width:50%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="6">
              <el-container>
                <el-main width="100%">
                  <el-row style="display: flex">
                    <div class="sub-title-add" style="text-align: right;width:100px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;下发时间</div>
                    <el-input
                      v-model="updateTime2"
                      disabled
                      placeholder="处理时间"
                      style="width:60%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="24">
              <el-container>
                <el-main width="100%">
                  <el-row style="display: flex">
                    <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0"><font v-if="param5.retroact === 'department' && (status === '1' || status === 1)" color="red">*</font>&nbsp;认定说明</div>
                    <el-input
                      v-model="information2"
                      type="textarea"
                      :disabled="param5.retroact !== 'department' || (status !== '1' && status !== 1) "
                      placeholder="请填写认定说明"
                      style="width:90%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
        </div>
        <el-row style="display: flex;align-items: center;">
          <div v-if="fileIsRequired" style="color:red;">*</div>
          <BsUploadBak
            ref="myUpload"
            style="flex: 1;"
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
        </el-row>
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
                    <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0"><font v-if="phoneIsRequire2" color="red">*</font>&nbsp;联系电话</div>
                    <el-input
                      v-model="phone1"
                      :disabled="phoneIsDisabled2"
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
                    <div class="sub-title-add" style="text-align: right;width:110px;margin:8px 11.2px 0 0;flex-shrink: 0">&nbsp;处理时间</div>
                    <el-input
                      v-model="updateTime1"
                      disabled
                      placeholder="处理时间"
                      style="width:60%"
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
        <el-row style="display: flex;align-items: center;">
          <div v-if="fileIsRequired2" style="color:red;">*</div>
          <BsUploadBak
            v-if="param5.retroact === 'company' || param5.isQuery === 'true' || (status === '3' || status === 3) || (status === '4' || status === 4) || (status === '5' || status === 5) "
            ref="myUpload2"
            style="flex:1"
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
                    <div class="sub-title-add" style="text-align: right;width:148px;margin:8px 11.2px 0 0;flex-shrink: 0"><font v-if="xmReasonShow" color="red">*</font>&nbsp;退回原因说明</div>
                    <el-input
                      v-model="returnReason"
                      type="textarea"
                      :disabled="xmDisabledRule"
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
// import moment from 'moment'
import { checkPhone } from '@/utils/index.js'
import AddDialog from '@/views/main/MointoringMatters/BudgetAccountingWarningDataMager/children/addDialog.vue'
export default {
  name: 'HandleDialog',
  components: { AddDialog },
  computed: {
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
    fileIsRequired() {
      if (this.param5.retroact === 'department' && (this.value === '2' || this.value === 2) && this.detailData.length && this.detailData[0].uploadFile) {
        return true
      }
      return false
    },
    fileIsRequired2() {
      if (this.param5.retroact === 'company' && this.detailData.length && this.detailData[0].uploadFile) {
        return true
      }
      return false
    },
    isXmProject() { // 是否是厦门项目
      const { province } = this.$store.state.userInfo
      if (province?.slice(0, 4) === '3502') { // 项目项目隐藏三个字段
        return true
      }
      return false
    },
    phoneIsRequire() {
      const { province } = this.$store.state.userInfo
      if (province?.slice(0, 4) === '3502') { // 厦门项目电话号码需要不必填
        return this.param5.phoneIsRequire === 'true'
      } else {
        let bool = this.param5.retroact === 'department' && (this.status === '1' || this.status === 1)
        return bool
      }
    },
    phoneIsRequire2() {
      const { province } = this.$store.state.userInfo
      if (province?.slice(0, 4) === '3502') { // 厦门项目电话号码需要不必填
        return this.param5.phoneIsRequire === 'true'
      } else {
        let bool = this.param5.retroact === 'company'
        return bool
      }
    },
    phoneIsDisabled2() {
      const { province } = this.$store.state.userInfo
      if (province?.slice(0, 4) === '3502') { // 厦门项目电话号码需要不必填
        return false
      } else {
        let bool = this.param5.retroact !== 'company'
        return bool
      }
    },
    footerConfig() {
      // if (!this.isXmProject) {
      //   return { 'footer-config': {} }
      // } else {
      return {}
      // }
    },
    xmDisabledRule() {
      const { province } = this.$store.state.userInfo
      if (province?.slice(0, 4) === '3502') {
        if (this.value1 === '9' || this.value1 === '8') { // 通过 8 退回
          return false
        }
        return true
      } else {
        return this.param5.retroact !== 'department' || !(this.status === '4' || this.status === '5') || this.value1 !== '8'
      }
    },
    xmReasonShow() {
      const { province } = this.$store.state.userInfo
      if (province?.slice(0, 4) === '3502') {
        if (this.value1 === '9' || this.value1 === '') { // 通过不设置必填 退回设置必填
          return false
        }
        return true
      } else {
        return this.value1 === '8'
      }
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
    },
    regulationClass: {
      type: String,
      default: '0201'// 直达资金
    },
    isApprove: {
      type: Boolean,
      default: false
    },
    menuName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
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
      if (this.param5?.retroact === 'company' || this.param5?.tableHide) {
        return
      }
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
    async showInfo() {
      let serverTime = await HttpModule.getCurrentTime()
      // serverTime = { data: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') }
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
              this.supplyDataList.salaryMark = res.data.executeData?.isSalCode === null ? '' : res.data.executeData?.isSalCode + '-' + res.data.executeData?.isSalName === null ? '' : res.data.executeData?.isSalName
              this.supplyDataList.isUnionFunds = res.data.executeData?.proCatCode === null ? '' : res.data.executeData?.isFunCode + '-' + (res.data.executeData?.isFunCode === 1 ? '是' : '否')
              this.supplyDataList.fiDate = res.data.executeData?.fiDate
              this.supplyDataList.funcType = res.data.executeData?.expFuncCode + '-' + res.data.executeData?.expFuncName
              this.supplyDataList.businessOffice = res.data.executeData?.manageMofDepCode + '-' + res.data.executeData?.manageMofDepName
              this.supplyDataList.paymentMethod = res.data.executeData?.payTypeCode + '-' + res.data.executeData?.payTypeName
              this.supplyDataList.isThrExp = res.data.executeData?.thrExpCode + (res.data.executeData?.thrExpName === null ? '' : '-' + res.data.executeData?.thrExpName)
              this.supplyDataList.trackProName = res.data.executeData && res.data.executeData?.trackProCode && res.data.executeData?.trackProName ? res.data.executeData?.trackProCode + '_' + res.data.executeData?.trackProName : ''
              this.supplyDataList.useDes = res.data.executeData && res.data.executeData?.useDes
              this.supplyDataList.payBusType = res.data.executeData.payBusTypeCode === null ? '' : res.data.executeData.payBusTypeCode + '_' + res.data.executeData.payBusTypeName
              this.supplyDataList.xpayDate = res.data.executeData?.xpayDate
            }
            if (res.data.payVoucherVo !== null) {
              this.supplyDataList.payBusType = res.data.payVoucherVo.payBusType
              this.supplyDataList.todoName = res.data.payVoucherVo.todoName
              this.supplyDataList.voidOrNot = res.data.payVoucherVo.voidOrNot
            }
            if (res.data.baBgtInfoEntity !== null) {
              let { agencyCode, agencyName, timeoutIssueType, corBgtDocNo, fiscalYear, recDivName, mofDivName, proCode, proName, recTime, recAmount, allocationAmount, fiRuleName, timeoutIssueAmount, timeoutIssueTime } = res.data.baBgtInfoEntity
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
              this.supplyDataList.timeoutIssueAmount = timeoutIssueAmount || ''
              this.supplyDataList.timeoutIssueTime = timeoutIssueTime || ''
              this.supplyDataList.fiRuleName = fiRuleName || ''
              this.supplyDataList.violateType11 = ''// 违规责任单位
              this.supplyDataList.corBgtDocNo = res.data.baBgtInfoEntity.corBgtDocNo
              this.supplyDataList.bgtDocTitle = res.data.baBgtInfoEntity.bgtDocTitle
              this.supplyDataList.bgtDec = res.data.baBgtInfoEntity.bgtDec
              this.supplyDataList.proCode = res.data.baBgtInfoEntity.proCode
              this.supplyDataList.settlementMethod = res.data.baBgtInfoEntity.proName
              this.supplyDataList.sourceTypeName = res.data.baBgtInfoEntity.sourceTypeName
              this.supplyDataList.fundTypeName = res.data.baBgtInfoEntity.fundTypeName
              this.supplyDataList.expFuncName = res.data.baBgtInfoEntity.expFuncName
              this.supplyDataList.govBgtEcoName = res.data.baBgtInfoEntity.govBgtEcoName
            }
            this.handletableData = res.data?.regulationList
          } else {
            this.$message.error(res.message)
          }
        })
      } else if (this.title === '监控问询单信息') {
        this.doubtViolateExplain = this.detailData[0].doubtViolateExplain
        let params = { ...this.detailData[0], issueTime: this.detailData[0].issueTime || serverTime.data }
        this.$set(this, 'createDataList', params)
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
          if (this.detailData[0].agencyStatus === '1') {
            this.hsValue = '5'
          }
          if (this.detailData[0].agencyStatus === '2') {
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
              // this.updateTime1 = moment().format('YYYY-MM-DD HH:mm:ss')
              // 改成取服务器时间
              this.updateTime1 = serverTime.data
              this.attachmentid1 = this.$ToolFn.utilFn.getUuid()
            } else {
              this.handler1 = this.detailData[0].handler1 ? this.detailData[0].handler1 : userInfo.name
              // this.updateTime1 = this.detailData[0].updateTime1 ? this.detailData[0].updateTime1 : moment().format('YYYY-MM-DD HH:mm:ss')
              // 改成取服务器时间
              this.updateTime1 = serverTime.data
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
            this.updateTime2 = this.detailData[0].updateTime2
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
            // this.updateTime2 = this.detailData[0].updateTime2 ? this.detailData[0].updateTime2 : moment().format('YYYY-MM-DD HH:mm:ss')
            // 改成取服务器时间
            this.updateTime2 = serverTime.data
            if (this.isApprove) { // 如果是审批页面 则取数据单的时间
              this.$set(this, 'updateTime2', this.detailData[0].updateTime2)
            }
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
              this.businessDataList.salaryMark = res.data?.is_sal_code === null ? '' : res.data?.is_sal_code + '-' + res.data?.is_sal_name === null ? '' : res.data?.is_sal_name
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
      if (this.phone2 && !checkPhone(this.phone2)) {
        this.$message.warning('请输入正确的电话号码')
        return
      }
      if (this.phone3 && !checkPhone(this.phone3)) {
        this.$message.warning('请输入正确的电话号码')
        return
      }
      if (this.phone1 && !checkPhone(this.phone1)) {
        this.$message.warning('请输入正确的电话号码')
        return
      }
      if (this.param5.retroact === 'company' && !this.hsValue && (flag === '3' || flag === 3)) {
        this.$message.warning('请输入核实意见说明')
        return
      }
      if (this.param5.retroact === 'company' && this.hsValue.length && (flag === '3' || flag === 3)) {
        if (this.hsValue.length > 200) {
          this.$message.warning('核实意见请小于等于200字')
          return
        }
      }
      if (this.param5.retroact === 'company' && !this.information1) {
        this.$message.warning('请输入核实意见说明意见')
        return
      }
      if (this.param5.retroact === 'company' && this.information1) {
        if (this.information1.length > 200) {
          this.$message.warning('核实意见说明意见请小于等于200字')
          return
        }
      }
      const { province } = this.$store.state.userInfo
      if (this.phoneIsRequire2 && !this.phone1) {
        this.$message.warning('请输入联系电话')
        return
      }
      if (this.phoneIsRequire && !this.phone2) {
        this.$message.warning('请输入联系电话')
        return
      }
      if (this.param5.retroact === 'department' && (this.value === '3' || this.value === '7') && !this.information2) {
        this.$message.warning('请填写指导意见')
        return
      }
      // 直达资金下发单位为3 专项已整改为7，认定正常时不校验
      // 黑龙江项目 指导意见都必填
      // if (this.value === '3' || this.value === '7') {
      if (this.param5.retroact === 'department' && !this.information2) {
        this.$message.warning('请填写指导意见')
        return
      }
      if (this.param5.retroact === 'department' && (this.information2.length < 10 || this.information2.length > 200)) {
        this.$message.warning('请输入10-200的指导意见')
        return
      }
      // }
      if (this.param5.retroact === 'department' && !this.value && (flag === '1' || flag === 1)) {
        this.$message.warning('请选择处室意见!')
        return
      }
      if (this.param5.retroact === 'department' && (flag === '1' || flag === 1) && this.information2) {
        if (this.information2.length > 200) {
          this.$message.warning('处室指导意见请小于等于200字')
          return
        }
      }
      if (this.param5.retroact === 'department' && !this.value1 && (flag === '4' || flag === 4 || flag === '5' || flag === 5)) {
        this.$message.warning('请选择审核意见')
        return
      }
      if (province?.slice(0, 4) === '3502') {
        if (this.xmReasonShow && !this.returnReason) {
          this.$message.warning('请输入退回原因说明')
          return
        }
      } else {
        if (this.param5.retroact === 'department' && this.value1 === '8' && !this.returnReason) {
          this.$message.warning('请输入退回原因说明')
          return
        }
      }
      if (this.param5.retroact === 'department' && this.value1 === '8' && this.returnReason) {
        if (this.returnReason.length > 200) {
          this.$message.warning('退回原因说明请小于等于200字')
          return
        }
      }

      if (this.fileIsRequired && !this.$refs.myUpload.fileData?.length) {
        this.$message.warning('请上传附件')
        return
      }
      if (this.fileIsRequired2 && !this.$refs.myUpload2.fileData?.length) {
        this.$message.warning('请上传附件')
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
      let param = this.detailData.map(item => {
        return {
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
          dealNo: item.dealNo,
          returnReason: this.returnReason,
          commentDept: this.commentDept,
          menuName: this.menuName
        }
      })
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
<style lang="scss">
  .payVoucherInput {
    .el-main{
      min-width: 480px;
    }
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
