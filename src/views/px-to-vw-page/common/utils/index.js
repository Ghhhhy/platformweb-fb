/**
 * 获取单位
 * @param {number} money
 * @return {string|string}
 */
export const getUnit = (money) => {
  const moneyOption = [
    {
      max: 10000,
      min: 0,
      unitText: '元'
    },
    {
      max: 100000000,
      min: 10000,
      unitText: '万元'
    },
    {
      max: Infinity,
      min: 100000000,
      unitText: '亿元'
    }
  ]

  if (!money) return '元'

  for (let item of moneyOption) {
    const { max, min, unitText } = item
    if (money >= min && money < max) return unitText
  }
}
