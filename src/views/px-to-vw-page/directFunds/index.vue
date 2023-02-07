<template>
  <div class="direct-funds-wrapper">
    <!-- 上级下达 -->
    <div class="chart-wrapper">
      <p class="module-title">上级下达</p>
      <div :id="directFundsChartId" class="chart-container"></div>
    </div>
    <!--支出金额-->
    <div class="chart-wrapper">
      <p class="module-title">支出金额</p>
      <div :id="expenditureAmountChartId" class="chart-container"></div>
    </div>
    <!-- 分配进度 -->
    <div class="chart-wrapper">
      <p class="module-title">分配进度</p>
      <div :id="distributeScheduleChartId" class="chart-container"></div>
    </div>
    <!--支出进度-->
    <div class="chart-wrapper">
      <p class="module-title">支出进度</p>
      <div :id="expenditureScheduleChartId" class="chart-container"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

import { useChart } from '@/hooks/useChart'
import { useDirectFundsChart } from './hooks/useDirectFundsChart'
import { useDistributeScheduleChart } from './hooks/useDistributeScheduleChart'
import { useExpenditureAmountChart } from './hooks/useExpenditureAmountChart'
import { useExpenditureScheduleChart } from './hooks/useExpenditureScheduleChart'

export default defineComponent({
  setup() {
    const { directFundsOption } = useDirectFundsChart()
    const { chartId: directFundsChartId } = useChart(directFundsOption)

    const { distributeScheduleOption } = useDistributeScheduleChart()
    const { chartId: distributeScheduleChartId } = useChart(distributeScheduleOption)

    const { expenditureAmountOption } = useExpenditureAmountChart()
    const { chartId: expenditureAmountChartId } = useChart(expenditureAmountOption)

    const { expenditureScheduleOption } = useExpenditureScheduleChart()
    const { chartId: expenditureScheduleChartId } = useChart(expenditureScheduleOption)
    return {
      directFundsChartId,
      distributeScheduleChartId,
      expenditureAmountChartId,
      expenditureScheduleChartId
    }
  }
})
</script>

<style lang="scss" scoped>
$wrapper-padding: 24px;
$item-gap: 16px;

.direct-funds-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: $item-gap;
  padding: $wrapper-padding;
  box-sizing: border-box;

  .chart-wrapper {
    width: calc((100% - #{$item-gap}) / 2);
    height: calc((100vh - #{$item-gap} - 100px) / 2);
    position: relative;

    .module-title {
      position: absolute;
      left: 16px;
      top: 16px;
      z-index: 2;
      font-family: PingFangSC-Medium;
      font-weight: bold;
      font-size: 16px;
      color: #595959;
      letter-spacing: 0;
      line-height: 26px;
    }

    .chart-container {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
