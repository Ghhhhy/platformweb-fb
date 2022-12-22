<template>
  <div style="height: 100%">
    <BsMainFormListLayout :left-visible="false">
      <template v-slot:topTabPane>
        <BsTabPanel
          :tab-status-btn-config="tabStatusBtnConfig"
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
            v-loading="tableLoadingState"
            :table-config="tableConfig"
            :table-columns-config="columns"
            :table-data="tableData"
            :toolbar-config="tableToolbarConfig"
            :pager-config="pagerConfig"
            size="medium"
            @register="registerTable"
            @ajaxData="pagerChange"
            @onToolbarBtnClick="onToolbarBtnClick"
          >
            <template v-slot:toolbarSlots>
              <div class="table-toolbar-left" style="display: flex; align-items: center;">
                <BsTableTitle title="统计分析" />
                <p style="font-size: 14px">说明：支出处室审核时间当月数据=当月审核间隔天数总和/总笔数</p>
              </div>
            </template>
          </BsTable>
        </div>
      </template>
    </BsMainFormListLayout>
  </div>
</template>

<script>
import { defineComponent, toRaw } from '@vue/composition-api'

import useTable from '@/hooks/useTable'
import useForm from '@/hooks/useForm'
import useTabPlanel from '../common/hooks/useTabPlanel'

import { queryRule } from '@/api/frame/main/statisticAnalysis/rulesStatistic.js'
import { getIndexColumns, getSearchSchemas } from './model/data.js'

export default defineComponent({
  setup(_) {
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
    ] = useForm(getSearchSchemas())

    /**
     * 搜索&重置
     * */
    function search(obj) {
      Object.assign(formData, obj)
      setSubmitFormData(toRaw(formData))

      resetFetchTableData()
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
      fetch: queryRule,
      columns: getIndexColumns(),
      getSubmitFormData,
      dataKey: 'data.results'
    })

    /**
     * 顶部tab模块
     */
    const {
      tabStatusBtnConfig,
      isShowSearchForm,
      onQueryConditionsClick
    } = useTabPlanel()
    tabStatusBtnConfig.value.buttonsInfo = null

    return {
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
