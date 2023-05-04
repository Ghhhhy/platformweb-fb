// import store from '@/store/index'
export let proconf = {
  highQueryConfig: [
    {
      title: '监控事项名称',
      field: 'declareName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '监控事项名称'
        }
      }
    }
  ],
  highQueryData: {
    declareName: ''
  },
  // BsToolBar 状态栏
  toolBarStatusButtons: [
    {
      type: 'button',
      iconName: 'base-daiban.png',
      iconNameActive: 'base-daiban-active.png',
      iconUrl: '',
      label: '待审核',
      code: '1',
      curValue: '1'
    },
    {
      type: 'button',
      iconName: 'base-yiban.png',
      iconNameActive: 'base-yiban-active.png',
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
      curValue: '3'
    }
  ],
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '1': [
      { code: 'audit', label: '审核', status: 'primary' },
      { code: 'returnData', label: '退回' },
      { code: 'check', label: '查看' },
      { code: 'allBack', label: '退回录入岗' }
      // { code: 'del', label: '删除' }
    ],
    '2': [
      { code: 'revoke', label: '撤销' }
    ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'audit', label: '审核', status: 'primary' },
      { code: 'returnData', label: '退回' },
      { code: 'check', label: '查看' }
      // { code: 'del', label: '删除' }
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
      title: '规则依据',
      field: 'ruleAccord',
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
