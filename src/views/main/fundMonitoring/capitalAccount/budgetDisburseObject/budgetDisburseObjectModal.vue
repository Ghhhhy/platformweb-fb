<template>
  <vxe-modal
    v-model="dialogVisible"
    v-loading="tableLoadingState"
    v-bind="modalStaticProperty"
    class="carryImplementationRegionModal"
    @close="dialogClose"
  >
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
// import usevModel from "@/"
import { post } from '@/api/http'
import store from '@/store/index'
// import { message } from 'element-ui'
export default defineComponent({
  props: {
    clickRow: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {},
  setup(props, ctx) {
    // /*eslint-disable */
    const clickColumns = [
      {
        title: '区划',
        width: 180,
        field: 'mofDivCode',
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '支付凭证号',
        width: 180,
        field: 'payCertNo',
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '金额(元)',
        width: 180,
        field: 'payAmt',
        sortable: false,
        filters: false,
        align: 'center',
        combinedType: ['average', 'subTotal', 'total', 'totalAll', 'switchTotal'],
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '项目名称',
        width: 180,
        field: 'proName',
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '项目代码',
        width: 180,
        field: 'proCode',
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '收款账户名称',
        width: 180,
        field: 'payeeAcctName',
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '收款方账户',
        width: 180,
        field: 'payeeAcctNo',
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '收款人开户银行',
        width: 180,
        field: 'payeeAcctBankName',
        sortable: false,
        filters: false,
        align: 'center'
      },
      // {
      //   title: '编号',
      //   width: 180,
      //   field: 'nhbh',
      //   sortable: false,
      //   filters: false,
      //   align: 'center',
      //   visible: false
      // },
      {
        title: '街道(乡镇)名称',
        width: 180,
        field: 'townName',
        sortable: false,
        filters: false,
        align: 'left'
      },
      {
        title: '村名称',
        width: 180,
        field: 'villageName',
        sortable: false,
        filters: false,
        align: 'left'
      },
      {
        title: '证件号码',
        width: 180,
        field: 'idenNo',
        sortable: false,
        filters: false,
        align: 'left'
      },
      {
        title: '姓名',
        width: 180,
        field: 'perName',
        sortable: false,
        filters: false,
        align: 'left'
      },
      {
        title: '按户或按人补助',
        width: 180,
        field: 'toPeopFamily',
        sortable: false,
        filters: false,
        tooltipFormat: ({ row, column }) => {
          const mapEnmu = { '01': '到人', '02': '到户' }
          return mapEnmu[row.toPeopFamily] || ''
        },
        formatter: ({ row }) => {
          const mapEnmu = { '01': '到人', '02': '到户' }
          return mapEnmu[row.toPeopFamily] || ''
        },
        align: 'center'
      },
      {
        title: '备注',
        width: 180,
        field: 'addWord',
        sortable: false,
        filters: false,
        align: 'left'
      },
      {
        title: '发放月份',
        width: 180,
        field: 'payMonth',
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '社会统一信用代码',
        width: 180,
        field: 'unifsocCredCode',
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '企业名称',
        width: 180,
        field: 'corpName',
        sortable: false,
        filters: false,
        align: 'center'
      }
    ]
    /* eslint-disable-next-line */
    const { $route } = getCurrentInstance().proxy
    const modalStaticProperty = computed(() => {
      return {
        title: '惠企利民发放明细表',
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
      fetch: (params = {}) => post(BSURL.dfr_benefitEnterprisesAndPeoplePageQueryFfb, params),
      beforeFetch: params => {
        const queryForm = {
          ...params,
          fiscalYear: store.getters.getuserInfo.year,
          mofDivCode: props.clickRow.mofDivCode,
          hqlm: props.clickRow.hqlm,
          proCode: props.clickRow.proCode,
          proName: props.clickRow.proName
        }
        return queryForm
      },
      afterFeatch: (tableData) => {
        return tableData
      },
      columns: clickColumns,
      tableToolbarConfig: {
        disabledMoneyConversion: false,
        moneyConversion: true // 是否有金额转换
      },
      dataKey: 'data.records'
    }, false)
    const tableStaticProperty = reactive({
      border: true,
      resizable: true,
      showOverflow: true,
      height: '100%',
      align: 'left',
      footerConfig: {
        showFooter: true,
        totalObj: { // totalAll和 switchTotal需要配置 其他可以不配
          amount: 0, // 对应column的field
          payAmt: 0
        },
        combinedType: ['average', 'subTotal', 'total', 'totalAll', 'switchTotal']
      },
      // defaultMoneyUnit: computed(() => tableType.value === 'bgt' ? 1 : 10000),
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

      }
    }
    const init = () => {
      resetFetchTableData()
    }
    const searchDataList = reactive({})
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
      tableStaticProperty,
      cellClick,
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
