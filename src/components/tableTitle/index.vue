<template>
  <div class="bs-table-left-wrapper">
    <span class="bs-table-left-title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  }
}
</script>
<style scoped lang="scss">
.bs-table-left-wrapper {
  display: flex;
  align-items: center;
  .bs-table-left-title {
    display: inline-block;
    line-height: 32px;
    height: 32px;
    min-width: 100px;
    padding: 0 16px;
    background: var(--hightlight-color);
    font-size: 14px;
    color: #2e3133;
    text-align: left;
  }
  &::after {
    width: 0;
    height: 0;
    border: 15px solid transparent;
    border-bottom-width: 20px;
    border-left-color: var(--hightlight-color);
    content: '';
  }
}
</style>
