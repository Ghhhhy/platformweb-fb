/*
 * @Author: 轻语
 * @Date: 2022-05-06 17:11:35
 * @LastEditors: 轻语
 * @LastEditTime: 2022-05-06 17:12:02
 * @Description:
 */
import Tab from './src/index.vue'

Tab.install = function(Vue) {
  Vue.component(Tab.name, Tab)
}

export default Tab
