<template>
  <div class="gdp-speed-container">
    <div class="gdp-speed-item">
      <div class="gdp-speed-item-container">
        <span class="gdp-speed-item-num">
          9.17%
        </span>
        <svg-icon name="ratio-up" size="17" />
      </div>
      <span class="gdp-speed-item-type">
        本期增速
      </span>
    </div>
    <div class="gdp-speed-item">
      <div>
        <span class="gdp-speed-item-num">
          9.17%
        </span>
        <svg-icon name="ratio-up" size="17" />
      </div>
      <span class="gdp-speed-item-type">
        上年同期增速
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.gdp-speed-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 96px;
  height: 100%;
  padding: 90px 0 50px;
  box-sizing: border-box;
  .gdp-speed-item {
    &-container {
      display: flex;
      align-items: flex-end;
      margin-bottom: 4px;
    }
    &-num {
      margin-right: 6px;
      font-family: var(--font-family-hyt);
      font-size: 18px;
      font-weight: var(--font-weight-title);
      color: #4CC494;
      line-height: 18px;
    }
    &-type {
      font-size: 14px;
      color: #8C8C8C;
    }
  }
}
</style>
