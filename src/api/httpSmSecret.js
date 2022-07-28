// 本文件不允许私自修改，环保除引用第三方接口外一律使用post请求方式，接口定义请参考接口规范书写，这里只做全局http请求状态拦截，其他用户状态一律放行，页面内部做判断自行处理
import axios from 'axios'
import { Message } from 'element-ui'
import BSUI from '@/components/index.js'
import globalGatewayConf from './serverGatewayMap.js'
// import { basePublicUrl } from './url'
import Qs from 'qs'
import Router from '@/router/index.js'
// import store from '@/store/index'
import errorLogTool from '@/utils/errorLog'
import Encrypt from './smSecret/smSecret'
import { getUrlAllParams } from '@/utils'

import SM4Util from './smSecret/sm4.js'
export const globalGatewayAgentConfig = globalGatewayConf
export const smSecretUtils = Encrypt
window.gloableToolFn.serverGatewayMap = globalGatewayConf
const IS_USE_GLOBAL_MOCK = false // 是否全部用mock数据  true是  false否
const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const globalGatewayAgentConf = { ...window.gloableToolFn.serverGatewayMap, isOpen: IS_PRODUCTION, isSecret: true }
const secretFlag = globalGatewayAgentConf.isSecret ? '/api/' : '/openapi/'
const basePublicUrl = `${window.location.origin}/${globalGatewayAgentConf.secret.curProjectName}${secretFlag}`
// const basePublicUrl = `${window.location.origin}${secretFlag}`
let isSecret = globalGatewayAgentConf.isSecret

axios.defaults.timeout = 180000
axios.defaults.baseURL = basePublicUrl
axios.defaults.withCredentials = false
axios.defaults.headers.post['Content-Type'] = 'application/json'

const oldUrl = axios.defaults.baseURL
const elink = document.createElement('a')
const debounceItemChange = (function(debounce) {
  return debounce(3000)
})(function(delay) {
  // 利用闭包保存定时器
  let timer = null
  return function(cb) {
    // 在规定时间内再次触发会先清除定时器后再重设定时器
    clearTimeout(timer)
    timer = setTimeout(function() {
      cb()
    }, delay)
  }
})
axios.defaults.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT,OPTIONS'
axios.defaults.headers['Access-Control-Allow-Credentials'] = true
axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers['Access-Control-Max-Age'] = '36000'
// axios.defaults.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept,tokenid,appguid'
axios.defaults.headers['Access-Control-Allow-Headers'] = 'Authorization,Origin,accept,x-requested-with,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Origin,X-Requested-With,Content-Type,Content-Range,Range,tokenid,appguid'
axios.defaults.headers.post['Access-Control-Allow-Credentials'] = true
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.post['Access-Control-Max-Age'] = '36000'
// axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept,tokenid,appguid'
axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Authorization,Origin,accept,x-requested-with,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Origin,X-Requested-With,Content-Type,Content-Range,Range,tokenid,appguid'

// 如果走全局网关，看是否进行加密
// 请求拦截
axios.interceptors.request.use(function(config) {
  const { tokenid, appguid } = getUrlAllParams()
  config.headers.appguid = isSecret ? (appguid ? SM4Util.encryptData_ECB(appguid) : '') : (appguid || '')
  if (tokenid) {
    config.headers.tokenid = tokenid
  }
  if (config.method === 'get') {
    //  给data赋值以绕过if判断
    if (config.headers['Is-Content-Type']) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    } else {
      config.headers['Content-Type'] = 'application/json'
    }
    delete config.headers['Is-Content-Type']
    config.data = true
  }

  // return config
  return config
}, function(error) {
  return Promise.reject(error.response)
})
axios.interceptors.response.use(function(response) {
  if (Object.prototype.toString.call(response).slice(8, -1) === 'Object') {
    if (response.rscode === '113999') {
      Message.error({
        message: '用户登录失效，请重新登录!',
        type: 'warning'
      })
      if (process.env.NODE_ENV === 'development') {
        Router.push({ name: 'Login' })
      } else if (window.gloableToolFn.serverGatewayMap.gloableUrl.isLoginOutToPortal) {
        window.location.href = window.gloableToolFn.serverGatewayMap.gloableUrl.portalLoginUrl
      } else {
        Router.push({ name: 'Login' })
      }
    } else if (response.rscode !== '100000' && response.rscode !== '200' && response.rscode !== undefined) {
      if (response.config.params !== undefined) {
        errorLogTool.recordUrlErrorInfo(response.data, response.config.url, response.config.method, response.config.params)
      } else {
        errorLogTool.recordUrlErrorInfo(response.data, response.config.url, response.config.method, response.config.data)
      }
    }
  }
  // 收集报错信息
  return response
}, function(error) {
  // 收集报错信息
  let obj = error.response
  if (obj && obj.data) {
    if (Object.prototype.toString.call(obj.data).slice(8, -1) === 'Object') {
      let rsData = obj.data.data
      if (rsData === '113999') {
        Message.error({
          message: '用户登录失效，请重新登录!',
          type: 'warning'
        })
        setTimeout(() => {
          if (process.env.NODE_ENV === 'development') {
            Router.push({ name: 'Login' })
          } else if (window.gloableToolFn.serverGatewayMap.gloableUrl.isLoginOutToPortal) {
            window.location.href = window.gloableToolFn.serverGatewayMap.gloableUrl.portalLoginUrl
          } else {
            Router.push({ name: 'Login' })
          }
        }, 3000)
      } else if ((rsData + '').indexOf('113999') >= 0) {
        Message.error({
          message: '用户登录失效，请重新登录!',
          type: 'warning'
        })
        setTimeout(() => {
          if (process.env.NODE_ENV === 'development') {
            Router.push({ name: 'Login' })
          } else if (window.gloableToolFn.serverGatewayMap.gloableUrl.isLoginOutToPortal) {
            window.location.href = window.gloableToolFn.serverGatewayMap.gloableUrl.portalLoginUrl
          } else {
            Router.push({ name: 'Login' })
          }
        }, 3000)
      }
    } else if (Object.prototype.toString.call(obj.data).slice(8, -1) === 'String') {
      errorLogTool.recordBadUrlErrorInfo({ statusText: error.message }, error.config.url, error.config.method, error.config.data)
      // Message.error({
      //   message: obj.data,
      //   type: 'warning'
      // })
      BSUI.utilsLib.LoadingMark.removeLoadingMark()
    }
  } else if (error.message.indexOf('timeout')) {
    errorLogTool.recordBadUrlErrorInfo({ statusText: error.message }, error.config.url, error.config.method, error.config.data)

    debounceItemChange(() => {
      // Message.error({
      //   message: '请求超时,请联系系统管理员',
      //   type: 'warning'
      // })
    })

    BSUI.utilsLib.LoadingMark.removeLoadingMark()
  } else if (error.message === 'Network Error') {
    errorLogTool.recordBadUrlErrorInfo({ statusText: error.message }, error.config.url, error.config.method, error.config.data)
    debounceItemChange(() => {
      // Message.error({
      //   message: '网络错误,请检查网络连接',
      //   type: 'warning'
      // })
    })
    BSUI.utilsLib.LoadingMark.removeLoadingMark()
  } else {
    Message.error({
      message: error?.message || '网络错误，请重试！',
      type: 'warning'
    })
    errorLogTool.recordBadUrlErrorInfo({ statusText: error.message }, error.config.url, error.config.method, error.config.data)
    // debounceItemChange(() => {
    //   Message.error({
    //     message: error?.message || '网络错误，请重试！',
    //     type: 'warning'
    //   })
    // })
    BSUI.utilsLib.LoadingMark.removeLoadingMark()
  }

  // 对响应错误做处理
  return {
    data: {
      code: 0,
      errorInfor: error
    },
    code: 0
  }
})

// 全局网关
const globalGatewayAgent = ({ url, Origin, ismock } = {}) => { // 注册全局网关
  axios.defaults.baseURL = Origin || oldUrl
  let serveUrl = url.split('/').filter((item, index) => {
    return !!item
  })
  let serverName = serveUrl[0]
  if (process.env.NODE_ENV === 'development') {
    if (globalGatewayAgentConf.isOpen) {
      if (Object.keys(globalGatewayAgentConf.developmentGateWay).indexOf(serverName) >= 0) {
        axios.defaults.baseURL = Origin || oldUrl
        serveUrl.splice(0, 1)
        let gateWayName = globalGatewayAgentConf.developmentGateWay[serverName]
        url = gateWayName + '/' + serveUrl.join('/')
      }
      return url
    }

    if (Object.keys(globalGatewayAgentConf.development).indexOf(serverName) >= 0) {
      serveUrl.splice(0, 1)
      url = serveUrl.join('/')
      axios.defaults.baseURL = (IS_USE_GLOBAL_MOCK || ismock) ? globalGatewayAgentConf.mockServerIp : globalGatewayAgentConf.development[serverName]
    }
  } else {
    if (globalGatewayAgentConf.isOpen) {
      if (Object.keys(globalGatewayAgentConf.productionGateWay).indexOf(serverName) >= 0) {
        axios.defaults.baseURL = Origin || oldUrl
        serveUrl.splice(0, 1)
        let gateWayName = globalGatewayAgentConf.productionGateWay[serverName]
        url = gateWayName + '/' + serveUrl.join('/')
      }
      return url
    }

    if (Object.keys(globalGatewayAgentConf.production).indexOf(serverName) >= 0) {
      serveUrl.splice(0, 1)
      url = serveUrl.join('/')
      axios.defaults.baseURL = globalGatewayAgentConf.production[serverName]
    } else {
      axios.defaults.baseURL = Origin || oldUrl
    }
  }

  return url
}
// 外部通过全局网关获取baseURL  url
export const httpGlobalGatewayAgent = (url, Origin) => { // 注册全局网关
  let serveUrl = url.split('/').filter((item, index) => {
    return !!item
  })
  let serverName = serveUrl[0]
  let baseURL = ''
  if (process.env.NODE_ENV === 'development') {
    if (globalGatewayAgentConf.isOpen) {
      if (Object.keys(globalGatewayAgentConf.developmentGateWay).indexOf(serverName) >= 0) {
        baseURL = oldUrl
        serveUrl.splice(0, 1)
        let gateWayName = globalGatewayAgentConf.developmentGateWay[serverName]
        url = gateWayName + '/' + serveUrl.join('/')
      }
      return {
        baseURL,
        url
      }
    }

    if (Object.keys(globalGatewayAgentConf.development).indexOf(serverName) >= 0) {
      serveUrl.splice(0, 1)
      url = serveUrl.join('/')
      baseURL = globalGatewayAgentConf.development[serverName]
    } else {
      baseURL = oldUrl
    }
  } else {
    if (globalGatewayAgentConf.isOpen) {
      if (Object.keys(globalGatewayAgentConf.productionGateWay).indexOf(serverName) >= 0) {
        baseURL = oldUrl
        serveUrl.splice(0, 1)
        let gateWayName = globalGatewayAgentConf.productionGateWay[serverName]
        url = gateWayName + '/' + serveUrl.join('/')
      }
      return {
        baseURL,
        url
      }
    }

    if (Object.keys(globalGatewayAgentConf.production).indexOf(serverName) >= 0) {
      serveUrl.splice(0, 1)
      url = serveUrl.join('/')
      baseURL = globalGatewayAgentConf.production[serverName]
    } else {
      baseURL = oldUrl
    }
  }

  return {
    baseURL,
    url
  }
}

export let Axios = axios

// 封装axios的get请求
export function get(url, { params, Origin, headers, source, iscontent, contentType, ismock = false } = {}, useSecret = true) {
  axios.defaults.headers['Is-Content-Type'] = iscontent
  // axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'
  // axios.defaults.headers.get['Content-Type'] = contentType || 'application/json'
  const ContentType = typeof (headers) === 'object' ? '' : headers || 'application/json;charset=UTF-8'

  params = Encrypt.encryHttp({ isSecret: !useSecret ? useSecret : isSecret, ajaxType: 'get', params }, ContentType)
  return new Promise((resolve, reject) => {
    axios
      .get(globalGatewayAgent({ url, Origin, ismock }), params, {
        headers: Object.assign({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': ContentType
        }, typeof (headers) === 'object' ? headers : {})
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
// 封装axios的post请求
export function post(url, { params = {}, Origin, headers, source, contentType, ismock = false } = {}, useSecret = true) {
  // axios.defaults.headers.post['Content-Type'] = 'application/json' || 'application/x-www-form-urlencoded
  // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
  // axios.defaults.headers.post['Content-Type'] = contentType || 'application/json;charset=UTF-8'
  // 登录是特殊处理的： 用户名不加密  密码使用md5加密
  const ContentType = typeof (headers) === 'object' ? '' : headers || contentType ? contentType : 'application/json;charset=UTF-8'

  params = source === 'login' ? Encrypt.encryptLogin({ isSecret: !useSecret ? useSecret : isSecret, params }) : Encrypt.encryHttp({ isSecret, ajaxType: 'post', params: params }, ContentType)
  return new Promise((resolve, reject) => {
    axios
      .post(globalGatewayAgent({ url, Origin, ismock }), params, {
        headers: Object.assign({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': ContentType
        }, typeof (headers) === 'object' ? headers : {})
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
// 封装axios的put请求
export function put(url, { params = {}, Origin, contentType, ismock = false } = {}, useSecret = true) {
  // axios.defaults.headers.post['Content-Type'] = 'application/json' || 'application/x-www-form-urlencoded'
  const ContentType = contentType || 'application/json;charset=UTF-8'

  params = Encrypt.encryHttp({ isSecret: !useSecret ? useSecret : isSecret, ajaxType: 'put', params }, ContentType)
  return new Promise((resolve, reject) => {
    axios
      .put(globalGatewayAgent({ url, Origin, ismock }), params,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': ContentType
          }
        })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
export async function asyncPut(url, { params = {}, Origin, contentType, ismock = false } = {}) { // 使用异步调用，返回结果后再执行
  await put(url, { params, Origin, contentType, ismock })
}
// 封装axios的delete请求
export function del(url, { params, Origin, contentType, dataType, ismock = false } = {}, useSecret = true) {
  // axios.defaults.headers.post['Content-Type'] = 'application/json' || 'application/x-www-form-urlencoded'
  const ContentType = contentType || 'application/json;charset=UTF-8'

  return new Promise((resolve, reject) => {
    axios
      .delete(globalGatewayAgent({ url, Origin, ismock }), {
        data: Encrypt.encryHttp({ isSecret: !useSecret ? useSecret : isSecret, ajaxType: 'delete', params, dataType }, ContentType),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': ContentType
        }
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
export async function asyncDel(url, { params = {}, Origin, contentType, dataType, ismock = false } = {}) { // 使用异步调用，返回结果后再执行
  await del(url, { params, Origin, contentType, dataType, ismock })
}

// 封装axios的下载数据流转换成excel
export function downLoad(url, { params = {}, Origin, contentType, dataType, ismock = false } = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(globalGatewayAgent({ url, Origin, ismock }), { params: params }, {
        responseType: 'blob'
      })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// 封装axios的post请求-序列化
export function postStringify(url, { params = {}, Origin, contentType, dataType, ismock = false } = {}, useSecret = true) {
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
  axios.defaults.headers.post['Content-Type'] = contentType || 'application/json'

  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: globalGatewayAgent({ url, Origin, ismock }),
      data: Qs.stringify(Encrypt.encryHttp({ isSecret: !useSecret ? useSecret : isSecret, ajaxType: 'postStringify', params }))
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// 封装axios的下载数据流转换成excel
export function DownLoadToExcel(url, { params = {}, Origin, contentType, fileName, type, ismock = false } = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(globalGatewayAgent({ url, Origin, ismock }), params, {
        responseType: 'blob'
      })
      .then(response => {
        const blob = new Blob([response.data], {
          type: type || 'application/vnd.ms-excel'
        })
        if ('download' in document.createElement('a')) {
          // 非IE下载
          elink.download = fileName || 'downLoad.xlsx'
          elink.href = URL.createObjectURL(blob)
          elink.click()
          URL.revokeObjectURL(elink.href)
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
        resolve()
      })
      .catch(error => {
        reject(error)
      })
  })
}
export function DownLoadToFile(url, { params = {}, Origin, contentType, fileName, ismock = false } = {}) {
  axios.defaults.baseURL = Origin || oldUrl
  fileName = fileName + '.xlsx' || 'download.xlsx'
  return new Promise((resolve, reject) => {
    axios
      .get(globalGatewayAgent({ url, Origin, ismock }), params, {
        'responseType': 'blob',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      })
      .then(response => {
        const blob = new Blob([response.data], {
          type: 'application/octet-stream'
        })
        let objectUrl = URL.createObjectURL(blob)
        if ('download' in document.createElement('a')) {
          let a = document.createElement('a')
          a.setAttribute('href', objectUrl)
          a.setAttribute('download', fileName)
          a.click()
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
        resolve(blob)
      })
      .catch(error => {
        reject(error)
      })
  })
}
