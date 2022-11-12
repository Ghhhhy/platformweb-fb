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
          // { value: '2020', label: '2020年' },
          // { value: '2021', label: '2021年' },
          { value: '2022', label: '2022年' }
        ],
        props: {
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
    fiscalYear: '2022',
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
    // 非直辖（省、市、县）
    tableColumnsConfig: [
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
            formula: '({amountZyxd}-0==0)?0:({amountPayAll}/{amountZyxd}*100)',
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
            cellRender: { name: '$vxeMoney' },
            visible: false
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
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSnjxd}-{amountSnjbjfp}-{amountSnjxjfp}'
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
            formula: '({amountSnjxd}-0==0)?0:({amountSnjbjfp}+{amountSnjxjfp})/{amountSnjxd}*100',
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
            cellRender: { name: '$vxeMoney' },
            visible: false
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
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSjxd}-{amountSbjfp}-{amountSxjfp}'
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
            formula: '({amountSjxd}-0==0)?0:({amountSbjfp}+{amountSxjfp})/{amountSjxd}*100',
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
            cellRender: { name: '$vxeMoney' },
            visible: false
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
            cellRender: { name: '$vxeMoney' },
            formula: '{amountXjxd}-{amountXjfp}'
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
            formula: '({amountXjxd}-0==0)?0:({amountXjfp}/{amountXjxd}*100)',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      }
    ],
    // 直辖（市、区）
    tableColumnsConfigCity: [
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
            formula: '({amountZyxd}-0==0)?0:({amountPayAll}/{amountZyxd}*100)',
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
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSnjxd}-{amountSnjbjfp}-{amountSnjxjfp}'
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
            formula: '({amountSnjxd}-0==0)?0:({amountSnjbjfp}+{amountSnjxjfp})/{amountSnjxd}*100',
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
            title: '整合金额',
            width: 200,
            field: 'amountSjzhje',
            align: 'right',
            type: 'amountSjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: false
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
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSjxd}-{amountSbjfp}-{amountSxjfp}'
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
            formula: '({amountSjxd}-0==0)?0:({amountSbjfp}+{amountSxjfp})/{amountSjxd}*100',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      }
    ],
    tableData: []
    // tableData: [
    //   {
    //     agencyName: '陕西省',
    //     recDivCode: '610000000',
    //     sbbjfpAmount: 1234436538412.99,
    //     sbxjfpAmount: 72474699200,
    //     sbpayAppAmt: 89179990000.45,
    //     sbjfpAmount: 0,
    //     sxjfpAmount: 0,
    //     spayAppAmt: 0,
    //     xbjfpAmount: 0,
    //     xpayAppAmt: 0,
    //     jamount: 1306911237612.99,
    //     jAmount: 1306911237612.99,
    //     'children': [
    //       {
    //         agencyName: '陕西省本级',
    //         recDivCode: '610000000',
    //         sbbjfpAmount: 1234436538412.99,
    //         sbxjfpAmount: 72474699200,
    //         sbpayAppAmt: 17815970000.45,
    //         sbjfpAmount: 0,
    //         sxjfpAmount: 0,
    //         spayAppAmt: 0,
    //         xbjfpAmount: 0,
    //         xpayAppAmt: 0,
    //         jamount: 37023290000.25,
    //         jAmount: 37023290000.25
    //       },
    //       {
    //         agencyName: '陕西省辖区',
    //         recDivCode: '610000000',
    //         sbbjfpAmount: 1234436538412.99,
    //         sbxjfpAmount: 72474699200,
    //         sbpayAppAmt: 12042109128.45,
    //         sbjfpAmount: 0,
    //         sxjfpAmount: 0,
    //         spayAppAmt: 0,
    //         xbjfpAmount: 0,
    //         xpayAppAmt: 0,
    //         jamount: 1273332437612.99,
    //         jAmount: 1273332437612.99,
    //         'children': [
    //           {
    //             agencyName: '西安市',
    //             recDivCode: '610199000',
    //             sbbjfpAmount: 0,
    //             sbxjfpAmount: 0,
    //             sbpayAppAmt: 0,
    //             sbjfpAmount: 2986512740,
    //             sxjfpAmount: 7969211000,
    //             spayAppAmt: 2896653206.53,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0,
    //             jamount: 12470459540,
    //             jAmount: 12470459540,
    //             'children': [
    //               {
    //                 agencyName: '西安市本级',
    //                 recDivCode: '610100000',
    //                 sbbjfpAmount: 0,
    //                 sbxjfpAmount: 0,
    //                 sbpayAppAmt: 0,
    //                 sbjfpAmount: 2986512740,
    //                 sxjfpAmount: 7969211000,
    //                 spayAppAmt: 2896653206.53,
    //                 xbjfpAmount: 0,
    //                 xpayAppAmt: 0,
    //                 jamount: 12470459540,
    //                 jAmount: 12470459540
    //               },
    //               {
    //                 agencyName: '西安市辖区',
    //                 recDivCode: '610198000',
    //                 sbbjfpAmount: 0,
    //                 sbxjfpAmount: 0,
    //                 sbpayAppAmt: 0,
    //                 sbjfpAmount: 2986512740,
    //                 sxjfpAmount: 7969211000,
    //                 spayAppAmt: 2896653206.53,
    //                 xbjfpAmount: 0,
    //                 xpayAppAmt: 0,
    //                 jamount: 12470459540,
    //                 jAmount: 12470459540,
    //                 'children': [
    //                   {
    //                     agencyName: '新城区',
    //                     recDivCode: '610102999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 73080674,
    //                     xpayAppAmt: 48724209.67,
    //                     jamount: 239048900,
    //                     jAmount: 239048900,
    //                     'children': [
    //                       {
    //                         agencyName: '新城区本级',
    //                         recDivCode: '610102000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 73080674,
    //                         xpayAppAmt: 48724209.67,
    //                         jamount: 239048900,
    //                         jAmount: 239048900
    //                       },
    //                       {
    //                         agencyName: '新城区辖区',
    //                         recDivCode: '610102998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '碑林区',
    //                     recDivCode: '610103999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 39821400,
    //                     xpayAppAmt: 36196987.37,
    //                     jamount: 364174000,
    //                     jAmount: 364174000,
    //                     'children': [
    //                       {
    //                         agencyName: '碑林区本级',
    //                         recDivCode: '610103000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 39821400,
    //                         xpayAppAmt: 36196987.37,
    //                         jamount: 364174000,
    //                         jAmount: 364174000
    //                       },
    //                       {
    //                         agencyName: '碑林区辖区',
    //                         recDivCode: '610103998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '莲湖区',
    //                     recDivCode: '610104999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 76343300,
    //                     xpayAppAmt: 17641885.88,
    //                     jamount: 426363900,
    //                     jAmount: 426363900,
    //                     'children': [
    //                       {
    //                         agencyName: '莲湖区本级',
    //                         recDivCode: '610104000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 76343300,
    //                         xpayAppAmt: 17641885.88,
    //                         jamount: 426363900,
    //                         jAmount: 426363900
    //                       },
    //                       {
    //                         agencyName: '莲湖区辖区',
    //                         recDivCode: '610104998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '灞桥区',
    //                     recDivCode: '610111999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 85529400,
    //                     xpayAppAmt: 46440617.73,
    //                     jamount: 303082700,
    //                     jAmount: 303082700,
    //                     'children': [
    //                       {
    //                         agencyName: '灞桥区本级',
    //                         recDivCode: '610111000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 85529400,
    //                         xpayAppAmt: 46440617.73,
    //                         jamount: 303082700,
    //                         jAmount: 303082700
    //                       },
    //                       {
    //                         agencyName: '灞桥区辖区',
    //                         recDivCode: '610111998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '未央区',
    //                     recDivCode: '610112999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 18354100,
    //                     xpayAppAmt: 8725077.01,
    //                     jamount: 352414500,
    //                     jAmount: 352414500,
    //                     'children': [
    //                       {
    //                         agencyName: '未央区本级',
    //                         recDivCode: '610112000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 18354100,
    //                         xpayAppAmt: 8725077.01,
    //                         jamount: 352414500,
    //                         jAmount: 352414500
    //                       },
    //                       {
    //                         agencyName: '未央区辖区',
    //                         recDivCode: '610112998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '雁塔区',
    //                     recDivCode: '610113999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 140292000,
    //                     xpayAppAmt: 120090889.24,
    //                     jamount: 448236000,
    //                     jAmount: 448236000,
    //                     'children': [
    //                       {
    //                         agencyName: '雁塔区本级',
    //                         recDivCode: '610113000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 140292000,
    //                         xpayAppAmt: 120090889.24,
    //                         jamount: 448236000,
    //                         jAmount: 448236000
    //                       },
    //                       {
    //                         agencyName: '雁塔区辖区',
    //                         recDivCode: '610113998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '阎良区',
    //                     recDivCode: '610114999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 72285800,
    //                     xpayAppAmt: 35273381.76,
    //                     jamount: 158756000,
    //                     jAmount: 158756000,
    //                     'children': [
    //                       {
    //                         agencyName: '阎良区本级',
    //                         recDivCode: '610114000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 72285800,
    //                         xpayAppAmt: 35273381.76,
    //                         jamount: 158756000,
    //                         jAmount: 158756000
    //                       },
    //                       {
    //                         agencyName: '阎良区辖区',
    //                         recDivCode: '610114998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '临潼区',
    //                     recDivCode: '610115999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 135102841.75,
    //                     xpayAppAmt: 82570887.99,
    //                     jamount: 374135800,
    //                     jAmount: 374135800,
    //                     'children': [
    //                       {
    //                         agencyName: '临潼区本级',
    //                         recDivCode: '610115000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 135102841.75,
    //                         xpayAppAmt: 82570887.99,
    //                         jamount: 374135800,
    //                         jAmount: 374135800
    //                       },
    //                       {
    //                         agencyName: '临潼区辖区',
    //                         recDivCode: '610115998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 80,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '长安区',
    //                     recDivCode: '610116999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 234225550,
    //                     xpayAppAmt: 67149146.66,
    //                     jamount: 423057500,
    //                     jAmount: 423057500,
    //                     'children': [
    //                       {
    //                         agencyName: '长安区本级',
    //                         recDivCode: '610116000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 234225550,
    //                         xpayAppAmt: 67149146.66,
    //                         jamount: 423057500,
    //                         jAmount: 423057500
    //                       },
    //                       {
    //                         agencyName: '长安区辖区',
    //                         recDivCode: '610116998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '高陵区',
    //                     recDivCode: '610117999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 131791400,
    //                     xpayAppAmt: 82920050.57,
    //                     jamount: 205636400,
    //                     jAmount: 205636400,
    //                     'children': [
    //                       {
    //                         agencyName: '高陵区本级',
    //                         recDivCode: '610117000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 131791400,
    //                         xpayAppAmt: 82920050.57,
    //                         jamount: 205636400,
    //                         jAmount: 205636400
    //                       },
    //                       {
    //                         agencyName: '高陵区辖区',
    //                         recDivCode: '610117998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '鄠邑区',
    //                     recDivCode: '610118999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 192098900,
    //                     xpayAppAmt: 91444388.91,
    //                     jamount: 243867900,
    //                     jAmount: 243867900,
    //                     'children': [
    //                       {
    //                         agencyName: '鄠邑区本级',
    //                         recDivCode: '610118000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 192098900,
    //                         xpayAppAmt: 91444388.91,
    //                         jamount: 243867900,
    //                         jAmount: 243867900
    //                       },
    //                       {
    //                         agencyName: '鄠邑区辖区',
    //                         recDivCode: '610118998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '蓝田县',
    //                     recDivCode: '610122999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 328633990,
    //                     xpayAppAmt: 117292523.93,
    //                     jamount: 558919900,
    //                     jAmount: 558919900,
    //                     'children': [
    //                       {
    //                         agencyName: '蓝田县本级',
    //                         recDivCode: '610122000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 328633990,
    //                         xpayAppAmt: 117292523.93,
    //                         jamount: 558919900,
    //                         jAmount: 558919900
    //                       },
    //                       {
    //                         agencyName: '蓝田县辖区',
    //                         recDivCode: '610122000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '周至县',
    //                     recDivCode: '610124999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 395351524.26,
    //                     xpayAppAmt: 239607815.41,
    //                     jamount: 631443400,
    //                     jAmount: 631443400,
    //                     'children': [
    //                       {
    //                         agencyName: '周至县本级',
    //                         recDivCode: '610124000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 395351524.26,
    //                         xpayAppAmt: 239607815.41,
    //                         jamount: 631443400,
    //                         jAmount: 631443400
    //                       },
    //                       {
    //                         agencyName: '周至县全辖',
    //                         recDivCode: '610124998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '西安市高新区',
    //                     recDivCode: '610131999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 727220323,
    //                     xpayAppAmt: 62371123,
    //                     jamount: 786863500,
    //                     jAmount: 786863500,
    //                     'children': [
    //                       {
    //                         agencyName: '西安市高新区本级',
    //                         recDivCode: '610131000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 727220323,
    //                         xpayAppAmt: 62371123,
    //                         jamount: 786863500,
    //                         jAmount: 786863500
    //                       },
    //                       {
    //                         agencyName: '西安市高新区辖区',
    //                         recDivCode: '610131998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '西安市经济开发区',
    //                     recDivCode: '610132999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 39850000,
    //                     xpayAppAmt: 39430000,
    //                     jamount: 563463100,
    //                     jAmount: 563463100,
    //                     'children': [
    //                       {
    //                         agencyName: '西安市经济开发区本级',
    //                         recDivCode: '610132000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 39850000,
    //                         xpayAppAmt: 39430000,
    //                         jamount: 563463100,
    //                         jAmount: 563463100
    //                       },
    //                       {
    //                         agencyName: '西安市经济开发区辖区',
    //                         recDivCode: '610132998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '西安市曲江新区',
    //                     recDivCode: '610133999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 22260000,
    //                     xpayAppAmt: 13743900,
    //                     jamount: 200420000,
    //                     jAmount: 200420000,
    //                     'children': [
    //                       {
    //                         agencyName: '西安市曲江新区本级',
    //                         recDivCode: '610133000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 22260000,
    //                         xpayAppAmt: 13743900,
    //                         jamount: 200420000,
    //                         jAmount: 200420000
    //                       },
    //                       {
    //                         agencyName: '西安市曲江新区辖区',
    //                         recDivCode: '610133998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '西安市浐灞生态区',
    //                     recDivCode: '610136999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 0,
    //                     xpayAppAmt: 0,
    //                     jamount: 282559500,
    //                     jAmount: 282559500,
    //                     'children': [
    //                       {
    //                         agencyName: '西安市浐灞生态区本级',
    //                         recDivCode: '610136000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 282559500,
    //                         jAmount: 282559500
    //                       },
    //                       {
    //                         agencyName: '西安市浐灞生态区辖区',
    //                         recDivCode: '610136998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '西安市国际港务区',
    //                     recDivCode: '610139999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 2734000,
    //                     xpayAppAmt: 2942700,
    //                     jamount: 309342800,
    //                     jAmount: 309342800,
    //                     'children': [
    //                       {
    //                         agencyName: '西安市国际港务区本级',
    //                         recDivCode: '610139000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 2734000,
    //                         xpayAppAmt: 2942700,
    //                         jamount: 309342800,
    //                         jAmount: 309342800
    //                       },
    //                       {
    //                         agencyName: '西安市国际港务区辖区',
    //                         recDivCode: '610139998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '西安市航天基地',
    //                     recDivCode: '610140999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 88417957.37,
    //                     xpayAppAmt: 88669637.37,
    //                     jamount: 143987700,
    //                     jAmount: 143987700,
    //                     'children': [
    //                       {
    //                         agencyName: '西安市航天基地本级',
    //                         recDivCode: '610140000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 88417957.37,
    //                         xpayAppAmt: 88669637.37,
    //                         jamount: 143987700,
    //                         jAmount: 143987700
    //                       },
    //                       {
    //                         agencyName: '西安市航天基地辖区',
    //                         recDivCode: '610140998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '西安市航空基地',
    //                     recDivCode: '610141999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 4576000,
    //                     xpayAppAmt: 3090000,
    //                     jamount: 107656000,
    //                     jAmount: 107656000,
    //                     'children': [
    //                       {
    //                         agencyName: '西安市航空基地本级',
    //                         recDivCode: '610141000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 4576000,
    //                         xpayAppAmt: 3090000,
    //                         jamount: 107656000,
    //                         jAmount: 107656000
    //                       },
    //                       {
    //                         agencyName: '西安市航空基地辖区',
    //                         recDivCode: '610141998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '西咸新区',
    //                     recDivCode: '610150999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 1171090000,
    //                     xpayAppAmt: null,
    //                     jamount: 1484257700,
    //                     jAmount: 1484257700,
    //                     'children': [
    //                       {
    //                         agencyName: '西咸新区本级',
    //                         recDivCode: '610150000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 1171090000,
    //                         xpayAppAmt: null,
    //                         jamount: 1484257700,
    //                         jAmount: 1484257700
    //                       },
    //                       {
    //                         agencyName: '西咸新区辖区',
    //                         recDivCode: '610150998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0,
    //                         'children': [
    //                           {
    //                             agencyName: '沣西新城本级',
    //                             recDivCode: '610150101',
    //                             sbbjfpAmount: 0,
    //                             sbxjfpAmount: 0,
    //                             sbpayAppAmt: 0,
    //                             sbjfpAmount: 0,
    //                             sxjfpAmount: 0,
    //                             spayAppAmt: 0,
    //                             xbjfpAmount: 0,
    //                             xpayAppAmt: 0,
    //                             jamount: 0,
    //                             jAmount: 0
    //                           },
    //                           {
    //                             agencyName: '空港新城本级',
    //                             recDivCode: '610150102',
    //                             sbbjfpAmount: 0,
    //                             sbxjfpAmount: 0,
    //                             sbpayAppAmt: 0,
    //                             sbjfpAmount: 0,
    //                             sxjfpAmount: 0,
    //                             spayAppAmt: 0,
    //                             xbjfpAmount: 0,
    //                             xpayAppAmt: 0,
    //                             jamount: 0,
    //                             jAmount: 0
    //                           },
    //                           {
    //                             agencyName: '泾河新城本级',
    //                             recDivCode: '610150103',
    //                             sbbjfpAmount: 0,
    //                             sbxjfpAmount: 0,
    //                             sbpayAppAmt: 0,
    //                             sbjfpAmount: 0,
    //                             sxjfpAmount: 0,
    //                             spayAppAmt: 0,
    //                             xbjfpAmount: 0,
    //                             xpayAppAmt: 0,
    //                             jamount: 0,
    //                             jAmount: 0
    //                           },
    //                           {
    //                             agencyName: '沣东新城本级',
    //                             recDivCode: '610150104',
    //                             sbbjfpAmount: 0,
    //                             sbxjfpAmount: 0,
    //                             sbpayAppAmt: 0,
    //                             sbjfpAmount: 0,
    //                             sxjfpAmount: 0,
    //                             spayAppAmt: 0,
    //                             xbjfpAmount: 0,
    //                             xpayAppAmt: 0,
    //                             jamount: 0,
    //                             jAmount: 0
    //                           },
    //                           {
    //                             agencyName: '秦汉新城本级',
    //                             recDivCode: '610150105',
    //                             sbbjfpAmount: 0,
    //                             sbxjfpAmount: 0,
    //                             sbpayAppAmt: 0,
    //                             sbjfpAmount: 0,
    //                             sxjfpAmount: 0,
    //                             spayAppAmt: 0,
    //                             xbjfpAmount: 0,
    //                             xpayAppAmt: 0,
    //                             jamount: 0,
    //                             jAmount: 0
    //                           }
    //                         ]
    //                       }
    //                     ]
    //                   }
    //                 ]
    //               }
    //             ]
    //           },
    //           {
    //             agencyName: '铜川市',
    //             recDivCode: '610299000',
    //             sbbjfpAmount: 0,
    //             sbxjfpAmount: 0,
    //             sbpayAppAmt: 0,
    //             sbjfpAmount: 357413200,
    //             sxjfpAmount: 419986100,
    //             spayAppAmt: 307519695.84,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0,
    //             jamount: 1371585500,
    //             jAmount: 1371585500,
    //             'children': [
    //               {
    //                 agencyName: '铜川市本级',
    //                 recDivCode: '610200000',
    //                 sbbjfpAmount: 0,
    //                 sbxjfpAmount: 0,
    //                 sbpayAppAmt: 0,
    //                 sbjfpAmount: 357413200,
    //                 sxjfpAmount: 419986100,
    //                 spayAppAmt: 307519695.84,
    //                 xbjfpAmount: 0,
    //                 xpayAppAmt: 0,
    //                 jamount: 1371585500,
    //                 jAmount: 1371585500
    //               },
    //               {
    //                 agencyName: '铜川市辖区',
    //                 recDivCode: '610298000',
    //                 sbbjfpAmount: 0,
    //                 sbxjfpAmount: 0,
    //                 sbpayAppAmt: 0,
    //                 sbjfpAmount: 357413200,
    //                 sxjfpAmount: 419986100,
    //                 spayAppAmt: 307519695.84,
    //                 xbjfpAmount: 0,
    //                 xpayAppAmt: 0,
    //                 jamount: 1371585500,
    //                 jAmount: 1371585500,
    //                 'children': [
    //                   {
    //                     agencyName: '王益区',
    //                     recDivCode: '610202999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 55069749.03,
    //                     xpayAppAmt: 32195565.98,
    //                     jamount: 72888700,
    //                     jAmount: 72888700,
    //                     'children': [
    //                       {
    //                         agencyName: '王益区本级',
    //                         recDivCode: '610202000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 55069749.03,
    //                         xpayAppAmt: 32195565.98,
    //                         jamount: 72888700,
    //                         jAmount: 72888700
    //                       },
    //                       {
    //                         agencyName: '王益区辖区',
    //                         recDivCode: '610202998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '印台区',
    //                     recDivCode: '610203999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 44729400,
    //                     xpayAppAmt: 12511522.26,
    //                     jamount: 99922000,
    //                     jAmount: 99922000,
    //                     'children': [
    //                       {
    //                         agencyName: '印台区本级',
    //                         recDivCode: '610203000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 44729400,
    //                         xpayAppAmt: 12511522.26,
    //                         jamount: 99922000,
    //                         jAmount: 99922000
    //                       },
    //                       {
    //                         agencyName: '印台区辖区',
    //                         recDivCode: '610203998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '耀州区',
    //                     recDivCode: '610204999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 17083300,
    //                     xpayAppAmt: 10233000,
    //                     jamount: 152694300,
    //                     jAmount: 152694300,
    //                     'children': [
    //                       {
    //                         agencyName: '耀州区本级',
    //                         recDivCode: '610204000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 17083300,
    //                         xpayAppAmt: 10233000,
    //                         jamount: 152694300,
    //                         jAmount: 152694300
    //                       },
    //                       {
    //                         agencyName: '耀州区辖区',
    //                         recDivCode: '610204998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '宜君县',
    //                     recDivCode: '610222999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 33558950,
    //                     xpayAppAmt: 10699633.07,
    //                     jamount: 211984100,
    //                     jAmount: 211984100,
    //                     'children': [
    //                       {
    //                         agencyName: '宜君县本级',
    //                         recDivCode: '610222000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 33558950,
    //                         xpayAppAmt: 10699633.07,
    //                         jamount: 211984100,
    //                         jAmount: 211984100
    //                       },
    //                       {
    //                         agencyName: '宜君县辖区',
    //                         recDivCode: '610222998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 33558950,
    //                         xpayAppAmt: 10699633.07,
    //                         jamount: 211984100,
    //                         jAmount: 211984100
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '铜川市新区',
    //                     recDivCode: '610223999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 29804110,
    //                     xpayAppAmt: 10531993.47,
    //                     jamount: 54497000,
    //                     jAmount: 54497000,
    //                     'children': [
    //                       {
    //                         agencyName: '铜川市新区本级',
    //                         recDivCode: '610223000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 29804110,
    //                         xpayAppAmt: 10531993.47,
    //                         jamount: 54497000,
    //                         jAmount: 54497000
    //                       },
    //                       {
    //                         agencyName: '铜川市新区辖区',
    //                         recDivCode: '610223998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 29804110,
    //                         xpayAppAmt: 10531993.47,
    //                         jamount: 54497000,
    //                         jAmount: 54497000
    //                       }
    //                     ]
    //                   }
    //                 ]
    //               }
    //             ]
    //           },
    //           {
    //             agencyName: '宝鸡市',
    //             recDivCode: '610399000',
    //             sbbjfpAmount: 0,
    //             sbxjfpAmount: 0,
    //             sbpayAppAmt: 0,
    //             sbjfpAmount: 1893876100,
    //             sxjfpAmount: 1466117600,
    //             spayAppAmt: 1859768695.38,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0,
    //             jamount: 5977380300,
    //             jAmount: 5977380300,
    //             'children': [
    //               {
    //                 agencyName: '宝鸡市本级',
    //                 recDivCode: '610300000',
    //                 sbbjfpAmount: 0,
    //                 sbxjfpAmount: 0,
    //                 sbpayAppAmt: 0,
    //                 sbjfpAmount: 1893876100,
    //                 sxjfpAmount: 1466117600,
    //                 spayAppAmt: 1859768695.38,
    //                 xbjfpAmount: 0,
    //                 xpayAppAmt: 0,
    //                 jamount: 5977380300,
    //                 jAmount: 5977380300
    //               },
    //               {
    //                 agencyName: '宝鸡市辖区',
    //                 recDivCode: '610398000',
    //                 sbbjfpAmount: 0,
    //                 sbxjfpAmount: 0,
    //                 sbpayAppAmt: 0,
    //                 sbjfpAmount: 1893876100,
    //                 sxjfpAmount: 1466117600,
    //                 spayAppAmt: 1859768695.38,
    //                 xbjfpAmount: 0,
    //                 xpayAppAmt: 0,
    //                 jamount: 5977380300,
    //                 jAmount: 5977380300,
    //                 'children': [
    //                   {
    //                     agencyName: '渭滨区',
    //                     recDivCode: '610302999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 38547400,
    //                     xpayAppAmt: 1657250,
    //                     jamount: 124650200,
    //                     jAmount: 124650200,
    //                     'children': [
    //                       {
    //                         agencyName: '渭滨区本级',
    //                         recDivCode: '610302000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 38547400,
    //                         xpayAppAmt: 1657250,
    //                         jamount: 124650200,
    //                         jAmount: 124650200
    //                       },
    //                       {
    //                         agencyName: '渭滨区辖区',
    //                         recDivCode: '610302998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 38547400,
    //                         xpayAppAmt: 1657250,
    //                         jamount: 124650200,
    //                         jAmount: 124650200
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '金台区',
    //                     recDivCode: '610303999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 10000,
    //                     xpayAppAmt: null,
    //                     jamount: 122118500,
    //                     jAmount: 122118500,
    //                     'children': [
    //                       {
    //                         agencyName: '金台区本级',
    //                         recDivCode: '610303000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 10000,
    //                         xpayAppAmt: null,
    //                         jamount: 122118500,
    //                         jAmount: 122118500
    //                       },
    //                       {
    //                         agencyName: '金台区辖区',
    //                         recDivCode: '610303998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 10000,
    //                         xpayAppAmt: null,
    //                         jamount: 122118500,
    //                         jAmount: 122118500
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '陈仓区',
    //                     recDivCode: '610304999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 5282700,
    //                     xpayAppAmt: 4552950,
    //                     jamount: 174699300,
    //                     jAmount: 174699300,
    //                     'children': [
    //                       {
    //                         agencyName: '陈仓区本级',
    //                         recDivCode: '610304000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 5282700,
    //                         xpayAppAmt: 4552950,
    //                         jamount: 174699300,
    //                         jAmount: 174699300
    //                       },
    //                       {
    //                         agencyName: '陈仓区辖区',
    //                         recDivCode: '610304998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 5282700,
    //                         xpayAppAmt: 4552950,
    //                         jamount: 174699300,
    //                         jAmount: 174699300
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '凤翔县',
    //                     recDivCode: '610322999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 79171700,
    //                     xpayAppAmt: 28207500,
    //                     jamount: 152549000,
    //                     jAmount: 152549000,
    //                     'children': [
    //                       {
    //                         agencyName: '凤翔县本级',
    //                         recDivCode: '610322000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 79171700,
    //                         xpayAppAmt: 28207500,
    //                         jamount: 152549000,
    //                         jAmount: 152549000
    //                       },
    //                       {
    //                         agencyName: '凤翔县辖区',
    //                         recDivCode: '610322998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 79171700,
    //                         xpayAppAmt: 28207500,
    //                         jamount: 152549000,
    //                         jAmount: 152549000
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '岐山县',
    //                     recDivCode: '610323999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 72402600,
    //                     xpayAppAmt: 45093370,
    //                     jamount: 172800900,
    //                     jAmount: 172800900,
    //                     'children': [
    //                       {
    //                         agencyName: '岐山县本级',
    //                         recDivCode: '610323000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 72402600,
    //                         xpayAppAmt: 45093370,
    //                         jamount: 172800900,
    //                         jAmount: 172800900
    //                       },
    //                       {
    //                         agencyName: '岐山县辖区',
    //                         recDivCode: '610323998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 72402600,
    //                         xpayAppAmt: 45093370,
    //                         jamount: 172800900,
    //                         jAmount: 172800900
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '扶风县',
    //                     recDivCode: '610324999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 242046400,
    //                     xpayAppAmt: 153546692.5,
    //                     jamount: 417477200,
    //                     jAmount: 417477200,
    //                     'children': [
    //                       {
    //                         agencyName: '扶风县本级',
    //                         recDivCode: '610324000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 242046400,
    //                         xpayAppAmt: 153546692.5,
    //                         jamount: 417477200,
    //                         jAmount: 417477200
    //                       },
    //                       {
    //                         agencyName: '扶风县辖区',
    //                         recDivCode: '610324998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 242046400,
    //                         xpayAppAmt: 153546692.5,
    //                         jamount: 417477200,
    //                         jAmount: 417477200
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '眉县',
    //                     recDivCode: '610326999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 27659251,
    //                     xpayAppAmt: 27413408,
    //                     jamount: 162571200,
    //                     jAmount: 162571200,
    //                     'children': [
    //                       {
    //                         agencyName: '眉县本级',
    //                         recDivCode: '610326000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 27659251,
    //                         xpayAppAmt: 27413408,
    //                         jamount: 162571200,
    //                         jAmount: 162571200
    //                       },
    //                       {
    //                         agencyName: '眉县辖区',
    //                         recDivCode: '610326998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 27659251,
    //                         xpayAppAmt: 27413408,
    //                         jamount: 162571200,
    //                         jAmount: 162571200
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '陇县',
    //                     recDivCode: '610327999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 92796200,
    //                     xpayAppAmt: 36996794.2,
    //                     jamount: 283622400,
    //                     jAmount: 283622400,
    //                     'children': [
    //                       {
    //                         agencyName: '陇县本级',
    //                         recDivCode: '610327000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 92796200,
    //                         xpayAppAmt: 36996794.2,
    //                         jamount: 283622400,
    //                         jAmount: 283622400
    //                       },
    //                       {
    //                         agencyName: '陇县辖区',
    //                         recDivCode: '610327998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 92796200,
    //                         xpayAppAmt: 36996794.2,
    //                         jamount: 283622400,
    //                         jAmount: 283622400
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '千阳县',
    //                     recDivCode: '610328999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: null,
    //                     xpayAppAmt: null,
    //                     jamount: 75481700,
    //                     jAmount: 75481700,
    //                     'children': [
    //                       {
    //                         agencyName: '千阳县本级',
    //                         recDivCode: '610328000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: null,
    //                         xpayAppAmt: null,
    //                         jamount: 75481700,
    //                         jAmount: 75481700
    //                       },
    //                       {
    //                         agencyName: '千阳县辖区',
    //                         recDivCode: '610328998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: null,
    //                         xpayAppAmt: null,
    //                         jamount: 75481700,
    //                         jAmount: 75481700
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '麟游县',
    //                     recDivCode: '610329999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: null,
    //                     xpayAppAmt: null,
    //                     jamount: 49607000,
    //                     jAmount: 49607000,
    //                     'children': [
    //                       {
    //                         agencyName: '麟游县本级',
    //                         recDivCode: '610329000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: null,
    //                         xpayAppAmt: null,
    //                         jamount: 49607000,
    //                         jAmount: 49607000
    //                       },
    //                       {
    //                         agencyName: '麟游县辖区',
    //                         recDivCode: '610329998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: null,
    //                         xpayAppAmt: null,
    //                         jamount: 49607000,
    //                         jAmount: 49607000
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '凤县',
    //                     recDivCode: '610330999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: null,
    //                     xpayAppAmt: null,
    //                     jamount: 52089300,
    //                     jAmount: 52089300,
    //                     'children': [
    //                       {
    //                         agencyName: '凤县本级',
    //                         recDivCode: '610330000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: null,
    //                         xpayAppAmt: null,
    //                         jamount: 52089300,
    //                         jAmount: 52089300
    //                       },
    //                       {
    //                         agencyName: '凤县辖区',
    //                         recDivCode: '610330998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: null,
    //                         xpayAppAmt: null,
    //                         jamount: 52089300,
    //                         jAmount: 52089300
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '太白县',
    //                     recDivCode: '610331999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 22795400,
    //                     xpayAppAmt: 14983916.68,
    //                     jamount: 129456600,
    //                     jAmount: 129456600,
    //                     'children': [
    //                       {
    //                         agencyName: '太白县本级',
    //                         recDivCode: '610331000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 22795400,
    //                         xpayAppAmt: 14983916.68,
    //                         jamount: 129456600,
    //                         jAmount: 129456600
    //                       },
    //                       {
    //                         agencyName: '太白县辖区',
    //                         recDivCode: '610331998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 22795400,
    //                         xpayAppAmt: 14983916.68,
    //                         jamount: 129456600,
    //                         jAmount: 129456600
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '宝鸡市高新区',
    //                     recDivCode: '610332999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 27591500,
    //                     xpayAppAmt: 19858566.17,
    //                     jamount: 38217500,
    //                     jAmount: 38217500,
    //                     'children': [
    //                       {
    //                         agencyName: '宝鸡市高新区本级',
    //                         recDivCode: '610332000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 27591500,
    //                         xpayAppAmt: 19858566.17,
    //                         jamount: 38217500,
    //                         jAmount: 38217500
    //                       },
    //                       {
    //                         agencyName: '宝鸡市高新区辖区',
    //                         recDivCode: '610332998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 27591500,
    //                         xpayAppAmt: 19858566.17,
    //                         jamount: 38217500,
    //                         jAmount: 38217500
    //                       }
    //                     ]
    //                   }
    //                 ]
    //               }
    //             ]
    //           },
    //           {
    //             agencyName: '咸阳市',
    //             recDivCode: '610499000',
    //             sbbjfpAmount: 0,
    //             sbxjfpAmount: 0,
    //             sbpayAppAmt: 0,
    //             sbjfpAmount: 1592017600,
    //             sxjfpAmount: 2772443800,
    //             spayAppAmt: 1176888076.96,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0,
    //             jamount: 7791834400,
    //             jAmount: 7791834400,
    //             'children': [
    //               {
    //                 agencyName: '咸阳市本级',
    //                 recDivCode: '610400000',
    //                 sbbjfpAmount: 0,
    //                 sbxjfpAmount: 0,
    //                 sbpayAppAmt: 0,
    //                 sbjfpAmount: 1592017600,
    //                 sxjfpAmount: 2772443800,
    //                 spayAppAmt: 1176888076.96,
    //                 xbjfpAmount: 0,
    //                 xpayAppAmt: 0,
    //                 jamount: 7791834400,
    //                 jAmount: 7791834400
    //               },
    //               {
    //                 agencyName: '咸阳市辖区',
    //                 recDivCode: '610498000',
    //                 sbbjfpAmount: 0,
    //                 sbxjfpAmount: 0,
    //                 sbpayAppAmt: 0,
    //                 sbjfpAmount: 1592017600,
    //                 sxjfpAmount: 2772443800,
    //                 spayAppAmt: 1176888076.96,
    //                 xbjfpAmount: 0,
    //                 xpayAppAmt: 0,
    //                 jamount: 7791834400,
    //                 jAmount: 7791834400,
    //                 'children': [
    //                   {
    //                     agencyName: '秦都区',
    //                     recDivCode: '610402999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 7730907.12,
    //                     xpayAppAmt: 89064,
    //                     jamount: 183710900,
    //                     jAmount: 183710900,
    //                     'children': [
    //                       {
    //                         agencyName: '秦都区本级',
    //                         recDivCode: '610402000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 7730907.12,
    //                         xpayAppAmt: 89064,
    //                         jamount: 183710900,
    //                         jAmount: 183710900
    //                       },
    //                       {
    //                         agencyName: '秦都区辖区',
    //                         recDivCode: '610402998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 7730907.12,
    //                         xpayAppAmt: 89064,
    //                         jamount: 183710900,
    //                         jAmount: 183710900
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '渭城区',
    //                     recDivCode: '610404999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 45945990.6,
    //                     xpayAppAmt: 12602261.81,
    //                     jamount: 88279000,
    //                     jAmount: 88279000,
    //                     'children': [
    //                       {
    //                         agencyName: '渭城区本级',
    //                         recDivCode: '610404000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 45945990.6,
    //                         xpayAppAmt: 12602261.81,
    //                         jamount: 88279000,
    //                         jAmount: 88279000
    //                       },
    //                       {
    //                         agencyName: '渭城区辖区',
    //                         recDivCode: '610404998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 45945990.6,
    //                         xpayAppAmt: 12602261.81,
    //                         jamount: 88279000,
    //                         jAmount: 88279000
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '三原县',
    //                     recDivCode: '610422999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 152031100,
    //                     xpayAppAmt: 129480628.9,
    //                     jamount: 315870700,
    //                     jAmount: 315870700,
    //                     'children': [
    //                       {
    //                         agencyName: '三原县本级',
    //                         recDivCode: '610422000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 152031100,
    //                         xpayAppAmt: 129480628.9,
    //                         jamount: 315870700,
    //                         jAmount: 315870700
    //                       },
    //                       {
    //                         agencyName: '三原县辖区',
    //                         recDivCode: '610422998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 152031100,
    //                         xpayAppAmt: 129480628.9,
    //                         jamount: 315870700,
    //                         jAmount: 315870700
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '泾阳县',
    //                     recDivCode: '610423999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 171481047,
    //                     xpayAppAmt: 127993412.03,
    //                     jamount: 237233600,
    //                     jAmount: 237233600,
    //                     'children': [
    //                       {
    //                         agencyName: '泾阳县本级',
    //                         recDivCode: '610423000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 171481047,
    //                         xpayAppAmt: 127993412.03,
    //                         jamount: 237233600,
    //                         jAmount: 237233600
    //                       },
    //                       {
    //                         agencyName: '泾阳县辖区',
    //                         recDivCode: '610423998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 171481047,
    //                         xpayAppAmt: 127993412.03,
    //                         jamount: 237233600,
    //                         jAmount: 237233600
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '乾县',
    //                     recDivCode: '610424999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 49610000,
    //                     xpayAppAmt: 26015529.68,
    //                     jamount: 322307700,
    //                     jAmount: 322307700,
    //                     'children': [
    //                       {
    //                         agencyName: '乾县本级',
    //                         recDivCode: '610424000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 49610000,
    //                         xpayAppAmt: 26015529.68,
    //                         jamount: 322307700,
    //                         jAmount: 322307700
    //                       },
    //                       {
    //                         agencyName: '乾县辖区',
    //                         recDivCode: '610424998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 49610000,
    //                         xpayAppAmt: 26015529.68,
    //                         jamount: 322307700,
    //                         jAmount: 322307700
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '礼泉县',
    //                     recDivCode: '610425999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 189790000,
    //                     xpayAppAmt: 152916011.78,
    //                     jamount: 275663900,
    //                     jAmount: 275663900,
    //                     'children': [
    //                       {
    //                         agencyName: '礼泉县本级',
    //                         recDivCode: '610425000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 189790000,
    //                         xpayAppAmt: 152916011.78,
    //                         jamount: 275663900,
    //                         jAmount: 275663900
    //                       },
    //                       {
    //                         agencyName: '礼泉县辖区',
    //                         recDivCode: '610425998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 189790000,
    //                         xpayAppAmt: 152916011.78,
    //                         jamount: 275663900,
    //                         jAmount: 275663900
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '永寿县',
    //                     recDivCode: '610426999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 58241610,
    //                     xpayAppAmt: 39623517.07,
    //                     jamount: 264847100,
    //                     jAmount: 264847100,
    //                     'children': [
    //                       {
    //                         agencyName: '永寿县本级',
    //                         recDivCode: '610426000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 58241610,
    //                         xpayAppAmt: 39623517.07,
    //                         jamount: 264847100,
    //                         jAmount: 264847100
    //                       },
    //                       {
    //                         agencyName: '永寿县辖区',
    //                         recDivCode: '610426998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 58241610,
    //                         xpayAppAmt: 39623517.07,
    //                         jamount: 264847100,
    //                         jAmount: 264847100
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '长武县',
    //                     recDivCode: '610428999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 69038600,
    //                     xpayAppAmt: 50741504.94,
    //                     jamount: 160049700,
    //                     jAmount: 160049700,
    //                     'children': [
    //                       {
    //                         agencyName: '长武县本级',
    //                         recDivCode: '610428000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 69038600,
    //                         xpayAppAmt: 50741504.94,
    //                         jamount: 160049700,
    //                         jAmount: 160049700
    //                       },
    //                       {
    //                         agencyName: '长武县辖区',
    //                         recDivCode: '610428998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 69038600,
    //                         xpayAppAmt: 50741504.94,
    //                         jamount: 160049700,
    //                         jAmount: 160049700
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '旬邑县',
    //                     recDivCode: '610429999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 177208100,
    //                     xpayAppAmt: 131838500,
    //                     jamount: 232705200,
    //                     jAmount: 232705200,
    //                     'children': [
    //                       {
    //                         agencyName: '旬邑县本级',
    //                         recDivCode: '610429000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 177208100,
    //                         xpayAppAmt: 131838500,
    //                         jamount: 232705200,
    //                         jAmount: 232705200
    //                       },
    //                       {
    //                         agencyName: '旬邑县辖区',
    //                         recDivCode: '610429998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 177208100,
    //                         xpayAppAmt: 131838500,
    //                         jamount: 232705200,
    //                         jAmount: 232705200
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '淳化县',
    //                     recDivCode: '610430999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 137944280,
    //                     xpayAppAmt: 76937700.73,
    //                     jamount: 340077900,
    //                     jAmount: 340077900,
    //                     'children': [
    //                       {
    //                         agencyName: '淳化县本级',
    //                         recDivCode: '610430000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 137944280,
    //                         xpayAppAmt: 76937700.73,
    //                         jamount: 340077900,
    //                         jAmount: 340077900
    //                       },
    //                       {
    //                         agencyName: '淳化县辖区',
    //                         recDivCode: '610430998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 137944280,
    //                         xpayAppAmt: 76937700.73,
    //                         jamount: 340077900,
    //                         jAmount: 340077900
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '武功县',
    //                     recDivCode: '610431999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 143548000,
    //                     xpayAppAmt: 112549992.85,
    //                     jamount: 500681900,
    //                     jAmount: 500681900,
    //                     'children': [
    //                       {
    //                         agencyName: '武功县本级',
    //                         recDivCode: '610431000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 143548000,
    //                         xpayAppAmt: 112549992.85,
    //                         jamount: 500681900,
    //                         jAmount: 500681900
    //                       },
    //                       {
    //                         agencyName: '武功县辖区',
    //                         recDivCode: '610431998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 143548000,
    //                         xpayAppAmt: 112549992.85,
    //                         jamount: 500681900,
    //                         jAmount: 500681900
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '兴平市',
    //                     recDivCode: '610481999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: null,
    //                     xpayAppAmt: null,
    //                     jamount: 314570700,
    //                     jAmount: 314570700,
    //                     'children': [
    //                       {
    //                         agencyName: '兴平市本级',
    //                         recDivCode: '610481000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: null,
    //                         xpayAppAmt: null,
    //                         jamount: 314570700,
    //                         jAmount: 314570700
    //                       },
    //                       {
    //                         agencyName: '兴平市辖区',
    //                         recDivCode: '610481998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: null,
    //                         xpayAppAmt: null,
    //                         jamount: 314570700,
    //                         jAmount: 314570700
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '彬州市',
    //                     recDivCode: '610482999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: null,
    //                     xpayAppAmt: null,
    //                     jamount: 258880900,
    //                     jAmount: 258880900,
    //                     'children': [
    //                       {
    //                         agencyName: '彬州市本级',
    //                         recDivCode: '610482000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 258880900,
    //                         jAmount: 258880900
    //                       },
    //                       {
    //                         agencyName: '彬州市辖区',
    //                         recDivCode: '610482998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: null,
    //                         xpayAppAmt: null,
    //                         jamount: 258880900,
    //                         jAmount: 258880900
    //                       }
    //                     ]
    //                   }
    //                 ]
    //               }
    //             ]
    //           },
    //           {
    //             agencyName: '渭南市',
    //             recDivCode: '610599000',
    //             sbbjfpAmount: 0,
    //             sbxjfpAmount: 0,
    //             sbpayAppAmt: 0,
    //             sbjfpAmount: 1788409580,
    //             sxjfpAmount: 3498473300,
    //             spayAppAmt: 663985813.34,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0,
    //             jamount: 6963300560,
    //             jAmount: 6963300560,
    //             'children': [
    //               {
    //                 agencyName: '渭南市本级',
    //                 recDivCode: '610500000',
    //                 sbbjfpAmount: 0,
    //                 sbxjfpAmount: 0,
    //                 sbpayAppAmt: 0,
    //                 sbjfpAmount: 1788409580,
    //                 sxjfpAmount: 3498473300,
    //                 spayAppAmt: 663985813.34,
    //                 xbjfpAmount: 0,
    //                 xpayAppAmt: 0,
    //                 jamount: 6963300560,
    //                 jAmount: 6963300560
    //               },
    //               {
    //                 agencyName: '渭南市辖区',
    //                 recDivCode: '610598000',
    //                 sbbjfpAmount: 0,
    //                 sbxjfpAmount: 0,
    //                 sbpayAppAmt: 0,
    //                 sbjfpAmount: 1788409580,
    //                 sxjfpAmount: 3498473300,
    //                 spayAppAmt: 663985813.34,
    //                 xbjfpAmount: 0,
    //                 xpayAppAmt: 0,
    //                 jamount: 6963300560,
    //                 jAmount: 6963300560,
    //                 'children': [
    //                   {
    //                     agencyName: '临渭区',
    //                     recDivCode: '610502999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 210780000,
    //                     xpayAppAmt: 112900000,
    //                     jamount: 507340900,
    //                     jAmount: 507340900,
    //                     'children': [
    //                       {
    //                         agencyName: '临渭区本级',
    //                         recDivCode: '610502000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 210780000,
    //                         xpayAppAmt: 112900000,
    //                         jamount: 507340900,
    //                         jAmount: 507340900
    //                       },
    //                       {
    //                         agencyName: '临渭区辖区',
    //                         recDivCode: '610502998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 210780000,
    //                         xpayAppAmt: 112900000,
    //                         jamount: 507340900,
    //                         jAmount: 507340900
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '华州区',
    //                     recDivCode: '610503999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: null,
    //                     xpayAppAmt: null,
    //                     jamount: 240714600,
    //                     jAmount: 240714600,
    //                     'children': [
    //                       {
    //                         agencyName: '华州区本级',
    //                         recDivCode: '610503000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: null,
    //                         xpayAppAmt: null,
    //                         jamount: 240714600,
    //                         jAmount: 240714600
    //                       },
    //                       {
    //                         agencyName: '华州区辖区',
    //                         recDivCode: '610503998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: null,
    //                         xpayAppAmt: null,
    //                         jamount: 240714600,
    //                         jAmount: 240714600
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '潼关县',
    //                     recDivCode: '610522999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 36447400,
    //                     xpayAppAmt: 3193219.21,
    //                     jamount: 114220200,
    //                     jAmount: 114220200,
    //                     'children': [
    //                       {
    //                         agencyName: '潼关县本级',
    //                         recDivCode: '610522000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 36447400,
    //                         xpayAppAmt: 3193219.21,
    //                         jamount: 114220200,
    //                         jAmount: 114220200
    //                       },
    //                       {
    //                         agencyName: '潼关县辖区',
    //                         recDivCode: '610522998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 36447400,
    //                         xpayAppAmt: 3193219.21,
    //                         jamount: 114220200,
    //                         jAmount: 114220200
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '大荔县',
    //                     recDivCode: '610523999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 94003286.76,
    //                     xpayAppAmt: 81252073.86,
    //                     jamount: 987493700,
    //                     jAmount: 987493700,
    //                     'children': [
    //                       {
    //                         agencyName: '大荔县本级',
    //                         recDivCode: '610523000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 94003286.76,
    //                         xpayAppAmt: 81252073.86,
    //                         jamount: 987493700,
    //                         jAmount: 987493700
    //                       },
    //                       {
    //                         agencyName: '大荔县辖区',
    //                         recDivCode: '610523998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 94003286.76,
    //                         xpayAppAmt: 81252073.86,
    //                         jamount: 987493700,
    //                         jAmount: 987493700
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '合阳县',
    //                     recDivCode: '610524999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 141748738.2,
    //                     xpayAppAmt: 22656381.34,
    //                     jamount: 321679600,
    //                     jAmount: 321679600,
    //                     'children': [
    //                       {
    //                         agencyName: '合阳县本级',
    //                         recDivCode: '610524000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 141748738.2,
    //                         xpayAppAmt: 22656381.34,
    //                         jamount: 321679600,
    //                         jAmount: 321679600
    //                       },
    //                       {
    //                         agencyName: '合阳县辖区',
    //                         recDivCode: '610524998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 141748738.2,
    //                         xpayAppAmt: 22656381.34,
    //                         jamount: 321679600,
    //                         jAmount: 321679600
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '澄城县',
    //                     recDivCode: '610525999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 147089693.78,
    //                     xpayAppAmt: 31449702.09,
    //                     jamount: 333252800,
    //                     jAmount: 333252800,
    //                     'children': [
    //                       {
    //                         agencyName: '澄城县本级',
    //                         recDivCode: '610525000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 147089693.78,
    //                         xpayAppAmt: 31449702.09,
    //                         jamount: 333252800,
    //                         jAmount: 333252800
    //                       },
    //                       {
    //                         agencyName: '澄城县辖区',
    //                         recDivCode: '610525998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 147089693.78,
    //                         xpayAppAmt: 31449702.09,
    //                         jamount: 333252800,
    //                         jAmount: 333252800
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '蒲城县',
    //                     recDivCode: '610526999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 89262006,
    //                     xpayAppAmt: 49212391,
    //                     jamount: 641589700,
    //                     jAmount: 641589700,
    //                     'children': [
    //                       {
    //                         agencyName: '蒲城县本级',
    //                         recDivCode: '610526000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 89262006,
    //                         xpayAppAmt: 49212391,
    //                         jamount: 641589700,
    //                         jAmount: 641589700
    //                       },
    //                       {
    //                         agencyName: '蒲城县辖区',
    //                         recDivCode: '610526998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 89262006,
    //                         xpayAppAmt: 49212391,
    //                         jamount: 641589700,
    //                         jAmount: 641589700
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '白水县',
    //                     recDivCode: '610527999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 38898410,
    //                     xpayAppAmt: 27376967.03,
    //                     jamount: 261102800,
    //                     jAmount: 261102800,
    //                     'children': [
    //                       {
    //                         agencyName: '白水县本级',
    //                         recDivCode: '610527000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 38898410,
    //                         xpayAppAmt: 27376967.03,
    //                         jamount: 261102800,
    //                         jAmount: 261102800
    //                       },
    //                       {
    //                         agencyName: '白水县辖区',
    //                         recDivCode: '610527998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 38898410,
    //                         xpayAppAmt: 27376967.03,
    //                         jamount: 261102800,
    //                         jAmount: 261102800
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '富平县',
    //                     recDivCode: '610528999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 0,
    //                     xpayAppAmt: null,
    //                     jamount: 932835200,
    //                     jAmount: 932835200,
    //                     'children': [
    //                       {
    //                         agencyName: '富平县本级',
    //                         recDivCode: '610528000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: null,
    //                         jamount: 932835200,
    //                         jAmount: 932835200
    //                       },
    //                       {
    //                         agencyName: '富平县辖区',
    //                         recDivCode: '610528998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: null,
    //                         jamount: 932835200,
    //                         jAmount: 932835200
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '韩城市',
    //                     recDivCode: '610581999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 107489408.21,
    //                     xpayAppAmt: 93130051.65,
    //                     jamount: 656113200,
    //                     jAmount: 656113200,
    //                     'children': [
    //                       {
    //                         agencyName: '韩城市本级',
    //                         recDivCode: '610581000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 107489408.21,
    //                         xpayAppAmt: 93130051.65,
    //                         jamount: 656113200,
    //                         jAmount: 656113200
    //                       },
    //                       {
    //                         agencyName: '韩城市辖区',
    //                         recDivCode: '610581998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: 0,
    //                         jamount: 0,
    //                         jAmount: 0
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '华阴市',
    //                     recDivCode: '610582999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 30726805,
    //                     xpayAppAmt: 26308855.8,
    //                     jamount: 200967400,
    //                     jAmount: 200967400,
    //                     'children': [
    //                       {
    //                         agencyName: '华阴市本级',
    //                         recDivCode: '610582000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 30726805,
    //                         xpayAppAmt: 26308855.8,
    //                         jamount: 200967400,
    //                         jAmount: 200967400
    //                       },
    //                       {
    //                         agencyName: '华阴市辖区',
    //                         recDivCode: '610582998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 30726805,
    //                         xpayAppAmt: 26308855.8,
    //                         jamount: 200967400,
    //                         jAmount: 200967400
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '渭南市高新区',
    //                     recDivCode: '610583999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: null,
    //                     xpayAppAmt: null,
    //                     jamount: 36534200,
    //                     jAmount: 36534200,
    //                     'children': [
    //                       {
    //                         agencyName: '渭南市高新区本级',
    //                         recDivCode: '610583000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: null,
    //                         xpayAppAmt: null,
    //                         jamount: 36534200,
    //                         jAmount: 36534200
    //                       },
    //                       {
    //                         agencyName: '渭南市高新区辖区',
    //                         recDivCode: '610583998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: null,
    //                         xpayAppAmt: null,
    //                         jamount: 36534200,
    //                         jAmount: 36534200
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '渭南市经济技术开发区',
    //                     recDivCode: '610584999',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 2280000,
    //                     xpayAppAmt: 2280000,
    //                     jamount: 83275900,
    //                     jAmount: 83275900,
    //                     'children': [
    //                       {
    //                         agencyName: '渭南市经济技术开发区本级',
    //                         recDivCode: '610584000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 2280000,
    //                         xpayAppAmt: 2280000,
    //                         jamount: 83275900,
    //                         jAmount: 83275900
    //                       },
    //                       {
    //                         agencyName: '渭南市经济技术开发区辖区',
    //                         recDivCode: '610584998',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 2280000,
    //                         xpayAppAmt: 2280000,
    //                         jamount: 83275900,
    //                         jAmount: 83275900
    //                       }
    //                     ]
    //                   }
    //                 ]
    //               }
    //             ]
    //           },
    //           {
    //             agencyName: '延安市',
    //             recDivCode: '610699000',
    //             sbbjfpAmount: 0,
    //             sbxjfpAmount: 0,
    //             sbpayAppAmt: 0,
    //             sbjfpAmount: 1166961900,
    //             sxjfpAmount: 2567152900,
    //             spayAppAmt: 1144978376.22,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0,
    //             jamount: 4854101800,
    //             jAmount: 4854101800,
    //             'children': [
    //               {
    //                 agencyName: '延安市本级',
    //                 recDivCode: '610600000',
    //                 sbbjfpAmount: 0,
    //                 sbxjfpAmount: 0,
    //                 sbpayAppAmt: 0,
    //                 sbjfpAmount: 1166961900,
    //                 sxjfpAmount: 2567152900,
    //                 spayAppAmt: 1144978376.22,
    //                 xbjfpAmount: 0,
    //                 xpayAppAmt: 0,
    //                 jamount: 4854101800,
    //                 jAmount: 4854101800
    //               },
    //               {
    //                 agencyName: '延安市辖区',
    //                 recDivCode: '610698000',
    //                 sbbjfpAmount: 0,
    //                 sbxjfpAmount: 0,
    //                 sbpayAppAmt: 0,
    //                 sbjfpAmount: 1166961900,
    //                 sxjfpAmount: 2567152900,
    //                 spayAppAmt: 1144978376.22,
    //                 xbjfpAmount: 0,
    //                 xpayAppAmt: 0,
    //                 jamount: 4854101800,
    //                 jAmount: 4854101800,
    //                 'children': [
    //                   {
    //                     agencyName: '宝塔区',
    //                     recDivCode: '610602000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 178173000,
    //                     xpayAppAmt: 154170280.68,
    //                     jamount: 502790600,
    //                     jAmount: 502790600,
    //                     'children': [
    //                       {
    //                         agencyName: '宝塔区',
    //                         recDivCode: '610602000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 178173000,
    //                         xpayAppAmt: 154170280.68,
    //                         jamount: 502790600,
    //                         jAmount: 502790600
    //                       },
    //                       {
    //                         agencyName: '宝塔区',
    //                         recDivCode: '610602000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 178173000,
    //                         xpayAppAmt: 154170280.68,
    //                         jamount: 502790600,
    //                         jAmount: 502790600
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '安塞区',
    //                     recDivCode: '610603000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 0,
    //                     xpayAppAmt: null,
    //                     jamount: 313509300,
    //                     jAmount: 313509300,
    //                     'children': [
    //                       {
    //                         agencyName: '安塞区',
    //                         recDivCode: '610603000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: null,
    //                         jamount: 313509300,
    //                         jAmount: 313509300
    //                       },
    //                       {
    //                         agencyName: '安塞区',
    //                         recDivCode: '610603000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: null,
    //                         jamount: 313509300,
    //                         jAmount: 313509300
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '延长县',
    //                     recDivCode: '610621000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 0,
    //                     xpayAppAmt: null,
    //                     jamount: 238848800,
    //                     jAmount: 238848800,
    //                     'children': [
    //                       {
    //                         agencyName: '延长县',
    //                         recDivCode: '610621000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: null,
    //                         jamount: 238848800,
    //                         jAmount: 238848800
    //                       },
    //                       {
    //                         agencyName: '延长县',
    //                         recDivCode: '610621000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 0,
    //                         xpayAppAmt: null,
    //                         jamount: 238848800,
    //                         jAmount: 238848800
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '延川县',
    //                     recDivCode: '610622000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 48010300,
    //                     xpayAppAmt: 23254365.62,
    //                     jamount: 524591600,
    //                     jAmount: 524591600,
    //                     'children': [
    //                       {
    //                         agencyName: '延川县',
    //                         recDivCode: '610622000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 48010300,
    //                         xpayAppAmt: 23254365.62,
    //                         jamount: 524591600,
    //                         jAmount: 524591600
    //                       },
    //                       {
    //                         agencyName: '延川县',
    //                         recDivCode: '610622000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 48010300,
    //                         xpayAppAmt: 23254365.62,
    //                         jamount: 524591600,
    //                         jAmount: 524591600
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '志丹县',
    //                     recDivCode: '610625000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: null,
    //                     xpayAppAmt: null,
    //                     jamount: 230017800,
    //                     jAmount: 230017800,
    //                     'children': [
    //                       {
    //                         agencyName: '志丹县',
    //                         recDivCode: '610625000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: null,
    //                         xpayAppAmt: null,
    //                         jamount: 230017800,
    //                         jAmount: 230017800
    //                       },
    //                       {
    //                         agencyName: '志丹县',
    //                         recDivCode: '610625000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: null,
    //                         xpayAppAmt: null,
    //                         jamount: 230017800,
    //                         jAmount: 230017800
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '吴起县',
    //                     recDivCode: '610626000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: null,
    //                     xpayAppAmt: null,
    //                     jamount: 314675400,
    //                     jAmount: 314675400,
    //                     'children': [
    //                       {
    //                         agencyName: '吴起县',
    //                         recDivCode: '610626000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: null,
    //                         xpayAppAmt: null,
    //                         jamount: 314675400,
    //                         jAmount: 314675400
    //                       },
    //                       {
    //                         agencyName: '吴起县',
    //                         recDivCode: '610626000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: null,
    //                         xpayAppAmt: null,
    //                         jamount: 314675400,
    //                         jAmount: 314675400
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '甘泉县',
    //                     recDivCode: '610627000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 32977300,
    //                     xpayAppAmt: 8414205.39,
    //                     jamount: 190720200,
    //                     jAmount: 190720200,
    //                     'children': [
    //                       {
    //                         agencyName: '甘泉县',
    //                         recDivCode: '610627000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 32977300,
    //                         xpayAppAmt: 8414205.39,
    //                         jamount: 190720200,
    //                         jAmount: 190720200
    //                       },
    //                       {
    //                         agencyName: '甘泉县',
    //                         recDivCode: '610627000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 32977300,
    //                         xpayAppAmt: 8414205.39,
    //                         jamount: 190720200,
    //                         jAmount: 190720200
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '富县',
    //                     recDivCode: '610628000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: null,
    //                     xpayAppAmt: null,
    //                     jamount: 244337600,
    //                     jAmount: 244337600,
    //                     'children': [
    //                       {
    //                         agencyName: '富县',
    //                         recDivCode: '610628000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: null,
    //                         xpayAppAmt: null,
    //                         jamount: 244337600,
    //                         jAmount: 244337600
    //                       },
    //                       {
    //                         agencyName: '富县',
    //                         recDivCode: '610628000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: null,
    //                         xpayAppAmt: null,
    //                         jamount: 244337600,
    //                         jAmount: 244337600
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '洛川县',
    //                     recDivCode: '610629000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 38102560,
    //                     xpayAppAmt: 13955348.2,
    //                     jamount: 249685700,
    //                     jAmount: 249685700,
    //                     'children': [
    //                       {
    //                         agencyName: '洛川县',
    //                         recDivCode: '610629000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 38102560,
    //                         xpayAppAmt: 13955348.2,
    //                         jamount: 249685700,
    //                         jAmount: 249685700
    //                       },
    //                       {
    //                         agencyName: '洛川县',
    //                         recDivCode: '610629000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 38102560,
    //                         xpayAppAmt: 13955348.2,
    //                         jamount: 249685700,
    //                         jAmount: 249685700
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '宜川县',
    //                     recDivCode: '610630000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: null,
    //                     xpayAppAmt: null,
    //                     jamount: 178344400,
    //                     jAmount: 178344400,
    //                     'children': [
    //                       {
    //                         agencyName: '宜川县',
    //                         recDivCode: '610630000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: null,
    //                         xpayAppAmt: null,
    //                         jamount: 178344400,
    //                         jAmount: 178344400
    //                       },
    //                       {
    //                         agencyName: '宜川县',
    //                         recDivCode: '610630000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: null,
    //                         xpayAppAmt: null,
    //                         jamount: 178344400,
    //                         jAmount: 178344400
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '黄龙县',
    //                     recDivCode: '610631000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 46865968,
    //                     xpayAppAmt: 9532412.97,
    //                     jamount: 185855600,
    //                     jAmount: 185855600,
    //                     'children': [
    //                       {
    //                         agencyName: '黄龙县',
    //                         recDivCode: '610631000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 46865968,
    //                         xpayAppAmt: 9532412.97,
    //                         jamount: 185855600,
    //                         jAmount: 185855600
    //                       },
    //                       {
    //                         agencyName: '黄龙县',
    //                         recDivCode: '610631000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 46865968,
    //                         xpayAppAmt: 9532412.97,
    //                         jamount: 185855600,
    //                         jAmount: 185855600
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '黄陵县',
    //                     recDivCode: '610632000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 51131367,
    //                     xpayAppAmt: 37314865.95,
    //                     jamount: 183338200,
    //                     jAmount: 183338200,
    //                     'children': [
    //                       {
    //                         agencyName: '黄陵县',
    //                         recDivCode: '610632000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 51131367,
    //                         xpayAppAmt: 37314865.95,
    //                         jamount: 183338200,
    //                         jAmount: 183338200
    //                       },
    //                       {
    //                         agencyName: '黄陵县',
    //                         recDivCode: '610632000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 51131367,
    //                         xpayAppAmt: 37314865.95,
    //                         jamount: 183338200,
    //                         jAmount: 183338200
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '子长市',
    //                     recDivCode: '610681000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 142575515,
    //                     xpayAppAmt: 127642716.6,
    //                     jamount: 352776400,
    //                     jAmount: 352776400,
    //                     'children': [
    //                       {
    //                         agencyName: '子长市',
    //                         recDivCode: '610681000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 142575515,
    //                         xpayAppAmt: 127642716.6,
    //                         jamount: 352776400,
    //                         jAmount: 352776400
    //                       },
    //                       {
    //                         agencyName: '子长市',
    //                         recDivCode: '610681000',
    //                         sbbjfpAmount: 0,
    //                         sbxjfpAmount: 0,
    //                         sbpayAppAmt: 0,
    //                         sbjfpAmount: 0,
    //                         sxjfpAmount: 0,
    //                         spayAppAmt: 0,
    //                         xbjfpAmount: 142575515,
    //                         xpayAppAmt: 127642716.6,
    //                         jamount: 352776400,
    //                         jAmount: 352776400
    //                       }
    //                     ]
    //                   }
    //                 ]
    //               }
    //             ]
    //           },
    //           {
    //             agencyName: '汉中市',
    //             recDivCode: '610700000',
    //             sbbjfpAmount: 0,
    //             sbxjfpAmount: 0,
    //             sbpayAppAmt: 0,
    //             sbjfpAmount: 1481508004.51,
    //             sxjfpAmount: 2888246500,
    //             spayAppAmt: 801787898.74,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0,
    //             jamount: 6307321800,
    //             jAmount: 6307321800,
    //             'children': [
    //               {
    //                 agencyName: '汉中市本级',
    //                 recDivCode: '610700000',
    //                 sbbjfpAmount: 0,
    //                 sbxjfpAmount: 0,
    //                 sbpayAppAmt: 0,
    //                 sbjfpAmount: 1481508004.51,
    //                 sxjfpAmount: 2888246500,
    //                 spayAppAmt: 801787898.74,
    //                 xbjfpAmount: 0,
    //                 xpayAppAmt: 0,
    //                 jamount: 6307321800,
    //                 jAmount: 6307321800
    //               },
    //               {
    //                 agencyName: '汉中市辖区',
    //                 recDivCode: '610700000',
    //                 sbbjfpAmount: 0,
    //                 sbxjfpAmount: 0,
    //                 sbpayAppAmt: 0,
    //                 sbjfpAmount: 1481508004.51,
    //                 sxjfpAmount: 2888246500,
    //                 spayAppAmt: 801787898.74,
    //                 xbjfpAmount: 0,
    //                 xpayAppAmt: 0,
    //                 jamount: 6307321800,
    //                 jAmount: 6307321800,
    //                 'children': [
    //                   {
    //                     agencyName: '汉台区',
    //                     recDivCode: '610702000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 259400120,
    //                     xpayAppAmt: 200452091.28,
    //                     jamount: 354012800,
    //                     jAmount: 354012800,
    //                     'children': [
    //                       {
    //
    //                       },
    //                       {
    //
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '南郑区',
    //                     recDivCode: '610703000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 327436748,
    //                     xpayAppAmt: 223696720.83,
    //                     jamount: 456422300,
    //                     jAmount: 456422300,
    //                     'children': [
    //                       {
    //
    //                       },
    //                       {
    //
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '城固县',
    //                     recDivCode: '610722000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 298007460,
    //                     xpayAppAmt: 195027836.87,
    //                     jamount: 400637100,
    //                     jAmount: 400637100,
    //                     'children': [
    //                       {
    //
    //                       },
    //                       {
    //
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '洋县',
    //                     recDivCode: '610723000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 227154394,
    //                     xpayAppAmt: 83820634.93,
    //                     jamount: 337374200,
    //                     jAmount: 337374200,
    //                     'children': [
    //                       {
    //
    //                       },
    //                       {
    //
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '西乡县',
    //                     recDivCode: '610724000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 246233995,
    //                     xpayAppAmt: 169325463.66,
    //                     jamount: 328888000,
    //                     jAmount: 328888000,
    //                     'children': [
    //                       {
    //
    //                       },
    //                       {
    //
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '勉县',
    //                     recDivCode: '610725000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 271878800,
    //                     xpayAppAmt: 195849144.11,
    //                     jamount: 332418800,
    //                     jAmount: 332418800,
    //                     'children': [
    //                       {
    //
    //                       },
    //                       {
    //
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '宁强县',
    //                     recDivCode: '610726000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 260036400,
    //                     xpayAppAmt: 134252994.4,
    //                     jamount: 270486400,
    //                     jAmount: 270486400,
    //                     'children': [
    //                       {
    //
    //                       },
    //                       {
    //
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '略阳县',
    //                     recDivCode: '610727000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 99945597.97,
    //                     xpayAppAmt: 78589778.37,
    //                     jamount: 162917500,
    //                     jAmount: 162917500,
    //                     'children': [
    //                       {
    //
    //                       },
    //                       {
    //
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '镇巴县',
    //                     recDivCode: '610728000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 223134550,
    //                     xpayAppAmt: 124912450.37,
    //                     jamount: 449373600,
    //                     jAmount: 449373600,
    //                     'children': [
    //                       {
    //
    //                       },
    //                       {
    //
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '留坝县',
    //                     recDivCode: '610729000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 1558702,
    //                     xpayAppAmt: 338467.77,
    //                     jamount: 125635800,
    //                     jAmount: 125635800,
    //                     'children': [
    //                       {
    //
    //                       },
    //                       {
    //
    //                       }
    //                     ]
    //                   },
    //                   {
    //                     agencyName: '佛坪县',
    //                     recDivCode: '610730000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 25402800,
    //                     xpayAppAmt: 8017875.84,
    //                     jamount: 82188900,
    //                     jAmount: 82188900,
    //                     'children': [
    //                       {
    //
    //                       },
    //                       {
    //
    //                       }
    //                     ]
    //                   }
    //                 ]
    //               }
    //             ]
    //           },
    //           {
    //             agencyName: '榆林市',
    //             recDivCode: '610800000',
    //             sbbjfpAmount: 0,
    //             sbxjfpAmount: 0,
    //             sbpayAppAmt: 0,
    //             sbjfpAmount: 1416130100,
    //             sxjfpAmount: 3040894200,
    //             spayAppAmt: 1386923474.73,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0,
    //             jamount: 6906959300,
    //             jAmount: 6906959300,
    //             'children': [
    //               {
    //                 agencyName: '榆林市本级',
    //                 recDivCode: '610800000',
    //                 sbbjfpAmount: 0,
    //                 sbxjfpAmount: 0,
    //                 sbpayAppAmt: 0,
    //                 sbjfpAmount: 1416130100,
    //                 sxjfpAmount: 3040894200,
    //                 spayAppAmt: 1386923474.73,
    //                 xbjfpAmount: 0,
    //                 xpayAppAmt: 0,
    //                 jamount: 6906959300,
    //                 jAmount: 6906959300
    //               },
    //               {
    //                 agencyName: '榆林市辖区',
    //                 recDivCode: '610800000',
    //                 sbbjfpAmount: 0,
    //                 sbxjfpAmount: 0,
    //                 sbpayAppAmt: 0,
    //                 sbjfpAmount: 1416130100,
    //                 sxjfpAmount: 3040894200,
    //                 spayAppAmt: 1386923474.73,
    //                 xbjfpAmount: 0,
    //                 xpayAppAmt: 0,
    //                 jamount: 6906959300,
    //                 jAmount: 6906959300,
    //                 'children': [
    //                   {
    //                     agencyName: '榆阳区',
    //                     recDivCode: '610802000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 4000000,
    //                     xpayAppAmt: 4000000,
    //                     jamount: 494769500,
    //                     jAmount: 494769500
    //                   },
    //                   {
    //                     agencyName: '横山区',
    //                     recDivCode: '610803000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 125890000,
    //                     xpayAppAmt: 92966287.29,
    //                     jamount: 226284100,
    //                     jAmount: 226284100
    //                   },
    //                   {
    //                     agencyName: '府谷县',
    //                     recDivCode: '610822000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 0,
    //                     xpayAppAmt: null,
    //                     jamount: 214855000,
    //                     jAmount: 214855000
    //                   },
    //                   {
    //                     agencyName: '靖边县',
    //                     recDivCode: '610824000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 98290000,
    //                     xpayAppAmt: 78758845.5,
    //                     jamount: 298977960,
    //                     jAmount: 298977960
    //                   },
    //                   {
    //                     agencyName: '定边县',
    //                     recDivCode: '610825000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 43793750,
    //                     xpayAppAmt: 9806881.89,
    //                     jamount: 821150560,
    //                     jAmount: 821150560
    //                   },
    //                   {
    //                     agencyName: '绥德县',
    //                     recDivCode: '610826000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: null,
    //                     xpayAppAmt: null,
    //                     jamount: 252763300,
    //                     jAmount: 252763300
    //                   },
    //                   {
    //                     agencyName: '米脂县',
    //                     recDivCode: '610827000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 15700000,
    //                     xpayAppAmt: 1917019.47,
    //                     jamount: 162277700,
    //                     jAmount: 162277700
    //                   },
    //                   {
    //                     agencyName: '佳县',
    //                     recDivCode: '610828000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 0,
    //                     xpayAppAmt: null,
    //                     jamount: 412213660,
    //                     jAmount: 412213660
    //                   },
    //                   {
    //                     agencyName: '吴堡县',
    //                     recDivCode: '610829000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 32220000,
    //                     xpayAppAmt: 30471028.87,
    //                     jamount: 70472100,
    //                     jAmount: 70472100
    //                   },
    //                   {
    //                     agencyName: '清涧县',
    //                     recDivCode: '610830000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 124761152.94,
    //                     xpayAppAmt: 99139818.94,
    //                     jamount: 270820660,
    //                     jAmount: 270820660
    //                   },
    //                   {
    //                     agencyName: '子洲县',
    //                     recDivCode: '610831000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: null,
    //                     xpayAppAmt: null,
    //                     jamount: 192634060,
    //                     jAmount: 192634060
    //                   },
    //                   {
    //                     agencyName: '榆横工业区',
    //                     recDivCode: '610832000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: null,
    //                     xpayAppAmt: null,
    //                     jamount: 39310000,
    //                     jAmount: 39310000
    //                   },
    //                   {
    //                     agencyName: '榆神工业区',
    //                     recDivCode: '610833000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: null,
    //                     xpayAppAmt: null,
    //                     jamount: 413990000,
    //                     jAmount: 413990000
    //                   },
    //                   {
    //                     agencyName: '神木市',
    //                     recDivCode: '610881000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 0,
    //                     xpayAppAmt: null,
    //                     jamount: 520875300,
    //                     jAmount: 520875300
    //                   }
    //                 ]
    //               }
    //             ]
    //           },
    //           {
    //             agencyName: '安康市',
    //             recDivCode: '610900000',
    //             sbbjfpAmount: 0,
    //             sbxjfpAmount: 0,
    //             sbpayAppAmt: 0,
    //             sbjfpAmount: 96876368.73,
    //             sxjfpAmount: 4363132800,
    //             spayAppAmt: 64096794.24,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0,
    //             jamount: 5496237900,
    //             jAmount: 5496237900,
    //             'children': [
    //               {
    //                 agencyName: '安康市本级',
    //                 recDivCode: '610900000',
    //                 sbbjfpAmount: 0,
    //                 sbxjfpAmount: 0,
    //                 sbpayAppAmt: 0,
    //                 sbjfpAmount: 96876368.73,
    //                 sxjfpAmount: 4363132800,
    //                 spayAppAmt: 64096794.24,
    //                 xbjfpAmount: 0,
    //                 xpayAppAmt: 0,
    //                 jamount: 5496237900,
    //                 jAmount: 5496237900
    //               },
    //               {
    //                 agencyName: '安康市辖区',
    //                 recDivCode: '610900000',
    //                 sbbjfpAmount: 0,
    //                 sbxjfpAmount: 0,
    //                 sbpayAppAmt: 0,
    //                 sbjfpAmount: 96876368.73,
    //                 sxjfpAmount: 4363132800,
    //                 spayAppAmt: 64096794.24,
    //                 xbjfpAmount: 0,
    //                 xpayAppAmt: 0,
    //                 jamount: 5496237900,
    //                 jAmount: 5496237900,
    //                 'children': [
    //                   {
    //                     agencyName: '汉滨区财政局',
    //                     recDivCode: '610902000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 131653100,
    //                     xpayAppAmt: 11478094.69,
    //                     jamount: 1127535580,
    //                     jAmount: 1127535580
    //                   },
    //                   {
    //                     agencyName: '汉阴县财政局',
    //                     recDivCode: '610921000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 91032111.84,
    //                     xpayAppAmt: 46934883.11,
    //                     jamount: 519075967,
    //                     jAmount: 519075967
    //                   },
    //                   {
    //                     agencyName: '石泉县财政局',
    //                     recDivCode: '610922000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 18082400,
    //                     xpayAppAmt: 116500,
    //                     jamount: 330227911,
    //                     jAmount: 330227911
    //                   },
    //                   {
    //                     agencyName: '宁陕县',
    //                     recDivCode: '610923000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 65513320,
    //                     xpayAppAmt: 61524371,
    //                     jamount: 203432379,
    //                     jAmount: 203432379
    //                   },
    //                   {
    //                     agencyName: '紫阳县',
    //                     recDivCode: '610924000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 304880679,
    //                     xpayAppAmt: 221136537.12,
    //                     jamount: 636075299,
    //                     jAmount: 636075299
    //                   },
    //                   {
    //                     agencyName: '岚皋县',
    //                     recDivCode: '610925000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 4247900,
    //                     xpayAppAmt: 3023657.64,
    //                     jamount: 45147900,
    //                     jAmount: 45147900
    //                   },
    //                   {
    //                     agencyName: '岚皋县财政局',
    //                     recDivCode: '610925000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 15260507,
    //                     xpayAppAmt: 10190580.81,
    //                     jamount: 192640837,
    //                     jAmount: 192640837
    //                   },
    //                   {
    //                     agencyName: '平利县财政局',
    //                     recDivCode: '610926000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 81584129,
    //                     xpayAppAmt: 24816529.09,
    //                     jamount: 401232273,
    //                     jAmount: 401232273
    //                   },
    //                   {
    //                     agencyName: '镇坪县财政局',
    //                     recDivCode: '610927000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 18155780,
    //                     xpayAppAmt: 3846700,
    //                     jamount: 140230606,
    //                     jAmount: 140230606
    //                   },
    //                   {
    //                     agencyName: '旬阳市财政局',
    //                     recDivCode: '610928000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 321439241.19,
    //                     xpayAppAmt: 285642526.97,
    //                     jamount: 729855010,
    //                     jAmount: 729855010
    //                   },
    //                   {
    //                     agencyName: '白河县财政局',
    //                     recDivCode: '610929000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 159945100,
    //                     xpayAppAmt: 136183389.95,
    //                     jamount: 378315778,
    //                     jAmount: 378315778
    //                   },
    //                   {
    //                     agencyName: '高新区财政局',
    //                     recDivCode: '610930000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: null,
    //                     xpayAppAmt: null,
    //                     jamount: 59221710,
    //                     jAmount: 59221710
    //                   },
    //                   {
    //                     agencyName: '恒口示范区财政局',
    //                     recDivCode: '610932000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 35557370,
    //                     xpayAppAmt: 7267336.98,
    //                     jamount: 65006150,
    //                     jAmount: 65006150
    //                   }
    //                 ]
    //               }
    //             ]
    //           },
    //           {
    //             agencyName: '商洛市',
    //             recDivCode: '611000000',
    //             sbbjfpAmount: 0,
    //             sbxjfpAmount: 0,
    //             sbpayAppAmt: 0,
    //             sbjfpAmount: 373879800,
    //             sxjfpAmount: 1661379500,
    //             spayAppAmt: 362957985.79,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0,
    //             jamount: 4008224700,
    //             jAmount: 4008224700,
    //             'children': [
    //               {
    //                 agencyName: '商洛市本级',
    //                 recDivCode: '611000000',
    //                 sbbjfpAmount: 0,
    //                 sbxjfpAmount: 0,
    //                 sbpayAppAmt: 0,
    //                 sbjfpAmount: 373879800,
    //                 sxjfpAmount: 1661379500,
    //                 spayAppAmt: 362957985.79,
    //                 xbjfpAmount: 0,
    //                 xpayAppAmt: 0,
    //                 jamount: 4008224700,
    //                 jAmount: 4008224700
    //               },
    //               {
    //                 agencyName: '商洛市辖区',
    //                 recDivCode: '611000000',
    //                 sbbjfpAmount: 0,
    //                 sbxjfpAmount: 0,
    //                 sbpayAppAmt: 0,
    //                 sbjfpAmount: 373879800,
    //                 sxjfpAmount: 1661379500,
    //                 spayAppAmt: 362957985.79,
    //                 xbjfpAmount: 0,
    //                 xpayAppAmt: 0,
    //                 jamount: 4008224700,
    //                 jAmount: 4008224700,
    //                 'children': [
    //                   {
    //                     agencyName: '商州区',
    //                     recDivCode: '611002000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 345709700,
    //                     xpayAppAmt: 220661254,
    //                     jamount: 371201700,
    //                     jAmount: 371201700
    //                   },
    //                   {
    //                     agencyName: '洛南县',
    //                     recDivCode: '611021000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 291030150,
    //                     xpayAppAmt: 191120979.58,
    //                     jamount: 331178800,
    //                     jAmount: 331178800
    //                   },
    //                   {
    //                     agencyName: '丹凤县',
    //                     recDivCode: '611022000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 211294816,
    //                     xpayAppAmt: 150857665.11,
    //                     jamount: 506260900,
    //                     jAmount: 506260900
    //                   },
    //                   {
    //                     agencyName: '商南县',
    //                     recDivCode: '611023000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 139392751,
    //                     xpayAppAmt: 70839198.01,
    //                     jamount: 199999900,
    //                     jAmount: 199999900
    //                   },
    //                   {
    //                     agencyName: '山阳县',
    //                     recDivCode: '611024000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 291692360,
    //                     xpayAppAmt: 137300887.87,
    //                     jamount: 675945000,
    //                     jAmount: 675945000
    //                   },
    //                   {
    //                     agencyName: '镇安县',
    //                     recDivCode: '611025000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 252863000,
    //                     xpayAppAmt: 117351271.61,
    //                     jamount: 508098000,
    //                     jAmount: 508098000
    //                   },
    //                   {
    //                     agencyName: '柞水县',
    //                     recDivCode: '611026000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 149656500,
    //                     xpayAppAmt: 118975195.76,
    //                     jamount: 150482000,
    //                     jAmount: 150482000
    //                   }
    //                 ]
    //               }
    //             ]
    //           },
    //           {
    //             agencyName: '杨凌示范区',
    //             recDivCode: '611299000',
    //             sbbjfpAmount: 0,
    //             sbxjfpAmount: 0,
    //             sbpayAppAmt: 0,
    //             sbjfpAmount: 84634200,
    //             sxjfpAmount: 59044600,
    //             spayAppAmt: 83612200,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0,
    //             jamount: 263188800,
    //             jAmount: 263188800,
    //             'children': [
    //               {
    //                 agencyName: '杨凌示范区本级',
    //                 recDivCode: '611200000',
    //                 sbbjfpAmount: 0,
    //                 sbxjfpAmount: 0,
    //                 sbpayAppAmt: 0,
    //                 sbjfpAmount: 84634200,
    //                 sxjfpAmount: 59044600,
    //                 spayAppAmt: 83612200,
    //                 xbjfpAmount: 0,
    //                 xpayAppAmt: 0,
    //                 jamount: 263188800,
    //                 jAmount: 263188800
    //               },
    //               {
    //                 agencyName: '杨凌示范区辖区',
    //                 recDivCode: '611298000',
    //                 sbbjfpAmount: 0,
    //                 sbxjfpAmount: 0,
    //                 sbpayAppAmt: 0,
    //                 sbjfpAmount: 84634200,
    //                 sxjfpAmount: 59044600,
    //                 spayAppAmt: 83612200,
    //                 xbjfpAmount: 0,
    //                 xpayAppAmt: 0,
    //                 jamount: 263188800,
    //                 jAmount: 263188800,
    //                 'children': [
    //                   {
    //                     agencyName: '杨陵区财政局',
    //                     recDivCode: '611202000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 26624600,
    //                     xpayAppAmt: 16748399.47,
    //                     jamount: 33864600,
    //                     jAmount: 33864600
    //                   },
    //                   {
    //                     agencyName: '杨陵区',
    //                     recDivCode: '611202000',
    //                     sbbjfpAmount: 0,
    //                     sbxjfpAmount: 0,
    //                     sbpayAppAmt: 0,
    //                     sbjfpAmount: 0,
    //                     sxjfpAmount: 0,
    //                     spayAppAmt: 0,
    //                     xbjfpAmount: 44507000,
    //                     xpayAppAmt: 35254130.95,
    //                     jamount: 205817000,
    //                     jAmount: 205817000
    //                   }
    //                 ]
    //               }
    //             ]
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // ]
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
