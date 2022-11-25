//  监控函数api
import { post } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas (params) {
    return post('dfr-monitor-service/dfr/warnRegion/querySummary', params)
  },
  // 获取表格数据
  queryDetailDatas (params) {
    return post('dfr-monitor-service/dfr/warnRegion/querySummaryDetail', params)
  }
}