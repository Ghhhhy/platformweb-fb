// 指标管理--》可执行指标审核
// 界面配置文件
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
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    label: '曾经办',
    code: '0'
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
  { code: 'toolbar-refresh', label: '刷新', actionType: '0', glType: '0', actionName: '刷新' },
  { code: 'toolbar-audit', label: '审核', actionType: '2', glType: '0', actionName: '审核', action: 'audit' },
  { code: 'toolbar-back', label: '退回', actionType: '6', glType: '0', actionName: '退回', action: 'back' },
  { code: 'toolbar-cancel', label: '撤销', actionType: '3', glType: '0', actionName: '撤销', action: 'audit' }
]

const buttonsInfos = {
  '1': [
    { code: 'toolbar-refresh', label: '刷新', actionType: '0', glType: '0', actionName: '刷新' },
    { code: 'toolbar-audit', label: '审核', actionType: '2', glType: '0', actionName: '审核', action: 'audit' },
    { code: 'toolbar-back', label: '退回', actionType: '6', glType: '0', actionName: '退回', action: 'back' }
  ],
  '2': [
    { code: 'toolbar-refresh', label: '刷新', actionType: '0', glType: '0', actionName: '刷新' },
    { code: 'toolbar-cancel', label: '撤销', actionType: '3', glType: '0', actionName: '撤销', action: 'audit' }
  ]
}

export const columns = [
  {
    title: '资金管理处室',
    field: 'bgt_mof_dep_name',
    width: '200',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '单位主管处室',
    field: 'manage_mof_dep_name',
    width: '200',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '指标文号',
    field: 'cor_bgt_doc_no',
    width: '200',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '预算单位',
    field: 'agency',
    width: '200',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '支出项目',
    field: 'pro_name',
    width: '200',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '指标金额',
    field: 'amount',
    width: '200',
    align: 'right',
    formatter: 'formatMoney',
    // 金额格式
    cellRender: {
      name: '$moneyRender'
    },
    type: 'number',
    combinedType: ['average', 'subTotal', 'total', 'totalAll']
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
    field: 'bgt_mof_dep_',
    title: '资金管理处室',
    itemRender: {
      name: '$formTreeInput',
      props: {
        reloaddata: true,
        isServer: true,
        ajaxType: 'post',
        editConfig: { placeholder: '资金管理处室' },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'bgt_mof_dep'
        }
      }
    }
  },
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
        editConfig: { placeholder: '预算单位' },
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
        editConfig: { placeholder: '功能分类' },
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
        editConfig: { placeholder: '支付方式' },
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
        placeholder: '政府预算经济科目分类',
        editConfig: { placeholder: '政府预算经济科目分类' },
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
        placeholder: '资金性质',
        editConfig: { placeholder: '资金性质' },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'fundtype'
        }
      }
    }
  }
]

const queryFormBaseData = {
  bgt_mof_dep_: '',
  agency_: '',
  exp_func_: '',
  pay_type_: '',
  gov_bgt_eco_: '',
  fund_type_: ''
}

export {
  statusButtons,
  buttonsInfos,
  curStatusButton,
  buttons,
  tabStatusNumConfigDefault,
  lefttreeConfig,
  queryFormConfig,
  queryFormBaseData
}
