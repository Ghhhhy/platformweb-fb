<template>
  <div class="module-wrapper module-left-center">
    <p class="module-title">“三保”分类关注-分资金</p>
    <vxe-grid
      :columns="columns"
      :data="tableData"
      :height="tableHeight"
      auto-resize
      sync-resize
      show-overflow="tooltip"
      show-header-overflow="tooltip"
      border="full"
      class="chart-table"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import computedPx from '@/utils/computedPx'
import { concernsByCapital } from '@/api/frame/main/threeGuaranteesExpenditure/index.js'
import { formatterThousands } from '@/utils/thousands.js'
import { useTableHeight } from '../../common/hooks/useTableHeight'

export default defineComponent({
  setup() {
    const columns = ref([
      {
        field: 'index',
        title: '序号',
        width: `${computedPx(50)}px`,
        type: 'index',
        align: 'center',
        headerAlign: 'center'
      },
      {
        field: 'threeSafeCode',
        title: '编码',
        width: `${computedPx(90)}px`,
        align: 'left',
        headerAlign: 'center'
      },
      {
        field: 'threeSafeName',
        title: '名称',
        width: `${computedPx(97)}px`,
        align: 'left',
        headerAlign: 'center'
      },
      {
        field: 'budgetAmount',
        title: '预算数',
        width: `${computedPx(92)}px`,
        align: 'center',
        headerAlign: 'center',
        formatter: ({ cellValue }) => {
          return formatterThousands(cellValue)
        }
      },
      // {
      //   field: 'budgetProgress',
      //   title: '预算进度',
      //   width: `${computedPx(100)}px`,
      //   align: 'center',
      //   headerAlign: 'center'
      // },
      {
        field: 'executionsAmount',
        title: '执行数',
        width: `${computedPx(103)}px`,
        align: 'center',
        headerAlign: 'center',
        formatter: ({ cellValue }) => {
          return formatterThousands(cellValue)
        }
      },
      {
        field: 'executionsProgress',
        title: '执行进度',
        width: `${computedPx(91)}px`,
        align: 'center',
        headerAlign: 'center'
      }
    ])

    // 表格数据
    const tableData = ref([])

    /**
     * 获取数据
     * @return {Promise<void>}
     */
    async function getTableData() {
      const { data } = await concernsByCapital()
      tableData.value = data
    }
    getTableData()

    const { tableHeight } = useTableHeight(200)
    return {
      columns,
      tableData,
      tableHeight
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../../common/style/module-wrapper";
@import "../../common/style/vxe-table-style";
.module-left-center {
  width: 100%;
  height: 254px;
  margin: 16px 0;
}
</style>
