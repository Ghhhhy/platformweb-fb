<template>
  <el-drawer
    size="50%"
    :visible.sync="isVisible"
    class="preview"
    @close="close"
  >
    <div slot="title">{{ title }}</div>
    <div id="PreviewCptId"></div>
  </el-drawer>
</template>

<script>
export default {
  name: 'PrintPreview',
  data() {
    return {
      isVisible: false,
      userInfo: {},
      menuId: '',
      tokenid: '',
      roleguid: ''
    }
  },
  props: {
    title: {
      type: String,
      default: '凭证预览'
    },
    visible: {
      type: Boolean,
      default: false
    },
    guid: {
      type: String,
      default: ''
    },
    // cpt名字
    cpt: {
      type: String,
      default: 'zzzp'
    }
  },
  methods: {
    close() {
      this.$emit('onClose')
      this.isVisible = false
      this.$emit('update:visible', this.isVisible)
    },
    checkReport() {
      let url = this.$gloableToolFn.getReportUrl()
      document.getElementById('PreviewCptId').innerHTML = '<iframe frameborder=no width=100% height=100% src="' + url + '/fine-report/boss/ReportServer?reportlet=' + this.cpt + '.cpt&id=' + this.guid +
        '&x=1' + '&menuguid=' + this.menuId +
        '&roleguid=' + this.roleguid + '&tokenid=' + this.tokenid + '&userguid=' + this.userInfo.guid + '&fiscal_year=' + this.userInfo.year + '&mof_div_code=' + this.userInfo.province +
        '"' + '></iframe>'
    }
  },
  mounted() {

  },
  watch: {
    visible: {
      handler(newValue) {
        this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
        this.roleguid = this.$store.state.curNavModule.roleguid
        this.menuId = this.$store.state.curNavModule.guid
        this.userInfo = this.$store.state.userInfo
        this.isVisible = newValue
        this.$emit('update:visible', newValue)
        if (newValue === true) {
          setTimeout(this.checkReport, 10)
        }
      }
    }
  }
}

</script>
<style lang="scss">
.preview{
  #PreviewCptId{
    height: 100%;
  }
}
</style>
