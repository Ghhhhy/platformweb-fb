import { get } from '@/api/http'

export default {
  /**
   * 数据详情
   * @return {Promise | Promise<unknown>}
   */
  detailDataRecord(params) {
    return get('/pro-gather-server/gather/pmProjectInfoDetail/queryByProDetId', params)
  }
}
