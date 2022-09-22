// import store from '@/store/index'
const getfiscalYearOptions = () => {
  const currentYear = new Date().getFullYear()
  const startYear = 2020
  const options = []
  for (let year = startYear; year <= currentYear; year++) {
    options.push({
      value: year,
      label: `${year}年`
    })
  }
  return options
}
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
      { code: 'full', label: '全量抽取', status: 'primary' },
      { code: 'add', label: '增量抽取', status: 'primary' }
    ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'full', label: '全量抽取', status: 'primary' },
      { code: 'add', label: '增量抽取', status: 'primary' }
    ]
  },
  PoliciesTableColumns: [
    {
      title: '表名',
      field: 'form',
      fixed: '',
      width: '200',
      align: 'center',
      formula: '',
      cellRender: {
        name: '$vxeInput',
        options: [],
        defaultValue: '',
        props: {
          format: '{formCode}-{formName}'
        }
      },
      props: {
        format: '{formCode}-{formName}'
      }
    },
    {
      title: '本次扫描数据合计(条)',
      field: 'allScanned',
      sortable: false,
      align: 'left'
    },
    {
      title: '已扫描数据合计(条)',
      field: 'scanned',
      sortable: false,
      align: 'left'
    },
    {
      title: '待扫描数据合计(条)',
      field: 'notScanned',
      sortable: false,
      align: 'left'
    },
    {
      title: '执行状态',
      field: 'executeStatus',
      sortable: false,
      align: 'left',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
          {
            'value': '1',
            'label': '执行完成'
          },
          {
            'value': '2',
            'label': '执行中'
          }
        ]
      }
    },
    {
      title: '执行开始时间',
      field: 'startTime',
      sortable: false,
      align: 'left'
    },
    {
      title: '执行结束时间',
      field: 'endTime',
      sortable: false,
      align: 'left'
    }
  ],
  highQueryConfig: [
    {
      title: '业务年度',
      field: 'fiscalYear',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: getfiscalYearOptions(),
        props: {
          placeholder: '业务年度'
        }
      }
    }
  ],
  highQueryData: {
    declareName: '',
    createPersonName: '',
    fiscalYear: ''
  }
}
