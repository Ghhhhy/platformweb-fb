export const deptcolumns = [
  {
    title: '指标文号',
    field: 'cor_bgt_doc_no',
    width: '200',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '资金管理处室',
    field: 'bgt_mof_dep_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '可用额度',
    field: 'canuse_amt',
    formatter: 'formatMoney',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '调剂额度',
    field: 'swap_amt',
    formatter: 'formatMoney',
    width: '150',
    editRender: {
      name: '$moneyRender',
      props: {
        type: 'money'
      }
    }
  },
  {
    title: '资金性质',
    field: 'fund_type_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '指标来源类型',
    field: 'bgt_source_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '功能分类',
    field: 'exp_func_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '政府预算经济科目分类',
    field: 'gov_bgt_eco',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '支出级次',
    field: 'dir_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '指标摘要',
    field: 'bgt_rem_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '预算来源',
    field: 'version_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  }
]

export const agencycolumns = [
  {
    title: '资金管理处室',
    field: 'bgt_mof_dep_',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
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
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '资金性质',
    field: 'fund_type_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '指标来源类型',
    field: 'bgt_source_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '可用额度',
    field: 'canuse_amt',
    formatter: 'formatMoney',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '调剂额度',
    field: 'swap_amt',
    formatter: 'formatMoney',
    width: '150',
    editRender: {
      name: '$moneyRender',
      props: {
        type: 'money'
      }
    }
  },
  {
    title: '功能分类',
    field: 'exp_func_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '政府预算经济科目分类',
    field: 'gov_bgt_eco',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '指标摘要',
    field: 'bgt_rem_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '预算来源',
    field: 'version_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '预算单位',
    field: 'agency_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '支付方式',
    field: 'pay_type_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '支出项目',
    field: 'pro_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
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
    title: '预算级次',
    field: 'budget_level_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '指标类型',
    field: 'bgt_type_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '资金来源',
    field: 'found_type_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '工资标识',
    field: 'is_sal_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '是否扶贫',
    field: 'is_alle_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '是否工会经费',
    field: 'is_fun_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '直达资金标识',
    field: 'is_dir_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '是否补贴到人到企业',
    field: 'is_sub_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '是否直达资金的配套',
    field: 'is_mat_name',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  }
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
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'fundtype'
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
        elecode: 'bgtsource',
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'bgtsource'
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
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'expfunc'
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
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'govbgteco'
        }
      }
    }
  },
  {
    field: 'dir_',
    title: '支出级次',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: 'bgtdir',
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'bgtdir'
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
        elecode: 'bgt_rem',
        editConfig: {
          allowInput: true
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'bgt_rem'
        }
      }
    }
  },
  // {
  //   field: 'amount',
  //   title: '金额',
  //   span: 8,
  //   itemRender: {
  //     name: '$vxeFormInput',
  //     props: {
  //       type: 'float',
  //       placeholder: '金额'
  //     }
  //   }
  // },
  {
    field: 'version_',
    title: '预算来源',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: 'bgtversion',
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'bgtversion'
        }
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
        elecode: 'project',
        editConfig: {
          allowInput: true
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'project'
        }
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
        elecode: 'is_gov_pur',
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
        elecode: 'thr_exp',
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
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'bgttype'
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
        elecode: 'is_sal',
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
        elecode: 'is_alle',
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
        elecode: 'is_fun',
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
        elecode: 'is_dir',
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
        elecode: 'is_sub',
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
        elecode: 'is_mat',
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'is_mat'
        }
      }
    }
  }
]

export const agencyFromCheck = {
  is_alle_: [
    {
      required: true,
      message: '本级支出-扶贫资金标识不能为空'
    }
  ]
}

export const agencyFormData = {
  bgt_mof_dep_: '', // 资金管理处室
  fund_type_: '', // 资金性质
  source_type_: '', // 指标来源
  bgt_source_: '', // 指标来源
  exp_func_: '', // 功能分类
  gov_bgt_eco_: '', // 政府预算经济科目分类
  dir_: '', // 支出级次
  bgt_rem_: '', // 指标摘要
  version_: '', // 预算来源
  hold2_: '', // 预算单位支出管理结构
  pro_: '', // 支出项目
  agency_: '', // 预算单位
  is_gov_pur_: '', // 政采标识
  thr_exp_: '', // 三公经费
  pay_type_: '', // 支付方式
  manage_mof_dep_: '', // 业务管理处室
  budget_level_: '', // 预算级次
  bgt_type_: '', // 预算级次
  found_type_: '', // 资金来源
  is_sal_: '', // 工资标识
  is_alle_: '', // 是否扶贫
  is_fun_: '', // 是否工会经费
  is_dir_: '', // 直达资金标识
  is_sub_: '', // 是否补贴到人到企业
  is_mat_: '' // 是否直达资金的配套
}

export default {

}
