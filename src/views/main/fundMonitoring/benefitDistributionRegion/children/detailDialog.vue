<!--
 * @Author: hupengcheng 1286335855@qq.com
 * @Date: 2023-10-20 16:59:41
 * @LastEditors: hupengcheng 1286335855@qq.com
 * @LastEditTime: 2023-10-20 17:06:10
 * @FilePath: \platformweb-fb\src\views\main\fundMonitoring\benefitDistributionRegion\children\detailDialog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <vxe-modal v-model="detailVisible" v-loading="tableLoading" :title="title" @close="dialogClose">
      <!-- <BsTable
        ref="mainTableRef"
        :table-columns-config="tableColumnsConfig"
        :table-data="tableData"
        :pager-config="pagerConfig"
        :footer-config="footerConfig"
      /> -->
    </vxe-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>
