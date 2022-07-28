// 保存报错的接口信息, 切换页面后重置该属性为空
import store from '../store/index'
import ToolFn from '@/components/tool/util.js'
import { post } from '@/api/http'

var requestErrorInfoList = []

// 当前页面 菜单id
var currentPageMenuGuid

/**
 * 记录 访问接口 状态码非200 的报错信息
 * @param resp：错误信息
 * @param service: 服务名
 * @param method：接口签名
 * @param param：接口参数
 */
function recordBadUrlErrorInfo(resp, service, method, param) {
  if (currentPageMenuGuid === undefined || currentPageMenuGuid === null) {
    currentPageMenuGuid = store.state.curNavModule.guid
  }
  // 判断 当前菜单和上个访问菜单是否相同
  if (currentPageMenuGuid !== store.state.curNavModule.guid) {
    requestErrorInfoList = []
    store.commit('setErrorInfo', null)
  }
  var errorMsg = {
    '报错时间': ToolFn.DateFn.CurentTime(),
    '报错服务': service,
    '报错方法名': method,
    '方法参数': param,
    '报错信息': resp.statusText
  }
  // 将错误信息放到 错误信息集合中
  requestErrorInfoList.push(errorMsg)

  store.commit('setErrorInfo', JSON.stringify(requestErrorInfoList))
  // 设置完后重新给菜单变量赋值当前菜单值
  currentPageMenuGuid = store.state.curNavModule.guid
}

/**
 * 记录访问接口 状态码是200，但接口报错信息
 * @param result：错误信息
 * @param service: 服务名
 * @param method：接口签名
 * @param param：接口参数
 */
function recordUrlErrorInfo(result, service, method, param) {
  if (currentPageMenuGuid === undefined || currentPageMenuGuid === null) {
    currentPageMenuGuid = store.state.curNavModule.guid
  }
  // 判断 当前菜单和上个访问菜单是否相同
  if (currentPageMenuGuid !== store.state.curNavModule.guid) {
    requestErrorInfoList = []
    store.commit('setErrorInfo', null)
  }
  var errorMsg = {
    '报错时间': ToolFn.DateFn.CurentTime(),
    '报错服务': service,
    '报错方法名': method,
    '方法参数': param,
    '报错信息': result
  }
  // 将错误信息放到 错误信息集合中
  requestErrorInfoList.push(errorMsg)

  store.commit('setErrorInfo', JSON.stringify(requestErrorInfoList))
  // 设置完后重新给菜单变量赋值当前菜单值
  currentPageMenuGuid = store.state.curNavModule.guid
}

function doErrorFeedback(params) {
  return post('mp-t-log-service/v1/statistics', params)
}

const errorLogTool = {
  recordBadUrlErrorInfo,
  recordUrlErrorInfo,
  doErrorFeedback
}

export default errorLogTool
