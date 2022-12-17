import { post } from '@/api/http'
import store from '@/store/index'
const { year, province } = store.state.userInfo

export default {
  getUnitTree(params) {
    return post('fiscal-config/queryTreeAssistData', params)
  },
  // 获取预算单位树
  getElementTree(params = {}) {
    const payload = {
      ...params,
      year,
      province,
      date: year,
      tokenid: store.getters.getLoginAuthentication.tokenid,
      appguid: 'apaas',
      parameters: {}
    }
    return post('large-monitor-platform/lmp/elementQuery/elementtree', payload)
  }
}
