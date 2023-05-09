<template>
  <div class="module-wrapper">
    <p class="module-title">监控预警情况多维度分析</p>
    <div class="filter-select">
      <ConditionSelect
        :value.sync="selectValue"
        :option="selectOption"
        size="small"
        class="custom-select type-select-wrapper"
      />
    </div>
    <BsTable
      id="1001"
      ref="bsTableRef"
      row-id="id"
      :table-config="tableConfig"
      :table-columns-config="columns"
      :table-data="tableData"
      :tree-config="{ dblExpandAll: true, dblExpand: true, iconClose: 'el-icon-circle-plus', iconOpen: 'el-icon-remove' }"
      :toolbar-config="false"
      :pager-config="false"
      :show-zero="false"
      :formula-digits="1"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import computedPx from '@/utils/computedPx'
import { formatterThousands } from '@/utils/thousands.js'

import { comparison } from '@/api/frame/main/threeGuaranteesExpenditure/index.js'
import { useTableHeight } from '../../common/hooks/useTableHeight'
import ConditionSelect from '@/views/main/warningOverview/components/ConditionSelect.vue'
import { useSelect } from '@/views/main/warningOverview/hooks/useSelect'
import { getViewWarnSelectOption, WarnEnum } from '../../common/model/enum.js'

export default defineComponent({
  components: { ConditionSelect },
  setup() {
    const { selectValue, selectOption } = useSelect({
      option: getViewWarnSelectOption(),
      defaultValue: WarnEnum.BY_FUND
    })
    const columns = ref([
      {
        field: 'year',
        title: '资金类型',
        treeNode: true,
        width: 200,
        align: 'center',
        cellRender: {
          name: '$vxeIcon',
          props: {
            $refs: this
          }
        }
      },
      {
        title: '红色预警',
        align: 'center',
        children: [
          {
            field: 'data1',
            title: '疑点信息',
            width: computedPx(66),
            headerAlign: 'center',
            align: 'right',
            formatter: ({ cellValue }) => {
              return formatterThousands(cellValue)
            }
          },
          {
            field: 'data2',
            title: '认定正常',
            width: computedPx(74),
            headerAlign: 'center',
            align: 'right',
            formatter: ({ cellValue }) => {
              return formatterThousands(cellValue)
            }
          },
          {
            field: 'data3',
            title: '认定违规',
            width: computedPx(62),
            headerAlign: 'center',
            align: 'right',
            formatter: ({ cellValue }) => {
              return formatterThousands(cellValue)
            },
            children: [
              {
                field: 'data1',
                title: '待整改',
                width: computedPx(66),
                headerAlign: 'center',
                align: 'right',
                formatter: ({ cellValue }) => {
                  return formatterThousands(cellValue)
                }
              },
              {
                field: 'data1',
                title: '已整改',
                width: computedPx(66),
                headerAlign: 'center',
                align: 'right',
                formatter: ({ cellValue }) => {
                  return formatterThousands(cellValue)
                }
              }
            ]
          }
        ]
      },
      {
        title: '红色预警',
        align: 'center',
        children: [
          {
            field: 'data1',
            title: '疑点信息',
            width: computedPx(66),
            headerAlign: 'center',
            align: 'right',
            formatter: ({ cellValue }) => {
              return formatterThousands(cellValue)
            }
          },
          {
            field: 'data2',
            title: '认定正常',
            width: computedPx(74),
            headerAlign: 'center',
            align: 'right',
            formatter: ({ cellValue }) => {
              return formatterThousands(cellValue)
            }
          },
          {
            field: 'data3',
            title: '认定违规',
            width: computedPx(62),
            headerAlign: 'center',
            align: 'right',
            formatter: ({ cellValue }) => {
              return formatterThousands(cellValue)
            },
            children: [
              {
                field: 'data1',
                title: '待整改',
                width: computedPx(66),
                headerAlign: 'center',
                align: 'right',
                formatter: ({ cellValue }) => {
                  return formatterThousands(cellValue)
                }
              },
              {
                field: 'data1',
                title: '已整改',
                width: computedPx(66),
                headerAlign: 'center',
                align: 'right',
                formatter: ({ cellValue }) => {
                  return formatterThousands(cellValue)
                }
              }
            ]
          }
        ]
      },
      {
        title: '红色预警',
        align: 'center',
        children: [
          {
            field: 'data1',
            title: '疑点信息',
            width: computedPx(66),
            headerAlign: 'center',
            align: 'right',
            formatter: ({ cellValue }) => {
              return formatterThousands(cellValue)
            }
          },
          {
            field: 'data2',
            title: '认定正常',
            width: computedPx(74),
            headerAlign: 'center',
            align: 'right',
            formatter: ({ cellValue }) => {
              return formatterThousands(cellValue)
            }
          },
          {
            field: 'data3',
            title: '认定违规',
            width: computedPx(62),
            headerAlign: 'center',
            align: 'right',
            formatter: ({ cellValue }) => {
              return formatterThousands(cellValue)
            },
            children: [
              {
                field: 'data1',
                title: '待整改',
                width: computedPx(66),
                headerAlign: 'center',
                align: 'right',
                formatter: ({ cellValue }) => {
                  return formatterThousands(cellValue)
                }
              },
              {
                field: 'data1',
                title: '已整改',
                width: computedPx(66),
                headerAlign: 'center',
                align: 'right',
                formatter: ({ cellValue }) => {
                  return formatterThousands(cellValue)
                }
              }
            ]
          }
        ]
      },
      {
        title: '红色预警',
        align: 'center',
        children: [
          {
            field: 'data1',
            title: '疑点信息',
            width: computedPx(66),
            headerAlign: 'center',
            align: 'right',
            formatter: ({ cellValue }) => {
              return formatterThousands(cellValue)
            }
          },
          {
            field: 'data2',
            title: '认定正常',
            width: computedPx(74),
            headerAlign: 'center',
            align: 'right',
            formatter: ({ cellValue }) => {
              return formatterThousands(cellValue)
            }
          },
          {
            field: 'data3',
            title: '认定违规',
            width: computedPx(62),
            headerAlign: 'center',
            align: 'right',
            formatter: ({ cellValue }) => {
              return formatterThousands(cellValue)
            },
            children: [
              {
                field: 'data1',
                title: '待整改',
                width: computedPx(66),
                headerAlign: 'center',
                align: 'right',
                formatter: ({ cellValue }) => {
                  return formatterThousands(cellValue)
                }
              },
              {
                field: 'data1',
                title: '已整改',
                width: computedPx(66),
                headerAlign: 'center',
                align: 'right',
                formatter: ({ cellValue }) => {
                  return formatterThousands(cellValue)
                }
              }
            ]
          }
        ]
      }
    ])
    const tableConfig = ref({
      globalConfig: {
        // 全局配置
        checkType: false,
        seq: false, // 序号列
        useMoneyFilter: true
      }
    })
    // 表格数据
    const tableData = ref([])

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
      tableConfig,
      selectValue,
      selectOption
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../../common/style/module-wrapper";
@import "../../common/style/vxe-table-style";
.module-wrapper {
  width: 100%;
  margin-top: 16px;
  position: relative;
}
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
/deep/.custom-select {
  width: 170px;
}

/deep/.center-bottom {
  position: relative;
  width: 606px;
  height: 324px;
  margin-top: 16px;
}
/deep/.filter-select {
  position: absolute;
  top: 4px;
  right: 32px;
  z-index: 2;
}
/deep/.chart-container {
  width: 100%;
  height: 100%;
}
/deep/.el-input--small {
  font-size: 13px;
}
/deep/.el-select__caret {
  line-height: 1;
}
/deep/.el-input__inner {
  height: 32px;
  line-height: 1;
  font-size: 13px;
}
/deep/.el-select-dropdown {
  font-size: 13px;
}
</style>
