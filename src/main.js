import './base/css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
// element-ui
// import ElementUI from 'element-ui'
import { setupElementUI } from './plugin/setupElementUI'
import ElementUI from './common/js/lib/elementUI/elementUI.js'
import loadingDirective from './directive/loading.js'

// 注册compoistion-api
import { setupCompositionApi } from './plugin/setupCompositionApi'
import { setupSvg } from './plugin/setupSvg'
import { setupVueAwesomerSwiper } from './plugin/useVueAwesomeSwiper'
import { setupVueQuillEditor } from './plugin/setupVueQuillEditor'
// echart
import Echarts from './plugin/setupEcharts.js'
// print
import setupVuePrint from './plugin/setupVuePrint.js'
// vxeTable
import vxeTable from './base/vxeTable.js'
// import vxeTable from 'bs-ui/src/base/vxeTable.js'
// globle components&&util
import relyComponent from './base/relyComponent.js'
import customConfig from './config/customConfig.js'
import BSUI from './components/index.js'
import TableConfig from './mixin/tableConf/index'
import VideoPlayer from 'vue-video-player'
import transJson from '@/utils/transformMenuQuery'
import {
  get,
  post,
  put,
  del,
  postStringify,
  DownLoadToFile,
  downLoad,
  httpGlobalGatewayAgent,
  smSecretUtils,
  globalGatewayAgentConfig
} from './api/http'
// import BSUI from 'bs-ui'
// import BSUI from 'bs-ui/lib/bsui.common.js'
// axios Request
import useOptionChain from '@/utils/useOptionChain.js'
import html2canvasDirective from './directive/html2canvasDirective'

BSUI.ConfigOption.setConfig(customConfig)
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
// urlConfig
Vue.config.productionTip = true
Vue.config.devtools = true
// Vue.config.productionTip = process.env.NODE_ENV !== 'production'
Vue.use(ElementUI)
// 自定义loading指令覆盖element-ui的loading指令
Vue.use(loadingDirective)
Vue.use(html2canvasDirective)
Vue.use(Echarts)
Vue.use(vxeTable)
Vue.use(BSUI)
Vue.use(relyComponent)
Vue.use(TableConfig)
Vue.use(VideoPlayer)
setupCompositionApi(Vue)
setupSvg(Vue)
setupElementUI(Vue)
setupVueAwesomerSwiper(Vue)
setupVueQuillEditor(Vue)
setupVuePrint(Vue)

Vue.prototype.transJson = transJson
Vue.prototype.useOptionChain = useOptionChain
Vue.prototype.$http = {
  get,
  post,
  put,
  del,
  postStringify,
  DownLoadToFile,
  downLoad,
  httpGlobalGatewayAgent,
  smSecretUtils,
  globalGatewayAgentConfig
}
router.beforeEach((to, from, next) => {
  BSUI.utilsLib.LoadingMark.showLoadingMark()
  setTimeout(function () { BSUI.utilsLib.LoadingMark.removeLoadingMark() }, 6000)
  const { tokenid } = store.getters.getLoginAuthentication
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
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
