import { onMounted, ref } from '@vue/composition-api'
import {
  getLineSerie,
  getTooltipFormatter,
  getAxisLabelFormatter,
  getDataZoom
} from '@/views/main/financial-portrayal/model/getEchartsConfig'
import { getColor } from '@/hooks/useChart/getChartConfig'
// import { queryAnalysisByWarnLevel } from '@/api/frame/main/subjectAnalysis'

export const useLeftCenter = () => {
  // serise列表
  const serisesList = [
    { name: '预警数', color: getColor('blue') },
    { name: '已整改', color: getColor('green') },
    { name: '待整改', color: getColor('red') }
  ]

  const axisData = ['超预算', '无预算', '资金使用规范性', '资金使用合理性', '错支', '进度预算', '突击花钱', '预算会计凭证不能修改', '财务核算和财政不一致']

  /**
   * 计算dataZoom个数
   * @return {number}
   */
  function computedSpan() {
    const innerWidth = window.innerWidth
    if (innerWidth >= 1920) {
      return 9
    } else if (innerWidth >= 1440 && innerWidth < 1920) {
      return 7
    } else if (innerWidth < 1440) {
      return 6
    }
  }

  const chartOption = ref({
    grid: {
      top: 80,
      right: 40,
      bottom: 20
    },
    dataZoom: [getDataZoom({
      type: 'slider',
      bottom: 4,
      minValueSpan: computedSpan(),
      maxValueSpan: computedSpan(),
      moveHandleSize: 15,
      height: 8
    })],
    xAxis: {
      splitLine: { show: false },
      data: axisData,
      axisLabel: {
        formatter: getAxisLabelFormatter(4, { isSlice: false, suffix: '...' })
      }
    },
    tooltip: {
      formatter: getTooltipFormatter('seriesName', true)
    },
    legend: {
      right: 22,
      top: 16,
      selectedMode: true,
      icon: 'roundRect'
    },
    series: []
  })

  /**
   * 请求接口 => 更新图表
   * @returns {Promise<void>}
   */
  const updateSeries = async () => {
    chartOption.value.series = serisesList.map(item => {
      return getLineSerie({
        name: item.name,
        label: { show: false },
        symbol: 'emptyCircle',
        showSymbol: true,
        symbolSize: 4,
        color: item.color,
        lineStyle: {
          width: 2
        },
        endLabel: {
          show: true,
          color: item.color,
          fontSize: 14,
          distance: 10,
          formatter: params => {
            return params.seriesName
          }
        },
        data: axisData.map(item => {
          return {
            name: item,
            value: parseInt(Math.random() * 100)
          }
        })
      })
    })
    chartOption.value.xAxis.data = axisData
    // const { data } = await queryAnalysisByWarnLevel()
    // const xAxisData = []
    // const serieData = [[], [], [], [], []]
    // data?.forEach(item => {
    //   xAxisData.push(item.fiRuleName)
    //   serieData[0].push({
    //     name: item.fiRuleName,
    //     value: item.warnCount1 || 0
    //   })
    //   serieData[1].push({
    //     name: item.fiRuleName,
    //     value: item.warnCount2 || 0
    //   })
    //   serieData[2].push({
    //     name: item.fiRuleName,
    //     value: item.warnCount3 || 0
    //   })
    //   serieData[3].push({
    //     name: item.fiRuleName,
    //     value: item.warnCount4 || 0
    //   })
    // })
    //
    // chartOption.value.xAxis.data = xAxisData
    // chartOption.value.series.forEach((item, index) => {
    //   item.data = [...serieData[index]]
    // })
  }

  onMounted(() => {
    updateSeries()
  })

  return {
    chartOption
  }
}
