//  规则管理审核api
import { get, post, del } from '@/api/http'
export default {
  // 查询附件
  getFile(params) {
    return get('fileservice/v2/files', params)
  },
  // 获取下拉树
  getTree(params) {
    return post('large-monitor-platform/lmp/ruleClassify/tree/' + params)
  },
  // 获取左侧树
  getTreeData(params) {
    return post('large-monitor-platform/lmp/ruleClassify/tree/' + params)
  },
  // 获取左侧树
  getLeftTree(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  },
  // 获取主题树
  getLeftTree1(params) {
    return post('large-monitor-platform/lmp/regulation/queryRuleTree', params)
  },
  // 获取08主题树
  querySpecialRuleTree(params) {
    return post('large-monitor-platform/lmp/regulation/querySpecialRuleTree', params)
  },
  // 获取用户的角色
  getUserRoles(params) {
    return get('mp-b-perm-service/v2/userroles', params)
  },
  // 获取区划树
  getLeftTree2(params) {
    return post('large-monitor-platform/lmp/regulation/queryMofTree', params)
  },
  getDetailData(params) {
    return get('large-monitor-platform/lmp/regulation/detail/' + params)
  },
  // 删除附件
  deleteAttachment(params) {
    return del('fileservice/v2/files?' + params)
  },
  // 获取表格数据
  queryTableDatas(params) {
    // return post('large-monitor-platform/lmp/function/pageQuery', params)
  },
  // 新增
  addPolicies(params) {
    // return post('large-monitor-platform/lmp/function/add ', params)
  },
  // 回显修改信息
  getDetail(params) {
    // return post('large-monitor-platform/lmp/function/detail', params)
  },
  // 修改
  changePolicies(params) {
    // return post('large-monitor-platform/lmp/function/update', params)
  },
  // 删除
  delPolicies(params) {
    // return post('large-monitor-platform/lmp/function/delete', params)
  },
  // 获取表格数据
  querygetTableDatas(params) {
    return get('large-monitor-platform/v2/payvoucher/loadtabledatas', params)
  },
  // 获取合计
  fileUpload(params) {
    return post('fileservice/v2/upload', params, null, 'multipart/form-data', 'openapi')
  },
  // 获取合计
  getBusinessTreeData(params) {
    return post('large-monitor-platform//lmp/businessFunctions/list', params, null, 'multipart/form-data', 'openapi')
  },
  // 查询数据
  getPageQuery(params) {
    return post('large-monitor-platform/lmp/template/pageQuery', params, null, 'multipart/form-data', 'openapi')
  },
  // 新增数据
  addData(params) {
    return post('large-monitor-platform/lmp/regulation/add', params, null, 'multipart/form-data', 'openapi')
  },
  // 新增数据
  delete(params) {
    return post('large-monitor-platform/lmp/regulation/delete', params, null, 'multipart/form-data', 'openapi')
  },
  // 新增数据
  updateData(params) {
    return post('large-monitor-platform/lmp/regulation/update', params, null, 'multipart/form-data', 'openapi')
  },
  // 新增数据
  audieData(params) {
    return post('large-monitor-platform/lmp/regulation/statusCirculation', params, null, 'multipart/form-data', 'openapi')
  },
  // 新增数据
  getTemplateByCode(params) {
    return post('large-monitor-platform/lmp/template/getTemplateByCode', params, null, 'multipart/form-data', 'openapi')
  },
  // 新增数据
  getTreewhere(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  },
  // 新增数据
  getMainTableDataList(params) {
    return post('large-monitor-platform/lmp/regulation/pageQuery', params, null, 'multipart/form-data', 'openapi')
  },
  // 获取列表数量
  queryTableDatasCount(params) {
    return post('large-monitor-platform/lmp/regulation/getCount', params, null, 'multipart/form-data', 'openapi')
  },
  // 监控规则查看列表
  queryMonitorTableDatas(params) {
    return post('large-monitor-platform/lmp/regulation/view', params)
  },

  // 专项监控规则查看列表
  querySpecialTableDatas(params) {
    return post('large-monitor-platform/lmp/regulation/viewSpecial', params)
  },

  // 业务下拉列表
  getbusLists(params) {
    return post('large-monitor-platform/lmp/businessFunctions/list', params)
  },
  // 启用
  open(params) {
    return post('large-monitor-platform/lmp/regulation/open', params)
  },
  // 停用
  stop(params) {
    return post('large-monitor-platform/lmp/regulation/stop', params)
  },
  // 操作日志
  queryActionLog(params) {
    return post('large-monitor-platform/lmp/regulation/queryActionLog', params)
  },
  queryWarningRule(params) {
    return post('dfr-monitor-service/dfr/warningRule/view', params)
  },
  queryRuleSpecial(params) {
    return post('dfr-monitor-service/dfr/warningRule/viewSpecial', params)
  }
}
