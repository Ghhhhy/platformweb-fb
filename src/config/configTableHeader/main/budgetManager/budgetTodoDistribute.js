// 页面：指标管理 => 指标特殊转换规则
// 指标特殊转换规则主表. 表头配置 2020-09-03
// 开发：lw
// import Store from './node_modules/@/utils/store'

export const columns = [
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
    title: '指标额度',
    field: 'avi_amt',
    width: '150',
    align: 'right',
    formatter: 'formatMoney',
    filterRender: {
      name: '$vxeFormInput',
      props: {
        type: 'float'
      }
    }
  },
  {
    title: '已用额度',
    field: 'use_amt',
    width: '150',
    align: 'right',
    formatter: 'formatMoney',
    filterRender: {
      name: '$vxeFormInput',
      props: {
        type: 'float'
      }
    }
  },
  {
    title: '可用额度',
    field: 'canuse_amt',
    width: '150',
    align: 'right',
    formatter: 'formatMoney',
    filterRender: {
      name: '$vxeFormInput',
      props: {
        type: 'float'
      }
    }
  },
  {
    title: '指标金额',
    field: 'amount',
    width: '150',
    align: 'right',
    formatter: 'formatMoney',
    filterRender: {
      name: '$vxeFormInput',
      props: {
        type: 'float'
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
    width: '200',
    align: 'left',
    filterRender: {
      name: 'input',
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
    width: '200',
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

export let insertFormItems = [
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
          eleCode: 'department'
        }
      }
    }
  },
  {
    field: 'dept_',
    title: '主管部门',
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
          eleCode: 'dept'
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
        editConfig: {
          initLoadTree: false
        },
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
        editConfig: {
          initLoadTree: false
        },
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
        editConfig: {
          initLoadTree: false
        },
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
        editConfig: {
          initLoadTree: false
        },
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
        editConfig: {
          allowInput: true,
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'bgt_rem'
        }
      }
    }
  },
  {
    field: 'amount',
    title: '指标金额',
    span: 8,
    itemRender: {
      name: '$vxeFormInput',
      props: {
        type: 'float',
        placeholder: '指标金额'
      }
    }
  },
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
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'bgtversion'
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
        editConfig: {
          allowInput: true,
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'project'
        },
        // 只显示name
        openFormatLabel: true,
        formatter: '#name'
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
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'department'
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
        editConfig: {
          initLoadTree: false
        },
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
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'foundtype'
        }
      }
    }
  }
]

export const insertFormData = {
  bgt_mof_dep_: '', // 资金管理处室
  pro_: '', // 项目
  fund_type_: '', // 资金性质
  source_type_: '', // 指标来源
  exp_func_: '', // 功能分类
  gov_bgt_eco_: '', // 政府预算经济科目分类
  dir_: '', // 支出级次
  bgt_rem_: '', // 指标摘要
  amount: '', // 指标金额
  version_: '', // 预算来源
  manage_mof_dep_: '', // 业务主管处室
  budget_level_: '', // 预算级次
  bgt_type_: '', // 指标类型
  found_type_: '',
  dept_: '' // 主管部门
}

export const bgtadjinputcolumns = [
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
  },
  {
    title: '操作',
    field: 'oper',
    className: 'gloableOptionRow',
    align: 'center',
    fixed: 'right',
    sortable: false,
    filters: false,
    width: 140,
    cellRender: {
      name: '$operTodo'
    }
  }
]

export const columnscheck = [
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
  },
  {
    title: '操作',
    field: 'oper_check',
    className: 'gloableOptionRow',
    align: 'center',
    fixed: 'right',
    sortable: false,
    filters: false,
    width: 140,
    cellRender: {
      name: '$operTodo_check'
    }
  }
]

export let statusBtn = {
  buttonStausConfig0: {
    moneyConversion: false,
    buttons: [
      { code: 'toolbar-refresh', name: '刷新' },
      { code: 'toolbar-insert', name: '新增', actionType: '1', glType: '1', actionName: '新增', action: '' },
      { code: 'toolbar-distribute', name: '分配', actionType: '1', glType: '1', actionName: '可执行指标分配' },
      { code: 'toolbar-adjust', name: '调剂', actionType: '1', glType: '1', actionName: '待分指标调剂' }
      // { code: 'toolbar-minus', name: '调减', actionType: '1', glType: '1', actionName: '待分指标调减' }
    ]
  },
  buttonStausConfig1: {
    moneyConversion: false,
    buttons: [
      { code: 'toolbar-refresh', name: '刷新' },
      // { code: 'toolbar-insert', name: '新增', actionType: '1', glType: '1', actionName: '录入', action: '' },
      { code: 'toolbar-update', name: '修改', actionType: '4', glType: '2', actionName: '修改', action: 'modify' },
      { code: 'toolbar-audit', name: '送审', actionType: '2', glType: '0', actionName: '送审', action: 'audit' },
      { code: 'toolbar-delete', name: '作废', actionType: '5', glType: '5', actionName: '作废', action: 'delete' }
    ]
  },
  buttonStausConfig2: {
    moneyConversion: false,
    buttons: [
      { code: 'toolbar-refresh', name: '刷新' },
      { code: 'toolbar-cancel', name: '撤销', actionType: '3', glType: '0', actionName: '撤销', action: 'back' }
    ]
  }
}

export const deptDatas = [
  {
    cor_bgt_doc_no: '陕财办教〔2021〕1号',
    cor_bgt_doc_id: '1000000004852365',
    cor_bgt_doc_code: '1000000004852365',
    cor_bgt_doc_name: '陕财办教〔2021〕1号',
    bgt_mof_dep_id: '1000000005533705',
    bgt_mof_dep_code: '11',
    bgt_mof_dep_name: '教科文处',
    amount: '9999999999',
    fund_type_name: '专项债券',
    fund_type_code: '122',
    fund_type_id: '1000000004998909',
    source_type_name: '补助下级预算',
    source_type_code: '12212',
    source_type_id: '1000000006372054',
    exp_func_name: '普通教育',
    exp_func_code: '20502',
    exp_func_id: '1000000007459784',
    gov_bgt_eco_name: '维修(护)费',
    gov_bgt_eco_code: '50209',
    gov_bgt_eco_id: '1000000007750343',
    dir_name: '本级',
    dir_code: '2',
    dir_id: '1000000002193065',
    bgt_rem_name: '物业服务采购项目',
    bgt_rem_code: '2020021419303800440',
    bgt_rem_id: '1000000002322790',
    version_name: '当年预算',
    version_code: '111',
    version_id: '1000000002189045'
  }
]

// 表格校验
export let formValidationConfig = {}

export default {
  budgetTodoDistribute: columns
}
