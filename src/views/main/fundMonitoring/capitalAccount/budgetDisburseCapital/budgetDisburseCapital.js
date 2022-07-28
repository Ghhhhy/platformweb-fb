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
        title: '全省',
        width: 260,
        align: 'center',
        children: [
          {
            title: '资金总量',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'amount'
          },
          {
            title: '整合金额',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'zhje'
          },
          {
            title: '支出金额',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'zcamount'
          },
          {
            title: '支出进度',
            align: 'right',
            width: 200,
            field: 'pro',
            formula: '{amount}/{jAmount}*{100}',
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
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'zyap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '省级安排',
                field: 'sjap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'zje',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              }
            ]
          },
          {
            title: '支出金额',
            width: 200,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'zyap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '省级安排',
                field: 'sjap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'zje',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              }
            ]
          },
          {
            title: '支出进度',
            width: 200,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'zyap',
                width: 200,
                align: 'right',
                formula: '{100}',
                cellRender: {
                  name: '$vxeRatio'
                }
              },
              {
                title: '省级安排',
                field: 'sjap',
                width: 200,
                align: 'right',
                formula: '{100}',
                cellRender: {
                  name: '$vxeRatio'
                }
              },
              {
                title: '总金额',
                field: 'zje',
                width: 200,
                align: 'right',
                formula: '{100}',
                cellRender: {
                  name: '$vxeRatio'
                }
              }
            ]
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
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'zyap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '省级安排',
                field: 'sjap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级安排',
                field: 'shjap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'zje',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              }
            ]
          },
          {
            title: '支出金额',
            width: 200,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'zyap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '省级安排',
                field: 'sjap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级安排',
                field: 'shjap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'zje',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              }
            ]
          },
          {
            title: '支出进度',
            width: 200,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'zyap',
                width: 200,
                align: 'right',
                formula: '{100}',
                cellRender: {
                  name: '$vxeRatio'
                }
              },
              {
                title: '省级安排',
                field: 'sjap',
                width: 200,
                align: 'right',
                formula: '{100}',
                cellRender: {
                  name: '$vxeRatio'
                }
              },
              {
                title: '市级安排',
                field: 'shjap',
                width: 200,
                align: 'right',
                formula: '{100}',
                cellRender: {
                  name: '$vxeRatio'
                }
              },
              {
                title: '总金额',
                field: 'zje',
                width: 200,
                align: 'right',
                formula: '{100}',
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
            title: '整合金额',
            width: 200,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'zyap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '省级安排',
                field: 'sjap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级安排',
                field: 'shjap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '县级安排',
                field: 'xjap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'zje',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              }
            ]
          },
          {
            title: '支出金额',
            width: 200,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'zyap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '省级安排',
                field: 'sjap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '市级安排',
                field: 'shjap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '县级安排',
                field: 'xjap',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'zje',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              }
            ]
          },
          {
            title: '支出进度',
            width: 200,
            align: 'center',
            children: [
              {
                title: '中央安排',
                field: 'zyap',
                width: 200,
                align: 'right',
                formula: '{{100}}',
                cellRender: {
                  name: '$vxeRatio'
                }
              },
              {
                title: '省级安排',
                field: 'sjap',
                width: 200,
                align: 'right',
                formula: '{100}',
                cellRender: {
                  name: '$vxeRatio'
                }
              },
              {
                title: '市级安排',
                field: 'shjap',
                width: 200,
                align: 'right',
                formula: '{100}',
                cellRender: {
                  name: '$vxeRatio'
                }
              },
              {
                title: '县级安排',
                field: 'xjap',
                width: 200,
                align: 'right',
                formula: '{100}',
                cellRender: {
                  name: '$vxeRatio'
                }
              },
              {
                title: '总金额',
                field: 'zje',
                width: 200,
                align: 'right',
                formula: '{100}',
                cellRender: {
                  name: '$vxeRatio'
                }
              }
            ]
          }
        ]
      },
      {
        title: '支出总数',
        width: 260,
        align: 'center',
        children: [
          {
            title: '中央安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'zyap'
          },
          {
            title: '省级安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'sjap'
          },
          {
            title: '市级安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'shjap'
          },
          {
            title: '县级安排',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'xjap'
          },
          {
            title: '总金额',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'zje'
          }
        ]
      }
    ],
    // tableData: []
    tableData: [
      {
        speTypeCode: '1001',
        speTypeName: '直达资金',
        jAmount: 61669701613,
        amount: 1088148800,
        pro: 96,
        sBudget: 941916,
        sPay: 56158,
        sPro: 56,
        shBudget: 8924861,
        shPay: 4566158,
        shPro: 82,
        xBudget: 889458,
        xPay: 786516,
        xPro: 85,
        children: [
          {
            speTypeCode: '10001',
            speTypeName: '共同财政事权转移支付',
            jAmount: 20569701613,
            amount: 108817400,
            pro: 96,
            sBudget: 941916,
            sPay: 56158,
            sPro: 56,
            shBudget: 8924861,
            shPay: 4566158,
            shPro: 82,
            xBudget: 889458,
            xPay: 786516,
            xPro: 85,
            children: [
              {
                speTypeCode: '10001',
                speTypeName: '城乡义务教育补助经费',
                jAmount: 20575541613,
                amount: 10848800,
                pro: 96,
                sBudget: 941916,
                sPay: 56158,
                sPro: 56,
                shBudget: 8924861,
                shPay: 4566158,
                shPro: 82,
                xBudget: 889458,
                xPay: 786516,
                xPro: 85
              },
              {
                speTypeCode: '1007',
                speTypeName: '支出地方高校改革发展资金',
                jAmount: 16122680000,
                amount: 0,
                pro: 0,
                sBudget: 0,
                sPay: 0,
                sPro: 0,
                shBudget: 0,
                shPay: 0,
                shPro: 0,
                xBudget: 0,
                xPay: 0,
                xPro: 0
              },
              {
                speTypeCode: '101101',
                speTypeName: '机关事业单位基本养老保险（人社厅）',
                jAmount: 3258540000,
                amount: 0,
                pro: 0,
                sBudget: 0,
                sPay: 0,
                sPro: 0,
                shBudget: 0,
                shPay: 0,
                shPro: 0,
                xBudget: 0,
                xPay: 0,
                xPro: 0
              },
              {
                speTypeCode: '101102',
                speTypeName: '企业职工基本养老保险（人社厅）',
                jAmount: 1365220000,
                amount: 0,
                pro: 0,
                sBudget: 0,
                sPay: 0,
                sPro: 0,
                shBudget: 0,
                shPay: 0,
                shPro: 0,
                xBudget: 0,
                xPay: 0,
                xPro: 0
              },
              {
                speTypeCode: '101103',
                speTypeName: '城乡居民基本养老保险（人社厅）',
                jAmount: 5709410000,
                amount: 0,
                pro: 0,
                sBudget: 0,
                sPay: 0,
                sPro: 0,
                shBudget: 0,
                shPay: 0,
                shPro: 0,
                xBudget: 0,
                xPay: 0,
                xPro: 0
              },
              {
                speTypeCode: '1012',
                speTypeName: '困难群众救助补助资金',
                jAmount: 4896150000,
                amount: 0,
                pro: 0,
                sBudget: 0,
                sPay: 0,
                sPro: 0,
                shBudget: 0,
                shPay: 0,
                shPro: 0,
                xBudget: 0,
                xPay: 0,
                xPro: 0
              },
              {
                speTypeCode: '1017',
                speTypeName: '城乡居民基本医疗保险补助',
                jAmount: 12933620000,
                amount: 0,
                pro: 0,
                sBudget: 0,
                sPay: 0,
                sPro: 0,
                shBudget: 0,
                shPay: 0,
                shPro: 0,
                xBudget: 0,
                xPay: 0,
                xPro: 0
              },
              {
                speTypeCode: '1018',
                speTypeName: '基本公共卫生服务补助资金',
                jAmount: 2268876000,
                sbbjfpAmount: 55148000,
                sbxjfpAmount: 2213728000,
                sbpayAppAmt: 420665.38,
                sbjfpAmount: 0,
                sxjfpAmount: 0,
                spayAppAmt: 0,
                xbjfpAmount: 0,
                xpayAppAmt: 0
              }
            ]
          },
          {
            speTypeCode: '10002',
            speTypeName: '一般性转移支付',
            jAmount: 30269701613,
            sbbjfpAmount: 6278751613,
            sbxjfpAmount: 4690950000,
            sbpayAppAmt: 138576576.31,
            sbjfpAmount: 0,
            sxjfpAmount: 0,
            spayAppAmt: 0,
            xbjfpAmount: 106680674.01,
            xpayAppAmt: 5026387.94,
            children: [
              {
                speTypeCode: '10002',
                speTypeName: '生猪（牛羊）调出大县奖励资金',
                jAmount: 11669701613,
                sbbjfpAmount: 6278751613,
                sbxjfpAmount: 5390950000,
                sbpayAppAmt: 138576576.31,
                sbjfpAmount: 0,
                sxjfpAmount: 0,
                spayAppAmt: 0,
                xbjfpAmount: 106680674.01,
                xpayAppAmt: 5026387.94
              },
              {
                speTypeCode: '10027',
                speTypeName: '县级基本财力保障机制奖补资金',
                jAmount: 1116122680000,
                sbbjfpAmount: 1116122680000,
                sbxjfpAmount: 0,
                sbpayAppAmt: 264559042.41,
                sbjfpAmount: 0,
                sxjfpAmount: 0,
                spayAppAmt: 0,
                xbjfpAmount: 0,
                xpayAppAmt: 0
              },
              {
                speTypeCode: '101201',
                speTypeName: '中央财政衔接推进乡村振兴补助资金',
                jAmount: 3258540000,
                sbbjfpAmount: 726410000,
                sbxjfpAmount: 2532130000,
                sbpayAppAmt: 726410000,
                sbjfpAmount: 0,
                sxjfpAmount: 0,
                spayAppAmt: 0,
                xbjfpAmount: 32380000,
                xpayAppAmt: 0
              }
            ]
          },
          {
            speTypeCode: '10003',
            speTypeName: '支持基层落实减税降费和重点民生等专项转移支付',
            jAmount: 10669701613,
            sbbjfpAmount: 6278751613,
            sbxjfpAmount: 1390950000,
            sbpayAppAmt: 138576576.31,
            sbjfpAmount: 0,
            sxjfpAmount: 0,
            spayAppAmt: 0,
            xbjfpAmount: 106680674.01,
            xpayAppAmt: 5026387.94,
            children: [
              {
                speTypeCode: '100031',
                speTypeName: '其他减税降费资金转移支付',
                jAmount: 11669701613,
                sbbjfpAmount: 6278751613,
                sbxjfpAmount: 5390950000,
                sbpayAppAmt: 138576576.31,
                sbjfpAmount: 0,
                sxjfpAmount: 0,
                spayAppAmt: 0,
                xbjfpAmount: 106680674.01,
                xpayAppAmt: 5026387.94
              },
              {
                speTypeCode: '10037',
                speTypeName: '增值税留抵退税资金转移支付',
                jAmount: 1116122680000,
                sbbjfpAmount: 1116122680000,
                sbxjfpAmount: 0,
                sbpayAppAmt: 264559042.41,
                sbjfpAmount: 0,
                sxjfpAmount: 0,
                spayAppAmt: 0,
                xbjfpAmount: 0,
                xpayAppAmt: 0
              }
            ]
          },
          {
            speTypeCode: '10004',
            speTypeName: '专项转移支付',
            jAmount: 164674613,
            sbbjfpAmount: 164674613,
            sbxjfpAmount: 950000,
            sbpayAppAmt: 138576576.31,
            sbjfpAmount: 0,
            sxjfpAmount: 0,
            spayAppAmt: 0,
            xbjfpAmount: 106680674.01,
            xpayAppAmt: 5026387.94,
            children: [
              {
                speTypeCode: '100041',
                speTypeName: '普惠金融发展专项资金',
                jAmount: 64674613,
                sbbjfpAmount: 64674613,
                sbxjfpAmount: 5390950000,
                sbpayAppAmt: 138576576.31,
                sbjfpAmount: 0,
                sxjfpAmount: 0,
                spayAppAmt: 0,
                xbjfpAmount: 106680674.01,
                xpayAppAmt: 5026387.94
              }
            ]
          }
        ]
      }
    ]
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
