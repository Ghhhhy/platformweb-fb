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
      label: '全部',
      code: '1',
      curValue: '1'
    }
  ],
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '1': [
      { code: 'handle', label: '处理', status: 'primary' },
      { code: 'lookDetail', label: '查看详情' }
    ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'handle', label: '处理', status: 'primary' },
      { code: 'lookDetail', label: '查看详情' }
    ]
  },
  highQueryConfig: [
    {
      title: '状态',
      field: 'status',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '待处理' },
          { value: '2', label: '已处理' }
        ],
        props: {
          placeholder: '状态'
        }
      }
    },
    {
      title: '日期',
      field: 'date',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeTime',
      itemRender: {
        name: '$vxeTime',
        options: [],
        props: {
          placeholder: '日期'
        }
      }
    },
    {
      title: '业务类型',
      field: 'businessType',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '业务类型'
        }
      }
    },
    {
      title: '单据编号',
      field: 'invoiceCode',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '单据编号'
        }
      }
    },
    {
      title: '摘要',
      field: 'summary',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '摘要'
        }
      }
    },
    {
      title: '监控时间',
      field: 'createTime',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeTime',
      itemRender: {
        name: '$vxeTime',
        options: [],
        props: {
          placeholder: '监控时间'
        }
      }
    }
  ],
  highQueryData: {
    status: '',
    date: '',
    businessType: '',
    invoiceCode: '',
    summary: '',
    createTime: ''
  },
  PoliciesTableColumns: [
    {
      'title': '状态',
      'field': 'status',
      'align': 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
          {
            'value': '1',
            'label': '待处理'
          },
          {
            'value': '2',
            'label': '已处理'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      title: '监控数据编码',
      field: 'warningCode',
      sortable: false,
      align: 'left'
    },
    {
      title: '区划',
      field: 'mofDivCode',
      sortable: false,
      align: 'left'
    },
    {
      title: '日期',
      field: 'date',
      sortable: false,
      align: 'left'
    },
    {
      title: '业务类型',
      field: 'businessType',
      sortable: false,
      align: 'left'
    },
    {
      title: '单据编号',
      field: 'invoiceCode',
      sortable: false,
      align: 'left'
    },
    {
      title: '摘要',
      field: 'summary',
      sortable: false,
      align: 'left'
    },
    {
      'title': '金额',
      'field': 'amount',
      'sortable': 'true',
      'align': 'right',
      combinedType: ['average', 'subTotal', 'total', 'totalAll'],
      cellRender: {
        name: '$moneyRender'
      }
    },
    {
      title: '监控时间',
      field: 'createTime',
      sortable: false,
      align: 'left'
    }
  ],
  // 处理
  handletableColumnsConfig: [
    {
      title: '规则名称',
      field: 'regulationName',
      sortable: false,
      align: 'left'
    },
    {
      'title': '预警级别',
      'field': 'warningLevel',
      'align': 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
          {
            'value': '1',
            'label': '一级'
          },
          {
            'value': '2',
            'label': '二级'
          },
          {
            'value': '3',
            'label': '三级'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      'title': '处理方式',
      'field': 'handleType',
      'align': 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': store.state.warnInfo.warnControlTypeOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    }
  ],
  incomeMsgConfig: [
    {
      field: 'date',
      title: '日期',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '日期', type: 'date', disabled: true }
      }
    },
    {
      field: 'businessType',
      title: '业务类型',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '业务类型', disabled: true }
      }
    },
    {
      field: 'invoiceCode',
      title: '单据编号',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '单据编号', disabled: true }
      }
    },
    {
      field: 'summary',
      title: '摘要',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '摘要', disabled: true }
      }
    },
    {
      title: '金额',
      field: 'amount',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '金额' }
      }
    },
    {
      title: '借方科目',
      field: 'borrowSubject',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '借方科目' }
      }
    },
    {
      title: '借方科目辅助核算',
      field: 'borrowSubjectAccount',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '借方科目辅助核算' }
      }
    },
    {
      title: '贷方科目',
      field: 'loanSubject',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '贷方科目' }
      }
    },
    {
      title: '贷方科目辅助核算',
      field: 'loanSubjectAccount',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '贷方科目辅助核算' }
      }
    },
    {
      title: '监控时间',
      field: 'createTime',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { type: 'date', disabled: true, placeholder: '监控时间' }
      }
    }
  ],
  incomeMsgData: {
    date: '',
    businessType: '',
    invoiceCode: '',
    summary: '',
    amount: '',
    borrowSubject: '',
    borrowSubjectAccount: '',
    loanSubject: '',
    loanSubjectAccount: '',
    createTime: ''
  }
}
