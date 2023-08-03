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
      label: '待送审',
      code: '1',
      curValue: '1'
    },
    {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '已送审',
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
      curValue: ''
    }
  ],
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '1': [
      { code: 'add', label: '新增', status: 'primary' },
      { code: 'approval', label: '送审' },
      // { code: 'revoke', label: '撤销' },
      { code: 'change', label: '修改' },
      { code: 'check', label: '查看' },
      { code: 'del', label: '删除' }
      // { code: 'monitor', label: '全量监控' }
    ],
    '2': [
      // { code: 'add', label: '新增', status: 'primary' },
      // { code: 'approval', label: '送审' },
      { code: 'revoke', label: '撤销', status: 'primary' },
      { code: 'check', label: '查看详情' }
      // { code: 'change', label: '修改' },
      // { code: 'check', label: '查看' },
      // { code: 'del', label: '删除' }
      // { code: 'monitor', label: '全量监控' }
    ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'add', label: '新增', status: 'primary' },
      { code: 'approval', label: '送审' },
      // { code: 'revoke', label: '撤销' },
      { code: 'change', label: '修改' },
      { code: 'check', label: '查看' },
      { code: 'del', label: '删除' }
      // { code: 'monitor', label: '全量监控' }
    ]
  },
  highQueryConfig: [
    {
      title: '监控主题',
      field: 'regulationClass',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        'props': {
          'config': {
            'treeProps': {
              'nodeKey': 'id',
              'label': 'label',
              'children': 'children'
            },
            'placeholder': '监控主题',
            'multiple': false,
            'readonly': true,
            'isleaf': false
          }
        }
      }
    },
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
      field: 'warnLevel',
      align: 'center',
      width: 180,
      itemRender: {
        name: '$vxeSelect',
        options: store.state.warnInfo.warnLevelOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
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
      field: 'businessSystemName',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '业务系统'
        }
      }
    },
    {
      title: '业务模块',
      field: 'businessModuleName',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '业务模块'
        }
      }
    },
    {
      title: '业务功能',
      field: 'businessFunctionName',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '业务功能'
        }
      }
    }
  ],
  sethighQueryData: {
    declareCode: '',
    ruleTemplateName: '',
    businessModuleName: '',
    businessSystemName: '',
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
          { value: '7', label: '小于等于' },
          { value: '8', label: '开头' },
          { value: '11', label: '在..内' },
          { value: '12', label: '不在..内' }
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
          { value: '4', label: '值集' },
          { value: '5', label: '参照' }
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
      // formula: '',
      // name: '$vxeInput',
      slots: {
        edit: 'editParam',
        default: 'defaultParam'
      },
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
    {
      title: '监控主题',
      'width': 180,
      field: 'regulationClassName',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '监控规则编码',
      'width': 180,
      field: 'regulationCode',
      sortable: false,
      filters: false,
      align: 'left'
    },
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
      'cellRender': {
        'name': '$vxeSelect',
        options: store.state.warnInfo.warnLevelOptions,
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      title: '处理方式',
      field: 'handleType',
      'width': 180,
      align: 'left',
      'cellRender': {
        'name': '$vxeSelect',
        options: store.state.warnInfo.warnControlTypeOptions,
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      title: '触发模块',
      'width': 180,
      field: 'businessModuleName',
      sortable: false,
      align: 'left'
    },
    {
      title: '触发菜单',
      'width': 180,
      field: 'businessFunctionName',
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
    {
      'title': '状态',
      'field': 'regulationStatus',
      'align': 'center',
      'width': 180,
      'cellRender': {
        'name': '$vxeSelect',
        options: [
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
          },
          {
            'value': '4',
            'label': '退回'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeSelect'
    },
    {
      title: '白名单说明',
      'width': 180,
      field: 'ruleElementDesc',
      sortable: false,
      align: 'left'
    }
    // {
    //   title: '变更记录',
    //   field: '',
    //   sortable: false,
    //   align: 'left'
    // }
  ],
  formItemsConfigMessage: [
    {
      field: 'payment',
      title: '基础要素',
      titleAlign: 'center',
      titleWidth: '100px',
      span: '20',
      itemRender: {
        name: '$vxeSelect',
        props: {
          placeholder: '请选择基础要素',
          multiple: true,
          disabled: false
        },
        options: [
          {
            value: 0,
            label: '预算单位',
            urlC: 'AGENCY',
            name: 'agency'
          },
          {
            value: 1,
            label: '预算项目',
            urlC: 'PRO',
            name: 'pro'
          },
          {
            value: 2,
            label: '功能分类',
            urlC: 'EXPFUNC',
            name: 'exp_func'
          },
          {
            value: 3,
            label: '政府支出经济分类',
            urlC: 'DEPBGTECO',
            name: 'dep_bgt_eco'
          },
          {
            value: 4,
            label: '部门支出经济分类',
            urlC: 'GOVBGTECO',
            name: 'gov_bgt_eco'
          },
          {
            value: 5,
            label: '指标文号',
            urlC: 'BGTDOCNO',
            name: 'cor_bgt_doc_no'
          }
        ]
      }
    },
    {
      field: 'payeeAcctName',
      title: '收款人名称',
      titleAlign: 'center',
      titleWidth: '100px',
      span: '20',
      itemRender: {
        name: '$textarea',
        props: {
          placeholder: '请填写收款人名称',
          disabled: false
        }
      }
    },
    {
      field: 'payeeAcctNo',
      title: '收款人账号',
      titleAlign: 'center',
      span: '20',
      titleWidth: '100px',
      itemRender: {
        name: '$textarea',
        props: {
          placeholder: '请填写收款人账号',
          disabled: false
        }
      }
    },
    {
      field: 'useDes',
      title: '资金用途',
      titleAlign: 'center',
      titleWidth: '100px',
      span: '20',
      itemRender: {
        name: '$textarea',
        props: {
          placeholder: '请填写资金用途',
          disabled: false
        }
      }
    },
    {
      field: 'des',
      title: '白名单描述',
      titleAlign: 'center',
      titleWidth: '100px',
      span: '20',
      itemRender: {
        name: '$textarea',
        props: {
          placeholder: '白名单描述',
          disabled: false
        }
      }
    },
    {
      field: 'basis',
      title: '白名单依据',
      titleAlign: 'center',
      titleWidth: '100px',
      span: '20',
      itemRender: {
        name: '$textarea',
        props: {
          placeholder: '白名单依据',
          disabled: false
        }
      }
    }
  ],
  formValidationConfigMessage: {
    // payment: [
    //   { required: true, message: '支付要素不能为空', trigger: 'change' }
    // ]
  }
}
