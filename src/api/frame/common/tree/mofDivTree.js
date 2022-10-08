import { get } from '@/api/http'

/**
 * 获取区划树
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export const getMofDivTree = (params) => {
  return get('large-monitor-platform/lmp/mofDivTree', params)
}
