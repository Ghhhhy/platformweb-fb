<template>
  <div :class="option.length <= 1 ? 'last-budget-item' : 'adjust-budget-item'">
    <div
      v-for="item in option"
      :key="item.title"
      style="display: flex;
      justify-content: space-evenly;
      flex-direction: column;"
    >
      <div class="amount-title">
        {{ item.title }}
      </div>
      <span
        :style="{ color: item.color }"
      >{{ item.value }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    option: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup() {
  }
})
</script>

<style lang="scss" scoped>
.last-budget-item {
    font-weight: 400;
    font-size: 27px;
    width: 175px;
    height: 64px;
    margin-left: 23px;
    background: #F8F8F8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 16px;
  }
.amount-title {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #666666;
      line-height: 24px;
      font-weight: 400;
}
span {
  font-family: var(--font-family-hyt);
  font-size: 20px;
}
.adjust-budget-item {
  font-weight: 400;
  font-size: 27px;
  width: 358px;
  height: 64px;
  background: #F8F8F8;
  display: flex;
  justify-content:space-around;
  position: absolute;
  top: 117px;
  left: 17px
}
</style>
