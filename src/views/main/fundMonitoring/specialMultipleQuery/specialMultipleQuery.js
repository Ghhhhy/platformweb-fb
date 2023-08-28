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
      // { code: 'detail', label: '查看详情', status: 'primary' }
    ]
  },
  highQueryConfig: [
    {
      title: '专项资金名称',
      field: 'speName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '专项资金名称'
        }
      }
    },
    {
      title: '专项编码',
      field: 'speCode',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '专项编码'
        }
      }
    }
  ],
  highQueryData: {
    speCode: '',
    speName: ''
  },
  PoliciesTableColumns: [
    {
      title: '专项资金名称',
      'width': 180,
      field: 'speName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '专项编码',
      'width': 180,
      field: 'speCode',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '设立地区',
      'width': 180,
      field: 'mofDivName',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        defaultValue: '',
        props: {
          format: '{mofDivCode}-{mofDivName}'
        }
      },
      props: {
        format: '{mofDivCode}-{mofDivName}'
      }
    },
    {
      title: '资金管理模式',
      'width': 180,
      field: 'distriTypeName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '开始年份',
      'width': 180,
      field: 'setupYear',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '结束年份',
      'width': 180,
      field: 'endYear',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '主管部门',
      'width': 180,
      field: 'mofDepName',
      sortable: false,
      filters: false,
      align: 'right',
      cellRender: {
        name: '$vxeInput',
        options: [],
        defaultValue: '',
        props: {
          format: '{mofDepCode}-{mofDepName}'
        }
      },
      props: {
        format: '{mofDepCode}-{mofDepName}'
      }
    },
    {
      title: '预算单位',
      'width': 180,
      field: 'agencyName',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        defaultValue: '',
        props: {
          format: '{agencyCode}-{agencyName}'
        }
      },
      props: {
        format: '{agencyCode}-{agencyName}'
      }
    },
    {
      title: '审核状态',
      'width': 180,
      field: 'proBgtreview',
      align: 'center'
      // editRender: {
      //   name: '$vxeSelect',
      //   options: [
      //     { value: '2', label: '待分' },
      //     { value: '1', label: '可执行' }
      //   ],
      //   props: {
      //     placeholder: '审核状态'
      //   }
      // }
    }
  ]
}
