<template>
  <vxe-modal
    v-model="visible"
    :destroy-on-close="true"
    title="业务单据查看"
    width="80%"
    height="80%"
    :show-footer="pagePath === RouterPathEnum.RULE_STATISTIC"
  >
    <template #footer>
      <vxe-button size="small" @click="visible = false">返回</vxe-button>
      <vxe-button size="small" @click="$emit('closeAll')">关闭</vxe-button>
    </template>
    <div style="height: calc(100% - 4px)">
      <BsQuery
        ref="queryFrom"
        :query-form-item-config="formSchemas"
        :query-form-data="formData"
        @onSearchClick="search"
      />
      <BsTable
        :loading="tableLoadingState"
        :table-config="tableConfig"
        :table-columns-config="columns"
        :table-data="tableData"
        :toolbar-config="tableToolbarConfig"
        :pager-config="pagerConfig"
        size="medium"
        style="height: calc(100% - 50px)"
        @onToolbarBtnClick="onToolbarBtnClick"
        @ajaxData="pagerChange"
      >
        <template v-slot:toolbarSlots>
          <bs-table-title title="支付明细" />
        </template>
      </BsTable>
    </div>
  </vxe-modal>
</template>

<script>
import { defineComponent, inject, toRaw } from '@vue/composition-api'
import useTable from '@/hooks/useTable'
import useForm from '@/hooks/useForm'
import {
  getWarnLevelColumn,
  getControlTypeColumn,
  getCreateTimeColumn,
  getAgencyNameColumn,
  getDeptNameColumn,
  getManageMofDepNameColumn,
  getBusinessNoColumn,
  getRuleNameColumn,
  getAmountColumn,
  getWarnTypeColumn,
  getIsDirColumn,
  getReceiptsColumns,
  receiptsSearchFormSchemas
} from '../model/data'
import { useModalInner } from '@/hooks/useModal/index'
import { RouterPathEnum } from '@/views/main/statisticAnalysis/common/model/enum.js'
import { billPage } from '@/api/frame/main/handlingOfViolations/index.js'

const model = {
  prop: 'value',
  event: 'changeReceiptsVisible'
}
export default defineComponent({
  props: {
    // 显隐
    value: {
      type: Boolean,
      default: false
    },
    currentNode: {
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

    const pagePath = inject('pagePath')

    const [
      {
        formData,
        formSchemas,
        getSubmitFormData,
        setSubmitFormData
      }
    ] = useForm(
      receiptsSearchFormSchemas
    )

    /**
     * 搜索重置
     * */
    function search(params) {
      Object.assign(formData, params)
      setSubmitFormData(toRaw(formData))
      resetFetchTableData()
    }

    /**
     * 表格
     * */
    const [
      {
        columns,
        tableConfig,
        tableData,
        onToolbarBtnClick,
        tableToolbarConfig,
        resetFetchTableData,
        pagerConfig,
        pagerChange,
        tableLoadingState
      }
    ] = useTable({
      fetch: billPage,
      getSubmitFormData,
      beforeFetch: params => {
        return {
          ...params,
          // 规则编码
          fiRuleCode: props.currentNode.ruleCode || props.currentNode.fiRuleCode,
          // 凭证id
          payCertId: props.currentNode.businessNo || props.currentNode.payCertNo
        }
      },
      dataKey: 'data.results',
      columns: [
        getWarnLevelColumn('$vxeSelect'),
        getControlTypeColumn(),
        getCreateTimeColumn({
          field: 'warnTime'
        }),
        getAgencyNameColumn(),
        getDeptNameColumn(),
        getManageMofDepNameColumn(),
        getRuleNameColumn({
          field: 'fiRuleName'
        }),
        getAmountColumn({
          field: 'payAppAmt'
        }),
        getWarnTypeColumn(),
        getIsDirColumn(),
        getBusinessNoColumn({
          field: 'payAppNo'
        }),
        ...getReceiptsColumns()
      ]
    })
    // 全局配置
    tableConfig.globalConfig = {
      checkType: false,
      seq: true,
      cellClickCheck: false
    }

    return {
      visible,
      pagePath,
      RouterPathEnum,

      formData,
      formSchemas,
      search,

      tableLoadingState,
      pagerConfig,
      pagerChange,
      resetFetchTableData,
      columns,
      tableConfig,
      tableData,
      onToolbarBtnClick,
      tableToolbarConfig
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
