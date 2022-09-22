/*
 * @Author: ChenHuanJie
 * @Date: 2021-12-14 16:03:34
 * @LastEditors: ChenHuanJie
 * @LastEditTime: 2021-12-14 16:03:35
 * @FilePath: \caizheng-front\src\config\configTableHeader\reportConfig\Reply\917100\index.js
 * @Description: 批量处理导入报表配置的js文件
 * @Signature: ↓↓↓↓↓↓
 * ************咏代码*****************
 * ** 日出东隅照我床，悠悠青龙倚斜阳。**
 * ** 陋室区区徒四壁，代码行行正铿锵。**
 * ****************************************
 * ** 世人皆说程序员好，人高端，工资高。    **
 * ** 狗屁，常加班，起不早，挣得不够去烧烤。**  (中指大法好)
 * ** Bug、Code知多少，只是屏幕显人老。    **
 * ****************************************
 * ** 年少太轻狂，误入IT行。  **
 * ** 白发森森立，两眼直茫茫。**
 * ***************************
 */

const allConfig = {}
function importAll(r) {
  r.keys().forEach(
    key => Object.assign(allConfig, r(key).default)
  )
}
importAll(require.context('./children', false, /.js$/))

export default {
  ...allConfig
}
