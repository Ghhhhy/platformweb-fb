//  监控函数api
import { get, post, del } from '@/api/http'
export default {
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
  getTotalTableData(params) {
    return post('large-monitor-platform/lmp/executeWarn/summary', params)
  },
  summarySum(params) {
    return post('large-monitor-platform/lmp/executeWarn/summarySum', params)
  },
  getTotalTableData1(params) {
    return post('large-monitor-platform/lmp/executeWarn/zdSummary', params)
  },
  getAllTotalTableData(params) {
    return post('large-monitor-platform/lmp/executeWarn/summaryCount', params)
  },
  getAllTotalTableData1(params) {
    return post('large-monitor-platform/lmp/executeWarn/zdSummaryCount', params)
  },
  // 预算回显信息
  budgetgetDetail(params) {
    return get('large-monitor-platform/lmp/executeWarn/getDetail/' + params)
  },
  // 预算批复回显信息
  budgetpayDetail(params) {
    return get('large-monitor-platform/lmp/executeWarn/getDetailExp/' + params)
  },
  // 预算处理
  budgethandleDetail(params) {
    return post('large-monitor-platform/lmp/executeWarn/handleData', params)
  },
  // 获取表格数据
  querygetTableDatas(params) {
    return get('large-monitor-platform/v2/payvoucher/loadtabledatas', params)
  },
  // 获取合计
  fileUpload(params) {
    return post('fileservice/v2/upload', params, null, 'multipart/form-data', 'openapi')
  },
  getDetailData(params) {
    return get('large-monitor-platform/lmp/regulation/detail/' + params)
  },
  getTreewhere(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  }
}
