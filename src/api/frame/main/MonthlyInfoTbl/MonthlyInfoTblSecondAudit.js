import { get } from '@/api/http'

export default {
  /**
   * 查询详情
   * @return {Promise | Promise<unknown>}
   */
  detailDataRecord(params) {
    return get('/pro-gather-server/gather/pmProjectInfoDetMon/queryById', params)
  }
}
