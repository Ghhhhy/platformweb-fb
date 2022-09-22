// 指标管理--》支付方式确认
// 界面配置文件
const statusButtons = [
  {
    type: 'button',
    iconName: 'base-daiban.png',
    iconNameActive: 'base-daiban-active.png',
    label: '待确认',
    code: '1'
  },
  {
    type: 'button',
    iconName: 'base-yiban.png',
    iconNameActive: 'base-yiban-active.png',
    label: '已确认',
    code: '2'
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
  { code: 'toolbar-modify', label: '支付方式修改', actionType: '0', glType: '0', actionName: '支付方式修改' },
  { code: 'toolbar-confirm', label: '确认', actionType: '2', glType: '3', actionName: '确认' },
  { code: 'toolbar-recallconfirm', label: '撤销', actionType: '3', glType: '4', actionName: '撤销' },
  { code: 'toolbar-oafile', label: '查看OA附件', actionType: '0', glType: '0', actionName: '查看OA附件' }
]

const buttonsInfos = {
  '1': [
    { code: 'toolbar-modify', label: '支付方式修改', actionType: '0', glType: '0', actionName: '支付方式修改' },
    { code: 'toolbar-confirm', label: '确认', actionType: '2', glType: '3', actionName: '确认' }
  ],
  '2': [
    { code: 'toolbar-recallconfirm', label: '撤销', actionType: '3', glType: '4', actionName: '撤销' }
  ]
}

const buttonsInfosoa = {
  '1': [
    { code: 'toolbar-modify', label: '支付方式修改', actionType: '0', glType: '0', actionName: '账户类型修改' },
    { code: 'toolbar-confirm', label: '确认', actionType: '2', glType: '3', actionName: '确认' } // ,
  ],
  '2': [
    { code: 'toolbar-recallconfirm', label: '撤销', actionType: '3', glType: '4', actionName: '撤销' }
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
    field: 'bgt_mof_dep_',
    title: '资金管理处室',
    itemRender: {
      name: '$formTreeInput',
      props: {
        reloaddata: true,
        isServer: true,
        ajaxType: 'post',
        editConfig: { placeholder: '资金管理处室', initLoadTree: false },
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
  bgt_mof_dep_: '',
  agency_: '',
  exp_func_: '',
  pay_type_: '',
  gov_bgt_eco_: '',
  fund_type_: '',
  cor_bgt_doc_no_: ''
}

export {
  statusButtons,
  buttonsInfos,
  curStatusButton,
  buttons,
  tabStatusNumConfigDefault,
  lefttreeConfig,
  queryFormConfig,
  queryFormBaseData,
  buttonsInfosoa
}
