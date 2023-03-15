<template>
  <div style="height:100%">
    <BsMainFormListLayout :left-visible="false">
      <template v-slot:topTabPane>
        <BsTabPanel
          :is-open="isShowSearchForm"
          :tab-status-btn-config="tabStatusBtnConfig"
          @tabClick="onTabClick"
          @onQueryConditionsClick="onQueryConditionsClick"
        />
      </template>
      <template v-slot:query>
        <div v-show="isShowSearchForm" class="main-query">
          <BsQuery
            ref="queryFrom"
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
                <BsTableTitle title="指标信息" />
              </div>
            </template>
          </BsTable>
        </div>
      </template>
    </BsMainFormListLayout>
    <FilePreview
      v-if="filePreviewVisibleState"
      :visible.sync="filePreviewVisibleState"
      :file-guid="currentRow ? currentRow.fileGuid : ''"
      app-id="dfr"
    />
  </div>
</template>

<script>
import { defineComponent, ref, unref } from '@vue/composition-api'
import useTable from '@/hooks/useTable'
import useForm from '@/hooks/useForm'
import useTabPlanel from './hooks/useTabPlanel'
import { getUnregisteredColumns, getHaveRegisteredColumns, getFormSchemas } from './model/data'
import { TabEnum } from './model/enum'
import { queryDetail } from '@/api/frame/main/directFund/directFundsDetail.js'

export default defineComponent({
  setup() {
    const currentTabCode = ref(TabEnum.UNREGISTERED)
    /**
     * tab点击切换
     * */
    function onTabClick(tab) {
      currentTabCode.value = tab.code
      const isUnregistered = tab.code === TabEnum.UNREGISTERED
      columns.value = isUnregistered ? getUnregisteredColumns() : getHaveRegisteredColumns()
      formSchemas.value = generateFormShemas(isUnregistered)
      resetFetchTableData()
    }

    /**
     * 生成搜索表单
     * */
    function generateFormShemas(isUnregistered) {
      const formShemas = getFormSchemas()
      return isUnregistered ? formShemas.filter(item => !item.isHaveRegistered) : formShemas
    }

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
    ] = useForm(
      generateFormShemas(true)
    )
    /**
     * 搜索
     * @param val
     */
    function search(val) {
      const params = unref(formSchemas).reduce((obj, item) => {
        if (Reflect.has(val, item.field)) {
          let key = item.field
          if (item.itemRender?.name === '$vxeTree') {
            key += '_code'
          }
          if (item.itemRender?.props?.config?.multiple) {
            key += '__multiple'
          }
          Reflect.set(obj, item.field, val[key])
        } else {
          Reflect.set(obj, item.field, undefined)
        }
        return obj
      }, {})

      setSubmitFormData(params)
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
      fetch: queryDetail,
      beforeFetch: params => {
        return {
          ...params,
          statusCode: unref(currentTabCode)
        }
      },
      getSubmitFormData,
      columns: getUnregisteredColumns(),
      dataKey: 'data.results'
    })

    // 预览文件弹窗显隐状态
    const filePreviewVisibleState = ref(false)
    // 当前操作行
    const currentRow = ref(null)
    const {
      tabStatusBtnConfig,
      isShowSearchForm,
      onQueryConditionsClick
    } = useTabPlanel(filePreviewVisibleState, getTable, currentRow)

    return {
      registerForm,
      formData,
      formSchemas,
      search,

      onTabClick,
      tabStatusBtnConfig,
      isShowSearchForm,
      onQueryConditionsClick,

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

      filePreviewVisibleState,
      currentRow
    }
  }
})
</script>

<style lang="scss" scoped>
.search-container {
  display: flex;
  align-items: center;
  padding: 0 8px;
  background: var(--hightlight-color);
  box-sizing: border-box;

  .form-container {
    flex: 1;

    .vxe-form {
      background: transparent;
    }
  }

  .right-btns {
    margin-bottom: 0;
  }
}

/deep/.preview-btn.el-button {
  border: none;
  padding: 6px;
  background: transparent;
  &:hover {
    border: none;
  }
}

.table-action-column-custom {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .table-column-action-icon {
    width: 30px;
    height: 20px;
    cursor: pointer;
    &.gloable-option-row-setting,
    &.gloable-option-row-delete {
      transform: scale(1.6);
    }
  }
}
</style>
