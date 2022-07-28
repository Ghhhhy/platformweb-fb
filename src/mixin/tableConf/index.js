import getConfigByUrl from './config'
export default {
  install (Vue) {
    Vue.mixin(getConfigByUrl)
  }
}
