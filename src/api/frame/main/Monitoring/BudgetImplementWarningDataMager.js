//  监控函数api
import { get, post, del } from '@/api/http'
export default {
  // 获取表格数据
  getTableDatas(params) {
    return post('large-monitor-platform/lmp/warn/statistics/pageQuery', params)
  },
  getDatasByAgency(params) {
    return post('large-monitor-platform/lmp/warn/statistics/getWarnGroupByAgency', params)
  },
  getDatasByMonth(params) {
    return post('large-monitor-platform/lmp/warn/statistics/getWarnGroupByMonth', params)
  },
  // 查询附件
  getFile(params) {
    return get('fileservice/v2/files', params)
  },
  // 删除附件
  deleteAttachment(params) {
    return del('fileservice/v2/files?' + params)
  },
  // 单位列表
  agencyTableDatas(params) {
    return post('large-monitor-platform/lmp/warn/agencyAccount/pageQuery', params)
  },
  // 单位回显信息
  agencygetDetail(params) {
    return post('large-monitor-platform/lmp/warn/agencyAccount/detail', params)
  },
  // 单位处理
  handleDetail(params) {
    return post('large-monitor-platform/lmp/warn/handle', params)
  },
  // 预算列表
  queryTableDatas(params) {
    return post('large-monitor-platform/lmp/executeWarn/pageQuery', params)
  },
  // 预算回显信息
  budgetgetDetail(params) {
    return get('large-monitor-platform/lmp/executeWarn/getDetail/' + params)
  },
  // 预算处理
  budgethandleDetail(params) {
    return post('large-monitor-platform/lmp/executeWarn/handleData', params)
  },
  // 获取合计
  fileUpload(params) {
    return post('fileservice/v2/upload', params, null, 'multipart/form-data', 'openapi')
  }
}
