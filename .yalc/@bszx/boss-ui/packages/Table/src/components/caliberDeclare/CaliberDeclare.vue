<template>
  <vxe-modal
    v-model="state"
    resize
    width="45%"
    height="60%"
    transfer
    title="口径说明"
    :show-footer="false"
  >
    <div class="caliber-wrappper">
      <!--提供插槽自定义显示-->
      <slot></slot>
    </div>
  </vxe-modal>
</template>

<script>
export default {
  props: {
    // 弹窗显隐外部控制状态
    visible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  model: {
    prop: 'visible',
    event: 'change'
  },
  computed: {
    // 本组件弹窗显隐
    state: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('change', value)
      }
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.caliber-wrappper {
  padding: 16px 26px;
  font-size: 14px;
  color: #333;
  box-sizing: border-box;
  .caliber-top-title {
    margin-bottom: 16px;
  }
  .caliber-item {
    display: flex;
    align-items: flex-start;
    padding: 8px 0;
    &-label {
      font-weight: bold;
      color: #222;
    }
  }
}
</style>
