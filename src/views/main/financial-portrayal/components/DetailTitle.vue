<template>
  <div class="detail-title">
    <span :class="['title-text', { dot: showDot }]">
      {{ title }}
    </span>
    <span v-if="unit" :style="right ? 'margin-left: 162px' : ''" class="detail-unit">
      {{ unit }}
    </span>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: ''
    },
    showDot: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" scoped>
.detail-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.title-text{
  font-size: 14px;
  line-height: 24px;
  font-weight: var(--font-weight-title);
  color: #666;
}

.dot {
  display: flex;
  align-items: center;
}
.title-text.dot::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 8px;
  background: var(--chart-theme);
}

.detail-unit {
  font-size: 14px;
  color: #666666;
  line-height: 24px;
  font-weight: 400;
}
</style>
