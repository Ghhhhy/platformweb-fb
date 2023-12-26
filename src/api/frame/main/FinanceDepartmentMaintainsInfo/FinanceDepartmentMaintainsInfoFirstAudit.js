import { post, get } from '@/api/http'

export default {
  /**
   * 数据详情
   * @return {Promise | Promise<unknown>}
   */
  detailDataRecord(params) {
    return get('/dfr-monitor-service/dfr/pmProjectInfoDetail/queryByProDetId', params)
  },
  /**
   * 数据审核
   * @return {Promise | Promise<unknown>}
   */
  auditDataRecords(params) {
    return post('/dfr-monitor-service/dfr/pmProjectInfoDetail/action/audit', params)
  }
}
