// 功能性组件注册   Author:Titans@2396757591@qq.com
import BsFcAudit from './audit/Audit.vue' // 审核:Titans
import audit from './audit/audit.js' // 审核:Titans

import BsFcImportTable from './import/importTable/ImportTable.vue' // 导入excel:Titans
import importTable from './import/importTable/importTable.js' // 导入excel:Titans

import BsFcGovBudgetExport from './govBudExport/GovBudgetExport.vue' // 政府预算导出:Titans
import govBudgetExport from './govBudExport/govBudgetExport.js' // 政府预算导出:Titans
const componentsLib = {
  BsFcAudit,
  BsFcImportTable,
  BsFcGovBudgetExport
}
const utilsLib = {
  audit,
  importTable,
  govBudgetExport
}
const install = function (Vue) {
  let fcutil = {}
  Object.keys(utilsLib).forEach(util => {
    fcutil[util] = utilsLib[util]
  })
  Vue.prototype['$BsFcUtil'] = fcutil
  Object.keys(componentsLib).forEach(key => {
    Vue.component(key, componentsLib[key])
  })
}
const Api = {
  version: 'BS-FC-UI@0.1.0',
  install,
  componentsLib: componentsLib,
  utilsLib: utilsLib
}
// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default Api
