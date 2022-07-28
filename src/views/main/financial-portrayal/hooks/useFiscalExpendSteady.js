import { reactive, onMounted, toRaw, inject, watch } from '@vue/composition-api'
import { getLiquidFillSeries, getPieTitle, getGaugeSeries } from '../model/getEchartsConfig'
export const useFiscalExpendSteady = () => {
  const activeNav = inject('activeNav')
  // 获取公共配置
  const getCommonOption = (detailTitle = '', option = {}) => {
    return {
      detailTitle,
      title: getPieTitle({ left: '50%', bottom: '8px', text: '' }),
      showDot: true,
      tooltip: { show: false },
      legend: { show: false },
      series: [],
      ...option
    }
  }
  // 水球图
  const fiscalExpendLiquidFill = reactive({
    budgetExpendOption: {
      ...getCommonOption('预算支出结构比例')
    },
    administrativeExpendOption: {
      ...getCommonOption('行政管理支出占比')
    },
    educationExpendOption: {
      ...getCommonOption('教育支出占比')
    }
  })

  // 半环图
  const fiscalExpendGauge = reactive({
    // 科技支出占比
    techSpendOption: {
      ...getCommonOption('科技支出占比')
    },
    // 环境保护支出占比
    environmentalOption: {
      ...getCommonOption('环境保护支出占比')
    }
  })

  // 动态设置水波纹（在可视区再启动水波，否则设置为死水）
  const resetWave = (wave = false) => {
    Object.keys(toRaw(fiscalExpendLiquidFill))
      .forEach(key => {
        fiscalExpendLiquidFill[key].series = [
          {
            name: key,
            waveAnimation: wave,
            animationDuration: wave ? 10 : 0,
            animationDurationUpdate: wave ? 10 : 0
          }
        ]
      })
  }

  watch(activeNav, (index) => {
    // 1 => 财政运行情况
    resetWave(index === 1)
  })

  onMounted(() => {
    Object.keys(toRaw(fiscalExpendLiquidFill))
      .forEach(key => {
        fiscalExpendLiquidFill[key].title.text = '上年同期10%'
        fiscalExpendLiquidFill[key].series = [
          getLiquidFillSeries({
            name: key,
            // 第一项因为只是为了渲染水波涟漪效果，需要比实际值大；第二项才是实际值。对接时用实际值+0.05
            data: [
              {
                value: 0.55,
                direction: 'left',
                itemStyle: {
                  color: '#B5CCFC'
                }
              },
              0.5
            ],
            // 注意：水球图展示值，只会取data第一个值，因此可以利用formatter动态设置值
            label: {
              formatter: '50%'
            }
          })
        ]
      })
    Object.keys(toRaw(fiscalExpendGauge))
      .forEach(key => {
        fiscalExpendGauge[key].title.text = '上年同期10%'
        fiscalExpendGauge[key].series = [
          getGaugeSeries({
            center: ['50%', '75%'],
            clockwise: true,
            startAngle: 180,
            endAngle: 0,
            radius: '90%',
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false,
              length: 14,
              distance: -14,
              lineStyle: {
                color: '#ff00ff',
                width: 2
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 14,
                color: [[0, '#f1f1f1'], [1, '#f1f1f1']]
              }
            },
            progress: {
              show: true,
              width: 14,
              itemStyle: {
                color: '#69D9AC'
              }
            },
            data: [
              {
                value: '60',
                name: '本期'
              }
            ],
            detail: {
              formatter: '{value}%',
              color: '#2E3133',
              fontSize: 20,
              offsetCenter: [0, '-10%']
            },
            title: {
              show: true,
              offsetCenter: [0, '-44%'],
              color: '#666',
              fontSize: 14
            }
          })
        ]
      })
  })
  return {
    fiscalExpendLiquidFill,
    fiscalExpendGauge
  }
}
