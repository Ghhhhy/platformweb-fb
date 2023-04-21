//  申报api
import { get, post } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas(params) {
    return post('large-monitor-platform/lmp/ask/pageQuery', params)
  },
  // 新增
  addPolicies(params) {
    return post('large-monitor-platform/lmp/ask/add', params)
  },
  // 回显修改信息
  getDetail(params) {
    return get('large-monitor-platform/lmp/ask/detail/' + params)
  },
  // 修改
  changePolicies(params) {
    return post('large-monitor-platform/lmp/ask/update', params)
  },
  // 获取表格数量
  queryTableDatasCount(params) {
    return post('large-monitor-platform/lmp/ask/count', params)
  },
  delPolicies(params) {
    return post('large-monitor-platform/lmp/ask/delete', params)
  },
  approval(params) {
    return post('large-monitor-platform/lmp/ask/submit', params)
  },
  getAskCode(params) {
    return post('large-monitor-platform/lmp/ask/code', params)
  },
  // 获取左侧树
  getLeftTree(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  },
  getTreewhere(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  },
  // 撤销
  revoke(params) {
    return post('large-monitor-platform/lmp/ask/noPass', params)
  },
  getTypeList(params) {
    return post('large-monitor-platform/lmp/ask/getTypeList', params)
  },
  // 查询附件
  getFile(params) {
    return get('fileservice/v2/files', params)
  },
  print(params) {
    return post('large-monitor-platform/lmp/ask/upload', params)
  }
}
