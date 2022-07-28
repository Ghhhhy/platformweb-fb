import { reactive, onMounted } from '@vue/composition-api'
import {
  getColor,
  getPieTitle,
  getPolar,
  getPolarBarSeries,
  getDataStyle
} from '../model/getEchartsConfig'

export const useGovernmentImplementateChart = () => {
  const GovernmentImplementateCommonChartOption = reactive({
    detailTitle: '政府性基金预算收入',
    text: '单位：亿元',
    showDot: true
  })
  const GovernmentImplementateCurrentChartOption = reactive({
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
  onMounted(() => {
    // 模拟异步请求 后续改为接口赋值
    setTimeout(() => {
      GovernmentImplementateCurrentChartOption.series = [
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
    })
  })
  return {
    GovernmentImplementateCommonChartOption,
    GovernmentImplementateCurrentChartOption
  }
}
