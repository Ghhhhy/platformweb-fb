<template>
  <div class="ex-factory-price-index">
    <div
      v-for="item in options"
      :key="item.color"
      class="price-index-item"
    >
      <div class="label-container">
        <i class="dot" :style="{ background: item.color }"></i>
        <span class="label">{{ item.label }}</span>
      </div>
      <div class="value-container">
        <span class="price-index-value" :style="{ color: item.color }">{{ item.value }}</span>
        <span class="price-index-unit">%PPI</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    options: {
      type: Array,
      default: () => []
    }
  }
})
</script>

<style lang="scss" scoped>
.ex-factory-price-index {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  width: 200px;
  height: 254px;
  padding: 112px 28px 60px;
  box-sizing: border-box;

  .price-index-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .label-container,
    .value-container {
      display: flex;
      align-items: center;

      .dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 6px;
      }

      .label,
      .price-index-unit {
        font-size: 14px;
        color: #666666;
      }

      .price-index-unit {
        margin-top: 4px;
      }

      .price-index-value {
        display: inline-block;
        margin-right: 2px;
        font-size: 22px;
        font-family: var(--font-family-hyt);
      }
    }
  }
}
</style>
