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
  statusRightToolBarButton: {
    '1': [
      { code: 'add', label: '全量查询', status: 'primary' },
      { code: 'change', label: '增量查询' },
      { code: 'delete', label: '删除预警数据' }
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
      title: '触发方式',
      width: 4,
      field: 'triggerMode',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '手动' },
          { value: '2', label: '自动' }
        ],
        props: {
          placeholder: '触发方式'
        }
      }
    },
    {
      title: '查询方式',
      field: 'exMode',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '全量查询' },
          { value: '2', label: '增量查询' }
        ],
        props: {
          placeholder: '查询方式'
        }
      }
    },
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
      title: '规则名称',
      field: 'fiRuleName',
      align: 'left',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '规则名称'
        }
      }
    },
    {
      title: '执行状态',
      field: 'exStatus',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '执行中' },
          { value: '1', label: '异常停止' },
          { value: '2', label: '执行结束' }
        ],
        props: {
          placeholder: '执行状态'
        }
      }
    },
    {
      title: '执行开始时间',
      field: 'exStartTime',
      itemRender: {
        name: '$vxeInput',
        defaultValue: '',
        props: {
          format: 'hh:mm:ss:c',
          type: 'datetime', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          placeholder: '执行开始时间'
        }
      }
    },
    {
      title: '执行结束时间',
      field: 'exEndTime',
      itemRender: {
        name: '$vxeInput',
        defaultValue: '',
        props: {
          format: 'hh:mm:ss',
          type: 'datetime', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          placeholder: '执行结束时间'
        }
      }
    },
    {
      title: '区划',
      field: 'mofDivCodeList',
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
      title: '年度',
      field: 'fiscalYear',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '2023', label: '2023' },
          { value: '2022', label: '2022' },
          { value: '2021', label: '2021' }
        ],
        props: {
          placeholder: '年度'
        }
      }
    }
  ],
  highQueryData: {
    triggerMode: '',
    triggerClass: '',
    regulationClass: '',
    fiRuleName: '',
    exStatus: '',
    exStartTime: '',
    exEndTime: '',
    fiscalYear: '',
    mofDivCodeList: []
  },
  PoliciesTableColumns: [
    {
      title: '触发方式',
      field: 'triggerMode',
      sortable: false,
      width: 100,
      align: 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
          {
            'value': '1',
            'label': '手动'
          },
          {
            'value': '2',
            'label': '自动'
          }],
        'defaultValue': '',
        'props': {}
      }
    },
    {
      title: '查询方式',
      field: 'exMode',
      sortable: false,
      width: 100,
      align: 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
          {
            'value': '1',
            'label': '全量查询'
          },
          {
            'value': '2',
            'label': '增量查询'
          }],
        'defaultValue': '',
        'props': {}
      }
    },
    {
      title: '监控主题',
      field: 'regulationClassName',
      sortable: false,
      width: 100,
      align: 'center'
    },
    {
      title: '监控主题',
      field: 'regulationClass',
      sortable: false,
      width: 100,
      align: 'center',
      visible: false
    },
    {
      title: '规则名称',
      field: 'fiRuleName',
      sortable: false,
      width: 170,
      align: 'center',
      cellRender: {
        name: '$vxeTableHref',
        options: [],
        defaultValue: '',
        props: {}
      },
      name: '$vxeTableHref'
    },
    {
      title: '区划',
      field: 'mofDivName',
      sortable: false,
      width: 70,
      align: 'center'
    },
    {
      title: '年度',
      field: 'fiscalYear',
      sortable: false,
      width: 70,
      align: 'center'
    },
    {
      title: '本次扫描数据合计（条）',
      field: 'scanTotal',
      sortable: false,
      align: 'center',
      width: 170
    },
    {
      title: '已扫描数据（条）',
      field: 'scanCount',
      sortable: false,
      width: 170,
      align: 'center'
    },
    {
      title: '待扫描数据（条）',
      field: 'noScanCount',
      sortable: false,
      width: 170,
      align: 'center'
    },
    {
      title: '本次预警数据（条）',
      field: 'warnTotal',
      sortable: false,
      width: 170,
      align: 'center',
      cellRender: {
        name: '$vxeTableHref'
      }
    },
    {
      title: '执行状态',
      field: 'exStatus',
      sortable: false,
      width: 170,
      align: 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
          {
            'value': '0',
            'label': '执行中'
          },
          {
            'value': '1',
            'label': '异常停止'
          },
          {
            'value': '2',
            'label': '执行结束'
          }],
        'defaultValue': '',
        'props': {}
      }
    },
    {
      title: '执行开始时间',
      field: 'exStartTime',
      sortable: false,
      align: 'center',
      width: 170
    },
    {
      title: '执行结束时间',
      field: 'exEndTime',
      sortable: false,
      align: 'center',
      width: 170
    },
    {
      title: '耗时',
      field: 'exTime',
      sortable: false,
      align: 'center',
      width: 170
    },
    {
      title: '业务数据最后扫描时间',
      field: 'lastTime',
      sortable: false,
      align: 'center',
      width: 170
    },
    {
      title: '错误信息',
      field: 'errorMsg',
      sortable: false,
      align: 'center',
      width: 270
    }]
}
