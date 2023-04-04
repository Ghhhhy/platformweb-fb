/*
 * @Author: 轻语
 * @Date: 2022-02-22 14:14:44
 * @LastEditors: 轻语
 * @LastEditTime: 2022-02-22 14:15:39
 * @Description:
 */
import treeSet from './src/index.vue'

treeSet.install = function(Vue) {
  Vue.component(treeSet.name, treeSet)
}

export default treeSet
