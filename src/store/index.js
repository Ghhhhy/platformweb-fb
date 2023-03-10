import Vue from 'vue'
import Vuex from 'vuex'

// import tabstore from './tabStore'
import { state, mutations, actions, getters } from './global.js'
import basicInfo from './modules/basicInfo.js'
import warnInfo from './modules/warnInfo'
import todoInfo from './modules/todoInfo'
Vue.use(Vuex)
// global process
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    basicInfo,
    warnInfo,
    todoInfo
  },
  strict: debug
})
