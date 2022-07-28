<template>
  <div class="fmc-main">
    <main class="fmc-right fn-inline">
      <BsTable
        ref="bsTableRef"
        :table-columns-config="tableColumnsConfig"
        :table-data="tableData"
        :edit-config="false"
        :toolbar-config="toolbarConfig"
        :pager-config="pagerConfig"
        @currentChange="currentChange"
        @editClosed="currentChange"
        @ajaxData="ajaxData"
      />
    </main>
    <MultiAddForm v-model="addDialogVisible" />
  </div>
</template>

<script>
import getFormConfData from './config/formConf'
import MultiAddForm from './addForm'
export default {
  name: 'RouterTable',
  components: {
    MultiAddForm
  },
  props: {
  },
  data() {
    return {
      // ================表格配置==========================//
      editConfig: {
        trigger: 'dblclick',
        mode: 'cell',
        showStatus: true
        // activeMethod({ row, rowIndex, column, columnIndex }) {
        // }
      },
      addDialogVisible: false,
      pagerConfig: {
        currentPage: 1,
        total: 100
      },
      currentPage: 1,
      toolbarConfig: {
        disabledMoneyConversion: false,
        ...getFormConfData('tableInfo', 'toolbarConfig')
      },
      tableColumnsConfig: getFormConfData('tableInfo', 'tableColumnsConfig'),
      tableData: getFormConfData('tableInfo', 'tableData'),
      queryParams: {}
      // ================表格配置==========================//

    }
  },
  methods: {
    // 表格新增
    AddData() {
      this.$parent.curTabComponent = 'RouterForm'
    },

    AddDataFrom() {
      this.addDialogVisible = true
    },

    // table保存数据
    saveData() {
      console.log('保存数据')
    },

    confrimData(newData) {
      const { data } = newData
      this.tableData = [...data, ...this.tableData]
    },

    currentChange({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }, bsTable, xgrid) {
      // 关闭编辑事件

    },
    ajaxData({ params, currentPage, pageSize }) {
      // table查询回调
      this.pagerConfig.currentPage = currentPage
      this.queryParams = Object.assign(this.queryParams, {
        params,
        currentPage,
        pageSize
      })
      this.getTableDatasByPage(currentPage, pageSize)
    },
    getTableDatasByPage(currentPage, pageSize) {
      // 服务端查询数据
      this.showLoading = true
      let self = this
      this.$http.post('url', this.queryParams).then(res => {
        if (res.code === 200) {
          self.tableData = res.data.list
          self.pagerConfig = {
            total: res.data.total,
            currentPage: currentPage
          }
          this.showLoading = false
        }
      })
    }
  },
  created() {

  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">

</style>
