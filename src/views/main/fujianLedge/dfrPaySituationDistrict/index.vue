<template>
  <DirectReport
    title="中央直达资金支出情况_分地区"
    :open-search="false"
    :request-payload="{ reportCode: 'zyzdzjzcqk_fdq' }"
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
