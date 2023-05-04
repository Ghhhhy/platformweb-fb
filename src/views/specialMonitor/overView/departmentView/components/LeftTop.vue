<template>
  <div class="module-wrapper title-position-container">
    <p class="module-title">业务处室分配下达情况分析</p>
    <div style="display: flex">
      <div :id="chartIdLeft" class="module-left-center">
      </div>
      <div :id="chartIdRight" class="module-left-center">
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useChartLeft, useChartRight } from '../hooks/useChart'
import { useLeftTop } from '../../common/hooks/useLeftTop'
import { RegulationClassEnum } from '../../common/model/enum.js'
import ConditionSelect from '@/views/main/warningOverview/components/ConditionSelect.vue'

export default defineComponent({
  components: { ConditionSelect },
  setup() {
    const { chartOption, chartOptionRight } = useLeftTop(RegulationClassEnum.THREE_GUARANTEES_EXPENDITURE)
    const { chartIdLeft } = useChartLeft(chartOption)
    const { chartIdRight } = useChartRight(chartOptionRight)
    return {
      chartIdLeft,
      chartIdRight
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../../common/style/module-wrapper";
.module-wrapper {
  width: 49%;
  margin-top: 16px;
}
.module-left-center {
  width: 50%;
  height: 280px;
}
</style>
