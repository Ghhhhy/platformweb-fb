import { onMounted, ref, unref, watch } from '@vue/composition-api'
import {
  getBarSerie,
  getTooltipFormatter,
  getAxisLabelFormatter,
  getDataZoom
} from '@/views/main/financial-portrayal/model/getEchartsConfig'
import { getColor } from '../../warningOverview/modal/getChartConfig'
import { scientificNotation } from '@/utils/scientificNotation'
import { getRuleList } from '../modal/data'
import { queryAnalysisByWarnLevel } from '@/api/frame/main/subjectAnalysis'

export const useWarningChart = (selectValue) => {
  // serise列表
  const serisesList = [
    { name: '黄色预警', color: getColor('yellow') },
    { name: '橙色预警', color: getColor('secondOrange') },
    { name: '红色预警', color: getColor('red') },
    { name: '蓝色预警', color: getColor('blue') }
  ]

  const chartOption = ref({
    grid: {
      bottom: 60
    },
    dataZoom: [getDataZoom({
      type: 'slider',
      bottom: 25,
      minValueSpan: 5,
      maxValueSpan: 5,
      moveHandleSize: 15
    })],
    xAxis: {
      splitLine: { show: false },
      data: [...getRuleList()],
      axisLabel: {
        formatter: getAxisLabelFormatter(7, { isSlice: true, suffix: '...' })
      }
    },
    yAxis: {
      axisLabel: {
        formatter: value => {
          return scientificNotation(value)
        }
      }
    },
    tooltip: {
      formatter: getTooltipFormatter('seriesName', true)
    },
    legend: {
      right: 225,
      top: 20,
      icon: 'roundRect'
    },
    series: serisesList.map(item => {
      return getBarSerie({
        name: item.name,
        stack: 'warningChart',
        label: { show: false },
        itemStyle: {
          color: item.color
        },
        barWidth: 52,
        data: []
      })
    })
  })

  /**
   * 请求接口 => 更新图表
   * @returns {Promise<void>}
   */
  const updateSeries = async () => {
    const { data } = await queryAnalysisByWarnLevel({ regulationType: unref(selectValue) })
    const xAxisData = []
    const serieData = [[], [], [], [], []]
    data?.forEach(item => {
      xAxisData.push(item.fiRuleName)
      serieData[0].push({
        name: item.fiRuleName,
        value: item.warnCount1 || 0
      })
      serieData[1].push({
        name: item.fiRuleName,
        value: item.warnCount2 || 0
      })
      serieData[2].push({
        name: item.fiRuleName,
        value: item.warnCount3 || 0
      })
      serieData[3].push({
        name: item.fiRuleName,
        value: item.warnCount4 || 0
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

  watch(selectValue, () => {
    updateSeries()
  })
  return {
    chartOption
  }
}
