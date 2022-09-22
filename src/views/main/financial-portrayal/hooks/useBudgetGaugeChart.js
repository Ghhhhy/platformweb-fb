import { reactive, onMounted, toRaw } from '@vue/composition-api'
import {
  getGaugeSeries,
  // getGaugeOnlyProgress,
  getPieTitle
  // getGaugeAxisLine
} from '../model/getEchartsConfig'

export const useBudgetGaugeChart = () => {
  // 获取公共配置
  const getCommonOption = (detailTitle = '', option = {}) => {
    return {
      detailTitle,
      title: getPieTitle({ left: '50%', bottom: '15px', text: '' }),
      showDot: true,
      tooltip: { show: false },
      legend: { show: false },
      series: [],
      ...option
    }
  }
  const budgetGaugeChartOption = reactive({
    // 社保基金盈余率
    endowmentInsuranceSurplusRatit: {
      ...getCommonOption('社保基金盈余率')
    },
    // 职工养老保险抚养比
    staffEndowmentInsuranceBringRatit: {
      ...getCommonOption('职工养老保险抚养比')
    },
    // 城乡居民养老保险抚养比
    cityEndowmentInsuranceBringRatit: {
      ...getCommonOption('城乡居民养老保险抚养比')
    },
    // 职工养老保险盈余率
    staffEndowmentInsuranceSurplusRatit: {
      ...getCommonOption('职工养老保险盈余率')
    },
    // 城乡居民养老保险盈余率
    cityEndowmentInsuranceSurplusRatit: {
      ...getCommonOption('城乡居民养老保险盈余率')
    },
    // 职工医疗保险盈余率
    staffMedicalInsuranceSurplusRatit: {
      ...getCommonOption('职工医疗保险盈余率')
    },
    // 城乡居民医疗保险盈余率
    cityMedicalInsuranceSurplusRatit: {
      ...getCommonOption('城乡居民医疗保险盈余率')
    }
  })

  onMounted(() => {
    Object.keys(toRaw(budgetGaugeChartOption))
      .forEach(key => {
        budgetGaugeChartOption[key].title.text = '上年同期10%'
        budgetGaugeChartOption[key].series = [
          // 画底色和分割刻度
          getGaugeSeries({
            z: 2,
            clockwise: true,
            startAngle: 90,
            endAngle: -270,
            radius: '50%',
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
            radius: '50%',
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
    budgetGaugeChartOption
  }
}
