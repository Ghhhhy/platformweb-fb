import { onMounted, reactive } from '@vue/composition-api'
// 动态计算财政画像中心区域两边垂直线
export const useVerticalHeight = () => {
  const verticalLineHeight = reactive({
    expend: 0,
    income: 0
  })
  // 获取支出收入两边垂直线所需要的高度
  const setVerticalHeight = (type) => {
    const nodes = document.getElementsByClassName(`triangle-line-icon-${type}`)
    const [firstNode, lastNode] = [nodes[0], nodes[2]]
    const instance = lastNode.getBoundingClientRect().top - firstNode.getBoundingClientRect().top
    verticalLineHeight[type] = instance
  }
  onMounted(() => {
    setVerticalHeight('expend')
    setVerticalHeight('income')
  })
  return {
    verticalLineHeight
  }
}
