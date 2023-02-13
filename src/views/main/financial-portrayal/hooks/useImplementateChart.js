import { reactive, onMounted } from '@vue/composition-api'
import {
  getColor,
  getPieTitle,
  getGaugeSeries
} from '../model/getEchartsConfig'

export const useImplementateChart = () => {
  // 预算管理 => 一般公共预算收入
  const publicBudgetIncomeChartOption = reactive({
    title: [
      getPieTitle({ left: '28%', bottom: '10px', text: '上年同期: 85%' }),
      getPieTitle({ left: '72%', bottom: '10px', text: '上年同期: 85%' })
    ],
    showDot: true,
    detailTitle: '一般公共预算收入',
    toolbox: {
      show: false,
      feature: {
        saveAsImage: {
          name: '一般公共预算收入'
        }
      }
    },
    tooltip: { show: false },
    legend: { show: false },
    series: [],
    customLegend: []
  })
  // 预算管理 => 一般公共预算支出
  const publicBudgetExpendChartOption = reactive({
    title: [
      getPieTitle({ left: '28%', bottom: '10px', text: '上年同期: 85%' }),
      getPieTitle({ left: '72%', bottom: '10px', text: '上年同期: 85%' })
    ],
    showDot: true,
    detailTitle: '一般公共预算支出',
    tooltip: { show: false },
    legend: { show: false },
    series: [],
    customLegend: []
  })
  // 政府预算收入
  const governmentBudgetIncomeChartOption = reactive({
    title: [
      getPieTitle({ left: '22%', bottom: '45px', text: '上年同期: 85%' })
    ],
    showDot: true,
    detailTitle: '政府性基金预算收入',
    unit: '单位：亿元',
    tooltip: { show: false },
    legend: { show: false },
    series: [],
    customLegend: []
  })
  // 政府预算支出
  const governmentBudgetExpendChartOption = reactive({
    title: [
      getPieTitle({ left: '22%', bottom: '45px', text: '上年同期: 85%' })
    ],
    showDot: true,
    detailTitle: '政府性基金预算支出',
    unit: '单位：亿元',
    tooltip: { show: false },
    legend: { show: false },
    series: [],
    customLegend: []
  })
  onMounted(() => {
    // 模拟异步请求 后续改为接口赋值
    setTimeout(() => {
      publicBudgetIncomeChartOption.series = [
        // 画第一个执行进度
        // 画外层边
        getGaugeSeries({
          z: 2,
          clockwise: true,
          startAngle: 225,
          endAngle: -45,
          radius: '32%',
          center: ['28%', '72%'],
          data: [100],
          splitLine: {
            show: false
          },
          progress: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: [[0, '#CFDEFC'], [1, '#CFDEFC']]
            }
          },
          detail: {
            show: false
          },
          title: {
            show: false
          },
          axisLabel: {
            show: false
          }
        }),
        // 画进度
        getGaugeSeries({
          z: 1,
          clockwise: true,
          startAngle: 225,
          endAngle: -45,
          radius: '30%',
          center: ['28%', '72%'],
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 14,
              color: [[0, getColor('fadeBlue')], [1, getColor('fadeBlue')]]
            }
          },
          progress: {
            show: true,
            width: 14,
            itemStyle: {
              color: getColor('blue')
            }
          },
          data: [
            {
              value: '60',
              name: '执行进度'
            }
          ],
          detail: {
            formatter: '{value}%',
            color: '#2E3133',
            fontSize: 20,
            offsetCenter: [0, 0]
          },
          title: {
            show: true,
            offsetCenter: [0, '100%'],
            color: '#666',
            fontSize: 14
          }
        }),
        // 画第二个预决算偏离度
        // 画外层边
        getGaugeSeries({
          z: 2,
          clockwise: true,
          startAngle: 225,
          endAngle: -45,
          radius: '32%',
          center: ['72%', '72%'],
          data: [100],
          splitLine: {
            show: false
          },
          progress: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: [[0, getColor('fadeYellow')], [1, getColor('fadeYellow')]]
            }
          },
          detail: {
            show: false
          },
          title: {
            show: false
          },
          axisLabel: {
            show: false
          }
        }),
        // 画进度
        getGaugeSeries({
          z: 1,
          clockwise: true,
          startAngle: 225,
          endAngle: -45,
          radius: '30%',
          center: ['72%', '72%'],
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 14,
              color: [[0, getColor('fadeYellow')], [1, getColor('fadeYellow')]]
            }
          },
          progress: {
            show: true,
            width: 14,
            itemStyle: {
              color: getColor('yellow')
            }
          },
          data: [
            {
              value: '60',
              name: '预决算偏离度'
            }
          ],
          detail: {
            formatter: '{value}%',
            color: '#2E3133',
            fontSize: 20,
            offsetCenter: [0, 0]
          },
          title: {
            show: true,
            offsetCenter: [0, '100%'],
            color: '#666',
            fontSize: 14
          }
        })
      ]
      publicBudgetExpendChartOption.series = [
        // 画第一个执行进度
        // 画外层边
        getGaugeSeries({
          z: 2,
          clockwise: true,
          startAngle: 225,
          endAngle: -45,
          radius: '32%',
          center: ['28%', '72%'],
          data: [100],
          splitLine: {
            show: false
          },
          progress: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: [[0, '#CFDEFC'], [1, '#CFDEFC']]
            }
          },
          detail: {
            show: false
          },
          title: {
            show: false
          },
          axisLabel: {
            show: false
          }
        }),
        // 画进度
        getGaugeSeries({
          z: 1,
          clockwise: true,
          startAngle: 225,
          endAngle: -45,
          radius: '30%',
          center: ['28%', '72%'],
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 14,
              color: [[0, getColor('fadeBlue')], [1, getColor('fadeBlue')]]
            }
          },
          progress: {
            show: true,
            width: 14,
            itemStyle: {
              color: getColor('blue')
            }
          },
          data: [
            {
              value: '60',
              name: '执行进度'
            }
          ],
          detail: {
            formatter: '{value}%',
            color: '#2E3133',
            fontSize: 20,
            offsetCenter: [0, 0]
          },
          title: {
            show: true,
            offsetCenter: [0, '100%'],
            color: '#666',
            fontSize: 14
          }
        }),
        // 画第二个预决算偏离度
        // 画外层边
        getGaugeSeries({
          z: 2,
          clockwise: true,
          startAngle: 225,
          endAngle: -45,
          radius: '32%',
          center: ['72%', '72%'],
          data: [100],
          splitLine: {
            show: false
          },
          progress: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: [[0, getColor('fadeYellow')], [1, getColor('fadeYellow')]]
            }
          },
          detail: {
            show: false
          },
          title: {
            show: false
          },
          axisLabel: {
            show: false
          }
        }),
        // 画进度
        getGaugeSeries({
          z: 1,
          clockwise: true,
          startAngle: 225,
          endAngle: -45,
          radius: '30%',
          center: ['72%', '72%'],
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 14,
              color: [[0, getColor('fadeYellow')], [1, getColor('fadeYellow')]]
            }
          },
          progress: {
            show: true,
            width: 14,
            itemStyle: {
              color: getColor('yellow')
            }
          },
          data: [
            {
              value: '60',
              name: '预决算偏离度'
            }
          ],
          detail: {
            formatter: '{value}%',
            color: '#2E3133',
            fontSize: 20,
            offsetCenter: [0, 0]
          },
          title: {
            show: true,
            offsetCenter: [0, '100%'],
            color: '#666',
            fontSize: 14
          }
        })
      ]
      governmentBudgetIncomeChartOption.series = [
        // 画进度
        getGaugeSeries({
          clockwise: true,
          startAngle: 90,
          endAngle: -270,
          radius: '28%',
          center: ['22%', '55%'],
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 12,
              color: [[0, getColor('gray')], [1, getColor('gray')]]
            }
          },
          progress: {
            show: true,
            width: 12,
            roundCap: true,
            itemStyle: {
              color: getColor('blue')
            }
          },
          data: [
            {
              value: '60',
              name: '执行进度'
            }
          ],
          detail: {
            formatter: '{value}%',
            color: '#2E3133',
            fontSize: 20,
            offsetCenter: [0, 0]
          },
          title: {
            show: true,
            offsetCenter: [0, '140%'],
            color: '#666',
            fontSize: 14
          }
        })
      ]
      governmentBudgetExpendChartOption.series = [
        // 画进度
        getGaugeSeries({
          clockwise: true,
          startAngle: 90,
          endAngle: -270,
          radius: '28%',
          center: ['22%', '55%'],
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 12,
              color: [[0, getColor('gray')], [1, getColor('gray')]]
            }
          },
          progress: {
            show: true,
            width: 12,
            roundCap: true,
            itemStyle: {
              color: getColor('blue')
            }
          },
          data: [
            {
              value: '60',
              name: '执行进度'
            }
          ],
          detail: {
            formatter: '{value}%',
            color: '#2E3133',
            fontSize: 20,
            offsetCenter: [0, 0]
          },
          title: {
            show: true,
            offsetCenter: [0, '140%'],
            color: '#666',
            fontSize: 14
          }
        })
      ]
    })
  })
  return {
    publicBudgetIncomeChartOption,
    publicBudgetExpendChartOption,
    governmentBudgetIncomeChartOption,
    governmentBudgetExpendChartOption
  }
}
