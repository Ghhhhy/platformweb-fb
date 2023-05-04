<template>
  <DirectReport
    title="每日通报表_中央资金"
    :open-search="false"
    :request-payload="{ reportCode: 'mrtbb_zyzj' }"
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
