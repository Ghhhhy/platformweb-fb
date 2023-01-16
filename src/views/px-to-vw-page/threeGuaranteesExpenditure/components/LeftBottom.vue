<template>
  <div class="module-wrapper module-left-bottom">
    <p class="module-title">“三保”分类关注-分类别</p>
    <vxe-grid
      :columns="columns"
      :data="tableData"
      :height="computedPx(160)"
      show-overflow="tooltip"
      show-header-overflow="tooltip"
      border="full"
      class="chart-table"
    >
      <template
        v-for="slot in computedSlots"
        #[slot]="{ row, column }"
      >
        <WarningType :key="slot" :value="row[column.property]" />
      </template>
    </vxe-grid>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from '@vue/composition-api'
import { concernsByType } from '@/api/frame/main/threeGuaranteesExpenditure/index.js'

import WarningType from '../../common/components/WarningType'
import { WarnTypeEnum } from '../../common/model/enum'
import computedPx from '@/utils/computedPx'
import { formatterThousands } from '@/utils/thousands.js'

export default defineComponent({
  components: { WarningType },
  setup() {
    // 表格列
    const columns = ref([
      {
        field: 'category',
        title: '类别',
        width: `${computedPx(84)}px`,
        headerAlign: 'center'
      },
      {
        field: 'budgetAmount',
        title: '预算数',
        width: `${computedPx(90)}px`,
        align: 'left',
        headerAlign: 'center',
        formatter: ({ cellValue }) => {
          return formatterThousands(cellValue)
        }
      },
      {
        field: 'executionsAmount',
        title: '执行数',
        width: `${computedPx(98)}px`,
        headerAlign: 'center',
        align: 'left',
        formatter: ({ cellValue }) => {
          return formatterThousands(cellValue)
        }
      },
      {
        field: 'executionsBudget',
        title: '执行超预算预警',
        width: `${computedPx(124)}px`,
        headerAlign: 'center',
        align: 'center',
        slots: {
          default: 'executionsBudget-slot'
        }
      },
      {
        field: 'accountingAmount',
        title: '核算数',
        width: `${computedPx(100)}px`,
        headerAlign: 'center',
        align: 'center',
        formatter: ({ cellValue }) => {
          return formatterThousands(cellValue)
        }
      },
      {
        field: 'accountingBudget',
        title: '核算超预算预警',
        width: `${computedPx(127)}px`,
        headerAlign: 'center',
        align: 'center',
        slots: {
          default: 'accountingBudget-slot'
        }
      }
    ])

    // 插槽列
    const computedSlots = computed(() => {
      return columns.value.filter(column => column.slots).map(item => item.slots.default)
    })

    // 表格数据
    const tableData = ref([])

    /**
     * 获取数据
     * @return {Promise<void>}
     */
    async function getTableData() {
      const { data } = await concernsByType()
      tableData.value = data
    }
    getTableData()

    return {
      columns,
      computedSlots,
      tableData,
      computedPx,
      WarnTypeEnum
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../../common/style/module-wrapper";
@import "../../common/style/vxe-table-style";

.module-left-bottom {
  width: 100%;
  height: 212px;
}
</style>
