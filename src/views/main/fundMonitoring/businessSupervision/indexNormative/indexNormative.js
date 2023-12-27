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
      title: '指标文号不规范',
      field: 'corBgtDocNo',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: store.getters.isSx ? [
          { value: '0', label: '全部' },
          { value: '1', label: '包含特殊字符' },
          { value: '2', label: '不包含汉字内容' }
        ] : [
          { value: '0', label: '全部' },
          { value: '1', label: '包含特殊字符' },
          { value: '2', label: '不包含汉字内容' },
          { value: '3', label: '指标文号为空' }
        ],
        props: {
          clearable: true,
          placeholder: '指标文号不规范'
        }
      }
    }
  ],
  highQueryData: {
    regulationType: '',
    warningLevel: '',
    firulename: '',
    fiscalYear: store.state?.userInfo?.year,
    corBgtDocNo: ''
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
      title: '区划名称',
      width: 180,
      field: 'mofDivName',
      sortable: true,
      filters: true,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '上级文号'
        }
      }
    },
    {
      title: '专项名称',
      'width': 180,
      field: 'speTypeName',
      sortable: true,
      filters: true,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '专项名称'
        }
      }
    },
    {
      title: '上级文号',
      'width': 180,
      field: 'supBgtDocNo',
      sortable: true,
      filters: true,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '专项名称'
        }
      }
    },
    {
      title: '指标文号',
      'width': 180,
      field: 'corBgtDocNo',
      sortable: true,
      filters: true,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '专项名称'
        }
      }
    },
    {
      title: '处室名称',
      'width': 180,
      field: 'manageMofDepName',
      sortable: true,
      filters: true,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '处室名称'
        }
      }
    },
    {
      title: '预算单位',
      'width': 180,
      field: 'agencyName',
      sortable: true,
      filters: true,
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
      title: '指标金额',
      'width': 180,
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
      title: '支出功能分类科目',
      'width': 180,
      field: 'expFuncName',
      sortable: true,
      filters: true,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '支出功能分类科目'
        }
      }
    },
    {
      title: '单据类型',
      'width': 180,
      field: 'bgtExeFlag',
      align: 'center',
      sortable: false,
      filters: true,
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: '2', label: '待分' },
          { value: '1', label: '可执行' }
        ],
        props: {
          placeholder: '单据类型'
        }
      }
    }
  ]
}
