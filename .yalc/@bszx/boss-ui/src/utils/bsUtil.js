/* eslint-disable */
// 全局通用库   Author:Titans@2396757591@qq.com -->
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ?
    module.exports = factory :
    typeof define === 'function' && define.amd ?
    define(factory) :
    (this.$BsUtils = factory())
})(this, function() {
  'use strict'
  window.Canvas2DContext = function(canvas) { //cavas链式调用
    if (typeof canvas === 'string') {
      canvas = document.getElementById(canvas)
    }
    if (!(this instanceof window.Canvas2DContext)) {
      return new window.Canvas2DContext(canvas)
    }
    this.context = this.ctx = canvas.getContext('2d')
    if (!window.Canvas2DContext.prototype.arc) {
      Canvas2DContext.setup.call(this, this.ctx)
    }
  }
  window.Canvas2DContext.setup = function() {
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

  function monitorInit() {
    const monitor = {
      // 数据上传地址
      url: '',
      // 性能信息
      performance: {},
      // 资源信息
      resources: {},
      // 错误信息
      errors: [],
      // 用户信息
      user: {
        // 屏幕宽度
        screen: screen.width,
        // 屏幕高度
        height: screen.height,
        // 浏览器平台
        platform: navigator.platform,
        // 浏览器的用户代理信息
        userAgent: navigator.userAgent,
        // 浏览器用户界面的语言
        language: navigator.language,
      },
      // 手动添加错误
      addError(error) {
        const obj = {}
        const { type, msg, url, row, col } = error
        if (type) obj.type = type
        if (msg) obj.msg = msg
        if (url) obj.url = url
        if (row) obj.row = row
        if (col) obj.col = col
        obj.time = new Date().getTime()
        monitor.errors.push(obj)
      },
      // 重置 monitor 对象
      reset() {
        window.performance && window.performance.clearResourceTimings()
        monitor.performance = getPerformance()
        monitor.resources = getResources()
        monitor.errors = []
      },
      // 清空 error 信息
      clearError() {
        monitor.errors = []
      },
      // 上传监控数据
      upload() {
        // 自定义上传
        // axios.post({
        //     url: monitor.url,
        //     data: {
        //         performance,
        //         resources,
        //         errors,
        //         user,
        //     }
        // })
      },
      // 设置数据上传地址
      setURL(url) {
        monitor.url = url
      },
    }
    const timing = window.performance.timing
    const memory = window.performance.memory
    const whiteScreen = timing.domLoading - timing.navigationStar
    // 获取性能信息
    const getPerformance = () => {
      if (!window.performance) return
      const performance = {
        // DNS查询耗时
        DNS: `DNS查询耗时:  ${timing.domainLookupEnd - timing.domainLookupStart} ms`,
        // TCP链接耗时
        TCPlink: `TCP链接耗时:  ${timing.connectEnd - timing.connectStart} ms`,
        // 解析dom树耗时
        ParsingDom: `解析dom树耗时:  ${timing.domComplete - timing.domInteractive} ms`,
        // domready时间
        domready: `domready时间:  ${timing.domContentLoadedEventEnd - timing.navigationStart} ms`,
        // js内存使用占比
        JsMemoryRatio: `js内存使用占比:  ${(memory.usedJSHeapSize / memory.totalJSHeapSize * 100).toFixed(2)} %`,
        // 重定向耗时
        redirect: `重定向耗时:  ${timing.redirectEnd - timing.redirectStart} ms`,
        // 白屏时间
        whiteScreen: `白屏时间:   ${(timing.responseStart - timing.navigationStart)} ms`,
        // DOM 渲染耗时
        dom: `DOM 渲染耗时:  ${timing.domComplete - timing.domInteractive} ms`,
        // 页面加载耗时
        load: `页面加载耗时:  ${timing.loadEventEnd - timing.navigationStart} ms`,
        // 页面卸载耗时
        unload: `页面卸载耗时:  ${timing.unloadEventEnd - timing.unloadEventStart} ms`,
        // 请求耗时
        request: `请求耗时:  ${ timing.responseEnd - timing.requestStart} ms`,
        // 获取性能信息时当前时间
        time: `获取性能信息时当前时间:${new Date().getTime()}ms`,
      }

      return performance
    }

    // 获取资源信息
    const getResources = () => {
      if (!window.performance) return
      const data = window.performance.getEntriesByType('resource')
      const resource = {
        xmlhttprequest: [],
        css: [],
        other: [],
        script: [],
        img: [],
        link: [],
        fetch: [],
        // 获取资源信息时当前时间
        time: new Date().format("YYYY-MM-DD hh:mm:mm:c"),
      }

      data.forEach(item => {
        const arry = resource[item.initiatorType]
        arry && arry.push({
          // 资源的名称
          name: item.name,
          // 资源加载耗时
          duration: item.duration.toFixed(2),
          // 资源大小
          size: item.transferSize,
          // 资源所用协议
          protocol: item.nextHopProtocol,
        })
      })

      return resource
    }

    window.onload = () => {
      // 在浏览器空闲时间获取性能及资源信息 https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
          monitor.performance = getPerformance()
          monitor.resources = getResources()
          console.log('页面加载监控信息')
          console.log(monitor.performance)
          console.log('页面资源信息')
          console.log(monitor.resources)
        })
      } else {
        setTimeout(() => {
          monitor.performance = getPerformance()
          monitor.resources = getResources()
          console.log('页面性能信息')
          console.log(monitor.performance)
          console.log('页面资源信息')
          console.log(monitor.resources)
        }, 0)
      }
    }

    // 捕获资源加载失败错误 js css img...
    addEventListener('error', e => {
      const target = e.target
      if (e instanceof ErrorEvent) {
        console.log('脚本错误')
      } else if (e instanceof Event) {
        console.log('资源错误')
      }
      if (target != window) {
        monitor.errors.push({
          type: target.localName,
          url: target.src || target.href,
          msg: (target.src || target.href) + ' is load error',
          // 错误发生的时间
          time: new Date().format("YYYY-MM-DD hh:mm:mm:c"),
        })

        console.log('所有的错误信息')
        console.log(monitor.errors)
      }
      return false
    }, false)

    // 监听 js 错误
    window.onerror = function(msg, url, row, col, error) {
      monitor.errors.push({
        type: 'javascript', // 错误类型
        row: row, // 发生错误时的代码行数
        col: col, // 发生错误时的代码列数
        msg: error && error.stack ? error.stack : msg, // 错误信息
        errorMessage: msg,
        url: url, // 错误文件
        time: new Date().format("YYYY-MM-DD hh:mm:mm:c"), // 错误发生的时间
      })
      console.log('当前错误', msg);
      console.log('所有的错误信息')
      console.log(monitor.errors)
      return false
    }

    // 监听 promise 错误 缺点是获取不到行数数据
    addEventListener('unhandledrejection', e => {
      monitor.errors.push({
        type: 'promise',
        msg: (e.reason && e.reason.msg) || e.reason || '',
        // 错误发生的时间
        time: new Date().format("YYYY-MM-DD hh:mm:mm:c"),
      })

      console.log('所有的错误信息')
      console.log(monitor.errors)
      return false
    }, false)

    // rejectionhandled 推荐处理方案
    window.addEventListener('rejectionhandled', (event) => {
      monitor.errors.push({
        type: 'promise',
        msg: (e.reason && e.reason.msg) || e.reason || '',
        // 错误发生的时间
        time: new Date().format("YYYY-MM-DD hh:mm:mm:c"),
      })
      console.log('所有的错误信息')
      console.log(monitor.errors)
      return false
    }, false);

    window.Vue.config.errorHandler = function(err, vm, info) {
      monitor.errors.push({
        type: 'Vue',
        msg: info,
        vm: vm,
        // 错误发生的时间
        time: new Date().format("YYYY-MM-DD hh:mm:mm:c"),
      })
      console.log('所有的错误信息')
      console.log(monitor.errors)
      return false
    }

    return monitor
  }
  const gloableUtil = {
    monitorInit
  }
  // window.monitorData = monitorInit()
  console.log('5')
  return gloableUtil
})