/*
 * @Author: 轻语
 * @Date: 2021-07-12 09:46:21
 * @LastEditors: 轻语
 * @LastEditTime: 2021-08-10 10:26:13
 * @Description: 加密规则：get/post/del/put请求加密，参数value加密，key值不加密
 */
import SM4Util from './sm4.js'
import { sm2Encrypt } from './sm2.js'
const deepCopy = (obj) => {
  // if (typeof obj !== 'object' || obj === null) return obj
  // let newObj = obj instanceof Array ? [] : {}
  // for (let key in obj) {
  //   if (obj.hasOwnProperty(key)) {
  //     newObj[key] = typeof obj[key] === 'object' ? this.deepCopy(obj[key]) : obj[key]
  //   }
  // }
  // return newObj
  let me = this
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
}
const isLoginSecretUseSm4 = true // login加密方式：boolean = true sm4 抑或sha256

const isPlainObject = (value) => {
  if (!value || typeof value !== 'object' || ({}).toString.call(value) !== '[object Object]') {
    return false
  }
  var proto = Object.getPrototypeOf(value)
  if (proto === null) {
    return true
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor
  return typeof Ctor === 'function' && Ctor instanceof Ctor && Function.prototype.toString.call(Ctor) === Function.prototype.toString.call(Object)
}

export default {
  // 给http请求加密 (包含两种加密方式：1、json格式整体加密  2、递归key不加密，value加密)
  encryHttp({ isSecret, ajaxType, params, dataType }, ContentType) {
    const isHttpBodyData = ['post', 'put', 'postStringify', 'delete'].includes(ajaxType)
    const returnDelData = dataType ? { params: params } : { data: params }

    if (!isSecret) { // 如果不加密
      if (params && params.parameters && ajaxType === 'postStringify') {
        params.parameters = JSON.stringify(params.parameters)
      }
      return isHttpBodyData ? params : (ajaxType === 'get' ? { params: { ...params } } : returnDelData)
    }
    let secretData
    // get：所有value用sm4加密
    if (ajaxType === 'get') {
      secretData = this.setSecret(params) && { params: { ...JSON.parse(this.setSecret(params)) } }
    } else {
    // SM4Util.encryptData_ECB整体加密； SM4Util.encryptECB递归加密
      const typeMap = new Map([
        ['application/json;charset=UTF-8', data => SM4Util.encryptData_ECB(JSON.stringify(data))],
        ['application/json', data => SM4Util.encryptData_ECB(JSON.stringify(data))],
        ['application/x-www-form-urlencoded;charset=UTF-8', data => this.setSecret(data)],
        ['application/x-www-form-urlencoded', data => this.setSecret(data)]
      ])
      secretData = typeof typeMap.get(ContentType) === 'function' && typeMap.get(ContentType)(params)
    }
    return secretData
  },

  // 递归url编码
  treeForUrl(param) {
    if (!param) return
    if (typeof param === 'string') {
      return encodeURI(param)
    }
    let data = JSON.parse(JSON.stringify(param))
    if (Array.isArray(data)) {
      data.forEach((row, index) => {
        if (isPlainObject(row) || Array.isArray(row)) { // 对象和数组需要递归
          this.treeForUrl(row)
        } else {
          data[index] = encodeURI(row + '')
        }
      })
    } else if (isPlainObject(data)) { // 对象
      for (var key in data) {
        if (isPlainObject(data[key]) || Array.isArray(data[key])) { // 对象和数组需要递归
          this.treeForUrl(data[key])
        } else {
          data[key] = encodeURI(data[key] + '')
        }
      }
    }
    return data
  },
  // 递归加密
  setSecret(obj) {
    // 只加密对象
    if (typeof obj !== 'object' || obj === null) return obj
    const data = deepCopy(true, {}, obj)
    return JSON.stringify(SM4Util.encryptECB(data))
  },
  encryptLogin({ isSecret, params: { username, password, usernum } }) {
    let formData
    if (!isLoginSecretUseSm4 || !isSecret) {
      formData = new FormData()
      formData.append('username', username)
      formData.append('password', window.CryptoJS.SHA256(password).toString())
      formData.append('captcha', usernum || '')
    } else {
      formData = new URLSearchParams()
      formData.append('username', SM4Util.encryptData_ECB(username))
      formData.append('password', SM4Util.encryptData_ECB(sm2Encrypt(password, 0)))
      formData.append('captcha', SM4Util.encryptData_ECB(`#${usernum}`)) // jbOm9gb2JNnAlKcitNDqcw==
    }
    return formData
  }
}
