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
  highQueryConfig: [
    {
      title: '用户名称',
      field: 'name',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '用户名称'
        }
      }
    },
    {
      title: '用户账号',
      field: 'code',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '用户账号'
        }
      }
    },
    {
      title: '单位',
      field: 'orgname',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '单位'
        }
      }
    }
  ],
  highQueryData: {
    name: '',
    orgname: ''
  },
  PoliciesTableColumns: [
    {
      title: '用户账号',
      field: 'code',
      sortable: false,
      align: 'left'
    },
    {
      title: '用户名称',
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
    },
    {
      title: '距今天数（天）',
      field: 'logOutDays',
      sortable: false,
      align: 'left'
    }
  ]
}
