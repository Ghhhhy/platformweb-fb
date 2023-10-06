<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          show-zero
          :show-num="true"
          :is-open="isShowQueryConditions"
          :tab-status-btn-config="toolBarStatusBtnConfig"
          @onQueryConditionsClick="onQueryConditionsClick"
        />
      </template>
      <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="queryConfig"
            :query-form-data="searchDataList"
            @onSearchClick="search"
          />
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
          v-if="true"
          ref="reportView"
          class="platfromreport"
          codes="nmfxbb"
          :editable="editable"
          :init-params="initParams"
          :init-business-context="initBusinessContext"
          :enable-row-readable-authority="true"
          @export-excel="exportExcel"
          @print-pdf="printPdf"
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
      treeData: [
        {
          id: '1',
          code: '100',
          name: '山西省',
          label: '100-山西省',
          children: [
            {
              id: '11',
              code: '101',
              name: '太原',
              label: '101-太原'
            },
            {
              id: '12',
              code: '102',
              name: '大同',
              label: '102-大同'
            },
            {
              id: '13',
              code: '103',
              name: '运城',
              label: '103-运城'
            }
          ]
        }
      ],

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
      reportParams: {},
      editable: {},
      businessContext: {
        token: this.$store.getters.getLoginAuthentication.tokenid
      },
      ifRenderReport: true,
      code: 'nmfxbb',
      paramsObj: '',
      searchObj: {}
    }
  },
  methods: {
    asideChange() {
      this.leftTreeVisible = false
    },
    onQueryConditionsClick() {
      this.isShowQueryConditions = !this.isShowQueryConditions
    },
    search(val) {
      console.log(val)
    },
    handleRowClick(row) {
      console.log('点击每行的方法', row)
      console.log(this.showModal, '111')
      this.showModal = !this.showModal
      // this.fiRuleCode = row.fiRuleCode || ''
      // this.warningCode = row.warningCode || ''
      // this.dialogVisible = true
      // this.dialogTitle = '查看详情信息'
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
      this.$message({
        showClose: true,
        message: node.label,
        type: 'success'
      })
      console.log(node, treeData, $event, treeContext)
    },
    // datav表格
    // batchExportExcel(excelParams) {
    //   this.$refs.reportView.batchExportExcel(excelParams) // 选中报表批量导出成Excel
    // },
    // batchExportPDF(excelParams) {
    //   this.$refs.reportView.batchExportPDF(excelParams) // 选中报表批量导出成PDF
    // },
    // exportCurrentExcel() {
    //   this.$refs.reportView.exportExcel() // 当前报表导出成Excel
    // },
    // exportCurrentPDF() {
    //   this.$refs.reportView.exportPDF() // 当前报表导出成PDF
    // },
    // print() {
    //   this.$refs.reportView.print() // 打印当前报表
    // },
    // batchPrint(draftList) {
    //   this.$refs.reportView.batchPrint(draftList) // 打印当前报表
    // },
    // submit() {
    //   console.log(82, this.$refs.reportView.getExcelData())
    //   return this.$refs.reportView.getSubmitFillData() // 提交前调用报表插件的
    // },
    // getExcelData() {
    //   return this.$refs.reportView.getExcelData()
    // },
    // encodeExcelPassword(password) {
    //   return this.$refs.reportView.excelPasswordEncode(password)
    // },
    initParams(params) {
      return new Promise((resolve) => {
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
    // searchData() {
    //   this.$refs.report_view.searchData(this.paramsObj) // 查询当前报表数据
    // },
    // /**
    //  * @description: 报表参数变了，刷新报表数据
    //  * @param {*}
    //  * @return {*}
    //  */
    // refreshReport() {
    //   const { code, paramsObj } = this.reportParams
    //   this.code = code
    //   this.paramsObj = paramsObj
    //   // this.searchData()
    // },
    // parentCallSearch() {
    //   this.refreshReport()
    //   this.ifRenderReport = false
    //   this.$nextTick(() => {
    //     this.ifRenderReport = true
    //   })
    // },
    // /**
    //  * 若无权限控制，则插件中不需要绑定该方法
    //  * 设置业务上下文信息businessContext
    //  * 上下文信息会在数据获取时传递给应用后端进行权限控制 **/
    initBusinessContext() {
      return new Promise((resolve) => {
        resolve(this.businessContext)
      })
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
    }
    // getreportParams() {
    //   let paramsObj = {}
    //   const { code, city } = this.$store.getters.getMenuParams5
    //   // eslint-disable-next-line no-unused-vars
    //   let param = this.$store.getters.getMenuParams5.paramsObj
    //   if (param) {
    //     param = param.substr(1) // 删除第一个字符
    //     param = param.substr(0, param.length - 1) // 删除最后一字符
    //     let arr = param.split(',')
    //     arr.map((item, index) => {
    //       if (!item.split(':')[0]) {
    //         return
    //       }
    //       paramsObj[item.split(':')[0]] = item.split(':')[1]
    //     })
    //   }
    //   paramsObj['fiscal_year'] = this.$store.state.userInfo.year
    //   return {
    //     code,
    //     city,
    //     paramsObj
    //   }
    // }
  }
  // watch: {
  //   reportParams: {
  //     // 查询参数
  //     handler(newVal, oldVal) {
  //       console.log(!newVal.code, 50144)
  //       if (!newVal.code) {
  //         this.ifRenderReport = false
  //         return false
  //       }
  //       // if (newVal && oldVal && JSON.stringfy(newVal) === JSON.stringfy(oldVal)) {
  //       //   this.ifRenderReport = false
  //       //   return false
  //       // }{}
  //       if (this.isload) {
  //         this.refreshReport()
  //         // this.ifRenderReport = false
  //         this.$nextTick(() => {
  //           this.ifRenderReport = true
  //         })
  //       }
  //     },
  //     deep: true,
  //     immediate: true
  //   },
  //   editable: {
  //     handler(newVal, oldVal) {
  //       this.parentCallSearch()
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  // },
  // mounted() {
  //   window.bossJS.init && window.bossJS.init()
  // }
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
