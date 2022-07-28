// 指标管理--》部门预算复核
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
      moneyConversion: true, // 是否有金额转换
      disabledMoneyConversion: false, // --統一修改為可以切換的，20211008
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
      title: '业务主管处室',
      field: 'manage_mof_dep_name',
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
      title: '部门预算收入',
      field: 'dep_income_source_name',
      width: '200',
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'text'
        }
      }
    },
    {
      title: '预算级次',
      field: 'budget_level_name',
      width: '200',
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'text'
        }
      }
    },
    {
      title: '预算单位',
      field: 'agency_name',
      width: '200',
      editRender: {
        name: '$input'
      }
    },
    {
      title: '收入分类科目',
      field: 'income_sort_name',
      width: '200',
      editRender: {
        name: '$input'
      }
    },
    {
      title: '支出项目',
      field: 'pro_name',
      width: '200',
      editRender: {
        name: '$input'
      }
    },
    {
      title: '预算数',
      field: 'bgt_amt',
      width: '200',
      align: 'right',
      formatter: 'formatMoney',
      combinedType: ['average', 'total']
    },
    {
      title: '资金性质',
      field: 'fund_type_name',
      width: '200',
      editRender: {
        name: '$input'
      }
    },
    {
      title: '本级指标文号',
      field: 'cor_bgt_doc_no',
      width: '200',
      editRender: {
        name: '$input'
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
