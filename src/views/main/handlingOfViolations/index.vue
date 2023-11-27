<template>
  <div style="height: 100%">
    <BsMainFormListLayout :left-visible="isUnitMenu ? false : leftVisible">
      <template v-slot:topTabPane>
        <BsTabPanel
          :tab-status-btn-config="tabStatusBtnConfig"
          :is-open="isShowSearchForm"
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
          <div class="mmc-left-tree-body" style="height: calc(100% - 8px); overflow-y: auto">
            <BsTree
              ref="mofDivTree"
              v-loading="treeLoading"
              :filter-text="treeFilterText"
              :config="{ valueKeys: ['code', 'name','id'],showFilter: false,expandOnClickNode: false, treeProps }"
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
            @onOptionRowClick="onOptionRowClick"
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
    <BsOperationLog :logs-data="logData" :show-log-view="showLogView" />
    <AuditModal
      v-if="auditVisible"
      v-model="auditVisible"
      :checked-records="checkedRecords"
      :menu-name="menuName"
      @success="resetFetchTableData"
    />
    <ProcessDiagramDialog
      v-if="showProcessDiagramDialog"
      :show-process-diagram-dialog.sync="showProcessDiagramDialog"
      :data-info="dataInfo"
      :type="processDiagramDialogType"
    />
    <ruleModal v-model="ruleModalVislbel" :regulation-code="propsRegulationCode" />
  </div>
</template>

<script>
import { defineComponent, ref, unref, computed, provide, readonly, toRaw } from '@vue/composition-api'
import AuditModal from './components/AuditModal'
import ruleModal from '@/views/main/MointoringMatters/MonitorRulesViewFJWK/children/ruleModal.vue'// 海南模式查看
import useTable from '@/hooks/useTable'
import useForm from '@/hooks/useForm'
import useTree from '@/hooks/useTree'
import useTabPlanel from './hooks/useTabPlanel'
import useIs from './hooks/useIs'
import store from '@/store'
import { transJson2 } from '@/utils/params'
import elementTreeApi from '@/api/frame/common/tree/unitTree.js'
import { pageQueryIndex } from '@/api/frame/main/handlingOfViolations/index.js'
import ProcessDiagramDialog from './components/ProcessDiagramDialog.vue'
import {
  searchFormCommonSchemas,
  getCommonColumns,
  getAuditDescriptionColumn,
  getStatusCodeColumn,
  sendAuditTabs,
  doAuditTabs,
  pagePathMapNodeType,
  searchFormAllTabSchema,
  getStatusCodeOptions,
  proconf
} from './model/data'
import { TabEnum, RouterPathEnum } from './model/enum'
import transJson from '@/utils/transformMenuQuery.js'

export default defineComponent({
  components: {
    AuditModal,
    ProcessDiagramDialog,
    ruleModal
  },
  setup(_, { root }) {
    const menuName = ref(store.getters.getCurNavModule.name)
    const menuGuid = ref(store.getters.getCurNavModule.guid)
    const param5Str = ref(sessionStorage.getItem('params5') || store.state.curNavModule.param5)
    const route = root.$route
    const showProcessDiagramDialog = ref(false)
    const processDiagramDialogType = 'track'
    const dataInfo = ref({})
    const logData = ref([])
    const showLogView = ref(false)

    // 页面路由
    const pagePath = ref(route.path)
    /* eslint-disable-next-line */
    const { isDivisionPage } = useIs({}, pagePath)
    const ruleModalVislbel = ref(false)
    const propsRegulationCode = computed(() => checkedRecords.value[0]?.ruleCode)

    // 是否是单位页面（单位反馈、单位审核）
    // const isUnitMenu = computed(() => {
    //   return [RouterPathEnum().UNIT_FEEDBACK, RouterPathEnum().UNIT_AUDIT].includes(pagePath.value)
    // })
    const isUnitMenu = ref(false)

    // 是否是单位反馈
    const isUnitFeedbackMenu = computed(() => {
      return pagePath.value === RouterPathEnum().UNIT_FEEDBACK
    })
    // 是否是专项单位反馈
    const isUnitFeedbackBySpe = computed(() => {
      return pagePath.value === 'unitFeedbackBySpe'
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
          labelFormat: '{code}-{name}',
          id: 'code',
          nodeKey: 'id', // 树的主键
          label: 'name', // 树的显示lalel字段
          children: 'children'
        },
        fetch: elementTreeApi.getElementTree,
        beforeFetch: params => {
          return {
            ...params,
            elementCode: 'agency' // 传参设置默认值
            // isUnit: unref(isDivisionPage) ? 'department' : 'company'//这个isUnit是这个elementTreeApi.getAgencyTree,接口才需要传的
          }
        },
        afterFetch: data => {
          return [
            {
              id: 'root',
              name: '全部',
              customCode: '',
              children: data || [],
              code: ''
            }
          ]
        }
      },
      // 单位反馈不请求
      !unref(isUnitMenu)
    )

    const param5 = {}
    if (param5Str.value && param5Str.value !== '') {
      let param5Strs = param5Str.value.split(',')
      param5Strs.forEach(s => {
        let ss = s.split('=')
        let key = ss[0]
        let value = ss[1]
        param5[key] = value
      })
    }

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
      unref(pagePath) === RouterPathEnum().UNIT_FEEDBACK
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
          // 非全部页签的statusCode字段取值映射tab对应的值
          params.statusCode = unref(currentTab).value
        } else if (unref(currentTab)?.code === TabEnum.ALL) {
          // 全部页签
          params.isAll = true
        }
        const menuId = store.state.curNavModule?.guid || ''
        return {
          ...params,
          regulationClass: sessionStorage.getItem('params5') || transJson(store.state.curNavModule.param5)?.regulationClass,
          nodeType: pagePathMapNodeType[unref(pagePath)],
          elementCode: unref(currentTreeNode)?.code,
          menuId
        }
      },
      // 请求后置钩子
      afterFetch(data) {
        // 未提交页卡
        // 处理业务编号
        let nullNum = 0
        data.results.forEach(item => {
          if (item.businessNo === null) {
            nullNum++
          }
        })
        if (nullNum === data.results.length) {
          let index = columns.value.findIndex(item => {
            return item.field === 'businessNo'
          })
          columns.value.splice(index, 1)
        }
        return data
      },
      columns: [],
      getSubmitFormData,
      dataKey: 'data.results',
      routeConfig: {
        isUnitFeedbackMenu
      }
    })

    tableConfig.renderers['$gloableOptionRow'] = proconf.gloableOptionRow
    tableConfig.showOverflow = false
    // tableConfig['methods']['onOptionRowClick'] = onOptionRowClick
    // function onOptionRowClick({ row, optionType }, context) {
    //   debugger
    //   console.log(row)
    // }
    // 选中行
    const checkedRecords = ref([])

    /**
     * 设置columns
     * */
    function computedColumns() {
      // 未送审
      let initColumns = getCommonColumns()

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
        initColumns.splice(2, 0, getStatusCodeColumn(unref(isUnitMenu)))
        if (unref(pagePath) === RouterPathEnum().UNIT_FEEDBACK) {
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
      // 福建不要业务编码 以区划区分
      if (store.getters.isFuJian) {
        initColumns = initColumns.filter(item => {
          return item.field !== 'businessNo' && item.field !== 'mofDivName' && item.field !== 'payCertNo'
        })
      }
      const projectCode = transJson2(store.state.curNavModule.param5 || '')?.projectCode
      if (projectCode !== 'SH') {
        initColumns = initColumns.concat(proconf.fjAddColumns)
      }
      if (isUnitFeedbackBySpe) {
        initColumns = initColumns.filter(item => {
          return item.field !== 'isDir'
        })
      }
      if (param5.isEndAudit === '1' && currentTab.value.code !== '1') {
        initColumns = initColumns.filter(item => {
          return item.field !== 'gloableOptionRow'
        })
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
    } = useTabPlanel(auditVisible, getTable, pagePath, checkedRecords, currentTab, resetFetchTableData, ruleModalVislbel)
    /**
     * tab切换
     * @param tab
     */
    function onTabClick(tab) {
      currentTab.value = tab
      resetConfig()

      resetFetchTableData()
    }

    function onOptionRowClick({ row, optionType }, context) {
      switch (optionType) {
        // 流程运行轨迹
        case 'processTrack':
          dataInfo.value = row
          showProcessDiagramDialog.value = true
          break
        default:
      }
    }

    /**
     * 设置搜索表单
     */
    function computedSchemas() {
      formSchemas.value = searchFormCommonSchemas

      // 全部tab时添加状态筛选
      if (unref(currentTab).code === TabEnum.ALL) {
        formSchemas.value = [...searchFormCommonSchemas, ...searchFormAllTabSchema]
        unref(formSchemas).forEach(schema => {
          if (!Reflect.has(formData, schema.field)) {
            Object.assign(formData, { [schema.field]: '' })
          }
        })

        updateFormSchemas({
          field: 'statusCode',
          itemRender: {
            options: [
              // 根据当前页面的tab获取全部tab里面的状态筛选
              ...unref(tabStatusBtnConfig).buttons.slice(0, unref(tabStatusBtnConfig).buttons?.length - 1),
              // 2023.3.6单位反馈添加已作废状态
              ...unref(isUnitFeedbackMenu)
                ? [{ value: TabEnum.VOIDED, label: '已作废' }]
                : getStatusCodeOptions()
                  .filter(item => [TabEnum.RETURN_SELF, TabEnum.DISABLED_SELF].includes(item.value))
            ]
          }
        })
      } else {
        formSchemas.value = searchFormCommonSchemas
      }
      // 福建判断取消区划查询
      if (store.getters.isFuJian) {
        formSchemas.value = formSchemas.value.filter(item => {
          return item.field !== 'mofDivCodes'
        })
        formSchemas.value.length === 0 && (isShowSearchForm.value = false)
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
      ruleModalVislbel,
      propsRegulationCode,
      isUnitMenu,
      auditVisible,
      menuName,
      menuGuid,
      param5,
      param5Str,

      logData,
      showLogView,

      showProcessDiagramDialog,
      dataInfo,
      processDiagramDialogType,

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
      onOptionRowClick,
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

<style lang="scss">
//执行 单位零余额跳转到该页面 导致css样式丢失
button.el-button.el-button--default.el-button--small.el-button--primary{
  color: #fff !important;
  background-color:  #4d77e7 !important;
}
</style>
