import { post } from '@/api/http'

/**
 * 直接支付开单效率
 * @param params
 * @return {Promise | Promise<unknown>}
 */
export const queryPayEfficiency = params => {
  return post('large-monitor-platform/lmp/warnStatistical/queryPayEfficiency', params)
}
