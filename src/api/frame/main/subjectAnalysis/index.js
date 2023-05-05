import { post } from '@/api/http'

const API_URLS = {
  // 统计分析查询（按区划汇总）
  QUERY_ANALYSIS_BY_MOFSUMMARY: 'large-monitor-platform/lmp/warn/statistics/queryAnalysisByMofSummary',
  // 统计分析查询（按预警级别）
  QUERY_ANALYSIS_BY_WARNLEVEL: 'large-monitor-platform/lmp/warn/statistics/queryAnalysisByWarnLevel',
  // 统计分析查询（按区划-bar图）
  QUERY_ANALYSIS_BY_RULE: 'large-monitor-platform/lmp/warn/statistics/queryAnalysisByRule',
  // 统计分析查询（按区划-散点图）
  QUERY_ANALYSIS_BY_MOF: 'large-monitor-platform/lmp/warn/statistics/queryAnalysisByMof'

}
/**
 * 统计分析查询（按区划汇总）
 * @returns {Promise | Promise<unknown>}
 */
export const queryAnalysisByMofSummary = () => {
  return post(API_URLS.QUERY_ANALYSIS_BY_MOFSUMMARY)
}

/**
 * 统计分析查询（按预警级别）
 * @param params {Object:{regulationType: string}} regulationType 类型 int  1：系统级  2：财政级 3：部门级
 * @returns {Promise | Promise<unknown>}
 */
export const queryAnalysisByWarnLevel = (params) => {
  return post(API_URLS.QUERY_ANALYSIS_BY_WARNLEVEL, params)
}

/**
 * 统计分析查询（按区划-bar图)
 * @returns {Promise | Promise<unknown>}
 */
export const queryAnalysisByRule = () => {
  return post(API_URLS.QUERY_ANALYSIS_BY_RULE)
}

/**
 * 统计分析查询（按区划-散点图）
 * @returns {Promise | Promise<unknown>}
 */
export const queryAnalysisByMof = () => {
  return post(API_URLS.QUERY_ANALYSIS_BY_MOF)
}
