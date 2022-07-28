import { baseUrl } from '../api/url.js'
export let KEY = '1234123412ABCDEF' // DES加密KEY
export let IV = 'ABCDEF1234123412' // DES加密偏移量
export let baseurl = baseUrl // 全局请求域地址
export let openTreeCache = true // 是否开启缓存树

// 默认菜单
export const defaultMenu = {
  id: '',
  name: '',
  routeName: '',
  children: []
}

// 环境配置
export const codeEnvironment = {
  dev: 'development',
  pro: 'production',
  test: ''
}
