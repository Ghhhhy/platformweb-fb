// import store from '@/store/index'
const proconf = {
  highQueryConfig: [
    {
      title: '区划',
      field: 'mofDivCode',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '区划'
        }
      }
    },
    {
      title: '级次',
      field: 'levels',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '全部', label: '全部' },
          { value: '省本级', label: '省本级' },
          { value: '市本级', label: '市本级' },
          { value: '县级', label: '县级' }
        ],
        props: {
          placeholder: '级次'
        }
      }
    },
    {
      title: '专项资金',
      field: 'speTypeName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '专项资金'
        }
      }
    },
    {
      title: '项目名称',
      field: 'proCodeName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '项目名称'
        }
      }
    },
    {
      title: '处室名称',
      field: 'bgtMofDepName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '处室名称'
        }
      }
    }
  ],
  highQueryData: {
    mofDivCode: '',
    bgtMofDepName: '',
    speTypeName: '',
    levels: '',
    proCodeName: ''
  },
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
      title: '预算金额（单位:万元）',
      field: 'fpAmount',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '支出金额（单位:万元）',
      field: 'payAppAmt',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  // 是否上传附件-未处理明细
  notuploadColumn: [
    {
      title: '地区名称',
      field: 'agency',
      align: 'center'
    },
    {
      title: '处室名称',
      field: 'bgtMofDepName',
      sortable: false,
      align: 'center'
    },
    {
      title: '专项资金',
      field: 'sSpeTypeName',
      sortable: false,
      align: 'right'
    },
    {
      title: '指标文号',
      field: 'corBgtDocNo',
      sortable: false,
      align: 'center'
    },
    {
      title: '制单人',
      field: 'makePerson',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '预警时间',
      field: 'warnTime',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  // 是否上传附件-已整改明细
  uploadColumn: [
    {
      title: '地区名称',
      field: 'agency',
      align: 'center'
    },
    {
      title: '处室名称',
      field: 'bgtMofDepName',
      sortable: false,
      align: 'center'
    },
    {
      title: '专项资金',
      field: 'sSpeTypeName',
      sortable: false,
      align: 'right'
    },
    {
      title: '指标文号',
      field: 'corBgtDocNo',
      sortable: false,
      align: 'center'
    },
    {
      title: '制单人',
      field: 'makePerson',
      sortable: false,
      align: 'right'
    },
    {
      title: '预警时间',
      field: 'warnTime',
      sortable: false,
      align: 'right'
    },
    {
      title: '整改意见',
      field: 'agreeInfo',
      sortable: false,
      align: 'right'
    },
    {
      title: '整改时间',
      field: 'agreeTime',
      sortable: false,
      align: 'right'
    }
  ],
  // 支出预警-未处理明细
  notpayColumn: [
    {
      title: '地区名称',
      field: 'agencyCodeName',
      align: 'center'
    },
    {
      title: '规则名称',
      field: 'ruleName',
      align: 'center'
    },
    {
      title: '单位名称',
      field: 'agencyName',
      align: 'center'
    },
    {
      title: '专项资金',
      field: 'sSpeTypeName',
      sortable: false,
      align: 'right'
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
      title: '收款方账户名称',
      field: 'payeeAcctName',
      sortable: false,
      align: 'center'
    },
    {
      title: '指标文号',
      field: 'corBgtDocNo',
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
      title: '付款方账号',
      field: 'payAcctNo',
      sortable: false,
      align: 'center'
    },
    {
      title: '付款日期',
      field: 'xpayDate',
      sortable: false,
      align: 'center'
    },
    {
      title: '预警时间',
      field: 'warnTime',
      sortable: false,
      align: 'center'
    }
  ],
  // 支出预警-已认定明细
  payokColumn: [
    {
      title: '地区名称',
      field: 'agencyCodeName',
      align: 'center'
    },
    {
      title: '规则名称',
      field: 'ruleName',
      align: 'center'
    },
    {
      title: '单位名称',
      field: 'agencyName',
      align: 'center'
    },
    {
      title: '专项资金',
      field: 'sSpeTypeName',
      sortable: false,
      align: 'right'
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
      title: '用途',
      field: 'useDes',
      sortable: false,
      align: 'center'
    },
    {
      title: '认定结果',
      field: 'result',
      sortable: false,
      align: 'center'
    },
    {
      title: '认定意见',
      field: 'aggresult',
      sortable: false,
      align: 'center'
    },
    {
      title: '认定人',
      field: 'useResult',
      sortable: false,
      align: 'center'
    },
    {
      title: '认定时间',
      field: 'resultTime',
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
      title: '收款方账户名称',
      field: 'payeeAcctName',
      sortable: false,
      align: 'center'
    },
    {
      title: '指标文号',
      field: 'corBgtDocNo',
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
      title: '付款方账号',
      field: 'payAcctNo',
      sortable: false,
      align: 'center'
    }
  ],
  // 支出预警-已整改明细
  payedColumn: [
    {
      title: '地区名称',
      field: 'agencyCodeName',
      align: 'center'
    },
    {
      title: '规则名称',
      field: 'ruleName',
      align: 'center'
    },
    {
      title: '单位名称',
      field: 'agencyName',
      align: 'center'
    },
    {
      title: '专项资金',
      field: 'sSpeTypeName',
      sortable: false,
      align: 'right'
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
      title: '用途',
      field: 'useDes',
      sortable: false,
      align: 'center'
    },
    {
      title: '认定意见',
      field: 'agg',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改结果',
      field: 'result',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改意见',
      field: 'aggResult',
      sortable: false,
      align: 'center'
    },
    {
      title: '整改时间',
      field: 'resultTime',
      sortable: false,
      align: 'center'
    },
    {
      title: '支付日期',
      field: 'payTime',
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
      title: '收款方账户名称',
      field: 'payeeAcctName',
      sortable: false,
      align: 'center'
    },
    {
      title: '指标文号',
      field: 'corBgtDocNo',
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
      title: '付款方账号',
      field: 'payAcctNo',
      sortable: false,
      align: 'center'
    }
  ],
  // 未导入惠企利民-未处理明细
  notgetColumn: [
    {
      title: '地区名称',
      field: 'agencyCodeName',
      align: 'center'
    },
    {
      title: '处室名称',
      field: 'cName',
      align: 'center'
    },
    {
      title: '指标文号',
      field: 'corBgtDocNo',
      sortable: false,
      align: 'center'
    },
    {
      title: '专项资金',
      field: 'sSpeTypeName',
      sortable: false,
      align: 'right'
    },
    {
      title: '项目',
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
    }
  ],
  // 未导入惠企利民-已整改明细
  getColumn: [
    {
      title: '地区名称',
      field: 'agencyCodeName',
      align: 'center'
    },
    {
      title: '处室名称',
      field: 'cName',
      align: 'center'
    },
    {
      title: '指标文号',
      field: 'corBgtDocNo',
      sortable: false,
      align: 'center'
    },
    {
      title: '专项资金',
      field: 'sSpeTypeName',
      sortable: false,
      align: 'right'
    },
    {
      title: '项目',
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
    }
  ]
}
export default proconf
