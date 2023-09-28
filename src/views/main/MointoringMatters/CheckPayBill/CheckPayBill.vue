<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:mainTree>
        <div class="left-tree">
          <div class="mmc-left-tree-title">
            <BsTreeSet
              ref="treeSetBottom"
              :tree-config="setConfigBottom"
              @onChangeInput="changeInputBottom"
            />
          </div>
          <div class="mmc-left-tree-body">
            <BsTree
              :queryparams="treeQueryparamsBottom"
              :config="treeConfigBottom"
              :filter-text="filterTextBottom"
              :tree-data="jigouTreeData"
              @onNodeClick="onNodeClickBottom"
            />
          </div>
        </div>
      </template>
      <template v-slot:mainForm>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="queryConfig"
            :query-form-data="searchDataList"
            @onSearchClick="search"
          />
          <BsTable
            ref="mainTableRef"
            :table-config="tableConfig"
            :table-global-config="tableGlobalConfig"
            :toolbar-config="toolbarConfig"
            :height="420"
            :pager-config="{}"
            :tree-config="treeConfig"
            :footer-config="footerConfig"
            :table-columns-config="tableColumnsConfig"
            :table-data="tableData"
            @onOptionRowClick="onOptionRowClick"
          >
            <template v-slot:toolbarSlots>
              <div class="table-toolbar-left">
                <div class="table-toolbar-left-title">
                  <span class="fn-inline">{{ menuName }}</span>
                  <i class="fn-inline"></i>
                </div>
              </div>
            </template>
          </BsTable>
        </div>
      </template>
    </BsMainFormListLayout>
  </div>
</template>

<script>
import { proconf } from './CheckPayBill.js'
export default {
  data() {
    return {
      tableLoading: false,
      setConfigBottom: {},
      searchDataList: {},
      queryConfig: proconf.highQueryConfig,
      isShowQueryConditions: true,
      leftTreeVisible: true,
      showAside: false,
      treeQueryparamsBottom: { elementCode: 'AGENCY' },
      treeConfigBottom: {
        showFilter: true, // 是否显示过滤
        levelno: -1, // 可选层级
        valueKeys: ['code', 'name', 'id'],
        placeholder: '请输入内容',
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
      filterTextBottom: '', // 树字段过滤
      jigouTreeData: [
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
      treeConfig: {
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
    search() {},
    onOptionRowClick({ row, optionType }, context) {
      switch (optionType) {
        case 'detail':
          console.log('操作按钮点击事件回调方式二', 'detail', row)
          break
        default:
      }
    },
    asideChange(val) {
      this.$message({
        showClose: true,
        message: val,
        type: 'success'
      })
    },
    changeInputTop(val) {
      this.filterTextTop = val
    },
    // 点击树节点
    onNodeClickTop({ node, treeData }, $event, treeContext) {
      this.$message({
        showClose: true,
        message: node.label,
        type: 'success'
      })
      console.log(node, treeData, $event, treeContext)
    },
    changeInputBottom(val) {
      this.filterTextBottom = val
    },
    // 点击树节点
    onNodeClickBottom({ node, treeData }, $event, treeContext) {
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
.T-search {
  background: none !important;
}
.unit-tree-main.unit-tree-main-nodrop
  .selection-tree-nodrop
  .vxe-input-filter-tree {
  margin-bottom: 0px !important;
}
.tree-set__content {
  display: none !important;
}
.left-tree {
  height: 100%;
  background-color: white !important;
}
.left-tree-body {
  height: 100%;
}
</style>
