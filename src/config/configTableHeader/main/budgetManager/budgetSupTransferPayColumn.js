// 指标管理--》上级转移支付提前下达录入
// 界面配置文件
export const columns = [
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
      name: '$input'
    }
  },
  {
    title: '转移支付功能分类科目',
    field: 'tp_func_',
    width: 120,
    align: 'left',
    itemRender: {
      name: '$input'
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
    title: '下达时间',
    field: 'create_time',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  }
]

export const columnsAudit = [
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
    title: '下达时间',
    field: 'create_time',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  }
]

export const agencyFormConfigs = [
  {
    field: 'is_rp_',
    title: '下达类型',
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
          eleCode: 'is_rp',
          condition: {
            wheresql: ''
          }
        }
      }
    }
  },
  {
    field: 'input_date',
    title: '录入日期',
    itemRender: {
      name: '$vxeFormTime',
      format: 'YYYY-MM-DD'
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
    field: 'special_manager_',
    title: '专管员',
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
          eleCode: 'specialmanager',
          dept_id: ''
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
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'fundtype',
          condition: {
            wheresql: ' and (code like \'1%\' or code like \'2%\') '
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
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'foundtype',
          condition: {
            wheresql: ' and (code like \'1%\' or code like \'2%\') '
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
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'source_type',
          condition: {
            // wheresql: ' and code = \'1\' '
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
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'bgt_type',
          condition: {
            // wheresql: ' and code = \'21\' '
          }
        }
      }
    }
  },
  {
    field: 'fund_category_',
    title: '资金类别',
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
          eleCode: 'fund_category',
          condition: {
            wheresql: ' and (code like \'1%\' or code like \'2%\') '
          }
        }
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
            wheresql: ' and code like \'230%\' '
          }
        }
      }
    }
  },
  {
    field: 'tp_func_',
    title: '支出功能科目（约束下级）',
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
            wheresql: ' and code not like \'230%\' '
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
        prefix: 'pro_',
        editConfig: {
          allowInput: true,
          initLoadTree: false
        },
        queryByInput: true,
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'pro',
          condition: {
            wheresql: ''
          }
        }
      }
    }
  },
  {
    field: 'is_track',
    title: '是否追踪',
    span: 8,
    itemRender: {
      name: '$vxeFormSelect',
      options: [
        {
          value: 1,
          label: '是'
        },
        {
          value: 2,
          label: '否'
        }
      ],
      props: {
        placeholder: '请选择',
        disabled: false
      }
    }
  },
  {
    field: 'is_fgjjtzbs_',
    title: '发改基建投资标识',
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
          eleCode: 'is_fgjjtzbs'
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
    field: 'is_rt_',
    title: '部门预算/执行中下达',
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
          eleCode: 'is_rt'
          // condition: {
          //   wheresql: ' and code = \'1\' '
          // }
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
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'budget_level',
          condition: {
            wheresql: ' and code = \'1\' '
          }
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
    field: 'balanced_budget_amount',
    title: '平衡预算金额',
    span: 8,
    itemRender: {
      name: '$vxeFormInput',
      props: {
        type: 'float',
        placeholder: '平衡预算金额'
      }
    }
  },
  {
    field: 'unit',
    title: '金额单位',
    span: 8,
    itemRender: {
      name: '$vxeFormSelect',
      options: [
        {
          value: 100000000,
          label: '亿元'
        },
        {
          value: 10000,
          label: '万元'
        },
        {
          value: 1,
          label: '元'
        }
      ]
    }
  }
]

export const agencyFormData = {
  bgt_mof_dep_: '', // 指标管理处
  fund_type_: '', // 资金性质
  source_type_: '', // 指标来源
  bgt_source_: '', // 指标类型
  bgt_type_: '', // 指标类型
  exp_func_: '', // 功能分类
  gov_bgt_eco_: '', // 政府支出经济分类
  amount: '', // 单位指标金额
  pro_: '', // 支出项目
  found_type_: '', // 资金来源
  is_dir_: '', // 直达资金标识
  is_rp_: '', // 下达类型
  input_date: '', // 录入日期
  is_track: '', // 是否追踪
  track_pro_: '', // 追踪项目
  budget_level_: '', // 预算级次
  pro_cat_: '', // 项目类别
  fund_category_: '', // 资金类别
  bgt_exe_flag: '1', // 可执行标志
  tp_func_: '', // 支出功能分类（约束下级）
  is_fgjjtzbs_: '', // 发改基建投资标识
  special_manager_: '', // 专管员
  balanced_budget_amount: '', // 平衡预算金额
  is_rt_: '',
  unit: 10000
}

export const insertDefaultData = {
  bgt_mof_dep_id: '',
  bgt_mof_dep_code: '',
  bgt_mof_dep_name: '',
  is_rt_id: '22E2DF7C75A9A115E050A8C06A014D11',
  is_rt_code: '1',
  is_rt_name: '执行中下达',
  gov_bgt_eco_id: 'CAA26A5090484645A143C326B363E5CF',
  gov_bgt_eco_code: '51301',
  gov_bgt_eco_name: '上下级政府间转移性支出',
  budget_level_id: '636539161d0c11eb8728fa163e8b0246',
  budget_level_code: '1',
  budget_level_name: '中央级',
  is_dir_id: '8850d6f51d0c11eb8728fa163e8b0246',
  is_dir_code: '09',
  is_dir_name: '其他'
}
