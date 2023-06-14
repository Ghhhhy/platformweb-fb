<template>
  <vxe-modal
    v-model="visible"
    :title="title"
    :z-index="9999"
    width="96%"
    height="90%"
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
    },
    mofDivCode: {
      type: String,
      default: ''
    },
    clickRowData: {
      type: Object,
      default: () => {
        return {}
      }
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
      let originUrl = window.gloableToolFn?.getProjectUrl?.length > 0 ? window.gloableToolFn?.getProjectUrl : window.location.origin
      const { tokenid } = store.getters.getLoginAuthentication
      const { year, province } = store.state.userInfo
      let url = ''
      if (province?.slice(0, 4) === '3502') {
        url = `${originUrl}/?type=iframe&year=${year}&appguid=fiscal&queryGuid=${this.proGuid}&intoMenu=projectDetails&mofDivCode=${this.mofDivCode}&tokenid=${tokenid}#/projectDetails`
      } else if (province?.slice(0, 2) === '22') { // 吉林
        const { agencyId = '', proCode = '' } = this.clickRowData
        url = `${originUrl}/boss/project/demo/proCommonView.html?agency_id=${agencyId}&pro_code=${proCode}&tokenid=${tokenid}`
      } else {
        url = `${originUrl}/ProjectRefineIframe?isShowHead=0&tokenid=${tokenid}&appguid=fiscal&proGuid=${this.proGuid}`
      }
      let src = '<iframe frameborder=no width=100% height=100% src=' + url + '></iframe>'
      if (document.getElementById('projectId')) {
        document.getElementById('projectId').innerHTML = src
      }
    },
    closeAddDialog() {
      this.visible = false
      this.$emit('update:dialogVisible', false)
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
