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
            <div class="title">
              <span style="font-size: 14px;font-weight: bold;margin-top: 7px;">处室列表</span>
            </div>
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
            <div class="title">
              <span style="font-size: 14px;font-weight: bold;margin-top: 7px;">资金列表</span>
            </div>
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
              :accordion="accordion"
              treeid="code"
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
        mofDepId: obj.id
      }
      HttpModule.queryByMofDepId(param).then(res => {
        let array = []
        if (res.code === '000000') {
          res.data && (array = this.flatData(res.data))
          // res.data.forEach(item => {
          //   array.push(item.code)
          // })
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
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 只有子级code才需要传入到setTree里面的列表里面
    flatData(axiosTreeItemList) {
      if (!Array.isArray(axiosTreeItemList)) return
      let codeMap = {}
      function cursionCodeNeddPush(axiosListItem, treeNode) {
        for (let i = 0; i < treeNode.length; i++) {
          const treeItem = treeNode[i]
          if (treeItem.children && treeItem.children.length) {
            cursionCodeNeddPush(axiosListItem, treeItem.children)
          } else {
            if (axiosListItem.code === treeItem.code) {
              codeMap[axiosListItem.code] = axiosListItem.code
              return
            }
          }
        }
      }
      axiosTreeItemList.forEach(item => {
        cursionCodeNeddPush(item, this.stampTreeData)
      })
      return Object.keys(codeMap)
    },
    nodecheckmethod(obj, state) {
      // if (obj.regulationCode === '0' || obj.regulationCode === '01' || obj.regulationCode === '02') {
      //   this.$message.warning('根节点不能被选中！')
      //   this.$refs.stampTree.setCheckedKeys(this.proArray)
      //   return
      // }
      if (this.userSelect.id) {
        let isChecked = state.checkedKeys.includes(obj.code)
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
        this.$message.warning('请选择处室！')
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
    },
    accordion: { // 是否每次只打开一个同级树节点展开
      type: true
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
