import { ref } from '@vue/composition-api'
function useLoadingState() {
  const loadingState = ref(false)

  function setLoadingState(state = true) {
    loadingState.value = !!state
  }

  return {
    loadingState,
    setLoadingState
  }
}
