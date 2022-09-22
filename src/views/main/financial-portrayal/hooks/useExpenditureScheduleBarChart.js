import { reactive, onMounted } from '@vue/composition-api'
import { getBarSerie, getColor, getTooltipFormatter, getAxis, getTooltip } from '../model/getEchartsConfig'
import { directFundsXAxis } from '../model/data'

export const useExpenditureScheduleBarChart = () => {
  // 直达资金 => 支出金额
  const expenditureScheduleBarChart = reactive({
    detailTitle: '支出进度',
    showDot: true,
    tooltip: {
      ...getTooltip(),
      formatter: getTooltipFormatter('seriesName')
    },
    xAxis: getAxis({ type: 'value', data: [], splitLineShow: true }),
    yAxis: getAxis({ type: 'category', data: directFundsXAxis(), inverse: true }),
    legend: {
      show: false
    },
    // 自定义legend
    customLegend: [
      {
        label: '本期',
        color: getColor('blue')
      },
      {
        label: '上年同期',
        color: getColor('fadeBlue')
      }
    ],
    series: []
  })
  onMounted(() => {
    // 模拟异步请求 后续改为接口赋值
    setTimeout(() => {
      expenditureScheduleBarChart.series = [
        getBarSerie({
          name: '本期',
          barWidth: 16,
          data: [
            {
              name: '中央下达',
              value: 200,
              itemStyle: { color: getColor('blue') }
            },
            {
              name: '地方安排',
              value: 300,
              itemStyle: { color: getColor('blue') }
            }
          ]
        }),
        getBarSerie({
          name: '上年同期',
          barWidth: 16,
          data: [
            {
              name: '中央下达',
              value: 200,
              itemStyle: { color: getColor('fadeBlue') }
            },
            {
              name: '地方安排',
              value: 700,
              itemStyle: { color: getColor('fadeBlue') }
            }
          ]
        })
      ]
    })
  })
  return {
    expenditureScheduleBarChart
  }
}
