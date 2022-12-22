<template>
  <div style="height: 100%">
    <BsMainFormListLayout :left-visible="leftVisible">
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
      <template v-slot:mainTree>
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
            :footer-config="footerConfig"
            :toolbar-config="tableToolbarConfig"
            :pager-config="pagerConfig"
            size="medium"
            @register="registerTable"
            @ajaxData="pagerChange"
            @onToolbarBtnClick="onToolbarBtnClick"
            @cellDblclick="cellDblclick"
          >
            <template v-slot:toolbarSlots>
              <div class="table-toolbar-left">
                <div
                  v-if="!leftVisible"
                  class="table-toolbar-contro-leftvisible"
                  @click="leftVisible = true"
                >
                </div>
                <BsTableTitle title="统计分析" />
              </div>
            </template>
          </BsTable>
        </div>
      </template>
    </BsMainFormListLayout>
    <PreviewDetail
      v-if="ruleModalVisible"
      v-model="ruleModalVisible"
      :current-row="currentRow"
      @closeAll="closeAllHandle"
    />
  </div>
</template>

<script>
import { defineComponent, provide, ref, unref, toRaw } from '@vue/composition-api'
import PreviewDetail from '../common/components/PreviewDetail'
import { eachTree } from 'xe-utils'

import useTable from '@/hooks/useTable'
import useForm from '@/hooks/useForm'
import useTree from '@/hooks/useTree'
import useTabPlanel from '../common/hooks/useTabPlanel'
import { useModal } from '@/hooks/useModal/index'

import { queryDep } from '@/api/frame/main/statisticAnalysis/unitStatistic.js'
import {
  getWarnCountColumns,
  searchFormCommonSchemas
} from '@/views/main/statisticAnalysis/common/model/data.js'
import { getAgencyNameColumn } from '@/views/main/handlingOfViolations/model/data.js'
import elementTreeApi from '@/api/frame/common/tree/unitTree'

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
    provide('modalType', '')

    // 左侧区划树显隐
    const leftVisible = ref(true)

    // 规则弹窗显隐
    const [ruleModalVisible, changeRuleModalVisibleVisible] = useModal()

    // 当前操作行
    const currentRow = ref(null)

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
        fetch: elementTreeApi.getElementTree,
        beforeFetch: params => {
          return {
            ...params,
            elementCode: 'AGENCY'
          }
        },
        afterFetch: data => {
          return [
            {
              name: '全部',
              customCode: 'ALL_NODE_CODE',
              children: data || []
            }
          ]
        },
        // 新增赋值结束的钩子：需要根据单位树加载列表数据
        finallyFetch: () => {
          resetFetchTableData()
        }
      }
    )
    // 当前选中的树节点
    const currentTreeNode = ref(null)
    /**
     * 指标数节点点击
     */
    function nodeClick({ node }) {
      currentTreeNode.value = node
      resetFetchTableData()
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
     * 关闭所有弹窗
     * */
    function closeAllHandle() {
      changeRuleModalVisibleVisible(false)
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
      fetch: queryDep,
      beforeFetch: params => {
        console.log(unref(treeData))
        const codes = []
        if (!unref(currentTreeNode) || unref(currentTreeNode).customCode === 'ALL_NODE_CODE') {
          eachTree(unref(treeData)[0]?.children ? unref(treeData)[0]?.children : [], item => {
            codes.push(item.code)
          })
        } else {
          eachTree([unref(currentTreeNode)], item => {
            codes.push(item.code)
          })
        }

        return {
          ...params,
          agencyCode: codes
        }
      },
      columns: [
        getAgencyNameColumn({
          width: 'auto'
        }),
        ...getWarnCountColumns()
      ],
      getSubmitFormData,
      dataKey: 'data.results'
    }, false)
    const footerConfig = ref({
      totalObj: {
        warnTotal: 15,
        noEnd: 5,
        end: 10
      },
      combinedType: ['switchTotal'],
      showFooter: true
    })

    /**
     * 双击单元格
     * */
    function cellDblclick({ row }) {
      currentRow.value = row
      changeRuleModalVisibleVisible(true)
    }

    /**
     * 顶部tab模块
     */
    const {
      tabStatusBtnConfig,
      isShowSearchForm,
      onQueryConditionsClick
    } = useTabPlanel(changeRuleModalVisibleVisible, getTable, currentRow)

    return {
      leftVisible,
      ruleModalVisible,

      treeProps,
      treeData,
      treeFilterText,
      treeLoading,
      currentTreeNode,
      nodeClick,

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
