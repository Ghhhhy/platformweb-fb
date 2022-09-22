<template>
  <div class="boss-tree_test">
    <BsTreeInput
      ref="testTreeInput"
      v-model="value"
      :is-server="true"
      :datas="treeData"
      :elecode="elecode"
      :server-uri="serverUri"
      :queryparams="queryparams"
      :afterloadmethod="afterloadmethod"
      :isleaf="false"
      :prefix="prefix"
      background-color="#00000000"
      :title-config="titleConfig"
      :check-change="checkChange"
      :nodecheckmethod="nodecheckmethod"
    />
    <!-- <BsTreeInputTest
        ref="testTree"
        v-model="value2"
        :is-server="true"
        :datas="[]"
        :elecode="elecode"
        :server-uri="serverUri"
        :queryparams="queryparams"
        :afterloadmethod="afterloadmethod2"
        :isleaf="true"
        :is-edit="false"
        :prefix="prefix"
      /> -->
  </div>
</template>

<script>
export default {
  name: 'TreeTest',
  props: '',
  data() {
    return {
      initLoad: true,
      checkChange: this.onCheckChange,
      nodecheckmethod: this.onNodecheckmethod,
      titleConfig: {
        // require: true,
        tip: '政府机构树'
      },
      value: {
        test_id: '1000000000000363224',
        test_code: 3010701,
        test_name: '绩效工资'
      },
      // value: 'F99B8A7AF64BF664BE1310F7CCCB78C3##300##"非经济科目"',
      value2: 'F9FBC21B774F46BBAF7A464D53A07BB1##undefined##工资福利支出',
      prefix: 'test_',
      treeData: [],
      elecode: 'DEPBGTECO',
      serverUri: 'fiscal-config/queryTreeAssistData',
      queryparams: {
        useRight: false,
        batchno: 2,
        datatype: 5,
        eleCode: 'DEPBGTECO',
        sxspecroleguid: '637B6D5A823F459AB313CBF94C87765B'
      },
      afterloadmethod: this.onAfterloadmethod,
      afterloadmethod2: function(data) {
        // console.log(55, data)
      }
    }
  },
  components: {

  },
  mounted() {
    // this.$refs.testTreeInput.getData()
  },
  methods: {
    getTree() {
      const treeObj = this.$refs.testTreeInput.treeInputOptionFn()
      console.log(7, treeObj)
    },
    onAfterloadmethod(data) {
      console.log(77, data)
    },
    onCheckChange(obj, isChecked, ischildChecked) {
      console.log(11, obj, isChecked, ischildChecked)
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
      console.log(12, data, checksObj)
    }
  },
  watch: {
    value: {
      handler(newValue, oldValue) {
        // console.log(11, newValue)
      },
      deep: true,
      immediate: true
    },
    value2: {
      handler(newValue, oldValue) {
        // console.log(22, newValue)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
.boss-tree_test{
    margin: 0 auto;
    width: 500px;
    height: 600px;
    background-color: gray;
}
</style>>
