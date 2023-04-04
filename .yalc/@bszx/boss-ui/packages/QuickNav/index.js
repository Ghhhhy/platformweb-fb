/*
 * @Author: 轻语
 * @Date: 2022-02-22 14:23:42
 * @LastEditors: 轻语
 * @LastEditTime: 2022-02-22 14:24:15
 * @Description:
 */
import QuickNav from './src/index.vue'

QuickNav.install = function(Vue) {
  Vue.component(QuickNav.name, QuickNav)
}

export default QuickNav
