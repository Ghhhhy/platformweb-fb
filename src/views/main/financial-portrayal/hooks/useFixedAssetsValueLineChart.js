import { reactive, unref } from '@vue/composition-api'
import {
  getLineSerie,
  getTooltipFormatter,
  getAxis,
  getTooltip,
  getAxisLabelFormatter
} from '../model/getEchartsConfig'
import { fixedAssetsXAxis } from '../model/data'
import { useWatchOriginDataChange } from './useWatchOriginDataChange'

export const useFixedAssetsValueLineChart = (originData) => {
  // 区域基本情况 => 固定资产投入增加额
  const fixedAssetsValueChartOption = reactive({
    detailTitle: '固定资产投入增加额',
    tooltip: {
      ...getTooltip('line'),
      formatter: getTooltipFormatter('seriesName')
    },
    // 由于series中设置了symbol: 'circle' 而默认legend会读取series中symbol，故此处需要手动修改legend的icon
    legend: {
      icon: 'rect'
    },
    xAxis: {
      ...getAxis({ type: 'category', data: fixedAssetsXAxis() }),
      // 主要是label文字太长，这里通过formatter换行展示
      axisLabel: {
        formatter: getAxisLabelFormatter()
      }
    },
    series: []
  })
  const updataSeries = (currentData) => {
    fixedAssetsValueChartOption.series = [
      getLineSerie({
        name: '本期',
        smooth: true,
        data: [
          {
            name: '第一产业',
            value: unref(currentData).fixedAssetsFirst || 0
          },
          {
            name: '第二产业',
            value: unref(currentData).fixedAssetsSecond || 0
          },
          {
            name: '第三产业',
            value: unref(currentData).fixedAssetsThird || 0
          },
          {
            name: '基础设施投资',
            value: unref(currentData).fixedAssetsInfrastructure || 0
          },
          {
            name: '民间投资',
            value: unref(currentData).fixedAssetsPrivateInvestment || 0
          },
          {
            name: '房地产开发投资',
            value: unref(currentData).fixedAssetsRealEstate || 0
          }
        ]
      }),
      getLineSerie({
        name: '上年同期',
        smooth: true,
        data: [
          {
            name: '第一产业',
            value: unref(currentData).fixedAssetsFirstPeriod || 0
          },
          {
            name: '第二产业',
            value: unref(currentData).fixedAssetsSecondPeriod || 0
          },
          {
            name: '第三产业',
            value: unref(currentData).fixedAssetsThirdPeriod || 0
          },
          {
            name: '基础设施投资',
            value: unref(currentData).fixedAssetsInfrastructurePeriod || 0
          },
          {
            name: '民间投资',
            value: unref(currentData).fixedAssetsPrivateInvestmentPeriod || 0
          },
          {
            name: '房地产开发投资',
            value: unref(currentData).fixedAssetsRealEstatePeriod || 0
          }
        ]
      })
    ]
  }
  useWatchOriginDataChange(originData, updataSeries)

  return {
    fixedAssetsValueChartOption
  }
}
