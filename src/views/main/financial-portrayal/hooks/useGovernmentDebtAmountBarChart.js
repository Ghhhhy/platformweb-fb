import { reactive, onMounted } from '@vue/composition-api'
import {
  getBarSerie,
  getColor,
  getTooltipFormatter,
  getAxis,
  getTooltip,
  getPictorialBarSymbol
} from '../model/getEchartsConfig'
import { governmentDebtlimitXAxis } from '../model/data'

export const useGovernmentDebtAmountBarChart = () => {
  // 政府债务类指标 => 政府债务金额
  const governmentDebtAmountBarChart = reactive({
    detailTitle: '政府债务金额',
    showDot: true,
    tooltip: {
      ...getTooltip(),
      formatter: getTooltipFormatter('name')
    },
    // 由于series中设置了symbol,而默认legend会读取series中symbol，故此处需要手动修改legend的icon
    legend: {
      icon: 'rect'
    },
    xAxis: getAxis({ type: 'category', data: governmentDebtlimitXAxis() }),
    series: []
  })
  onMounted(() => {
    // 模拟异步请求 后续改为接口赋值
    setTimeout(() => {
      governmentDebtAmountBarChart.series = [
        getBarSerie({
          type: 'pictorialBar',
          name: '一般债券',
          barWidth: 102,
          z: 2,
          symbol: getPictorialBarSymbol(),
          data: [
            {
              name: '本期',
              value: 700,
              itemStyle: { color: getColor('blue') }
            },
            {
              name: '本期',
              value: 1390,
              itemStyle: { color: getColor('green') }
            }
          ]
        }),
        getBarSerie({
          type: 'pictorialBar',
          name: '专项债券',
          barWidth: 102,
          symbol: getPictorialBarSymbol(),
          barGap: '-76%',
          z: 1,
          data: [
            {
              name: '上年同期',
              value: 1200,
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
    governmentDebtAmountBarChart
  }
}
