import * as echarts from 'echarts'
import { deepMergeObject } from '@/utils/deepMergeObject'

// 获取位置
export const getGrid = (position = {}, containLabel = true) => {
  return {
    top: position.top || 0,
    right: position.right || 0,
    bottom: position.bottom || 0,
    left: position.left || 0,
    containLabel
  }
}

// 获取标题配置
export const getTitle = (text = '') => {
  return {
    text,
    textStyle: {
      fontSize: 14,
      color: '#666',
      lineHeight: 24,
      fontWeight: 500
    },
    left: 16,
    top: 16
  }
}

// 获取tooltip指示器
export const getTooltip = (axisPointerType = 'shadow') => {
  return {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: axisPointerType, // 默认为直线，可选为：'line' | 'shadow',
      shadowStyle: {
        color: 'rgba(0, 0, 0, 0.1)',
        opacity: 0.5
      },
      lineStyle: {
      }
    },
    // formatter: '{b0}: {c0}<br />{b1}: {c1}',
    backgroundColor: '#fff',
    extraCssText: 'padding: 13px; box-shadow: 0px 3px 6px 4px rgba(0,0,0,0.12);',
    textStyle: {
      color: '#333'
    }
  }
}

// 图表Tooltip显示内容配置 params内容参考echarts-tooltip-formatter
export const getTooltipFormatter = (nameKey = 'name', isShowSeriesName = false) => {
  return function (params = {}) {
    let startSrt = isShowSeriesName
      ? `<div style="text-align: center; margin-bottom: 10px;">${getAxisLabelFormatter(12, { joinSymbol: '<br/>' })(params[0]?.name)}</div>`
      : ''
    return params.reduce((sum, item) => {
      const value = item.value
      const realValue = Array.isArray(value) ? value[value.length - 1] : value

      return `
        ${sum}
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; margin-right: 10px; flex: 1; flex-shrink: 0">
            <span style="
              display: inline-block;
              width: 8px;
              height: 8px;
              margin-right: 10px;
              background: ${item?.color};"
            ></span>
            ${item[nameKey] || item?.name || ''}
          </div>
          <span style="flex-shrink: 0">${realValue}</span>
        </div>
      `
    }, startSrt)
  }
}

// 获取图表所使用到的颜色相关
export const getColor = (name) => {
  const colors = {
    white: '#fff',
    blue: '#5B8FF9',
    fadeBlue: '#CDDDFD',
    secondBlue: '#6DC8EC',
    secondFadeBlue: '#D3EEF9',
    thirdBlue: '#6395FA',
    thirdFadeBlue: '#CFDEFC',
    green: '#69D9AC',
    fadeGreen: '#CDF3E4',
    yellow: '#FAAD14',
    fadeYellow: '#FCEBB9',
    red: '#E86452',
    fadeRed: '#F8D0CB',
    orange: '#FF9D4F',
    fadeOrange: '#FFE0C7',
    secondOrange: '#E86452',
    secondFadeOrange: '#F8D0CB',
    thirdOrange: '#FBB120',
    thirdFadeOrange: '#FCEBB9',
    gray: '#F1F1F1',
    brownness: '#5D7493',
    fadeBrownness: '#CED5DE '
  }
  if (typeof name === 'string') {
    return colors[name] || colors.white
  }
  if (Array.isArray(name)) {
    return Object.keys(colors)
      .filter(item => name.includes(item))
      .map(key => colors[key])
  }
  return colors.white
}
// 获取图例配置
export const getLegend = (option) => {
  return {
    show: true,
    // 不响应鼠标点击改变现实状态
    selectedMode: false,
    left: 12,
    top: 48,
    textStyle: {
      color: '#8C8C8C',
      fontSize: 12,
      lineHeight: 12
    },
    itemWidth: 6,
    itemHeight: 10,
    itemGap: 16,
    borderRadius: 0,
    ...option
  }
}

// 获取轴配置
export const getAxis = (option = {}) => {
  return {
    // type: 'value' | 'category'
    type: option.type || 'value',
    data: option.data || [],
    // 分割段数（预估值）
    // splitNumber: 4,
    // 轴线
    axisLine: {
      show: false,
      lineStyle: {
        color: '#8C8C8C'
      }
    },
    // 多轴时 自动对齐刻度
    alignTicks: true,
    // 刻度
    axisTick: {
      show: false
    },
    // 分割线
    splitLine: {
      show: option.splitLineShow || false,
      lineStyle: {
        color: '#F1F1F1',
        type: 'dashed'
      }
    },
    nameLocation: 'center',
    nameTextStyle: {
      color: '#000',
      fontSize: 12,
      fontFamily: 'PingFangSC-Regular',
      padding: [30, 0]
    },
    ...option
  }
}

// 获取axisLabel，这里单独提取出来为了方便写formatter
export const getAxisLabel = (formatter = (value) => value) => {
  return {
    color: '#8C8C8C',
    fontSize: 12,
    lineHeight: 18,
    // 强制显示所有
    interval: 0,
    hideOverlap: false,
    formatter
  }
}

// axisLabel超过某长度换行
export const getAxisLabelFormatter = (maxLength = 4, config = { isSlice: false, suffix: '...', joinSymbol: '\n' }) => {
  return function(value) {
    const length = value.length
    if (!value) return ''
    if (value && length < maxLength) return value

    if (config.isSlice) {
      return `${value.substr(0, maxLength)}${config.suffix || '...'}`
    }
    const sliceArr = []
    for (let i = 0; i < length; i = i + maxLength) {
      const startIndex = Math.min(i, value.length - 1)
      sliceArr.push(value.substr(startIndex, maxLength))
    }
    return sliceArr.join(config.joinSymbol || '\n')
  }
}

// 获取bar图serie配置
export const getBarSerie = (option = {}) => {
  return {
    type: option.type || 'bar',
    name: option.name || '',
    label: {
      show: option.labelShow || false,
      position: 'top',
      color: 'rgba(0,0,0,0.65)'
    },
    barWidth: option.barWidth || 36,
    data: option.data || [],
    ...option
  }
}

// 获取bar图serie配置
export const getLineSerie = (option = {}) => {
  return {
    type: 'line',
    name: option.name || '',
    label: {
      show: option.labelShow || false,
      position: 'top',
      color: 'rgba(0,0,0,0.65)'
    },
    // 标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10[ default: 4 ]
    symbolSize: 3,
    // 标记的图形。ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
    symbol: 'circle',
    // 是否平滑曲线显示
    smooth: option.smooth || false,
    smoothMonotone: 'x',
    // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示
    showSymbol: option.showSymbol || false,
    lineStyle: {
      width: 1
    },
    data: option.data || [],
    ...option
  }
}

// 获取pie图serie配置
export const getPieSerie = (option = {}) => {
  return {
    type: 'pie',
    name: option.name || '',
    // 鼠标经过的特效
    hoverAnimation: false,
    radius: ['35%', '45%'],
    center: ['30%', '60%'],
    startAngle: 225,
    data: option.data || [],
    labelLine: {
      show: false
    },
    itemStyle: {
      borderCap: 'round'
    },
    roundCap: true,
    ...option
  }
}

// 获取pie的title和subTitle
export const getPieTitle = (option = { text: '', subtext: '' }) => {
  return {
    text: '',
    textAlign: 'center',
    textStyle: {
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
      fontWeight: 'normal'
    },
    subtext: '',
    subtextStyle: {
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
      fontWeight: 'normal'
    },
    emphasis: {
      disabled: false
    },
    blur: {
      label: { show: false }
    },
    ...option
  }
}

// 获取pie图展位dataStyle
export const getPlaceHolderStyle = () => {
  return {
    label: {
      show: false
    },
    labelLine: {
      show: false
    },
    color: 'rgba(0,0,0,0)',
    borderWidth: 0,
    emphasis: {
      color: 'rgba(0,0,0,0)',
      borderWidth: 0
    }
  }
}

// 设置pie图label
export const getDataStyle = () => {
  return {
    formatter: (item) => {
      // console.log(value)
      // 后期看接口怎么给数据，这里相应调整
      return `${item?.percent || 0}%`
    },
    position: 'center',
    show: true,
    textStyle: {
      fontSize: 24,
      fontWeight: 500,
      color: '#666'
    }
  }
}

// 获取区域面积图填充样式
export const getAreaStyle = (startColor = getColor('blue'), endColor = getColor('white')) => {
  return {
    color: new echarts.graphic.LinearGradient(
      0,
      0,
      0,
      1,
      [
        {
          offset: 0,
          color: startColor
        },
        {
          offset: 1,
          color: endColor
        }
      ],
      false
    ),
    // shadowColor: 'rgba(255,255,255, 0.1)',
    opacity: 0.3
  }
}

// 获取象形图Symbol
export const getPictorialBarSymbol = () => {
  return 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z'
}

// 获取角度轴
export const getAngleAxis = (option = {}) => {
  return {
    min: 0,
    max: 100,
    axisLine: {
      show: false
    },
    axisLabel: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    boundaryGap: false,
    // 度增长是否按顺时针
    clockwise: true,
    ...option
  }
}

// 获取半径轴
export const getRadiusAxis = (option) => {
  return {
    type: 'category',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    z: 5,
    ...option
  }
}

// 获取极坐标系
export const getPolar = (option = {}) => {
  return {
    radius: ['35%', '50%'],
    center: ['50%', '50%'],
    ...option
  }
}

// 获取极坐标下的bar图
export const getPolarBarSeries = (option = {}) => {
  return {
    type: 'bar',
    coordinateSystem: 'polar',
    z: 1,
    name: '',
    // 两端使用圆弧效果
    roundCap: true,
    color: getColor('gray'),
    emphasis: {
      disabled: true
    },
    data: [],
    ...option
  }
}

// 获取仪表盘axisLine
export const getGaugeAxisLine = (show = true, option = {}) => {
  return {
    show,
    lineStyle: {
      width: 30,
      color: [],
      ...option
    }
  }
}

// 获取仪表盘配置
export const getGaugeSeries = (option = {}) => {
  return {
    type: 'gauge',
    z: 1,
    name: '',
    center: ['50%', '50%'],
    radius: '72%',
    startAngle: 225,
    endAngle: -45,
    clockwise: true,
    data: [],
    min: 0,
    max: 100,
    splitNumber: 10,
    // 进度条
    progress: getProgress(),
    // 刻度线
    axisTick: {
      show: false
    },
    // 分割线
    splitLine: {
      show: false
    },
    // 刻度标签
    axisLabel: {
      color: '#666',
      distance: 8
    },
    // 轴线
    axisLine: {
      show: true,
      lineStyle: {
        width: 1,
        color: [
          [1, new echarts.graphic.LinearGradient(0, 1, 1, 0, [
            {
              offset: 0,
              color: '#CDDDFD'
            },
            {
              offset: 1,
              color: '#6395FA'
            }
          ])]
        ]
      }
    },
    // 指针
    pointer: {
      show: false
    },
    anchor: {
      show: false
    },
    detail: {
      formatter: '{value}%',
      color: '#2E3133',
      fontSize: 24,
      offsetCenter: [0, 0]
    },
    title: {
      show: true,
      offsetCenter: [0, '80%'],
      color: '#666',
      fontSize: 14
    },
    ...option
  }
}

// 水球
export const getLiquidFillSeries = (option = {}) => {
  const series = {
    type: 'liquidFill',
    silent: true,
    amplitude: 4,
    data: [],
    // 波浪方向或者静止
    direction: 'right',
    // 死水
    // waveAnimation: false,
    // animationDuration: 0,
    // animationDurationUpdate: 0,
    radius: '50%',
    // 水球颜色
    color: [
      new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: '#5B8FF9'
        },
        {
          offset: 1,
          color: '#5B8FF9'
        }
      ])
    ],
    // 水球位置
    center: ['50%', '54%'],
    // outline外边
    outline: {
      // 内环padding值
      borderDistance: 2,
      itemStyle: {
        // 圆边线宽度
        borderWidth: 2,
        borderColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#5B8FF9'
            },
            {
              offset: 1,
              color: '#5B8FF9'
            }
          ],
          globalCoord: false
        }
      }
    },
    label: {
      formatter: '50%',
      color: '#021330',
      insideColor: '#fff',
      fontSize: 24
    },
    itemStyle: {
      shadowBlur: 0
    },
    // 内图背景色边
    backgroundStyle: {
      color: '#FFFFFF'
    }
  }
  return deepMergeObject(series, option)
}

// 获取一个除了进度条其他隐藏的仪表盘 => 主要是用来绘制仪表盘进度额外的样式(比如画两个进度线)
export const getGaugeOnlyProgress = (option = {}) => {
  return getGaugeSeries({
    radius: '88%',
    name: '',
    data: [],
    axisLabel: { show: false },
    axisLine: option.axisLine || { show: false },
    title: { show: false },
    detail: { show: false },
    progress: getProgress({ width: 1 }),
    ...option
  })
}

// 获取仪表盘进度
export const getProgress = (option = {}) => {
  return {
    show: true,
    width: 26,
    itemStyle: {
      borderCap: 'square',
      color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [
        {
          offset: 0,
          color: '#fff'
        },
        {
          offset: 1,
          color: '#5B8FF9'
        }
      ])
    },
    ...option
  }
}

/**
 * 获取dataZoom
 * @param option
 * @returns {{maxValueSpan: number, minValueSpan: number, orient: string, type: string, zoomLock: boolean, height: number}}
 */
export const getDataZoom = (option = {}) => {
  return {
    type: 'inside',
    minValueSpan: 6,
    maxValueSpan: 6,
    orient: 'horizontal',
    // 上锁：只能拖动不能缩放
    zoomLock: true,
    // 是否开启刷选功能
    brushSelect: false,
    height: 20,
    ...option
  }
}

export const getScatterSeries = (option) => {
  return {
    type: 'scatter',
    itemStyle: {
      opacity: 0.4
    },
    ...option
  }
}

export const getChartColors = () => {
  return [
    '#F98B8B',
    '#25A5A1',
    '#FE805D',
    '#71DBB0',
    '#FF457A',
    '#4CAF51',
    '#475FFF',
    '#DC48FD',
    '#6BEEEB',
    '#9E00FF',
    '#4EACFF',
    '#FFC800'
  ]
}
