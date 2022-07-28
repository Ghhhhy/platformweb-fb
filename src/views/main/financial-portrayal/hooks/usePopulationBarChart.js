import { reactive, onMounted } from '@vue/composition-api'
import { getBarSerie, getColor, getTooltipFormatter, getAxis, getTooltip } from '../model/getEchartsConfig'
import { periodXAxis } from '../model/data'

export const usePopulationBarChart = () => {
  // 区域基本情况 => 人口
  const populationChartOption = reactive({
    detailTitle: '人口（万人）',
    tooltip: {
      ...getTooltip(),
      formatter: getTooltipFormatter('seriesName')
    },
    xAxis: getAxis({ type: 'category', data: periodXAxis() }),
    series: []
  })
  onMounted(() => {
    // 模拟异步请求 后续改为接口赋值
    setTimeout(() => {
      populationChartOption.series = [
        getBarSerie({
          name: '户籍人口',
          labelShow: true,
          data: [
            {
              name: '本期',
              value: 200,
              itemStyle: { color: getColor('blue') }
            },
            {
              name: '上年同期',
              value: 300,
              itemStyle: { color: getColor('fadeBlue') }
            }
          ]
        }),
        getBarSerie({
          name: '常住人口',
          labelShow: true,
          data: [
            {
              name: '本期',
              value: 400,
              itemStyle: { color: getColor('green') }
            },
            {
              name: '上年同期',
              value: 800,
              itemStyle: { color: getColor('fadeGreen') }
            }
          ]
        })
      ]
    })
  })
  return {
    populationChartOption
  }
}
