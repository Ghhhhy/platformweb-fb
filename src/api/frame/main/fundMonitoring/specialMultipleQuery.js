//  数据抽取api
import { post } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas (params) {
    return post('dfr-monitor-service/dfr/specialMultipleQuery/query', params)
  },
  getTreeData (params) {
    return post('dfr-monitor-service/dfr/specialMultipleQuery/getTree', params)
  }
}
