<template>
  <div :id="chartId" class="chart-container">
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useAdminDivScatter } from '../hooks/useAdminDivScatter'
import { useChart } from '@/views/main/warningOverview/hooks/useChart'

export default defineComponent({
  setup() {
    const { chartOption } = useAdminDivScatter()
    const { chartId } = useChart(chartOption, '.subject-analysis')
    return {
      chartId
    }
  }
})
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
