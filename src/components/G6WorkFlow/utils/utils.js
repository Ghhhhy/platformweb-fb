// 工具类函数   Author:Titans@2396757591@qq.com

let TABLE = document.createElement('table')
let TABLE_TR = document.createElement('tr')
let FRAGMENT_REG = /^\s*<(\w+|!)[^>]*>/
let CONTAINERS = {
  tr: document.createElement('tbody'),
  tbody: TABLE,
  thead: TABLE,
  tfoot: TABLE,
  td: TABLE_TR,
  th: TABLE_TR,
  '*': document.createElement('div')
}
const utils = {
  getType(obj) { // 获取数据类型
    return Object.prototype.toString.call(obj).slice(8, -1)
  },
  createDom(str) { // 创建dom
    let name = FRAGMENT_REG.test(str) && RegExp.$1
    if (!(name in CONTAINERS)) {
      name = '*'
    }
    let container = CONTAINERS[name]
    str = str.replace(/(^\s*)|(\s*$)/g, '')
    container.innerHTML = '' + str
    let dom = container.childNodes[0]
    container.removeChild(dom)
    return dom
  },
  clone(obj) { // 深拷贝通用方法
    let me = utils
    let newObj = null
    if (typeof obj !== 'object' || obj === null) {
      newObj = obj
    } else {
      if (obj instanceof Array) {
        newObj = obj.map((item, index) => {
          return me.clone(item)
        })
      } else if (obj instanceof Object) {
        newObj = {}
        for (let key in obj) {
          newObj[key] = me.clone(obj[key])
        }
      } else if (obj instanceof Map) {
        newObj = new Map()
        obj.keys().forEach((mapV, mapK) => {
          newObj.set(mapK, me.clone(mapV))
        })
      } else if (obj instanceof Set) {
        newObj = new Map()
        Set.forEach((setV, setI) => {
          newObj.add(me.clone(setV))
        })
      } else {
      }
    }
    return newObj
  },
  mix(dist) { // 表层合并
    [...arguments].slice(1).forEach((obj) => {
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && key !== 'constructor' && obj[key] !== undefined) {
          dist[key] = obj[key]
        }
      }
    })
    return dist
  },
  deepMixOne(dist, src, level = 0, maxLevel = 5) { // 深度合并一个
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        var value = src[key]
        if (this.getType(value) === 'Object') {
          if (this.getType(dist[key]) !== 'Object') {
            dist[key] = {}
          }
          if (level < maxLevel) {
            utils.deepMixOne(dist[key], value, level + 1, maxLevel)
          } else {
            dist[key] = src[key]
          }
        } else if (Array.isArray(value)) {
          dist[key] = []
          dist[key] = dist[key].concat(value)
        } else if (value !== undefined) {
          dist[key] = value
        }
      }
    }
  },
  deepMix() { // // 深度合并多个
    let arg = [...arguments]
    var rst = arg[0]
    arg.slice(1).forEach((src) => {
      utils.deepMixOne(rst, src)
    })
    return rst
  },
  each(object, callback) { // 可终止循环each方法
    var type = (function (obj) {
      switch (obj.constructor) {
        case Object:
          return 'Object'
        case Array:
          return 'Array'
        case NodeList:
          return 'NodeList'
        default:
          return 'null'
      }
    })(object)
    // 为数组或类数组时, 返回: index, value
    if (type === 'Array' || type === 'NodeList') {
      // 由于存在类数组NodeList, 所以不能直接调用every方法
      [].every.call(object, function (v, i) {
        return callback.call(v, v, i) !== false
      })
    } else if (type === 'Object') { // 为对象格式时,返回:key, value
      for (var key in object) {
        if (callback.call(object[key], object[key], key) === false) {
          break
        }
      }
    }
  },
  wrapBehavior(obj, action) { // 封装事件，便于使用上下文this, 和便于解除事件时使用 对象 事件名称 返回事件处理函数
    if (obj['_wrap_' + action]) {
      return obj['_wrap_' + action]
    }
    var method = function method(e) {
      obj[action](e)
    }
    obj['_wrap_' + action] = method
    return method
  },
  modifyCSS(dom, css) {
    if (dom) {
      for (var key in css) {
        if (css.hasOwnProperty(key)) {
          dom.style[key] = css[key]
        }
      }
    }
    return dom
  }
}

export default utils
