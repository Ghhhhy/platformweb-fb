<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTap></template>
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
          :footer-config="tableFooterConfig"
          :table-columns-config="columns"
          :table-data="tableData"
          :table-config="tableConfig"
          :pager-config="pagerConfig"
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
    <receSupeMoniInquFormModal ref="receSupeMoniInquFormModal" :detail-data="seletion" style="min-width: 600px;" @closeModal="search" />
    <GlAttachment
      v-if="showGlAttachmentDialog"
      :user-info="userInfo"
      :billguid="billguid"
      @close="showGlAttachmentDialog = false"
    />
    <ShowDialog
      v-if="showDialogVisible"
      v-bind="detailModalLayout"
      @close="closeHandle"
    />
  </div>
</template>

<script lang="jsx">
import { defineComponent, toRefs, reactive, ref } from '@vue/composition-api'
import useTable from '@/hooks/useTable'
import { tableColumns, queryColumns, tabButtonColumns, renderers } from './columns'
import api from '@/api/frame/main/fundMonitoring/createProcessing.js'
import receSupeMoniInquFormModal from './receSupeMoniInquFormModal.vue'
import ShowDialog from '@/views/main/fundMonitoring/violationHandle/warningCreate/children/addDialog.vue'
import store from '@/store/index'
import { message } from 'element-ui'
import transJson from '@/utils/transformMenuQuery'
import GlAttachment from '@/views/main/fundMonitoring/violationHandle/warningCreate/children/common/GlAttachment.vue'
export default defineComponent({
  components: {
    receSupeMoniInquFormModal,
    GlAttachment,
    ShowDialog
  },
  setup() {
    const queryFrom = ref()
    const mainTableRef = ref()
    const receSupeMoniInquFormModal = ref()
    const pickObjectField = (obj = {}, field) => {
      let newObj = {}
      Object.keys(obj).map(item => {
        if (field.includes(item)) {
          newObj[item] = obj[item]
        }
      })
      return newObj
    }
    const query = reactive({
      isShowQueryConditions: true,
      queryConfig: queryColumns,
      searchDataList: {
        dealNo: '',
        agencyName: '',
        violateType: '',
        // regulationClassName: '',
        warnStartTime: '',
        warnTime: '',
        triggerClass: '',
        warningLevel: '',
        fiRuleName: ''
      },
      search: () => {
        fetchTableData()
        const params = {
          regulationClass: transJson(store.state.curNavModule.param5)?.regulationClass
        }
        api.getIssueCount(params).then(res => {
          tabPanel.tabStatusNumConfig['0'] = res.data?.wjs
          tabPanel.tabStatusNumConfig['1'] = res.data?.yjs
        })
      }
    })
    const [
      {
        pagerChange,
        columns,
        tableData,
        pagerConfig,
        tableToolbarConfig,
        fetchTableData,
        onToolbarBtnClick
      },
      register
    ] = useTable({
      columns: tableColumns, // 表格列配置
      // fetch: api.getDetail, // 请求数据方法
      fetch: api.getIssueDetail, // 请求数据方法
      dataKey: 'data.results',
      beforeFetch: (params) => {
        let obj = Object.assign({}, params, {
          page: params.current,
          pageSize: params.size,
          menuId: store.state.curNavModule.guid,
          receiveStatus: query.searchDataList.receiveStatus,
          regulationClass: transJson(store.state.curNavModule.param5)?.regulationClass
        })
        delete obj.current
        delete obj.size
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
        renderers,
        methods: {
          onOptionRowClick: ({ row, column, optionType }, context) => {
            switch (optionType) {
              // 附件
              case 'attachment':
                fileModalRef.showAttachment(row, column)
                break
              case 'show':
                showDetail(row)
                break
              default:
            }
          }
        }
      },
      cellClick: () => {},
      ajaxTableData: pagerChange,
      seletion: [],
      tabStatusBtnConfig: {},
      menuName: '上级监控问询单接收'
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
          '0': [
            {
              label: '接收',
              code: 'accept',
              status: 'primary'
            }
          ],
          '1': [
          ]
        },
        methods: {
          bsToolbarClickEvent: (obj) => {
            if (!obj.iconName) return
            query.searchDataList.receiveStatus = obj.code
            queryFrom.value.onSearchResetClick()
            const params = {
              regulationClass: transJson(store.state.curNavModule.param5)?.regulationClass
            }
            api.getIssueCount(params).then(res => {
              tabPanel.tabStatusNumConfig['0'] = res.data?.wjs
              tabPanel.tabStatusNumConfig['1'] = res.data?.yjs
            })
          }
        }
      },
      tabStatusNumConfig: {
        '0': 0,
        '1': 0
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
        receSupeMoniInquFormModal.value.showType = 'edit'
        receSupeMoniInquFormModal.value.dialogVisible = true
      }
    })
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
      // receSupeMoniInquFormModal.value.dialogVisible = true
      // receSupeMoniInquFormModal.value.showType = 'detail'
      // 违规详情---
      detailModalLayout.fiRuleCode = row.fiRuleCode || ''
      detailModalLayout.warningCode = row.warningCode || ''
      detailModalLayout.dealNo = row.dealNo || ''
      showDialogVisible.value = true
    }
    const closeHandle = () => {
      query.search()
      showDialogVisible.value = false
    }
    return {
      receSupeMoniInquFormModal,
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
