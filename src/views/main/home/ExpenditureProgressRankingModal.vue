<template>
  <vxe-modal
    v-model="show"
    :destroy-on-close="true"
    title="直达资金支出进度通报"
    width="80%"
    height="70%"
    :show-footer="false"
    :z-index="1001"
    class-name="expenditure-progress-ranking-modal"
  >
    <div style="height: 98%;">
      <ExpenditureProgressRanking
        :show-toolbar="false"
      />
    </div>
  </vxe-modal>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'
import ExpenditureProgressRanking from '@/views/main/fundMonitoring/expenditureProgressRanking/index.vue'

export default defineComponent({
  components: { ExpenditureProgressRanking },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'visible',
    event: 'changeValue'
  },
  setup(props, { emit }) {
    // 弹窗显隐
    const show = computed({
      get() {
        return props.visible
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
