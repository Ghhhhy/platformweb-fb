// 指标管理--》指标文查询
// 界面配置文件
export const columns = [
  {
    title: '指标文号',
    field: 'name',
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
    title: '发文时间',
    field: 'doc_date',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '标题',
    field: 'bgt_doc_title',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
    }
  },
  {
    title: '备注',
    field: 'bgt_dec',
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
      name: '$gloableOptionRow'
    }
  }
]

export const statusButtons = [
  {
    type: 'button',
    iconName: 'base-daiban.png',
    iconNameActive: 'base-daiban-active.png',
    label: '指标文号',
    code: '1'
  },
  {
    type: 'button',
    iconName: 'base-daiban.png',
    iconNameActive: 'base-daiban-active.png',
    label: '月份',
    code: '2'
  },
  {
    type: 'button',
    iconName: 'base-daiban.png',
    iconNameActive: 'base-daiban-active.png',
    label: '预算单位',
    code: '3'
  }

]

export const curStatusButton = {
  type: 'button',
  code: '1',
  curValue: '1'
}

export const tabStatusNumConfigDefault = {
  '1': 0,
  '2': 0,
  '3': 0
}

export const buttons = [
]

export const buttonsInfos = {
  '1': [
  ]
}

export const lefttreeConfig = {
  curRadio: 'bgtdocno',
  placeholder: '请输入关键字'
}

export const budgetColumns = [
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
    }
  },
  {
    title: '单位主管处室',
    field: 'manage_mof_dep_name',
    width: '200',
    align: 'left',
    itemRender: {
      name: '$input'
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
    field: 'agency_name',
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
    title: '指标金额',
    field: 'amount',
    width: '150',
    align: 'right',
    formatter: 'formatMoney',
    combinedType: ['average', 'total']
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
    field: 'gov_bgt_eco_',
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
    title: '支出级次',
    field: 'dir_name',
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
  }
]
