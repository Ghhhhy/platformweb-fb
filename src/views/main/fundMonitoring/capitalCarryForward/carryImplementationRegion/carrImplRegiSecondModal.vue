<template>
  <vxe-modal
    v-model="dialogVisible"
    v-bind="modalStaticProperty"
    @close="dialogClose"
  >
    <BsMainFormListLayout>
      <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryFrom"
            @onSearchClick="fetchTableData"
            @onSearchResetClick="resetFetchTableData"
          />
        </div>
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="waitTable"
          v-bind="tableStaticProperty"
          class="Titans-table"
          :table-columns-config="columns"
          :table-data="tableData"
          :pager-config="pagerConfig"
          :toolbar-config="tableToolbarConfig"
          @onToolbarBtnClick="onToolbarBtnClick"
          @ajaxData="pagerChange"
        />
      </template>
    </BsMainFormListLayout>
  </vxe-modal>
</template>

<script>
import { defineComponent, reactive, ref, onMounted, getCurrentInstance } from '@vue/composition-api'
import useTable from '@/hooks/useTable'
import { carrImplRegiSecondModalColumns } from './carryImplementationRegion.js'
// import store from '@/store/index'
import HttpModule from '@/api/frame/main/fundMonitoring/budgetImplementationRegion.js'
// import { message } from 'element-ui'
export default defineComponent({
  components: {},
  setup() {
    /**
     * @interface reportCodeMap<{ $route.name : reportCode }>
     */
    const reportCodeMap = {
      'CarryImplementationRegion': 'jzzjysxd_ysje',
      'CarryImplementationCapital': 'jzzjysxd_ysje',
      'CarryPayRegion': 'jzzjysxd_zcje',
      'CarryPayCapital': 'jzzjysxd_zcje'
    }
    const { $route } = getCurrentInstance().proxy
    const waitTable = ref(null)
    const injectData = ref({
      mofDivCode: ''
    })
    const modalStaticProperty = {
      title: '新增疑点数据',
      width: '96%',
      height: '80%',
      position: 'center',
      minWidth: '900',
      showFooter: false
    }
    const dialogVisible = ref(false)
    const dialogClose = () => {
      dialogVisible.value = false
    }
    const [
      {
        columns,
        tableData,
        resetFetchTableData,
        tableLoadingState,
        pagerChange,
        fetchTableData,
        pagerConfig,
        tableToolbarConfig,
        onToolbarBtnClick
      }
    ] = useTable({
      fetch: HttpModule.queryDetail,
      beforeFetch: params => {
        return {
          reportCode: reportCodeMap[$route.name],
          trackProCode: injectData.trackProCode,
          mofDivCode: injectData.mofDivCode,
          ...params
        }
      },
      columns: carrImplRegiSecondModalColumns,
      dataKey: 'data.data'
    })
    const tableStaticProperty = reactive({
      border: true,
      resizable: true,
      showOverflow: true,
      height: '100%',
      align: 'left'
    })
    const isShowQueryConditions = ref(true)
    onMounted(() => {

    })
    return {
      columns,
      tableData,
      resetFetchTableData,
      tableLoadingState,
      pagerChange,
      tableToolbarConfig,
      onToolbarBtnClick,
      pagerConfig,
      modalStaticProperty,
      dialogVisible,
      dialogClose,
      fetchTableData,
      isShowQueryConditions,
      tableStaticProperty,
      waitTable
    }
  }
})

</script>
<style lang="less" scoped>
.waitTable{
  /deep/ .T-mainFormListLayout-modulebox{
    padding-top: 20px !important;
  }
  /deep/ .mmc-right{
    padding: 0;
  }
  .tab-select-two-con-list{
    margin: 0;
  }
  /deep/ .tab-select-two-con-list{
    margin-left: 0;
  }
  /deep/ .boss-slect__toolbar{
    padding-right: 24px;
  }
  /deep/ .T-mainFormListLayout-modulebox.mainFormListLayout-modulebox{
    padding-top: 0px !important;
  }
}
.queryCont{
  height: 38px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: none !important;
  // border-left: 1px solid #aaaaaa;
  // border-top: 1px solid #aaaaaa;
  // border-right: 1px solid #aaaaaa;
  /deep/ .vxe-input{
    height: 32px !important;
  }
}
.searchForm{
  flex: 1;
  .ruleSelect{
  min-width: 200px;
  width: 50%;
}
}

</style>
