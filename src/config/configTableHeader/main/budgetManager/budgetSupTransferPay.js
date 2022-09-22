// 指标管理--》转移支付提前下达录入
// 界面配置文件
const statusButtons = [
  {
    type: 'button',
    iconName: 'base-daiban.png',
    iconNameActive: 'base-daiban-active.png',
    label: '未保存',
    code: '1'
  },
  {
    type: 'button',
    iconName: 'base-daiban.png',
    iconNameActive: 'base-daiban-active.png',
    label: '已保存',
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
  { code: 'toolbar-insert', label: '新增', actionType: '0', glType: '3', actionName: '新增', action: '' },
  // { code: 'toolbar-audit', label: '送审', actionType: '2', glType: '0', actionName: '送审', action: 'audit' },
  { code: 'toolbar-delete', label: '删除', actionType: '0', glType: '5', actionName: '删除', action: 'delete' },
  // { code: 'toolbar-cancel', label: '撤销', actionType: '3', glType: '0', actionName: '撤销', action: 'audit' },
  { code: 'toolbar-import', label: '导入', actionType: '0', glType: '3', actionName: '导入', action: 'import' }
]

const buttonsInfos = {
  '1': [
    { code: 'toolbar-confirm', label: '登记', actionType: '2', glType: '3', actionName: '登记', action: 'audit' }
  ],
  '2': [
    { code: 'toolbar-cancel', label: '撤销', actionType: '0', glType: '5', actionName: '撤销', action: 'audit' }
  ]
}

const lefttreeConfig = {
  curRadio: 'agency',
  placeholder: '请输入关键字',
  radioGroup: [
    {
      code: 'bgt_mof_dep',
      label: '指标管理处'
    },
    {
      code: 'agency',
      label: '单位/下级财政'
    }
  ]
}

const queryFormConfig = [
  {
    field: 'cor_bgt_doc_no_',
    title: '指标文号',
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        queryByInput: true,
        editConfig: {
          placeholder: '指标文号',
          initLoadTree: false
        },
        prefix: 'cor_bgt_doc_no_',
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'cor_bgt_doc_no',
          condition: {
            wheresql: ''
          }
        },
        // 只显示name
        openFormatLabel: true,
        formatter: '#name'
      }
    }
  },
  {
    title: '指标说明',
    field: 'bgt_dec',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        type: 'text',
        placeholder: '指标说明'
      }
    }
  },
  {
    field: 'special_manager_',
    title: '专管员',
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        editConfig: {
          placeholder: '专管员',
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'specialmanager',
          dept_id: ''
        }
      }
    }
  },
  {
    field: 'exp_func_',
    title: '支出功能分类',
    itemRender: {
      name: '$formTreeInput',
      props: {
        reloaddata: true,
        isServer: true,
        ajaxType: 'post',
        editConfig: {
          placeholder: '功能分类',
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'expfunc',
          condition: {
            wheresql: ' and code like \'230%\' '
          }
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
        // placeholder: '资金性质',
        editConfig: {
          placeholder: '资金性质',
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'fundtype'
        }
      }
    }
  }
]

const formCheckDatas = {
  cor_bgt_doc_no: [
    {
      required: true,
      message: '上级指标文号不能为空'
    }
  ],
  bgt_doc_title: [
    {
      required: true,
      message: '指标文标题不能为空'
    }
  ],
  doc_date: [
    {
      required: true,
      message: '发文时间不能为空'
    }
  ],
  bgt_dec: [
    {
      required: true,
      message: '指标说明不能为空'
    }
  ],
  is_rp_: [
    {
      required: true,
      message: '下达类型不能为空'
    }
  ],
  input_date: [
    {
      required: true,
      message: '收文日期不能为空'
    }
  ],
  special_manager_: [
    {
      required: true,
      message: '专管员不能为空'
    }
  ],
  bgt_mof_dep_: [
    {
      required: true,
      message: '资金管理处室不能为空'
    }
  ],
  fund_type_: [
    {
      required: true,
      message: '资金性质不能为空'
    }
  ],
  found_type_: [
    {
      required: true,
      message: '资金来源不能为空'
    }
  ],
  source_type_: [
    {
      required: true,
      message: '指标来源不能为空'
    }
  ],
  fund_category_: [
    {
      required: true,
      message: '资金类别不能为空'
    }
  ],
  exp_func_: [
    {
      required: true,
      message: '支出功能科目不能为空'
    }
  ],
  gov_bgt_eco_: [
    {
      required: true,
      message: '政府支出经济分类不能为空'
    }
  ],
  tp_func_: [
    {
      required: true,
      message: '支出功能科目（约束下级）不能为空'
    }
  ],
  is_fgjjtzbs_: [
    {
      required: true,
      message: '发改基建投资标识不能为空'
    }
  ],
  is_dir_: [
    {
      required: true,
      message: '直达资金标识不能为空'
    }
  ],
  is_rt_: [
    {
      required: true,
      message: '部门预算/执行中下达不能为空'
    }
  ],
  budget_level_: [
    {
      required: true,
      message: '预算级次不能为空'
    }
  ],
  pro_: [
    {
      required: true,
      message: '项目不能为空'
    }
  ],
  is_track: [
    {
      required: true,
      message: '是否追踪不能为空'
    }
  ],
  amount: [
    {
      required: true,
      message: '金额不能为0'
    }
  ]
}

const queryFormBaseData = {
  bgt_mof_dep_: '',
  agency_: '',
  exp_func_: '',
  pay_type_: '',
  gov_bgt_eco_: '',
  fund_type_: '',
  bgt_type_: '',
  cor_bgt_doc_no_: '',
  bgt_dec: '',
  special_manager_: ''
}

const registerData = {
  bgt_mof_dep_: '', // 资金管理处室
  manage_mof_dep_: '', // 业务管理处室
  sup_bgt_mof_dep_name: '',
  sup_manage_mof_dep_name: ''
}
const registerItems = [
  {
    field: 'sup_manage_mof_dep_name',
    title: '上级财政内部机构',
    width: 200,
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    field: 'sup_dept_name',
    title: '上级主管部门',
    width: 200,
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    field: 'bgt_mof_dep_',
    title: '资金管理处室',
    width: 200,
    itemRender: {
      name: '$formTreeInput',
      props: {
        disabled: false,
        isleaf: true,
        isServer: true,
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'bgt_mof_dep'
        }
      }
    }
  }
  // {
  //   field: 'manage_mof_dep_',
  //   title: '业务管理处室',
  //   width: 200,
  //   itemRender: {
  //     name: '$formTreeInput',
  //     props: {
  //       disabled: false,
  //       isServer: true,
  //       serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
  //       queryparams: {
  //         eleCode: 'manage_mof_dep'
  //       }
  //     }
  //   }
  // }
]

export {
  statusButtons,
  buttonsInfos,
  curStatusButton,
  buttons,
  tabStatusNumConfigDefault,
  lefttreeConfig,
  queryFormConfig,
  queryFormBaseData,
  formCheckDatas,
  registerData,
  registerItems
}
