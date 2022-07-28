// 指标管理--》指标调剂子控件配置
// 界面配置文件
export const topBudgetColumnConfig = [
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
    title: '指标额度',
    field: 'avi_amt',
    width: '200',
    align: 'right',
    formatter: 'formatMoney',
    // 金额格式
    cellRender: {
      name: '$moneyRender'
    }
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
    }
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
    }
  },
  {
    title: '本次申请金额',
    field: 'amount',
    width: '150',
    editRender: {
      name: '$moneyRender',
      props: {
        type: 'money',
        placeholder: '金额'
      }
    }
  }
]

export const bottomBudgetColumnConfig = [
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
    title: '指标额度',
    field: 'avi_amt',
    width: '200',
    align: 'right',
    formatter: 'formatMoney',
    // 金额格式
    cellRender: {
      name: '$moneyRender'
    }
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
    }
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
    }
  },
  {
    title: '本次调减金额',
    field: 'amount',
    width: '150',
    editRender: {
      name: '$moneyRender',
      props: {
        type: 'money',
        placeholder: '金额'
      }
    }
  }
]

export const balanceColumnConfig = [
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
    field: 'bgt_mof_dep',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '资金性质',
    field: 'fund_type',
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
    field: 'found_type',
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
    field: 'bgt_type',
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
    title: '指标额度',
    field: 'avi_amt',
    width: '200',
    align: 'right',
    formatter: 'formatMoney',
    // 金额格式
    cellRender: {
      name: '$moneyRender'
    }
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
    }
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
    }
  }
]

export const tableBarConfig = {
  moneyConversion: false,
  calculator: false,
  export: false,
  zoom: false,
  custom: false,
  refresh: false
}
