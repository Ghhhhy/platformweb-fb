import { post, get } from '@/api/http'
import store from '@/store'

const { tokenid } = store.getters.getLoginAuthentication

/**
 * 未登记直达资金信息
 * @param params
 * @return {Promise<unknown>}
 */
export function queryDetail(params) {
  return post('dfr-monitor-service/dfr/unregisteredDfr/query', params)
}

/**
 * 直达资金基础数据
 * @param params
 * @return {Promise<unknown>}
 */
export function jstreedata() {
  return get(`mp-b-basedata-service/v2/elevalueset/view/jstreedata/DIRECTFUNDS?tokenid=${tokenid}`)
}
