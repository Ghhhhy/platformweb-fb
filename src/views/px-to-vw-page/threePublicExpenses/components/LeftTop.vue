<template>
  <div class="module-wrapper module-left-top">
    <p class="module-title">“三公”整体情况</p>
    <div class="module-detail-wrapper">
      <div
        v-for="(item, index) in dataSource"
        :key="index"
        class="item-detail"
      >
        <div class="item-detail-content">
          <span class="item-detail-label">{{ item.name }}</span>
          <div class="item-detail-value-wrapper">
            <span class="item-detail-value">{{ item.value }}</span>
            <span class="item-detail-unit">{{ item.unit }}</span>
          </div>
        </div>
        <svg-icon :name="item.icon" class-name="item-detail-icon" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import { overallSituation } from '@/api/frame/main/threePublicExpenses/index.js'
import { getUnit } from '../../common/utils'

const iconPrefix = 'three-public-expenses-left-top-'
export default defineComponent({
  setup() {
    const dataSource = ref([
      { name: '年初预算数', value: 0, field: 'beginningBudgetAmount', icon: `${iconPrefix}1`, unit: '元' },
      { name: '调整预算数', value: 0, field: 'adjustedBudgetAmount', icon: `${iconPrefix}2`, unit: '元' },
      { name: '执行数', value: 0, field: 'executionsAmount', icon: `${iconPrefix}3`, unit: '元' }
    ])

    /**
     * 接口获取整体情况
     */
    async function overallSituationRequest() {
      const { data } = await overallSituation()
      dataSource.value.forEach(item => {
        const { unitText, value } = getUnit(data[item.field])
        item.unit = unitText
        item.value = value || 0
      })
    }
    overallSituationRequest()

    return {
      dataSource
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../../common/style/module-wrapper";
.module-left-top {
  height: 168px;
  padding: 16px 24px;
  box-sizing: border-box;

  .module-title {
    padding: 0;
  }

  .module-detail-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .item-detail {
      position: relative;

      width: 180px;
      height: 96px;
      padding: 18px 16px;
      margin-top: 14px;
      border-radius: 2px;
      box-sizing: border-box;
      box-shadow: 0 0 10px 0 rgba(0,0,0,0.14);
      overflow: hidden;

      .item-detail-content {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 2;
      }

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
        line-height: 1;
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
