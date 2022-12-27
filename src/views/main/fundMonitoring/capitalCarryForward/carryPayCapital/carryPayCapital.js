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
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '2020', label: '2020年' },
          { value: '2021', label: '2021年' },
          { value: '2022', label: '2022年' }
        ],
        props: {
          placeholder: '业务年度'
        }
      }
    }
  ],
  highQueryData: {
    fiscalYear: ''
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
        treeNode: true,
        fixed: false,
        align: 'left',
        sortable: false,
        filters: false,
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
            sortable: false,
            filters: false,
            formula: '{amountProvince}+{amountCity}+{amountCounty}',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出金额',
            field: 'payAll',
            sortable: false,
            filters: false,
            width: 200,
            align: 'right',
            formula: '{amountPayProvince}+{amountPayCity}+{amountPayCounty}',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出进度',
            field: 'payPro',
            sortable: false,
            filters: false,
            width: 200,
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
        width: 200,
        align: 'center',
        children: [
          {
            title: '资金总量',
            field: 'amountProvince',
            sortable: false,
            filters: false,
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出金额',
            field: 'amountPayProvince',
            sortable: false,
            filters: false,
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出进度',
            field: 'sjpayPro1',
            sortable: false,
            filters: false,
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
            sortable: false,
            filters: false,
            width: 200,
            align: 'right',
            children: [
              {
                title: '省级',
                field: '',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right'
              },
              {
                title: '市级',
                sortable: false,
                filters: false,
                field: 'amountCity',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                sortable: false,
                filters: false,
                field: 'amountCity1',
                width: 200,
                align: 'right',
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
                field: '',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级',
                field: 'amountPayCity',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountPayCity1',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right',
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
                field: '',
                sortable: false,
                filters: false,
                width: 200,
                align: 'right'
              },
              {
                title: '市级',
                field: 'shijzcjd',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right',
                formula: '({amountCity}-0==0)?0:({amountPayCity}/{amountCity})*100',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '总金额',
                field: 'shijzcjdall',
                sortable: false,
                filters: false,
                width: 200,
                align: 'right',
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
                field: '',
                sortable: false,
                filters: false,
                width: 200,
                align: 'right'
              },
              {
                title: '市级',
                field: '',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right'
              },
              {
                title: '县级',
                field: 'amountCounty',
                width: 200,
                align: 'right',
                sortable: false,
                filters: false,
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountCounty1',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right',
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
                field: '',
                sortable: false,
                filters: false,
                width: 200,
                align: 'right'
              },
              {
                title: '市级',
                field: '',
                sortable: false,
                filters: false,
                width: 200,
                align: 'right'
              },
              {
                title: '县级',
                field: 'amountPayCounty',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountPayCounty1',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right',
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
                field: '',
                sortable: false,
                filters: false,
                width: 200,
                align: 'right'
              },
              {
                title: '市级',
                field: '',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right'
              },
              {
                title: '县级',
                field: 'xjzcjd',
                width: 200,
                align: 'right',
                sortable: false,
                filters: false,
                formula: '({amountCounty}-0==0)?0:({amountPayCounty}/{amountCounty})*100',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '总金额',
                field: 'xjzcjdzje',
                width: 200,
                align: 'right',
                sortable: false,
                filters: false,
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
export default function (tableType, configType) {
  if (tableType && configType) {
    return window.deepCopy(proconf[tableType][configType])
  } else if (tableType) {
    return window.deepCopy(proconf[tableType])
  } else {
    return null
  }
}
