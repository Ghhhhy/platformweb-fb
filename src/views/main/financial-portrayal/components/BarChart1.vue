<template>
  <div class="bar-chart-container">
    <div class="detail-title-wrapper">
      <DetailTitle
        :title="option.detailTitle"
        :show-dot="option.showDot"
        :unit="option.unit"
      />
    </div>
    <div v-if="option.customLegend" class="custom-legend" :style="position">
      <div
        v-for="item in option.customLegend"
        :key="item.color"
        class="legend-item"
      >
        <i :style="{ background: item.color }"></i>
        <span>{{ item.label }}</span>
      </div>
    </div>
    <div
      :id="chartId"
      class="bar-chart"
      :style="{ width: chartWidth, height: chartHeight }"
    >
    </div>
  </div>
</template>

<script>
import { defineComponent, watch } from '@vue/composition-api'
import DetailTitle from './DetailTitle'
import { useBarChart } from '../hooks/useBarChart'
export default defineComponent({
  props: {
    chartWidth: {
      type: String,
      default: 'calc(100% - 2px)'
    },
    chartHeight: {
      type: String,
      default: 'calc(100% - 2px)'
    },
    option: {
      type: Object,
      default: () => {
        return { title: { text: '' }, customLegend: [] }
      }
    },
    // 自定义legend位置
    position: {
      type: Object,
      default: () => {
        return { top: '48px', left: '16px' }
      }
    }
  },
  components: {
    DetailTitle
  },
  setup(props, { root }) {
    const echarts = root.$echarts
    const getRandom = (digit = 6) => {
      return String(Math.random()).split('.')[1].substring(2, digit + 2)
    }
    const chartId = `barChart${getRandom()}`
    const { setOption } = useBarChart(echarts, {
      selecterId: chartId
    })

    watch(() => props.option, (newOption) => {
      setOption?.(newOption || {})
    }, { deep: true })

    return {
      chartId,
      setOption
    }
  }
})
</script>

<style lang="scss" scoped>
.bar-chart-container {
  position: relative;
  flex: 1;
  height: 100%;
}
.custom-legend {
  position: absolute;
  top: 48px;
  left: 16px;
  display: flex;
  align-items: center;
  z-index: 1;

  .legend-item {
    display: flex;
    align-items: center;
    margin-right: 16px;
    i {
      width: 6px;
      height: 10px;
      margin-right: 6px;
    }
    span {
      font-size: 12px;
      color: #8C8C8C;
      border-radius: 0;
    }
  }
}

.detail-title-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  padding: 16px 16px 0 16px;
  box-sizing: border-box;
  width: 80%;
  z-index: 5;
}
</style>
