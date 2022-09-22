/* eslint-disable no-extend-native */
(function (doc, win) {
  // eslint-disable-next-line no-unused-vars
  let ElScare = 1
  let base = 1920 // 根据设计图设定基数
  let dpr = window.devicePixelRatio || 1
  let docEl = doc.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let recalc = function () {
    let clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = 40 * (clientWidth / base) + 'px'
    ElScare = clientWidth / base
    // 设置data-dpr属性，留作的css hack之用
    docEl.setAttribute('data-dpr', dpr)
    // let delObj = document.getElementById('loading')
    // if (delObj) {
    //   document.getElementById('loading').remove()
    // }
  }
  // if (!Function.prototype.bind) {
  //   Function.prototype.bind = function () {
  //     if (typeof this !== 'function') {
  //       throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable')
  //     }
  //     var _this = this
  //     var obj = arguments[0]
  //     var ags = Array.prototype.slice.call(arguments, 1)
  //     return function () {
  //       _this.apply(obj, ags)
  //     }
  //   }
  // }

  // // 兼容addEventListener函数
  // var addEventListenerEvent = function (ele, event, fn) {
  //   if (ele.addEventListener) {
  //     ele.addEventListener(event, fn, false)
  //   } else {
  //     ele.attachEvent('on' + event, fn.bind(ele))
  //   }
  // }

  // // 兼容removeEventListener函数
  // var removeEventListenerEvent = function (ele, event, fn) {
  //   if (ele.removeEventListener) {
  //     ele.removeEventListener(event, fn, false)
  //   } else {
  //     ele.detachEvent('on' + event, fn.bind(ele))
  //   }
  // }
  recalc()
  if (doc.addEventListener) {
    win.addEventListener(resizeEvt, recalc, false)
    doc.addEventListener('DOMContentLoaded', recalc, false)
  } else {
    return false
  }
})(document, window)
