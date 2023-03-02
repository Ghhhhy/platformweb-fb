<template>
  <div class="warning-overview">
    <div class="warning-overview-body">
      <header class="warning-overview-header">陕西监控管理预警总览</header>
      <main>
        <!--顶部规则和地图-->
        <div class="warning-overview-top">
          <div class="rule-container">
            <div class="rule-use-wrapper">
              <RuleUseInfoChart />
            </div>
            <div class="rule-scroll-wrapper">
              <RuleScroll />
            </div>
          </div>
          <div class="map-and-menu">
            <Map />
            <MenuModel />
          </div>
        </div>
        <div class="warning-overview-bottom">
          <div class="do-info">
            <MonitoringHandlingInfo />
          </div>
          <div class="warning-data">
            <ViewAllRules />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Map from './components/Map'
import MenuModel from './components/MenuModel'
import RuleUseInfoChart from './components/RuleUseInfoChart'
import RuleScroll from './components/RuleScroll'
import ViewAllRules from './components/ViewAllRules'
import MonitoringHandlingInfo from './components/MonitoringHandlingInfo'
// import { useComputedChartWidth } from '@/views/main/financial-portrayal/hooks/useComputedChartWidth'
export default defineComponent({
  components: { Map, MenuModel, RuleUseInfoChart, RuleScroll, ViewAllRules, MonitoringHandlingInfo },
  setup() {
    // useComputedChartWidth(null, '.warning-overview')
    return {}
  }
})
</script>

<style lang='scss' scoped>
.warning-overview {
  padding: 0 24px 24px;
  box-sizing: border-box;
  .warning-overview-body {
    min-width: 1872px;
    margin: 0 auto;
  }
  &-header {
    padding: 12px 0 10px;
    font-size: 22px;
    color: #595959;
    line-height: 34px;
    font-weight: bold;
    text-align: center;
  }
}

.warning-overview-top {
  display: flex;
  height: 586px;

  .rule-container {
    width: 538px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 10px;

    .rule-use-wrapper,
    .rule-scroll-wrapper{
      flex-shrink: 0;
      width: 538px;
      height: 266px;
      background: #fff;
    }

    .rule-scroll-wrapper {
      height: 298px;
    }
  }

  .map-and-menu {
    display: flex;
  }
}

.warning-overview-bottom {
  display: flex;
  margin-top: 16px;

  .do-info,
  .warning-data {
    height: 298px;
    width: 924px;
  }
  .do-info {
    margin-right: 16px;
  }
}
</style>
<style>
.warning-overview {
--font-family-hyt: 站酷庆科黄油体;
}
</style>
