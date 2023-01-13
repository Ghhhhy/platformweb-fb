<template>
  <div class="module-wrapper center-bottom title-position-container">
    <p class="module-title">“三公”支出情况</p>
    <div class="filter-select">
      <ConditionSelect
        :value.sync="selectValue"
        :option="selectOption"
        size="small"
        class="custom-select"
      />
    </div>
    <div :id="chartId" class="chart-container">
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import ConditionSelect from '@/views/main/warningOverview/components/ConditionSelect.vue'
import { getViewAllRuleSelectOption, SelectEnum } from '../model/data'
import { useChart } from '@/hooks/useChart'
import { useSelect } from '@/views/main/warningOverview/hooks/useSelect'
import { useCenterBottom } from '../hooks/useCenterBottom'

export default defineComponent({
  components: { ConditionSelect },
  setup() {
    const { selectValue, selectOption } = useSelect({
      option: getViewAllRuleSelectOption(),
      defaultValue: SelectEnum.BY_MONTH
    })
    const { chartOption } = useCenterBottom(selectValue)
    const { chartId } = useChart(chartOption)
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
@import "../../common/style/module-wrapper";
.custom-select {
  width: 170px;
}

.center-bottom {
  position: relative;
  width: 592px;
  height: 324px;
  margin-top: 16px;

  .filter-select {
    position: absolute;
    top: 16px;
    right: 32px;
    z-index: 2;
  }
  .chart-container {
    width: 100%;
    height: 100%;
  }
}
</style>
