<template>
  <div class="fmc-main">
    <div class="fmc-left-con fn-inline height-all" :class="leftVisible ? 'fmc-left-visible' : 'fmc-left-hidden'">
      <aside class="fmc-left fn-inline">
        <div class="tab" style="height:46px">
          <BsTab type="button" :tab-list="tabList" :default-select="cueTabSelect" @onTabClick="onTabClick" />
        </div>
        <div style="height:calc(100% - 46px)">
          <div class="height-half">
            <div class="fmc-title">
              <span class="fn-inline">预算单位</span>
            </div>
            <div class="fmc-left-tree">
              <BsBossTree @clickmethod="onLeftNodeClick" @afterloadmethod="onTreeLoaded" @checkChange="onNodeCheckClick" />
            </div>
          </div>
          <div class="height-half">
            <div class="fmc-title">
              <span class="fn-inline">预算单位</span>
            </div>
            <div class="fmc-left-tree">
              <BsBossTree @clickmethod="onLeftNodeClick2" />
            </div>
          </div>
        </div>
      </aside>
      <div class="fmc-left-visible-control fn-inline" style="height:100%">
        <div class="fn-inline height-all w1"></div>
        <div class="fn-inline fmcl-visible-control" @click="leftVisible = !leftVisible">
          <div class="fmcl-control-bg pointer">
            <i class="fmcl-control-ico fn-inline">
            </i>
          </div>
        </div>
      </div>
    </div>
    <main class="fmc-right fn-inline" :style="leftVisible ? 'width:calc(100% - 320px)' : 'width:calc(100% - 20px)'">
      <BsTable
        ref="bsTableRef"
        :footer-config="{ showFooter: true }"
        :table-config="tableConfig"
        :table-columns-config="tableColumnsConfig"
        :table-data="tableData"
        :expand-config="{ showIcon: true,accordion: true, lazy: true,toggleMethod: toggleContentMethod ,loadMethod: loadContentMethod,visibleMethod: visibleContentMethod }"
        :edit-config="editConfig"
        :toolbar-config="toolbarConfig"
        :edit-rules="editRules"
        :pager-config="pagerConfig"
        :default-money-unit="1"
        @currentChange="currentChange"
        @editClosed="currentChange"
        @ajaxData="ajaxData"
      >
        <template v-slot:toolbar-custom-slot>
          <div class="f20">用户自定义插槽内容</div>
        </template>
      </BsTable>
    </main>
    <div class="fmc-searchbox">
      <!-- <BsForm /> -->
    </div>
    <div>
      <Infortable :dialog-visible.sync="xhDialogVisible" />
      <BasicInforAdd :model-data="modelData" :dialog-visible.sync="addDialogVisible" />
      <!-- <BsTransferData :visible.sync="transferVisible" /> -->
    </div>
  </div>
</template>
<script>
import getFormConfData from './formConf'
import Infortable from './modal/XhysTable'
import BasicInforAdd from './FormAdd'
export default {
  name: 'BasicInfor',
  props: {
    allPropData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    Infortable,
    BasicInforAdd
  },
  data() {
    return {
      transferVisible: true,
      leftVisible: true,
      editConfig: {
        trigger: 'dblclick',
        mode: 'cell',
        showStatus: true
        // activeMethod({ row, rowIndex, column, columnIndex }) {
        // }
      },
      xhDialogVisible: false,
      addDialogVisible: false,
      curSelectLeftTreeNode: {},
      pagerConfig: {
        currentPage: 1,
        total: 100
      },
      currentPage: 1,
      toolbarConfig: {
        disabledMoneyConversion: false,
        ...getFormConfData('basicInfo', 'toolbarConfig')
      },
      tableConfig: getFormConfData('basicInfo', 'tableConfig'),
      tableColumnsConfig: getFormConfData('basicInfo', 'tableColumnsConfig'),
      tableData: getFormConfData('basicInfo', 'tableData'),
      editRules: getFormConfData('basicInfo', 'editRules'),
      tabList: [
        {
          label: '未处理',
          code: 'wcl',
          inforCount: 10
        },
        {
          label: '已处理',
          code: 'ycl'
        },
        {
          label: '未申报',
          code: 'wsb'
        },
        {
          label: '已申报',
          code: 'ysb'
        },
        {
          label: '未下发',
          code: 'wxf'
        },
        {
          label: '已下发',
          code: 'yxf'
        }
      ],
      cueTabSelect: {
        label: '未处理',
        code: 'wcl'
      },
      modelData: {},
      queryParams: {}
    }
  },
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    },
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  methods: {
    onTabClick(obj) {
      this.cueTabSelect = obj
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
    },
    onTreeLoaded({ data, curSelectData, tree }) {
      // 树加载完成
    },
    onLeftNodeClick(obj, checksObj) {
      // 树节点点击事件
      this.curSelectLeftTreeNode = obj
    },
    onNodeCheckClick(obj, isChecked, ischildChecked) {
    },
    onLeftNodeClick2(obj, checksObj) {
      // 树节点点击事件
      this.curSelectLeftTreeNode = obj
    },
    onyXhysClick() {
      // 细化预算点击事件
      this.xhDialogVisible = true
    },
    onTableAddRowClick() {
      // 列表新增行
      this.$refs.bsTableRef.insertRowData({
        data: {
          age: 1
        }
      })
    },
    onTableAddModelClick() {
      // 表格新增
      this.addDialogVisible = true
      // this.ExportExcel.exportExcel()
    },
    onTableEditModelClick(obj, bsTable, e) {
      let selection = bsTable.getTableData().selection
      if (selection.length === 1) {
        this.modelData = selection[0]
      }
    },
    currentChange({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }, bsTable, xgrid) {
      // 关闭编辑事件

    },
    getTableData() {
      let self = this
      self.$refs.bsTableRef.getTableData()
    },
    saveData() {
      this.$refs.bsTableRef.validate().then(() => {
        // 校验成功
      }).catch(e => {
        // 失败
      })
    },
    transformMoneyByUnit(data, conlums, type = 'big', unit, rendererList = ['$moneyRender']) {
      let self = this
      let dataCp = [...data]
      console.log(dataCp)
      dataCp.forEach((row, rowIndex) => {
        self.transformRowMoneyByUnit(row, conlums, type, unit, rendererList)
      })
      return dataCp
    },
    transformRowMoneyByUnit(row, conlums, type, unit, rendererList) {
      let self = this
      conlums.forEach((conlum, conlumIndex) => {
        let itemRender = conlum.cellRender || conlum.editRender || conlum.contentRender
        if (itemRender && rendererList.indexOf(itemRender.name) >= 0 && !conlum.children) {
          if (type === 'big') {
            row[conlum.field] = (parseFloat(row[conlum.field]) / unit).toFixed(2)
          } else {
            row[conlum.field] = (parseFloat(row[conlum.field]) * unit).toFixed(2)
          }
        }
        if (Array.isArray(conlum.children) && conlum.children.length) {
          self.transformRowMoneyByUnit(row, conlum.children, type, unit, rendererList)
        }
      })
    },
    visibleContentMethod({ column, columnIndex, row, rowIndex }) {
      return row.status === 1
    },
    toggleContentMethod({ expanded, column, columnIndex, row, rowIndex }) {
      this.$refs.bsTableRef.tableOptionFn().clearRowExpandLoaded(row)
      return true
    },
    loadContentMethod ({ row, rowIndex, $rowIndex }) {
      console.log('1234')
      // let self = this
      return new Promise(resolve => {
        setTimeout(() => {
          const childCols = [
            {
              field: 'time',
              title: 'Time'
            },
            {
              field: 'income',
              title: 'Income',
              cellRender: {
                name: '$moneyRender'
              }
            },
            {
              field: 'tax',
              title: 'Tax',
              cellRender: {
                name: '$moneyRender'
              }
            },
            {
              field: 'deduction',
              title: 'Deduction',
              formula: '{income}*0.07',
              cellRender: {
                name: '$calculateRender'
              }
            },
            {
              field: 'bonus',
              title: 'Bonus',
              cellRender: {
                name: '$moneyRender'
              }
            },
            {
              field: 'profit',
              title: 'Profit',
              combinedType: ['average', 'total'],
              formula: '{income}-{tax}-{Deduction}+{bonus}',
              cellRender: {
                name: '$calculateRender'
              }
            }
          ]
          const childData = [
            { time: '2020-01-20', income: 14000, tax: 200, bonus: 1000, profit: '', deduction: '' },
            { time: '2020-02-20', income: 14000, tax: 200, bonus: 1000, profit: '', deduction: '' },
            { time: '2020-03-20', income: 14000, tax: 200, bonus: 1000, profit: '', deduction: '' },
            { time: '2020-04-20', income: 14000, tax: 200, bonus: 6000, profit: '', deduction: '' },
            { time: '2020-05-20', income: 16000, tax: 210, bonus: 2000, profit: '', deduction: '' },
            { time: '2020-06-20', income: 16000, tax: 210, bonus: 2000, profit: '', deduction: '' }
          ]
          row.childCols = childCols
          row.childData = childData
          resolve()
        }, 500)
      })
    }
  },
  mounted() {
    // let self = this
    // setTimeout(() => {
    //   // self.tableData = self.transformMoneyByUnit(self.tableData, self.tableColumnsConfig, 'big', 10000)
    //   self.tableData = []
    // }, 10000)
    // this.$refs.bsTableRef.tableOptionFn().
  },
  watch: {
    xhDialogVisible: {
      handler(newval) {
      },
      deep: true,
      immediate: true
    },
    allPropData: {
      handler(newval) {
        console.log(newval)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
</style>
