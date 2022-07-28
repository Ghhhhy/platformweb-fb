<template>
  <el-card class="query-card" shadow="never" body-style="{padding:0}">
    <div slot="header" class="clearfix">
      <!-- 插槽-左侧toggle按钮 -->
      <slot name="cardLeftSlots"></slot>
      <!-- 标题 -->
      <div class="left-tilte-viewcontro">
        <div
          v-if="leftVisible === false"
          class="left-tilte-viewcontro-leftvisible"
          @click="() => { leftVisible = true }"
        ></div>
        <div class="left-tilte-viewcontro-title">
          <span class="fn-inline">{{ (modifyStatus === 'update' ? (currentNode ? currentNode.name : '') : '') + '填报表设计' }}</span>
          <i class="fn-inline"></i>
        </div>
      </div>
      <!-- 按钮组 -->
      <div>
        <!-- <vxe-button
          v-if="!saveVisible"
          round
          size="mini"
          icon="vxe-icon--refresh"
          status="primary"
          @click="doRefreshConfig"
        >刷新配置</vxe-button>
        -->
        <vxe-button
          v-if="!saveVisible"
          round
          size="mini"
          icon="el-icon-plus"
          status="primary"
          @click="doInsert"
        >新增</vxe-button>
        <vxe-button v-if="!saveVisible" round size="mini" icon="el-icon-copy-document" @click="doCopy">复制</vxe-button>
        <vxe-button v-if="!saveVisible" round size="mini" icon="el-icon-edit-outline" @click="doUpdate">修改</vxe-button>
        <vxe-button v-if="!saveVisible" round size="mini" icon="el-icon-delete" @click="delTableDesignConfig">删除</vxe-button>
        <vxe-button v-if="!saveVisible" round size="mini" icon="el-icon-upload2" @click="doImport">导入</vxe-button>
        <vxe-button v-if="!saveVisible" round size="mini" icon="el-icon-view" @click="overview">预览</vxe-button>
        <vxe-button v-if="!saveVisible" round size="mini" icon="el-icon-place" @click="delCache">清除配置缓存</vxe-button>
        <vxe-button
          v-if="saveVisible"
          round
          size="mini"
          icon="el-icon-check"
          status="primary"
          @click="doSave"
        >保存</vxe-button>
        <vxe-button
          v-if="saveVisible && (modifyStatus === 'import' || modifyStatus === 'update')"
          round
          size="mini"
          icon="vxe-icon--upload"
          @click="performImport"
        >导入数据</vxe-button>
        <vxe-button v-if="saveVisible" round size="mini" icon="el-icon-close" @click="doCancel">取消</vxe-button>
        <vxe-button v-if="saveVisible" round size="mini" icon="el-icon-setting" @click="advanceAttr('1')">高级属性</vxe-button>
        <!-- <vxe-button round size="mini" icon="el-icon-finished">批量修改</vxe-button> -->
      </div>
    </div>
    <!-- 上下拖拽界面 -->
    <BsSplitPane
      :min-percent="0"
      split="horizontal"
      :default-percent="btmVisible ? curSplitPaneTopWidth : 100"
      @resize="onSplitPaneResize"
      @click="onSplitPaneClick"
    >
      <template slot="paneL">
        <!-- 基本信息表单 -->
        <!--  <div class="table-design-tip">
          完成每一项配置后情务必手动点击下刷新按钮来重新生成和过滤每一项配置!
        </div>
        -->
        <div ref="basicInfoEditConfig" class="paneL" style="height: 100%;overflow: auto;">
          <div class="btn-group">
            <div class="btn-left">
              <span class="label-title">{{ itemEditStatusConfig.editItemMap["basicInfoEditConfig"] }}</span>
            </div>
            <div class="btn-right">
              <vxe-button
                v-if="saveVisible"
                round
                size="mini"
                icon="vxe-icon--edit-outline"
                status="primary"
                @click="toggleEditStatus('basicInfoEditConfig')"
              >{{ itemEditStatusConfig.basicInfoEditConfig ? "退出编辑" : "编辑" }}</vxe-button>
            </div>
          </div>
          <BsForm
            ref="queryForm"
            :editable="itemEditStatusConfig.basicInfoEditConfig"
            :form-gloabal-config="formGloabalConfigIn"
            :form-items-config="queryFormItemConfigIn"
            :form-data-list="queryFormData"
            :form-validation-config="formValidationConfig"
            @itemChange="onFormItemChange"
          />
        </div>
      </template>
      <template slot="paneR">
        <!-- 按钮组 -->
        <div ref="tableDesignboxRef" class="paner-table-design-box">
          <div class="table-design-thead table-design-box-item">
            <div class="btn-group">
              <div class="btn-left">
                <span class="label-title">{{ itemEditStatusConfig.editItemMap["tableTheadEditConfig"] }}</span>
                <!--  <span>固定前</span>
                <vxe-select v-model="tableFixNum" size="mini" class="btn-select" @change="fixedCol">
                  <vxe-option v-for="num in 10" :key="num" :value="num" :label="`${num}`" />
                </vxe-select>
                <span>列</span>
                <vxe-button v-show="!saveVisible" round size="mini" icon="el-icon-edit" @click="viewConfig('colFormulaConfig')">查看列公式</vxe-button>
                 -->
              </div>
              <div class="btn-right">
                <vxe-button v-show="!saveVisible" round size="mini" icon="el-icon-setting" @click="viewConfig('advanceAttr')">查看高级属性</vxe-button>
                <vxe-button
                  v-show="saveVisible"
                  round
                  size="mini"
                  icon="vxe-icon--edit-outline"
                  status="primary"
                  @click="toggleEditStatus('tableTheadEditConfig')"
                >{{ itemEditStatusConfig.tableTheadEditConfig ? "退出编辑" : "编辑" }}</vxe-button>
                <vxe-button v-show="saveVisible && itemEditStatusConfig.curEditItem === 'tableTheadEditConfig'" round size="mini" icon="el-icon-circle-plus-outline" @click="insertRow">新增行</vxe-button>
                <vxe-button v-show="saveVisible && itemEditStatusConfig.curEditItem === 'tableTheadEditConfig' && childrenRowVisible" round size="mini" icon="el-icon-circle-plus" @click="insertChildRow">新增子行</vxe-button>
                <vxe-button v-show="saveVisible && itemEditStatusConfig.curEditItem === 'tableTheadEditConfig'" round size="mini" icon="el-icon-remove-outline" @click="delRow">删除行</vxe-button>
                <vxe-button v-show="saveVisible && itemEditStatusConfig.curEditItem === 'tableTheadEditConfig'" round size="mini" icon="el-icon-top" @click="moveRowUp">上移</vxe-button>
                <vxe-button v-show="saveVisible && itemEditStatusConfig.curEditItem === 'tableTheadEditConfig'" round size="mini" icon="el-icon-bottom" @click="moveRowDown">下移</vxe-button>
                <vxe-button v-show="saveVisible && itemEditStatusConfig.curEditItem === 'tableTheadEditConfig'" round size="mini" icon="el-icon-setting" @click="advanceAttr('2')">高级属性</vxe-button>
                <!-- <vxe-button v-show="saveVisible && itemEditStatusConfig.curEditItem === 'tableTheadEditConfig'" round size="mini" icon="el-icon-edit" @click="doConfigColFormula">设置列公式</vxe-button> -->
              </div>
            </div>
            <!-- 表格 -->
            <div :style="{ height: 50 + 32 * tableData.length + 'px',minHeight: '300px',maxHeight: tableHeightConfig.tableTheadEditConfig }">
              <BsTable
                id="tableTheadEditConfig"
                ref="bsTableRef"
                :edit-config="itemEditStatusConfig.tableTheadEditConfig"
                :edit-rules="tableEditRules"
                :table-config="tableConfig"
                :table-columns-config="tableCols"
                :default-money-unit="1"
                :table-data="tableData"
                :footer-config="{ showFooter: false }"
                :toolbar-config="false"
                :pager-config="false"
                :keyboard-config="tableKeyboardConfig"
                @cellClick="onTheadCellClick"
              />
            </div>

          </div>
          <div class="table-design-tbody table-design-box-item">
            <div class="btn-group">
              <div class="btn-left">
                <span class="label-title">{{ itemEditStatusConfig.editItemMap["tableTbodyEditConfig"] }}</span>
              </div>
              <div class="btn-right">
                <vxe-button
                  v-show="saveVisible"
                  round
                  size="mini"
                  icon="vxe-icon--edit-outline"
                  status="primary"
                  @click="toggleEditStatus('tableTbodyEditConfig')"
                >{{ itemEditStatusConfig.tableTbodyEditConfig ? "退出编辑" : "编辑" }}</vxe-button>
                <vxe-button v-show="saveVisible && itemEditStatusConfig.curEditItem === 'tableTbodyEditConfig'" round size="mini" icon="el-icon-circle-plus-outline" @click="insertTbodyRow('tableTbodyEditConfig')">新增行</vxe-button>
                <vxe-button v-show="saveVisible && itemEditStatusConfig.curEditItem === 'tableTbodyEditConfig'" round size="mini" icon="el-icon-remove-outline" @click="delTbodyRow('tableTbodyEditConfig')">删除行</vxe-button>
                <!--
                <vxe-button v-show="saveVisible && itemEditStatusConfig.curEditItem === 'tableTbodyEditConfig'" round size="mini" icon="el-icon-remove-outline" @click="configDynamicTbodyRow('tableTbodyEditConfig')">配置动态表体</vxe-button>
                -->

              </div>
            </div>
            <div :style="{ height: 32 * theadRenderLevels + 32 * tableTbodyData.length + 18 + 'px',minHeight: '300px',maxHeight: tableHeightConfig.tableTbodyEditConfig }">
              <BsTable
                id="tableTbodyEditConfig"
                ref="bsTableTbodyRef"
                :table-global-config="{ highlightCurrentRow: true,highlightCell: true,highlightCurrentColumn: true,rowDrop: true }"
                :edit-config="itemEditStatusConfig.tableTbodyEditConfig"
                :table-config="tableTbodyConfig"
                :high-config="{
                  scrollY: {
                    gt: 50,
                  },
                  scrollX: {
                    gt: -1,
                  },
                }"
                :default-money-unit="1"
                :show-zero="false"
                :edit-rules="tableTbodyEditRules"
                :table-columns-config="tableTbodyColumns"
                :table-data="tableTbodyData"
                :footer-config="{ showFooter: false }"
                :toolbar-config="false"
                :pager-config="false"
              />
            </div>
            <div class="table-design-getData table-design-box-item">
              <div class="btn-group">
                <div class="btn-left">
                  <span class="label-title">{{ itemEditStatusConfig.editItemMap["getDataConfigEditConfig"] }}</span>
                </div>
                <div class="btn-right">
                  <vxe-button
                    v-show="saveVisible"
                    round
                    size="mini"
                    icon="vxe-icon--edit-outline"
                    status="primary"
                    @click="toggleEditStatus('getDataConfigEditConfig')"
                  >{{ itemEditStatusConfig.getDataConfigEditConfig ? "退出编辑" : "编辑" }}</vxe-button>
                  <vxe-button v-show="saveVisible && itemEditStatusConfig.curEditItem === 'getDataConfigEditConfig'" round size="mini" icon="el-icon-circle-plus-outline" @click="doConfigGetData('getDataConfigEditConfig')">配置取数</vxe-button>
                  <vxe-button v-show="saveVisible && itemEditStatusConfig.curEditItem === 'getDataConfigEditConfig'" round size="mini" icon="el-icon-circle-plus-outline" @click="deleteCellConfig('getDataConfigEditConfig')">删除取数</vxe-button>

                </div>
              </div>
              <div class="table-design-box-getDataConfig" :style="{ height: 32 * theadRenderLevels + 32 * tableTbodyData.length + 18 + 'px',minHeight: '300px',maxHeight: tableHeightConfig.getDataConfigEditConfig }">
                <BsTable
                  id="getDataConfigEditConfig"
                  ref="getDataConfigTableRef"
                  :table-global-config="{ highlightCurrentRow: true,highlightCell: true,highlightCurrentColumn: true }"
                  :edit-config="itemEditStatusConfig.getDataConfigEditConfig"
                  :table-config="getDataConfigTableConfig"
                  :table-columns-config="getDataConfigColumns"
                  :default-money-unit="1"
                  :show-zero="false"
                  :table-data="getDataConfigBodyData"
                  :footer-config="{ showFooter: false }"
                  :toolbar-config="false"
                  :pager-config="false"
                  :high-config="{
                    scrollY: {
                      enabled: true,
                      gt: 50,
                    },
                    scrollX: {
                      enabled: false,
                    },
                  }"
                  @cellClick="(obj,context) => { onCellConfigTbodycellClick(obj,context,'getDataConfigEditConfig') }"
                  @editClosed="(obj,context) => { onCellConfigTbodyCellEditClosed(obj,context,'getDataConfigEditConfig') }"
                />
              </div>
            </div>
            <div class="table-design-getData table-design-box-item">
              <div class="btn-group">
                <div class="btn-left">
                  <span class="label-title">{{ itemEditStatusConfig.editItemMap["rowCodeFormulaConfigEditConfig"] }}</span>
                </div>
                <div class="btn-right">
                  <vxe-button
                    v-show="saveVisible"
                    round
                    size="mini"
                    icon="vxe-icon--edit-outline"
                    status="primary"
                    @click="toggleEditStatus('rowCodeFormulaConfigEditConfig')"
                  >{{ itemEditStatusConfig.rowCodeFormulaConfigEditConfig ? "退出编辑" : "编辑" }}</vxe-button>
                  <vxe-button v-show="saveVisible && itemEditStatusConfig.curEditItem === 'rowCodeFormulaConfigEditConfig'" round size="mini" icon="el-icon-circle-plus-outline" @click="doConfigCellFormula('rowCodeFormulaConfigEditConfig')">配置单元格计算</vxe-button>
                  <vxe-button v-show="saveVisible && itemEditStatusConfig.curEditItem === 'rowCodeFormulaConfigEditConfig'" round size="mini" icon="el-icon-circle-plus-outline" @click="deleteCellConfig('rowCodeFormulaConfigEditConfig')">删除单元格计算</vxe-button>
                </div>
              </div>
              <div :style="{ height: 32 * theadRenderLevels + 32 * tableTbodyData.length + 18 + 'px',minHeight: '300px',maxHeight: tableHeightConfig.rowCodeFormulaConfigEditConfig }">
                <BsTable
                  id="rowCodeFormulaConfigEditConfig"
                  ref="rowCodeFormulaConfigTableRef"
                  :table-global-config="{ highlightCurrentRow: true,highlightCell: true,highlightCurrentColumn: true }"
                  :edit-config="itemEditStatusConfig.rowCodeFormulaConfigEditConfig"
                  :table-config="rowCodeFormulaConfigTableConfig"
                  :table-columns-config="rowCodeFormulaConfigColumns"
                  :table-data="rowCodeFormulaConfigBodyData"
                  :default-money-unit="1"
                  :show-zero="false"
                  :footer-config="{ showFooter: false }"
                  :toolbar-config="false"
                  :high-config="{
                    scrollY: {
                      enabled: true,
                      gt: 50,
                    },
                    scrollX: {
                      enabled: false,
                    },
                  }"
                  :pager-config="false"
                  @cellClick="(obj,context) => { onCellConfigTbodycellClick(obj,context,'rowCodeFormulaConfigEditConfig') }"
                  @editClosed="(obj,context) => { onCellConfigTbodyCellEditClosed(obj,context,'rowCodeFormulaConfigEditConfig') }"
                />
              </div>
            </div>
            <div class="table-design-getData table-design-box-item">
              <div class="btn-group">
                <div class="btn-left">
                  <span class="label-title">表体单元格约束配置</span>
                </div>
                <div class="btn-right">
                  <vxe-button
                    v-show="saveVisible"
                    round
                    size="mini"
                    icon="vxe-icon--edit-outline"
                    status="primary"
                    @click="toggleEditStatus('constraintConfigEditConfig')"
                  >{{ itemEditStatusConfig.constraintConfigEditConfig ? "退出编辑" : "编辑" }}</vxe-button>
                  <vxe-button v-show="saveVisible && itemEditStatusConfig.curEditItem === 'constraintConfigEditConfig'" round size="mini" icon="el-icon-magic-stick" @click="doConfigConstraint('constraintConfigEditConfig')">配置约束</vxe-button>
                  <vxe-button v-show="saveVisible && itemEditStatusConfig.curEditItem === 'constraintConfigEditConfig'" round size="mini" icon="el-icon-circle-plus-outline" @click="deleteCellConfig('constraintConfigEditConfig')">删除约束</vxe-button>
                </div>
              </div>
              <div :style="{ height: 32 * theadRenderLevels + 32 * tableTbodyData.length + 18 + 'px',minHeight: '300px',maxHeight: tableHeightConfig.constraintConfigEditConfig }">
                <BsTable
                  id="constraintConfigEditConfig"
                  ref="constraintConfigTableRef"
                  :table-global-config="{ highlightCurrentRow: true,highlightCell: true,highlightCurrentColumn: true }"
                  :edit-config="itemEditStatusConfig.constraintConfigEditConfig"
                  :table-config="constraintConfigTableConfig"
                  :table-columns-config="constraintConfigColumns"
                  :table-data="constraintConfigBodyData"
                  :high-config="{
                    scrollY: {
                      enabled: true,
                      gt: 50,
                    },
                    scrollX: {
                      enabled: false,
                    },
                  }"
                  :footer-config="{ showFooter: false }"
                  :toolbar-config="false"
                  :pager-config="false"
                  @cellClick="(obj,context) => { onCellConfigTbodycellClick(obj,context,'constraintConfigEditConfig') }"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </BsSplitPane>
    <div>
      <AdvanceAttr
        v-if="advanceAttrVisible"
        :visible.sync="advanceAttrVisible"
        :dic-info-id="dicInfoId"
        :type="advanceType"
        :col-id="curColId"
        :col-type="curColType"
      />
      <OverView
        v-if="overviewVisible"
        :visible.sync="overviewVisible"
        :dic-info-code="dicInfoCode"
        :type="advanceType"
      />
    </div>
    <div class="config-group">
      <ConfigCellFormula
        v-if="configCellFormulaVisible"
        :config-basic-info="configBasicInfo"
        :table-tbody-columns="configCellFormulaTableTbodyColumns"
        :table-tbody-data="configCellFormulaTableTbodyData"
        :config-cell-info="curSelectTbodyCellInfo"
        :dialog-visible.sync="configCellFormulaVisible"
        @onSureClick="onConfigCellFormulaSureClick"
      />
      <ConfigGetData
        v-if="configGetDataDialogVisible"
        :config-basic-info="configBasicInfo"
        :config-cell-info="curSelectTbodyCellInfo"
        :dic-tree-data="treeData"
        :dialog-visible.sync="configGetDataDialogVisible"
        @onSureClick="onConfigGetDataSureClick"
      />
      <ConfigConstraint
        v-if="configConstraintVisible"
        :config-basic-info="configBasicInfo"
        :table-tbody-columns="configCellFormulaTableTbodyColumns"
        :table-tbody-data="configCellFormulaTableTbodyData"
        :config-cell-info="curSelectTbodyCellInfo"
        :dialog-visible.sync="configConstraintVisible"
        @onSureClick="onConfigConstraintSureClick"
      />
      <ViewGetDataOrFormula
        v-if="viewGetDataOrFormulaDialogVisible"
        :table-tbody-columns="configCellFormulaTableTbodyColumns"
        :table-tbody-data="configCellFormulaTableTbodyData"
        :calculate-constraint-config="calculateConstraintConfigSource"
        :config="viewGetDataOrFormulaConfig"
        :dialog-visible.sync="viewGetDataOrFormulaDialogVisible"
      />
      <DynamicTbody
        v-if="dynamicTbodyDialogVisible"
        :dialog-visible.sync="dynamicTbodyDialogVisible"
        :config="dynamicTbodyDialogVisible"
        @onSureClick="configDynamicTbodySureClick"
      />
    </div>
  </el-card>
</template>

<script>
import mix from '@/mixin/commonMixin'
import data from './js/data.js'
import { myMethods } from './js/methods.js'
import AdvanceAttr from '../advanceAttr/advanceAttr.vue'
import OverView from '../overview/overview.vue'
import ConfigGetData from '../getData/getData.vue'
import ConfigCellFormula from '../cellFormula/cellFormula.vue'
import ConfigConstraint from '../cellConstraint/cellConstraint.vue'
import ViewGetDataOrFormula from '../viewGetDataOrFormula/viewGetDataOrFormula'
import DynamicTbody from '../dynamicTbody/dynamicTbody'

import tools from '../../utils/tool.js'
export default {
  name: 'TableDesign',
  mixins: [mix],
  components: {
    AdvanceAttr,
    OverView,
    ConfigGetData,
    ConfigCellFormula,
    ConfigConstraint,
    ViewGetDataOrFormula,
    DynamicTbody
  },
  props: {
    treeData: {
      type: Array,
      default() {
        return []
      }
    },
    // treeDataMap: {
    //   type: Object,
    //   default() {
    //     return {}
    //   }
    // },
    dicInfoId: {
      type: String,
      default: null
    },
    dicInfoCode: {
      type: String,
      default: null
    },
    currentNode: {
      type: Object,
      default: null
    }
  },

  data,
  methods: {
    ...myMethods
  },
  mounted() {
    this.initMounted()
  },
  beforeDestroy () {
    if (this.sortable !== null) {
      this.sortable.destroy()
    }
  },
  created() {
    this.initCreated()
  },
  watch: {
    treeData: {
      handler(newVal) {
        this.treeDataMap = tools.generateTreeDateMap(this.treeData)
      },
      immediately: true
    },
    // treeDataMap: {
    //   handler(newVal) {
    //   },
    //   immediately: true
    // },
    itemEditStatusConfig: {
      handler(newVal) {
      },
      deep: true,
      immediately: true
    },
    currentNode: {
      handler(newVal) {
      },
      deep: true,
      immediately: true
    },
    tableHeightConfig: {
      handler(newVal) {
      },
      deep: true,
      immediately: true
    },
    'queryFormData.isfolder': {
      handler(newVal) {
        if (newVal === '1') {
          this.btmVisible = false
        } else {
          this.btmVisible = true
        }
      },
      immediately: true
    }
  }
}
</script>
