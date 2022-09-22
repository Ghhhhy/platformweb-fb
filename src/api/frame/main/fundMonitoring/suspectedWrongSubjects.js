//  监控函数api
import { get } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas (params) {
    return get('dfr-monitor-service/dfr/wrongsubjects/querylist', params)
  }
}
