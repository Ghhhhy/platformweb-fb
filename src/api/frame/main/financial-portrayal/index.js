import { post } from '@/api/http'

const API_URLS = {
  // 获取财政画像xmind数据url
  GET_FIN_OPERA_DATA: 'lmp/portrait/getFinOperaData',
  // 获取财政明细
  GET_FIN_OPERA_INFO: 'lmp/portrait/getFinOperaInfo',
  // 基础信息
  GET_BASE_INFO: 'lmp/portraitBaseInfo/getBaseInfo'
}
// 财政运行情况
export const getFinOperaData = (params) => {
  return post(API_URLS.GET_FIN_OPERA_DATA, params)
}

// 财政运行情况详情
export const getFinOperaInfo = (params) => {
  return post(API_URLS.GET_FIN_OPERA_INFO, params)
}

// 基础信息
export const getBaseInfo = (params) => {
  return post(API_URLS.GET_BASE_INFO, params)
}
