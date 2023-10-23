import store from '@/store/index'
let proconf = {
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
      { code: 'export', label: '导出', status: 'primary' }
    ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'export', label: '导出', status: 'primary' }
    ]
  },
  highQueryConfig: [
    {
      title: '业务年度',
      field: 'fiscalYear',
      width: '8',
      align: 'left',
      formula: '',
      itemRender: {
        name: '$vxeInput',
        // options: [
        //   // { value: '2020', label: '2020年' },
        //   // { value: '2021', label: '2021年' },
        //   { value: '2022', label: '2022年' },
        //   { value: '2023', label: '2023年' }
        // ],
        props: {
          type: 'year',
          valueFormat: 'yyyy',
          placeholder: '业务年度'
        }
      }
    },
    {
      title: '地区',
      field: 'mofDivCodes',
      width: '8',
      align: 'left',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        props: {
          config: {
            valueKeys: ['code', 'name', 'id', 'codeFragment'],
            format: '{name}',
            treeProps: {
              labelFormat: '{code}-{name}', // {code}-{name}  {codeFragment}-{name}
              nodeKey: 'id',
              label: 'label',
              children: 'children'
            },
            placeholder: '地区',
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
      width: 100,
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
  highQueryData: {
    fiscalYear: '',
    mofDivCodes: '',
    endTime: ''
  },
  basicInfo: {
    type: 'form',
    tableConfig: {
      globalConfig: {
        // 全局配置
        seq: true // 序号列
      }
    },
    tableColumnsConfig: [
      {
        title: '资金名称',
        type: 'name',
        align: 'left',
        sortable: true,
        filters: false,
        treeNode: true,
        width: 160,
        field: 'name',
        cellRender: { name: '$vxeIcon' }
      },
      {
        title: '全省',
        width: 100,
        align: 'center',
        children: [
          {
            title: '资金总量',
            field: 'all1',
            sortable: true,
            filters: false,
            formula: '{amountSnjJz}+{amountSjAll}+{amountXjAll}',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出金额',
            field: 'payAll',
            sortable: true,
            filters: false,
            width: 100,
            align: 'right',
            formula: '{amountSnjJzPay}+{amountPayAll}+{amountXjPayAll}',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出进度',
            field: 'payPro',
            sortable: true,
            filters: false,
            width: 100,
            align: 'right',
            formula: '({all1}-0==0)?0:(({payAll}/{all1})*100)',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '省级',
        width: 100,
        align: 'center',
        children: [
          {
            title: '资金总量',
            field: 'amountSnjJz',
            sortable: true,
            filters: false,
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出金额',
            field: 'amountSnjJzPay',
            sortable: true,
            filters: false,
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出进度',
            field: 'sjpayPro1',
            sortable: true,
            filters: false,
            formula: '({amountProvince}-0==0)?0:({amountPayProvince}/{amountProvince}*100)',
            width: 100,
            align: 'right',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '市级',
        width: 100,
        align: 'center',
        children: [
          {
            title: '资金总量',
            width: 100,
            align: 'right',
            children: [
              {
                title: '省级',
                sortable: true,
                filters: false,
                field: 'amountSjSnjJz',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级',
                field: 'amountSjJz',
                sortable: true,
                filters: false,
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountSjAll',
                sortable: true,
                filters: false,
                width: 100,
                canInsert: true,
                align: 'right',
                formula: '{amountSjSnjJz}+{amountSjJz}',
                cellRender: {
                  name: '$vxeMoney'
                }
              }
            ]
          },
          {
            title: '支出金额',
            width: 100,
            align: 'right',
            children: [
              {
                title: '省级',
                sortable: true,
                filters: false,
                field: 'amountSjSnjJzPay',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级',
                field: 'amountSjJzPay',
                sortable: true,
                filters: false,
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountPayAll',
                width: 100,
                sortable: true,
                filters: false,
                align: 'right',
                formula: '{amountSjSnjJzPay}+{amountSjJzPay}',
                cellRender: {
                  name: '$vxeMoney'
                }
              }
            ]
          },
          {
            title: '支出进度',
            width: 100,
            align: 'right',
            children: [
              {
                title: '省级',
                field: 'sjsnjRatio',
                sortable: true,
                filters: false,
                width: 100,
                align: 'right',
                formula: '({amountSjSnjJz}-0==0)?0:({amountSjSnjJzPay}/{amountSjSnjJz})*100',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '市级',
                field: 'sjRatio',
                sortable: true,
                filters: false,
                width: 100,
                align: 'right',
                formula: '({amountSjJz}-0==0)?0:({amountSjJzPay}/{amountSjJz})*100',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '总金额',
                field: 'sjRatioAll',
                width: 100,
                sortable: true,
                filters: false,
                align: 'right',
                formula: '({amountSjAll}-0==0)?0:({amountPayAll}/{amountSjAll})*100',
                cellRender: {
                  name: '$vxeRatio'
                }
              }
            ]
          }
        ]
      },
      {
        title: '县级',
        width: 100,
        align: 'center',
        children: [
          {
            title: '资金总量',
            width: 100,
            align: 'right',
            children: [
              {
                title: '省级',
                field: 'amountXjSnjJz',
                sortable: true,
                filters: false,
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级',
                field: 'amountXjSjJz',
                sortable: true,
                filters: false,
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '县级',
                field: 'amountXjJz',
                sortable: true,
                filters: false,
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountXjAll',
                sortable: true,
                filters: false,
                width: 100,
                align: 'right',
                canInsert: true,
                formula: '{amountXjSnjJz}+{amountXjSjJz}+{amountXjJz}',
                cellRender: {
                  name: '$vxeMoney'
                }
              }
            ]
          },
          {
            title: '支出金额',
            width: 100,
            align: 'right',
            children: [
              {
                title: '省级',
                field: 'amountXjSnjJzPay',
                sortable: true,
                filters: false,
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级',
                sortable: true,
                filters: false,
                field: 'amountXjSjJzPay',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '县级',
                field: 'amountXjJzPay',
                width: 100,
                sortable: true,
                filters: false,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountXjPayAll',
                sortable: true,
                filters: false,
                width: 100,
                align: 'right',
                formula: '{amountXjSnjJzPay}+{amountXjSjJzPay}+{amountXjJzPay}',
                cellRender: {
                  name: '$vxeMoney'
                }
              }
            ]
          },
          {
            title: '支出进度',
            width: 100,
            align: 'right',
            children: [
              {
                title: '省级',
                field: 'xjSnjPayRatio',
                sortable: true,
                filters: false,
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formual: '({amountXjSnjJz}-0==0?0:{amountXjSnjJzPay}/{amountXjSnjJz}*100)'
              },
              {
                title: '市级',
                field: 'xjSjPayRatio',
                width: 100,
                sortable: true,
                filters: false,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formual: '({amountXjSjJz}-0==0?0:{amountXjSjJzPay}/{amountXjSjJz}*100)'
              },
              {
                title: '县级',
                sortable: true,
                filters: false,
                field: 'xjPayRatio',
                width: 100,
                align: 'right',
                formual: '({amountXjJz}-0==0?0:{amountXjJzPay}/{amountXjJz}*100)',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '总金额',
                field: 'xjPayAll',
                width: 100,
                sortable: true,
                filters: false,
                align: 'right',
                formula: '({amountXjAll}-0==0)?0:({amountXjPayAll}/{amountXjAll})*100',
                cellRender: {
                  name: '$vxeRatio'
                }
              }
            ]
          }
        ]
      }
    ],
    tableData: []
  }
}
if (store.getters.isSx) {
  proconf = {
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
        { code: 'export', label: '导出', status: 'primary' }
      ]
    },
    statusRightToolBarButtonByBusDept: {
      '1': [
        { code: 'export', label: '导出', status: 'primary' }
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
            { value: '2022', label: '2022年' },
            { value: '2023', label: '2023年' }
          ],
          props: {
            placeholder: '业务年度'
          }
        }
      }
    ],
    highQueryData: {
      fiscalYear: '2022'
    },
    basicInfo: {
      type: 'form',
      tableConfig: {
        globalConfig: {
          // 全局配置
          seq: true, // 序号列
          useMoneyFilter: true
        }
      },
      tableColumnsConfig: [
        {
          title: '资金名称',
          type: 'name',
          treeNode: true,
          fixed: false,
          align: 'left',
          width: 160,
          field: 'name',
          cellRender: {
            name: '$vxeIcon',
            props: {
              $refs: this
            }
          }
        },
        {
          title: '全省',
          width: 200,
          align: 'center',
          children: [
            {
              title: '资金总量',
              field: 'all1',
              formula: '{amountProvince}+{amountCity}+{amountCounty}',
              width: 200,
              align: 'right',
              sortable: true,
              cellRender: { name: '$vxeMoney' }
            },
            {
              title: '支出金额',
              field: 'payAll',
              width: 200,
              align: 'right',
              formula: '{amountPayProvince}+{amountPayCity}+{amountPayCounty}',
              sortable: true,
              cellRender: { name: '$vxeMoney' }
            },
            {
              title: '支出进度',
              field: 'payPro',
              width: 200,
              align: 'right',
              sortable: true,
              formula: '({all1}-0==0)?0:(({payAll}/{all1})*100)',
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
              title: '资金总量',
              field: 'amountProvince',
              width: 200,
              align: 'right',
              sortable: true,
              cellRender: { name: '$vxeMoney' }
            },
            {
              title: '支出金额',
              field: 'amountPayProvince',
              width: 200,
              align: 'right',
              sortable: true,
              cellRender: { name: '$vxeMoney' }
            },
            {
              title: '支出进度',
              field: 'sjpayPro1',
              sortable: true,
              formula: '({amountProvince}-0==0)?0:({amountPayProvince}/{amountProvince}*100)',
              width: 200,
              align: 'right',
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
              title: '资金总量',
              width: 200,
              align: 'right',
              children: [
                {
                  title: '省级',
                  field: 'SSnAll',
                  width: 200,
                  sortable: true,
                  align: 'right'
                },
                {
                  title: '市级',
                  field: 'amountCity',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'amountCity1',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  formula: '{amountCity}',
                  cellRender: {
                    name: '$vxeMoney'
                  }
                }
              ]
            },
            {
              title: '支出金额',
              width: 200,
              align: 'right',
              children: [
                {
                  title: '省级',
                  field: 'SSnzc',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '市级',
                  field: 'amountPayCity',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'amountPayCity1',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  formula: '{amountPayCity}',
                  cellRender: {
                    name: '$vxeMoney'
                  }
                }
              ]
            },
            {
              title: '支出进度',
              width: 200,
              align: 'right',
              children: [
                {
                  title: '省级',
                  field: 'SSnzcPro',
                  width: 200,
                  sortable: true,
                  align: 'right'
                },
                {
                  title: '市级',
                  field: 'shijzcjd',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  formula: '({amountCity}-0==0)?0:({amountPayCity}/{amountCity})*100',
                  cellRender: { name: '$vxeRatio' }
                },
                {
                  title: '总金额',
                  field: 'shijzcjdall',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  formula: '({amountCity}-0==0)?0:({amountPayCity}/{amountCity})*100',
                  cellRender: {
                    name: '$vxeRatio'
                  }
                }
              ]
            }
          ]
        },
        {
          title: '县级',
          width: 200,
          align: 'center',
          children: [
            {
              title: '资金总量',
              width: 200,
              align: 'right',
              children: [
                {
                  title: '省级',
                  field: 'xSnAll',
                  width: 200,
                  sortable: true,
                  align: 'right'
                },
                {
                  title: '市级',
                  field: 'xSAll',
                  width: 200,
                  sortable: true,
                  align: 'right'
                },
                {
                  title: '县级',
                  field: 'amountCounty',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'amountCounty1',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  formula: '{amountCounty}',
                  cellRender: {
                    name: '$vxeMoney'
                  }
                }
              ]
            },
            {
              title: '支出金额',
              width: 200,
              align: 'right',
              children: [
                {
                  title: '省级',
                  field: 'xSnzc',
                  width: 200,
                  sortable: true,
                  align: 'right'
                },
                {
                  title: '市级',
                  field: 'xSzc',
                  width: 200,
                  sortable: true,
                  align: 'right'
                },
                {
                  title: '县级',
                  field: 'amountPayCounty',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  cellRender: { name: '$vxeMoney' }
                },
                {
                  title: '总金额',
                  field: 'amountPayCounty1',
                  width: 200,
                  align: 'right',
                  sortable: true,
                  formula: '{amountPayCounty}',
                  cellRender: {
                    name: '$vxeMoney'
                  }
                }
              ]
            },
            {
              title: '支出进度',
              width: 200,
              align: 'right',
              children: [
                {
                  title: '省级',
                  field: 'xSnzcPro',
                  sortable: true,
                  width: 200,
                  align: 'right'
                },
                {
                  title: '市级',
                  field: 'xSzcPro',
                  sortable: true,
                  width: 200,
                  align: 'right'
                },
                {
                  title: '县级',
                  field: 'xjzcjd',
                  sortable: true,
                  width: 200,
                  align: 'right',
                  formula: '({amountCounty}-0==0)?0:({amountPayCounty}/{amountCounty})*100',
                  cellRender: { name: '$vxeRatio' }
                },
                {
                  title: '总金额',
                  field: 'xjzcjdzje',
                  sortable: true,
                  width: 200,
                  align: 'right',
                  formula: '({amountCounty}-0==0)?0:({amountPayCounty}/{amountCounty})*100',
                  cellRender: {
                    name: '$vxeRatio'
                  }
                }
              ]
            }
          ]
        }
      ],
      tableData: []
    }
  }
}
export default function (tableType, configType) {
  if (tableType && configType) {
    return window.deepCopy(proconf[tableType][configType])
  } else if (tableType) {
    return window.deepCopy(proconf[tableType])
  } else {
    return null
  }
}
