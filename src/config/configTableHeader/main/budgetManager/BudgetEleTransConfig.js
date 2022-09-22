// 指标管理--》要素转换
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
  rowbutton: {
    wss: {
      renderDefault(h, cellRender, params, context) {
        let self = context.$grid.$parent
        let { row, column } = params
        return [
          <a title="编辑" class="gloable-option-row-edit gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'edit' })}>编辑</a>,
          <a title="操作日志" class="gloable-option-row-optionlog gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'report' })}>操作日志</a>
        ]
      }
    },
    yss: {
      renderDefault(h, cellRender, params, context) {
        let self = context.$grid.$parent
        let { row, column } = params
        return [
          <a title="操作日志" class="gloable-option-row-optionlog gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'report' })}>操作日志</a>
        ]
      }
    }
  },
  tableColumns: [
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
      width: '200',
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
      width: '150',
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
  ],
  eleTransColumns: [
    {
      title: '模板名称',
      field: 'template_name',
      width: '280',
      itemRender: {
        name: '$vxeFormInput',
        props: {
          disabled: true,
          type: 'text'
        }
      }
    },
    {
      field: 'old_dicds_name',
      title: '原要素',
      width: '280',
      formatter: '',
      itemRender: {
        disabled: true,
        name: '$formMoneyInputRender',
        props: {
          type: 'float',
          disabled: true,
          placeholder: '原要素'
        }
      }
    },
    {
      title: '原值',
      field: 'old_ele_name',
      width: '280',
      itemRender: {
        name: '$vxeFormInput',
        props: {
          type: 'text',
          disabled: true
        }
      }
    },
    {
      title: '新要素',
      field: 'new_dicds_name',
      width: '280',
      itemRender: {
        name: '$vxeFormInput',
        props: {
          type: 'text',
          disabled: true
        }
      }
    },
    {
      title: '新值',
      field: 'new_ele_name',
      width: '280',
      itemRender: {
        name: '$vxeFormInput',
        props: {
          type: 'text',
          disabled: true
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
