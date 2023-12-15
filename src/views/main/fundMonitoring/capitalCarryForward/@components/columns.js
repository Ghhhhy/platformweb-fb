export const carryImplementationRegionModalColumns = [
  // {
  //   title: '序号',
  //   type: 'seq',
  //   width: '80'
  // },
  {
    title: '资金名称',
    field: 'trackProName',
    align: 'left',
    tableType: 'bgt',
    sortable: false,
    filters: false,
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '预算单位',
    field: 'agencyName',
    align: 'left',
    sortable: false,
    filters: false,
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '项目名称',
    field: 'proName',
    align: 'left',
    sortable: false,
    filters: false,
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '金额',
    tableType: 'pay',
    sortable: false,
    filters: false,
    field: 'payAppAmt',
    width: 260,
    align: 'right',
    combinedType: ['average', 'subTotal', 'total', 'totalAll'],
    cellRender: { name: '$vxeMoney' }
  },
  {
    title: '用途',
    tableType: 'pay',
    sortable: false,
    filters: false,
    field: 'useDes',
    width: 260,
    align: 'left',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '付款方账户名称',
    tableType: 'pay',
    sortable: false,
    filters: false,
    field: 'payAcctName',
    width: 260,
    align: 'left',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '付款方账号',
    tableType: 'pay',
    sortable: false,
    filters: false,
    field: 'payAcctNo',
    width: 260,
    align: 'center',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '收款方账户名称',
    tableType: 'pay',
    sortable: false,
    filters: false,
    field: 'payeeAcctName',
    width: 260,
    align: 'left',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '收款方账号',
    tableType: 'pay',
    sortable: false,
    filters: false,
    field: 'payeeAcctNo',
    width: 260,
    align: 'center',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '付款日期',
    tableType: 'pay',
    sortable: false,
    filters: false,
    field: 'xpayDate',
    width: 260,
    align: 'center',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '支出功能科目',
    field: 'xjExpFuncName',
    align: 'left',
    tableType: 'bgt',
    sortable: false,
    filters: false,
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '预算金额',
    width: 100,
    align: 'center',
    tableType: 'bgt',
    children: [
      {
        title: '总金额',
        field: 'YSJEZJE',
        sortable: false,
        filters: false,
        tableType: 'bgt',
        reportCode: 'jzzjysxd_ysje',
        canInsert: true,
        formula: '{jzAmountZy}+{jzAmountsSnj}+{jzAmountSj}+{jzamountXj}',
        width: 100,
        align: 'right',
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '中央安排',
        sortable: false,
        filters: false,
        field: 'jzAmountZy',
        width: 100,
        align: 'right',
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '省级安排',
        sortable: false,
        filters: false,
        field: 'jzAmountsSnj',
        width: 100,
        align: 'right',
        cellRender: {
          name: '$vxeMoney'
        }
      },
      {
        title: '市级安排',
        sortable: false,
        filters: false,
        field: 'jzAmountSj',
        width: 100,
        align: 'right',
        cellRender: {
          name: '$vxeMoney'
        }
      },
      {
        title: '县级安排',
        sortable: false,
        filters: false,
        field: 'jzamountXj',
        width: 100,
        align: 'right',
        cellRender: {
          name: '$vxeMoney'
        }
      }
    ]
  },
  {
    title: '支付金额',
    width: 100,
    align: 'center',
    tableType: 'bgt',
    children: [
      {
        title: '总金额',
        field: 'ZFJEZJE',
        tableType: 'pay',
        sortable: false,
        filters: false,
        reportCode: 'jzzjysxd_zcje',
        canInsert: true,
        formula: '{jzPayAmount}+{amountProvince}+{amountCity}+{amountCounty}',
        width: 100,
        align: 'right',
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '中央安排',
        sortable: false,
        filters: false,
        field: 'ZYAP',
        width: 100,
        align: 'right',
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '省级安排',
        sortable: false,
        filters: false,
        field: 'SHENGJAP',
        width: 100,
        align: 'right',
        cellRender: {
          name: '$vxeMoney'
        }
      },
      {
        title: '市级安排',
        sortable: false,
        filters: false,
        field: 'SHIJAP',
        width: 100,
        align: 'right',
        cellRender: {
          name: '$vxeMoney'
        }
      },
      {
        title: '县级安排',
        sortable: false,
        filters: false,
        field: 'XJAP',
        width: 100,
        align: 'right',
        cellRender: {
          name: '$vxeMoney'
        }
      }
    ]
  },
  {
    title: '惠企利民',
    field: 'hqlm',
    align: 'left',
    tableType: 'bgt',
    sortable: false,
    filters: false,
    // treeNode: true,
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '发放表',
    field: 'fpb',
    align: 'left',
    tableType: 'bgt',
    sortable: false,
    filters: false,
    // treeNode: true,
    width: 260,
    cellRender: { name: '$vxeInput' }
  }
]
export const carryImplementationRegionModalColumnsFJ = [
  {
    title: '资金名称',
    field: 'trackProName',
    align: 'left',
    tableType: 'bgt',
    sortable: false,
    filters: false,
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '预算单位',
    field: 'agencyName',
    align: 'left',
    sortable: false,
    filters: false,
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '项目名称',
    field: 'proName',
    align: 'left',
    sortable: false,
    filters: false,
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '金额',
    tableType: 'pay',
    sortable: false,
    filters: false,
    field: 'payAppAmt',
    width: 260,
    align: 'right',
    combinedType: ['average', 'subTotal', 'total', 'totalAll'],
    cellRender: { name: '$vxeMoney' }
  },
  {
    title: '用途',
    tableType: 'pay',
    sortable: false,
    filters: false,
    field: 'useDes',
    width: 260,
    align: 'left',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '付款方账户名称',
    tableType: 'pay',
    sortable: false,
    filters: false,
    field: 'payAcctName',
    width: 260,
    align: 'left',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '付款方账号',
    tableType: 'pay',
    sortable: false,
    filters: false,
    field: 'payAcctNo',
    width: 260,
    align: 'center',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '收款方账户名称',
    tableType: 'pay',
    sortable: false,
    filters: false,
    field: 'payeeAcctName',
    width: 260,
    align: 'left',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '收款方账号',
    tableType: 'pay',
    sortable: false,
    filters: false,
    field: 'payeeAcctNo',
    width: 260,
    align: 'center',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '付款日期',
    tableType: 'pay',
    sortable: false,
    filters: false,
    field: 'xpayDate',
    width: 260,
    align: 'center',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '支出功能科目',
    field: 'xjExpFuncName',
    align: 'left',
    tableType: 'bgt',
    sortable: false,
    filters: false,
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    field: 'isDirectFinanc',
    title: '是否直达资金',
    align: 'left',
    width: 180,
    cellRender: {
      name: '$vxeSelect',
      options: [
        {
          value: '1',
          label: '是'
        },
        {
          value: '0',
          label: '否'
        }]
    }
  },
  {
    title: '政府支出经济分类',
    filters: false,
    field: 'govBgtEcoName',
    sortable: false,
    align: 'left',
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '部门支出经济分类',
    filters: false,
    field: 'depBgtEcoName',
    sortable: false,
    align: 'left',
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '支付方式',
    field: 'payTypeName',
    filters: false,
    sortable: false,
    align: 'left',
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '收款人银行',
    field: 'payeeAcctBankName',
    filters: false,
    sortable: false,
    align: 'left',
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '预算年度',
    field: 'fiscalYear',
    filters: false,
    sortable: false,
    align: 'left',
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '是否政府采购',
    field: 'isGovPurName',
    filters: false,
    sortable: false,
    align: 'left',
    width: 260,
    cellRender: { name: '$vxeInput' }
  }
]
export const carrImplRegiSecondModalColumns = [
  // {
  //   title: '序号',
  //   type: 'seq',
  //   width: '80'
  // },
  {
    title: '预算单位',
    field: 'agencyName',
    align: 'left',
    tableType: 'pay',
    sortable: false,
    filters: false,
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '项目名称',
    field: 'proName',
    align: 'left',
    tableType: 'pay',
    sortable: false,
    filters: false,
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '金额',
    tableType: 'pay',
    sortable: false,
    filters: false,
    field: 'payAppAmt',
    width: 260,
    align: 'right',
    combinedType: ['average', 'subTotal', 'total', 'totalAll'],
    cellRender: { name: '$vxeMoney' }
  },
  {
    title: '用途',
    tableType: 'pay',
    sortable: false,
    filters: false,
    field: 'useDes',
    width: 260,
    align: 'center',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '付款方账户名称',
    tableType: 'pay',
    sortable: false,
    filters: false,
    field: 'payAcctName',
    width: 260,
    align: 'center',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '付款方账号',
    tableType: 'pay',
    sortable: false,
    filters: false,
    field: 'payAcctNo',
    width: 260,
    align: 'center',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '收款方账户名称',
    tableType: 'pay',
    sortable: false,
    filters: false,
    field: 'payeeAcctName',
    width: 260,
    align: 'center',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '收款方账号',
    tableType: 'pay',
    sortable: false,
    filters: false,
    field: 'payeeAcctNo',
    width: 260,
    align: 'center',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '付款日期',
    tableType: 'pay',
    sortable: false,
    filters: false,
    field: 'xpayDate',
    width: 260,
    align: 'center',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '处室名称',
    tableType: 'bgt',
    field: 'bgtMofDepName',
    align: 'left',
    sortable: false,
    filters: false,
    // treeNode: true,
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '单位名称',
    tableType: 'bgt',
    field: 'agencyName',
    align: 'left',
    sortable: false,
    filters: false,
    // treeNode: true,
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '中央直达资金名称',
    tableType: 'bgt',
    field: 'cenTraProName',
    align: 'left',
    sortable: false,
    filters: false,
    // treeNode: true,
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '支出功能科目编码',
    tableType: 'bgt',
    field: 'xjExpFuncCode',
    align: 'left',
    sortable: false,
    filters: false,
    // treeNode: true,
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '支出功能科目名称',
    tableType: 'bgt',
    field: 'xjExpFuncName',
    align: 'left',
    sortable: false,
    filters: false,
    // treeNode: true,
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '本级专项资金名称',
    tableType: 'bgt',
    field: 'speTypeName',
    align: 'left',
    sortable: false,
    filters: false,
    // treeNode: true,
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '上级文号',
    tableType: 'bgt',
    field: 'supBgtDocNo',
    align: 'left',
    sortable: false,
    filters: false,
    // treeNode: true,
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '本级文号',
    tableType: 'bgt',
    field: 'corBgtDocNo',
    align: 'left',
    sortable: false,
    filters: false,
    // treeNode: true,
    width: 260,
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '预算金额',
    tableType: 'bgt',
    field: 'jzPayAmount',
    align: 'left',
    sortable: false,
    filters: false,
    // treeNode: true,
    width: 260,
    cellRender: { name: '$vxeInput' }
  }
  // {
  //   title: '支出金额',
  //   field: 'jzPayAmount',
  //   align: 'left',
  //   sortable: false,
  //   filters: false,
  //   // treeNode: true,
  //   width: 260,
  //   cellRender: { name: '$vxeInput' }
  // }
]
