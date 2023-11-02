<template>
  <vxe-modal
    v-model="dialogVisible"
    v-bind="modalStaticProperty"
    class="carryImplementationRegionModal"
    @close="dialogClose"
  >
    <BsTable
      ref="waitTable"
      :loading="tableLoadingState"
      v-bind="tableStaticProperty"
      class="Titans-table"
      :table-columns-config="columns"
      :table-data="tableData"
      :pager-config="pagerConfig"
      :toolbar-config="tableToolbarConfig"
      @onToolbarBtnClick="onToolbarBtnClick"
      @ajaxData="pagerChange"
      @cellClick="cellClick"
    >
      <template v-slot:toolbar-custom-slot>
        单位：万元
      </template>
    </BsTable>
  </vxe-modal>
</template>

<script>
import { defineComponent, reactive, ref, onMounted, getCurrentInstance, computed } from '@vue/composition-api'
import useTable from '@/hooks/useTable'
import { post } from '@/api/http'
import {
  bgtTotalTableColumns,
  bgtRegionTableColumns,
  payTotalTableColumns,
  payRegionTableColumns
} from './columns'
import store from '@/store/index'
// import { message } from 'element-ui'
export default defineComponent({
  components: {},
  setup() {
    /**
     * @interface clickCodeMap<{ $route.name : reportCode }>
     */
    const clickCodeMap = {
      bgt: {
        reportCode: 'sbzcyjhzb_ysmx',
        title: '预算明细',
        total: bgtTotalTableColumns,
        region: bgtRegionTableColumns
      },
      pay: {
        reportCode: 'sbzcyjhzb_zcmx',
        title: '支出明细',
        total: payTotalTableColumns,
        region: payRegionTableColumns
      }
    }
    /* eslint-disable-next-line */
    const { $route } = getCurrentInstance().proxy
    const CarrImplRegiSecondModal = ref()
    const waitTable = ref(null)
    const clickColumnsInfo = ref({})
    const clickRowInfo = ref({})
    const clickType = ref('')
    const parentQueryData = ref({})
    const injectData = ref({
      mofDivCode: ''
    })
    const queryData = ref({})
    const modalStaticProperty = computed(() => {
      return {
        title: clickCodeMap[clickColumnsInfo.value.tableType]?.title,
        width: '96%',
        height: '80%',
        position: 'center',
        minWidth: '900',
        showFooter: false
      }
    })
    const dialogVisible = ref(false)
    const dialogClose = () => {
      dialogVisible.value = false
    }
    const cellClickColumns = computed(() => {
      if (clickColumnsInfo.value.tableType && clickType.value) {
        return clickCodeMap[clickColumnsInfo.value.tableType][clickType.value]
      }
      return []
    })

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
      fetch: (params = {}) => post(BSURL.dfr_supervisionPageQuery, params),
      beforeFetch: params => {
        params.reportCode = clickCodeMap[clickColumnsInfo.value.tableType]?.reportCode
        params.mof_div_code = clickRowInfo.value.mofDivCode
        params.threesafe_symbolcat_code = clickColumnsInfo.value.threesafe_symbolcat_code
        params.fiscal_year = store.getters.getuserInfo.year
        if (clickColumnsInfo.value.tableType === 'bgt') {
          params.endTime = parentQueryData.value.endTime
        } else if (clickColumnsInfo.value.tableType === 'pay') {
          params.xpayDate = parentQueryData.value.endTime
        }
        queryData.value = params
        return params
      },
      columns: cellClickColumns,
      tableToolbarConfig: {
        disabledMoneyConversion: false,
        moneyConversion: true // 是否有金额转换
      },
      dataKey: 'data.results'
    }, false)
    const tableStaticProperty = reactive({
      border: true,
      resizable: true,
      showOverflow: true,
      height: '100%',
      align: 'left',
      footerConfig: {
        totalObj: {
          amount: 0,
          payappamt: 0,
          payamount: 0
        },
        combinedType: ['switchTotal'],
        showFooter: true
      },
      defaultMoneyUnit: 1,
      cellStyle: ({ row, rowIndex, column }) => {
        // 有效的cellValue
        const validCellValue = (row[column.property] * 1)
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
      if (validCellValue && !row.children && column.own.canInsert) {
        CarrImplRegiSecondModal.value.dialogVisible = true
        CarrImplRegiSecondModal.value.injectData = row
        CarrImplRegiSecondModal.value.init()
      }
    }
    const init = () => {
      tableData.value = []
      resetFetchTableData()
      queryFooterData()
    }
    const queryFooterData = () => {
      const params = { ...queryData.value }
      delete params.page
      delete params.pageSize
      post(BSURL.dfr_supervisionSum, params).then(res => {
        if (res && res.code === '000000' && res.data) {
          tableStaticProperty.value.footerConfig.totalObj = res.data
        }
      })
    }
    const searchDataList = reactive({})
    const isShowQueryConditions = ref(true)
    let selectData = ref([])
    onMounted(() => {

    })
    return {
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
      cellClick,
      selectData,
      waitTable,
      CarrImplRegiSecondModal,
      injectData,
      clickColumnsInfo,
      clickRowInfo,
      clickType,
      parentQueryData,
      init
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
