import { reactive, onMounted } from '@vue/composition-api'
import { getBarSerie, getColor, getTooltipFormatter, getAxis, getTooltip } from '../model/getEchartsConfig'
import { mainIndustrialXAxis } from '../model/data'

export const useMainIndustrialBarChart = () => {
  // 区域基本情况 => 主要行业增加值（亿元）
  const mainIndustrialChartOption = reactive({
    detailTitle: '主要行业增加值（亿元）',
    tooltip: {
      ...getTooltip(),
      formatter: getTooltipFormatter('seriesName')
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
  onMounted(() => {
    // 模拟异步请求 后续改为接口赋值
    setTimeout(() => {
      mainIndustrialChartOption.series = [
        getBarSerie({
          name: '本期',
          labelShow: false,
          barGap: '-100%',
          z: 1,
          data: [
            {
              name: '煤炭开采和洗选业',
              value: 300,
              itemStyle: { color: getColor('blue') }
            },
            {
              name: '石油和天然气开采',
              value: 1000,
              itemStyle: { color: getColor('green') }
            },
            {
              name: '装备制造业',
              value: 2400,
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
              value: 200,
              itemStyle: { color: getColor('fadeBlue') }
            },
            {
              name: '石油和天然气开采',
              value: 500,
              itemStyle: { color: getColor('fadeGreen') }
            },
            {
              name: '装备制造业',
              value: 1700,
              itemStyle: { color: getColor('fadeYellow') }
            }
          ]
        })
      ]
    })
  })
  return {
    mainIndustrialChartOption
  }
}
