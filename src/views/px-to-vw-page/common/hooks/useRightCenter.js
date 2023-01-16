import { onMounted, ref } from '@vue/composition-api'
import {
  getBarSerie,
  getTooltipFormatter
} from '@/views/main/financial-portrayal/model/getEchartsConfig'
import { getColor } from '@/hooks/useChart/getChartConfig'
import computedPx from '@/utils/computedPx'
import { monitoringByMof } from '@/api/frame/main/threePublicExpenses/index.js'

export const useRightCenter = (regulationClass) => {
  // serise列表
  const serisesList = [
    { name: '预警数', color: getColor('blue') },
    { name: '待整改', color: getColor('red') }
  ]

  const chartOption = ref({
    grid: {
      top: computedPx(80),
      right: computedPx(16),
      bottom: computedPx(16)
    },
    xAxis: {
      splitLine: { show: false },
      data: [],
      axisLabel: {
        rotate: 0
      }
    },
    tooltip: {
      formatter: getTooltipFormatter('seriesName', true)
    },
    legend: {
      right: computedPx(22),
      top: computedPx(10),
      selectedMode: true,
      icon: 'roundRect'
    },
    series: serisesList.map(item => {
      return getBarSerie({
        name: item.name,
        label: { show: false },
        color: item.color,
        barWidth: computedPx(12),
        data: []
      })
    })
  })

  /**
   * 请求接口 => 更新图表
   * @returns {Promise<void>}
   */
  const updateSeries = async () => {
    const { data } = await monitoringByMof({ regulationClass })
    const xAxisData = []
    const serieData = [[], [], []]
    chartOption.value.xAxis.axisLabel.rotate = data.length > 6 ? 30 : 0

    data?.forEach(item => {
      xAxisData.push(item.mofDivName)
      serieData[0].push({
        name: item.mofDivName,
        value: item.warnCount || 0
      })
      serieData[1].push({
        name: item.mofDivName,
        value: item.unRectifiedCount || 0
      })
    })

    chartOption.value.xAxis.data = xAxisData
    chartOption.value.series.forEach((item, index) => {
      item.data = [...serieData[index]]
    })
  }

  onMounted(() => {
    updateSeries()
  })

  return {
    chartOption
  }
}
