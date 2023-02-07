// vue.config.js
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const pxtoviewport = require(resolve('src/plugin/postcss-px-to-viewport'))
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// 获取自定义参数
const argv = JSON.parse(process.env.npm_config_argv)
argv.remain.forEach((item) => {
  process.env['VUE_APP_' + item.split('=')[0]] = item.split('=')[1] || ''
})
module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production' ? 'error' : false,
  publicPath: process.env.NODE_ENV === 'production' ? (process.env.VUE_APP_CONF_PUBLIC_PATH || './') : (process.env.VUE_APP_CONF_PUBLIC_PATH || './'),
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload')
    config.module
      .rule('file')
      .test(/\.(zip|xls|pdf|doc|docx)(\?.*)?$/)
      .use('file-loader')
      .loader('url-loader')
      .options({
        limit: 1,
        name: 'file/[name].[ext]'
      })
      .end()
    config
      .module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .options({
        limit: 1,
        name: 'file/[name].[ext]',
        optimizeSSR: process.env.NODE_ENV !== 'test' // 当为测试环境时，关闭服务端渲染 https://vue-loader.vuejs.org/zh/options.html#optimizessr
      })
      .tap(options => {
        options.transformAssetUrls = {
          audio: 'src',
          video: 'src'
        }
        return options
      })
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  configureWebpack: config => {
    // 开发环境不需要gzip
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new CompressionWebpackPlugin({
          // 正在匹配需要压缩的文件后缀
          test: /\.(js|css|svg|woff|ttf|json|html)$/,
          // 大于10kb的会压缩
          threshold: 10240
          // 其余配置查看compression-webpack-plugin
          // deleteOriginalAssets: true // 删除原文件
          // minRatio:0.8, // 只有压缩率小于这个值的资源才会被处理
          // filename: '[path].gz[query]',
        })
      )
    }
    // 是否开启分析
    if (process.env.npm_config_report) {
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  },
  // 声明应用的某些依赖库不参与打包，使用externals配置后，依旧可以在代码中通过CMD、AMD或者window/global全局的方式访问。例如通过script引入的库， 如用CDN的方式引入的包
  // externals: {
  // },
  // 声明需要编译（依赖）哪些包
  transpileDependencies: [
    // 'bs-ui'
  ],
  pluginOptions: {
    dll: {
      // 入口配置
      entry: {
        // css: ['./src/base/css'],
        // vxeTable: ['./src/base/vxeTable.js'],
        Echarts: ['./src/plugin/setupEcharts.js']
        // ElementUI: ['element-ui']
      },
      // 输出目录
      output: path.join(__dirname, './public/dll'),
      // 是否开启 DllReferencePlugin,
      // 默认情况下，插件没有检测到 vendor (执行 `npm run dll` 指令生成的 chunk 包)，会自动关闭。
      // 在有需要的情况下可以手动关闭插件，例如：
      // 1. 为了在开发环境使用vue代码中的提示，可配置只在生产环境开启分包模式，`open : process.env.NODE_ENV === 'production'`。
      // 2. 在构建目标(`target`)为 `node`，需要手动关闭 dll 插件。
      // open: process.env.NODE_ENV === 'production',
      open: true,
      // 自动注入到 index.html
      // 在执行 `dev` , `build` 等其他指令时，程序会自动将 `dll` 指令生成的 `*.dll.js` 等文件自动注入到 index.html 中。
      inject: true
    }
  },
  productionSourceMap: true,
  // productionSourceMap: process.env.NODE_ENV !== 'production',
  // css: {
  //   sourceMap: process.env.NODE_ENV !== 'production',
  //   extract: process.env.NODE_ENV === 'production'
  // }
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/css/global.scss";`
      },
      postcss: {
        plugins: [
          pxtoviewport({
            unitToConvert: 'px', // 需要转换的单位，默认为"px"
            viewportWidth: 1920, //  设计稿的视口宽度
            unitPrecision: 5, // 单位转换后保留的精度
            propList: ['*'], // 能转化为vw的属性列表
            viewportUnit: 'vw', // 希望使用的视口单位
            fontViewportUnit: 'vw', // 字体使用的视口单位
            selectorBlackList: ['.ignore-px-to-vw'], // 需要忽略的CSS选择器 '.el','el'
            minPixelValue: 1, // 最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // 媒体查询里的单位是否需要转换单位
            replace: true, // 是否直接更换属性值，而不添加备用属性
            // exclude: [/node_modules/, /src\\[common|components|assets|base]/, /src\\views\\?!px-to-vw-page/], // 忽略某些文件夹下的文件或特定文件, /\/src\/views\//
            include: [
              /src\\views\\px-to-vw-page/
              // /src\\views\\main\\(financial-portrayal|subjectAnalysis|warningOverview)/
            ], // 如果设置了include，那将只有匹配到的文件才会被转换
            landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            landscapeUnit: 'vw' // 横屏时使用的单位
          })
        ]
      }
    }
  }
}
