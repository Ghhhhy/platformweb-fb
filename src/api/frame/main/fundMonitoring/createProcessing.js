//  监控函数api
import { post, get } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas (params) {
    return post('large-monitor-platform/dfr/executeWarn/warnInfos', params)
  },
  // 生成
  handleAdd (params) {
    return post('large-monitor-platform/dfr/totalWarn/add', params)
  },
  // 下发
  handleIssue (params) {
    return post('large-monitor-platform/dfr/totalWarn/issue', params)
  },
  // 反馈
  handleFeedback (params) {
    return post('large-monitor-platform/dfr/totalWarn/update', params)
  },
  // 归档
  handleFile(params) {
    return post('large-monitor-platform/dfr/totalWarn/file', params)
  },
  // 详情信息查询
  getDetail(params) {
    return post('large-monitor-platform/dfr/totalWarn/detail', params)
  },
  getMarkDetail(params) {
    return post('large-monitor-platform/dfr/warn/rpt/queryRptInfoByRule', params)
  },
  getMarkData(params) {
    return post('large-monitor-platform/dfr/totalWarn/queryWarnInfoByLogo', params)
  },
  // 预算回显信息
  budgetgetDetail(params) {
    return get('large-monitor-platform/dfr/executeWarn/getDetail/' + params)
  },
  // 获取违规类型枚举
  queryViolationType(params) {
    return get('large-monitor-platform/dfr/violationType/pageQuery', params)
  },
  // 获取未归档数据
  getNoFile(params) {
    return post('large-monitor-platform/dfr/totalWarn/queryNoFile', params)
  },
  // 获取数量
  getCount(params) {
    return post('large-monitor-platform/dfr/totalWarn/getCount', params)
  }
}
