<template>
  <div class="gdp-budget-item" :style="containerStyle">
    <span
      :style="{ color: option.color }"
    >{{ option.value }}</span>
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'
export default defineComponent({
  props: {
    option: {
      type: Object,
      default: () => {
        return { color: '', value: '' }
      }
    },
    // 趋势类型（上升/下降 => up/dowm）
    trendType: {
      type: String,
      default: 'up'
    },
    // 是否显示图标
    showIcon: {
      type: Boolean,
      default: true
    },
    // 自定义数值显示的颜色 不随trendType改变
    customColor: {
      type: String,
      default: ''
    },
    // 对其方式
    algin: {
      type: String,
      default: 'left'
    }
  },
  setup(props) {
    const containerStyle = computed(() => {
      if (props.algin === 'center') {
        return {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }
      return {}
    })
    const valueStyle = computed(() => {
      if (props.algin === 'center') {
        return {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }
      return {}
    })
    return {
      containerStyle,
      valueStyle
    }
  }
})
</script>

<style lang="scss" scoped>
.gdp-budget-item {
    font-family: var(--font-family-hyt);
    font-weight: var(--font-weight-title);
    font-size: 27px;
    margin-top: 20px
  }
</style>
