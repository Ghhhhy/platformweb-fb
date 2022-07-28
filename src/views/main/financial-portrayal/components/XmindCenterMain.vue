<template>
  <div class="xmind-center-main">
    <svg-icon
      name="main-node-bg"
      class-name="main-node-bg-icon"
    />
    <div class="main-node-content">
      <div class="circle-label-container incom-container">
        <div class="circle-label income-circle">收入</div>
        <svg-icon
          name="circle-line"
          class-name="circle-line-icon income-circle-line-icon"
        />
      </div>
      <i class="link-line"></i>
      <div class="financial-container">
        <span class="financial-text">财政</span>
      </div>
      <i class="link-line"></i>
      <div class="circle-label-container expend-container">
        <svg-icon
          name="circle-line"
          class-name="circle-line-icon expend-circle-line-icon"
        />
        <div class="circle-label expend-circle">支出</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.xmind-center-main {
  position: relative;
  width: 172px;

  .main-node-bg-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 284px;
    width: 172px;
    transform: translate(-49%, -50%);
    z-index: 1;
  }

  .main-node-content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  .circle-label-container {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .circle-label {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      border: 1px solid rgba(99,149,250,1);
      border-radius: 50%;
      font-size: 16px;
      color: #595959;
      background: #FFFFFF;
      font-weight: bold;
      box-sizing: border-box;

      &::before {
        position: absolute;
        display: inline-block;
        top: -5px;
        left: -5px;
        width: 68px;
        height: 68px;
        border: 1px dashed rgba(99,149,250,1);
        border-radius: 50%;
        box-sizing: border-box;
        content: '';
      }
    }
    .circle-line-icon {
      position: absolute;
      top: 50%;
      width: 46px;
      transform: translateY(-50%);
    }

    .income-circle-line-icon {
      left: calc(50% + 40px);
    }

    .expend-circle-line-icon {
      left: calc(50% - 85px);
      margin-top: -10px;
      transform: rotate(180deg);
    }
  }

  .link-line {
    display: block;
    height: 40px;
    width: 0;
    border-left: 1px solid #475C91;
    margin: 16px 0;
  }

  .financial-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 82px;
    height: 82px;
    border-radius: 50%;
    border: 1px dashed rgba(99,149,250,1);
    background: #FFFFFF;
    box-sizing: border-box;
    box-shadow: 0 5px 14px 4px rgba(99,149,250, 1);

    .financial-text {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 73px;
      height: 73px;
      border-radius: 50%;
      border: 1px solid rgba(99,149,250,1);
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      background: #5B8FF9;
      box-sizing: border-box;
    }
  }
}
</style>
