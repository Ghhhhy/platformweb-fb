<template>
  <div class="bs-table-left-wrapper">
    <span class="bs-table-left-title">
      <span class="title">{{ title }}</span>
    </span>
    <slot></slot>
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
  justify-content: space-between;
  .bs-table-left-title {
    height: 32px;
    display: flex;
    align-items: center;
    .title {
      line-height: 32px;
      height: 32px;
      display: inline-block;
      padding: 0 16px;
      min-width: 100px;
      font-size: 14px;
      text-align: left;
      color: #555;
      background: var(--hightlight-color-hover);
    }
    &::after {
      font-size: 0;
      border-width: 16px;
      border-style: solid;
      border-color: transparent;
      width: 0px;
      height: 0px;
      border-left-width: 20px;
      border-left-color: var(--hightlight-color-hover);
      content: '';
    }
  }
}
</style>
