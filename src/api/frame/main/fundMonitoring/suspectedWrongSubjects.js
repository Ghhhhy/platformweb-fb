//  监控函数api
import { get, post } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas (params) {
    return get('dfr-monitor-service/dfr/wrongsubjects/querylist', params)
  },
  // 获取明细数据
  queryTableDeatilDatas (params) {
    return post('dfr-monitor-service/dfr/wrongsubjects/queryDetail', params)
  }
}
