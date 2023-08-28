<template>
  <component :is="isSxProject" />
</template>
<script>
import projectView from '@/views/main/fundMonitoring/violationHandle/warningCreate/warningCreate.vue'
import SxProjectView from '@/views/main/fundMonitoring/violationHandle/warningCreateSx/warningCreate.vue'
export default {
  components: {
    projectView,
    SxProjectView
  },
  computed: {
    isSxProject() {
      if (this.$store.getters.isSx) {
        return 'SxProjectView'
      }
      return 'projectView'
    }
  },
  methods: {
    transJson(str) {
      if (!str) return
      var params = str.split(',')
      var result = {}
      if (params && params.length > 0) {
        for (var i = 0; i < params.length; i++) {
          var map = params[i].split('=')
          result[map[0]] = map[1]
        }
      }
      return result
    }
  }
}
</script>
<style lang="less" scoped>
</style>
