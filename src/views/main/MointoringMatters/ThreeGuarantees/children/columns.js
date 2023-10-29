const defaultTableColumns = [
  {
    title: '区划',
    type: 'name',
    align: 'left',
    sortable: false,
    filters: true,
    treeNode: true,
    width: 180,
    field: 'name',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '业务主管处室',
    field: 'managemofdepcode',
    width: 180,
    align: 'left',
    formula: '',
    filters: true,
    name: '$vxeInput',
    cellRender: {
      name: '$vxeInput'
    }
  },
  {
    title: '预算单位',
    width: 180,
    filters: true,
    field: 'agencyname',
    sortable: true,
    align: 'center',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '预算项目名称',
    field: 'proname',
    width: 180,
    filters: true,
    sortable: false,
    tableType: 'bgt',
    align: 'left',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '项目名称',
    field: 'proname',
    sortable: false,
    filters: true,
    width: 180,
    tableType: 'pay',
    align: 'left',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '指标文号',
    width: 180,
    filters: true,
    field: 'corbgtdocno',
    sortable: false,
    align: 'left',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '指标摘要',
    field: 'bgtremname',
    width: 180,
    filters: true,
    tableType: 'bgt',
    align: 'left',
    itemRender: {
      name: '$input',
      cellRender: { name: '$vxeInput' }
    }
  },
  {
    title: '三保标识',
    field: 'sbsign',
    tableType: 'bgt',
    filters: true,
    width: 180,
    align: 'left',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '指标金额',
    tableType: 'bgt',
    field: 'amount',
    filters: true,
    width: 180,
    align: 'right',
    combinedType: ['average', 'subTotal', 'total', 'totalAll'],
    cellRender: {
      name: '$vxeMoney'
    }
  },
  {
    title: '支付金额',
    field: 'payamount',
    filters: true,
    tableType: 'bgt',
    width: 180,
    align: 'right',
    combinedType: ['average', 'subTotal', 'total', 'totalAll'],
    cellRender: {
      name: '$vxeMoney'
    }
  },
  {
    title: '执行进度',
    field: 'sbzxjd',
    filters: true,
    tableType: 'bgt',
    width: 180,
    align: 'right',
    cellRender: {
      name: '$vxeRatio'
    }
  },
  {
    title: '序时进度',
    field: 'sbxsjd',
    tableType: 'bgt',
    width: 180,
    align: 'right',
    filters: true,
    cellRender: {
      name: '$vxeRatio'
    }
  },
  {
    title: '预警',
    field: 'sbyj',
    width: 180,
    tableType: 'bgt',
    align: 'right',
    filters: true,
    cellRender: {
      name: '$vxeInput'
    }
  },
  // --支付
  {
    title: '资金用途',
    field: 'usedes',
    width: 180,
    sortable: false,
    filters: true,
    tableType: 'pay',
    align: 'left',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '支付申请单号',
    field: 'payappno',
    width: 180,
    sortable: false,
    filters: true,
    tableType: 'pay',
    align: 'left',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '付款方账户名称',
    field: 'payacctname',
    sortable: false,
    width: 180,
    filters: true,
    tableType: 'pay',
    align: 'left',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '付款方账号',
    field: 'payacctno',
    width: 180,
    sortable: false,
    filters: true,
    tableType: 'pay',
    align: 'left',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '收款方账户名称',
    field: 'payeeacctname',
    width: 180,
    sortable: false,
    filters: true,
    tableType: 'pay',
    align: 'left',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '收款方账号',
    field: 'payeeacctno',
    sortable: false,
    width: 180,
    filters: true,
    tableType: 'pay',
    align: 'left',
    cellRender: { name: '$vxeInput' }
  },
  {
    title: '支付金额',
    field: 'payappamt',
    width: 180,
    filters: true,
    sortable: false,
    tableType: 'pay',
    align: 'left',
    combinedType: ['average', 'subTotal', 'total', 'totalAll'],
    cellRender: { name: '$vxeMoney' }
  },
  {
    title: '支付时间',
    field: 'xpaydate',
    width: 180,
    sortable: false,
    tableType: 'pay',
    align: 'left',
    filters: true,
    cellRender: { name: '$vxeInput' }
  }
]
const bgtTotalTableColumns = defaultTableColumns.filter(item => {
  return item.tableType !== 'pay'
})
const bgtRegionTableColumns = defaultTableColumns.filter(item => {
  const notShowField = ['name']
  return !notShowField.includes(item.field) && item.tableType !== 'pay'
})
const payTotalTableColumns = defaultTableColumns.filter(item => {
  return item.tableType !== 'bgt'
})
const payRegionTableColumns = defaultTableColumns.filter(item => {
  const notShowField = ['name']
  return !notShowField.includes(item.field) && item.tableType !== 'bgt'
})

export {
  bgtTotalTableColumns,
  bgtRegionTableColumns,
  payTotalTableColumns,
  payRegionTableColumns
}
