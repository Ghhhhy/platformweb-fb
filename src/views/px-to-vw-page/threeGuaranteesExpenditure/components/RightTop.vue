<template>
  <div class="module-wrapper title-position-container">
    <p class="module-title">“三保”分类预警情况-按科目</p>
    <div :id="chartId" class="module-left-center">
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useChart } from '@/hooks/useChart'
import { useRightTop } from '../../common/hooks/useRightTop'

import { monitoringBySubject } from '@/api/frame/main/threeGuaranteesExpenditure/index.js'
export default defineComponent({
  setup() {
    const { chartOption } = useRightTop(monitoringBySubject)
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
  height: 280px;
}
</style>
