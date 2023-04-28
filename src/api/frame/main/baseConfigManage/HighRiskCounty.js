import { get, post } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas(params) {
    return post('large-monitor-platform/lmp/highRiskCounty/pageQuery', params)
  },
  add(params) {
    return post('large-monitor-platform/lmp/highRiskCounty/add', params)
  },
  del(params) {
    return post('large-monitor-platform/lmp/highRiskCounty/delete', params)
  },
  getTreewhere(params) {
    return get('mp-b-basedata-service/v2/basedata/simpletree/where', params)
  }
}
