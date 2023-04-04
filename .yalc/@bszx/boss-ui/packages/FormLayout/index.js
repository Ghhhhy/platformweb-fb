/*
 * @Author: 轻语
 * @Date: 2022-02-21 16:33:36
 * @LastEditors: 轻语
 * @LastEditTime: 2022-02-21 16:33:37
 * @Description:
 */
import FormLayout from './src/index.vue'

FormLayout.install = function(Vue) {
  Vue.component(FormLayout.name, FormLayout)
}

export default FormLayout
