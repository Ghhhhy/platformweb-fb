//  数据抽取api
import { post } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas (params) {
    return post('large-monitor-platform/lmp/userRegulationRelation/query', params)
  },
  queryByUserId (params) {
    return post('large-monitor-platform/lmp/userRegulationRelation/queryByUserId', params)
  },
  update (params) {
    return post('large-monitor-platform/lmp/userRegulationRelation/update', params)
  },
  delete (params) {
    return post('large-monitor-platform/lmp/userRegulationRelation/delete', params)
  },
  // 查询用户信息树
  user(params) {
    return post('large-monitor-platform/lmp/userList', params)
  }
}
