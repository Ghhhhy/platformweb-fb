import { get, post } from '@/api/http'

/**
 * 获取区划树
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export const getMofDivTree = (params) => {
  return get('large-monitor-platform/lmp/mofDivTree', params)
}
export const querySum = (params) => {
  return post('dfr-monitor-service/dfr/supervision/sum', params)
}
export const getTreewhere = (params) => {
  return get('mp-b-basedata-service/v2/basedata/simpletree/where', params)
}
export const queryCaliberDeclareContent = (params) => {
  return post('dfr-monitor-service/dfr/supervision/queryCaliberDeclareContent', params)
}
