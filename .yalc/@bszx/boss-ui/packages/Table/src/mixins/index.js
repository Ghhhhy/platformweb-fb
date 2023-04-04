/*
 * @Author: 轻语
 * @Date: 2021-06-25 21:33:46
 * @LastEditors: 轻语
 * @LastEditTime: 2021-11-11 10:59:28
 * @Description:
 */

const modulesFiles = require.context('./', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1').split('/').slice(-1)[0]
  // 执行modulesFiles函数，返回一个对象{default: {// 文件内容}, _esModule: true}
  const value = modulesFiles(modulePath)
  moduleName !== 'index' && (modules[moduleName] = value.default)

  // modules = { ...modules, ...value.default }
  return modules
}, {})

export default modules
