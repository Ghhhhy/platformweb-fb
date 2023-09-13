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
        seq: true, // 序号列
        useMoneyFilter: true
      }
    },
    tableColumnsConfig: [
      {
        title: '资金名称',
        type: 'name',
        treeNode: true,
        align: 'left',
        width: 260,
        field: 'name',
        sortable: true,
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
            formula: '{amountProvince}+{amountCity}+{amountCounty}',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '省级',
            field: 'amountProvince',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '市级',
            field: 'amountCity',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: {
              name: '$vxeMoney'
            }
          },
          {
            title: '县级',
            field: 'amountCounty',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: {
              name: '$vxeMoney'
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
            title: '结转金额',
            field: 'amountProvince',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配本级',
            field: 'amountProvince',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'amountSnfpxj',
            width: 200,
            sortable: true,
            align: 'right'
          },
          {
            title: '未分配',
            field: 'amountSnwfp',
            width: 200,
            sortable: true,
            align: 'right'
          },
          {
            title: '进度',
            field: 'spro1',
            width: 200,
            align: 'right',
            sortable: true,
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
                field: 'amountSnSjz',
                width: 200,
                align: 'right',
                sortable: true
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
                field: 'shsaAmount11',
                width: 200,
                align: 'right',
                sortable: true,
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
                field: 'amountSSnfpbj',
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
                field: 'shsaAmount2',
                width: 200,
                align: 'right',
                sortable: true,
                filters: false,
                canInsert: true,
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
                field: 'amountSSnfpxj',
                width: 200,
                sortable: true,
                align: 'right'
              },
              {
                title: '市级',
                field: 'amountSSfpbj',
                width: 200,
                sortable: true,
                align: 'right'
              },
              {
                title: '总金额',
                field: 'amountSSnfpbjAll',
                width: 200,
                sortable: true,
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
                field: 'amountSSnwpb',
                width: 200,
                sortable: true,
                align: 'right'
              },
              {
                title: '市级',
                field: 'amountSSwpb',
                width: 200,
                sortable: true,
                align: 'right'
              },
              {
                title: '总金额',
                field: 'amountSSnwpbAll',
                width: 200,
                sortable: true,
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
                field: 'amountSSnPro',
                width: 200,
                sortable: true,
                align: 'right'
              },
              {
                title: '市级',
                field: 'shjpro',
                width: 200,
                align: 'right',
                formula: '100',
                sortable: true,
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '总进度',
                field: 'shpro',
                formula: '100',
                width: 200,
                align: 'right',
                sortable: true,
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
                field: 'amountXSnjz',
                width: 200,
                sortable: true,
                align: 'right'
              },
              {
                title: '市级',
                field: 'amountXSjz',
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
                field: 'xsaAmount11',
                width: 200,
                sortable: true,
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
                field: 'amountXSnfpbj',
                width: 200,
                sortable: true,
                align: 'right'
              },
              {
                title: '市级',
                field: 'amountXSfpbj',
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
                field: 'xsaAmount2',
                width: 200,
                align: 'right',
                canInsert: true,
                sortable: true,
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountCounty})'
              }
            ]
          },
          // {
          //   title: '分配下级',
          //   width: 200,
          //   align: 'right',
          //   children: [
          //     {
          //       title: '省级',
          //       field: 'amountXSnfpxj',
          //       width: 200,
          //       sortable: true,
          //       align: 'right'
          //     },
          //     {
          //       title: '市级',
          //       field: 'amountXSfpxj',
          //       width: 200,
          //       sortable: true,
          //       align: 'right'
          //     },
          //     {
          //       title: '县级',
          //       field: 'amountXXfpxj',
          //       width: 200,
          //       sortable: true,
          //       align: 'right'
          //     },
          //     {
          //       title: '总金额',
          //       field: 'amountXSnfpxjAll',
          //       width: 200,
          //       sortable: true,
          //       align: 'right',
          //       formula: ''
          //     }
          //   ]
          // },
          {
            title: '未分配',
            width: 200,
            align: 'right',
            children: [
              {
                title: '省级',
                field: 'amountXSnwfp',
                width: 200,
                sortable: true,
                align: 'right'
              },
              {
                title: '市级',
                field: 'amountXSwfp',
                width: 200,
                sortable: true,
                align: 'right'
              },
              {
                title: '县级',
                field: 'amountXXwfp',
                width: 200,
                sortable: true,
                align: 'right'
              },
              {
                title: '总金额',
                field: 'amountXSnwfpAll',
                width: 200,
                sortable: true,
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
                width: 200,
                sortable: true,
                align: 'right'
              },
              {
                title: '市级',
                field: 'shj',
                width: 200,
                sortable: true,
                align: 'right'
              },
              {
                title: '县级',
                field: 'xj',
                width: 200,
                sortable: true,
                align: 'right',
                formula: '100',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '总进度',
                field: 'saAmount1',
                width: 200,
                align: 'right',
                formula: '100',
                sortable: true,
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
