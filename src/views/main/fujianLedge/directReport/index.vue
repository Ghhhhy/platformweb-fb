<template>
  <div style="height:100%">
    <BsMainFormListLayout>
      <template v-if="openSearch" v-slot:query>
        <div class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="formSchemas"
            :query-form-data="formData"
            @register="registerForm"
            @onSearchClick="onSearchClick"
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
            :pager-config="false"
            size="medium"
            @register="registerTable"
            @ajaxData="pagerChange"
            @onToolbarBtnClick="onToolbarBtnClick"
          >
            <template v-slot:toolbarSlots>
              <BsTableTitle :title="title" />
            </template>
          </BsTable>
        </div>
      </template>
    </BsMainFormListLayout>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import XEUtils from 'xe-utils/ctor'

import useForm from '@/hooks/useForm'
import useTable from '@/hooks/useTable'

import { fjLedgerQuery } from '@/api/frame/main/fujianLedge/index.js'
import { getSearchFormSchemas } from './model/data'

export default defineComponent({
  props: {
    // 报表名称
    title: {
      type: String,
      default: ''
    },
    // 是否开启年度搜索
    openSearch: {
      type: Boolean,
      default: true
    },
    // 请求的额外参数
    requestPayload: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    /**
     * 搜索表单
     */
    const [
      {
        formData,
        formSchemas,
        getSubmitFormData,
        setSubmitFormData
      },
      registerForm
    ] = useForm(getSearchFormSchemas())

    /**
     * 表格
     * */
    const [
      {
        columns,
        pagerConfig,
        tableToolbarConfig,
        tableConfig,
        tableData,
        resetFetchTableData,
        tableLoadingState,
        pagerChange,
        onToolbarBtnClick
      },
      registerTable
    ] = useTable({
      fetch: fjLedgerQuery,
      getSubmitFormData: props.openSearch ? getSubmitFormData : null,
      // 后置钩子处理表头
      afterFetch: data => {
        XEUtils.eachTree(data?.head, (item) => {
          item.minWidth = 150
          if (item.field?.endsWith?.('Amount')) {
            item.type = 'money'
            item.align = 'right'
          }
        })
        columns.value = data.head || []
        return data
      },
      beforeFetch: (params) => {
        return {
          ...params,
          ...props.requestPayload
        }
      }
    })

    /**
     * 点击搜索&重置（重置也是用的该事件，组件内部进行了表单值重置）
     * @param value
     */
    function onSearchClick(value) {
      setSubmitFormData(value)
      resetFetchTableData()
    }

    return {
      formData,
      formSchemas,
      registerForm,
      onSearchClick,

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
