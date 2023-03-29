import store from '@/store'
import { findTree } from 'xe-utils'

export default function getMenuByPath() {
  const hash = window.location.hash

  const item = findTree(store.state.systemMenu || [], item => hash.includes(item.url))?.item || {}
  return item
}
