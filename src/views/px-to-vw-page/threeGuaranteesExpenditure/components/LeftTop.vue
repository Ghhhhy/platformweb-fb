<template>
  <div class="module-wrapper module-left-top">
    <p class="module-title">“三保”整体情况</p>
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
        <svg-icon :name="item.bg" class-name="item-detail-bg" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import { overallSituation } from '@/api/frame/main/threeGuaranteesExpenditure/index.js'
import { getUnit } from '../../common/utils'

const iconPrefix = 'three-guarantees-expenditure-'
export default defineComponent({
  setup() {
    const dataSource = ref([
      { name: '预算数', value: 0, field: 'budgetAmount', icon: `${iconPrefix}icon-1`, bg: `${iconPrefix}bg-1`, unit: '元' },
      { name: '可执行数', value: 0, field: 'executionsAmount', icon: `${iconPrefix}icon-2`, bg: `${iconPrefix}bg-2`, unit: '元' },
      { name: '执行数', value: 0, field: 'executableAmount', icon: `${iconPrefix}icon-3`, bg: `${iconPrefix}bg-3`, unit: '元' },
      { name: '核算数', value: 0, field: 'accountingAmount', icon: `${iconPrefix}icon-4`, bg: `${iconPrefix}bg-4`, unit: '元' }
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
  height: 402px;
  padding: 16px 24px 24px;
  box-sizing: border-box;

  .module-title {
    padding: 0;
    margin-bottom: 12px;
  }

  .module-detail-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    .item-detail {
      position: relative;
      width: 275px;
      height: 138px;
      padding-left: 30px;
      margin-top: 24px;
      box-sizing: border-box;
      overflow: hidden;
      background: transparent;

      &-content {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 100%;
        z-index: 3;
      }

      &-label {
        margin-bottom: 8px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #fff;
      }

      &-value,
      &-unit{
        font-size: 28px;
        color: #fff;
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
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 30px;
        z-index: 2;
      }

      &-bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      }
    }
  }
}
</style>
