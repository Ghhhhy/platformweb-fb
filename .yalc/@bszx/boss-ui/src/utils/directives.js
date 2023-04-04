/*
 * @Author: 轻语
 * @Date: 2021-11-03 11:01:52
 * @LastEditors: 轻语
 * @LastEditTime: 2021-11-18 16:17:43
 * @Description:
 */
const scrollTo = {
  update(el, binding) {
    const value = binding.value
    let isUpdate = false
    let x = 0
    let y = 0
    if (typeof value === 'object' && typeof binding.oldValue === 'object') {
      isUpdate = value.update !== binding.oldValue.update
      x = value.x || 0
      y = value.y || 0
    } else {
      /* istanbul ignore next */
      isUpdate = value !== binding.oldValue
    }
    if (isUpdate) {
      el.scrollTop = y || 0
      el.scrollLeft = x || 0
    }
  }
}

const preventClick = {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.style.pointerEvents = 'none'
        el.style.cursor = 'not-allowed'
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
          el.style.pointerEvents = 'auto'
          el.style.cursor = 'pointer'
        }, binding.value || 6000)
      }
    })
  }
}
const trigger = {
  inserted(el, binging) {
    el.click()
  }
}
const directives = {
  trigger,
  scrollTo,
  preventClick
}
const directivesObj = {}
directivesObj.install = function (Vue) {
  if (directivesObj.install.installed) return
  Object.keys(directives).forEach((key) => {
    Vue.directive(key, directives[key])
  })
}

export default directivesObj
