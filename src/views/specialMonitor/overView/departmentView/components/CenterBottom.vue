<template>
  <div class="module-wrapper module-left-center">
    <p class="module-title">预警处理进度分析</p>
    <vxe-grid
      :columns="columns"
      :data="tableData"
      :height="tableHeight"
      show-overflow="tooltip"
      show-header-overflow="tooltip"
      border="full"
      auto-resize
      sync-resize
      class="chart-table"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'

import computedPx from '@/utils/computedPx'
import { WarnTypeEnum } from '../../common/model/enum'
import { treasuryComparison } from '@/api/frame/main/threeGuaranteesExpenditure/index.js'
import { useTableHeight } from '../../common/hooks/useTableHeight'

export default defineComponent({
  setup() {
    const columns = ref([
      {
        field: '',
        title: '业务处室',
        width: `${computedPx(84)}px`,
        headerAlign: 'center',
        align: 'left'
      },
      {
        field: '',
        title: '预警数',
        width: `${computedPx(204)}px`,
        headerAlign: 'center',
        align: 'right'
      },
      {
        field: '',
        title: '已处理',
        width: `${computedPx(166)}px`,
        headerAlign: 'center',
        align: 'center'
      },
      {
        field: '',
        title: '处理进度',
        width: `${computedPx(130)}px`,
        headerAlign: 'center',
        align: 'center'
      },
      {
        field: '',
        title: '拦截数',
        width: `${computedPx(166)}px`,
        headerAlign: 'center',
        align: 'right'
      },
      {
        field: '',
        title: '拦截率',
        width: `${computedPx(166)}px`,
        headerAlign: 'center',
        align: 'right'
      }
    ])

    // 表格数据
    const tableData = ref([])

    /**
     * 获取数据
     * @return {Promise<void>}
     */
    async function getTableData() {
      const { data } = await treasuryComparison()
      tableData.value = data
    }
    getTableData()

    const { tableHeight } = useTableHeight(268)

    return {
      columns,
      tableData,
      tableHeight,
      WarnTypeEnum
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../../common/style/module-wrapper";
@import "../../common/style/vxe-table-style";
.module-wrapper {
  width: 32%
}
.module-left-center {
  width: 32%;
  margin-top: 16px;
}

//.module-title {
//  padding-bottom: 14px;
//}
</style>
