/*
 * @Author: 轻语
 * @Date: 2022-02-21 10:57:33
 * @LastEditors: 轻语
 * @LastEditTime: 2022-02-21 11:14:39
 * @Description:
 */
import TabPanel from './src/index.vue'

TabPanel.install = function(Vue) {
  Vue.component(TabPanel.name, TabPanel)
}

export default TabPanel
