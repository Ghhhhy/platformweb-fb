import { getWarnInfo } from '@/api/frame/main/common/index.js'

export default {
  namespaced: true,
  state: {
    // 预警信息options
    warnInfoOptions: []
  },
  mutations: {
    // 设置预警信息
    setWarnInfoOptions (state, options) {
      state.warnInfoOptions = options || []
    }
  },
  actions: {
    // 获取预警信息
    async getWarnInfo({ commit }) {
      const { data } = await getWarnInfo()
      commit('setWarnInfoOptions', data || [])
    }
  }
}
