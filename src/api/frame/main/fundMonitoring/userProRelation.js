//  数据抽取api
import { post } from '@/api/http'
export default {
  // 获取表格数据
  queryTableDatas (params) {
    return post('dfr-monitor-service/dfr/userProRelation/query', params)
  },
  queryByUserId (params) {
    return post('dfr-monitor-service/dfr/userProRelation/queryByUserId', params)
  },
  insert (params) {
    return post('dfr-monitor-service/dfr/userProRelation/add', params)
  },
  delete (params) {
    return post('dfr-monitor-service/dfr/userProRelation/delete', params)
  },
  // 查询用户信息树
  user(params) {
    return post('dfr-monitor-service/dfr/userList', params)
  }
}
