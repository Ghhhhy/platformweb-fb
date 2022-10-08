// import store from '@/store/index'
export let proconf = {
  // BsToolBar 状态栏
  toolBarStatusButtons: [
    {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '未提交',
      code: '0',
      curValue: '0'
    },
    {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '已提交',
      code: '1',
      curValue: '1'
    }
  ],
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '0': [
      { code: 'save', label: '保存', status: 'primary' },
      { code: 'confirm', label: '提交' },
      { code: 'import', label: '导入' },
      { code: 'export', label: '导出' }
    ]
    // '2': [
    //   { code: 'revoke', label: '撤销' }
    // ],
    // '3': [
    //   { code: 'check', label: '查看' }
    // ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'approval', label: '批复', status: 'primary' },
      { code: 'check', label: '查看' },
      // { code: 'del', label: '删除' }
      { code: 'returnData', label: '退回' }
    ],
    '2': [
      { code: 'revoke', label: '撤销' }
    ]
  },
  PoliciesTableColumns: [
    {
      title: '事项编码',
      field: 'declareCode',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '事项名称',
      field: 'declareName',
      sortable: false,
      align: 'left'
    },
    {
      title: '所属财政',
      field: 'mofDivName',
      sortable: false,
      align: 'left'
    },
    {
      title: '所属机构',
      field: 'manageMofName',
      sortable: false,
      align: 'left'
    },
    {
      title: '申报人',
      field: 'createPersonName',
      sortable: false,
      align: 'left'
    },
    {
      title: '申报电话',
      field: 'declarePersonTel',
      sortable: false,
      align: 'left'
    },
    {
      title: '状态',
      field: 'flowStatusName',
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
        name: '$gloableOptionRow'
      }
    }
  ],
  highQueryConfig: [
    {
      title: '月份',
      field: 'month',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: 1, label: '1月' },
          { value: 2, label: '2月' },
          { value: 3, label: '3月' },
          { value: 4, label: '4月' },
          { value: 5, label: '5月' },
          { value: 6, label: '6月' },
          { value: 7, label: '7月' },
          { value: 8, label: '8月' },
          { value: 9, label: '9月' },
          { value: 10, label: '10月' },
          { value: 11, label: '11月' },
          { value: 12, label: '12月' }
        ],
        props: {
          placeholder: '月份'
        }
      }
    }
  ],
  highQueryData: {
    month: ''
  },
  // table 操作按钮
  gloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      // const main = self.$parent.$parent.$parent.$parent
      // let status = main._data.toolBarStatusSelect.curValue
      return [
        <el-tooltip content="附件" placement="top" effect="light">
          <a class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment' })}>附件</a>,
        </el-tooltip>,
        <el-tooltip content="操作日志" placement="top" effect="light">
          <a class="gloable-option-row-optionlog gloable-option-row  fn-inline"
            onClick={() => self.onOptionRowClick({ row, column, optionType: 'report' })}
          >操作日志</a>
        </el-tooltip>
      ]
    }
  }
}
