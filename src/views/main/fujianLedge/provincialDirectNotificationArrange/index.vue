<template>
  <DirectReport
    title="全省直达通报表（含地方安排）"
    :open-search="false"
    :request-payload="{ reportCode: 'qszdtb_hdfap' }"
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
