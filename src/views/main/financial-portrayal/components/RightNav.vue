<template>
  <!--支持两级. 8.4改版:一级nav改成顶部tab切换;此处目前渲染二级nav-->
  <div
    v-if="computedModuleTabs.children"
    class="nav-wrapper"
  >
    <!--一级nav-->
    <div
      v-for="(parentItem, parentIndex) in computedModuleTabs.children"
      :key="parentItem.value"
      class="nav-item"
    >
      <div class="top-title">
        <span
          :class="['circle', { 'circle-exceed': activeNav > parentIndex, 'circle-actived': activeNav === parentIndex }]"
        >
        </span>
        <span
          :class="['main-title', { actived: activeNav === parentIndex }]"
          @click="navClick(parentIndex)"
        >
          {{ parentItem.label }}
        </span>
      </div>
      <div
        v-if="parentIndex !== computedModuleTabs.children.length - 1"
        :class="['bottom-detail', { actived: activeNav > parentIndex }]"
      >
        <!--二级nav-->
        <span
          v-for="(childItem, childIndex) in parentItem.children"
          :key="childItem.value"
          :class="['detail-title', { actived: activeNav === parentIndex && activeNavChid === childIndex }]"
          @click="navClick(parentIndex, childIndex)"
        >
          {{ childItem.label }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed } from '@vue/composition-api'
import { moduleTabs } from '../model/data'
export default defineComponent({
  props: {
    // 激活的一级nav
    activeNav: {
      type: Number,
      default: 1
    },
    // 激活的二级nav
    activeNavChid: {
      type: Number,
      default: 0
    },
    // 当前所渲染的组件option： {label, value}
    currentRenderComponent: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const navClick = (parentIndex, childIndex) => {
      emit('navClick', { parentIndex, childIndex: childIndex })
    }
    // 只有财政运行情况显示
    const computedModuleTabs = computed(() => {
      return moduleTabs.find(item => item.value === props.currentRenderComponent?.value)
    })
    return {
      navClick,
      computedModuleTabs
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
