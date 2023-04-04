<!--
 * @Author: 轻语
 * @Date: 2021-10-29 10:18:35
 * @LastEditors: Comer
 * @LastEditTime: 2023-04-04 10:11:54
 * @Description: table
-->
<template>
  <div
    :class="{
      'Titans-table': true,
      'table-cell-status': tableGlobalConfigIn.cellEditableStatusStyle,
      'table-head-cell-wordwrap': tableGlobalConfigIn.headCellWordwrap,
      [customClass]: true,
    }"
  >
    <vxe-grid
      v-if="ifRenderTable"
      :id="id"
      ref="xGrid"
      :row-id="rowId"
      :row-class-name="rowClass"
      :cell-class-name="cellClassName"
      :header-cell-class-name="headerCellClassName"
      border
      resizable
      column-key
      import-config
      sync-resize
      auto-resize
      :height="height"
      :loading="loading"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      :checkbox-config="checkboxConfig"
      :radio-config="radioConfig"
      :sort-config="sortConfigIn"
      :empty-render="{ name: 'NotData' }"
      :row-visible-config="rowVisibleConfigIn"
      :valid-config="validConfig"
      :expand-config="expandConfigIn"
      :span-method="spanMethod"
      :merge-cells="mergeCells"
      :body-top-rows-config="bodyTopRowsConfigIn"
      :body-top-rows-data="bodyTopRowsData"
      :footer-data="footerData"
      :render-cell-class="renderCellClassIn"
      :columns="tableColumnsConfigIn"
      :data="tableDataIn"
      :seq-config="seqConfigIn"
      :edit-rules="editRulesIn"
      :pager-config="pagerConfigIn"
      :form-config="tableFormConfigIn"
      :toolbar="toolbarConfigIn"
      :keyboard-config="keyboardConfigIn"
      :edit-config="editConfigIn"
      :tree-config="treeConfigIn"
      :toolbar-config="toolbarConfigIn"
      :menu-config="contextMenuConfigIn"
      :stripe="tableGlobalConfigIn.stripe"
      :mouse-config="tableGlobalConfigIn.mouseConfig"
      :keep-source="tableGlobalConfigIn.keepSource"
      :highlight-hover-row="tableGlobalConfigIn.highlightHoverRow"
      :show-overflow="tableGlobalConfigIn.showOverflow"
      :show-header="tableGlobalConfigIn.showHeader"
      :show-header-overflow="tableGlobalConfigIn.showHeaderOverflow"
      :show-footer-overflow="tableGlobalConfigIn.showFooterOverflow"
      :header-align="tableGlobalConfigIn.headerAlign"
      :show-footer="footerConfigIn.showFooter"
      :footer-method="footerConfigIn.footerMethod"
      :footer-span-method="footerConfigIn.footerSpanMethod"
      :footer-align="tableGlobalConfigIn.footerAlign"
      :highlight-cell="tableGlobalConfigIn.highlightCell"
      :export-config="tableGlobalConfigIn.exportConfig"
      :tooltip-config="tableGlobalConfigIn.tooltipConfigIn"
      :filter-config="highConfigIn.filterConfig || tableGlobalConfigIn.filterConfig"
      :scroll-y="highConfigIn.scrollY || tableGlobalConfigIn.scrollY"
      :scroll-x="highConfigIn.scrollX || tableGlobalConfigIn.scrollX"
      :header-row-class-name="headerRowClassName"
      :custom-config="{ storage: tableGlobalConfigIn.storage }"
      v-bind="$attrs"
      v-on="$listeners"
      @edit-closed="editClosed"
      @edit-actived="editActived"
      @keydown="keydown"
      @current-change="currentChange"
      @cell-click="cellClick"
      @cell-dblclick="cellDblclick"
      @toolbar-button-click="toolbarButtonClickEvent"
      @form-submit="formSearchSubmit"
      @checkbox-change="handleCheckboxChange"
      @radio-change="radioChange"
      @checkbox-all="handleCheckboxAllChange"
      @page-change="handlePageChange"
      @context-menu-click="onContextMenuClick"
      @header-cell-click="headerCellClick"
      @toggle-tree-expand="toggleRowExpand"
      @header-cell-dblclick="headerCellDblclick"
      @custom="(obj, evnt) => { $emit('custom', obj, evnt); $emit('ProxyEvent', 'custom', obj, evnt) }"
    >
      <template v-for="item in getColumnSlotKeys" v-slot:[replaceColumnSlotKey(item)]="data">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
      <template v-slot:expand="slotData">
        <div class="f10">
          <slot :data="slotData" name="expandContent"></slot>
        </div>
      </template>
      <template v-slot:pagerLeftSlots>
        <slot name="pagerLeftSlots">
        </slot>
      </template>
      <template v-slot:toolbarSlots>
        <slot name="toolbarSlots"> </slot>
      </template>

      <template v-slot:toolbarTools>
        <div class="fn-inline custom-slot">
          <slot name="toolbar-custom-slot"> </slot>
          <slot name="toolbarTools"> </slot>
        </div>
        <!--口径说明：根据是否传入相关插槽判断按钮显示状态；点击按钮弹窗内容为插槽内容-->
        <div class="custom-table-tips-actions">
          <vxe-button
            v-if="$scopedSlots.caliberDeclare"
            title="口径说明"
            @click="caliberDeclareVisible = true"
          >
            口径说明
          </vxe-button>
        </div>
        <div v-show="toolbarConfigInCopy.reverseCheck" class="fn-inline reverseCheckbtn">
          <vxe-button
            v-preventClick="3000"
            status="primary"
            title="反选"
            name="reverseCheckbtn"
            @click="onToolbarOperateClick('reverseCheck')"
          />
        </div>
        <div v-if="toolbarConfigInCopy.batchModify" class="batch-modify-slot fn-inline">
          <BatchModify :batch-modify-item-config="tableColumnsConfigIn" :batch-modify-fields="batchModifyFields" @onBatchModifyItemChange="onBatchModifyItemChange" @onSureClick="omBatchModifySureClick" />
        </div>
        <div v-if="toolbarConfigIn.copyColumn.enabled" class="batch-modify-slot fn-inline">
          <CopyColumn :copy-column-item-config="tableColumnsConfigIn" :toolbar-config-in="toolbarConfigIn" :column-fields="columnFields" :cp-column-fields="cpColumnFields" @onSureClick="onCopyColumnSureClick" />
        </div>
        <div class="fn-inline toolbarTools-select">
          <div
            v-if="toolbarConfigInCopy.moneyConversion"
            class="fn-inline select select-money-unit"
          >
            <vxe-select
              v-model="moneyUnit"
              prefix-icon="单位:"
              placeholder="金额单位"
              :disabled="toolbarConfigInCopy.disabledMoneyConversion"
            >
              <vxe-option v-for="(itemmu,indexmu) in toolbarConfigInCopy.moneyUnitOptions" :key="indexmu" :value="itemmu.value" :label="itemmu.label" />
            </vxe-select>
          </div>
          <div
            v-if="
              toolbarConfigInCopy.yearlist &&
                toolbarConfigInCopy.yearlist.length
            "
            class="fn-inline select"
          >
            <vxe-select v-model="formSearchData.year" placeholder="年份">
              <vxe-option
                v-for="(item, index) in toolbarConfigInCopy.yearlist"
                :key="index"
                :value="item"
                :label="item"
              />
            </vxe-select>
          </div>
        </div>
        <div v-if="toolbarConfigInCopy.search" class="fn-inline">
          <div class="fn-inline filter-input">
            <vxe-input
              v-model="formSearchData.filterValue"
              placeholder="关键字过滤"
              clearable
              @input="formSearchSubmit"
            />
            <!-- <vxe-input
              v-model="filtertext"
              clearable
              placeholder="关键字回车过滤"
              title="关键字回车过滤"
              @keyup.native="onFuzzySearchEnter(true)"
            /> -->
          </div>
          <div class="fn-inline tool-btn-group">
          </div>
        </div>
        <div class="vxe-tools-custom--operate fn-inline">
          <vxe-button
            v-if="toolbarConfigInCopy.import"
            title="导入"
            name="importbtn"
            @click="onToolbarOperateClick('import')"
          >
            <i class="vxe-button--icon base-font baseimport-ico"></i>
          </vxe-button>
          <vxe-button
            v-if="toolbarConfigInCopy.refresh"
            name="refreshbtn"
            title="刷新"
            @click="onToolbarOperateClick('refresh')"
          >
            <i class="vxe-button--icon base-font baserefresh"></i>
          </vxe-button>
          <vxe-button
            v-if="toolbarConfigInCopy.calculator"
            title="计算"
            name="calculatorbtn"
            @click="onToolbarOperateClick('calculator')"
          >
            <i class="vxe-button--icon base-font basecalc-ico"></i>
          </vxe-button>
          <vxe-button
            v-if="toolbarConfigInCopy.zoom"
            name="zoombigbtn"
            title="缩放"
            @click="onToolbarOperateClick('zoom')"
          >
            <i class="vxe-button--icon base-font basefullScreen-ico"></i>
          </vxe-button>
          <vxe-button
            v-if="toolbarConfigInCopy.export"
            name="exportbtn"
            title="导出"
            @click="onToolbarOperateClick('export')"
          >
            <i class="vxe-button--icon base-font basedownload-ico"></i>
          </vxe-button>
          <vxe-button
            v-if="toolbarConfigInCopy.fixed"
            title="固定"
            name="fixedbtn"
            @click="onToolbarOperateClick('fixed')"
          >
            <i class="vxe-button--icon base-font basefixed"></i>
          </vxe-button>
          <vxe-button
            v-if="treeConfig || toolbarConfigInCopy.expandAll"
            name="expandbtn"
            :title="expandAllState ? '收起全部' : '展开全部'"
            @click="onToolbarOperateClick('expandAll')"
          >
            <i :class="expandAllState ? 'ri-checkbox-indeterminate-line' : 'ri-add-box-line'" class="vxe-button--icon"></i>
          </vxe-button>
        </div>
      </template>
      <template v-slot:empty>
        <img :src="require('./assets/img/empty-data.svg')" style="height: 60px;">
        <div>亲，没有更多数据了！</div>
      </template>
    </vxe-grid>
    <ExportModel
      :export-modal-data="exportModalData"
      :export-modal-visible.sync="exportModalVisible"
      @onExportClick="onExportClick"
      @onPrintClick="onPrintClick"
    />
    <ImportModel
      ref="ImportModel"
      :import-config="importConfig"
      :file-config="fileConfig"
      :import-modal-visible.sync="importModalVisible"
      @onDownloadTemplateClick="onDownloadTemplateClick"
      @onImportClick="onImportClick"
      @onImportFileClick="onImportFileClick"
      @onImportUpload="onImportUpload"
      @onDownloadTemplateClickByPort="onDownloadTemplateClickByPort"
      @clear="importClear"
    />
    <!--口径说明弹窗-->
    <CaliberDeclare v-model="caliberDeclareVisible">
      <template v-if="$scopedSlots.caliberDeclare" #default>
        <slot name="caliberDeclare"></slot>
      </template>
    </CaliberDeclare>
  </div>
</template>
<script>
import mixins from '../../tools/mixin'
import watch from './utils/watch.js'
import methods from './utils/methods.js'
import data from './utils/data.js'
import props from './utils/props'
import utils from './tools/utils.js'
import mixin from './mixins'
import BatchModify from './components/batchModify/BatchModify.vue'
import { Import } from './components/import/import/import.js'
import { Export } from './components/export/export/export.js'
import ExportModel from './components/export/Export.vue'
import ImportModel from './components/import/import.vue'
import CopyColumn from './components/copyColumn/CopyColumn.vue'
import CaliberDeclare from './components/caliberDeclare/CaliberDeclare.vue'

export default {
  name: 'BsTable',
  components: { BatchModify, ExportModel, ImportModel, CopyColumn, CaliberDeclare },
  mixins: [...(() => Object.keys(mixin).map(k => mixin[k]))(), mixins],
  data,
  methods: {
    ...utils,
    ...methods
  },
  computed: {
    tableId() {
      const { code = 'xGrid' } = this?.$store?.state?.userInfo || {}
      return `${code}-${this.id}`
    },
    project() {
      return window.__BS_UI_GLOBAL_CONFIG__.project || {}
    },
    getColumnSlotKeys() {
      const keys = Object.keys(this.$scopedSlots)
      const columnSlots = keys
        .map((item) => (item.startsWith('column-') ? item : null))
        .filter((item) => !!item)
      return columnSlots
    }
  },
  props,
  watch,
  mounted() {
    this.$Import = new Import()
    this.$Export = new Export()
    this.$emit('register', this.$refs.xGrid || this)
  }
}
</script>

<style lang="scss">
.Titans-table {
  .vxe-table--empty-content{
    max-height:80%;
    img{
      max-height:60%;
    }
  }
  // .vxe-table .vxe-tree--btn-wrapper{
  //   z-index:0;
  // }
  .table-toolbar-left {
    .table-toolbar-contro-leftvisible {
      line-height: 32px;
      float: left;
      margin-right: 16px;
      height: 32px;
      width: 32px;
      cursor: pointer;
      border-radius: 2px;
      background-color: var(--primary-color);
      font-family: 'remixicon' !important;
      font-style: normal;
      font-size: 18px;
      color: #fff;
      text-align: center;
      background-size: 100% 100%;
    }
    .table-toolbar-contro-leftvisible::before {
      content: '\ee55';
    }
    .table-toolbar-left-title {
      float: left;
      font-size: 0;
      span {
        line-height: 32px;
        height: 32px;
        padding: 0 16px;
        min-width: 140px;
        background: #e3f2fe;
        font-size: 14px;
        color: #2e3133;
        text-align: left;
        position: relative;
      }
      i {
        border-width: 15px;
        border-style: solid;
        border-color: transparent;
        width: 1px;
        height: 1px;
        border-left-width: 20px;
        border-left-color: #e3f2fe;
      }
    }
  }
  .fgx {
    height: 28px;
    width: 1px;
    background: #e7ebf0;
    margin: 0 16px 0 4px;
  }
  // .vxe-select:not(.is--disabled)>.vxe-input .vxe-input--inner {
  //   font-weight: normal;
  // }
  .select-money-unit {
    width: 100px !important;
    .vxe-input--inner {
      padding-left: 45px;
      position: relative;
      background: transparent;
      // color: #333;
      // font-size: 14px;
      // text-align:right;
      // font-weight: bold!important;
    }
    .vxe-input--prefix {
      left: 0.2em;
      width: 40px;
      i {
        font-style: normal;
      }
      i::before {
        content: '单位:';
        font-size: 14px;
        color: #666;
      }
    }
  }
  .vxe-tools-custom--operate {
    margin-right: 8px;
    .vxe-button {
      padding: 0;
      background: #e3f2fe;
      border: none;
    }
    i.custom-ico:before {
      content: '';
      height: 14px;
      width: 14px;
      display: inline-block;
    }
    i.import:before {
      background: url(./assets/img/import-ico.svg);
      background-size: 100% 100%;
    }
    i.refresh:before {
      background: url(./assets/img/refresh.svg);
      background-size: 100% 100%;
    }
    i.calculator:before {
      background: url(./assets/img/calc-ico.svg);
      background-size: 100% 100%;
    }

    i.zoombig:before {
      background: url(./assets/img/fullScreen-ico.svg);
      background-size: 100% 100%;
    }
    i.export:before {
      background: url(./assets/img/download-ico.svg);
      background-size: 100% 100%;
    }
    i.custom:before {
      background: url(./assets/img/rowContro-ico.svg);
      background-size: 100% 100%;
    }
    i.fixedbtn:before {
      background: url(./assets/img/fixed.svg);
      background-size: 100% 100%;
    }
    i.print::before {
      background: url(./assets/img/print.svg);
      background-size: 100% 100%;
    }
  }
  .vxe-tools--operate > .vxe-button {
    display: none;
  }
  .gloableOptionRow {
    font-size: 0;
    .gloable-option-row {
      font-size: 0;
      height: 20px;
      width: 30px;
      cursor: pointer;
    }
    // .gloable-option-row:hover {
    //   filter: brightness(80%) contrast(150%) hue-rotate(-5deg);
    // }
    .gloable-option-row-edit {
      background: url(./assets/img/edit.png) no-repeat center;
      background-size: 50% auto;
    }
    .gloable-option-row-edit-disable {
      background: url(./assets/img/edit-gray.svg) no-repeat center;
      background-size: 100% 100%;
    }
    .gloable-option-row-add {
      margin: 0 5px;
      background: url(./assets/img/add.svg) no-repeat center;
      background-size: 100% 100%;
    }
    .gloable-option-row-attachment {
      margin: 0 5px;
      background: url(./assets/img/attachment.svg) no-repeat center;
      background-size: 100% 100%;
    }
    .gloable-option-row-optionlog {
      background: url(./assets/img/optionlog.svg) no-repeat center;
      background-size: 100% 80%;
    }
    .gloable-option-row-audit {
      margin: 0 5px;
      background: url(./assets/img/icon-audit.png) no-repeat center;
      background-size: 100% 80%;
      width: 20px
    }
    .gloable-option-row-eyes {
      margin: 0 5px;
      background: url(./assets/img/eye.png) no-repeat center;
      background-size: 100% 80%;
      width: 20px
    }
    .gloable-option-row-delete {
      background: url(./assets/img/delete1.png) no-repeat center;
      background-size: 18px 18px
    }
    .gloable-option-row-setting {
      background: url(./assets/img/config.svg) no-repeat center;
      background-size: 160% 160%;
    }
    .gloable-option-row-setting-tree {
      background: url(./assets/img/setting-tree.svg) no-repeat center;
      background-size: 70% 70%;
    }
    .gloable-option-row-download {
      background: url(./assets/img/download1.svg) no-repeat center;
      background-size: 160% 160%;
    }
    .gloable-option-row-view {
      background: url(./assets/img/preview.svg) no-repeat center;
      background-size: 160% 160%;
    }
    .gloable-option-row-upload {
      background: url(./assets/img/upload1.svg) no-repeat center;
      background-size: 160% 160%;
    }
    .gloable-option-row-history {
      // margin: 0 5px;
      background: url(./assets/img/history1.svg) no-repeat center;
      background-size: 160% 160%;
      // width: 20px !important
    }
    .gloable-option-row-see {
      background: url(./assets/img/see.svg) no-repeat center;
      background-size: 100% 80%;
    }
    .gloable-option-row-message {
      background: url(./assets/img/message.svg) no-repeat center;
      background-size: 80% 80%;
    }
    .gloable-option-row-bank {
      background: url(./assets/img/bank.svg) no-repeat center;
      background-size: 100% 100%;
    }
    .gloable-option-row-skip {
      margin: 0 5px;
      background: url(./assets/img/skip.png) no-repeat center;
      background-size: 100% 100%;
      width: 20px !important
    }
    .gloable-option-row-open {
      margin: 0 5px;
      background: url(./assets/img/open.svg) no-repeat center;
      background-size: 100% 100%;
      width: 20px !important
    }
    .gloable-option-row-close {
      margin: 0 5px;
      background: url(./assets/img/close.svg) no-repeat center;
      background-size: 100% 100%;
      width: 20px !important
    }
    .gloable-option-row-transform {
      background: url(./assets/img/transform-icon.svg) no-repeat center;
      background-size: 100% 100%;
    }
    .gloable-option-row-allot {
      background: url(./assets/img/allot.svg) no-repeat center;
      background-size: 100% 80%;
    }
  }
  .header-mul-row-title {
    .vxe-cell{
      height: 100%!important;
      max-height: 1000px!important;
      padding: 5px 0;
      .vxe-cell--title{
        white-space:pre-wrap!important;
        text-align: center;
      }
    }
  }
}
i.custom-ico:before {
  content: '';
  height: 14px;
  width: 14px;
  display: inline-block;
}
i.set:before {
  background: url(./assets/img/listConfig.svg);
  background-size: 100% 100%;
}
</style>
