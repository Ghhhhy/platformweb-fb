import { commafy } from 'xe-utils'

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
/**
 * 获取单位
 * @param {number} money
 * @return {{value: number, unitText: string}|{value: number, unitText: (string)}}
 */
export const getUnit = (money) => {
  if (!money) return { unitText: '元', value: 0 }

  for (let item of moneyOption) {
    const { max, min } = item
    if (money >= min && money < max) {
      return {
        ...item,
        value: commafy(money / (min || 1), { digits: 2 })
      }
    }
  }
}
