/**
 * 将应用菜字符串参数转Object
 * @param string
 * @return {Object}
 */
export default function transJson(string = '') {
  if (!string?.trim()) return {}

  // 兼容一个参数值（例如：czzd）
  if (string?.indexOf('=') === -1) return string

  const params = string?.split(',')
    ?.reduce((obj, item) => {
      if (!item) return obj

      let [key, value = ''] = item?.split('=')
      if (value === 'true') value = true
      if (value === 'false') value = false
      return {
        ...obj,
        [key]: value
      }
    }, {}) || {}
  console.log(params)
  return params
}
