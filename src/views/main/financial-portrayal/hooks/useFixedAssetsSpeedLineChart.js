import { reactive, unref } from '@vue/composition-api'
import {
  getLineSerie,
  getTooltipFormatter,
  getAxis,
  getTooltip,
  getAreaStyle,
  getColor,
  getAxisLabelFormatter
} from '../model/getEchartsConfig'
import { fixedAssetsXAxis } from '../model/data'
import { useWatchOriginDataChange } from './useWatchOriginDataChange'

export const useFixedAssetsSpeedLineChart = (originData) => {
  // 区域基本情况 => 固定资产投入增速
  const fixedAssetsSpeedChartOption = reactive({
    detailTitle: '固定资产投入增速',
    tooltip: {
      ...getTooltip('line'),
      formatter: getTooltipFormatter('seriesName')
    },
    // 由于series中设置了symbol: 'circle' 而默认legend会读取series中symbol，故此处需要手动修改legend的icon
    legend: {
      icon: 'rect'
    },
    xAxis: {
      ...getAxis({ type: 'category', data: fixedAssetsXAxis() }),
      // 主要是label文字太长，这里通过formatter换行展示
      axisLabel: {
        formatter: getAxisLabelFormatter()
      }
    },
    yAxis: {
      axisLabel: {
        formatter: (value) => `${value}%`
      }
    },
    series: []
  })
  const updataSeries = (currentData) => {
    fixedAssetsSpeedChartOption.series = [
      getLineSerie({
        name: '本期',
        type: 'line',
        areaStyle: getAreaStyle(),
        data: [
          {
            name: '第一产业',
            value: unref(currentData).fixedAssetsFirstGrowth || 0
          },
          {
            name: '第二产业',
            value: unref(currentData).fixedAssetsSecondGrowth || 0
          },
          {
            name: '第三产业',
            value: unref(currentData).fixedAssetsThirdGrowth || 0
          },
          {
            name: '基础设施投资',
            value: unref(currentData).fixedAssetsInfrastructureGrowth || 0
          },
          {
            name: '民间投资',
            value: unref(currentData).fixedAssetsPrivateInvestmentGrowth || 0
          },
          {
            name: '房地产开发投资',
            value: unref(currentData).fixedAssetsRealEstateGrowth || 0
          }
        ]
      }),
      getLineSerie({
        name: '上年同期',
        areaStyle: getAreaStyle(getColor('green')),
        data: [
          {
            name: '第一产业',
            value: unref(currentData).fixedAssetsFirstGrowthPeriod || 0
          },
          {
            name: '第二产业',
            value: unref(currentData).fixedAssetsSecondGrowthPeriod || 0
          },
          {
            name: '第三产业',
            value: unref(currentData).fixedAssetsThirdGrowthPeriod || 0
          },
          {
            name: '基础设施投资',
            value: unref(currentData).fixedAssetsInfrastructureGrowthPeriod || 0
          },
          {
            name: '民间投资',
            value: unref(currentData).fixedAssetsPrivateInvestmentGrowthPeriod || 0
          },
          {
            name: '房地产开发投资',
            value: unref(currentData).fixedAssetsRealEstateGrowthPeriod || 0
          }
        ]
      })
    ]
  }
  useWatchOriginDataChange(originData, updataSeries)

  return {
    fixedAssetsSpeedChartOption
  }
}
