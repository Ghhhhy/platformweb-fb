import { onMounted } from '@vue/composition-api'
import {
  getColor,
  getTitle,
  getAngleAxis,
  getRadiusAxis,
  getPolar
} from '../model/getEchartsConfig'
export const usePolarBarChart = (echarts, config) => {
  const { selecterId } = config
  let chartInstance = null
  const options = {
    backgroundColor: getColor('white'),
    color: getColor(['blue', 'green']),
    title: getTitle(),
    angleAxis: getAngleAxis(),
    radiusAxis: getRadiusAxis(),
    polar: getPolar(),
    // 图例
    legend: { show: false },
    // 指示器
    tooltip: { show: false },
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
