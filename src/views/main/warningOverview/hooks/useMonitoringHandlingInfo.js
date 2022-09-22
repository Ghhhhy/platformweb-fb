import { onMounted, ref } from '@vue/composition-api'
import {
  getTooltipFormatter,
  getAxisLabelFormatter,
  getScatterSeries,
  getAxis,
  getChartColors,
  getLegend
} from '@/views/main/financial-portrayal/model/getEchartsConfig'
import { menus, menuMap } from '../modal/data'
import { monitorProcessing } from '@/api/frame/main/warningOverview'

export const useMonitoringHandlingInfo = () => {
  // 颜色盘
  const colors = getChartColors()

  /**
   * 获取颜色
   * @param menu
   * @returns {*}
   */
  const getMenuColor = (menu) => {
    return colors[menus.findIndex(item => item === menu)] || colors[0]
  }

  /**
   * 格式化series
   * @param dataOrigin
   * @param maxNumber
   * @returns {*}
   */
  const formatterSeries = (dataOrigin = [], maxNumber = 1) => {
    return ['left', 'right']
      .map((position, index) => {
        return menuMap.slice(index * yAxisNum, yAxisNum * (index + 1))
          .map((menu) => {
            return getScatterSeries({
              name: menu.name,
              itemStyle: {
                color: getMenuColor(menu.name),
                opacity: 0.4
              },
              yAxisIndex: index,
              symbolOffset: [-8 + index * 16, 0],
              symbolSize: (itemValue) => {
                const value = (itemValue[2] / maxNumber) * 40
                if (value < 10) return 10
                return value
              },
              data: dataOrigin?.map(city => {
                return [city.mofDivName, menu.name, city[menu.key] || 0]
              })
            })
          })
      })
      .flat()
  }

  // y轴显示的最大数
  const yAxisNum = 5

  // 图表option
  const chartOption = ref({
    grid: {
      bottom: 10,
      left: 120,
      right: 130,
      top: 76
    },
    title: {
      text: '监控处理情况',
      top: 16,
      left: 20,
      textStyle: {
        fontSize: 16,
        lineHeight: 16
      }
    },
    xAxis: {
      splitLine: { show: false },
      data: [],
      axisLabel: {
        formatter: getAxisLabelFormatter(6),
        margin: 20,
        lineHeight: 22
      }
    },
    yAxis: ['left', 'right'].map((position, index) => {
      return getAxis({
        position,
        axisLabel: {
          show: false
        },
        type: 'category',
        splitLineShow: true,
        data: menus.slice((0 + index) * yAxisNum, yAxisNum * (index + 1)).reverse(),
        boundaryGap: false
      })
    }),
    tooltip: {
      show: true,
      formatter: getTooltipFormatter('seriesName')
    },
    legend: ['left', 'right'].map((position, index) => {
      return getLegend({
        type: 'plain',
        orient: 'vertical',
        top: 51,
        left: 'auto',
        right: 'auto',
        bottom: 'auto',
        [position]: 22,
        icon: 'roundRect',
        // 是否可通过点击显隐series
        selectedMode: true,
        itemStyle: {
          // 默认继承自series.data.itemStyle
          opacity: 1
        },
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 0,
        textStyle: {
          color: '#8A9299',
          fontSize: 12,
          lineHeight: 42
        },
        data: menus.slice(index * yAxisNum, yAxisNum * (index + 1))
      })
    }),
    series: []
  })

  /**
   * 获取接口返回数据中的最大值
   * @param arr
   * @returns {number}
   */
  const getMaxNumber = (arr = []) => {
    const max = arr?.reduce((total, item) => {
      const itemMax = Math.max(...menuMap.map(menu => {
        return item[menu.key]
      }))
      return itemMax > total ? itemMax : total
    }, 0)
    return max || 1
  }

  /**
   * 请求接口 => 更新图表
   * @returns {Promise<void>}
   */
  const updateSeries = async () => {
    const { data } = await monitorProcessing()
    chartOption.value.xAxis.data = data?.map(item => {
      return item.mofDivName
    })

    // 最大值（作为symbolSize参考）
    const maxNumber = getMaxNumber(data)

    chartOption.value.series = formatterSeries(data || [], maxNumber)
  }

  onMounted(() => {
    updateSeries()
  })
  return {
    chartOption
  }
}
