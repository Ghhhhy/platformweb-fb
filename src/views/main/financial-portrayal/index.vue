<template>
  <div
    class="financial-page-wrapper"
  >
    <!-- 搜索区 -->
    <HeaderSearch
      :default-date="defaultDate"
      :default-mof-div-code="defaultMofDivCode"
      :cur-component-name="curComponentName"
      @input="treeSelectChange"
      @dateChange="dateChangeHandle"
      @search="setReqSearchParams"
      @reset="resetReqSearchParams"
      @tabChange="tabChange"
    />
    <!-- 顶部占位 -->
    <!--<div class="placehold-header-search"></div>-->
    <!-- title -->
    <!--<div class="financial-title">-->
    <!--  <span class="financial-title-text">陕西省XX市XX县财政画像</span>-->
    <!--</div>-->
    <div
      class="financial-content-container"
      :style="{ paddingRight: currentRenderComponent.value === 'FinancialOperation' ? '176px' : 0 }"
    >
      <!--tab切换动态渲染-->
      <component
        :is="currentRenderComponent.value"
        :data-title="currentRenderComponent.label"
        class="nav"
      />
    </div>
    <div class="right-target-link">
      <RightNav
        :active-nav="activeNav"
        :active-nav-chid="activeNavChid"
        :current-render-component="currentRenderComponent"
        @navClick="navClick"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, provide, ref, unref, computed } from '@vue/composition-api'
import BaseInfo from './components/BaseInfo'
import GovernmentDebtIndicators from './components/GovernmentDebtIndicators'
import SocialSecurity from './components/SocialSecurity'
import FinancialOperation from './components/FinancialOperation.vue'
import RightNav from './components/RightNav.vue'
import HeaderSearch from './components/HeaderSearch'

import { useRightNav } from './hooks/useRightNav'
import { moduleTabs } from './model/data'
// import { useComputedChartWidth } from './hooks/useComputedChartWidth'
import { useHeaderSearch } from './hooks/useHeaderSearch'
// import { useOnResizeScale } from './hooks/useOnResizeScale'
export default defineComponent({
  components: {
    BaseInfo,
    GovernmentDebtIndicators,
    SocialSecurity,
    FinancialOperation,
    RightNav,
    HeaderSearch
  },
  setup() {
    const curComponentName = ref(moduleTabs[0].value)
    // 顶部tab切换
    const tabChange = (componentName) => {
      curComponentName.value = componentName
    }
    const currentRenderComponent = computed(() => {
      return moduleTabs.find(item => item.value === unref(curComponentName))
    })

    // useComputedChartWidth(currentRenderComponent)

    const { navClick, activeNav, activeNavChid } = useRightNav(currentRenderComponent)
    // 主要是给水球图优化，未可视区内设置为死水
    provide('currentRenderComponent', currentRenderComponent)

    // 顶部搜索模块
    const {
      defaultDate,
      defaultMofDivCode,
      reqSearchParams,
      treeSelectChange,
      dateChangeHandle,
      setReqSearchParams,
      resetReqSearchParams
    } = useHeaderSearch()
    // 提供顶部搜索参数供子孙组件监听变化后请求数据
    provide('reqSearchParams', reqSearchParams)

    // 监听窗口resize
    // useOnResizeScale()

    return {
      navClick,
      activeNav,
      activeNavChid,
      curComponentName,
      tabChange,
      currentRenderComponent,
      defaultDate,
      defaultMofDivCode,
      treeSelectChange,
      dateChangeHandle,
      setReqSearchParams,
      resetReqSearchParams
    }
  }
})
</script>

<style lang="scss" scoped>
.placehold-header-search {
  width: 100%;
}
.financial-title {
  padding-top: 90px;

  .financial-title-text {
    display: block;
    font-size: 22px;
    color: #595959;
    letter-spacing: 0;
    text-align: center;
    line-height: 34px;
    font-weight: 600;
  }
}
.financial-page-wrapper {
  padding: 90px 48px 16px 48px;
}
.financial-content-container {
  width: 100%;
  box-sizing: border-box;
}
</style>
<style lang="scss">
.financial-page-wrapper {
  --chart-theme: #6395FA;
  --font-weight-title: 500;
  --font-family-hyt: 站酷庆科黄油体;
}
</style>
