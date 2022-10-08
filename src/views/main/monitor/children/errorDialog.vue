<!--监控规则函数管理新增页面弹框-->
<template>
  <vxe-modal
    v-model="dialogVisible"
    :title="title"
    width="80%"
    height="60%"
    :show-footer="false"
    @close="dialogClose"
  >
    <div>
      {{ errorMsg }}
    </div>
  </vxe-modal>
</template>
<script>

export default {
  name: 'ErrorDialog',
  components: {
  },
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    errorMsg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: true
    }
  },
  methods: {
    dialogClose() {
      this.$parent.errorDialogVisible = false
    }
  },
  watch: {
  },
  created() {
  },
  mounted() {
  }
}
</script>
<style lang="scss">
</style>
