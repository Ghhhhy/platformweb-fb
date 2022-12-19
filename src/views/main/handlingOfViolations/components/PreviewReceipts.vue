<template>
  <vxe-modal
    v-model="visible"
    :destroy-on-close="true"
    title="业务单据查看"
    width="80%"
    height="80%"
    :show-footer="false"
  >
    <div style="height: calc(100% - 4px)">
      <BsQuery
        ref="queryFrom"
        :query-form-item-config="formSchemas"
        :query-form-data="formData"
        @onSearchClick="search"
      />
      <BsTable
        :table-config="tableConfig"
        :table-columns-config="columns"
        :table-data="tableData"
        :toolbar-config="tableToolbarConfig"
        :pager-config="pagerConfig"
        size="medium"
        style="height: calc(100% - 50px)"
        @onToolbarBtnClick="onToolbarBtnClick"
        @ajaxData="pagerChange"
      >
        <template v-slot:toolbarSlots>
          <bs-table-title title="支付明细" />
        </template>
      </BsTable>
    </div>
  </vxe-modal>
</template>

<script>
import { computed, defineComponent } from '@vue/composition-api'
import useTable from '@/hooks/useTable'
import useForm from '@/hooks/useForm'
import { getCommonColumns, getReceiptsColumns, receiptsSearchFormSchemas } from '../model/data'
export default defineComponent({
  props: {
    // 显隐
    value: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'value',
    event: 'changeVisible'
  },
  setup(props, { emit }) {
    // 显隐内部状态
    const visible = computed({
      get() {
        return props.value
      },
      set(val) {
        emit('changeVisible', val)
      }
    })

    const [
      {
        formData,
        formSchemas
      }
    ] = useForm(
      receiptsSearchFormSchemas
    )

    /**
     * 搜索重置
     * */
    function search(params) {
      Object.assign(formData, params)
      resetFetchTableData()
    }

    /**
     * 表格
     * */
    const [
      {
        columns,
        tableConfig,
        tableData,
        onToolbarBtnClick,
        tableToolbarConfig,
        resetFetchTableData,
        pagerConfig,
        pagerChange
      }
    ] = useTable({
      dataKey: 'data',
      columns: [
        ...getCommonColumns('$vxeSelect'),
        ...getReceiptsColumns()
      ]
    })
    // 全局配置
    tableConfig.globalConfig = {
      checkType: false,
      seq: true,
      cellClickCheck: false
    }

    return {
      visible,

      formData,
      formSchemas,
      search,

      pagerConfig,
      pagerChange,
      resetFetchTableData,
      columns,
      tableConfig,
      tableData,
      onToolbarBtnClick,
      tableToolbarConfig
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
