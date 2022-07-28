import { reactive, onMounted } from '@vue/composition-api'
import { getBarSerie, getColor, getTooltipFormatter, getAxis, getTooltip } from '../model/getEchartsConfig'
import { gdpYAxis } from '../model/data'

export const useGdpBarChart = () => {
  const gdpSpeedValues = reactive({
    current: {
      label: '本期增速',
      value: '9.17%'
    },
    last: {
      label: '上年同期增速',
      value: '9.17%'
    }
  })
  // 区域基本情况 => 国民生产总值（亿元）和增速
  const gdpChartOption = reactive({
    detailTitle: '国民生产总值（亿元）和增速',
    tooltip: {
      ...getTooltip(),
      formatter: getTooltipFormatter('seriesName')
    },
    xAxis: getAxis({ type: 'value', data: [], splitLineShow: true }),
    yAxis: getAxis({ type: 'category', data: gdpYAxis(), inverse: true }),
    series: []
  })
  onMounted(() => {
    // 模拟异步请求 后续改为接口赋值
    setTimeout(() => {
      gdpChartOption.series = [
        getBarSerie({
          name: '本期',
          barWidth: 10,
          data: [
            {
              name: '第一产业',
              value: 200,
              itemStyle: { color: getColor('blue') }
            },
            {
              name: '第二产业',
              value: 300,
              itemStyle: { color: getColor('blue') }
            },
            {
              name: '第三产业',
              value: 300,
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
              value: 200,
              itemStyle: { color: getColor('fadeBlue') }
            },
            {
              name: '第二产业',
              value: 700,
              itemStyle: { color: getColor('fadeBlue') }
            },
            {
              name: '第三产业',
              value: 100,
              itemStyle: { color: getColor('fadeBlue') }
            }
          ]
        })
      ]
    })
  })
  return {
    gdpChartOption,
    gdpSpeedValues
  }
}
