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
  highQueryConfigXm: [
    {
      title: '资金名称',
      field: 'cenTraProName',
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
      sortable: false,
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
      sortable: false,
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
      sortable: false,
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
  highQueryDataXm: {
    cenTraProName: '',
    agencyName: '',
    proName: ''
  },
  highQueryConfigFdq: [
    // {
    //   title: '业务年度',
    //   field: 'fiscalYear',
    //   width: '8',
    //   align: 'left',
    //   formula: '',
    //   name: '$vxeSelect',
    //   itemRender: {
    //     name: '$vxeSelect',
    //     options: [
    //       // { value: '2020', label: '2020年' },
    //       // { value: '2021', label: '2021年' },
    //       { value: '2022', label: '2022年' }
    //     ],
    //     props: {
    //       placeholder: '业务年度'
    //     }
    //   }
    // },
    {
      title: '资金名称',
      field: 'proCodes',
      width: '8',
      align: 'left',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        props: {
          config: {
            valueKeys: ['code', 'name', 'id'],
            format: '{name}',
            treeProps: {
              labelFormat: '{code}-{name}', // {code}-{name}
              nodeKey: 'id',
              label: 'label',
              children: 'children'
            },
            placeholder: '资金名称',
            multiple: true,
            readonly: false,
            isleaf: true
          }
        }
      }
    },
    {
      title: '截止日期',
      field: 'endTime',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeTime',
        props: {
          format: 'YYYY-MM-DD', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          type: 'date',
          placeholder: '截止日期'
        }
      }
    }

  ],
  highQueryDataFdq: {
    fiscalYear: '2022',
    proCodes: '',
    endTime: ''
  },
  fdqColumn: [
    // {
    //   title: '地区编码',
    //   type: 'code',
    //   treeNode: true,
    //   align: 'left',
    //   width: 260,
    //   field: 'name',
    //   cellRender: {
    //     name: '$vxeIcon'
    //   },
    //   visible: false
    // },
    {
      title: '地区名称',
      type: 'name',
      treeNode: true,
      align: 'left',
      width: 260,
      field: 'name',
      cellRender: {
        name: '$vxeIcon'
      }
    },
    {
      title: '中央下达',
      width: 200,
      field: 'amountZyxd',
      align: 'right',
      type: 'amountZyxd',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '整合',
      width: 200,
      field: 'amountZhje',
      align: 'right',
      type: 'amountZhje',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '支出',
      width: 260,
      align: 'center',
      children: [
        {
          title: '金额',
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          width: 200,
          field: 'amountPayAll',
          formula: '{amountSnjpay}+{amountSjpay}+{amountXjpay}'
        },
        {
          title: '进度',
          align: 'right',
          width: 200,
          field: 'jLoad',
          formula: '(({amountSnjxd}+{amountSjxd}+{amountXjxd})-0==0)?0:({amountPayAll}/({amountSnjxd}+{amountSjxd}+{amountXjxd})*100)',
          cellRender: {
            name: '$vxeRatio'
          }
        }
      ]
    },
    {
      title: '省级',
      width: 200,
      align: 'center',
      children: [
        {
          title: '整合金额',
          width: 200,
          field: 'amountSnjzhje',
          align: 'right',
          type: 'amountSnjzhje',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '中央下达',
          field: 'amountSnjxd',
          width: 200,
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          visible: true
        },
        {
          title: '分配本级',
          field: 'amountSnjbjfp',
          width: 200,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '分配下级',
          field: 'amountSnjxjfp',
          width: 200,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '未分配',
          field: 'amountSnjwfp',
          width: 200,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '本级已支出',
          field: 'amountSnjpay',
          width: 200,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '分配进度',
          field: 'sLoad',
          width: 200,
          align: 'right',
          formula: '({amountSnjxd}+{amountSnjxjfp}-0==0)?0:(({amountSnjbjfp}+{amountSnjxjfp})/({amountSnjxd}+{amountSnjxjfp})*100)',
          cellRender: {
            name: '$vxeRatio'
          }
        }
      ]
    },
    {
      title: '市级',
      width: 200,
      align: 'center',
      children: [
        {
          title: '整合金额',
          width: 200,
          field: 'amountSjzhje',
          align: 'right',
          type: 'amountSjzhje',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '中央下达',
          field: 'amountSjxd',
          width: 200,
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          visible: true
        },
        {
          title: '分配本级',
          field: 'amountSbjfp',
          width: 200,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '分配下级',
          field: 'amountSxjfp',
          width: 200,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '未分配',
          field: 'amountSjwfp',
          width: 200,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '本级已支出',
          field: 'amountSjpay',
          width: 200,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '分配进度',
          field: 'aLoad',
          width: 200,
          align: 'right',
          formula: '({amountSjxd}+{amountSxjfp}-0==0)?0:(({amountSbjfp}+{amountSxjfp})/({amountSjxd}+{amountSxjfp})*100)',
          cellRender: {
            name: '$vxeRatio'
          }
        }
      ]
    },
    {
      title: '县级',
      width: 200,
      align: 'center',
      children: [
        {
          title: '整合金额',
          width: 200,
          field: 'amountXjzhje',
          align: 'right',
          type: 'amountXjzhje',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '中央下达',
          field: 'amountXjxd',
          width: 200,
          align: 'right',
          cellRender: { name: '$vxeMoney' },
          visible: true
        },
        {
          title: '已分配',
          field: 'amountXjfp',
          width: 200,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '未分配',
          field: 'amountXjwfp',
          width: 200,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '已支出',
          field: 'amountXjpay',
          width: 200,
          align: 'right',
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '分配进度',
          field: 'xLoad',
          width: 200,
          align: 'right',
          formula: '({amountXjfp}+{amountXjwfp}-0==0)?0:({amountXjfp}/({amountXjfp}+{amountXjwfp})*100)',
          cellRender: {
            name: '$vxeRatio'
          }
        }
      ]
    }
  ]
}
export default proconf
