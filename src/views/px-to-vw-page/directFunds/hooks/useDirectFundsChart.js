import { ref, onMounted } from '@vue/composition-api'
import {
  getBarSerie,
  getColor,
  getTooltipFormatter,
  getAxis,
  getTooltip
} from '@/hooks/useChart/getChartConfig.js'
import { directFundsXAxis } from '../model/data'
import computedPx from '@/utils/computedPx'

export const useDirectFundsChart = () => {
  // 直达资金 => 上级下达
  const directFundsOption = ref({
    grid: {
      left: computedPx(40),
      top: computedPx(120),
      right: computedPx(40),
      bottom: computedPx(24)
    },
    tooltip: {
      ...getTooltip(),
      textStyle: {
        fontSize: computedPx(16)
      },
      formatter: getTooltipFormatter('name')
    },
    yAxis: { axisLabel: { fontSize: 16 } },
    xAxis: getAxis({ type: 'category', data: directFundsXAxis(), splitLineShow: false, axisLabel: { fontSize: computedPx(16) } }),
    legend: {
      right: computedPx(16),
      top: computedPx(16),
      selectedMode: true,
      icon: 'roundRect',
      itemWidth: computedPx(12),
      itemHeight: computedPx(12),
      textStyle: {
        fontSize: computedPx(14)
      }
    },
    series: []
  })
  onMounted(() => {
    // 模拟异步请求 后续改为接口赋值
    setTimeout(() => {
      directFundsOption.value.series = [
        getBarSerie({
          name: '本期',
          barWidth: computedPx(20),
          color: getColor('blue'),
          data: [
            {
              name: '中央下达',
              value: parseInt(Math.random() * 100)
            },
            {
              name: '地方安排',
              value: parseInt(Math.random() * 100)
            }
          ]
        }),
        getBarSerie({
          name: '上年同期',
          barWidth: computedPx(20),
          color: getColor('green'),
          data: [
            {
              name: '中央下达',
              value: parseInt(Math.random() * 100)
            },
            {
              name: '地方安排',
              value: parseInt(Math.random() * 100)
            }
          ]
        })
      ]
    })
  })
  return {
    directFundsOption
  }
}
