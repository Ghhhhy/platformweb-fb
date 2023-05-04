<template>
  <vxe-modal
    v-model="visible"
    :destroy-on-close="true"
    title="查看详情"
    width="85%"
    height="85%"
    resize
    show-footer
  >
    <template #footer>
      <vxe-button size="small" @click="visible = false">返回</vxe-button>
      <vxe-button size="small" @click="$emit('closeAll')">关闭</vxe-button>
    </template>
    <div style="height: calc(100% - 4px)">
      <div style="height: 100%">
        <BsTable
          :loading="tableLoadingState"
          :table-config="tableConfig"
          :table-columns-config="columns"
          :table-data="tableData"
          :toolbar-config="tableToolbarConfig"
          :pager-config="pagerConfig"
          size="medium"
          :cell-class-name="obj => cellCursorUnderlineClassName(obj, ['warningCode'])"
          @register="registerTable"
          @ajaxData="pagerChange"
          @onToolbarBtnClick="onToolbarBtnClick"
          @cellDblclick="cellDblclick"
        >
          <template v-slot:toolbarSlots>
            <bs-table-title title="监控处理单" />
          </template>
        </BsTable>
      </div>
    </div>
    <HandlingOfViolationsDetailModal
      v-if="hOVDetailModel"
      v-model="hOVDetailModel"
      :checked-records="[detailCurrentRow]"
      v-on="$listeners"
    />
  </vxe-modal>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import useTable from '@/hooks/useTable'
import { useModal, useModalInner } from '@/hooks/useModal/index'
import HandlingOfViolationsDetailModal from './HandlingOfViolationsDetailModal'
import { queryAuditTable } from '@/api/frame/main/statisticAnalysis/rulesStatistic.js'
import { cellCursorUnderlineClassName } from '../model/data'
import {
  getRuleNameColumn,
  getControlTypeColumn,
  getStatusCodeColumn,
  getWarningCodeColumn,
  getCreateTimeColumn,
  getAgencyNameColumn,
  getDeptNameColumn,
  getManageMofDepNameColumn,
  getBusinessNoColumn,
  getAuditDescriptionColumn,
  getIsDirColumn,
  getAmountColumn
} from '@/views/main/handlingOfViolations/model/data.js'

const model = {
  prop: 'value',
  event: 'changeHOVInnerVisible'
}
export default defineComponent({
  components: {
    HandlingOfViolationsDetailModal
  },
  props: {
    // 显隐
    [model.prop]: {
      type: Boolean,
      default: false
    },
    // 勾选行
    currentRow: {
      type: Object,
      default: () => ({})
    }
  },
  model,
  setup(props, { emit }) {
    /**
     * 弹窗内部状态
     * */
    const { visible } = useModalInner(props, emit, model)

    // 处理单弹窗
    const [hOVDetailModel, changeHOVDetailModelVisible] = useModal()

    // 详情双击行
    /*eslint-disable*/
    const detailCurrentRow = ref(null)

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
        pagerChange,
        pagerConfig,
        onToolbarBtnClick
      },
      registerTable
    ] = useTable({
      fetch: queryAuditTable,
      beforeFetch: params => {
        const { fiRuleCode, agencyCode } = props.currentRow
        return {
          ...params,
          fiRuleCode,
          agencyCode
        }
      },
      columns: [
        getRuleNameColumn(),
        getControlTypeColumn(),
        getStatusCodeColumn(),
        getWarningCodeColumn(),
        getCreateTimeColumn(),
        getAgencyNameColumn(),
        getDeptNameColumn(),
        getManageMofDepNameColumn(),
        getBusinessNoColumn(),
        getAmountColumn(),
        getAuditDescriptionColumn(),
        getIsDirColumn()
      ],
      dataKey: 'data.results'
    })

    /**
     * 双击单元格
     * */
    function cellDblclick({ row }) {
      detailCurrentRow.value = row
      changeHOVDetailModelVisible(true)
    }

    return {
      visible,
      hOVDetailModel,

      cellDblclick,
      detailCurrentRow,
      columns,
      registerTable,
      tableConfig,
      tableData,
      tableLoadingState,
      pagerConfig,
      tableToolbarConfig,
      onToolbarBtnClick,
      pagerChange,
      resetFetchTableData,

      cellCursorUnderlineClassName
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
