<template>
  <div class="financial-page-wrapper">
    <!-- 搜索区 -->
    <HeaderSearch />
    <!-- 顶部占位 -->
    <div class="placehold-header-search"></div>
    <!-- title -->
    <div class="financial-title">
      <span class="financial-title-text">陕西省XX市XX县财政画像</span>
    </div>
    <div class="financial-content-container">
      <!-- 区域基本情况 -->
      <BaseInfo class="nav" data-title="区域基本情况" />
      <!-- 财政运行情况 -->
      <FinancialOperation class="nav" data-title="财政运行情况" />
      <!-- 政府债务类指标 -->
      <GovernmentDebtIndicators class="nav" data-title="政府债务类指标" />
      <!-- 社会保险情况 -->
      <SocialSecurity class="nav" data-title="社会保险情况" />
    </div>
    <div class="right-target-link">
      <RightNav :active-nav="activeNav" :active-nav-chid="activeNavChid" @navClick="navClick" />
    </div>
  </div>
</template>

<script>
import { defineComponent, provide } from '@vue/composition-api'
import BaseInfo from './components/BaseInfo'
import GovernmentDebtIndicators from './components/GovernmentDebtIndicators'
import SocialSecurity from './components/SocialSecurity'
import FinancialPerformance from './components/FinancialPerformance'
import FinancialOperation from './components/FinancialOperation.vue'
import RightNav from './components/RightNav.vue'
import HeaderSearch from './components/HeaderSearch'

import { useRightNav } from './hooks/useRightNav'
export default defineComponent({
  components: {
    BaseInfo,
    GovernmentDebtIndicators,
    SocialSecurity,
    FinancialPerformance,
    FinancialOperation,
    RightNav,
    HeaderSearch
  },
  setup() {
    const { navClick, activeNav, activeNavChid } = useRightNav()
    // 主要是给水球图优化，未可视区内设置为死水
    provide('activeNav', activeNav)
    return { navClick, activeNav, activeNavChid }
  }
})
</script>

<style lang="scss" scoped>
.placehold-header-search {
  height: 84px;
  width: 100%;
}
.financial-title {
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
  padding: 0 224px 16px 48px;
}
.financial-content-container {
  width: 100%;
}
</style>
<style lang="scss">
.financial-page-wrapper {
  --chart-theme: #6395FA;
  --font-weight-title: 500;
  --font-family-hyt: 站酷庆科黄油体;
}
</style>
