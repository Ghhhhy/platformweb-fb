// 指标管理--》支付方式确认
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
    // formatter: 'formatMoney',
    cellRender: {
      name: '$moneyRender'
    },
    type: 'number',
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
    field: 'exp_func',
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
    title: '政府预算经济科目分类',
    field: 'gov_bgt_eco',
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
    title: '部门支出经济科目分类',
    field: 'dep_bgt_eco',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input',
      props: {
        type: 'text'
      }
    },
    formatter: (value, column) => {
      if (value && value['row'] && value['row']['dep_bgt_eco_code']) {
        return value['row']['dep_bgt_eco_code'] + ' - ' + value['row']['dep_bgt_eco_name']
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
    title: '确认时间',
    field: 'operation_time',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  }
]

export const modifyFormData = {
  pay_type_: '', // 支付方式
  remark: '', // 备注
  acc_type_: '' // 账户类型
}
export let insertFormItems = [
  {
    field: 'pay_type_',
    title: '支付方式',
    span: 12,
    itemRender: {
      name: '$formTreeInput',
      props: {
        disabled: false,
        isleaf: true,
        isServer: true,
        elecode: 'paytype',
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'paytype'
        }
      }
    }
  },
  {
    field: 'acc_type_',
    title: '账户类型',
    span: 12,
    itemRender: {
      name: '$formTreeInput',
      props: {
        disabled: false,
        isServer: true,
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'acc_type',
          condition: {
            wheresql: ' and code in (\'21\',\'22\') '
          }
        }
      }
    }
  },
  {
    field: 'remark',
    title: '备注',
    span: 24,
    itemRender: {
      name: '$textarea',
      props: {
        disabled: false,
        type: '$textarea',
        placeholder: '备注'
      }
    }
  }
]
export default {
  budgetConfirmCols: columns,
  budgetModifyFormData: modifyFormData,
  budgetModifyFormItems: insertFormItems
}
