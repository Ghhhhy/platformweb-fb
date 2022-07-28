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
  statusButtons: [
    {
      code: '1',
      label: '全部',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      type: 'button',
      curValue: '1'
    },
    {
      code: '2',
      label: '新增',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      type: 'button',
      curValue: '2'
    },
    {
      code: '3',
      label: '待审核',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      type: 'button',
      curValue: '3'
    },
    {
      code: '4',
      label: '已审核',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      type: 'button',
      curValue: '4'
    }
  ],
  curStatusButton: {
    label: '全部',
    code: '1',
    type: 'button',
    curValue: '1'
  },
  buttons1: {
    1: [
      {
        label: '补贴到人导入',
        code: 'import'
      },
      {
        label: '下载到人模板',
        code: 'download'
      },
      {
        label: '补贴到企业导入',
        code: 'import'
      },
      {
        label: '下载到企业模板',
        code: 'download1'
      },
      {
        label: '删除',
        code: 'delete'
      },
      {
        label: '送审',
        code: 'verify',
        status: 'primary'
      },
      {
        label: '审核',
        code: 'verifys',
        status: 'primary'
      },
      {
        label: '退回',
        code: 'back'
      },
      {
        label: '收回',
        code: 'sh'
      },
      {
        label: '流转记录',
        code: 'jl'
      }
    ],
    2: [
      {
        label: '补贴到人导入',
        code: 'import'
      },
      {
        label: '下载到人模板',
        code: 'download'
      },
      {
        label: '补贴到企业导入',
        code: 'import'
      },
      {
        label: '下载到企业模板',
        code: 'download1'
      },
      {
        label: '删除',
        code: 'delete'
      },
      {
        label: '送审',
        code: 'verify',
        status: 'primary'
      },
      {
        label: '流转记录',
        code: 'jl'
      }
    ],
    3: [
      {
        label: '审核',
        code: 'verifys',
        status: 'primary'
      },
      {
        label: '退回',
        code: 'back'
      },
      {
        label: '收回',
        code: 'sh'
      },
      {
        label: '流转记录',
        code: 'jl'
      }
    ],
    4: [
      {
        label: '送审',
        code: 'verify',
        status: 'primary'
      },
      {
        label: '收回',
        code: 'sh'
      },
      {
        label: '流转记录',
        code: 'jl'
      }
    ]
  },
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '1': [
      // { code: 'detail', label: '查看详情', status: 'primary' }
    ]
  },
  highQueryConfig: [
    {
      title: '批次',
      field: 'pc',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '批次'
        }
      }
    }
  ],
  highQueryData: {
    regulationType: '',
    warningLevel: '',
    firulename: ''
  },
  // 新增弹窗高级查询
  sethighQueryConfig: [
    // {
    //   title: '规则模板编码',
    //   field: 'declareCode',
    //   width: '8',
    //   align: 'left',
    //   formula: '',
    //   name: '$vxeInput',
    //   itemRender: {
    //     name: '$vxeInput',
    //     options: [],
    //     props: {
    //       placeholder: '规则模板编码'
    //     }
    //   }
    // },
    {
      title: '规则模板名称',
      field: 'ruleTemplateName',
      width: 180,
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '规则模板名称'
        }
      }
    }
  ],
  sethighQueryData: {
    declareCode: '',
    ruleTemplateName: ''
  },
  PoliciesTableColumns: [
    {
      title: '批次',
      width: 180,
      field: 'pc',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '项目',
      width: 180,
      field: 'xm',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '金额',
      width: 180,
      field: 'amount',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '制单时间',
      width: 180,
      field: 'zdsj',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支付状态',
      width: 180,
      field: 'zfzt',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '状态',
      width: 180,
      field: 'status',
      sortable: false,
      filters: false,
      align: 'center'
    }
  ]
}
