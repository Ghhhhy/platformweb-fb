<template>
  <vxe-modal
    v-model="visible"
    :title="`${ type === '1' ? '表' : '列' }高级属性`"
    :loading="tableLoading"
    width="70%"
    height="60%"
    min-height="250px"
    min-width="800px"
    destroy-on-close="true"
    :position="{ top: '20%', left: '15%' }"
    @hide="handleClose"
  >
    <template v-slot>
      <div class="option-line-group">
        <div class="fn-inline option-line-group-btn">
          <vxe-button round size="mini" icon="el-icon-circle-plus-outline" @click="insertRow">新增</vxe-button>
          <vxe-button round size="mini" icon="el-icon-brush" @click="insertFromTemplate">从模板新增</vxe-button>
          <vxe-button round size="mini" icon="el-icon-remove-outline" @click="delRow">删除</vxe-button>
          <vxe-button round size="mini" icon="el-icon-circle-check" status="primary" @click="handleConfirm">保存</vxe-button>
        </div>
      </div>
      <BsTable
        ref="bsTableRef"
        :table-columns-config="tableCols"
        :table-data="tableData"
        :footer-config="{ showFooter: false }"
        :toolbar-config="false"
        :pager-config="false"
        :edit-rules="tableValidateConfig"
        :edit-config="{
          editable: true,
          trigger: 'click',
          mode: 'cell',
          showStatus: true,
          showAsterisk: true,
        }"
      />
      <AdvanceAttrTemplate
        v-if="advanceAttrTemplateVisible"
        :visible.sync="advanceAttrTemplateVisible"
        :type="type"
        :col-type="colType"
        @onSetAttr="onSetAttr"
      />
    </template>
  </vxe-modal>
</template>

<script>
import mix from '../../mixins/index'
import AdvanceAttrTemplate from './advanceAttrTemplate.vue'
import { myMethods } from './js/methods.js'
export default {
  name: 'AdvanceAttr',
  mixins: [mix],
  components: {
    AdvanceAttrTemplate
  },
  props: {
    visible: {
      type: Boolean,
      default() {
        return false
      }
    },
    dicInfoId: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: '1'
    },
    colId: {
      type: String,
      default: ''
    },
    colType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableCols: [],
      tableData: [],
      tableValidateConfig: {},
      tableLoading: false,
      advanceAttrTemplateVisible: false
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
    }
  }
}
</script>

<style lang="scss">
@import './css/advanceAttr.scss';
</style>
