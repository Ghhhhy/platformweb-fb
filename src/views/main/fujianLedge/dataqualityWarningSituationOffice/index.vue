<template>
  <DirectReport
    title="数据质量预警情况表_分处室"
    :open-search="false"
    :request-payload="{ reportCode: 'sjzlyjqkb_fcs' }"
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
