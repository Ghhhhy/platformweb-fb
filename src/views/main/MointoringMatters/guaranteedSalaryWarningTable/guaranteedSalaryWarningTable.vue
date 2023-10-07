<!-- 预警明细查询（按规则） -->
<template>
  <div v-loading="tableLoading" style="height: 100%" class="createProcessing">
    <BsMainFormListLayout :default-split-pane-left-width="14">
      <!-- <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          is-open
          is-hide-query
          :tab-status-btn-config="tabStatusBtnConfig"
          :tab-status-num-config="tabStatusNumConfig"
          @btnClick="onTabPanelBtnClick"
        />
      </template> -->
      <template v-slot:query>
        <BsQuery
          ref="queryFrom"
          :query-form-item-config="queryConfig"
          :query-form-data="queryData"
          @onSearchClick="mainPagerConfig.page = 1, onSearch()"
          @onSearchResetClick="reset(), onSearch()"
        />
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="mainTableRef"
          v-bind="staticConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div class="table-toolbar-left-title">
                <span class="fn-inline">{{ menuName }}</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
  </div>
</template>
<script lang="js">
import { ref, defineComponent } from '@vue/composition-api'
import httpMudules from '@/api/frame/main/Monitoring/guaranteedSalaryWarningTable.js'
// import useTable from '@/hooks/useTable'
import { mockQueryData, mockQueryParams, mockTableColumns } from './guaranteedSalaryWarningTableData'
export default defineComponent({
  setup() {
    const tableLoading = ref(false)
    const queryConfig = ref(mockQueryData)
    const queryData = ref(mockQueryParams)
    const menuName = ref('“保工资”预警表')
    const onSearch = () => {
      let parmas = {

      }
      httpMudules.queryTableDatas(parmas).then(res => {
        console.log(789, res)
      })
    }
    const reset = () => {}
    let tableData = ref([{ id: 1, dealNo: 123123, mofDivName: '123', children: [{ id: 3, dealNo: 123123, mofDivName: '123', children: [] }] }])
    let tableColumnsConfig = ref(mockTableColumns)
    const staticConfig = ref({
      'tree-config': { dblExpandAll: true, dblExpand: true, accordion: false, iconClose: 'el-icon-circle-plus', iconOpen: 'el-icon-remove' },
      'row-id': 'id',
      tableFooterConfig: {},
      toolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: true, // 导出
        print: false, // 打印
        zoom: true, // 缩放
        custom: true, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      cellStyle: ({ row, columns }) => {}
    })
    const mainPagerConfig = ref({
      page: 1,
      pageSize: 10
    })
    const staticEvents = ref({
      cellClick: () => { },
      ajaxTableData: () => { },
      onToolbarBtnClick: () => { }
    })
    return {
      staticConfig,
      mainPagerConfig,
      staticEvents,
      tableColumnsConfig,
      tableData,
      reset,
      onSearch,
      menuName,
      queryData,
      queryConfig,
      tableLoading
    }
  }
})

</script>
