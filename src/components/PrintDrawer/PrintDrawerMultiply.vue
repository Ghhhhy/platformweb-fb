<template>
  <el-drawer
    size="50%"
    :visible.sync="isVisible"
    class="print"
    @close="close"
  >
    <div slot="title">{{ title }}</div>
    <BsTabPanel
      ref="tabPanel"
      :show-zero="false"
      :tab-status-btn-config="toolBarStatusBtnConfig"
      :is-open="false"
      :is-hide-query="true"
    />
    <div id="ReportCptId"></div>
    <div v-if="isWorkFlow" style="float:right;margin:10px 10px 0 0">
      <vxe-button @click="doPrint">打印(到下一岗)</vxe-button>
      <vxe-button @click="close">取消</vxe-button>
    </div>
  </el-drawer>
</template>

<script>
import { proconf } from './PrintDrawerMultiply.js'
export default {
  name: 'BsPrintDrawer',
  data() {
    return {
      isVisible: false,
      toolBarStatusBtnConfig: {
        changeBtns: true,
        buttons: proconf.toolBarStatusButton,
        curButton: {
          type: 'button',
          iconName: 'base-zhibaio.png',
          iconNameActive: 'base-zhibaio-active.png',
          iconUrl: '',
          label: '转账支票单',
          code: '1',
          curValue: '1'
        },
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
        }
      },
      toolBarStatus: {
        type: 'button',
        iconName: 'base-zhibaio.png',
        iconNameActive: 'base-zhibaio-active.png',
        iconUrl: '',
        label: '转账支票单',
        code: '1',
        curValue: '1'
      },
      toolBarStatusSelect: {
        type: 'button',
        iconName: 'base-zhibaio.png',
        iconNameActive: 'base-zhibaio-active.png',
        iconUrl: '',
        label: '转账支票单',
        code: '1',
        curValue: '1'
      },
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
    guids: {
      type: Array,
      default() {
        return []
      }
    },
    // cpt名字
    cpt: {
      type: String,
      default: 'zzzp'
    },
    dzCpt: {
      type: String,
      default: ''
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
    // 切换状态栏
    onStatusTabClick(obj) {
      if (!obj.type) {
        return
      }
      this.toolBarStatusSelect = obj
      switch (obj.curValue) {
        case '1': // 转账支票
          this.checkReport(this.cpt)
          break
        case '2': // 电汇单
          this.checkReport(this.dzCpt)
          break
      }
    },
    checkReport(cpt) {
      let sqlIn = ''
      for (let index = 0; index < this.guids.length; index++) {
        switch (index) {
          case 0:
            sqlIn = this.guids[index] + '\','
            break
          case this.guids.length - 1:
            sqlIn = sqlIn + '\'' + this.guids[index]
            break
          default:
            sqlIn = sqlIn + '\'' + this.guids[index] + '\','
            break
        }
      }
      if (this.guids.length === 1) {
        sqlIn = this.guids[0]
      }
      let url = this.$gloableToolFn.getReportUrl() + '/fine-report/boss/ReportServer?reportlet=' + cpt + '.cpt&id=' + sqlIn + '&x=1' + '&menuguid=' + this.menuId +
        '&roleguid=' + this.roleguid + '&tokenid=' + this.tokenid + '&userguid=' + this.userInfo.guid + '&fiscal_year=' + this.userInfo.year + '&mof_div_code=' + this.userInfo.province
      let src = '<iframe frameborder=no width=100% height=100% src=' + url + '></iframe>'
      document.getElementById('ReportCptId').innerHTML = src
    },
    // 新增成功后切换状态按钮
    onAddSuccess() {
      this.$refs.tabPanel.initTabStatusBtnConfig()
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
        let self = this
        this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
        this.roleguid = this.$store.state.curNavModule.roleguid
        this.menuId = this.$store.state.curNavModule.guid
        this.userInfo = this.$store.state.userInfo
        this.isVisible = newValue
        this.$emit('update:visible', newValue)
        if (newValue === true) {
          self.toolBarStatusBtnConfig.curButton = self.toolBarStatus
          self.onAddSuccess()
          setTimeout(this.checkReport(this.cpt), 10)
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
