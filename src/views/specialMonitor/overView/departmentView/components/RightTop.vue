<template>
  <div class="module-wrapper title-position-container">
    <p class="module-title">专项支付进度分析</p>
    <div class="filter-select">
      <ConditionSelect
        :value.sync="leftValue"
        :option="leftOption"
        size="small"
        class="custom-select type-select-wrapper"
      />
      <ConditionSelect
        :value.sync="rightValue"
        :option="rightOption"
        size="small"
        class="custom-select type-select-wrapper"
      />
    </div>
    <div :id="chartId" class="module-left-center">
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useChart } from '@/hooks/useChart'
import { useRightTop } from '../../common/hooks/useRightTop'
import { RegulationClassEnum, getViewLeftSelectOption, getViewRightSelectOption, LeftEnum, RightEnum } from '../../common/model/enum.js'
import ConditionSelect from '@/views/main/warningOverview/components/ConditionSelect.vue'
import { useSelect1, useSelect2 } from '../hooks/useSelect'

export default defineComponent({
  components: { ConditionSelect },
  setup() {
    const { leftValue, leftOption } = useSelect1({
      option: getViewLeftSelectOption(),
      defaultValue: LeftEnum.BY_ALL
    })
    const { rightValue, rightOption } = useSelect2({
      option: getViewRightSelectOption(),
      defaultValue: RightEnum.BY_ALL
    })
    const { chartOption, loadingState } = useRightTop(RegulationClassEnum.THREE_GUARANTEES_EXPENDITURE)
    const { chartId } = useChart(chartOption)
    return {
      chartId,
      loadingState,
      leftValue,
      leftOption,
      rightValue,
      rightOption
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
  width: 100%;
  height: 280px;
}
/deep/.custom-select {
  width: 170px;
}

/deep/.center-bottom {
  position: relative;
  width: 606px;
  height: 324px;
  margin-top: 16px;
}
/deep/.filter-select {
  position: absolute;
  top: 4px;
  right: 32px;
  z-index: 2;
}
/deep/.chart-container {
  width: 100%;
  height: 100%;
}
/deep/.el-input--small {
  font-size: 13px;
}
/deep/.el-select__caret {
  line-height: 1;
}
/deep/.el-input__inner {
  height: 32px;
  line-height: 1;
  font-size: 13px;
}
/deep/.el-select-dropdown {
  font-size: 13px;
}
</style>
