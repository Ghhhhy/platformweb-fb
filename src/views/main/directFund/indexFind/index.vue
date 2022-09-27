<template>
  <div style="height:100%">
    <BsMainFormListLayout :left-visible.sync="leftVisible">
      <template v-slot:topTabPane>
        <BsTabPanel
          :is-hide-query="true"
          :tab-status-btn-config="tabStatusBtnConfig"
        />
      </template>
      <template v-slot:mainTree>
        <div style="height: 100%;">
          <BsTreeTitle
            :visiable.sync="leftVisible"
            :input-value.sync="treeFilterText"
            label=""
          />
          <div class="mmc-left-tree-body" style="height: calc(100% - 48px); overflow-y: auto">
            <BsTree
              ref="mofDivTree"
              open-loading
              :filter-text="treeFilterText"
              :config="{ showFilter: false, treeProps }"
              :tree-data="treeData"
              @onNodeClick="nodeClick"
            />
          </div>
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
                <div v-if="!leftVisible" class="table-toolbar-contro-leftvisible" @click="leftVisible = true"></div>
                <BsTableTitle title="指标单据" />
              </div>
            </template>
          </BsTable>
        </div>
      </template>
    </BsMainFormListLayout>
    <PreviewModal
      :visiable-state.sync="modalVisiableState"
      :current-value="currentRow"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import useTable from '@/hooks/useTable'
import useTree from '@/hooks/useTree'
import PreviewModal from './components/previewModal.vue'

import { getData, getIndexFindTree } from '@/api/frame/main/directFund/indexFind.js'
import useTabPlanel from './hooks/useTabPlanel'
import { getIndexColumns } from './model/data'

export default defineComponent({
  components: {
    PreviewModal
  },
  setup() {
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
        onToolbarBtnClick,
        getTable
      },
      registerTable
    ] = useTable({
      fetch: getData,
      columns: getIndexColumns()
    })

    const modalVisiableState = ref(false)
    const currentRow = ref(null)
    const {
      tabStatusBtnConfig,
      isShowSearchForm
    } = useTabPlanel(modalVisiableState, getTable, currentRow)

    /**
     * 区划树相关
     */
    const {
      treeProps,
      treeData,
      treeFilterText
    } = useTree({
      fetch: getIndexFindTree
    })

    const leftVisible = ref(true)
    /**
     * 指标数节点点击
     */
    function nodeClick() {
      resetFetchTableData()
    }

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

      treeProps,
      treeData,
      treeFilterText,
      nodeClick,
      leftVisible,
      modalVisiableState,
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
