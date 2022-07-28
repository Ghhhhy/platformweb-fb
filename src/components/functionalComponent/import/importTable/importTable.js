// 导入表体js调用，支持解析嵌套表头   Author:Titans@2396757591@qq.com

import Vue from 'vue'
import ImportTable from './ImportTable.vue'

let id = 'importTable_0'
let ImportTableConstructor = Vue.extend(ImportTable)
let instance
let instances = {}
let seed = 1
const BsFcImportTable = function (options) {
  if (Vue.prototype.$isServer) return
  options = options || {}
  id = 'importTable_' + seed++
  instance = new ImportTableConstructor({
    data: options
  })
  let userOnClose = options.cancel
  let importSuccess = options.importSuccess
  id = 'audit_' + seed++
  options.importSuccess = function (obj, context) {
    BsFcImportTable.importSuccessAndDestroy(id, importSuccess, obj, context)
  }
  options.cancel = function (context) {
    BsFcImportTable.closeAndDestroy(id, userOnClose, context)
  }
  instance.id = id
  instance.$mount()
  document.body.appendChild(instance.$el)
  instance.importModalVisible = true
  instances[id] = instance
  return instance
}
BsFcImportTable.importSuccessAndDestroy = function (cid, importTableDataCb, obj, context) {
  document.body.removeChild(instance.$el)
  instances[cid || id].$destroy()
  delete instances[cid || id]
  if (typeof importTableDataCb === 'function') {
    importTableDataCb(obj, context)
  }
}
BsFcImportTable.closeAndDestroy = function (cid, userOnClose) {
  document.body.removeChild(instance.$el)
  instances[cid || id].$destroy()
  delete instances[cid || id]
  if (typeof userOnClose === 'function') {
    userOnClose(instances[cid || id])
  }
}
export default BsFcImportTable
// 调用示例
// this.$BsFcUtil.importTable({
//   content: '',
//   importSuccess(msg) {
//     console.log('ImportTableMsg', msg)
//   },
//   cancel() {

//   }
// })
