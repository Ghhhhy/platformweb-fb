<template>
  <div id="PreviewCptId" style="height:100%"></div>
</template>

<script>
// 好了
// const serverGatewayMap = window.gloableToolFn.serverGatewayMap
export default {
  beforeRouteEnter(to, from, next) {
    window.gloableToolFn.openBehaviorcollectorOld = window.gloableToolFn.openBehaviorcollector
    window.gloableToolFn.openBehaviorcollector = false
    next()
  },
  beforeRouteLeave(to, from, next) {
    window.gloableToolFn.openBehaviorcollector = window.gloableToolFn.openBehaviorcollectorOld
    next()
  },
  name: 'PrintPreview',
  data() {
    return {
      userInfo: {},
      menuId: '',
      tokenid: '',
      roleguid: '',
      cptTemp: '',
      param5: {},
      toolBarStatusButton: []
    }
  },
  computed: {
    curNavModule() {
      // 获取当前菜单信息
      return this.$store.state.curNavModule
    }
  },
  methods: {
    initParams5() {
      // 初始化param5
      let param5Str = this.curNavModule.param5
      if (param5Str && param5Str !== '') {
        let param5Strs = param5Str.split(',')
        param5Strs.forEach(s => {
          let ss = s.split('=')
          let key = ss[0]
          let value = ss[1]
          this.param5[key] = value
        })
      }
    },
    checkReport(cpt) {
      //  serverGatewayMap.gloableUrl.getReportUrl
      // this.$gloableToolFn.getReportUrl()
      let url = window.gloableToolFn.getReportUrl() + window.gloableToolFn.serverGatewayMap.production.reportServiceProxy + 'fine-report/boss/ReportServer?reportlet=' + cpt + '.cpt&x=1' + '&menuguid=' + this.menuId +
        '&roleguid=' + this.roleguid + '&tokenid=' + this.tokenid + '&userguid=' + this.userInfo.guid + '&fiscal_year=' + this.userInfo.year + '&mof_div_code=' + this.userInfo.province
      window.open(url)
      // let src = '<iframe frameborder=no width=100% height=100% src=' + url + '></iframe>'
      // if (document.getElementById('PreviewCptId')) {
      //   document.getElementById('PreviewCptId').innerHTML = src
      // }
    }
  },
  mounted() {
    this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
    this.roleguid = this.$store.state.curNavModule.roleguid
    this.menuId = this.$store.state.curNavModule.guid
    this.userInfo = this.$store.state.userInfo
    console.log('this.param5.cptname', this.param5.cptname)
    this.checkReport(this.param5.cptname)
  },
  created() {
    this.initParams5()
  },
  beforeDestroy() {
    window.gloableToolFn.openBehaviorcollector = window.gloableToolFn.openBehaviorcollectorOld
  },
  watch: {
    visible: {
      handler(newValue) {
        this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
        this.roleguid = this.$store.state.curNavModule.roleguid
        this.menuId = this.$store.state.curNavModule.guid
        this.userInfo = this.$store.state.userInfo
        this.$emit('update:visible', newValue)
        if (newValue === true) {
          setTimeout(this.checkReport(this.param5.cptname), 10) // 重新打开重新传
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
