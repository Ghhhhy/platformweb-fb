// 指标管理--》部门预算复核
// 界面配置文件
// 收入指标
export const incomeBudget = [
  {
    title: '预算级次',
    field: 'budget_level_name',
    width: '270',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '收入分类科目',
    field: 'income_sort_name',
    width: '270',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '预算数',
    field: 'bgt_amt',
    width: '270',
    align: 'right',
    formatter: 'formatMoney',
    combinedType: ['average', 'total']
  },
  {
    title: '资金性质',
    field: 'fund_type_name',
    width: '270',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '生成时间',
    field: 'create_time',
    width: '270',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  }
]

// 收入预算财政资金 支出指标（待分）
export const payoutDept = [
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
    title: '业务主管处室',
    field: 'manage_mof_dep_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '指标管理处室',
    field: 'bgt_mof_dep_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '项目',
    field: 'pro_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '指标金额',
    field: 'amount',
    width: '150',
    align: 'right',
    // 金额格式
    cellRender: {
      name: '$moneyRender'
    },
    type: 'number',
    combinedType: ['average', 'total']
  },
  {
    title: '功能科目',
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
    title: '政府支出经济分类',
    field: 'gov_bgt_eco',
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
    title: '资金性质',
    field: 'fund_type_name',
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
    title: '指标来源类型',
    field: 'bgt_source_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
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
    title: '预算级次',
    field: 'budget_level_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '收支类型（收支管理）',
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
    title: '来源项目',
    field: 'ori_pro_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '来源文号',
    field: 'sup_bgt_doc_no_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '生成时间',
    field: 'create_time',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  }
]

// 支出预算单位资金  本级支出指标
export const payoutAgency = [
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
    title: '业务主管处室',
    field: 'manage_mof_dep_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '指标管理处室',
    field: 'bgt_mof_dep_name',
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
    }
  },
  {
    title: '项目',
    field: 'pro_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '指标金额',
    field: 'amount',
    width: '150',
    align: 'right',
    // 金额格式
    cellRender: {
      name: '$moneyRender'
      // props: { type: 'float', min: 0 }
    },
    type: 'number',
    // combinedType: [ 'average', 'total' ]
    combinedType: ['average', 'subTotal', 'total', 'totalAll']
  },
  {
    title: '年初数下达金额',
    field: 'bgt_amount',
    width: '150',
    align: 'right',
    // 金额格式
    cellRender: {
      name: '$moneyRender'
    },
    type: 'number',
    combinedType: ['average', 'subTotal', 'total', 'totalAll']
  },
  {
    title: '功能科目',
    field: 'exp_func',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input',
      props: {
        type: 'treeinput'
      }
    }
  },
  {
    title: '政府支出经济分类',
    field: 'gov_bgt_eco',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input',
      props: {
        type: 'treeinput'
      }
    }
  },
  {
    title: '资金性质',
    field: 'fund_type_name',
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
    title: '指标来源类型',
    field: 'bgt_source_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
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
    title: '指标来源',
    field: 'source_type_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
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
    title: '指标摘要',
    field: 'bgt_rem_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '三公经费',
    field: 'thr_exp_name',
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
    title: '是否包含政府采购预算',
    field: 'is_gov_pur_name',
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
    title: '预算级次',
    field: 'budget_level_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '收支类型（收支管理）',
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
    title: '来源项目',
    field: 'ori_pro_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '来源文号',
    field: 'sup_bgt_doc_no_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '生成时间',
    field: 'create_time',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  }
]

// 支出预算单位资金  对下转移支付
export const toAgencyPayoutBudget = [
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
    title: '业务主管处室',
    field: 'manage_mof_dep_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '指标管理处室',
    field: 'bgt_mof_dep_name',
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
    }
  },
  {
    title: '项目',
    field: 'pro_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '指标金额',
    field: 'amount',
    width: '150',
    align: 'right',
    // 金额格式
    cellRender: {
      name: '$moneyRender'
      // props: { type: 'float', min: 0 }
    },
    type: 'number',
    // combinedType: [ 'average', 'total' ]
    combinedType: ['average', 'subTotal', 'total', 'totalAll']
  },
  {
    title: '功能科目',
    field: 'exp_func',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input',
      props: {
        type: 'treeinput'
      }
    }
  },
  {
    title: '政府支出经济分类',
    field: 'gov_bgt_eco',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input',
      props: {
        type: 'treeinput'
      }
    }
  },
  {
    title: '资金性质',
    field: 'fund_type_name',
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
    title: '指标来源类型',
    field: 'bgt_source_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
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
    title: '指标来源',
    field: 'source_type_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
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
    title: '指标摘要',
    field: 'bgt_rem_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '三公经费',
    field: 'thr_exp_name',
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
    title: '是否包含政府采购预算',
    field: 'is_gov_pur_name',
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
    title: '预算级次',
    field: 'budget_level_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '收入分类科目',
    field: 'income_sort_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '收支类型（收支管理）',
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
    title: '来源项目',
    field: 'ori_pro_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '来源文号',
    field: 'sup_bgt_doc_no_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '生成时间',
    field: 'create_time',
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
      { code: 'toolbar-file', name: '附件' },
      // { code: 'toolbar-download', name: '下载附件' },
      { code: 'toolbar-confirm', name: '确认' },
      { code: 'toolbar-delete', name: '删除' }
    ]
  },
  buttonStausConfig2: {
    moneyConversion: false,
    buttons: [
      { code: 'toolbar-refresh', name: '刷新' },
      { code: 'toolbar-cancel', name: '撤销' }
    ]
  }
}

export default {
  incomeBudget: incomeBudget,
  payoutDept: payoutDept,
  payoutAgency: payoutAgency,
  toAgencyPayoutBudget: toAgencyPayoutBudget,
  budgetInitBtn: statusBtn
}
