<template>
  <vxe-modal
    v-model="visible"
    title="预览"
    :loading="tableLoading"
    width="80%"
    height="70%"
    min-height="250px"
    min-width="800px"
    destroy-on-close="true"
    :position="{ top: '15%', left: '10%' }"
    @hide="handleClose"
  >
    <div class="height-all pdl10 pdr10">
      <div class="option-line-group">
        <div class="fn-inline option-line-group-btn pdl0 pdr0">
          <div class="fn-inline">
            <vxe-button v-if="type === 'table'" size="mini" icon="ri-add-box-line" @click="insertRow">新增行</vxe-button>
            <vxe-button
              size="mini"
              icon="ri-check-double-line"
              status="primary"
              @click="handleValidate"
            >校验</vxe-button>
            <vxe-switch
              v-if="type !== 'singleRowTable'"
              v-model="type"
              open-label="表单"
              open-value="form"
              close-label="表格"
              close-value="table"
            />
            <vxe-checkbox
              v-model="isSingleRowTable"
              label="isSingleRowTable"
              content="是否单行表"
              size="medium"
            />
          </div>

        </div>
      </div>
      <div class="main-modulebox-tabcon ofa" style="max-height:calc(100% - 44px);padding: 0px 10px 10px 10px;background: #dddfe61f;border: solid 1px #dddfe6;overflow: auto;box-sizing: border-box;">
        <div>
          <BsTitle type="left">
            <template slot="default">{{ type === 'form' ? '表单预览' : '表格预览' }}</template>
          </BsTitle>
          <div style="height: 340px">
            <BsTable
              v-if="(type === 'table' || type === 'editTable') && initCompleted"
              ref="bsTableRef"
              :table-columns-config="tableCols"
              :table-data="tableData"
              :footer-config="false"
              :toolbar-config="toolbarConfig"
              :pager-config="false"
              :edit-rules="validationConfig"
              :edit-config="tableEditConfig"
            />
            <BsForm
              v-if="type === 'form' && initCompleted"
              ref="queryFrom"
              class="overview-form"
              :form-gloabal-config="formGloabalConfig"
              :form-items-config="queryFormItemConfig"
              :form-data-list="queryFormData"
              :form-validation-config="validationConfig"
            />
            <BsBasicGradeInforTable
              v-if="type === 'singleRowTable' && initCompleted"
              ref="BsBasicInfoTable"
              class="overview-form"
              :items-config="tableCols"
              :default-money-unit="1"
              :data="queryFormData"
              :edit-rules="validationConfig"
              :edit-config="tableEditConfig"
              :mode="mode"
            />
          </div>
        </div>
      </div>
    </div>
  </vxe-modal>
</template>

<script>
import mix from '../../mixins/index'
import { myMethods } from './js/methods.js'
export default {
  name: 'Overview',
  mixins: [mix],
  props: {
    visible: {
      type: Boolean,
      default() {
        return false
      }
    },
    dicInfoCode: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      initCompleted: false,
      tableCols: [],
      tableData: [],
      tableLoading: false,
      formGloabalConfig: {},
      queryFormItemConfig: [],
      validationConfig: [],
      queryFormData: {},
      type: null,
      toolbarConfig: { // table工具栏配置
        batchModify: false,
        moneyConversion: false, // 是否有金额转换,
        import: false,
        refresh: false,
        calculator: false,
        export: false, // 导出
        print: false, // 打印
        zoom: false, // 缩放
        custom: true // 选配展示列
      },
      mode: 'edit',
      isSingleRowTable: false,
      tableEditConfig: {
        trigger: 'click',
        mode: 'cell',
        activeMethod({ row, rowIndex, column, columnIndex }) {
          return true
        }
      }
    }
  },
  methods: {
    ...myMethods
  },
  mounted() {
    this.initMounted()
  },
  created() {
    this.initCreated()
  },
  watch: {
    visible: {
      handler(newVal) {
        this.$emit('update:visible', newVal)
      },
      immediate: true
    },
    type: {
      handler(newVal) {
        this.getTableConfig()
      }
    },
    isSingleRowTable: {
      handler(newVal) {
        if (newVal) {
          this.type = 'singleRowTable'
        } else {
          this.type = 'table'
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import './css/overview.scss';
</style>
