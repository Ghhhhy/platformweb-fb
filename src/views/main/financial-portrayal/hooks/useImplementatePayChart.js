import { reactive, onMounted } from '@vue/composition-api'
import {
  getColor,
  getPieTitle,
  getPolar,
  getPolarBarSeries,
  getDataStyle
} from '../model/getEchartsConfig'

export const useImplementatePayChart = () => {
  const ImplementatePayCommonChartOption = reactive({
    detailTitle: '一般公共预算支出',
    text: '单位：亿元',
    showDot: true
  })
  // 区域基本情况 => 居民消费价格指数(本期)
  const ImplementatePayCurrentChartOption = reactive({
    title: [
      getPieTitle({ left: '50%', bottom: '5px', text: '执行进度', subtext: '上年同期: 85%' }),
      getPieTitle({ left: '50%', top: '55%', text: '80%', ...getDataStyle() })
    ],
    polar: getPolar({
      center: ['50%', '60%'],
      radius: ['40%', '55%']
    }),
    angleAxis: {
      clockwise: true,
      startAngle: 225,
      max: 360 / 270 * 100
    },
    series: []
  })
  // 区域基本情况 => 居民消费价格指数(上年同期)
  const ImplementatePayLastChartOption = reactive({
    title: [
      getPieTitle({ left: '50%', bottom: '5px', text: '预决算偏离度', subtext: '上年同期:85%' }),
      getPieTitle({ left: '50%', top: '55%', text: '50%', ...getDataStyle() })
    ],
    polar: getPolar({
      center: ['50%', '60%'],
      radius: ['40%', '55%']
    }),
    angleAxis: {
      clockwise: true,
      startAngle: 225,
      max: 360 / 270 * 100
    },
    series: []
  })
  onMounted(() => {
    // 模拟异步请求 后续改为接口赋值
    setTimeout(() => {
      ImplementatePayCurrentChartOption.series = [
        // 灰色背景
        getPolarBarSeries({
          data: [100],
          itemStyle: {
            color: getColor('thirdFadeBlue')
          },
          barGap: '-100%',
          z: 1
        }),
        // 实际值
        getPolarBarSeries({
          data: [80],
          itemStyle: {
            color: getColor('thirdBlue')
          },
          z: 2
        })
      ]
      ImplementatePayLastChartOption.series = [
        // 灰色背景
        getPolarBarSeries({
          data: [100],
          itemStyle: {
            color: getColor('thirdFadeOrange')
          },
          barGap: '-100%',
          z: 1
        }),
        // 实际值
        getPolarBarSeries({
          data: [50],
          itemStyle: {
            color: getColor('thirdOrange')
          },
          z: 2
        })
      ]
    })
  })
  return {
    ImplementatePayCommonChartOption,
    ImplementatePayCurrentChartOption,
    ImplementatePayLastChartOption
  }
}
