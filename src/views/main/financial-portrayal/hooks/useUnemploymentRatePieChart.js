import { reactive, onMounted } from '@vue/composition-api'
import {
  getColor,
  getPieTitle,
  getPolar,
  getDataStyle,
  getPolarBarSeries
} from '../model/getEchartsConfig'

export const useUnemploymentRatePieChart = () => {
  const unemploymentRateCommonOption = reactive({
    detailTitle: '失业率',
    customLegend: [
      {
        label: '本期',
        color: getColor('blue')
      },
      {
        label: '上年同期',
        color: getColor('green')
      }
    ]
  })
  // 区域基本情况 => 失业率
  const unemploymentRateCurrentChartOption = reactive({
    title: [
      getPieTitle({ left: '50%', bottom: '10px', text: '本期' }),
      getPieTitle({ left: '50%', top: '55%', text: '75%', ...getDataStyle() })
    ],
    polar: getPolar({
      center: ['50%', '60%']
    }),
    series: []
  })
  // 区域基本情况 => 失业率
  const unemploymentRateLastChartOption = reactive({
    title: [
      getPieTitle({ left: '50%', bottom: '10px', text: '上年同期' }),
      getPieTitle({ left: '50%', top: '55%', text: '75%', ...getDataStyle() })
    ],
    polar: getPolar({
      center: ['50%', '60%']
    }),
    series: []
  })
  onMounted(() => {
    // 模拟异步请求 后续改为接口赋值
    setTimeout(() => {
      unemploymentRateCurrentChartOption.series = [
        // 本期灰色背景
        getPolarBarSeries({
          name: '本期',
          color: getColor('gray'),
          barGap: '-100%',
          data: [100]
        }),
        // 本期实际值
        getPolarBarSeries({
          name: '本期',
          color: getColor('blue'),
          z: 2,
          data: [60]
        })
      ]
      unemploymentRateLastChartOption.series = [
        // 上年同期灰色背景
        getPolarBarSeries({
          name: '上年同期',
          color: getColor('gray'),
          barGap: '-100%',
          data: [100]
        }),
        // 上年同期际值
        getPolarBarSeries({
          name: '上年同期',
          color: getColor('blue'),
          z: 2,
          data: [70]
        })
      ]
    })
  })
  return {
    unemploymentRateCommonOption,
    unemploymentRateCurrentChartOption,
    unemploymentRateLastChartOption
  }
}
