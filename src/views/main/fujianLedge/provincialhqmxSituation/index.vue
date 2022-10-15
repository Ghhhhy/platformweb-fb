<template>
  <DirectReport
    title="全省惠企明细数据情况表"
    :open-search="false"
    :request-payload="{ reportCode: 'qshqmxsjqkb' }"
  />
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import DirectReport from '../directReport/index.vue'

export default defineComponent({
  components: { DirectReport },
  setup() {
    return {
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
