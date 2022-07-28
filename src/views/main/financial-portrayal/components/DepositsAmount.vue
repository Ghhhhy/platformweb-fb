<template>
  <div>
    <div class="amount-item">
      <div class="amount-left">
        <span class="label">库款余额</span>
        <span class="number">45,128,391.42</span>
      </div>
      <i class="line"></i>
      <div class="amount-right">
        <span class="label">去年同期</span>
        <span class="number">45,128,391.42</span>
      </div>
    </div>
    <div class="amount-item">
      <div class="amount-left">
        <span class="label">库款保障倍数</span>
        <span class="number">5.19</span>
      </div>
      <i class="line"></i>
      <div class="amount-right">
        <span class="label">去年同期</span>
        <span class="number">3.15</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({

})
</script>

<style lang="scss" scoped>
.amount-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #F8F8F8;
  padding: 9px 16px;
  margin-top: 16px;
  box-sizing: border-box;
  .amount-right {
    .label,
    .number {
      width: 100%;
      text-align: right;
    }
  }

  .line {
    display: inline-block;
    width: 1px;
    height: 32px;
    box-sizing: border-box;
    background:#D8D8D8;
  }

  .amount-left,
  .amount-right {
    width: 50%;
    font-size: 14px;
    color: #666666;

    .label,
    .number {
      display: block;
    }
    .label {
      line-height: 24px;
    }
    .number {
      display: inline-block;
      font-family: var(--font-family-hyt);
      font-size: 20px;
      color: #021330;
      line-height: 24px;
      margin-top: 4px;
    }
  }

}
</style>
