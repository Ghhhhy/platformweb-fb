// 指标管理--》待分指标调剂录入
// 界面配置文件
const budgetCarryOverConfig = {
  statusButtons: [
    {
      type: 'button',
      iconName: 'base-daiban.png',
      iconNameActive: 'base-daiban-active.png',
      label: '未送审',
      code: '2'
    },
    {
      type: 'button',
      iconName: 'base-yiban.png',
      iconNameActive: 'base-yiban-active.png',
      label: '已送审',
      code: '3'
    }
  ],
  curStatusButton: {
    type: 'button',
    code: '2',
    curValue: '2'
  },
  tabStatusNumConfigDefault: {
    '2': 0,
    '3': 0
  },
  buttons: [
    { code: 'toolbar-audit', label: '审核', actionType: '3', glType: '3', actionName: '审核', action: 'audit' },
    { code: 'toolbar-cancel', label: '撤销', actionType: '2', glType: '4', actionName: '撤销', action: 'back' }
  ],
  tabbuttons: {
    '2': [
      { code: 'toolbar-audit', label: '审核', actionType: '3', glType: '3', actionName: '审核', action: 'audit' }
    ],
    '3': [
      { code: 'toolbar-cancel', label: '撤销', actionType: '2', glType: '4', actionName: '撤销', action: 'back' }
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
  ]
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
