import { reactive, onMounted } from '@vue/composition-api'
import {
  getBarSerie,
  getColor,
  getTooltipFormatter,
  getAxis,
  getTooltip,
  getGrid
} from '../model/getEchartsConfig'
import { leadingIndicatorXAxis, leadingIndicatorRightYAxis } from '../model/data'

export const useLeadingIndicatorBarChart = () => {
  const leadingIndicatorValues = reactive({
    current: {
      label: '本期用电量',
      value: '109,748'
    },
    last: {
      label: '上年同期用电量',
      value: '91,748'
    }
  })
  // 区域基本情况 => 先行指标
  const leadingIndicatorChartOption = reactive({
    detailTitle: '先行指标',
    grid: getGrid({ left: 34, top: 140, right: 34, bottom: 10 }),
    tooltip: {
      ...getTooltip(),
      formatter: getTooltipFormatter('seriesName')
    },
    legend: {
      show: false
    },
    customLegend: [
      {
        label: '存款余额',
        color: getColor('green')
      },
      {
        label: '贷款余额',
        color: getColor('orange')
      },
      {
        label: '采购经理指数',
        color: getColor('blue')
      }
    ],
    xAxis: getAxis({ type: 'category', data: leadingIndicatorXAxis() }),
    yAxis: [
      {
        ...getAxis({ type: 'value' }),
        name: '金融机构（亿元）'
      },
      {
        ...getAxis({ type: 'category', data: leadingIndicatorRightYAxis() }),
        name: 'PMI(%)',
        axisLabel: {
          formatter: value => `${value}%`
        }
      }
    ],
    series: []
  })
  onMounted(() => {
    // 模拟异步请求 后续改为接口赋值
    setTimeout(() => {
      leadingIndicatorChartOption.series = [
        getBarSerie({
          name: '出口总值',
          barWidth: 16,
          data: [
            {
              name: '本期',
              value: 700,
              itemStyle: { color: getColor('green') }
            },
            {
              name: '上年同期',
              value: 1390,
              itemStyle: { color: getColor('orange') }
            },
            {
              name: '采购经理指数',
              value: 400,
              itemStyle: { color: getColor('blue') }
            }
          ]
        }),
        getBarSerie({
          name: '进口总值',
          barWidth: 16,
          data: [
            {
              name: '上年同期',
              value: 1200,
              itemStyle: { color: getColor('fadeGreen') }
            },
            {
              name: '上年同期',
              value: 800,
              itemStyle: { color: getColor('fadeOrange') }
            },
            {
              name: '采购经理指数',
              value: 500,
              itemStyle: { color: getColor('fadeBlue') }
            }
          ]
        })
      ]
    })
  })
  return {
    leadingIndicatorChartOption,
    leadingIndicatorValues
  }
}
