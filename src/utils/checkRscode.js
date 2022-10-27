import { Message } from 'element-ui'

export function checkRscode(res, customMessage) {
  if (!res) {
    throw new Error('请求失败')
  }
  // 处理状态码异常情况（非200），抛出异常阻止后续操作
  if (res.errorInfor) {
    Message({
      type: 'error',
      message: res.errorInfor?.message || '请求失败',
      customClass: 'modal-layout-message' // 解决modal遮罩层z-index比Message高问题
    })
    throw new Error(res.errorInfor?.message || '请求失败')
  }

  const { rscode, errorMessage, result } = res

  const SUCCESS_CODE = ['200', '100000']

  const hasSuccess = res && Reflect.has(res, 'rscode') && SUCCESS_CODE.includes(rscode)
  if (hasSuccess) {
    return res
  }

  Message({
    type: 'error',
    message: errorMessage || result || customMessage || '请求失败',
    customClass: 'modal-layout-message' // 解决modal遮罩层z-index比Message高问题
  })
  // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
  throw new Error(errorMessage || result || '请求失败')
}
