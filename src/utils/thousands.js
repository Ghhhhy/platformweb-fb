// 将常规数值转为千制符
export const formatterThousands = (num) => {
  if (!num) return '0'
  // 将数字通过split用小数点分隔为数组对象
  const numpart = String(num).split('.')
  numpart[0] = numpart[0].replace(/(?=\B(\d{3})+$)/g, ',')
  // 将数组对象第一个数据(整数部分)通过正则表达式每三位用逗号分隔
  // 把数组通过join方法用.进行拼接
  return numpart.join('.')
}

// 将千制符解析为常规数值
export const parseThousands = (s) => {
  if (s === '') return '0'
  return s.replace(/,/g, '')
}
