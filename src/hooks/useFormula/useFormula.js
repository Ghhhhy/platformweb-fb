import store from '@/store/index'
import formulaDictionary from './formulaDictionary'
const locationMapping = new Map([
  [true, 'default'],
  [store.getters.isFuJian, 'isFuJian'],
  [store.getters.isSx, 'isSx'],
  [store.getters.isNeiMeng, 'isNeiMeng']

])
const $formula = (field) => {
  if (!field) return ''
  const fieldList = field.split('.').filter(Boolean)
  const result = fieldList.reduce((pre, cur) => {
    if (Object.prototype.toString.call(pre[cur]) === '[object Object]') {
      return pre[cur]
    } else {
      throw new Error('$formula传参错误')
    }
  }, formulaDictionary)
  return result[locationMapping.get(true)] || result['default']
}
export {
  $formula
}
