<template>
  <div class="modelu-wrapper">
    <ModuleTitle title="政府债务类指标" />
    <div class="chart-wrapper-debt-info">
      <CommonModultContainer title="债务基本情况">
        <div class="module-chart-container">
          <div class="chart-wrapper">
            <BarChart1
              :option="governmentDebtlimitChartOption"
            />
          </div>
          <div class="chart-wrapper">
            <BarChart1
              :option="governmentDebtAmountBarChart"
            />
          </div>
          <div class="chart-wrapper">
            <BarChart1
              :option="governmentDebtNewlimitChartOption"
            />
          </div>
          <div class="chart-wrapper">
            <BarChart1
              :option="issueBondsChartOption"
            />
          </div>
        </div>
      </CommonModultContainer>
    </div>
    <div class="chart-wrapper-debt-info">
      <CommonModultContainer title="债务可持续指数">
        <div class="module-chart-container">
          <div
            v-for="(item, key) in debtGaugeChartOption"
            :key="key"
            class="chart-wrapper gague-chart-wrapper"
          >
            <BarChart1
              :option="item"
            />
          </div>
        </div>
      </CommonModultContainer>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import ModuleTitle from './ModuleTitle'
import BarChart1 from './BarChart1'
import CommonModultContainer from './CommonModultContainer'
import { useGovernmentDebtlimitBarChart } from '../hooks/useGovernmentDebtlimitBarChart'
import { useGovernmentDebtAmountBarChart } from '../hooks/useGovernmentDebtAmountBarChart'
import { useGovernmentDebtAddlimitBarChart } from '../hooks/useGovernmentDebtAddlimitBarChart'
import { useIssueBondsBarChart } from '../hooks/useIssueBondsBarChart'
import { useDebtGaugeChart } from '../hooks/useDebtGaugeChart'

export default defineComponent({
  components: {
    ModuleTitle,
    CommonModultContainer,
    BarChart1
  },
  setup() {
    const { governmentDebtlimitChartOption } = useGovernmentDebtlimitBarChart()
    const { governmentDebtAmountBarChart } = useGovernmentDebtAmountBarChart()
    const { governmentDebtNewlimitChartOption } = useGovernmentDebtAddlimitBarChart()
    const { issueBondsChartOption } = useIssueBondsBarChart()
    const { debtGaugeChartOption } = useDebtGaugeChart()

    return {
      governmentDebtlimitChartOption,
      governmentDebtAmountBarChart,
      governmentDebtNewlimitChartOption,
      issueBondsChartOption,
      debtGaugeChartOption
    }
  }
})
</script>

<style lang="scss" scoped>
.module-chart-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.chart-wrapper {
  display: flex;
  flex-shrink: 0;
  width: 434px;
  height: 285px;
  margin: 0 16px 16px 0;
  background: #FFFFFF;
  border: 1px solid rgba(236, 236, 236, 1);
  border-radius: 2px;
  box-sizing: border-box;

  &.gague-chart-wrapper {
    width: 284px;
    height: 415px;
  }
}

.chart-wrapper-debt-info {
  width: 100%;
  padding: 16px 0 0 16px;
  margin-bottom: 16px;
  background: #fff;
  box-sizing: border-box;
}
</style>
