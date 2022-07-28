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
        width: 200,
        align: 'center',
        children: [
          {
            title: '资金总量',
            field: 'aAmount',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '整合资金',
            field: 'cAmount',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '支出资金',
            field: 'pAmount',
            width: 200,
            align: 'right',
            cellRender: {
              name: '$vxeMoney'
            }
          },
          {
            title: '支出进度',
            field: 'pPro',
            width: 200,
            align: 'right',
            cellRender: {
              name: '$vxeRatio'
            },
            formula: '({pAmount}/{cAmount}*100)'
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
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'szyapaAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'sdfapaAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'saaAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({szyapaAmount}+{sdfapaAmount})'
              }
            ]
          },
          {
            title: '整合金额',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'szyapcAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'sdfapcAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'sacAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({szyapcAmount}+{sdfapcAmount})'
              }
            ]
          },
          {
            title: '支出金额',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'szyappAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'sdfappAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'sapAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({szyappAmount}+{sdfappAmount})'
              }
            ]
          },
          {
            title: '支出进度',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'szyappPro',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '地方安排',
                field: 'sdfappPro',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '总进度',
                field: 'sapPro',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                formula: '({szyappPro}/2+{sdfappPro}/2)'
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
            title: '资金总量',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'shzyapaAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'shdfapaAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'shaaAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({shzyapaAmount}+{shdfapaAmount})'
              }
            ]
          },
          {
            title: '整合金额',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'shzyapcAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'shdfapcAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'shacAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({shzyapcAmount}+{shdfapcAmount})'
              }
            ]
          },
          {
            title: '支出金额',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'shzyappAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'shdfappAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'shapAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({shzyappAmount}+{shdfappAmount})'
              }
            ]
          },
          {
            title: '支出进度',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'shzyappPro',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '地方安排',
                field: 'shdfappPro',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '总进度',
                field: 'shapPro',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                formula: '({shzyappPro}/2+{shdfappPro}/2)'
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
                title: '中央安排',
                field: 'xzyapaAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'xdfapaAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'xaaAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({xzyapaAmount}+{xdfapaAmount})'
              }
            ]
          },
          {
            title: '整合金额',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'xzyapcAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'xdfapcAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'xacAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({xzyapcAmount}+{xdfapcAmount})'
              }
            ]
          },
          {
            title: '支出金额',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'xzyappAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'xdfappAmount',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'xapAmount',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({xzyappAmount}+{xdfappAmount})'
              }
            ]
          },
          {
            title: '支出进度',
            width: 200,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'xzyappPro',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '地方安排',
                field: 'xdfappPro',
                width: 200,
                align: 'right',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '总进度',
                field: 'xapPro',
                width: 200,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                formula: '({xzyappPro}/2+{xdfappPro}/2)'
              }
            ]
          }
        ]
      },
      {
        title: '支出总数',
        width: 200,
        align: 'center',
        children: [
          {
            title: '中央安排',
            field: 'zzyapAmount',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '地方安排',
            field: 'zdfapAmount',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '总金额',
            field: 'zaAmount',
            width: 200,
            align: 'right',
            cellRender: {
              name: '$vxeMoney'
            },
            formula: '({zzyapAmount}+{zdfapAmount})'
          }
        ]
      }
    ],
    // tableData: []
    tableData: [
      {
        speTypeCode: '1001',
        speTypeName: '直达资金',
        aAmount: 1234436538412.99,
        cAmount: 72474699200,
        pAmount: 12042109128,
        pPro: 55,
        szyapaAmount: 787212,
        sdfapaAmount: 8644254,
        saaAmount: 34212425,
        szyapcAmount: 45445,
        sdfapcAmount: 24112,
        sacAmount: 454212,
        szyappAmount: 753743,
        sdfappAmount: 4545,
        sapAmount: 373,
        szyappPro: 45,
        sdfappPro: 74,
        sapPro: 65,
        shzyapaAmount: 76546,
        shdfapaAmount: 464,
        shaaAmount: 785764,
        shzyapcAmount: 45646,
        shdfapcAmount: 45674,
        shacAmount: 4564,
        shzyappAmount: 45476,
        shdfappAmount: 4642,
        shapAmount: 4657,
        shzyappPro: 65,
        shdfappPro: 75,
        shapPro: 45,
        xzyapaAmount: 64542,
        xdfapaAmount: 57476,
        xaaAmount: 75466,
        xzyapcAmount: 456485,
        xdfapcAmount: 464646,
        xacAmount: 46546,
        xzyappAmount: 45752,
        xdfappAmount: 75876,
        xapAmount: 4646,
        xzyappPro: 85,
        xdfappPro: 45,
        xapPro: 65,
        zzyapAmount: 75478754,
        zdfapAmount: 6765545644,
        zaAmount: 546554576,
        children: [
          {
            speTypeCode: '10001',
            speTypeName: '共同财政事权转移支付',
            aAmount: 1234436538412.99,
            cAmount: 72474699200,
            pAmount: 12042109128,
            pPro: 55,
            szyapaAmount: 787212,
            sdfapaAmount: 8644254,
            saaAmount: 34212425,
            szyapcAmount: 45445,
            sdfapcAmount: 24112,
            sacAmount: 454212,
            szyappAmount: 753743,
            sdfappAmount: 4545,
            sapAmount: 373,
            szyappPro: 45,
            sdfappPro: 74,
            sapPro: 65,
            shzyapaAmount: 76546,
            shdfapaAmount: 464,
            shaaAmount: 785764,
            shzyapcAmount: 45646,
            shdfapcAmount: 45674,
            shacAmount: 4564,
            shzyappAmount: 45476,
            shdfappAmount: 4642,
            shapAmount: 4657,
            shzyappPro: 65,
            shdfappPro: 75,
            shapPro: 45,
            xzyapaAmount: 64542,
            xdfapaAmount: 57476,
            xaaAmount: 75466,
            xzyapcAmount: 456485,
            xdfapcAmount: 464646,
            xacAmount: 46546,
            xzyappAmount: 45752,
            xdfappAmount: 75876,
            xapAmount: 4646,
            xzyappPro: 85,
            xdfappPro: 45,
            xapPro: 65,
            zzyapAmount: 75478754,
            zdfapAmount: 6765545644,
            zaAmount: 546554576,
            children: [
              {
                speTypeCode: '10001',
                speTypeName: '城乡义务教育补助经费',
                sbjAmount: 11669701613,
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
                speTypeCode: '1007',
                speTypeName: '支出地方高校改革发展资金',
                sbjAmount: 16122680000,
                sbbjfpAmount: 16122680000,
                sbxjfpAmount: 0,
                sbpayAppAmt: 264559042.41,
                sbjfpAmount: 0,
                sxjfpAmount: 0,
                spayAppAmt: 0,
                xbjfpAmount: 0,
                xpayAppAmt: 0
              },
              {
                speTypeCode: '101101',
                speTypeName: '机关事业单位基本养老保险（人社厅）',
                sbjAmount: 3258540000,
                sbbjfpAmount: 726410000,
                sbxjfpAmount: 2532130000,
                sbpayAppAmt: 726410000,
                sbjfpAmount: 0,
                sxjfpAmount: 0,
                spayAppAmt: 0,
                xbjfpAmount: 32380000,
                xpayAppAmt: 0
              },
              {
                speTypeCode: '101102',
                speTypeName: '企业职工基本养老保险（人社厅）',
                sbjAmount: 1365220000,
                sbbjfpAmount: 1365220000,
                sbxjfpAmount: 0,
                sbpayAppAmt: 9283240000,
                sbjfpAmount: 0,
                sxjfpAmount: 0,
                spayAppAmt: 0,
                xbjfpAmount: 0,
                xpayAppAmt: 0
              },
              {
                speTypeCode: '101103',
                speTypeName: '城乡居民基本养老保险（人社厅）',
                sbjAmount: 5709410000,
                sbbjfpAmount: 0,
                sbxjfpAmount: 5709410000,
                sbpayAppAmt: 0,
                sbjfpAmount: 0,
                sxjfpAmount: 0,
                spayAppAmt: 0,
                xbjfpAmount: 0,
                xpayAppAmt: 0
              },
              {
                speTypeCode: '1012',
                speTypeName: '困难群众救助补助资金',
                sbjAmount: 4896150000,
                sbbjfpAmount: 0,
                sbxjfpAmount: 4896150000,
                sbpayAppAmt: 0,
                sbjfpAmount: 0,
                sxjfpAmount: 0,
                spayAppAmt: 0,
                xbjfpAmount: 7413218,
                xpayAppAmt: 300320
              },
              {
                speTypeCode: '1017',
                speTypeName: '城乡居民基本医疗保险补助',
                sbjAmount: 12933620000,
                sbbjfpAmount: 0,
                sbxjfpAmount: 12933620000,
                sbpayAppAmt: 0,
                sbjfpAmount: 0,
                sxjfpAmount: 0,
                spayAppAmt: 0,
                xbjfpAmount: 0,
                xpayAppAmt: 0
              },
              {
                speTypeCode: '1018',
                speTypeName: '基本公共卫生服务补助资金',
                sbjAmount: 2268876000,
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
            sbjAmount: 30269701613,
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
                sbjAmount: 11669701613,
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
                sbjAmount: 1116122680000,
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
                sbjAmount: 3258540000,
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
            sbjAmount: 10669701613,
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
                sbjAmount: 11669701613,
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
                sbjAmount: 1116122680000,
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
            sbjAmount: 164674613,
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
                sbjAmount: 64674613,
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
