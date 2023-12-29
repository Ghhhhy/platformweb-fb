import { post, get } from '@/api/http'

export default {
  /**
   * 数据导入
   * @return {Promise | Promise<unknown>}
   */
  importExcel(params) {
    return post('/dfr-monitor-service/dfr/pmProjectInfoDetail/action/import', params)
  },
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
  },

  /**
   * 数据修改
   * @return {Promise | Promise<unknown>}
   */
  editDataRecord(params) {
    return post('/dfr-monitor-service/dfr/pmProjectInfoDetail/action/modify', params)
  },

  /**
   * 数据作废
   * @return {Promise | Promise<unknown>}
   */
  discardRecords(params) {
    return post('/dfr-monitor-service/dfr/pmProjectInfoDetail/action/discard', params)
  },
  insertDataRecord(params) {
    return post('/dfr-monitor-service/dfr/pmProjectInfoDetail/action/insert')
  }
}
