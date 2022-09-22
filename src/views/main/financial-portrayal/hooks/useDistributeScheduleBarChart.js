import { reactive, onMounted } from '@vue/composition-api'
import {
  getBarSerie,
  getColor,
  getTooltipFormatter,
  getAxis,
  getTooltip,
  getPictorialBarSymbol
} from '../model/getEchartsConfig'
import { directFundsXAxis } from '../model/data'

export const useDistributeScheduleBarChart = () => {
  // 直达资金 => 上级下达
  const distributeScheduleBarChart = reactive({
    detailTitle: '分配进度',
    showDot: true,
    tooltip: {
      ...getTooltip(),
      formatter: getTooltipFormatter('name')
    },
    xAxis: getAxis({ type: 'category', data: directFundsXAxis() }),
    series: [],
    // 隐藏原始legend
    legend: {
      show: false
    },
    // 自定义legend
    customLegend: [
      {
        label: '中央下达',
        color: getColor('secondBlue')
      },
      {
        label: '地方安排',
        color: getColor('secondOrange')
      }
    ]
  })
  onMounted(() => {
    // 模拟异步请求 后续改为接口赋值
    setTimeout(() => {
      distributeScheduleBarChart.series = [
        getBarSerie({
          type: 'pictorialBar',
          name: '中央下达',
          barWidth: 102,
          z: 2,
          symbol: getPictorialBarSymbol(),
          data: [
            {
              name: '本期',
              value: 700,
              itemStyle: { color: getColor('secondBlue') }
            },
            {
              name: '本期',
              value: 1390,
              itemStyle: { color: getColor('secondOrange') }
            }
          ]
        }),
        getBarSerie({
          type: 'pictorialBar',
          name: '地方安排',
          barWidth: 102,
          symbol: getPictorialBarSymbol(),
          barGap: '-76%',
          z: 1,
          data: [
            {
              name: '上年同期',
              value: 1200,
              itemStyle: { color: getColor('secondFadeBlue') }
            },
            {
              name: '上年同期',
              value: 800,
              itemStyle: { color: getColor('secondFadeOrange') }
            }
          ]
        })
      ]
    })
  })
  return {
    distributeScheduleBarChart
  }
}
