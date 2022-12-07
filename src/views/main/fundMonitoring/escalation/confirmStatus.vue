<template>
  <div style="height:100%">
    <BsMainFormListLayout>
      <template v-slot:mainForm>
        <div style="height: 100%">
          <BsTable
            ref="bsTableRef"
            v-loading="tableLoadingState"
            :table-config="tableConfig"
            :table-columns-config="columns"
            :table-data="tableData"
            :toolbar-config="showToolbar ? tableToolbarConfig : showToolbar"
            :pager-config="false"
            @onToolbarBtnClick="onToolbarBtnClick"
          >
            <template v-slot:toolbarSlots>
              <div class="table-toolbar-left">
                <div class="table-toolbar-left-title">
                  <span class="fn-inline">财政上报确认提醒</span>
                  <i class="fn-inline"></i>
                </div>
              </div>
            </template>
          </BsTable>
        </div>
      </template>
    </BsMainFormListLayout>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import useTable from '@/hooks/useTable'
import { getColumns } from './confirmStatus'
import api from '@/api/frame/main/fundMonitoring/escalation.js'

export default defineComponent({
  props: {
    showToolbar: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    /**
     * 表格
     * */
    const [
      {
        columns,
        tableConfig,
        tableData,
        resetFetchTableData,
        tableLoadingState,
        onToolbarBtnClick,
        tableToolbarConfig
      },
      registerTable
    ] = useTable(
      {
        columns: getColumns(),
        openPager: false,
        dataKey: 'data',
        fetch: api.queryLogs,
        beforeFetch: params => {
          params.confirmStatus = '0'
          return params
        }
      }
    )

    // 全局配置
    tableConfig.globalConfig = {
      checkType: false,
      seq: true,
      cellClickCheck: false
    }

    return {
      registerTable,
      columns,
      tableConfig,
      tableData,
      resetFetchTableData,
      tableLoadingState,
      onToolbarBtnClick,
      tableToolbarConfig
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
