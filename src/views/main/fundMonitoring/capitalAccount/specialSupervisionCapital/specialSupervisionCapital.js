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
              labelFormat: '{codeFragment}-{name}', // {code}-{name}
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
    },
    {
      title: '区划',
      field: 'isCentral',
      width: '8',
      align: 'left',
      formula: '',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '中央' },
          { value: '2', label: '地区' }
        ],
        props: {
          placeholder: '请选择',
          clearable: true
        }
      }
    },
    {
      title: '是否直达资金',
      field: 'isZd',
      width: '8',
      align: 'left',
      formula: '',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '是' },
          { value: '0', label: '否' }
        ],
        props: {
          placeholder: '是否直达资金',
          clearable: true
        }
      }
    }
    /*,

    } */
  ],
  highQueryData: {
    fiscalYear: store.state.userInfo.year,
    mofDivCodes: '',
    endTime: ''
    // isCentral: '',
    // isZd: ''
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
      // {
      //   title: '资金编码',
      //   type: 'code',
      //   fixed: false,
      //   align: 'left',
      //   width: 160,
      //   field: 'code',
      //   visible: false
      // },
      {
        title: '资金名称',
        type: 'name',
        treeNode: true,
        fixed: false,
        align: 'left',
        width: 280,
        field: 'name',
        cellRender: {
          name: '$vxeIcon',
          props: {
            $refs: this
          }
        }
      },
      {
        title: '中央下达',
        width: 100,
        field: 'amountZyxd',
        align: 'right',
        type: 'amountSnjxd',
        cellRender: { name: '$vxeMoney' }
      },
      // {
      //   title: '是否直达资金',
      //   width: 150,
      //   field: 'isZd',
      //   align: 'right',
      //   formatter: (value, column) => {
      //     let { row } = value
      //     return row['isZd'] && row['isZd'] === 1 ? '是' : '否'
      //   }
      // },
      {
        title: '整合',
        width: 100,
        field: 'amountZhje',
        align: 'right',
        type: 'amountZhje',
        cellRender: { name: '$vxeMoney' },
        visible: false
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
            width: 100,
            field: 'amountPayAll',
            formula: '{amountSnjpay}+{amountSjpay}+{amountXjpay}'
          },
          {
            title: '进度',
            align: 'right',
            width: 100,
            field: 'jLoad',
            formula: '({amountZyxd}-0==0)?0:Math.round({amountPayAll}/{amountZyxd}*100*10)/10',
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
            title: '整合金额',
            width: 100,
            field: 'amountSnjzhje',
            align: 'right',
            type: 'amountSnjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '中央下达',
            field: 'amountSnjxd',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '分配本级',
            field: 'amountSnjbjfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'amountSnjxjfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountSnjwfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSnjxd}-{amountSnjbjfp}-{amountSnjxjfp}'
          },
          {
            title: '本级已支出',
            field: 'amountSnjpay',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'sLoad',
            width: 100,
            align: 'right',
            formula: '({amountSnjxd}-0==0)?0:Math.round(({amountSnjbjfp}+{amountSnjxjfp})/{amountSnjxd}*100*10)/10',
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
            title: '整合金额',
            width: 100,
            field: 'amountSjzhje',
            align: 'right',
            type: 'amountSjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '中央下达',
            field: 'amountSjxd',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '分配本级',
            field: 'amountSbjfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'amountSxjfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountSjwfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSjxd}-{amountSbjfp}-{amountSxjfp}'
          },
          {
            title: '本级已支出',
            field: 'amountSjpay',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'aLoad',
            width: 100,
            align: 'right',
            formula: '({amountSjxd}-0==0)?0:Math.round(({amountSbjfp}+{amountSxjfp})/{amountSjxd}*100*10)/10',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '县级',
        width: 100,
        align: 'center',
        children: [
          {
            title: '整合金额',
            width: 100,
            field: 'amountXjzhje',
            align: 'right',
            type: 'amountXjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '中央下达',
            field: 'amountXjxd',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '已分配',
            field: 'amountXjfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountXjwfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            formula: '{amountXjxd}-{amountXjfp}'
          },
          {
            title: '已支出',
            field: 'amountXjpay',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'xLoad',
            width: 100,
            align: 'right',
            formula: '({amountXjxd}-0==0)?0:Math.round({amountXjfp}/{amountXjxd}*100*10)/10',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      }
    ],
    tableColumnsConfigCity: [
      // {
      //   title: '资金编码',
      //   type: 'code',
      //   fixed: false,
      //   align: 'left',
      //   width: 160,
      //   field: 'code',
      //   visible: false
      // },
      {
        title: '资金名称',
        type: 'name',
        treeNode: true,
        fixed: false,
        align: 'left',
        width: 250,
        field: 'name',
        cellRender: {
          name: '$vxeIcon',
          props: {
            $refs: this
          }
        }
      },
      {
        title: '中央下达',
        width: 200,
        field: 'amountZyxd',
        align: 'right',
        type: 'amountSnjxd',
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '中央下达（不含分配下级）',
        width: 200,
        field: 'amountZyxd2',
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
        cellRender: { name: '$vxeMoney' },
        visible: false
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
            formula: '({amountZyxd2}-0==0)?0:({amountPayAll}/{amountZyxd2}*100)',
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
            field: 'amountSnjzhje',
            align: 'right',
            type: 'amountSnjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '中央下达',
            field: 'amountSnjxd',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
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
            // formula: '{amountZyxd}-{amountSnjbjfp}-{amountSnjxjfp}'
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
            formula: '({amountZyxd}-0==0)?0:Math.round(({amountSnjbjfp}+{amountSnjxjfp})/{amountZyxd}*100*10)/10',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '区级',
        width: 100,
        align: 'center',
        children: [
          {
            title: '整合金额',
            width: 100,
            field: 'amountSjzhje',
            align: 'right',
            type: 'amountSjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '中央下达',
            field: 'amountSjxd',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '分配本级',
            field: 'amountSbjfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'amountSxjfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountSjwfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
            // formula: '{amountZyxd}-{amountSbjfp}-{amountSxjfp}'
          },
          {
            title: '本级已支出',
            field: 'amountSjpay',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'aLoad',
            width: 100,
            align: 'right',
            formula: '({amountZyxd}-0==0)?0:Math.round(({amountSbjfp}+{amountSxjfp})/{amountZyxd}*100*10)/10',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '镇级',
        width: 100,
        align: 'center',
        children: [
          {
            title: '整合金额',
            width: 100,
            field: 'amountXjzhje',
            align: 'right',
            type: 'amountXjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '中央下达',
            field: 'amountXjxd',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '已分配',
            field: 'amountXjfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountXjwfp',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
            // formula: '{amountZyxd}-{amountXjfp}'
          },
          {
            title: '已支出',
            field: 'amountXjpay',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'xLoad',
            width: 100,
            align: 'right',
            formula: '({amountZyxd}-0==0)?0:Math.round({amountXjfp}/{amountZyxd}*100*10)/10',
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
