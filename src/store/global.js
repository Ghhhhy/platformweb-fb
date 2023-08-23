import { getUserRoles, sendLoginLog } from '@/api/frame/common/userroles.js'
import store from '@/store'

export const state = { // 实时监听state值的变化(最新状态)
  loading: false,
  islogin: false, // 是否登录,
  curNavRoute: {},
  curMenuObj: {},
  appData: {},
  curFavorite: {},
  jixiao: {},
  modefiyData: {},
  modefiyExpendData: {},
  curNavModule: {}, // 当前菜单信息
  userInfo: {}, // 用户信息
  loginAuthentication: { // 当前登录认证信息
    tokenid: '', // chj-test 测试用的tokenid为cb6ac3c59bd75157cc67fc0a8bfe1159
    appguid: ''
  },
  systemMenu: {},
  lookAduitJxData: {},
  userRolesData: [] // 用户角色
}
export const getters = {
  isFuJian() { // 判断是不是福建项目
    const province = state.userInfo.province
    return province.slice(0, 2) === '35' && province.slice(0, 4) !== '3502'// 3502 去掉厦门项目
  },
  isloading(state) { // 承载变化的login的值.  //.$store.getters.isloading
    return state.loading
  },
  islogin(state) {
    return state.islogin
  },
  getuserInfo(state) {
    return state.userInfo
  },
  getCurNavModule(state) {
    return state.curNavModule
  },
  getLoginAuthentication(state) {
    return state.loginAuthentication
  },
  getModefiyData(state) {
    return state.modefiyData
  },
  getModefiyExpendData(state) {
    return state.modefiyExpendData
  },
  getJixiaoData(state) {
    return state.jixiao
  },
  curFavorite(state) {
    return state.curFavorite
  },
  getLookAduitJxData(state) {
    return state.lookAduitJxData
  },
  getUserRolesData(state) {
    return state.userRolesData
  }
}
export const mutations = {
  setloading(state, isshow) { // 自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.loading = isshow
  },
  setLogin(state, islogin) { // this.$store.commit("setlogin", true)
    state.islogin = islogin
  },
  setUserInfo(state, userInfoobj) {
    userInfoobj.budgetlevelid = '687919CF8A0E47049B70654146BB3A69'
    userInfoobj.budgetlevelcode = '2'
    userInfoobj.budgetlevelname = '省级'
    if (userInfoobj.province.substring(2, 9) === '0000000') {
    } else if (userInfoobj.province.substring(4, 9) === '00000') {
      userInfoobj.budgetlevelid = '4B694D453CAB4C9BAF5042BCC3A623D3'
      userInfoobj.budgetlevelcode = '4'
      userInfoobj.budgetlevelname = '市级'
    } else if (userInfoobj.province.substring(6, 9) === '000') {
      userInfoobj.budgetlevelid = 'AA80830F435E4551959EBF479F415C51'
      userInfoobj.budgetlevelcode = '5'
      userInfoobj.budgetlevelname = '县（区）级'
    }

    state.userInfo = userInfoobj
    store.dispatch('mapInfo/getMapJson')
  },
  setJixiao(state, obj) {
    state.jixiao = obj
  },
  setCurNavRoute(state, curNavRoute) {
    state.curNavRoute = curNavRoute
  },
  setCurNavModule(state, curNavModule) {
    state.curNavModule = curNavModule
  },
  setCurMenuObj(state, obj) {
    state.curMenuObj = obj
  },
  setAppData(state, obj) {
    state.appData = obj
  },
  setLoginAuthentication(state, obj) {
    state.loginAuthentication = obj
  },
  setModefiyData(state, arr) {
    state.modefiyData = arr
  },
  setSystemMenu(state, obj) {
    state.systemMenu = obj
  },
  setLookAduitJxData(state, obj) {
    state.lookAduitJxData = obj
  },
  setModefiyExpendData(state, obj) {
    state.modefiyExpendData = obj
  },
  setUserRoles(state, obj) {
    state.userRolesData = obj
  }
}
export const actions = {
  asyncsetloading: (context, loadingstatus) => { // this.$store.dispatch("asyncsetoading", false)
    context.commit('setloading', loadingstatus)
  },
  asyncLookAuditJxData: (context, obj) => {
    context.commit('setLookAduitJxData', obj)
  },
  sendLoginLogInfo(context) {
    if (getters.isFuJian) {
      sendLoginLog()
    }
  },
  /**
   * 请求当前用户角色列表
   * @param commit
   * @param state
   * @returns {Promise<void>}
   */
  async asyncUserRoles({ commit, state }) {
    const { userInfo } = state
    const params = {
      userguid: userInfo.guid,
      province: userInfo.province,
      year: userInfo.year
    }
    const { data } = await getUserRoles(params)
    if (!Array.isArray(data)) return
    console.log(data)
    commit('setUserRoles', data)
  }
}
