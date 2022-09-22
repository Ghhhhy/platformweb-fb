// 指标管理--》可执行指标
// 界面配置文件
const tableConf = {
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
  // 编辑 附件 操作日志
  gloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      return [
        <a title="操作日志" class="gloable-option-row-optionlog gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'report' })}>操作日志</a>
      ]
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
      field: 'agency_name',
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
}

export default function (tableType, configType) {
  if (tableType && configType) {
    return tableConf[tableType][configType]
  } else if (tableType) {
    return tableConf[tableType]
  } else {
    return null
  }
}
