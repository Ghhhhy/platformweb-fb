import { onBeforeUnmount, onMounted, ref } from '@vue/composition-api'
import {
  getLineSerie,
  getTooltipFormatter,
  getDataZoom
} from '@/views/main/financial-portrayal/model/getEchartsConfig'
import { getColor } from '@/hooks/useChart/getChartConfig'
import computedPx from '@/utils/computedPx'
import { monitoringBySubject } from '@/api/frame/main/threePublicExpenses/index.js'

export const useRightTop = (regulationClass) => {
  // serise列表
  const serisesList = [
    { name: '', color: getColor('blue') }
  ]

  // 横坐标最多显示格式
  const maxValueSpan = 15

  /**
   * 计算dataZoom个数
   * @return {number}
   */
  function computedSpan() {
    const innerWidth = window.innerWidth
    if (innerWidth >= 1920) {
      return maxValueSpan - 1
    } else if (innerWidth >= 1440 && innerWidth < 1920) {
      return maxValueSpan - 2
    } else if (innerWidth < 1440) {
      return maxValueSpan - 3
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
      data: []
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
      return getLineSerie({
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
    let { data } = await monitoringBySubject({ regulationClass })
    // 临时数据
    if (regulationClass === '0204') {
      data = [
        {
          'warnCount': 10,
          'depBgtEcoName': 'Jan'
        },
        {
          'warnCount': 0,
          'depBgtEcoName': 'Feb'
        },
        {
          'warnCount': 0,
          'depBgtEcoName': 'Mar'
        },
        {
          'warnCount': 10,
          'depBgtEcoName': 'Apr'
        },
        {
          'warnCount': 0,
          'depBgtEcoName': 'May'
        },
        {
          'warnCount': 0,
          'depBgtEcoName': 'Jun'
        },
        {
          'warnCount': 10,
          'depBgtEcoName': 'Jul'
        },
        {
          'warnCount': 0,
          'depBgtEcoName': 'Aug'
        },
        {
          'warnCount': 0,
          'depBgtEcoName': 'Sep'
        },
        {
          'warnCount': 10,
          'depBgtEcoName': 'Oct'
        },
        {
          'warnCount': 0,
          'depBgtEcoName': 'Nov'
        },
        {
          'warnCount': 10,
          'depBgtEcoName': 'Dec'
        }
      ]
    }
    // const { data } = await monitoringBySubject({ regulationClass })
    const xAxisData = []
    const serieData = [[], [], []]
    data?.forEach(item => {
      xAxisData.push(item.depBgtEcoName)
      serieData[0].push({
        name: item.depBgtEcoName,
        value: item.warnCount || 0
      })
      serieData[1].push({
        name: item.depBgtEcoName,
        value: item.rectifiedCount || 0
      })
      serieData[2].push({
        name: item.depBgtEcoName,
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