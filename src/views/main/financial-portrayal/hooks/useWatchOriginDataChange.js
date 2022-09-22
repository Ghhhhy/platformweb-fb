import { onMounted, watch } from '@vue/composition-api'
// 数据源改变执行相应回调
export const useWatchOriginDataChange = (originData, callback) => {
  watch(originData, (currentVal) => {
    callback(currentVal)
  })
  onMounted(() => {
    callback(originData)
  })
}
