//  规则管理审核api
import { get, post, postFormData } from '@/api/http'
export default {
  // 获取左侧树
  getLeftTree(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
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
  },
  // 三保监控报告预览
  sanbaolook(params) {
    return post('large-monitor-platform/lmp/report/sanbaoCreate', params)
  },
  // 三公监控报告预览
  sangonglook(params) {
    return post('large-monitor-platform/lmp/report/sangongCreate', params)
  },
  // 动态监控报告预览
  dynamiclook(params) {
    return post('large-monitor-platform/lmp/report/dynamicCreate', params)
  },
  // 专项监控报告预览
  speProlook(params) {
    return post('large-monitor-platform/lmp/report/speProCreate', params)
  },
  preViewCreate(axiosStr, params) {
    return post(`large-monitor-platform/lmp/report/${axiosStr}`, params)
  },
  importPersonAndCompany (params) {
    return postFormData('large-monitor-platform/lmp/report/importReport', params)
  }
}
