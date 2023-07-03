/*
 * @Description:
 * @Author: chenxuanke
 * @Date: 2023-06-13 11:11:50
 * @LastEditors: chenxuanke
 * @LastEditTime: 2023-07-03 17:51:17
 */
import { Message } from 'element-ui'

export function checkRscode(_this, res, customMessage) {
  if (!res) {
    _this.tableLoading = false
    throw new Error('请求失败')
  }

  const { code, rscode, errorMessage, result, message } = res

  const SUCCESS_CODE = ['200', '100000', '000000']

  const hasSuccess = res &&
    (
      (Reflect.has(res, 'code') && SUCCESS_CODE.includes(code)) ||
      (Reflect.has(res, 'rscode') && SUCCESS_CODE.includes(rscode))
    )

  if (hasSuccess) {
    _this.tableLoading = false
    return res
  }
  _this.tableLoading = false
  Message({
    type: 'error',
    message: errorMessage || message || result || customMessage || '请求失败',
    customClass: 'modal-layout-message' // 解决modal遮罩层z-index比Message高问题
  })
  // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
  throw new Error(errorMessage || message || result || '请求失败')
}
