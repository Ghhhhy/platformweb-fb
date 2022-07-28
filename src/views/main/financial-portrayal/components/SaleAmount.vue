<template>
  <div class="sale-amount">
    <div v-if="showRatio" class="ratio-container">
      <!-- 联调时需要根据上升、下降切换图标和值的类名down-color、up-color -->
      <svg-icon name="ratio-down2" size="32" />
      <span class="ratio down-color">16.73%</span>
    </div>
    <SpecificNumber v-bind="$props" />
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'
import SpecificNumber from './SpecificNumber.vue'
import { formatterThousands, parseThousands } from '@/utils/thousands'
export default defineComponent({
  props: {
    lastValue: {
      type: [String, Number],
      default: '9999999.99'
    },
    currentValue: {
      type: [String, Number],
      default: '9999999.99'
    },
    showRatio: {
      type: Boolean,
      default: true
    }
  },
  components: {
    SpecificNumber
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
.ratio-container {
  display: flex;
  align-items: center;
  margin: 36px 0 8px;

  .ratio {
    font-size: 18px;
    font-family: var(--font-family-hyt);
    font-weight: var(--font-weight-title);
  }
  .down-color {
    margin-left: 8px;
    color: #EA6E5E;
  }

  .up-color {
    color: #4CC494;
  }
}

</style>
