<template>
  <div v-loading="tableLoading" style="height: 100%" class="createProcessing">
    <BsMainFormListLayout>
      <template v-slot:mainForm>
        <BsTable
          ref="mainTableRef"
          v-bind="staticConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :tree-config="{
            dblExpandAll: true,
            dblExpand: true,
            accordion: false,
            iconClose: 'el-icon-circle-plus',
            iconOpen: 'el-icon-remove',
            expandRowKeys: defaultExpandKey,
          }"
        >
          <template v-slot:toolbarSlots>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
            >
              <span style="margin-top: 10px; margin-left: 10px">请尽快完成工资业务处理！</span>
              <vxe-button type="primary" content="查看详情" @click="goToDetail" />
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
  </div>
</template>
<script lang="js">
import { ref, defineComponent, onMounted } from '@vue/composition-api'
import store from '@/store/index'
import router from '@/router'
// import useTable from '@/hooks/useTable'
import { mockTableColumns } from './MonitorWarningInformation'
export default defineComponent({
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  setup(props, { emit }) {
    const tableLoading = ref(false)
    let tableData = ref([])
    let defaultExpandKey = ref([])
    const init = (data) => {
      tableData.value = data
      defaultExpandKey.value = cursionTreeList(data)
    }
    onMounted(() => {

    })
    const cursionTreeList = (tree) => {
      const arr = []
      const levelNo = [0, 1]
      if (!Array.isArray(tree) || !tree.length) return
      const cursionTree = (tree, level = 0) => {
        tree.forEach((item) => {
          if (levelNo.includes(level)) {
            arr.push(item.id)
          }
          if (Array.isArray(item.children) && item.children && item.children.length) {
            cursionTree(item.children, level + 1)
          }
        })
      }
      cursionTree(tree)
      return arr
    }
    // 查看详情-保工资预警明细
    const goToDetail = () => {
      router.push({
        name: 'guaranteedSalaryWarningTable'
      })
      const route = {
        url: '/guaranteedSalaryWarningTable',
        code: '892',
        name: ' “保工资”预警表 '
      }
      store.commit('setCurMenuObj', route)
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
      cellStyle: ({ row, columns }) => { }
    })
    return {
      staticConfig,
      tableColumnsConfig,
      tableData,
      init,
      tableLoading,
      goToDetail,
      defaultExpandKey
    }
  }
})

</script>
<style scoped>
::v-deep .Titans-table .vxe-grid--toolbar-wrapper {
  padding-right: 0px !important;
}
</style>
