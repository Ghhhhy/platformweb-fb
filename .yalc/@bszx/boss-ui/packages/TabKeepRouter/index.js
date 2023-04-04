/*
 * @Author: 轻语
 * @Date: 2022-02-22 14:11:45
 * @LastEditors: 轻语
 * @LastEditTime: 2022-02-22 14:11:45
 * @Description:
 */
import TabKeepRouter from './src/index.vue'

TabKeepRouter.install = function(Vue) {
  Vue.component(TabKeepRouter.name, TabKeepRouter)
}

export default TabKeepRouter
