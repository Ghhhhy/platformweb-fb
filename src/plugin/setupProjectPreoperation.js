import MenuModule from '@/api/frame/common/menu.js'
import store from '@/store'
import { findTree } from 'xe-utils'

let flag = false

async function getMenus() {
  try {
    const res = await MenuModule.getMenuInfo()
    store.commit('setSystemMenu', res) // 将菜单存储到store
    return res
  } catch (err) {
    console.log(err)
  }
}

export function setTokenByIframe () {
  const params = new URLSearchParams(window.location.search)
  const tokenid = params.get('tokenid') || ''
  const appguid = params.get('appguid') || ''
  store.commit('setLoginAuthentication', {
    tokenid,
    appguid
  })
}

export function getCurMenuObjByIframe () {
  // 获取hash 去掉#/
  const hash = window.location.hash.replace(/(#|\/)*/, '')

  return findTree(store.state.systemMenu || [], item => {
    if (item.url === '#' || item.url === '/' || item.isleaf === '0') return false

    const itemHash = item.url.replace(/(#|\/)*/, '')
    return itemHash === hash
  })?.item || {}
}

export async function setupProjectPreoperation () {
  if (flag) return
  flag = true
  setTokenByIframe()
  try {
    // 获取预警信息
    store.dispatch('warnInfo/getWarnInfo')
    await getMenus()
    const menu = getCurMenuObjByIframe()
    store.commit('setCurMenuObj', menu)
    store.commit('setCurNavModule', menu)
    console.log('==========iframe前置操作完成==========')
  } catch (err) {
    console.log(err)
  }
}
