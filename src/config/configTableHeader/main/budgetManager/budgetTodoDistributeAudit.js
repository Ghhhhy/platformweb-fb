// 页面：指标管理 => 待分指标审核
// 待分指标审核表头配置 2020-09-03
export let proconf = {
  toolButton: {
    // table 配置
    // 按钮配置
    buttons: [
      { code: 'toolbar-refresh', name: '刷新' },
      { code: 'toolbar-audit', name: '审核', actionType: '2', glType: '3', actionName: '送审', action: 'audit' }
    ],
    moneyConversion: false
  }
}
export const columns = [

  {
    title: '指标文号',
    field: 'cor_bgt_doc_no',
    width: '200',
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
    width: '200',
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
    width: '200',
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
    width: '200',
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
    width: '200',
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
      name: '$treeinput',
      props: {
        disabled: false,
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: 'dicds',
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          // useRight: false,
          // batchno: 1,
          // datatype: 1,
          eleCode: 'dicds'
          // sxspecroleguid: '999004'
        }
      }
    }
  },
  {
    field: 'ele',
    title: '转换后要素',
    span: 8,
    itemRender: {
      name: '$treeinput',
      isServer: true,
      props: {
        disabled: false,
        isServer: true,
        isleaf: true,
        elecode: 'dicds',
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          // useRight: false,
          // batchno: 1,
          // datatype: 1,
          eleCode: 'dicds'
          // sxspecroleguid: '999004'
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
          value: '2',
          label: '原值'
        },
        {
          value: '3',
          label: '默认值'
        }
      ],
      props: {
        disabled: false,
        placeholder: '请选择对应规则'
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
    field: 'beforevalue',
    title: '转换前',
    span: 8,
    itemRender: {
      name: '$treeinput',
      props: {
        disabled: false,
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: '',
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          // useRight: false,
          // batchno: 1,
          // datatype: 1,
          eleCode: ''
          // sxspecroleguid: '999004'
        }
      }
    }
  },
  {
    field: 'elevalue',
    title: '转换后',
    span: 8,
    itemRender: {
      name: '$treeinput',
      isServer: true,
      props: {
        disabled: false,
        isServer: true,
        isleaf: true,
        elecode: '',
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          // useRight: false,
          // batchno: 1,
          // datatype: 1,
          eleCode: ''
          // sxspecroleguid: '999004'
        }
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

export let statusBtn = {
  buttonStausConfig1: {
    moneyConversion: false,
    buttons: [
      { code: 'toolbar-refresh', name: '刷新' },
      { code: 'toolbar-audit', name: '审核', actionType: '2', glType: '3', actionName: '审核', action: 'audit' }
    ]
  },
  buttonStausConfig2: {
    moneyConversion: false,
    buttons: [
      { code: 'toolbar-refresh', name: '刷新' },
      { code: 'toolbar-cancel', name: '撤销', actionType: '3', glType: '4', actionName: '撤销', action: 'back' }
    ]
  }
}

export const insertFormData = {
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

// 表格校验
export let formValidationConfig = {}
