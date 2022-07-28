
<template>
  <vxe-modal
    v-model="dialogVisible"
    title="getData"
    width="98%"
    class-name="modal-content-padding0"
    height="90%"
    :position="{ top: '8%' }"
    resize
    remember
    transfer
  >
    <div class="height-all">
      <BsMainFormListLayout :left-visible.sync="leftVisible">
        <template v-slot:topTap>
          <div class="option-line-group-flex">
            <div class="fn-inline option-line-group-left">
            </div>
            <div class="fn-inline option-line-group-btn" style="padding: 4px 10px 0 10px;">
              <vxe-button v-preventClick="6000" status="primary" @click="onSureClick">确 定</vxe-button>
              <vxe-button code="reset" @click="dialogVisible = false">取 消</vxe-button>
            </div>
          </div>
        </template>
        <template v-slot:topTabPane>
          <div style="height:80px;">
            <JsEditor ref="JsEditor" :config="{ lineWrapping: false }" @hook:mounted="onJsEditorMounted" />
          </div>
        </template>
        <template v-slot:query>

        </template>
        <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
        <template v-slot:mainTree>
          <ul class="formula-list">
            <li></li>
          </ul>
        </template>
        <template v-slot:mainForm>
          <BsTable
            :edit-config="false"
            :table-config="tableTbodyConfig"
            :table-columns-config="tableTbodyColumns"
            :table-data="tableTbodyData"
            :footer-config="{ showFooter: false }"
            :toolbar-config="false"
            :pager-config="false"
          />
        </template>
      </BsMainFormListLayout>
    </div>
  </vxe-modal>
</template>

<script>
export default {
  name: 'FormAdd',
  components: {
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    dialogVisible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      formale: {},
      leftVisible: true,
      loading: false,
      tableTbodyConfig: {},
      tableTbodyColumns: [],
      tableTbodyData: []
    }
  },
  methods: {
    changeInput(val) {
      this.letftTreeFilterText = val
    },
    onNodeClick({ node, treeData }, UnitTree, tree) {
      if (this.$refs.tableDesign && this.$refs.tableDesign.modifyStatus !== '') {
        this.$XModal.message({ status: 'info', message: '锁定中，请先退出编辑模式' })
      }
    },
    cellClick(obj) {
      this.$refs.JsEditor.replaceSelection('' + '{}')
    },
    onSureClick() {
      this.$refs.JsEditor.getValue()
    },
    onJsEditorMounted() {

    }
  },
  mounted() {
  },
  watch: {
    dialogVisible: {
      handler(newval) {
        this.$emit('update:dialogVisible', newval)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>

</style>
