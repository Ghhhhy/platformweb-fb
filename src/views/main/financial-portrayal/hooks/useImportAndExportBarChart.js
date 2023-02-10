import { reactive, unref } from '@vue/composition-api'
import {
  getBarSerie,
  getColor,
  getTooltipFormatter,
  getAxis,
  getTooltip,
  getPictorialBarSymbol
} from '../model/getEchartsConfig'
import { importAndExportXAxis } from '../model/data'
import { useWatchOriginDataChange } from './useWatchOriginDataChange'

export const useImportAndExportBarChart = (originData) => {
  // 区域基本情况 => 进出口总值（亿元）
  const importAndExportChartOption = reactive({
    detailTitle: '进出口总值（亿元）',
    toolbox: {
      show: false,
      feature: {
        saveAsImage: {
          name: '进出口总值（亿元）'
        }
      }
    },
    tooltip: {
      ...getTooltip(),
      formatter: getTooltipFormatter('name')
    },
    // 由于series中设置了symbol,而默认legend会读取series中symbol，故此处需要手动修改legend的icon
    legend: {
      icon: 'rect',
      show: false
    },
    xAxis: getAxis({ type: 'category', data: importAndExportXAxis() }),
    // 自定义legend
    customLegend: [
      {
        label: '出口总值',
        color: getColor('blue')
      },
      {
        label: '进口总值',
        color: getColor('red')
      }
    ],
    series: []
  })
  const updataSeries = (currentData) => {
    importAndExportChartOption.series = [
      getBarSerie({
        type: 'pictorialBar',
        name: '出口总值',
        barWidth: 102,
        z: 2,
        symbol: getPictorialBarSymbol(),
        data: [
          {
            name: '本期',
            value: unref(currentData).importTotal || 0,
            itemStyle: { color: getColor('blue') }
          },
          {
            name: '本期',
            value: unref(currentData).exportTotal || 0,
            itemStyle: { color: getColor('red') }
          }
        ]
      }),
      getBarSerie({
        type: 'pictorialBar',
        name: '进口总值',
        barWidth: 102,
        symbol: getPictorialBarSymbol(),
        barGap: '-76%',
        z: 1,
        data: [
          {
            name: '上年同期',
            value: unref(currentData).importTotalPeriod || 0,
            itemStyle: { color: getColor('fadeBlue') }
          },
          {
            name: '上年同期',
            value: unref(currentData).exportTotalPeriod || 0,
            itemStyle: { color: getColor('fadeRed') }
          }
        ]
      })
    ]
  }
  useWatchOriginDataChange(originData, updataSeries)

  return {
    importAndExportChartOption
  }
}
