<template>
  <div
    class="drag-resize-wrapper"
    :style="{ resize: resize }"
  >
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    // none | both | horizontal | vertical
    resize: {
      type: String,
      default: 'none'
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.drag-resize-wrapper {
  position: relative;
  height: 100%;
  overflow: auto;
  &::-webkit-resizer {
    background: var(--primary-color);
  }
}
</style>
