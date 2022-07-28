<template>
  <div class="bar-chart-container">
    <div class="detail-title-wrapper">
      <DetailTitle
        :title="option.detailTitle"
        :show-dot="option.showDot"
        :unit="option.text"
        :right="true"
      />
    </div>
    <div v-if="option.customLegend" class="custom-legend" :style="position">
      <div
        v-for="item in option.customLegend"
        :key="item.color"
        class="legend-item"
      >
        <i :style="{ background: item.color }"></i>
        <span>{{ item.label }}</span>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import DetailTitle from './DetailTitle'
export default defineComponent({
  props: {
    option: {
      type: Object,
      default: () => {
        return { title: { text: '' }, customLegend: [] }
      }
    },
    // 自定义legend位置
    position: {
      type: Object,
      default: () => {
        return { top: '48px', left: '16px' }
      }
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
.custom-legend {
  position: absolute;
  top: 48px;
  left: 16px;
  display: flex;
  align-items: center;
  z-index: 1;

  .legend-item {
    display: flex;
    align-items: center;
    margin-right: 16px;
    i {
      width: 6px;
      height: 10px;
      margin-right: 6px;
    }
    span {
      font-size: 12px;
      color: #8C8C8C;
      border-radius: 0;
    }
  }
}

.detail-title-wrapper {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 5;
  width: 358px
}
</style>
