<!--
 * @Author: hupengcheng 1286335855@qq.com
 * @Date: 2023-10-06 15:48:40
 * @LastEditors: hupengcheng 1286335855@qq.com
 * @LastEditTime: 2023-10-10 17:41:48
 * @FilePath: \platformweb-fb\src\views\main\MointoringMatters\CheckPayBill\CheckPayBill.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTabPane>
        <!-- <BsTabPanel
          ref="tabPanel"
          show-zero
          :show-num="true"
          :is-open="isShowQueryConditions"
          :tab-status-btn-config="toolBarStatusBtnConfig"
          @onQueryConditionsClick="onQueryConditionsClick"
        /> -->
      </template>
      <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <!-- <BsQuery
            ref="queryFrom"
            :query-form-item-config="queryConfig"
            :query-form-data="searchDataList"
            @onSearchClick="search"
          /> -->
          <!-- <BsForm
            ref="queryFrom"
            :form-items-config="formSchemas"
            :form-data-list="formData.value"
            @itemChange="itemChange"
          /> -->
        </div>
      </template>
      <template v-slot:mainTree>
        <BsTreeSet
          ref="treeSet"
          v-model="showAside"
          :tree-config="setConfig"
          @onChangeInput="changeInput"
          @onAsideChange="asideChange"
        />
        <BsTree
          :queryparams="treeQueryparams"
          :config="treeConfig"
          :filter-text="filterText"
          :tree-data="treeData"
          @onNodeClick="onNodeClick"
        />
      </template>
      <template v-slot:mainForm>
        <!-- <BsTable
          ref="mainTableRef"
          :table-config="tableConfig"
          :table-global-config="tableGlobalConfig"
          :toolbar-config="toolbarConfig"
          :height="420"
          :pager-config="{}"
          :tree-config="treeConfigTable"
          :footer-config="footerConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div
                v-if="leftTreeVisible === false"
                class="table-toolbar-contro-leftvisible"
                @click="leftTreeVisible = true"
              ></div>
              <div class="table-toolbar-left-title">
                <span class="fn-inline">{{ menuName }}</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTable> -->
        <ReportView
          v-if="isShowReport"
          ref="reportViewRef"
          class="platfromreport"
          codes="354692d064e511eeb7ea51396d5e9d2f"
          :init-params="initParams"
          :is-custom-excel-link="true"
          @custom-excel-link="excelLinkHandle"
          @exportExcelByServiceBefore="exportExcelByServiceBefore"
          @exportExcelByServiceAfter="exportExcelByServiceAfter"
        />
      </template>
    </BsMainFormListLayout>
    <CheckPayBillModal
      v-if="showModal"
      ref="CheckPayBillModal"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { proconf } from './CheckPayBill.js'
import { getTreeData } from '@/api/frame/main/common'
import CheckPayBillModal from './CheckPayBillModal.vue'
export default {
  components: {
    CheckPayBillModal
  },
  data() {
    return {
      tableLoading: false,
      searchDataList: {},
      queryConfig: proconf.highQueryConfig,
      isShowQueryConditions: true,
      leftTreeVisible: true,
      // 头部工具栏 BsTabPanel config
      toolBarStatusBtnConfig: {
        changeBtns: true,
        buttons: proconf.toolBarStatusButtons,
        curButton: {
          type: 'button',
          iconName: 'base-all.png',
          iconNameActive: 'base-all-active.png',
          iconUrl: '',
          label: '全部',
          code: '1',
          curValue: '1'
        },
        buttonsInfo: proconf.statusRightToolBarButton,
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
        }
      },
      // 弹框
      showModal: false,
      // 左侧树
      showAside: false,
      setConfig: {},
      treeQueryparams: { elementCode: 'AGENCY' },
      treeConfig: {
        showFilter: false, // 是否显示过滤
        levelno: -1, // 可选层级
        valueKeys: ['code', 'name', 'id'],
        placeholder: '请选择',
        treeProps: {
          // 树配置选项
          labelFormat: '{code}-{name}', //  {code}-{name}
          nodeKey: 'id', // 树的主键
          label: 'name', // 树的显示lalel字段
          children: 'children' // 树的嵌套字段
        },
        axiosConfig: {
          rootName: '全部',
          successCode: '200', // 成功code
          statusField: 'rscode',
          method: 'get', // 请求方式
          url: ''
        },
        multiple: false, // 是否多选,
        clearable: true, // 可清除
        defaultExpandAll: true // 默认是否展开所有节点
      },
      filterText: '', // 树字段过滤
      treeData: [],

      // BsTable表格
      menuName: '转移支付资金上下级对账结果列表',
      tableConfig: {
        renderers: {
          // 修改 配置 下发 删除
          $customerRender: {
            renderDefault: (h, cellRender, { row, rowIndex }, context) => {
              let vnode = (
                <div>
                  <a
                    style="cursor: pointer"
                    onClick={() => this.handleRowClick(row)}
                  >
                    查看详情
                  </a>
                </div>
              )
              // {this.queryData.flowStatus === '2' ? <el-button type="primary" size="mini" onClick={() => this.withdraw(row)}>撤回</el-button> : ''}
              return [vnode]
            }
          }
        },
        globalConfig: {
          // 全局默认渲染列配置
          // 全局配置
          checkType: 'checkbox',
          seq: true
        }
      },
      tableGlobalConfig: {
        showOverflow: true
      },
      footerConfig: {
        showFooter: false
      },
      toolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
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
      treeConfigTable: {
        expandAll: true,
        indent: 10,
        accordion: false
      },
      tableColumnsConfig: proconf.tableColumnsConfig,
      tableData: [
        {
          name: 'test1',
          superDivision: '特定转移支付资金1',
          acceptDivision: '22',
          transferPayment: 'beijing',
          documentNumber: '111',
          documentMoney: '999',
          result: '比对失败',
          time: '9.27'
        },
        {
          name: 'test2',
          superDivision: '特定转移支付资金2',
          acceptDivision: '22',
          transferPayment: 'beijing',
          documentNumber: '111',
          documentMoney: '999',
          result: '比对成功',
          time: '9.27'
        },
        {
          name: 'test3',
          superDivision: '特定转移支付资金3',
          acceptDivision: '22',
          transferPayment: 'beijing',
          documentNumber: '111',
          documentMoney: '999',
          result: '比对成功',
          time: '9.27'
        }
      ],
      // datav表格数据
      searchObj: {},
      curDivCode: '',
      isShowReport: false
    }
  },
  computed: {
    paramsObj() {
      return {
        mofDivCode: this.curDivCode
      }
    }
  },
  created() {
    this.getMofDivTreeData()
  },
  methods: {
    async getMofDivTreeData() {
      const { year, province } = this.$store.state.userInfo
      const res = await getTreeData({ year: year, province: province })
      console.log(res)
      this.treeData = res?.data || []
    },
    asideChange() {
      // this.leftTreeVisible = false
    },
    onQueryConditionsClick() {
      this.isShowQueryConditions = !this.isShowQueryConditions
    },
    handleRowClick(row) {
      console.log('点击每行的方法', row)
      console.log(this.showModal, '111')
      this.showModal = !this.showModal
    },
    closeModal(value) {
      console.log(value, '222')
      this.showModal = false
    },
    changeInput(val) {
      this.filterText = val
    },
    // 点击树节点
    onNodeClick({ node, treeData }, $event, treeContext) {
      console.log(node, '-----')
      this.isShowReport = true
      this.curDivCode = node?.code
      this.$refs?.reportViewRef?.searchData()
    },
    // datav表格
    initParams(params) {
      return new Promise((resolve) => {
        console.log(this.paramsObj, '2222')
        let paramsTemp = { ...this.paramsObj }
        console.log('当前报表参数为：', paramsTemp)
        Object.keys(params).map((key) => {
          if (Object.hasOwnProperty.call(this.paramsObj, key)) {
            paramsTemp[key] = this.paramsObj[key]
          }
        })
        resolve(paramsTemp)
      })
    },
    setExportLoading() {
      this.$loading({
        lock: true,
        text: '报表数据导出中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    exportExcelByServiceBefore() {
      this.setExportLoading()
    },
    exportExcelByServiceAfter() {
      this.$loading().close()
    },
    exportCurrentExcel() {
      this.$refs.reportView.exportExcel() // 当前报表导出成Excel
    },
    exportCurrentPDF() {
      this.$refs.reportView.exportPDF() // 当前报表导出成PDF
    },
    // getInstance() {
    //   let self = this
    //   var Xsheet = window.bossJS.Xsheet
    //   return Xsheet.getInstance({
    //     config: {
    //       appId: self.$store.state.loginAuthentication.appguid || 'gov-aims'
    //     }
    //   })
    // },
    printPdf(options) {
      let instance = this.getInstance()
      let exportPages = instance.printingSheetRequest(options)
      let _this = this
      exportPages
        .done(function (data) {
          _this.$refs.reportview.batchPrintDone()
          console.log('print pdf success', data)
        })
        .fail(function (obj) {
          _this.$refs.reportview.batchPrintFail()
          console.log('print pdf error', obj)
        })
    },
    exportExcel(options) {
      let instance = this.getInstance()
      let exportPages = instance.printingSheetRequest(options)
      let _this = this
      exportPages
        .done(function (data) {
          _this.$refs.reportView.exportExcelDone()
          console.log('img print success', data)
        })
        .fail(function (obj) {
          _this.$refs.reportView.exportExcelFail()
          console.log('export excel error', obj)
        })
    },
    excelLinkHandle(payload) {
      console.log(payload, '---')
      this.showModal = !this.showModal
    }
  }
}
</script>

<style scoped>
/* ::v-deep .vxe-tools--wrapper {
  display: none;
} */
/* .T-search {
  background: none !important;
} */
/* .unit-tree-main.unit-tree-main-nodrop
  .selection-tree-nodrop
  .vxe-input-filter-tree {
  margin-bottom: 0px !important;
} */
/* .tree-set__content {
  display: none !important;
} */
.left-tree {
  height: 100%;
}
.left-tree-body {
  height: 100%;
}
</style>
