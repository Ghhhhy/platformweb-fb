<template>
  <div class="module-wrapper">
    <p class="module-title">“三保”上年同期对比情况</p>
    <vxe-grid
      :columns="columns"
      :data="tableData"
      :height="tableHeight"
      auto-resize
      sync-resize
      :cell-class-name="cellClassName"
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
import { formatterThousands } from '@/utils/thousands.js'

import { comparison } from '@/api/frame/main/threeGuaranteesExpenditure/index.js'
import { useTableHeight } from '../../common/hooks/useTableHeight'

export default defineComponent({
  setup() {
    const columns = ref([
      {
        field: 'year',
        title: '',
        align: 'center',
        children: [
          {
            field: 'year',
            title: '季度',
            width: computedPx(86),
            align: 'center'
          }
        ]
      },
      {
        title: '三保',
        align: 'center',
        children: [
          {
            field: 'data1',
            title: '工资',
            width: computedPx(66),
            headerAlign: 'center',
            align: 'right',
            formatter: ({ cellValue }) => {
              return formatterThousands(cellValue)
            }
          },
          {
            field: 'data2',
            title: '运转',
            width: computedPx(74),
            headerAlign: 'center',
            align: 'right',
            formatter: ({ cellValue }) => {
              return formatterThousands(cellValue)
            }
          },
          {
            field: 'data3',
            title: '明生',
            width: computedPx(62),
            headerAlign: 'center',
            align: 'right',
            formatter: ({ cellValue }) => {
              return formatterThousands(cellValue)
            }
          },
          {
            field: 'data4',
            title: '合计(万元)',
            width: computedPx(99),
            headerAlign: 'center',
            align: 'right',
            formatter: ({ cellValue }) => {
              return formatterThousands(cellValue)
            }
          }
        ]
      },
      {
        title: '本级财力可执行(预算结余)',
        align: 'center',
        children: [
          {
            field: 'data5',
            title: '总合计数(万元)',
            width: computedPx(120),
            headerAlign: 'center',
            align: 'right',
            formatter: ({ cellValue }) => {
              return formatterThousands(cellValue)
            }
          },
          {
            field: 'surplus',
            title: '剩余(万元)',
            width: computedPx(116),
            headerAlign: 'center',
            align: 'right',
            formatter: ({ cellValue }) => {
              return formatterThousands(cellValue)
            }
          }
        ]
      }
    ])

    // 表格数据
    const tableData = ref([])

    // 额外类名
    function cellClassName({ row, column }) {
      if (column.property === 'surplus' && row[column.property] < 0) {
        return 'td-text-red'
      }
    }

    /**
     * 获取数据
     * @return {Promise<void>}
     */
    async function getTableData() {
      const { data } = await comparison()
      tableData.value = data
    }
    getTableData()

    const { tableHeight } = useTableHeight(224)

    return {
      columns,
      tableData,
      tableHeight,
      cellClassName
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

  &-item {
    display: flex;
    align-items: center;
    &-name {
      margin-left: 8px;
    }
  }
}

.module-wrapper {
  height: 278px;
}
.chart-table {
  /deep/.vxe-table {
    .vxe-header--row,
    .vxe-header--column {
      height: 32px !important;
    }
  }
}
</style>
