<!--用户印章授权 gyl-->
<template>
  <div style="height:100%">
    <!-- <TreeScollLoad /> -->
    <BsMainFormListLayout>
      <template v-slot:topTap> topTap </template>
      <template v-slot:topTabPane></template>
      <template v-slot:query></template>
      <template v-slot:mainTree>
      </template>
      <template v-slot:mainForm>
        <div style="height:100%">
          <div class="tree">
            <TreeScollLoad />
            <!-- <BsBossTree
              ref="userTree"
              v-loading="showLoadingLeft"
              :visible="true"
              :datas="userTreeData"
              empty-text="暂无数据"
              :is-need-root="false"
              :is-show-input="true"
              :clickmethod="treeNodeClick"
              :open-loading="true"
              :defaultexpandedkeys="['0']"
            /> -->
          </div>
          <div class="tree">
            <BsBossTree
              ref="stampTree"
              v-loading="showLoadingRight"
              :visible="true"
              :datas="stampTreeData"
              empty-text="暂无数据"
              :is-need-root="false"
              :is-show-input="true"
              :open-loading="true"
              :is-checkbox="true"
              :nodecheckmethod="nodecheckmethod"
              :defaultexpandedkeys="['0','01','02']"
            />
          </div>
        </div>
      </template>
    </BsMainFormListLayout>
  </div>
</template>

<script>
import HttpModule from '@/api/frame/main/fundMonitoring/userProRelation.js'
export default {
  name: 'UserProRelation',
  data() {
    return {
      showLoadingLeft: false,
      showLoadingRight: false,
      userTreeData: [],
      stampTreeData: [],
      proArray: [],
      userSelect: {}
    }
  },
  methods: {
    aaa(obj, checksObj) {
      console.log(obj, checksObj)
    },
    init() {
    },
    onUserTreeLoadFinish(data) {
      this.userTreeData = data
      HttpModule.queryTableDatas().then(res => {
        this.stampTreeData = res.data
        this.$nextTick(() => {
          // 重新赋值
          this.userTreeData = []
          this.userTreeData = this.stampTreeData
        })
        this.showLoadingRight = false
      }).catch(() => {
        this.showLoadingRight = false
      })
    },
    treeNodeClick(obj) {
      this.userSelect = obj
      const param = {
        userId: obj.guid
      }
      HttpModule.queryByUserId(param).then(res => {
        let array = []
        res.data.forEach(item => {
          array.push(item.proCode)
        })
        this.proArray = array
        this.$refs.stampTree.setCheckedKeys(array)
      })
    },
    nodecheckmethod(obj, state) {
      // if (obj.proCode === '0' || obj.proCode === '01' || obj.proCode === '02') {
      //   this.$message.warning('根节点不能被选中！')
      //   this.$refs.stampTree.setCheckedKeys(this.proArray)
      //   return
      // }
      if (this.userSelect.id) {
        let isChecked = state.checkedKeys.indexOf(obj.proCode) > -1
        var param = {
          userId: this.userSelect.id,
          proCode: obj.proCode,
          proName: obj.proName
        }
        if (isChecked) {
          HttpModule.insert(param).then(res => {
            if (res.code === '000000') {
              this.$message.success('success')
            } else {
              this.$message.error(res.result)
            }
          })
        } else {
          HttpModule.delete(param).then(res => {
            if (res.code === '000000') {
              this.$message.success('success')
            } else {
              this.$message.error(res.result)
            }
          })
        }
      } else {
        this.$message.warning('请选择用户！')
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style scoped>
.tree{
  float:left;
  height:100%;
  width:50%
}
</style>
