<template>
  <div class="bar-chart-container">
    <div class="detail-title-wrapper">
      <DetailTitle
        :title="title"
      />
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import DetailTitle from './DetailTitle'
export default defineComponent({
  props: {
    title: {
      type: '',
      default: ''
    }
  },
  components: {
    DetailTitle
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.bar-chart-container {
  position: relative;
}
.detail-title-wrapper {
  margin-bottom: 16px;
}
</style>
