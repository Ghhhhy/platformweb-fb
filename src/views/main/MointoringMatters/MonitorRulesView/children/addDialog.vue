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
                  <template v-if="isSx">
                    <el-main id="nameId" width="100%">
                      <el-row>
                        <div class="showMore">{{ crTemplate }}</div>
                        <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;引用模板</div>
                        <el-input
                          v-model="crTemplate"
                          :disabled="true"
                          placeholder="请输入模板名称"
                          style="width:45%"
                        />
                      </el-row>
                    </el-main>
                  </template>
                  <template v-else>
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
                  </template>
                </el-container>
              </el-col>
              <el-col :span="8">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;业务系统</div>
                      <el-select
                        v-model="businessSystemName"
                        :disabled="disabled"
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
                        v-model="businessModuleName"
                        :disabled="disabled"
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
                  <!-- <template v-if="!isSx"> -->
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font v-show="triggerClass === 1" color="red">*</font>&nbsp;业务菜单</div>
                      <BsTree
                        :key="refleshKey"
                        v-model="businessFunctionCodeModal"
                        :is-drop-select-tree="true"
                        :editable="true"
                        :tree-data="businessFunctionTreeData"
                        :default-checked-keys="businessFunctionCode"
                        v-bind="{ config: { ...businessFunctionTreeConfig, disabled: disabledUpdate } }"
                        class="businessFunctionTree"
                        style="display: inline-block;"
                      />
                    </el-row>
                  </el-main>
                  <!-- </template> -->
                  <!-- <template v-else>
                    <el-main id="nameId" width="100%">
                      <el-row>
                        <div v-if="businessFunctionCode" class="showMore">
                          {{ businessNameTips }}
                        </div>
                        <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;业务菜单</div>
                        <el-select
                          v-model="businessFunctionCode"
                          multiple="true"
                          :disabled="disabledBusinessFunction"
                          placeholder="请选择业务菜单"
                          style="width:45%"
                          @change="changeFunCode"
                        >
                          <el-option
                            v-for="item in businessFunctionCodeoptions"
                            :key="item.id"
                            :label="item.businessName"
                            :value="item.id"
                          />
                        </el-select>
                      </el-row>
                    </el-main>
                  </template> -->
                </el-container>
              </el-col>
              <el-col :span="8">
                <el-container>
                  <template v-if="!isSx">
                    <el-main width="100%">
                      <el-row>
                        <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;监控规则名称</div>
                        <el-tooltip class="item" effect="dark" :content="monitorRuleName" placement="top-start">
                          <el-input
                            v-model="monitorRuleName"
                            :disabled="disabled"
                            placeholder="请输入监控规则名称"
                            style="width:45%"
                          />
                        </el-tooltip>
                      </el-row>
                    </el-main>
                  </template>
                  <template v-else>
                    <el-main id="nameId" width="100%">
                      <el-row>
                        <div class="showMore">{{ monitorRuleName }}</div>
                        <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;监控规则名称</div>
                        <el-tooltip class="item" effect="dark" :content="monitorRuleName" placement="top-start">
                          <el-input
                            v-model="monitorRuleName"
                            :disabled="disabled"
                            placeholder="请输入监控规则名称"
                            style="width:45%"
                          />
                        </el-tooltip>
                      </el-row>
                    </el-main>
                  </template>

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
              <el-col v-if="sx" :span="8">
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
                      <template v-if="!isSx">
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
                      </template>
                      <template v-else>
                        <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;函数逻辑关系</div>
                        <el-select
                          v-model="ruleFlag"
                          :disabled="true"
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
                      </template>
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
              <el-col :span="8">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <!-- <template v-if="!isSx"> -->
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
                      <!-- </template> -->
                      <!-- <template v-else>
                        <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;提醒位置</div>
                        <el-select
                          v-model="warnLocation"
                          :disabled="true"
                          placeholder="请选择提醒位置"
                          style="width:45%"
                          @change="chooseWarnLocation"
                        >
                          <el-option
                            v-for="item in warnLocationOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </template> -->

                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
              <el-col v-show="isSx && isShowRuletype" :span="8">
                <el-container>
                  <el-main width="100%">
                    <el-row>
                      <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;三公规则分类</div>
                      <div style="width:45%;float:left;margin-top:2px">
                        <BsTreeInput
                          ref="ruleTree"
                          v-model="ruletype"
                          :disabled="disabled"
                          :datas="ruletypeoptions"
                          :reloaddata="false"
                          :isleaf="true"
                        />
                      </div>
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
                        :maxlength="200"
                        :rows="2"
                        placeholder="请使用英文逗号“,”隔开进行填写，例如：楼阁修建,高尔夫球场,名画；"
                        style=" width:90%"
                      />
                    </el-row>
                  </el-main>
                </el-container>
              </el-col>
            </el-row>
            <template v-if="isSx">
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
            </template>
          </div>
        </div>
        <div style="margin-bottom: 10px; color: red">
          <p>注意：</p>
          <p>1.【主管部门】和【业务处室】默认全部，不进行处室过滤，只有少数规则需要根据处室过滤权限时才使用此字段 ！</p>
          <!--<p>2.预警级别与处理方式对应关系统一为：一级黄色预警（预警，无需上传附件）、二级橙色预警（预警，需上传附件）、三级红色预警（拦截）、非人工干预蓝色预警（记录）</p>-->
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
            @cellClick="cellClick"
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
import { proconf } from '../MonitorRulesView.js'
import HttpModule from '@/api/frame/main/Monitoring/levelRules.js'
import queryTreedElementByCodeMixin from '@/mixin/queryTreedElementByCode.js'
import functionSelectMixin from '@/mixin/functionSelectMixin.js'

export default {
  name: 'AddDialog',
  mixins: [queryTreedElementByCodeMixin, functionSelectMixin],
  components: {},
  computed: {
    mountTableColumnsConfig() {
      if (this.$store.getters.isFuJian) {
        const fieldList = ['functionParameter', 'paramType', 'param']// 福建去掉这3个字段
        const addedColumn = [{ // 新增一个列
          title: '参数值描述',
          sortable: false,
          field: 'description',
          align: 'left',
          formula: '',
          name: '$vxeInput',
          editRender: {
            name: '$vxeInput',
            options: [],
            props: {
              placeholder: '参数值描述'
            }
          }
        }]
        return proconf.mountTableColumnsConfig.filter(item => !fieldList.includes(item.field)).concat(addedColumn)
      }
      return proconf.mountTableColumnsConfig
    },
    curNavModule() {
      return this.$store.state.curNavModule
    },
    businessNameTips() {
      const current = this.businessFunctionCodeoptions
        ?.filter(item => this.businessFunctionCode?.includes(item.id))
        ?.map(item => item.businessName)
        ?.join(',')
      const noMatched = Array.isArray(this.businessFunctionCode) ? this.businessFunctionCode.join(',') : this.businessFunctionCode
      return current || noMatched
    },
    isSx() { // 判断是不是陕西项目
      return this.$store.getters.isSx
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
      refleshKey: Date.now(),
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
      rightTreeValue: [],
      configIn: {
        disabled: true
      },
      treeData: [],
      editConfig: {
        trigger: 'dblclick',
        mode: 'cell'
      },
      disabled: false,
      disabledBusinessFunction: false,
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
      mountTableData: [],
      // BsQuery 查询栏
      queryConfig: proconf.sethighQueryConfig,
      searchDataList: proconf.sethighQueryData,
      // table 配置
      tableConfig: {
        renderers: {
          // 编辑 附件 操作日志
          $payVoucherInputGloableOptionRow: proconf.gloableOptionRowMonitorRulesView
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
      isEnable: 0,
      isEnableoptions: [
        { value: 0, label: '否' },
        { value: 1, label: '是' }
      ],
      policiesName: '',
      policiesDescription: '',
      fiRuleDesc: '',
      implDesc: '',
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
      defaultCheckedKeys: [],
      ruleDisabled: false,
      formItemsConfigMessage: proconf.formItemsConfigMessage,
      paymentLen: 0,
      paymentData: [],
      formDatas: {
        payment: '',
        useDes: '',
        payeeAcctNo: '',
        payeeAcctName: '',
        des: '',
        basis: ''
      },
      formValidationConfigMessage: proconf.formValidationConfigMessage,
      regulationClassName: '',
      showDialogView: false,
      isShowRuletype: false,
      ruletypeoptions: [],
      ruletype: '',
      ruleType: '',
      sx: this.$store.getters.isSx,
      functionParameter: ''
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
    },
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
      let axiosConfig = {
        method: 'post',
        url: 'large-monitor-platform/lmp/elementQuery/elementtree',
        successCode: '000000', // 成功code
        statusField: 'code'
      }
      if (this.isSx) {
        axiosConfig = {
          method: 'get',
          url:
            'mp-b-basedata-service/v2/basedata/page'
        }
      }
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
              axiosConfig: axiosConfig
            },
            queryparams: {
              elementCode: 'pro',
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
      let axiosConfig = {
        method: 'post',
        // url: `mp-b-basedata-service/v2/elevalueset/view/jstreedata/${obj.urlC}`
        url: 'large-monitor-platform/lmp/elementQuery/elementtree',
        successCode: '000000', // 成功code
        statusField: 'code'
      }
      let treeConfig = {
        nodeKey: 'id',
        label: '{name}',
        labelFormat: '{code}-{name}',
        children: 'children' // 子级字段名
      }
      if (this.isSx) {
        axiosConfig = {
          method: 'get',
          url: `mp-b-basedata-service/v2/elevalueset/view/jstreedata/${obj.urlC}`
        }
        treeConfig = {
          nodeKey: 'id',
          label: 'text',
          children: 'children' // 子级字段名
        }
      }
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
              treeProps: treeConfig,
              placeholder: `请选择${obj.label}`,
              disabled,
              multiple: true,
              isleaf: false,
              axiosConfig: axiosConfig
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
        item.code = item.id
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
    // 获取生效范围
    getWhereTree() {
      this.defaultCheckedKeys = []
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
      let regulationType = this.regulationType
      if (regulationType === '部门级') {
        param.elementCode = 'DEPARTMENT'
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
              disabled: true,
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
          this.$parent.DetailData.regulationScope?.forEach(item => {
            let str = item.mofDivId.toString()
            tempArr.push(str)
          })
          this.$refs.rightTree.treeOptionFn().setCheckedKeys(tempArr)
          this.defaultCheckedKeys = tempArr
        } else {
          let tempArr = []
          tempArr.push('root')
          let arr = []
          this.scope = this.getArr(this.treeData, arr)
          if (regulationType === '部门级') {
            arr = []
            this.scope = this.getArr(this.treeData, arr)
          } else if (regulationType === '财政级') {
            arr = []
            this.scope = this.getArr1(this.treeData, arr)
            console.log(this.scope)
          }
          this.$nextTick(() => {
            let dataArr = []
            this.scope.forEach(item => {
              let str = ''
              if (regulationType !== '系统级') {
                str = item.agencyId.toString()
              } else {
                str = item.mofDivId.toString()
              }
              dataArr.push(str)
            })
            this.$refs.rightTree.treeOptionFn().setCheckedKeys(dataArr)
            this.defaultCheckedKeys = dataArr
          })
        }
      })
    },
    getArr(data, arr) {
      data.forEach(item => {
        if (item.isleaf) {
          let obj = {
            mofDivCode: '',
            agencyCode: '',
            mofDivId: item.id
          }
          obj.agencyId = item.code
          arr.push(obj)
        }
        if (item.children) {
          this.getArr(item.children, arr)
        }
      })
      return arr
    },
    getArr1(data, arr) {
      data.forEach(item => {
        if (item.isleaf) {
          let obj = {
            mofDivCode: '',
            agencyCode: '',
            mofDivId: item.id
          }
          obj.agencyId = item.code
          obj.agencyCode = item.name.split('-')[0]
          arr.push(obj)
        }
        if (item.children) {
          this.getArr1(item.children, arr)
        }
      })
      return arr
    },
    // 保存新增的计划信息
    doInsert() {
      // // 校验判断
      // let datas = this.$refs.monitorTableRef.getSelectionData()
      // if (datas.length !== 1) {
      //   this.$XModal.message({ status: 'warning', message: '请选择一条模板信息！' })
      //   return
      // }

      // if (!this.monitorRuleName) {
      //   this.$XModal.message({ status: 'warning', message: '请输入规则名称！' })
      //   return
      // }

      // if (!this.policiesDescription) {
      //   this.$XModal.message({ status: 'warning', message: '请选择预警提示！' })
      //   return
      // }
      // this.$refs.mountTableRef.validate().then((res) => {
      //   if (Object.keys(res).length > 0) {
      //     let errors = Object.values(res)
      //     for (let i = 0; i < errors.length; i++) {
      //       this.$message({ type: 'warning', message: errors[i][0].rule.message })
      //       return
      //     }
      //   }
      // })
      let that = this
      // let datas1 = this.$refs.mountTableRef.getPureTableData().fullData
      // // let regulationType = this.$store.state.curNavModule.f_FullName.substring(0, 3)
      // let regulationType = this.regulationType
      // if (regulationType === '系统级') {
      //   regulationType = '1'
      // } else if (regulationType === '部门级') {
      //   regulationType = '3'
      // } else if (regulationType === '财政级') {
      //   regulationType = '2'
      // }
      // let param = {
      //   'regulationName': that.monitorRuleName, // 规则名称
      //   'regulationType': regulationType, // 规则类型：1.系统级  2.财政级  3.部门级
      //   'warningLevel': that.warningLevel, // 预警级别
      //   'handleType': that.handleType, // 处理方式
      //   'regulationModelCode': that.regulationModelCode, // 模板编码
      //   'regulationModelName': that.crTemplate, // 模板名称
      //   'warningTips': that.policiesDescription, // 预警提示
      //   'regulationStatus': this.$parent.regulationStatus, // 规则状态：1.新增  2.送审  3.审核
      //   'isEnable': that.isEnable, // 是否启用：0.否  1.是
      //   'regulationConfig': datas1,
      //   'regulationScope': that.scope, // 规则生效范围{mofDivCode: '', angencyCode: ''}
      //   menuName: this.$store.state.curNavModule.name
      // }
      let classCode = ''
      if (that.regulationClass) {
        let valArr = that.regulationClass.split('-')
        classCode = valArr[0]
      }

      if (this.triggerClass === 1 && (this.businessFunctionName.length === 0 || this.businessFunctionName[0] === 'undefined')) {
        this.$XModal.message({ status: 'warning', message: '请选择触发菜单！' })
        return
      }
      if (this.$parent.dialogTitle === '修改') {
        const params = {
          'regulationScope': that.scope, // 规则生效范围{mofDivCode: '', angencyCode: ''}
          regulationCode: this.$parent.DetailData.regulationCode,
          regulationName: this.$parent.DetailData.regulationName,
          warningLevel: this.warningLevel,
          triggerClass: this.triggerClass,
          handleType: this.handleType,
          menuName: this.$store.state.curNavModule.name,
          regulationClass: classCode,
          'menuIdList': this.businessFunctionCode.toString(), // 多菜单
          'menuNameList': this.businessFunctionName.toString()
        }
        if (this.isSx) {
          HttpModule.updateDataView(params).then(res => {
            if (res.code === '000000') {
              that.$message.success('修改成功')
              console.log(this.paymentLen)
              this.formItemsConfigMessage.splice(1, this.paymentLen)
              this.paymentLen = 0
              let form = this.$refs.messageForm
              form.clearValidate()
              this.resetFormDataListMessage()
              that.$parent.dialogVisible = false
              this.$parent.queryTableDatas()
            } else {
              that.$message.error('操作失败')
            }
          }).finally(() => {
          // that.$parent.dialogVisible = false
          })
        } else {
          HttpModule.updateData(params).then(res => {
            if (res.code === '000000') {
              that.$message.success('修改成功')
              console.log(this.paymentLen)
              this.formItemsConfigMessage.splice(1, this.paymentLen)
              this.paymentLen = 0
              let form = this.$refs.messageForm
              form.clearValidate()
              this.resetFormDataListMessage()
              that.$parent.dialogVisible = false
              this.$parent.queryTableDatas()
            } else {
              that.$message.error('操作失败')
            }
          }).finally(() => {
          // that.$parent.dialogVisible = false
          })
        }
      } else {
        // HttpModule.addData(param).then(res => {
        //   if (res.code === '000000') {
        //     that.$message.success('新增成功')
        //     that.$parent.dialogVisible = false
        //     this.$parent.queryTableDatas()
        //   } else {
        //     that.$message.error('操作失败')
        //   }
        // }).finally(() => {
        //   // that.$parent.dialogVisible = false
        // })
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
      this.businessFunctionCodeModal = ''
      this.businessFunctionCode = []
      let busName = this.businessModuleCodeoptions.find(item => {
        return item.id === val
      })
      this.businessModuleName = busName.businessName
      if (this.isSx) {
        this.getFunLists()
      }
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
    },
    getRuletype() {
      const params = {
        'dictType': 'rule_type'
      }
      HttpModule.getRuletype(params).then(res => {
        if (res.code === '000000') {
          let treeResdata = this.getRuletypeChildrenData(res.data.results)
          this.ruletypeoptions = treeResdata
        } else {
          this.$message.error('下拉树加载失败')
        }
      })
    },
    getRuletypeChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        // item.code = item.code
        item.name = item.dictInfoName
        item.code = item.dictInfoCode
        item.label = item.dictInfoCode + '-' + item.dictInfoName
        if (item.children && item.children.length > 0) {
          that.getRegulationChildrenData(item.children)
          item.leaf = false
        } else {
          item.leaf = true
        }
      })

      return datas
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
    this.param5 = this.transJson(this.$store.state.curNavModule.param5)
    if (this.$parent.DetailData.regulationType === 1) {
      this.regulationType = '系统级'
    } else if (this.$parent.DetailData.regulationType === 2) {
      this.regulationType = '财政级'
    } else if (this.$parent.DetailData.regulationType === 3) {
      this.regulationType = '部门级'
    }
    this.getWhereTree()
    if (this.$parent.dialogTitle === '新增') {
      this.getBusinessModelCodeDatas({ businessType: '1', parentId: 0 })
      this.getTableData()
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
      this.handleType = this.$parent.DetailData.handleType
      this.regulationClass = this.$parent.DetailData.regulationClass + '-' + this.$parent.DetailData.regulationClassName
      if (this.$parent.DetailData.regulationClassName === '三公') {
        this.isShowRuletype = true
        this.ruletype = this.$parent.DetailData.ruleTypeCode + '##' + this.$parent.DetailData.ruleTypeCode + '##' + this.$parent.DetailData.ruleTypeName
      }
      this.operationTableData = [this.$parent.DetailData.ruleTemplate]
      this.triggerClass = this.$parent.DetailData?.triggerClass
      this.ruleFlag = this.$parent.DetailData.ruleFlag
      this.warnLocation = this.$parent.DetailData.warnLocation

      this.crTemplate = this.$parent.DetailData.ruleTemplate.ruleTemplateName
      this.businessSystemCode = parseInt(this.$parent.DetailData.businessSystemCode)
      this.SysparentId = this.businessSystemCode
      this.getModLists()
      this.businessModuleCode = parseInt(this.$parent.DetailData.businessModuleCode)
      this.ModparentId = this.businessModuleCode
      if (this.isSx) {
        this.getFunLists()
        this.businessFunctionCode = this.$parent.DetailData.menuIdList.split(',')
        this.businessFunctionName = this.$parent.DetailData.businessFunctionName
      }
      this.businessSystemName = this.$parent.DetailData.businessSystemName
      this.businessModuleName = this.$parent.DetailData.businessModuleName

      this.mountTableData = this.$parent.DetailData.regulationConfig

      this.policiesDescription = this.$parent.DetailData.warningTips
      this.fiRuleDesc = this.$parent.DetailData.fiRuleDesc
      this.implDesc = this.$parent.DetailData.implDesc
      this.isEnable = this.$parent.DetailData.isEnable
      // 不可编辑
      this.buttonConfig = {}
      this.disabled = true
      this.disabledBusinessFunction = true
      this.disabledUpdate = true
      this.editConfig = false
    } else if (this.$parent.dialogTitle === '修改') {
      this.warnType = this.$parent.DetailData.warnType
      this.uploadFile = this.$parent.DetailData.uploadFile

      this.ruleSetShow = false
      this.ruleDesShow = true
      this.appSetShow = false
      this.effectiveShow = false
      this.activeIndex = 1
      this.monitorRuleName = this.$parent.DetailData.regulationName
      this.warningLevel = this.$parent.DetailData.warningLevel
      this.handleType = this.$parent.DetailData.handleType
      this.triggerClass = this.$parent.DetailData.triggerClass
      this.regulationClass = this.$parent.DetailData.regulationClass + '-' + this.$parent.DetailData.regulationClassName
      if (this.$parent.DetailData.regulationClassName === '三公') {
        this.isShowRuletype = true
        this.ruletype = this.$parent.DetailData.ruleTypeCode + '##' + this.$parent.DetailData.ruleTypeCode + '##' + this.$parent.DetailData.ruleTypeName
      }
      this.operationTableData = [this.$parent.DetailData.ruleTemplate]
      this.crTemplate = this.$parent.DetailData.ruleTemplate.ruleTemplateName
      this.businessSystemCode = parseInt(this.$parent.DetailData.businessSystemCode)
      this.SysparentId = this.businessSystemCode
      this.getModLists()
      this.businessModuleCode = parseInt(this.$parent.DetailData.businessModuleCode)
      this.ModparentId = this.businessModuleCode
      if (this.isSx) {
        this.getFunLists()
        this.businessFunctionCode = this.$parent.DetailData.menuIdList.split(',')
        this.businessFunctionName = this.$parent.DetailData.businessFunctionName
      }
      this.businessSystemName = this.$parent.DetailData.businessSystemName
      this.businessModuleName = this.$parent.DetailData.businessModuleName
      // this.businessFunctionName = this.$parent.DetailData.businessFunctionName
      this.mountTableData = this.$parent.DetailData.regulationConfig
      this.ruleFlag = this.$parent.DetailData.ruleFlag
      this.warnLocation = this.$parent.DetailData.warnLocation

      this.policiesDescription = this.$parent.DetailData.warningTips
      this.fiRuleDesc = this.$parent.DetailData.fiRuleDesc
      this.implDesc = this.$parent.DetailData.implDesc
      this.isEnable = this.$parent.DetailData.isEnable
      this.scope = this.$parent.DetailData.regulationScope
      // 不可编辑
      this.buttonConfig = {}
      this.disabled = true
      this.editConfig = false
    }
    if (this.$parent.formDatas) {
      this.formDatas = this.$parent.formDatas
      if (this.formDatas.payment) {
        this.formDatas.payment__multiple = this.formDatas.payment.split(',').filter(item => item)
        if (this.isSx) {
          this.formDatas.payment__multiple = this.formDatas.payment.split(',')
        }
        this.paymentLen = this.formDatas.payment__multiple.length
        this.formDatas.payment__multiple.forEach((item, index) => {
          let datas = {}
          if (item === '1') {
            datas = this.$parent.dialogTitle !== '新增' ? this.createPro(this.formItemsConfigMessage[0].itemRender.options[item], true) : this.createPro(this.formItemsConfigMessage[0].itemRender.options[item], false)
          } else {
            datas = this.$parent.dialogTitle !== '新增' ? this.createObj(this.formItemsConfigMessage[0].itemRender.options[item], true) : this.createObj(this.formItemsConfigMessage[0].itemRender.options[item], false)
          }
          this.formItemsConfigMessage.splice(1 + index, 0, datas)
          // if (this.$parent.dialogTitle === '查看详情') {
          //   this.formItemsConfigMessage.forEach(item => {
          //     item.itemRender.props.disabled = true
          //   })
          // } else {
          //   this.formItemsConfigMessage.forEach(item => {
          //     item.itemRender.props.disabled = false
          //   })
          // }
          // this.formDatas.agency_code = '000,000001,000002'
          // this.formDatas.agency_name = '预算处预留,预算处预留,test单位新增'
          this.formDatas.agency_code = this.formDatas.agencyCode
          this.formDatas.agency_name = this.formDatas.agencyName
          this.formDatas.pro_code = this.formDatas.proCode
          this.formDatas.pro_name = this.formDatas.proName
          this.formDatas.exp_func_code = this.formDatas.excFunCode
          this.formDatas.exp_func_name = this.formDatas.excFunName
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
    if (this.$parent.dialogTitle === '查看详情' || this.$parent.dialogTitle === '修改') {
      this.formItemsConfigMessage.forEach(item => {
        item.itemRender.props.disabled = true
      })
    }
    this.getSysLists()
    this.getRegulation()
    if (this.isSx) {
      this.getRuletype()
    }
    // this.regulationType = this.$store.state.curNavModule.f_FullName.substring(0, 3)
  }
}
</script>
<style lang="scss">
  .el-main {
    overflow: visible;
  }
  .showMore {
    min-width: 293px;
    height: 40px;
    line-height:40px;
    background: #000 !important;
    color: #fff;
    text-align:center;
    border-radius:5px;
    font-size:12px;
    position:absolute;
    top:-40px;
    z-index:1000;
    display:none;
    white-space:nowrap;
  }
  #nameId:hover .showMore{
    display: block;
  }
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
