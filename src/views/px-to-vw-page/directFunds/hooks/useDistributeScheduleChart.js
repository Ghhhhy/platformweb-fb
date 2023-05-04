import { onMounted, ref } from '@vue/composition-api'
import {
  getColor,
  getGaugeSeries
} from '@/hooks/useChart/getChartConfig.js'
import computedPx from '@/utils/computedPx'

// 三保支出
export const useDistributeScheduleChart = () => {
  const distributeScheduleOption = ref({
    tooltip: { show: false },
    legend: { show: false },
    series: []
  })

  onMounted(() => {
    distributeScheduleOption.value.series = [
      // 画第一个本期
      // 画外层边
      getGaugeSeries({
        z: 2,
        clockwise: true,
        startAngle: 225,
        endAngle: -45,
        radius: '45%',
        center: ['30%', '56%'],
        data: [100],
        splitLine: {
          show: false
        },
        progress: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: computedPx(2),
            color: [[0, '#CFDEFC'], [1, '#CFDEFC']]
          }
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
        startAngle: 225,
        endAngle: -45,
        radius: '41%',
        center: ['30%', '56%'],
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: computedPx(18),
            color: [[0, getColor('fadeBlue')], [1, getColor('fadeBlue')]]
          }
        },
        progress: {
          show: true,
          width: computedPx(18),
          itemStyle: {
            color: getColor('blue')
          }
        },
        data: [
          {
            value: '60',
            name: '本期'
          }
        ],
        title: {
          show: true,
          offsetCenter: [0, '96%'],
          color: '#666',
          fontSize: computedPx(16)
        }
      }),
      // 画第二个上年同期
      // 画外层边
      getGaugeSeries({
        z: 2,
        clockwise: true,
        startAngle: 225,
        endAngle: -45,
        radius: '45%',
        center: ['74%', '56%'],
        data: [100],
        splitLine: {
          show: false
        },
        progress: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: computedPx(2),
            color: [[0, getColor('fadeYellow')], [1, getColor('fadeYellow')]]
          }
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
        startAngle: 225,
        endAngle: -45,
        radius: '41%',
        center: ['74%', '56%'],
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: computedPx(18),
            color: [[0, getColor('fadeYellow')], [1, getColor('fadeYellow')]]
          }
        },
        progress: {
          show: true,
          width: computedPx(18),
          itemStyle: {
            color: getColor('orange')
          }
        },
        data: [
          {
            value: '60',
            name: '上年同期'
          }
        ],
        title: {
          show: true,
          offsetCenter: [0, '96%'],
          color: '#666',
          fontSize: computedPx(16)
        }
      })
    ]
  })
  return {
    distributeScheduleOption
  }
}
