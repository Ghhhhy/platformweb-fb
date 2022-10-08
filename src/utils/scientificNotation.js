import { formatterThousands } from './thousands'
/**
 * 科学计数法（大数据转单位简写）
 * @param value
 * @returns {string|*}
 */
export const scientificNotation = (value) => {
  if (value instanceof Object) return value
  if (typeof value === 'string') {
    value = value.replace(/,/g, '')
  }
  if (value >= 100000000) {
    return formatterThousands((value / 100000000).toFixed(2)) + '亿'
  }
  if (value >= 10000) {
    return (value / 10000).toFixed(2) + '万'
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(2) + '千'
  }
  return value
}
