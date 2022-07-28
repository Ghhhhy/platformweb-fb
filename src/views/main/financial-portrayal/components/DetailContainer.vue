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
      default: '400px'
    },
    height: {
      type: String,
      default: '254px'
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
