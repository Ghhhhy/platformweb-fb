import { post, del } from '@/api/http'
export default {
  // 删除附件
  deleteAttachment(params) {
    return del('fileservice/v2/files?' + params)
  },
  // 获取表格数据
  getAnalysisData(params) {
    return post('large-monitor-platform/lmp/warnAnalysis/getAnalysisData', params)
  },
  getMofTreeData(params) {
    return post('dfr-monitor-service/dfr/mofDivList/query', params)
  },
  getSpeItemsEnforcedAnalysisData(params) {
    return post('large-monitor-platform/lmp/warnAnalysis/getSpeItemsEnforcedAnalysisData', params)
  }
}
