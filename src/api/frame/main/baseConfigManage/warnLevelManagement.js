//  申报api
import { get, post } from '@/api/http'
export default {
  // 获取左侧树
  getTreeData(params) {
    return post('large-monitor-platform/lmp/ruleClassify/tree/' + params)
  },
  // 获取下拉树
  getTree(params) {
    return post('large-monitor-platform/lmp/ruleClassify/tree/' + params)
  },
  // 获取所有规则
  getAllList(params) {
    return post('large-monitor-platform/lmp/ruleClassify/getAllList', params)
  },
  // 获取表格数据
  queryTableDatas(params) {
    return post('large-monitor-platform/lmp/ruleClassify/pageQuery', params)
  },
  // 获取左侧树
  getLeftTree(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  },
  // 业务下拉列表
  getbusLists(params) {
    return post('large-monitor-platform/lmp/businessFunctions/list', params)
  },
  // 新增
  addPolicies(params) {
    return post('large-monitor-platform/lmp/ruleClassify/add', params)
  },
  // 回显修改信息
  getDetail(params) {
    return get('large-monitor-platform/lmp/dataSource/detail/' + params)
  },
  // 修改
  changePolicies(params) {
    return post('large-monitor-platform/lmp/ruleClassify/update', params)
  },
  // 审核1
  flow(params) {
    return post('large-monitor-platform/lmp/dataSource/flowOperation', params)
  },
  // 撤销
  flowRevoke(params) {
    return post('large-monitor-platform/lmp/dataSource/flowRevoke', params)
  },
  delPolicies(params) {
    return post('large-monitor-platform/lmp/ruleClassify/delete', params)
  },
  getCode(params) {
    return post('large-monitor-platform/lmp/commom/getBussinesCode', params)
  },
  // 退回
  flowBack(params) {
    return post('large-monitor-platform/lmp/dataSource/flowBack', params)
  },
  // 获取表格数据
  queryTableDatasCount(params) {
    return post('large-monitor-platform/lmp/dataSource/getFlowCount', params)
  },
  // 获取合计
  fileUpload(params) {
    return post('fileservice/v2/upload', params, null, 'multipart/form-data', 'openapi')
  }
}
