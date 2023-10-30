<template>
  <div>
    <vxe-modal
      v-model="showDialogVisible"
      v-loading="tableLoading"
      title="详情信息"
      width="96%"
      height="90%"
      @close="dialogClose"
    >
      <div
        style="
          color: #40aaff;
          margin-bottom: 5px;
          font-size: 16px;
          font-weight: bold;
        "
      >
        规则信息
      </div>
      <BsTable
        ref="handleTableRef"
        height="200px"
        :table-columns-config="handletableColumnsConfig"
        :table-data="handletableData"
        :table-config="handletableConfig"
        :toolbar-config="false"
        :pager-config="false"
        @cellClick="cellClick"
      />
      <div>
        <div
          style="
            color: #40aaff;
            margin-bottom: 5px;
            font-size: 16px;
            font-weight: bold;
          "
        >
          明细信息 >
        </div>
        <BsForm
          ref="incomeMsgRef"
          :form-items-config="msgConfig"
          :form-data-list="msgData"
        />
      </div>
    </vxe-modal>
  </div>
</template>

<script>
import HttpModule from '@/api/frame/main/fundMonitoring/createProcessing.js'
export default {
  props: {
    dataitem: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      tableLoading: false,
      showDialogVisible: true,
      handletableColumnsConfig: [
        {
          title: '规则名称',
          field: 'regulationName',
          sortable: false,
          align: 'left'
          // cellRender: {
          //   name: '$vxeTableHref'
          // }
        },
        {
          title: '预警级别',
          field: 'warningLevel',
          align: 'center',
          cellRender: {
            name: '$vxeSelect',
            options: this.$store.state.warnInfo.warnLevelOptions.map((item) => {
              return {
                value: item.warnLevel,
                label: item.warnName
              }
            }),
            defaultValue: '',
            props: {}
          },
          sortable: 'true',
          name: '$vxeSelect'
        },
        {
          title: '处理方式',
          field: 'handleType',
          align: 'center',
          cellRender: {
            name: '$vxeSelect',
            options: [
              {
                value: 1,
                label: '拦截'
              },
              {
                value: 2,
                label: '预警，需上传附件'
              },
              {
                value: 3,
                label: '预警，无需上传附件'
              },
              {
                value: 4,
                label: '提醒'
              },
              {
                value: 5,
                label: '记录'
              }
            ],
            defaultValue: '',
            props: {}
          },
          sortable: 'true',
          // filters: false,
          name: '$vxeSelect'
        }
      ],
      handletableData: [],
      handletableConfig: {},
      // form
      msgConfig: [
        {
          field: 'warningCode',
          title: '监控数据编码',
          titleWidth: '180',
          span: 8,
          itemRender: {
            name: '$vxeInput',
            props: { placeholder: '监控数据编码', disabled: true }
          }
        },
        {
          field: 'payAppNo',
          title: '支付申请编号',
          titleWidth: '180',
          span: 8,
          itemRender: {
            name: '$vxeInput',
            props: { placeholder: '支付申请编号', disabled: true }
          }
        },
        {
          title: '预算单位名称',
          span: 8,
          titleWidth: '180',
          field: 'agencyName',
          sortable: false,
          filters: false,
          align: 'center',
          itemRender: {
            name: '$vxeInput',
            props: { placeholder: '预算单位名称', disabled: true }
          }
        },
        {
          field: 'corBgtDocNoName',
          title: '指标文号',
          titleWidth: '180',
          span: 8,
          itemRender: {
            name: '$vxeInput',
            props: { placeholder: '指标文号', disabled: true }
          }
        },
        {
          title: '预算项目',
          field: 'proName',
          span: 8,
          titleWidth: '180',
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '预算项目' }
          },
          tooltipFormat: '{proCode}-{proName}',
          formatter({ row }) {
            if (row.proCode && row.proName) {
              return `${row.proCode}-${row.proName}`
            }
            return `${row.proName}`
          },
          exportFormatter: true
        },
        {
          title: '收支类别',
          field: 'proCatName',
          span: 8,
          titleWidth: '180',
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '收支类别' }
          }
        },
        {
          title: '付款人',
          field: 'payAcctName',
          span: 8,
          titleWidth: '180',
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '付款人' }
          }
        },
        {
          title: '付款人账号',
          field: 'payAcctNo',
          span: 8,
          titleWidth: '180',
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '付款人账号' }
          }
        },
        {
          title: '付款银行',
          field: 'payAcctBankName',
          span: 8,
          titleWidth: '180',
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '付款银行' }
          }
        },
        {
          title: '收款人',
          field: 'payeeAcctName',
          span: 8,
          titleWidth: '180',
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '收款人' }
          }
        },
        {
          title: '收款人账号',
          field: 'payeeAcctNo',
          span: 8,
          titleWidth: '180',
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '收款人账号' }
          }
        },
        {
          title: '收款银行',
          field: 'payeeAcctBankName',
          span: 8,
          titleWidth: '180',
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '收款银行' }
          }
        },
        {
          field: 'payAppAmt',
          title: '支付金额',
          titleWidth: '180',
          span: 8,
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '支付金额' }
          }
        },
        {
          title: '资金用途',
          field: 'useDes',
          span: 8,
          titleWidth: '180',
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '资金用途' }
          }
        },
        {
          title: '政府经济分类',
          field: 'govEconomyType',
          titleWidth: '180',
          span: 8,
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '政府经济分类' }
          }
        },
        {
          title: '部门经济分类',
          field: 'deptEconomyType',
          span: 8,
          titleWidth: '180',
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '部门经济分类' }
          }
        },
        {
          title: '资金性质',
          field: 'natureOfFunds',
          span: 8,
          titleWidth: '180',
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '资金性质' }
          }
        },
        {
          title: '功能分类',
          field: 'funcType',
          span: 8,
          titleWidth: '180',
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '功能分类' }
          }
        },
        {
          title: '支付方式',
          field: 'paymentMethod',
          span: 8,
          titleWidth: '180',
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '支付方式' }
          }
        },
        {
          title: '结算方式',
          field: 'settlementMethod',
          span: 8,
          titleWidth: '180',
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '结算方式' }
          }
        },
        {
          title: '业务处室',
          field: 'businessOffice',
          span: 8,
          titleWidth: '180',
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '业务处室' }
          }
        },
        {
          title: '工资标识',
          field: 'salaryMark',
          span: 8,
          titleWidth: '180',
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '工资标识' }
          }
        },
        {
          title: '直达资金标识',
          field: 'directFund',
          span: 8,
          titleWidth: '180',
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '直达资金标识' }
          }
        },
        {
          title: '监控时间',
          field: 'fiDate',
          span: 8,
          titleWidth: '180',
          itemRender: {
            name: '$vxeInput',
            props: { type: 'datetime', disabled: true, placeholder: '监控时间' }
          }
        },
        {
          title: '业务类型',
          field: 'payBusType',
          span: 8,
          titleWidth: '180',
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '业务类型' }
          }
        },
        {
          title: '当前岗',
          field: 'todoName',
          span: 8,
          titleWidth: '180',
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '当前岗' }
          }
        },
        {
          title: '是否作废',
          field: 'voidOrNot',
          span: 8,
          titleWidth: '180',
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '是否作废' }
          }
        },
        {
          title: '追踪项目',
          field: 'trackProName',
          span: 8,
          titleWidth: '180',
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '追踪项目' }
          }
        },
        {
          title: '支付日期',
          field: 'xpayDate',
          span: 8,
          titleWidth: '180',
          itemRender: {
            name: '$vxeInput',
            props: { disabled: true, placeholder: '支付日期' }
          }
        }
      ],
      msgData: {
        warningCode: '',
        payApplyNumber: '',
        agencyName: '',
        targetDocNum: '',
        projectName: '',
        projectTypeName: '',
        payer: '',
        payAccount: '',
        payBankName: '',
        payee: '',
        receiveAccount: '',
        receiveBankName: '',
        paymentAmount: '',
        useOfFunds: '',
        govEconomyType: '',
        deptEconomyType: '',
        natureOfFunds: '',
        funcType: '',
        paymentMethod: '',
        settlementMethod: '',
        businessOffice: '',
        salaryMark: '',
        isUnionFunds: '',
        isThrExp: '',
        directFund: '',
        createTime: '',
        fiDate: '',
        payBusType: '',
        todoName: '',
        voidOrNot: '',
        trackProName: '',
        xpayDate: ''
      }
    }
  },
  created() {
    console.log(this.dataitem)
    this.tableLoading = true
    const code = this.dataitem.warningCode + '/' + this.dataitem.fiRuleCode
    HttpModule.budgetgetDetail(code).then(res => {
      if (res.code === '000000') {
        this.handletableData = res.data.regulationList
        this.msgData = res.data.executeData
      }
    }).finally(() => {
      this.tableLoading = false
    })
  },
  methods: {
    dialogClose() {
      this.showDialogVisible = false
      this.$emit('close')
    },
    cellClick() {}
  }
}
</script>

<style scoped>
::v-deep .Titans-table {
  height: auto !important;
}
</style>
