import { post, get } from '@/api/http'
import store from '@/store/index'
const { year, province } = store.state.userInfo

export default {
  getUnitTree(params) {
    return post('fiscal-config/queryTreeAssistData', params)
  },
  // 获取预算单位树
  getElementTree(params = {}) {
    const payload = {
      year,
      province,
      date: year,
      tokenid: store.getters.getLoginAuthentication.tokenid,
      appguid: 'apaas',
      parameters: {},
      ...params
    }
    return post('large-monitor-platform/lmp/elementQuery/elementtree', payload)
  },
  // 获取预算单位权限树
  getAgencyTree(params = {}) {
    const payload = {
      tokenid: store.getters.getLoginAuthentication.tokenid,
      elementCode: 'agency',
      ...params
    }
    return get('large-monitor-platform/lmp/elementQuery/lefttree', payload)
  },
  // 根据code获取菜单
  queryTreedElementByCod(code = 'pay') {
    const formData = new FormData()
    formData.append('code', code || 'pay')
    return post('large-monitor-platform/lmp/elementQuery/queryTreedElementByCode', formData, null, 'multipart/form-data')
  }
}
