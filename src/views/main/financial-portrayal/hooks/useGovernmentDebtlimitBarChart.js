import { reactive, onMounted } from '@vue/composition-api'
import { getBarSerie, getColor, getTooltipFormatter, getAxis, getTooltip } from '../model/getEchartsConfig'
import { governmentDebtlimitXAxis } from '../model/data'

export const useGovernmentDebtlimitBarChart = () => {
  // 政府债务类指标 => 政府债务限额
  const governmentDebtlimitChartOption = reactive({
    detailTitle: '政府债务限额',
    toolbox: {
      show: false,
      feature: {
        saveAsImage: {
          name: '政府债务限额'
        }
      }
    },
    showDot: true,
    tooltip: {
      ...getTooltip(),
      formatter: getTooltipFormatter('name')
    },
    xAxis: getAxis({ type: 'category', data: governmentDebtlimitXAxis() }),
    series: []
  })
  onMounted(() => {
    // 模拟异步请求 后续改为接口赋值
    setTimeout(() => {
      governmentDebtlimitChartOption.series = [
        getBarSerie({
          name: '一般债券',
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
          name: '专项债券',
          labelShow: true,
          data: [
            {
              name: '预算批复',
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
    governmentDebtlimitChartOption
  }
}
