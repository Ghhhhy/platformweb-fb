// import store from '@/store/index'
export let proconf = {
  // BsToolBar 状态栏
  toolBarStatusButtons: [
    {
      type: 'button',
      iconName: 'base-daiban.png',
      iconNameActive: 'base-daiban-active.png',
      iconUrl: '',
      label: '待送审',
      code: '0',
      curValue: '0'
    },
    {
      type: 'button',
      iconName: 'base-yiban.png',
      iconNameActive: 'base-yiban-active.png',
      iconUrl: '',
      label: '已送审',
      code: '1',
      curValue: '1'
    },
    {
      type: 'button',
      iconName: 'base-daiban.png',
      iconNameActive: 'base-daiban-active.png',
      iconUrl: '',
      label: '被退回',
      code: '9',
      curValue: '9'
    },
    {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '全部',
      code: '0,1,9',
      curValue: '0,1,9'
    }
  ],
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '0': [
      { code: 'add', label: '新增', status: 'primary' },
      { code: 'approval', label: '送审' },
      { code: 'change', label: '修改' },
      { code: 'del', label: '删除' },
      { code: 'print', label: '打印' }
    ],
    '9': [
      { code: 'approval', label: '送审' },
      { code: 'change', label: '修改' },
      { code: 'del', label: '删除' },
      { code: 'print', label: '打印' }
    ],
    '1': [
      // { code: 'check', label: '查看详情', status: 'primary' },
      { code: 'revoke', label: '撤销', status: 'primary' },
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
    askType: '',
    businessModuleName: '',
    createTime: ''
  },
  PoliciesTableColumns: [
    {
      title: '问询函编码',
      field: 'askCode',
      sortable: false,
      align: 'left'
    },
    {
      title: '被问询区划',
      field: 'askProvinceName',
      sortable: false,
      align: 'left'
    },
    {
      title: '被问询单位',
      field: 'askAgencyName',
      sortable: false,
      align: 'left'
    },
    {
      title: '问询事项',
      field: 'askName',
      sortable: false,
      align: 'left'
    },
    {
      title: '问询函类型',
      field: 'askTypeName',
      sortable: false,
      align: 'left'
    },
    {
      title: '生成人',
      field: 'createPersonName',
      sortable: false,
      align: 'left'
    },
    {
      title: '生成时间',
      field: 'createTime',
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
    // ,{
    //   title: '数据源地址',
    //   field: 'adapterAddr',
    //   sortable: false,
    //   align: 'left'
    // }
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
