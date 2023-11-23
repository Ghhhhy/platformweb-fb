/* eslint-disable no-undef */
if (window.__MICRO_APP_ENVIRONMENT__) {
  /* eslint-disable-next-line */
  __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
}
// 微服务环境对象打印
const microEnv = {
  __MICRO_APP_ENVIRONMENT__: window.__MICRO_APP_ENVIRONMENT__,
  __MICRO_APP_PUBLIC_PATH__: window.__MICRO_APP_PUBLIC_PATH__,
  __MICRO_APP_BASE_ROUTE__: window.__MICRO_APP_BASE_ROUTE__,
  microApp: window.microApp,
  __MICRO_APP_NAME__: window.__MICRO_APP_NAME__,
  __MICRO_APP_BASE_APPLICATION__: window.__MICRO_APP_BASE_APPLICATION__
}

console.log('子项目fiscal + 全局环境变量:  ', microEnv)
