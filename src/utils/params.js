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

export default {
  getParams,
  setParams
}
