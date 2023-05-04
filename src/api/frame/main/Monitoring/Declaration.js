//  申报api
import { get, post, del } from '@/api/http'
export default {
  // 查询附件
  getFile(params) {
    return get('fileservice/v2/files', params)
  },
  // 删除附件
  deleteAttachment(params) {
    return del('fileservice/v2/files?' + params)
  },
  // 获取表格数据
  queryTableDatas(params) {
    return post('large-monitor-platform/lmp/matter/pageQuery', params)
  },
  // 获取左侧树
  getLeftTree(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  },
  // 新增
  addPolicies(params) {
    return post('large-monitor-platform/lmp/matter/add', params)
  },
  // 回显修改信息
  getDetail(params) {
    return post('large-monitor-platform/lmp/matter/getMatterByCode', params)
  },
  // 修改
  changePolicies(params) {
    return post('large-monitor-platform/lmp/matter/update', params)
  },
  // 政策法规下拉列表
  regulationsLists(params) {
    return get('large-monitor-platform/lmp/regulations/list', params)
  },
  // 审核1
  flow(params) {
    return post('large-monitor-platform/lmp/matter/flowOperation', params)
  },
  // 撤销
  flowRevoke(params) {
    return post('large-monitor-platform/lmp/matter/flowRevoke', params)
  },
  delPolicies(params) {
    return post('large-monitor-platform/lmp/matter/delete', params)
  },
  getCode(params) {
    return post('large-monitor-platform/lmp/commom/getBussinesCode', params)
  },
  // 退回
  flowBack(params) {
    return post('large-monitor-platform/lmp/matter/flowBack', params)
  },
  allBack(params) {
    return post('large-monitor-platform/lmp/matter/allBack', params)
  },
  // 获取表格数据
  queryTableDatasCount(params) {
    return post('large-monitor-platform/lmp/matter/getFlowCount', params)
  },
  // 获取合计
  fileUpload(params) {
    return post('fileservice/v2/upload', params, null, 'multipart/form-data', 'openapi')
  },
  // 操作日志
  queryActionLog(params) {
    return post('large-monitor-platform/lmp/matter/queryActionLog', params)
  },
  // 获取区划树
  getLeftTree2(params) {
    return post('large-monitor-platform/lmp/regulation/queryMofTree', params)
  }
}
