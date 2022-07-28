export const deptcolumns = [
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
    title: '资金管理处室',
    field: 'bgt_mof_dep_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '业务主管处室',
    field: 'manage_mof_dep_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '金额',
    field: 'amount',
    formatter: 'formatMoney',
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
    title: '可核销金额',
    field: 'canuseamt',
    formatter: 'formatMoney',
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
    title: '资金性质',
    field: 'fund_type_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '指标来源类型',
    field: 'bgt_source_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '功能分类',
    field: 'exp_func_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '政府预算经济科目分类',
    field: 'gov_bgt_eco_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '指标摘要',
    field: 'bgt_rem_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  }
]

export const agencycolumns = [
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
    title: '资金管理处室',
    field: 'bgt_mof_dep_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '业务主管处室',
    field: 'manage_mof_dep_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '资金性质',
    field: 'fund_type_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '指标来源类型',
    field: 'bgt_source_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '金额',
    field: 'amount',
    formatter: 'formatMoney',
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
    title: '功能分类',
    field: 'exp_func_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '指标摘要',
    field: 'bgt_rem_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '预算单位',
    field: 'agency_name',
    width: '150',
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
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '支出项目',
    field: 'pro_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '政采标识',
    field: 'is_gov_pur_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '三公经费',
    field: 'thr_exp_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '预算级次',
    field: 'budget_level_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '指标类型',
    field: 'bgt_type_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '资金来源',
    field: 'found_type_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '工资标识',
    field: 'is_sal_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '是否扶贫',
    field: 'is_alle_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '是否工会经费',
    field: 'is_fun_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '直达资金标识',
    field: 'is_dir_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '是否补贴到人到企业',
    field: 'is_sub_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '是否直达资金的配套',
    field: 'is_mat_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  }
]

export const executecolumns = [
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
    title: '资金管理处室',
    field: 'bgt_mof_dep_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '业务主管处室',
    field: 'manage_mof_dep_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '资金性质',
    field: 'fund_type_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '指标来源类型',
    field: 'bgt_source_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '金额',
    field: 'amount',
    formatter: 'formatMoney',
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
    title: '可核销金额',
    field: 'canuseamt',
    formatter: 'formatMoney',
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
    title: '功能分类',
    field: 'exp_func_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '政府预算经济科目分类',
    field: 'gov_bgt_eco_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '指标摘要',
    field: 'bgt_rem_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '预算单位',
    field: 'agency_name',
    width: '150',
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
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '支出项目',
    field: 'pro_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '政采标识',
    field: 'is_gov_pur_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '三公经费',
    field: 'thr_exp_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '预算级次',
    field: 'budget_level_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '指标类型',
    field: 'bgt_type_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '资金来源',
    field: 'found_type_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '工资标识',
    field: 'is_sal_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '是否扶贫',
    field: 'is_alle_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '是否工会经费',
    field: 'is_fun_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '直达资金标识',
    field: 'is_dir_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '是否补贴到人到企业',
    field: 'is_sub_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '是否直达资金的配套',
    field: 'is_mat_name',
    width: '150',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  }
]

export const queryFormConfig = [
  {
    title: '业务主管处室',
    field: 'manage_mof_dep_',
    itemRender: {
      name: '$formTreeInput',
      props: {
        isleaf: true,
        reloaddata: true,
        isServer: true,
        ajaxType: 'post',
        placeholder: '业务主管处室',
        editConfig: { placeholder: '业务主管处室', initLoadTree: false },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'manage_mof_dep'
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
        isleaf: true,
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
  }
]

export const queryFormBaseData = {
  manage_mof_dep_: '',
  agency_: ''
}
