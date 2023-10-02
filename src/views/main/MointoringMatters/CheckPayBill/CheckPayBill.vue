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
          :tab-status-num-config="tabStatusNumConfig"
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
        <!-- <BsTreeSet
          ref="treeSetBottom"
          v-model="leftTreeVisible"
          :tree-config="setConfigBottom"
          @onAsideChange="asideChange"
          @onChangeInput="changeInputBottom"
        /> -->
        <BsTree
          :queryparams="treeQueryparams"
          :config="treeConfig"
          :filter-text="filterText"
          :tree-data="treeData"
          @onNodeClick="onNodeClick"
        />
        <!-- <BsTree
          ref="leftTree"
          open-loading
          :queryparams="treeQueryparamsBottom"
          :config="treeConfigBottom"
          :tree-data="treeData"
          @onNodeClick="onNodeClickBottom"
        /> -->
      </template>
      <template v-slot:mainForm>
        <BsTable
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
          @onOptionRowClick="onOptionRowClick"
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
        </BsTable>
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
      ]
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
