import { reactive, onMounted } from '@vue/composition-api'
import {
  getLineSerie,
  getTooltipFormatter,
  getAxis,
  getTooltip,
  getAreaStyle,
  getColor,
  getAxisLabelFormatter
} from '../model/getEchartsConfig'
import { fixedAssetsXAxis } from '../model/data'

export const useFixedAssetsSpeedLineChart = () => {
  // 区域基本情况 => 固定资产投入增速
  const fixedAssetsSpeedChartOption = reactive({
    detailTitle: '固定资产投入增速',
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
    yAxis: {
      axisLabel: {
        formatter: (value) => `${value}%`
      }
    },
    series: []
  })
  onMounted(() => {
    // 模拟异步请求 后续改为接口赋值
    setTimeout(() => {
      fixedAssetsSpeedChartOption.series = [
        getLineSerie({
          name: '本期',
          type: 'line',
          areaStyle: getAreaStyle(),
          data: [
            {
              name: '第一产业',
              value: 279
            },
            {
              name: '第二产业',
              value: 650
            },
            {
              name: '第三产业',
              value: 100
            },
            {
              name: '基础设施投资',
              value: 900
            },
            {
              name: '民间投资',
              value: 480
            },
            {
              name: '房地产开发投资',
              value: 70
            }
          ]
        }),
        getLineSerie({
          name: '上年同期',
          areaStyle: getAreaStyle(getColor('green')),
          data: [
            {
              name: '第一产业',
              value: 400
            },
            {
              name: '第二产业',
              value: 100
            },
            {
              name: '第三产业',
              value: 700
            },
            {
              name: '基础设施投资',
              value: 500
            },
            {
              name: '民间投资',
              value: 600
            },
            {
              name: '房地产开发投资',
              value: 900
            }
          ]
        })
      ]
    })
  })
  return {
    fixedAssetsSpeedChartOption
  }
}
