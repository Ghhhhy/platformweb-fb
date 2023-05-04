//  规则管理审核api
import { get, post } from '@/api/http'
export default {
  // 获取左侧树
  getLeftTree(params) {
    return get('large-monitor-platform/lmp/mofDivTree', params)
  },
  // 列表
  queryMonitorTableDatas(params) {
    return post('large-monitor-platform/lmp/basic/pageQuery', params)
  },
  // 新增
  add(params) {
    return post('large-monitor-platform/lmp/basic/add', params)
  },
  // 修改
  update(params) {
    return post('large-monitor-platform/lmp/basic/update', params)
  },
  // 删除
  delete(params) {
    return post('large-monitor-platform/lmp/basic/delete', params)
  },
  // 查询附件
  getFile(params) {
    return get('fileservice/v2/files', params)
  }
}
