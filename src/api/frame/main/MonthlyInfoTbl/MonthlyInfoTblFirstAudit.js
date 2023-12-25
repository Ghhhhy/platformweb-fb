import { post, get } from '@/api/http'

export default {
  /**
   * 数据审核
   * @return {Promise | Promise<unknown>}
   */
  auditDataRecords(params) {
    return post('/pro-gather-server/gather/pmProjectInfoDetMon/action/audit', params)
  },
  /**
   * 查询详情
   * @return {Promise | Promise<unknown>}
   */
  detailDataRecord(params) {
    return get('/pro-gather-server/gather/pmProjectInfoDetMon/queryById', params)
  }
}
