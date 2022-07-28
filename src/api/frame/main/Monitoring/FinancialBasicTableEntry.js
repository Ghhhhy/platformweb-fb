//  申报api
import { get, post } from '@/api/http'
export default {
  // 获取左侧树
  getLeftTree(params) {
    return get('mp-b-basedata-service/v2/basedata/simpletree/where', params)
  },
  // 获取表格数据
  queryTableDatas(params) {
    return post('large-monitor-platform/lmp/portraitBaseInfo/getPortraitBaseInfo', params)
  },
  // 操作日志
  queryActionLog(params) {
    return post('large-monitor-platform/lmp/matter/queryActionLog', params)
  },
  // 提交
  confirm(params) {
    return post('large-monitor-platform/lmp/portraitBaseInfo/updatePortraitBaseInfo', params)
  },
  // 保存
  save(params) {
    return post('large-monitor-platform/lmp/portraitBaseInfo/addPortraitBaseInfo', params)
  }
}
