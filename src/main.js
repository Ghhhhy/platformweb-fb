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
// import vxeTable from 'bs-ui/src/base/vxeTable.js'
// globle components&&util
import TableConfig from './mixin/tableConf/index'
import VideoPlayer from 'vue-video-player'
import transJson from '@/utils/transformMenuQuery'
// axios Request
import useOptionChain from '@/utils/useOptionChain.js'
import html2canvasDirective from './directive/html2canvasDirective'
// 报表工具
import Report from '@platform/report'
import GridLayout from '@platform/charts-grid-layout'
import BossInteractive from '@platform/boss-interactive'
import BossCharts from '@platform/boss-charts'
// 以下三个插件顺序不可乱
import './plugin/http'
import './plugin/UI'
import './plugin/bs-ui' // 组件库出现问题阻塞时，注释掉当前行即可
import '@/assets/css/reset.scss'

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
// urlConfig
Vue.config.productionTip = true
Vue.config.devtools = true
console.log('git提交记录', process.env)
// Vue.config.productionTip = process.env.NODE_ENV !== 'production'
Vue.use(ElementUI)
// 自定义loading指令覆盖element-ui的loading指令
Vue.use(loadingDirective)
Vue.use(html2canvasDirective)
Vue.use(Echarts)
Vue.use(TableConfig)
Vue.use(VideoPlayer)
Vue.use(Report)
Vue.use(GridLayout)
Vue.use(BossInteractive)
Vue.use(BossCharts)
setupCompositionApi(Vue)
setupSvg(Vue)
setupElementUI(Vue)
setupVueAwesomerSwiper(Vue)
setupVueQuillEditor(Vue)
setupVuePrint(Vue)
Vue.prototype.transJson = transJson
Vue.prototype.useOptionChain = useOptionChain
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
