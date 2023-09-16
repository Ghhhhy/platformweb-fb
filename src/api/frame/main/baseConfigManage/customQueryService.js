import { post } from '@/api/http'
export default {
  // 汇总数据查询
  dataQueryPageInfo(params) {
    return post('fb-custom-query-service/dataquery/treeinfo', params)
  },
  // 金额明细获取
  grobBgtAmtDetail(params) {
    return post('fb-custom-query-service/dataquery/grobBgtAmtDetail', params)
  },
  grobClearAmtDetail(params) {
    return post('fb-custom-query-service/dataquery/grobClearAmtDetail', params)
  },
  grobPayAmtDetail(params) {
    return post('fb-custom-query-service/dataquery/grobPayAmtDetail', params)
  },
  grobPlanAmtDetail(params) {
    return post('fb-custom-query-service/dataquery/grobPlanAmtDetail', params)
  },
  // 获取初始化查询模版
  initTemplate(params) {
    return post('fb-custom-query-service/dataquery/getGrabTemplate', params)
  },
  // 获取用户查询模版
  getGrabTemplateList(params) {
    return post('fb-custom-query-service/dataquery/getUserGrabTemplateList', params)
  },
  // 保存用户查询模版
  saveGrabTemplate(params) {
    return post('fb-custom-query-service/dataquery/saveUserGrabTemplate', params)
  },
  // 删除用户查询模版
  removeGrabTemplate(params) {
    return post('fb-custom-query-service/dataquery/removeUserGrabTemplate', params)
  },
  // 设置用户默认查询模版
  setDefaultGrabTemplate(params) {
    return post('fb-custom-query-service/dataquery/setUserDefaultGrabTemplate', params)
  }
}
