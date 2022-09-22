import { reactive, onMounted } from '@vue/composition-api'
import { getBarSerie, getColor, getTooltipFormatter, getAxis, getTooltip } from '../model/getEchartsConfig'
import { governmentDebtlimitXAxis, governmentDebtLegend } from '../model/data'

export const useGovernmentDebtAddlimitBarChart = () => {
  // 政府债务类指标 => 年内新增政府债券限额
  const governmentDebtNewlimitChartOption = reactive({
    detailTitle: '年内新增政府债券限额',
    showDot: true,
    tooltip: {
      ...getTooltip(),
      formatter: getTooltipFormatter('seriesName')
    },
    xAxis: getAxis({ type: 'value', data: [], splitLineShow: true }),
    yAxis: getAxis({ type: 'category', data: governmentDebtlimitXAxis(), inverse: true }),
    legend: {
      show: false
    },
    customLegend: governmentDebtLegend(),
    series: []
  })
  onMounted(() => {
    // 模拟异步请求 后续改为接口赋值
    setTimeout(() => {
      governmentDebtNewlimitChartOption.series = [
        getBarSerie({
          name: '本期',
          barWidth: 16,
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
          barWidth: 16,
          data: [
            {
              name: '一般债券',
              value: 200,
              itemStyle: { color: getColor('fadeBlue') }
            },
            {
              name: '专项债券',
              value: 700,
              itemStyle: { color: getColor('fadeGreen') }
            }
          ]
        })
      ]
    })
  })
  return {
    governmentDebtNewlimitChartOption
  }
}
