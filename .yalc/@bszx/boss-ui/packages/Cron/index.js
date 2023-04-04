/*
 * @Description: Cron组件
 * @Author: Comer
 * @Date: 2023-03-02 11:48:33
 * @LastEditors: Comer
 * @LastEditTime: 2023-03-02 11:48:34
 */
import Cron from './src/index.vue'

Cron.install = function(Vue) {
  Vue.component(Cron.name, Cron)
}

export default Cron
