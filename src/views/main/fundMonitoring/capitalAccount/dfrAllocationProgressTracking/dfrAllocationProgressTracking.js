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
  highQueryData: {
    fiscalYear: store.state?.userInfo?.year,
    endTime: '',
    proCodes: ''
  },
  basicInfo: {
    type: 'form',
    tableConfig: {
      globalConfig: {
        checkType: 'checkbox',
        seq: false, // 序号列
        useMoneyFilter: true
      }
    },
    tableColumnsConfig: [
      {
        title: '地区名称',
        type: 'name',
        treeNode: true,
        align: 'left',
        width: 260,
        fixed: 'left',
        field: 'name',
        cellRender: {
          name: '$vxeIcon'
        }
      },
      // {
      //   title: '地区编码',
      //   type: 'code',
      //   align: 'left',
      //   width: 260,
      //   field: 'code',
      //   cellRender: {
      //     name: '$vxeIcon'
      //   },
      //   visible: false
      // },
      {
        title: '中央下达',
        width: 200,
        field: 'amountZyxd',
        align: 'right',
        type: 'amountZyxd',
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
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'jOut',
            formula: '{amountSnjpay}+{amountSjpay}+{amountXjpay}'
          },
          {
            title: '进度',
            align: 'right',
            width: 100,
            field: 'jLoad',
            formula: '({amountZyxd}-0==0)?0:Math.round({jOut}/{amountZyxd}*100*10)/10',
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
            title: '省级下达',
            field: 'amountSnjxd',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            visible: true
          },
          {
            title: '分配本级',
            field: 'amountSnjbjfp',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'amountSnjxjfp',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'sUnassigned',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSnjxd}-{amountSnjbjfp}-{amountSnjxjfp}'
          },
          {
            title: '分配进度',
            field: 'sLoad',
            width: 200,
            align: 'right',
            sortable: true,
            formula: '({amountSnjxd}-0==0)?0:Math.round(({amountSnjbjfp}+{amountSnjxjfp})/{amountSnjxd}*100*10)/10',
            cellRender: {
              name: '$vxeRatio'
            }
          },
          {
            title: '本级已支出',
            field: 'amountSnjpay',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出进度',
            field: 'snpayLoad',
            width: 200,
            align: 'right',
            sortable: true,
            formula: '({amountSnjbjfp}-0==0)?0:Math.round({amountSnjpay}/{amountSnjbjfp}*100*10)/10',
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
            title: '市级下达',
            field: 'amountSjxd',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '分配本级',
            field: 'amountSbjfp',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'amountSxjfp',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'aUnassigned',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSjxd}-{amountSbjfp}-{amountSxjfp}'
          },
          {
            title: '分配进度',
            field: 'aLoad',
            width: 200,
            sortable: true,
            align: 'right',
            formula: '({amountSjxd}-0==0)?0:Math.round(({amountSbjfp}+{amountSxjfp})/{amountSjxd}*100*10)/10',
            cellRender: {
              name: '$vxeRatio'
            }
          },
          {
            title: '本级已支出',
            field: 'amountSjpay',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出进度',
            field: 'spayLoad',
            width: 200,
            align: 'right',
            sortable: true,
            formula: '({amountSbjfp}-0==0)?0:Math.round({amountSjpay}/{amountSbjfp}*100*10)/10',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '县级',
        key: 'xianji',
        width: 200,
        align: 'center',
        children: [
          {
            title: '县级下达',
            field: 'amountXjxd',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '已分配',
            field: 'amountXjfp',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'amountXxjfp',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'xUnassigned',
            width: 200,
            align: 'right',
            sortable: true,
            formula: '{amountXjxd}-{amountXjfp}'
          },
          {
            title: '分配进度',
            field: 'xLoad',
            width: 200,
            align: 'right',
            sortable: true,
            formula: '({amountXjxd}-0==0)?0:Math.round({amountXjfp}/{amountXjxd}*100*10)/10',
            cellRender: {
              name: '$vxeRatio'
            }
          },
          {
            title: '已支出',
            field: 'amountXjpay',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出进度',
            field: 'xpayLoad',
            width: 200,
            align: 'right',
            sortable: true,
            formula: '({amountXjfp}-0==0)?0:Math.round({amountXjpay}/{amountXjfp}*100*10)/10',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '镇级',
        key: 'zhenji',
        width: 200,
        align: 'center',
        children: [
          {
            title: '镇级下达',
            field: 'amountZjxd',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '已分配',
            field: 'amountZjfp',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountZjwfp',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'xLoad',
            width: 200,
            align: 'right',
            sortable: true,
            formula: '({amountZjfp}+{amountZjwfp}-0==0)?0:({amountZjfp}/({amountZjfp}+{amountZjwfp})*100)',
            cellRender: {
              name: '$vxeRatio'
            }
          },
          {
            title: '已支出',
            field: 'amountZjpay',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出进度',
            field: 'zpayLoad',
            width: 200,
            align: 'right',
            sortable: true,
            formula: '({amountZjfp}-0==0)?0:({amountZjpay}/{amountZjfp}*100)',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      }
    ],
    tableColumnsConfigCity: [
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
        title: '地区编码',
        type: 'code',
        align: 'left',
        width: 260,
        field: 'code',
        cellRender: {
          name: '$vxeIcon'
        },
        visible: false
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
        title: '支出',
        width: 260,
        align: 'center',
        children: [
          {
            title: '金额',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'jOut',
            formula: '{amountSnjpay}+{amountSjpay}+{amountXjpay}'
          },
          {
            title: '进度',
            align: 'right',
            width: 200,
            field: 'jLoad',
            formula: '({amountZyxd}-0==0)?0:Math.round({jOut}/{amountZyxd}*100*10)/10',
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
            title: '市级下达',
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
            field: 'sUnassigned',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSnjxd}-{amountSnjbjfp}-{amountSnjxjfp}'
          },
          {
            title: '分配进度',
            field: 'sLoad',
            width: 200,
            align: 'right',
            formula: '({amountSnjxd}-0==0)?0:Math.round(({amountSnjbjfp}+{amountSnjxjfp})/{amountSnjxd}*100*10)/10',
            cellRender: {
              name: '$vxeRatio'
            }
          },
          {
            title: '本级已支出',
            field: 'amountSnjpay',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出进度',
            field: 'snpayLoad',
            width: 200,
            align: 'right',
            formula: '({amountSnjbjfp}-0==0)?0:Math.round({amountSnjpay}/{amountSnjbjfp}*100*10)/10',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '区级',
        width: 200,
        align: 'center',
        children: [
          {
            title: '区级下达',
            field: 'amountXjxd',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
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
            field: 'xUnassigned',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            formula: '{amountXjxd}-{amountXjfp}'
          },
          {
            title: '分配进度',
            field: 'xLoad',
            width: 200,
            align: 'right',
            formula: '({amountXjxd}-0==0)?0:Math.round({amountXjfp}/{amountXjxd}*100*10)/10',
            cellRender: {
              name: '$vxeRatio'
            }
          },
          {
            title: '已支出',
            field: 'amountXjpay',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出进度',
            field: 'xpayLoad',
            width: 200,
            align: 'right',
            formula: '({amountXjfp}-0==0)?0:Math.round({amountXjpay}/{amountXjfp}*100*10)/10',
            cellRender: {
              name: '$vxeRatio'
            }
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
