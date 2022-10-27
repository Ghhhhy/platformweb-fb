import { Message } from 'element-ui'

export function checkRscode(res, customMessage) {
  if (!res) {
    throw new Error('请求失败')
  }

  const { code, errorMessage, result, message } = res

  const SUCCESS_CODE = ['200', '100000', '000000']

  const hasSuccess = res && Reflect.has(res, 'code') && SUCCESS_CODE.includes(code)
  if (hasSuccess) {
    return res
  }

  Message({
    type: 'error',
    message: errorMessage || message || result || customMessage || '请求失败',
    customClass: 'modal-layout-message' // 解决modal遮罩层z-index比Message高问题
  })
  // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
  throw new Error(errorMessage || message || result || '请求失败')
}
