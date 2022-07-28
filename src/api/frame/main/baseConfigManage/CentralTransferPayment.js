//  申报api
import { post } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas(params) {
    return post('large-monitor-platform/lmp/central/pageQuery', params)
  },
  // // 新增
  // addPolicies(params) {
  //   return post('large-monitor-platform/lmp/askType/add', params)
  // },
  // // 回显修改信息
  // getDetail(params) {
  //   return get('large-monitor-platform/lmp/askType/detail/' + params)
  // },
  // 修改
  changePolicies(params) {
    return post('large-monitor-platform/lmp/central/update', params)
  // },
  // // 获取表格数据
  // queryTableDatasCount(params) {
  //   return post('large-monitor-platform/lmp/askType/getFlowCount', params)
  // },
  // delPolicies(params) {
  //   return post('large-monitor-platform/lmp/askType/delete', params)
  // },
  // getAskCode(params) {
  //   return post('large-monitor-platform/lmp/ask/code', params)
  // },
  // // 获取左侧树
  // getLeftTree(params) {
  //   return get('large-monitor-platform/lmp/mofDivTree', params)
  // },
  // getTreewhere(params) {
  //   return get('large-monitor-platform/lmp/mofDivTree', params)
  // },
  // getTypeList(params) {
  //   return post('large-monitor-platform/lmp/ask/getTypeList', params)
  }
}
