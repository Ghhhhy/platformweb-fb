import { onMounted, ref, unref, watch } from '@vue/composition-api'
import { getLineSerie, getTooltipFormatter } from '@/views/main/financial-portrayal/model/getEchartsConfig'
import { getColor } from '@/hooks/useChart/getChartConfig'
import { citys } from '@/views/main/warningOverview/modal/data.js'
// import { getWarnByMofDivCode } from '@/api/frame/main/warningOverview'
import * as echarts from 'echarts'
import { SelectEnum } from '../../../main/warningOverview/modal/data'

export const useCenterBottom = (selectValue) => {
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
  const chartOption = ref({
    grid: {
      bottom: 12,
      left: 24,
      right: 24,
      top: 80
    },
    xAxis: {
      splitLine: { show: true },
      axisLabel: {
        rotate: unref(selectValue) === SelectEnum.BY_MONTH ? 0 : 30
      },
      data: []
    },
    yAxis: {
      splitLine: { show: false }
    },
    tooltip: {
      formatter: getTooltipFormatter('seriesName')
    },
    legend: {
      show: false,
      right: 24,
      top: 16,
      icon: 'roundRect'
    },
    series: [
      getLineSerie({
        name: '金额',
        label: { show: false },
        itemStyle: {
          color: getColor('blue')
        },
        areaStyle,
        lineStyle: {
          wdith: 2
        },
        data: []
      })
    ]
  })

  /**
   * 请求接口 => 更新图表
   * @returns {Promise<void>}
   */
  const updateSeries = async () => {
    chartOption.value.xAxis.axisLabel.rotate = unref(selectValue) === SelectEnum.BY_MONTH ? 0 : 30
    chartOption.value.xAxis.data = citys
    chartOption.value.series[0].data = citys.map(item => {
      return {
        name: item,
        value: parseInt(Math.random() * 100)
      }
    })
    // const { data } = await getWarnByMofDivCode({ type: unref(selectValue) })
    // const [xAxisData, moneySeriseData, numberSeriseData] = [[], [], []]
    //
    // data?.forEach(item => {
    //   const name = unref(selectValue) === 1 ? item.mofDivName : item.month
    //   xAxisData.push(name)
    //   moneySeriseData.push({
    //     name: name,
    //     value: item.paymentAmount || 0
    //   })
    //   numberSeriseData.push({
    //     name: name,
    //     value: item.warnCount || 0
    //   })
    // })
    // chartOption.value.xAxis.data = xAxisData
    // chartOption.value.series[0].data = moneySeriseData
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
