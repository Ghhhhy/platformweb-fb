import { post } from '@/api/http'

/**
 * 主列表分页查询
 * @return {Promise | Promise<unknown>}
 */
export function pageQueryIndex(params) {
  return post('large-monitor-platform/lmp/warnProcess/pageQuery', params)
}

/**
 * 查看单个处理单详情
 * @return {Promise | Promise<unknown>}
 */
export function getDetail(warningCode) {
  return post(`large-monitor-platform/lmp/warnProcess/getDetail/${warningCode}`)
}

/**
 * 查看单多个处理单详情
 * @return {Promise | Promise<unknown>}
 */
export function getMulitDetail(warningCodeList) {
  return post('large-monitor-platform/lmp/warnProcess/getDetailBatch', { warningCodeList })
}

/**
 * 操作:送审、退回、禁止
 * @return {Promise | Promise<unknown>}
 */
export function bpmFlow(params) {
  return post('large-monitor-platform/lmp/warnProcess/bpmFlow', params)
}
