/*
 * @Description:
 * @Author: sunlight
 * @Date: 2021-03-11 10:59:32
 * @LastEditTime: 2022-02-17 17:47:00
 * @LastEditors: 轻语
 */
import Tree from './src/Tree.vue'

Tree.install = function(Vue) {
  Vue.component(Tree.name, Tree)
}

export default Tree
