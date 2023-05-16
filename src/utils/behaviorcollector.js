import store from '../store/index'
import { post } from '@/api/http'

const defaultConfig = {
  maxLength: 20
}
class BehaviorCollector {
  constructor() {
    this.enterTime = null
    this.collectionInn = []
    this.defaultOptions = {
      user_id: null,
      user_code: null,
      region_code: null,
      agency: null,
      time: null,
      time_: null,
      tokenid: null,
      current_role_id: null, // 当前角色id
      behavior_type: null,
      behavior_content: { // 操作内容
        id: null,
        url: null,
        value: null
      }
    }
  }
  initClickMonitor(obj) {
    const { curNavModule } = obj.state
    const defaultOptionsInstantiation = {
      ...this.getDefaultOption(),
      time: getCurrentDate(),
      time_: +new Date(),
      behavior_type: 'click',
      behavior_content: {
        url: curNavModule.url,
        menuname: curNavModule.label || curNavModule.name,
        value: obj.label
      },
      entrance_name: obj.label
    }
    this.addRecord(defaultOptionsInstantiation)
  }
  initRouteMonitor({ to, from, state }) {
    const { curNavModule } = state
    const enterOption = {
      ...this.getDefaultOption(),
      behavior_type: 'page_view',
      current_role_id: '',
      entrance_name: curNavModule.label || curNavModule.name,
      behavior_content: {
        menuname: curNavModule.label || curNavModule.name,
        entrance_name: curNavModule.label || curNavModule.name,
        url: curNavModule.url,
        parent_url: from.name
      }
    }
    this.addRecord(enterOption)
    if (this.enterTime) {
      const stayTimeOption = {
        ...this.getDefaultOption(),
        behavior_type: 'page-time',
        behavior_content: {
          menuname: curNavModule.label || curNavModule.name,
          staytime: Math.round((+new Date() - this.enterTime) * 0.001),
          url: curNavModule.url,
          entrance_name: curNavModule.label || curNavModule.name
        }
      }
      this.addRecord(stayTimeOption)
    }
    this.enterTime = +new Date()
  }
  getDefaultOption() {
    const { userInfo } = store.state
    return {
      time: getCurrentDate(),
      time_: +new Date(),
      'appname': userInfo?.app?.name,
      user_id: userInfo.guid,
      user_code: userInfo.code,
      region_code: userInfo.province,
      agency: userInfo.agency,
      user_name: userInfo.name,
      usertype: userInfo.name,
      tokenid: JSON.parse(localStorage.getItem('__boss_cache__bsSxczyAccessToken'))
    }
  }
  sendOptions (params) {
    return post(`mp-d-aggregation-service/v1/collector/behavior?${+new Date()}`,
      {
        source: 'behavior',
        ...params,
        contentType: 'application/x-www-form-urlencoded'
      })
  }
  /* 存储当前监控到的数据 */
  addRecord(options) {
    if (this.collectionInn.length >= defaultConfig.maxLength) {
      this.sendOptions({
        tokenid: JSON.parse(localStorage.getItem('__boss_cache__bsSxczyAccessToken')),
        data: this.collectionInn.slice(0, defaultConfig.maxLength)
      })
      this.collectionInn = []
      return
    }
    this.collectionInn.push(options)
  }
}
// function getUrlParam (urlName, name) {
//   var url = urlName || window.location.search
//   var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
//   var r = url.substring(url.indexOf('?') + 1, url.length).match(reg) // 匹配目标参数
//   if (r != null) return unescape(r[2])
//   return null // 返回参数值
// }
function getCurrentDate () {
  var myDate = new Date()
  var year = myDate.getFullYear() // 获取当前年
  var mon = myDate.getMonth() + 1 // 获取当前月
  var date = myDate.getDate() // 获取当前日
  var h = myDate.getHours()// 获取当前小时数(0-23)
  var m = myDate.getMinutes()// 获取当前分钟数(0-59)
  var s = myDate.getSeconds()// 获取当前秒
  mon = addZeroToNum(mon)
  date = addZeroToNum(date)
  h = addZeroToNum(h)
  m = addZeroToNum(m)
  s = addZeroToNum(s)
  return year + '-' + mon + '-' + date + ' ' + h + ':' + m + ':' + s
}
function addZeroToNum(n) {
  if (n < 10) {
    return '0' + n
  } else {
    return n
  }
}
export default new BehaviorCollector()
