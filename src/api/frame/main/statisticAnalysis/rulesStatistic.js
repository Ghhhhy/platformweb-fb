import { post } from '@/api/http'

/**
 * 按规则统计分页列表
 * @param params
 * @return {Promise | Promise<unknown>}
 */
export const queryRule = params => {
  return post('large-monitor-platform/lmp/warnStatistical/queryRule', params)
}

/**
 * 根据规则查看该规则下面有哪些预算单位的规则统计
 * @param params
 * @return {Promise | Promise<unknown>}
 */
export const queryRuleData = params => {
  return post('large-monitor-platform/lmp/warnStatistical/queryRuleData', params)
}

/**
 * 查看处理单
 * @param params
 * @return {Promise | Promise<unknown>}
 */
export const queryAuditTable = params => {
  return post('large-monitor-platform/lmp/warnStatistical/dubleCheck', params)
}
