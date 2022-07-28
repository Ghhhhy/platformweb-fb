<template>
  <div class="modelu-wrapper">
    <ModuleTitle title="财政运行情况" />
    <div class="module-chart-container">
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import ModuleTitle from './ModuleTitle'

export default defineComponent({
  components: {
    ModuleTitle
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.chart-wrapper {
  display: flex;
  flex-shrink: 0;
  width: 400px;
  height: 254px;
  margin: 0 16px 16px 0;
  background: #FFFFFF;
  border: 1px solid rgba(236,236,236,1);
  border-radius: 2px;
  box-sizing: border-box;
}
</style>
