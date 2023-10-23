import { getUserRoles, getProjectName, sendLoginLog } from '@/api/frame/common/userroles.js'
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
  userRolesData: [], // 用户角色
  projectList: [], // 项目列表
  colorList: [
    { warningLabel: '黄色预警', color: '#FFD43C', colorStyle: 'color: #FFD43C;' },
    { warningLabel: '橙色预警', color: '#FF6F20', colorStyle: 'color: #FF6F20;' },
    { warningLabel: '红色预警', color: '#ff0000', colorStyle: 'color: #ff0000;' },
    { warningLabel: '灰色预警', color: '#F1F1F1', colorStyle: 'color: #F1F1F1;' },
    { warningLabel: '蓝色预警', color: '#0000ff', colorStyle: 'color: #0000ff;' }
  ],
  rankingModalVisible: true, // 直达资金收支进度排行弹窗
  escalationModalVisible: false // 财政上报提醒弹窗
}
export const getters = {
  dict() { // 预警级别option
    return state.warnInfo.warnLevelOptions.map(item => {
      return {
        ...item,
        value: String(item.value),
        ...state.colorList.find(colorItem => { return colorItem.warningLabel === item.label || colorItem.warningLabel === item.warnName })
      }
    })
  },
  isFuJian() { // 判断是不是福建项目
    const province = state.userInfo.province
    return province.slice(0, 2) === '35' && province.slice(0, 4) !== '3502'// 3502 去掉厦门项目
  },
  treeQueryparamsCom() {
    let obj = { elementcode: 'admdiv', province: state.userInfo.province, year: state.userInfo.year, wheresql: 'and code like \'' + 61 + '%\'' }
    let budgetlevelcode = state.userInfo.budgetlevelcode
    if (budgetlevelcode === '4') { // 市级
      obj.wheresql = 'and code like \'' + state.userInfo.province.slice(0, 4) + '%\''
    } else if (budgetlevelcode === '5') { // xianji
      obj.wheresql = 'and code like \'' + state.userInfo.province.slice(0, 6) + '%\''
    } else if (budgetlevelcode === '2') { // sheng ji
      obj.wheresql = 'and code like \'' + state.userInfo.province.slice(0, 2) + '%\''
    }
    return obj
  },
  treeQueryparamsCom2() {
    let obj = { elementcode: 'AGENCY', province: state.userInfo.province, year: state.userInfo.year, wheresql: 'and code like \'' + 61 + '%\'' }
    let budgetlevelcode = state.userInfo.budgetlevelcode
    if (budgetlevelcode === '4') { // 市级
      obj.wheresql = 'and code like \'' + state.userInfo.province.slice(0, 4) + '%\''
    } else if (budgetlevelcode === '5') { // xianji
      obj.wheresql = 'and code like \'' + state.userInfo.province.slice(0, 6) + '%\''
    } else if (budgetlevelcode === '2') { // sheng ji
      obj.wheresql = 'and code like \'' + state.userInfo.province.slice(0, 2) + '%\''
    }
    return obj
  },
  isSx() { // 判断是否是陕西项目
    return state.projectList.some(item => {
      return item.configKey === 'sx' && item.configValue === 'true'
    })
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
  },
  getIsJurisdiction() { // 判断是否是全辖角色
    let params5 = mutations.transJson(state.curNavModule.param5 || '') || {}
    let IsJurisdiction = params5.jurisdiction !== undefined
    return IsJurisdiction
  },
  getRegulationClass() { // 获取regulationClass （主题名称）
    let params5 = mutations.transJson(state.curNavModule.param5 || '') || {}
    let RegulationClass = params5.regulationClass !== undefined ? params5.regulationClass : ''
    return RegulationClass
  }
}
export const mutations = {
  transJson(str) {
    if (!str) return
    var params = str.split(',')
    var result = {}
    if (params && params.length > 0) {
      for (var i = 0; i < params.length; i++) {
        var map = params[i].split('=')
        result[map[0]] = map[1]
      }
    }
    return result
  },
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
    localStorage.setItem('user', JSON.stringify(userInfoobj))
  },
  setJixiao(state, obj) {
    state.jixiao = obj
  },
  setCurNavRoute(state, curNavRoute) {
    state.curNavRoute = curNavRoute
  },
  setCurNavModule(state, curNavModule) {
    state.curNavModule = curNavModule
    localStorage.setItem('menuinfo', JSON.stringify(curNavModule))
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
  },
  setProjectList(state, list) {
    list && list.length && (state.projectList = list)
  },
  setRankingModalVisible(state, visible = false) {
    state.rankingModalVisible = visible
  },
  setEscalationModalVisible(state, visible = false) {
    state.escalationModalVisible = visible
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
  },
  async asyncGetProject({ commit, state }) {
    let projectList = []
    try {
      projectList = await getProjectName()
      commit('setProjectList', projectList.data)
    } catch (error) {
      console.log('请求项目列表出错')
    }
  }
}
