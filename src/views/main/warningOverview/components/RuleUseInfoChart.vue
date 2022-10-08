<template>
  <div :id="chartId" class="rule-use-container">
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useChart } from '../hooks/useChart'
import { useRuleUseInfoChart } from '../hooks/useRuleUseInfoChart'

export default defineComponent({
  setup() {
    const { chartOption } = useRuleUseInfoChart()

    const { chartId } = useChart(chartOption, '.warning-overview')
    return {
      chartId
    }
  }
})
</script>

<style lang="scss" scoped>
.rule-use-container {
  width: 100%;
  height: 100%;
}
</style>
