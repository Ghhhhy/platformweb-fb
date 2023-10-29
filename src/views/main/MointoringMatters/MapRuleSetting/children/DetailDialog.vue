<template>
  <div>
    <vxe-modal
      v-model="detailDialogVisible"
      title="规则明细"
      @close="dialogClose"
    >
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
          <div>
            <!-- <div class="table-toolbar-left-title">
              <span class="fn-inline">{{ menuName }}</span>
              <i class="fn-inline"></i>
            </div> -->
            <vxe-button status="primary" @click="save">保存</vxe-button>
            <vxe-button status="primary" @click="addRow">增加行</vxe-button>
          </div>
        </template>
      </BsTable>
    </vxe-modal>
    <AddDetailDialog ref="addDetailDialog" />
  </div>
</template>

<script>
import AddDetailDialog from './AddDetailDialog.vue'
export default {
  comments: {
    AddDetailDialog
  },
  data() {
    return {
      detailDialogVisible: false,
      tableData: [
        {
          indicatorsTargetvalue: '213',
          indicatorsTargetvalueDesc: '没有描述',
          mapValueDes: 'dasd',
          mapValue: 'dasdasd'
        },
        {
          indicatorsTargetvalue: 'dasdasd',
          mapValueDes: 'dasdasdasd'
        }
      ],
      tableColumnsConfig: [
        {
          title: '目标值',
          field: 'indicatorsTargetvalue',
          align: 'center',
          slots: {
            default({ row }) {
              return [
                <div>
                  <el-input v-model={row.indicatorsTargetvalue}/>
                </div>
              ]
            }
          }
        },
        {
          title: '目标值描述',
          field: 'indicatorsTargetvalueDesc',
          align: 'center',
          slots: {
            default({ row }) {
              return [
                <div>
                  <el-input v-model={row.indicatorsTargetvalueDesc}/>
                </div>
              ]
            }
          }
        },
        {
          title: '映射值',
          field: 'mapValue',
          align: 'center',
          slots: {
            default({ row }) {
              return [
                <div>
                  <el-input v-model={row.mapValue}/>
                </div>
              ]
            }
          }
        },
        {
          title: '映射值描述',
          field: 'mapValueDes',
          align: 'center',
          slots: {
            default({ row }) {
              return [
                <div>
                  <el-input v-model={row.mapValueDes}/>
                </div>
              ]
            }
          }
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
          title: '更新人',
          field: 'updatePersonName',
          align: 'center'
        },
        {
          title: '更新时间',
          field: 'updateTime',
          align: 'center'
        },
        {
          title: '生效时间',
          field: 'validTime',
          align: 'center'
        },
        {
          title: '失效时间',
          field: 'noValidTime',
          align: 'center'
        }
      ],
      pagerConfig: {
        currentPage: 1,
        pageSize: 20,
        total: 0
      },
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        refresh: false, // 刷新
        moneyConversion: false, // 是否有金额转换
        import: false, // 导入
        export: false, // 导出
        print: false, // 打印
        zoom: false, // 缩放
        custom: false, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      }
    }
  },
  methods: {
    dialogClose() {
      this.detailDialogVisible = false
    },
    save() {},
    addRow() {
      console.log(123)
      this.$refs.addDetailDialog.dialogVisible = true
    }
  }
}
</script>

<style  scoped>
::v-deep .vxe-modal--box {
  width: 80%;
  height: 80%;
}
::v-deep .el-input__inner {
  border: 0;
  padding: 0;
  height: 25px;
}
</style>
