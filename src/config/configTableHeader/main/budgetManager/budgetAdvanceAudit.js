// 预拨核销审核
const columns = [
  {
    title: '指标文号',
    field: 'cor_bgt_doc_no',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '调整文号',
    field: 'adj_doc_no_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '资金管理处室',
    field: 'bgt_mof_dep_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    },
    formatter: (value, column) => {
      if (value && value['row'] && value['row']['bgt_mof_dep_code']) {
        return value['row']['bgt_mof_dep_code'] + ' - ' + value['row']['bgt_mof_dep_name']
      }
      return ''
    }
  },
  {
    title: '业务主管处室',
    field: 'manage_mof_dep_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    },
    formatter: (value, column) => {
      if (value && value['row'] && value['row']['manage_mof_dep_code']) {
        return value['row']['manage_mof_dep_code'] + ' - ' + value['row']['manage_mof_dep_name']
      }
      return ''
    }
  },
  {
    title: '支出项目',
    field: 'pro_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '预算单位',
    field: 'agency',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    },
    formatter: (value, column) => {
      if (value && value['row'] && value['row']['agency_code']) {
        return value['row']['agency_code'] + ' - ' + value['row']['agency_name']
      }
      return ''
    }
  },
  {
    title: '指标类型',
    field: 'bgt_type_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '指标金额',
    field: 'amount',
    width: '150',
    align: 'right',
    cellRender: {
      name: '$moneyRender'
    },
    type: 'number',
    combinedType: ['average', 'subTotal', 'total', 'totalAll']
  },
  {
    title: '支付方式',
    field: 'pay_type_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '政采标识',
    field: 'is_gov_pur_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '三公经费',
    field: 'thr_exp_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '资金性质',
    field: 'fund_type_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '指标来源',
    field: 'source_type_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '指标来源类型',
    field: 'bgt_source_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '功能分类',
    field: 'exp_func_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input',
      props: {
        type: 'treeinput'
      }
    }
  },
  {
    title: '政府预算经济科目分类',
    field: 'gov_bgt_eco_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input',
      props: {
        type: 'treeinput'
      }
    }
  },
  {
    title: '指标摘要',
    field: 'bgt_rem_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '预算级次',
    field: 'budget_level_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '资金来源',
    field: 'found_type_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '工资标识',
    field: 'is_sal_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '是否扶贫',
    field: 'is_alle_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '是否工会经费',
    field: 'is_fun_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '直达资金标识',
    field: 'is_dir_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '是否补贴到人到企业',
    field: 'is_sub_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '是否直达资金的配套',
    field: 'is_mat_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    field: 'dept_name',
    title: '主管部门',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '收支类型',
    field: 'pro_cat_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '账户类别',
    field: 'acc_type_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '操作',
    field: 'gloableOptionRow',
    className: 'gloableOptionRow',
    align: 'center',
    fixed: 'right',
    sortable: false,
    filters: false,
    width: 140,
    cellRender: {
      name: '$gloableOptionRow'
    }
  }
]

const statusButtons = [
  {
    type: 'button',
    iconName: 'base-daiban.png',
    iconNameActive: 'base-daiban-active.png',
    label: '待审核',
    code: '1'
  },
  {
    type: 'button',
    iconName: 'base-yiban.png',
    iconNameActive: 'base-yiban-active.png',
    label: '已审核',
    code: '2'
  },
  {
    type: 'button',
    iconName: 'base-yiban.png',
    iconNameActive: 'base-yiban-active.png',
    label: '全部',
    code: '3'
  }
]

const curStatusButton = {
  type: 'button',
  code: '1',
  curValue: '1'
}

const tabStatusNumConfigDefault = {
  '1': 0,
  '2': 0
}

const buttons = [
  { code: 'toolbar-audit', label: '审核', actionType: '2', glType: '0', actionName: '审核' },
  { code: 'toolbar-return', label: '退回', actionType: '6', glType: '0', actionName: '退回' },
  { code: 'toolbar-recallaudit', label: '撤销', actionType: '3', glType: '0', actionName: '撤销' }
]

const buttonsInfos = {
  '1': [
    { code: 'toolbar-audit', label: '审核', actionType: '2', glType: '0', actionName: '审核' },
    { code: 'toolbar-return', label: '退回', actionType: '6', glType: '0', actionName: '退回' }
  ],
  '2': [
    { code: 'toolbar-recallaudit', label: '撤销', actionType: '3', glType: '0', actionName: '撤销' }
  ]
}

const lefttreeConfig = {
  curRadio: 'agency',
  placeholder: '请输入关键字',
  radioGroup: [
    {
      code: 'bgt_mof_dep',
      label: '资金管理处室'
    },
    {
      code: 'agency',
      label: '预算单位'
    },
    {
      code: 'exp_func',
      label: '功能分类'
    }
  ]
}

const queryFormConfig = [
  {
    field: 'agency_',
    title: '预算单位',
    itemRender: {
      name: '$formTreeInput',
      props: {
        reloaddata: true,
        isServer: true,
        ajaxType: 'post',
        placeholder: '预算单位',
        editConfig: { placeholder: '预算单位', initLoadTree: false },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'agency'
        }
      }
    }
  },
  {
    field: 'exp_func_',
    title: '功能分类',
    itemRender: {
      name: '$formTreeInput',
      props: {
        reloaddata: true,
        isServer: true,
        ajaxType: 'post',
        placeholder: '功能分类',
        editConfig: { placeholder: '功能分类', initLoadTree: false },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'expfunc'
        }
      }
    }
  },
  {
    field: 'pay_type_',
    title: '支付方式',
    itemRender: {
      name: '$formTreeInput',
      props: {
        reloaddata: true,
        isServer: true,
        ajaxType: 'post',
        placeholder: '支付方式',
        editConfig: { placeholder: '支付方式', initLoadTree: false },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'paytype'
        }
      }
    }
  },
  {
    title: '政府预算经济科目分类',
    field: 'gov_bgt_eco_',
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        reloaddata: true,
        isServer: true,
        ajaxType: 'post',
        editConfig: { placeholder: '政府预算经济科目分类', initLoadTree: false },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'govbgteco'
        }
      }
    }
  },
  {
    title: '资金性质',
    field: 'fund_type_',
    itemRender: {
      name: '$formTreeInput',
      props: {
        reloaddata: true,
        isServer: true,
        ajaxType: 'post',
        editConfig: { placeholder: '资金性质', initLoadTree: false },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'fundtype'
        }
      }
    }
  },
  {
    title: '指标文号',
    field: 'cor_bgt_doc_no_',
    itemRender: {
      name: '$formTreeInput',
      props: {
        reloaddata: true,
        openFormatLabel: true,
        isServer: true,
        ajaxType: 'post',
        formatter: '#name',
        editConfig: { placeholder: '指标文号', initLoadTree: false },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'cor_bgt_doc_no'
        }
      }
    }
  }
]

const queryFormBaseData = {
  agency_: '',
  exp_func_: '',
  pay_type_: '',
  gov_bgt_eco_: '',
  fund_type_: '',
  cor_bgt_doc_no_: ''
}

export {
  columns,
  statusButtons,
  curStatusButton,
  tabStatusNumConfigDefault,
  buttons,
  buttonsInfos,
  lefttreeConfig,
  queryFormConfig,
  queryFormBaseData
}
