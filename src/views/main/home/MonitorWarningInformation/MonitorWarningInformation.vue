<template>
  <div v-loading="tableLoading" style="height: 100%" class="createProcessing">
    <BsMainFormListLayout>
      <template v-slot:mainForm>
        <BsTable
          ref="mainTableRef"
          v-bind="staticConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
        >
          <template v-slot:toolbarSlots>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
            >
              <span
                style="margin-top: 10px; margin-left: 10px"
              >请尽快完成工资业务处理！</span>
              <vxe-button
                type="primary"
                content="查看详情"
                @click="goToDetail"
              />
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
  </div>
</template>
<script lang="js">
import { ref, defineComponent, onMounted } from '@vue/composition-api'
import router from '@/router'
// import useTable from '@/hooks/useTable'
import { mockTableColumns } from './MonitorWarningInformation'
export default defineComponent({
  setup() {
    const tableLoading = ref(false)
    let tableData = ref([])
    onMounted(() => {
      tableData.value = [
        {
          id: 'B99903EABA534E01AFB5E4829A5A0054',
          parentId: '0',
          levelNo: 1,
          sbZbjeBgz: 144300667572.31,
          sbZxjeBgz: 23290604604.56,
          code: '619900000',
          name: '陕西省',
          mofDivCode: null,
          mofDivName: null,
          sbGzKhjd: '0.8',
          sbZxjd: null,
          sbGzXsjd: '0.8333333333333334',
          rgbColor: '#EF949F',
          warningLevel: 5,
          warningLevelStr: '红色三档',
          children: [
            {
              name: '福州',
              sbZbjeBgz: '4141565753',
              sbZxjeBgz: '2446412412',
              sbGzKhjd: '89',
              sbGzXsjd: '35',
              warningLevelStr: '2'
            }
          ]
        }
      ]
    })
    // 查看详情-保工资预警明细
    const goToDetail = () => {
      router.push({
        name: 'guaranteedSalaryWarningTable'
      })
    }
    let tableColumnsConfig = ref(mockTableColumns)
    const staticConfig = ref({
      'tree-config': { dblExpandAll: true, dblExpand: true, accordion: false, iconClose: 'el-icon-circle-plus', iconOpen: 'el-icon-remove' },
      'row-id': 'id',
      // isFlushAction: false,
      tableFooterConfig: {},
      toolbarConfig: {
        // table工具栏配置
        moneyConversion: false, // 是否金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: false, // 导出
        print: false, // 打印
        zoom: false, // 缩放
        refresh: false,
        custom: false, // 选配展示列
        expandAll: false,
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      tableConfig: {
        wordLength: 6// 自定义溢出(?)字展示文字提示
      },
      pagerConfig: false,
      // pagerConfig: {
      //   page: 1,
      //   pageSize: 10
      // },
      cellStyle: ({ row, columns }) => {}
    })
    return {
      staticConfig,
      tableColumnsConfig,
      tableData,
      tableLoading,
      goToDetail
    }
  }
})

</script>
<style scoped>
::v-deep .Titans-table .vxe-grid--toolbar-wrapper {
  padding-right: 0px !important;
}
</style>
