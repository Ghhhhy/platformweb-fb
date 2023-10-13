<template>
  <vxe-modal
    v-model="visible"
    :title="title"
    :z-index="9999"
    width="80%"
    height="80%"
    position="center"
    :show-footer="false"
    :destroy-on-close="true"
    @close="closeAddDialog"
  >
    <div id="projectId" style="height:100%"></div>
  </vxe-modal>
</template>
<script>
import store from '@/store/index'
export default {
  name: 'ProjectPreview',
  props: {
    dialogVisible: {
      type: Boolean,
      default: true
    },
    proGuid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      title: '项目信息',
      visible: this.dialogVisible
    }
  },
  methods: {
    checkReport() {
      console.log(document.getElementById('projectId'), window?.gloableToolFn)
      let url = `${window.gloableToolFn.serverGatewayMap.getProjectUrl || window.location.origin}/ProjectDetailIframe?isShowHead=0&tokenid=${store.getters.getLoginAuthentication.tokenid}&appguid=ystztj&proGuid=${this.proGuid}`
      // let url = 'http://10.76.56.90:8080/#/ProjectDetailIframe?proGuid=793B35742C2345E49430717031FA4E8B&tokenid=12793c2489c3bbe1010ed461c0dfd7eb&isShowHead=0&appguid=ystztj'
      let src = '<iframe frameborder=no width=100% height=100% src=' + url + '></iframe>'
      console.log('访问地址：', url)
      if (document.getElementById('projectId')) {
        document.getElementById('projectId').innerHTML = src
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
        this.$emit('update:dialogVisible', newValue)
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
