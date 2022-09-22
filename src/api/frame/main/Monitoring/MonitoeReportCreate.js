//  规则管理审核api
import { get, post } from '@/api/http'
export default {
  // 获取左侧树
  getLeftTree(params) {
    return get('mp-b-basedata-service/v2/basedata/simpletree/where', params)
  },
  // 列表
  queryMonitorTableDatas(params) {
    return post('large-monitor-platform/lmp/report/pageQuery', params)
  },
  // 预览
  look(params) {
    return post('large-monitor-platform/lmp/report/create', params)
  },
  // 删除
  delete(params) {
    return post('large-monitor-platform/lmp/report/delete', params)
  },
  // 确认生成
  confirmCreate(params) {
    return post('large-monitor-platform/lmp/report/confirmCreate', params)
  }
}
