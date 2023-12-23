import { post } from '@/api/http'

export default {
  /**
   * 数据审核
   * @return {Promise | Promise<unknown>}
   */
  auditDataRecords(params) {
    return post('pro-gather-server/lmp/warnProcess/pageQueryeg', params)
  }
}
