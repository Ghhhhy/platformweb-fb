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
import { throttle } from '@/utils/throttle'

/**
 * 图表
 * @param echarts
 * @param config
 * @param observeNode 需要监听的节点变化 resize图表
 * @returns {{setOption: setOption, getChartInstance: (function(): null), resize: (function(): void)}}
 */
export const useBarChart = (echarts, config, observeNode = null) => {
  const { selecterId } = config
  let chartInstance = null
  const options = {
    backgroundColor: getColor('white'),
    color: getColor(['blue', 'green']),
    title: getTitle(),
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
        }
      }
    },
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

  const resize = throttle(() => {
    chartInstance?.resize()
  }, 1000)

  /**
   * 监听节点style
   */
  const observeResize = () => {
    // console.log(document.querySelector(observeNode))
    const selecter = observeNode
      ? document.querySelector(observeNode)
      : document.querySelector('.nav')
    if (!selecter) return
    const observer = new MutationObserver(resize)
    observer.observe(selecter, {
      attributes: true,
      attributeFilter: ['style']
    })
  }

  onMounted(() => {
    init()
    observeResize()
    setTimeout(() => {
      chartInstance?.resize()
    })
  })

  return {
    getChartInstance,
    setOption,
    resize
  }
}
