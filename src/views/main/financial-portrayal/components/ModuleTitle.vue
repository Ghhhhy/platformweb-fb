<template>
  <div class="module-title-wrapper">
    <span class="module-title">{{ title }}</span>
    <div class="mark-icon">
      <i v-for="item in 4" :key="item"></i>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.module-title-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  .module-title {
    margin-right: 10px;
    font-size: 16px;
    color: #595959;
    font-weight: var(--font-weight-title);
    line-height: 26px;
  }

  .mark-icon {
    i {
      display: inline-block;
      width: 4px;
      height: 7px;
      margin-right: 3px;
      background: var(--chart-theme);
      transform: skew(-30deg);
    }
  }
}

</style>
