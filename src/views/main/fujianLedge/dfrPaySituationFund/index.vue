<template>
  <DirectReport
    title="中央直达资金支出情况_分资金"
    :open-search="false"
    :request-payload="{ reportCode: 'zyzdzjzcqk_fzj' }"
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
