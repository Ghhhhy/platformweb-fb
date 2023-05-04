<template>
  <div class="sale-amount">
    <SpecificNumber
      class="mgt30"
      :title="currentTitle"
      :value="currentValue1"
    />
    <div v-if="showRatio" class="ratio-container">
      <!-- 联调时需要根据上升、下降切换图标和值的类名down-color、up-color -->
      <svg-icon :name="ratio < 0 ? 'ratio-down1' : 'ratio-up1'" size="32" />
      <span :class="['ratio', ratio < 0 ? 'down-color' : 'up-color']">{{ ratio }}%</span>
    </div>
    <SpecificNumber
      :title="lastTitle"
      :value="lastValue1"
    />
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
      default: 0.00
    },
    currentValue: {
      type: [String, Number],
      default: 0.00
    },
    showRatio: {
      type: Boolean,
      default: true
    },
    ratio: {
      type: Number,
      default: 0
    }
  },
  components: {
    SpecificNumber
  },
  setup(props) {
    const lastValue1 = computed(() => {
      return formatterThousands(props.lastValue).split('')
    })
    const currentValue1 = computed(() => {
      return formatterThousands(props.currentValue).split('')
    })
    const lastTitle = computed(() => {
      return '上年同期'
    })
    const currentTitle = computed(() => {
      return '本\xa0\xa0\xa0\xa0\xa0\xa0期'
    })
    return {
      lastValue1,
      currentValue1,
      lastTitle,
      currentTitle,
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
