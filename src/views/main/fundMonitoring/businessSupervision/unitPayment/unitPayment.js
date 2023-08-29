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
      title: '业务年度',
      field: 'fiscalYear',
      width: '8',
      align: 'left',
      formula: '',
      itemRender: {
        name: '$vxeInput',
        // options: [
        //   // { value: '2020', label: '2020年' },
        //   // { value: '2021', label: '2021年' },
        //   { value: '2022', label: '2022年' },
        //   { value: '2023', label: '2023年' }
        // ],
        props: {
          type: 'year',
          valueFormat: 'yyyy',
          placeholder: '业务年度'
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
      title: '单位名称',
      width: 280,
      field: 'agencyCodeName',
      treeNode: true,
      align: 'left',
      cellRender: {
        name: '$vxeIcon5'
      },
      formatter: ({ row }) => {
        return row.agencyCodeName ? row.agencyCodeName : `${row.agencyCode} + '-' +${row.agencyName}`
      }
    },
    {
      title: '指标金额',
      width: 180,
      field: 'amount',
      sortable: false,
      filters: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '实际支付',
      width: 180,
      field: 'payAppAmt',
      sortable: false,
      filters: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '支付进度',
      width: 180,
      field: 'process',
      sortable: false,
      filters: false,
      align: 'center',
      props: {
        showZero: true
      },
      cellRender: {
        name: '$vxeRatio'
      }
    }
  ]
}
