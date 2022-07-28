// 页面：指标管理 => 指标特殊转换规则
// 指标特殊转换规则主表. 表头配置 2020-09-03
// 开发：lw
// import Store from './node_modules/@/utils/store'
export let proconf = {
  buttons: [
    { code: 'toolbar-insert', label: '新增', status: 'primary', name: '新增' },
    { code: 'toolbar-update', label: '修改', name: '修改' },
    { code: 'toolbar-copy', label: '复制', name: '复制' },
    { code: 'toolbar-delete', label: '删除', name: '删除' }
  ],
  moneyConversion: false,
  calculator: false,
  export: false,
  zoom: false,
  custom: false
}

export const leftTreeData = [
  {
    id: 'root',
    label: '全部',
    code: 'root',
    isleaf: '0',
    level_no: '1',
    children: [
      {
        id: '1',
        label: '1-收入预算（财政资金）',
        name: '收入预算（财政资金）',
        code: '1',
        isleaf: '1',
        level_no: '2'
      },
      {
        id: '2',
        label: '2-收入预算（单位资金）',
        name: '收入预算（单位资金）',
        code: '2',
        isleaf: '1',
        level_no: '2'
      },
      {
        id: '3',
        label: '3-支出指标（政府预算待分）',
        name: '支出指标（政府预算待分）',
        code: '3',
        isleaf: '1',
        level_no: '2'
      },
      {
        id: '4',
        label: '4-支出指标（可执行临时）',
        name: '支出指标（可执行临时）',
        code: '4',
        isleaf: '1',
        level_no: '2'
      },
      {
        id: '5',
        label: '5-转移支付（提前下达）',
        name: '转移支付（提前下达）',
        code: '5',
        isleaf: '1',
        level_no: '2'
      },
      {
        id: '6',
        label: '6-支出指标（可执行正式）',
        name: '支出指标（可执行正式）',
        code: '6',
        isleaf: '1',
        level_no: '2'
      },
      {
        id: '7',
        label: '7-转移支付（可执行）',
        name: '转移支付（可执行）',
        code: '7',
        isleaf: '1',
        level_no: '2'
      },
      {
        id: '8',
        label: '8-非预算单位（可执行）',
        name: '转移支付（可执行）',
        code: '8',
        isleaf: '1',
        level_no: '2'
      }
    ]
  }
]
export const columns = [
  {
    field: 'trans_rule_type_tmp',
    title: '规则类型',
    width: '200'
  },
  {
    title: '要素编码',
    field: 'elecode',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '要素名称',
    field: 'elename',
    width: '150'
  },
  {
    title: '规则名称',
    field: 'rulename',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '转换规则',
    field: 'transtype',
    width: '120',
    filterMultiple: true,
    formatter: (value, column) => {
      if (value.cellValue === '0') {
        return '定值'
      }
      if (value.cellValue === '1') {
        return 'sql'
      }
      // if (value.cellValue === '2') {
      //   return '原值'
      // }
      if (value.cellValue === '3') {
        return '默认值'
      }
    },
    filters: [
      { label: '定值', value: '0' },
      { label: 'sql', value: '1' },
      // { label: '原值', value: '2' },
      { label: '默认值', value: '3' }
    ]
  },
  {
    field: 'elevalue_tmp',
    title: '转换值',
    width: '300'
  },
  {
    title: 'sql条件',
    field: 'conditionsql',
    width: '200'
  },
  {
    title: 'sql结果',
    field: 'sqlvalue',
    width: '200'
  }
]

export const edittablecolumns = [
  {
    field: 'trans_rule_type',
    title: '规则类型',
    width: '200',
    span: 8,
    editRender: {
      name: '$treeinput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: false,
        showcheckbox: false,
        datas: leftTreeData
      }
    }
  },
  {
    field: 'transtype',
    title: '转换规则',
    span: 8,
    editRender: {
      name: '$vxeSelect',
      options: [
        {
          value: '0',
          label: '定值'
        },
        {
          value: '1',
          label: 'sql'
        },
        {
          value: '3',
          label: '默认值'
        },
        {
          value: '4',
          label: 'sqlvalue'
        }
      ]
    }
  },
  {
    title: '要素编码',
    field: 'elecode',
    width: '200',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '要素名称',
    field: 'elename',
    width: '200'
  },
  {
    title: '规则名称',
    field: 'rulename',
    width: '150',
    filterRender: {
      name: 'input',
      props: {
        type: 'text'
      }
    }
  },
  {
    field: 'elevalue',
    title: '转换值',
    width: '300',
    editRender: {
      name: '$treeinput',
      props: {
        isleaf: true,
        isServer: true,
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: ''
        }
      }
    }
  },
  {
    title: 'sql条件',
    field: 'conditionsql',
    width: '200',
    align: 'left',
    editRender: {
      name: '$input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: 'sql结果',
    field: 'sqlvalue',
    width: '200',
    align: 'left',
    editRender: {
      name: '$input',
      props: {
        type: 'text'
      }
    }
  }
]

export let insertFormItems = [
  {
    field: 'trans_rule_type',
    title: '规则类型',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        disabled: false,
        type: 'text',
        isleaf: true,
        isServer: false,
        datas: leftTreeData,
        showcheckbox: false
      }
    }
  },
  {
    field: 'rulename',
    title: '规则名称',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: false,
        type: 'text',
        placeholder: '规则名称'
      }
    }
  },
  {
    field: 'ordernum',
    title: '转换顺序',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: false,
        type: 'text',
        placeholder: '转换顺序'
      }
    }
  },
  {
    field: 'beforeele',
    title: '转换前要素',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        disabled: false,
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: 'dicds',
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'dicds'
        }
      }
    }
  },
  {
    field: 'beforevalue',
    title: '转换前',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      props: {
        editConfig: {
          allowInput: true
        },
        disabled: false,
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: '',
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: ''
        }
      }
    }
  },
  {
    field: 'transtype',
    title: '转换规则',
    span: 8,
    itemRender: {
      name: '$vxeFormSelect',
      options: [
        {
          value: '0',
          label: '定值'
        },
        {
          value: '1',
          label: 'sql'
        },
        {
          value: '3',
          label: '默认值'
        },
        {
          value: '4',
          label: 'sqlvalue'
        }
      ],
      props: {
        disabled: false,
        placeholder: '请选择对应规则'
      }
    }
  },
  {
    field: 'ele',
    title: '转换后要素',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      isServer: true,
      props: {
        disabled: false,
        isServer: true,
        isleaf: true,
        elecode: 'dicds',
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'dicds'
        }
      }
    }
  },
  {
    field: 'elevalue',
    title: '转换后',
    span: 8,
    itemRender: {
      name: '$formTreeInput',
      isServer: true,
      props: {
        editConfig: {
          allowInput: true
        },
        disabled: false,
        isServer: true,
        isleaf: true,
        elecode: '',
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: ''
        }
      }
    }
  },
  {
    field: 'makeupele',
    title: '是否补录数据',
    span: 8,
    itemRender: {
      name: '$vxeFormSelect',
      options: [
        {
          value: '0',
          label: '否'
        },
        {
          value: '1',
          label: '是'
        }
      ],
      props: {
        disabled: false,
        placeholder: '请选择存续状态'
      }
    }
  },
  {
    field: 'conditionsql',
    title: '转换条件',
    span: 24,
    itemRender: {
      name: '$textarea',
      props: {
        disabled: true,
        type: 'text',
        placeholder: '请输入内容'
      }
    }
  },
  {
    field: 'sqlvalue',
    title: '转换sql值',
    span: 24,
    itemRender: {
      name: '$textarea',
      props: {
        disabled: true,
        type: 'text',
        placeholder: '请输入内容'
      }
    }
  }
]

export const insertFormData = {
  trans_rule_type: '', // 规则类型
  rulename: '', // 规则名称
  ordernum: '', // 转换顺序
  beforeele: '', // 转换前要素
  ele: '', // 转换后要素
  transtype: '', // 转换规则
  makeupele: '', // 是否补录数据
  beforevalue: '', // 转换前值
  elevalue: '', // value
  conditionsql: '', // sql条件
  sqlvalue: ''// 转换sql
}

export const copytablecolumndata = [
  {
    trans_rule_type: '',
    elecode: '',
    elename: '',
    rulename: '',
    elevalue: '',
    sqlvalue: '',
    conditionsql: ''
  }
]

export default {
  budgetTransRuleInput: columns
}
