import { reactive, unref } from '@vue/composition-api'
import {
  getColor,
  getPieTitle,
  getGaugeSeries
} from '../model/getEchartsConfig'
import { useWatchOriginDataChange } from './useWatchOriginDataChange'

export const useCIPPieChart = (originData) => {
  const CIPCommonChartOption = reactive({
    detailTitle: '居民消费价格指数',
    toolbox: {
      show: false,
      feature: {
        saveAsImage: {
          name: '居民消费价格指数'
        }
      }
    },
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
  // 区域基本情况 => 居民消费价格指数(本期)
  const CIPCurrentChartOption = reactive({
    title: [
      getPieTitle({ left: '50%', bottom: '20px', text: '本期' })
    ],
    series: []
  })
  // 区域基本情况 => 居民消费价格指数(上年同期)
  const CIPLastChartOption = reactive({
    title: [
      getPieTitle({ left: '50%', bottom: '20px', text: '上年同期' })
    ],
    series: []
  })
  const updataSeries = (currentData) => {
    CIPCurrentChartOption.series = [
      getGaugeSeries({
        clockwise: true,
        radius: '58%',
        center: ['50%', '60%'],
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
            value: unref(currentData).cpiIndex || 0,
            name: 'CPI'
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
          show: true,
          offsetCenter: [0, '70%'],
          color: '#666',
          fontSize: 14
        }
      })
    ]
    CIPLastChartOption.series = [
      getGaugeSeries({
        z: 1,
        clockwise: true,
        startAngle: 225,
        endAngle: -45,
        radius: '58%',
        center: ['50%', '60%'],
        axisLabel: {
          show: false
        },
        splitLine: {
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
            value: unref(currentData).cpiIndexPeriod || 0,
            name: 'CPI'
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
          show: true,
          offsetCenter: [0, '70%'],
          color: '#666',
          fontSize: 14
        }
      })
    ]
  }
  useWatchOriginDataChange(originData, updataSeries)
  return {
    CIPCommonChartOption,
    CIPCurrentChartOption,
    CIPLastChartOption
  }
}
