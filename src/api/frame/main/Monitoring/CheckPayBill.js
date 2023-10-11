
// 上下级对账api
import { post } from '@/api/http'
export default {
  // 获取左侧树
  getReportDetail(params) {
    return post('http://47.92.104.196:6602/lmp/report/transferPay/detailById', params)
  }
}
