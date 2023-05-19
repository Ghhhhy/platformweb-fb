<template>
  <vxe-modal
    v-model="visible"
    :destroy-on-close="true"
    title="查看详情"
    width="90%"
    height="90%"
    resize
    show-footer
  >
    <template #footer>
      <!--查看-->
      <el-button size="small" @click="visible = false">关闭</el-button>
    </template>
    <div style="height: calc(100% - 4px)">
      <div style="height: 100%">
        <BsTable
          :loading="tableLoadingState"
          :table-config="tableConfig"
          :table-columns-config="columns"
          :table-data="tableData"
          :footer-config="footerConfig"
          :toolbar-config="tableToolbarConfig"
          :pager-config="pagerConfig"
          size="medium"
          :cell-class-name="cellCursorUnderlineClassName"
          @register="registerTable"
          @ajaxData="pagerChange"
          @onToolbarBtnClick="onToolbarBtnClick"
          @cellDblclick="cellDblclick"
        >
          <template v-slot:toolbarSlots>
            <bs-table-title title="按规则查看" />
          </template>
        </BsTable>
      </div>
    </div>
    <HandlingOfViolationsModal
      v-if="handlingOfViolationsModel"
      v-model="handlingOfViolationsModel"
      :current-row="detailCurrentRow"
      v-on="$listeners"
    />
  </vxe-modal>
</template>

<script>
import { defineComponent, ref, unref, inject } from '@vue/composition-api'
import HandlingOfViolationsModal from '../components/HandlingOfViolationsModal'
import useTable from '@/hooks/useTable'
import { useModal, useModalInner } from '@/hooks/useModal/index'

import { getWarnCountColumns, cellCursorUnderlineClassName } from '@/views/main/statisticAnalysis/common/model/data.js'
import {
  getRuleNameColumn,
  getIsDirColumn,
  getAgencyNameColumn,
  getWarnLevelColumn,
  getControlTypeColumn,
  getWarnTypeColumn
} from '@/views/main/handlingOfViolations/model/data.js'
import { queryRuleData } from '@/api/frame/main/statisticAnalysis/rulesStatistic.js'
import { queryDepData } from '@/api/frame/main/statisticAnalysis/unitStatistic.js'
import { RouterPathEnum } from '../model/enum'
import { useFooter } from '../hooks/useFooter'

const model = {
  prop: 'value',
  event: 'changePreviewDetailVisible'
}
export default defineComponent({
  components: {
    HandlingOfViolationsModal
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

    // 处理单查看弹窗
    const [handlingOfViolationsModel, changeHOVModelVisible] = useModal()

    // 页面路由
    const pagePath = inject('pagePath')

    // 详情双击行
    const detailCurrentRow = ref(null)

    const differentColumns = [
      getAgencyNameColumn(),
      getRuleNameColumn({
        title: '规则名称'
      })
    ]

    const { footerConfig } = useFooter()
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
      fetch: unref(pagePath) === RouterPathEnum.RULE_STATISTIC ? queryRuleData : queryDepData,
      beforeFetch: params => {
        const { fiRuleCode, agencyCode } = props.currentRow
        const property = unref(pagePath) === RouterPathEnum.RULE_STATISTIC ? 'fiRuleCode' : 'agencyCode'
        const value = unref(pagePath) === RouterPathEnum.RULE_STATISTIC ? fiRuleCode : agencyCode
        return {
          ...params,
          [property]: value
        }
      },
      finallyFetch: data => {
        footerConfig.value.totalObj = data?.warnHJVO || {}
      },
      columns: [
        ...(unref(pagePath) === RouterPathEnum.RULE_STATISTIC ? differentColumns : differentColumns.reverse()),
        getWarnLevelColumn(),
        getControlTypeColumn(),
        getWarnTypeColumn(),
        ...getWarnCountColumns(),
        getIsDirColumn()
      ],
      dataKey: 'data.results'
    })

    /**
     * 双击单元格
     * */
    function cellDblclick({ row }) {
      detailCurrentRow.value = row
      changeHOVModelVisible(true)
    }

    return {
      visible,
      handlingOfViolationsModel,
      detailCurrentRow,

      cellCursorUnderlineClassName,
      cellDblclick,
      footerConfig,
      columns,
      registerTable,
      tableConfig,
      tableData,
      tableLoadingState,
      pagerConfig,
      tableToolbarConfig,
      onToolbarBtnClick,
      pagerChange,
      resetFetchTableData
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
