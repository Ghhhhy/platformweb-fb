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
    return post('large-monitor-platform/lmp/dataSource/pageQuery', params)
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
    return post('large-monitor-platform/lmp/dataSource/add', params)
  },
  // 回显修改信息
  getDetail(params) {
    return get('large-monitor-platform/lmp/dataSource/detail/' + params)
  },
  // 修改
  changePolicies(params) {
    return post('large-monitor-platform/lmp/dataSource/update', params)
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
    return post('large-monitor-platform/lmp/dataSource/delete', params)
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
  },
  check(params) {
    return post('large-monitor-platform/lmp/dataSource/checkData/' + params)
  }
}
