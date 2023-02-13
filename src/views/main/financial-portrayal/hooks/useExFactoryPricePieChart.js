import { reactive, unref } from '@vue/composition-api'
import {
  getColor,
  getGaugeSeries
} from '../model/getEchartsConfig'
import { periodXAxis } from '../model/data'
import { useWatchOriginDataChange } from './useWatchOriginDataChange'

export const useExFactoryPricePieChart = (originData) => {
  const exFactoryPriceCommonOption = reactive({
    detailTitle: '工业品出厂价格指数',
    options: []
  })
  // 区域基本情况 => 工业品出厂价格指数
  const exFactoryPriceChartOption = reactive({
    series: []
  })

  const updataSeries = (currentData) => {
    exFactoryPriceCommonOption.options = periodXAxis().map((item, index) => {
      return {
        label: item,
        value: index < 1 ? unref(currentData).ppiIndex || 0 : unref(currentData).ppiIndexPeriod || 0,
        color: getColor(index < 1 ? 'green' : 'yellow')
      }
    })
    exFactoryPriceChartOption.series = [
      getGaugeSeries({
        clockwise: false,
        radius: '70%',
        center: ['54%', '56%'],
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
            color: [[0, getColor('gray')], [1, getColor('gray')]]
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
            value: unref(currentData).ppiIndex || 0,
            name: 'PPI'
          }
        ],
        detail: {
          show: false
        },
        title: {
          show: false
        }
      }),
      getGaugeSeries({
        clockwise: false,
        radius: '50%',
        center: ['54%', '56%'],
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
            color: [[0, getColor('gray')], [1, getColor('gray')]]
          }
        },
        progress: {
          show: true,
          width: 12,
          roundCap: true,
          itemStyle: {
            color: getColor('yellow')
          }
        },
        data: [
          {
            value: unref(currentData).ppiIndexPeriod || 0,
            name: 'PPI'
          }
        ],
        detail: {
          show: false
        },
        title: {
          show: false
        }
      })
    ]
  }
  useWatchOriginDataChange(originData, updataSeries)

  return {
    exFactoryPriceCommonOption,
    exFactoryPriceChartOption
  }
}
