import countDownConfirm from './countDownConfirm.vue'
import Vue from 'vue'
import store from '../store/index'
import { get } from './http.js'
const CountDownConfirm = Vue.extend(countDownConfirm)
var timerSetting = null

/**
 * 计时开始
 */
export const xclose = () => {
  setTimeout(() => {
    clearTimeout(timerSetting)
    timerSetting = null
  }, 2000)
}

const objToQueryUrlString = (obj) => {
  /* @description   对象序列化(对象转成url参数) @param  {Object} obj  @return {String} */
  let pairs = []
  for (let key in obj) {
    pairs.push('' + key + '=' + obj[key])
  }
  return pairs.join('&')
}

// 退出登录
const outLogIn = (countDownConfirm) => {
  clearInterval(countDownConfirm.CountDownTime)
  countDownConfirm.CountDownTime = null
  clearTimeout(timerSetting)
  timerSetting = null
  document.body.removeChild(countDownConfirm.$el)
  if (window.gloableToolFn.serverGatewayMap.gloableUrl.isLoginOutToPortal) {
    const { appguid } = store.getters.getLoginAuthentication
    let guid = store.state.curNavModule.guid
    let url = window.location.origin + window.location.pathname + '?' + objToQueryUrlString({
      guid: appguid || 'pay',
      intoMenu: guid && guid.length > 12 ? guid : '1'
    })
    window.location.href = window.gloableToolFn.serverGatewayMap.gloableUrl.portalLoginUrl1 + '?service=' + url
  } else {
    sessionStorage.removeItem('tokenInfo')
    window.location.href = window.location.origin
  }
}

// 关闭弹窗重新计时
const closedRecycle = (countDownConfirm, time) => {
  if (countDownConfirm) {
    clearInterval(countDownConfirm.CountDownTime)
    countDownConfirm.CountDownTime = null
  }
  clearTimeout(timerSetting)
  timerSetting = null
  document.body.removeChild(countDownConfirm.$el)
  let times = typeof time === 'string' || typeof time === 'number' ? time : Date.now()
  sessionStorage.setItem('refreshTiem', times)
  refreshTiemChange(Date.now())
}

var timeFlag = true

export const refreshTiemChange = () => {
  clearTimeout(timerSetting)
  timerSetting = null
  let now = Date.now()
  let pre = sessionStorage.getItem('refreshTiem') || 0
  const { tokenid } = store.getters.getLoginAuthentication
  if (now - pre >= window.gloableToolFn?.outTime?.outTime) {
    if (!timeFlag) return
    timeFlag = false
    get('mp-b-sso-service/v2/checkTokenTime/' + tokenid).then((res) => {
      timeFlag = true
      if (res.rscode === '100000') {
        if (res.data.checktoken) {
          let expire = res.data.expire
          if (expire <= window.gloableToolFn?.outTime?.countDown / 1000) {
            let countDownConfirm = new CountDownConfirm({
              el: document.createElement('div'),
              propsData: {
                xclose: xclose
              }
            })
            document.body.appendChild(countDownConfirm.$el)
            Vue.nextTick(() => countDownConfirm.show(expire))
            countDownConfirm.confirm = () => {
              get('mp-b-sso-service/v2/checktoken/' + tokenid).then((res) => {
                if (res.rscode === '100000' && res.data) {
                  closedRecycle(countDownConfirm)
                } else {
                  outLogIn(countDownConfirm)
                }
              }).catch(() => {
                clearInterval(countDownConfirm.CountDownTime)
                countDownConfirm.CountDownTime = null
              })
            }
            countDownConfirm.closed = (items) => closedRecycle(countDownConfirm, items)
          } else {
            let residueTiem = (res.data.expire - (5 * 60)) * 1000
            sessionStorage.setItem('refreshTiem', +sessionStorage.getItem('refreshTiem') + residueTiem)
            refreshTiemChange()
          }
        } else outLogIn()
      } else closedRecycle()
    }).catch(() => { timeFlag = true })
  } else {
    timerSetting = setTimeout(() => {
      refreshTiemChange()
    }, 4000)
  }
}

/**
 * 计时结束
 */
