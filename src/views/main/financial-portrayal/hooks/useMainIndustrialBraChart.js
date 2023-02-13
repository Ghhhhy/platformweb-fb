import { reactive, unref } from '@vue/composition-api'
import { getBarSerie, getColor, getAxis, getTooltip } from '../model/getEchartsConfig'
import { mainIndustrialXAxis } from '../model/data'
import { useWatchOriginDataChange } from './useWatchOriginDataChange'

export const useMainIndustrialBarChart = (originData) => {
  // 区域基本情况 => 主要行业增加值（亿元）
  const mainIndustrialChartOption = reactive({
    detailTitle: '主要行业增加值（亿元）',
    toolbox: {
      show: false,
      feature: {
        saveAsImage: {
          name: '主要行业增加值（亿元）'
        }
      }
    },
    tooltip: {
      ...getTooltip(),
      formatter: function (params) {
        let str = ''
        params.forEach((u, index) => {
          if (index !== 0) {
            str += `<div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; margin-right: 10px; flex: 1; flex-shrink: 0">
            <span style="
              display: inline-block;
              width: 8px;
              height: 8px;
              margin-right: 10px;
              background: ${u?.color};"
            ></span>
            ${u.seriesName}
          </div>
          <span style="flex-shrink: 0">${u.value}</span>
        </div>`
          }
        })
        return str
      }
    },
    xAxis: getAxis({ type: 'category', data: mainIndustrialXAxis() }),
    series: [],
    // 隐藏原始legend
    legend: {
      show: false
    },
    // 自定义legend
    customLegend: [
      {
        label: '煤炭开采和洗选业',
        color: getColor('blue')
      },
      {
        label: '石油和天然气开采',
        color: getColor('green')
      },
      {
        label: '装备制造业',
        color: getColor('yellow')
      }
    ]
  })
  const updataSeries = (currentData) => {
    const rateData = [0, 0, 0]
    if (unref(currentData) !== null) {
      rateData[0] = unref(currentData).coalMiningPeriod == null || unref(currentData).coalMiningPeriod === 0 ? 0 : (((unref(currentData).coalMining / unref(currentData).coalMiningPeriod) - 1) * 100).toFixed(2) + '%'
      rateData[1] = unref(currentData).oilGasExtractionPeriod == null || unref(currentData).oilGasExtractionPeriod === 0 ? 0 : (((unref(currentData).oilGasExtraction / unref(currentData).oilGasExtractionPeriod) - 1) * 100).toFixed(2) + '%'
      rateData[2] = unref(currentData).equipmentManufacturingPeriod == null || unref(currentData).equipmentManufacturingPeriod === 0 ? 0 : (((unref(currentData).equipmentManufacturing / unref(currentData).equipmentManufacturingPeriod) - 1) * 100).toFixed(2) + '%'
    }
    mainIndustrialChartOption.series = [
      getBarSerie({
        labelShow: false,
        barGap: '-100%',
        z: -1,
        data: [
          {
            name: '煤炭开采和洗选业',
            value: Math.max(unref(currentData).coalMining || 0, unref(currentData).coalMiningPeriod || 0),
            itemStyle: { color: '#fff' }
          },
          {
            name: '石油和天然气开采',
            value: Math.max(unref(currentData).oilGasExtraction || 0, unref(currentData).oilGasExtractionPeriod || 0),
            itemStyle: { color: '#fff' }
          },
          {
            name: '装备制造业',
            value: Math.max(unref(currentData).equipmentManufacturing || 0, unref(currentData).equipmentManufacturingPeriod || 0),
            itemStyle: { color: '#fff' }
          }
        ],
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'top',
              formatter: function(params) {
                return rateData[params.dataIndex]
              },
              textStyle: {
                color: 'black'
              }
            }
          }
        }
      }),
      getBarSerie({
        name: '本期',
        labelShow: false,
        barGap: '-100%',
        z: 1,
        data: [
          {
            name: '煤炭开采和洗选业',
            value: unref(currentData).coalMining || 0,
            itemStyle: { color: getColor('blue') }
          },
          {
            name: '石油和天然气开采',
            value: unref(currentData).oilGasExtraction || 0,
            itemStyle: { color: getColor('green') }
          },
          {
            name: '装备制造业',
            value: unref(currentData).equipmentManufacturing || 0,
            itemStyle: { color: getColor('yellow') }
          }
        ]
      }),
      getBarSerie({
        name: '上年同期',
        labelShow: false,
        z: 2,
        data: [
          {
            name: '煤炭开采和洗选业',
            value: unref(currentData).coalMiningPeriod || 0,
            itemStyle: { color: getColor('fadeBlue') }
          },
          {
            name: '石油和天然气开采',
            value: unref(currentData).oilGasExtractionPeriod || 0,
            itemStyle: { color: getColor('fadeGreen') }
          },
          {
            name: '装备制造业',
            value: unref(currentData).equipmentManufacturingPeriod || 0,
            itemStyle: { color: getColor('fadeYellow') }
          }
        ]
      })
    ]
  }
  useWatchOriginDataChange(originData, updataSeries)

  return {
    mainIndustrialChartOption
  }
}
