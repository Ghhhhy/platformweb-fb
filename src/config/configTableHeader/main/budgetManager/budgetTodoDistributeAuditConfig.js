// 指标管理--》待分指标审核
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
  },
  tableColumns: [
    {
      title: '指标明细号',
      field: 'voucher_no',
      width: '200',
      align: 'left',
      filterRender: {
        name: 'input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '指标文号',
      field: 'cor_bgt_doc_no',
      width: '200',
      align: 'left',
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
      width: '200',
      align: 'left',
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
      align: 'right',
      width: '150',
      formatter: 'formatMoney',
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
      width: '200',
      align: 'left',
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
      width: '200',
      align: 'left',
      filterRender: {
        name: 'input',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '功能分类',
      field: 'exp_func_',
      width: '250',
      align: 'left',
      filterRender: {
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
      field: 'gov_bgt_eco',
      width: '250',
      align: 'left',
      filterRender: {
        name: 'input',
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
      width: '200',
      align: 'left',
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
      width: '200',
      align: 'left',
      filterRender: {
        name: 'input',
        props: {
          type: 'text'
        }
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
