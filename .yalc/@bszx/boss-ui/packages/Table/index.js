/*
 * @Author: 轻语
 * @Date: 2021-03-12 14:31:44
 * @LastEditors: 轻语
 * @LastEditTime: 2022-02-18 14:36:36
 * @Description:
 */
import Table from './src/index.vue'

Table.install = function(Vue) {
  Vue.component(Table.name, Table)
}

export default Table
