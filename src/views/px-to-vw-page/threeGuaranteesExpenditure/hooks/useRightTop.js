import { onMounted, ref } from '@vue/composition-api'
import {
  getLineSerie,
  getTooltipFormatter
} from '@/views/main/financial-portrayal/model/getEchartsConfig'
import { getColor } from '@/hooks/useChart/getChartConfig'
import computedPx from '@/utils/computedPx'
// import { queryAnalysisByWarnLevel } from '@/api/frame/main/subjectAnalysis'

export const useRightTop = () => {
  // serise列表
  const serisesList = [
    { name: '预警数', color: getColor('blue') },
    { name: '已整改', color: getColor('green') },
    { name: '待整改', color: getColor('red') }
  ]

  const axisData = ['工资', '运转', '民生']

  const chartOption = ref({
    grid: {
      top: computedPx(80),
      right: computedPx(24),
      bottom: computedPx(16)
    },
    xAxis: {
      splitLine: { show: false },
      data: axisData
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
        symbolSize: computedPx(4),
        color: item.color,
        lineStyle: {
          width: computedPx(2)
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
