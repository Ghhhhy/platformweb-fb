<template>
  <div class="nav-wrapper">
    <div class="nav-item">
      <div class="top-title">
        <span :class="['circle', { 'circle-exceed': activeNav > 0, 'circle-actived': activeNav === 0 }]"></span>
        <span :class="['main-title', { actived: activeNav === 0 }]" @click="navClick(0)">区域基本情况</span>
      </div>
      <div :class="['bottom-detail', { actived: activeNav > 0 }]">
      </div>
    </div>
    <div class="nav-item">
      <div class="top-title">
        <span :class="['circle', { 'circle-exceed': activeNav > 1, 'circle-actived': activeNav === 1 }]"></span>
        <span :class="['main-title', { actived: activeNav === 1 }]" @click="navClick(1)">财政运行情况</span>
      </div>
      <div :class="['bottom-detail', { actived: activeNav > 1 }]">
        <span :class="['detail-title', { actived: activeNav === 1 && activeNavChid === 0 }]" @click="navClick(1, 0)">财政收支</span>
        <span :class="['detail-title', { actived: activeNav === 1 && activeNavChid === 1 }]" @click="navClick(1, 1)">收入稳健指数</span>
        <span :class="['detail-title', { actived: activeNav === 1 && activeNavChid === 2 }]" @click="navClick(1, 2)">支出结构指数</span>
        <span :class="['detail-title', { actived: activeNav === 1 && activeNavChid === 3 }]" @click="navClick(1, 3)">预算管理</span>
        <span :class="['detail-title', { actived: activeNav === 1 && activeNavChid === 4 }]" @click="navClick(1, 4)">运行保障</span>
        <span :class="['detail-title', { actived: activeNav === 1 && activeNavChid === 5 }]" @click="navClick(1, 5)">直达资金</span>
      </div>
    </div>
    <div class="nav-item">
      <div class="top-title">
        <span :class="['circle', { 'circle-exceed': activeNav > 2, 'circle-actived': activeNav === 2 }]"></span>
        <span :class="['main-title', { actived: activeNav === 2 }]" @click="navClick(2)">政府债务情况</span>
      </div>
      <div :class="['bottom-detail', { actived: activeNav > 2 }]">
      </div>
    </div>
    <div class="nav-item">
      <div class="top-title">
        <span :class="['circle', { 'circle-exceed': activeNav > 3, 'circle-actived': activeNav === 3 }]"></span>
        <span :class="['main-title', { actived: activeNav === 3 }]" @click="navClick(3)">社会保险情况</span>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    activeNav: {
      type: Number,
      default: 1
    },
    activeNavChid: {
      type: Number,
      default: 0
    }
  },
  setup(_, { emit }) {
    const navClick = (parentIndex, childIndex) => {
      emit('navClick', { parentIndex, childIndex: childIndex })
    }
    return {
      navClick
    }
  }
})
</script>

<style lang="scss" scoped>
.nav-wrapper {
  position: fixed;
  top: 265px;
  right: 0;
  width: 166px;
  .nav-item {
    font-size: 14px;

    .top-title {
      display: flex;
      align-items: center;
      .main-title {
        line-height: 24px;
        cursor: pointer;
        &.actived {
          font-size: 16px;
          color: #2A8BFD;
          font-weight: 500;
        }
      }
      .circle {
        display: inline-block;
        width: 9px;
        height: 9px;
        margin-right: 12px;
        border-radius: 50%;
        background: #FFFFFF;
        border: 1px solid rgba(217,217,217,1);
        &.circle-exceed {
          border-color: #2A8BFD;
        }
        &.circle-actived {
          border-color: #2A8BFD;
          background: #2A8BFD;
        }
      }
    }

    .bottom-detail {
      border-left: 1px solid #D9D9D9;
      padding: 12px 0 12px 30px;
      margin-left: 5px;
      box-sizing: border-box;

      &.actived {
        border-left-color: #2A8BFD;
      }
      .detail-title {
        display: block;
        padding: 4px 0;
        font-size: 14px;
        line-height: 24px;
        color: #595959;
        cursor: pointer;
        &.actived {
          color: #2A8BFD;
        }
      }
    }
  }
}
</style>
