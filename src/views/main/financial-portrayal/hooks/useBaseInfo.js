import { onBeforeMount, ref, unref, inject, watch } from '@vue/composition-api'
import { getBaseInfo } from '@/api/frame/main/financial-portrayal'

export const useBaseInfo = () => {
  // 请求参数
  const reqSearchParams = inject('reqSearchParams')
  // 接口数据源
  const originData = ref({})
  const getBaseInfoHandle = async () => {
    const { data } = await getBaseInfo({
      ...unref(reqSearchParams)
    })
    originData.value = data || {}
  }
  onBeforeMount(async () => {
    getBaseInfoHandle()
  })
  // 监听顶部搜索改变重新拉去数据
  watch(reqSearchParams, () => {
    getBaseInfoHandle()
  }, { deep: true })
  return {
    originData
  }
}
