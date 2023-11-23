<template>
  <div class="table-entry" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTabPane>
        <BsTabPanel
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
      <template v-slot:mainTree>
        <BsTreeTitle
          :visiable.sync="leftTreeVisible"
          :input-value.sync="treeFilterText"
          placeholder="搜索区划"
        />
        <BsTree
          ref="leftTree"
          open-loading
          :filter-text="treeFilterText"
          :config="{ expandOnClickNode: false, showFilter: false, treeProps }"
          :tree-data="treeData"
          @onNodeClick="treeNodeClick"
        />
      </template>
      <template v-slot:mainForm>
        <div class="table-header">
          <div class="table-header-left">
            <div
              v-if="!leftTreeVisible"
              class="ri-indent-wrapper"
              style="marginRight: 8px"
              @click="setLeftTreeVisible"
            >
              <i class="ri-indent-decrease"></i>
            </div>
            <el-button-group>
              <el-button
                v-for="tab in tableTabs"
                :key="tab.value"
                size="small"
                :type="tab.value === currentTableTab ? 'primary' : ''"
                @click="changeTableTab(tab.value)"
              >
                {{ tab.label }}
              </el-button>
            </el-button-group>
            <p class="table-top-tips">{{ tableTips }}</p>
          </div>
          <div class="table-header-right">
            <span>单位：万元</span>
          </div>
        </div>
        <div style="height: calc(100% - 60px)">
          <vxe-grid
            ref="tableRef"
            :loading="tableLoadingState"
            show-overflow="tooltip"
            show-header-overflow="tooltip"
            header-cell-class-name="bs-table-header-cell"
            :columns="currentColumns"
            :data="tableData"
            :edit-config="editConfig"
            :valid-config="validConfig"
            :edit-rules="editRules"
            :footer-method="
              currentTableTab !== TableTabsEnum.MONITOR_BASIC_INFORMATION
                ? footerMethod
                : () => []
            "
            size="mini"
            :empty-text="
              currentTab === TabEnum.UNSUBMIT
                ? '暂无数据，如需录入数据请新增行'
                : '暂无数据'
            "
            auto-resize
            sync-resize
            show-footer
            stripe
            border
            height="auto"
          >
            <template v-if="tableFooterTips[currentTableTab]" #bottom>
              <p class="table-bottom-tips">
                {{ tableFooterTips[currentTableTab] }}
              </p>
            </template>
          </vxe-grid>
        </div>
      </template>
    </BsMainFormListLayout>
    <AddRowsModal
      v-if="addRowsModalVisible"
      v-model="addRowsModalVisible"
      @addRows="addRows"
    />
    <ImportModel
      :file-config="fileConfig"
      :import-modal-visible.sync="importModalVisible"
      @onDownloadTemplateClick="() => exportHandle('下载成功！','template')"
      @onImportClick="onImportClick"
      @onImportFileClick="onImportFileClick"
    />
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  unref,
  computed,
  watch
} from '@vue/composition-api'
import AddRowsModal from './components/AddRowsModal'
import ImportModel from '@/components/Table/import/import.vue'

import useForm from '@/hooks/useForm'
import useTree from '@/hooks/useTree'
import useTabPlanel from './hooks/useTabPlanel'
import useTableTab from './hooks/useTableTab'
import useImport from './hooks/useImport'
import useTable from './hooks/useTable'
import useFetchTable from '@/hooks/useTable'

import {
  formSchemas as formSchemasOrigin,
  tableColumnsByNoBudget,
  tableColumnsByFundsIsNotStandardized,
  tableFooterTips,
  tableColumnsByMonitorBasicInfo,
  tableColumnsByBudgetExecuteMonitor
} from './model/data'
import { TabEnum, TableTabsEnum } from './model/enum'
import HttpModule from '@/api/frame/main/Monitoring/FinancialBasicTableEntry.js'
import store from '@/store'
import { generateEditorRules, generateRows } from './utils'
import { getThreePublicTable } from '@/api/frame/main/fundMonitoring/threePublicExpensesTableEntry.js'

export default defineComponent({
  components: { AddRowsModal, ImportModel },
  setup() {
    // 左侧树是否显示
    const leftTreeVisible = ref(true)
    function setLeftTreeVisible(visible = true) {
      leftTreeVisible.value = visible
    }

    /**
     * 搜索表单
     */
    const [{ formData, formSchemas, setSubmitFormData }, registerForm] =
      useForm(formSchemasOrigin)

    /**
     * 获取区划wheresql参数
     * @param {string} province 区划码
     * */
    function getWheresql(province) {
      for (let item of [9, 7, 5]) {
        const arr = province.slice(11 - item)
        const set = new Set(arr)
        if (set.size === 1) {
          return province.slice(0, 11 - item)
        }
      }
      return province
    }
    // 当前选中的区划树节点
    const currentTreeNode = ref(null)
    /**
     * 区划树
     * */
    const {
      treeProps,
      treeData,
      treeFilterText,
      fetchTreeData,
      getTree,
      treeLoading,
      register: treeRegister
    } = useTree({
      fetch: HttpModule.getLeftTree,
      beforeFetch: (params) => {
        const { province, year } = store.state.userInfo
        return {
          ...params,
          elementcode: 'admdiv',
          province,
          year: year,
          wheresql: 'and code like \'' + getWheresql(province) + '%\''
        }
      },
      treeProps: {
        nodeKey: 'code'
      }
    })

    /**
     * 区划树节点点击
     * */
    function treeNodeClick({ node }) {
      currentTreeNode.value = node
      fetchTableData()
    }

    /**
     * 搜索
     * @param val
     */
    function search(val) {
      setSubmitFormData(val)
      fetchTableData()
    }

    /**
     * 表格顶部tab
     */
    const { tableTabs, currentTableTab, changeTableTab } = useTableTab()
    // 当前显示的列
    const currentColumns = computed(() => {
      const columnsMap = {
        [TableTabsEnum.MONITOR_BASIC_INFORMATION]:
          tableColumnsByMonitorBasicInfo,
        [TableTabsEnum.NO_BUDGET]: tableColumnsByNoBudget,
        [TableTabsEnum.FUNDS_IS_NOT_STANDARDIZED]:
          tableColumnsByFundsIsNotStandardized,
        [TableTabsEnum.BUDGET_MONITOR]: tableColumnsByBudgetExecuteMonitor
      }
      return columnsMap[unref(currentTableTab)]
    })

    /**
     * 表格模块
     * */
    const {
      editConfig,
      validConfig,
      editRules,
      setTableEditorState,
      footerMethod
    } = useTable(unref(currentColumns), currentTableTab)

    // 请求参数
    const requestPayload = computed(() => {
      const [fiscalYear, month] = formData.month?.split('-') || ['', '']
      return {
        fiscalYear,
        month,
        status: unref(currentTab),
        reportType: unref(currentTableTab),
        mofDivCode: unref(currentTreeNode)?.code
      }
    })

    const tableTips = ref('')
    const [{ tableData, tableRef, fetchTableData, tableLoadingState }] =
      useFetchTable({
        dataKey: requestPayload.value.reportType === 4 ? 'data.dataSummary' : 'data.datas',
        openPager: false,
        fetch: getThreePublicTable,
        // 请求前置钩子
        beforeFetch(params) {
          return {
            ...params,
            ...unref(requestPayload)
          }
        },
        // 请求后置钩子
        afterFetch(data) {
          // 未提交页卡
          const isUncommitted = unref(currentTab) === TabEnum.UNSUBMIT
          // 监控基础信息表
          const isMonitorBasicInfo =
            unref(currentTableTab) === TableTabsEnum.MONITOR_BASIC_INFORMATION
          if (!data?.datas?.length && isUncommitted && isMonitorBasicInfo) {
            data.datas = generateRows(1, unref(currentColumns))
          }
          if (unref(requestPayload).reportType === 4) {
            data.datas = unref(data.dataSummary)
          }
          // 表格tips信息
          tableTips.value = data?.hint || ''
          return data
        }
      })

    /**
     * 文件导入
     * */
    const { fileConfig, importModalVisible, onImportClick, onImportFileClick } =
      useImport(currentColumns, tableData)

    /**
     * tab区域
     */
    const {
      tabStatusBtnConfig,
      onQueryConditionsClick,
      isShowSearchForm,
      addRowsModalVisible,
      addRows,
      exportHandle,
      currentTab,
      onTabClick,
      updateButtons
    } = useTabPlanel(
      tableRef,
      currentColumns,
      tableData,
      importModalVisible,
      requestPayload,
      fetchTableData
    )

    /**
     * 监听报表tab切换
     */
    watch(currentTableTab, (curVal, preVal) => {
      if (curVal === preVal) return
      // 更新表格校验规则
      editRules.value = generateEditorRules(unref(currentColumns))
      // 更新按钮
      updateButtons(curVal)
      // 重置表格数据 重新请求
      tableData.value = []
      fetchTableData()
    })

    /**
     * 监听顶部页卡切换
     */
    watch(currentTab, (val) => {
      // 设置表格编辑状态
      setTableEditorState(val === TabEnum.UNSUBMIT)
      // 重置表格数据 重新请求
      tableData.value = []
      fetchTableData()
    })

    return {
      leftTreeVisible,
      setLeftTreeVisible,

      tabStatusBtnConfig,
      onQueryConditionsClick,
      isShowSearchForm,
      onTabClick,
      currentTab,
      TabEnum,
      exportHandle,

      formData,
      formSchemas,
      search,
      registerForm,

      treeProps,
      treeData,
      treeFilterText,
      fetchTreeData,
      getTree,
      treeLoading,
      treeNodeClick,
      treeRegister,

      tableTabs,
      currentTableTab,
      changeTableTab,
      TableTabsEnum,

      tableColumnsByNoBudget,
      tableColumnsByFundsIsNotStandardized,
      tableFooterTips,
      tableData,
      editConfig,
      validConfig,
      editRules,
      tableRef,
      footerMethod,
      currentColumns,
      tableLoadingState,
      tableTips,

      addRows,
      addRowsModalVisible,

      fileConfig,
      importModalVisible,
      onImportClick,
      onImportFileClick
    }
  }
})
</script>

<style lang="scss" scoped>
.table-header {
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;

  .table-header-left {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .ri-indent-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 48px;
    color: #fff;
    font-size: 19px;
    background: var(--primary-color);
  }
}
.table-entry {
  /deep/ .T-mainFormListLayout-modulebox .mmc-formlist {
    margin-left: 0;
  }
  /deep/.vxe-table
    .vxe-body--column.col--ellipsis:not(.col--actived)
    > .vxe-cell {
    white-space: nowrap !important;
  }
  /deep/.vxe-table .vxe-table--empty-content {
    font-size: 16px;
    color: #666;
  }
}
.table-bottom-tips {
  padding: 8px 0;
  font-size: 12px;
}

.table-top-tips {
  font-size: 1em;
  margin-left: 16px;
  color: #ed411e;
}
/deep/.splitter-pane .el-button--primary.el-button:hover {
  color: #fff !important;
  background-color: var(--secondary-color-hover) !important;
  border-color: var(--secondary-color-hover) !important;
}
/deep/.splitter-pane .el-button:hover {
  color: var(--secondary-color) !important;
  background-color: var(--hightlight-color) !important;
  border-color: var(--secondary-color-hover) !important;
}

</style>

<style lang="scss">
.bs-table-header-cell {
  font-size: var(--bs-table-font-size);
  font-weight: bold;
  background: var(--hightlight-color);
}
</style>
