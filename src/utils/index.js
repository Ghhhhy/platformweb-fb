const ArraySlice = Array.prototype.slice

/**
 * 克隆对象(深克隆)
 * 如果对象或数组中有function，该方法无效
 * @param {Any} value
 * @returns {Any}
 */
const objectClone = value => JSON.parse(JSON.stringify(value))

let uid = 1

/**
 * uuid
 * @param {String} prefix
 * @returns {String}
 */
const uuid = prefix => {
  uid++
  return (prefix || '') + uid
}

/**
 * 获取字符串真实长度
 * @param {String} string
 * @returns {Number}
 */
const getStrRealLength = string => {
  let realLen = 0; let charCode = -1; let i = 0
  const len = string.trim().length
  for (i; i < len; i++) {
    charCode = string.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) {
      realLen += 1
    } else {
      realLen += 2
    }
  }
  return realLen
}

const isPlainObject = obj => typeof obj === 'object' && obj !== null && Object.prototype.toString.call(obj) === '[object Object]'

const HASOWN = Object.prototype.hasOwnProperty

const hasKey = (key, object) => HASOWN.call(object, key)

/**
 * 实现对象复制
 * @return {object}
 */
function extend() {
  let target = arguments[0] || {}
  let index = 1
  let deep = false
  if (typeof target === 'boolean') {
    deep = target
    index++
    target = arguments[1] || {}
  }
  if (typeof target !== 'object' && typeof target !== 'function') {
    target = {}
  }
  let len = arguments.length
  for (; index < len; index++) {
    let source = arguments[index]
    if (source !== null) {
      for (let k in source) {
        let src = target[k]
        let copy = source[k]
        if (copy === target) {
          continue
        }
        let isArray = Array.isArray(copy)
        if (deep && (isPlainObject(copy) || isArray)) {
          let clone
          if (isArray) {
            clone = src && Array.isArray(src) ? src : []
          } else {
            clone = src && isPlainObject(src) ? src : {}
          }
          target[k] = extend(deep, clone, copy)
        } else if (typeof copy !== 'undefined') {
          target[k] = copy
        }
      }
    }
  }
  return target
}

/**
 * 根据路径获取对象的值
 * 这是一种容错处理
 * 防止长命名空间下出现 [Cannot read property 'key' of undefined] 的情况
 * @param {String} path
 * eg.
 * var data = { a : {b : {c : 1}}}
 * var c = Nova.getValueByObjectPath(data, 'a.b.c') // 1
 */
const getValueByObjectPath = function (path, obj) {
  let parent = objectClone(obj)
  let key
  let parts
  if (path) {
    path = path.toString().trim()
    parts = path.split('.')
    key = parts.pop(1)
    if (parts.length > 0) {
      for (var i = 0, len = parts.length; i < len; i++) {
        if (typeof parent[parts[i]] === 'undefined') { parent[parts[i]] = Object.create(null) }
        parent = parent[parts[i]]
      }
    }
  }
  return key ? parent[key] : parent
}

// 去掉px取出整形，比如'24px'--->24
const getInt = value => {
  if (typeof (value) === 'number') {
    return value
  } else {
    return parseInt(value.substr(0, value.indexOf('px')))
  }
}

/**
 * 判断在数组中是否含有给定的一个变量值
 * a：需要查询的值
 * arr：被查询的数组
 * @param {String} path
 * 在arr中查询a是否存在，如果找到返回true，否则返回false
 */
const containByArr = (arr, a) => {
  for (var i = 0, len = arr.length; i < len; i++) {
    if (arr[i] === a) {
      return true
    }
  }
  return false
}

const toArray = arrayLike => ArraySlice.call(arrayLike)

const uniqueArray = arr => Array.from(new Set(arr))

/**
 * 比较两个json对象
 * @param {*} a
 * @param {*} b
 */
const compareJson = (a, b) => JSON.stringify(a) === JSON.stringify(b)

/**
 * 比较两个Arr
 * @param {*} a
 * @param {*} b
 */
const compareArr = (a, b) => JSON.stringify(a.sort()) === JSON.stringify(b.sort())

/**
 * 根据路径从一个对象中获取其值
 * 内置了容错机制，防止层级太深时报错
 * @param {*} path
 * @param {*} object
 * @example
 * getObjectValue(p1.p1, obj) // obj.p1.p2
 * @returns {*}
 */
const getObjectValue = (path, object) => {
  if (isEmpty(path)) {
    return 'undefined'
  }
  let paths = path.trim().split('.')
  while (paths.length) {
    let k = paths.shift()
    object = object[k]
    if (!isPlainObject(object) && !isArray(object)) {
      break
    }
  }
  return object
}

const isEmpty = value => {
  if (value === null || value === 'undefined') {
    return true
  }
  if (isString(value) && !value.trim()) {
    return true
  }
  return false
}

const isString = value => typeof value === 'string'

const isArray = Array.isArray

const isObject = value => value !== null && typeof value === 'object'

const isElement = value => isObject(value) && value.nodeType === 1 && !isPlainObject(value)

/**
 * 校验传入值是否是布尔类型
 * @param {*} value
 * @returns {Boolean}
 */
const isBoolean = value => typeof value === 'boolean'

/**
 * 校验传入值是否是函数
 * @param {*} value
 * @returns {Boolean}
 */
const isFunction = value => typeof value === 'function'
/**
 * 对象混合
 * arg1 :
 *  Boolean: 是否深拷贝
 *  Object: targe
 * arg2, arg2, ..., argn: source
 * @returns {Object}
 */
function mixins() {
  let target = arguments[0] || {}
  let i = 0
  let deep = false
  let len = arguments.length
  if (isBoolean(target)) {
    deep = target
    target = arguments[1] || {}
    i = 1
  }
  if (!isObject(target) && !isFunction(target)) {
    target = {}
  }
  while (i++ < len) {
    let source = arguments[i]
    if (source) {
      for (let k in source) {
        let src = target[k]
        let copy = source[k]
        // 防止引用自身，造成死循环
        if (copy === target) {
          continue
        }
        let _isArray = isArray(copy)
        if (deep && (_isArray || isPlainObject(copy))) {
          let clone
          if (_isArray) {
            clone = src && isArray(src) ? src : []
          } else {
            clone = src && isPlainObject(src) ? src : {}
          }
          target[k] = mixins(deep, clone, copy)
        } else if (copy !== 'undefined') {
          target[k] = copy
        }
      }
    }
  }

  return target
}

const deepObjCopy = (oldObj, newObj) => {
  for (let i in oldObj) {
    if (isPlainObject(oldObj[i])) {
      newObj[i] = isPlainObject(newObj[i]) ? newObj[i] : {}
      deepObjCopy(oldObj[i], newObj[i])
    } else {
      const target = (newObj[i] || +newObj[i] === 0) ? newObj[i] : oldObj[i]
      oldObj[i] = isObject(target) ? objectClone(target) : target
    }
  }
  return oldObj
}

const fn = () => {}

/**
 * 通过name查找父组件
 * @param {*} vueIns
 * @param {*} name
 */
const findParentComponent = (vueIns, name) => {
  let parent = vueIns.$parent
  while (parent) {
    let componentName = parent.$options.componentName || parent.$options.name
    if (componentName !== name) {
      parent = parent.$parent
    } else {
      return parent
    }
  }
  return false
}

//* *******************防抖 节流************************/
// 节流是一定时间内，回调函数只执行一次。
// 防抖是一定时间内， 回调函数只执行一次， 但期间若有事件触发， 则重新计时。
// 如果遇到的是连续不停的事件， 则应该选择节流， 因为不停触发的事件会让防抖只会执行一次回调函数
// 节流 在触发事件时马上进行一次回调执行，并在固定时间内不再进行调用
const throttle = (fn, wait) => {
  let timeout

  return function() {
    const context = this
    const args = arguments

    if (!timeout) {
      fn.apply(context, args)
      timeout = setTimeout(function() {
        timeout = null
      }, wait)
    }
  }
}

// 防抖
const debounce = (fn, wait, immediate) => {
  let timeout

  const debounced = function() {
    const context = this
    const args = arguments

    if (timeout) {
      clearTimeout(timeout)
    }

    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(function() {
        timeout = null
      }, wait)

      if (callNow) { // 立即执行的情况马上返回执行结果
        return fn.apply(context, args)
      }
    } else {
      timeout = setTimeout(function() {
        timeout = fn.apply(context, args)
      }, wait)
    }
  }

  // 增加取消
  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}

const uuidFile = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}
// 生成随机数
const uuids = (len, radix) => {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  var uuid = []
  var i
  radix = radix || chars.length
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    var r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = ''
    uuid[14] = '4'

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}

// 手机号校验
const checkPhone = (phone) => {
  const re = /^1\d{10}$/ // 手机号码
  const re1 = /^\d{3}-\d{8}$|\d{4}-\d{7}$/ // 座机号
  const re2 = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/ // 固定号码
  const isLegal = re.test(phone) || re1.test(phone) || re2.test(phone)
  return isLegal
}

export {
  objectClone,
  uuid,
  isPlainObject,
  getStrRealLength,
  getValueByObjectPath,
  getInt,
  containByArr,
  toArray,
  hasKey,
  compareJson,
  compareArr,
  uniqueArray,
  getObjectValue,
  isString,
  isArray,
  isElement,
  mixins,
  deepObjCopy,
  extend,
  fn,
  findParentComponent,
  throttle,
  debounce,
  uuidFile,
  uuids,
  checkPhone
}
