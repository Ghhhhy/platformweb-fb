<template>
  <div class="fmc-main">
    <div class="tool-bar">
      <BsToolBar
        v-model="leftVisible"
        :tab-status-btn-config="tabStatusBtnConfig"
        :server-config="serverConfig"
        :tab-status-num-config="tabStatusNumConfig"
        @onAsideChange="asideChange"
      />
    </div>
    <div class="fmc-left-con fn-inline height-all aside" :class="leftVisible ? 'fmc-left-visible' : 'fmc-left-hidden'">
      <aside class="fmc-left fn-inline">
        <div style="height:100%">
          <div class="height-half">
            <div class="fmc-title">
              <span class="fn-inline">预算单位</span>
            </div>
            <div class="fmc-left-tree">
              <BsUnitTree @onNodeClick="onLeftNodeClick" @onTreeLoaded="onTreeLoaded" @onNodeCheckClick="onNodeCheckClick" />
            </div>
          </div>
          <div class="height-half">
            <div class="fmc-title">
              <span class="fn-inline">预算单位</span>
            </div>
            <div class="fmc-left-tree">
              <BsUnitTree @onNodeClick="onLeftNodeClick2" />
            </div>
          </div>
        </div>
      </aside>
      <!-- <div class="fmc-left-visible-control fn-inline" style="height:100%">
        <div class="fn-inline height-all w1"></div>
        <div class="fn-inline fmcl-visible-control" @click="leftVisible = !leftVisible">
          <div class="fmcl-control-bg pointer">
            <i class="fmcl-control-ico fn-inline">
            </i>
          </div>
        </div>
      </div> -->
    </div>
    <main class="fmc-right fn-inline" :style="leftVisible ? 'width:calc(100% - 315px)' : 'width:100%'">
      <BsTable
        ref="bsTableRef"
        :footer-config="{ showFooter: true }"
        :table-config="tableConfig"
        :table-columns-config="tableColumnsConfig"
        :table-data="tableData"
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
    </div>
  </div>
</template>
<script>
import getFormConfData from './formConf'
import Infortable from './modal/XhysTable'
import BasicInforAdd from './FormAdd'
import { statusButtons, curStatusButton, buttons } from './config'
import api from '@/api/components/test/toolbar/toolbar'
console.log(statusButtons, curStatusButton, 55, buttons)
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
          code: 'wcl'
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
      queryParams: {},
      isAsideClose: false,
      rightButtons: buttons,
      tabStatusBtnConfig: {
        // 状态按钮和左侧按钮触发后回调，方式一
        // buttons: [
        //   {
        //     label: '未处理',
        //     code: 'wcl',
        //     callback: this.noDeal
        //   },
        //   {
        //     label: '已处理',
        //     code: 'ycl',
        //     callback: this.dealed
        //   }
        // ],
        // curButton: {
        //   label: '未处理',
        //   code: 'wcl',
        //   callback: this.noDeal
        // }

        // 状态按钮和左侧按钮触发后回调，方式二
        // buttons: statusButtons,
        // curButton: curStatusButton,
        methods: {
          bsToolbarClickEvent: this.bsToolbarClickEvent
        }
      },
      // 不传数据，有接口
      serverConfig: {
        isServer: true,
        serverUri: 'plan-service/queryTreeAssistData',
        queryparams: {
          type: 2,
          module: 'test'
        }
      },
      tabStatusNumConfig: {}
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
    onLeftNodeClick({ data, node, tree }) {
      // 树节点点击事件
      this.curSelectLeftTreeNode = data
    },
    onNodeCheckClick({ data, obj }) {
    },
    onLeftNodeClick2({ data, node, tree }) {
      // 树节点点击事件
      this.curSelectLeftTreeNode = data
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
    // 按钮触发后，第一种回调方式
    noDeal(obj, $this) {
      console.log(55, '回调方式一', obj, $this.$options, $this.$data.curTabSelect.label)
    },
    dealed(obj, $this) {
      console.log(55, '回调方式一', obj, $this.$options, $this.$data.curTabSelect.label)
    },

    // 按钮触发后，第二种回调方式
    bsToolbarClickEvent(obj, $this) {
      console.log(55, '回调方式二', obj, $this.$options, '状态按钮当前为：' + $this.$data.curTabSelect.label)
    },

    // 请求获取状态按钮数量
    getStatusBtnsNum() {
      let self = this
      api.getToolbarNum().then(res => {
        if (res.rscode === 200) {
          self.tabStatusNumConfig = res.data
        }
      })
    },

    // 折叠按钮事件回调处理，方式一
    asideChange(isClose) {
      this.leftVisible = isClose
    }
  },
  mounted() {
    this.getStatusBtnsNum()
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
