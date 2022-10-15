<template>
  <DirectReport
    title="直达资金结转分资金"
    :open-search="false"
    :request-payload="{ reportCode: 'zdzjjzfzj' }"
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
