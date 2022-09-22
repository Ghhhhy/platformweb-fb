import { onMounted, ref } from '@vue/composition-api'
import {
  getAxisLabelFormatter,
  getBarSerie,
  getDataZoom,
  getTooltipFormatter
} from '@/views/main/financial-portrayal/model/getEchartsConfig'
import { getColor } from '../../warningOverview/modal/getChartConfig'
import { scientificNotation } from '@/utils/scientificNotation'
import { queryAnalysisByRule } from '@/api/frame/main/subjectAnalysis'

export const useAdminDivBar = () => {
  const chartOption = ref({
    grid: {
      bottom: 60,
      left: 46,
      right: 40
    },
    dataZoom: [getDataZoom({
      type: 'slider',
      bottom: 25,
      minValueSpan: 5,
      maxValueSpan: 5,
      moveHandleSize: 15
    })],
    yAxis: [
      { name: '累计违规数量', nameLocation: 'middle', alignTicks: true, nameGap: 20, formatter: value => scientificNotation(value) },
      { name: '已处理违规情况', position: 'right', alignTicks: true, nameRotate: 90, nameLocation: 'middle', nameGap: 20 }
    ],
    xAxis: {
      splitLine: { show: false },
      data: [],
      axisLabel: {
        formatter: getAxisLabelFormatter(7, { isSlice: true, suffix: '...' })
      }
    },
    tooltip: {
      formatter: getTooltipFormatter('seriesName', true)
    },
    legend: {
      right: 24,
      top: 20,
      icon: 'roundRect'
    },
    series: [
      getBarSerie({
        name: '违规数量',
        label: { show: false },
        itemStyle: {
          borderRadius: 5,
          color: '#D0DFFD'
        },
        barWidth: 50,
        z: 1,
        data: []
      }),
      getBarSerie({
        name: '已处理违规',
        label: {
          show: true,
          position: 'top',
          formatter: value => {
            return value.data?.processingProgress
          }
        },
        itemStyle: {
          borderRadius: 5,
          borderWidth: 8,
          borderColor: 'transparent',
          color: getColor('blue')
        },
        barWidth: 50,
        barGap: '-100%',
        z: 2,
        data: []
      })
    ]
  })

  /**
   * 请求接口 => 更新图表
   * @returns {Promise<void>}
   */
  const updateSeries = async () => {
    const { data } = await queryAnalysisByRule()
    const xAxisData = []
    const serieData = [[], [], [], [], []]
    data?.forEach(item => {
      xAxisData.push(item.fiRuleName)
      serieData[0].push({
        name: item.fiRuleName,
        value: item.warnCount || 0
      })
      serieData[1].push({
        name: item.fiRuleName,
        value: item.warnHandleCount || 0,
        ...item
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
