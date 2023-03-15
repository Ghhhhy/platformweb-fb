import { post } from '@/api/http'

/**
 * 未登记直达资金信息
 * @param params
 * @return {Promise<unknown>}
 */
export function queryDetail(params) {
  return post('dfr-monitor-service/dfr/unregisteredDfr/query', params)
}
