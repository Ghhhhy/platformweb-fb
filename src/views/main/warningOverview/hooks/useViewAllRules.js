import { onMounted, ref, unref, watch } from '@vue/composition-api'
import { getBarSerie, getTooltipFormatter } from '@/views/main/financial-portrayal/model/getEchartsConfig'
import { getColor } from '../modal/getChartConfig'
import { getWarnByMofDivCode } from '@/api/frame/main/warningOverview'
import { scientificNotation } from '@/utils/scientificNotation'

export const useViewAllRules = (selectValue) => {
  const chartOption = ref({
    title: {
      text: '所有违规数据查看',
      top: 16,
      left: 20,
      textStyle: {
        fontSize: 16
      }
    },
    grid: {
      bottom: 10,
      left: 40,
      right: 40,
      top: 100
    },
    xAxis: {
      splitLine: { show: false },
      data: []
    },
    yAxis: ['金额', '数量'].map((item, index) => {
      return {
        name: item,
        nameRotate: 0,
        nameLocation: 'end',
        nameGap: 0,
        nameTextStyle: {
          color: '#8A9299',
          padding: index < 1 ? [0, 40, 25, 0] : [0, 0, 25, 40]
        },
        position: index < 1 ? 'left' : 'right',
        alignTicks: true,
        axisLabel: {
          formatter: value => {
            return scientificNotation(value)
          }
        }
      }
    }),
    tooltip: {
      formatter: getTooltipFormatter('seriesName')
    },
    legend: {
      right: 225,
      top: 20,
      icon: 'roundRect'
    },
    series: [
      getBarSerie({
        name: '金额',
        label: { show: false },
        itemStyle: {
          color: getColor('blue')
        },
        barWidth: 20,
        data: []
      }),
      getBarSerie({
        name: '数量',
        yAxisIndex: 1,
        label: { show: false },
        itemStyle: {
          color: getColor('green')
        },
        barWidth: 20,
        data: []
      })
    ]
  })

  /**
   * 请求接口 => 更新图表
   * @returns {Promise<void>}
   */
  const updateSeries = async () => {
    const { data } = await getWarnByMofDivCode({ type: unref(selectValue) })
    const [xAxisData, moneySeriseData, numberSeriseData] = [[], [], []]

    data?.forEach(item => {
      const name = unref(selectValue) === 1 ? item.mofDivName : item.month
      xAxisData.push(name)
      moneySeriseData.push({
        name: name,
        value: item.paymentAmount || 0
      })
      numberSeriseData.push({
        name: name,
        value: item.warnCount || 0
      })
    })
    chartOption.value.xAxis.data = xAxisData
    chartOption.value.series[0].data = moneySeriseData
    chartOption.value.series[1].data = numberSeriseData
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
