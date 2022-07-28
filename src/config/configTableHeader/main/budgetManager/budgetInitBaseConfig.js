// 指标管理--》部门预算复核
// 界面配置文件
const statusButtons = [
  {
    type: 'button',
    iconName: 'base-daiban.png',
    iconNameActive: 'base-daiban-active.png',
    label: '未复核',
    code: '1'
  },
  {
    type: 'button',
    iconName: 'base-yiban.png',
    iconNameActive: 'base-yiban-active.png',
    label: '已复核',
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
  '2': 0,
  '3': 0
}

const buttons = [
  { code: 'toolbar-insert', label: '新增', actionType: '1', glType: '1', actionName: '新增', action: '' },
  { code: 'toolbar-audit', label: '送审', actionType: '2', glType: '0', actionName: '送审', action: 'audit' },
  { code: 'toolbar-update', label: '修改', actionType: '4', glType: '2', actionName: '修改', action: 'modify' },
  { code: 'toolbar-delete', label: '删除', actionType: '5', glType: '5', actionName: '作废', action: 'delete' },
  { code: 'toolbar-cancel', label: '撤销', actionType: '3', glType: '0', actionName: '撤销', action: 'audit' }
]

const buttonsInfos = {
  '1': [
    // { code: 'toolbar-file', label: '附件' },
    { code: 'toolbar-confirm', label: '确认' }
    // { code: 'toolbar-delete', label: '删除' }
  ],
  '2': [
    { code: 'toolbar-refresh', label: '刷新' },
    { code: 'toolbar-cancel', label: '撤销' }
  ]
}

const incomeTreeConfig = {
  curRadio: 'agency',
  placeholder: '请输入关键字',
  radioGroup: [
    {
      code: 'fund_type',
      label: '资金性质'
    },
    {
      code: 'income_sort',
      label: '收入分类'
    }
  ]
}

const deptTreeConfig = {
  curRadio: 'agency',
  placeholder: '请输入关键字',
  radioGroup: [
    {
      code: 'fund_type',
      label: '资金性质'
    },
    {
      code: 'bgt_mof_dep',
      label: '指标管理处室'
    }
  ]
}

const agencyTreeConfig = {
  curRadio: 'agency',
  placeholder: '请输入关键字',
  radioGroup: [
    {
      code: 'fund_type',
      label: '资金性质'
    },
    {
      code: 'agency',
      label: '预算单位',
      whereSql: ' and isreal = \'1\' and code not like (\'61%\') '
    }
  ]
}

const transferTreeConfig = {
  curRadio: 'agency',
  placeholder: '请输入关键字',
  radioGroup: [
    {
      code: 'fund_type',
      label: '资金性质'
    },
    {
      code: 'agency',
      label: '预算单位',
      whereSql: ' and (isreal = \'0\' or code like (\'61%\')) '
    }
  ]
}

const queryFormConfig = [
  {
    field: 'bgt_mof_dep_',
    title: '指标管理处室',
    itemRender: {
      name: '$formTreeInput',
      props: {
        reloaddata: true,
        isServer: true,
        ajaxType: 'post',
        editConfig: { placeholder: '指标管理处室', initLoadTree: false },
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
    field: 'bgt_type_',
    title: '指标类型',
    itemRender: {
      name: '$formTreeInput',
      props: {
        reloaddata: true,
        isServer: true,
        ajaxType: 'post',
        editConfig: { placeholder: '指标类型', initLoadTree: false },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'bgttype'
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
  bgt_type_: ''
}

export {
  statusButtons,
  buttonsInfos,
  curStatusButton,
  buttons,
  tabStatusNumConfigDefault,
  incomeTreeConfig,
  deptTreeConfig,
  agencyTreeConfig,
  transferTreeConfig,
  queryFormConfig,
  queryFormBaseData
}
