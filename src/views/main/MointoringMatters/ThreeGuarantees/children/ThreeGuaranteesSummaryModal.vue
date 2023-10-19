<template>
  <vxe-modal
    v-model="dialogVisible"
    v-bind="modalStaticProperty"
    class="carryImplementationRegionModal"
    @close="dialogClose"
  >
    <!-- <BsMainFormListLayout> -->
    <!-- <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryFrom"
            @onSearchClick="fetchTableData"
            @onSearchResetClick="resetFetchTableData"
          />
        </div>
      </template> -->
    <!-- <template v-slot:mainForm> -->
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
      @cellClick="cellClick"
    >
      <template v-slot:toolbar-custom-slot>
        单位：万元
      </template>
    </BsTable>
    <!-- </template> -->
    <!-- </BsMainFormListLayout> -->
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
// import store from '@/store/index'
// import { message } from 'element-ui'
export default defineComponent({
  components: {
  },
  setup() {
    /**
     * @interface reportCodeMap<{ $route.name : reportCode }>
     */
    /*eslint-disable */
    const reportCodeMap = {
      'CarryImplementationRegion': {
        reportCode: 'jzzjysxd_level1',
        querykey: 'mofDivCode'
      },
      'CarryImplementationCapital': {
        reportCode: 'jzzjysxd_level1',
        querykey: 'trackProCode'
      },
      'CarryPayRegion': {
        reportCode: 'jzzjzcxd_level1',
        querykey: 'mofDivCode'
      },
      'CarryPayCapital': {
        reportCode: 'jzzjzcxd_level1',
        querykey: 'trackProCode'
      }
    }
    const { $route } = getCurrentInstance().proxy
    const CarrImplRegiSecondModal = ref()
    const waitTable = ref(null)
    const tableType = ref('')
    const clickType = ref('')
    const injectData = ref({
      mofDivCode: ''
    })
    const modalStaticProperty = {
      title: '项目明细',
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
    const cellClickColumns = computed(() => {
      if (tableType.value === 'bgt' && clickType.value === 'total') {
        return bgtTotalTableColumns
      } else if (tableType.value === 'bgt' && clickType.value === 'region') {
        return bgtRegionTableColumns
      } else if (tableType.value === 'pay' && clickType.value === 'total') {
        return payTotalTableColumns
      } else if (tableType.value === 'pay' && clickType.value === 'region') {
        return payRegionTableColumns
      }
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
      fetch: (params) => post(BSURL.lmp_mofDivTree, params),
      beforeFetch: params => {
        return params
      },
      columns: cellClickColumns,
      tableToolbarConfig:{
        disabledMoneyConversion: false,
        moneyConversion: true, // 是否有金额转换
      },
      dataKey: 'data.data'
    }, false)
    const tableStaticProperty = reactive({
      border: true,
      resizable: true,
      showOverflow: true,
      height: '100%',
      align: 'left',
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
    console.log('columns',columns)
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
      resetFetchTableData()
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
      tableType,
      clickType,
      cellClickColumns,
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
