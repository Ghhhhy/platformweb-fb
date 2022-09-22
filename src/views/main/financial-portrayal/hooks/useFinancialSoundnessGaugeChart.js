import { reactive, onMounted, toRaw } from '@vue/composition-api'
import {
  getGaugeSeries,
  // getGaugeOnlyProgress,
  getPieTitle
  // getGaugeAxisLine
} from '../model/getEchartsConfig'

export const useFinancialSoundnessGaugeChart = () => {
  // 获取公共配置
  const getCommonOption = (detailTitle = '', option = {}) => {
    return {
      detailTitle,
      title: getPieTitle({ left: '50%', bottom: '8px', text: '' }),
      showDot: true,
      tooltip: { show: false },
      legend: { show: false },
      series: [],
      ...option
    }
  }
  const financialSoundnessGaugeChartOption = reactive({
    // 财政依存度
    financialRelyRatit: {
      ...getCommonOption('财政依存度')
    },
    // 收入弹性
    incomeElasticityRatit: {
      ...getCommonOption('收入弹性')
    },
    // 财政自给率
    financialSelfRatit: {
      ...getCommonOption('财政自给率')
    },
    // 土地财政依赖度
    landFinanceRatit: {
      ...getCommonOption('土地财政依赖度')
    },
    // 税收收入占比
    taxIncomeRatit: {
      ...getCommonOption('税收收入占比')
    },
    // 大税占比
    bigTaxRatit: {
      ...getCommonOption('大税占比')
    },
    // 人均财政支出水平
    financialIncomeRatit: {
      ...getCommonOption('人均财政支出水平')
    },
    // 预算收入结构比例
    budgetIncomeRatit: {
      ...getCommonOption('预算收入结构比例')
    }
  })

  onMounted(() => {
    Object.keys(toRaw(financialSoundnessGaugeChartOption))
      .forEach(key => {
        financialSoundnessGaugeChartOption[key].title.text = '上年同期10%'
        financialSoundnessGaugeChartOption[key].series = [
          // 画底色和分割刻度
          getGaugeSeries({
            z: 2,
            clockwise: true,
            startAngle: 90,
            endAngle: -270,
            radius: '58%',
            data: [100],
            splitLine: {
              show: true,
              // 尽量设置比环宽，用来遮挡
              length: 18,
              distance: -14,
              lineStyle: {
                color: '#fff',
                width: 2
              }
            },
            progress: {
              show: false
            },
            axisLine: {
              show: false
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
            startAngle: 90,
            endAngle: -270,
            radius: '58%',
            center: ['50%', '52%'],
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false,
              length: 14,
              distance: -14,
              lineStyle: {
                color: '#ff00ff',
                width: 2
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 14,
                color: [[0, '#f1f1f1'], [1, '#f1f1f1']]
              }
            },
            progress: {
              show: true,
              width: 14,
              itemStyle: {
                color: '#69D9AC'
              }
            },
            data: [
              {
                value: '60',
                name: '本期'
              }
            ],
            detail: {
              formatter: '{value}%',
              color: '#2E3133',
              fontSize: 20,
              offsetCenter: [0, '-10%']
            },
            title: {
              show: true,
              offsetCenter: [0, '30%'],
              color: '#666',
              fontSize: 14
            }
          })
        ]
      })
  })
  return {
    financialSoundnessGaugeChartOption
  }
}
