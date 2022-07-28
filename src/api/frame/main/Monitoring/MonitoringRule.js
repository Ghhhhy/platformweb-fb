//  监控模板api
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
    return post('large-monitor-platform/lmp/template/pageQuery', params)
  },
  // 业务下拉列表
  getbusLists(params) {
    return post('large-monitor-platform/lmp/businessFunctions/list', params)
  },
  // 新增
  addTemplate(params) {
    return post('large-monitor-platform/lmp/template/add', params)
  },
  // 修改
  changeTemplate(params) {
    return post('large-monitor-platform/lmp/template/update', params)
  },
  // 详情
  getDetail(params) {
    return post('large-monitor-platform/lmp/template/getTemplateByCode', params)
  },
  // 删除
  delTemplate(params) {
    return post('large-monitor-platform/lmp/template/delete', params)
  },
  // 获取表格数据
  querygetTableDatas(params) {
    return get('large-monitor-platform/v2/payvoucher/loadtabledatas', params)
  },
  // 获取合计
  fileUpload(params) {
    return post('fileservice/v2/upload', params, null, 'multipart/form-data', 'openapi')
  }

}
