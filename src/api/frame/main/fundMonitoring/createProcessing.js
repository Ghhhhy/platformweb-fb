//  监控函数api
import { post, get } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas (params) {
    return post('large-monitor-platform/lmp/executeWarn/warnInfos', params)
  },
  // 生成
  handleAdd (params) {
    return post('large-monitor-platform/lmp/totalWarn/add', params)
  },
  // 下发
  handleIssue (params) {
    return post('large-monitor-platform/lmp/totalWarn/issue', params)
  },
  // 反馈
  handleFeedback (params) {
    return post('large-monitor-platform/lmp/totalWarn/update', params)
  },
  // 归档
  handleFile(params) {
    return post('large-monitor-platform/lmp/totalWarn/file', params)
  },
  // 详情信息查询
  getDetail(params) {
    return post('large-monitor-platform/lmp/totalWarn/detail', params)
  },
  getMarkDetail(params) {
    return post('large-monitor-platform/lmp/warn/rpt/queryRptInfoByRule', params)
  },
  getMarkData(params) {
    return post('large-monitor-platform/lmp/totalWarn/queryWarnInfoByLogo', params)
  },
  // 预算回显信息
  budgetgetDetail(params) {
    return get('large-monitor-platform/lmp/executeWarn/getDetail/' + params)
  },
  // 获取违规类型枚举
  queryViolationType(params) {
    return get('large-monitor-platform/lmp/violationType/pageQuery', params)
  },
  // 获取未归档数据
  getNoFile(params) {
    return post('large-monitor-platform/lmp/totalWarn/queryNoFile', params)
  },
  // 获取数量
  getCount(params) {
    return post('large-monitor-platform/lmp/totalWarn/getCount', params)
  }
}
