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
    }],
  // BsToolBar 右侧按钮
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'add', label: '新增', status: 'primary' },
      { code: 'change', label: '修改' },
      { code: 'del', label: '删除' },
      { code: 'dirDataSourceSync', label: '标准数据源数据同步' }
    ]
  },
  highQueryConfig: [
    {
      title: '报表名称',
      field: 'reportName',
      width: '8',
      align: 'left',
      formula: '',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '报表名称'
        }
      }
    },
    {
      title: '报表编码',
      field: 'reportCode',
      width: '8',
      align: 'left',
      formula: '',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '报表编码'
        }
      }
    }
  ],
  gloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      return [
        <el-tooltip content="编辑" placement="top" effect="light">
          <a class="gloable-option-row-edit gloable-option-row fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'change' })}>编辑</a>,
        </el-tooltip>
      ]
    }
  },
  highQueryData: {
    reportName: '',
    reportCode: ''
  },
  PoliciesTableColumns: [
    {
      title: '报表名称',
      field: 'reportName',
      sortable: false,
      width: 170,
      align: 'center'
    },
    {
      title: '报表编码',
      field: 'reportCode',
      sortable: false,
      align: 'center',
      width: 270
    },
    {
      title: '数据源sql',
      field: 'sqlCode',
      sortable: false,
      align: 'center',
      width: 270
    },
    {
      title: '口径说明',
      field: 'description',
      sortable: false,
      align: 'center',
      width: 270
    },
    {
      title: '操作',
      field: 'gloableOptionRow',
      className: 'gloableOptionRow',
      align: 'center',
      fixed: 'right',
      sortable: false,
      filters: false,
      width: 140,
      cellRender: {
        name: '$payVoucherInputGloableOptionRow'
      }
    }]
}
