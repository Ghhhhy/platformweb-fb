<!--单位用款申请(按计划)录入新增页面弹框-->
<template>
  <vxe-modal
    v-model="dialogVisibleShow"
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
            height="480px"
            :loading="tableLoading"
            :footer-config="{ showFooter: false }"
            :table-columns-config="monitorTableColumnsConfig"
            :table-data="operationTableData"
            :table-config="tableConfig"
            :toolbar-config="tableToolbarConfig"
            :pager-config="false"
          >
            <!--<template v-slot:toolbarSlots>-->
            <!--  <div class="table-toolbar-left">-->
            <!--    <div v-if="leftTreeVisible === false" class="table-toolbar-contro-leftvisible" @click="leftTreeVisible = true"></div>-->
            <!--  </div>-->
            <!--</template>-->
          </bsTable>
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
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;触发系统</div>
                      <el-select
                        v-model="businessSystemName"
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
                        v-model="businessModuleName"
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
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;触发菜单</div>
                      <el-tooltip class="item" effect="dark" :content="showSplitName(businessFunctionName)" placement="top-start">
                        <el-select
                          v-model="businessFunctionName"
                          :disabled="disabled"
                          placeholder="请选择触发菜单"
                          style="width:45%"
                        >
                          <el-option
                            v-for="item in businessFunctionCodeoptions"
                            :key="item.id"
                            :label="item.businessName"
                            :value="item.id"
                          />
                        </el-select>
                      </el-tooltip>
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
                        :disabled="disabledUpdate"
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
                        :disabled="disabled"
                        placeholder="请选择处理方式"
                        style="width:45%"
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
                        :disabled="disabledUpdate"
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
                        placeholder="请使用英文逗号“,”隔开进行填写，例如：楼阁修建,高尔夫球场,名画；"
                        style=" width:90%"
                      />
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
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;规则描述</div>
                      <el-input
                        v-model="fiRuleDesc"
                        type="textarea"
                        :disabled="disabled"
                        :rows="2"
                        placeholder="请填写规则描述"
                        style=" width:90%"
                      />
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
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;规则依据</div>
                      <el-input
                        v-model="implDesc"
                        type="textarea"
                        :disabled="disabled"
                        :rows="2"
                        placeholder="请填写规则依据"
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
          <p>2.预警级别与处理方式对应关系统一为：黄色预警--预警（无需上传附件） 橙色预警--预警（需上传附件） 红色预警--拦截 蓝色预警--记录 灰色预警-禁止</p>
          <p>3.触发类型中“实时触发”指的是事中监控，“定时触发”指的是事后监控，定时触发需要设置触发时间和频率才能生效，比如：每月1次，定时触发的监控规则【处理方式】必须选择“记录”。</p>
        </div>
        <div class="header-table">
          <BsTable
            ref="mountTableRef"
            height="300px"
            :footer-config="{ showFooter: false }"
            :edit-config="editConfig"
            :edit-rules="editRulesIn"
            :table-columns-config="mountTableColumnsConfig"
            :table-data="mountTableData"
            :toolbar-config="false"
            :pager-config="false"
            @cellClick="cellClick"
          />
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
                  :disabled="true"
                  placeholder="请输入管理级次"
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
                <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;是否启用</div>
                <el-select
                  v-model="isEnable"
                  placeholder="是否启用"
                  :disabled="disabled"
                  style="width:45%"
                >
                  <el-option
                    v-for="item in isEnableoptions"
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
      <div v-show="!disabledUpdate" slot="footer" style="width:100%;height: 80px;margin:0 15px">
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
    <BsDialog
      :visible.sync="showDialogView"
      :show-header="true"
      :show-footer="false"
      :show-close="true"
      :close-destory="true"
      title="函数参数"
      width="60%"
    >
      <div slot="context" v-loading="false">
        {{ functionParameter }}
      </div>
    </BsDialog>
  </vxe-modal>
</template>
<script>
import { proconf } from '../../MonitorRulesView/MonitorRulesView.js'
import HttpModule from '@/api/frame/main/Monitoring/levelRules.js'
export default {
  name: 'AddDialog',
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
      rightTreeValue: [],
      configIn: {
        disabled: true
      },
      functionParameter: '',
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
        buttons: [
          { code: 'sure', name: '确定', status: 'primary', callback: this.sureButton },
          { code: 'cancel', name: '取消', status: '', callback: this.cancelButton }
        ]
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
      warningLeveloptions: [
        { value: 1, label: '黄色预警' },
        { value: 2, label: '橙色预警' },
        { value: 3, label: '红色预警' },
        { value: 4, label: '灰色预警' },
        { value: 5, label: '蓝色预警' }
      ],
      handleType: 1,
      handleTypeoptions: [
        { value: 1, label: '预警' },
        { value: 2, label: '拦截' },
        { value: 3, label: '冻结' },
        { value: 4, label: '禁止' },
        { value: 5, label: '记录' }
      ],
      isEnable: 0,
      isEnableoptions: [
        { value: 0, label: '否' },
        { value: 1, label: '是' }
      ],
      policiesName: '',
      policiesDescription: '',
      dialogVisibleShow: true,
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
      businessFunctionCode: '',
      businessFunctionName: '',
      businessFunctionCodeoptions: [],
      SysparentId: 0,
      ModparentId: 0,
      regulationClass: '',
      regulationClassoptions: [],
      triggerClass: 1,
      triggerClassoptions: [
        { value: 1, label: '事中触发' },
        { value: 2, label: '定时触发' }
      ],
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        import: false, // 导入
        export: true, // 导出
        print: false, // 打印
        zoom: true, // 缩放
        custom: true, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      disabledUpdate: false,
      defaultCheckedKeys: ['610000000'],
      ruleDisabled: false,
      formItemsConfigMessage: proconf.formItemsConfigMessage,
      paymentLen: 0,
      paymentData: [],
      formDatas: {
        useDes: '',
        payeeAcctNo: '',
        payeeAcctName: ''
      },
      formValidationConfigMessage: proconf.formValidationConfigMessage,
      fiRuleDesc: '',
      implDesc: '',
      showDialogView: false
    }
  },
  methods: {
    // 表格单元行单击
    cellClick(obj, context, e) {
      // console.log('参数', ...arguments)
      let key = obj.column.property
      console.log(key, obj.row)
      switch (key) {
        // 申请编号
        case 'functionParameter':
          this.showParameter(obj.row)
          break
      }
    },
    showParameter(row) {
      this.functionParameter = row.functionParameter
      this.showDialogView = true
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
                method: 'get',
                url:
                  'mp-b-basedata-service/v2/basedata/page'
              }
            },
            queryparams: {
              elementcode: 'pro',
              condition: '',
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
                nodeKey: 'code',
                labelFormat: '{code}-{name}',
                children: 'children' // 子级字段名
              },
              placeholder: `请选择${obj.label}`,
              disabled,
              multiple: true,
              isleaf: false,
              axiosConfig: {
                method: 'get',
                url: `mp-b-basedata-service/v2/elevalueset/view/jstreedata/${obj.urlC}`,
                successCode: '100000', //  厦门BUG 成功code取值错误
                statusField: 'rscode'// 厦门BUG 成功code取值错误
              }
            },
            // value: '50101##工资奖金津补贴',
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
    sureButton() {
      let that = this
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
      let datas1 = this.$refs.mountTableRef.getSelectionData()
      console.log(datas1)
      HttpModule.getTemplateByCode({ ruleTemplateCode: datas[0].ruleTemplateCode }).then(res => {
        if (res.code === '000000') {
          res.data.functionInfoList.forEach(item => {
            let tempObj = {
              functionName: '',
              functionCode: '',
              relation: '1',
              paramType: '1',
              param: ''
            }
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

      let regulationType = this.regulationType
      if (regulationType === '系统级') {
        data.nodes.forEach(item => {
          if (item.isleaf) {
            let obj = {
              mofDivCode: '',
              agencyCode: ''
            }
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
            obj.agencyCode = item.code
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
            obj.mofDivCode = item.code
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
        item.label = item.text
        item.guid = item.id
        item.name = item.text
        item.disabled = true
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
    dialogClose() {
      console.log(this.paymentLen)
      this.formItemsConfigMessage.splice(1, this.paymentLen)
      this.paymentLen = 0
      let form = this.$refs.messageForm
      form.clearValidate()
      this.resetFormDataListMessage()
      this.$parent.dialogVisibleShow = false
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
      this.defaultCheckedKeys = []
      let result = this.dealwithStr(this.$store.state.userInfo.province)
      // this.$store.state.userInfo.orgCode
      let param = {
        wheresql: 'and code like \'' + result + '%\'',
        elementCode: 'admdiv',
        // elementCode: 'AGENCY',
        year: this.$store.state.userInfo.year,
        province: this.$store.state.userInfo.province
      }
      let regulationType = this.$store.state.curNavModule.f_FullName?.substring(0, 3)
      if (regulationType === '部门级') {
        param.elementCode = 'DEPARTMENT'
        param.wheresql = 'and code like \'' + this.$store.state.userInfo.orgcode + '%\''
      }
      if (regulationType === '财政级') {
        param.elementCode = 'AGENCY'
        param.wheresql = 'and province =' + this.$store.state.userInfo.province
      }
      HttpModule.getTreewhere(param).then(res => {
        if (regulationType === '部门级' || regulationType === '财政级') {
          // let treeResdata = this.getChildrenNewData1(res.data)
          const result = [
            {
              id: 'root',
              label: '全部',
              code: 'root',
              isleaf: '0',
              disabled: this.$parent.dialogTitle === '查看详情',
              name: '全部',
              children: this.$parent.dialogTitle === '查看详情' ? this.getChildrenNewData1(res.data) : this.getChildrenNewData(res.data)
            }
          ]
          this.treeData = result
        } else {
          this.treeData = this.$parent.dialogTitle === '查看详情' ? this.getChildrenNewData1(res.data) : this.getChildrenNewData(res.data)
        }
        if (this.$parent.dialogTitle !== '新增') {
          let tempArr = []
          // let regulationType = this.$store.state.curNavModule.f_FullName.substring(0, 3)
          this.$parent.DetailData.regulationScope?.forEach(item => {
            let str = item.mofDivId.toString()
            // if (regulationType === '部门级') {
            //   str = item.mofDivId.toString()
            // } else {
            //   str = item.mofDivId.toString()
            // }
            tempArr.push(str)
          })
          this.$refs.rightTree.treeOptionFn().setCheckedKeys(tempArr)
          this.defaultCheckedKeys = tempArr
          console.log('回显', this.defaultCheckedKeys, this.treeData)
        }
      })
    },
    // 保存新增的计划信息
    doInsert() {
      let that = this
      console.log('debugger')
      if (this.$parent.dialogTitle === '修改') {
        const params = {
          regulationCode: this.$parent.DetailData.regulationCode,
          warningLevel: this.warningLevel,
          triggerClass: this.triggerClass,
          handleType: this.handleType,
          menuName: this.$store.state.curNavModule.name
        }
        HttpModule.updateData(params).then(res => {
          if (res.code === '000000') {
            that.$message.success('修改成功')
            console.log(this.paymentLen)
            this.formItemsConfigMessage.splice(1, this.paymentLen)
            this.paymentLen = 0
            let form = this.$refs.messageForm
            form.clearValidate()
            this.resetFormDataListMessage()
            that.$parent.dialogVisibleShow = false
            this.$parent.queryTableDatas()
          } else {
            that.$message.error('操作失败')
          }
        }).finally(() => {
        })
      } else {
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
      console.log(val)
      this.ModparentId = val
      this.businessFunctionCode = ''
      let busName = this.businessModuleCodeoptions.find(item => {
        return item.id === val
      })
      this.businessModuleName = busName.businessName
      this.getFunLists()
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
    // 驼峰前面加下划线 在转小写
    camelToUnderscore(str) {
      return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
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
    },
    chooseTriggerClass(val) {
      if (val === 2) {
        this.warningLevel = 5
        this.handleType = 5
      }
      if (val === 1) {
        this.warningLevel = 1
        this.handleType = 1
      }
    },
    showSplitName(name) {
      if (name) {
        let nameArr = []
        let tempNameArr = name.split(',')
        tempNameArr.forEach(item => {
          nameArr.push(item.replace(/[^\u4e00-\u9fa5]/gi, ''))
        })
        return nameArr.join(',')
      }
    }
  },
  watch: {
  },
  mounted() {
  },
  created() {
    console.log(this.$parent.DetailData)
    console.log(this.$store.state.userInfo.orgCode)
    console.log(this.$parent.DetailData.regulationType)
    this.formItemsConfigMessage = [...proconf.formItemsConfigMessage]
    this.getWhereTree()
    if (this.$parent.DetailData.regulationType === 1) {
      this.regulationType = '系统级'
    } else if (this.$parent.DetailData.regulationType === 2) {
      this.regulationType = '财政级'
    } else if (this.$parent.DetailData.regulationType === 3) {
      this.regulationType = '部门级'
    }
    if (this.$parent.dialogTitle === '新增') {
      this.getBusinessModelCodeDatas({ businessType: '1', parentId: 0 })
      this.getTableData()
    } else if (this.$parent.dialogTitle === '查看详情') {
      this.ruleSetShow = false
      this.ruleDesShow = true
      this.appSetShow = false
      this.effectiveShow = false
      this.activeIndex = 1
      this.monitorRuleName = this.$parent.DetailData.regulationName
      this.warningLevel = this.$parent.DetailData.warningLevel
      this.handleType = this.$parent.DetailData.handleType
      this.regulationClass = this.$parent.DetailData.regulationClass + '-' + this.$parent.DetailData.regulationClassName
      this.operationTableData = [this.$parent.DetailData.ruleTemplate]

      this.crTemplate = this.$parent.DetailData.ruleTemplate.ruleTemplateName
      this.businessSystemCode = parseInt(this.$parent.DetailData.businessSystemCode)
      this.SysparentId = this.businessSystemCode
      this.getModLists()
      this.businessModuleCode = parseInt(this.$parent.DetailData.businessModuleCode)
      this.ModparentId = this.businessModuleCode
      this.getFunLists()
      this.businessFunctionCode = parseInt(this.$parent.DetailData.businessFunctionCode)
      this.businessSystemName = this.$parent.DetailData.businessSystemName
      this.businessModuleName = this.$parent.DetailData.businessModuleName
      this.businessFunctionName = this.$parent.DetailData.businessFunctionName
      this.mountTableData = this.$parent.DetailData.regulationConfig

      this.policiesDescription = this.$parent.DetailData.warningTips
      this.fiRuleDesc = this.$parent.DetailData.fiRuleDesc
      this.implDesc = this.$parent.DetailData.implDesc

      this.isEnable = this.$parent.DetailData.isEnable
      // 不可编辑
      this.buttonConfig = {}
      this.disabled = true
      this.disabledUpdate = true
      this.editConfig = false
    } else if (this.$parent.dialogTitle === '修改') {
      this.ruleSetShow = false
      this.ruleDesShow = true
      this.appSetShow = false
      this.effectiveShow = false
      this.activeIndex = 1
      this.monitorRuleName = this.$parent.DetailData.regulationName
      this.warningLevel = this.$parent.DetailData.warningLevel
      this.handleType = this.$parent.DetailData.handleType
      this.regulationClass = this.$parent.DetailData.regulationClass + '-' + this.$parent.DetailData.regulationClassName
      this.operationTableData = [this.$parent.DetailData.ruleTemplate]

      this.crTemplate = this.$parent.DetailData.ruleTemplate.ruleTemplateName
      this.businessSystemCode = parseInt(this.$parent.DetailData.businessSystemCode)
      this.SysparentId = this.businessSystemCode
      this.getModLists()
      this.businessModuleCode = parseInt(this.$parent.DetailData.businessModuleCode)
      this.ModparentId = this.businessModuleCode
      this.getFunLists()
      this.businessFunctionCode = parseInt(this.$parent.DetailData.businessFunctionCode)
      this.businessSystemName = this.$parent.DetailData.businessSystemName
      this.businessModuleName = this.$parent.DetailData.businessModuleName
      this.businessFunctionName = this.$parent.DetailData.businessFunctionName
      this.mountTableData = this.$parent.DetailData.regulationConfig

      this.scope = this.$parent.DetailData.regulationScope
      this.policiesDescription = this.$parent.DetailData.warningTips
      this.isEnable = this.$parent.DetailData.isEnable
      // 不可编辑
      this.buttonConfig = {}
      this.disabled = true
      this.editConfig = false
    }
    if (this.$parent.formDatas) {
      this.formDatas = this.$parent.formDatas
      if (this.formDatas.payment !== '') {
        this.formDatas.payment__multiple = this.formDatas.payment.split(',').filter(Boolean)// 去掉无效空字符串
        this.paymentLen = this.formDatas.payment__multiple.length
        let findpayMentIndex = this.formItemsConfigMessage.findIndex(item => item.field === 'payment')// 精准寻找
        this.formDatas.payment__multiple.forEach((item, index) => {
          let datas = {}
          if (item === '1') {
            datas = this.$parent.dialogTitle !== '新增' ? this.createPro(this.formItemsConfigMessage[findpayMentIndex].itemRender.options[item], true) : this.createPro(this.formItemsConfigMessage[findpayMentIndex].itemRender.options[item], false)
          } else {
            datas = this.$parent.dialogTitle !== '新增' ? this.createObj(this.formItemsConfigMessage[findpayMentIndex].itemRender.options[item], true) : this.createObj(this.formItemsConfigMessage[findpayMentIndex].itemRender.options[item], false)
            // 获取当前option的field
            const field = this.formItemsConfigMessage[findpayMentIndex].itemRender.options[item].name
            // 因为后端返回的是depBgtEcoCode 老架构写的是下划线形式 且取值是dep_bgt_eco 这种
            const codeAndNameList = Object.keys(this.formDatas).filter(key => {
              return this.camelToUnderscore(key).indexOf(field) > -1
            }).map(key => this.formDatas[key]).filter(Boolean)
            // 把类似  depBgtEcoCode+depBgtEcoName 组装成  code##name  的形式  用于BsTree回显
            let joinList = codeAndNameList.map(item => item.split(',').filter(Boolean))
            let reflowShowString = ''
            if (joinList && joinList.length === 2) {
              reflowShowString = joinList.reduce((pre, cur) => {
                return pre.map((item, index) => `${item}##${cur[index]}`)
              }).join(',')
            }
            datas.itemRender.props.value = reflowShowString
          }
          this.formItemsConfigMessage.splice(1 + index, 0, datas)
        })

        this.formDatas.agency_code = this.formDatas.agencyCode
        this.formDatas.agency_name = this.formDatas.agencyName
        this.formDatas.pro_code = this.formDatas.proCode
        this.formDatas.pro_name = this.formDatas.proName
        // this.formDatas.exp_func_code = this.formDatas.excFunCode
        // this.formDatas.exp_func_name = this.formDatas.excFunName
        // this.formDatas.dep_bgt_eco_code = this.formDatas.depBgtEcoCode
        // this.formDatas.dep_bgt_eco_name = this.formDatas.depBgtEcoName
        // this.formDatas.gov_bgt_eco_code = this.formDatas.govBgtEcoCode
        // this.formDatas.gov_bgt_eco_name = this.formDatas.govBgtEcoName
        // this.formDatas.cor_bgt_doc_no_code = this.formDatas.corBgtDocNoCode
        // this.formDatas.cor_bgt_doc_no_name = this.formDatas.corBgtDocNoName
        console.log('this.formDatas', this.formDatas)
      }
    }
    if (this.$parent.dialogTitle === '查看详情' || this.$parent.dialogTitle === '修改') {
      this.formItemsConfigMessage.forEach(item => {
        item.itemRender.props.disabled = true
      })
    }
    this.getSysLists()
    this.getRegulation()
    // this.regulationType = this.$store.state.curNavModule.f_FullName.substring(0, 3)
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
