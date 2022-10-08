import { useBarChart } from '@/views/main/financial-portrayal/hooks/useBarChart'
import { watch, unref } from '@vue/composition-api'
import * as echarts from 'echarts'

export const useChart = (option, observeNode = null) => {
  const getRandom = (digit = 6) => {
    return String(Math.random()).split('.')[1].substring(2, digit + 2)
  }
  const chartId = `chart${getRandom()}`
  const { setOption, getChartInstance, resize } = useBarChart(
    echarts,
    { selecterId: chartId },
    observeNode
  )

  watch(option, () => {
    setOption?.(unref(option))
  }, { deep: true, immediate: true })

  return {
    chartId,
    setOption,
    getChartInstance,
    resize
  }
}
