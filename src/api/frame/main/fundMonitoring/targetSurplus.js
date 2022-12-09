//  监控函数api
import { post } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas (params) {
    return post('dfr-monitor-service/dfr/targetSurplus/querylist', params)
  },
  detailPageQuery (params) {
    return post('dfr-monitor-service/dfr/targetSurplus/queryDetailList', params)
  }
}
