<template>
  <div class="boss-tree_test">
    <BsBossTree
      ref="testTree"
      is-need-root
      is-show-input
      open-loading
      is-checkbox
      :is-server="true"
      :datas="treeData"
      :server-uri="serverUri"
      :queryparams="queryparams"
      :afterloadmethod="afterloadmethod"
      :check-change="checkChange"
      :nodecheckmethod="nodecheckmethod"
    />
  </div>
  </div>
</template>

<script>
import TreeModule from '@/api/frame/common/tree/unitTree'
export default {
  name: 'TreeTest',
  props: '',
  data() {
    return {
      treeData: [],
      serverUri: 'fiscal-config/queryTreeAssistData',
      queryparams: {
        useRight: false,
        batchno: 2,
        datatype: 5,
        eleCode: 'DEPBGTECO',
        sxspecroleguid: '637B6D5A823F459AB313CBF94C87765B'
      },
      afterloadmethod: this.onAfterloadmethod,
      checkChange: this.onCheckChange,
      nodecheckmethod: this.onNodecheckmethod,
      clickmethod: this.onClickmethod,
      initLoad: true
    }
  },
  components: {

  },
  mounted() {
    // this.loadTree()
  },
  methods: {
    loadTree() {
      const params = {
        type: 2
      }
      TreeModule.testTree(params).then(res => {
        this.treeData = res.data
      })
    },
    onAfterloadmethod(data) {
      // console.log(77, data)
      // this.$refs.testTree.setFirstChildNode() //默认勾选第一条
    },
    onCheckChange(obj, isChecked, ischildChecked) {
      // console.log(11, obj, isChecked, ischildChecked)
      if (!this.initLoad) {
        console.log(22, obj.id)
      }

      if (this.initLoad) {
        if (isChecked) {
          console.log(11, obj.id)
          this.initLoad = false
        }
      }
    },
    onNodecheckmethod(data, checksObj) {
      // console.log(12, data, checksObj)
    },
    onClickmethod(obj, node, vess) {
      // console.log(13, obj, node, vess)
    }
  },
  watch: {

  }
}
</script>
<style lang="scss" scoped>
.boss-tree_test{
    margin: 0 auto;
    width: 300px;
    height: 600px;
    background-color: gray;
}
</style>>
