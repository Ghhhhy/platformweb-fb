import { ref, watch } from '@vue/composition-api'

export const useSelect1 = (params = {
  option: [],
  defaultValue: null,
  callback: () => {}
}) => {
  const leftValue = ref(params.defaultValue)
  const leftOption = ref(params.option || [])
  watch(leftValue, () => {
    typeof params.callback === 'function' && params.callback()
  })
  return {
    leftValue,
    leftOption
  }
}
export const useSelect2 = (params = {
  option: [],
  defaultValue: null,
  callback: () => {}
}) => {
  const rightValue = ref(params.defaultValue)
  const rightOption = ref(params.option || [])
  watch(rightValue, () => {
    typeof params.callback === 'function' && params.callback()
  })
  return {
    rightValue,
    rightOption
  }
}
