// 预算执行报表api
import { get, post } from '@/api/http'
export default {
  // 生成本级数据
  dogenerate(params) {
    return post('pay-report-service/v1/action/dogenerate', params)
  }
}
