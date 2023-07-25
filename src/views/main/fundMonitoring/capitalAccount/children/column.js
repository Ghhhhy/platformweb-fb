import store from '@/store/index'
let proconf = {
  // 支出明细
  expenditureColumn: [
    {
      title: '预算单位',
      field: 'agencyCodeName',
      width: 140,
      align: 'left'
    },
    {
      title: '项目名称',
      field: 'proCodeName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '金额',
      field: 'amount',
      sortable: false,
      width: 140,
      align: 'right',
      combinedType: 'total',
      cellRender: { name: '$vxeMoney' }

    },
    {
      title: '其中：中央直达资金',
      field: 'payAppAmt',
      width: 150,
      sortable: false,
      align: 'right',
      combinedType: 'total',
      cellRender: { name: '$vxeMoney' }

    },
    {
      title: '用途',
      field: 'useDes',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '付款方账户名称',
      field: 'payAcctName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '付款方账号',
      field: 'payAcctNo',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '收款方账户名称',
      field: 'payeeAcctName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '收款方账号',
      field: 'payeeAcctNo',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '付款日期',
      field: 'xpayDate',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '专项资金项目名称',
      field: 'trackProName',
      width: 140,
      visible: true,
      sortable: true,
      align: 'left'
    },
    {
      title: '是否直达资金',
      field: 'isDir',
      visible: true,
      width: 140,
      sortable: true,
      align: 'left'
    },
    {
      title: '是否政府采购',
      field: 'isGovPurName',
      width: 140,
      visible: true,
      sortable: true,
      align: 'left'
    },
    {
      title: '预算年度',
      field: 'fiscalYear',
      width: 140,
      visible: true,
      sortable: true,
      align: 'left'
    }
  ],
  payColumn: [
    {
      title: '区划代码',
      field: 'mofDivCode',
      width: 140,
      sortable: true,
      visible: false,
      align: 'left',
      showOverflow: true,
      formatter({ row }) {
        return row.mofDivCode || ''
      }
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      width: 140,
      sortable: true,
      visible: false,
      align: 'left',
      showOverflow: true,
      formatter({ row }) {
        return row.mofDivName || ''
      }
    },
    {
      title: '单位名称',
      field: 'agencyName',
      width: 140,
      sortable: true,
      align: 'left'
    },
    {
      title: '项目名称',
      field: 'proName',
      width: 140,
      sortable: true,
      align: 'left'
    },
    {
      title: '用途',
      field: 'useDes',
      width: 140,
      sortable: true,
      align: 'left'
    },
    {
      title: '付款方账户名称',
      field: 'payAcctName',
      width: 140,
      sortable: true,
      align: 'left'
    },
    {
      title: '付款方账号',
      field: 'payAcctNo',
      width: 140,
      sortable: true,
      align: 'left'
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
      align: 'left'
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
      align: 'left'
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
      align: 'left'
    },
    {
      title: '支付方式',
      filters: false,
      width: 140,
      field: 'payTypeName',
      sortable: false,
      align: 'left'
    },
    {
      title: '收款人银行',
      filters: false,
      width: 140,
      field: 'payeeAcctBankName',
      sortable: false,
      align: 'left'
    },
    {
      title: '收款方账户名称',
      field: 'payeeAcctName',
      width: 140,
      sortable: true,
      align: 'left'
    },
    {
      title: '收款方账号',
      field: 'payeeAcctNo',
      width: 140,
      sortable: true,
      align: 'left'
    },
    {
      title: '支付金额',
      field: 'payAppAmt',
      sortable: true,
      width: 140,
      align: 'right',
      combinedType: 'total',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '付款日期',
      field: 'xpayDate',
      width: 140,
      sortable: true,
      align: 'left'
    },
    {
      title: '专项资金项目名称',
      field: 'trackProName',
      width: 140,
      visible: true,
      sortable: true,
      align: 'left'
    },
    {
      title: '是否直达资金',
      field: 'isDir',
      visible: true,
      width: 140,
      sortable: true,
      align: 'left'
    },
    {
      title: '是否政府采购',
      field: 'isGovPurName',
      width: 140,
      visible: true,
      sortable: true,
      align: 'left'
    },
    {
      title: '预算年度',
      field: 'fiscalYear',
      width: 140,
      visible: true,
      sortable: true,
      align: 'left'
    }
  ],
  // 项目明细
  projectColumn: [
    {
      title: '资金名称',
      field: 'trackProName',
      width: 140,
      align: 'left'
    },
    {
      title: '预算单位',
      field: 'agencyName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '项目名称',
      field: 'proName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '支出功能科目',
      width: 140,
      sortable: false,
      field: 'xjExpFuncName',
      formatter({ row }) {
        return row.xjExpFuncName && row.xjExpFuncCode ? `${row.xjExpFuncCode}-${row.xjExpFuncName}` : ''
      },
      align: 'left'
    },
    {
      title: '预算金额',
      align: 'left',
      children: [
        {
          title: '金额',
          field: 'amountAllfp',
          sortable: false,
          width: 140,
          align: 'right',
          combinedType: 'total',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '其中：中央直达资金',
          field: 'amountZdzjFp',
          width: 140,
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        }
      ]
    },
    {
      title: '支付金额',
      align: 'left',
      children: [
        {
          title: '金额',
          field: 'amountPayAll',
          sortable: false,
          width: 140,
          align: 'right',
          combinedType: 'total',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '中央安排',
          field: 'amountPayZdzj',
          sortable: false,
          width: 140,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        }
      ]
    },
    {
      title: '惠企利民',
      field: 'hqlm',
      sortable: false,
      width: 140,
      align: 'left'
    }
  ],

  // 专项监督项目明细
  projectZXColumn: [
    {
      title: '区划代码',
      field: 'mofDivCode',
      width: 140,
      sortable: true,
      visible: false,
      align: 'left',
      showOverflow: true,
      formatter({ row }) {
        return row.mofDivCode || ''
      }
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      width: 140,
      sortable: true,
      visible: false,
      align: 'left',
      showOverflow: true,
      formatter({ row }) {
        return row.mofDivName || ''
      }
    },
    {
      title: '资金名称',
      field: 'trackProName',
      width: 140,
      align: 'left'
    },
    {
      title: '预算单位',
      field: 'agencyName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '项目名称',
      field: 'proName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '支出功能科目',
      width: 140,
      sortable: false,
      align: 'left',
      field: 'xjExpFuncName',
      formatter({ row }) {
        return row.xjExpFuncName && row.xjExpFuncCode ? `${row.xjExpFuncCode}-${row.xjExpFuncName}` : ''
      }
    },
    // {
    //   title: '转移支付功能科目',
    //   width: 140,
    //   sortable: false,
    //   align: 'left',
    //   field: 'tpFuncName',
    //   formatter({ row }) {
    //     return row.tpFuncName && row.tpFuncCode ? `${row.tpFuncCode}-${row.tpFuncName}` : ''
    //   }
    // },
    {
      title: '预算金额',
      align: 'right',
      field: 'amountAllfp',
      width: 140,
      sortable: false,
      combinedType: 'total',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '支付金额',
      align: 'right',
      field: 'amountPayAll',
      width: 140,
      sortable: false,
      combinedType: 'total',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '惠企利民',
      field: 'hqlm',
      sortable: false,
      width: 140,
      align: 'left'
    }
  ],
  // 专项监督项目台账支出明细
  projectZxZcmxColumn: [
    {
      title: '处室名称',
      field: 'bgtMofDepName',
      width: 140,
      align: 'left'
    },
    {
      title: '单位名称',
      field: 'agencyName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '转移支付资金名称',
      field: 'speTypeName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '支出科目名称',
      field: 'xjExpFuncName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '本级项目名称',
      field: 'sSpeTypeName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '上级文号',
      field: 'corBgtDocNo',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '本级文号',
      field: 'xjCorBgtDocNo',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '预算金额',
      field: 'fpAmount',
      sortable: true,
      width: 140,
      align: 'right',
      combinedType: 'total',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '支出金额',
      field: 'payAppAmt',
      width: 140,
      sortable: true,
      align: 'right',
      combinedType: 'total',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  // 中央下达项目明细
  zyxdxmmfzjColumn: [
    {
      title: '资金名称',
      field: 'trackProName',
      width: 260,
      align: 'center'
    },
    // {
    //   title: '下达项目名称',
    //   field: 'proName',
    //   width: 260,
    //   sortable: false,
    //   align: 'center'
    // },
    {
      title: '指标文号',
      field: 'corBgtDocNo',
      width: 260,
      sortable: false,
      align: 'center'
    },
    {
      title: '金额',
      field: 'amount',
      width: 260,
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '下达时间',
      field: 'sendDate',
      width: 260,
      sortable: false,
      align: 'center'
    }
  ],
  // 直达资金项目明细
  zdzjprojectColumn: [
    {
      title: '资金名称',
      field: 'trackProName',
      width: 140,
      align: 'left'
    },
    {
      title: '处室名称',
      field: 'bgtMofDepName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '预算单位',
      field: 'agencyName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '项目名称',
      field: 'proName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    // {
    //   title: '支出功能科目',
    //   field: 'xjExpFuncName',
    //   sortable: false,
    //   align: 'left'
    // },
    {
      title: '预算金额',
      align: 'left',
      children: [
        {
          title: '总金额',
          field: 'amountAllfp',
          sortable: false,
          width: 140,
          align: 'right',
          combinedType: 'total',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '中央安排',
          field: 'amountZdzjFp',
          width: 140,
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '省级安排',
          field: 'amountSnjap',
          width: 140,
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '市级安排',
          field: 'amountSjap',
          width: 140,
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '县级安排',
          field: 'amountXjap',
          width: 140,
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        }
      ]
    },
    {
      title: '支付金额',
      align: 'left',
      children: [
        {
          title: '总金额',
          field: 'amountPayAll',
          width: 140,
          sortable: false,
          align: 'right',
          combinedType: 'total',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '中央安排',
          field: 'amountPayZdzj',
          width: 140,
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '省级安排',
          field: 'amountpaysnjap',
          width: 140,
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '市级安排',
          field: 'amountpaysjap',
          width: 140,
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '县级安排',
          field: 'amountpayxjap',
          width: 140,
          sortable: false,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        }
      ]
    },
    {
      title: '惠企利民',
      field: 'hqlm',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '发放表',
      field: 'ffb',
      width: 140,
      sortable: false,
      align: 'left'
    }
  ],
  // 指标明细
  targetColumn: [
    {
      title: '区划代码',
      field: 'mofDivCode',
      width: 140,
      sortable: true,
      visible: false,
      align: 'left',
      showOverflow: true,
      formatter({ row }) {
        return row.mofDivCode || ''
      }
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      width: 140,
      sortable: true,
      visible: false,
      align: 'left',
      showOverflow: true,
      formatter({ row }) {
        return row.mofDivName || ''
      }
    },
    {
      title: '处室名称',
      field: 'bgtMofDepName',
      width: 140,
      align: 'left'
    },
    {
      title: '单位名称',
      field: 'agencyName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '中央直达资金名称',
      width: 140,
      field: 'speTypeName',
      sortable: false,
      align: 'left'
    },
    {
      title: '支出科目名称',
      field: 'xjExpFuncName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '本级项目名称',
      width: 140,
      field: 'sSpeTypeName',
      sortable: false,
      align: 'left'
    },
    {
      title: '上级文号',
      field: 'corBgtDocNo',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '本级文号',
      field: 'xjCorBgtDocNo',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '预算金额',
      field: 'fpAmount',
      width: 140,
      sortable: true,
      align: 'right',
      combinedType: 'total',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '支出金额',
      field: 'payAppAmt',
      width: 140,
      sortable: true,
      align: 'right',
      combinedType: 'total',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  targetColumnFPXJ: [// 点击分配下级
    {
      title: '区划代码',
      field: 'mofDivCode',
      width: 140,
      sortable: true,
      visible: false,
      align: 'left',
      showOverflow: true,
      formatter({ row }) {
        return row.mofDivCode || ''
      }
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      width: 140,
      sortable: true,
      visible: false,
      align: 'left',
      showOverflow: true,
      formatter({ row }) {
        return row.mofDivName || ''
      }
    },
    {
      title: '资金名称',
      field: 'trackProName',
      width: 140,
      align: 'left'
    },
    {
      title: '预算单位',
      field: 'agencyName',
      width: 140,
      align: 'left'
    },
    {
      title: '项目名称',
      field: 'proName',
      width: 140,
      sortable: true,
      align: 'left'
    },
    {
      title: '支出功能科目',
      filters: false,
      width: 140,
      field: 'xjExpFuncName',
      formatter({ row }) {
        return row.xjExpFuncName && row.xjExpFuncCode ? `${row.xjExpFuncCode}-${row.xjExpFuncName}` : ''
      },
      sortable: false,
      align: 'left'
    },
    {
      title: '转移支付功能科目',
      width: 140,
      sortable: false,
      align: 'left',
      field: 'tpFuncName',
      formatter({ row }) {
        return row.tpFuncName && row.tpFuncCode ? `${row.tpFuncCode}-${row.tpFuncName}` : ''
      }
    },
    {
      title: '分配金额',
      field: 'amountAllfp',
      width: 140,
      sortable: false,
      combinedType: 'total',
      cellRender: {
        name: '$vxeMoney'
      },
      align: 'left'
    },
    {
      title: '分配时间',
      width: 140,
      field: 'fpTime',
      sortable: false,
      align: 'left'
    }
  ],
  targetZXColumn: [
    {
      title: '区划代码',
      field: 'mofDivCode',
      width: 140,
      sortable: true,
      visible: false,
      align: 'left',
      showOverflow: true,
      formatter({ row }) {
        return row.mofDivCode || ''
      }
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      width: 140,
      sortable: true,
      visible: false,
      align: 'left',
      showOverflow: true,
      formatter({ row }) {
        return row.mofDivName || ''
      }
    },
    {
      title: '处室名称',
      field: 'bgtMofDepName',
      width: 140,
      align: 'left'
    },
    {
      title: '单位名称',
      field: 'agencyName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '转移支付资金名称',
      field: 'speTypeName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '支出科目名称',
      field: 'xjExpFuncName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '转移支付功能科目',
      width: 140,
      field: 'tpFuncCode',
      sortable: false,
      align: 'left',
      formatter({ row }) {
        return row.tpFuncName && row.tpFuncCode ? `${row.tpFuncCode}-${row.tpFuncName}` : ''
      }
    },
    {
      title: '本级项目名称',
      field: 'sSpeTypeName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '上级文号',
      field: 'corBgtDocNo',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '本级文号',
      field: 'xjCorBgtDocNo',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '预算金额',
      field: 'fpAmount',
      sortable: true,
      width: 140,
      align: 'right',
      combinedType: 'total',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '支出金额',
      field: 'payAppAmt',
      width: 140,
      sortable: true,
      align: 'right',
      combinedType: 'total',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '分配时间',
      field: 'fpTime',
      width: 140,
      sortable: true,
      visible: false,
      align: 'right',
      cellRender: {
        name: '$vxeTime',
        props: { format: 'YYYY-MM-DD' }
      }
    },
    {
      title: '接收方财政区划',
      width: 140,
      field: 'recDivName',
      sortable: false,
      visible: false,
      align: 'left'
    }
  ],
  targetZXColumnBj: [
    {
      title: '区划代码',
      field: 'mofDivCode',
      width: 140,
      sortable: true,
      visible: false,
      align: 'left',
      showOverflow: true,
      formatter({ row }) {
        return row.mofDivCode || ''
      }
    },
    {
      title: '区划名称',
      field: 'mofDivName',
      width: 140,
      sortable: true,
      visible: false,
      align: 'left',
      showOverflow: true,
      formatter({ row }) {
        return row.mofDivName || ''
      }
    },
    {
      title: '处室名称',
      field: 'bgtMofDepName',
      width: 140,
      align: 'left'
    },
    {
      title: '单位名称',
      field: 'agencyName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '转移支付资金名称',
      field: 'speTypeName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '支出科目名称',
      field: 'xjExpFuncName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '本级项目名称',
      field: 'sSpeTypeName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '上级文号',
      field: 'corBgtDocNo',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '本级文号',
      field: 'xjCorBgtDocNo',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '预算金额',
      field: 'fpAmount',
      sortable: true,
      width: 140,
      align: 'right',
      combinedType: 'total',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '支出金额',
      field: 'payAppAmt',
      width: 140,
      sortable: true,
      align: 'right',
      combinedType: 'total',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '分配时间',
      field: 'fpTime',
      width: 140,
      sortable: true,
      visible: false,
      align: 'right',
      cellRender: {
        name: '$vxeTime',
        props: { format: 'YYYY-MM-DD' }
      }
    },
    {
      title: '接收方财政区划',
      width: 140,
      field: 'recDivName',
      sortable: false,
      visible: false,
      align: 'left'
    }
  ],
  // 企业明细
  businessColumn: [
    {
      title: '统一社会信用代码',
      field: 'creditCode',
      width: 140,
      align: 'left'
    },
    {
      title: '企业名称',
      field: 'businessName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '补助金额',
      field: 'businessAmount',
      width: 140,
      sortable: false,
      align: 'right',
      combinedType: 'total',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  // 个人明细
  personalColumn: [
    {
      title: '身份证号',
      field: 'card',
      width: 140,
      align: 'left'
    },
    {
      title: '姓名',
      field: 'name',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '补助金额',
      field: 'peopleAmount',
      sortable: false,
      width: 140,
      align: 'right',
      combinedType: 'total',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  // 中央下达项目明细
  zyxdProColumn: [
    {
      title: '区划编码',
      field: 'mofDivCode',
      width: 140,
      align: 'left',
      visible: false
    },
    {
      title: '项目编码',
      field: 'proCode',
      width: 140,
      align: 'left',
      sortable: true
    },
    {
      title: '项目名称',
      field: 'proName',
      sortable: false,
      width: 140,
      align: 'left'
    },
    {
      title: '主管处室',
      width: 140,
      field: 'manageMofDepName',
      align: 'left'
    },
    {
      title: '指标文号',
      width: 140,
      field: 'corBgtDocNo',
      sortable: false,
      align: 'left'
    },
    {
      title: '金额',
      field: 'fpAmount',
      width: 140,
      sortable: true,
      align: 'right',
      combinedType: 'total',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  // 中央下达项目明细
  zyxdProfzjColumn: [
    {
      title: '项目编码',
      field: 'proCode',
      width: store.getters.isSx ? '' : 140, // 陕西项目需要铺满列表
      align: 'left',
      sortable: true
    },
    {
      title: '项目名称',
      field: 'proName',
      width: store.getters.isSx ? '' : 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '中央下达',
      field: 'amountZyxd',
      sortable: true,
      width: store.getters.isSx ? '' : 140,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '分配下级',
      field: 'amountxjfp',
      width: store.getters.isSx ? '' : 140,
      sortable: true,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  zyxdProfzjhColumn: [
    {
      title: '项目编码',
      field: 'proCode',
      width: store.getters.isSx ? '' : 140,
      align: 'left',
      sortable: true
    },
    {
      title: '项目名称',
      field: 'proName',
      width: store.getters.isSx ? '' : 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '中央下达',
      field: 'amountZyxd',
      width: store.getters.isSx ? '' : 140,
      sortable: true,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  zyxdProfzjwfpColumn: [
    {
      title: '项目编码',
      field: 'proCode',
      width: 140,
      align: 'left',
      sortable: true
    },
    {
      title: '项目名称',
      field: 'proName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '中央下达',
      field: 'amountZyxd',
      width: 140,
      sortable: true,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '分配本级',
      field: 'amountbjfp',
      width: 140,
      sortable: true,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '分配下级',
      field: 'amountxjfp',
      width: 140,
      sortable: true,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  zyxdProfzjwfpxColumn: [
    {
      title: '项目编码',
      field: 'proCode',
      width: 140,
      align: 'left',
      sortable: true
    },
    {
      title: '项目名称',
      field: 'proName',
      width: 140,
      sortable: false,
      align: 'left'
    },
    {
      title: '中央下达',
      field: 'amountZyxd',
      sortable: true,
      width: 140,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '已分配',
      field: 'amountbjfp',
      width: 140,
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
      align: 'left',
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
    proName: '',
    fpTime: ''

  },
  highQueryConfig2: [
    {
      title: '单位名称',
      field: 'agencyName',
      width: 200,
      align: 'left',
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
      align: 'left',
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
      align: 'left',
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
      align: 'left',
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
      align: 'left',
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
      align: 'left',
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
      align: 'left',
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
      align: 'left',
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
    //   align: 'left',
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
      align: 'left',
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
      align: 'left',
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
      align: 'left',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '支出科目名称'
        }
      }
    },
    {
      title: '本级项目名称',
      field: 'sSpeTypeName',
      width: 200,
      align: 'left',
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
      align: 'left',
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
    //   align: 'left',
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
      align: 'left',
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
      align: 'left',
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
      align: 'left',
      filters: false,
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '支出科目名称'
        }
      }
    },
    {
      title: '本级项目名称',
      field: 'sSpeTypeName',
      width: 200,
      align: 'left',
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
      align: 'left',
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
if (store.getters.isSx) {
  proconf = {
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
        field: 'payAppAmtZd',
        sortable: true,
        align: 'right',
        combinedType: [
          'average',
          'subTotal',
          'total',
          'totalAll'
        ],
        formula: '{payAppAmt}',
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
        sortable: true,
        align: 'right',
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '其中：中央直达资金',
        field: 'payAppAmt',
        sortable: true,
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
            sortable: true,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '其中：中央直达资金',
            field: 'fpAmount',
            sortable: true,
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
            sortable: true,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '其中：中央直达资金',
            field: 'payAppAmt',
            sortable: true,
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
    // 企业明细
    ythzcColumn: [
      {
        title: '区划',
        field: 'mofDiv',
        sortable: false,
        align: 'center'
      },
      {
        title: '月份',
        field: 'month',
        sortable: false,
        align: 'center'
      },
      {
        title: '统一社会信用代码',
        field: 'unifsocCredCode',
        align: 'center'
      },
      {
        title: '企业名称',
        field: 'corpName',
        sortable: false,
        align: 'center'
      },
      {
        title: '补助金额',
        field: 'subsidyAmt',
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
        sortable: true,
        align: 'right',
        cellRender: { name: '$vxeMoney' }
      }
    ],
    // 个人明细
    yktzcColumn: [
      {
        title: '街道(乡镇)编码',
        width: 180,
        field: 'townCode',
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '街道(乡镇)名称',
        width: 180,
        field: 'townName',
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '村编码',
        width: 180,
        field: 'villageCode',
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '村名称',
        width: 180,
        field: 'villageName',
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '姓名',
        width: 180,
        field: 'perName',
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '证件类型',
        width: 180,
        field: 'idenTypeName',
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '证件号码',
        width: 180,
        field: 'idenNo',
        sortable: false,
        filters: false,
        align: 'center',
        formatter: ({ row }) => {
          return row.idenNo ? row.idenNo.replace(/(?<=\d{3})\d{12}(?=\d{2})/, '************') : ''
        }
      },
      {
        title: '按户按人补助标识',
        width: 180,
        field: 'toPeopFamily',
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '应发金额(元)',
        width: 180,
        field: 'payAmt',
        sortable: false,
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
        title: '实发金额(元)',
        width: 180,
        field: 'xpayAmt',
        sortable: false,
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
        title: '备注',
        width: 180,
        field: 'addWord',
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '发放月份',
        width: 180,
        field: 'payMonth',
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '区划',
        width: 180,
        field: 'mofDiv',
        sortable: false,
        filters: false,
        align: 'center'
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
        sortable: true,
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
        title: '已分配',
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
      // {
      //   title: '支付金额',
      //   align: 'center',
      //   field: 'amountPayAll',
      //   sortable: false,
      //   cellRender: { name: '$vxeMoney' }
      // },
      {
        title: '惠企利民',
        field: 'hqlm',
        sortable: false,
        align: 'center'
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
}
export default proconf
