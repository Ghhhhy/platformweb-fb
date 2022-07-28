<!-- 审核弹框   Author:Titans
  <BsFcAudit>
     :visible="auditVisible"
     v-if="auditVisible"
     @onAuditSure="onAuditSure"
  </BsFcAudit>
-->
<template>
  <div>
    <vxe-modal
      ref="xeModal"
      v-model="visible"
      :title="title"
      :position="position"
      transfer
      width="width"
      destroy-on-close
      :show-footer="true"
      :confirm-button-text="confirmButtonText"
      :cancel-button-text="cancelButtonText"
      @close="onCancelClick"
      @cancel="onCancelClick"
      @confirm="onConfirmClick"
    >
      <div v-if="$slots.default">
        <slot></slot>
      </div>
      <div v-if="!$slots.default">
        <vxe-textarea
          v-model="content"
          :maxlength="maxlength"
          :show-word-count="showWordCount"
          :autosize="autosize"
          :placeholder="placeholder"
        />
      </div>
    </vxe-modal>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    textareaConfig: {
      type: Object,
      default() {
        return {}
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      position: {
        top: '20%'
      },
      maxlength: 1000,
      showWordCount: true,
      width: '40%',
      title: '审核意见',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      autosize: {
        minRows: 5,
        maxRows: 10
      },
      placeholder: '请输入审核意见！',
      content: ''
    }
  },
  methods: {
    onCancelClick() {
      this.$emit('onCancel', this.content)
      if (typeof this.cancel === 'function') {
        this.cancel(this)
      }
    },
    onConfirmClick() {
      this.$emit('update:visible', false)
      this.$emit('onAuditSure', this.content)
      if (typeof this.confirm === 'function') {
        this.confirm(this.content, this)
      }
    }
  },
  mounted() {
  },
  watch: {
    visible: {
      handler(newval) {
      },
      deep: true,
      immediate: true
    },
    textareaCustomConfig: {
      handler(newval) {
        Object.assign(this, this.textareaConfig)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
</style>
