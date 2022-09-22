import { get, post } from '@/api/http'

export default {
  // 获取规则
  getCalibTable(params) {
    return get('pay-report-service/v1/caliberconver/getrules?log_type=query', params)
  },
  // 查看已转换规则的报表数据
  queryconverdata(params) {
    return get('pay-report-service/v1/cliberconver/action/queryconverdata?log_type=query', params)
  },
  // 转换
  updateCalib(params) {
    return post('pay-report-service/v1/caliberconver/action/doconversion?log_type=update', params)
  }
}
