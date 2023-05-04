<template>
  <div class="module-wrapper left-bottom ignore-px-to-vw">
    <RuleScroll
      :title="title"
      :fetch="getLatestData"
      :payload="payload"
    />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import RuleScroll from './RuleScroll'
import { getLatestData } from '@/api/frame/main/threePublicExpenses/index.js'
import { RegulationClassEnum } from '@/views/px-to-vw-page/common/model/enum.js'

export default defineComponent({
  components: { RuleScroll },
  setup() {
    // 请求参数
    const payload = { regulationClass: RegulationClassEnum.THREE_PUBLIC_EXPENSES }

    return {
      title: '"三公"规则实时预警情况',
      getLatestData,
      payload
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../../common/style/module-wrapper";
.left-bottom {
  width: 100%;
  height: 396px;
  background: #fff;

  /deep/.el-empty__image {
    height: 110px;
  }
  /deep/.el-empty__description {
    margin-top: 20px;
    p {
      font-size: 14px;
    }
  }
  /deep/.rule-swiper-title {
    padding: 16px 24px;
  }
}
</style>
