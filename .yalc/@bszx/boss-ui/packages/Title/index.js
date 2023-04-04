/*
 * @Author: 轻语
 * @Date: 2022-02-17 15:58:01
 * @LastEditors: 轻语
 * @LastEditTime: 2022-02-17 15:58:01
 * @Description:
 */
import Title from './src/Title.vue'

Title.install = function(Vue) {
  Vue.component(Title.name, Title)
}

export default Title
