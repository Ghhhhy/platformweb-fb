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
    //       type: 'year',
    //       valueFormat: 'yyyy',
    //       placeholder: '业务年度'
    //     }
    //   }
    // }
  ],
  highQueryData: {
    fiscalYear: store.state?.userInfo?.year
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
      'width': 180,
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
      title: '地区名称',
      'width': 180,
      field: 'mofDivName',
      sortable: false,
      filters: true,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '地区名称'
        }
      }
    },
    {
      title: '指标文号',
      'width': 180,
      field: 'supBgtDocNoName',
      sortable: false,
      filters: true,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '指标文号'
        }
      }
    },
    {
      title: '接收区划',
      'width': 180,
      field: 'recDivName',
      sortable: false,
      filters: true,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '指标文号'
        }
      }
    },
    {
      title: '预算项目',
      width: 180,
      field: 'proName',
      sortable: false,
      filters: true,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '预算项目'
        }
      }
    },
    {
      title: '资金性质名称',
      width: 180,
      field: 'fundTypeName',
      sortable: false,
      filters: true,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '资金性质名称'
        }
      }
    },
    {
      title: '支出功能科目',
      width: 180,
      field: 'expFuncName',
      sortable: false,
      filters: true,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '支出功能科目'
        }
      }
    },
    {
      title: '转移支付功能分类科目',
      width: 180,
      field: 'tpFuncName',
      sortable: false,
      filters: true,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '转移支付功能分类科目'
        }
      }
    },
    {
      title: '未接收金额',
      width: 180,
      field: 'amount',
      sortable: false,
      filters: false,
      align: 'right',
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: {
        name: '$vxeMoney'
      }
    },
    {
      title: '直达资金标识',
      width: 180,
      field: 'directFlagCode',
      sortable: false,
      filters: true,
      align: 'right',
      formatter({ row }) {
        return row.directFlagCode === '01' ? '是' : '否'
      }
    },
    {
      title: '中央下达时间',
      width: 180,
      field: 'sendDate',
      sortable: false,
      filters: true,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '中央下达时间'
        }
      }
    }
  ]
}
