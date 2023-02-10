import { reactive, onMounted } from '@vue/composition-api'
import {
  getLineSerie,
  getBarSerie,
  getTooltipFormatter,
  getAxis,
  getTooltip,
  getAreaStyle,
  getColor,
  getAxisLabelFormatter
} from '../model/getEchartsConfig'
import { fixedAssetsXAxis, leadingIndicatorRightYAxis } from '../model/data'

export const useRigidExpenditureLineChart = () => {
  // 财政保障指数 => 刚性支出额
  const rigidExpenditureLineChart = reactive({
    detailTitle: '一般公共预算收入',
    toolbox: {
      show: false,
      feature: {
        saveAsImage: {
          name: '一般公共预算收入'
        }
      }
    },
    title: {
      text: '单位（亿元）',
      left: 'right',
      textStyle: {
        fontFamily: 'PingFangSC-Regular',
        fontSize: '14px',
        color: '#666'
      }
    },
    showDot: true,
    tooltip: {
      ...getTooltip('line'),
      formatter: getTooltipFormatter('seriesName')
    },
    // 由于series中设置了symbol: 'circle' 而默认legend会读取series中symbol，故此处需要手动修改legend的icon
    legend: {
      icon: 'react'
    },
    xAxis: {
      ...getAxis({ type: 'category', data: fixedAssetsXAxis() }),
      // 主要是label文字太长，这里通过formatter换行展示
      axisLabel: {
        formatter: getAxisLabelFormatter()
      }
    },
    yAxis: [
      {
        name: '刚性支出额（亿元）',
        ...getAxis({ type: 'category', data: leadingIndicatorRightYAxis() }),
        nameTextStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: '12px',
          color: '#000000'
        },
        type: 'value'
      },
      {
        ...getAxis({ type: 'category', data: leadingIndicatorRightYAxis() }),
        name: '刚性支出占比(%)',
        axisLabel: {
          formatter: value => `${value}%`
        }
      }
    ],
    series: []
  })
  onMounted(() => {
    // 模拟异步请求 后续改为接口赋值
    setTimeout(() => {
      rigidExpenditureLineChart.series = [
        getBarSerie({
          name: '本期',
          labelShow: true,
          data: [
            {
              name: '“三保”支出',
              value: 279
            },
            {
              name: '对企业职工养老保险',
              value: 650
            },
            {
              name: '债券付息支出',
              value: 100
            },
            {
              name: '债券发行费支出',
              value: 900
            },
            {
              name: '自有财力偿还债券',
              value: 480
            },
            {
              name: '招商引资支出',
              value: 70
            },
            {
              name: '支持中小企业发展',
              value: 190
            },
            {
              name: '财力安排用于暂存',
              value: 200
            }
          ]
        }),
        getBarSerie({
          name: '上年同期',
          labelShow: true,
          data: [
            {
              name: '“三保”支出',
              value: 279
            },
            {
              name: '对企业职工养老保险',
              value: 650
            },
            {
              name: '债券付息支出',
              value: 100
            },
            {
              name: '债券发行费支出',
              value: 900
            },
            {
              name: '自有财力偿还债券',
              value: 480
            },
            {
              name: '招商引资支出',
              value: 70
            },
            {
              name: '支持中小企业发展',
              value: 190
            },
            {
              name: '财力安排用于暂存',
              value: 200
            }
          ]
        }),
        getLineSerie({
          name: '本期占比',
          type: 'line',
          areaStyle: getAreaStyle(),
          showSymbol: true,
          data: [
            {
              name: '“三保”支出',
              value: 279
            },
            {
              name: '对企业职工养老保险',
              value: 650
            },
            {
              name: '债券付息支出',
              value: 100
            },
            {
              name: '债券发行费支出',
              value: 900
            },
            {
              name: '自有财力偿还债券',
              value: 480
            },
            {
              name: '招商引资支出',
              value: 70
            },
            {
              name: '支持中小企业发展',
              value: 190
            },
            {
              name: '财力安排用于暂存',
              value: 200
            }
          ]
        }),
        getLineSerie({
          name: '上年同期占比',
          areaStyle: getAreaStyle(getColor('green')),
          showSymbol: true,
          data: [
            {
              name: '“三保”支出',
              value: 100
            },
            {
              name: '对企业职工养老保险',
              value: 250
            },
            {
              name: '债券付息支出',
              value: 50
            },
            {
              name: '债券发行费支出',
              value: 400
            },
            {
              name: '自有财力偿还债券',
              value: 100
            },
            {
              name: '招商引资支出',
              value: 140
            },
            {
              name: '支持中小企业发展',
              value: 230
            },
            {
              name: '财力安排用于暂存',
              value: 179
            }
          ]
        })
      ]
    })
  })
  return {
    rigidExpenditureLineChart
  }
}
