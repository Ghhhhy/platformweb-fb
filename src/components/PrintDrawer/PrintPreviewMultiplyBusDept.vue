<template>
  <el-drawer
    size="50%"
    :visible.sync="isVisible"
    class="preview"
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
    <div id="PreviewCptId"></div>
  </el-drawer>
</template>

<script>
import { proconf } from './PrintPrawerMultiply.js'
export default {
  name: 'PrintPreview',
  data() {
    return {
      toolBarStatusBtnConfig: {
        changeBtns: true,
        buttons: proconf.toolBarStatusButtonBusDept,
        curButton: {
          type: 'button',
          iconName: 'base-zhibaio.png',
          iconNameActive: 'base-zhibaio-active.png',
          iconUrl: '',
          label: '支付申请书',
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
        label: '支付申请书',
        code: '1',
        curValue: '1'
      },
      toolBarStatusSelect: {
        type: 'button',
        iconName: 'base-zhibaio.png',
        iconNameActive: 'base-zhibaio-active.png',
        iconUrl: '',
        label: '支付申请书',
        code: '1',
        curValue: '1'
      },
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
    guids: {
      type: Array,
      default() {
        return []
      }
    },
    dzCpt: {
      type: String,
      default: ''
    },
    // cpt名字
    cpt: {
      type: String,
      default: 'payVoucherInputByBusDept'
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
    // 新增成功后切换状态按钮
    onAddSuccess() {
      this.$refs.tabPanel.initTabStatusBtnConfig()
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
      document.getElementById('PreviewCptId').innerHTML = src
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
          setTimeout(this.checkReport(this.cpt), 10)
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
