/*
 * @Author: 轻语
 * @Date: 2022-05-06 17:12:49
 * @LastEditors: 轻语
 * @LastEditTime: 2022-05-06 17:13:07
 * @Description:
 */
import HeaderNav from './src/index.vue'

HeaderNav.install = function(Vue) {
  Vue.component(HeaderNav.name, HeaderNav)
}

export default HeaderNav
