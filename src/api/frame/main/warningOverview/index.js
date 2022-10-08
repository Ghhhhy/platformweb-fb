import { post } from '@/api/http'

const API_URLS = {
  // 规则启用情况
  RULE_ACTIVATION_URL: 'lmp/warn/statistics/ruleActivation',
  // 业务量统计
  BUSINESS_STATISTICS: 'lmp/warn/statistics/businessStatistics',
  // 规则实时滚动
  GET_LATEST_DATA: 'lmp/warn/statistics/getLatestData',
  // 监控处理情况
  MONITOR_PROCESSING: 'lmp/warn/statistics/monitorProcessing',
  // 按区划、月份查看所有违规情况
  GET_WARN_BY_MOFDIV_CODE: 'lmp/warn/statistics/getWarnByMofDivCode'

}
/**
 * 规则启用情况
 * @returns {Promise | Promise<unknown>}
 */
export const ruleActivation = () => {
  return post(API_URLS.RULE_ACTIVATION_URL)
}

/**
 * 业务量统计 => 地图数据源查询
 * @param params {Object:{mofDivCode: string}} mofDivCode 区划code
 * @returns {Promise | Promise<unknown>}
 */
export const businessStatistics = (params) => {
  return post(API_URLS.BUSINESS_STATISTICS, params)
}

/**
 * 规则实时滚动
 * @returns {Promise | Promise<unknown>}
 */
export const getLatestData = () => {
  return post(API_URLS.GET_LATEST_DATA)
}

/**
 * 监控处理情况
 * @returns {Promise | Promise<unknown>}
 */
export const monitorProcessing = () => {
  return post(API_URLS.MONITOR_PROCESSING)
}

/**
 * 按区划、月份查看所有违规情况
 * @param {Object: {type: string}} params type： 1<=>区划；2<=>月份
 * @returns {Promise | Promise<unknown>}
 */
export const getWarnByMofDivCode = (params) => {
  return post(API_URLS.GET_WARN_BY_MOFDIV_CODE, params)
}
