<template>
  <vxe-modal
    v-model="show"
    :destroy-on-close="true"
    title="财政上报确认提醒"
    width="80%"
    height="70%"
    :show-footer="false"
    :z-index="1001"
    class-name="expenditure-progress-ranking-modal"
  >
    <div style="height: 98%;">
      <EscalationModal
        :show-toolbar="false"
      />
    </div>
  </vxe-modal>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'
import EscalationModal from '@/views/main/fundMonitoring/escalation/confirmStatus.vue'

export default defineComponent({
  components: { EscalationModal },
  props: {
    visibles: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'visibles',
    event: 'changeValue'
  },
  setup(props, { emit }) {
    // 弹窗显隐
    const show = computed({
      get() {
        return props.visibles
      },
      set(val) {
        emit('changeValue', val)
      }
    })

    return {
      show
    }
  }
})
</script>

<style lang="scss" scoped>
.expenditure-progress-ranking-modal /deep/.T-mainFormListLayout-modulebox {
  padding: 0 !important;
}
</style>
