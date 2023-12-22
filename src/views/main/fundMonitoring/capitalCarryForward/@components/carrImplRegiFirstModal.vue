<template>
  <vxe-modal
    v-model="dialogVisible"
    v-loading="tableLoadingState"
    v-bind="modalStaticProperty"
    class="carryImplementationRegionModal"
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
          @cellClick="cellClick"
        >
          <template v-slot:toolbar-custom-slot>
            <div style="margin-right: 10px;">
              <vxe-button v-if="showExportAllBtn" status="primary" :loading="exportLoading" @click="onExportAll">导出全部</vxe-button>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <CarrImplRegiSecondModal ref="CarrImplRegiSecondModal" />
  </vxe-modal>
</template>

<script>
import { defineComponent, reactive, ref, onMounted, computed, getCurrentInstance } from '@vue/composition-api'
import useTable from '@/hooks/useTable'
import { carryImplementationRegionModalColumns, carryImplementationRegionModalColumnsFJ } from './columns.js'
import CarrImplRegiSecondModal from './carrImplRegiSecondModal.vue'
import store from '@/store/index'
import HttpModule from '@/api/frame/main/fundMonitoring/budgetImplementationRegion.js'
import useExportAllOfFJ from '@/hooks/useExportAll/useExportAllOfFJ.js'
// import { message } from 'element-ui'

export default defineComponent({
  components: {
    CarrImplRegiSecondModal
  },
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
    const isFuJian = ref(store.getters.isFuJian)
    const reportInsert = ref(false)
    const { $route } = getCurrentInstance().proxy
    const CarrImplRegiSecondModal = ref()
    const waitTable = ref(null)
    const injectData = ref({
      mofDivCode: ''
    })
    const mofDivCodes = ref()
    const proCodes = ref()
    const endTime = ref()
    const condition = ref()
    const modalStaticProperty = {
      title: '项目明细',
      width: '96%',
      height: '80%',
      position: 'center',
      minWidth: '900',
      showFooter: false
    }
    const dialogVisible = ref(false)
    const routeList = ref(['CarryPayRegion', 'carryPayCapital'])
    const dialogClose = () => {
      dialogVisible.value = false
    }
    const [
      {
        columns,
        tableData,
        resetFetchTableData,
        fetchTableData,
        tableLoadingState,
        pagerChange,
        pagerConfig,
        tableToolbarConfig,
        onToolbarBtnClick
      }
    ] = useTable({
      fetch: HttpModule.queryDetail,
      beforeFetch: params => {
        tableLoadingState.value = true
        let copyObj = {
          reportCode: reportCodeMap[$route.name].reportCode,
          mofDivCodes: mofDivCodes.value,
          proCodes: proCodes.value,
          endTime: endTime.value ? endTime.value[0] : '',
          condition: store.getters.isFuJian ? condition.value ? condition.value : '' : '',
          ...params
        }
        copyObj[reportCodeMap[$route.name].querykey] = injectData.value.code
        console.log('copyObj', copyObj)
        return copyObj
      },
      afterFetch: tableData => {
        // tableData.value = res.data.results
        console.log(tableData)
        // console.log(tableData.value)
        tableData.results = tableData.results.map(item => {
          return {
            ...item,
            xjExpFunc: (item.xjExpFuncCode + item.xjExpFuncName) ? (item.xjExpFuncCode + item.xjExpFuncName) : ''
          }
        })
        console.log(tableData)
        return tableData
      },
      finallyFetch: res => {
        tableLoadingState.value = false
        return res
      },
      columns: computed(() => {
        if (store.getters.isFuJian && ($route.name === 'CarryPayRegion' || $route.name === 'CarryPayCapital')) {
          return carryImplementationRegionModalColumnsFJ
        }
        return carryImplementationRegionModalColumns.filter(item => item.tableType === reportCodeMap[$route.name].tableType || !item.tableType)
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
      defaultMoneyUnit: 10000,
      // height: '100%',
      align: 'left',
      cellStyle: ({ row, rowIndex, column }) => {
        // 有效的cellValue
        const validCellValue = (row[column.property] * 1)
        if (routeList.value.includes($route.name)) return
        if (validCellValue && !row.children && column.own.canInsert) {
          return {
            color: '#4293F4',
            textDecoration: 'underline'
          }
        }
      }
    })
    const cellClick = ({ row, rowIndex, column }) => {
      // 有效的cellValue
      const validCellValue = (row[column.property] * 1)
      if (routeList.value.includes($route.name)) return
      if (validCellValue && !row.children && column.own.canInsert) {
        CarrImplRegiSecondModal.value.dialogVisible = true
        column.own.reportCode && (CarrImplRegiSecondModal.value.reportCode = column.own.reportCode)
        CarrImplRegiSecondModal.value.tableType = column.own.tableType
        CarrImplRegiSecondModal.value.injectData = row
        CarrImplRegiSecondModal.value.injectData.code = injectData.value.code
        CarrImplRegiSecondModal.value.mofDivCodes = mofDivCodes.value
        CarrImplRegiSecondModal.value.condition = condition.value
        CarrImplRegiSecondModal.value.proCodes = proCodes.value
        CarrImplRegiSecondModal.value.endTime = endTime.value
        CarrImplRegiSecondModal.value.init()
      }
    }
    const init = () => {
      resetFetchTableData()
    }
    const searchDataList = reactive({})
    const isShowQueryConditions = ref(true)
    let selectData = ref([])

    // 初始化"导出全部"功能
    const showExportAllBtn = computed(() => {
      const isMenuAllow = ['CarryPayRegion', 'CarryPayCapital'].includes($route.name) // 项目明细需要导出的菜单
      return store.getters.isFuJian && isMenuAllow
    })
    const exportLoading = ref(false)
    function onExportAll() {
      useExportAllOfFJ({
        $tableInstance: waitTable.value,
        beforeRequest: (config) => {
          config.fileName = `${store.state.curNavModule.name}-${modalStaticProperty.title}`
          config.requestParam = {
            ...config.requestParam,
            reportCode: reportCodeMap[$route.name].reportCode,
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
      showExportAllBtn,
      tableConfig,
      exportLoading,
      onExportAll,
      columns,
      tableData,
      resetFetchTableData,
      tableLoadingState,
      fetchTableData,
      pagerChange,
      tableToolbarConfig,
      onToolbarBtnClick,
      pagerConfig,
      modalStaticProperty,
      dialogVisible,
      dialogClose,
      searchDataList,
      isShowQueryConditions,
      tableStaticProperty,
      reportInsert,
      cellClick,
      selectData,
      waitTable,
      CarrImplRegiSecondModal,
      injectData,
      isFuJian,
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
.carryImplementationRegionModal{

  /deep/ .vxe-pager--total{
    display: none;
  }
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
