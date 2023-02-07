<template>
  <div class="three-guarantees-expenditure-overview">
    <header class="three-guarantees-expenditure-header">“三公”经费监控总览</header>
    <main class="main-content">
      <div class="module-left">
        <LeftTop />
        <LeftCenter />
        <LeftBottom />
      </div>
      <div class="module-center">
        <Map :regulation-class="RegulationClassEnum.THREE_PUBLIC_EXPENSES" />
        <CenterBottom />
      </div>
      <div class="module-right">
        <RightTop />
        <RightCenter />
        <RightBottom />
      </div>
    </main>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Map from '@/views/px-to-vw-page/common/components/Map'
import LeftTop from './components/LeftTop'
import LeftCenter from './components/LeftCenter'
import LeftBottom from './components/LeftBottom'
import CenterBottom from './components/CenterBottom'
import RightTop from './components/RightTop'
import RightCenter from './components/RightCenter'
import RightBottom from './components/RightBottom'

import { RegulationClassEnum } from '@/views/px-to-vw-page/common/model/enum.js'

export default defineComponent({
  components: {
    Map,
    LeftTop,
    LeftCenter,
    LeftBottom,
    CenterBottom,
    RightTop,
    RightCenter,
    RightBottom
  },
  setup() {
    return {
      RegulationClassEnum
    }
  }
})
</script>

<style lang='scss' scoped>
.three-guarantees-expenditure-overview {
  width: 100%;
  min-height: 100%;
  padding: 0 24px 16px;
  box-sizing: border-box;

  .three-guarantees-expenditure-header {
    height: 56px;
    padding: 12px 0 10px;
    font-size: 22px;
    color: #595959;
    line-height: 34px;
    font-weight: bold;
    text-align: center;
    box-sizing: border-box;
  }

  .main-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .module-left,
  .module-center,
  .module-right {
    width: 624px;
    height: 100%;
  }

  .module-center {
    padding: 0 16px;
    box-sizing: border-box;
  }

  .module-title {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #595959;
    letter-spacing: 0;
    line-height: 26px;
    font-weight: 500;
    box-sizing: border-box;
  }
}
</style>
