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
        <div v-show="!disabled" class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="queryConfig"
            :query-form-data.sync="searchDataList"
            @onSearchClick="search"
            @itemChange="itemChange"
          />
        </div>
        <div class="header-table" style="margin-top:15px;">
          <BsTable
            ref="monitorTableRef"
            height="400px"
            :loading="tableLoading"
            :footer-config="{ showFooter: false }"
            :table-columns-config="monitorTableColumnsConfig"
            :table-data="operationTableData"
            :table-config="tableConfig"
            :toolbar-config="buttonConfig"
            :pager-config="false"
          >
            <template v-slot:toolbarSlots>
              <div class="table-toolbar-left">
                <div
                  v-if="leftVisible === false"
                  class="table-toolbar-contro-leftvisible"
                  @click="leftVisible = true"
                ></div>
                <div class="table-toolbar-left-title">
                  <span class="fn-inline">{{ curTable.name }}</span>
                  <i class="fn-inline"></i>
                </div>
              </div>
              <div style="float:right">
                <span v-for="item of buttonConfig" :key="item.code">
                  <vxe-button :key="item.code" :content="item.name" :status="item.status || 'default'" @click="item.callback" />
                </span>
              </div>
            </template>
          </BsTable>
        </div>
      </div>
      <div v-show="!disabled" slot="footer" style="width:100%;height: 80px;margin:0 15px">
        <div v-if="showbox" id="bigbox"></div>
        <el-divider style="color:#E7EBF0" />
        <div type="flex" justify="end">
          <div style="width:100%">
            <vxe-button id="savebutton" style="float:right;margin-right:20px" status="primary" @click="sureButton">确定</vxe-button>
          </div>
        </div>
      </div>
    </div>
    <!--规则定义-->
    <div v-show="ruleDesShow" class="payVoucherInput" style="margin-top:50px;">
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
                      :disabled="true"
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
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;业务系统</div>
                    <el-select
                      v-model="businessSystemCode"
                      :disabled="true"
                      placeholder="请选择业务系统"
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
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;业务模块</div>
                    <el-select
                      v-model="businessModuleCode"
                      :disabled="true"
                      placeholder="请选择业务模块"
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
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font v-show="triggerClass !== 2" color="red">*</font>&nbsp;业务菜单</div>
                    <!--<el-select-->
                    <!--  v-model="businessFunctionCode"-->
                    <!--  :disabled="disabled"-->
                    <!--  multiple="true"-->
                    <!--  placeholder="请选择业务菜单"-->
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
                      :disabled="disabled || $parent.dialogVisibleRules"
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
            <el-col :span="8">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;函数逻辑关系</div>
                    <el-select
                      v-model="ruleFlag"
                      :disabled="disabled"
                      placeholder="请选择函数逻辑关系"
                      style="width:45%"
                    >
                      <el-option
                        v-for="item in ruleFlagOptions"
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
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;提醒位置</div>
                    <el-select
                      v-model="warnLocation"
                      :disabled="disabled"
                      placeholder="请选择提醒位置"
                      style="width:45%"
                    >
                      <el-option
                        v-for="item in warnLocationOptions"
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

          </el-row>
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
                      placeholder="请使用英文逗号“,”隔开进行填写，例如：楼阁修建,高尔夫球场,名画；"
                      style=" width:90%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
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
          :edit-config="editConfig"
          :edit-rules="editRulesIn"
          :table-columns-config="mountTableColumnsConfig"
          :table-data="mountTableData"
          :toolbar-config="false"
          :pager-config="false"
        />
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
                  :disabled="true"
                  placeholder="请输入管理级次"
                  style="width:45%"
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
                    :config="{ multiple: true, rootName: '全部', disabled: false, treeProps: { labelFormat: '{code}-{name}', nodeKey: 'id', label: 'name',children: 'children' } }"
                    @onNodeCheckClick="onNodeCheckClick"
                  />
                </el-row>
              </el-main>
            </el-container>
          </el-col>
        </el-row>
      </div>
      <div v-show="!disabled" slot="footer" style="width:100%;height: 80px;margin:0 15px">
        <div v-if="showbox" id="bigbox"></div>
        <el-divider style="color:#E7EBF0" />
        <div type="flex" justify="end">
          <div style="width:100%">
            <vxe-button id="savebutton" style="float:right;margin-right:20px" status="primary" @click="doInsert">确定</vxe-button>
            <vxe-button style="float:right;margin-right:20px" @click="dialogClose">取消</vxe-button>
          </div>
        </div>
      </div>
    </div>
  </vxe-modal>
</template>
<script>
import { proconf } from '../SystemLevelRules.js'
import HttpModule from '@/api/frame/main/Monitoring/levelRules.js'
import queryTreedElementByCodeMixin from '@/mixin/queryTreedElementByCode.js'

export default {
  name: 'AddDialog',
  mixins: [queryTreedElementByCodeMixin],
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
    }
  },
  data() {
    return {
      treeData: [],
      editConfig: {
        trigger: 'dblclick',
        mode: 'cell'
      },
      disabled: false,
      toolbarConfig: {
        batchModify: false,
        moneyConversion: false, // 是否有金额转换,
        disabledMoneyConversion: false,
        import: false,
        calculator: false,
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        },
        buttons: [
          { code: 'sure', name: '确定', status: 'primary', callback: this.sureButton },
          { code: 'cancel', name: '取消', status: '', callback: this.cancelButton }
        ]
      },
      editRulesIn: {
        param: [{ required: true, type: 'float', trigger: 'change', message: '请输入规则定义的参数值' }]
      },
      buttonConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false // 是否有金额转换
        // buttons: [
        //   { code: 'sure', name: '确定', status: 'primary', callback: this.sureButton }
        // ]
      },
      tempNodes: [],
      regulationModelName: '',
      regulationModelCode: '',
      tableLoading: false,
      monitorTableColumnsConfig: proconf.monitorSetTableColumnsConfig,
      operationTableData: [],
      tabbtn: ['模板信息', '规则定义', '白名单', '生效范围'],
      ruleSetShow: true,
      ruleDesShow: false,
      appSetShow: false,
      effectiveShow: false,
      activeIndex: 0,
      crTemplate: '',
      monitorRuleName: '',
      regulationType: '',
      quhua: '',
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
      warningLevel: 1,
      warningLeveloptions: this.$store.state.warnInfo.warnLevelOptions,
      handleType: 1,
      handleTypeoptions: this.$store.state.warnInfo.warnControlTypeOptions,
      triggerClass: 1,
      triggerClassoptions: [
        { value: 1, label: '实时触发' },
        { value: 2, label: '定时触发' }
      ],
      isEnable: 0,
      isEnableoptions: [
        { value: 0, label: '否' },
        { value: 1, label: '是' }
      ],
      ruleFlag: 1,
      ruleFlagOptions: [
        { value: 0, label: '或' },
        { value: 1, label: '且' }
      ],
      warnLocation: 3,
      warnLocationOptions: [
        { value: 1, label: '门户' },
        { value: 2, label: '核算' },
        { value: 3, label: '不提示' }
      ],
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
      regulationClass: '',
      regulationClassName: '',
      regulationClassoptions: [
        // { value: 1, label: '直达资金监控规则' },
        // { value: 2, label: '大额支付监控' },
        // { value: 3, label: '同户名转账' },
        // { value: 4, label: '工资支出相关规则' },
        // { value: 5, label: '支出不规范' },
        // { value: 6, label: '支付信息不规范' },
        // { value: 7, label: '禁止使用科目' },
        // { value: 8, label: '资金用途使用不规范' },
        // { value: 9, label: '其他规则' },
        // { value: 10, label: '基础财务信息' },
        // { value: 11, label: '人员类规则' },
        // { value: 12, label: '期初及使用预警规则' },
        // { value: 13, label: '凭证类规则' },
        // { value: 14, label: '其他类规则' },
        // { value: 15, label: '分析类规则' }
      ],
      policiesName: '',
      policiesDescription: '',
      dialogVisible: true,
      addLoading: false,
      token: '',
      scope: [],
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
      businessFunctionName: [],
      businessFunctionCodeoptions: [],
      departmentCode: '',
      departmentName: '',
      departmentCodeoptions: [],
      SysparentId: 0,
      ModparentId: 0,
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
      formValidationConfigMessage: proconf.formValidationConfigMessage
    }
  },
  methods: {
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
                this.formDatas[this.formItemsConfigMessage[0].itemRender.options[item].name + 'code'] = ''
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
                label: '{name}',
                labelFormat: '{code}-{name}',
                children: 'children' // 子级字段名
              },
              placeholder: `请选择${obj.label}`,
              disabled,
              multiple: true,
              isleaf: false,
              axiosConfig: {
                method: 'post',
                // url: `mp-b-basedata-service/v2/elevalueset/view/jstreedata/${obj.urlC}`
                url: 'large-monitor-platform/lmp/elementQuery/elementtree',
                successCode: '000000', // 成功code
                statusField: 'code'
              }
            },
            queryparams: {
              elementCode: obj.urlC,
              date: this.$store.state.userInfo.year,
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
    sureButton() {
      let that = this
      that.mountTableData = []
      let datas = this.$refs.monitorTableRef.getSelectionData()
      if (datas.length !== 1) {
        this.$XModal.message({ status: 'warning', message: '请选择一条数据数据！' })
        return
      }
      console.log(datas)
      this.crTemplate = datas[0].ruleTemplateName
      this.businessModule = datas[0].businessModuleName
      this.businessFunction = datas[0].businessFunctionName
      this.regulationModelCode = datas[0].ruleTemplateCode
      // this.regulationModelName = datas[0]
      this.ruleSetShow = false
      this.ruleDesShow = true
      this.appSetShow = false
      this.effectiveShow = false
      this.activeIndex = 1
      this.businessSystemCode = datas[0].businessSystemCode
      this.changeSysCode(this.businessSystemCode)
      this.businessModuleCode = datas[0].businessModuleCode
      this.changeModCode(this.businessModuleCode)
      let datas1 = this.$refs.mountTableRef.getSelectionData()
      console.log(datas1)
      HttpModule.getTemplateByCode({ ruleTemplateCode: datas[0].ruleTemplateCode }).then(res => {
        if (res.code === '000000') {
          res.data.functionInfoList.forEach(item => {
            let tempObj = {
              functionName: '',
              functionCode: '',
              functionParameter: '',
              description: '',
              relation: '1',
              paramType: '1',
              param: ''
            }
            tempObj.functionParameter = item.functionParameter
            tempObj.description = item.description
            tempObj.functionName = item.functionName
            tempObj.functionCode = item.functionCode
            that.mountTableData.push(tempObj)
          })
        } else {
          that.$message.warning('加载失败')
        }
        that.tableLoading = false
      })
      console.log(datas)
    },
    cancelButton() { console.log('取消', this.$store.state.curNavModule.f_FullName.substring(0, 3)) },
    // tab切换
    tabClick(index) {
      this.activeIndex = index
      if (this.activeIndex === 0) {
        this.ruleSetShow = true
        this.ruleDesShow = false
        this.appSetShow = false
        this.effectiveShow = false
      } else if (this.activeIndex === 1) {
        this.ruleSetShow = false
        this.ruleDesShow = true
        this.appSetShow = false
        this.effectiveShow = false
      } else if (this.activeIndex === 2) {
        this.ruleSetShow = false
        this.ruleDesShow = false
        this.appSetShow = true
        this.effectiveShow = false
      } else if (this.activeIndex === 3) {
        this.ruleSetShow = false
        this.ruleDesShow = false
        this.appSetShow = false
        this.effectiveShow = true
      } else if (this.activeIndex === 4) {
        this.ruleSetShow = false
        this.ruleDesShow = false
        this.appSetShow = false
        this.effectiveShow = false
      }
    },
    getTableData(val) {
      let that = this
      console.log('getTableData', that.searchDataList)
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
            obj.mofDivId = item.id
            obj.mofDivCode = item.code
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
            obj.mofDivId = item.id
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
            obj.mofDivId = item.id
            obj.agencyCode = item.code
            arr.push(obj)
          }
        })
      }
      console.log('arr', arr)
      this.scope = arr
    },
    getChildrenNewData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.name
        // item.code = item.id
        // item.guid = item.id
        // item.name = item.text || item.name
        if (item.children) {
          that.getChildrenNewData(item.children)
        }
      })

      return datas
    },
    search(obj) {
      console.log(obj)
      this.searchDataList.ruleTemplateName = obj.ruleTemplateName
      this.searchDataList.businessSystemCode = obj.businessSystem_code
      this.searchDataList.businessModuleCode = obj.businessModule_code
      this.searchDataList.businessFunctionCode = obj.businessFunction_code

      this.searchDataList.businessModuleName = obj.businessModuleName
      this.searchDataList.businessSystemName = obj.businessSystemName
      this.searchDataList.businessFunctionName = obj.businessFunctionName
      this.getTableData()
    },
    // 高级查询下拉框
    itemChange(obj, form) {
      console.log(obj, form)
      if (obj.property === 'businessSystem') {
        this.getBusinessModelCodeDatas({ businessType: '2', parentId: obj.node.id })
      }
      if (obj.property === 'businessModule') {
        this.getBusinessModelCodeDatas({ businessType: '3', parentId: obj.node.id })
      }
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
              if (item.field === 'businessSystem') {
                console.log('result', result)
                item.itemRender.options = result
              }
            })
          } else if (val.businessType === '2') {
            that.queryConfig.forEach(item => {
              if (item.field === 'businessModule') {
                item.itemRender.options = result
              }
            })
          } else if (val.businessType === '3') {
            that.queryConfig.forEach(item => {
              if (item.field === 'businessFunction') {
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
      this.formItemsConfigMessage.forEach(item => {
        item.itemRender.props.disabled = false
      })
      this.$parent.dialogVisible = false
      this.$parent.dialogVisibleRules = false
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
    getCheckData(dataArr, data) {
      data.forEach(item => {
        if (item.isleaf === '1') {
          let obj = {
            mofDivCode: '',
            agencyCode: '',
            mofDiv: ''
          }
          obj.mofDivId = item.code
          obj.mofDivCode = item.name.split('-')[0]
          dataArr.push(obj)
        }
        if (item.children) {
          this.getCheckData(dataArr, item.children)
        }
      })
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
        if (item.children) {
          that.getChildrenNewData1(item.children)
        }
      })

      return datas
    },
    // 获取生效范围
    getWhereTree() {
      // let that = this
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
      if (regulationType === '部门级') {
        param.elementCode = 'AGENCY'
        param.wheresql = 'and code like \'' + this.$store.state.userInfo.orgcode + '%\''
      }
      if (regulationType === '财政级') {
        param.elementCode = 'AGENCY'
        param.wheresql = 'and province =' + this.$store.state.userInfo.province
      }
      HttpModule.getTreewhere(param).then(res => {
        // console.log('that.getChildrenNewData(res.data)', that.getChildrenNewData(res.data))
        // this.treeData = this.getChildrenNewData(res.data)
        console.log(res.data, regulationType)
        if (regulationType === '部门级' || regulationType === '财政级') {
          // let treeResdata = this.getChildrenNewData1(res.data)
          const result = [
            {
              id: 'root',
              label: '全部',
              code: 'root',
              isleaf: '0',
              name: '全部',
              children: this.getChildrenNewData(res.data)
            }
          ]
          this.treeData = result
        } else {
          this.treeData = this.getChildrenNewData(res.data)
        }
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
          console.log(tempArr)
          this.$refs.rightTree.treeOptionFn().setCheckedKeys(tempArr)
        } else {
          let tempArr = []
          tempArr.push('B99903EABA534E01AFB5E4829A5A0054')
          this.$refs.rightTree.treeOptionFn().setCheckedKeys(tempArr)
        }
      })
    },
    // 保存新增的计划信息
    doInsert() {
      // 校验判断
      let datas = this.$refs.monitorTableRef.getSelectionData()
      if (this.$parent.dialogTitle !== '修改' && datas.length !== 1) {
        this.$XModal.message({ status: 'warning', message: '请选择一条模板信息！' })
        return
      }
      // if (this.formDatas.payment === '') {
      //   this.$message.warning('请选择基础要素')
      //   return
      // }
      // if (this.formDatas.payeeAcctName === '') {
      //   this.$message.warning('请输入收款人名称')
      //   return
      // }
      // if (this.formDatas.payeeAcctNo === '') {
      //   this.$message.warning('请输入收款人账号')
      //   return
      // }
      // if (this.formDatas.useDes === '') {
      //   this.$message.warning('请输入资金用途')
      //   return
      // }
      // console.log(this.formDatas)
      // let isGo = true
      // this.formDatas.payment.split(',').forEach(item => {
      //   if (!this.formDatas[this.formItemsConfigMessage[0].itemRender.options[item].name]) {
      //     this.$message.warning('请选择' + this.formItemsConfigMessage[0].itemRender.options[item].label)
      //     isGo = false
      //   }
      // })
      // if (isGo === false) {
      //   return
      // }
      if (!this.monitorRuleName) {
        this.$XModal.message({ status: 'warning', message: '请输入规则名称！' })
        return
      }

      if (this.businessSystemCode === undefined) {
        this.$message.warning('请选择业务系统')
        return
      }
      if (this.businessSystemName === null) {
        this.$message.warning('请选择业务系统')
        return
      }
      if (this.businessModuleCode === undefined) {
        this.$message.warning('请选择业务模块')
        return
      }
      if (this.businessModuleName === null) {
        this.$message.warning('请选择业务模块')
        return
      }
      if (this.triggerClass === 1 && (this.businessFunctionCode === undefined || this.businessFunctionCode.length === 0)) {
        this.$message.warning('请选择业务菜单')
        return
      }
      // if (this.businessFunctionName === null) {
      //   this.$message.warning('请选择业务菜单')
      //   return
      // }
      if (this.ruleFlag !== 0 && !this.ruleFlag) {
        this.$message.warning('请选择函数逻辑')
        return
      }
      // if (this.warnLocation) {
      //   this.$message.warning('请选择提醒位置')
      //   return
      // }
      if (!this.policiesDescription) {
        this.$XModal.message({ status: 'warning', message: '请选择预警提示！' })
        return
      }
      if (this.monitorRuleName.length > 50) {
        this.$XModal.message({ status: 'warning', message: '规则名称长度应小于等于50位' })
        return
      }
      if (this.policiesDescription.length > 100) {
        this.$XModal.message({ status: 'warning', message: '预警提示长度应小于等于100位' })
        return
      }
      if (!this.crTemplate) {
        this.$XModal.message({ status: 'warning', message: '请输入模板名称' })
        return
      }
      if (!this.businessSystemCode) {
        this.$XModal.message({ status: 'warning', message: '请选择业务系统' })
        return
      }
      if (!this.businessModuleCode) {
        this.$XModal.message({ status: 'warning', message: '请选择业务模块' })
        return
      }
      // if (!this.businessFunctionCode && this.triggerClass === 1) {
      //   this.$XModal.message({ status: 'warning', message: '请选择业务菜单' })
      //   return
      // }
      if (!this.monitorRuleName) {
        this.$XModal.message({ status: 'warning', message: '请输入监控规则名称' })
        return
      }
      if (!this.regulationClass) {
        this.$XModal.message({ status: 'warning', message: '请选择监控主题' })
        return
      }
      if (!this.warningLevel) {
        this.$XModal.message({ status: 'warning', message: '请选择预警级别' })
        return
      }
      if (!this.handleType) {
        this.$XModal.message({ status: 'warning', message: '请选择处理方式' })
        return
      }
      if (!this.triggerClass) {
        this.$XModal.message({ status: 'warning', message: '请选择触发类型' })
        return
      }
      if (!this.warnLocation) {
        this.$XModal.message({ status: 'warning', message: '请选择提醒位置' })
        return
      }
      // if (!this.warnType) {
      //   this.$XModal.message({ status: 'warning', message: '请选择预警类别' })
      //   return
      // }
      // if (!this.uploadFile) {
      //   this.$XModal.message({ status: 'warning', message: '请选择是否上传附件' })
      //   return
      // }
      if (!this.scope?.length) {
        this.$XModal.message({ status: 'warning', message: '请选择生效范围' })
        return
      }
      this.$refs.mountTableRef.validate().then((res) => {
        if (Object.keys(res).length > 0) {
          let errors = Object.values(res)
          for (let i = 0; i < errors.length; i++) {
            this.$message({ type: 'warning', message: errors[i][0].rule.message })
            return
          }
        }
      })
      let that = this
      let datas1 = this.$refs.mountTableRef.getPureTableData().fullData
      for (let i = 0; i < datas1.length; i++) {
        if (datas1[i].param === null || datas1[i].param === '') {
          this.$message({ type: 'warning', message: '模板：' + datas1[i].functionName + ' 参数值为空' })
          return
        }
      }
      let regulationType = this.$store.state.curNavModule.f_FullName.substring(0, 3)
      console.log(that.scope)
      let isFull = 0
      if (regulationType === '系统级') {
        regulationType = '1'
        if (that.scope.length === 277) {
          isFull = 1
        }
      } else if (regulationType === '部门级') {
        regulationType = '3'
      } else if (regulationType === '财政级') {
        regulationType = '2'
        if (that.scope.length === 2536) {
          isFull = 1
        }
      }
      let ruleId = ''
      let ruleName = ''
      if (that.regulationClass) {
        let valArr = that.regulationClass.split('-')
        ruleName = valArr[1]
        ruleId = valArr[0]
      }
      console.log(this.formDatas)
      let param = {
        'regulationClass': ruleId,
        'regulationClassName': ruleName,
        'triggerClass': that.triggerClass,
        'businessSystemCode': that.businessSystemCode,
        'businessSystemName': that.businessSystemName,
        'businessModuleCode': that.businessModuleCode,
        'businessModuleName': that.businessModuleName,
        'menuIdList': that.businessFunctionCode.toString(), // 多菜单
        'menuNameList': that.businessFunctionName.toString(),
        // 'businessFunctionCode': that.businessFunctionCode,
        'departmentCode': that.departmentCode,
        'departmentName': that.departmentName,
        // 'businessFunctionName': that.businessFunctionName,
        'regulationName': that.monitorRuleName, // 规则名称
        'regulationType': regulationType, // 规则类型：1.系统级  2.财政级  3.部门级
        'warningLevel': that.warningLevel, // 预警级别
        'handleType': that.handleType, // 处理方式
        'regulationModelCode': that.regulationModelCode, // 模板编码
        'regulationModelName': that.crTemplate, // 模板名称
        'warningTips': that.policiesDescription, // 预警提示
        'regulationStatus': this.$parent.regulationStatus, // 规则状态：1.新增  2.送审  3.审核
        'regulationConfig': datas1,
        'regulationScope': that.scope, // 规则生效范围{mofDivCode: '', angencyCode: ''}
        menuName: this.$store.state.curNavModule.name,
        'ruleFlag': that.ruleFlag,
        'warnLocation': that.warnLocation,
        isFull: isFull,
        ruleElement: {
          payment: this.formDatas.payment,
          agencyCode: this.formDatas.agency_code,
          agencyName: this.formDatas.agency_name,
          proCode: this.formDatas.pro_code,
          proName: this.formDatas.pro_name,
          govBgtEcoCode: this.formDatas.gov_bgt_eco_code,
          govBgtEcoName: this.formDatas.gov_bgt_eco_name,
          expFunCode: this.formDatas.exp_func_code,
          expFunName: this.formDatas.exp_func_name,
          depBgtEcoCode: this.formDatas.dep_bgt_eco_code,
          depBgtEcoName: this.formDatas.dep_bgt_eco_name,
          corBgtDocNoName: this.formDatas.cor_bgt_doc_no_name,
          corBgtDocNoCode: this.formDatas.cor_bgt_doc_no_code,
          payeeAcctName: this.formDatas.payeeAcctName,
          payeeAcctNo: this.formDatas.payeeAcctNo,
          useDes: this.formDatas.useDes,
          des: this.formDatas.des,
          basis: this.formDatas.basis
        },
        warnType: this.warnType, // 预警类别
        uploadFile: this.uploadFile // 是否上传附件
      }
      if (this.$parent.dialogTitle === '修改') {
        console.log(this.formDatas)
        param.regulationCode = this.$parent.DetailData.regulationCode
        HttpModule.updateData(param).then(res => {
          if (res.code === '000000') {
            that.$message.success('修改成功')
            this.formItemsConfigMessage.splice(1, this.paymentLen)
            this.paymentLen = 0
            let form = this.$refs.messageForm
            form.clearValidate()
            this.resetFormDataListMessage()
            this.formItemsConfigMessage.forEach(item => {
              item.itemRender.props.disabled = false
            })
            that.$parent.dialogVisible = false
            this.$parent.dialogVisibleRules = false
            this.$parent.queryTableDatas()
          } else {
            that.$message.error(res.message)
          }
        }).finally(() => {
          // that.$parent.dialogVisible = false
        })
      } else {
        HttpModule.addData(param).then(res => {
          if (res.code === '000000') {
            that.$message.success('新增成功')
            this.formItemsConfigMessage.splice(1, this.paymentLen)
            this.paymentLen = 0
            let form = this.$refs.messageForm
            form.clearValidate()
            this.resetFormDataListMessage()
            this.formItemsConfigMessage.forEach(item => {
              item.itemRender.props.disabled = false
            })
            that.$parent.dialogVisible = false
            this.$parent.dialogVisibleRules = false
            this.$parent.queryTableDatas()
          } else {
            that.$message.error(res.message)
          }
        }).finally(() => {
          // that.$parent.dialogVisible = false
        })
      }
    },
    // 选择业务系统
    changeSysCode(val) {
      console.log(val)
      this.SysparentId = val
      // this.businessModuleCode = ''
      let busName = this.businessSystemCodeoptions.find(item => {
        return item.id === val
      })
      this.businessSystemName = busName.businessName
      this.getModLists()
    },
    // 选择业务模块
    changeModCode(val) {
      this.ModparentId = val
      this.businessFunctionCodeModal = ''
      let busName = this.businessModuleCodeoptions.find(item => {
        return item.id === val
      })
      this.businessModuleName = busName.businessName
      // this.getFunLists()
    },
    changeFunCode(val) {
      console.log(val)
      this.businessFunctionCode = val
      this.businessFunctionName = this.businessFunctionCodeoptions
        ?.filter(item => {
          return this.businessFunctionCode.includes(item.guid)
        })
        ?.map(item => item.name)
      // let busName = this.businessFunctionCodeoptions.find(item => {
      //   return item.id === val
      // })
      // this.businessFunctionName = busName.businessName
      // let busName = []
      // for (let i = 0; i < val.length; i++) {
      //   busName.push(this.businessFunctionCodeoptions.find(item => {
      //     return item.id === val[i]
      //   }))
      // }
      // for (let i = 0; i < busName.length; i++) {
      //   this.businessFunctionName.push(busName[i].businessName)
      // }
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
    // 业务菜单下拉树
    getFunLists() {
      const param = {
        businessType: 3,
        parentId: this.ModparentId
      }
      this.addLoading = true
      HttpModule.getbusLists(param).then(res => {
        this.addLoading = false
        this.businessFunctionCodeoptions = res.data.results
      })
    },
    // 主管部门下拉树
    getDepLists() {
      const param = {
        businessType: 4,
        parentId: 0
      }
      this.addLoading = true
      HttpModule.getbusLists(param).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.departmentCodeoptions = res.data.results
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
        if (item.children.length > 0) {
          that.getRegulationChildrenData(item.children)
          item.leaf = false
        } else {
          item.leaf = true
        }
      })

      return datas
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
    // businessSystemCode(val) {
    //   console.log(val)
    //   this.SysparentId = val
    //   this.businessModuleCode = ''
    //   let busName = this.businessSystemCodeoptions.find(item => {
    //     return item.id === val
    //   })
    //   this.businessSystemName = busName.businessName
    //   const param = {
    //     businessType: 2,
    //     parentId: this.SysparentId
    //   }
    //   console.log(param)
    //   this.addLoading = true
    //   HttpModule.getbusLists(param).then(res => {
    //     this.addLoading = false
    //     if (res.code === '000000') {
    //       this.businessModuleCodeoptions = res.data.results
    //     } else {
    //       this.$message.error(res.message)
    //     }
    //   })
    // }
  },
  mounted() {
  },
  created() {
    this.getWhereTree()
    if (this.$parent.dialogTitle === '新增') {
      this.getBusinessModelCodeDatas({ businessType: '1', parentId: 0 })
      this.getTableData()
      // 直达资金新增规则
      this.$parent.dialogVisibleRules && (this.regulationClass = '09-直达资金')
    } else if (this.$parent.dialogTitle === '查看详情') {
      this.warnType = this.$parent.DetailData.warnType
      this.uploadFile = this.$parent.DetailData.uploadFile

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
      this.warnLocation = this.$parent.DetailData.warnLocation
      this.policiesDescription = this.$parent.DetailData.warningTips
      // 不可编辑
      // this.buttonConfig = {}
      this.disabled = true
      this.editConfig = false
    } else if (this.$parent.dialogTitle === '修改') {
      this.warnType = this.$parent.DetailData.warnType
      this.uploadFile = this.$parent.DetailData.uploadFile

      this.ruleFlag = this.$parent.DetailData.ruleFlag
      this.warnLocation = this.$parent.DetailData.warnLocation
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
        if (this.formDatas.payment !== '') {
          this.formDatas.payment__multiple = this.formDatas.payment.split(',')
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
    this.regulationType = this.$store.state.curNavModule.f_FullName.substring(0, 3)
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
          justify-Content: end;
    }
  }
</style>
