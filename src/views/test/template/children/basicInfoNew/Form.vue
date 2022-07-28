<template>
  <div class="fmc-main">
    <div class="tool-bar">
      <BsToolBar
        v-model="leftVisible"
        top-tip
        :tab-status-btn-config="tabStatusBtnConfig"
        :tab-status-num-config="tabStatusNumConfig"
        :right-buttons="rightButtons"
        :is-hide="true"
        @onAsideChange="asideChange"
      />
    </div>
    <div class="basic-search-form">
      <div class="basic-search-form-main fn-inline">
        <BsForm
          :form-gloabal-config="formGloabalConfig"
          :form-items-config="queryFromItemConfig"
          :form-data-list="queryFromData"
        />
      </div>
      <div class="basic-search-btn-group fn-inline">
        <div class="bsbg-search bsbg-search-btn fn-inline">
          <vxe-button type="primary" @click="onBasicSearchBtn">查询</vxe-button>
        </div>
        <div class="bsbg-highSearch bsbg-search-btn fn-inline">
          <vxe-button @click="onHighSearchClick">高级查询</vxe-button>
        </div>
      </div>
      <div class="userSearch-option fn-inline"></div>
    </div>
    <div class="fmc-main-con" style="height:calc(100% - 100px)">
      <BsSplitPane
        :min-percent="0"
        :default-percent="leftVisible ? curSplitPaneLeftWidth : 0"
        split="vertical"
        @resize="onSplitPaneResize"
        @onAsideChange="asideChange"
      >
        <template slot="paneL">
          <div class="fmc-left-con w100 height-all relative" :class="leftVisible ? 'fmc-left-visible-btn' : 'fmc-left-hidden-btn'">
            <aside class="fmc-left w100 height-all">
              <div style="height:100% ">
                <div class="height-half">
                  <div class="fmc-title">
                    <span class="fn-inline">预算单位</span>
                  </div>
                  <div class="fmc-left-tree">
                    <BsBossTree
                      @clickmethod="onLeftNodeClick"
                      @afterloadmethod="onTreeLoaded"
                      @checkChange="onNodeCheckClick"
                    />
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
            <div class="fmc-left-visible-control fn-inline absolute">
              <div class="fn-inline height-all w1"></div>
              <div class="fn-inline fmcl-visible-control" @click="leftVisible = !leftVisible">
                <div class="fmcl-control-bg pointer">
                  <i class="fmcl-control-ico fn-inline">
                  </i>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template slot="paneR">
          <main class="fmc-right w100">
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
              :tree-config="{}"
              :pager-config="pagerConfig"
              :default-money-unit="1"
              @currentChange="currentChange"
              @editClosed="currentChange"
              @ajaxData="ajaxData"
            >
              <template v-slot:toolbar-custom-slot>
                <div class="toolbar-custom-box">
                  <div class="fn-inline checkbox">
                    <label class="fn-inline label">单选</label>
                    <span class="fn-inline">
                      <vxe-radio-group v-model="radioValue">
                        <vxe-radio label="1" content="选项A" />
                        <vxe-radio label="2" content="选项B" />
                      </vxe-radio-group>
                    </span>
                  </div>
                  <div class="fn-inline checkbox">
                    <label class="fn-inline label">选择</label>
                    <span class="fn-inline">
                      <vxe-checkbox-group v-model="checkedValue">
                        <vxe-checkbox label="1" content="HTML" />
                        <vxe-checkbox label="2" content="CSS" />
                      </vxe-checkbox-group>
                    </span>
                  </div>
                  <div class="fn-inline select">
                    <label class="fn-inline label">下拉选择</label>
                    <span class="fn-inline">
                      <vxe-select v-model="selectValue" placeholder="默认尺寸">
                        <vxe-option v-for="num in 15" :key="num" :value="num" :label="`选项${num}`" />
                      </vxe-select>
                    </span>
                  </div>
                </div>
              </template>
            </BsTable>
          </main>
        </template>
      </BsSplitPane>
    </div>

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
import {
  statusButtons,
  curStatusButton,
  tabStatusNumConfigDefault,
  rbuttonsGroup
} from './config/config'
console.log(rbuttonsGroup)
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
      formGloabalConfig: {
        span: 8,
        align: 'left',
        size: 'medium',
        titleAlign: 'right',
        titleWidth: 200,
        titleColon: false,
        preventSubmit: false,
        loading: false,
        validConfig: {
          autoPos: true
        }
      },
      queryFromItemConfig: [
        {
          title: '预算单位',
          field: 'agency_',
          titleWidth: '100',
          span: 6,
          itemRender: {
            name: '$formTreeInput',
            props: {
              reloaddata: false,
              isServer: true,
              ajaxType: 'post',
              serverUri: 'plan-service/v2/elementtree',
              queryparams: {
                elementCode: 'AGENCY'
              }
            }
          }
        },
        {
          title: '功能分类',
          field: 'exp_func_',
          titleWidth: '100',
          span: 6,
          itemRender: {
            name: '$formTreeInput',
            props: {
              reloaddata: false,
              isServer: true,
              ajaxType: 'post',
              serverUri: 'plan-service/v2/elementtree',
              queryparams: {
                elementCode: 'EXP_FUNC'
              }
            }
          }
        },
        {
          title: '资金性质',
          field: 'fund_type_',
          titleWidth: '100',
          span: 6,
          itemRender: {
            name: '$formTreeInput',
            props: {
              reloaddata: false,
              isServer: true,
              ajaxType: 'post',
              serverUri: 'plan-service/v2/elementtree',
              queryparams: {
                elementCode: 'FUND_TYPE'
              }
            }
          }
        },
        {
          title: '政府经济分类',
          field: 'gov_bgt_type',
          titleWidth: '100',
          span: 6,
          itemRender: {
            name: '$vxeFormSelect',
            options: [
              {
                value: '001',
                label: '一次性项目'
              },
              {
                value: '002',
                label: '经常性项目'
              },
              {
                value: '003',
                label: '阶段性项目'
              }
            ]
          }
        }
      ],
      queryFromData: {
        fund_type_: '',
        gov_bgt_type: '',
        agency_: '',
        exp_func_: ''
      },
      selectValue: '',
      checkedValue: '',
      transferVisible: true,
      leftVisible: true,
      curSplitPaneLeftWidth: 20,
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
      modelData: {},
      queryParams: {},
      tabStatusBtnConfig: {
        changeBtns: true,
        limit: 7,
        buttons: statusButtons,
        curButton: curStatusButton,
        buttonsInfo: rbuttonsGroup,
        methods: {
          bsToolbarClickEvent: this.bsToolbarClickEvent
        }
      },
      tabStatusNumConfig: { ...tabStatusNumConfigDefault },
      rightButtons: [],
      rbtnGroup: { ...rbuttonsGroup }
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
    onSplitPaneResize(leftWidth) {
      if (leftWidth > 1) {
        this.curSplitPaneLeftWidth = leftWidth
        this.leftVisible = true
      } else {
        this.leftVisible = false
      }
    },
    asideChange(isClose) {
      // 折叠按钮事件回调处理，方式一
      this.leftVisible = isClose
    },
    // 按钮触发后，第二种回调方式
    bsToolbarClickEvent(obj, $this) {
      console.log(
        55,
        '回调方式二',
        obj,
        $this.$options,
        '状态按钮当前为：' + $this.$data.curTabSelect.label
      )
    },
    onBasicSearchBtn() {},
    onHighSearchClick() {},
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
      this.$http.post('url', this.queryParams).then((res) => {
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
    onNodeCheckClick(obj, isChecked, ischildChecked) {},
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
    currentChange(
      { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event },
      bsTable,
      xgrid
    ) {
      // 关闭编辑事件
    },
    getTableData() {
      let self = this
      self.$refs.bsTableRef.getTableData()
    },
    saveData() {
      this.$refs.bsTableRef
        .validate()
        .then(() => {
          // 校验成功
        })
        .catch((e) => {
          // 失败
        })
    },
    transformMoneyByUnit(
      data,
      conlums,
      type = 'big',
      unit,
      rendererList = ['$moneyRender']
    ) {
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
        let itemRender =
          conlum.cellRender || conlum.editRender || conlum.contentRender
        if (
          itemRender &&
          rendererList.indexOf(itemRender.name) >= 0 &&
          !conlum.children
        ) {
          if (type === 'big') {
            row[conlum.field] = (parseFloat(row[conlum.field]) / unit).toFixed(
              2
            )
          } else {
            row[conlum.field] = (parseFloat(row[conlum.field]) * unit).toFixed(
              2
            )
          }
        }
        if (Array.isArray(conlum.children) && conlum.children.length) {
          self.transformRowMoneyByUnit(
            row,
            conlum.children,
            type,
            unit,
            rendererList
          )
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
    loadContentMethod({ row, rowIndex, $rowIndex }) {
      console.log('1234')
      // let self = this
      return new Promise((resolve) => {
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
            {
              time: '2020-01-20',
              income: 14000,
              tax: 200,
              bonus: 1000,
              profit: '',
              deduction: ''
            },
            {
              time: '2020-02-20',
              income: 14000,
              tax: 200,
              bonus: 1000,
              profit: '',
              deduction: ''
            },
            {
              time: '2020-03-20',
              income: 14000,
              tax: 200,
              bonus: 1000,
              profit: '',
              deduction: ''
            },
            {
              time: '2020-04-20',
              income: 14000,
              tax: 200,
              bonus: 6000,
              profit: '',
              deduction: ''
            },
            {
              time: '2020-05-20',
              income: 16000,
              tax: 210,
              bonus: 2000,
              profit: '',
              deduction: ''
            },
            {
              time: '2020-06-20',
              income: 16000,
              tax: 210,
              bonus: 2000,
              profit: '',
              deduction: ''
            }
          ]
          row.childCols = childCols
          row.childData = childData
          resolve()
        }, 500)
      })
    }
  },
  mounted() {
    let self = this
    setTimeout(() => {
      this.tableColumnsConfig[1].children[2].editRender.options = [{ label: 'girl', value: 0 }, { label: 'boy', value: 1 }]
      self.$refs.bsTableRef.reloadTableConlums(this.tableColumnsConfig)
      // self.$refs.bsTableRef.copySelectionRowData()
    }, 10000)
  },
  watch: {
    xhDialogVisible: {
      handler(newval) {},
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
