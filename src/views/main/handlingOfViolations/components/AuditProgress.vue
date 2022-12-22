<template>
  <div class="module-container audit-progress-wrapper">
    <bs-table-title title="处理进度" style="margin-bottom: 10px" />
    <!--<BsTable-->
    <!--  :table-config="tableConfig"-->
    <!--  :table-columns-config="columns"-->
    <!--  :table-data="tableData"-->
    <!--  :toolbar-config="false"-->
    <!--  :pager-config="false"-->
    <!--  size="medium"-->
    <!--  v-bind="$attrs"-->
    <!--  :max-height="400"-->
    <!--/>-->
    <!--<el-table :data="tableData" width="100%">-->
    <!--  <el-table-column-->
    <!--    v-for="column in columns"-->
    <!--    :key="column.field"-->
    <!--    :prop="column.field"-->
    <!--    :label="column.title"-->
    <!--    :min-width="column.wdith"-->
    <!--  />-->
    <!--</el-table>-->
    <!--<vxe-grid-->
    <!--  :columns="columns"-->
    <!--  :data="tableData"-->
    <!--  :scroll-x="{ enabled: false }"-->
    <!--  :scroll-y="{ enabled: false }"-->
    <!--/>-->
    <!--自定义table解决：BsTable、vxe-grid、el-table打印出现滚动条列咋展示不全问题-->
    <table class="audit-progress-table">
      <!--表头-->
      <thead>
        <tr>
          <!--除开第1、2最后一列（序号、处理日期、是否终审），其余列平分宽度-->
          <th
            v-for="(column) in columns"
            :key="column.field"
            :align="column.titleAlign || 'center'"
            :style="{
              width: column.type === 'seq' && ['createTime'].includes(column.field) ? `${column.width}px` : computedColumnWidth,
              textAlign: 'center',
            }"
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <!--表体-->
      <tbody>
        <tr
          v-for="(row, index) in tableData"
          :key="index"
        >
          <!--除开第1、2最后一列（序号、处理日期、是否终审），其余列左对齐-->
          <td
            v-for="(column) in columns"
            :key="column.field"
            valign="top"
            :align="column.align || 'center'"
          >
            {{ getTdLabel(row, column, index) }}
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="!tableData.length"
      class="empty-container"
    >
      <img :src="require('@/components/Table/assets/img/empty.svg')">
      <p style="margin-top: 8px;">亲，没有更多数据了！</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, unref, inject, computed } from '@vue/composition-api'
import useTable from '@/hooks/useTable'
import { auditInfoColumns, getAuditDescriptionColumn, indexColumn } from '../model/data'
import { RouterPathEnum, WarnLevelEnum } from '../model/enum'

export default defineComponent({
  props: {
    isPint: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => ([])
    }
  },
  setup(props) {
    // 当前选中的业务单据
    const currentNode = inject('currentNode')
    // 页面路由
    const pagePath = inject('pagePath')

    const columns = computed(() => {
      const common = [indexColumn, ...auditInfoColumns]
      if (unref(currentNode)?.warnLevel === WarnLevelEnum.BLUE) {
        // 蓝色预警
        common.splice(
          common.length - 1,
          0,
          getAuditDescriptionColumn({ title: '处理说明' })
        )
      } else if (unref(pagePath) === RouterPathEnum.UNIT_FEEDBACK) {
        common.splice(
          common.length - 1,
          0,
          getAuditDescriptionColumn({ title: '处理说明/处理意见' })
        )
      } else {
        common.splice(
          common.length - 1,
          0,
          getAuditDescriptionColumn({ title: '处理说明/处理意见' })
        )
      }

      return common
    })

    const computedColumnWidth = computed(() => {
      const first = unref(columns)[0]
      const second = unref(columns)[1]
      const last = unref(columns)[unref(columns).length - 1]
      const otherWidth = first.width + second.width + last.width
      return `calc((100% - ${otherWidth}px) / ${unref(columns).length - 3}`
    })
    /**
     * 表格
     * */
    const [
      {
        tableConfig
        // tableData
      }
    ] = useTable({
      dataKey: 'data'
    })
    tableConfig.globalConfig = {
      seq: true, // 序号列
      checkType: false // hasCheckbox
    }

    /**
     * 获取td值
     * @param row
     * @param column
     */
    function getTdLabel(row, column, index) {
      if (column?.type === 'seq') {
        return index + 1
      }
      if (column?.cellRender?.name?.indexOf('select')) {
        return column?.cellRender.options.find(item => item.value === row[column.field])?.label
      }
      return row[column.field]
    }
    return {
      columns,
      tableConfig,
      // tableData,
      getTdLabel,
      computedColumnWidth
    }
  }
})
</script>

<style lang="scss" scoped>
.module-container {
  margin-top: 16px;
}
.audit-progress-table {
  width: 100%;

  th, td {
    border-collapse: collapse;
    border: 0.5px solid rgba(#606266, 0.6);
    border-top: none;
    border-left: none;
  }

  tr th:last-child,
  tr td:last-child {
    border-right-color: #f0f0f0;
  }

  tr th:first-child,
  tr td:first-child {
    border-left-color: #f0f0f0;
  }

  thead tr {
    background: #edf2fc;
    box-shadow: 1px 0 0 #cfd2d4;

    th {
      font-weight: 700;
      color: #606266;
      white-space: nowrap;
    }
  }

  th, td {
    padding: 6px;
    box-sizing: border-box;
  }

  tbody tr td {
    font-size: 14px;
    padding: 5px;
    box-sizing: border-box;
  }

  tbody tr:nth-child(even) {
    background-color: #f8fafe
  }
}
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>
