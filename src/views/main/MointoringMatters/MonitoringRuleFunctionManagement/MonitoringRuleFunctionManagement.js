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
      { code: 'del', label: '删除' },
      { code: 'preview', label: '预览' }
    ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'add', label: '新增', status: 'primary' },
      { code: 'change', label: '修改' },
      { code: 'del', label: '删除' }
    ]
  },
  highQueryConfig: [
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
          { value: '2', label: '自定义SQL' },
          { value: '3', label: '自定义接口' },
          { value: '4', label: '自定义校验接口' }
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
    },
    {
      title: '函数接口',
      field: 'functionApi',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '函数接口'
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
          { value: '预算管理', label: '预算管理' },
          { value: '单位核算', label: '单位核算' }
        ],
        props: {
          placeholder: '业务模块'
        }
      }
    }
  ],
  highQueryData: {
    functionType: '',
    functionName: '',
    functionParameter: '',
    functionApi: '',
    businessModuleName: ''
  },
  PoliciesTableColumns: [
    // {
    //   title: '函数类型',
    //   field: 'functionType',
    //   sortable: false,
    //   filters: false,
    //   align: 'left'
    // },
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
      title: '函数描述',
      field: 'description',
      sortable: false,
      align: 'left'
    },
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
      title: '函数接口',
      field: 'functionApi',
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
  }
}
