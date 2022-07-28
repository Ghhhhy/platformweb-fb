// 配置主体导出   Author:Titans@2396757591@qq.com

import utils from './utils'
import GlobalConfig from './config'
export let setConfig = (config) => {
  utils.deepAssignOne(GlobalConfig, config)
}
export let getConfig = (dataexpression) => {
  let resData = GlobalConfig
  if (dataexpression) {
    let dataFieldArr = dataexpression.split('.')
    dataFieldArr.some((item, index) => {
      if (resData[item]) {
        resData = resData[item]
        return false
      } else {
        return true
      }
    })
  }
  return resData
}
export default GlobalConfig
