<template>
  <div class="time-sequence-chart">
    <div class="current-time">
      <span>{{ currentMonth }}</span>月
      <span class="current-day-text">{{ day }}</span>日
    </div>
    <div class="time-sequence">
      <svg-icon name="time-line" class-name="time-line-icon" />
      <div class="time-sequence-value">
        <vue-arc-text
          ref="arctext"
          :text="timeSeqList"
          :arc="arcTextConfig.arc"
          :direction="arcTextConfig.direction"
          class="arc-text-wrapper"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, reactive } from '@vue/composition-api'
import VueArcText from 'vue-arc-text'
import { useTimeSequenceChart } from '../hooks/useTimeSequenceChart'
export default defineComponent({
  props: {
    day: {
      type: Number,
      default: new Date().getDate()
    }
  },
  components: { VueArcText },
  setup(props) {
    const arcTextConfig = reactive({
      arc: 1300, // 弯曲的角度
      direction: -1 // 弯曲文字的方向 （向上 -1 或 向下 1）
    })

    const { currentCurrentMonthDate, currentMonth } = useTimeSequenceChart()

    const timeSeqList = computed(() => {
      if (!props.day || props.day * 1 <= 10) {
        return currentCurrentMonthDate.value.slice(0, 19).join('&nbsp;&nbsp;')
      }
      if (props.day * 1 >= currentCurrentMonthDate.value.length - 9) {
        return currentCurrentMonthDate.value.slice(-19).join('&nbsp;&nbsp;')
      }
      return [
        ...currentCurrentMonthDate.value.slice(props.day - 10, props.day - 1),
        props.day,
        ...currentCurrentMonthDate.value.slice(props.day * 1, props.day * 1 + 9)
      ].join('&nbsp;&nbsp;')
    })
    return {
      currentCurrentMonthDate,
      timeSeqList,
      currentMonth,
      arcTextConfig
    }
  }
})
</script>

<style lang="scss" scoped>
.time-sequence-chart {
  width: 100%;
  padding-top: 73px;

  .current-time {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-bottom: 8px;
    font-size: 16px;
    color: #8C8C8C;
    font-family: var(--font-family-hyt);
  }

  .current-day-text {
    display: inline-block;
    width: 36px;
    height: 36px;
    line-height: 36px;
    margin: 0 6px;
    text-align: center;
    background: rgba(99, 149, 250, 0.13);
    border: 1px solid rgba(99, 149, 250, 0.31);
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 26px;
    color: #2E3133;
    text-align: center;
    font-weight: 400;
  }
}
.time-sequence {
  position: relative;
  width: 100%;
  height: 40px;
  .time-line-icon {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    width: 100%;
    line-height: 1;
  }
  .time-sequence-value {
    position: relative;
    width: 100%;
    height: 40px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 26px 28px 0;
    box-sizing: border-box;
  }
}
.arc-text-wrapper {
  display: flex;
  justify-content: space-between;
  color: #8C8C8C;
  font-family: var(--font-family-hyt);
  span {
    color: #8C8C8C;
  }
}
</style>
