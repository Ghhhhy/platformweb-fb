import { reactive, unref } from '@vue/composition-api'
import { getBarSerie, getColor, getTooltipFormatter, getAxis, getTooltip } from '../model/getEchartsConfig'
import { mainIndustrialXAxis } from '../model/data'
import { useWatchOriginDataChange } from './useWatchOriginDataChange'

export const useMainIndustrialBarChart = (originData) => {
  // 区域基本情况 => 主要行业增加值（亿元）
  const mainIndustrialChartOption = reactive({
    detailTitle: '主要行业增加值（亿元）',
    tooltip: {
      ...getTooltip(),
      formatter: getTooltipFormatter('seriesName')
    },
    xAxis: getAxis({ type: 'category', data: mainIndustrialXAxis() }),
    series: [],
    // 隐藏原始legend
    legend: {
      show: false
    },
    // 自定义legend
    customLegend: [
      {
        label: '煤炭开采和洗选业',
        color: getColor('blue')
      },
      {
        label: '石油和天然气开采',
        color: getColor('green')
      },
      {
        label: '装备制造业',
        color: getColor('yellow')
      }
    ]
  })
  const updataSeries = (currentData) => {
    mainIndustrialChartOption.series = [
      getBarSerie({
        name: '本期',
        labelShow: false,
        barGap: '-100%',
        z: 1,
        data: [
          {
            name: '煤炭开采和洗选业',
            value: unref(currentData).coalMining || 0,
            itemStyle: { color: getColor('blue') }
          },
          {
            name: '石油和天然气开采',
            value: unref(currentData).oilGasExtraction || 0,
            itemStyle: { color: getColor('green') }
          },
          {
            name: '装备制造业',
            value: unref(currentData).equipmentManufacturing || 0,
            itemStyle: { color: getColor('yellow') }
          }
        ]
      }),
      getBarSerie({
        name: '上年同期',
        labelShow: false,
        z: 2,
        data: [
          {
            name: '煤炭开采和洗选业',
            value: unref(currentData).coalMiningPeriod || 0,
            itemStyle: { color: getColor('fadeBlue') }
          },
          {
            name: '石油和天然气开采',
            value: unref(currentData).oilGasExtractionPeriod || 0,
            itemStyle: { color: getColor('fadeGreen') }
          },
          {
            name: '装备制造业',
            value: unref(currentData).equipmentManufacturingPeriod || 0,
            itemStyle: { color: getColor('fadeYellow') }
          }
        ]
      })
    ]
  }
  useWatchOriginDataChange(originData, updataSeries)

  return {
    mainIndustrialChartOption
  }
}
