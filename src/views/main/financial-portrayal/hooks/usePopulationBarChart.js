import { reactive, unref } from '@vue/composition-api'
import { getBarSerie, getColor, getTooltipFormatter, getAxis, getTooltip } from '../model/getEchartsConfig'
import { populationXAxis } from '../model/data'
import { useWatchOriginDataChange } from './useWatchOriginDataChange'

export const usePopulationBarChart = (originData) => {
  // 区域基本情况 => 人口
  const populationChartOption = reactive({
    detailTitle: '人口（万人）',
    toolbox: {
      show: false,
      feature: {
        saveAsImage: {
          name: '人口（万人）'
        }
      }
    },
    tooltip: {
      ...getTooltip(),
      formatter: getTooltipFormatter('seriesName')
    },
    xAxis: getAxis({ type: 'category', data: populationXAxis() }),
    legend: {
      show: false
    },
    // 自定义legend
    customLegend: [
      {
        label: '户籍人口',
        color: getColor('blue')
      },
      {
        label: '常住人口',
        color: getColor('green')
      }
    ],
    series: []
  })
  const updateSeries = (currentData) => {
    populationChartOption.series = [
      getBarSerie({
        name: '本期',
        labelShow: true,
        data: [
          {
            name: '户籍人口',
            value: unref(currentData).registeredResidence || 0,
            itemStyle: { color: getColor('blue') }
          },
          {
            name: '常住人口',
            value: unref(currentData).residentPopulation || 0,
            itemStyle: { color: getColor('green') }
          }
        ]
      }),
      getBarSerie({
        name: '上年同期',
        labelShow: true,
        data: [
          {
            name: '户籍人口',
            value: unref(currentData).registeredResidencePeriod || 0,
            itemStyle: { color: getColor('fadeBlue') }
          },
          {
            name: '常住人口',
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
