//  监控函数api
import { post, get } from '@/api/http'
export default {
  // “三公”风险预警表
  riskWarn(params) {
    return post('large-monitor-platform/lmp/thrExpReport/riskWarn', params)
  },
  // “三公”风险预警表-根据区划查单位具体
  riskWarnByMofDiv(params) {
    return post(
      'large-monitor-platform/lmp/thrExpReport/riskWarnByMofDiv',
      params
    )
  },
  // “三公”执行情况表
  implementation(params) {
    return post(
      'large-monitor-platform/lmp/thrExpReport/implementation',
      params
    )
  },
  // “三公”执行情况表-根据区划查单位具体
  implementationByMofDiv(params) {
    return post(
      'large-monitor-platform/lmp/thrExpReport/implementationByMofDiv',
      params
    )
  },
  // “三公”经费监测表
  fundMonitor(params) {
    return post('large-monitor-platform/lmp/thrExpReport/fundMonitor', params)
  },
  // “三公”经费监测表-根据区划查单位具体
  fundMonitorByMofDiv(params) {
    return post(
      'large-monitor-platform/lmp/thrExpReport/fundMonitorByMofDiv',
      params
    )
  },
  executionsDetail(params) {
    return post(
      'large-monitor-platform/lmp/thrExpReport/executionsDetail',
      params
    )
  },
  budgetDetail(params) {
    return post('large-monitor-platform/lmp/thrExpReport/budgetDetail', params)
  },
  getTreewhere(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  },
  sangongVoucher(params) {
    return post(
      'large-monitor-platform/lmp/thrExpReport/sangongVoucher',
      params
    )
  },
  // 获取左侧树
  getLeftTree(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  }
}
