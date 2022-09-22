// 预算执行分析报告api
import { get, post } from '@/api/http'

export default {
  // 获取报告模板
  getTemplates(data) {
    return post("pay-report-service/v1/reportTemplate/query?log_type=query", data)
  },
  getAnalysisStatus(data) {
    return get("pay-report-service/v1/reportAnalysis/query?log_type=query", data)
  },
  // 删除报告模板
  deleteTemplate(data) {
    return post("pay-report-service/v1/reportTemplate/delete?log_type=delete", data)
  }
}
