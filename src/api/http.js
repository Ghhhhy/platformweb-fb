// 本文件不允许私自修改，环保除引用第三方接口外一律使用post请求方式，接口定义请参考接口规范书写，这里只做全局http请求状态拦截，其他用户状态一律放行，页面内部做判断自行处理
import axios from 'axios'
// import globalGatewayAgentConf from '../../public/static/js/config/serverGatewayMap.js'
import {
  baseUrl
} from './url'
import Qs from 'qs'
import store from '../store/index'
import Encrypt from './smSecret/smSecret.js'
import goLogin from '../utils/goLogin'
// window.gloableToolFn.serverGatewayMap = globalGatewayAgentConf
const elink = document.createElement('a')
axios.defaults.timeout = 300000
axios.defaults.baseURL = baseUrl
axios.defaults.withCredentials = false
axios.defaults.headers.post['Content-Type'] = 'application/json'
const oldUrl = axios.defaults.baseURL
// 请求拦截
axios.defaults.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT,PATCH'
axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
// axios.defaults.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept,tokenid,appguid'
axios.defaults.headers['Access-Control-Allow-Headers'] = 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Origin,X-Requested-With,Content-Type,Content-Range,Range,tokenid,appguid'

axios.interceptors.request.use(function(config) {
  const { tokenid, appguid } = store.getters.getLoginAuthentication
  // config.headers.token = '1234444'
  // config.headers.os = 0
  config.headers.menuguid = store.state.curNavModule ? (store.state.curNavModule.guid || store.state.curNavModule.menuguid) : ''
  config.headers.appguid = appguid
  if (tokenid) {
    config.headers.tokenid = tokenid
  }
  return config
}, function(error) {
  return Promise.reject(error.response)
})
// axios.interceptors.request.onerror = function handleError() {
//   Promise.reject(createError('Network Error', axios.interceptors.request.config, null, axios.interceptors.request))
// }
// 全局网关
const globalGatewayAgent = (url, Origin) => { // 注册全局网关
  axios.defaults.baseURL = Origin || oldUrl
  let serveUrl = url.split('/').filter((item, index) => {
    return !!item
  })
  let serverName = serveUrl[0]
  if (process.env.NODE_ENV === 'development') {
    if (Object.keys(window.gloableToolFn.serverGatewayMap.development).indexOf(serverName) >= 0) {
      serveUrl.splice(0, 1)
      url = serveUrl.join('/')
      axios.defaults.baseURL = window.gloableToolFn.serverGatewayMap.development[serverName]
    } else {
      axios.defaults.baseURL = oldUrl
    }
  } else {
    axios.defaults.baseURL = oldUrl
    // if (Object.keys(window.gloableToolFn.serverGatewayMap.production).indexOf(serverName) >= 0) {
    //   serveUrl.splice(0, 1)
    //   url = serveUrl.join('/')
    //   axios.defaults.baseURL = window.gloableToolFn.serverGatewayMap.production[serverName]
    // } else {
    //   axios.defaults.baseURL = oldUrl
    // }
    let apaas = 'mp-b-perm-service,mp-b-sso-service,mp-b-user-service,mp-b-basedata-service,mp-b-configure-service,mp-b-project-lifecycle'
    let filePreviewService = 'mp-b-file-preview'
    let fileservice = 'fileservice'
    let apaas1 = 'large-monitor-platform,dfr-monitor-service'
    let tempUrl = url.split('/')[0]
    if (tempUrl.length === 0) {
      tempUrl = url.split('/')[1]
    }

    if (apaas.indexOf(tempUrl) > -1) {
      // return url
      url = 'apaas/api/' + url
    } else if (filePreviewService === tempUrl) {
      return url
    } else if (fileservice === tempUrl) {
      if (process.env.VUE_APP_CONF_ISHB) {
        return url.replace(
          tempUrl,
          window.gloableToolFn.serverGatewayMap.production[fileservice]
        )
      }
      // 附件使用openapi接口
      return (window.gloableToolFn.serverGatewayMap.gloableUrl.fileservicePrefix || 'openapi/') + url
    } else if (apaas1.indexOf(tempUrl) > -1) {
      serveUrl.splice(0, 1)
      url = serveUrl.join('/')
    } else {
      return url
      // url = 'api/budget/' + url
    }
  }

  return url
}

// 外部通过全局网关获取baseURL  url
export const httpGlobalGatewayAgent = (url, Origin) => { // 注册全局网关
  axios.defaults.baseURL = Origin || oldUrl
  let serveUrl = url.split('/').filter((item, index) => {
    return !!item
  })
  let serverName = serveUrl[0]
  let baseURL = ''
  if (process.env.NODE_ENV === 'development') {
    if (Object.keys(window.gloableToolFn.serverGatewayMap.development).indexOf(serverName) >= 0) {
      serveUrl.splice(0, 1)
      url = serveUrl.join('/')
      baseURL = window.gloableToolFn.serverGatewayMap.development[serverName]
    } else {
      baseURL = oldUrl
    }
  } else {
    // if (Object.keys(window.gloableToolFn.serverGatewayMap.production).indexOf(serverName) >= 0) {
    //   serveUrl.splice(0, 1)
    //   url = serveUrl.join('/')
    //   baseURL = window.gloableToolFn.serverGatewayMap.production[serverName]
    // } else {
    //   baseURL = oldUrl
    // }
    let apaas = 'mp-b-perm-service,mp-b-sso-service,mp-b-user-service,mp-b-basedata-service,mp-b-configure-service,fileservice,mp-b-project-lifecycle'
    let apaas1 = 'large-monitor-platform'
    let tempUrl = url.split('/')[0]
    if (tempUrl.length === 0) {
      tempUrl = url.split('/')[1]
    }

    if (apaas.indexOf(tempUrl) > -1) {
      // return url
      url = 'apaas/api/' + url
    } else if (apaas1.indexOf(tempUrl) > -1) {
      serveUrl.splice(0, 1)
      url = serveUrl.join('/')
    } else {
      return url
      // url = 'api/budget/' + url
    }
  }

  return {
    baseURL,
    url
  }
}
export const globalGatewayAgentConfig = window.gloableToolFn.serverGatewayMap
export const smSecretUtils = Encrypt
axios.interceptors.response.use(function(response) {
  if (response.status === 200) {
    let msg = response.data.msg || response.data.message || ''
    let userInvalid = false
    if (msg === '系统异常(网关异常)') {
      let data = response.data.data
      userInvalid = data.includes('token信息无效')
    }
    if (msg.indexOf('token信息无效') !== -1 || msg.indexOf('用户失效') !== -1 || userInvalid) {
      let r = confirm('用户信息失效，请前往平台重新登录。点击确认返回首页')
      if (r) {
        localStorage.removeItem('__boss_cache__bsSxczyAccessToken')
        window.location.href = window.gloableToolFn.serverGatewayMap?.gloableUrl?.portalLoginUrl || (document.referrer || '/')
      }
    }
    switch (response.data.code) {
      case (401):
        console.log('Unauthorized,表示用户没有权限(令牌、用户名、密码错误)')
        goLogin()
        break
      case (400):
        console.log('Invalid Request,用户发出的请求有错误')
        break
      case (403):
        console.log('Forbidden, 表示用户得到授权(与 401 错误相对)，但是访问是被禁止的')
        break
      case (404):
        console.log('Not Found,用户发出的请求针对的是不存在的记录，服务器没有进行操作')
        break
      case (406):
        console.log('Not Acceptable， 用户请求的格式不可得(比如用户请求 JSON格式，但是只有XMLs格式)。')
        break
      case (422):
        console.log('Unprocesable entitz， 当创建一个对象时，发生一个验证错误')
        break
      case (500):
        console.log('Internal Server Error， 服务器发生错误，用户将无法判断发出的请求是否成功。')
        break
      default:
        break
    }
  }
  return response
}, function(error) {
  // 对响应错误做处理
  return {
    data: {
      code: 0,
      errorInfor: error
    },
    code: 0
  }
})
export let Axios = axios
// 封装axios的get请求
export function get(url, params, Origin, contentType) {
  axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'
  axios.defaults.headers.get['Content-Type'] = contentType || 'application/json'
  return new Promise((resolve, reject) => {
    axios
      .get(globalGatewayAgent(url, Origin), {
        params: params
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
export function post(url, data = {}, Origin, contentType) {
  // axios.defaults.headers.post['Content-Type'] = 'application/json' || 'application/x-www-form-urlencoded
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
  axios.defaults.headers.post['Content-Type'] = contentType || 'application/json'
  return new Promise((resolve, reject) => {
    axios
      .post(globalGatewayAgent(url, Origin), data)
      .then(response => {
        // console.log('post', '\n', url, 'response', response, '\n', data, '\n', response)
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// 封装axios的post-formData请求，避免每次都要用post调用时要new FormData
export function postFormData(url, data = {}, Origin) {
  // axios.defaults.headers.post['Content-Type'] = 'application/json' || 'application/x-www-form-urlencoded
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
  axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
  const formData = new FormData()
  Object.entries(data || {}).forEach(([key, value]) => {
    formData.append(key, value)
  })
  return new Promise((resolve, reject) => {
    axios
      .post(globalGatewayAgent(url, Origin), formData)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
// export async function getAsync(url, params, Origin, contentType) {
//   axios.defaults.headers.get['Content-Type'] = contentType || 'application/json'
//   if (Origin) {
//     axios.defaults.baseURL = Origin
//   }
//   let res = await axios.get(url, {
//     params: params,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   })
//   return new Promise((resolve) => {
//     if (res.code === 0) {
//       resolve(res)
//     } else {
//       resolve(res)
//     }
//   })
// }

// export async function postAsync(url, params = {}, Origin, contentType) {
//   if (Origin) {
//     axios.defaults.baseURL = Origin
//   }
//   axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
//   axios.defaults.headers.post['Content-Type'] = contentType || 'application/json'
//   if (Origin) {
//     axios.defaults.baseURL = Origin
//   }
//   let res = await axios.post(url, params)
//   return new Promise((resolve) => {
//     if (res.code === 0) {
//       resolve(res)
//     } else {
//       resolve(res)
//     }
//   })
// }

// 封装axios的put请求
export function put(url, data = {}, Origin, contentType) {
  // axios.defaults.headers.post['Content-Type'] = 'application/json' || 'application/x-www-form-urlencoded'
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
  axios.defaults.headers.post['Content-Type'] = contentType || 'application/json'
  return new Promise((resolve, reject) => {
    axios
      .put(globalGatewayAgent(url, Origin), data)
      .then(response => {
        // console.log('post', '\n', url, 'response', response, '\n', data, '\n', response)
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// 封装axios的patch请求
export function patch(url, data = {}, Origin, contentType) {
  // axios.defaults.headers.post['Content-Type'] = 'application/json' || 'application/x-www-form-urlencoded'
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
  axios.defaults.headers.post['Content-Type'] = contentType || 'application/json'
  return new Promise((resolve, reject) => {
    axios
      .patch(globalGatewayAgent(url, Origin), data)
      .then(response => {
        // console.log('post', '\n', url, 'response', response, '\n', data, '\n', response)
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// 封装axios的delete请求
export function del(url, params, Origin, contentType, dataType) {
  // axios.defaults.headers.post['Content-Type'] = 'application/json' || 'application/x-www-form-urlencoded'
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
  axios.defaults.headers.post['Content-Type'] =
    contentType || 'application/json'
  const paramsData = dataType ? { params: params } : { data: params }
  return new Promise((resolve, reject) => {
    axios
      .delete(globalGatewayAgent(url, Origin), paramsData)
      .then(response => {
        // console.log('post', '\n', url, 'response', response, '\n', params, '\n', response)
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// 封装axios的下载数据流转换成excel
export function downLoad(url, params = {}, Origin) {
  return new Promise((resolve, reject) => {
    axios
      .get(globalGatewayAgent(url, Origin), { params: params }, {
        responseType: 'blob'
      })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
  })
}

// 封装axios的post请求-序列化
export function postStringify(url, data = {},
  Origin, openLoading) {
  globalGatewayAgent(url, Origin)
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      data: Qs.stringify(data)
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function postDownloadXlsxInArrayBuffer(url, data = {}, name = '下载文件', Origin, openLoading) {
  axios.request({
    responseType: 'arraybuffer',
    url: globalGatewayAgent(url, Origin),
    method: 'post',
    data: data
  }).then((result) => {
    const outputFilename = `${name}.xlsx`
    const blob = new Blob([result.data], { type: 'application/vnd.ms-excel' })
    if ('download' in document.createElement('a')) {
      const elink = document.createElement('a')
      elink.download = outputFilename
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href)
      document.body.removeChild(elink)
    } else {
      navigator.msSaveBlob(blob, outputFilename)
    }
    return outputFilename
  })
}

// 封装axios的下载数据流转换成excel
export function DownLoadToExcel(url, data = {}, fileName, Origin) {
  fileName = fileName + '.xls'
  return new Promise((resolve, reject) => {
    axios
      .post(globalGatewayAgent(url, Origin), data, {
        responseType: 'blob'
      })
      .then(response => {
        const blob = new Blob([response.data], {
          type: 'application/vnd.ms-excel'
        })
        if ('download' in document.createElement('a')) {
          // 非IE下载
          elink.download = fileName
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
        console.log(error)
        reject(error)
      })
  })
}
export function DownLoadToFile(url, data = {}, fileName, Origin) {
  axios.defaults.baseURL = Origin || oldUrl
  fileName = fileName + '.xlsx' || 'download.xlsx'
  return new Promise((resolve, reject) => {
    axios
      .get(globalGatewayAgent(url, Origin), data, {
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
        console.log(error)
        reject(error)
      })
  })
}
