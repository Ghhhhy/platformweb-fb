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
            <!--            <TreeScollLoad />-->
            <BsBossTree
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
            />
          </div>
          <div class="tree">
            <BsBossTree
              ref="stampTree"
              v-loading="showLoadingRight"
              :visible="true"
              :datas="stampTreeData"
              empty-text="暂无数据"
              :is-need-root="false"
              :is-checkbox="true"
              :defaultexpandedkeys="['0']"
              :is-show-input="true"
              :open-loading="true"
              treeid="regulationCode"
              :nodecheckmethod="nodecheckmethod"
            />
          </div>
        </div>
      </template>
    </BsMainFormListLayout>
  </div>
</template>

<script>
import HttpModule from '@/api/frame/main/fundMonitoring/ManageMofDepProRelation.js'
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
      // this.userTreeData = data
      HttpModule.queryTableDatas().then(res => {
        this.stampTreeData = res.data
        // this.$nextTick(() => {
        //   // 重新赋值
        //   this.userTreeData = []
        //   this.userTreeData = this.stampTreeData
        // })
        this.showLoadingRight = false
      }).catch(() => {
        this.showLoadingRight = false
      })
    },
    treeNodeClick(obj) {
      this.userSelect = obj
      const param = {
        userId: obj.id
      }
      HttpModule.queryByUserId(param).then(res => {
        let array = []
        res.data.forEach(item => {
          array.push(item.regulationCode)
        })
        this.proArray = array
        // console.log('array', array)
        // console.log('array', this.$refs.stampTree)
        this.$refs.stampTree.setCheckedKeys(array)
        // if (array.length > 0) {
        //   this.$nextTick(() => {
        //     this.$refs.stampTree.treeOptionFn().setCheckedKeys(array)
        //   })
        // }
        console.log('array1', this.$refs.stampTree)
      })
    },
    nodecheckmethod(obj, state) {
      // if (obj.regulationCode === '0' || obj.regulationCode === '01' || obj.regulationCode === '02') {
      //   this.$message.warning('根节点不能被选中！')
      //   this.$refs.stampTree.setCheckedKeys(this.proArray)
      //   return
      // }
      if (this.userSelect.id) {
        let isChecked = state.checkedKeys.includes(obj.proCode)
        var param = {
          mofDepId: this.userSelect.id,
          manageMofDepProRelation: state.checkedNodes
            .map(item => {
              return { proCode: item.code, proName: item.name }
            })
        }
        HttpModule.update(param).then(res => {
          if (res.code === '000000') {
            this.$message.success(isChecked ? '授权成功' : '取消授权成功')
          } else {
            this.treeNodeClick(this.userSelect)
            this.$message.error(res.result)
          }
        })
      } else {
        this.$message.warning('请选择用户！')
      }
    },
    // 获取处室树
    getDep() {
      const param = {
        data: this.$store.state.userInfo.year
      }
      HttpModule.getTreewhere(param).then(res => {
        let result = res
        if (result.data.length) {
          this.userTreeData = this.treeFormat(result.data)
          this.onUserTreeLoadFinish(this.data)
        }
      })
    },
    // 格式化树形结构
    treeFormat(treeArray) {
      treeArray.forEach(item => {
        this.$set(item, 'children', [])
        this.$set(item, 'id', item.guid)
        this.$set(item, 'label', item.code + '-' + item.name)
      })
      return treeArray
    }
  },
  mounted() {
    this.init()
  },
  created() {
    this.getDep()
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
