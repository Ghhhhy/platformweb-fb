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
              <div class="table-toolbar-left">
                <div
                  v-if="!leftVisible"
                  class="table-toolbar-contro-leftvisible"
                  @click="leftVisible = true"
                >
                </div>
                <BsTableTitle title="统计分析（按规则统计）" />
              </div>
            </template>
          </BsTable>
        </div>
      </template>
    </BsMainFormListLayout>
  </div>
</template>

<script>
import { defineComponent, ref, toRaw } from '@vue/composition-api'
import useTable from '@/hooks/useTable'
import useForm from '@/hooks/useForm'
import useTabPlanel from './hooks/useTabPlanel'

import { pageQueryIndex } from '@/api/frame/main/handlingOfViolations/index.js'
import { getIndexColumns, searchFormCommonSchemas } from './model/data'

export default defineComponent({
  setup(_) {
    // 左侧区划树显隐
    const leftVisible = ref(true)

    // 处理单弹窗显隐
    const ruleModalVisible = ref(false)

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
      fetch: pageQueryIndex,
      columns: getIndexColumns(),
      getSubmitFormData,
      dataKey: 'data.results'
    })

    // 选中行
    const checkedRecords = ref([])

    /**
     * 顶部tab模块
     */
    const {
      tabStatusBtnConfig,
      isShowSearchForm,
      onQueryConditionsClick
    } = useTabPlanel(ruleModalVisible, getTable, checkedRecords)

    return {
      leftVisible,
      ruleModalVisible,

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
      checkedRecords,

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
