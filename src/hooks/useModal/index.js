import { computed, ref } from '@vue/composition-api'

/**
 * 父组件弹窗显隐
 * @return {(Ref<UnwrapRef<boolean>>|setVisibleState)[]}
 */
export function useModal() {
  const visibleState = ref(false)

  function setVisibleState(state = true) {
    visibleState.value = !!state
  }
  return [visibleState, setVisibleState]
}

/**
 * 子组件弹窗显隐
 * @param props
 * @param emit
 * @param option
 * @return {{visible: WritableComputedRef<*>}|*}
 */
export function useModalInner(props, emit, option) {
  const config = {
    prop: option?.prop || 'value',
    event: option?.event || 'changeValue',
    setCallback: option?.setCallback
  }
  // 显隐内部状态
  const visible = computed({
    get() {
      return props[config.prop]
    },
    set(val) {
      if (config.setCallback && typeof config.setCallback === 'function') {
        config.setCallback(val)
      }
      emit(config.event, val)
    }
  })

  return {
    visible
  }
}
