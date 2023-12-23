import { post } from '@/api/http'

export default {
  /**
   * 数据审核
   * @return {Promise | Promise<unknown>}
   */
  auditDataRecords(params) {
    return post('pro-gather-server/lmp/warnProcess/pageQueryeg', params)
  },

  /**
   * 撤销审核
   * @return {Promise | Promise<unknown>}
   */
  revokeDataRecords(params) {
    return post('pro-gather-server/lmp/warnProcess/pageQueryeg', params)
  },

  /**
   * 数据查看
   * @return {Promise | Promise<unknown>}
   */
  viewDataRecord(params) {
    return post('pro-gather-server/lmp/warnProcess/pageQueryeg', params)
  }
}
