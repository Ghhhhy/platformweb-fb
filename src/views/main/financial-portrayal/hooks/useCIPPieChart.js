import { reactive, onMounted } from '@vue/composition-api'
import {
  getColor,
  getPieTitle,
  getPolar,
  getPolarBarSeries,
  getDataStyle
} from '../model/getEchartsConfig'

export const useCIPPieChart = () => {
  const CIPCommonChartOption = reactive({
    detailTitle: '居民消费价格指数',
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
  // 区域基本情况 => 居民消费价格指数(本期)
  const CIPCurrentChartOption = reactive({
    title: [
      getPieTitle({ left: '50%', bottom: '20px', text: 'CIP', subtext: '本期' }),
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
  const CIPLastChartOption = reactive({
    title: [
      getPieTitle({ left: '50%', bottom: '20px', text: 'CIP', subtext: '上年同期' }),
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
      CIPCurrentChartOption.series = [
        // 灰色背景
        getPolarBarSeries({
          data: [100],
          itemStyle: {
            color: getColor('gray')
          },
          barGap: '-100%',
          z: 1
        }),
        // 实际值
        getPolarBarSeries({
          data: [80],
          itemStyle: {
            color: getColor('blue')
          },
          z: 2
        })
      ]
      CIPLastChartOption.series = [
        // 灰色背景
        getPolarBarSeries({
          data: [100],
          itemStyle: {
            color: getColor('gray')
          },
          barGap: '-100%',
          z: 1
        }),
        // 实际值
        getPolarBarSeries({
          data: [50],
          itemStyle: {
            color: getColor('green')
          },
          z: 2
        })
      ]
    })
  })
  return {
    CIPCommonChartOption,
    CIPCurrentChartOption,
    CIPLastChartOption
  }
}
