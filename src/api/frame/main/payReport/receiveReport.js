// 接收上级报表api
import { get, post } from '@/api/http'

export default {
  // 获取接收报表信息
  getReports(data) {
    return get('pay-report-service/v1/receiveReport/query?log_type=query', data)
  },
  // 标识为已阅
  receiveReport(data) {
    return post('pay-report-service/v1/receiveReport/receive?log_type=update', data)
  }
}
