import { post, get } from '@/api/http'

export default {
  /**
   * 数据详情
   * @return {Promise | Promise<unknown>}
   */
  detailDataRecord(params) {
    return get('/pro-gather-server/gather/pmProjectInfoDetail/queryByProDetId', params)
  },
  /**
   * 数据审核
   * @return {Promise | Promise<unknown>}
   */
  auditDataRecords(params) {
    return post('/pro-gather-server/gather/pmProjectInfoDetail/action/audit', params)
  }
}
