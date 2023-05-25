<template>
  <vxe-modal
    v-model="visible"
    :title="title"
    z-index="9999"
    width="80%"
    height="80%"
    position="center"
    :show-footer="false"
    :destroy-on-close="true"
    @close="closeAddDialog"
  >
    <div id="BbsId" style="height:100%"></div>
  </vxe-modal>
</template>
<script>
export default {
  name: 'BBSPreview',
  props: {
    title: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: this.dialogVisible,
      param5: {}
    }
  },
  computed: {
    curNavModule() {
      // 获取当前菜单信息
      return this.$store.state.curNavModule
    }
  },
  methods: {
    checkReport() {
      console.log(document.getElementById('BbsId'), window?.gloableToolFn)
      let url = 'https://yth.czj.sh.cegn.cn/shbbs/'
      let src = '<iframe frameborder=no width=100% height=100% src=' + url + '></iframe>'
      if (document.getElementById('BbsId')) {
        document.getElementById('BbsId').innerHTML = src
      }
    },
    closeAddDialog() {
      this.visible = false
      this.$parent.addDialogVisible = false
    }
  },
  created() {
    this.$nextTick(() => {
      this.checkReport()
    })
  },
  watch: {
    visible: {
      handler(newValue) {
        this.$emit('update:visible', newValue)
      }
    }
  }
}
</script>
<style lang="scss">
#BbsId{
  height: 100%;
}
</style>
