import { getWarnInfo } from '@/api/frame/main/common/index.js'

export default {
  namespaced: true,
  state: {
    // 预警级别
    warnLevelOptions: [],
    // 处理方式
    warnControlTypeOptions: []
  },
  mutations: {
    // 设置预警信息
    setWarnInfoOptions (state, { warnLevelOptions, warnControlTypeOptions }) {
      state.warnLevelOptions = warnLevelOptions || []
      state.warnControlTypeOptions = warnControlTypeOptions || []
    }
  },
  actions: {
    // 获取预警信息
    async getWarnInfo({ commit }) {
      const { data } = await getWarnInfo()
      const [warnLevelOptions, warnControlTypeOptions] = [[], []]
      if (Array.isArray(data)) {
        data.forEach(item => {
          warnLevelOptions.push({
            value: item.warnLevel,
            label: item.warnName,
            ...item
          })
          warnControlTypeOptions.push({
            value: item.warnLevel,
            label: item.warnTips,
            ...item
          })
        })
      }
      commit('setWarnInfoOptions', { warnLevelOptions, warnControlTypeOptions })
    }
  }
}
