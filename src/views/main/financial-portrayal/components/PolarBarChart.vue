<template>
  <div
    :id="chartId"
    class="bar-chart"
    :style="{ width: chartWidth, height: chartHeight }"
  >
  </div>
</template>

<script>
import { defineComponent, watch } from '@vue/composition-api'
import DetailTitleVue from './DetailTitle.vue'
import { usePolarBarChart } from '../hooks/usePolarBarChart'
export default defineComponent({
  props: {
    chartWidth: {
      type: String,
      default: '200px'
    },
    chartHeight: {
      type: String,
      default: '254px'
    },
    option: {
      type: Object,
      default: () => {
        return { title: { text: '' }, customLegend: [] }
      }
    }
  },
  components: {
    DetailTitleVue
  },
  setup(props, { root }) {
    const echarts = root.$echarts
    const getRandom = (digit = 6) => {
      return String(Math.random()).split('.')[1].substring(2, digit + 2)
    }
    const chartId = `barChart${getRandom()}`
    const { setOption } = usePolarBarChart(echarts, {
      selecterId: chartId
    })

    watch(() => props.option, (newOption) => {
      setOption?.(newOption)
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
  top: 16px;
  left: 16px;
  z-index: 5;
}
</style>
