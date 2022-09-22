// 指标管理--》资金安排
// 界面配置文件
// 界面表格配置
export const tableColumns = [
  {
    title: '资金管理处室',
    field: 'bgt_mof_dep_name',
    width: '200',
    align: 'left',
    editRender: {
      name: '$input'
    }
  },
  {
    title: '单位主管处室',
    field: 'manage_mof_dep_name',
    width: '200',
    align: 'left',
    editRender: {
      name: '$input'
    }
  },
  {
    title: '指标文号',
    field: 'cor_bgt_doc_no',
    width: '200',
    align: 'left',
    editRender: {
      name: '$input'
    }
  },
  {
    title: '预算单位',
    field: 'agency',
    width: '200',
    align: 'left',
    editRender: {
      name: '$input'
    }
  },
  {
    title: '支出项目',
    field: 'pro_name',
    width: '200',
    align: 'left',
    editRender: {
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
    editRender: {
      name: '$input'
    }
  },
  {
    title: '预算级次',
    field: 'budget_level_name',
    width: '200',
    align: 'left',
    editRender: {
      name: '$input'
    }
  },
  {
    title: '功能科目',
    field: 'exp_func_',
    width: '200',
    align: 'left',
    editRender: {
      name: '$input'
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
    editRender: {
      name: '$input'
    },
    formatter: (value, column) => {
      if (value && value['row'] && value['row']['gov_bgt_eco_name']) {
        return value['row']['gov_bgt_eco_code'] + ' - ' + value['row']['gov_bgt_eco_name']
      }
      return ''
    }
  },
  {
    title: '指标类型',
    field: 'bgt_type_name',
    width: '200',
    align: 'left',
    editRender: {
      name: '$input'
    }
  },
  {
    title: '指标来源',
    field: 'source_type_name',
    width: '200',
    align: 'left',
    editRender: {
      name: '$input'
    }
  }
]

export const deptcolumns = [
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
        <a class="gloable-option-row-optionlog gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'report' })}>操作日志</a>
      ]
    }
  }
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
