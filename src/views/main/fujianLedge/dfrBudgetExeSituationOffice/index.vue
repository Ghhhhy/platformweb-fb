<template>
  <DirectReport
    title="直达资金预算执行情况表_处室"
    :open-search="false"
    :request-payload="{ reportCode: 'zdzjyszxqk_cs' }"
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
