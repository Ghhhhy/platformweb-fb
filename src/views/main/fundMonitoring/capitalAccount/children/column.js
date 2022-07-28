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
      field: 'bzAmount',
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
      field: 'bzAmount',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    }
  ]
}
export default proconf
