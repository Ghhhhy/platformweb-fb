import { onMounted, ref } from '@vue/composition-api'
import {
  getTooltipFormatter,
  getAxisLabelFormatter,
  getDataZoom,
  getScatterSeries,
  getAxis,
  getChartColors,
  getLegend
} from '@/views/main/financial-portrayal/model/getEchartsConfig'
import { citys, citysMap } from '@/views/main/warningOverview/modal/data'
import { queryAnalysisByMof } from '@/api/frame/main/subjectAnalysis'

export const useAdminDivScatter = () => {
  const colors = getChartColors()
  const getCityColor = (city) => {
    return colors[citys.findIndex(item => item === city)] || colors[0]
  }

  const yAxisNum = 6

  const chartOption = ref({
    grid: {
      bottom: 57,
      left: 80,
      right: 110,
      top: 80
    },
    dataZoom: [getDataZoom({
      type: 'slider',
      bottom: 25,
      minValueSpan: 6,
      maxValueSpan: 6,
      moveHandleSize: 15
    })],
    xAxis: {
      splitLine: { show: false },
      data: [],
      axisLabel: {
        formatter: getAxisLabelFormatter(7, { isSlice: true, suffix: '...' }),
        margin: 25,
        lineHeight: 22,
        ellipsis: '...'
      }
    },
    yAxis: ['left', 'right'].map((position, index) => {
      return getAxis({
        position,
        type: 'category',
        axisLabel: {
          show: false
        },
        splitLineShow: true,
        data: citys.slice(index * yAxisNum, yAxisNum * (index + 1)).reverse(),
        boundaryGap: false
      })
    }),
    tooltip: {
      show: true,
      formatter: getTooltipFormatter('seriesName', true),
      axisPointer: {
        type: 'shadow',
        axis: 'x'
      }
    },
    legend: ['left', 'right'].map((position, index) => {
      return getLegend({
        type: 'plain',
        orient: 'vertical',
        top: 50,
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
          lineHeight: 51
        },
        data: citys.slice(index * yAxisNum, yAxisNum * (index + 1))
      })
    }),
    series: []
  })

  /**
   * 格式化series
   * @param dataOrigin
   * @param maxNumber
   * @returns {*}
   */
  const formatterSeries = (dataOrigin = [], maxNumber = 1) => {
    return ['left', 'right']
      .map((position, index) => {
        return citysMap.slice(index * yAxisNum, yAxisNum * (index + 1))
          .map((city) => {
            return getScatterSeries({
              name: city.name,
              itemStyle: {
                color: getCityColor(city.name),
                opacity: 0.4
              },
              yAxisIndex: index,
              symbolOffset: [-10 + index * 20, 0],
              symbolSize: (itemValue) => {
                const value = (itemValue[2] / maxNumber) * 50
                if (value < 10) return 10
                return value
              },
              data: dataOrigin?.map(dataItem => {
                return [dataItem.fiRuleName, city.name, dataItem[city.key] || 10]
              })
            })
          })
      })
      .flat()
  }

  /**
   * 获取接口返回数据中的最大值
   * @param arr
   * @returns {number}
   */
  const getMaxNumber = (arr = []) => {
    const max = arr?.reduce((total, item) => {
      const itemMax = Math.max(...citysMap.map(city => {
        return item[city.key]
      }))
      return itemMax > total ? itemMax : total
    }, 0)
    return max || 1
  }

  const updateSeries = async () => {
    const { data } = await queryAnalysisByMof()
    chartOption.value.xAxis.data = data?.map(item => {
      return item.fiRuleName
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
