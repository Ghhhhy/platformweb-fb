// import store from '@/store/index'
export let proconf = {
  // BsToolBar 状态栏
  toolBarStatusButtons: [
    {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '全部',
      code: '1',
      curValue: '1'
    }
  ],
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '1': [
      { code: 'add', label: '新增', status: 'primary' },
      { code: 'change', label: '修改' },
      { code: 'del', label: '删除' }
    ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'add', label: '新增', status: 'primary' },
      { code: 'change', label: '修改' },
      { code: 'del', label: '删除' }
    ]
  },
  PoliciesTableColumns: [
    /* {
      title: '规则模板编码',
      field: 'ruleTemplateCode',
      sortable: false,
      align: 'left'
    }, */
    {
      title: '规则模板名称',
      field: 'ruleTemplateName',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '规则类型',
      field: 'fiRuleTypeName',
      sortable: false,
      filters: false,
      align: 'left',
      width: 150
    },
    {
      title: '事项名称',
      field: 'declareName',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '事项申报所属财政',
      field: 'mofDiv',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '事项申报所属机构',
      field: 'agency',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '事项申报人',
      field: 'deClaRant',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '规则说明',
      field: 'ruleRemark',
      sortable: false,
      align: 'left'
    },
    {
      title: '业务系统',
      field: 'businessSystemName',
      sortable: false,
      align: 'left'
    },
    {
      title: '业务模块',
      field: 'businessModuleName',
      sortable: false,
      align: 'left'
    },
    {
      title: '模板函数',
      field: 'functionName',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '创建人',
      field: 'createPersonName',
      sortable: false,
      align: 'left'
    },
    {
      title: '创建时间',
      field: 'createTime',
      sortable: false,
      align: 'left'
    }
  ],
  // table 操作按钮
  gloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      // const main = self.$parent.$parent.$parent.$parent
      // let status = main._data.toolBarStatusSelect.curValue
      return [
        <el-tooltip content="新增" placement="top" effect="light">
          <a class="gloable-option-row-add gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'add' })}>新增</a>
        </el-tooltip>,
        <el-tooltip content="附件" placement="top" effect="light">
          <a class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment' })}>附件</a>,
        </el-tooltip>
      ]
    }
  },
  // table 操作按钮
  gloableOptionRow1: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      // const main = self.$parent.$parent.$parent.$parent
      // let status = main._data.toolBarStatusSelect.curValue
      return [
        <el-tooltip content="删除" placement="top" effect="light">
          <a class="gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'delMount' })}>删除</a>
        </el-tooltip>
      ]
    }
  },
  declareQueryCofig: [
    {
      title: '事项名称',
      field: 'declareName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '事项名称'
        }
      }
    },
    {
      title: '申报人',
      field: 'createPersonName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '申报人'
        }
      }
    },
    {
      title: '所属财政',
      field: 'mofDivName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '所属财政'
        }
      }
    },
    {
      title: '所属机构',
      field: 'manageMofName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '所属机构'
        }
      }
    }
  ],
  declareQueryData: {
    declareName: '',
    createPersonName: ''
  },
  highQueryConfig: [
    {
      title: '规则模板名称',
      field: 'ruleTemplateName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '规则模板名称'
        }
      }
    },
    {
      title: '规则类型',
      field: 'fiRuleTypeCode',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeTree',
        options: [
          { value: '1',
            label: '中央监控规则',
            children: [
              { value: '11', label: '通用类监控规则' },
              { value: '12', label: '专项类监控规则' },
              { value: '19', label: '其他监控规则' }
            ]
          },
          { value: '2',
            label: '地方监控规则',
            children: [
              { value: '21', label: '通用类监控规则' },
              { value: '22', label: '专项类监控规则' },
              { value: '29', label: '其他监控规则' }
            ]
          }
        ],
        props: {
          config: {
            valueKeys: ['value', 'label', 'value'],
            format: '{name}',
            treeProps: {
              labelFormat: '{value}-{label}', // {code}-{name}
              nodeKey: 'value',
              label: 'label',
              children: 'children'
            },
            placeholder: '规则类型',
            multiple: false,
            readonly: false,
            isleaf: true
          }
        }
      }
    },
    {
      title: '规则函数名称',
      field: 'functionName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '规则函数名称'
        }
      }
    },
    {
      title: '业务模块',
      field: 'businessModuleName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '预算执行', label: '预算执行' },
          { value: '单位核算', label: '单位核算' }
        ],
        props: {
          placeholder: '业务模块'
        }
      }
    }
  ],
  highQueryData: {
    ruleTemplateName: '',
    businessModuleName: '',
    functionName: '',
    fiRuleTypeCode: ''
  },
  funchighQueryConfig: [
    {
      title: '函数类型',
      field: 'functionType',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '字段' },
          { value: '2', label: '自定义' }
        ],
        props: {
          placeholder: '函数类型'
        }
      }
    },
    {
      title: '函数名称',
      field: 'functionName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '函数名称'
        }
      }
    },
    {
      title: '函数参数',
      field: 'functionParameter',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '函数参数'
        }
      }
    }
  ],
  funchighQueryData: {
    functionType: '',
    functionName: '',
    functionParameter: ''
  },
  mountTableColumnsConfig: [
    {
      'title': '函数类型',
      'field': 'functionType',
      'align': 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
          {
            'value': '1',
            'label': '字段'
          },
          {
            'value': '2',
            'label': '自定义SQL'
          },
          {
            'value': '3',
            'label': '自定义接口'
          },
          {
            'value': '4',
            'label': '自定义校验接口'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    /* {
      title: '函数编码',
      field: 'functionCode',
      sortable: false,
      align: 'left'
    }, */
    {
      title: '函数名称',
      field: 'functionName',
      sortable: false,
      align: 'left'
    },
    {
      title: '业务系统',
      field: 'businessSystemName',
      sortable: false,
      align: 'left'
    },
    {
      title: '业务模块',
      field: 'businessModuleName',
      sortable: false,
      align: 'left'
    },
    {
      title: '函数参数',
      field: 'functionParameter',
      sortable: false,
      align: 'left'
    },
    {
      title: '函数描述',
      field: 'description',
      sortable: false,
      align: 'left'
    }
    // {
    //   title: '操作',
    //   field: 'gloableOptionRow1',
    //   className: 'gloableOptionRow',
    //   align: 'center',
    //   fixed: 'right',
    //   sortable: false,
    //   filters: false,
    //   width: 100,
    //   cellRender: {
    //     name: '$gloableOptionRow'
    //   }
    // }
  ],
  // 新增弹框表格
  monitorTableColumnsConfig: [
    {
      title: '事项编码',
      field: 'declareCode',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '事项名称',
      field: 'declareName',
      sortable: false,
      align: 'left'
    },
    {
      title: '所属财政',
      field: 'mofDivName',
      sortable: false,
      align: 'left'
    },
    {
      title: '所属机构',
      field: 'manageMofName',
      sortable: false,
      align: 'left'
    },
    {
      title: '申报人',
      field: 'createPersonName',
      sortable: false,
      align: 'left'
    },
    {
      title: '申报电话',
      field: 'declarePersonTel',
      sortable: false,
      align: 'left'
    },
    {
      title: '政策法规名称',
      field: 'regulationsName',
      sortable: false,
      align: 'left'
    },
    {
      title: '规则依据',
      field: 'ruleAccord',
      sortable: false,
      align: 'left'
    },
    {
      title: '事项说明',
      field: 'declareMatter',
      sortable: false,
      align: 'left'
    }
  ]
}
