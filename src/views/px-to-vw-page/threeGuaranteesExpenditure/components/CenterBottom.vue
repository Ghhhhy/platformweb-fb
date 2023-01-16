<template>
  <div class="module-wrapper module-left-center">
    <p class="module-title">“三保”支出与库款对比情况</p>
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
    >
      <template #warnStatusSlot="{ row, column }">
        <WarningType :value="row[column.property]" />
      </template>
    </vxe-grid>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import WarningType from '../../common/components/WarningType'

import computedPx from '@/utils/computedPx'
import { formatterThousands } from '@/utils/thousands.js'
import { WarnTypeEnum } from '../../common/model/enum'
import { treasuryComparison } from '@/api/frame/main/threeGuaranteesExpenditure/index.js'
import { useTableHeight } from '../../common/hooks/useTableHeight'

export default defineComponent({
  components: { WarningType },
  setup() {
    const columns = ref([
      {
        field: 'mofDivName',
        title: '地区',
        width: `${computedPx(84)}px`,
        headerAlign: 'center',
        align: 'left'
      },
      {
        field: 'executableAmount',
        title: '三保未支出合计(万元)',
        width: `${computedPx(204)}px`,
        headerAlign: 'center',
        align: 'right',
        formatter: ({ cellValue }) => {
          return formatterThousands(cellValue)
        }
      },
      {
        field: 'treasury',
        title: '库款(万元)',
        width: `${computedPx(166)}px`,
        headerAlign: 'center',
        align: 'right',
        formatter: ({ cellValue }) => {
          return formatterThousands(cellValue)
        }
      },
      {
        field: 'warnStatus',
        title: '预警',
        width: `${computedPx(130)}px`,
        headerAlign: 'center',
        align: 'center',
        slots: {
          default: 'warnStatusSlot'
        }
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
.module-left-center {
  width: 100%;
  height: 324px;
  margin-top: 16px;
}

//.module-title {
//  padding-bottom: 14px;
//}
</style>
