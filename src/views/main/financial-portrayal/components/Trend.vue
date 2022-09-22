<template>
  <div class="gdp-speed-item" :style="containerStyle">
    <div :style="valueStyle">
      <span
        class="gdp-speed-item-num"
        :class="customColor ? '' : trendType"
        :style="{ color: customColor }"
      >
        {{ option.value }}
      </span>
      <svg-icon
        v-if="showIcon"
        :name="`ratio-${trendType}`"
        size="17"
      />
    </div>
    <span
      class="gdp-speed-item-type"
      :style="valueStyle"
    >
      {{ option.label }}
    </span>
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'
export default defineComponent({
  props: {
    option: {
      type: Object,
      default: () => {
        return { label: '', value: '' }
      }
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
    // 趋势类型（上升/下降 => up/dowm）
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
    const trendType = computed(() => {
      return parseInt(props.option?.value) < 0 ? 'down' : 'up'
    })
    return {
      containerStyle,
      valueStyle,
      trendType
    }
  }
})
</script>

<style lang="scss" scoped>
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
      font-weight: bold;
      color: #4CC494;
      line-height: 18px;

      &.up {
        color: #4CC494 !important;
      }

      &.down {
        color: #EA6E5E  !important;
      }
    }
    &-type {
      font-size: 14px;
      color: #8C8C8C;
    }
  }
</style>
