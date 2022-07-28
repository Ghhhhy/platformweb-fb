// import store from '@/store/index'
export let proconf = {
  // BsToolBar 状态栏
  toolBarStatusButtons: [
    // {
    //   type: 'button',
    //   iconName: 'base-all.png',
    //   iconNameActive: 'base-all-active.png',
    //   iconUrl: '',
    //   label: '待送审',
    //   code: '1',
    //   curValue: '1'
    // },
    // {
    //   type: 'button',
    //   iconName: 'base-all.png',
    //   iconNameActive: 'base-all-active.png',
    //   iconUrl: '',
    //   label: '已送审',
    //   code: '2',
    //   curValue: '2'
    // },
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
      { code: 'open', label: '启用', status: 'primary' },
      { code: 'stop', label: '停用' },
      { code: 'update', label: '修改' },
      { code: 'check', label: '查看详情' }
    ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'check', label: '查看详情' }
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
      title: '管理级次',
      field: 'regulationType',
      'width': 180,
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
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '黄色预警' },
          { value: '2', label: '橙色预警' },
          { value: '3', label: '红色预警' },
          { value: '4', label: '人工处理蓝色预警' }
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
          { value: '1', label: '预警（无需上传附件）' },
          { value: '2', label: '预警（需上传附件）' },
          { value: '3', label: '拦截' },
          { value: '4', label: '记录' }
        ],
        props: {
          placeholder: '处理方式'
        }
      }
    },
    {
      title: '规则模板',
      field: 'regulationModelName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '规则模板'
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
          { value: '1', label: '是' },
          { value: '0', label: '否' }
        ],
        props: {
          placeholder: '是否启用'
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
      'width': 180,
      field: 'mofDivName',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '监控主题',
      'width': 180,
      field: 'regulationClassName',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      'title': '管理级次',
      'width': 180,
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
    // {
    //   title: '监控规则编码',
    //   'width': 180,
    //   field: 'regulationCode',
    //   sortable: false,
    //   filters: false,
    //   align: 'left'
    // },
    {
      title: '监控规则名称',
      'width': 180,
      field: 'regulationName',
      sortable: false,
      align: 'left'
    },
    {
      title: '预警级别',
      field: 'warningLevel',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      editRender: {
        name: '$vxeSelect',
        options: [
          { value: 1, label: '黄色预警' },
          { value: 2, label: '橙色预警' },
          { value: 3, label: '红色预警' },
          { value: 4, label: '蓝色预警' }
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
      name: '$vxeSelect',
      editRender: {
        name: '$vxeSelect',
        options: [
          { value: 1, label: '预警（无需上传附件）' },
          { value: 2, label: '预警（需上传附件）' },
          { value: 3, label: '拦截' },
          { value: 4, label: '记录' }
        ],
        props: {
          placeholder: '处理方式'
        }
      }
    },
    {
      title: '规则模板',
      'width': 180,
      field: 'regulationModelName',
      sortable: false,
      align: 'left'
    },
    {
      title: '业务模块',
      'width': 180,
      field: 'businessModuleName',
      sortable: false,
      align: 'left'
    },
    {
      title: '业务功能',
      'width': 180,
      field: 'businessFunctionName',
      sortable: false,
      align: 'left'
    },
    {
      title: '是否启用',
      'width': 180,
      field: 'isEnable',
      sortable: false,
      align: 'left',
      name: '$vxeSelect',
      editRender: {
        name: '$vxeSelect',
        options: [
          { value: 0, label: '否' },
          { value: 1, label: '是' }
        ],
        props: {
          placeholder: '处理方式'
        }
      }
    },
    {
      title: '启用人',
      'width': 180,
      field: 'createPersonName',
      sortable: false,
      align: 'left'
    },
    {
      title: '规则说明',
      'width': 180,
      field: 'ruleRemark',
      sortable: false,
      align: 'left'
    },
    {
      title: '事由',
      'width': 180,
      field: 'ruleDesc',
      sortable: false,
      align: 'left'
    },
    {
      title: '启用时间',
      field: 'openTime',
      width: 180,
      sortable: false,
      align: 'left'
    },
    {
      title: '创建时间',
      field: 'createTime',
      width: 180,
      sortable: false,
      align: 'left'
    }
  ]
}
