import { ref, watch } from '@vue/composition-api'

export const useSelect = (params = {
  option: [],
  defaultValue: null,
  callback: () => {}
}) => {
  const selectValue = ref(params.defaultValue)
  const selectOption = ref(params.option || [])
  watch(selectValue, () => {
    typeof params.callback === 'function' && params.callback()
  })
  return {
    selectValue,
    selectOption
  }
}
