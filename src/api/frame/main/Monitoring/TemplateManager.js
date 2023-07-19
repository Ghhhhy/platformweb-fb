//  政策法规管理api
import { get, post, del } from '@/api/http'
export default {
  // 查询附件
  getFile(params) {
    return get('fileservice/v2/files', params)
  },
  // 删除附件
  delete(params) {
    return del('fileservice/v2/files?' + params)
  },
  // 获取表格数据
  queryTableDatas(params) {
    return post('large-monitor-platform/lmp/fileTemplate/pageQuery', params)
    // return get('large-monitor-platform/lmp/regulations/list', params)
  },
  // 新增
  add(params) {
    return post('large-monitor-platform/lmp/fileTemplate/add', params)
  },
  // 修改
  update(params) {
    return post('large-monitor-platform/lmp/fileTemplate/update', params)
  },
  // 删除
  deleteFileTemplate(params) {
    return post('large-monitor-platform/lmp/fileTemplate/delete', params)
  },
  getCode(params) {
    return post('large-monitor-platform/lmp/commom/getBussinesCode', params)
  },
  // 获取合计
  fileUpload(params) {
    return post('fileservice/v2/upload', params, null, 'multipart/form-data', 'openapi')
  },
  // 获取合计
  getDetail(params) {
    return post('large-monitor-platform/lmp/fileTemplate/detail', params)
  }
}
