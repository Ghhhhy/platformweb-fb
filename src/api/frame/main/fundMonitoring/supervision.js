import { post, get } from '@/api/http'
export default {
  // 获取左侧树
  getTreeData(params) {
    return get('mp-b-basedata-service/v2/basedata/simpletree/where', params)
  },
  // 获取表格数据分页
  queryTableDatasPage (params) {
    return post('dfr-monitor-service/dfr/supervision/pageQuery', params)
  },
  queryCaliberDeclareContent(params) {
    return post('dfr-monitor-service/dfr/supervision/queryCaliberDeclareContent', params)
  },
  // 获取表格数据
  queryTableDatas (params) {
    return post('dfr-monitor-service/dfr/supervision/query', params)
  },
  // 获取合计
  querySum (params) {
    return post('dfr-monitor-service/dfr/supervision/sum', params)
  },
  getTreewhere(params) {
    return get('mp-b-basedata-service/v2/basedata/simpletree/where', params)
  },
  // 获取明细
  detailPageQuery (params) {
    return post('dfr-monitor-service/dfr/supervision/detailPageQuery', params)
  }
}