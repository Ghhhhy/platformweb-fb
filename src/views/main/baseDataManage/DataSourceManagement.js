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
      { code: 'check', label: '校验' }
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
      title: '数据源名称',
      field: 'dataSourceName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          clearable: true,
          placeholder: '数据源名称'
        }
      }
    },
    {
      title: '业务模块',
      field: 'businessModuleName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          clearable: true,
          placeholder: '业务模块'
        }
      }
    }
  ],
  highQueryData: {
    dataSourceName: '',
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
    // {
    //   title: '函数类型',
    //   field: 'functionType',
    //   sortable: false,
    //   filters: false,
    //   align: 'left'
    // },
    // {
    //   title: '函数类型',
    //   field: 'functionType',
    //   sortable: false,
    //   filters: false,
    //   align: 'left'
    // },
    /* {
      'title': '数据源编码',
      'field': 'dataSourceCode',
      'align': 'center'
    }, */
    {
      title: '数据源名称',
      field: 'dataSourceName',
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
      title: '数据源描述',
      field: 'dataSourceDesc',
      sortable: false,
      align: 'left'
    },
    {
      title: '数据库名称',
      field: 'databaseName',
      sortable: false,
      align: 'left'
    },
    {
      title: '查询表名',
      field: 'tableName',
      sortable: false,
      align: 'left'
    },
    {
      title: '查询SQL',
      field: 'selectSql',
      sortable: false,
      align: 'left'
    },
    {
      title: '拼接SQL',
      field: 'sqlParam',
      sortable: false,
      align: 'left'
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
