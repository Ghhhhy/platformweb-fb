<template>
  <div style="height: 100%">
    <BsMainFormListLayout :left-visible="isUnitMenu ? false : leftVisible">
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
            :query-form-item-config="formSchemas"
            :query-form-data="formData"
            @onSearchClick="search"
            @register="registerForm"
          />
        </div>
      </template>
      <template v-if="!isUnitMenu" v-slot:mainTree>
        <div style="height: 100%;">
          <BsTreeTitle
            :visiable.sync="leftVisible"
            :input-value.sync="treeFilterText"
            label="导航"
          />
          <div class="mmc-left-tree-body" style="height: calc(100% - 48px); overflow-y: auto">
            <BsTree
              ref="mofDivTree"
              v-loading="treeLoading"
              :filter-text="treeFilterText"
              :config="{ showFilter: false, expandOnClickNode: false, treeProps }"
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
                <BsTableTitle title="违规处理单" />
              </div>
            </template>
          </BsTable>
        </div>
      </template>
    </BsMainFormListLayout>
    <AuditModal
      v-if="auditVisible"
      v-model="auditVisible"
      :checked-records="checkedRecords"
      @success="resetFetchTableData"
    />
  </div>
</template>

<script>
import { defineComponent, ref, unref, computed, provide, readonly, toRaw } from '@vue/composition-api'
import AuditModal from './components/AuditModal'
import useTable from '@/hooks/useTable'
import useForm from '@/hooks/useForm'
import useTree from '@/hooks/useTree'
import useTabPlanel from './hooks/useTabPlanel'

import elementTreeApi from '@/api/frame/common/tree/unitTree.js'
import { pageQueryIndex } from '@/api/frame/main/handlingOfViolations/index.js'

import {
  searchFormCommonSchemas,
  searchFormAllTabSchema,
  getCommonColumns,
  getAuditDescriptionColumn,
  getNodeStatusColumn,
  sendAuditTabs,
  doAuditTabs,
  pagePathMapNodeType, getNodeStatusOptions
} from './model/data'
import { TabEnum, RouterPathEnum } from './model/enum'

export default defineComponent({
  components: {
    AuditModal
  },
  setup(_, { root }) {
    const route = root.$route

    // 页面路由
    const pagePath = ref(route.path)

    // 是否是单位页面（单位反馈、单位审核）
    const isUnitMenu = computed(() => {
      return [RouterPathEnum.UNIT_FEEDBACK, RouterPathEnum.UNIT_AUDIT].includes(pagePath.value)
    })

    // 是否是单位反馈
    const isUnitFeedbackMenu = computed(() => {
      return pagePath.value === RouterPathEnum.UNIT_FEEDBACK
    })

    // 左侧区划树显隐
    const leftVisible = ref(true)

    // 处理单弹窗显隐
    const auditVisible = ref(false)

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
        // getForm
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
     * 区划树相关
     */
    const {
      treeProps,
      treeData,
      treeFilterText,
      treeLoading
    } = useTree(
      {
        treeProps: {
          nodeKey: 'code'
        },
        fetch: elementTreeApi.getAgencyTree,
        afterFetch: data => {
          return [
            {
              name: '全部',
              customCode: 'ALL_NODE_CODE',
              children: data || []
            }
          ]
        }
      },
      // 单位反馈不请求
      !unref(isUnitMenu)
    )
    const currentTreeNode = ref(null)
    /**
     * 指标数节点点击
     */
    function nodeClick({ node }) {
      currentTreeNode.value = node
      resetFetchTableData()
    }

    // 当前选中的tab
    const currentTab = ref(
      unref(pagePath) === RouterPathEnum.UNIT_FEEDBACK
        ? sendAuditTabs[0]
        : doAuditTabs[0]
    )

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
      beforeFetch: params => {
        if (unref(currentTab)?.code !== TabEnum.ALL) {
          params.nodeStatus = unref(currentTab).value
        }
        params.nodeStatus && (params.nodeStatus = Number(params.nodeStatus))
        return {
          ...params,
          nodeType: pagePathMapNodeType[unref(pagePath)],
          elementCode: unref(currentTreeNode)?.code
        }
      },
      columns: [],
      getSubmitFormData,
      dataKey: 'data.results'
    })
    tableConfig.showOverflow = false
    // 选中行
    const checkedRecords = ref([])

    /**
     * 设置columns
     * */
    function computedColumns() {
      // 未送审
      const initColumns = getCommonColumns()

      if (unref(currentTab).code === TabEnum.SENDED) {
        // 已送审
        initColumns.splice(initColumns.length - 1, 0, getAuditDescriptionColumn({ title: '处理说明' }))
      } else if ([TabEnum.RETURN, TabEnum.DISABLED].includes(unref(currentTab).code)) {
        // 退回 || 禁止
        initColumns.splice(
          2,
          0,
          getAuditDescriptionColumn({ title: '处理意见' })
        )
      } else if (unref(currentTab).code === TabEnum.ALL) {
        // 全部
        initColumns.splice(2, 0, getNodeStatusColumn(unref(isUnitMenu)))
        if (unref(pagePath) === RouterPathEnum.UNIT_FEEDBACK) {
          initColumns.splice(
            initColumns.length - 2,
            0,
            getAuditDescriptionColumn({ title: '处理说明' })
          )
        } else {
          initColumns.splice(
            initColumns.length - 2,
            0,
            getAuditDescriptionColumn({ title: '处理意见' })
          )
        }
      } else if (unref(currentTab).code === TabEnum.NO_AUDIT) {
        // 未审核
        initColumns.splice(
          initColumns.length - 1,
          0,
          getAuditDescriptionColumn({ title: '处理说明' })
        )
      } else if (unref(currentTab).code === TabEnum.AUDITED) {
        // 已审核
        initColumns.splice(
          initColumns.length - 1,
          0,
          getAuditDescriptionColumn({ title: '处理意见' })
        )
      }
      columns.value = initColumns
    }

    /**
     * 顶部tab模块
     */
    const {
      tabStatusBtnConfig,
      isShowSearchForm,
      modalType,
      onQueryConditionsClick
    } = useTabPlanel(auditVisible, getTable, pagePath, checkedRecords, currentTab)
    /**
     * tab切换
     * @param tab
     */
    function onTabClick(tab) {
      currentTab.value = tab
      resetConfig()

      resetFetchTableData()
    }

    /**
     * 设置搜索表单
     */
    function computedSchemas() {
      if (unref(currentTab).code === TabEnum.ALL) {
        formSchemas.value = [...searchFormCommonSchemas, ...searchFormAllTabSchema]
        unref(formSchemas).forEach(schema => {
          if (!Reflect.has(formData, schema.field)) {
            Object.assign(formData, { [schema.field]: '' })
          }
        })

        updateFormSchemas({
          field: 'nodeStatus',
          itemRender: {
            options: [
              ...unref(tabStatusBtnConfig).buttons.slice(0, unref(tabStatusBtnConfig).buttons?.length - 1),
              ...unref(isUnitFeedbackMenu)
                ? []
                : getNodeStatusOptions()
                  .filter(item => [TabEnum.RETURN_SELF, TabEnum.DISABLED_SELF].includes(item.value))
            ]
          }
        })
      } else {
        formSchemas.value = searchFormCommonSchemas
      }
    }

    /**
     * 重新计算配置信息
     */
    function resetConfig() {
      computedSchemas()
      computedColumns()
    }
    resetConfig()

    /**
     * modalType:弹窗打开操作
     * pagePath:页面路由
     */
    provide('modalType', readonly(modalType))
    provide('pagePath', readonly(pagePath))
    return {
      leftVisible,
      isUnitMenu,
      auditVisible,

      treeLoading,
      treeProps,
      treeData,
      treeFilterText,
      nodeClick,

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
      onTabClick,
      modalType,
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
