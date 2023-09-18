import { post } from '@/api/http'
export default {
  // 汇总数据查询
  dataQueryPageInfo(params) {
    return post('large-monitor-platform/lmp/dataquery/treeinfo', params)
  },
  // 金额明细获取
  grobBgtAmtDetail(params) {
    return post('large-monitor-platform/lmp/dataquery/grobBgtAmtDetail', params)
  },
  grobClearAmtDetail(params) {
    return post('large-monitor-platform/lmp/dataquery/grobClearAmtDetail', params)
  },
  grobPayAmtDetail(params) {
    return post('large-monitor-platform/lmp/dataquery/grobPayAmtDetail', params)
  },
  grobPlanAmtDetail(params) {
    return post('large-monitor-platform/lmp/dataquery/grobPlanAmtDetail', params)
  },
  // 获取初始化查询模版
  initTemplate(params) {
    return post('large-monitor-platform/lmp/dataquery/getGrabTemplate', params)
  },
  // 获取用户查询模版
  getGrabTemplateList(params) {
    return post('large-monitor-platform/lmp/dataquery/getUserGrabTemplateList', params)
  },
  // 保存用户查询模版
  saveGrabTemplate(params) {
    return post('large-monitor-platform/lmp/dataquery/saveUserGrabTemplate', params)
  },
  // 删除用户查询模版
  removeGrabTemplate(params) {
    return post('large-monitor-platform/lmp/dataquery/removeUserGrabTemplate', params)
  },
  // 设置用户默认查询模版
  setDefaultGrabTemplate(params) {
    return post('large-monitor-platform/lmp/dataquery/setUserDefaultGrabTemplate', params)
  }
}
