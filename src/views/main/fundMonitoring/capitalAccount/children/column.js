// import store from '@/store/index'
const proconf = {
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
      title: '单位名称',
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
    // {
    //   title: '支出功能科目编码',
    //   filters: false,
    //   width: 140,
    //   field: 'expFuncCode',
    //   sortable: false,
    //   align: 'right'
    // },
    {
      title: '支出功能科目',
      filters: false,
      width: 140,
      field: 'expFuncName',
      formatter({ row }) {
        return row.expFuncCode && row.expFuncName ? `${row.expFuncCode}-${row.expFuncName}` : ''
      },
      sortable: false,
      align: 'right'
    },
    {
      title: '政府支出经济分类',
      filters: false,
      width: 140,
      field: 'govBgtEcoName',
      formatter({ row }) {
        return row.govBgtEcoCode && row.govBgtEcoName ? `${row.govBgtEcoCode}-${row.govBgtEcoName}` : ''
      },
      sortable: false,
      align: 'right'
    },
    {
      title: '部门支出经济分类',
      filters: false,
      width: 140,
      field: 'depBgtEcoName',
      formatter({ row }) {
        return row.depBgtEcoCode && row.depBgtEcoName ? `${row.depBgtEcoCode}-${row.depBgtEcoName}` : ''
      },
      sortable: false,
      align: 'right'
    },
    {
      title: '支付方式',
      filters: false,
      width: 140,
      field: 'payTypeName',
      sortable: false,
      align: 'right'
    },
    {
      title: '收款人银行',
      filters: false,
      width: 140,
      field: 'payeeAcctBankName',
      sortable: false,
      align: 'right'
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
      field: 'trackProName',
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
          title: '金额',
          field: 'amountAllfp',
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '其中：中央直达资金',
          field: 'amountZdzjFp',
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
          title: '金额',
          field: 'amountPayAll',
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '中央安排',
          field: 'amountPayZdzj',
          sortable: false,
          align: 'right',
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

  // 专项监督项目明细
  projectZXColumn: [
    {
      title: '资金名称',
      field: 'trackProName',
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
      title: '预算金额',
      align: 'center',
      field: 'amountAllfp',
      sortable: false,
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '支付金额',
      align: 'center',
      field: 'amountPayAll',
      sortable: false,
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '惠企利民',
      field: 'hqlm',
      sortable: false,
      align: 'center'
    }
  ],
  // 直达资金项目明细
  zdzjprojectColumn: [
    {
      title: '资金名称',
      field: 'trackProName',
      align: 'center'
    },
    {
      title: '处室名称',
      field: 'bgtMofDepName',
      sortable: false,
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
    // {
    //   title: '支出功能科目',
    //   field: 'xjExpFuncName',
    //   sortable: false,
    //   align: 'center'
    // },
    {
      title: '预算金额（单位:万元）',
      align: 'center',
      children: [
        {
          title: '总金额',
          field: 'amountAllfp',
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '中央安排',
          field: 'amountZdzjFp',
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '省级安排',
          field: 'amountSnjap',
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '市级安排',
          field: 'amountSjap',
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '县级安排',
          field: 'amountXjap',
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
          field: 'amountPayAll',
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '中央安排',
          field: 'amountpayzyap',
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '省级安排',
          field: 'amountpaysnjap',
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '市级安排',
          field: 'amountpaysjap',
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '县级安排',
          field: 'amountpayxjap',
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        }
      ]
    },
    {
      title: '惠企利民',
      field: 'hqlm',
      sortable: false,
      align: 'center'
    },
    {
      title: '发放表',
      field: 'ffb',
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
      title: '单位名称',
      field: 'agencyName',
      sortable: false,
      align: 'center'
    },
    {
      title: '中央直达资金名称',
      field: 'speTypeName',
      sortable: false,
      align: 'center'
    },
    {
      title: '支出科目名称',
      field: 'xjExpFuncName',
      sortable: false,
      align: 'center'
    },
    {
      title: '本级专项资金名称',
      field: 'sSpeTypeName',
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
      field: 'xjCorBgtDocNo',
      sortable: false,
      align: 'center'
    },
    {
      title: '预算金额',
      field: 'fpAmount',
      sortable: true,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '支出金额',
      field: 'payAppAmt',
      sortable: true,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  targetZXColumn: [
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
      title: '转移支付资金名称',
      field: 'speTypeName',
      sortable: false,
      align: 'center'
    },
    {
      title: '支出科目名称',
      field: 'xjExpFuncName',
      sortable: false,
      align: 'center'
    },
    {
      title: '本级专项资金名称',
      field: 'sSpeTypeName',
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
      field: 'xjCorBgtDocNo',
      sortable: false,
      align: 'center'
    },
    {
      title: '预算金额',
      field: 'fpAmount',
      sortable: true,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '支出金额',
      field: 'payAppAmt',
      sortable: true,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    }
  ],

  // 企业明细
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
      field: 'businessAmount',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  // 个人明细
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
      title: '补助金额（单位:万元）',
      field: 'peopleAmount',
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
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '分配下级',
      field: 'amountxjfp',
      sortable: true,
      align: 'right',
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
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '分配本级',
      field: 'amountbjfp',
      sortable: true,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '分配下级',
      field: 'amountxjfp',
      sortable: true,
      align: 'right',
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
      sortable: true,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '已分配',
      field: 'amountbjfp',
      sortable: true,
      align: 'right',
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
  highQueryData2: {
    proName: '',
    agencyName: '',
    useDes: '',
    payAcctNo: '',
    payAcctName: '',
    payeeAcctName: '',
    payeeAcctNo: '',
    xpayDate: ''
  },
  highQueryConfig1: [
    // {
    //   title: '处室名称',
    //   field: 'bgtMofDepName',
    //   width: 200,
    //   align: 'center',
    //   filters: false,
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: {
    //       placeholder: '处室名称'
    //     }
    //   }
    // },
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
      field: 'speTypeName',
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
      field: 'xjExpFuncName',
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
      field: 'sSpeTypeName',
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
    // {
    //   title: '本级文号',
    //   field: 'xjCorBgtDocNo',
    //   width: 200,
    //   align: 'center',
    //   filters: false,
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: {
    //       placeholder: '本级文号'
    //     }
    //   }
    // }

  ],
  highQueryConfigZx: [
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
      title: '转移支付资金名称',
      field: 'speTypeName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '转移支付资金名称'
        }
      }
    },
    {
      title: '支出科目名称',
      field: 'xjExpFuncName',
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
      field: 'sSpeTypeName',
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
    bgtMofDepName: '',
    agencyName: '',
    speTypeName: '',
    xjExpFuncName: '',
    sSpeTypeName: '',
    corBgtDocNo: '',
    xjCorBgtDocNo: ''
  }
}
export default proconf
