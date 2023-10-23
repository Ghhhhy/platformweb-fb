<!--
 * @Author: hupengcheng 1286335855@qq.com
 * @Date: 2023-10-18 15:30:23
 * @LastEditors: hupengcheng 1286335855@qq.com
 * @LastEditTime: 2023-10-20 16:11:34
 * @FilePath: \platformweb-fb\src\views\main\fundMonitoring\workflowOversightManagement\children\dialog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <vxe-modal v-model="detailVisible" v-loading="tableLoading" :title="title" @close="dialogClose">
      <BsTable
        ref="mainTableRef"
        :table-columns-config="tableColumnsConfig"
        :table-data="tableData"
        :pager-config="pagerConfig"
        :footer-config="footerConfig"
      />
    </vxe-modal>
  </div>
</template>

<script lang="js">
import { post } from '@/api/http'
import { ref, defineComponent, onMounted } from '@vue/composition-api'
export default defineComponent({
  props: {
    detaildata: {
      type: Object,
      default: {}
    }
  },
  setup(props, { emit }) {
    let tableLoading = ref(true)
    let detailVisible = ref(true)
    let title = ref('当前节点处理人')
    const dialogClose = () => {
      detailVisible.value = false
      emit('close')
    }
    let footerConfig = {
      showFooter: false
    }
    let tableColumnsConfig = [
      {
        title: '当前节点处理人',
        field: 'name',
        align: 'center'
      },
      {
        title: '所属单位',
        field: 'orgname',
        align: 'center'
      },
      {
        title: '电话',
        field: 'phone',
        align: 'center'
      }
    ]
    let tableData = ref([])
    const getData = () => {
      post(BSURL.lmp_warningResultHandleRuleQueryDetail, {
        // manageMofDepId: '227DCC7BD4FA406A8D0B2E7FCD639D3C'
        manageMofDepId: props.detaildata.manageMofDepId
      }).then(res => {
        tableLoading.value = false
        if (res.code === '000000') {
          tableData.value = res.data
          pagerConfig.value.total = res.data.length
        }
      }).finally(() => {
        tableLoading.value = false
      })
    }
    let pagerConfig = ref({
      page: 1,
      pageSize: 20,
      total: 0
    })
    onMounted(() => {
      getData()
    })
    return {
      tableLoading,
      detailVisible,
      title,
      dialogClose,
      tableColumnsConfig,
      tableData,
      footerConfig,
      getData,
      pagerConfig
    }
  }
})
</script>

<style scoped>
::v-deep .vxe-modal--box {
  width: 800px;
  height: 380px;
}
::v-deep .vxe-toolbar {
  display: none;
}
</style>
