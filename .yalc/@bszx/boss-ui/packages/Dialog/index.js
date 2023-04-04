/*
 * @Description:
 * @Author: sunlight
 * @Date: 2021-03-12 17:11:23
 * @LastEditTime: 2022-02-21 16:10:01
 * @LastEditors: 轻语
 */
import Dialog from './src/index.vue'

Dialog.install = function(Vue) {
  Vue.component(Dialog.name, Dialog)
}

export default Dialog
