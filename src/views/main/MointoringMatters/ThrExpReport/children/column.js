// import store from '@/store/index'
const proconf = {
  proColumn: [
    {
      title: '资金名称',
      field: 'cenTraProName',
      align: 'center'
    },
    {
      title: '预算单位',
      field: 'agencyName',
      sortable: false,
      align: 'center'
    },
    {
      title: '项目名称',
      field: 'proName',
      sortable: false,
      align: 'center'
    },
    {
      title: '支出功能科目',
      field: 'expFuncName',
      sortable: false,
      align: 'center'
    },
    {
      title: '预算金额',
      align: 'center',
      children: [
        {
          title: '总金额',
          field: 'amount',
          sortable: false,
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
          title: '其中：中央直达资金',
          field: 'amountZd',
          sortable: false,
          align: 'right',
          combinedType: [
            'average',
            'subTotal',
            'total',
            'totalAll'
          ],
          cellRender: { name: '$vxeMoney' }
        }
      ]
    },
    {
      title: '支付金额',
      align: 'center',
      children: [
        {
          title: '总金额',
          field: 'payAppAmt',
          sortable: false,
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
          title: '其中：中央直达资金',
          field: 'payAppAmtZd',
          sortable: false,
          align: 'right',
          combinedType: [
            'average',
            'subTotal',
            'total',
            'totalAll'
          ],
          cellRender: { name: '$vxeMoney' }
        }
      ]
    },
    {
      title: '惠企利民',
      field: 'hqlm',
      sortable: false,
      align: 'center'
    }
  ],
  fdqzbmxColumn: [
    {
      title: '处室名称',
      field: 'bgtMofDepName',
      align: 'center'
    },
    {
      title: '单位名称',
      field: 'agencyName',
      sortable: false,
      align: 'center'
    },
    {
      title: '中央直达资金名称',
      field: 'cenTraProName',
      sortable: false,
      align: 'center'
    },
    {
      title: '支出科目名称',
      field: 'expFuncName',
      sortable: false,
      align: 'center'
    },
    {
      title: '本级专项资金名称',
      field: 'speTypeName',
      sortable: false,
      align: 'center'
    },
    {
      title: '上级文号',
      field: 'supBgtDocNoName',
      sortable: false,
      align: 'center'
    },
    {
      title: '本级文号',
      field: 'corBgtDocNoName',
      sortable: false,
      align: 'center'
    },
    {
      title: '预算金额',
      field: 'amount',
      sortable: false,
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
      title: '支出金额',
      field: 'payAppAmt',
      sortable: false,
      align: 'right',
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: { name: '$vxeMoney' }
    }
  ],
  fdqzcmxColumn: [
    {
      title: '预算单位',
      field: 'agencyName',
      align: 'center'
    },
    {
      title: '项目名称',
      field: 'proName',
      sortable: false,
      align: 'center'
    },
    {
      title: '金额',
      field: 'payAppAmt',
      sortable: false,
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
      title: '其中：中央直达资金',
      field: 'payAppAmtZd',
      sortable: false,
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
      title: '用途',
      field: 'useDes',
      sortable: false,
      align: 'center'
    },
    {
      title: '付款方账户名称',
      field: 'payAcctName',
      sortable: false,
      align: 'center'
    },
    {
      title: '付款方账号',
      field: 'payAcctNo',
      sortable: false,
      align: 'center'
    },
    {
      title: '收款方账户名称',
      field: 'payeeAcctName',
      sortable: false,
      align: 'center'
    },
    {
      title: '收款方账号',
      field: 'payeeAcctNo',
      sortable: false,
      align: 'center'
    },
    {
      title: '付款日期',
      field: 'xpayDate',
      sortable: false,
      align: 'center'
    }
  ],
  // 支出明细
  expenditureColumn: [
    {
      title: '预算单位',
      field: 'agencyCodeName',
      align: 'center'
    },
    {
      title: '项目名称',
      field: 'proCodeName',
      sortable: false,
      align: 'center'
    },
    {
      title: '金额（单位:万元）',
      field: 'amount',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '其中：中央直达资金',
      field: 'payAppAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '用途',
      field: 'useDes',
      sortable: false,
      align: 'center'
    },
    {
      title: '付款方账户名称',
      field: 'payAcctName',
      sortable: false,
      align: 'center'
    },
    {
      title: '付款方账号',
      field: 'payAcctNo',
      sortable: false,
      align: 'center'
    },
    {
      title: '收款方账户名称',
      field: 'payeeAcctName',
      sortable: false,
      align: 'center'
    },
    {
      title: '收款方账号',
      field: 'payeeAcctNo',
      sortable: false,
      align: 'center'
    },
    {
      title: '付款日期',
      field: 'xpayDate',
      sortable: false,
      align: 'center'
    }
  ],
  payColumn: [
    {
      title: '预算单位',
      field: 'agencyName',
      sortable: true,
      align: 'center'
    },
    {
      title: '项目名称',
      field: 'proName',
      sortable: true,
      align: 'center'
    },
    {
      title: '用途',
      field: 'useDes',
      sortable: true,
      align: 'center'
    },
    {
      title: '支付申请单号',
      field: 'payAppNo',
      sortable: true,
      align: 'center'
    },
    {
      title: '付款方账户名称',
      field: 'payAcctName',
      sortable: true,
      align: 'center'
    },
    {
      title: '付款方账号',
      field: 'payAcctNo',
      sortable: true,
      align: 'center'
    },
    {
      title: '收款方账户名称',
      field: 'payeeAcctName',
      sortable: true,
      align: 'center'
    },
    {
      title: '收款方账号',
      field: 'payeeAcctNo',
      sortable: true,
      align: 'center'
    },
    {
      title: '支付金额',
      field: 'payAppAmt',
      sortable: true,
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
      title: '付款日期',
      field: 'xpayDate',
      sortable: true,
      align: 'center'
    }
  ],
  // 项目明细
  projectColumn: [
    {
      title: '资金名称',
      field: 'speTypeName',
      align: 'center'
    },
    {
      title: '预算单位',
      field: 'agencyName',
      sortable: false,
      align: 'center'
    },
    {
      title: '项目名称',
      field: 'proName',
      sortable: false,
      align: 'center'
    },
    {
      title: '支出功能科目',
      field: 'xjExpFuncName',
      sortable: false,
      align: 'center'
    },
    {
      title: '预算金额（单位:万元）',
      align: 'center',
      children: [
        {
          title: '总金额',
          field: 'fpAmount',
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '其中：中央直达资金',
          field: 'fpAmount',
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        }
      ]
    },
    {
      title: '支付金额（单位:万元）',
      align: 'center',
      children: [
        {
          title: '总金额',
          field: 'payAppAmt',
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '其中：中央直达资金',
          field: 'payAppAmt',
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        }
      ]
    },
    {
      title: '惠企利民',
      field: '',
      sortable: false,
      align: 'center'
    }
  ],
  // 指标明细
  targetColumn: [
    {
      title: '处室名称',
      field: 'bgtMofDepName',
      align: 'center'
    },
    {
      title: '预算单位',
      field: 'agencyName',
      sortable: false,
      align: 'center'
    },
    {
      title: '中央直达资金名称',
      field: 'trackProName',
      sortable: false,
      align: 'center'
    },
    {
      title: '支出科目名称',
      field: 'expFuncName',
      sortable: false,
      align: 'center'
    },
    {
      title: '本级专项资金名称',
      field: 'speTypeName',
      sortable: false,
      align: 'center'
    },
    {
      title: '上级文号',
      field: 'corBgtDocNo',
      sortable: false,
      align: 'center'
    },
    {
      title: '本级文号',
      field: 'supBgtDocNo',
      sortable: false,
      align: 'center'
    },
    {
      title: '预算金额',
      field: 'amount',
      sortable: true,
      align: 'right',
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: { name: '$vxeMoney' }
    }
  ],
  // 企业明细
  ythzcColumn: [
    {
      title: '资金管理处室',
      field: 'bgtMofDepName',
      width: 200,
      sortable: false,
      filters: false,
      align: 'center',
      formatter({ row }) {
        return row.bgtMofDepCode && row.bgtMofDepName ? `${row.bgtMofDepCode}-${row.bgtMofDepName}` : ''
      }
    },
    {
      title: '功能分类科目',
      field: 'expFuncName',
      width: 200,
      sortable: false,
      filters: false,
      align: 'center',
      formatter({ row }) {
        return row.expFuncCode && row.expFuncName ? `${row.expFuncCode}-${row.expFuncName}` : ''
      }
    },
    {
      title: '指标文号',
      width: 180,
      field: 'corBgtDocNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算项目',
      width: 180,
      field: 'ysxm',
      sortable: false,
      filters: false,
      align: 'center',
      formula: '',
      formatter({ row }) {
        return row.proCode && row.proName ? `${row.proCode}-${row.proName}` : ''
      }
    },
    {
      title: '预算单位',
      width: 180,
      field: 'ysdw',
      sortable: false,
      filters: false,
      align: 'center',
      formula: '',
      formatter({ row }) {
        return row.agencyCode && row.agencyName ? `${row.agencyCode}-${row.agencyName}` : ''
      }
    },
    {
      title: '资金用途',
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
      title: '付款人开户银行',
      width: 180,
      field: 'payAcctBankName',
      sortable: false,
      filters: false,
      align: 'center'
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
      title: '收款人开户银行',
      width: 180,
      field: 'payeeAcctBankName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支出金额',
      field: 'payAppAmt',
      sortable: true,
      align: 'right',
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: { name: '$vxeMoney' }
    }
  ],
  businessColumn: [
    {
      title: '统一社会信用代码',
      field: 'creditCode',
      align: 'center'
    },
    {
      title: '企业名称',
      field: 'businessName',
      sortable: false,
      align: 'center'
    },
    {
      title: '补助金额（单位:万元）',
      field: 'bzAmount',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  // 个人明细
  yktzcColumn: [
    {
      title: '指标文号',
      field: 'corBgtDocNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算项目',
      field: 'ysxm',
      sortable: false,
      filters: false,
      align: 'center',
      formula: '',
      formatter({ row }) {
        return row.proCode && row.proName ? `${row.proCode}-${row.proName}` : ''
      }
    },
    {
      title: '收款账户名称',
      field: 'payeeAcctName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '收款方账户',
      field: 'payeeAcctNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '收款人开户银行',
      field: 'payeeAcctBankName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支出金额',
      field: 'amount',
      sortable: true,
      align: 'right',
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: { name: '$vxeMoney' }
    }
  ],
  personalColumn: [
    {
      title: '身份证号',
      field: 'card',
      align: 'center'
    },
    {
      title: '姓名',
      field: 'name',
      sortable: false,
      align: 'center'
    },
    {
      title: '补助金额',
      field: 'bzAmount',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  // 中央下达项目明细
  zyxdProColumn: [
    {
      title: '区划编码',
      field: 'mofDivCode',
      align: 'center',
      visible: false
    },
    {
      title: '项目编码',
      field: 'proCode',
      align: 'center',
      sortable: true
    },
    {
      title: '项目名称',
      field: 'proName',
      sortable: false,
      align: 'center'
    },
    {
      title: '主管处室',
      field: 'manageMofDepName',
      align: 'center'
    },
    {
      title: '指标文号',
      field: 'corBgtDocNo',
      sortable: false,
      align: 'center'
    },
    {
      title: '金额',
      field: 'fpAmount',
      sortable: true,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  // 中央下达项目明细
  zyxdProfzjColumn: [
    {
      title: '项目编码',
      field: 'proCode',
      align: 'center',
      sortable: true
    },
    {
      title: '项目名称',
      field: 'proName',
      sortable: false,
      align: 'center'
    },
    {
      title: '中央下达',
      field: 'amountZyxd',
      sortable: true,
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
      title: '分配下级',
      field: 'amountxjfp',
      sortable: true,
      align: 'right',
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: { name: '$vxeMoney' }
    }
  ],
  zyzdzjmxColumn: [
    {
      title: '中央资金名称',
      field: 'trackProName',
      sortable: false,
      align: 'center'
    },
    {
      title: '处室名称',
      field: 'manageMofDepName',
      sortable: false,
      filters: false,
      align: 'center',
      formula: ''
    },
    {
      title: '预算项目',
      field: 'proName',
      sortable: false,
      filters: false,
      align: 'center',
      formula: ''
    },
    {
      title: '本级指标文号',
      field: 'corBgtDocNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '功能分类科目',
      field: 'expFuncName',
      sortable: false,
      filters: false,
      align: 'center',
      formula: ''
    },
    {
      title: '中央下达金额',
      field: 'amount',
      sortable: true,
      align: 'right',
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: { name: '$vxeMoney' }
    }
  ],
  zyxdProfzjhColumn: [
    {
      title: '项目编码',
      field: 'proCode',
      align: 'center',
      sortable: true
    },
    {
      title: '项目名称',
      field: 'proName',
      sortable: false,
      align: 'center'
    },
    {
      title: '中央下达',
      field: 'amountZyxd',
      sortable: true,
      align: 'right',
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: { name: '$vxeMoney' }
    }
  ],
  zyxdProfzjwfpColumn: [
    {
      title: '项目编码',
      field: 'proCode',
      align: 'center',
      sortable: true
    },
    {
      title: '项目名称',
      field: 'proName',
      sortable: false,
      align: 'center'
    },
    {
      title: '中央下达',
      field: 'amountZyxd',
      sortable: true,
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
      title: '分配本级',
      field: 'amountbjfp',
      sortable: true,
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
      title: '分配下级',
      field: 'amountxjfp',
      sortable: true,
      align: 'right',
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: { name: '$vxeMoney' }
    }
  ],
  zyxdProfzjwfpxColumn: [
    {
      title: '项目编码',
      field: 'proCode',
      align: 'center',
      sortable: true
    },
    {
      title: '项目名称',
      field: 'proName',
      sortable: false,
      align: 'center'
    },
    {
      title: '中央下达',
      field: 'amountZyxd',
      sortable: false,
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
      title: '已分配',
      field: 'amountbjfp',
      sortable: false,
      align: 'right',
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: { name: '$vxeMoney' }
    }
  ],
  highQueryConfig: [
    {
      title: '项目名称',
      field: 'proName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '项目名称'
        }
      }
    }

  ],
  highQueryData: {
    proName: ''
  },
  highQueryConfig2: [
    {
      title: '预算单位',
      field: 'agencyName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '预算单位'
        }
      }
    },
    {
      title: '用途',
      field: 'useDes',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '用途'
        }
      }
    },
    {
      title: '支付申请单号',
      field: 'payAppNo',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '支付申请单号'
        }
      }
    },
    {
      title: '项目名称',
      field: 'proName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '项目名称'
        }
      }
    }
  ],
  highQueryData2: {
    proName: '',
    agencyName: '',
    useDes: '',
    payAppNo: ''
  },
  highQueryConfig3: [
    {
      title: '预算单位',
      field: 'agencyName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '预算单位'
        }
      }
    },
    {
      title: '项目名称',
      field: 'proName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '项目名称'
        }
      }
    },
    {
      title: '用途',
      field: 'useDes',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '用途'
        }
      }
    },
    {
      title: '付款方账户名称',
      field: 'payAcctName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '付款方账户名称'
        }
      }
    },
    {
      title: '付款方账号',
      field: 'payAcctNo',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '付款方账号'
        }
      }
    },
    {
      title: '收款方账户名称',
      field: 'payeeAcctName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '收款方账户名称'
        }
      }
    },
    {
      title: '收款方账号',
      field: 'payeeAcctNo',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '收款方账号'
        }
      }
    },
    {
      title: '付款日期',
      field: 'xpayDate',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeTime',
        props: {
          format: 'YYYY-MM-DD', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          type: 'date',
          placeholder: '付款日期'
        }
      }
    }

  ],
  highQueryData3: {
    proName: '',
    agencyName: '',
    useDes: '',
    payAcctNo: '',
    payAcctName: '',
    payeeAcctName: '',
    payeeAcctNo: '',
    xpayDate: ''
  },
  highQueryData7: {
    proName: '',
    cenTraProName: '',
    expFuncName: '',
    corBgtDocNo: '',
    manageMofDepName: ''
  },
  highQueryConfig7: [
    {
      title: '中央资金名称',
      field: 'cenTraProName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '中央资金名称'
        }
      }
    },
    {
      title: '处室名称',
      field: 'manageMofDepName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '处室名称'
        }
      }
    },
    {
      title: '预算项目',
      field: 'proName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '预算项目'
        }
      }
    },
    {
      title: '本级指标文号',
      field: 'corBgtDocNo',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '本级指标文号'
        }
      }
    },
    {
      title: '功能分类科目',
      field: 'expFuncName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '功能分类科目'
        }
      }
    }

  ],
  highQueryConfig4: [
    {
      title: '资金名称',
      field: 'cenTraProName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '资金名称'
        }
      }
    },
    {
      title: '预算单位',
      field: 'agencyName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '预算单位'
        }
      }
    },
    {
      title: '项目名称',
      field: 'proName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '项目名称'
        }
      }
    },
    {
      title: '支出功能科目',
      field: 'expFuncName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '支出功能科目'
        }
      }
    }

  ],
  highQueryData4: {
    proName: '',
    agencyName: '',
    cenTraProName: '',
    expFuncName: ''
  },
  highQueryConfig5: [
    {
      title: '处室名称',
      field: 'bgtMofDepName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '处室名称'
        }
      }
    },
    {
      title: '单位名称',
      field: 'agencyName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '单位名称'
        }
      }
    },
    {
      title: '中央直达资金名称',
      field: 'cenTraProName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '中央直达资金名称'
        }
      }
    },
    {
      title: '支出科目名称',
      field: 'expFuncName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '支出科目名称'
        }
      }
    },
    {
      title: '本级专项资金名称',
      field: 'speTypeName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '本级专项资金名称'
        }
      }
    },
    {
      title: '上级文号',
      field: 'supBgtDocNoName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '上级文号'
        }
      }
    },
    {
      title: '本级文号',
      field: 'corBgtDocNoName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '本级文号'
        }
      }
    }

  ],
  highQueryData5: {
    bgtMofDepName: '',
    agencyName: '',
    cenTraProName: '',
    expFuncName: '',
    speTypeName: '',
    supBgtDocNoName: '',
    corBgtDocNoName: ''
  },
  highQueryConfig1: [
    {
      title: '单位名称',
      field: 'agencyName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '单位名称'
        }
      }
    },
    {
      title: '中央直达资金名称',
      field: 'trackProName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '中央直达资金名称'
        }
      }
    },
    {
      title: '支出科目名称',
      field: 'expFuncName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '支出科目名称'
        }
      }
    },
    {
      title: '本级专项资金名称',
      field: 'speTypeName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '本级专项资金名称'
        }
      }
    },
    {
      title: '上级文号',
      field: 'supBgtDocNo',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '上级文号'
        }
      }
    },
    {
      title: '本级文号',
      field: 'corBgtDocNo',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '上级文号'
        }
      }
    }
  ],
  highQueryData1: {
    agencyName: '',
    speTypeName: '',
    expFuncName: '',
    trackProName: '',
    corBgtDocNo: '',
    supBgtDocNo: ''
  }
}
export default proconf
