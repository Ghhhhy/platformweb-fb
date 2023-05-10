<!--
 * @Author: 罗景丹 luojingdan@bosssoft.com.cn
 * @Date: 2023-05-06 16:46:49
 * @LastEditors: 罗景丹 luojingdan@bosssoft.com.cn
 * @LastEditTime: 2023-05-06 17:10:59
 * @FilePath: \platformWeb-fb\src\views\specialMonitor\overView\departmentView\components\LeftCenter.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="module-wrapper title-position-container" :style="overviewType === '3' ? 'width: 66%' : 'width: 32%'">
    <p class="module-title">“三保”监控情况-按地区</p>
    <div class="filter-select">
      <ConditionSelect
        :value.sync="selectValue"
        :option="selectOption"
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
import { useSelect } from '@/views/main/warningOverview/hooks/useSelect'
import { useRightCenter } from '../../common/hooks/useRightCenter'
import { getViewClassifySelectOption, getViewClassifyMainSelectOption, getViewClassifyUnitSelectOption, SelectEnum, SelectMainEnum, SelectUnitEnum } from '../../common/model/enum.js'
import ConditionSelect from '@/views/main/warningOverview/components/ConditionSelect.vue'

export default defineComponent({
  components: { ConditionSelect },
  props: {
    overviewType: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { selectValue, selectOption } = useSelect({
      option: props.overviewType === '1' ? getViewClassifySelectOption() : props.overviewType === '2' ? getViewClassifyMainSelectOption() : getViewClassifyUnitSelectOption(),
      defaultValue: props.overviewType === '1' ? SelectEnum.BY_UNIT : props.overviewType === '2' ? SelectMainEnum.BY_UNIT : SelectUnitEnum.BY_UNIT
    })
    const { chartOption } = useRightCenter(selectValue)
    const { chartId } = useChart(chartOption)
    return {
      chartId,
      selectOption,
      selectValue
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../../common/style/module-wrapper";
.module-wrapper {
  margin-top: 16px
}
.module-left-center {
  width: 100%;
  height: 310px;
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
