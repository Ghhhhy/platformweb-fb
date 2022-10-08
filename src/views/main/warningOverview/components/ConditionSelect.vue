<template>
  <el-select
    v-model="curValue"
    value-key="value"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-option
      v-for="(item, index) in option"
      :key="index"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  props: {
    option: {
      type: [Array],
      default: () => []
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  setup(props, { emit }) {
    const curValue = computed({
      get() {
        return props.value
      },
      set(val) {
        emit('update:value', val)
      }
    })
    return {
      curValue
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
