<template>
  <div class="module-wrapper title-position-container">
    <p class="module-title">“三公”监控情况-按地区</p>
    <div :id="chartId" class="module-left-center">
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useChart } from '@/hooks/useChart'
import { useRightCenter } from '../../common/hooks/useRightCenter'
import { RegulationClassEnum } from '@/views/px-to-vw-page/common/model/enum.js'

export default defineComponent({
  setup() {
    const { chartOption } = useRightCenter(RegulationClassEnum.THREE_PUBLIC_EXPENSES)
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
  height: 318px;
  margin: 16px 0;
}
</style>
