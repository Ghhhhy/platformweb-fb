<!--处理弹框-->
<template>
  <vxe-modal
    v-model="visible"
    :title="title"
    width="96%"
    height="90%"
    :show-footer="true"
    @close="dialogClose"
  >
    <haiNanModeAuditModal v-if="visible" v-bind="haiNanModeProperty" />
    <div slot="footer" style="height: 80px; margin: 0 15px">
      <el-divider style="color: #e7ebf0" />
      <div type="flex" justify="space-around">
        <div>
          <vxe-button @click="dialogClose">取消</vxe-button>
        </div>
      </div>
    </div>
  </vxe-modal>
</template>
<script>
import haiNanModeAuditModal from '@/views/main/handlingOfViolations/components/haiNanModeAuditModal.vue'
export default {
  name: 'FjHaiNanModeModal',
  components: {
    haiNanModeAuditModal
  },
  props: {
    value: { // v-model双向绑定
      type: Boolean,
      default: false
    },
    param5: { // 菜单参数
      type: Object,
      default: () => {
        return {}
      }
    },
    selectedRow: { // 点击行row参数
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    visible: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    haiNanModeProperty() {
      return {
        selectedRow: this.selectedRow,
        param5: this.param5
      }
    }
  },
  data() {
    return {
      tableLoading: false,
      title: '查看详情'
    }
  },
  methods: {
    dialogClose() {
      this.visible = false
      this.$emit('close')
    }
  },
  watch: {},
  created() {},
  mounted() {},
  destoryed() {}
}
</script>
<style lang="scss" scoped>
/deep/ .createRef {
  .vxe-form--item.vxe-col--24 {
    .vxe-form--item-inner {
      align-items: flex-start !important;
    }
  }
  .vxe-textarea--inner[disabled] {
    background: var(--common-background) !important;
  }
}
</style>
