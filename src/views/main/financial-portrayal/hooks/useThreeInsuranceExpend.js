import { onMounted, reactive, toRaw } from '@vue/composition-api'
import * as echarts from 'echarts'
import {
  getColor,
  getGaugeSeries,
  getTooltip,
  getTooltipFormatter,
  getAxis,
  getPieTitle,
  getBarSerie,
  getGrid
} from '../model/getEchartsConfig'
import { beforeMonthArr, periodXAxis } from '../model/data'

// 三保支出
export const useThreeInsuranceExpend = () => {
  const getThreeInsuranceExpendBottomBaseOption = (detailTitle = '', titleText = '') => {
    return {
      detailTitle: detailTitle,
      title: [
        getPieTitle({ left: '50%', bottom: '14px', text: titleText || '' })
      ],
      showDot: true,
      tooltip: { show: false },
      legend: { show: false },
      series: [],
      customLegend: []
    }
  }
  // 三保上面三个环形图
  const threeInsuranceExpendTopOption = reactive({
    detailTitle: '“三保”支出',
    title: [
      getPieTitle({ left: '20%', bottom: '14px', text: '上年同期：85%' }),
      getPieTitle({ left: '50%', bottom: '14px', text: '上年同期：85%' }),
      getPieTitle({ left: '80%', bottom: '14px', text: '上年同期：85%' })
    ],
    showDot: true,
    tooltip: { show: false },
    legend: { show: false },
    series: [],
    customLegend: []
  })
  // 三保下面三个环
  const threeInsuranceExpendBottomOption = reactive({
    left: getThreeInsuranceExpendBottomBaseOption('保基本民生支出', '上年同期：85%'),
    center: getThreeInsuranceExpendBottomBaseOption('保工资支出', '上年同期：85%'),
    right: getThreeInsuranceExpendBottomBaseOption('保运转支出', '上年同期：85%')
  })
  // 时序图下面的bar图
  const threeInsuranceExpendTimeSqueOption = reactive({
    detailTitle: '时序图',
    showDot: true,
    grid: getGrid({ top: 280, left: 16, right: 16, bottom: 16 }),
    tooltip: {
      ...getTooltip(),
      formatter: getTooltipFormatter('seriesName')
    },
    legend: {
      icon: 'rect',
      top: 220,
      left: 16
    },
    xAxis: {
      ...getAxis({ type: 'category', data: beforeMonthArr() }),
      axisLabel: { formatter: value => `${value}月` }
    },
    series: []
  })
  // 保运转支出bar堆叠
  const maintenanceExpenditureOption = reactive({
    detailTitle: '保运转支出',
    unit: '单位：亿元',
    showDot: true,
    legend: {
      width: 330
    },
    grid: getGrid({ top: 122, left: 16, right: 16, bottom: 205 }),
    tooltip: {
      ...getTooltip(),
      formatter: getTooltipFormatter('seriesName')
    },
    xAxis: getAxis({ type: 'category', data: periodXAxis() }),
    series: []
  })

  onMounted(() => {
    threeInsuranceExpendTopOption.series = [
      // 画第一个预算占比
      // 画外层边
      getGaugeSeries({
        z: 2,
        clockwise: true,
        startAngle: 225,
        endAngle: -45,
        radius: '50%',
        center: ['20%', '56%'],
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
        radius: '46%',
        center: ['20%', '56%'],
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
            name: '预算占比'
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
      // 画第二个预算偏离度
      // 画外层边
      getGaugeSeries({
        z: 2,
        clockwise: true,
        startAngle: 225,
        endAngle: -45,
        radius: '50%',
        center: ['50%', '56%'],
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
        radius: '46%',
        center: ['50%', '56%'],
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
            name: '预算偏离度'
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
      // 画第三个支出占比
      // 画外层边
      getGaugeSeries({
        z: 2,
        clockwise: true,
        startAngle: 225,
        endAngle: -45,
        radius: '50%',
        center: ['80%', '56%'],
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
            color: [[0, getColor('fadeRed')], [1, getColor('fadeRed')]]
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
        radius: '46%',
        center: ['80%', '56%'],
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
            color: [[0, getColor('fadeRed')], [1, getColor('fadeRed')]]
          }
        },
        progress: {
          show: true,
          width: 14,
          itemStyle: {
            color: getColor('red')
          }
        },
        data: [
          {
            value: '60',
            name: '支出占比'
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
    Object.keys(toRaw(threeInsuranceExpendBottomOption)).forEach(key => {
      threeInsuranceExpendBottomOption[key].series = [
        // 画进度
        getGaugeSeries({
          clockwise: true,
          startAngle: 90,
          endAngle: -270,
          radius: '48%',
          center: ['50%', '60%'],
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
            width: 10,
            roundCap: true,
            itemStyle: {
              color: getColor('blue')
            }
          },
          data: [
            {
              value: '60',
              name: '保基本民生支出'
            }
          ],
          detail: {
            formatter: '{value}%',
            color: '#2E3133',
            fontSize: 20,
            offsetCenter: [0, 0]
          },
          title: {
            show: false
          }
        })
      ]
    })
    threeInsuranceExpendTimeSqueOption.series = [
      getBarSerie({
        name: '当前支出',
        type: 'pictorialBar',
        symbol: 'rect',
        symbolSize: [10, 4],
        symbolRepeat: true,
        symbolMargin: 1,
        data: beforeMonthArr().map((item, index) => {
          return {
            value: item * 100,
            itemStyle: { color: getColor('blue') }
          }
        })
      }),
      getBarSerie({
        name: '应该支出',
        type: 'line',
        symbolSize: 0,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(105,217,172,0.1)'
            },
            {
              offset: 1,
              color: 'rgba(255,255,255,0.1)'
            }
          ], false)
        },
        lineStyle: {
          color: getColor('green'),
          width: 1
        },
        data: beforeMonthArr().map((item, index) => {
          return {
            value: 500,
            itemStyle: { color: getColor('green') }
          }
        })
      })
    ]
    maintenanceExpenditureOption.series = [
      getBarSerie({
        type: 'bar',
        name: '转移性收入',
        barWidth: 24,
        stack: 'income',
        itemStyle: {
          color: getColor('blue')
        },
        data: [100, 200]
      }),
      getBarSerie({
        type: 'bar',
        name: '暂存款收回',
        barWidth: 24,
        stack: 'income',
        itemStyle: {
          color: getColor('green')
        },
        data: [100, 200]
      }),
      getBarSerie({
        type: 'bar',
        name: '债券收入',
        barWidth: 24,
        stack: 'income',
        itemStyle: {
          color: getColor('yellow')
        },
        data: [100, 200]
      }),
      getBarSerie({
        type: 'bar',
        name: '其他',
        barWidth: 24,
        stack: 'income',
        itemStyle: {
          color: getColor('brownness')
        },
        data: [100, 200]
      }),
      getBarSerie({
        type: 'bar',
        name: '转移性支出',
        barWidth: 24,
        stack: 'expend',
        itemStyle: {
          color: getColor('fadeBlue')
        },
        data: [100, 200]
      }),
      getBarSerie({
        type: 'bar',
        name: '暂付款流出',
        barWidth: 24,
        stack: 'expend',
        itemStyle: {
          color: getColor('fadeGreen')
        },
        data: [100, 200]
      }),
      getBarSerie({
        type: 'bar',
        name: '暂存库流出',
        barWidth: 24,
        stack: 'expend',
        itemStyle: {
          color: getColor('fadeYellow')
        },
        data: [100, 200]
      }),
      getBarSerie({
        type: 'bar',
        name: ' 其他',
        barWidth: 24,
        stack: 'expend',
        itemStyle: {
          color: getColor('fadeBrownness')
        },
        data: [100, 200]
      })
    ]
  })
  return {
    threeInsuranceExpendTopOption,
    threeInsuranceExpendBottomOption,
    threeInsuranceExpendTimeSqueOption,
    maintenanceExpenditureOption
  }
}
