import { get, post } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas(params) {
    return post('large-monitor-platform/lmp/projectConf/pageQuery', params)
  },
  add(params) {
    return post('large-monitor-platform/lmp/projectConf/add', params)
  },
  del(params) {
    return post('large-monitor-platform/lmp/projectConf/delete', params)
  },
  getTreeWhere(params) {
    return get('mp-b-basedata-service/v2/elevalueset/view/jstreedata/THREESAFE', params)
  }
}
