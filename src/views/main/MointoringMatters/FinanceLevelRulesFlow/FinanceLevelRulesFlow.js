// import store from '@/store/index'
import store from '@/store'

export let proconf = {
  // BsToolBar 状态栏
  toolBarStatusButtons: [
    {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '待审核',
      code: '1',
      curValue: '1'
    },
    {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '已审核',
      code: '2',
      curValue: '2'
    },
    {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '全部',
      code: '3',
      curValue: '3'
    }
  ],
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '1': [
      { code: 'add', label: '审核', status: 'primary' },
      { code: 'revoke', label: '撤销' },
      { code: 'monitor', label: '全量监控' }
    ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'add', label: '审核', status: 'primary' },
      { code: 'revoke', label: '撤销' },
      { code: 'monitor', label: '全量监控' }
    ]
  },
  highQueryConfig: [
    {
      title: '管理级次',
      field: 'regulationType',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '系统级' },
          { value: '2', label: '财政级' },
          { value: '3', label: '部门级' }
        ],
        props: {
          placeholder: '管理级次'
        }
      }
    },
    {
      title: '预警级别',
      field: 'warningLevel',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '一级' },
          { value: '2', label: '二级' },
          { value: '3', label: '三级' }
        ],
        props: {
          placeholder: '预警级别'
        }
      }
    },
    {
      title: '处理方式',
      field: 'handleType',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: store.state.warnInfo.warnControlTypeOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
        props: {
          placeholder: '处理方式'
        }
      }
    },
    // {
    //   title: '业务模块',
    //   field: 'businessModelCode',
    //   width: '8',
    //   align: 'left',
    //   formula: '',
    //   name: '$vxeSelect',
    //   itemRender: {
    //     name: '$vxeSelect',
    //     options: [
    //     ],
    //     props: {
    //       placeholder: '业务模块'
    //     }
    //   }
    // },
    // {
    //   title: '业务功能',
    //   field: 'businessFeaturesCode',
    //   width: '8',
    //   align: 'left',
    //   formula: '',
    //   name: '$vxeSelect',
    //   itemRender: {
    //     name: '$vxeSelect',
    //     options: [
    //     ],
    //     props: {
    //       placeholder: '业务功能'
    //     }
    //   }
    // },
    {
      title: '是否启用',
      field: 'isEnable',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '否' },
          { value: '1', label: '是' }
        ],
        props: {
          placeholder: '是否启用'
        }
      }
    }
  ],
  highQueryData: {
    regulationType: '',
    warningLevel: '',
    handleType: '',
    isEnable: ''
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
      title: '业务系统',
      field: 'businessSystemName',
      width: '8',
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
      field: 'businessModuleName',
      width: '8',
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
      field: 'businessFunctionName',
      width: '8',
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
    businessSystemName: '',
    businessModuleName: '',
    businessFunctionName: ''
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
      title: '业务功能',
      field: 'businessFunctionName',
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
      field: 'businessSystemName',
      sortable: false,
      align: 'left'
    },
    {
      title: '关系',
      field: 'businessModuleName',
      sortable: false,
      align: 'left'
    },
    {
      title: '值类型',
      field: 'businessFunctionName',
      sortable: false,
      align: 'left'
    },
    {
      title: '参数值',
      field: 'ruleRemark',
      sortable: false,
      align: 'left'
    }
  ],
  PoliciesTableColumns: [
    {
      'title': '管理级次',
      'field': 'regulationType',
      'align': 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
          {
            'value': '1',
            'label': '系统级'
          },
          {
            'value': '2',
            'label': '财政级'
          },
          {
            'value': '3',
            'label': '部门级'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      title: '监控规则编码',
      field: 'regulationCode',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '监控规则名称',
      field: 'regulationName',
      sortable: false,
      align: 'left'
    },
    {
      title: '预警级别',
      field: 'warningLevel',
      sortable: false,
      align: 'left'
    },
    {
      title: '处理方式',
      field: 'handleType',
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
      title: '业务功能',
      field: 'businessFunctionName',
      sortable: false,
      align: 'left'
    },
    {
      title: '是否启用',
      field: 'isEnable',
      sortable: false,
      align: 'left'
    },
    {
      title: '规则说明',
      field: 'ruleRemark',
      sortable: false,
      align: 'left'
    },
    {
      'title': '状态',
      'field': 'regulationStatus',
      'align': 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
          {
            'value': '1',
            'label': '新增'
          },
          {
            'value': '2',
            'label': '送审'
          },
          {
            'value': '3',
            'label': '审核'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      title: '变更记录',
      field: '',
      sortable: false,
      align: 'left'
    }
  ]
}
