/*
 * @Author: 轻语
 * @Date: 2021-12-08 15:22:30
 * @LastEditors: 轻语
 * @LastEditTime: 2021-12-08 15:22:32
 * @Description:
 */
module.exports = {
  plugins: [
    require('autoprefixer')({ overrideBrowserslist: ['> 0.15% in CN'] })// 自动添加css前缀
  ]
}
