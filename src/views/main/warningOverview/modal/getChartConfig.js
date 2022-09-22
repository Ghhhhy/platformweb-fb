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
    yellow: '#FFD43C',
    fadeYellow: '#FFE0C7',
    red: '#FF1515',
    fadeRed: '#F8D0CB',
    orange: '#FF9D4F',
    fadeOrange: '#FFE0C7',
    secondOrange: '#FF6F20',
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
