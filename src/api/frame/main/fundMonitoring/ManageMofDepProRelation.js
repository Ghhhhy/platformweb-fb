//  数据抽取api
import { post, get } from '@/api/http'
import store from '@/store'
export default {
  // 获取表格数据
  queryTableDatas (params) {
    return post('dfr-monitor-service/dfr/manageMofDepProRelation/query', params)
  },
  queryByMofDepId (params) {
    return post('dfr-monitor-service/dfr/manageMofDepProRelation/queryByMofDepId', params)
  },
  insert (params) {
    return post('dfr-monitor-service/dfr/manageMofDepProRelation/add', params)
  },
  delete (params) {
    return post('dfr-monitor-service/dfr/manageMofDepProRelation/delete', params)
  },
  // 查询用户信息树
  user(params) {
    return post('dfr-monitor-service/dfr/userList', params)
  },
  // 获取处室信息树
  getTreewhere(params) {
    return get(`mp-b-basedata-service/v2/basedata/MANAGE_MOF_DEP/${store.state.userInfo.province}`, params)
  },
  // 获取单位信息树
  getTreeAgency(params) {
    return get(`mp-b-basedata-service/v2/basedata/AGENCY/${store.state.userInfo.province}`, params)
  },
  update (params) {
    return post('dfr-monitor-service/dfr/manageMofDepProRelation/update', params)
  }
}
