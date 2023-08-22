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
  // // BsToolBar 右侧按钮
  // statusRightToolBarButton: {
  //   '1': [
  //     { code: 'add', label: '新增', status: 'primary' },
  //     { code: 'change', label: '修改' },
  //     { code: 'del', label: '删除' }
  //   ]
  // },
  // statusRightToolBarButtonByBusDept: {
  //   '1': [
  //     { code: 'add', label: '新增', status: 'primary' },
  //     { code: 'change', label: '修改' },
  //     { code: 'del', label: '删除' }
  //   ]
  // },
  // highQueryConfig: [
  //   {
  //     title: '数据源名称',
  //     field: 'dataSourceName',
  //     width: '8',
  //     align: 'left',
  //     formula: '',
  //     name: '$vxeInput',
  //     itemRender: {
  //       name: '$vxeInput',
  //       options: [],
  //       props: {
  //         placeholder: '数据源名称'
  //       }
  //     }
  //   },
  //   {
  //     title: '业务模块',
  //     field: 'businessModuleName',
  //     width: '8',
  //     align: 'left',
  //     formula: '',
  //     name: '$vxeInput',
  //     itemRender: {
  //       name: '$vxeInput',
  //       options: [],
  //       props: {
  //         placeholder: '业务模块'
  //       }
  //     }
  //   }
  // ],
  highQueryData: {
    dataSourceName: '',
    businessModuleName: ''
  },
  PoliciesTableColumns: [
    {
      title: '用户账号',
      field: 'code',
      sortable: false,
      align: 'left'
    },
    {
      title: '用户姓名',
      field: 'name',
      sortable: false,
      align: 'left'
    },
    {
      title: '区划',
      field: 'mofDivName',
      sortable: false,
      align: 'left'
    },
    {
      title: '单位',
      field: 'orgname',
      sortable: false,
      align: 'left'
    },
    {
      title: '最后登录时间',
      field: 'loginTime',
      sortable: false,
      align: 'left'
    }
  ]
}
