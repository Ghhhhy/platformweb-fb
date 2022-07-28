import { reactive, onMounted } from '@vue/composition-api'
import {
  getColor,
  getPolar,
  getPolarBarSeries
} from '../model/getEchartsConfig'
import { periodXAxis } from '../model/data'

export const useExFactoryPricePieChart = () => {
  const exFactoryPriceCommonOption = reactive({
    detailTitle: '工业品出厂价格指数',
    options: []
  })
  // 区域基本情况 => 工业品出厂价格指数
  const exFactoryPriceChartOption = reactive({
    polar: getPolar({
      center: ['60%', '60%'],
      radius: ['28%', '80%']
    }),
    angleAxis: {
      // 度增长是否按顺时针
      clockwise: false
    },
    series: []
  })
  onMounted(() => {
    // 模拟异步请求 后续改为接口赋值
    setTimeout(() => {
      exFactoryPriceCommonOption.options = periodXAxis().map((item, index) => {
        return {
          label: item,
          value: index,
          color: getColor(index < 1 ? 'green' : 'yellow')
        }
      })
      exFactoryPriceChartOption.series = [
        // 灰色背景
        getPolarBarSeries({
          color: getColor('gray'),
          barGap: '-100%',
          barCategoryGap: '50%',
          data: [100, 100]
        }),
        // 实际值
        getPolarBarSeries({
          color: getColor('blue'),
          z: 2,
          data: [
            // 先写的在内环
            {
              name: '上年同期',
              value: 20,
              itemStyle: { color: getColor('yellow') }
            },
            {
              name: '本期',
              value: 60,
              itemStyle: { color: getColor('green') }
            }
          ]
        })
      ]
    })
  })
  return {
    exFactoryPriceCommonOption,
    exFactoryPriceChartOption
  }
}
