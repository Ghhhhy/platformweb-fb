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
        sortable: false,
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
            sortable: false,
            filters: false,
            formula: '{amountSnjJz}+{amountSjAll}+{amountXjAll}',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出金额',
            field: 'payAll',
            sortable: false,
            filters: false,
            width: 100,
            align: 'right',
            formula: '{amountSnjJzPay}+{amountPayAll}+{amountXjPayAll}',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出进度',
            field: 'payPro',
            sortable: false,
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
            sortable: false,
            filters: false,
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出金额',
            field: 'amountSnjJzPay',
            sortable: false,
            filters: false,
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出进度',
            field: 'sjpayPro1',
            sortable: false,
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
                sortable: false,
                filters: false,
                field: 'amountSjSnjJz',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级',
                field: 'amountSjJz',
                sortable: false,
                filters: false,
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountSjAll',
                sortable: false,
                filters: false,
                width: 100,
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
                sortable: false,
                filters: false,
                field: 'amountSjSnjJzPay',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级',
                field: 'amountSjJzPay',
                sortable: false,
                filters: false,
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountPayAll',
                width: 100,
                sortable: false,
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
                sortable: false,
                filters: false,
                width: 100,
                align: 'right',
                formula: '({amountSjSnjJz}-0==0)?0:({amountSjSnjJzPay}/{amountSjSnjJz})*100',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '市级',
                field: 'sjRatio',
                sortable: false,
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
                sortable: false,
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
                sortable: false,
                filters: false,
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级',
                field: 'amountXjSjJz',
                sortable: false,
                filters: false,
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '县级',
                field: 'amountXjJz',
                sortable: false,
                filters: false,
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountXjAll',
                sortable: false,
                filters: false,
                width: 100,
                align: 'right',
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
                sortable: false,
                filters: false,
                width: 100,
                align: 'right'
              },
              {
                title: '市级',
                sortable: false,
                filters: false,
                field: 'amountXjSjJzPay',
                width: 100,
                align: 'right'
              },
              {
                title: '县级',
                field: 'amountXjJzPay',
                width: 100,
                sortable: false,
                filters: false,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountXjPayAll',
                sortable: false,
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
                sortable: false,
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
                sortable: false,
                filters: false,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formual: '({amountXjSjJz}-0==0?0:{amountXjSjJzPay}/{amountXjSjJz}*100)'
              },
              {
                title: '县级',
                sortable: false,
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
                sortable: false,
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
export default function (tableType, configType) {
  if (tableType && configType) {
    return window.deepCopy(proconf[tableType][configType])
  } else if (tableType) {
    return window.deepCopy(proconf[tableType])
  } else {
    return null
  }
}
