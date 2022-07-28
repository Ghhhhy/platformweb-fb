import Vue from 'vue'
import Vuex from 'vuex'

// import tabstore from './tabStore'
import { state, mutations, actions, getters } from './global.js'
import basicInfo from './modules/basicInfo.js'
Vue.use(Vuex)
// global process
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    basicInfo
  },
  strict: debug
})
