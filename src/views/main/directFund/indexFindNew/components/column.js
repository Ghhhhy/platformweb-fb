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
          title: '其中：中央直达资金',
          field: 'amountZd',
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
      title: '指标文号',
      field: 'corBgtDocNoName',
      sortable: false,
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
  // 指标明细
  targetColumn: [
    {
      field: 'mofDivName',
      title: '区划名称',
      treeNode: true,
      fixed: 'left'
    },
    {
      field: 'mofDepName',
      title: '处室',
      treeNode: true,
      fixed: 'left'
    },
    {
      field: 'corBgtDocNo',
      title: '指标文号',
      treeNode: true,
      fixed: 'left'
    },
    {
      field: 'agencyName',
      title: '单位'
    },
    {
      field: 'trackProName',
      title: '专项资金'
    },
    {
      field: 'proName',
      title: '项目名称'
    },
    {
      field: 'supBgtDocNo',
      title: '上级文号'
    },
    // {
    //   field: 'sjzxzj',
    //   title: '上级专项资金'
    // },
    {
      field: 'ysAmount',
      title: '预算金额',
      align: 'right',
      cellRender: {
        name: '$vxeMoney'
      },
      sort: true
    },
    {
      field: 'fpAmount',
      title: '分配下级金额',
      align: 'right',
      cellRender: {
        name: '$vxeMoney'
      },
      sort: true
    },
    {
      field: 'fpjd',
      title: '分配下级进度',
      align: 'right',
      formula: '({ysAmount}-0==0)?0:(({fpAmount})/{ysAmount}*100)',
      cellRender: {
        name: '$vxeRatio'
      },
      sort: true
    },
    {
      field: 'payAppAmt',
      title: '支付金额',
      align: 'right',
      cellRender: {
        name: '$vxeMoney'
      },
      sort: true
    },
    {
      field: 'zfjd',
      title: '支付进度',
      align: 'right',
      formula: '({ysAmount}-0==0)?0:(({payAppAmt})/{ysAmount}*100)',
      cellRender: {
        name: '$vxeRatio'
      },
      sort: true
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
      title: '指标文号',
      field: 'corBgtDocNoName',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '指标文号'
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
    payAppNo: '',
    corBgtDocNoName: '',
    payAcctNo: '',
    payAcctName: '',
    payeeAcctName: '',
    payeeAcctNo: '',
    xpayDate: ''
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
