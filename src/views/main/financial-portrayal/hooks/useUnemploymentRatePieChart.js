import { reactive, unref } from '@vue/composition-api'
import {
  getColor,
  getPieTitle,
  getGaugeSeries
} from '../model/getEchartsConfig'
import { useWatchOriginDataChange } from './useWatchOriginDataChange'

export const useUnemploymentRatePieChart = (originData) => {
  const unemploymentRateCommonOption = reactive({
    detailTitle: '失业率',
    customLegend: [
      {
        label: '本期',
        color: getColor('blue')
      },
      {
        label: '上年同期',
        color: getColor('green')
      }
    ]
  })
  // 区域基本情况 => 本期失业率
  const unemploymentRateCurrentChartOption = reactive({
    title: [
      getPieTitle({ left: '50%', bottom: '20px', text: '本期' })
    ],
    series: []
  })
  // 区域基本情况 => 上年同期失业率
  const unemploymentRateLastChartOption = reactive({
    title: [
      getPieTitle({ left: '50%', bottom: '20px', text: '上年同期' })
    ],
    series: []
  })
  const updataSeries = (currentData) => {
    unemploymentRateCurrentChartOption.series = [
      getGaugeSeries({
        clockwise: true,
        radius: '50%',
        center: ['50%', '60%'],
        startAngle: 90,
        endAngle: -270,
        axisLabel: {
          show: false
        },
        axisLine: {
          show: true,
          roundCap: true,
          lineStyle: {
            width: 12,
            color: [[0, '#f1f1f1'], [1, '#f1f1f1']]
          }
        },
        progress: {
          show: true,
          width: 12,
          roundCap: true,
          itemStyle: {
            color: getColor('blue')
          }
        },
        data: [
          {
            value: unref(currentData).unemploymentRate || 0,
            name: '失业率'
          }
        ],
        detail: {
          formatter: '{value}%',
          color: '#666',
          fontSize: 24,
          fontWeight: 500,
          offsetCenter: [0, 0]
        },
        title: {
          show: false
        }
      })
    ]
    unemploymentRateLastChartOption.series = [
      getGaugeSeries({
        clockwise: true,
        radius: '50%',
        center: ['50%', '60%'],
        startAngle: 90,
        endAngle: -270,
        axisLabel: {
          show: false
        },
        axisLine: {
          show: true,
          roundCap: true,
          lineStyle: {
            width: 12,
            color: [[0, '#f1f1f1'], [1, '#f1f1f1']]
          }
        },
        progress: {
          show: true,
          width: 12,
          roundCap: true,
          itemStyle: {
            color: getColor('green')
          }
        },
        data: [
          {
            value: unref(currentData).unemploymentRatePeriod || 0,
            name: '失业率'
          }
        ],
        detail: {
          formatter: '{value}%',
          color: '#666',
          fontSize: 24,
          fontWeight: 500,
          offsetCenter: [0, 0]
        },
        title: {
          show: false
        }
      })
    ]
  }
  useWatchOriginDataChange(originData, updataSeries)

  return {
    unemploymentRateCommonOption,
    unemploymentRateCurrentChartOption,
    unemploymentRateLastChartOption
  }
}
