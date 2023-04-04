/*
 * @Author: 轻语
 * @Date: 2021-03-10 15:14:26
 * @LastEditors: 轻语
 * @LastEditTime: 2021-03-10 15:15:39
 * @Description:
 */
import OperationLog from './src/index.vue'

OperationLog.install = function(Vue) {
  Vue.component(OperationLog.name, OperationLog)
}

export default OperationLog
