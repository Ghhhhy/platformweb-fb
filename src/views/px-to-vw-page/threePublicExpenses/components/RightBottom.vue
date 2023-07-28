<template>
  <div class="module-wrapper">
    <p class="module-title">“三公”上年同期对比情况</p>
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
      <template
        v-for="slot in computedSlots"
        #[slot]="{ row, column }"
      >
        <svg-icon :key="slot" :name="row[column.property]" size="14" />
      </template>
    </vxe-grid>
    <div class="tfoot-legend">
      <span class="tfoot-legend-item">图示</span>
      <span
        v-for="item in legend"
        :key="item.icon"
        class="tfoot-legend-item"
      >
        <svg-icon :name="item.icon" class-name="tfoot-legend-icon" size="14" />
        <span class="tfoot-legend-item-name">{{ item.name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref, unref } from '@vue/composition-api'
import computedPx from '@/utils/computedPx'
import { comparison } from '@/api/frame/main/threePublicExpenses/index.js'
import { formatterThousands } from '@/utils/thousands.js'
import { useTableHeight } from '../../common/hooks/useTableHeight'

// 图标枚举
const ChartIconNameEnum = {
  // 上升
  UP: 'chart-up',
  // 下降
  DOWN: 'chart-down',
  // 持平
  FLAT: 'chart-flat'
}
export default defineComponent({
  setup() {
    const columns = ref([
      {
        field: 'year',
        title: '',
        width: `${computedPx(58)}px`,
        headerAlign: 'center',
        align: 'center'
      },
      {
        field: 'finalAccounts',
        title: '决算数',
        width: `${computedPx(66)}px`,
        headerAlign: 'center',
        align: 'center',
        formatter: ({ cellValue }) => {
          return formatterThousands(cellValue)
        }
      },
      {
        field: 'organizationAmount',
        title: '预算编制数',
        width: `${computedPx(100)}px`,
        headerAlign: 'center',
        align: 'center',
        formatter: ({ cellValue }) => {
          return formatterThousands(cellValue)
        }
      },
      {
        field: 'budgetAmount',
        title: '调整预算数',
        width: `${computedPx(100)}px`,
        headerAlign: 'center',
        align: 'center',
        formatter: ({ cellValue }) => {
          return formatterThousands(cellValue)
        }
      },
      {
        field: 'executionsAmount',
        title: '执行数',
        width: `${computedPx(80)}px`,
        headerAlign: 'center',
        align: 'center',
        formatter: ({ cellValue }) => {
          return formatterThousands(cellValue)
        }
      },
      {
        field: 'executionsDivideFinalAccounts',
        title: '执行比决算数',
        width: `${computedPx(95)}px`,
        align: 'center',
        showOverflow: 'ellipsis',
        headerAlign: 'center',
        slots: {
          default: 'executionsDivideFinalAccountsSlot'
        }
      },
      {
        field: 'executionsDivideBudgetAmount',
        title: '执行比调整预算数',
        width: computedPx(120),
        align: 'center',
        showOverflow: true,
        headerAlign: 'center',
        slots: {
          default: 'executionsDivideBudgetAmountSlot'
        }
      }
    ])

    // 插槽列
    const computedSlots = computed(() => {
      return columns.value.filter(column => column.slots).map(item => item.slots.default)
    })

    // 表格数据
    const tableData = ref([
      { year: '上年', fieldSuffix: 'LastYear' },
      { year: '当年', fieldSuffix: '' }
    ])

    /**
     * 获取图标名称
     * */
    function getChartIcon(value) {
      if (isNaN(value)) return ChartIconNameEnum.FLAT
      return value === 0
        ? ChartIconNameEnum.FLAT
        : value > 0
          ? ChartIconNameEnum.UP
          : ChartIconNameEnum.DOWN
    }

    /**
     * 获取数据
     * @return {Promise<void>}
     */
    async function getTableData() {
      const { data = {} } = await comparison()
      tableData.value = unref(tableData).map(row => {
        return {
          year: row.year,
          ...unref(columns).reduce(
            (obj, column) => {
              if (data && !Reflect.has(data, `${column.field}${row.fieldSuffix}`)) return obj
              obj[column.field] = data?.[`${column.field}${row.fieldSuffix}`] || ''
              return obj
            },
            {}
          ),
          executionsDivideFinalAccounts: getChartIcon(data[`executionsAmount${row.fieldSuffix}`] - data[`finalAccounts${row.fieldSuffix}`]),
          executionsDivideBudgetAmount: getChartIcon(data[`executionsAmount${row.fieldSuffix}`] - data[`budgetAmount${row.fieldSuffix}`])
        }
      })
    }
    getTableData()

    const legend = [
      {
        name: '上升',
        icon: ChartIconNameEnum.UP
      },
      {
        name: '下降',
        icon: ChartIconNameEnum.DOWN
      },
      {
        name: '持平',
        icon: ChartIconNameEnum.FLAT
      }
    ]

    const { tableHeight } = useTableHeight(120)

    return {
      columns,
      tableData,
      tableHeight,
      legend,
      computedSlots
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../../common/style/module-wrapper";
@import "../../common/style/vxe-table-style";

.tfoot-legend {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 55px;
  font-size: 14px;

  &-item {
    display: flex;
    align-items: center;
    &-name {
      margin-left: 8px;
    }
  }
}

.tfoot-legend-icon {
  font-size: 14px;
  margin-right: 8px;
}
</style>
