import { get } from '@/api/http'

export default {
  /**
   * 查询详情
   * @return {Promise | Promise<unknown>}
   */
  detailDataRecord(params) {
    return get('/dfr-monitor-service/dfr/pmProjectInfoDetMon/queryById', params)
  }
}
