<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout>
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
            @onSearchResetClick="onSearchResetClick"
          />
        </div>
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="mainTableRef"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :pager-config="pagerConfig"
          :toolbar-config="tableToolbarConfig"
          @onToolbarBtnClick="onToolbarBtnClick"
          @ajaxData="ajaxTableData"
          @cellClick="cellClick"
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
      </template>
    </BsMainFormListLayout>
    <AddDialog ref="addDialog" />
    <DetailDialog ref="detailDialog" />
  </div>
</template>

<script>
import { proconf } from './MapRuleSetting'
import AddDialog from './children/AddDialog.vue'
import DetailDialog from './children/DetailDialog.vue'
export default {
  components: {
    AddDialog,
    DetailDialog
  },
  data() {
    return {
      tableLoading: false,
      // topTabPane
      isShowQueryConditions: true,
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
      tabStatusNumConfig: {
        1: 10
      },
      // query
      queryConfig: proconf.highQueryConfig,
      searchDataList: {},
      // table
      tableColumnsConfig: [
        {
          title: '规则编码',
          field: 'fiRuleCode',
          align: 'center'
        },
        {
          title: '规则描述',
          field: 'ruleDes',
          align: 'center'
        },
        {
          title: '备注',
          field: 'remark',
          align: 'center'
        },
        {
          title: '创建人',
          field: 'createPersonName',
          align: 'center'
        },
        {
          title: '创建时间',
          field: 'createTime',
          align: 'center'
        },
        {
          title: '最后更新时间',
          field: 'updateTime',
          align: 'center'
        },
        {
          title: '启用',
          field: 'isEnabled',
          align: 'center',
          slots: {
            default({ row }) {
              const changeBtns = (isEnabled) => {
                console.log(isEnabled)
              }
              return [
                <div>
                  <el-switch v-model={row.isEnabled} onChange={() => { changeBtns(row.isEnabled) }}/>
                </div>
              ]
            }
          }
        }
      ],
      tableData: [
        {
          fiRuleCode: '124412',
          ruleDes: '模拟规则描述',
          remark: 'sdad',
          createPersonName: '张三',
          createTime: '2023',
          updateTime: '2023',
          isEnabled: true
        },
        {
          fiRuleCode: '124412',
          ruleDes: '模拟规则描述',
          remark: 'sdad',
          createPersonName: '张三',
          createTime: '2023',
          updateTime: '2023',
          isEnabled: false
        }
      ],
      menuName: '映射规则设置',
      pagerConfig: {
        currentPage: 1,
        pageSize: 20,
        total: 0
      },
      tableToolbarConfig: {
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
      }
    }
  },
  // computed: {
  //   isEnabledArr() {
  //     return this.tableData.map((item) => item.isEnabled)
  //   }
  // },
  // watch: {
  //   // tableData(oldVal, newVal) {
  //   //   console.log('当前值为', `${oldVal}`, '之前值为', `${newVal}`)
  //   // }
  //   isEnabledArr: {
  //     deep: true,
  //     immediate: true,
  //     handler: function (oldVal, newVal) {
  //       console.log('当前值为', `${oldVal}`, '之前值为', `${newVal}`)
  //     }
  //   }
  // },
  methods: {
    onSearchResetClick() {},
    search() {
      console.log('search')
    },
    ajaxTableData() {},
    cellClick() {},
    onToolbarBtnClick({ context, table, code }) {
      switch (code) {
        // 刷新
        case 'refresh':
          this.refresh()
          break
      }
    },
    onStatusTabClick(obj) {
      console.log(obj)
      switch (obj.code) {
        case 'add':
          this.$refs.addDialog.dialogVisible = true
          break
        case 'modify':
          break
        case 'ruleDetail':
          var selectionRow = this.$refs.mainTableRef.selection
          if (selectionRow.length !== 1) {
            this.$message.warning('请选择一条任务查看明细')
            return
          }
          var Ids = []
          console.log(selectionRow, '行数据')
          selectionRow.forEach(function (item, index) {
            Ids.push(item.id)
          })
          this.checkDetail(Ids)
          break
      }
    },
    checkDetail(Ids) {
      this.$refs.detailDialog.detailDialogVisible = true
    },
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
    }
  }
}
</script>

<style scoped>
</style>
