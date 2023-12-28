import store from '@/store/index'
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
    // {
    //   title: '业务年度',
    //   field: 'fiscalYear',
    //   width: '8',
    //   align: 'left',
    //   formula: '',
    //   itemRender: {
    //     name: '$vxeInput',
    //     // options: [
    //     //   // { value: '2020', label: '2020年' },
    //     //   // { value: '2021', label: '2021年' },
    //     //   { value: '2022', label: '2022年' },
    //     //   { value: '2023', label: '2023年' }
    //     // ],
    //     props: {
    //       type: 'year',
    //       valueFormat: 'yyyy',
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
    fiscalYear: store.state.userInfo.year,
    proCodes: '',
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
        title: '地区名称',
        type: 'name',
        align: 'left',
        sortable: false,
        filters: false,
        treeNode: true,
        width: 260,
        field: 'name',
        cellRender: { name: '$vxeIcon' }
      },
      {
        title: '全省',
        width: 100,
        align: 'center',
        children: [
          {
            title: '合计',
            field: 'all',
            sortable: false,
            filters: false,
            formula: '{amountProvince}+{amountCity}+{amountCounty}',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '省级',
            sortable: false,
            filters: false,
            field: 'amountProvince',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '市级',
            sortable: false,
            filters: false,
            field: 'amountCity',
            width: 100,
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
            width: 100,
            align: 'right',
            cellRender: {
              name: '$vxeMoney'
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
            title: '结转金额',
            sortable: false,
            filters: false,
            field: 'amountSnjjz',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配本级',
            sortable: false,
            filters: false,
            field: 'amountsnjfpbj',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'amountsnjfpxj',
            sortable: false,
            filters: false,
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountsnjwfp',
            width: 100,
            sortable: false,
            filters: false,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '进度',
            field: 'spro1',
            width: 100,
            align: 'right',
            sortable: false,
            filters: false,
            formula: '{amountSnjjz}-0==0?0:({amountsnjfpbj}+{amountsnjfpxj})/{amountSnjjz}*100',
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
            title: '结转金额',
            width: 100,
            align: 'right',
            children: [
              {
                title: '省级',
                field: 'amountsjsnjjz',
                sortable: false,
                filters: false,
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级',
                field: 'amountsjjz',
                width: 100,
                sortable: false,
                filters: false,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                sortable: false,
                filters: false,
                field: 'amountsjjzall',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountsjsnjjz}+{amountsjjz})'
              }
            ]
          },
          {
            title: '分配本级',
            width: 100,
            align: 'right',
            children: [
              {
                title: '省级',
                sortable: false,
                filters: false,
                field: 'amountsjsnjfpbj',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级',
                field: 'amountsjfpbj',
                sortable: false,
                filters: false,
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountsjfpbjall',
                sortable: false,
                filters: false,
                width: 100,
                align: 'right',
                canInsert: true,
                areaType: 'city',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountCity})'
              }
            ]
          },
          {
            title: '分配下级',
            width: 100,
            align: 'right',
            children: [
              {
                title: '省级',
                field: 'amountsjsnjfpxj',
                width: 100,
                sortable: false,
                filters: false,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级',
                field: 'amountsjfpxj',
                width: 100,
                sortable: false,
                filters: false,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountsjfpxjall',
                sortable: false,
                filters: false,
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '{amountsjsnjfpxj}+{amountsjfpxj}'
              }
            ]
          },
          {
            title: '未分配',
            width: 100,
            align: 'right',
            children: [
              {
                title: '省级',
                field: 'amountsjsnjwfp',
                sortable: false,
                filters: false,
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级',
                field: 'amountsjwfp',
                width: 100,
                sortable: false,
                filters: false,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountsjwfpall',
                sortable: false,
                filters: false,
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '{amountsjsnjwfp}+{amountsjwfp}'
              }
            ]
          },
          {
            title: '进度',
            width: 100,
            align: 'right',
            children: [
              {
                title: '省级',
                field: '',
                sortable: false,
                filters: false,
                width: 100,
                align: 'right',
                formula: '{amountsjsnjjz}-0==0?0:({amountsjsnjfpxj}+{amountsjsnjfpbj})/{amountsjsnjjz}',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '市级',
                field: 'shjpro',
                width: 100,
                sortable: false,
                filters: false,
                align: 'right',
                formula: '{amountsjjz}-0==0?0:({amountsjfpxj}+{amountsjfpbj})/{amountsjjz}',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '总进度',
                field: 'shpro',
                sortable: false,
                filters: false,
                width: 100,
                align: 'right',
                formula: '{amountsjjzall}-0==0?0:({amountsjfpxjall}+{amountsjfpbjall})/{amountsjjzall}',
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
            title: '结转金额',
            width: 100,
            align: 'right',
            children: [
              {
                title: '省级',
                field: 'amountxjsnjjz',
                width: 100,
                sortable: false,
                filters: false,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级',
                field: 'amountxjsjjz',
                width: 100,
                sortable: false,
                filters: false,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '县级',
                field: 'amountxjjz',
                width: 100,
                sortable: false,
                filters: false,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountxjjzall',
                width: 100,
                align: 'right',
                sortable: false,
                filters: false,
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountxjsnjjz}+{amountxjsjjz}+{amountxjjz})'
              }
            ]
          },
          {
            title: '分配本级',
            width: 100,
            align: 'right',
            children: [
              {
                title: '省级',
                field: 'amountxjsnjfpbj',
                sortable: false,
                filters: false,
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级',
                field: 'amountxjsjfpbj',
                width: 100,
                sortable: false,
                filters: false,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '县级',
                field: 'amountxjfpbj',
                width: 100,
                align: 'right',
                sortable: false,
                filters: false,
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountxjfpbjall',
                width: 100,
                align: 'right',
                sortable: false,
                filters: false,
                canInsert: true,
                areaType: 'county',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountxjsnjfpbj}+{amountxjsjfpbj}+{amountxjfpbj})'
              }
            ]
          },
          // {
          //   title: '分配下级',
          //   width: 100,
          //   align: 'right',
          //   children: [
          //     {
          //       title: '省级',
          //       field: 'amountxjsnjfpxj',
          //       width: 100,
          //       sortable: false,
          //       filters: false,
          //       align: 'right',
          //       cellRender: { name: '$vxeMoney' }
          //     },
          //     {
          //       title: '市级',
          //       field: 'amountxjsjfpxj',
          //       width: 100,
          //       sortable: false,
          //       filters: false,
          //       align: 'right',
          //       cellRender: { name: '$vxeMoney' }
          //     },
          //     {
          //       title: '县级',
          //       field: 'amountxjfpxj',
          //       sortable: false,
          //       filters: false,
          //       width: 100,
          //       align: 'right',
          //       cellRender: { name: '$vxeMoney' }
          //     },
          //     {
          //       title: '总金额',
          //       field: 'amountxjfpxjall',
          //       sortable: false,
          //       filters: false,
          //       width: 100,
          //       align: 'right',
          //       cellRender: { name: '$vxeMoney' },
          //       formula: '{amountxjsnjfpxj}+{amountxjsjfpxj}+{amountxjfpxj}'
          //     }
          //   ]
          // },
          {
            title: '未分配',
            width: 100,
            align: 'right',
            children: [
              {
                title: '省级',
                field: 'amountxjsnjwfp',
                sortable: false,
                filters: false,
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级',
                field: 'amountxjsjwfp',
                sortable: false,
                filters: false,
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '县级',
                field: 'amountxjwfp',
                width: 100,
                sortable: false,
                filters: false,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'amountxjwfpall',
                sortable: false,
                filters: false,
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                formula: '{amountxjsnjwfp}+{amountxjsjwfp}+{amountxjwfp}'
              }
            ]
          },
          {
            title: '进度',
            width: 100,
            align: 'right',
            children: [
              {
                title: '省级',
                field: 'sj',
                width: 100,
                sortable: false,
                filters: false,
                align: 'right',
                formula: '{amountxjsnjjz}-0==0?0:({amountxjsnjfpbj}+{amountxjsnjfpxj})/{amountxjsnjjz}*100',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '市级',
                field: 'shj',
                sortable: false,
                filters: false,
                width: 100,
                align: 'right',
                formula: '{amountxjsjjz}-0==0?0:({amountxjsjfpbj}+{amountxjsjfpxj})/{amountxjsjjz}*100',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '县级',
                field: 'xj',
                width: 100,
                sortable: false,
                filters: false,
                align: 'right',
                formula: '{amountxjjz}-0==0?0:({amountxjfpbj}+{amountxjfpxj})/{amountxjjz}*100',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '总进度',
                field: 'saAmount1',
                width: 100,
                sortable: false,
                filters: false,
                align: 'right',
                formula: '{amountxjjzall}-0==0?0:({amountxjfpbjall}+{amountxjfpxjall})/{amountxjjzall}*100',
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
