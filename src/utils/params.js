/*
 * File: params.js
 * Project: vnnox-pro
 * Description: 用户缓存或者读取列表的请求参数
 * Created: 2020-7-7 09:13
 * Author: xinlai (xinlai@bosssoft.com.cn)
 * -----
 * Created: 2020-7-7 09:13
 * Author: xinlai (xinlai@bosssoft.com.cn)
 * -----
 * Copyright 2018, NovaStar Tech Co., Ltd
 */

import Store from './store'

const CACHE_NAME = 'get_params'

// {
//   media: {
//     sort: 'create_at',
//     sortType: 'desc',
//     pageIndex: 2,
//     limit: 20
//   }
// }
/**
 * 获取某个模块的GET参数
 * @param {*} module
 * @param {*} key 指定的参数名
 */
export const getParams = (module, key) => {
  const paramsCache = Store(CACHE_NAME) || Object.create(null)
  const params = paramsCache[module]
  if (!params) {
    return
  }
  if (key) {
    return params[key]
  }
  return params
}

/**
 * 设置某个模块的GET参数（部分参数）
 * @param {*} module
 * @param {*} params
 */
export const setParams = (module, params) => {
  const data = getParams(module) || Object.create(null)
  for (let k in params) {
    data[k] = params[k]
  }
  const paramsCache = Store(CACHE_NAME) || Object.create(null)
  paramsCache[module] = data
  Store(CACHE_NAME, paramsCache)
}

/**
 * 获取菜单参数
 * @param {String} str
 */
export const transJson2 = (str) => {
  if (!str) return
  let params = str.split(';')
  let result = {}
  if (params && params.length > 0) {
    for (let i = 0; i < params.length; i++) {
      let map = params[i].split('=')
      let arr = map[1].split(',')
      result[map[0]] = arr
    }
  }
  return result
}
/**
   * 解析URL传值
   * */
export const transJson3 = (str) => {
  let strTwo = ''
  str?.split(';').reduce((acc, curr) => {
    const [key, value] = curr.split('=')
    acc[key] = value
    strTwo = acc
    return acc
  }, {})
  return strTwo
}
/**
 * 获取菜单参数
 * @param {String} string
 */
export const transJson1 = (string) => {
  if (string === null || !string?.trim()) return {}

  // 兼容一个参数值（例如：czzd）
  if (string?.indexOf('=') === -1) return string

  const params = string?.split(';')
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
  return params
}

export default {
  getParams,
  setParams
}
