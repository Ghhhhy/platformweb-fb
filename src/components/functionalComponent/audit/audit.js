// 审核弹框js调用   Author:Titans

import Vue from 'vue'
import Audit from './Audit.vue'

const isVNode = (node) => {
  return node !== null && typeof node === 'object' && Object.prototype.hasOwnProperty.call(node, 'componentOptions')
}
let id = 'audit_0'
let AuditConstructor = Vue.extend(Audit)
let instance
let instances = {}
let seed = 1
const BsFcAudit = function (options) {
  if (Vue.prototype.$isServer) return
  options = options || {}
  if (typeof options === 'string') {
    options = {
      content: options
    }
  }
  let userOnClose = options.cancel
  let userOnConfirm = options.confirm

  id = 'audit_' + seed++
  options.cancel = function () {
    BsFcAudit.closeAndDestroy(id, userOnClose)
  }
  options.confirm = function (content, context) {
    BsFcAudit.confirmAndDestroy(id, userOnConfirm, content, context)
  }
  instance = new AuditConstructor({
    data: options
  })
  instance.id = id
  if (isVNode(instance.content)) {
    instance.$refs.xeModal.$slots.default = [instance.content]
    instance.$slots.default = [instance.content]
    instance.content = null
  }
  instance.$mount()
  document.body.appendChild(instance.$el)
  instance.visible = true
  instances[id] = instance
  return instance
}
BsFcAudit.closeAndDestroy = function (cid, userOnClose) {
  document.body.removeChild(instance.$el)
  instances[cid || id].$destroy()
  delete instances[cid || id]
  if (typeof userOnClose === 'function') {
    userOnClose(instances[cid || id])
  }
}
BsFcAudit.confirmAndDestroy = function (cid, userOnConfirm, content, context) {
  document.body.removeChild(instance.$el)
  instances[cid || id].$destroy()
  delete instances[cid || id]
  if (typeof userOnConfirm === 'function') {
    userOnConfirm(content, context)
  }
}

export default BsFcAudit
// 调用示例
// this.$BsFcUtil.audit({
//   content: '',
//   textareaConfig: {
//      maxLength: 200
//   }
//   confirm(msg) {
//     console.log('auditMsg', msg)
//   },
//   cancel() {

//   }
// })
