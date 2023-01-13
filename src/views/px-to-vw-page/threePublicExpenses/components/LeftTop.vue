<template>
  <div class="module-wrapper module-left-top">
    <p class="module-title">“三公”整体情况</p>
    <div class="module-detail-wrapper">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="item-detail"
      >
        <span class="item-detail-label">{{ item.name }}</span>
        <div class="item-detail-value-wrapper">
          <span class="item-detail-value">{{ item.value }}</span>
          <span class="item-detail-unit">万元</span>
        </div>
        <svg-icon :name="item.icon" class-name="item-detail-icon" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import { formatterThousands } from '@/utils/thousands.js'
import { overallSituation } from '@/api/frame/main/threePublicExpenses/index.js'

const iconPrefix = 'three-public-expenses-left-top-'
export default defineComponent({
  setup() {
    const data = ref([
      { name: '年初预算数', value: 0, field: 'beginningBudgetAmount', icon: `${iconPrefix}1` },
      { name: '调整预算数', value: 0, field: 'adjustedBudgetAmount', icon: `${iconPrefix}2` },
      { name: '执行数', value: 0, field: 'executionsAmount', icon: `${iconPrefix}3` }
    ])

    /**
     * 接口获取整体情况
     */
    async function overallSituationRequest() {
      const { data } = await overallSituation()
      data.value.forEach(item => {
        item.value = data[item.field] ? formatterThousands(data[item.field]) : 0
      })
    }
    overallSituationRequest()

    return {
      data
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../../common/style/module-wrapper";
.module-left-top {
  padding: 16px 24px;

  .module-title {
    padding: 0;
  }

  .module-detail-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .item-detail {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 180px;
      min-height: 96px;
      padding: 18px 16px;
      margin-top: 14px;
      border-radius: 2px;
      box-sizing: border-box;
      box-shadow: 0 0 10px 0 rgba(0,0,0,0.14);
      overflow: hidden;

      &-label {
        margin-bottom: 8px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #999999;
      }

      &-value,
      &-unit{
        font-size: 28px;
        color: #000000;
      }

      &-value {
        font-family: var(--font-family-hyt);
        font-weight: bold;
      }

      &-unit {
        font-size: 14px;
        margin-left: 8px;
      }

      &-icon {
        position: absolute;
        bottom: -8px;
        right: -2px;
        font-size: 50px;
      }
    }
  }
}
</style>
