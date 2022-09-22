<template>
  <div class="homeMainDialog">
    <el-dialog
      title="选择数据"
      :visible.sync="showVisible"
      width="50%"
      center
      @close="close"
    >
      <div class="option-line-group">
        <div class="fn-inline option-line-group-btn">
          <vxe-button code="reset" @click="close">取 消</vxe-button>
          <vxe-button status="primary" @click="comfirm">保 存</vxe-button>
        </div>
      </div>
      <div class="fmc-left-tree">
        <BsBossTree
          ref="menuTree"
          :is-server="true"
          :visible="true"
          :tree-data="[]"
          empty-text="暂无数据"
          :is-show-input="true"
          :is-checkbox="true"
          :server-uri="treeUrl"
          :queryparams="onePanelQueryparams"
          :defaultcheckedkeys="defaultcheckedkeys"
          :open-loading="true"
          :nodecheckmethod="nodeCheckMethod"
          :afterloadmethod="afterloadMethod"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MenuModule from '@/api/frame/common/menu.js'
export default {
  name: 'HomeMainDialog',
  data() {
    return {
      menuguids: [],
      defaultcheckedkeys: [],
      defaultKeys: [],
      showVisible: true,
      treeUrl: '/mp-b-perm-service/v1/menu/collecttree',
      onePanelQueryparams: { // 树的参数
        condition: { type: 'collectMenu', appguid: this.$store.state.userInfo.app.guid }
      }
    }
  },
  methods: {
    nodeCheckMethod(obj, checksObj) {
      this.menuguids = []
      if (checksObj.checkedNodes !== undefined) {
        checksObj.checkedNodes.forEach(v => {
          let menuInfo = {}
          if (v.children === undefined) {
            menuInfo['menuguid'] = v.guid.split('_')[0]
            menuInfo['roleguid'] = v.roleguid
            this.menuguids.push(menuInfo)
          }
        })
      }
    },
    afterloadMethod(data) {
      let self = this
      self.defaultcheckedkeys = []
      self.$parent.containCollect.forEach(v => {
        self.defaultcheckedkeys.push(v.guid + '_' + v.roleguid)
      })
      // self.$refs.menuTree.setCurrentNodeByKey(self.defaultcheckedkeys)
    },
    close() {
      this.showVisible = false
      this.$parent.showHomeMainDialog = false
    },
    comfirm() {
      let self = this
      let userInfo = self.$store.state.userInfo
      let params = {
        menuguid: this.menuguids,
        type: 'batch',
        userguid: userInfo.guid,
        year: userInfo.year,
        province: userInfo.province,
        appguid: userInfo.app.guid
      }
      MenuModule.saveCollectionMenu(params).then(res => {
        var result = JSON.parse(res)
        if (result && result.result) {
          this.close()
          self.$parent.getCollectionMenu()
        } else {
          self.$message(result.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.homeMainDialog {
  .fmc-left-tree {
    height: 60vh;
  }
}

</style>
