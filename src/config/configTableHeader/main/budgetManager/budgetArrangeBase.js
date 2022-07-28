// 指标管理--》资金安排
// 界面基础配置文件
const statusButtons = [
  {
    type: 'button',
    iconName: 'base-daiban.png',
    iconNameActive: 'base-daiban-active.png',
    label: '未安排',
    code: '1'
  },
  {
    type: 'button',
    iconName: 'base-yiban.png',
    iconNameActive: 'base-yiban-active.png',
    label: '已安排',
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
  { code: 'toolbar-file', label: '附件' },
  { code: 'toolbar-arrange', label: '资金安排' },
  { code: 'toolbar-confirm', label: '确认' },
  { code: 'toolbar-cancel', label: '撤销' }
]

const buttonsInfos = {
  '1': [
    { code: 'toolbar-file', label: '附件' },
    { code: 'toolbar-confirm', label: '确认' },
    { code: 'toolbar-arrange', label: '资金安排' }
  ],
  '2': [
    { code: 'toolbar-cancel', label: '撤销' }
  ]
}

const lefttreeConfig = {
  curRadio: 'agency',
  placeholder: '请输入预算单位',
  radioGroup: [
    {
      code: 'agency',
      label: '预算单位'
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
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        editConfig: { placeholder: '功能分类', initLoadTree: false },
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
  }
]

const queryFormBaseData = {
  bgt_mof_dep_: '',
  agency_: '',
  exp_func_: '',
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
