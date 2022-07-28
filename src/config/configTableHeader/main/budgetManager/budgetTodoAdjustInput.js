// 指标管理--》待分指标调剂录入
// 界面配置文件
const budgetCarryOverConfig = {
  statusButtons: [
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
    // {
    //   type: 'button',
    //   iconName: 'base-yiban.png',
    //   iconNameActive: 'base-yiban-active.png',
    //   label: '全部单据',
    //   code: '0',
    //   statussql: ' \'1\',\'2\' '
    // }
  ],
  curStatusButton: {
    type: 'button',
    code: '1',
    curValue: '1'
  },
  tabStatusNumConfigDefault: {
    '1': 0,
    '2': 0,
    '0': 0
  },
  buttons: [
    { code: 'toolbar-insert', label: '新增', actionType: '1', glType: '1', actionName: '新增', action: 'insert' },
    { code: 'toolbar-update', label: '修改', actionType: '1', glType: '2', actionName: '修改', action: 'insert' },
    { code: 'toolbar-audit', label: '送审', actionType: '2', glType: '0', actionName: '送审', action: 'audit' },
    { code: 'toolbar-delete', label: '删除', actionType: '0', glType: '5', actionName: '删除', action: 'delete' },
    { code: 'toolbar-cancel', label: '撤销', actionType: '1', glType: '0', actionName: '撤销', action: 'back' }
  ],
  tabbuttons: {
    '1': [
      { code: 'toolbar-insert', label: '新增', actionType: '1', glType: '1', actionName: '新增', action: 'insert' },
      { code: 'toolbar-update', label: '修改', actionType: '1', glType: '2', actionName: '修改', action: 'insert' },
      { code: 'toolbar-audit', label: '送审', actionType: '2', glType: '0', actionName: '送审', action: 'audit' },
      { code: 'toolbar-delete', label: '删除', actionType: '0', glType: '5', actionName: '删除', action: 'delete' }
    ],
    '2': [
      { code: 'toolbar-cancel', label: '撤销', actionType: '1', glType: '0', actionName: '撤销', action: 'back' }
    ]
  },
  lefttreeConfig: {
    curRadio: 'bgt_mof_dep',
    placeholder: '请输入关键字',
    radioGroup: [
      {
        code: 'manage_mof_dep',
        label: '业务主管处室'
      },
      {
        code: 'bgt_mof_dep',
        label: '资金管理处室'
      }
    ]
  },
  queryFormConfig: [
    {
      field: 'manage_mof_dep_',
      title: '业务主管处室',
      itemRender: {
        name: '$formTreeInput',
        props: {
          reloaddata: true,
          isServer: true,
          ajaxType: 'post',
          editConfig: {
            placeholder: '业务主管处室',
            initLoadTree: false
          },
          serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
          queryparams: {
            eleCode: 'manage_mof_dep_'
          }
        }
      }
    },
    {
      field: 'bgt_mof_dep_',
      title: '资金管理处室',
      itemRender: {
        name: '$formTreeInput',
        props: {
          reloaddata: true,
          isServer: true,
          ajaxType: 'post',
          editConfig: {
            placeholder: '资金管理处室',
            initLoadTree: false
          },
          serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
          queryparams: {
            eleCode: 'bgt_mof_dep'
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
          // placeholder: '功能分类',
          editConfig: {
            placeholder: '功能分类',
            initLoadTree: false
          },
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
          // placeholder: '政府预算经济科目分类',
          editConfig: {
            placeholder: '政府预算经济科目分类',
            initLoadTree: false
          },
          serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
          queryparams: {
            eleCode: 'govbgteco'
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
          editConfig: {
            placeholder: '指标类型',
            initLoadTree: false
          },
          serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
          queryparams: {
            eleCode: 'bgttype'
          }
        }
      }
    }
  ],
  queryFormBaseData: {
    manage_mof_dep_: '',
    bgt_mof_dep_: '',
    exp_func_: '',
    gov_bgt_eco_: '',
    fund_type_: '',
    bgt_type_: ''
  },
  basicInfo: {
    type: 'form',
    tableColumnsConfig: [
      {
        title: '展开',
        type: 'expand',
        width: 60,
        className: 'expand-user-addico',
        contentRender: {
          name: '$contentTable',
          props: {
            params: {}
          }
        }
      }
    ],
    editRules: {
    },
    toolbarConfig: { // table工具栏配置
      moneyConversion: false, // 是否有金额转换
      slots: {
        tools: 'toolbarTools',
        buttons: 'toolbarSlots'
      }
    }
  },
  // 编辑 附件 操作日志
  rowbutton: {
    wss: {
      renderDefault(h, cellRender, params, context) {
        let self = context.$grid.$parent
        let { row, column } = params
        return [
          <a title="编辑" class="gloable-option-row-edit gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'edit' })}>编辑</a>
        ]
      }
    }
  },
  tableColumns: [
    {
      title: '指标明细号',
      field: 'voucher_no',
      width: '200',
      align: 'left',
      itemRender: {
        name: 'input',
        props: {
          type: 'text'
        }
      }
    },
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
      title: '来源指标文号',
      field: 'sup_bgt_doc_no_name',
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
      title: '资金来源',
      field: 'found_type_name',
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
      title: '指标类型',
      field: 'bgt_type_name',
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
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '支出功能科目',
      field: 'exp_func',
      width: '300',
      align: 'left',
      itemRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '政府支出经济分类',
      field: 'gov_bgt_eco',
      width: '300',
      align: 'left',
      itemRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '项目',
      field: 'pro_name',
      width: '400',
      align: 'left',
      itemRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '指标金额',
      field: 'amount',
      width: '150',
      align: 'right',
      // formatter: 'formatMoney',
      cellRender: {
        name: '$moneyRender'
      },
      // 总计小计
      combinedType: ['average', 'subTotal', 'total', 'totalAll']
    },
    {
      title: '申请单号',
      field: 'bill_id',
      width: '150',
      align: 'right'
    },
    {
      title: '操作',
      field: 'gloableOptionRowInput',
      className: 'gloableOptionRow',
      align: 'center',
      fixed: 'right',
      sortable: false,
      filters: false,
      width: 140,
      cellRender: {
        name: '$gloableOptionRowInput'
      }
    }
  ],
  tableAuditColumns: [
    {
      title: '指标明细号',
      field: 'voucher_no',
      width: '200',
      align: 'left',
      itemRender: {
        name: 'input',
        props: {
          type: 'text'
        }
      }
    },
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
      title: '来源指标文号',
      field: 'sup_bgt_doc_no_name',
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
      title: '资金来源',
      field: 'found_type_name',
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
      title: '指标类型',
      field: 'bgt_type_name',
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
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '支出功能科目',
      field: 'exp_func',
      width: '300',
      align: 'left',
      itemRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '政府支出经济分类',
      field: 'gov_bgt_eco',
      width: '300',
      align: 'left',
      itemRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '项目',
      field: 'pro_name',
      width: '400',
      align: 'left',
      itemRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '指标金额',
      field: 'amount',
      width: '150',
      align: 'right',
      // formatter: 'formatMoney',
      cellRender: {
        name: '$moneyRender'
      },
      // 总计小计
      combinedType: ['average', 'subTotal', 'total', 'totalAll']
    },
    {
      title: '申请单号',
      field: 'bill_id',
      width: '150',
      align: 'right'
    }
  ],
  inputFormConfigs: [
    {
      field: 'fund_type_',
      title: '资金性质',
      span: 8,
      itemRender: {
        name: '$formTreeInput',
        props: {
          type: 'text',
          isleaf: true,
          isServer: true,
          editConfig: {
            initLoadTree: false
          },
          serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
          queryparams: {
            eleCode: 'fundtype',
            condition: {
              wheresql: ''
            }
          }
        }
      }
    },
    {
      field: 'bgt_mof_dep_',
      title: '资金管理处室',
      span: 8,
      itemRender: {
        name: '$formTreeInput',
        props: {
          type: 'text',
          isleaf: true,
          isServer: true,
          editConfig: {
            initLoadTree: false
          },
          serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
          queryparams: {
            eleCode: 'bgt_mof_dep'
          }
        }
      }
    },
    {
      field: 'found_type_',
      title: '资金来源',
      span: 8,
      itemRender: {
        name: '$formTreeInput',
        props: {
          type: 'text',
          isleaf: true,
          isServer: true,
          editConfig: {
            initLoadTree: false
          },
          serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
          queryparams: {
            eleCode: 'foundtype',
            condition: {
              // wheresql: ' and (code like \'1%\' or code like \'2%\') '
            }
          }
        }
      }
    },
    {
      field: 'source_type_',
      title: '指标来源',
      span: 8,
      itemRender: {
        name: '$formTreeInput',
        props: {
          type: 'text',
          isleaf: true,
          isServer: true,
          elecode: 'source_type',
          editConfig: {
            initLoadTree: false
          },
          serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
          queryparams: {
            eleCode: 'source_type',
            condition: {
              wheresql: ''
            }
          }
        }
      }
    },
    {
      field: 'bgt_type_',
      title: '指标类型',
      span: 8,
      itemRender: {
        name: '$formTreeInput',
        props: {
          type: 'text',
          isleaf: true,
          isServer: true,
          elecode: 'bgt_type',
          editConfig: {
            initLoadTree: false
          },
          serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
          queryparams: {
            eleCode: 'bgt_type',
            condition: {
              // wheresql: ' and code=\'21\' '
            }
          }
        }
      }
    },
    {
      field: 'pro_',
      title: '项目',
      span: 8,
      itemRender: {
        name: '$formTreeInput',
        props: {
          type: 'text',
          isleaf: true,
          isServer: true,
          editConfig: {
            initLoadTree: false
          },
          queryByInput: true,
          datas: [],
          serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
          queryparams: {
            eleCode: 'pro'
          }
        }
      }
    },
    {
      field: 'amount',
      title: '金额',
      span: 8,
      itemRender: {
        name: '$vxeFormInput',
        props: {
          type: 'float',
          placeholder: '金额'
        }
      }
    },
    {
      field: 'exp_func_',
      title: '支出功能科目',
      span: 8,
      itemRender: {
        name: '$formTreeInput',
        props: {
          type: 'text',
          isleaf: true,
          isServer: true,
          editConfig: {
            initLoadTree: false
          },
          serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
          queryparams: {
            eleCode: 'exp_func',
            condition: {
              // wheresql: ' and code like \'230%\' '
            }
          }
        }
      }
    },
    {
      field: 'gov_bgt_eco_',
      title: '政府支出经济分类',
      span: 8,
      itemRender: {
        name: '$formTreeInput',
        props: {
          type: 'text',
          isleaf: true,
          isServer: true,
          editConfig: {
            initLoadTree: false
          },
          serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
          queryparams: {
            eleCode: 'gov_bgt_eco'
          }
        }
      }
    }
  ],
  inputFormDatas: {
    fund_type_: '', // 资金性质
    bgt_mof_dep_: '', // 资金管理处
    found_type_: '', // 资金来源
    source_type_: '', // 指标来源
    bgt_source_: '', // 指标来源类型
    bgt_type_: '', // 指标类型,
    budget_level_: '', // 预算级次
    pro_: '', // 项目
    amount: 0, // 金额
    exp_func_: '', // 功能分类
    gov_bgt_eco_: '' // 政府支出经济分类
  },
  formCheckConfig: {
    cor_bgt_doc_no: [
      {
        required: true,
        message: '基本信息-指标文号不能为空'
      }
    ],
    bgt_doc_title: [
      {
        required: true,
        message: '基本信息-指标文标题不能为空'
      }
    ],
    doc_date: [
      {
        required: true,
        message: '基本信息-发文时间不能为空'
      }
    ],
    bgt_dec: [
      {
        required: true,
        message: '基本信息-指标说明不能为空'
      }
    ],
    fund_type_: [
      {
        required: true,
        message: '基本信息-资金性质不能为空'
      }
    ],
    bgt_mof_dep_: [
      {
        required: true,
        message: '基本信息-资金管理处室不能为空'
      }
    ],
    found_type_: [
      {
        required: true,
        message: '基本信息-资金来源不能为空'
      }
    ],
    source_type_: [
      {
        required: true,
        message: '基本信息-指标来源不能为空'
      }
    ],
    budget_level_: [
      {
        required: true,
        message: '基本信息-预算级次不能为空'
      }
    ],
    pro_: [
      {
        required: true,
        message: '基本信息-项目信息不能为空'
      }
    ],
    exp_func_: [
      {
        required: true,
        message: '基本信息-功能分类不能为空'
      }
    ],
    gov_bgt_eco_: [
      {
        required: true,
        message: '基本信息-政府支出经济分类不能为空'
      }
    ]
  }
}

export default function(tableType, configType) {
  if (tableType && configType) {
    return budgetCarryOverConfig[tableType][configType]
  } else if (tableType) {
    return budgetCarryOverConfig[tableType]
  } else {
    return null
  }
}
