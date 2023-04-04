/*
 * @Author: 轻语
 * @Date: 2022-02-16 10:00:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-06 10:47:25
 * @Description:
 */
import EditDownConditions from './tableRenderes/EditDownConditions/EditDownConditions.vue' // 条件渲染器:Titans
import EditDownJson from './tableRenderes/EditDownJson/EditDownJson.vue' // Json渲染器:Titans
import EditIntervarInput from './tableRenderes/editInterval/EditInterval.vue' // 区间渲染器:Titans
import EditDownTextarea from './tableRenderes/EditDownTextarea/EditDownTextarea.vue' // 下拉文本输入域:Titans
import EditDownTerm from './tableRenderes/EditDownTerm/EditDownTerm.vue' // 密级期限:sunlight
// 过滤器组件
import FilterComplex from './tableFilters/FilterComplex/FilterComplex.vue' // 通用过滤器:Titans
import FilterContent from './tableFilters/FilterContent/FilterContent.vue' // 内容过滤器:Titans
import FilterSelect from './tableFilters/FilterSelect/FilterSelect.vue' // 内容过滤器:Titans
import FilterInput from './tableFilters/FilterInput/FilterInput.vue' // 内容过滤器:Titans
import FilterNumberCompare from './tableFilters/FilterNumberCompare/FilterNumberCompare.vue' // 内容过滤器:Comer

import SplitPane from 'vue-splitpane'
// 导出包
const componentsLib = {
  EditDownConditions,
  EditDownJson,
  EditIntervarInput,
  EditDownTextarea,
  EditDownTerm,
  FilterComplex,
  FilterContent,
  FilterSelect,
  FilterInput,
  FilterNumberCompare,
  SplitPane
}
const install = function (Vue) {
  Object.keys(componentsLib).forEach(key => {
    Vue.component(key, componentsLib[key])
  })
}
// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const Api = {
  version: 'Render@1.0',
  install,
  componentsLib
}
export default Api
