<template>
  <DirectReport
    title="省级配套直达资金分配情况"
    :open-search="false"
    :request-payload="{ reportCode: 'sjptzdzjfpqk' }"
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
