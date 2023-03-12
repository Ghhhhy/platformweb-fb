import { get, post, del } from '@/api/http'
import store from '@/store/index'
export default {
  getUnitTree(params) {
    return post('fiscal-config/queryTreeAssistData', params)
  },
  getMenuInfo(params) {
    return get('mp-b-perm-service/v1/menutreeinfo', params)
  },
  getCollectionMenu(params) {
    return get('mp-b-perm-service/v1/collectmenu', params)
  },
  saveCollectionMenu(params) {
    return post('mp-b-perm-service/v1/collectmenu', params)
  },
  removeCollectionMenu(params) {
    return post('mp-b-perm-service/v1/collectmenu/action/remove', params)
  },
  isCollectionMenu(params) {
    return get('mp-b-perm-service/v1/collectmenu/iscollect', params)
  },
  getFbPageConfig(params) {
    return get('bisBudget/bgtFbConfig/getFbPageConfig', params)
  },
  // getToDoDatas(params) {
  //   return post('bisTodo/todo/taskItems', params)
  // },
  getDoneDatas(params) {
    return get('bisTodo/todo/taskItems', params)
  },
  // getOperationGuideDatas(params) {
  //   return get('bisTodo/todo/opguide/index', params)
  // },
  getOperationGuideDatas(params) {
    return get('fileservice/v2/files/billguid/pre', params)
  },
  deleteAttachment(params) {
    return del('fileservice/v2/files?' + params)
  },
  getToDoDatas(params) {
    return get('pay-todo-service/todo/getToDoDatas', params)
  },
  // 获取支付菜单
  getPayMenus(params = {}) {
    const payload = {
      appids: ['pay'],
      year: store.state.userInfo.year,
      province: store.state.userInfo.province,
      ...params
    }
    return get('mp-b-perm-service/v1/menutreeinfo', payload)
  },
  // 根据菜单信息获取待办
  getMenuTodoInfo(params) {
    return post('large-monitor-platform/lmp/todo/getTodoInfo', params)
  }
}
