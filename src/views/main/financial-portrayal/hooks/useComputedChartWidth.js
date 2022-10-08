import { onMounted, onBeforeUnmount, watch } from '@vue/composition-api'
import { throttle } from '@/utils/throttle'
import { getZoom } from '../model/data'
/**
 * 计算容器缩放 适配不同分辨率
 * @param currentRenderComponent
 */
export const useComputedChartWidth = (currentRenderComponent, nodeName = '.nav') => {
  const compoutedWidth = async () => {
    console.log('resize')
    const zoom = await getZoom(currentRenderComponent)
    document.querySelector(nodeName).style.zoom = zoom
  }

  const throttleCompoutedWidth = throttle(compoutedWidth, 1000)

  const start = () => {
    window.addEventListener('resize', throttleCompoutedWidth)
  }

  onMounted(() => {
    compoutedWidth()
    start()
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', throttleCompoutedWidth)
  })

  currentRenderComponent && watch(currentRenderComponent, () => {
    compoutedWidth()
  }, { deep: true })
}
