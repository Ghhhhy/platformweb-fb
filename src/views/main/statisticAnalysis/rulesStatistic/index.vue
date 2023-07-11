<template>
  <div style="height: 100%">
    <BsMainFormListLayout :left-visible="false">
      <template v-slot:topTabPane>
        <BsTabPanel
          :tab-status-btn-config="tabStatusBtnConfig"
          :is-open="isShowSearchForm"
          @onQueryConditionsClick="onQueryConditionsClick"
        />
      </template>
      <template v-slot:query>
        <div v-show="isShowSearchForm" class="main-query">
          <BsQuery
            :query-form-item-config="formSchemas"
            :query-form-data="formData"
            @onSearchClick="search"
            @register="registerForm"
          />
        </div>
      </template>
      <template v-slot:mainForm>
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
              <div class="table-toolbar-left">
                <BsTableTitle title="统计分析" />
              </div>
            </template>
          </BsTable>
        </div>
      </template>
    </BsMainFormListLayout>
    <PreviewDetail
      v-if="visibleState"
      v-model="visibleState"
      :current-row="currentRow"
      @closeAll="closeAllHandle"
    />
  </div>
</template>

<script>
import { defineComponent, provide, ref, toRaw } from '@vue/composition-api'
import PreviewDetail from '../common/components/PreviewDetail'

import useTable from '@/hooks/useTable'
import useForm from '@/hooks/useForm'
import useTabPlanel from '../common/hooks/useTabPlanel'
import { useModal } from '@/hooks/useModal/index'
import { queryRule } from '@/api/frame/main/statisticAnalysis/rulesStatistic.js'
import {
  getWarnCountColumns,
  searchFormCommonSchemas,
  cellCursorUnderlineClassName
} from '@/views/main/statisticAnalysis/common/model/data.js'
import {
  getRuleNameColumn,
  getIsDirColumn,
  getWarnLevelColumn,
  getControlTypeColumn
} from '@/views/main/handlingOfViolations/model/data.js'
import { useFooter } from '../common/hooks/useFooter'
import { transJson1, transJson2, transJson3 } from '@/utils/params.js'
import store from '@/store'
import { Message } from 'element-ui'

export default defineComponent({
  components: {
    PreviewDetail
  },
  setup(_, { root }) {
    const route = root.$route

    // 页面路由
    const pagePath = ref(route.path)

    /**
     * modalType:弹窗打开操作
     * pagePath:页面路由
     */
    provide('pagePath', pagePath)
    // 因【处理单查看】等子孙组件使用到inject('modalType')，故此提供一个空值，避免报错
    provide('modalType', '')
    // 子组件传递根组件方法
    provide('loadBsConfig', root.loadBsConfig)
    // 规则弹窗显隐
    const [visibleState, setVisibleState] = useModal()
    // 当前操作行
    const currentRow = ref(null)

    /**
     * 搜索表单
     */
    const [
      {
        formData,
        formSchemas,
        setSubmitFormData,
        getSubmitFormData
      },
      registerForm
    ] = useForm(searchFormCommonSchemas)

    /**
     * 搜索&重置
     * */
    function search(obj) {
      Object.assign(formData, obj)
      setSubmitFormData(toRaw(formData))

      resetFetchTableData()
    }
    /**
     * 动态表格配置
     * */
    let columnsSS = ref(null)
    async function loadConfig(id) {
      let params = {
        tableId: {
          id: id,
          fiscalyear: store.state.userInfo.year,
          mof_div_code: store.state.userInfo.province,
          menuguid: store.state.curNavModule.guid
        }
      }
      let configData = await root.loadBsConfig(params)
      return configData.itemsConfig
    }
    /**
     *判断使用本地配置||动态配置
     * */
    if (transJson3(store.state.curNavModule.param5) && transJson3(store.state.curNavModule.param5).isConfigTable === '1') {
      loadConfig('Table101').then(res => {
        columnsSS.value = res
      })
      loadConfig('Query101').then(res => {
        formSchemas.value = res
      })
    } else {
      columnsSS.value = [
        getRuleNameColumn({
          title: '规则名称',
          minWidth: 100,
          // width: 200
          width: 'auto'
        }),
        getWarnLevelColumn(),
        getControlTypeColumn(),
        ...getWarnCountColumns(),
        getIsDirColumn({
          // minWidth: 100
          width: 120
          // width: 'auto'
        })
      ]
    }
    /**
     * 关闭所有弹窗
     * */
    function closeAllHandle() {
      setVisibleState(false)
    }
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
        onToolbarBtnClick,
        getTable
      },
      registerTable
    ] = useTable({
      fetch: queryRule,
      beforeFetch: params => {
        return {
          ...params,
          ruleCodes: transJson2(store.state.curNavModule.param5 || '')?.ruleCodes,
          paramCode: transJson1(store.state.curNavModule.param5 || '')?.paramCode,
          isFilterByPerm: transJson1(store.state.curNavModule.param5 || '')?.isFilterByPerm
        }
      },
      finallyFetch: data => {
        footerConfig.value.totalObj = data?.warnHJVO || {}
      },
      columns: columnsSS,
      getSubmitFormData,
      dataKey: 'data.results'
    })

    /**
     * 双击单元格
     * */
    function cellDblclick(row) {
      currentRow.value = row.row
      if (row.row[row.column.property] * 1 !== 0) {
        setVisibleState(true)
      } else {
        Message.warning('数据等于零时无法钻取!')
      }
    }
    /**
     * 顶部tab模块
     */
    const {
      tabStatusBtnConfig,
      isShowSearchForm,
      onQueryConditionsClick
    } = useTabPlanel(setVisibleState, getTable, currentRow)

    return {
      visibleState,

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
      resetFetchTableData,
      cellCursorUnderlineClassName,

      currentRow,
      closeAllHandle,

      tabStatusBtnConfig,
      isShowSearchForm,
      onQueryConditionsClick,

      registerForm,
      formData,
      formSchemas,
      search
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
