<template>
  <div v-loading="tableLoading" style="height: 100%" class="createProcessing">
    <BsMainFormListLayout :default-split-pane-left-width="14">
      <!-- <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          is-open
          is-hide-query
          :tab-status-btn-config="tabStatusBtnConfig"
          :tab-status-num-config="tabStatusNumConfig"
          @btnClick="onTabPanelBtnClick"
        />
      </template> -->
      <template v-slot:query>
        <BsQuery
          ref="queryFrom"
          :query-form-item-config="queryConfig"
          :query-form-data="queryData"
          @onSearchClick="onSearch"
          @onSearchResetClick="reset(), search()"
        />
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="mainTableRef"
          v-bind="staticConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :title="menuName"
          v-on="staticEvents"
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
  </div>
</template>
<script lang="js">
// /* eslint-disable */
import { post } from '@/api/http'
import { ref, defineComponent, onMounted } from '@vue/composition-api'

import { mockQueryData, mockTableColumns } from './workflowOversightManagement'
// import moment from 'moment'
export default defineComponent({

  setup() {
    const mainTableRef = ref()
    onMounted(() => {
      console.log('mainTableRef', mainTableRef.value)
      search()
    })
    // const formatKeyList = ['sbGzKhjd', 'sbGzXsjd']
    // let cursionData = (arr) => {
    //   return arr.map(item => {
    //     let newObj = { ...item }
    //     // sbGzKhjd 考核进度,sbGzXsjd 序时进度,sbZxjd 执行进度 让后端返回的 '0.37777...8' 变成'37.8' 这种
    //     formatKeyList.forEach(field => {
    //       if (item[field]) {
    //         newObj[field] = parseFloat(item[field] * 100).toFixed(1)
    //       } else {
    //         newObj[field] = '0.0'
    //       }
    //     })
    //     if (item.children) {
    //       newObj.children = cursionData(item.children)
    //     }
    //     return newObj
    //   })
    // }
    const tableLoading = ref(false)
    const queryConfig = ref(mockQueryData)
    const queryData = ref({
      mofDivCodes: '',
      warnLevel: '',
      stopTime: '',
      regulationClass: ''
    })
    const menuName = ref('流程督办管理')
    let tableData = ref([])
    const onSearch = (e) => {
      queryData.value = e
      search()
    }
    const search = () => {
      tableLoading.value = true
      let params = {
        mofDivCodes: queryData.value.mofDivCodes_code,
        warnLevel: queryData.value.warnLevel,
        stopTime: queryData.value.stopTime,
        regulationClass: '',
        page: staticConfig.value.pagerConfig.page,
        pageSize: staticConfig.value.pagerConfig.pageSize
      }
      staticConfig.value.isFlushAction && (params.isFlush = true)
      post(BSURL.dfr_warningResultHandleRulePageQueryFlow, params).then(res => {
        tableLoading.value = false
        staticConfig.value.isFlushAction = false
        if (res.code === '000000') {
          tableData.value = res.data.results
        }
      })
    }
    const reset = () => {
      queryData.value = {
        stopTime: null,
        mofDivCodes_code: '',
        warnLevel: '',
        regulationClass: '',
        page: 1, // 页码
        pageSize: staticConfig.value.pagerConfig.pageSize // 每页条数
      }
    }
    let tableColumnsConfig = ref(mockTableColumns)
    const staticConfig = ref({
      'tree-config': { dblExpandAll: true, dblExpand: true, accordion: false, iconClose: 'el-icon-circle-plus', iconOpen: 'el-icon-remove' },
      'row-id': 'id',
      isFlushAction: false,
      tableFooterConfig: {},
      toolbarConfig: {
        // table工具栏配置
        custom: true, // 选配展示列
        moneyConversion: false,
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      tableConfig: {
        wordLength: 6// 自定义溢出(?)字展示文字提示
      },
      // pagerConfig: false,
      pagerConfig: {
        page: 1,
        pageSize: 10
      },
      cellStyle: ({ row, columns }) => {}
    })
    const staticEvents = ref({
      cellClick: (obj, context, e) => {
        let key = obj.column.property
        console.log(key, obj.row)
      },
      ajaxData: ({ params, currentPage, pageSize }) => {
        staticConfig.value.pagerConfig.page = currentPage
        staticConfig.value.pagerConfig.pageSize = pageSize
        search()
      },
      onToolbarBtnClick: ({ context, table, code }) => {
        switch (code) {
          // 刷新
          case 'refresh':
            staticConfig.value.isFlushAction = true
            search()
            break
        }
      }
    })
    return {
      staticConfig,
      staticEvents,
      tableColumnsConfig,
      tableData,
      reset,
      onSearch,
      search,
      menuName,
      queryData,
      queryConfig,
      tableLoading,
      mainTableRef
    }
  }
})

</script>
