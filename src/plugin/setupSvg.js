import SvgIcon from '@/components/SvgIcon' // svg组件
export const setupSvg = (Vue) => {
  // 注册为全局组件
  Vue.component('svg-icon', SvgIcon)
  const req = require.context('@/assets/icons/svg', false, /\.svg$/)
  const requireAll = requireContext => requireContext.keys().map(requireContext)
  requireAll(req)
}
