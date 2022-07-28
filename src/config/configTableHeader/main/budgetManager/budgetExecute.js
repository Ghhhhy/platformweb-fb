// 指标管理--》可执行指标
// 界面配置文件
export const columns = [
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
    title: '指标文号',
    field: 'cor_bgt_doc_no',
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
    title: '支付方式',
    field: 'pay_type_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
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
    title: '指标金额',
    field: 'amount',
    width: '150',
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
    field: 'exp_func_',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input',
      props: {
        type: 'text'
      }
    },
    formatter: (value, column) => {
      if (value && value['row'] && value['row']['exp_func_code']) {
        return value['row']['exp_func_code'] + ' - ' + value['row']['exp_func_name']
      }
      return ''
    }
  },
  {
    title: '政府预算经济科目分类',
    field: 'gov_bgt_eco',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input',
      props: {
        type: 'text'
      }
    },
    formatter: (value, column) => {
      if (value && value['row'] && value['row']['gov_bgt_eco_name']) {
        return value['row']['gov_bgt_eco_code'] + ' - ' + value['row']['gov_bgt_eco_name']
      }
      return ''
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
    title: '指标类型',
    field: 'bgt_type_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
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
    title: '收支结构',
    field: 'income_pay_type_name',
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
    title: '录入时间',
    field: 'create_time',
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
      name: '$gloableOptionRowwss'
    }
  }
]

export const operobj = {
  wss: {
    title: '操作',
    field: 'gloableOptionRow',
    className: 'gloableOptionRow',
    align: 'center',
    fixed: 'right',
    sortable: false,
    filters: false,
    width: 140,
    cellRender: {
      name: '$gloableOptionRowwss'
    }
  },
  yss: {
    title: '操作',
    field: 'gloableOptionRow',
    className: 'gloableOptionRow',
    align: 'center',
    fixed: 'right',
    sortable: false,
    filters: false,
    width: 140,
    cellRender: {
      name: '$gloableOptionRowyss'
    }
  }
}

// 指标账列配置信息
export const balanceColumns = [
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
    title: '指标文号',
    field: 'cor_bgt_doc_no_name',
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
    title: '支付方式',
    field: 'pay_type_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
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
    title: '指标额度',
    field: 'avi_amt',
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
    title: '已用额度',
    field: 'use_amt',
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
    title: '可用额度',
    field: 'canuse_amt',
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
    field: 'exp_func_',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input',
      props: {
        type: 'treeinput'
      }
    },
    formatter: (value, column) => {
      if (value && value['row'] && value['row']['exp_func_code']) {
        return value['row']['exp_func_code'] + ' - ' + value['row']['exp_func_name']
      }
      return ''
    }
  },
  {
    title: '政府预算经济科目分类',
    field: 'gov_bgt_eco_',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input',
      props: {
        type: 'treeinput'
      }
    },
    formatter: (value, column) => {
      if (value && value['row'] && value['row']['gov_bgt_eco_name']) {
        return value['row']['gov_bgt_eco_code'] + ' - ' + value['row']['gov_bgt_eco_name']
      }
      return ''
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
    title: '指标类型',
    field: 'bgt_type_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
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
  }
]

export let statusBtn = {
  buttonStausConfig1: {
    moneyConversion: false,
    buttons: [
      { code: 'toolbar-refresh', name: '刷新' },
      { code: 'toolbar-audit', name: '送审', actionType: '2', glType: '0', actionName: '送审', action: 'audit' },
      { code: 'toolbar-update', name: '修改', actionType: '4', glType: '2', actionName: '修改', action: 'modify' },
      { code: 'toolbar-delete', name: '删除', actionType: '5', glType: '5', actionName: '作废', action: 'delete' }
    ]
  },
  buttonStausConfig2: {
    moneyConversion: false,
    buttons: [
      { code: 'toolbar-refresh', name: '刷新' },
      { code: 'toolbar-cancel', name: '撤销', actionType: '3', glType: '0', actionName: '撤销', action: 'audit' }
    ]
  },
  buttonStausConfig0: {
    moneyConversion: false,
    buttons: [
      { code: 'toolbar-refresh', name: '刷新' },
      { code: 'toolbar-insert', name: '新增', actionType: '1', glType: '1', actionName: '新增', action: '' }
      // { code: 'toolbar-import', name: '导入', actionType: '1', glType: '1', actionName: '导入', action: '' }
      // { code: 'toolbar-swap', name: '调剂', actionType: '1', glType: '1', actionName: '待分指标调剂' }
    ]
  }
}

export const budgetOnlyReadColumns = [
  {
    title: '指标文号',
    field: 'cor_bgt_doc_no',
    width: '200',
    itemRender: {
      name: '$input',
      props: {
        type: 'text',
        disabled: true
      }
    }
  },
  {
    title: '资金管理处室',
    field: 'bgt_mof_dep_name',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    field: 'amount',
    title: '指标金额',
    formatter: 'formatMoney',
    itemRender: {
      disabled: true,
      name: '$formMoneyInputRender',
      props: {
        type: 'float',
        disabled: true,
        placeholder: '指标金额'
      }
    }
  },
  {
    title: '资金性质',
    field: 'fund_type_name',
    width: '200',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        type: 'text',
        disabled: true
      }
    }
  },
  {
    title: '指标来源类型',
    field: 'bgt_source_name',
    width: '200',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        type: 'text',
        disabled: true
      }
    }
  },
  {
    title: '功能分类',
    field: 'exp_func_name',
    width: '200',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        type: 'text',
        disabled: true
      }
    }
  },
  {
    title: '政府预算经济科目分类',
    field: 'gov_bgt_eco_name',
    width: '200',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        type: 'text',
        disabled: true
      }
    }
  },
  // {
  //   title: '支出级次',
  //   field: 'dir_name',
  //   width: '200',
  //   itemRender: {
  //     name: '$vxeFormInput',
  //     props: {
  //       type: 'text',
  //       disabled: true
  //     }
  //   }
  // },
  {
    title: '指标摘要',
    field: 'bgt_rem_name',
    width: '200',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        type: 'text',
        disabled: true
      }
    }
  }
  // {
  //   title: '预算来源',
  //   field: 'version_name',
  //   width: '200',
  //   itemRender: {
  //     name: '$vxeFormInput',
  //     props: {
  //       type: 'text',
  //       disabled: true
  //     }
  //   }
  // }
]

export const agencyFormConfigs = [
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
        elecode: 'bgt_mof_dep',
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
    field: 'manage_mof_dep_',
    title: '业务主管处室',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: 'department',
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'department'
        }
      }
    }
  },
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
        elecode: 'fundtype',
        editConfig: {
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
          eleCode: 'source_type'
        }
      }
    }
  },
  {
    field: 'bgt_source_',
    title: '指标来源类型',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: 'bgt_source',
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'bgt_source'
        }
      }
    }
  },
  {
    field: 'exp_func_',
    title: '功能分类',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: 'expfunc',
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'expfunc',
          relationcondition: {}
        }
      }
    }
  },
  {
    field: 'gov_bgt_eco_',
    title: '政府预算经济科目分类',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: 'govbgteco',
        editConfig: {
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
    field: 'bgt_rem_',
    title: '指标摘要',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        editConfig: {
          allowInput: true,
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'bgt_rem'
        },
        // 只显示name
        openFormatLabel: true,
        formatter: '#name'
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
    field: 'agency_',
    title: '预算单位',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: 'agency',
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'agency'
        }
      }
    }
  },
  {
    field: 'pay_type_',
    title: '支付方式',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: 'paytype',
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'paytype'
        }
      }
    }
  },
  {
    field: 'pro_',
    title: '支出项目',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        prefix: 'pro_',
        editConfig: {
          initLoadTree: false,
          allowInput: true
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'project',
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
    field: 'is_gov_pur_',
    title: '政采标识',
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
          eleCode: 'is_gov_pur'
        }
      }
    }
  },
  {
    field: 'thr_exp_',
    title: '三公标识',
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
          eleCode: 'thr_exp'
        }
      }
    }
  },
  {
    field: 'budget_level_',
    title: '预算级次',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: 'budgetlevel',
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'budgetlevel'
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
        elecode: 'bgttype',
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'bgttype',
          condition: {
            wheresql: ' and code like \'1%\' '
          }
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
        elecode: 'foundtype',
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'foundtype'
        }
      }
    }
  },
  {
    field: 'is_sal_',
    title: '工资标识',
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
          eleCode: 'is_sal'
        }
      }
    }
  },
  {
    field: 'is_alle_',
    title: '是否扶贫',
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
          eleCode: 'is_alle'
        }
      }
    }
  },
  {
    field: 'is_fun_',
    title: '是否工会经费',
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
          eleCode: 'is_fun'
        }
      }
    }
  },
  {
    field: 'is_dir_',
    title: '直达资金标识',
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
          eleCode: 'is_dir'
        }
      }
    }
  },
  {
    field: 'is_sub_',
    title: '是否补贴到人到企业',
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
          eleCode: 'is_sub'
        }
      }
    }
  },
  {
    field: 'is_mat_',
    title: '是否直达资金的配套',
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
          eleCode: 'is_mat'
        }
      }
    }
  }, {
    field: 'dept_',
    title: '主管部门',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: 'dept',
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'dept'
        }
      }
    }
  }, {
    field: 'ori_pro_',
    title: '来源项目',
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
          eleCode: 'ori_pro'
        },
        // 只显示name
        openFormatLabel: true,
        formatter: '#name'
      }
    }
  }, {
    field: 'adj_doc_no_',
    title: '指标调整文号',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        editConfig: {
          allowInput: true,
          initLoadTree: false
        },
        // 只显示name
        openFormatLabel: true,
        formatter: '#name',
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'adj_doc_no'
        }
      }
    }
  }, {
    field: 'income_sort_',
    title: '收入科目',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: 'income_sort',
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'income_sort'
        }
      }
    }
  },
  {
    field: 'pro_cat_',
    title: '收支类型',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: 'pro_cat',
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'pro_cat'
        }
      }
    }
  },
  {
    field: 'income_pay_type_',
    title: '收支结构',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: 'income_pay_type',
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'income_pay_type'
        }
      }
    }
  },
  {
    field: 'fund_acc_',
    title: '单位资金类型',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: 'fund_acc',
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'fund_acc'
        }
      }
    }
  },
  {
    field: 'acc_type_',
    title: '账户类别',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: 'acc_type',
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'acc_type'
        }
      }
    }
  },
  {
    field: 'current_',
    title: '往来单位',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: 'current',
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'current'
        }
      }
    }
  }
]

export const agencyFormData = {
  bgt_mof_dep_: '', // 资金管理处室
  fund_type_: '', // 资金性质
  source_type_: '', // 指标来源
  bgt_source_: '', // 指标来源类型
  exp_func_: '', // 功能分类
  gov_bgt_eco_: '', // 政府预算经济科目
  dir_: '', // 支出级次
  bgt_rem_: '', // 指标摘要
  amount: '', // 单位指标金额
  version_: '', // 预算来源
  pro_: '', // 支出项目
  agency_: '', // 预算单位
  is_gov_pur_: '', // 政采标识
  thr_exp_: '', // 三公经费
  pay_type_: '', // 支付方式
  manage_mof_dep_: '', // 业务管理处室
  budget_level_: '', // 预算级次
  bgt_type_: '', // 指标类型
  found_type_: '', // 资金来源
  is_sal_: '', // 工资标识
  is_alle_: '', // 是否扶贫
  is_fun_: '', // 是否工会经费
  is_dir_: '', // 直达资金标识
  is_sub_: '', // 是否补贴到人到企业
  is_mat_: '', // 是否直达资金的配套
  dept_: '', // 主管部门
  ori_pro_: '', // 来源项目
  adj_doc_no_: '', // 指标调整文号
  income_sort_: '', // 收入科目
  pro_cat_: '', // 收支类型
  fund_acc_: '', // 单位资金类型
  acc_type_: '', // 账户类别
  current_: '' // 收支类型
}

const modifyCheckData = {
  bgt_mof_dep_: [
    {
      required: true,
      message: '资金管理处室不能为空'
    }
  ],
  manage_mof_dep_: [
    {
      required: true,
      message: '业务主管处室不能为空'
    }
  ],
  // version_: [
  //   {
  //     required: true,
  //     message: '预算来源不能为空'
  //   }
  // ],
  gov_bgt_eco_: [
    {
      required: true,
      message: '政府预算经济科目分类不能为空'
    }
  ],
  amount: [
    {
      required: true,
      message: '指标金额不能为空'
    }
  ],
  fund_type_: [
    {
      required: true,
      message: '资金性质不能为空'
    }
  ],
  source_type_: [
    {
      required: true,
      message: '指标来源不能为空'
    }
  ],
  bgt_source_: [
    {
      required: true,
      message: '指标来源类型不能为空'
    }
  ],
  exp_func_: [
    {
      required: true,
      message: '支出功能科目不能为空'
    }
  ],
  bgt_type_: [
    {
      required: true,
      message: '指标类型不能为空'
    }
  ],
  bgt_rem_: [
    {
      required: true,
      message: '指标摘要不能为空'
    }
  ],
  agency_: [
    {
      required: true,
      message: '预算单位不能为空'
    }
  ],
  pay_type_: [
    {
      required: true,
      message: '支付方式不能为空'
    }
  ],
  pro_: [
    {
      required: true,
      message: '支出项目不能为空'
    }
  ],
  is_gov_pur_: [
    {
      required: true,
      message: '政采标识不能为空'
    }
  ],
  thr_exp_: [
    {
      required: true,
      message: '三公标识不能为空'
    }
  ],
  budget_level_: [
    {
      required: true,
      message: '预算级次不能为空'
    }
  ],
  found_type_: [
    {
      required: true,
      message: '资金来源不能为空'
    }
  ],
  is_sal_: [
    {
      required: true,
      message: '工资标识不能为空'
    }
  ],
  is_alle_: [
    {
      required: true,
      message: '是否扶贫不能为空'
    }
  ],
  is_fun_: [
    {
      required: true,
      message: '是否工会经费不能为空'
    }
  ],
  is_dir_: [
    {
      required: true,
      message: '直达资金标识不能为空'
    }
  ],
  is_sub_: [
    {
      required: true,
      message: '是否补贴到人到企业不能为空'
    }
  ],
  is_mat_: [
    {
      required: true,
      message: '是否直达资金的配套不能为空'
    }
  ],
  pro_cat_: [
    {
      required: true,
      message: '收支类型不能为空'
    }
  ],
  acc_type_: [
    {
      required: true,
      message: '账户类别不能为空'
    }
  ],
  dept_: [
    {
      required: true,
      message: '主管部门不能为空'
    }
  ]
  // income_sort_: [
  //   {
  //     required: true,
  //     message: '收入类型不能为空'
  //   }
  // ]
}

const importCheckData = {
  bgt_mof_dep_: [
    {
      required: true,
      message: '资金管理处室不能为空'
    }
  ],
  manage_mof_dep_: [
    {
      required: true,
      message: '业务主管处室不能为空'
    }
  ],
  gov_bgt_eco_: [
    {
      required: true,
      message: '政府预算经济科目分类不能为空'
    }
  ],
  amount: [
    {
      required: true,
      message: '指标金额不能为空'
    }
  ],
  fund_type_: [
    {
      required: true,
      message: '资金性质不能为空'
    }
  ],
  source_type_: [
    {
      required: true,
      message: '指标来源不能为空'
    }
  ],
  bgt_source_: [
    {
      required: true,
      message: '指标来源类型不能为空'
    }
  ],
  exp_func_: [
    {
      required: true,
      message: '支出功能科目不能为空'
    }
  ],
  bgt_type_: [
    {
      required: true,
      message: '指标类型不能为空'
    }
  ],
  bgt_rem_: [
    {
      required: true,
      message: '指标摘要不能为空'
    }
  ],
  agency_: [
    {
      required: true,
      message: '预算单位不能为空'
    }
  ],
  pay_type_: [
    {
      required: true,
      message: '支付方式不能为空'
    }
  ],
  pro_: [
    {
      required: true,
      message: '支出项目不能为空'
    }
  ],
  is_gov_pur_: [
    {
      required: true,
      message: '政采标识不能为空'
    }
  ],
  thr_exp_: [
    {
      required: true,
      message: '三公标识不能为空'
    }
  ],
  budget_level_: [
    {
      required: true,
      message: '预算级次不能为空'
    }
  ],
  found_type_: [
    {
      required: true,
      message: '资金来源不能为空'
    }
  ],
  is_sal_: [
    {
      required: true,
      message: '工资标识不能为空'
    }
  ],
  is_alle_: [
    {
      required: true,
      message: '是否扶贫不能为空'
    }
  ],
  is_fun_: [
    {
      required: true,
      message: '是否工会经费不能为空'
    }
  ],
  is_dir_: [
    {
      required: true,
      message: '直达资金标识不能为空'
    }
  ],
  is_sub_: [
    {
      required: true,
      message: '是否补贴到人到企业不能为空'
    }
  ],
  is_mat_: [
    {
      required: true,
      message: '是否直达资金的配套不能为空'
    }
  ]
}

export default {
  budgetExecuteCols: columns,
  budgetExecuteBtn: statusBtn,
  budgetMinusColumns: budgetOnlyReadColumns,
  balanceColumns: balanceColumns,
  agencyFormConfigs: agencyFormConfigs,
  agencyFormData: agencyFormData,
  operobj: operobj,
  exeCheckDatas: modifyCheckData,
  importExeCheck: importCheckData
}
