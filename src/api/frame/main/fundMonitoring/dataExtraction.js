//  数据抽取api
import { post } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas (params) {
    return post('dfr-monitor-service/dfr/dataExtraction/pageQuery', params)
  },
  // 获取表格数据
  getTableDatas (params) {
    return post('dfr-monitor-service/dfr/dataExtraction/pageQueryTable', params)
  },
  // 全量抽取
  fullExtract (params) {
    return post('dfr-monitor-service/dfr/dataExtraction/fullamount', params)
  },
  // 增量抽取
  addExtract (params) {
    return post('dfr-monitor-service/dfr/dataExtraction/addamount', params)
  }
}
