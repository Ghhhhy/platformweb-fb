import { ref, onMounted, onBeforeUnmount } from '@vue/composition-api'
import computedPx from '@/utils/computedPx'

/**
 * 动态获取设置表格高度
 * @param {number} initHeight
 */
export function useTableHeight(initHeight = 0) {
  // 表格高度
  const tableHeight = ref(computedPx(initHeight))

  function computedHeight() {
    tableHeight.value = computedPx(initHeight)
  }

  onMounted(() => {
    window.addEventListener('resize', computedHeight)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', computedHeight)
  })

  return {
    tableHeight
  }
}
