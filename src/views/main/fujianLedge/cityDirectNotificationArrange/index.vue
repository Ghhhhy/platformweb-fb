<template>
  <DirectReport
    title="市直达通报表（含地方安排）"
    :open-search="false"
    :request-payload="{ reportCode: 'szdtb_hdfap' }"
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
