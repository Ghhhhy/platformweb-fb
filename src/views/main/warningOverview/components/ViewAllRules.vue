<template>
  <div class="view-all-rule-container">
    <div class="filter-select">
      <ConditionSelect
        :value.sync="selectValue"
        :option="selectOption"
        size="small"
        style="width: 170px"
      />
    </div>
    <div :id="chartId" class="chart-container">
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import ConditionSelect from './ConditionSelect'

import { useViewAllRules } from '../hooks/useViewAllRules'
import { useChart } from '@/views/main/warningOverview/hooks/useChart'
import { useSelect } from '../hooks/useSelect'
import { getViewAllRuleSelectOption } from '../modal/data'

export default defineComponent({
  components: { ConditionSelect },
  setup() {
    const { selectValue, selectOption } = useSelect({
      option: getViewAllRuleSelectOption(),
      defaultValue: 1
    })
    const { chartOption } = useViewAllRules(selectValue)
    const { chartId } = useChart(chartOption, '.warning-overview')
    return {
      chartOption,
      chartId,
      selectValue,
      selectOption
    }
  }
})
</script>

<style lang="scss" scoped>
.view-all-rule-container {
  position: relative;
  width: 100%;
  height: 100%;

  .chart-container {
    width: 100%;
    height: 100%;
  }

  .filter-select {
    position: absolute;
    right: 24px;
    top: 16px;
    z-index: 10;
  }
}
</style>
