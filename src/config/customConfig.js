// const subChildrens = {

// }
// function importAll(r) {
//   r.keys().forEach((key) => {
//     subChildrens[key] = r(key).default
//   })
// }
// importAll(require.context('./customConfigChildren', false, /.js$/))
// export default subChildrens['./' + process.env.VUE_APP_DIVISION + '.js'] || {}
// }
let exportConfig = null
try {
  exportConfig = require('./customConfigChildren/' + process.env.VUE_APP_DIVISION + '.js').default
} catch (e) {
  exportConfig = {}
}
console.log('当前打包调用配置：', process.env.VUE_APP_DIVISION, exportConfig)
export default exportConfig
