import { reactive, onMounted } from '@vue/composition-api'
import { getBarSerie, getColor, getGrid, getTooltipFormatter, getAxis, getTooltip } from '../model/getEchartsConfig'
import { financialSupportXAxis } from '../model/data'

export const useFinancialSupportBarChart = () => {
  // 直达资金 => 支出金额
  const financialSupportBarChart = reactive({
    detailTitle: '财政供养人员',
    toolbox: {
      show: false,
      feature: {
        saveAsImage: {
          name: '财政供养人员'
        }
      }
    },
    showDot: true,
    grid: getGrid({ top: 100, left: 40, right: 40, bottom: 16 }),
    tooltip: {
      ...getTooltip(),
      formatter: getTooltipFormatter('seriesName')
    },
    xAxis: getAxis({ type: 'value', data: [], splitLineShow: true }),
    yAxis: getAxis({ type: 'category', data: financialSupportXAxis(), inverse: true }),
    legend: {
      show: false
    },
    // 自定义legend
    customLegend: [
      {
        label: '本期',
        color: getColor('blue')
      },
      {
        label: '上年同期',
        color: getColor('green')
      }
    ],
    series: []
  })
  onMounted(() => {
    // 模拟异步请求 后续改为接口赋值
    setTimeout(() => {
      financialSupportBarChart.series = [
        getBarSerie({
          name: '本期',
          barWidth: 16,
          data: [
            {
              name: '财政开支人员',
              value: 14000,
              itemStyle: { color: getColor('blue') }
            },
            {
              name: '财政补助人开支员',
              value: 13000,
              itemStyle: { color: getColor('blue') }
            },
            {
              name: '学生人数',
              value: 12000,
              itemStyle: { color: getColor('blue') }
            }
          ]
        }),
        getBarSerie({
          name: '上年同期',
          barWidth: 16,
          data: [
            {
              name: '财政开支人员',
              value: 10000,
              itemStyle: { color: getColor('fadeBlue') }
            },
            {
              name: '财政补助人员开支',
              value: 14000,
              itemStyle: { color: getColor('fadeBlue') }
            },
            {
              name: '学生人数',
              value: 13000,
              itemStyle: { color: getColor('fadeBlue') }
            }
          ]
        })
      ]
    })
  })
  return {
    financialSupportBarChart
  }
}
