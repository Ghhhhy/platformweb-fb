/*
 * @Description: 本地组件注册
 * @Author: Comer
 * @Date: 2023-03-30 16:40:33
 * @LastEditors: 罗景丹 luojingdan@bosssoft.com.cn
 * @LastEditTime: 2023-05-06 11:00:39
 */
import Vue from 'vue'
import BSUI from '../components/index'
import router from '../router/index'
import relyComponent from '../base/relyComponent.js'
import store from '../store/index'
import vxeTable from '../base/vxeTable.js'
import customConfig from '../config/customConfig.js'
import { setupProjectPreoperation } from './setupProjectPreoperation.js'
import BehaviorCollector from '@/utils/behaviorcollector.js'

router.beforeEach(async (to, from, next) => {
  console.log('%c路由跳转', 'background: green;color:white;padding:2px;border-radius:2px;', to)
  console.log('%c菜单信息', 'background: green;color:white;padding:2px;border-radius:2px;', store.state.curNavModule)
  BehaviorCollector.initRouteMonitor({ to, from, state: store.state })
  BSUI.utilsLib.LoadingMark.showLoadingMark()
  setTimeout(function () { BSUI.utilsLib.LoadingMark.removeLoadingMark() }, 6000)
  const { tokenid } = store.getters.getLoginAuthentication
  // iframe环境下
  if (window.self !== window.top) {
    try {
      await setupProjectPreoperation()
    } finally {
      next()
    }
    return
  }
  if (to.matched.some((r) => r.meta.requireAuth)) {
    if (tokenid) { // 判断是否已经登录
      if (to.name !== 'Login' && !Object.keys(store.state.userInfo).length) {
        next('/')
      } else {
        next()
      }
    } else {
      BSUI.utilsLib.LoadingMark.removeLoadingMark()
      next({
        path: '/Login',
        name: 'Login' // 登录成功后重定向到当前页面
      })
    }
  } else {
    if (to.matched.length !== 0) {
      next()
    } else {
      next({ path: '/404' })
    }
  }
})
router.afterEach((to, from) => {
  BSUI.utilsLib.LoadingMark.removeLoadingMark()
})

BSUI.ConfigOption.setConfig(customConfig)
Vue.use(vxeTable)
Vue.use(BSUI)
Vue.use(relyComponent)
