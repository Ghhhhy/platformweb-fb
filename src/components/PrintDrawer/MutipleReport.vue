<template>
  <el-drawer size="50%" :visible.sync="isVisible" class="print" @close="close">
    <div slot="title">{{ title }}</div>
    <BsTabPanel
      ref="tabPanel"
      :show-zero="false"
      :tab-status-btn-config="toolBarStatusBtnConfig"
      :is-open="false"
      :is-hide-query="true"
    />
    <div id="MutipleCptId"></div>
  </el-drawer>
</template>

<script>
import { proconf } from './MutipleReport.js'
export default {
  name: 'BsMutipleReport',
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
          label: '额度通知单',
          code: '1',
          curValue: '1'
        },
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
        }
      },
      toolBarStatusSelect: {
        type: 'button',
        iconName: 'base-zhibaio.png',
        iconNameActive: 'base-zhibaio-active.png',
        iconUrl: '',
        label: '额度通知单',
        code: '1',
        curValue: '1'
      },
      userInfo: {},
      menuId: '',
      toeknid: '',
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
    // 是否走工作流，陕西走，吉林不走
    isWorkFlow: {
      type: Boolean,
      default: true
    },
    // CPT类型 额度通知单  清算额度通知单
    cptType: {
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
    // 切换状态栏
    onStatusTabClick(obj) {
      if (!obj.type) {
        return
      }
      this.toolBarStatusSelect = obj
      if (this.cptType === 'czsqzfedtzd') {
        switch (obj.curValue) {
          case '1': // 额度通知单报表
            this.checkReport('czsqzfedtzd')
            break
          case '2': // 额度通知单明细报表
            this.checkReport('czsqzfedmxtzd')
            break
          case '3': // 额度列表报表
            this.checkReport('sqzfedlb')
            break
        }
      } else {
        switch (obj.curValue) {
          case '1': // 额度通知单报表
            this.checkReport('czsqzfhzqsedtzd')
            break
          case '2': // 额度通知单明细报表
            this.checkReport('czsqzfedmxtzd')
            break
          case '3': // 额度列表报表
            this.checkReport('sqqsedlb')
            break
        }
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
      document.getElementById('MutipleCptId').innerHTML = src
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
        this.tokenid = this.$store.getters.getLoginAuthentication.tokenid
        this.roleguid = this.$store.state.curNavModule.roleguid
        this.menuId = this.$store.state.curNavModule.guid
        this.userInfo = this.$store.state.userInfo
        this.isVisible = newValue
        this.$emit('update:visible', newValue)
        if (newValue === true) {
          this.$refs.tabPanel.initTabStatusBtnConfig()
          if (this.cptType === 'czsqzfedtzd') {
            this.toolBarStatusBtnConfig.buttons = proconf.toolBarStatusButton
            setTimeout(this.checkReport('czsqzfedtzd'), 10)
          } else {
            this.toolBarStatusBtnConfig.buttons = proconf.toolBarStatusButtons
            setTimeout(this.checkReport('czsqzfhzqsedtzd'), 10)
          }
        }
      }
    }
  }
}
</script>
<style lang="scss">
  .print {
    #MutipleCptId {
      height: 500px;
    }
  }
</style>
