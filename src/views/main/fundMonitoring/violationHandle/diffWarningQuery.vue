<template>
  <component :is="isSxProject" />
</template>
<script>
import projectView from '@/views/main/fundMonitoring/violationHandle/warningCreate/warningQuery.vue'
import SxProjectView from '@/views/main/fundMonitoring/violationHandle/warningCreateSx/warningQuery.vue'
export default {
  components: {
    projectView,
    SxProjectView
  },
  computed: {
    isSxProject() {
      if (this.transJson(this.$store.state.curNavModule?.param5 || '').project === 'sx') {
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
