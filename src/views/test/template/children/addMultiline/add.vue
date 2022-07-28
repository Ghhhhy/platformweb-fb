<template>
  <div class="multi-add">
    <vxe-modal
      id="multiAdd"
      v-model="visible"
      width="1200"
      height="650"
      min-width="800"
      min-height="400"
      resize
      destroy-on-close
      transfer
    >
      <template v-slot:title>
        辅助核算项录入
      </template>
      <template>
        <div class="multi-add__content">
          <div class="desc-top">
            <p class="subject__class">
              会计科目: {{ subject }}
            </p>
            <p></p>
            <p class="pay-money__class">
              <span>
                借贷方向：
                <vxe-radio v-model="payDirector" name="pay" label="1" content="借" />
                <vxe-radio v-model="payDirector" name="pay" label="2" content="贷" />
              </span>
              <span class="money">
                合计金额：
                <vxe-input v-model="totalMoney" disabled />
              </span>

            </p>
          </div>
          <div class="table-one">
            <BsTable
              ref="bsTableRefEdit"
              :table-columns-config="tableColumnsConfigEdit"
              :table-data="tableDataEdit"
              :edit-config="editConfig"
              :edit-rules="editRulesEdit"
              :table-config="tableConfigEdit"
              :toolbar-config="false"
              :pager-config="false"
              :height="120"
            />
          </div>
          <div class="table-two">
            <div class="table-two__title">
              辅助核算项列表
            </div>
            <BsTable
              ref="bsTable"
              :table-columns-config="tableColumnsConfig"
              :table-data="tableData"
              :table-config="tableConfig"
              :edit-config="false"
              :toolbar-config="false"
              :pager-config="false"
              :height="270"
            />
          </div>
          <div class="multi-add__footer">
            <vxe-button content="确定" status="primary" @click="confirmData" />
            <vxe-button content="取消" @click="closeDialog" />
          </div>
        </div>
      </template>
      <!-- <template v-slot:footer>
        <div class="multi-add__footer">
          <vxe-button content="确定" status="primary" @click="confirmData" />
          <vxe-button content="取消" @click="closeDialog" />
        </div>
      </template> -->
    </vxe-modal>
  </div>
</template>

<script>
import { extend } from '@/utils'
import getFormConfData from './config/formConf'
const defaultTableDataEdit = getFormConfData('addmodeTop', 'tableData')
export default {
  name: 'MultiAdd',
  props: {
    value: {
      type: Boolean
    }
  },
  data() {
    return {
      visible: this.value,
      subject: '5001一般公共预算本级支出',
      payDirector: '2',
      totalMoney: '0.00',
      editConfig: {
        trigger: 'dblclick',
        mode: 'cell',
        showStatus: false
      },
      tableColumnsConfigEdit: getFormConfData('addmodeTop', 'tableColumnsConfig'),
      tableDataEdit: extend(true, [], defaultTableDataEdit),
      editRulesEdit: getFormConfData('addmodeTop', 'editRules'),
      tableConfigEdit: getFormConfData('addmodeTop', 'tableConfig'),
      tableColumnsConfig: getFormConfData('addmodeBottom', 'tableColumnsConfig'),
      tableData: getFormConfData('addmodeBottom', 'tableData'),
      tableConfig: getFormConfData('addmodeBottom', 'tableConfig')
    }
  },
  methods: {
    // 关闭获取取消
    closeDialog() {
      this.visible = false
      // 关闭时，要重置数据，模态框再打开时才不会有留痕
      this.resetData()
    },

    // 确定
    confirmData() {
      const tableData = this.$refs.bsTable.getListData()
      this.$emit('onConfrimData', {
        data: tableData,
        totalMoney: this.totalMoney,
        payDirector: this.payDirector
      })
      this.closeDialog()
    },

    resetData() {
      this.tableDataEdit = extend(true, [], defaultTableDataEdit)
      this.tableData = []
      this.totalMoney = '0.00'
      this.payDirector = '2'
    },

    // 总金额计算
    calcMoney() {
      let data = this.$refs.bsTable.getListData()
      let totalMoney = 0
      data.map((item) => {
        totalMoney += Number(item.money || 0)
      })

      this.totalMoney = totalMoney.toFixed(2)
    },

    // 删除行
    deleteRow() {
      this.$refs.bsTable.deleteRowData()
      console.log(this.$refs.bsTable.getListData())
      this.calcMoney()
    },

    // 显示详情
    showDetail() {
      this.$message('显示详情')
    },

    // 添加行
    addRow(newRow) {
      this.$refs.bsTableRefEdit.validate().then((res) => {
        this.$refs.bsTable.insertRowData(
          { data: newRow }
        )
        this.calcMoney()
        this.tableDataEdit = extend(true, [], defaultTableDataEdit)
      }).catch(err => {
        this.$message.error('请检查您的编辑数据')
        console.log(err)
      })
    }

  },
  created() {

  },
  mounted() {
  },
  watch: {
    value(val) {
      this.visible = val
    },
    visible() {
      this.$emit('input', this.visible)
    },
    payDirector(val) {
      console.log(val)
    }
  }
}
</script>

<style scoped lang="scss">
  .multi-add__content{
    .desc-top{
      width: 100%;
      .subject__class{
        margin-bottom: 8px;
      }
      .pay-money__class{
        margin-bottom: 15px;
      }
      .money{
        margin-left:50px;
      }
    }

    .table-one{
      width: 100%;
    }

    .table-two{
      padding-top:25px;
      .table-two__title{
        height: 30px;
        font-size: 1.1em;
        font-weight: 500;
      }
    }

    .multi-add__footer{
      height: 40px;
      width: 100%;
      text-align: right;
      margin-top: 20px;
    }
  }
</style>
