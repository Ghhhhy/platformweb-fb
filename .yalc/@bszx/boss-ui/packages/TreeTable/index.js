/*
 * @Author: 轻语
 * @Date: 2022-03-02 16:14:35
 * @LastEditors: 轻语
 * @LastEditTime: 2022-03-02 16:24:04
 * @Description:
 */

import TreeTable from './src/index.vue'

TreeTable.install = function(Vue) {
  Vue.component(TreeTable.name, TreeTable)
}

export default TreeTable
