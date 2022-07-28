//  申报api
import { get, post } from '@/api/http'
export default {
  // 获取左侧树
  getTreeData(params) {
    return get('large-monitor-platform/lmp/violationType/vioTypeTree', params)
  },
  // 获取总数
  getCount(params) {
    return get('large-monitor-platform/lmp/violationType/vioTypeCount', params)
  },
  // 获取表格数据
  queryTableDatas(params) {
    return get('large-monitor-platform/lmp/violationType/pageQuery', params)
  },
  // 新增
  addPolicies(params) {
    return post('large-monitor-platform/lmp/violationType/vioType', params)
  },
  // 修改
  changePolicies(params) {
    return post('large-monitor-platform/lmp/violationType/vioType', params)
  },
  // 删除
  delPolicies(params) {
    return post('large-monitor-platform/lmp/violationType/vioTypeDel', params)
  }
}
