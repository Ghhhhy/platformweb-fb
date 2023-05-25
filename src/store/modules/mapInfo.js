import store from '@/store'
import * as echarts from 'echarts'
import { mapJson } from '@/api/frame/main/warningOverview'
// import shanxi from '@/assets/map/shanxi.json'
export default {
  namespaced: true,
  state: {
    mapJson: {}
  },
  mutations: {
    setMapJson (state, data) {
      state.mapJson = data || {}
    }
  },
  actions: {
    // 获取预警信息
    async getMapJson({ commit }) {
      const code = store.state.userInfo.province
      const { data } = await mapJson({ cityCode: code })
      const mapGecJson = data
      commit('setMapJson', mapGecJson)
      echarts.registerMap(store.state.userInfo.province, { features: mapGecJson.features })
    }
  }
}
