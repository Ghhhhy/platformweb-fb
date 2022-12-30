<!--  Table   Author:Titans@2396757591@qq.com -->
<!--  Table   keep-source -->
<template>
  <div class="Titans-table">
    <vxe-grid
      v-if="ifRenderTable"
      :id="id"
      ref="xGrid"
      :row-id="rowId"
      border
      import-config
      sync-resize
      :auto-resize="autoResize"
      :stripe="tableGlobalConfigIn.stripe"
      keep-source
      header-align="center"
      highlight-hover-row
      :print-config="printConfigIn"
      :show-overflow="tableGlobalConfigIn.showOverflow"
      :show-header-overflow="tableGlobalConfigIn.showHeaderOverflow"
      :show-footer-overflow="tableGlobalConfigIn.showFooterOverflow"
      :height="height"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      :cell-class-name="cellClassName"
      :checkbox-config="checkboxConfig"
      :sort-config="sortConfigIn"
      :loading="loading || expendAllLoading"
      :pager-config="pagerConfigIn"
      :columns="tableColumnsConfigIn"
      :form-config="tableFormConfigIn"
      :toolbar="toolbarConfigIn"
      :data="tableDataIn"
      :mouse-config="tableGlobalConfigIn.mouseConfig"
      :keyboard-config="keyboardConfig"
      :empty-render="{ name: 'NotData' }"
      :custom-config="{ storage: tableGlobalConfigIn.storage }"
      :edit-config="editConfigIn"
      :row-visible-config="rowVisibleConfigIn"
      :valid-config="validConfig"
      :edit-rules="editRulesIn"
      :highlight-current-row="tableGlobalConfigIn.highlightCurrentRow"
      :resizable="tableGlobalConfigIn.resizable"
      :align="tableGlobalConfigIn.align"
      :footer-align="tableGlobalConfigIn.footerAlign"
      :highlight-cell="tableGlobalConfigIn.highlightCell"
      :export-config="tableGlobalConfigIn.exportConfig"
      :tooltip-config="tableGlobalConfigIn.tooltipConfig"
      :expand-config="expandConfigIn"
      :tree-config="treeConfigIn"
      :show-footer="footerConfigIn.showFooter"
      :footer-method="footerConfigIn.footerMethod"
      :footer-span-method="footerConfigIn.footerSpanMethod"
      :footer-row-class-name="footerConfigIn.className"
      :context-menu="contextMenuConfigIn"
      :seq-config="seqConfig"
      :scroll-y="highConfigIn.scrollY || tableGlobalConfigIn.scrollY"
      :scroll-x="highConfigIn.scrollX || tableGlobalConfigIn.scrollX"
      :span-method="spanMethod"
      :filter-config="highConfigIn.filterConfig || tableGlobalConfigIn.filterConfig"
      v-bind="$attrs"
      @radio-change="radioChange"
      @edit-closed="editClosed"
      @edit-actived="editActived"
      @keydown="keydown"
      @current-change="currentChange"
      @cell-click="cellClick"
      @cell-dblclick="cellDblclick"
      @form-submit="formSearchSubmit"
      @checkbox-change="handleCheckboxChange"
      @checkbox-all="handleCheckboxAllChange"
      @page-change="handlePageChange"
      @toolbar-button-click="toolbarButtonClickEvent"
      @context-menu-click="onContextMenuClick"
      @scroll="scroll"
      @toggle-tree-expand="toggleRowExpand"
    >
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
          <!-- <slot name="custom-slot"></slot> -->
        </div>
        <div v-show="toolbarConfigInCopy.reverseCheck" class="fn-inline reverseCheckbtn">
          <vxe-button
            v-trigger
            v-preventClick="3000"
            status="primary"
            title="反选"
            name="reverseCheckbtn"
            @click="onToolbarOperrateClick('reverseCheck')"
          />
        </div>
        <div v-if="toolbarConfigInCopy.batchModify" class="batch-modify-slot fn-inline">
          <BatchModify :batch-modify-item-config="tableColumnsConfigIn" :batch-modify-fields="batchModifyFields" @onBatchModifyItemChange="onBatchModifyItemChange" @onSureClick="omBatchModifySureClick" />
        </div>
        <!--口径说明：直接根据是否传入相关插槽判断按钮显示状态；点击按钮弹窗内容为插槽内容-->
        <div class="custom-table-tips-actions">
          <vxe-button
            v-if="$scopedSlots.caliberDeclare"
            title="口径说明"
            @click="caliberDeclareHandle"
          >
            口径说明
          </vxe-button>
        </div>
        <div class="fn-inline toolbarTools-select">
          <div
            v-if="toolbarConfigInCopy.moneyConversion"
            class="fn-inline select select-money-unit"
          >
            <!-- <div class="fn-inline text">单位:</div> -->
            <vxe-select
              v-model="moneyUnit"
              prefix-icon="单位:"
              placeholder="金额单位"
              :disabled="toolbarConfigInCopy.disabledMoneyConversion"
            >
              <vxe-option v-for="(itemmu,indexmu) in toolbarConfigInCopy.moneyUnitOptions" :key="indexmu" :value="itemmu.value" :label="itemmu.label" />
              <!-- <vxe-option :key="1000000" :value="1000000" label="百万元" />
              <vxe-option :key="10000000" :value="10000000" label="千万元" />
              <vxe-option :key="100000000" :value="100000000" label="亿元" /> -->
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
              v-model="filtertext"
              clearable
              placeholder="关键字回车过滤"
              title="关键字回车过滤"
              @keyup.native="onFuzzySearchEnter(true)"
            />
          </div>
          <div class="fn-inline tool-btn-group">
            <!-- <vxe-button
              status="primary"
              code="search"
              @click="formSearchSubmit"
            >搜索</vxe-button> -->
            <!-- <vxe-button code="reset">重置</vxe-button> -->
            <!-- <vxe-button
              v-if="toolbarConfigInCopy.advancedSearch"
              status="primary"
              code="search"
              @click="onAdvancedSearchBtnClick"
            >高级搜索</vxe-button> -->
          </div>
        </div>
        <div class="vxe-tools-custom--operate fn-inline">
          <!-- <vxe-tooltip class="item" effect="dark" content="导入" placement="top"> -->
          <vxe-button
            v-if="toolbarConfigInCopy.import"
            title="导入"
            name="importbtn"
            @click="onToolbarOperrateClick('import')"
          >
            <i class="vxe-button--icon ri-upload-2-line"></i>
          </vxe-button>
          <!-- </vxe-tooltip> -->
          <!--扩展：工具栏前置插槽-->
          <slot name="tools-before"></slot>
          <vxe-button
            v-if="toolbarConfigInCopy.refresh"
            name="refreshbtn"
            title="刷新"
            @click="onToolbarOperrateClick('refresh')"
          >
            <i class="vxe-button--icon ri-refresh-line"></i>
          </vxe-button>
          <vxe-button
            v-if="toolbarConfigInCopy.calculator"
            title="计算"
            name="calculatorbtn"
            @click="onToolbarOperrateClick('calculator')"
          >
            <i class="vxe-button--icon ri-calculator-line"></i>
          </vxe-button>
          <vxe-button
            v-if="toolbarConfigInCopy.zoom"
            name="zoombigbtn"
            title="缩放"
            @click="onToolbarOperrateClick('zoom')"
          >
            <i class="vxe-button--icon ri-fullscreen-line"></i>
          </vxe-button>
          <vxe-button
            v-if="toolbarConfigInCopy.export"
            name="exportbtn"
            title="导出"
            @click="onToolbarOperrateClick('export')"
          >
            <i class="vxe-button--icon ri-download-2-line"></i>
          </vxe-button>
          <vxe-button
            v-if="treeConfig || toolbarConfigInCopy.expandAll"
            name="expandbtn"
            :loading="expendAllLoading"
            :title="expandAllState ? '收起全部' : '展开全部'"
            @click="onToolbarOperrateClick('expandAll')"
          >
            <i :class="expandAllState ? 'ri-checkbox-indeterminate-line' : 'ri-add-box-line'" class="vxe-button--icon"></i>
          </vxe-button>
          <!-- <vxe-button v-if="toolbarConfigInCopy.custom" name="custombtn" @click="onToolbarOperrateClick('custom')">
            <i class="vxe-button--icon custom-ico custom"></i>
          </vxe-button> -->
        </div>
      </template>
      <template v-slot:empty>
        <div><img :src="require('./assets/img/empty.svg')"> </div>
        <div>亲，没有更多数据了！</div>
      </template>
    </vxe-grid>
    <ExportModel
      ref="export"
      :export-modal-data="exportModalData"
      :export-modal-visible.sync="exportModalVisible"
      @onExportClick="onExportClick"
    />
    <ImportModel
      :file-config="fileConfig"
      :import-modal-visible.sync="importModalVisible"
      @onDownloadTemplateClick="onDownloadTemplateClick"
      @onImportClick="onImportClick"
      @onImportFileClick="onImportFileClick"
    />
    <!--口径说明弹窗-->
    <CaliberDeclare
      :dialog-visible.sync="caliberDeclareVisible"
    >
      <template
        v-if="$scopedSlots.caliberDeclare"
        #default
      >
        <slot name="caliberDeclare"></slot>
      </template>
    </CaliberDeclare>
  </div>
</template>
<script>
import data from './util/data.js'
import methods from './util/methods.js'
import props from './util/props.js'
import watch from './util/watch.js'
import mixin from './config/mixin.js'
import { Import } from './import/import/import.js'
import { Export } from './export/export/export.js'
import ExportModel from './export/Export.vue'
import ImportModel from './import/import.vue'
import BatchModify from './batchModify/BatchModify.vue'
import CaliberDeclare from './caliberDeclare/CaliberDeclare.vue'
export default {
  name: 'Table',
  directives: {
    trigger: {
      inserted(el, binging) {
        el.click()
        // $(el).trigger('click')  // 所有都触发一次,然后就是最后一个
      }
    }
  },
  components: {
    ExportModel,
    ImportModel,
    BatchModify,
    CaliberDeclare
  },
  props: {
    ...props
  },
  mixin: [mixin],
  data: data,
  methods: {
    ...methods
  },
  created() {
    this.initCreated()
  },
  computed: {
  },
  mounted() {
    const unitLabel = this.toolbarConfigInCopy.moneyUnitOptions?.find(item => item.value === this.moneyUnit)?.label
    this.$Import = new Import()
    this.$Export = new Export({ unit: unitLabel || '元' })
    this.initMounted()
    this.$emit('register', this.$refs.xGrid || this)
  },
  watch: {
    ...watch
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
  .vxe-table .vxe-tree--btn-wrapper{
    z-index:0;
  }
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
      // background: url(../../assets/img/tree-hide-ico.svg);
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
        background: var(--hightlight-color);
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
        border-left-color: var(--hightlight-color);
      }
    }
  }
  .fgx {
    height: 28px;
    width: 1px;
    background: #e7ebf0;
    margin: 0 16px 0 4px;
  }
  .vxe-select:not(.is--disabled)>.vxe-input .vxe-input--inner {
    font-weight: normal;
  }
  .select-money-unit {
    width: 100px !important;
    .vxe-input--inner {
      padding-left: 45px;
      position: relative;
      background: transparent;
      color: #333;
      font-size: 14px;
      text-align:right;
      font-weight: bold!important;
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
      background: var(--hightlight-color);
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
      background: url(./assets/img/edit.svg) no-repeat center;
      background-size: 100% 100%;
    }
    .gloable-option-row-red {
      background: url(./assets/img/red.svg) no-repeat center;
      background-size: 100% 100%;
    }
    .gloable-option-row-yellow {
      background: url(./assets/img/yellow.svg) no-repeat center;
      background-size: 100% 100%;
    }
    .gloable-option-row-green {
      background: url(./assets/img/green.svg) no-repeat center;
      background-size: 100% 100%;
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
  }
  .vxe-cell{
    .filter-lighting{
      background: #ff0;
    }
  }
  .footerClass{
    background-color: rgb(200, 217, 245);
    font-weight: 700;
  }
}
.result-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: block;
}
.result-yellow{
  background-image:url(./assets/img/yellow.svg) ;
  display: inline-block;
}
.result-red{
  background-image:url(./assets/img/red.svg) ;
  display: inline-block;
}
.result-green{
  background-image:url(./assets/img/green.svg) ;
  display: inline-block;
  background-size: 120% 120%;
}
.result-orange{
  background-image:url(./assets/img/orange.svg) ;
  display: inline-block;
  background-size: 120% 120%;
}
.result-blue{
  background-image:url(./assets/img/blue.svg) ;
  display: inline-block;
  background-size: 120% 120%;
}
.result-grey{
  background-image:url(./assets/img/grey.svg) ;
  display: inline-block;
  background-size: 120% 120%;
}
.result-yellow-bell{
  background-image:url(./assets/img/yellowBell.svg) ;
  display: inline-block;
  background-size: 120% 120%;
}
.custom-table-tips-actions {
  display: flex;
  align-items: center;
  .vxe-button {
    margin-right: 8px;
  }
}
.Titans-table .vxe-table .vxe-cell:not([class*="c--tooltip"]) {
  height: 100% !important;
  padding: 5px !important;
  line-height: calc(1em + 6px) !important;
}
</style>
