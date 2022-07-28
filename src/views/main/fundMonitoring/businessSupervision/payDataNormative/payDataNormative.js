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
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '2020', label: '2020年' },
          { value: '2021', label: '2021年' },
          { value: '2022', label: '2022年' }
        ],
        props: {
          placeholder: '业务年度'
        }
      }
    },
    {
      title: '用途',
      field: 'userDesStr',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '全部' },
          { value: '2', label: '不包含汉字内容' },
          { value: '4', label: '内容为空' },
          { value: '5', label: '包含特殊字符且不包含~' }
        ],
        props: {
          placeholder: '用途'
        }
      }
    },
    {
      title: '付款账户名称',
      field: 'payAcctNameStr',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '全部' },
          { value: '1', label: '包含特殊字符' },
          { value: '9', label: '全部为数字' }
        ],
        props: {
          placeholder: '付款账户名称'
        }
      }
    },
    {
      title: '付款账户',
      field: 'payAcctNoStr',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '全部' },
          { value: '1', label: '包含特殊字符' },
          { value: '6', label: '包含中文字符' }
        ],
        props: {
          placeholder: '付款账户'
        }
      }
    },
    {
      title: '收款账户名称',
      field: 'payeeAcctNameStr',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '全部' },
          { value: '1', label: '包含特殊字符' },
          { value: '9', label: '全部为数字' }
        ],
        props: {
          placeholder: '收款账户名称'
        }
      }
    },
    {
      title: '收款账号',
      field: 'payeeAcctNoStr',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '全部' },
          { value: '1', label: '包含特殊字符' },
          { value: '6', label: '包含中文字符' }
        ],
        props: {
          placeholder: '收款账号'
        }
      }
    },
    {
      title: '项目名称',
      field: 'proNameStr',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '全部' },
          { value: '1', label: '包含特殊字符' },
          { value: '2', label: '不包含汉字内容' }
        ],
        props: {
          placeholder: '项目名称'
        }
      }
    },
    {
      title: '付款日期',
      field: 'payTimeStr',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '全部' },
          { value: '7', label: '付款日期大于当日' },
          { value: '8', label: '导入日期早于支付日期' }
        ],
        props: {
          placeholder: '付款日期'
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
      title: '地区名称',
      width: 180,
      field: '',
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
      title: '处室名称',
      width: 180,
      field: 'manageMofDepName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支出功能分类科目',
      width: 180,
      field: 'expFuncName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '项目名称',
      width: 180,
      field: 'proName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '指标文号',
      width: 180,
      field: 'corBgtDocNoName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '用途',
      width: 180,
      field: 'useDes',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '付款账户名称',
      width: 180,
      field: 'payAcctName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '付款方账户',
      width: 180,
      field: 'payAcctNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支付日期',
      width: 180,
      field: 'payTime',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '导入日期',
      width: 180,
      field: 'createTime',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支付日期明细',
      width: 180,
      field: 'payDateDetail',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支付确认日期明细',
      width: 180,
      field: 'xpayDate',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '金额',
      width: 180,
      field: 'payAppAmt',
      sortable: false,
      filters: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '收款账户名称',
      width: 180,
      field: 'payeeAcctName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '收款方账户',
      width: 180,
      field: 'payeeAcctNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '结算方式',
      width: 180,
      field: 'setModeName',
      sortable: false,
      filters: false,
      align: 'center'
    }
  ]
}
