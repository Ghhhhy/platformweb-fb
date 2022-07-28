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
        type: 'speTypeName',
        treeNode: true,
        fixed: false,
        align: 'left',
        width: 160,
        field: 'speTypeName',
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
        field: 'sbjAmount',
        align: 'right',
        type: 'sbjAmount',
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
            formula: '{sbpayAppAmt}+{spayAppAmt}+{xpayAppAmt}'
          },
          {
            title: '进度',
            align: 'right',
            width: 200,
            field: 'jLoad',
            formula: '{jOut}/{sbjAmount}*100',
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
            title: '分配本级',
            field: 'sbbjfpAmount',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'sbxjfpAmount',
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
            formula: '{sbjAmount}-{sbbjfpAmount}-{sbxjfpAmount}'
          },
          {
            title: '本级已支出',
            field: 'sbpayAppAmt',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'sLoad',
            width: 200,
            align: 'right',
            formula: '({sbbjfpAmount}+{sbxjfpAmount})/{sbjAmount}*100',
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
            title: '分配本级',
            field: 'sbjfpAmount',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'sxjfpAmount',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'aUnassigned',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            formula: '{sbjAmount}-{sbbjfpAmount}-{sbjfpAmount}-{sxjfpAmount}'
          },
          {
            title: '本级已支出',
            field: 'spayAppAmt',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'aLoad',
            width: 200,
            align: 'right',
            formula: '({sbjfpAmount}+{sxjfpAmount})/{sbjAmount}',
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
            title: '已分配',
            field: 'xbjfpAmount',
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
            formula: '{sbjAmount}-{sbbjfpAmount}-{sbjfpAmount}-{xbjfpAmount}'
          },
          {
            title: '已支出',
            field: 'xpayAppAmt',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'xLoad',
            width: 200,
            align: 'right',
            formula: '{xbjfpAmount}/{sbjAmount}',
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
    //     speTypeCode: '1001',
    //     speTypeName: '直达资金',
    //     sbjAmount: 61669701613,
    //     sbbjfpAmount: 6278751613,
    //     sbxjfpAmount: 5390950000,
    //     sbpayAppAmt: 138576576.31,
    //     sbjfpAmount: 0,
    //     sxjfpAmount: 0,
    //     spayAppAmt: 0,
    //     xbjfpAmount: 106680674.01,
    //     xpayAppAmt: 5026387.94,
    //     children: [
    //       {
    //         speTypeCode: '10001',
    //         speTypeName: '共同财政事权转移支付',
    //         sbjAmount: 20569701613,
    //         sbbjfpAmount: 6278751613,
    //         sbxjfpAmount: 5390950000,
    //         sbpayAppAmt: 138576576.31,
    //         sbjfpAmount: 0,
    //         sxjfpAmount: 0,
    //         spayAppAmt: 0,
    //         xbjfpAmount: 106680674.01,
    //         xpayAppAmt: 5026387.94,
    //         children: [
    //           {
    //             speTypeCode: '10001',
    //             speTypeName: '城乡义务教育补助经费',
    //             sbjAmount: 11669701613,
    //             sbbjfpAmount: 6278751613,
    //             sbxjfpAmount: 5390950000,
    //             sbpayAppAmt: 138576576.31,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 106680674.01,
    //             xpayAppAmt: 5026387.94
    //           },
    //           {
    //             speTypeCode: '1007',
    //             speTypeName: '支出地方高校改革发展资金',
    //             sbjAmount: 16122680000,
    //             sbbjfpAmount: 16122680000,
    //             sbxjfpAmount: 0,
    //             sbpayAppAmt: 264559042.41,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0
    //           },
    //           {
    //             speTypeCode: '101101',
    //             speTypeName: '机关事业单位基本养老保险（人社厅）',
    //             sbjAmount: 3258540000,
    //             sbbjfpAmount: 726410000,
    //             sbxjfpAmount: 2532130000,
    //             sbpayAppAmt: 726410000,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 32380000,
    //             xpayAppAmt: 0
    //           },
    //           {
    //             speTypeCode: '101102',
    //             speTypeName: '企业职工基本养老保险（人社厅）',
    //             sbjAmount: 1365220000,
    //             sbbjfpAmount: 1365220000,
    //             sbxjfpAmount: 0,
    //             sbpayAppAmt: 9283240000,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0
    //           },
    //           {
    //             speTypeCode: '101103',
    //             speTypeName: '城乡居民基本养老保险（人社厅）',
    //             sbjAmount: 5709410000,
    //             sbbjfpAmount: 0,
    //             sbxjfpAmount: 5709410000,
    //             sbpayAppAmt: 0,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0
    //           },
    //           {
    //             speTypeCode: '1012',
    //             speTypeName: '困难群众救助补助资金',
    //             sbjAmount: 4896150000,
    //             sbbjfpAmount: 0,
    //             sbxjfpAmount: 4896150000,
    //             sbpayAppAmt: 0,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 7413218,
    //             xpayAppAmt: 300320
    //           },
    //           {
    //             speTypeCode: '1017',
    //             speTypeName: '城乡居民基本医疗保险补助',
    //             sbjAmount: 12933620000,
    //             sbbjfpAmount: 0,
    //             sbxjfpAmount: 12933620000,
    //             sbpayAppAmt: 0,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0
    //           },
    //           {
    //             speTypeCode: '1018',
    //             speTypeName: '基本公共卫生服务补助资金',
    //             sbjAmount: 2268876000,
    //             sbbjfpAmount: 55148000,
    //             sbxjfpAmount: 2213728000,
    //             sbpayAppAmt: 420665.38,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0
    //           }
    //         ]
    //       },
    //       {
    //         speTypeCode: '10002',
    //         speTypeName: '一般性转移支付',
    //         sbjAmount: 30269701613,
    //         sbbjfpAmount: 6278751613,
    //         sbxjfpAmount: 4690950000,
    //         sbpayAppAmt: 138576576.31,
    //         sbjfpAmount: 0,
    //         sxjfpAmount: 0,
    //         spayAppAmt: 0,
    //         xbjfpAmount: 106680674.01,
    //         xpayAppAmt: 5026387.94,
    //         children: [
    //           {
    //             speTypeCode: '10002',
    //             speTypeName: '生猪（牛羊）调出大县奖励资金',
    //             sbjAmount: 11669701613,
    //             sbbjfpAmount: 6278751613,
    //             sbxjfpAmount: 5390950000,
    //             sbpayAppAmt: 138576576.31,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 106680674.01,
    //             xpayAppAmt: 5026387.94
    //           },
    //           {
    //             speTypeCode: '10027',
    //             speTypeName: '县级基本财力保障机制奖补资金',
    //             sbjAmount: 1116122680000,
    //             sbbjfpAmount: 1116122680000,
    //             sbxjfpAmount: 0,
    //             sbpayAppAmt: 264559042.41,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0
    //           },
    //           {
    //             speTypeCode: '101201',
    //             speTypeName: '中央财政衔接推进乡村振兴补助资金',
    //             sbjAmount: 3258540000,
    //             sbbjfpAmount: 726410000,
    //             sbxjfpAmount: 2532130000,
    //             sbpayAppAmt: 726410000,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 32380000,
    //             xpayAppAmt: 0
    //           }
    //         ]
    //       },
    //       {
    //         speTypeCode: '10003',
    //         speTypeName: '支持基层落实减税降费和重点民生等专项转移支付',
    //         sbjAmount: 10669701613,
    //         sbbjfpAmount: 6278751613,
    //         sbxjfpAmount: 1390950000,
    //         sbpayAppAmt: 138576576.31,
    //         sbjfpAmount: 0,
    //         sxjfpAmount: 0,
    //         spayAppAmt: 0,
    //         xbjfpAmount: 106680674.01,
    //         xpayAppAmt: 5026387.94,
    //         children: [
    //           {
    //             speTypeCode: '100031',
    //             speTypeName: '其他减税降费资金转移支付',
    //             sbjAmount: 11669701613,
    //             sbbjfpAmount: 6278751613,
    //             sbxjfpAmount: 5390950000,
    //             sbpayAppAmt: 138576576.31,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 106680674.01,
    //             xpayAppAmt: 5026387.94
    //           },
    //           {
    //             speTypeCode: '10037',
    //             speTypeName: '增值税留抵退税资金转移支付',
    //             sbjAmount: 1116122680000,
    //             sbbjfpAmount: 1116122680000,
    //             sbxjfpAmount: 0,
    //             sbpayAppAmt: 264559042.41,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 0,
    //             xpayAppAmt: 0
    //           }
    //         ]
    //       },
    //       {
    //         speTypeCode: '10004',
    //         speTypeName: '专项转移支付',
    //         sbjAmount: 164674613,
    //         sbbjfpAmount: 164674613,
    //         sbxjfpAmount: 950000,
    //         sbpayAppAmt: 138576576.31,
    //         sbjfpAmount: 0,
    //         sxjfpAmount: 0,
    //         spayAppAmt: 0,
    //         xbjfpAmount: 106680674.01,
    //         xpayAppAmt: 5026387.94,
    //         children: [
    //           {
    //             speTypeCode: '100041',
    //             speTypeName: '普惠金融发展专项资金',
    //             sbjAmount: 64674613,
    //             sbbjfpAmount: 64674613,
    //             sbxjfpAmount: 5390950000,
    //             sbpayAppAmt: 138576576.31,
    //             sbjfpAmount: 0,
    //             sxjfpAmount: 0,
    //             spayAppAmt: 0,
    //             xbjfpAmount: 106680674.01,
    //             xpayAppAmt: 5026387.94
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
