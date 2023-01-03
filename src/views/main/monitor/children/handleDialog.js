// import store from '@/store/index'
import store from '@/store'

export let proconf = {
  // table 操作按钮
  gloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      // const main = self.$parent.$parent.$parent.$parent
      // let status = main._data.toolBarStatusSelect.curValue
      return [
        <el-tooltip content="附件" placement="top" effect="light">
          <a class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment' })}>附件</a>,
        </el-tooltip>
      ]
    }
  },
  // 处理
  handletableColumnsConfig: [
    {
      title: '规则名称',
      field: 'regulationName',
      sortable: false,
      align: 'left'
    },
    {
      'title': '预警级别',
      'field': 'warningLevel',
      'align': 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': store.state.warnInfo.warnLevelOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      'title': '处理方式',
      'field': 'handleType',
      'align': 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': store.state.warnInfo.warnControlTypeOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    }
  ],
  incomeMsgConfig: [
    // {
    //   field: 'warningCode',
    //   title: '监控数据编码',
    //   titleWidth: '180',
    //   span: 8,
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { placeholder: '监控数据编码', disabled: true }
    //   }
    // },
    // {
    //   field: 'payApplyNumber',
    //   title: '支付申请编号',
    //   titleWidth: '180',
    //   span: 8,
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { placeholder: '支付申请编号', disabled: true }
    //   }
    // },
    // {
    //   field: 'agencyName',
    //   title: '预算单位',
    //   titleWidth: '180',
    //   span: 8,
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { placeholder: '预算单位', disabled: true }
    //   }
    // },
    {
      // field: 'targetDocNum',
      field: 'corBgtDocNo',
      title: '指标文号',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '指标文号', disabled: true }
      }
    },
    {
      // title: '预算项目',
      // field: 'projectName',
      title: '指标文标题',
      field: 'bgtDocTitle',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '指标文标题' } }
    },
    {
      title: '指标说明',
      field: 'bgtDec',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '指标说明' }
      }
    },
    {
      title: '项目代码',
      field: 'proCode',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '项目代码' }
      }
    },
    {
      title: '项目名称',
      field: 'proName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '项目名称' }
      }
    },
    {
      title: '指标来源',
      field: 'sourceTypeName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '指标来源' }
      }
    },
    {
      title: '资金性质名称',
      field: 'fundTypeName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金性质' }
      }
    },
    {
      title: '资金支出名称',
      field: 'expFuncName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金支出名称' }
      }
    },
    {
      title: '政府支出经济分类科目名称',
      field: 'govBgtEcoName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '政府支出经济分类科目名称' }
      }
    }
    // {
    //   field: 'paymentAmount',
    //   title: '支付金额',
    //   titleWidth: '180',
    //   span: 8,
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '支付金额' }
    //   }
    // },
    // {
    //   title: '资金用途',
    //   field: 'useOfFunds',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '资金用途' }
    //   }
    // },
    // {
    //   title: '政府经济分类',
    //   field: 'govEconomyType',
    //   titleWidth: '180',
    //   span: 8,
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '政府经济分类' }
    //   }
    // },
    // {
    //   title: '部门经济分类',
    //   field: 'deptEconomyType',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '部门经济分类' }
    //   }
    // },
    // {
    //   title: '资金性质',
    //   field: 'natureOfFunds',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '资金性质' }
    //   }
    // },
    // {
    //   title: '功能分类',
    //   field: 'funcType',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '功能分类' }
    //   }
    // },
    // {
    //   title: '支付方式',
    //   field: 'paymentMethod',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '支付方式' }
    //   }
    // },
    // {
    //   title: '结算方式',
    //   field: 'settlementMethod',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '结算方式' }
    //   }
    // },
    // {
    //   title: '业务处室',
    //   field: 'businessOffice',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '业务处室' }
    //   }
    // },
    // {
    //   title: '工资标识',
    //   field: 'salaryMark',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '工资标识' }
    //   }
    // },
    // {
    //   title: '是否工会经费',
    //   field: 'isUnionFunds',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '是否工会经费' }
    //   }
    // },
    // {
    //   title: '三公经费',
    //   field: 'isThrExp',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '三公经费' }
    //   }
    // },
    // {
    //   title: '直达资金标识',
    //   field: 'directFund',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { disabled: true, placeholder: '直达资金标识' }
    //   }
    // },
    // {
    //   title: '监控时间',
    //   field: 'fiDate',
    //   span: 8,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: { type: 'datetime', disabled: true, placeholder: '监控时间' }
    //   }
    // }
  ],
  incomeMsgData: {
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
    proCode: '',
    deptEconomyType: '',
    natureOfFunds: '',
    funcType: '',
    paymentMethod: '',
    proName: '',
    businessOffice: '',
    expFuncName: '',
    isUnionFunds: '',
    isThrExp: '',
    sourceTypeName: '',
    createTime: '',
    corBgtDocNo: '',
    bgtDocTitle: '',
    bgtDec: '',
    fundTypeName: '',
    govBgtEcoName: '',
    fiDate: ''
  }
}
