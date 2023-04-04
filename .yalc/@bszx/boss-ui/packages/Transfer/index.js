/*
 * @Description: 模态框穿梭组件
 * @Author: Comer
 * @Date: 2023-03-02 12:02:07
 * @LastEditors: Comer
 * @LastEditTime: 2023-03-02 12:02:08
 */
import ModalTransfer from './src/index.vue'

ModalTransfer.install = function(Vue) {
  Vue.component(ModalTransfer.name, ModalTransfer)
}

export default ModalTransfer
