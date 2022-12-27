import { post, get } from '@/api/http'
import store from '@/store/index'
// const { year, province } = store.state.userInfo

export default {
  getUnitTree(params) {
    return post('fiscal-config/queryTreeAssistData', params)
  },
  // 获取预算单位树
  getElementTree(params = {}) {
    const payload = {
      tokenid: store.getters.getLoginAuthentication.tokenid,
      elementCode: 'agency',
      ...params
    }
    return get('large-monitor-platform/lmp/elementQuery/lefttree', payload)
  }
}
