// 指标管理--》直达资金指标接入
// 界面配置文件
const statusButtons = [
  {
    type: 'button',
    iconName: 'base-daiban.png',
    iconNameActive: 'base-daiban-active.png',
    label: '未送审',
    code: '1'
  },
  {
    type: 'button',
    iconName: 'base-yiban.png',
    iconNameActive: 'base-yiban-active.png',
    label: '已送审',
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
  { code: 'toolbar-update', label: '修改', actionType: '4', glType: '2', actionName: '修改', action: 'modify' },
  { code: 'toolbar-audit', label: '送审', actionType: '2', glType: '0', actionName: '送审', action: 'audit' },
  { code: 'toolbar-delete', label: '作废', actionType: '5', glType: '5', actionName: '作废', action: 'delete' },
  { code: 'toolbar-cancel', label: '撤销', actionType: '3', glType: '0', actionName: '撤销', action: 'back' },
  { code: 'toolbar-import', label: '导入', actionType: '1', glType: '1', actionName: '导入', action: 'import' }
]

const buttonsInfos = {
  '1': [
    { code: 'toolbar-import', label: '导入', actionType: '1', glType: '1', actionName: '导入', action: 'import' },
    { code: 'toolbar-update', label: '修改', actionType: '4', glType: '2', actionName: '修改', action: 'modify' },
    { code: 'toolbar-audit', label: '送审', actionType: '2', glType: '0', actionName: '送审', action: 'audit' },
    { code: 'toolbar-delete', label: '作废', actionType: '5', glType: '5', actionName: '作废', action: 'delete' }
  ],
  '2': [
    { code: 'toolbar-cancel', label: '撤销', actionType: '3', glType: '0', actionName: '撤销', action: 'back' }
  ]
}

const lefttreeConfig = {
  curRadio: 'fundtype',
  placeholder: '请输入关键字',
  radioGroup: [
    {
      code: 'bgt_mof_dep',
      label: '资金管理处室'
    },
    {
      code: 'fundtype',
      label: '资金性质'
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
    field: 'exp_func_',
    title: '功能分类',
    itemRender: {
      name: '$formTreeInput',
      props: {
        reloaddata: true,
        isServer: true,
        ajaxType: 'post',
        editConfig: { placeholder: '功能分类' },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'expfunc'
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
        editConfig: { placeholder: '资金性质' },
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
        editConfig: { placeholder: '指标类型' },
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
  exp_func_: '',
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
  lefttreeConfig,
  queryFormConfig,
  queryFormBaseData
}
