import { inject } from '@vue/composition-api'

/**
 * 从父组件注入相关hook
 * @return {{modalType: unknown, pagePath: unknown}}
 */
export default function useInjectState() {
  // 弹窗操作类型(查看 | 审核)
  const modalType = inject('modalType')

  // 页面路由(也可root中获取route)
  const pagePath = inject('pagePath')

  return {
    modalType,
    pagePath
  }
}
