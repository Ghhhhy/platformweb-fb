import { onMounted, ref } from '@vue/composition-api'
import {
  getPieSerie
} from '@/views/main/financial-portrayal/model/getEchartsConfig'
import { getColor } from '@/hooks/useChart/getChartConfig'
import { monitoringBySubject } from '@/api/frame/main/threePublicExpenses/index.js'

export const useLeftTop = () => {
  const chartOption = ref(
    {
      color: [getColor('blue'), getColor('green')],
      title: {
        text: '按业务处室数量',
        left: 'center',
        top: '30',
        textStyle: {
          color: '#333',
          fontSize: 14,
          fontWeight: 'bold'
        }
      },
      legend: {
        x: 'center',
        y: 'bottom'
      },
      series: getPieSerie({
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '55%'],
        itemStyle: {
          normal: {
            label: {
              show: true,
              formatter: '{d}%'// 显示标签
            },
            labelLine: {
              show: true // 显示标签线
              // length:10
            },

            borderWidth: 2, // 设置border的宽度有多大
            borderColor: '#fff'
          }
        },
        data: []
      })
    }
  )
  const chartOptionRight = ref({
    color: [getColor('blue'), getColor('green')],
    title: {
      text: '按下达金额',
      left: 'center',
      top: '30',
      textStyle: {
        color: '#333',
        fontSize: 14,
        fontWeight: 'bold'
      }
    },
    legend: {
      x: 'center',
      y: 'bottom'
    },
    series: getPieSerie({
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '55%'],
      itemStyle: {
        normal: {
          label: {
            show: true,
            formatter: '{d}%'// 显示标签
          },
          labelLine: {
            show: true // 显示标签线
          },

          borderWidth: 2, // 设置border的宽度有多大
          borderColor: '#fff'
        }
      },
      data: []
    })
  })
  /**
   * 请求接口 => 更新图表
   * @returns {Promise<void>}
   */
  const updateSeries = async () => {
    let { data } = await monitoringBySubject()
    // 临时数据
    data = [
      { value: 147, name: '及时下达' },
      { value: 102, name: '未及时下达' }
    ]
    // const { data } = await monitoringBySubject({ regulationClass })
    const serieData = []
    data?.forEach(item => {
      serieData.push({
        name: item.name,
        value: item.value || 0
      })
    })
    chartOption.value.series.data = serieData
  }
  /**
   * 请求接口 => 更新图表
   * @returns {Promise<void>}
   */
  const updateSeriesRight = async () => {
    let { data } = await monitoringBySubject()
    // 临时数据
    data = [
      { value: 147, name: '及时下达' },
      { value: 102, name: '未及时下达' }
    ]
    // const { data } = await monitoringBySubject({ regulationClass })
    const serieData = []
    data?.forEach(item => {
      serieData.push({
        name: item.name,
        value: item.value || 0
      })
    })
    chartOptionRight.value.series.data = serieData
  }
  onMounted(() => {
    updateSeries()
    updateSeriesRight()
  })

  return {
    chartOption,
    chartOptionRight
  }
}
