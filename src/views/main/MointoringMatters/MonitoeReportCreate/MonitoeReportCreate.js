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
      curValue: ''
    }
  ],
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '1': [
      { code: 'create', label: '监控报告生成', status: 'primary' },
      { code: 'delete', label: '删除' }
    ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'check', label: '查看详情' }
    ]
  },
  highQueryConfig: [
    {
      title: '年份',
      field: 'year',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: 2021, label: '2021年' },
          { value: 2022, label: '2022年' }
        ],
        props: {
          placeholder: '年份'
        }
      }
    },
    {
      title: '开始月份',
      field: 'startMonth',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: 1, label: '一月' },
          { value: 2, label: '二月' },
          { value: 3, label: '三月' },
          { value: 4, label: '四月' },
          { value: 5, label: '五月' },
          { value: 6, label: '六月' },
          { value: 7, label: '七月' },
          { value: 8, label: '八月' },
          { value: 9, label: '九月' },
          { value: 10, label: '十月' },
          { value: 11, label: '十一月' },
          { value: 12, label: '十二月' }
        ],
        props: {
          placeholder: '开始月份'
        }
      }
    },
    {
      title: '结束月份',
      field: 'endMonth',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: 1, label: '一月' },
          { value: 2, label: '二月' },
          { value: 3, label: '三月' },
          { value: 4, label: '四月' },
          { value: 5, label: '五月' },
          { value: 6, label: '六月' },
          { value: 7, label: '七月' },
          { value: 8, label: '八月' },
          { value: 9, label: '九月' },
          { value: 10, label: '十月' },
          { value: 11, label: '十一月' },
          { value: 12, label: '十二月' }
        ],
        props: {
          placeholder: '结束月份'
        }
      }
    },
    {
      'title': '生成日期',
      'field': 'createTime',
      'width': '8',
      'align': 'left',
      'formula': '',
      'name': '$vxeTime',
      'itemRender': {
        'name': '$vxeTime',
        'options': [],
        'props': {
          'placeholder': '生成日期'
        }
      }
    },
    {
      title: '报告名称',
      field: 'fileName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '报告名称'
        }
      }
    },
    {
      title: '生成人',
      field: 'createPerson',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '生成人'
        }
      }
    }
  ],
  highQueryData: {
    warningLevel: '',
    handleType: '',
    regulationType: ''
  },
  // 新增弹窗高级查询
  sethighQueryConfig: [
    // {
    //   title: '规则模板编码',
    //   field: 'declareCode',
    //   width: '8',
    //   align: 'left',
    //   formula: '',
    //   name: '$vxeInput',
    //   itemRender: {
    //     name: '$vxeInput',
    //     options: [],
    //     props: {
    //       placeholder: '规则模板编码'
    //     }
    //   }
    // },
    {
      title: '规则模板名称',
      field: 'ruleTemplateName',
      'width': 180,
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
      title: '业务系统',
      field: 'businessSystem',
      'width': 180,
      align: 'left',
      formula: '',
      itemValue: '',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],

        props: {
          config: {
            placeholder: '业务系统'
          }
        }
      }
    },
    {
      title: '业务模块',
      field: 'businessModule',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [
        ],

        props: {
          config: {
            placeholder: '业务功能'
          }
        }
      }
    },
    {
      title: '业务功能',
      field: 'businessFunction',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',

        options: [
        ],
        props: {
          config: {
            placeholder: '业务功能'
          }
        }
      }
    }
  ],
  sethighQueryData: {
    declareCode: '',
    ruleTemplateName: '',
    businessSystemCode: '',
    businessModuleCode: '',
    businessFunctionCode: ''
  },
  // 新增弹窗列表
  monitorSetTableColumnsConfig: [
    {
      title: '规则模板编码',
      field: 'ruleTemplateCode',
      sortable: false,
      align: 'left'
    },
    {
      title: '规则模板名称',
      field: 'ruleTemplateName',
      sortable: false,
      align: 'left'
    },
    {
      title: '规则说明',
      field: 'ruleRemark',
      sortable: false,
      align: 'left'
    }
  ],
  mountTableColumnsConfig: [
    {
      title: '函数名称',
      field: 'functionName',
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
    },
    {
      title: '关系',
      field: 'relation',
      align: 'left',
      sortable: false,
      formula: '',
      name: '$vxeSelect',
      editRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '等于' },
          { value: '2', label: '大于' },
          { value: '3', label: '小于' },
          { value: '4', label: '包含' },
          { value: '5', label: '不包含' },
          { value: '6', label: '大于等于' },
          { value: '7', label: '小于等于' }
        ],
        props: {
          placeholder: '关系'
        }
      }
    },
    {
      title: '值类型',
      field: 'paramType',
      sortable: false,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      editRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '文本' },
          { value: '2', label: '数字' },
          { value: '3', label: '值域' },
          { value: '4', label: '值集' }
        ],
        props: {
          placeholder: '关系'
        }
      }
    },
    {
      title: '参数值',
      sortable: false,
      field: 'param',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      editRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '参数值'
        }
      }
    }
  ],
  PoliciesTableColumns: [
    {
      title: '区划',
      field: 'provinceName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '日期',
      field: 'createTime',
      sortable: false,
      align: 'center'
    },
    {
      title: '报告名称',
      field: 'fileName',
      sortable: false,
      align: 'center'
    },
    {
      title: '生成人',
      field: 'createPerson',
      sortable: false,
      align: 'center'
    },
    {
      'title': '操作',
      'field': 'gloableOptionRow',
      'className': 'gloableOptionRow',
      'align': 'center',
      'fixed': 'right',
      'sortable': 'false',
      'width': '100',
      'cellRender': {
        'name': '$payVoucherInputGloableOptionRow',
        'options': [],
        'defaultValue': '',
        'props': {}
      },
      'name': '$payVoucherInputGloableOptionRow',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'associatedQuery': '',
      'combinedType_select_sort': '',
      'filters': ''
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
        // <el-tooltip content="修改" placement="top" effect="light">
        //   <a class="gloable-option-row-edit gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'uodate' })}>修改</a>
        // </el-tooltip>,
        <el-tooltip content="附件" placement="top" effect="light">
          <a class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment' })}>附件</a>,
        </el-tooltip>
      ]
    }
  }
}
