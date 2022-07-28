import { reactive, onMounted } from '@vue/composition-api'
import { getBarSerie, getColor, getTooltipFormatter, getAxis, getTooltip } from '../model/getEchartsConfig'
import { governmentDebtlimitXAxis, governmentDebtLegend } from '../model/data'

export const useIssueBondsBarChart = () => {
  // 政府债务类指标 => 年内发行债券
  const issueBondsChartOption = reactive({
    detailTitle: '年内发行债券',
    showDot: true,
    tooltip: {
      ...getTooltip(),
      formatter: getTooltipFormatter('seriesName')
    },
    xAxis: getAxis({ type: 'category', data: governmentDebtlimitXAxis() }),
    series: [],
    // 隐藏原始legend
    legend: {
      show: false
    },
    // 自定义legend
    customLegend: governmentDebtLegend()
  })
  onMounted(() => {
    // 模拟异步请求 后续改为接口赋值
    setTimeout(() => {
      issueBondsChartOption.series = [
        getBarSerie({
          name: '本期',
          labelShow: false,
          barGap: '-100%',
          z: 1,
          data: [
            {
              name: '一般债券',
              value: 200,
              itemStyle: { color: getColor('blue') }
            },
            {
              name: '专项债券',
              value: 300,
              itemStyle: { color: getColor('green') }
            }
          ]
        }),
        getBarSerie({
          name: '上年同期',
          labelShow: false,
          z: 2,
          data: [
            {
              name: '一般债券',
              value: 500,
              itemStyle: { color: getColor('fadeBlue') }
            },
            {
              name: '专项债券',
              value: 100,
              itemStyle: { color: getColor('fadeGreen') }
            }
          ]
        })
      ]
    })
  })
  return {
    issueBondsChartOption
  }
}
