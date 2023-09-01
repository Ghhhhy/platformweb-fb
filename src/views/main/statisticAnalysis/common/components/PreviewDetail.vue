<template>
  <vxe-modal
    v-model="visible"
    :destroy-on-close="true"
    title="查看详情"
    class="PreviewDetail"
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
          @cellClick="cellClick"
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
import { defineComponent, ref, unref, provide, inject } from '@vue/composition-api'
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
  getWarnTypeColumn,
  getMofDivCodeColumn
} from '@/views/main/handlingOfViolations/model/data.js'
import { queryRuleData } from '@/api/frame/main/statisticAnalysis/rulesStatistic.js'
import { queryDepData } from '@/api/frame/main/statisticAnalysis/unitStatistic.js'
import { RouterPathEnum } from '../model/enum'
import { useFooter } from '../hooks/useFooter'
import { transJson1, transJson3 } from '@/utils/params.js'
import store from '@/store'

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
    queryData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 勾选行
    currentRow: {
      type: Object,
      default: () => ({})
    }
  },
  model,
  setup(props, { emit }) {
    let type = ''
    /**
     * 弹窗内部状态
     * */
    const { queryData } = props
    const { visible } = useModalInner(props, emit, model)

    // 处理单查看弹窗
    const [handlingOfViolationsModel, changeHOVModelVisible] = useModal()

    // 页面路由
    const pagePath = inject('pagePath')
    // 根组件方法 loadBsConfig(动态表格配置请求方法)
    const loadBsConfig = inject('loadBsConfig')
    provide('loadBsConfig', loadBsConfig)
    // 详情双击行
    const detailCurrentRow = ref(null)

    const differentColumns = [
      getAgencyNameColumn(),
      getMofDivCodeColumn(),
      getRuleNameColumn({
        title: '规则名称',
        width: 140
      })
    ]

    const { footerConfig } = useFooter()
    /**
     * 动态表格配置
     * */
    let columnsSS = ref([])
    async function loadConfig(id) {
      let params = {
        tableId: {
          id: id,
          fiscalyear: store.state.userInfo.year,
          mof_div_code: store.state.userInfo.province,
          menuguid: store.state.curNavModule.guid
        }
      }
      let configData = await loadBsConfig(params)
      return configData.itemsConfig
    }
    /**
     *判断使用本地配置||动态配置
     * */
    if (transJson3(store.state.curNavModule.param5) && transJson3(store.state.curNavModule.param5).isConfigTable === '1') {
      loadConfig('Table201').then(res => {
        columnsSS.value = res
      })
    } else {
      columnsSS.value = [
        ...(unref(pagePath) === RouterPathEnum.RULE_STATISTIC ? differentColumns : differentColumns.reverse()),
        getWarnLevelColumn(),
        getControlTypeColumn(),
        getWarnTypeColumn(),
        ...getWarnCountColumns(),
        getIsDirColumn()
      ]
    }
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
      fetch: unref(pagePath) === RouterPathEnum.UNIT_STATISTIC ? queryDepData : queryRuleData,
      beforeFetch: params => {
        const { fiRuleCodes, agencyCode } = props.currentRow
        const property = unref(pagePath) === RouterPathEnum.UNIT_STATISTIC ? 'agencyCode' : 'fiRuleCodes'
        const value = unref(pagePath) === RouterPathEnum.UNIT_STATISTIC ? agencyCode : fiRuleCodes
        return {
          ...params,
          paramCode: transJson1(store.state.curNavModule.param5 || '')?.paramCode,
          isFilterByPerm: transJson1(store.state.curNavModule.param5 || '')?.isFilterByPerm,
          fiRuleName: props.currentRow.ruleName,
          ...queryData,
          [property]: value
        }
      },
      finallyFetch: data => {
        footerConfig.value.totalObj = data?.warnHJVO || {}
      },
      columns: columnsSS,
      dataKey: 'data.results'
    })
    /**
     * 双击单元格
     * */
    // function cellDblclick(a, b, e) {
    function cellDblclick({ row }) {
      // detailCurrentRow.value = row
      // // console.log('log-------', a, b, e)
      // changeHOVModelVisible(true)
    }
    function cellClick(obj, context, e) {
      let key = obj.column.property
      if (key === 'onWay') {
        this.type = '3'
      } else if (key === 'prohibit') {
        this.type = '2'
      } else if (key === 'release') {
        this.type = '1'
      } else {
        this.type = ''
      }
      obj.row.type = this.type
      detailCurrentRow.value = obj.row
      console.log('---------------', obj.row.type)
      console.log('---------------', obj.row)
      changeHOVModelVisible(true)
    }

    return {
      visible,
      handlingOfViolationsModel,
      detailCurrentRow,
      type,
      cellCursorUnderlineClassName,
      cellDblclick,
      cellClick,
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
.PreviewDetail{
  /deep/ .vxe-pager--total{
    display: none;
  }
}
</style>
