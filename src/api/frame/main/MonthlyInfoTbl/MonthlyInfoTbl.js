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
   * 查询项目详情
   * @return {Promise | Promise<unknown>}
   */
  detailProjectInfo(params) {
    return get('/pro-gather-server/gather/pmProjectInfoDetMon/queryProDetailById', params)
  },
  /**
   * 新增
   * @return {Promise | Promise<unknown>}
   */
  addDataRecord(params) {
    return post('/pro-gather-server/gather/pmProjectInfoDetMon/action/insert', params)
  },
  /**
   * 数据修改
   * @return {Promise | Promise<unknown>}
   */
  editDataRecord(params) {
    return post('/pro-gather-server/gather/pmProjectInfoDetMon/action/modify', params)
  },
  /**
   * 查询详情
   * @return {Promise | Promise<unknown>}
   */
  detailDataRecord(params) {
    return get('/pro-gather-server/gather/pmProjectInfoDetMon/queryById', params)
  },

  /**
   * 数据作废
   * @return {Promise | Promise<unknown>}
   */
  discardRecords(params) {
    return post('/pro-gather-server/gather/pmProjectInfoDetMon/action/discard', params)
  }
}
