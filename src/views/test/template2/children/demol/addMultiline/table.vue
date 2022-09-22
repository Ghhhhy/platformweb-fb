<template>
  <div class="fmc-main">
    <div class="tool-bar">
      <BsToolBar
        v-model="leftVisible"
        top-tip
        :tab-status-btn-config="tabStatusBtnConfig"
        :server-config="serverConfig"
        :tab-status-num-config="tabStatusNumConfig"
        @onAsideChange="asideChange"
      />
    </div>
    <div class="fmc-left-con fn-inline height-all aside" :class="leftVisible ? 'fmc-left-visible' : 'fmc-left-hidden'">
      <aside class="fmc-left fn-inline">
        <div style="height:100%">
          <div class="fmc-title">
            <span class="fn-inline">预算单位</span>
          </div>
          <div class="fmc-left-tree">
            <BsBossTree
              ref="testTree"
              is-need-root
              open-loading
              :is-server="true"
              :datas="treeData"
              :server-uri="serverUri"
              :queryparams="treeQueryparams"
              :afterloadmethod="afterloadmethod"
              :clickmethod="onClickmethod"
            />
          </div>
        </div>
      </aside>
    </div>
    <main class="fmc-right fn-inline" :style="leftVisible ? 'width:calc(100% - 315px)' : 'width:100%'">
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
    <MultiAdd v-model="addDialogVisible" @onConfrimData="confrimData" />
  </div>
</template>

<script>
import getFormConfData from './config/formConf'
import { statusButtons, curStatusButton, buttons } from './config/config'
import api from '@/api/components/test/toolbar/toolbar'
import MultiAdd from './add'
console.log(statusButtons, curStatusButton, 55, buttons)
export default {
  name: 'MultiLine',
  components: {
    MultiAdd
  },
  props: {

  },
  data() {
    return {
      leftVisible: true,
      // ================树配置==========================//
      treeData: [],
      serverUri: 'plan-service/queryTreeAssistData',
      treeQueryparams: {
        useRight: false,
        batchno: 2,
        datatype: 5,
        eleCode: 'DEPBGTECO',
        sxspecroleguid: '637B6D5A823F459AB313CBF94C87765B'
      },
      afterloadmethod: this.onAfterloadmethod,
      clickmethod: this.onClickmethod,
      // ================树配置==========================//

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
      queryParams: {},
      // ================表格配置==========================//

      // ================工具条配置==========================//
      isAsideClose: false,
      rightButtons: buttons,
      tabStatusBtnConfig: {
        limit: 4,
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
  methods: {
    // 树加载完回调
    onAfterloadmethod(data) {
      console.log(77, data)
    },

    // 树节点选择回调
    onClickmethod(obj, node, vess) {
      console.log(13, obj, node, vess)
    },

    // 表格新增
    AddData() {
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

    asideChange(isClose) {
      this.leftVisible = isClose
    }
  },
  created() {

  },
  mounted() {
    this.getStatusBtnsNum()
  }
}
</script>

<style scoped lang="scss">

</style>
