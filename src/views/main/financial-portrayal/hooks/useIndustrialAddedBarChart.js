import { reactive, unref } from '@vue/composition-api'
import { getBarSerie, getColor, getTooltipFormatter, getAxis, getTooltip } from '../model/getEchartsConfig'
import { industrialAddedXAxis } from '../model/data'
import { useWatchOriginDataChange } from './useWatchOriginDataChange'

export const useIndustrialAddedBarChart = (originData) => {
  // 区域基本情况 => 工业增加值
  const industrialAddedChartOption = reactive({
    detailTitle: '工业增加值',
    tooltip: {
      ...getTooltip(),
      formatter: getTooltipFormatter('name')
    },
    xAxis: getAxis({ type: 'category', data: industrialAddedXAxis() }),
    series: []
  })
  const updataSeries = (currentData) => {
    industrialAddedChartOption.series = [
      getBarSerie({
        name: '规上工业增加值',
        labelShow: true,
        data: [
          {
            name: '本期',
            value: unref(currentData).industrialOutput || 0,
            itemStyle: { color: getColor('blue') }
          },
          {
            name: '本期',
            value: unref(currentData).risingOutput || 0,
            itemStyle: { color: getColor('green') }
          }
        ]
      }),
      getBarSerie({
        name: '战略性新兴产业增加值',
        labelShow: true,
        data: [
          {
            name: '上年同期',
            value: unref(currentData).industrialOutputPeriod || 0,
            itemStyle: { color: getColor('fadeBlue') }
          },
          {
            name: '上年同期',
            value: unref(currentData).risingOutputPeriod || 0,
            itemStyle: { color: getColor('fadeGreen') }
          }
        ]
      })
    ]
  }
  useWatchOriginDataChange(originData, updataSeries)

  return {
    industrialAddedChartOption
  }
}
