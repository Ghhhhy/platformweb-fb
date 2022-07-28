// import store from '@/store/index'
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
      curValue: '2'
    },
    {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '已审核',
      code: '2',
      curValue: '3'
    },
    {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '全部',
      code: '3',
      curValue: ''
    }
  ],
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '1': [
      { code: 'approval', label: '审核', status: 'primary' },
      { code: 'sendBack', label: '退回' }
      // { code: 'monitor', label: '全量监控' }
    ],
    '2': [
      { code: 'check', label: '查看详情', status: 'primary' },
      { code: 'revoke', label: '撤销' }
    ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'add', label: '审核', status: 'primary' },
      { code: 'revoke', label: '撤销' }
    ]
  },
  highQueryConfig: [
    {
      title: '监控规则名称',
      field: 'regulationName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '监控规则名称'
        }
      }
    },
    {
      title: '预警级别',
      field: 'warningLevel',
      'width': 180,
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
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '预警' },
          { value: '2', label: '拦截' },
          { value: '3', label: '冻结' }
        ],
        props: {
          placeholder: '处理方式'
        }
      }
    },
    {
      title: '是否启用',
      field: 'isEnable',
      'width': 180,
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
    // {
    //   title: '业务系统',
    //   field: 'businessSystemName',
    //   sortable: false,
    //   align: 'left'
    // },
    // {
    //   title: '业务模块',
    //   field: 'businessModuleName',
    //   sortable: false,
    //   align: 'left'
    // },
    // {
    //   title: '业务功能',
    //   field: 'businessFunctionName',
    //   sortable: false,
    //   align: 'left'
    // },
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
      'title': '管理级次',
      'field': 'regulationType',
      'width': 180,
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
      'width': 180,
      align: 'left'
    },
    {
      title: '监控规则名称',
      field: 'regulationName',
      'width': 180,
      sortable: false,
      align: 'left'
    },
    {
      title: '预警级别',
      field: 'warningLevel',
      width: 180,
      align: 'left',
      formula: '',
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          { value: 1, label: '黄色预警' },
          { value: 2, label: '橙色预警' },
          { value: 3, label: '红色预警' },
          { value: 4, label: '非人工干预蓝色预警' }
        ],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeSelect'
    },
    {
      title: '处理方式',
      field: 'handleType',
      width: 180,
      align: 'left',
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          { value: 1, label: '预警，无需上传附件' },
          { value: 2, label: '预警，需上传附件' },
          { value: 3, label: '拦截' },
          { value: 4, label: '记录' }
        ],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeSelect'
    },
    {
      title: '业务模块',
      field: 'businessModuleName',
      'width': 180,
      sortable: false,
      align: 'left'
    },
    {
      title: '业务功能',
      field: 'businessFunctionName',
      'width': 180,
      sortable: false,
      align: 'left'
    },
    {
      title: '创建时间',
      'width': 180,
      field: 'createTime',
      sortable: false,
      align: 'left'
    },
    // {
    //   title: '变更记录',
    //   'width': 180,
    //   field: 'updateTime',
    //   sortable: false,
    //   align: 'left'
    // },
    // {
    //   title: '是否启用',
    //   'width': 180,
    //   field: 'isEnable',
    //   sortable: false,
    //   align: 'left',
    //   'cellRender': {
    //     'name': '$vxeSelect',
    //     options: [
    //       { value: 0, label: '否' },
    //       { value: 1, label: '是' }
    //     ],
    //     'defaultValue': '',
    //     'props': {}
    //   },
    //   'name': '$vxeSelect'
    // },
    {
      title: '规则说明',
      field: 'ruleRemark',
      'width': 180,
      sortable: false,
      align: 'left'
    }
    // {
    //   'title': '状态',
    //   'field': 'regulationStatus',
    //   'align': 'center',
    //   'width': 180,
    //   'cellRender': {
    //     'name': '$vxeSelect',
    //     options: [
    //       {
    //         'value': '1',
    //         'label': '新增'
    //       },
    //       {
    //         'value': '2',
    //         'label': '送审'
    //       },
    //       {
    //         'value': '3',
    //         'label': '审核'
    //       }
    //     ],
    //     'defaultValue': '',
    //     'props': {}
    //   },
    //   'name': '$vxeSelect'
    // }
    // {
    //   title: '变更记录',
    //   field: '',
    //   sortable: false,
    //   align: 'left'
    // }
  ]
}
