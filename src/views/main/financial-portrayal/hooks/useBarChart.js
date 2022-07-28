import { onMounted } from '@vue/composition-api'
import {
  getLegend,
  getAxis,
  getGrid,
  getTooltip,
  getTooltipFormatter,
  getColor,
  getTitle,
  getAxisLabel
} from '../model/getEchartsConfig'
export const useBarChart = (echarts, config) => {
  const { selecterId } = config
  let chartInstance = null
  const options = {
    backgroundColor: getColor('white'),
    color: getColor(['blue', 'green']),
    title: getTitle(),
    // 指示器
    tooltip: {
      ...getTooltip(),
      formatter: getTooltipFormatter()
    },
    // 位置
    grid: getGrid({ left: 16, top: 90, right: 16, bottom: 10 }),
    // 图例
    legend: getLegend(),
    // x轴
    xAxis: {
      ...getAxis({ type: 'category', splitLineShow: true }),
      axisLabel: getAxisLabel()
    },
    // y轴
    yAxis: {
      ...getAxis({ splitLineShow: true }),
      axisLabel: getAxisLabel()
    },
    series: []
  }

  // 初始化
  const init = () => {
    chartInstance = echarts.init(document.getElementById(selecterId), null, {
      // 渲染成svg 支持放大清晰度不变
      renderer: 'svg'
    })
    chartInstance.setOption(options)
  }

  const getChartInstance = () => {
    return chartInstance
  }

  const setOption = (option) => {
    chartInstance?.setOption(option)
  }

  onMounted(() => {
    init()
  })

  return {
    getChartInstance,
    setOption
  }
}
