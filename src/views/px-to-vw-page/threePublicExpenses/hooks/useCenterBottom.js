import { onMounted, ref, unref, watch } from '@vue/composition-api'
import { getLineSerie, getTooltipFormatter } from '@/views/main/financial-portrayal/model/getEchartsConfig'
import { getColor } from '@/hooks/useChart/getChartConfig'
import computedPx from '@/utils/computedPx'
import { expenditure } from '@/api/frame/main/threePublicExpenses/index.js'
import * as echarts from 'echarts'
import { SelectEnum } from '../model/data'

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
      bottom: computedPx(12),
      left: computedPx(24),
      right: computedPx(24),
      top: computedPx(100)
    },
    xAxis: {
      splitLine: { show: true },
      axisLabel: {
        rotate: 0,
        formatter: value => unref(selectValue) === SelectEnum.BY_MOF_DIV ? value : `${value}月`
      },
      data: []
    },
    yAxis: {
      splitLine: { show: false },
      name: '万元',
      nameRotate: 0,
      nameLocation: 'end',
      nameGap: 0,
      nameTextStyle: {
        color: '#8A9299',
        padding: [0, computedPx(40), computedPx(25), 0]
      }
    },
    tooltip: {
      formatter: getTooltipFormatter('seriesName')
    },
    legend: {
      show: false,
      right: computedPx(24),
      top: computedPx(10),
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
          width: computedPx(2)
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
    const { data } = await expenditure({ expenditureType: unref(selectValue) })
    const [xAxisData, numberSeriseData] = [[], []]
    chartOption.value.xAxis.axisLabel.rotate = unref(selectValue) === SelectEnum.BY_MOF_DIV && data?.length > 6 ? 30 : 0

    data?.forEach(item => {
      const name = unref(selectValue) === SelectEnum.BY_MOF_DIV ? item.mofDivName : item.month
      xAxisData.push(name)
      numberSeriseData.push({
        name: name,
        value: item.payAppAmt ? item.payAppAmt / 10000 : 0
      })
    })
    chartOption.value.xAxis.data = xAxisData
    chartOption.value.series[0].data = numberSeriseData
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
