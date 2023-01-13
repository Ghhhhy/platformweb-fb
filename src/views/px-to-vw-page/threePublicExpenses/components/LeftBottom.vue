<template>
  <div class="module-wrapper left-bottom ignore-px-to-vw">
    <RuleScroll
      :title="title"
      :fetch="getLatestData"
    />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import RuleScroll from './RuleScroll'
import { getLatestData } from '@/api/frame/main/threePublicExpenses/index.js'

export default defineComponent({
  components: { RuleScroll },
  setup() {
    return {
      title: '"三公"规则实时预警情况',
      getLatestData
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../../common/style/module-wrapper";
.left-bottom {
  width: 100%;
  height: 388px;
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
