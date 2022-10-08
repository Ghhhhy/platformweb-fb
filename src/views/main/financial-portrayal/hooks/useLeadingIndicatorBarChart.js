import { reactive, unref } from '@vue/composition-api'
import {
  getBarSerie,
  getColor,
  getTooltipFormatter,
  getAxis,
  getTooltip,
  getGrid
} from '../model/getEchartsConfig'
import { leadingIndicatorXAxis, leadingIndicatorRightYAxis } from '../model/data'
import { useWatchOriginDataChange } from './useWatchOriginDataChange'
import { formatterThousands } from '@/utils/thousands'

export const useLeadingIndicatorBarChart = (originData) => {
  const leadingIndicatorValues = reactive({
    current: {
      label: '本期用电量',
      value: 0.00
    },
    last: {
      label: '上年同期用电量',
      value: 0.00
    }
  })
  // 区域基本情况 => 先行指标
  const leadingIndicatorChartOption = reactive({
    detailTitle: '先行指标',
    grid: getGrid({ left: 48, top: 140, right: 34, bottom: 10 }),
    tooltip: {
      ...getTooltip(),
      formatter: getTooltipFormatter('name')
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
  const updataSeries = (currentData) => {
    leadingIndicatorValues.current.value = formatterThousands(unref(currentData).electricityConsumption) || 0.00
    leadingIndicatorValues.last.value = formatterThousands(unref(currentData).electricityConsumptionPeriod) || 0.00
    leadingIndicatorChartOption.series = [
      getBarSerie({
        barWidth: 16,
        data: [
          {
            name: '存款余额',
            value: unref(currentData).depositBalance || 0,
            itemStyle: { color: getColor('green') }
          },
          {
            name: '存款余额',
            value: unref(currentData).loanBalance || 0,
            itemStyle: { color: getColor('fadeGreen') }
          },
          {
            name: '本期',
            value: unref(currentData).PMIIndex || 0,
            itemStyle: { color: getColor('blue') }
          }
        ]
      }),
      getBarSerie({
        barWidth: 16,
        data: [
          {
            name: '贷款余额',
            value: unref(currentData).depositBalancePeriod || 0,
            itemStyle: { color: getColor('orange') }
          },
          {
            name: '贷款余额',
            value: unref(currentData).loanBalancePeriod || 0,
            itemStyle: { color: getColor('fadeOrange') }
          },
          {
            name: '上年同期',
            value: unref(currentData).PMIIndexPeriod || 0,
            itemStyle: { color: getColor('fadeBlue') }
          }
        ]
      })
    ]
  }
  useWatchOriginDataChange(originData, updataSeries)

  return {
    leadingIndicatorChartOption,
    leadingIndicatorValues
  }
}
