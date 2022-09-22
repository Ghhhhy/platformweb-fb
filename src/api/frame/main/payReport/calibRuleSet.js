import { get, post } from '@/api/http'

export default {
  // 获取规则
  getCalibTable(params) {
    return get('pay-report-service/v1/caliberconver/getrules?log_type=query', params)
  },
  // 根据唯一字段获取规则信息,包含明细信息
  getRuleById(params) {
    return get('pay-report-service/v1/cliberconver/getRuleById?log_type=query', params)
  },
  // 修改规则
  modifRule(params) {
    return post('pay-report-service/v1/caliberconver/action/modify?log_type=update', params)
  },
  // 新增规则
  addRule(params) {
    return post('pay-report-service/v1/caliberconver/action/insert?log_type=add', params)
  },
  // 删除规则
  deleteRule(params) {
    return post('pay-report-service/v1/caliberconver/action/deleteRule?log_type=delete', params)
  }
}
