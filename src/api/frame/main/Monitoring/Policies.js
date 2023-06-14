//  政策法规管理api
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
    return post('large-monitor-platform/lmp/regulations/pageQuery', params)
    // return get('large-monitor-platform/lmp/regulations/list', params)
  },
  // 新增
  addPolicies(params) {
    return post('large-monitor-platform/lmp/regulations/add', params)
  },
  // 回显修改信息
  getDetail(params) {
    return post('large-monitor-platform/lmp/regulations/detail', params)
  },
  // 修改
  changePolicies(params) {
    return post('large-monitor-platform/lmp/regulations/update', params)
  },
  // 删除
  delPolicies(params) {
    return post('large-monitor-platform/lmp/regulations/delete', params)
  },
  getCode(params) {
    return post('large-monitor-platform/lmp/commom/getBussinesCode', params)
  },
  // 获取表格数据
  querygetTableDatas(params) {
    return get('large-monitor-platform/v2/payvoucher/loadtabledatas', params)
  },
  // 获取合计
  fileUpload(params) {
    return post('fileservice/v2/upload', params, null, 'multipart/form-data', 'openapi')
  },
  // 获取左侧树
  getTreeData(params) {
    return post('large-monitor-platform/lmp/dictInfo/pageQuery', params)
  },
  // 新增下拉树
  getProvince(params) {
    return post('large-monitor-platform/lmp/dictInfo/pageQuery', params)
  },
  // 文件上传
  reportImport(params) {
    return post('large-monitor-platform/lmp/babgtinfo/updateAttach', params)
  },
  // 查询接口
  getTableDate(params) {
    return post('large-monitor-platform/lmp/babgtinfo/search', params)
  }
}
