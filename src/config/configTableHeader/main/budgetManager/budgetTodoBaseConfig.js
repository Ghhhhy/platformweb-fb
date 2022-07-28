// 指标管理--》可执行指标
// 界面配置文件
const statusButtons = [
  {
    type: 'button',
    iconName: 'base-zhibaio.png',
    iconNameActive: 'base-zhibaio-active.png',
    label: '指标账',
    code: '9'
  },
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
  },
  {
    type: 'button',
    iconName: 'delete.png',
    iconNameActive: 'delete.png',
    label: '已作废',
    code: '5'
  }, /*,  {
    type: 'button',
    iconName: 'backout.png',
    iconNameActive: 'backout.png',
    label: '被退回',
    code: '4'
  } */
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
  code: '9',
  curValue: '9'
}

const tabStatusNumConfigDefault = {
  '9': 0,
  '1': 0,
  '2': 0
}

const buttons = [
  { code: 'toolbar-insert', label: '新增', actionType: '1', glType: '1', actionName: '新增', action: '' },
  { code: 'toolbar-distribute', label: '分配', actionType: '1', glType: '1', actionName: '可执行指标分配' },
  { code: 'toolbar-adjust', label: '调剂', actionType: '1', glType: '1', actionName: '待分指标调剂' },
  { code: 'toolbar-update', label: '修改', actionType: '4', glType: '2', actionName: '修改', action: 'modify' },
  { code: 'toolbar-audit', label: '送审', actionType: '2', glType: '0', actionName: '送审', action: 'audit' },
  { code: 'toolbar-delete', label: '作废', actionType: '5', glType: '5', actionName: '作废', action: 'delete' },
  { code: 'toolbar-cancel', label: '撤销', actionType: '3', glType: '0', actionName: '撤销', action: 'back' },
  { code: 'toolbar-import', label: '导入', actionType: '1', glType: '1', actionName: '导入', action: 'import' }
]

const buttonsInfos = {
  '9': [
    { code: 'toolbar-insert', label: '新增', actionType: '1', glType: '1', actionName: '新增', action: '' }
    // { code: 'toolbar-import', label: '导入', actionType: '1', glType: '1', actionName: '导入', action: 'import' },
    // { code: 'toolbar-distribute', label: '分配', actionType: '1', glType: '1', actionName: '可执行指标分配' }
    /* { code: 'toolbar-adjust', label: '调剂', actionType: '1', glType: '1', actionName: '待分指标调剂' } */
  ],
  '1': [
    { code: 'toolbar-update', label: '修改', actionType: '4', glType: '2', actionName: '修改', action: 'modify' },
    { code: 'toolbar-import', label: '导入', actionType: '1', glType: '1', actionName: '导入', action: 'import' },
    { code: 'toolbar-distribute', label: '分配', actionType: '1', glType: '1', actionName: '可执行指标分配' },
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
        editConfig: { placeholder: '资金管理处室', initLoadTree: false },
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
        editConfig: { placeholder: '功能分类', initLoadTree: false },
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
