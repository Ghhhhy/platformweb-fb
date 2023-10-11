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
import { ref, defineComponent, onMounted, onUnmounted } from '@vue/composition-api'
import httpMudules from '@/api/frame/main/Monitoring/guaranteedSalaryWarningTable.js'
// import useTable from '@/hooks/useTable'
import { mockQueryData, mockQueryParams, mockTableColumns } from './guaranteedSalaryWarningTableData'
import moment from 'moment'
export default defineComponent({
  setup() {
    onMounted(() => {
      search()
    })
    onUnmounted(() => {
      this.component('CustomerElProgress', null)
    })
    let cursionData = (arr) => {
      return arr.map(item => {
        let newObj = { ...item }
        if (item.sbGzKhjd) {
          newObj.sbGzKhjd = parseFloat(item.sbGzKhjd * 100).toFixed(1)
        } else {
          newObj.sbGzKhjd = '0.0'
        }
        if (item.sbGzXsjd) {
          newObj.sbGzXsjd = parseFloat(item.sbGzXsjd * 100).toFixed(1)
        } else {
          newObj.sbGzXsjd = '0.0'
        }
        if (item.children) {
          newObj.children = cursionData(item.children)
        }
        return newObj
      })
    }
    const tableLoading = ref(false)
    const queryConfig = ref(mockQueryData)
    const queryData = ref(mockQueryParams)
    const menuName = ref('“保工资”预警表')
    let tableData = ref([])
    const onSearch = (e) => {
      console.log('e', e)
      // let parmas = {
      //   startDays: e.startDays,
      //   mofDivCode: e.agencyCode_code,
      //   warningLevels: e.warningLevels
      //   // page: 1, // 页码
      //   // pageSize: staticConfig.value.pagerConfig.pageSize // 每页条数
      // }
      queryData.value = e
      if (!e.startDays) {
        queryData.value.startDays = null
      }
      search()
    }
    const search = () => {
      tableLoading.value = true
      let params = {
        startDays: queryData.value.startDays,
        mofDivCode: queryData.value.agencyCode_code,
        warningLevels: queryData.value.warningLevels_code__multiple
      }
      params.startDays && (params.startDays = moment(params.startDays).format('YYYY-MM-DD 00:00:00'))
      httpMudules.queryTableDatas(params).then(res => {
        tableLoading.value = false
        if (res.code === '000000' && res.data.length) {
          let newList = cursionData(res.data)
          tableData.value = newList
        }
      })
    }
    const reset = () => {
      queryData.value = {
        startDays: null,
        agencyCode_code: '',
        warningLevels_code__multiple: []
        // page: 1, // 页码
        // pageSize: staticConfig.value.pagerConfig.pageSize // 每页条数
      }
    }
    let tableColumnsConfig = ref(mockTableColumns)
    const staticConfig = ref({
      'tree-config': { dblExpandAll: true, dblExpand: true, accordion: false, iconClose: 'el-icon-circle-plus', iconOpen: 'el-icon-remove' },
      'row-id': 'id',
      tableFooterConfig: {},
      toolbarConfig: {
        // table工具栏配置
        search: false, // 是否有search
        import: false, // 导入
        export: true, // 导出
        print: false, // 打印
        zoom: true, // 缩放
        custom: true, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      pagerConfig: false,
      // pagerConfig: {
      //   page: 1,
      //   pageSize: 10
      // },
      cellStyle: ({ row, columns }) => {}
    })
    const staticEvents = ref({
      cellClick: (obj, context, e) => {
        let key = obj.column.property
        console.log(key, obj.row)
      },
      ajaxData: ({ params, currentPage, pageSize }) => {
        // staticConfig.value.pagerConfig.currentPage = currentPage
        // staticConfig.value.pagerConfig.pageSize = pageSize
        search()
      },
      onToolbarBtnClick: ({ context, table, code }) => {
        switch (code) {
          // 刷新
          case 'refresh':
            this.refresh()
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
      tableLoading
    }
  }
})

</script>
