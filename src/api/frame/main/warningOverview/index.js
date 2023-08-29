import { post } from '@/api/http'

const API_URLS = {
  // 规则启用情况
  RULE_ACTIVATION_URL: 'large-monitor-platform/lmp/warn/statistics/ruleActivation',
  // 业务量统计
  BUSINESS_STATISTICS: 'large-monitor-platform/lmp/warn/statistics/businessStatistics',
  // 规则实时滚动
  GET_LATEST_DATA: 'large-monitor-platform/lmp/warn/statistics/getLatestData',
  // 监控处理情况
  MONITOR_PROCESSING: 'large-monitor-platform/lmp/warn/statistics/monitorProcessing',
  // 按区划、月份查看所有违规情况
  GET_WARN_BY_MOFDIV_CODE: 'large-monitor-platform/lmp/warn/statistics/getWarnByMofDivCode',
  // 规则启用情况
  RULR_ACTIVATE_INFO: 'large-monitor-platform/lmp/warn/statistics/ruleActivateInfo',
  // 监控预警处理率排名
  RANK_PROCESSING: 'large-monitor-platform/lmp/warn/statistics/rankProcessing',
  // 直达资金管理工作排名
  LEDGER_PROCESSING: 'dfr-monitor-service/dfr/zdzjledger/query',
  // 地图json获取
  MAP_JSON: 'large-monitor-platform/lmp/city/queryCityJson'
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

/**
 * 规则启用情况
 * @returns {Promise | Promise<unknown>}
 */
export const ruleActivateInfo = () => {
  return post(API_URLS.RULR_ACTIVATE_INFO)
}

/**
 * 监控预警处理率排名
 * @returns {Promise | Promise<unknown>}
 */
export const rankProcessing = (params) => {
  return post(API_URLS.RANK_PROCESSING, params)
}
/**
 * 直达资金管理工作排名
 * @returns {Promise | Promise<unknown>}
 */
export const ledgerProcessing = (params) => {
  return post(API_URLS.LEDGER_PROCESSING, params)
}
/**
 * 地图Json
 * @returns {Promise | Promise<unknown>}
 */
export const mapJson = (params) => {
  return post(API_URLS.MAP_JSON, params)
}
