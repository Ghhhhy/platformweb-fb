<template>
  <vxe-modal
    v-model="visiable"
    :destroy-on-close="true"
    title="来源去向查看"
    width="80%"
    height="70%"
    :show-footer="false"
  >
    <div class="content" style="height: 100%; padding-bottom: 10px; box-sizing: border-box">
      <BsTable
        v-loading="tableLoadingState"
        :table-config="{ ...tableConfig, seq: false }"
        :table-columns-config="columns"
        :table-data="tableData"
        :toolbar-config="false"
        :pager-config="false"
        size="medium"
        @register="registerTable"
      />
    </div>
  </vxe-modal>
</template>

<script>
import { defineComponent, computed, unref, getCurrentInstance } from '@vue/composition-api'
import useTable from '@/hooks/useTable'
import { getIndexSourceGoneColumns } from '../model/data'

export default defineComponent({
  props: {
    visiableState: {
      type: Boolean,
      default: false
    },
    // 当前编辑的数据row
    currentValue: {
      type: Object,
      default: null
    }
  },
  setup(props, { emit }) {
    const instance = getCurrentInstance()
    const { currentTreeNode, currentRow } = instance.parent.data
    const visiable = computed({
      get() {
        return props.visiableState
      },
      set(val) {
        emit('update:visiableState', val)
      }
    })

    /**
     * 表格
     * */
    const [
      {
        columns,
        tableToolbarConfig,
        tableConfig,
        tableData,
        resetFetchTableData,
        tableLoadingState,
        getTable
      },
      registerTable
    ] = useTable({
      fetch: unref(currentTreeNode).request.detail,
      columns: getIndexSourceGoneColumns(),
      dataKey: 'data',
      beforeFetch: (params) => {
        params.toctrlId = unref(currentRow)?.toctrlId
        return params
      }
    })

    return {
      visiable,
      columns,
      tableToolbarConfig,
      tableConfig,
      tableData,
      resetFetchTableData,
      tableLoadingState,
      getTable,
      registerTable
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
