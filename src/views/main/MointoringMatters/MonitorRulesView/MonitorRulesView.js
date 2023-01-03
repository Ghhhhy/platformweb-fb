// import store from '@/store/index'
import store from '@/store'

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
  dfrStatusRightToolBarButton: {
    '1': [
      { code: 'set_rule', label: '设置规则' },
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
        options: store.state.warnInfo.warnLevelOptions?.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
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
    // {
    //   title: '区划',
    //   'width': 180,
    //   field: 'mofDivName',
    //   sortable: false,
    //   filters: false,
    //   align: 'left'
    // },
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
        options: store.state.warnInfo.warnLevelOptions,
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
        options: store.state.warnInfo.warnControlTypeOptions,
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
    // {
    //   title: '启用人',
    //   'width': 180,
    //   field: 'createPersonName',
    //   sortable: false,
    //   align: 'left'
    // },
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
    },
    {
      title: '白名单说明',
      field: 'ruleElementDesc',
      width: 180,
      sortable: false,
      align: 'left'
    },
    {
      title: '操作',
      field: 'gloableOptionRow',
      className: 'gloableOptionRow',
      align: 'center',
      fixed: 'right',
      sortable: false,
      filters: false,
      width: 100,
      cellRender: {
        name: '$gloableOptionRowMonitorRulesView'
      }
    }
  ],
  formItemsConfigMessage: [
    {
      field: 'payment',
      title: '基础要素',
      titleAlign: 'center',
      titleWidth: '100px',
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
  },
  // table 操作按钮
  gloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      // const main = self.$parent.$parent.$parent.$parent
      // let status = main._data.toolBarStatusSelect.curValue
      return [
        // <el-tooltip content="附件" placement="top" effect="light">
        //   <a class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment' })}>附件</a>,
        // </el-tooltip>,
        <el-tooltip content="操作日志" placement="top" effect="light">
          <a class="gloable-option-row-optionlog gloable-option-row  fn-inline"
            onClick={() => self.onOptionRowClick({ row, column, optionType: 'report' })}
          >操作日志</a>
        </el-tooltip>
      ]
    }
  },
  leftYjjbData: [
    {
      code: '0',
      id: '0',
      label: '预警级别',
      name: '预警级别',
      text: '预警级别',
      children: store.state.warnInfo.warnLevelOptions.map(item => {
        return {
          ...item,
          code: String(item.value),
          id: String(item.value),
          name: item.label,
          text: item.label,
          children: []
        }
      })
    }
  ]
}
