<template>
  <DirectReport
    title="中央直达资金省级分配情况"
    :open-search="false"
    :request-payload="{ reportCode: 'zyzdzjsjfpqk' }"
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
