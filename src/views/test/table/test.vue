<template>
  <div class="boss-table_test">
    <BsTable
      ref="table"
      v-loading="false"
      style="width: 100%; height: 100%"
      :table-columns-config="tableItems"
      :edit-config="editConfig"
      :expand-config="{}"
      :table-data="tableData"
      :toolbar-config="toolbarConfig"
      :pager-config="false"
      :table-form-config="false"
      :table-config="{}"
      :edit-rules="tableValidation"
      :footer-config="footerConfig"
      @editClosed="editClosedHandle"
    />
  </div>
  </div>
</template>

<script>
import { tableDataList, tableValidationConfig, tableItemsConfig } from './config'
export default {
  name: 'TestTable',
  props: '',
  data() {
    return {
      tableData: tableDataList,
      tableValidation: tableValidationConfig,
      tableItems: tableItemsConfig,
      footerConfig: {
        'showFooter': true
      },
      editConfig: {
        trigger: 'dblclick',
        mode: 'cell',
        showStatus: true
      },
      toolbarConfig: {
        buttons: [
          { code: 'toolbar-refresh', name: '校验', status: 'primary', callback: this.valaidate },
          { code: 'toolbar-addLine', name: '新增行', callback: this.addLine },
          { code: 'toolbar-copyLine', name: '复制行', callback: this.copyLine },
          { code: 'toolbar-delLine', name: '删除行', callback: this.delLine },
          { code: 'toolbar-revert', name: '撤销', callback: this.revertData },
          { code: 'toolbar-list', name: '保存', callback: this.saveData }

        ]
      }
    }
  },
  components: {

  },
  mounted() {
  },
  methods: {
    addLine() {
      this.$refs.table.insertRowData({ data: {} })
    },
    copyLine() {
      this.$refs.table.copySelectionRowData({})
    },
    delLine(obj, self, e) {
      this.$refs.table.deleteRowData()
    },
    revertData() {
      this.$refs.table.revertEvent()
    },
    valaidate() {
      this.$refs.table.validate()
    },
    saveData() {
      const fn = this.$refs.table.getListData()
      console.log(fn)
    },
    // 在这里面做数据联动
    editClosedHandle({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }, bsTable, xGrid) {
      console.log(55, row)
      if (row.bgt_dept_.includes('08E9D6AC838F77C874B09FE69EF68A85')) {
        row.name = 'comer'
      }
    }
  },
  watch: {

  }
}
</script>
