import { post } from '@/api/http'

/**
 * 三公-整体情况
 * @return {*}
 */
export const overallSituation = () => {
  return post('lmp/thrExpReport/overallSituation')
}

/**
 * 三公-监控情况-按规则分类
 * @return {*}
 */
export const monitoringByRuleType = () => {
  return post('lmp/thrExpReport/monitoringByRuleType')
}

/**
 * 三公-规则实时预警情况
 * @return {*}
 */
export const getLatestData = (params) => {
  return post('lmp/warn/statistics/getLatestData', params)
}

/**
 * 三公-经费监控总览
 * @return {*}
 */
export const businessStatistics = (params) => {
  return post('lmp/warn/statistics/businessStatistics', params)
}

/**
 * 三公-支出情况
 * @return {*}
 */
export const expenditure = (params) => {
  return post('lmp/thrExpReport/expenditure', params)
}

/**
 * 三公-监控情况-按科目
 * @return {*}
 */
export const monitoringBySubject = (params) => {
  return post('lmp/thrExpReport/monitoringBySubject', params)
}

/**
 * 三公-监控情况-按地区
 * @return {*}
 */
export const monitoringByMof = (params) => {
  return post('lmp/thrExpReport/monitoringByMof', params)
}

/**
 * 三公-上年同期对比情况
 * @return {*}
 */
export const comparison = () => {
  return post('lmp/thrExpReport/comparison')
}
