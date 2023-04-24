//  申报api
import { get, post } from '@/api/http'
export default {
  // 获取左侧树
  getLeftTree(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
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
  },
  // 撤回
  revoke(params) {
    return post('large-monitor-platform/lmp/portraitBaseInfo/revoke ', params)
  },
  pageQuery(params) {
    return post('large-monitor-platform/lmp/portraitBaseInfo/pageQuery ', params)
  }
}
