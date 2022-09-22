// echarts && vue-echarts
import * as echarts from 'echarts'
import 'echarts-liquidfill'
// import 'echarts/map/js/china.js'
import shanxi from '@/assets/map/shanxi.json'
// import china from 'echarts/map/json/china.json'
echarts.registerMap('shanxi', shanxi)
// echarts.registerMap('china', china)
// const VueECharts = () => import('vue-echarts')
const ECharts = {
  install: function (Vue) {
    // Vue.component('v-chart', VueECharts)
    Vue.prototype.$echarts = echarts
  }
}
export default ECharts
