/*
 * @Author: 轻语
 * @Date: 2022-02-18 14:36:25
 * @LastEditors: 轻语
 * @LastEditTime: 2022-02-18 14:36:26
 * @Description:
 */

import TableForm from './src/index.vue'

TableForm.install = function(Vue) {
  Vue.component(TableForm.name, TableForm)
}

export default TableForm
