/*
 * @Author: 轻语
 * @Date: 2021-03-10 14:28:51
 * @LastEditors: 轻语
 * @LastEditTime: 2022-02-21 16:11:38
 * @Description:
 */
import JsonEditor from './src/index.vue'

JsonEditor.install = function(Vue) {
  Vue.component(JsonEditor.name, JsonEditor)
}

export default JsonEditor
