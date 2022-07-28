import { get, post } from '@/api/http'

export default {
  // 获取规则
  getProcTable(params) {
    return get('large-monitor-platform/lmp/dfrprocessing/action/query', params)
  },
  getProcList(params) {
    return get('large-monitor-platform/lmp/dfrprocessing/action/queryList', params)
  },
  generate(params) {
    return post('large-monitor-platform/lmp/dfrprocessing/action/generate', params)
  },
  // 根据唯一字段获取规则信息,包含明细信息
  getDetailById(params) {
    return get('large-monitor-platform/lmp/dfrprocessing/action/detail', params)
  },
  // 根据唯一字段获取规则信息,包含明细信息
  getProcById(params) {
    return get('large-monitor-platform/lmp/dfrprocessing/action/querybyid', params)
  },
  // 新增
  saveProc(params) {
    return post('large-monitor-platform/lmp/dfrprocessing/action/save', params)
  },
  // 修改状态
  updateProc(params) {
    return post('large-monitor-platform/lmp/dfrprocessing/action/update', params)
  },
  // 删除
  deleteProc(params) {
    return post('large-monitor-platform/lmp/dfrprocessing/action/delete', params)
  },
  // 退回
  doReturnback(params) {
    return post('large-monitor-platform/lmp/dfrprocessing/action/returnback', params)
  },
  // 撤销审核
  recallaudit(params) {
    return post('large-monitor-platform/lmp/dfrprocessing/action/recallaudit', params)
  },
  // 审核
  doaudit(params) {
    return post('large-monitor-platform/lmp/dfrprocessing/action/audit', params)
  }
}
