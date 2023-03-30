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
  const hash = window.location.hash

  return findTree(store.state.systemMenu || [], item => {
    return (item.url !== '#' && item.url !== '/' && hash.includes(item.url))
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
