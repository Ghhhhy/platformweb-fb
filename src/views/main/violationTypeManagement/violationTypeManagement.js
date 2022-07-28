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
      { code: 'del', label: '删除' }
    ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'add', label: '新增', status: 'primary' },
      { code: 'change', label: '修改' },
      { code: 'del', label: '删除' }
    ]
  },
  PoliciesTableColumns: [
    {
      title: '违规类型编码',
      field: 'code',
      align: 'center'
    },
    {
      title: '违规类型名称',
      field: 'name',
      sortable: false,
      align: 'center'
    },
    {
      title: '父级名称',
      field: 'parentName',
      sortable: false,
      align: 'center'
    },
    {
      'title': '级次',
      'field': 'levelNo',
      'align': 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
          {
            'value': 1,
            'label': '一级'
          },
          {
            'value': 2,
            'label': '二级'
          },
          {
            'value': 3,
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
      'title': '是否启用',
      'field': 'enable',
      'align': 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
          {
            'value': 0,
            'label': '是'
          },
          {
            'value': 1,
            'label': '否'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      title: '说明',
      field: 'content',
      width: 250,
      visible: false,
      sortable: false,
      align: 'center'
    }
  ]
}
