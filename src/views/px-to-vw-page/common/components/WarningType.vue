<template>
  <div style="display: flex; align-items: center; justify-content: center">
    <svg-icon
      :name="value === WarnTypeEnum.GREEN ? 'warning-green' : 'warning-red'"
      class-name="warning-type-icon"
    />
    <span>{{ value === WarnTypeEnum.GREEN ? '正常' : '预警' }}</span>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { WarnTypeEnum } from '../model/enum'

export default defineComponent({
  props: {
    value: {
      type: [String, Number],
      default: WarnTypeEnum.GREEN
    }
  },
  setup() {
    return {
      WarnTypeEnum
    }
  }
})
</script>

<style lang="scss" scoped>
.warning-type-icon {
  font-size: 14px;
  margin-right: 8px;
}
</style>
