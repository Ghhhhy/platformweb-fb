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
    return post('large-monitor-platform/lmp/dict/pageQuery', params)
  },
  // 获取表格数据
  queryTableDatas1(params) {
    return post('large-monitor-platform/lmp/dictInfo/pageQuery', params)
  },
  // 获取左侧树
  getLeftTree(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  },
  // 新增
  addPolicies(params) {
    return post('large-monitor-platform/lmp/dict/add', params)
  },
  // 新增
  addPolicies1(params) {
    return post('large-monitor-platform/lmp/dictInfo/add', params)
  },
  // 修改
  changePolicies(params) {
    return post('large-monitor-platform/lmp/dict/update', params)
  },
  // 修改
  changePolicies1(params) {
    return post('large-monitor-platform/lmp/dictInfo/update', params)
  },
  delPolicies(params) {
    return post('large-monitor-platform/lmp/dict/delete', params)
  },
  delPolicies1(params) {
    return post('large-monitor-platform/lmp/dictInfo/delete', params)
  },
  dictList(params) {
    return post('large-monitor-platform/lmp/dictInfo/dictList', params)
  }
}
