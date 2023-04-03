// 获取左侧树
import { get, post } from '@/api/http'

export const Urls = {
  MOf_DIV_TREE: 'large-monitor-platform/lmp/mofDivTree'
}

/**
 * 区划树
 * @param params
 * @return {Promise | Promise<unknown>}
 */
export function getTreeData(params) {
  return get(Urls.MOf_DIV_TREE, params)
}

/**
 * 获取监控信息
 */
export function getWarnInfo(params) {
  return post('large-monitor-platform/lmp/warnSummary/querySummaryWarn', params)
}

/**
 * 获取函数
 */
export function getMRuleFuncReg(params) {
  return get('large-monitor-platform/lmp/warn/MRuleFuncReg', params)
}
