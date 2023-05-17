<template>
  <div class="three-guarantees-expenditure-overview">
    <header class="three-guarantees-expenditure-header">{{ menuName }}</header>
    <main class="main-content">
      <div class="module-top">
        <LeftCenter :overview-type="overviewType" />
        <CenterBottom v-if="overviewType !== '3'" />
        <RightCenter :overview-type="overviewType" />
      </div>
      <div class="module-center">
        <LeftTop />
        <RightTop />
      </div>
      <div class="module-right">
        <RightBottom />
      </div>
    </main>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import LeftCenter from './components/LeftCenter'
import LeftTop from './components/LeftTop'
import CenterBottom from './components/CenterBottom'
import RightTop from './components/RightTop'
import RightCenter from './components/RightCenter'
import RightBottom from './components/RightBottom'
import store from '@/store'

import { RegulationClassEnum } from '@/views/px-to-vw-page/common/model/enum.js'
export default defineComponent({
  components: {
    LeftTop,
    LeftCenter,
    CenterBottom,
    RightTop,
    RightCenter,
    RightBottom
  },
  setup() {
    /**
     * 获取数据
     * @return {Promise<void>}
     */
    async function transJson() {
      let str = store.state.curNavModule.param5
      var params = str.split(',')
      var result = {}
      if (params && params.length > 0) {
        for (var i = 0; i < params.length; i++) {
          var map = params[i].split('=')
          result[map[0]] = map[1]
        }
      }
      overviewType.value = result.overviewType
    }
    const overviewType = ref('')
    transJson(store.state.curNavModule.param5)
    const menuName = ref(store.state.curNavModule.name)
    return {
      RegulationClassEnum,
      overviewType,
      menuName
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
    min-height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .module-top,
  .module-center,
  .module-right {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
  }

  .module-center {
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
/deep/.vxe-table .vxe-body--column.col--selected:not(.col--checked) {
  -webkit-box-shadow: inset 0 0 0 2px #4d77e7 !important;
  box-shadow: inset 0 0 0 2px #4d77e7 !important;
}
/deep/.vxe-table .vxe-body--row.row--current {
  background-color: #eaeffc !important;
}
/deep/.vxe-table .vxe-table--body tr:hover {
  background-color: #eaeffc !important;
}
/deep/.vxe-table.border--default .vxe-table--header-wrapper, /deep/.vxe-table.border--full .vxe-table--header-wrapper, /deep/.vxe-table.border--outer .vxe-table--header-wrapper {
  background: #d4def9 !important;
  box-shadow: 1px 0 0 #d4def9 !important;
}
</style>
<style>
.three-guarantees-expenditure {
  --font-family-hyt: 站酷庆科黄油体;
}
</style>
