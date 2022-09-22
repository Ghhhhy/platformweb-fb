<template>
  <el-card class="query-card" shadow="never" body-style="{padding:0}">
    <div slot="header" class="clearfix">
      <!-- 插槽-左侧toggle按钮 -->
      <slot name="cardLeftSlots"></slot>
      <!-- 标题 -->
      <span style="line-height:28px">填报表设计</span>
      <!-- 按钮组 -->
      <div>
        <vxe-button
          v-if="!saveVisible"
          size="mini"
          icon="ri-file-add-line"
          status="primary"
          @click="doInsert"
        >新增</vxe-button>
        <vxe-button v-if="!saveVisible" size="mini" icon="ri-file-copy-2-line" @click="doCopy">复制</vxe-button>
        <vxe-button v-if="!saveVisible" size="mini" icon="ri-edit-2-line" @click="doUpdate">修改</vxe-button>
        <vxe-button v-if="!saveVisible" size="mini" icon="ri-delete-bin-line" @click="delTableDesignConfig">删除</vxe-button>
        <!-- <vxe-button v-if="!saveVisible" round size="mini" icon="el-icon-upload2" @click="doing">导入</vxe-button> -->
        <vxe-button v-if="!saveVisible" size="mini" icon="ri-eye-line" @click="overview">预览</vxe-button>
        <!-- <vxe-button v-if="!saveVisible" round size="mini" icon="el-icon-magic-stick" @click="doing">设置约束</vxe-button> -->
        <vxe-button v-if="!saveVisible" size="mini" icon="ri-tools-fill" @click="advanceAttr('1')">高级属性</vxe-button>
        <vxe-button v-if="!saveVisible" size="mini" icon="ri-loader-3-line" @click="delCache">清除配置缓存</vxe-button>
        <!-- <vxe-button round size="mini" icon="el-icon-finished">批量修改</vxe-button> -->

        <vxe-button
          v-if="saveVisible"
          size="mini"
          icon="ri-save-3-line"
          status="primary"
          @click="doSave"
        >保存</vxe-button>
        <vxe-button v-if="saveVisible" size="mini" icon="ri-file-shred-line" @click="doCancel">取消</vxe-button>
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
        <div class="paneL">
          <BsForm
            ref="queryForm"
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
        <div class="btn-group">
          <div class="btn-left">
            <span>固定前</span>
            <vxe-select v-model="tableFixNum" size="mini" class="btn-select" @change="fixedCol">
              <vxe-option v-for="num in 10" :key="num" :value="num" :label="`${num}`" />
            </vxe-select>
            <span>列</span>
          </div>
          <div class="btn-right">
            <vxe-button v-if="saveVisible" size="mini" icon="ri-add-box-line" @click="insertRow">新增行</vxe-button>
            <vxe-button v-if="saveVisible && childrenRowVisible" size="mini" icon="ri-menu-add-line" @click="insertChildRow">新增子行</vxe-button>
            <vxe-button v-if="saveVisible" size="mini" icon="ri-checkbox-indeterminate-line" @click="delRow">删除行</vxe-button>
            <vxe-button v-if="saveVisible" size="mini" icon="ri-arrow-up-fill" @click="moveRowUp">上移</vxe-button>
            <vxe-button v-if="saveVisible" size="mini" icon="ri-arrow-down-fill" @click="moveRowDown">下移</vxe-button>
            <vxe-button v-if="!saveVisible" size="mini" icon="ri-tools-fill" @click="advanceAttr('2')">高级属性</vxe-button>
            <!-- <vxe-button v-if="!saveVisible" round size="mini" icon="el-icon-edit" @click="doing">设置列公式</vxe-button> -->
            <!-- <vxe-button v-if="!saveVisible" round size="mini" icon="el-icon-edit" @click="doing">设置单元格公式</vxe-button> -->
          </div>
        </div>
        <!-- 表格 -->
        <BsTable
          ref="bsTableRef"
          :edit-config="tableEditConfig"
          :edit-rules="tableEditRules"
          :table-config="tableConfig"
          :table-columns-config="tableCols"
          :table-data="tableData"
          :footer-config="false"
          :toolbar-config="false"
          :pager-config="false"
          :keyboard-config="tableKeyboardConfig"
        />
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
  </el-card>
</template>

<script>
import mix from '@/mixin/commonMixin'
import { myMethods } from './js/methods.js'
import AdvanceAttr from '../advanceAttr/advanceAttr.vue'
import OverView from '../overview/overview.vue'
export default {
  name: 'TableDesign',
  mixins: [mix],
  props: {
    dicInfoId: {
      type: String,
      default: null
    },
    dicInfoCode: {
      type: String,
      default: null
    }
  },
  components: {
    AdvanceAttr,
    OverView
  },
  data() {
    return {
      sortable: null,
      advanceAttrVisible: false,
      overviewVisible: false,
      childrenRowVisible: true,
      advanceType: '1', // 高级属性类型：1-表，2-列
      curColId: '', // 当前选中列ID
      modifyStatus: '', // 编辑状态：新增:insert/复制:copy/修改:update
      saveVisible: false,
      tableIndex: 0,
      tableFixNum: 1,
      curSplitPaneTopWidth: 42,
      btmVisible: true,
      curDicInfoId: null, // 当前数据字典ID
      tableConfig: {},
      tableEditConfig: false,
      tableEditRules: {},
      currentRow: null,
      formGloabalConfigIn: {},
      queryFormItemConfigIn: [],
      queryFormData: {},
      tableData: [],
      tableCols: [],
      formValidationConfig: [],
      tableKeyboardConfig: {}
    }
  },
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

<style lang="scss">
@import './css/tableDesign.scss';
</style>
