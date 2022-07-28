/* eslint-disable */
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? module.exports = factory
    : typeof define === 'function' && define.amd
      ? define(factory)
      : (this.$BsUtils = factory())
})(this, function() {
  'use strict'
   window.Canvas2DContext = function(canvas) { //cavas链式调用
     if (typeof canvas === 'string') {
       canvas = document.getElementById(canvas) 
     }
     if (!(this instanceof Canvas2DContext)) {
       return new Canvas2DContext(canvas) 
     }
     this.context = this.ctx = canvas.getContext('2d') 
     if (!Canvas2DContext.prototype.arc) {
       Canvas2DContext.setup.call(this, this.ctx) 
     }
   }
   Canvas2DContext.setup = function() {
     let methods = ['arc', 'arcTo', 'beginPath', 'bezierCurveTo', 'clearRect', 'clip',
       'closePath', 'drawImage', 'fill', 'fillRect', 'fillText', 'lineTo', 'moveTo',
       'quadraticCurveTo', 'rect', 'restore', 'rotate', 'save', 'scale', 'setTransform',
       'stroke', 'strokeRect', 'strokeText', 'transform', 'translate'
     ] 
     let getterMethods = ['createPattern', 'drawFocusRing', 'isPointInPath', 'measureText', // drawFocusRing not currently supported
       // The following might instead be wrapped to be able to chain their child objects
       'createImageData', 'createLinearGradient',
       'createRadialGradient', 'getImageData', 'putImageData'
     ] 
     let props = ['canvas', 'fillStyle', 'font', 'globalAlpha', 'globalCompositeOperation',
       'lineCap', 'lineJoin', 'lineWidth', 'miterLimit', 'shadowOffsetX', 'shadowOffsetY',
       'shadowBlur', 'shadowColor', 'strokeStyle', 'textAlign', 'textBaseline'
     ] 
     for (let m of methods) {
       let method = m 
       Canvas2DContext.prototype = function() {
         this.ctx.apply(this.ctx, arguments) 
         return this 
       } 
     } 
     for (let m of getterMethods) {
       let method = m 
       Canvas2DContext.prototype = function() {
         return this.ctx.apply(this.ctx, arguments) 
       } 
     } 
     for (let p of props) {
       let prop = p 
       Canvas2DContext.prototype[prop] = function(value) {
         if (value === undefined)
           return this.ctx[prop] 
         this.ctx[prop] = value 
         return this 
       } 
     } 
   } 
   /* let ctx = Canvas2DContext(document.getElementById('canvas')) ctx.strokeStyle('rgb(30, 110, 210)').transform(10, 3, 4, 5, 1, 0).strokeRect(2, 10, 15, 20).context 
      // Use context to get access to underlying context
      let strokeStyle = Canvas2DContext(document.getElementById('canvas')).strokeStyle('rgb(50, 110, 210)').strokeStyle() 
      // Use property name as a function (but without arguments) to get the value
   */
  //  Date.prototype.format = function(format) {
  //    //new Date( year, month, date, hrs, min, sec)
  //    //new Date()       //参数可以为整数  也可以为字符串  但格式必须正确
  //    //examplenew Date(2009,1,1)        //正确  new Date("2009/1/1")     //正确
  //    //example  format(new Date(), "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c")
  //    let o = {
  //      "M+": this.getMonth() + 1, //month  MM
  //      "D+": this.getDate(), //day  DD
  //      "h+": this.getHours(), //hour  hh
  //      "m+": this.getMinutes(), //minute mm
  //      "s+": this.getSeconds(), //second ss
  //      "Q+": Math.floor((this.getMonth() + 3) / 3), //quarter 季度 q
  //      "c": this.getMilliseconds(), //millisecond 毫秒 c
  //      "W": ['一', '二', '三', '四', '五', '六', '日'][this.getDay() - 1] //week 星期
  //    } 
  //    if (/(Y+)/.test(format)) { //year  YYYY
  //      format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)) 
  //    }
  //    for (let k in o) {
  //      if (new RegExp("(" + k + ")").test(format)) {
  //        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)) 
  //      }
  //    }
  //    return format 
  // } 
  window.deepCopy = (obj) => {
    // 深拷贝通用方法
    let me = window
    let newObj = null
    if (typeof obj !== 'object' || obj === null) {
      newObj = obj
    } else {
      if (obj instanceof Array) {
        newObj = obj.map((item, index) => {
          return me.deepCopy(item)
        })
      } else if (obj instanceof Object) {
        newObj = {}
        for (let key in obj) {
          newObj[key] = me.deepCopy(obj[key])
        }
      } else if (obj instanceof Map) {
        newObj = new Map()
        obj.keys().forEach((mapV, mapK) => {
          newObj.set(mapK, me.deepCopy(mapV))
        })
      } else if (obj instanceof Set) {
        newObj = new Map()
        Set.forEach((setV, setI) => {
          newObj.add(me.deepCopy(setV))
        })
      } else {
        newObj = obj
      }
      // eslint-disable-next-line no-proto
      // newObj.__proto__ = obj.__proto__
    }
    return newObj
  }
  Date.prototype.format = function(format) {
    //new Date( year, month, date, hrs, min, sec)
    //new Date()       //参数可以为整数  也可以为字符串  但格式必须正确  example: new Date(2009,1,1)        //正确  new Date("2009/1/1")     //正确
    //example  new Date().format( "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c")
    let o = {
      "Y+": this.getFullYear() + '',
      "M+": this.getMonth() + 1, //month  MM
      "D+": this.getDate(), //day  DD
      "h+": this.getHours(), //hour  hh
      "m+": this.getMinutes(), //minute mm
      "s+": this.getSeconds(), //second ss
      "Q+": Math.floor((this.getMonth() + 3) / 3), //quarter 季度 q
      "c+": this.getMilliseconds(), //millisecond 毫秒 c
      "W": ['一', '二', '三', '四', '五', '六', '日'][this.getDay() - 1] //week 星期
    }
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr((("" + o[k]).length >= 2 ? 2 : ("" + o[k]).length)))
      }
    }
    return format
  }

})
