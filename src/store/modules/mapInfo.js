import store from '@/store'
import * as echarts from 'echarts'
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
      const code = store.state.userInfo.province?.slice(0, 6)

      const mapGecJson = await fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${code}_full.json`)
        .then(res => res.json())
      commit('setMapJson', mapGecJson)
      echarts.registerMap(store.state.userInfo.province, mapGecJson)
    }
  }
}
