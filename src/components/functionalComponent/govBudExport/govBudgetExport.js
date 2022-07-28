// 审核弹框js调用   Author:Titans

import Vue from 'vue'
import GovBudgetExport from './GovBudgetExport.vue'

let id = 'audit_0'
let GovBudgetExportConstructor = Vue.extend(GovBudgetExport)
let instance = null
const BsFcGovBudgetExport = function (options) {
  if (Vue.prototype.$isServer) return
  options = options || {}
  let userOnClose = options.cancel
  let userOnConfirm = options.exportSure

  options.cancel = function () {
    BsFcGovBudgetExport.closeAndDestroy(id, userOnClose)
  }
  options.exportSure = function (content, context) {
    BsFcGovBudgetExport.confirmAndDestroy(id, userOnConfirm, content, context)
  }
  instance = new GovBudgetExportConstructor({
    data: options
  })
  instance.$mount()
  document.body.appendChild(instance.$el)
  instance.visible = true
  return instance
}
BsFcGovBudgetExport.closeAndDestroy = function (cid, userOnClose) {
  document.body.removeChild(instance.$el)
  instance.$destroy()
  if (typeof userOnClose === 'function') {
    userOnClose(instance)
  }
}
BsFcGovBudgetExport.confirmAndDestroy = function (cid, userOnConfirm, content, context) {
  document.body.removeChild(instance.$el)
  instance.$destroy()
  if (typeof userOnConfirm === 'function') {
    userOnConfirm(content, context)
  }
}

export default BsFcGovBudgetExport
// 调用示例
// this.$BsFcUtil.govBudgetExport({
//   exportConfig:{
//
//   },
//   exportSure(config) {
//   },
//   cancel() {
//   }
// })
