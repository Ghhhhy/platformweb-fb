<template>
  <div class="module-wrapper title-position-container">
    <p class="module-title">“三公”监控情况-按规则分类</p>
    <div :id="chartId" class="module-left-center">
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useChart } from '@/hooks/useChart'
import { useLeftCenter } from '../hooks/useLeftCenter'
export default defineComponent({
  setup() {
    const { chartOption } = useLeftCenter()
    const { chartId } = useChart(chartOption)
    return {
      chartId
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../../common/style/module-wrapper";
.module-left-center {
  width: 100%;
  height: 305px;
  margin: 16px 0;
}
</style>
