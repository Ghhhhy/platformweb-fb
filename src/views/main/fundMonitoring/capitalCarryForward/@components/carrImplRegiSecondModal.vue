<template>
  <vxe-modal
    v-model="dialogVisible"
    v-loading="tableLoadingState"
    v-bind="modalStaticProperty"
    class="carrImplRegiSecondModal"
    @close="dialogClose"
  >
    <BsMainFormListLayout>
      <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            v-if="!isFuJian"
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
          :table-config="tableConfig"
          :table-columns-config="columns"
          :table-data="tableData"
          :pager-config="pagerConfig"
          :toolbar-config="tableToolbarConfig"
          @onToolbarBtnClick="onToolbarBtnClick"
          @ajaxData="pagerChange"
        >
          <template v-slot:toolbar-custom-slot>
            <div style="margin-right: 10px;">
              <vxe-button v-if="$store.getters.isFuJian" status="primary" :loading="exportLoading" @click="onExportAll">导出全部</vxe-button>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
  </vxe-modal>
</template>

<script>
import { defineComponent, reactive, ref, computed, onMounted, getCurrentInstance } from '@vue/composition-api'
import useTable from '@/hooks/useTable'
import { carrImplRegiSecondModalColumns, carrImplRegiSecondModalColumnsFj } from './columns.js'
import store from '@/store/index'
import HttpModule from '@/api/frame/main/fundMonitoring/budgetImplementationRegion.js'
import useExportAllOfFJ from '@/hooks/useExportAll/useExportAllOfFJ.js'
// import { message } from 'element-ui'

export default defineComponent({
  components: {},
  setup() {
    /**
     * @interface reportCodeMap<{ $route.name : reportCode }>
     */
    const reportCodeMap = {
      'CarryImplementationRegion': {
        reportCode: 'jzzjysxd_level1',
        querykey: 'mofDivCode',
        tableType: 'bgt'
      },
      'CarryImplementationCapital': {
        reportCode: 'jzzjysxd_level1',
        querykey: 'trackProCode',
        tableType: 'bgt'
      },
      'CarryPayRegion': {
        reportCode: 'jzzjzcxd_level1',
        querykey: 'mofDivCode',
        tableType: 'pay'
      },
      'CarryPayCapital': {
        reportCode: 'jzzjzcxd_level1',
        querykey: 'trackProCode',
        tableType: 'pay'
      }
    }
    const reportCode = ref('')
    const tableType = ref('')
    /* eslint-disable-next-line */
    const { $route } = getCurrentInstance().proxy
    const waitTable = ref(null)
    const injectData = ref({
      mofDivCode: ''
    })
    const mofDivCodes = ref()
    const proCodes = ref()
    const endTime = ref()
    const condition = ref()
    const modalStaticProperty = ref({
      title: tableType.value === 'pay' ? '支出明细' : '预算明细',
      width: '96%',
      height: '80%',
      position: 'center',
      minWidth: '900',
      showFooter: false
    })
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
        tableLoadingState.value = true
        let copyObj = {
          reportCode: reportCode.value,
          mofDivCodes: mofDivCodes.value,
          proCodes: proCodes.value,
          endTime: endTime.value ? endTime.value[0] : '',
          proCode1: store.getters.isFuJian ? injectData.value.proCode : '',
          xjExpFuncCode: store.getters.isFuJian ? injectData.value.xjExpFuncCode : '',
          condition: store.getters.isFuJian ? condition.value ? condition.value : '' : '',
          ...params
        }
        copyObj[reportCodeMap[$route.name].querykey] = injectData.value.code
        return copyObj
      },
      afterFetch: tableData => {
        return tableData
      },
      finallyFetch: res => {
        tableLoadingState.value = false
        return res
      },
      columns: computed(() => {
        if (store.getters.isFuJian) {
          return carrImplRegiSecondModalColumnsFj
        }
        return carrImplRegiSecondModalColumns.filter(item => item.tableType === reportCodeMap[$route.name].tableType || !item.tableType)
      }
      ), // 预算和支出表头区分
      dataKey: store.getters.isFuJian ? 'data.results' : 'data.data'
    }, false)
    const tableConfig = {
      globalConfig: {
        checkType: '',
        seq: true
      }
    }
    const tableStaticProperty = reactive({
      border: true,
      resizable: true,
      showOverflow: true,
      // height: '100%',
      align: 'left'
    })
    const isFuJian = ref(store.getters.isFuJian)
    const init = () => {
      resetFetchTableData()
    }
    const isShowQueryConditions = ref(true)

    // 初始化"导出全部"功能
    const exportLoading = ref(false)
    function onExportAll() {
      useExportAllOfFJ({
        $tableInstance: waitTable.value,
        beforeRequest: (config) => {
          config.fileName = `${store.state.curNavModule.name}-${modalStaticProperty.value.title}`
          config.requestParam = {
            ...config.requestParam,
            reportCode: reportCode.value,
            [reportCodeMap[$route.name].querykey]: injectData.value.code // trackProCode 或 mofDivCode 的值
          }

          exportLoading.value = true
        }
      }).finally(_ => {
        exportLoading.value = false
      })
    }

    onMounted(() => {

    })
    return {
      tableConfig,
      exportLoading,
      onExportAll,
      columns,
      tableData,
      resetFetchTableData,
      isFuJian,
      tableLoadingState,
      pagerChange,
      tableToolbarConfig,
      onToolbarBtnClick,
      pagerConfig,
      modalStaticProperty,
      dialogVisible,
      dialogClose,
      reportCode,
      tableType,
      fetchTableData,
      isShowQueryConditions,
      tableStaticProperty,
      waitTable,
      injectData,
      mofDivCodes,
      proCodes,
      endTime,
      init,
      condition
    }
  }
})

</script>
<style lang="less" scoped>
.carrImplRegiSecondModal{
  /deep/ .vxe-pager--total{
    display: none;
  }
}
/deep/ .vxe-pager--total{
  display: none;
}
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
