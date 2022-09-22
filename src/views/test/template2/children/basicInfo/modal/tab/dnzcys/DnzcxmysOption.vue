<template>
  <div class="fmc-main fmc-main-dialog">
    <div style="" class="form-datail">
      <BsForm :form-items-config="formItemsConfig" :form-data-list="formDataList" :form-config="formConfig" />
    </div>
    <div style="height:300px">
      <BsTable :edit-config="editConfig" />
    </div>
  </div>
</template>

<script>
import xhysConf from './xhysConf'
export default {
  name: '',
  components: {},
  data() {
    return {
      tem: {},
      formInitGloabalData: {}, // form表单初始化数据
      formItemsConfig: xhysConf('dnzcxmys', 'formItemsConfig'), // 表单每一条目配置
      formDataList: xhysConf('dnzcxmys', 'formDataList'), // 表单数据集
      formConfig: {}, // 表单用户配置
      editConfig: {
        trigger: 'dblclick',
        mode: 'cell'
        // activeMethod({ row, rowIndex, column, columnIndex }) {

        // }
      }
    }
  },
  methods: {},
  mounted() {},
  watch: {
    tem: {
      handler() {},
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
</style>
