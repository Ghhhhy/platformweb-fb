import { post } from '@/api/http'

/**
 * 主列表分页查询
 * @return {Promise | Promise<unknown>}
 */
export function pageQueryIndex(params) {
  return post('large-monitor-platform/lmp/warnProcess/pageQueryeg', params)
}

/**
 * 查看单个处理单详情
 * @return {Promise | Promise<unknown>}
 */
export function getDetail(params) {
  return post('large-monitor-platform/lmp/warnProcess/getDetaileg', params)
}

/**
 * 查看单多个处理单详情
 * @return {Promise | Promise<unknown>}
 */
export function getMulitDetail(params) {
  return post('large-monitor-platform/lmp/warnProcess//getDetailBatcheg', params)
}

/**
 * 操作:送审、退回、禁止
 * @return {Promise | Promise<unknown>}
 */
export function bpmFlow(params) {
  return post('large-monitor-platform/lmp/warnProcess/bpmFloweg', params)
}

/**
 * 业务单据查看
 * @return {Promise | Promise<unknown>}
 */
export function billPage(params) {
  return post('large-monitor-platform/lmp/warnProcess/billPage', params)
}
