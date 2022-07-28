import { reactive, onMounted } from '@vue/composition-api'
import { getBarSerie, getColor, getTooltipFormatter, getAxis, getTooltip } from '../model/getEchartsConfig'
import { industrialAddedXAxis } from '../model/data'

export const useIndustrialAddedBarChart = () => {
  // 区域基本情况 => 工业增加值
  const industrialAddedChartOption = reactive({
    detailTitle: '工业增加值',
    tooltip: {
      ...getTooltip(),
      formatter: getTooltipFormatter('name')
    },
    xAxis: getAxis({ type: 'category', data: industrialAddedXAxis() }),
    series: []
  })
  onMounted(() => {
    // 模拟异步请求 后续改为接口赋值
    setTimeout(() => {
      industrialAddedChartOption.series = [
        getBarSerie({
          name: '规上工业增加值',
          labelShow: true,
          data: [
            {
              name: '本期',
              value: 200,
              itemStyle: { color: getColor('blue') }
            },
            {
              name: '本期',
              value: 300,
              itemStyle: { color: getColor('green') }
            }
          ]
        }),
        getBarSerie({
          name: '战略性新兴产业增加值',
          labelShow: true,
          data: [
            {
              name: '上年同期',
              value: 400,
              itemStyle: { color: getColor('fadeBlue') }
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
    industrialAddedChartOption
  }
}
