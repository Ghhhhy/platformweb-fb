import { onMounted, ref, watch } from '@vue/composition-api'
import {
  getBarSerie,
  getAxis
} from '@/views/main/financial-portrayal/model/getEchartsConfig'
import { getColor } from '@/hooks/useChart/getChartConfig'
import computedPx from '@/utils/computedPx'
import { warningTop5ByCategory } from '@/api/frame/main/specialMonitor/index.js'

export const useRightCenter = (selectValue) => {
  const chartOption = ref({
    grid: {
      top: computedPx(80),
      right: computedPx(16),
      bottom: computedPx(16)
    },
    xAxis: getAxis({
      type: 'value',
      data: [],
      splitLineShow: true,
      boundaryGap: true,
      axisLabel: {
        rotate: 30
      }
    }),
    yAxis: getAxis({
      type: 'category',
      data: [],
      inverse: true,
      boundaryGap: true,
      axisLabel: {
        interval: 0,
        formatter: function (params) {
          var newParamsName = ''
          const paramsNameNumber = params.length
          const provideNumber = 6 // 单行显示文字个数
          const rowNumber = Math.ceil(paramsNameNumber / provideNumber)
          if (paramsNameNumber > provideNumber) {
            for (let p = 0; p < rowNumber; p++) {
              var tempStr = ''
              var start = p * provideNumber
              var end = start + provideNumber
              if (p === rowNumber - 1) {
                tempStr = params.substring(start, paramsNameNumber)
              } else {
                tempStr = params.substring(start, end) + '\n'
              }
              newParamsName += tempStr
            }
          } else {
            newParamsName = params
          }
          return newParamsName
        }
      }
    }),
    tooltip: {
      // formatter: getTooltipFormatter('seriesName', false)
    },
    legend: {
      right: computedPx(22),
      top: computedPx(10),
      selectedMode: true,
      icon: 'roundRect'
    },
    series: getBarSerie({
      label: { show: false },
      color: getColor('blue'),
      barWidth: computedPx(12),
      data: []
    })
  })

  /**
   * 请求接口 => 更新图表
   * @returns {Promise<void>}
   */
  const updateSeries = async () => {
    const formData = new FormData()
    formData.append('category', selectValue.value)
    const { data } = await warningTop5ByCategory(formData)
    const yAxisData = []
    const serieData = []

    data?.forEach(item => {
      yAxisData.push(item.rankName)
      serieData.push({
        name: item.rankName,
        value: item.rankNum
      })
    })
    chartOption.value.yAxis.data = yAxisData
    chartOption.value.series.data = serieData
    console.log(chartOption.value.yAxis, 'yAxis')
  }

  onMounted(() => {
    updateSeries()
  })
  watch(selectValue, () => {
    updateSeries()
  })
  return {
    chartOption
  }
}
