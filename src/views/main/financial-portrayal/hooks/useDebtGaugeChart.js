import { reactive, onMounted, toRaw } from '@vue/composition-api'
import { getGaugeSeries, getGaugeOnlyProgress, getPieTitle } from '../model/getEchartsConfig'

export const useDebtGaugeChart = () => {
  // 获取公共配置
  const getCommonOption = (detailTitle = '', option = {}) => {
    return {
      detailTitle,
      title: getPieTitle({ left: '50%', bottom: '40px', text: '' }),
      showDot: true,
      tooltip: { show: false },
      legend: { show: false },
      series: [],
      ...option
    }
  }
  const debtGaugeChartOption = reactive({
    // 政府债务率
    governmentDebtRatit: {
      ...getCommonOption('政府债务率')
    },
    // 政府债务负债率
    governmentDebtToDebtRatit: {
      ...getCommonOption('政府债务负债率')
    },
    // 一般债务支出占比
    generalDebtExpendRatit: {
      ...getCommonOption('一般债务支出占比')
    },
    // 一般债务限额使用率
    generalDebtUseRatit: {
      ...getCommonOption('一般债务限额使用率')
    },
    // 一般债务支出占比
    specialDebtExpendRatit: {
      ...getCommonOption('一般债务支出占比')
    },
    // 一般债务限额使用率
    specialDebtUseRatit: {
      ...getCommonOption('一般债务限额使用率')
    }
  })

  onMounted(() => {
    Object.keys(toRaw(debtGaugeChartOption))
      .forEach(key => {
        debtGaugeChartOption[key].title.text = '上年同期10%'
        debtGaugeChartOption[key].series = [
          getGaugeSeries({
            z: 1,
            name: debtGaugeChartOption[key].detailTitle,
            data: [
              {
                value: 50,
                name: '本期'
              }
            ]
          }),
          getGaugeOnlyProgress({
            radius: '80%',
            data: [
              {
                value: 50,
                name: '本期'
              }
            ]
          }),
          getGaugeOnlyProgress({
            radius: '72%',
            z: -1,
            data: [
              {
                value: 50,
                name: '本期'
              }
            ],
            progress: { show: false },
            axisLine: {
              show: true,
              lineStyle: {
                width: 8,
                shadowBlur: 4,
                shadowColor: 'rgba(99,149,250,0.16',
                color: [[1, 'rgba(99,149,250,0.12']]
              }
            }
          })
        ]
      })
  })
  return {
    debtGaugeChartOption
  }
}
