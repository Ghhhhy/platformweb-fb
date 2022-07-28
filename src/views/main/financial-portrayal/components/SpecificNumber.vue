<template>
  <div>
    <div class="value-container" :style="valueWrapperStyle">
      <div class="values">
        <!-- 四个角标 -->
        <i
          v-for="(item, index) in 4"
          :key="`${index}-corner-mark`"
          class="corner-mark"
        ></i>
        <template v-for="(item, index) in realCurrentValue">
          <!-- 千分治符 -->
          <i
            v-if="item === ','"
            :key="index"
            :style="{ left: `${26 * index}px` }"
            class="thousands-unit"
          ></i>
          <!-- value -->
          <span v-else :key="index" class="place-value">{{ item }}</span>
        </template>
      </div>
      <span class="unit">亿元</span>
    </div>
    <div class="last-year">
      <div class="last-year-title">上年同期</div>
      <div class="last-year-content">
        <span class="value">{{ realLastValue }}</span>
        <span class="unit">亿元</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'
import { formatterThousands, parseThousands } from '@/utils/thousands'
export default defineComponent({
  props: {
    valueWrapperStyle: {
      type: Object,
      default: () => ({ marginBottom: '30px' })
    },
    lastValue: {
      type: [String, Number],
      default: '9999999.99'
    },
    currentValue: {
      type: [String, Number],
      default: '9999999.99'
    }
  },
  setup(props) {
    const realLastValue = computed(() => {
      return formatterThousands(props.lastValue)
    })
    const realCurrentValue = computed(() => {
      return formatterThousands(props.currentValue).split('')
    })
    return {
      realLastValue,
      realCurrentValue,
      formatterThousands,
      parseThousands
    }
  }
})
</script>

<style lang="scss" scoped>
.last-year {

  &-title {
    margin-bottom: 4px;
    text-align: center;
    font-size: 14px;
    color: #666666;
  }

  &-content {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    font-size: 16px;
    color: #666666;
    line-height: 22px;
    .value {
      font-weight: var(--font-weight-title);
    }
  }
}

.value-container {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 44px;
  padding: 0;
  margin-bottom: 30px;
  box-sizing: border-box;

  .unit {
    margin-left: 6px;
    font-size: 14px;
    color: #666;
    font-weight: var(--font-weight-title);
  }

  .values {
    position: relative;
    height: 100%;
    padding: 5px 3px 5px 5px;
    box-sizing: border-box;
    border: 1px solid rgba(99, 149, 250, 0.09);

    .place-value {
      display: inline-block;
      height: 100%;
      width: 24px;
      margin-right: 2px;
      color: #fff;
      font-size: 26px;
      line-height: 32px;
      text-align: center;
      vertical-align: middle;
      font-weight: var(--font-weight-title);
      font-family: var(--font-family-hyt);
      border-radius: 2px;
      background: linear-gradient(to bottom, var(--chart-theme) 0, var(--chart-theme) 50%, #2A8BFD 51%, #2A8BFD 100%);
    }

    .thousands-unit {
      position: absolute;
      bottom: 2px;
      width: 0;
      height: 0;
      border: 3px solid transparent;
      border-bottom-color: var(--chart-theme);
    }

    .corner-mark {
      position: absolute;
      width: 5px;
      height: 5px;
      border: 1px solid rgba(99,149,250,1);
    }

    .corner-mark:nth-of-type(1) {
      border-right-color: transparent;
      border-bottom-color: transparent;
      top: -1px;
      left: -1px;
    }

    .corner-mark:nth-of-type(2) {
      border-left-color: transparent;
      border-bottom-color: transparent;
      top: -1px;
      right: -1px;
    }

    .corner-mark:nth-of-type(3) {
      border-top-color: transparent;
      border-left-color: transparent;
      bottom: -1px;
      right: -1px;
    }

    .corner-mark:nth-of-type(4) {
      border-right-color: transparent;
      border-top-color: transparent;
      bottom: -1px;
      left: -1px;
    }
  }
}
</style>
