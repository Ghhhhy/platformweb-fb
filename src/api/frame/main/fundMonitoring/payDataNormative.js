import { post, get } from '@/api/http'
export default {
  // 获取左侧树
  getTreeData(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  },
  // 获取表格数据
  queryTableDatas (params) {
    return post('dfr-monitor-service/dfr/payDataNormative/pageQuery', params)
  },
  // 获取合计
  querySum (params) {
    return post('dfr-monitor-service/dfr/supervision/sum', params)
  },
  // 获取表格数据分页
  queryTableDatasPage (params) {
    return post('dfr-monitor-service/dfr/supervision/pageQuery', params)
  },
  queryCaliberDeclareContent(params) {
    return post('dfr-monitor-service/dfr/supervision/queryCaliberDeclareContent', params)
  }
}
