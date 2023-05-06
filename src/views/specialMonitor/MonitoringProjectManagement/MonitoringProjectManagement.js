// import store from '@/store/index'
export let proconf = {
  highQueryConfig: [
    {
      title: '项目编码',
      field: 'objCode',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '项目编码'
        }
      }
    },
    {
      title: '项目名称',
      field: 'objName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '项目名称'
        }
      }
    },
    {
      title: '业务主管处室',
      field: 'manageMofDepCode',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '业务主管处室'
        }
      }
    },
    {
      title: '管理级次',
      field: 'objLevel',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '管理级次'
        }
      }
    }
  ],
  highQueryData: {
    objCode: '',
    objName: '',
    manageMofDepCode: '',
    objLevel: ''
  },
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
      { code: 'add', label: '添加', status: 'primary' },
      { code: 'export', label: '导出' }
    ]
  },
  PoliciesTableColumns: [
    {
      title: '项目编码',
      field: 'objCode',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '项目名称',
      field: 'objName',
      sortable: false,
      align: 'left'
    },
    {
      title: '业务主管处室',
      field: 'manageMofDepName',
      sortable: false,
      align: 'left'
    },
    {
      title: '监控业务分类',
      field: 'bizType',
      sortable: false,
      align: 'left'
    },
    {
      title: '是否私有',
      field: 'pubFlag',
      sortable: false,
      align: 'left'
    },
    {
      title: '管理级次',
      field: 'objLevel',
      sortable: false,
      align: 'left'
    },
    {
      title: '显示顺序',
      field: '',
      sortable: false,
      align: 'left'
    },
    {
      title: '生效日期',
      field: '',
      sortable: false,
      align: 'left'
    },
    {
      title: '失效日期',
      field: '',
      sortable: false,
      align: 'left'
    }
  ]
}
