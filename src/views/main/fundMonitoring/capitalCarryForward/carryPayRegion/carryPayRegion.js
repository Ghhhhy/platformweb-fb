// import store from '@/store/index'
const proconf = {
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
    proCodes: '',
    endTime: ''
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
        title: '地区名称',
        type: 'name',
        align: 'left',
        treeNode: true,
        width: 260,
        field: 'name',
        sortable: true,
        cellRender: { name: '$vxeIcon' }
      },
      {
        title: '全省',
        width: 200,
        align: 'center',
        children: [
          {
            title: '资金总量',
            field: 'all1',
            formula: '{amountSnjJz}+{amountSjAll}+{amountXjAll}',
            width: 100,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出金额',
            field: 'payAll',
            width: 100,
            align: 'right',
            formula: '{amountSnjJzPay}+{amountPayAll}+{amountXjPayAll}',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出进度',
            field: 'payPro',
            width: 100,
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
            field: 'amountSnjJz',
            width: 100,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出金额',
            field: 'amountSnjJzPay',
            width: 100,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出进度',
            field: 'sjpayPro1',
            formula: '({amountProvince}-0==0)?0:({amountPayProvince}/{amountProvince}*100)',
            width: 100,
            align: 'right',
            sortable: true,
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
            width: 100,
            align: 'right',
            children: [
              {
                title: '省级',
                field: 'amountSjSnjJz',
                width: 100,
                sortable: true,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级',
                field: 'amountSjJz',
                width: 100,
                align: 'right',
                sortable: true,
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountSjAll',
                width: 100,
                align: 'right',
                sortable: true,
                formula: '{amountSjSnjJz}+{amountSjJz}',
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
                field: 'amountSjSnjJzPay',
                width: 100,
                align: 'right',
                sortable: true,
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级',
                field: 'amountSjJzPay',
                width: 100,
                align: 'right',
                sortable: true,
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountPayAll',
                width: 100,
                align: 'right',
                sortable: true,
                formula: '{amountSjSnjJzPay}+{amountSjJzPay}',
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
                field: 'sjsnjRatio',
                width: 100,
                sortable: true,
                align: 'right',
                formula: '({amountSjSnjJz}-0==0)?0:({amountSjSnjJzPay}/{amountSjSnjJz})*100',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '市级',
                field: 'sjRatio',
                width: 100,
                sortable: true,
                align: 'right',
                formula: '({amountSjJz}-0==0)?0:({amountSjJzPay}/{amountSjJz})*100',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '总金额',
                field: 'sjRatioAll',
                width: 100,
                sortable: true,
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
        width: 200,
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
                width: 100,
                sortable: true,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级',
                field: 'amountXjSjJz',
                width: 100,
                sortable: true,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '县级',
                field: 'amountXjJz',
                width: 100,
                align: 'right',
                sortable: true,
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountXjAll',
                width: 100,
                align: 'right',
                sortable: true,
                formula: '{amountXjSnjJz}+{amountXjSjJz}+{amountXjJz}',
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
                field: 'amountXjSnjJzPay',
                sortable: true,
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级',
                field: 'amountXjSjJzPay',
                width: 100,
                sortable: true,
                align: 'right'
              },
              {
                title: '县级',
                field: 'amountXjJzPay',
                width: 100,
                align: 'right',
                sortable: true,
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountXjPayAll',
                width: 100,
                align: 'right',
                sortable: true,
                formula: '{amountXjSnjJzPay}+{amountXjSjJzPay}+{amountXjJzPay}',
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
                field: 'xjSnjPayRatio',
                width: 100,
                sortable: true,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formual: '({amountXjSnjJz}-0==0?0:{amountXjSnjJzPay}/{amountXjSnjJz}*100)'
              },
              {
                title: '市级',
                field: 'xjSjPayRatio',
                width: 100,
                sortable: true,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formual: '({amountXjSjJz}-0==0?0:{amountXjSjJzPay}/{amountXjSjJz}*100)'
              },
              {
                title: '县级',
                field: 'xjPayRatio',
                width: 100,
                sortable: true,
                align: 'right',
                formual: '({amountXjJz}-0==0?0:{amountXjJzPay}/{amountXjJz}*100)',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '总金额',
                field: 'xjPayAll',
                width: 100,
                align: 'right',
                sortable: true,
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
export default function (tableType, configType) {
  if (tableType && configType) {
    return window.deepCopy(proconf[tableType][configType])
  } else if (tableType) {
    return window.deepCopy(proconf[tableType])
  } else {
    return null
  }
}
