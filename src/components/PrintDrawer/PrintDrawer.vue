<template>
  <el-drawer
    size="50%"
    :visible.sync="isVisible"
    class="print"
    @close="close"
  >
    <div slot="title">{{ title }}</div>
    <div id="ReportCptId"></div>
    <div v-if="isWorkFlow" style="float:right;margin:10px 10px 0 0">
      <vxe-button @click="doPrint">打印(到下一岗)</vxe-button>
      <vxe-button @click="close">取消</vxe-button>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'BsPrintDrawer',
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
      default: '凭证打印'
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
    },
    // 是否走工作流，陕西走，吉林不走
    isWorkFlow: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    close() {
      this.$emit('onClose')
      this.isVisible = false
      this.$emit('update:visible', this.isVisible)
    },
    checkReport() {
      let url = this.$gloableToolFn.getReportUrl() + '/fine-report/boss/ReportServer?reportlet=' + this.cpt + '.cpt&id=' + this.guid + '&x=1' + '&menuguid=' + this.menuId +
        '&roleguid=' + this.roleguid + '&tokenid=' + this.tokenid + '&userguid=' + this.userInfo.guid + '&fiscal_year=' + this.userInfo.year + '&mof_div_code=' + this.userInfo.province
      document.getElementById('ReportCptId').innerHTML = '<iframe frameborder=no width=100% height=100% src="' + url + '"' + '></iframe>'
    },
    doPrint() {
      this.$confirm('此操作将打印凭证', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('print')
        this.close()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消打印'
        })
      })
    }
  },
  mounted() {

  },
  watch: {
    visible: {
      handler(newValue) {
        this.isVisible = newValue
        this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
        this.roleguid = this.$store.state.curNavModule.roleguid
        this.menuId = this.$store.state.curNavModule.guid
        this.userInfo = this.$store.state.userInfo
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
.print{
  #ReportCptId{
    height: 500px;
  }
}
</style>
