<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          is-open
          is-hide-query
          show-zero
          :tab-status-btn-config="toolBarStatusBtnConfig"
          :tab-status-num-config="tabStatusNumConfig"
          @onQueryConditionsClick="onQueryConditionsClick"
          @btnClick="onTabPanelBtnClick"
        />
      </template>
      <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="queryConfig"
            :query-form-data="searchDataList"
            @onSearchClick="search"
          />
        </div>
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="mainTableRef"
          v-loading="tableLoadingState"
          :footer-config="tableFooterConfig"
          :table-columns-config="columns"
          :table-data="tableData"
          :table-config="tableConfig"
          :pager-config="pagerConfig"
          :title="menuName"
          :toolbar-config="tableToolbarConfig"
          @onToolbarBtnClick="onToolbarBtnClick"
          @ajaxData="ajaxTableData"
          @cellClick="cellClick"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div class="table-toolbar-left-title">
                <span class="fn-inline">{{ menuName }}</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <ShowDialog
      v-if="showDialogVisible"
      v-bind="detailModalLayout"
      @close="closeHandle"
    />
    <MonitProcFeedbackModal v-if="showModal" ref="MonitProcFeedbackModal" :create-data-list="createDataList" @close="showModal = false" />
  </div>
</template>

<script lang="jsx">
import MonitProcFeedbackModal from '@/views/main/fundMonitoring/monitoringOrderrCreate/monitoringOrderrCreateModal.vue'
import { defineComponent, nextTick, computed, toRefs, reactive, ref, getCurrentInstance } from '@vue/composition-api'
import useTable from '@/hooks/useTable'
import { post } from '@/api/http'
import { tableColumns, queryColumns, tabButtonColumns } from './columns'
import ShowDialog from '@/views/main/fundMonitoring/violationHandle/warningCreate/children/addDialog.vue'
import store from '@/store/index'
import { message } from 'element-ui'
import transJson from '@/utils/transformMenuQuery'
export default defineComponent({
  components: {
    ShowDialog,
    MonitProcFeedbackModal
  },
  setup() {
    const MonitProcFeedbackModal = ref('')
    const queryFrom = ref()
    const mainTableRef = ref()
    const _this = getCurrentInstance().proxy
    const showModal = ref(false)
    const pickObjectField = (obj = {}, field) => {
      let newObj = {}
      Object.keys(obj).map(item => {
        if (field.includes(item)) {
          newObj[item] = obj[item]
        }
      })
      return newObj
    }
    const diffColumns = computed(() => {
      if (!store.getters.isFuJian) { // 只有福建有操作列
        return tableColumns(_this).filter(item => {
          return item.field !== 'opration'
        })
      }
      return tableColumns(_this)
    })
    const query = reactive({
      isShowQueryConditions: true,
      queryConfig: queryColumns,
      searchDataList: {
        mofDivCode: ''
      },
      search: () => {
        fetchTableData()
        queryCount()
      }
    })
    const [
      {
        pagerChange,
        columns,
        tableData,
        pagerConfig,
        tableLoadingState,
        tableToolbarConfig,
        fetchTableData,
        onToolbarBtnClick
      },
      register
    ] = useTable({
      columns: diffColumns, // 表格列配置
      // fetch: api.getDetail, // 请求数据方法
      fetch: (params) => post(BSURL.lmp_totalWarnPageQueryForCreate, params), // 请求数据方法
      dataKey: 'data.results',
      beforeFetch: (params) => {
        let obj = Object.assign({}, params, {
          page: params.page,
          pageSize: params.pageSize,
          createBill: query.searchDataList.createBill,
          mofDivCode: params.mofDivCode.split('##')[0],
          regulationClass: transJson(store.state.curNavModule.param5 || '')?.regulationClass
        })
        return obj
      }, // 前置钩子
      afterFetch: (tableData) => {
        return tableData
      }, // 后置钩子
      getSubmitFormData: () => { // 获取搜索栏form表单值
        return pickObjectField(queryFrom.value?.getFormData(), Object.keys(query.searchDataList))
      }
    }, false)
    const tableLayOut = reactive({
      tableFooterConfig: {
        showFooter: false
      },
      tableConfig: {
      },
      cellClick: () => {},
      ajaxTableData: pagerChange,
      seletion: [],
      tabStatusBtnConfig: {},
      menuName: '监控处理明细'
    })
    // table 右侧操作按钮
    // 查看附件
    const fileModalRef = reactive({
      billguid: '',
      showGlAttachmentDialog: false,
      showAttachment: (row, column) => {
        if (!row[column.property]) {
          message.warning('该数据无附件')
          return
        }
        fileModalRef.billguid = row[column.property]
        fileModalRef.showGlAttachmentDialog = true
      }
    })
    const customerProperty = reactive({
      tableLoading: false,
      leftTreeVisible: false,
      userInfo: store.getters.getuserInfo
    })
    const tabPanel = reactive({
      toolBarStatusBtnConfig: {
        changeBtns: true,
        buttons: tabButtonColumns,
        curButton: tabButtonColumns[0],
        buttonsInfo: {
          '1': [
            {
              label: '生成',
              code: 'create',
              status: 'primary'
            }
          ],
          '2': []
        },
        methods: {
          bsToolbarClickEvent: (obj) => {
            if (!obj.iconName) return
            query.searchDataList.createBill = obj.code
            queryFrom.value.onSearchResetClick()
          }
        }
      },
      tabStatusNumConfig: {
        '1': 0,
        '2': 0
      },
      onQueryConditionsClick: (obj) => {
      },
      onTabPanelBtnClick: (obj) => {
        const seletion = mainTableRef?.value?.getSelectionData()
        if (seletion.length !== 1) {
          message.warning('请选择一条数据')
          return
        }
        tableLayOut.seletion = seletion
        createWorkFlowSign()
      }
    })
    const queryCount = () => {
      let params = {
        mofDivCode: queryFrom.value?.getFormData()?.mofDivCode?.split('##')[0] || ''
      }
      post(BSURL.lmp_totalWarnPageQueryForCreateCount, params).then(res => {
        if (res.code === '000000') {
          tabPanel.tabStatusNumConfig[1] = res?.data[1] || 0
          tabPanel.tabStatusNumConfig[2] = res?.data[2] || 0
        }
      })
    }
    const showDialogVisible = ref(false)
    const detailModalLayout = reactive({
      ref: 'ShowDialog',
      title: '查看详情信息',
      warningCode: '',
      fiRuleCode: '',
      dealNo: ''
    })
    // const getDealNo = () => {
    //   api.queryDealNo().then(res => {
    //     detailModalLayout.dealNo = res.data
    //   })
    // }
    // getDealNo()
    const showDetail = (row) => {
      // 处理单详情---
      // tableLayOut.seletion = [row]
      // 违规详情---
      detailModalLayout.fiRuleCode = row.fiRuleCode || ''
      detailModalLayout.warningCode = row.warningCode || ''
      detailModalLayout.dealNo = row.dealNo || ''
      showDialogVisible.value = true
    }
    const createWorkFlowSign = () => {
      const params = tableLayOut.seletion.map(item => {
        return { dealNo: item.dealNo }
      })
      post(BSURL.lmp_totalWarnCreateUpdate, params).then(res => {
        if (res.code === '000000') {
          message.success('生成成功')
          query.search()
        } else {
          message.error('请求失败')
        }
      })
    }
    const createDataList = ref({})
    const handleRowClick = (row) => {
      showModal.value = true
      nextTick(() => {
        let formItemText = row.mflowBizInfoList || []// 拿到上一个节点表单结构
        let preNodeFormObj = {}// 上一个节点表单填得值
        if (formItemText && formItemText.length) {
          formItemText.forEach(item => {
            preNodeFormObj[item.bizKey] = item.bizValue
          })
        }
        createDataList.value = { ...row, ...preNodeFormObj }
        MonitProcFeedbackModal.value.tabCode = row.code
        MonitProcFeedbackModal.value.dialogVisible = true
      })
    }
    const closeHandle = () => {
      query.search()
      showDialogVisible.value = false
    }
    return {
      queryFrom,
      mainTableRef,
      register,
      columns,
      tableData,
      pagerConfig,
      tableToolbarConfig,
      onToolbarBtnClick,
      pagerChange,
      showDialogVisible,
      detailModalLayout,
      showDetail,
      closeHandle,
      handleRowClick,
      createDataList,
      showModal,
      tableLoadingState,
      MonitProcFeedbackModal,
      ...toRefs(fileModalRef),
      ...toRefs(customerProperty),
      ...toRefs(tabPanel),
      ...toRefs(query),
      ...toRefs(tableLayOut)
    }
  }
})

</script>
<style lang="less" scoped>
</style>
