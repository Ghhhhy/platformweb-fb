/*
 * @Author: 轻语
 * @Date: 2022-02-22 15:57:43
 * @LastEditors: 轻语
 * @LastEditTime: 2022-02-22 16:00:13
 * @Description:
 */
import KeepAlive from './src/index.js'

KeepAlive.install = function(Vue) {
  Vue.component(KeepAlive.name, KeepAlive)
}

export default KeepAlive
