<template>
  <div class="socoal-security-table-wrapper" :style="wrapperStyle">
    <slot name="title"></slot>
    <el-table
      :data="data"
      :columns="columns"
      v-bind="{ ...tableProps, ...defaultTableProps }"
    >
      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        v-bind="column"
      />
    </el-table>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { tableProps } from '../model/data'
export default defineComponent({
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    tableProps: {
      type: Object,
      default: () => {}
    },
    wrapperStyle: {
      type: Object,
      default: () => ({ marginBottom: '16px' })
    }
  },
  setup() {
    return {
      defaultTableProps: tableProps()
    }
  }
})
</script>

<style lang="scss" scoped>
.socoal-security-table-wrapper {
  /deep/.el-table .cell.el-tooltip {
    width: 100% !important;
  }
}
</style>
