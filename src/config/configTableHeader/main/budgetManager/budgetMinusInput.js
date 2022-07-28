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
    field: 'gov_bgt_eco',
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
    title: '支出级次',
    field: 'dir_name',
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
  },
  {
    title: '预算来源',
    field: 'version_name',
    width: '200',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        type: 'text',
        disabled: true
      }
    }
  }
]

export const budgetMinusItems = [
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
    title: '业务主管处室',
    field: 'manage_mof_dep_name',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    title: '资金性质',
    field: 'fund_type_name',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    title: '指标来源类型',
    field: 'bgt_source_name',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    title: '功能分类',
    field: 'exp_func_name',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    title: '政府预算经济科目分类',
    field: 'gov_bgt_eco',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    title: '指标摘要',
    field: 'bgt_rem_name',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    title: '预算来源',
    field: 'version_name',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    title: '预算单位',
    field: 'agency_name',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    title: '支付方式',
    field: 'pay_type_name',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    title: '支出项目',
    field: 'pro_name',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    title: '政采标识',
    field: 'is_gov_pur_name',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    title: '三公经费',
    field: 'thr_exp_name',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    title: '预算级次',
    field: 'budget_level_name',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    title: '指标类型',
    field: 'bgt_type_name',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    title: '资金来源',
    field: 'found_type_name',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    title: '工资标识',
    field: 'is_sal_name',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    title: '是否扶贫',
    field: 'is_alle_name',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    title: '是否工会经费',
    field: 'is_fun_name',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    title: '直达资金标识',
    field: 'is_dir_name',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    title: '是否补贴到人到企业',
    field: 'is_sub_name',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  },
  {
    title: '是否直达资金的配套',
    field: 'is_mat_name',
    itemRender: {
      name: '$vxeFormInput',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  }
]

export const minusFormData = {
  bgt_mof_dep_name: '', // 资金管理处室
  fund_type_name: '', // 资金性质
  source_type_name: '', // 指标来源
  bgt_source_name: '', // 指标来源
  exp_func_name: '', // 功能分类
  gov_bgt_eco_name: '', // 政府预算经济科目分类
  dir_name: '', // 支出级次
  bgt_rem_name: '', // 指标摘要
  version_name: '', // 预算来源
  pro_name: '', // 支出项目
  agency_name: '', // 预算单位
  is_gov_pur_name: '', // 政采标识
  thr_exp_name: '', // 三公经费
  pay_type_name: '', // 支付方式
  manage_mof_dep_name: '', // 业务管理处室
  budget_level_name: '', // 预算级次
  bgt_type_name: '', // 预算级次
  found_type_name: '', // 资金来源
  is_sal_name: '', // 工资标识
  is_alle_name: '', // 是否扶贫
  is_fun_name: '', // 是否工会经费
  is_dir_name: '', // 直达资金标识
  is_sub_name: '', // 是否补贴到人到企业
  is_mat_name: '' // 是否直达资金的配套
}

export const batchMinusConfig = [
  {
    field: 'minustype',
    title: '调减方式',
    span: 12,
    itemRender: {
      name: '$vxeFormRadio',
      options: [
        {
          value: 0,
          label: '金额'
        },
        {
          value: 1,
          label: '比例'
        }
      ]
    }
  },
  {
    field: 'minusRemain',
    title: '调减剩余额度',
    span: 20,
    itemRender: {
      name: '$vxeFormInput',
      props: {
        type: 'float',
        placeholder: '调减剩余额度'
      }
    }
  },
  {
    field: 'minusAll',
    title: '调减全部额度',
    span: 20,
    itemRender: {
      name: '$vxeFormInput',
      props: {
        type: 'float',
        placeholder: '调减全部额度'
      }
    }
  }
]

export const batchMinusData = {
  minustype: 0,
  minusRemain: '',
  minusAll: ''
}

export default {}
