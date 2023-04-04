/*
 * @Author: comer
 * @Date: 2023-03-02 14:23:42
 * @LastEditors: comer
 * @LastEditTime: 2023-03-02 14:24:15
 * @Description:
 */
import QuickNavTree from './src/index.vue'

QuickNavTree.install = function(Vue) {
  Vue.component(QuickNavTree.name, QuickNavTree)
}

export default QuickNavTree
