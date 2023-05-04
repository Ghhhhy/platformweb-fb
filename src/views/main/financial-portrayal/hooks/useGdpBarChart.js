import { reactive, unref } from '@vue/composition-api'
import { getBarSerie, getColor, getTooltipFormatter, getAxis, getTooltip } from '../model/getEchartsConfig'
import { gdpYAxis } from '../model/data'
import { useWatchOriginDataChange } from './useWatchOriginDataChange'

export const useGdpBarChart = (originData) => {
  const gdpSpeedValues = reactive({
    current: {
      label: '本期增速',
      value: '0%'
    },
    last: {
      label: '上年同期增速',
      value: '0%'
    }
  })
  // 区域基本情况 => 国民生产总值（亿元）和增速
  const gdpChartOption = reactive({
    detailTitle: '国民生产总值（亿元）和增速',
    toolbox: {
      show: false,
      feature: {
        saveAsImage: {
          name: '国民生产总值（亿元）和增速'
        }
      }
    },
    tooltip: {
      ...getTooltip(),
      formatter: getTooltipFormatter('seriesName')
    },
    xAxis: getAxis({ type: 'value', data: [], splitLineShow: true }),
    yAxis: getAxis({ type: 'category', data: gdpYAxis(), inverse: true }),
    series: []
  })
  const updataSeries = (currentData) => {
    // gdpSpeedValues.current.value = `${unref(currentData).gdpGrowth || 0}%`
    gdpSpeedValues.last.value = `${unref(currentData).gdpGrowthPeriod || 0}%`
    // 汇总计算
    let lastTotal = unref(currentData).gdpFirst || 0 + unref(currentData).gdpSecond || 0 + unref(currentData).gdpThird || 0
    let currentTotal = unref(currentData).gdpFirstPeriod || 0 + unref(currentData).gdpSecondPeriod || 0 + unref(currentData).gdpThirdPeriod || 0
    gdpSpeedValues.current.value = lastTotal === 0 ? 0 + '%' : (currentTotal / lastTotal).toFixed(2) + '%'

    gdpChartOption.series = [
      getBarSerie({
        name: '本期',
        barWidth: 10,
        data: [
          {
            name: '第一产业',
            value: unref(currentData).gdpFirst || 0,
            itemStyle: { color: getColor('blue') }
          },
          {
            name: '第二产业',
            value: unref(currentData).gdpSecond || 0,
            itemStyle: { color: getColor('blue') }
          },
          {
            name: '第三产业',
            value: unref(currentData).gdpThird || 0,
            itemStyle: { color: getColor('blue') }
          }
        ]
      }),
      getBarSerie({
        name: '上年同期',
        barWidth: 10,
        data: [
          {
            name: '第一产业',
            value: unref(currentData).gdpFirstPeriod || 0,
            itemStyle: { color: getColor('fadeBlue') }
          },
          {
            name: '第二产业',
            value: unref(currentData).gdpSecondPeriod || 0,
            itemStyle: { color: getColor('fadeBlue') }
          },
          {
            name: '第三产业',
            value: unref(currentData).gdpThirdPeriod || 0,
            itemStyle: { color: getColor('fadeBlue') }
          }
        ]
      })
    ]
  }
  useWatchOriginDataChange(originData, updataSeries)

  return {
    gdpChartOption,
    gdpSpeedValues
  }
}
