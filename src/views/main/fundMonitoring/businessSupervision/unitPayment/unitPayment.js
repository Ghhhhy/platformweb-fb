import store from '@/store/index'
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
    // {
    //   title: '业务年度',
    //   field: 'fiscalYear',
    //   width: '8',
    //   align: 'left',
    //   visible: !store.getters.isFuJian,
    //   formula: '',
    //   itemRender: {
    //     name: '$vxeInput',
    //     // options: [
    //     //   // { value: '2020', label: '2020年' },
    //     //   // { value: '2021', label: '2021年' },
    //     //   { value: '2022', label: '2022年' },
    //     //   { value: '2023', label: '2023年' }
    //     // ],
    //     props: {
    //       clearable: true,
    //       type: 'year',
    //       valueFormat: 'yyyy',
    //       placeholder: '业务年度'
    //     }
    //   }
    // },
    {
      title: '预算单位',
      field: 'agencyCodeList',
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
            'placeholder': '预算单位',
            clearable: true,
            'multiple': true,
            'readonly': true,
            'isleaf': true
          }
        }
      }
    },
    {
      title: '所属处室',
      field: 'manageMofDepCodeList',
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
            'placeholder': '所属处室',
            clearable: true,
            'multiple': true,
            'readonly': true,
            'isleaf': true
          }
        }
      }
    }
  ],
  highQueryData: {
    regulationType: '',
    warningLevel: '',
    firulename: '',
    fiscalYear: store.state?.userInfo?.year,
    agencyCodeName: '',
    manageMofDepCodeName: ''
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
          clearable: true,
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
      key: 'project',
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
      title: '区划名称',
      width: 180,
      field: 'mofDivCodeName',
      key: 'sx',
      treeNode: true,
      sortable: true,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '区划名称'
        }
      }
    },
    {
      title: '预算单位',
      width: 180,
      key: 'sx',
      field: 'agencyCodeName',
      treeNode: true,
      sortable: true,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '预算单位'
        }
      }
    },
    {
      title: '所属处室',
      width: 180,
      key: 'sx',
      field: 'manageMofDepCodeName',
      treeNode: true,
      sortable: true,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '所属处室'
        }
      }
    },
    {
      title: '指标金额',
      width: 180,
      field: 'amount',
      sortable: true,
      filters: false,
      align: 'right',
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '实际支付',
      width: 180,
      field: 'payAppAmt',
      sortable: true,
      filters: false,
      align: 'right',
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '支付进度',
      width: 180,
      field: 'process',
      sortable: true,

      filters: false,
      align: 'center',
      props: {
        showZero: true
      },
      cellRender: {
        name: '$vxeRatio'
      }
    },
    {
      title: '中央资金名称',
      width: 180,
      field: 'trackProCodeName',
      visible: store.getters.isSx,
      treeNode: true,
      sortable: true,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '中央资金名称'
        }
      }
    },
    {
      title: '预算项目名称',
      width: 180,
      field: 'proCodeName',
      visible: store.getters.isSx,
      treeNode: true,
      sortable: true,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '预算项目名称'
        }
      }
    },
    {
      title: '本级文号',
      width: 180,
      field: 'corBgtDocNo',
      visible: store.getters.isSx,
      treeNode: true,
      sortable: true,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '本级文号'
        }
      }
    }
  ]
}
