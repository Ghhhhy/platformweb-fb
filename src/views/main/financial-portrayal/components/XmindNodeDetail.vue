<template>
  <div :class="['xmind-node-detail', `arrow-${info.arrowPosition}`]">
    <svg-icon name="node-info-arrow" class-name="node-detail-arrow" :style="{ color: info.color }" />
    <div class="node-info" :style="{ borderColor: info.color }">
      <span v-if="showCurrentLabel" class="info-title">{{ info.label }}</span>
      <span
        v-for="(item, key) in (info.detail || [])"
        :key="key"
        class="info-item"
      >{{ item.label }}：{{ formatterValue(item) }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { formatterThousands } from '@/utils/thousands'
export default defineComponent({
  props: {
    info: {
      type: Object,
      default: () => ({ arrowPosition: 'right', color: '#475C91' })
    },
    showCurrentLabel: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const formatterValue = (item) => {
      return item.label.endsWith('占比') ? `${item.value}%` : formatterThousands(item.value)
    }
    return {
      formatterValue
    }
  },
  methods: {
    formatterThousands
  }
})
</script>

<style lang="scss" scoped>
.arrow-left {
  display: flex;
  align-items: center;
  .node-detail-arrow {
    margin-right: -12px;
  }
}

.arrow-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  .node-detail-arrow {
    margin-bottom: -12px;
    transform: rotate(90deg);
  }
}

.arrow-right {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  .node-detail-arrow {
    margin-left: -12px;
    transform: rotate(180deg);
  }
}

.arrow-bottom {
  display: flex;
  flex-direction: column;
  flex-direction: column-reverse;
  align-items: center;
  .node-detail-arrow {
    margin-top: -12px;
    transform: rotate(-90deg);
  }
}

.xmind-node-detail {
  display: flex;
  width: 169px;
  margin-bottom: 4px;
}
.node-info {
  padding: 3px 10px;
  width: 100%;
  border: 1px dashed rgba(71,92,145,1);
  border-radius: 7px;
  background: #FFFFFF;
  box-sizing: border-box;
  .info-item,
  .info-title {
    display: block;
    font-size: 12px;
    line-height: 20px;
    font-weight: 400;
    color: #2E3133;
  }
  .info-item {
    font-weight: 500;
  }
}
.node-detail-arrow {
  font-size: 30px;
}
</style>
