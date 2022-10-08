<template>
  <div class="modelu-wrapper">
    <!-- title -->
    <div class="financial-title">
      <span class="financial-title-text">{{ originData.mofDivName }}财政画像</span>
    </div>
    <ModuleTitle title="区域基本情况" />
    <!-- 区域基本情况 -->
    <div class="module-chart-container">
      <!-- 人口 -->
      <div class="chart-wrapper">
        <BarChart1 :option="populationChartOption" />
      </div>
      <!-- 国民GDP -->
      <div class="chart-wrapper gdp-chart-wrapper">
        <BarChart1 :option="gdpChartOption" :chart-width="'90%'" />
        <div class="gdp-speed-container">
          <Trend
            v-for="item in gdpSpeedValues"
            :key="item.lable"
            :option="item"
          />
        </div>
      </div>
      <!-- 工业增加值 -->
      <div class="chart-wrapper">
        <BarChart1 :option="industrialAddedChartOption" />
      </div>
      <!-- 主要行业增加值 -->
      <div class="chart-wrapper">
        <BarChart1 :option="mainIndustrialChartOption" />
      </div>
      <!-- 固定资产投入增速 -->
      <div class="chart-wrapper">
        <BarChart1 :option="fixedAssetsSpeedChartOption" />
      </div>
      <!-- 固定资产投入增加额 -->
      <div class="chart-wrapper">
        <BarChart1 :option="fixedAssetsValueChartOption" />
      </div>
      <!-- 社会消费品零售总额(亿元) -->
      <div class="chart-wrapper">
        <DetailContainer title="社会消费品零售总额(亿元)">
          <SaleAmount
            :current-value="saleAmount.retailTotal"
            :last-value="saleAmount.retailTotalPeriod"
            :show-ratio="true"
            :ratio="saleAmount.retailTotalRatio"
          />
        </DetailContainer>
      </div>
      <!-- 进出口总值（亿元） -->
      <div class="chart-wrapper">
        <BarChart1 :option="importAndExportChartOption" />
      </div>
      <!-- 先行指标 -->
      <div class="chart-wrapper leading-Indicator-wrapper">
        <div class="trend-container">
          <Trend
            v-for="(item, key) in leadingIndicatorValues"
            :key="item.lable"
            :option="item"
            :show-icon="key === 'current'"
            algin="center"
            custom-color="#2A8BFD"
          />
        </div>
        <BarChart1
          :option="leadingIndicatorChartOption"
          :position="{ top: '102px', left: '16px' }"
        />
      </div>
      <!-- 居民消费价格指数 -->
      <div class="chart-wrapper">
        <CommonChartContainer :option="CIPCommonChartOption">
          <div class="unemployment-rate-container">
            <PolarBarChart :option="CIPCurrentChartOption" />
            <PolarBarChart :option="CIPLastChartOption" />
          </div>
        </CommonChartContainer>
      </div>
      <!-- 工业品出厂价格指数 -->
      <div class="chart-wrapper">
        <CommonChartContainer :option="exFactoryPriceCommonOption">
          <div class="unemployment-rate-container">
            <PolarBarChart :option="exFactoryPriceChartOption" />
            <ExFactoryPriceIndex :options="exFactoryPriceCommonOption.options" />
          </div>
        </CommonChartContainer>
      </div>
      <!-- 失业率 -->
      <div class="chart-wrapper">
        <CommonChartContainer :option="unemploymentRateCommonOption">
          <div class="unemployment-rate-container">
            <PolarBarChart :option="unemploymentRateCurrentChartOption" />
            <PolarBarChart :option="unemploymentRateLastChartOption" />
          </div>
        </CommonChartContainer>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import BarChart1 from './BarChart1'
import DetailContainer from './DetailContainer'
import SaleAmount from './SaleAmount'
import Trend from './Trend'
import CommonChartContainer from './CommonChartContainer'
import PolarBarChart from './PolarBarChart'
import ExFactoryPriceIndex from './ExFactoryPriceIndex'
import ModuleTitle from './ModuleTitle'

import { usePopulationBarChart } from '../hooks/usePopulationBarChart'
import { useIndustrialAddedBarChart } from '../hooks/useIndustrialAddedBarChart'
import { useMainIndustrialBarChart } from '../hooks/useMainIndustrialBraChart'
import { useGdpBarChart } from '../hooks/useGdpBarChart'
import { useFixedAssetsSpeedLineChart } from '../hooks/useFixedAssetsSpeedLineChart'
import { useFixedAssetsValueLineChart } from '../hooks/useFixedAssetsValueLineChart'
import { useImportAndExportBarChart } from '../hooks/useImportAndExportBarChart'
import { useLeadingIndicatorBarChart } from '../hooks/useLeadingIndicatorBarChart'
import { useCIPPieChart } from '../hooks/useCIPPieChart'
import { useUnemploymentRatePieChart } from '../hooks/useUnemploymentRatePieChart'
import { useExFactoryPricePieChart } from '../hooks/useExFactoryPricePieChart'
import { useBaseInfo } from '../hooks/useBaseInfo'
import { useSaleAmount } from '../hooks/useSaleAmount'

export default defineComponent({
  components: {
    ModuleTitle,
    BarChart1,
    DetailContainer,
    SaleAmount,
    Trend,
    CommonChartContainer,
    PolarBarChart,
    ExFactoryPriceIndex
  },
  setup() {
    const { originData } = useBaseInfo()
    const { populationChartOption } = usePopulationBarChart(originData)
    const { industrialAddedChartOption } = useIndustrialAddedBarChart(originData)
    const { mainIndustrialChartOption } = useMainIndustrialBarChart(originData)
    const { gdpChartOption, gdpSpeedValues } = useGdpBarChart(originData)
    const { fixedAssetsSpeedChartOption } = useFixedAssetsSpeedLineChart(originData)
    const { fixedAssetsValueChartOption } = useFixedAssetsValueLineChart(originData)
    const { importAndExportChartOption } = useImportAndExportBarChart(originData)
    const { leadingIndicatorChartOption, leadingIndicatorValues } = useLeadingIndicatorBarChart(originData)
    const { CIPCommonChartOption, CIPCurrentChartOption, CIPLastChartOption } = useCIPPieChart(originData)
    const { unemploymentRateCommonOption, unemploymentRateCurrentChartOption, unemploymentRateLastChartOption } = useUnemploymentRatePieChart(originData)
    const { exFactoryPriceCommonOption, exFactoryPriceChartOption } = useExFactoryPricePieChart(originData)
    const { saleAmount } = useSaleAmount(originData)

    return {
      populationChartOption,
      industrialAddedChartOption,
      mainIndustrialChartOption,
      gdpChartOption,
      gdpSpeedValues,
      fixedAssetsSpeedChartOption,
      fixedAssetsValueChartOption,
      importAndExportChartOption,
      leadingIndicatorChartOption,
      leadingIndicatorValues,
      CIPCommonChartOption,
      CIPCurrentChartOption,
      CIPLastChartOption,
      unemploymentRateCommonOption,
      unemploymentRateCurrentChartOption,
      unemploymentRateLastChartOption,
      exFactoryPriceCommonOption,
      exFactoryPriceChartOption,
      saleAmount,
      originData
    }
  }
})
</script>

<style lang="scss" scoped>
  .modelu-wrapper {
    margin: auto;

    .financial-title {
      .financial-title-text {
        display: block;
        font-size: 22px;
        color: #595959;
        letter-spacing: 0;
        text-align: center;
        line-height: 34px;
        font-weight: 600;
      }
    }
  }
  .gdp-chart-wrapper {
    background: #fff;

    .gdp-speed-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 96px;
      height: 100%;
      padding: 90px 0 50px;
      box-sizing: border-box;
    }
  }

  .module-chart-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: calc(100% + 16px);

    .chart-wrapper {
      display: flex;
      flex-shrink: 0;
      width: 440px;
      height: 280px;
      margin: 0 16px 16px 0;
      background: #FFFFFF;
      border: 1px solid rgba(236,236,236,1);
      border-radius: 2px;
      box-sizing: border-box;
      overflow: hidden;
    }
  }

  .leading-Indicator-wrapper {
    position: relative;

    .trend-container {
      position: absolute;
      top: 52px;
      left: 0;
      display: flex;
      justify-content: space-between;
      padding: 0 68px;
      width: 100%;
      box-sizing: border-box;
      z-index: 5;
    }
  }

  .unemployment-rate-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
</style>
