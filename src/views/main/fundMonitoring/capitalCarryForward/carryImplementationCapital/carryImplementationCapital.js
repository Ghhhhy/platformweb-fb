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
        width: 160,
        sortable: false,
        filters: false,
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
            title: '合计',
            field: 'all',
            sortable: false,
            filters: false,
            formula: '{amountProvince}+{amountCity}+{amountCounty}',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '省级',
            field: 'amountProvince',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '市级',
            field: 'amountCity',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right',
            cellRender: {
              name: '$vxeMoney'
            }
          },
          {
            title: '县级',
            sortable: false,
            filters: false,
            field: 'amountCounty',
            width: 200,
            align: 'right',
            cellRender: {
              name: '$vxeMoney'
            }
          }
        ]
      },
      {
        title: '省级',
        width: 200,
        sortable: false,
        filters: false,
        align: 'center',
        children: [
          {
            title: '结转金额',
            field: 'amountProvince',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配本级',
            field: 'amountProvince',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: '',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right'
          },
          {
            title: '未分配',
            field: '',
            sortable: false,
            filters: false,
            width: 200,
            align: 'right'
          },
          {
            title: '进度',
            field: 'spro1',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right',
            formula: '100',
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
            title: '结转金额',
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
                field: 'amountCity',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'shsaAmount11',
                width: 200,
                align: 'right',
                sortable: false,
                filters: false,
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountCity})'
              }
            ]
          },
          {
            title: '分配本级',
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
                field: 'amountCity',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'shsaAmount2',
                width: 200,
                align: 'right',
                sortable: false,
                filters: false,
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountCity})'
              }
            ]
          },
          {
            title: '分配下级',
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
                field: '',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right'
              },
              {
                title: '总金额',
                field: '',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right',
                formula: ''
              }
            ]
          },
          {
            title: '未分配',
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
                title: '总金额',
                field: '',
                sortable: false,
                filters: false,
                width: 200,
                align: 'right',
                formula: ''
              }
            ]
          },
          {
            title: '进度',
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
                field: 'shjpro',
                width: 200,
                align: 'right',
                sortable: false,
                filters: false,
                formula: '100',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '总进度',
                field: 'shpro',
                formula: '100',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right',
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
            title: '结转金额',
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
                field: '',
                sortable: false,
                filters: false,
                width: 200,
                align: 'right'
              },
              {
                title: '县级',
                field: 'amountCounty',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'xsaAmount11',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountCounty})'
              }
            ]
          },
          {
            title: '分配本级',
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
                field: '',
                sortable: false,
                filters: false,
                width: 200,
                align: 'right'
              },
              {
                title: '县级',
                field: 'amountCounty',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'xsaAmount2',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountCounty})'
              }
            ]
          },
          {
            title: '分配下级',
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
                field: '',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right'
              },
              {
                title: '县级',
                field: '',
                sortable: false,
                filters: false,
                width: 200,
                align: 'right'
              },
              {
                title: '总金额',
                field: '',
                sortable: false,
                filters: false,
                width: 200,
                align: 'right',
                formula: ''
              }
            ]
          },
          {
            title: '未分配',
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
                field: '',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right'
              },
              {
                title: '总金额',
                field: '',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right',
                formula: ''
              }
            ]
          },
          {
            title: '进度',
            width: 200,
            align: 'right',
            children: [
              {
                title: '省级',
                field: 'sj',
                sortable: false,
                filters: false,
                width: 200,
                align: 'right'
              },
              {
                title: '市级',
                field: 'shj',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right'
              },
              {
                title: '县级',
                field: 'xj',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right',
                formula: '100',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '总进度',
                field: 'saAmount1',
                width: 200,
                sortable: false,
                filters: false,
                align: 'right',
                formula: '100',
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
