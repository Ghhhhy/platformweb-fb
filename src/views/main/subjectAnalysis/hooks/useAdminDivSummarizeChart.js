import { onMounted, ref } from '@vue/composition-api'
import * as echarts from 'echarts'
import { getLineSerie, getTooltipFormatter } from '@/views/main/financial-portrayal/model/getEchartsConfig'
import { scientificNotation } from '@/utils/scientificNotation'
import { getColor } from '../../warningOverview/modal/getChartConfig'
import { queryAnalysisByMofSummary } from '@/api/frame/main/subjectAnalysis'
export const useAdminDivSummarizeChart = () => {
  // serise列表
  const serisesList = [
    { name: '黄色预警', color: getColor('yellow') },
    { name: '橙色预警', color: getColor('secondOrange') },
    { name: '红色预警', color: getColor('red') },
    { name: '蓝色预警', color: getColor('thirdBlue') }
  ]

  // 蓝色预警 特有的区域填充样式
  const areaStyle = {
    color: new echarts.graphic.LinearGradient(
      0,
      0,
      0,
      1,
      [
        {
          offset: 0,
          color: 'rgba(130, 162, 254, 0.5)'
        },
        {
          offset: 0.8,
          color: 'rgba(130, 162, 254, 0)'
        }
      ],
      false
    )
  }

  // chart-option
  const chartOption = ref({
    grid: {
      bottom: 20,
      right: 80
    },
    xAxis: {
      splitLine: { show: false },
      data: []
    },
    yAxis: {
      axisLabel: {
        formatter: value => {
          return scientificNotation(value)
        }
      }
    },
    tooltip: {
      formatter: getTooltipFormatter('seriesName')
    },
    legend: {
      right: 24,
      top: 20,
      icon: 'roundRect'
    },
    series: serisesList.map(item => {
      return getLineSerie({
        name: item.name,
        label: { show: false },
        itemStyle: {
          color: item.color
        },
        lineStyle: {
          wdith: 2
        },
        endLabel: {
          show: true,
          color: item.color,
          fontSize: 14,
          distance: 24,
          formatter: params => {
            return params.seriesName
          }
        },
        areaStyle: item.name === '蓝色预警' ? { ...areaStyle } : {},
        data: []
      })
    })
  })

  /**
   * 请求接口 -> 更新图表
   * @returns {Promise<void>}
   */
  const updateSeries = async () => {
    const { data } = await queryAnalysisByMofSummary()
    const xAxisData = []
    const serieData = [[], [], [], [], []]
    data?.forEach(item => {
      xAxisData.push(item.mofDivName)
      serieData[0].push({
        name: item.mofDivName,
        value: item.warnCount1 || 0
      })
      serieData[1].push({
        name: item.mofDivName,
        value: item.warnCount2 || 0
      })
      serieData[2].push({
        name: item.mofDivName,
        value: item.warnCount3 || 0
      })
      serieData[3].push({
        name: item.mofDivName,
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
  return {
    chartOption
  }
}
