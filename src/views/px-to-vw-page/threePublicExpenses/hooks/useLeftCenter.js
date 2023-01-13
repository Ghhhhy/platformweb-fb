import { onMounted, ref, onBeforeUnmount } from '@vue/composition-api'
import {
  getLineSerie,
  getTooltipFormatter,
  getAxisLabelFormatter,
  getDataZoom
} from '@/views/main/financial-portrayal/model/getEchartsConfig'
import { getColor } from '@/hooks/useChart/getChartConfig'
import computedPx from '@/utils/computedPx'
import { monitoringByRuleType } from '@/api/frame/main/threePublicExpenses/index.js'

export const useLeftCenter = () => {
  // serise列表
  const serisesList = [
    { name: '预警数', color: getColor('blue') },
    { name: '已整改', color: getColor('green') },
    { name: '待整改', color: getColor('red') }
  ]

  // 横坐标最多显示格式 （echart中实际会对应10）
  const maxValueSpan = 9

  /**
   * 计算dataZoom个数
   * @return {number}
   */
  function computedSpan() {
    const innerWidth = window.innerWidth
    if (innerWidth >= 1920) {
      return maxValueSpan - 1
    } else if (innerWidth >= 1440 && innerWidth < 1920) {
      return maxValueSpan - 3
    } else if (innerWidth < 1440) {
      return maxValueSpan - 4
    }
  }

  const chartOption = ref({
    grid: {
      top: computedPx(80),
      right: computedPx(24),
      bottom: computedPx(20)
    },
    dataZoom: [getDataZoom({
      type: 'slider',
      bottom: computedPx(4),
      minValueSpan: computedSpan(),
      maxValueSpan: computedSpan(),
      moveHandleSize: computedPx(15),
      height: computedPx(8)
    })],
    xAxis: {
      splitLine: { show: false },
      data: [],
      axisLabel: {
        formatter: getAxisLabelFormatter(4, { isSlice: false, suffix: '...' })
      }
    },
    tooltip: {
      formatter: getTooltipFormatter('seriesName', true)
    },
    legend: {
      right: computedPx(22),
      top: computedPx(16),
      selectedMode: true,
      icon: 'roundRect'
    },
    series: serisesList.map(item => {
      return getLineSerie({
        name: item.name,
        label: { show: false },
        symbol: 'emptyCircle',
        showSymbol: true,
        symbolSize: computedPx(4),
        color: item.color,
        lineStyle: {
          width: computedPx(2)
        },
        data: []
      })
    })
  })

  /**
   * 请求接口 => 更新图表
   * @returns {Promise<void>}
   */
  const updateSeries = async () => {
    const { data } = await monitoringByRuleType()
    const xAxisData = []
    const serieData = [[], [], []]
    data?.forEach(item => {
      xAxisData.push(item.ruleTypeName)
      serieData[0].push({
        name: item.ruleTypeName,
        value: item.warnCount || 0
      })
      serieData[1].push({
        name: item.ruleTypeName,
        value: item.rectifiedCount || 0
      })
      serieData[2].push({
        name: item.ruleTypeName,
        value: item.unRectifiedCount || 0
      })
    })

    chartOption.value.xAxis.data = xAxisData
    chartOption.value.series.forEach((item, index) => {
      item.data = [...serieData[index]]
    })
  }

  /**
   * 更新dataZoom 和底部位置
   */
  const updateDataZoom = () => {
    if (computedSpan() === maxValueSpan - 1) {
      chartOption.value.grid.bottom = computedPx(16)
      chartOption.value.dataZoom = []
    } else {
      chartOption.value.grid.bottom = computedPx(20)
      chartOption.value.dataZoom = [getDataZoom({
        type: 'slider',
        bottom: computedPx(4),
        minValueSpan: computedSpan(),
        maxValueSpan: computedSpan(),
        moveHandleSize: computedPx(15),
        height: computedPx(8)
      })]
    }
  }

  onMounted(() => {
    updateDataZoom()
    updateSeries()
    window.addEventListener('resize', updateDataZoom)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateDataZoom)
  })

  return {
    chartOption
  }
}
