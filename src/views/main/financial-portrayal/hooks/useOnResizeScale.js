import { onMounted, onBeforeUnmount, nextTick } from '@vue/composition-api'
import { throttle } from '@/utils/throttle'
export const useOnResizeScale = (selector) => {
  // 设计图宽
  const designWidth = 1920
  let dom = null

  const updateScale = () => {
    if (!dom) return
    const viewportWidth = document.body.clientWidth || document.documentElement.clientWidth
    dom.style.transformOrigin = 'left top'
    dom.style.transform = `scale(${viewportWidth / designWidth})`
  }
  const throttleHandle = throttle(updateScale, 500)

  onMounted(async () => {
    await nextTick()
    dom = document.querySelector(selector)
    window.addEventListener('resize', throttleHandle)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', throttleHandle)
  })
}
