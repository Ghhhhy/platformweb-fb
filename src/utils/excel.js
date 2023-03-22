/**
 * 获取Excel表中存储的日期时间戳
 * @description （Excel存储的日期是从1900年1月1日开始按天数来计算的，也就是说1900年1月1日在Excel中是1。js中是从1970年1月1日开始）
 * @param {number} num - excel存储的数字
 * @returns {string} js中的时间戳
 */
export const repairExcelTimestamp = num => {
  if (num instanceof Object) return
  num = Number(num) || 0
  let millisecond = 0 // 转化后的毫秒数
  if (num > 60) { // 对大于60的日期进行减1处理
    millisecond = (num - 25568 - 1) * 3600 * 24 * 1000
  } else {
    millisecond = (num - 25568) * 3600 * 24 * 1000
  }
  return millisecond
}
