import { reactive, unref, toRaw } from '@vue/composition-api'
import { useWatchOriginDataChange } from './useWatchOriginDataChange'

export const useSaleAmount = (originData) => {
  const saleAmount = reactive({
    retailTotal: 0,
    retailTotalPeriod: 0,
    retailTotalRatio: 0
  })
  const updateData = (currentData) => {
    Object.keys(toRaw(saleAmount)).forEach(key => {
      saleAmount[key] = unref(currentData)?.[key] || 0
    })
  }
  useWatchOriginDataChange(originData, updateData)

  return {
    saleAmount
  }
}
