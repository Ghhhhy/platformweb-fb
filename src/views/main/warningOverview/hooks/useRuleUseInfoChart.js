import { onMounted, ref } from '@vue/composition-api'
import { menus } from '../modal/data'
import { getBarSerie, getLineSerie, getTooltipFormatter } from '@/views/main/financial-portrayal/model/getEchartsConfig'
import { getColor } from '../modal/getChartConfig'
import { scientificNotation } from '@/utils/scientificNotation'
import { ruleActivation } from '@/api/frame/main/warningOverview'

export const useRuleUseInfoChart = () => {
  const initSeriesData = menus.map(item => {
    return {
      name: item,
      value: 0
    }
  })
  const chartOption = ref({
    grid: {
      bottom: 10,
      left: 24,
      right: 24,
      top: 70
    },
    title: {
      text: '规则启用情况',
      top: 16,
      left: 20,
      textStyle: {
        fontSize: 16,
        lineHeight: 16
      }
    },
    xAxis: {
      splitLine: { show: false },
      data: [...menus],
      axisLabel: {
        rotate: 30
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
      formatter: getTooltipFormatter('seriesName')
    },
    legend: {
      left: 'auto',
      right: 24,
      top: 20,
      icon: 'roundRect'
    },
    series: [
      getBarSerie({
        name: '黄色预警',
        stack: 'warningChart',
        label: { show: false },
        itemStyle: {
          color: getColor('yellow')
        },
        barWidth: 22,
        data: initSeriesData
      }),
      getBarSerie({
        name: '橙色预警',
        stack: 'warningChart',
        label: { show: false },
        itemStyle: {
          color: getColor('secondOrange')
        },
        barWidth: 22,
        data: initSeriesData
      }),
      getBarSerie({
        name: '红色预警',
        stack: 'warningChart',
        label: { show: false },
        itemStyle: {
          color: getColor('red')
        },
        barWidth: 22,
        data: initSeriesData
      }),
      getLineSerie({
        name: '蓝色预警',
        label: { show: false },
        itemStyle: {
          color: getColor('thirdBlue')
        },
        showSymbol: true,
        symbolSize: 6,
        data: initSeriesData
      })
    ]
  })

  /**
   * 请求接口 => 更新图表
   * @returns {Promise<void>}
   */
  const updateSeries = async () => {
    const { data } = await ruleActivation()
    const xAxisData = []
    const serieData = [[], [], [], [], []]

    data?.forEach(item => {
      xAxisData.push(item.regulationClassName)
      serieData[0].push({
        name: item.regulationClassName,
        value: item.warnCount1 || 0
      })
      serieData[1].push({
        name: item.regulationClassName,
        value: item.warnCount2 || 0
      })
      serieData[2].push({
        name: item.regulationClassName,
        value: item.warnCount3 || 0
      })
      serieData[3].push({
        name: item.regulationClassName,
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
