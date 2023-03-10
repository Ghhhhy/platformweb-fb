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
import { getIndexColumns, getSearchSchemas } from './model/data.js'

import treeApi from '@/api/frame/common/tree/unitTree.js'
import { checkRscode } from '@/utils/checkRscode'
import { queryPayEfficiency } from '@/api/frame/main/statisticAnalysis/efficiencySheetStatistic'

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
        getSubmitFormData,
        updateFormSchemas
      },
      registerForm
    ] = useForm(getSearchSchemas())
    /**
     * 获取树
     * */
    async function getElementTreeHandle(field = '') {
      const { data } = checkRscode(
        await treeApi.getElementTree({
          elementCode: field === 'deptCode' ? 'dept' : 'manage_mof_dep'
        })
      )
      updateFormSchemas({
        field,
        itemRender: {
          options: data || []
        }
      })
    }
    Promise.all(
      [
        getElementTreeHandle('manageMofDepCode'),
        getElementTreeHandle('deptCode')
      ]
    )

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
      fetch: queryPayEfficiency,
      // beforeFetch: params => {
      //   /*eslint-disable*/
      //   const { manageMofDepCode_code, deptCode_code, month } = getSubmitFormData()
      //   return {
      //     ...params,
      //     manageMofDepCode: manageMofDepCode_code || '',
      //     deptCode: deptCode_code || '',
      //     month: month || ''
      //   }
      // },
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
