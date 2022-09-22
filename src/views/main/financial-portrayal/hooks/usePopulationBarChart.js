import { reactive, unref } from '@vue/composition-api'
import { getBarSerie, getColor, getTooltipFormatter, getAxis, getTooltip } from '../model/getEchartsConfig'
import { periodXAxis } from '../model/data'
import { useWatchOriginDataChange } from './useWatchOriginDataChange'

export const usePopulationBarChart = (originData) => {
  // 区域基本情况 => 人口
  const populationChartOption = reactive({
    detailTitle: '人口（万人）',
    tooltip: {
      ...getTooltip(),
      formatter: getTooltipFormatter('seriesName')
    },
    xAxis: getAxis({ type: 'category', data: periodXAxis() }),
    series: []
  })
  const updateSeries = (currentData) => {
    populationChartOption.series = [
      getBarSerie({
        name: '户籍人口',
        labelShow: true,
        data: [
          {
            name: '本期',
            value: unref(currentData).registeredResidence || 0,
            itemStyle: { color: getColor('blue') }
          },
          {
            name: '上年同期',
            value: unref(currentData).registeredResidencePeriod || 0,
            itemStyle: { color: getColor('fadeBlue') }
          }
        ]
      }),
      getBarSerie({
        name: '常住人口',
        labelShow: true,
        data: [
          {
            name: '本期',
            value: unref(currentData).residentPopulation || 0,
            itemStyle: { color: getColor('green') }
          },
          {
            name: '上年同期',
            value: unref(currentData).residentPopulationPeriod || 0,
            itemStyle: { color: getColor('fadeGreen') }
          }
        ]
      })
    ]
  }
  useWatchOriginDataChange(originData, updateSeries)

  return {
    populationChartOption
  }
}
