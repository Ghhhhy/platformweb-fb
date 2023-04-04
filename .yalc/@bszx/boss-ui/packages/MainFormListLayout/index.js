/*
 * @Author: 轻语
 * @Date: 2022-02-21 16:49:18
 * @LastEditors: 轻语
 * @LastEditTime: 2022-02-21 16:55:42
 * @Description:
 */
import MainFormListLayout from './src/index.vue'

MainFormListLayout.install = function(Vue) {
  Vue.component(MainFormListLayout.name, MainFormListLayout)
}

export default MainFormListLayout
