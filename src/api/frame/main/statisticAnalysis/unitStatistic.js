import { post } from '@/api/http'

/**
 * 按单位统计分页列表
 * @param params
 * @return {Promise | Promise<unknown>}
 */
export const queryDep = params => {
  return post('large-monitor-platform/lmp/warnStatistical/queryDep', params)
}

/**
 * 根据单位查下面的规则
 * @param params
 * @return {Promise | Promise<unknown>}
 */
export const queryDepData = params => {
  return post('large-monitor-platform/lmp/warnStatistical/queryDepData', params)
}
