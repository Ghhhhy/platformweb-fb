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
      code: '4',
      curValue: '4'
    }
  ],
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '4': [
      { code: 'revoke', label: '退回', status: 'primary' },
      { code: 'check', label: '查看详情' },
      { code: 'print', label: '打印' }
    ]
  },
  highQueryConfig: [
    {
      title: '问询事项',
      field: 'askName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '问询事项'
        }
      }
    },
    {
      title: '问询函类型',
      field: 'askType',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        'props': {
          'config': {
            format: '{name}',
            'treeProps': {
              'nodeKey': 'id',
              'label': 'label',
              'children': 'children'
            },
            'placeholder': '问询函类型',
            'multiple': false,
            'readonly': true,
            'isleaf': false
          }
        }
      }
    },
    {
      title: '区划',
      field: 'province',
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
            'placeholder': '区划',
            'multiple': true,
            'readonly': true,
            'isleaf': false
          }
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
    }
  ],
  highQueryData: {
    regulationType: '',
    warningLevel: '',
    handleType: '',
    isEnable: '',
    createTime: ''
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
      title: '问询函编码',
      field: 'askCode',
      sortable: false,
      filters: false,
      'width': 180,
      align: 'center'
    },
    {
      title: '被问询区划',
      field: 'askProvinceName',
      'width': 180,
      sortable: false,
      align: 'center'
    },
    {
      title: '被函询单位',
      field: 'askAgencyName',
      'width': 180,
      sortable: false,
      align: 'center'
    },
    {
      title: '函询事项',
      field: 'askName',
      'width': 180,
      sortable: false,
      align: 'center'
    },
    {
      title: '问询函类型',
      'width': 180,
      field: 'askTypeName',
      sortable: false,
      align: 'center'
    },
    {
      title: '复核人',
      'width': 180,
      field: 'replyPerson',
      sortable: false,
      align: 'center'
    },
    {
      title: '复核时间',
      'width': 180,
      field: 'replyTime',
      sortable: false,
      align: 'left'
    },
    {
      title: '生成人',
      'width': 180,
      field: 'createPersonName',
      sortable: false,
      align: 'center'
    },
    {
      title: '生成时间',
      'width': 180,
      field: 'createTime',
      sortable: false,
      align: 'left'
    },
    {
      title: '单位回复人',
      'width': 180,
      field: 'agencyPerson',
      sortable: false,
      align: 'left'
    },
    {
      title: '单位回复时间',
      'width': 180,
      field: 'agencyTime',
      sortable: false,
      align: 'left'
    },
    {
      title: '财政回复人',
      'width': 180,
      field: 'financePerson',
      sortable: false,
      align: 'left'
    },
    {
      title: '财政回复时间',
      'width': 180,
      field: 'financeTime',
      sortable: false,
      align: 'left'
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
  gloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      return [
        <el-tooltip content="附件" placement="top" effect="light">
          <a class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment' })}>附件</a>,
        </el-tooltip>
      ]
    }
  }
}
