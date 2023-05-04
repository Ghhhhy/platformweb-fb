import { ref } from '@vue/composition-api'
export default function useLoadingState() {
  const loadingState = ref(false)

  function setLoadingState(state = true) {
    loadingState.value = !!state
  }

  return [loadingState, setLoadingState]
}
