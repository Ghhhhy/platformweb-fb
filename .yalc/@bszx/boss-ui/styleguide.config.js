// @Author: 轻语
// @Date: 2021-10-12 16:03:34
// @LastEditors: 轻语
// @LastEditTime: 2021-10-12 17:42:50
// @Description:
// const path = require('path')
// const themeObj = require('./styleguide/theme.js')

const fs = require('fs')

// 获取组件目录文件配置
var getComponentFiles = function(path) {
  var filesDir = [] // 存储文件夹
  var files = fs.readdirSync(path) // 获取当前component的下的文件夹
  files.forEach((file) => {
    if (file === 'theme-chalk') {
      return
    }
    var currBaseDir = path + '/' + file// 获取当前文件目录的地址
    var fileStat = fs.statSync(currBaseDir) // 获取当前文件/目录的属性
    if (fileStat.isDirectory()) { // 如果是文件夹，则是我们需要遍历的文件夹
      var fileChildren = fs.readdirSync(currBaseDir)// 获取当前文件目录的子目录结
      var regFile = new RegExp('^(index||' + file + ')(.vue)') // 正则匹配主要的文件 根据自己组件库进行获取主要暴露文件
      fileChildren.forEach((item) => {
        var itemFile = fs.statSync(`${path}/${file}/${item}`)
        if (itemFile.isDirectory()) {
          var bottomFile = fs.readdirSync(`${path}/${file}/${item}`)
          bottomFile.forEach(k => {
            var regResult = k.match(regFile)
            if (regResult && regResult.length > 0) {
              var chPath = `${path}/${file}/${item}/${regResult[0]}`
              filesDir.push(chPath) // 将获取到的结果push到文件中
            }
          })
        }
      })
    }
  })
  console.log(filesDir)
  return filesDir
}

// 配置忽略的文件夹 path 为当前文件夹下的路径
var getIgnoreFiles = function(path) {
  var fileDir = [
    '/theme-chalk/*.{vue,scss,js}'
  ]
  return fileDir.map((item) => {
    return path + item
  })
}

const BASEDIR = './packages'

module.exports = {
  // set your styleguidist configuration here
  title: 'Default Style Guide',
  // components: 'src/components/**/[A-Z]*.vue',
  // components: 'packages/**/index.vue',
  components: getComponentFiles(BASEDIR),
  // require: [path.join(__dirname, 'styleguide/global.requires.js')], // 全局vue组件使用的插件
  ignore: getIgnoreFiles(BASEDIR), // 要忽略的生成组件的文件夹
  // theme: themeObj,
  // defaultExample: true,
  exampleMode: 'collapse', // 文档中代码示例的标签初始化状态，决定是否展开。collapse ：默认情况下合上tab hide：隐藏标签，它不能在UI中被切换 expand：默认情况下展示选项卡
  usageMode: 'expand', // 文档中属性和方法的标签初始化状态，决定是否展开
  // locallyRegisterComponents: true, //vue-styleguidist全局注册所有组件 多个组件共享相同的名称
  styleguideDir: 'dist'
}

// // styleguide.config
// module.exports = {
//   title: 'Default Style Guide',          // 文档的标题
//   components: 'src/components/**/*.vue', // 组件的目录
//   defaultExample: false,                 // 是否使用默认样例
//   usageMode: 'expand',                   // 是否展开用法
//   exampleMode: 'expand',                 // 是否展开示例代码
//   styleguideDir: 'styleguide',           // 打包的目录
//   codeSplit: true,                       // 打包时是否进行分片
//   skipComponentsWithoutExample: true,    // 是否跳过没有样例的组件
// };
