
/*
 * File: store.js
 * Description: Used for ...
 * Created: 2020-7-20 10:43
 * Author: comer xinlai3698@163.com
 * -----
 * Last Modified: 2020 - 7 - 20 10: 43
 * Modified By: comer xinlai3698 @163.com
 * -----
 */

export const Store = (...args) => {
  let [isSession, name, value, prefix] = [false]
  if (typeof args[0] === 'boolean') {
    isSession = args[0]
    args.shift()
  }
  name = args[0]
  value = args[1]
  prefix = args[2] === void 0 ? '__boss_cache__' : args[2]

  const Storage = isSession ? window.sessionStorage : window.localStorage

  if (!name || !(typeof name === 'string')) {
    throw new Error('缓存名称必须是一个字符串')
  }

  const CACHE_KEY = prefix && typeof prefix === 'string' ? (prefix + name) : name

  // delete
  if (value === null) {
    return Storage.removeItem(CACHE_KEY)
  }

  // set
  if (value !== void 0) {
    return Storage.setItem(CACHE_KEY, JSON.stringify(value))
  }

  // get
  let _value = void 0
  try {
    _value = JSON.parse(Storage.getItem(CACHE_KEY))
  } catch (e) {
    // todo
  }

  return _value
}

export default Store
