<template>
  <div
    class="detail-container"
    :style="{ width, height }"
  >
    <DetailTitleVue :title="title" />
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import DetailTitleVue from './DetailTitle.vue'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  components: {
    DetailTitleVue
  }
})
</script>

<style lang="scss" scoped>
.detail-container {
  padding: 16px;
  box-sizing: border-box;
}
</style>
