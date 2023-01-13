import { watch, onMounted, onBeforeUnmount, unref, ref } from '@vue/composition-api'
import * as echarts from 'echarts'
import {
  getAxis, getAxisLabel,
  getColor, getGrid, getLegend,
  getTitle,
  getTooltip,
  getTooltipFormatter
} from '@/views/main/financial-portrayal/model/getEchartsConfig'

export const useChart = (option = {}) => {
  const initOptions = ref({
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
  })

  const getRandom = (digit = 6) => {
    return String(Math.random()).split('.')[1].substring(2, digit + 2)
  }
  const chartId = `chart${getRandom()}`

  let chartInstance = null

  // 初始化
  const init = () => {
    chartInstance = echarts.init(
      document.getElementById(chartId),
      null,
      {
        // 渲染成svg 支持放大清晰度不变
        renderer: 'svg'
      }
    )
    setOption(initOptions)
  }

  const getChartInstance = () => {
    return chartInstance
  }

  const setOption = (option) => {
    chartInstance?.setOption(unref(option))
  }

  function resize() {
    chartInstance?.resize?.()
  }

  watch(option, () => {
    setOption(option)
  }, { deep: true, immediate: true })

  onMounted(() => {
    init()
    window.addEventListener('resize', resize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
  })

  return {
    chartId,
    setOption,
    getChartInstance,
    resize
  }
}
