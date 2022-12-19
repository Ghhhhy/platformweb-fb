<template>
  <DirectReport
    title="中央直达资金接收情况展示表"
    :open-search="true"
    :request-payload="{ reportCode: 'zyzdzjjsqkzsb' }"
  />
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import DirectReport from '../directReport/index.vue'

export default defineComponent({
  components: { DirectReport },
  setup() {
    return {
      // fiscalYear: store.state.userInfo.year
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
