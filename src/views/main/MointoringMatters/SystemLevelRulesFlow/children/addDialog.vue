<!--单位用款申请(按计划)录入新增页面弹框-->
<template>
  <vxe-modal
    v-model="dialogVisible"
    :title="title"
    width="96%"
    height="90%"
    :show-footer="false"
    @close="dialogClose"
  >
    <div style="width:100%;height:45px;float:left;">
      <div v-for="(item,index) in tabbtn" :key="index" class="setbtn">
        <div :id="index" class="tabone" :class="activeIndex === index ? 'tabone1' : ''" @click="tabClick(index)">
          {{ item }}
        </div>
      </div>
    </div>
    <!--模板信息-->
    <div v-show="ruleSetShow" class="payVoucherInput" style="margin-top:50px;">
      <div v-loading="addLoading" class="body">
        <!-- <div v-show="!disabled" class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="queryConfig"
            :query-form-data="searchDataList"
            @onSearchClick="search"
            @itemChange="itemChange"
          />
        </div> -->
        <div class="header-table" style="margin-top:15px;">
          <BsTable
            ref="monitorTableRef"
            height="480px"
            :footer-config="{ showFooter: false }"
            :table-columns-config="monitorTableColumnsConfig"
            :table-data="operationTableData"
            :table-config="tableConfig"
            :toolbar-config="false"
            :pager-config="false"
          />
        </div>
      </div>
    </div>
    <!--规则定义-->
    <div v-show="ruleDesShow" class="payVoucherInput" style="margin-top:50px;">
      <div>
        <div>
          <div>
            <el-row>
              <el-col :span="8">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;引用模板</div>
                      <el-input
                        v-model="crTemplate"
                        :disabled="disabled"
                        placeholder="请输入模板名称"
                        style="width:45%"
                      />
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
              <el-col :span="8">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;触发系统</div>
                      <el-select
                        v-model="businessSystemCode"
                        :disabled="disabled"
                        placeholder="请选择触发系统"
                        style="width:45%"
                        @change="changeSysCode"
                      >
                        <el-option
                          v-for="item in businessSystemCodeoptions"
                          :key="item.id"
                          :label="item.businessName"
                          :value="item.id"
                        />
                      </el-select>
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
              <el-col :span="8">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;触发模块</div>
                      <el-select
                        v-model="businessModuleCode"
                        :disabled="disabled"
                        placeholder="请选择触发模块"
                        style="width:45%"
                        @change="changeModCode"
                      >
                        <el-option
                          v-for="item in businessModuleCodeoptions"
                          :key="item.id"
                          :label="item.businessName"
                          :value="item.id"
                        />
                      </el-select>
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
              <el-col :span="8">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font v-show="triggerClass !== 2" color="red">*</font>&nbsp;触发菜单</div>
                      <!--:disabled="disabled"-->
                      <!--<el-select-->
                      <!--  v-model="businessFunctionCode"-->
                      <!--  placeholder="请选择触发菜单"-->
                      <!--  style="width:45%"-->
                      <!--  @change="changeFunCode"-->
                      <!--&gt;-->
                      <!--  <el-option-->
                      <!--    v-for="item in businessFunctionCodeoptions"-->
                      <!--    :key="item.id"-->
                      <!--    :label="item.businessName"-->
                      <!--    :value="item.id"-->
                      <!--  />-->
                      <!--</el-select>-->
                      <BsTree
                        v-model="businessFunctionCodeModal"
                        :is-drop-select-tree="true"
                        :editable="true"
                        :tree-data="businessFunctionTreeData"
                        :default-checked-keys="businessFunctionCode"
                        v-bind="{ config: { ...businessFunctionTreeConfig, disabled } }"
                        class="businessFunctionTree"
                        style="display: inline-block;"
                      />
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
              <el-col :span="8">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;监控规则名称</div>
                      <el-input
                        v-model="monitorRuleName"
                        :disabled="disabled"
                        placeholder="请输入监控规则名称"
                        style="width:45%"
                      />
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
              <el-col :span="8">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;监控主题</div>
                      <el-select
                        v-model="regulationClass"
                        :disabled="disabled"
                        placeholder="请选择监控主题"
                        style="width:45%"
                        @change="selectRule"
                      >
                        <el-option
                          v-for="item in regulationClassoptions"
                          :key="item.id"
                          :label="item.regulationName"
                          :value="item.regulationName"
                        />
                      </el-select>
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;预警级别</div>
                      <el-select
                        v-model="warningLevel"
                        :disabled="disabled"
                        placeholder="请选择预警级别"
                        style="width:45%"
                        @change="chooseWarningLevel"
                      >
                        <el-option
                          v-for="item in warningLeveloptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
              <el-col :span="8">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;处理方式</div>
                      <el-select
                        v-model="handleType"
                        :disabled="true"
                        placeholder="请选择处理方式"
                        style="width:45%"
                        @change="choosehandleType"
                      >
                        <el-option
                          v-for="item in handleTypeoptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
              <el-col :span="8">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;触发类型</div>
                      <el-select
                        v-model="triggerClass"
                        :disabled="disabled"
                        placeholder="请选择触发类型"
                        style="width:45%"
                        @change="chooseTriggerClass"
                      >
                        <el-option
                          v-for="item in triggerClassoptions"
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
            <el-col :span="8">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px">预警类别</div>
                    <el-select
                      v-model="warnType"
                      :disabled="disabled"
                      placeholder="请选择预警类别"
                      style="width:45%"
                    >
                      <el-option
                        v-for="item in warnTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="8">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px">是否必传附件</div>
                    <el-select
                      v-model="uploadFile"
                      :disabled="disabled"
                      placeholder="请选择是否必传附件"
                      style="width:45%"
                    >
                      <el-option
                        v-for="item in uploadFileOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <!-- <el-row>
              <el-col :span="8">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;主管部门</div>
                      <el-select
                        v-model="departmentCode"
                        placeholder="请选择主管部门"
                        style="width:45%"
                        @change="changeDepartmentCode"
                      >
                        <el-option
                          v-for="item in departmentCodeoptions"
                          :key="item.id"
                          :label="item.businessName"
                          :value="item.id"
                        />
                      </el-select>
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
              <el-col :span="8">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;业务处室</div>
                      <el-select
                        v-model="manageCode"
                        placeholder="请选择业务处室"
                        style="width:45%"
                        @change="changeManageCode"
                      >
                        <el-option
                          v-for="item in manageCodeoptions"
                          :key="item.id"
                          :label="item.businessName"
                          :value="item.id"
                        />
                      </el-select>
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
            </el-row> -->
            <el-row>
              <el-col :span="24">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;预警提示</div>
                      <el-input
                        v-model="policiesDescription"
                        type="textarea"
                        :disabled="disabled"
                        :rows="2"
                        :maxlength="200"
                        placeholder="请使用英文逗号“,”隔开进行填写，例如：楼阁修建,高尔夫球场,名画；"
                        style=" width:90%"
                      />
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
            </el-row>
          </div>
        </div>
        <div style="margin-bottom: 10px; color: red">
          <p>注意：</p>
          <p>1.【主管部门】和【业务处室】默认全部，不进行处室过滤，只有少数规则需要根据处室过滤权限时才使用此字段 ！</p>
          <p>2.预警级别与处理方式对应关系统一为：{{ $store.state.warnInfo.warnLevelOptions.map(item => `${item.label}（${item.warnTips}）`).join('、') }}</p>
          <p>3.触发类型中“实时触发”指的是事中监控，“定时触发”指的是事后监控，定时触发需要设置触发时间和频率才能生效，比如：每月1次，定时触发的监控规则【处理方式】必须选择“记录”。</p>
        </div>
        <div class="header-table">
          <BsTable
            ref="mountTableRef"
            height="300px"
            :table-global-config="{ showOverflow: false }"
            :footer-config="{ showFooter: false }"
            :table-columns-config="mountTableColumnsConfig"
            :edit-config="editConfig"
            :edit-rules="editRulesIn"
            :table-data="mountTableData"
            :toolbar-config="false"
            :pager-config="false"
          >
            <template
              v-slot:column-editParam="{ row, column }"
            >
              <div class="custom-cell" style="font-size: 14px">
                <div v-if="row.paramType !== '5'">
                  <vxe-input v-model="row.param" />
                </div>
                <div v-else>
                  <vxe-select
                    v-model="row.param"
                    :options="functionSelectOptions"
                    :option-props="{ label: 'value', value: 'regId' }"
                    :placeholder="column.title"
                  />
                </div>
              </div>
            </template>
            <template
              v-slot:column-defaultParam="{ row }"
            >
              <span>{{ getFunctionLabel(row.param) }}</span>
            </template>
          </BsTable>
        </div>
      </div>
    </div>
    <!--应用设置-->
    <div v-show="appSetShow" class="payVoucherInput" style="margin-top:50px;">
      <BsForm
        ref="messageForm"
        :is-editable="true"
        :form-items-config="formItemsConfigMessage"
        :form-data-list.sync="formDatas"
        :form-validation-config="formValidationConfigMessage"
        @itemChange="formItemChange"
      />
      <div style="margin-bottom: 10px; color: red; margin-top:100px">
        <p>注意：</p>
        <p>1.当收款人名称和资金用途的关键字为多个时，请使用英文逗号“,”隔开进行填写，例如：楼阁修建,高尔夫球场,名画；</p>
        <p>2.若业务数据满足上述条件任意一项就跳过该规则校验，即不预警</p>
      </div>
    </div>
    <!--生效范围-->
    <div v-show="effectiveShow" class="payVoucherInput" style="margin-top:50px;">
      <el-row>
        <el-col :span="12">
          <el-container>
            <el-main width="100%">
              <el-row>
                <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;管理级次</div>
                <el-input
                  v-model="regulationType"
                  placeholder="请输入管理级次"
                  style="width:45%"
                  :disabled="disabled"
                />
              </el-row>
            </el-main>
          </el-container>
        </el-col>
      </el-row>
      <div>
        <el-row>
          <el-col :span="12">
            <el-container>
              <el-main width="100%">
                <el-row>
                  <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;生效范围</div>
                  <BsTree
                    ref="rightTree"
                    style="height: calc(100% - 100px)"
                    :tree-data="treeData"
                    :config="{ multiple: true, rootName: '全部', disabled: false, treeProps: { nodeKey: 'id', label: 'name',children: 'children' ,id: 'id' } }"
                    :default-checked-keys="defaultCheckedKeys"
                    @onNodeCheckClick="onNodeCheckClick"
                  />
                </el-row>
              </el-main>
            </el-container>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--审核意见-->
    <div v-show="auditShow" class="payVoucherInput" style="margin-top:50px;">
      <el-row>
        <el-col :span="24">
          <el-container>
            <el-main width="100%">
              <el-row>
                <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;审核意见</div>
                <el-input
                  v-model="ruleFlowOpinion"
                  :disabled="ruleDisabled"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入审核意见"
                  style=" width:90%"
                />
              </el-row>
            </el-main>
          </el-container>
        </el-col>
      </el-row>
      <div v-show="!disabled" slot="footer" style="width:100%;height: 80px;margin:0 15px">
        <div v-if="showbox" id="bigbox"></div>
        <el-divider style="color:#E7EBF0" />
        <div type="flex" justify="end">
          <div style="width:100%">
            <vxe-button id="savebutton" style="float:right;margin-right:20px" status="primary" @click="audieData">确定</vxe-button>
            <vxe-button style="float:right;margin-right:20px" @click="dialogClose">取消</vxe-button>
          </div>
        </div>
      </div>
      <div v-show="showable" slot="footer" style="width:100%;height: 80px;margin:0 15px">
        <div type="flex" justify="end">
          <div style="width:100%">
            <vxe-button id="savebutton" style="float:right;margin-right:20px" status="primary" @click="audieData">确定</vxe-button>
            <vxe-button style="float:right;margin-right:20px" @click="dialogClose">取消</vxe-button>
          </div>
        </div>
      </div>
    </div>
  </vxe-modal>
</template>
<script>
import { proconf } from '../SystemLevelRulesFlow.js'
import HttpModule from '@/api/frame/main/Monitoring/levelRules.js'
import queryTreedElementByCodeMixin from '@/mixin/queryTreedElementByCode.js'
import functionSelectMixin from '@/mixin/functionSelectMixin.js'

export default {
  name: 'AddDialog',
  mixins: [queryTreedElementByCodeMixin, functionSelectMixin],
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
    buttonType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      warnType: '',
      warnTypeOptions: [
        { value: '1', label: '流向' },
        { value: '2', label: '流速' },
        { value: '3', label: '流量' },
        { value: '4', label: '其他' }
      ],
      uploadFile: '',
      uploadFileOptions: [
        { value: '1', label: '是' },
        { value: '0', label: '否' }
      ],
      showable: false,
      rightTreeValue: [],
      configIn: {
        disabled: true
      },
      treeData: [],
      disabled: false,
      editConfig: {
        trigger: 'dblclick',
        mode: 'cell'
      },
      editRulesIn: {
        param: [{ required: true, type: 'float', trigger: 'change', message: '请输入规则定义的参数值' }]
      },
      monitorTableColumnsConfig: proconf.monitorSetTableColumnsConfig,
      operationTableData: [],
      tabbtn: ['模板信息', '规则定义', '白名单', '生效范围', '审核意见'],
      ruleSetShow: true,
      ruleDesShow: false,
      appSetShow: false,
      effectiveShow: false,
      auditShow: false,
      activeIndex: 0,
      crTemplate: '',
      monitorRuleName: '',
      regulationType: '',
      quhua: '',
      ruleFlowOpinion: '',
      mountTableColumnsConfig: proconf.mountTableColumnsConfig,
      mountTableData: [],
      // BsQuery 查询栏
      queryConfig: proconf.sethighQueryConfig,
      searchDataList: proconf.sethighQueryData,
      // table 配置
      tableConfig: {
        renderers: {
          // 编辑 附件 操作日志
          $payVoucherInputGloableOptionRow: proconf.gloableOptionRow
        },
        methods: {
          onOptionRowClick: this.onOptionRowClick
        }
      },
      businessModule: '',
      businessModuleoptions: [
        { value: '1', label: '610000000-陕西省本级' },
        { value: '2', label: '610100000-西安市本级' },
        { value: '3', label: '610102000-新城区本级' },
        { value: '4', label: '610102998-新城区辖区' }
      ],
      businessFunction: '',
      businessFunctionoptions: [
        { value: '1', label: '000001-预算处预留' },
        { value: '2', label: '001001-省级财政专项资金' },
        { value: '3', label: '610102000-新城区本级' },
        { value: '4', label: '610102998-新城区辖区' }
      ],
      warningLevel: '',
      warningLeveloptions: this.$store.state.warnInfo.warnLevelOptions,
      handleType: '',
      handleTypeoptions: this.$store.state.warnInfo.warnControlTypeOptions,
      isEnable: '',
      isEnableoptions: [
        { value: 0, label: '否' },
        { value: 1, label: '是' }
      ],
      policiesName: '',
      policiesDescription: '',
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
      businessSystemCode: '',
      businessSystemName: '',
      businessSystemCodeoptions: [],
      businessModuleCode: '',
      businessModuleName: '',
      businessModuleCodeoptions: [],
      businessFunctionCode: [],
      businessFunctionName: '',
      businessFunctionCodeoptions: [],
      SysparentId: 0,
      ModparentId: 0,
      regulationClass: '',
      regulationClassoptions: [],
      triggerClass: 1,
      triggerClassoptions: [
        { value: 1, label: '实时触发' },
        { value: 2, label: '定时触发' }
      ],
      ruleDisabled: false,
      formItemsConfigMessage: proconf.formItemsConfigMessage,
      paymentLen: 0,
      paymentData: [],
      formDatas: {
        useDes: '',
        payeeAcctNo: '',
        payeeAcctName: '',
        des: '',
        basis: ''
      },
      formValidationConfigMessage: proconf.formValidationConfigMessage,
      regulationClassName: '',
      defaultCheckedKeys: []
    }
  },
  methods: {
    chooseWarningLevel(val) {
      if (val === 1) {
        this.handleType = 1
      } else if (val === 2) {
        this.handleType = 2
      } else if (val === 3) {
        this.handleType = 3
      } else if (val === 4) {
        this.handleType = 4
      }
    },
    chooseTriggerClass(val) {
      if (val === 2) {
        this.warningLevel = 4
        this.handleType = 4
      }
      if (val === 1) {
        this.warningLevel = 1
        this.handleType = 1
      }
    },
    choosehandleType(val) {
      if (val === 1) {
        this.warningLevel = 1
      } else if (val === 2) {
        this.warningLevel = 2
      } else if (val === 3) {
        this.warningLevel = 3
      } else if (val === 4) {
        this.warningLevel = 4
      }
    },
    selectRule(val) {
      let valArr = val.split('##')
      this.regulationClassName = valArr[2]
      // this.regulationClass = valArr[0]
      // let busName = this.regulationClassoptions.find(item => {
      //   return item.id === val
      // })
      // this.regulationClassName = busName.regulationClassName
      // this.regulationClass = busName.regulationClass
    },
    formItemChange(obj) {
      if (obj.property === 'payment') {
        let data = obj.itemValue ? obj.itemValue.split(',') : ''
        let content = this.formItemsConfigMessage[0].itemRender.options
        this.formItemsConfigMessage.splice(1, this.paymentLen)
        if (this.paymentData) {
          if (data.length < this.paymentLen) {
            this.paymentData.forEach(item => {
              if (data.indexOf(item) === -1) {
                this.formDatas[this.formItemsConfigMessage[0].itemRender.options[item].name + '__viewSort'] = ''
                this.formDatas[this.formItemsConfigMessage[0].itemRender.options[item].name + 'code__multiple'] = []
                this.formDatas[this.formItemsConfigMessage[0].itemRender.options[item].name + 'id'] = ''
                this.formDatas[this.formItemsConfigMessage[0].itemRender.options[item].name + 'id__multiple'] = []
                this.formDatas[this.formItemsConfigMessage[0].itemRender.options[item].name + 'name'] = ''
                this.formDatas[this.formItemsConfigMessage[0].itemRender.options[item].name + 'name__multiple'] = []
              }
            })
          }
        }
        this.paymentData = data
        this.paymentLen = data.length
        let datas = {}
        data.forEach((item, index) => {
          if (item === '1') {
            datas = this.createPro(content[item], false)
          } else {
            datas = this.createObj(content[item], false)
          }
          this.formItemsConfigMessage.splice(1 + index, 0, datas)
        })
      }
    },
    createPro(obj, disabled) {
      return {
        insertMark: obj.label,
        isNew: true,
        title: obj.label,
        field: obj.name,
        align: 'left',
        title__viewSort: obj.label,
        field__viewSort: obj.name,
        name: '$vxeTree',
        itemRender: {
          name: '$vxeTree',
          options: [],
          props: {
            config: {
              treeProps: {
                labelFormat: '{code}-{name}',
                nodeKey: 'code',
                label: 'name',
                children: 'children' // 子级字段名
              },
              placeholder: `请选择${obj.label}`,
              multiple: true,
              disabled,
              isleaf: false,
              axiosConfig: {
                method: 'post',
                url: 'large-monitor-platform/lmp/elementQuery/elementtree',
                successCode: '000000', // 成功code
                statusField: 'code'
              }
            },
            queryparams: {
              condition: '',
              elementCode: 'pro',
              year: this.$store.state.userInfo.year,
              province: this.$store.state.userInfo.province,
              limit: 2000,
              offset: 1
            }
          }
        }
      }
    },
    createObj(obj, disabled) {
      return {
        insertMark: obj.label,
        isNew: true,
        title: obj.label,
        field: obj.name,
        align: 'left',
        title__viewSort: obj.label,
        field__viewSort: obj.name,
        name: '$vxeTree',
        itemRender: {
          name: '$vxeTree',
          options: [],
          props: {
            config: {
              treeProps: {
                nodeKey: 'id',
                label: 'text',
                children: 'children' // 子级字段名
              },
              placeholder: `请选择${obj.label}`,
              disabled,
              multiple: true,
              isleaf: false,
              axiosConfig: {
                method: 'get',
                url: `mp-b-basedata-service/v2/elevalueset/view/jstreedata/${obj.urlC}`
              }
            },
            queryparams: {
              tokenid: this.$store.getters.getLoginAuthentication.tokenid,
              appguid: 'apaas',
              year: this.$store.state.userInfo.year,
              mofDivCode: this.$store.state.userInfo.province,
              parameters: {}
            }
          }
        }
      }
    },
    // tab切换
    tabClick(index) {
      this.activeIndex = index
      if (this.activeIndex === 0) {
        this.ruleSetShow = true
        this.ruleDesShow = false
        this.appSetShow = false
        this.effectiveShow = false
        this.auditShow = false
      } else if (this.activeIndex === 1) {
        this.ruleSetShow = false
        this.ruleDesShow = true
        this.appSetShow = false
        this.effectiveShow = false
        this.auditShow = false
      } else if (this.activeIndex === 2) {
        this.ruleSetShow = false
        this.ruleDesShow = false
        this.appSetShow = true
        this.effectiveShow = false
        this.auditShow = false
      } else if (this.activeIndex === 3) {
        this.ruleSetShow = false
        this.ruleDesShow = false
        this.appSetShow = false
        this.effectiveShow = true
        this.auditShow = false
      } else if (this.activeIndex === 4) {
        this.ruleSetShow = false
        this.ruleDesShow = false
        this.appSetShow = false
        this.effectiveShow = false
        this.auditShow = true
      }
    },
    getChildrenNewData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.text
        // item.code = item.ida
        // item.guid = item.id
        // item.name = item.text
        item.disabled = true
        if (item.children) {
          that.getChildrenNewData(item.children)
        }
      })

      return datas
    },
    search() {
      this.getTableData()
    },
    getTableData(val) {
      let that = this
      that.tableLoading = true
      let param = {
        page: 1,
        pageSize: 500,
        ...that.searchDataList
      }
      HttpModule.getPageQuery(param).then(res => {
        if (res.code === '000000' && res.data.results) {
          that.operationTableData = res.data.results
        } else {
          that.$message.warning('加载失败')
        }
        that.tableLoading = false
      })
    },
    // 高级查询下拉框
    itemChange(obj, form) {
      console.log(obj, form)
      if (obj.property === 'businessSystemName') {
        this.getBusinessModelCodeDatas({ businessType: '2', parentId: obj.node.id })
      }
      if (obj.property === 'businessModuleName') {
        this.getBusinessModelCodeDatas({ businessType: '3', parentId: obj.node.id })
      }
    },
    onNodeCheckClick(data) {
      console.log(data.nodes)
      let arr = []

      let regulationType = this.$store.state.curNavModule.f_FullName.substring(0, 3)
      if (regulationType === '系统级') {
        data.nodes.forEach(item => {
          if (item.isleaf) {
            let obj = {
              mofDivCode: '',
              agencyCode: '',
              mofDiv: ''
            }
            obj.mofDivId = item.code
            obj.mofDivCode = item.name.split('-')[0]
            arr.push(obj)
          }
        })
      } else if (regulationType === '部门级') {
        data.nodes.forEach(item => {
          if (item.isleaf) {
            let obj = {
              mofDivCode: '',
              agencyCode: ''
            }
            obj.mofDivId = item.code
            arr.push(obj)
          }
        })
      } else if (regulationType === '财政级') {
        data.nodes.forEach(item => {
          if (item.isleaf) {
            let obj = {
              mofDivCode: '',
              agencyCode: ''
            }
            obj.mofDivId = item.code
            obj.mofDivCode = item.name.split('-')[0]
            arr.push(obj)
          }
        })
      }
      console.log('arr', arr)
      this.scope = arr
    },
    getChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        item.code = item.id
        item.name = item.businessName
        item.label = item.id + '-' + item.businessName
        if (item.children) {
          that.getChildrenData(item.children)
        }
      })

      return datas
    },
    // // 获取业务模块
    getBusinessModelCodeDatas(val) {
      let that = this
      HttpModule.getBusinessTreeData(val).then(res => {
        if (res.code === '000000' && res.data.results) {
          let treeResdata = that.getChildrenData(res.data.results)
          const result = [
            {
              id: 'root',
              label: '全部',
              code: 'root',
              name: '全部',
              isleaf: '0',
              children: treeResdata
            }
          ]
          if (val.businessType === '1') {
            that.queryConfig.forEach(item => {
              if (item.field === 'businessSystemName') {
                console.log('result', result)
                item.itemRender.options = result
              }
            })
          } else if (val.businessType === '2') {
            that.queryConfig.forEach(item => {
              if (item.field === 'businessModuleName') {
                item.itemRender.options = result
              }
            })
          } else if (val.businessType === '3') {
            that.queryConfig.forEach(item => {
              if (item.field === 'businessFunctionName') {
                item.itemRender.options = result
              }
            })
          }
        } else {
          that.$message.warning('加载失败')
        }
      })
    },
    resetFormDataListMessage() {
      let paymentsArr = ['monitore', 'agency_code', 'pro_name', 'bgt_type_code', 'bgt_source_code', 'gov_bgt_eco_code', 'exp_func_code', 'cor_bgt_doc_no_name']
      paymentsArr.forEach(item => {
        this.formDatas[item + '__viewSort'] = ''
        this.formDatas[item + 'code'] = ''
        this.formDatas[item + 'code__multiple'] = []
        this.formDatas[item + 'id'] = ''
        this.formDatas[item + 'id__multiple'] = []
        this.formDatas[item + 'name'] = ''
        this.formDatas[item + 'name__multiple'] = []
      })
      this.formDatas.payment = []
      this.formDatas.payment__multiple = []
      this.formDatas.agency_code = []
      this.formDatas.pro_name = []
      this.formDatas.gov_bgt_eco_code = []
      this.formDatas.exp_func_code = []
      this.formDatas.cor_bgt_doc_no_name = []
      this.formDatas.dep_bgt_eco_code = []
    },
    dialogClose() {
      console.log(this.paymentLen)
      this.formItemsConfigMessage.splice(1, this.paymentLen)
      this.paymentLen = 0
      let form = this.$refs.messageForm
      form.clearValidate()
      this.resetFormDataListMessage()
      this.$parent.dialogVisible = false
      this.$parent.queryTableDatas()
    },
    // 处理字符串
    dealwithStr(str) {
      let result = ''
      if (str) {
        if (str.substring(str.length - 7) === '0000000') {
          result = '61'
        } else if (str.substring(str.length - 5) === '00000') {
          result = str.substring(0, 4)
        } else if (str.substring(str.length - 3) === '000') {
          result = str.substring(0, 6)
        } else {
          result = str
        }
        return result
      }
    },
    getProvince(data) {
      data.children.forEach(item => {
        if (item.province === this.$store.state.userInfo.province) {
          if (this.$store.state.userInfo.province === '610000000') {
            let arr = []
            arr.push(data)
            this.treeData = this.getChildrenNewData(arr)
            let dataArr = []
            this.getCheckData(dataArr, this.treeData)
            this.scope = dataArr
          } else {
            let arr = []
            arr.push(item)
            this.treeData = this.getChildrenNewData(arr)
          }
        } else {
          if (item.children) {
            // let arr = []
            // arr.push(item)
            this.getProvince(item)
          }
        }
      })
    },
    getChildrenNewData1(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.text
        item.code = item.id
        item.guid = item.id
        item.name = item.text
        item.disabled = true
        if (item.children) {
          that.getChildrenNewData1(item.children)
        }
      })

      return datas
    },
    // 获取生效范围
    getWhereTree() {
      let self = this
      let result = this.dealwithStr(this.$store.state.userInfo.province)
      // this.$store.state.userInfo.orgCode
      let param = {
        wheresql: 'and code like \'' + result + '%\'',
        elementCode: 'admdiv',
        // elementCode: 'AGENCY',
        year: this.$store.state.userInfo.year,
        province: this.$store.state.userInfo.province
      }
      let regulationType = this.$store.state.curNavModule.f_FullName.substring(0, 3)
      // let regulationType = this.$parent.DetailData.regulationType
      if (regulationType === '部门级') {
        param.elementCode = 'AGENCY'
        param.wheresql = 'and code like \'' + this.$store.state.userInfo.orgcode + '%\''
      }
      if (regulationType === '财政级') {
        param.elementCode = 'AGENCY'
        param.wheresql = 'and province =' + this.$store.state.userInfo.province
      }
      HttpModule.getTreewhere(param).then(res => {
        if (regulationType === '部门级' || regulationType === '财政级') {
          const result = [
            {
              id: 'root',
              label: '全部',
              code: 'root',
              isleaf: '0',
              name: '全部',
              children: this.getChildrenNewData1(res.data)
            }
          ]
          this.treeData = result
        } else {
          this.treeData = self.getChildrenNewData1(res.data)
          // this.getProvince(res.data[0])
        }
        this.$nextTick(() => {
          self.$parent.provinceList && self.$refs.rightTree.treeOptionFn().setCheckedKeys(self.$parent.provinceList)
        })
        if (this.$parent.dialogTitle !== '新增') {
          let tempArr = []
          // let regulationType = this.$store.state.curNavModule.f_FullName.substring(0, 3)
          this.$parent.DetailData.regulationScope.forEach(item => {
            let str = item.mofDivId.toString()
            // if (regulationType === '部门级') {
            //   str = item.mofDivId.toString()
            // } else {
            //   str = item.mofDivId.toString()
            // }
            tempArr.push(str)
          })

          // this.$parent.DetailData.regulationScope.forEach(item => {
          //   let str = item.mofDivCode.toString()
          //   tempArr.push(str)
          // })
          this.$refs.rightTree.treeOptionFn().setCheckedKeys(tempArr)
          console.log(this.treeData, 'ddddd')
        }
      })
    },
    // 保存新增的计划信息
    doInsert() {
    },
    // 送审
    audieData() {
      if (!this.ruleFlowOpinion) {
        this.$XModal.message({ status: 'warning', message: '请输入审批意见！' })
        return
      }
      let operate = 0
      if (this.buttonType === 'approval') {
        operate = 2
      }
      if (this.buttonType === 'sendBack') {
        operate = 4
      }
      let param = { operate: operate, menuName: this.$store.state.curNavModule.name, regulationCodes: [this.$parent.DetailData.regulationCode], ruleFlowOpinion: this.ruleFlowOpinion }
      HttpModule.audieData(param).then(res => {
        if (res.code === '000000') {
          this.$message.warning('操作成功')
          console.log(this.paymentLen)
          this.formItemsConfigMessage.splice(1, this.paymentLen)
          this.paymentLen = 0
          let form = this.$refs.messageForm
          form.clearValidate()
          this.resetFormDataListMessage()
          this.$parent.dialogVisible = false
          this.$parent.queryTableDatas()
          this.$parent.queryTableDatasCount()
          // this.queryTableDatas()
        }
      })
    },
    // 选择业务系统
    changeSysCode(val) {
      console.log(val)
      this.SysparentId = val
      this.businessModuleCode = ''
      let busName = this.businessSystemCodeoptions.find(item => {
        return item.id === val
      })
      this.businessSystemName = busName.businessName
      this.getModLists()
    },
    // 选择业务模块
    changeModCode(val) {
      this.ModparentId = val
      let busName = this.businessModuleCodeoptions.find(item => {
        return item.id === val
      })
      this.businessModuleName = busName.businessName
      this.businessFunctionCodeModal = ''
      // this.getFunLists()
    },
    // 业务系统下拉树
    getSysLists() {
      const param = {
        businessType: 1,
        parentId: 0
      }
      this.addLoading = true
      HttpModule.getbusLists(param).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.businessSystemCodeoptions = res.data.results
          if (this.$parent.dialogTitle === '新增') {
            this.businessSystemCode = '1'
            this.changeSysCode(this.businessSystemCode)
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 业务模块下拉树
    getModLists() {
      const param = {
        businessType: 2,
        parentId: this.SysparentId
      }
      this.addLoading = true
      HttpModule.getbusLists(param).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.businessModuleCodeoptions = res.data.results
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 业务功能下拉树
    getFunLists() {
      const param = {
        businessType: 3,
        parentId: this.ModparentId
      }
      this.addLoading = true
      HttpModule.getbusLists(param).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.businessFunctionCodeoptions = res.data.results
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getRegulationChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        // item.code = item.code
        item.name = item.ruleName
        item.label = item.code + '-' + item.ruleName
        if (item.children) {
          that.getRegulationChildrenData(item.children)
        }
      })

      return datas
    },
    getRegulation() {
      HttpModule.getTree(0).then(res => {
        if (res.code === '000000') {
          let treeResdata = this.getRegulationChildrenData(res.data)
          this.regulationClassoptions = treeResdata
          this.regulationClassoptions.forEach(item => {
            item.regulationName = item.code + '-' + item.ruleName
          })
        } else {
          this.$message.error('下拉树加载失败')
        }
      })
    }

  },
  watch: {
  },
  async created() {
    this.getWhereTree()
    if (this.$parent.dialogTitle === '新增') {
      this.getBusinessModelCodeDatas({ businessType: '1', parentId: 0 })
      this.getTableData()
      // 直达资金新增规则
      this.$parent.dialogVisibleRules && (this.regulationClass = '09-直达资金')
    } else if (this.$parent.dialogTitle === '查看详情') {
      this.warnType = this.$parent.DetailData.warnType
      this.uploadFile = this.$parent.DetailData?.uploadFile

      this.ruleSetShow = false
      this.ruleDesShow = true
      this.appSetShow = false
      this.effectiveShow = false
      this.activeIndex = 1
      this.monitorRuleName = this.$parent.DetailData.regulationName
      this.warningLevel = this.$parent.DetailData.warningLevel
      // this.regulationClass = this.$parent.DetailData.regulationClass
      this.getRegulation()
      this.regulationClass = this.$parent.DetailData.regulationClass + '-' + this.$parent.DetailData.regulationClassName
      this.triggerClass = this.$parent.DetailData.triggerClass
      this.handleType = this.$parent.DetailData.handleType
      this.operationTableData = [this.$parent.DetailData.ruleTemplate]

      this.crTemplate = this.$parent.DetailData.ruleTemplate.ruleTemplateName
      // this.businessModule = this.$parent.DetailData.ruleTemplate.businessModuleName
      // this.businessFunction = this.$parent.DetailData.ruleTemplate.businessFunctionName
      this.businessSystemCode = this.$parent.DetailData.businessSystemCode + ''
      this.SysparentId = this.businessSystemCode
      this.getModLists()
      this.businessModuleCode = this.$parent.DetailData.businessModuleCode + ''
      this.ModparentId = this.businessModuleCode

      // this.getFunLists()
      // this.businessFunctionCode.push(parseInt(this.$parent.DetailData.businessFunctionCode))
      // this.businessFunctionCode = this.$parent.DetailData.menuIdList.split(',')
      this.businessSystemName = this.$parent.DetailData.businessSystemName
      this.businessModuleName = this.$parent.DetailData.businessModuleName
      // this.businessFunctionName.push(this.$parent.DetailData.businessFunctionName)
      // this.businessFunctionName = this.$parent.DetailData.menuNameList
      this.regulationModelCode = this.$parent.DetailData.ruleTemplateCode
      this.mountTableData = this.$parent.DetailData.regulationConfig
      this.ruleFlag = this.$parent.DetailData.ruleFlag
      // this.warnLocation = this.$parent.DetailData.warnLocation
      this.policiesDescription = this.$parent.DetailData.warningTips
      // 不可编辑
      // this.buttonConfig = {}
      this.disabled = true
      this.editConfig = false
    } else if (this.$parent.dialogTitle === '修改') {
      this.warnType = this.$parent.DetailData.warnType
      this.uploadFile = this.$parent.DetailData.uploadFile
      this.ruleFlag = this.$parent.DetailData.ruleFlag
      // this.warnLocation = this.$parent.DetailData.warnLocation
      this.monitorRuleName = this.$parent.DetailData.regulationName
      this.warningLevel = this.$parent.DetailData.warningLevel
      // this.regulationClass = this.$parent.DetailData.regulationClass
      this.getRegulation()
      this.regulationClass = this.$parent.DetailData.regulationClass + '-' + this.$parent.DetailData.regulationClassName
      this.triggerClass = this.$parent.DetailData.triggerClass
      this.handleType = this.$parent.DetailData.handleType
      this.operationTableData = [this.$parent.DetailData.ruleTemplate]

      this.crTemplate = this.$parent.DetailData.ruleTemplate.ruleTemplateName
      // this.businessModule = this.$parent.DetailData.ruleTemplate.businessModuleName
      // this.businessFunction = this.$parent.DetailData.ruleTemplate.businessFunctionName
      this.businessSystemCode = this.$parent.DetailData.businessSystemCode + ''
      this.SysparentId = this.businessSystemCode
      this.getModLists()
      this.businessModuleCode = this.$parent.DetailData.businessModuleCode + ''
      this.ModparentId = this.businessModuleCode

      // this.getFunLists()
      // this.businessFunctionCode.push(parseInt(this.$parent.DetailData.businessFunctionCode))
      // this.businessFunctionCode = this.$parent.DetailData.menuIdList.split(',')
      this.businessSystemName = this.$parent.DetailData.businessSystemName
      this.businessModuleName = this.$parent.DetailData.businessModuleName
      // this.businessFunctionName.push(this.$parent.DetailData.businessFunctionName)
      // this.businessFunctionName = this.$parent.DetailData.menuNameList
      this.regulationModelCode = this.$parent.DetailData.ruleTemplateCode
      this.mountTableData = this.$parent.DetailData.regulationConfig

      this.policiesDescription = this.$parent.DetailData.warningTips
      this.scope = this.$parent.DetailData.regulationScope
    }
    if (this.$parent.dialogTitle !== '新增') {
      if (this.$parent.formDatas) {
        this.formDatas = this.$parent.formDatas
        if (this.formDatas.payment && this.formDatas.payment !== '') {
          this.formDatas.payment__multiple = this.formDatas.payment.split(',').slice(1)
          this.paymentLen = this.formDatas.payment__multiple.length
          this.formDatas.payment__multiple.forEach((item, index) => {
            let datas = {}
            if (item === '1') {
              datas = this.$parent.dialogTitle === '查看详情' ? this.createPro(this.formItemsConfigMessage[0].itemRender.options[item], true) : this.createPro(this.formItemsConfigMessage[0].itemRender.options[item], false)
            } else {
              datas = this.$parent.dialogTitle === '查看详情' ? this.createObj(this.formItemsConfigMessage[0].itemRender.options[item], true) : this.createObj(this.formItemsConfigMessage[0].itemRender.options[item], false)
            }
            this.formItemsConfigMessage.splice(1 + index, 0, datas)
            if (this.$parent.dialogTitle === '查看详情') {
              this.formItemsConfigMessage.forEach(item => {
                item.itemRender.props.disabled = true
              })
            } else {
              this.formItemsConfigMessage.forEach(item => {
                item.itemRender.props.disabled = false
              })
            }
            // this.formDatas.agency_code = '000,000001,000002'
            // this.formDatas.agency_name = '预算处预留,预算处预留,test单位新增'
            this.formDatas.agency_code = this.formDatas.agencyCode
            this.formDatas.agency_name = this.formDatas.agencyName
            this.formDatas.pro_code = this.formDatas.proCode
            this.formDatas.pro_name = this.formDatas.proName
            this.formDatas.exp_func_code = this.formDatas.expFunCode
            this.formDatas.exp_func_name = this.formDatas.expFunName
            this.formDatas.dep_bgt_eco_code = this.formDatas.depBgtEcoCode
            this.formDatas.dep_bgt_eco_name = this.formDatas.depBgtEcoName
            this.formDatas.gov_bgt_eco_code = this.formDatas.govBgtEcoCode
            this.formDatas.gov_bgt_eco_name = this.formDatas.govBgtEcoName
            this.formDatas.cor_bgt_doc_no_code = this.formDatas.corBgtDocNoCode
            this.formDatas.cor_bgt_doc_no_name = this.formDatas.corBgtDocNoName
          // this.formDatas.agency_code_id = '5208FE4932F34E27B0A31BDDE2D0276A'
          // let formDataParams = this.formDatas[this.formItemsConfigMessage[0].itemRender.options[item].name].split(',')
          // let paramsCodes = ''
          // let paramsNames = ''
          // formDataParams.forEach(item => {
          //   item = item.split('-')
          //   paramsCodes += item[0]
          //   paramsNames += item[1]
          // })
          // this.formDatas[this.formItemsConfigMessage[0].itemRender.options[item].name + 'code'] = paramsCodes
          // this.formDatas[this.formItemsConfigMessage[0].itemRender.options[item].name + 'name'] = paramsNames
          })
          console.log(this.formDatas)
        }
      }
    }
    if (this.$parent.dialogTitle === '查看详情') {
      this.formItemsConfigMessage.forEach(item => {
        item.itemRender.props.disabled = true
      })
    }
    this.regulationType = this.$store.state.curNavModule.f_FullName?.substring(0, 3)
    this.getSysLists()
    this.getDepLists()
    this.getRegulation()
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
  .setbtn{
    width:100px;
    height:45px;
    float:left;
    margin-right:20px;
  }
  .tabone{
    width:100px;
    height:40px;
    text-align:center;
    line-height:40px;
    float:left;
    border:1px solid #ccc;
    border-radius:4px;
  }
  .tabone1{
    width:100px;
    height:40px;
    text-align:center;
    line-height:40px;
    float:left;
    border:1px solid #ccc;
    background-color:#f2f2f2;
    border-radius:4px;
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
  .vxe-toolbar{
    .vxe-button--wrapper{
      display:flex;
    }
  }
</style>
