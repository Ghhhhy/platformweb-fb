// import store from '@/store/index'
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
    //   visible: !store.getters.isFuJian && !store.getters.isSx,
    //   itemRender: {
    //     name: '$vxeSelect',
    //     options: [
    //       { value: '2022', label: '2022年' },
    //       { value: '2023', label: '2023年' }
    //     ],
    //     defaultValue: store.state?.userInfo?.year,
    //     props: {
    //       clearable: true,
    //       placeholder: '业务年度'
    //     }
    //   }
    // },
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
          defaultCheckedKeys: [],
          config: {
            valueKeys: ['code', 'name', 'id'],
            format: '{name}',
            treeProps: {
              labelFormat: '{code}-{name}', // {code}-{name}
              nodeKey: 'code',
              label: 'name',
              children: 'children'
            },
            placeholder: '地区',
            clearable: true,
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
          clearable: true,
          format: 'YYYY-MM-DD', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          type: 'date',
          placeholder: '截止日期'
        }
      }
    }
  ],
  highQueryData: {
    fiscalYear: store.state?.userInfo?.year,
    mofDivCodes: [],
    mofDivCodes_code__multiple: [],
    mofDivCodes_code: store.state?.userInfo?.province,
    mofDivCodes_name: store.state?.userInfo?.admdivname,
    endTime: ''
  },
  basicInfo: {
    type: 'form',
    tableConfig: {
      globalConfig: {
        // 全局配置
        checkType: 'checkbox',
        seq: false, // 序号列
        useMoneyFilter: true
      }
    },
    tableColumnsConfig: [
      {
        title: '资金名称',
        type: 'name',
        treeNode: true,
        fixed: 'left',
        align: 'left',
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
        width: 100,
        align: 'center',
        children: [
          {
            title: '资金总量',
            field: 'amountZjzl',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '整合资金',
            field: 'cAmount',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '支出资金',
            field: 'amountZjzc',
            width: 100,
            align: 'right',
            cellRender: {
              name: '$vxeMoney'
            }
          },
          {
            title: '支出进度',
            field: 'pPro',
            width: 100,
            align: 'right',
            cellRender: {
              name: '$vxeRatio'
            },
            // formula: '({amountZjzl}-0==0?0:Math.round({amountZjzc}/{amountZjzl}*100*10)/10'
            formula: '({amountZjzl}-0==0?0:{amountZjzc}/{amountZjzl}*100)'
          }
        ]
      },
      {
        title: '省级',
        width: 100,
        align: 'center',
        children: [
          {
            title: '资金总量',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountSnjzyxd',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountSnjdfdf',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'saaAmount',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountSnjzyxd}+{amountSnjdfdf})'
              }
            ]
          },
          {
            title: '整合金额',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'szyapcAmount',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '地方安排',
                field: 'sdfapcAmount',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '总金额',
                field: 'sacAmount',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({szyapcAmount}+{sdfapcAmount})',
                visible: false
              }
            ]
          },
          {
            title: '支出金额',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountSnjzypay',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountSnjdfpay',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'sapAmount',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountSnjzypay}+{amountSnjdfpay})'
              }
            ]
          },
          {
            title: '支出进度',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'szyappPro',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                // formula: '({amountSnjzyxd}-0==0?0:Math.round({amountSnjzypay}/{amountSnjzyxd}*100*10)/10'
                formula: '({amountSnjzyxd}-0==0?0:{amountSnjzypay}/{amountSnjzyxd}*100)'
              },
              {
                title: '地方安排',
                field: 'sdfappPro',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                // formula: '{amountSnjdfdf}-0==0?0:Math.round({amountSnjdfpay}/{amountSnjdfdf}*100*10)/10'
                formula: '{amountSnjdfdf}-0==0?0:{amountSnjdfpay}/{amountSnjdfdf}*100'
              },
              {
                title: '总进度',
                field: 'sapPro',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                // formula: '{saaAmount}-0==0?0:Math.round({sapAmount}/{saaAmount}*100*10)/10'
                formula: '{saaAmount}-0==0?0:{sapAmount}/{saaAmount}*100'
              }
            ]
          }
        ]
      },
      {
        title: '市级',
        width: 100,
        align: 'center',
        children: [
          {
            title: '资金总量',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountSjzydf',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountSjdfdf',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'shaaAmount',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountSjzydf}+{amountSjdfdf})'
              }
            ]
          },
          {
            title: '整合金额',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'shzyapcAmount',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '地方安排',
                field: 'shdfapcAmount',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '总金额',
                field: 'shacAmount',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({shzyapcAmount}+{shdfapcAmount})',
                visible: false
              }
            ]
          },
          {
            title: '支出金额',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountSjzypay',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountSjdfpay',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'shapAmount',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountSjzypay}+{amountSjdfpay})'
              }
            ]
          },
          {
            title: '支出进度',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'shzyappPro',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: '{amountSjzydf}-0==0?0:{amountSjzypay}/{amountSjzydf}*100'
                // formula: '{amountSjzydf}-0==0?0:Math.round({amountSjzypay}/{amountSjzydf}*100*10)/10'
              },
              {
                title: '地方安排',
                field: 'shdfappPro',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: '{amountSjdfdf}-0==0?0:{amountSjdfpay}/{amountSjdfdf}*100'
                // formula: '{amountSjdfdf}-0==0?0:Math.round({amountSjdfpay}/{amountSjdfdf}*100*10)/10'
              },
              {
                title: '总进度',
                field: 'shapPro',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                // formula: '({shaaAmount}-0==0?0:Math.round({shapAmount}/{shaaAmount})*100*10)/10'
                formula: '({shaaAmount}-0==0?0:{shapAmount}/{shaaAmount})*100'
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
            title: '资金总量',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountXjzydf',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountXjdfdf',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'xaaAmount',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountXjzydf}+{amountXjdfdf})'
              }
            ]
          },
          {
            title: '整合金额',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'xzyapcAmount',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '地方安排',
                field: 'xdfapcAmount',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' },
                visible: false
              },
              {
                title: '总金额',
                field: 'xacAmount',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({xzyapcAmount}+{xdfapcAmount})',
                visible: false
              }
            ]
          },
          {
            title: '支出金额',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'amountXjzypay',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'amountXjdfpay',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'xapAmount',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountXjzypay}+{amountXjdfpay})'
              }
            ]
          },
          {
            title: '支出进度',
            width: 100,
            align: 'right',
            children: [
              {
                title: '中央安排',
                field: 'xzyapPro',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: '{amountXjzydf}-0==0?0:{amountXjzypay}/{amountXjzydf}*100'
                // formula: '{amountXjzydf}-0==0?0:Math.round({amountXjzypay}/{amountXjzydf}*100*10)/10'
              },
              {
                title: '地方安排',
                field: 'xdfappPro',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' },
                formula: '{amountXjdfdf}-0==0?0:{amountXjdfpay}/{amountXjdfdf}*100'
                // formula: '{amountXjdfdf}-0==0?0:Math.round({amountXjdfpay}/{amountXjdfdf}*100*10)/10'
              },
              {
                title: '总进度',
                field: 'xapPro',
                width: 100,
                align: 'right',
                cellRender: {
                  name: '$vxeRatio'
                },
                // formula: '{xaaAmount}-0==0?0:Math.round(({xapAmount}/{xaaAmount})*100*10)/10'
                formula: '{xaaAmount}-0==0?0:({xapAmount}/{xaaAmount})*100'
              }
            ]
          }
        ]
      },
      {
        title: '支出总数',
        width: 100,
        align: 'center',
        children: [
          {
            title: '中央安排',
            field: 'zzyapAmount',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSnjzypay}+{amountSjzypay}+{amountXjzypay}+{amountzjpay}'
          },
          {
            title: '地方安排',
            field: 'zdfapAmount',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSnjdfpay}+{amountSjdfpay}+{amountXjdfpay}'
          },
          {
            title: '总金额',
            field: 'zaAmount',
            width: 100,
            align: 'right',
            cellRender: {
              name: '$vxeMoney'
            },
            formula: '({zzyapAmount}+{zdfapAmount})'
          }
        ]
      }
    ],
    tableColumnsConfigCity: [
      {
        title: '资金名称',
        type: 'name',
        treeNode: true,
        fixed: 'left',
        align: 'left',
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
        title: '全市',
        width: 200,
        align: 'center',
        children: [
          {
            title: '资金总量',
            field: 'amountZjzl',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '整合资金',
            field: 'cAmount',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '支出资金',
            field: 'amountZjzc',
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
            // formula: '({amountZjzl}-0==0?0:Math.round({amountZjzc}/{amountZjzl}*100*10)/10'
            formula: '({amountZjzl}-0==0?0:{amountZjzc}/{amountZjzl}*100)'
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
                field: 'amountZjxd',
                width: 200,
                align: 'right',
                sortable: true,
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'zdfapaAmount',
                width: 200,
                align: 'right',
                sortable: true,
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'zaaAmount',
                width: 200,
                align: 'right',
                sortable: true,
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountZjxd}+{zdfapaAmount})'
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
                field: 'zzyapcAmount',
                width: 200,
                align: 'right',
                sortable: true,
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'zdfapcAmount',
                width: 200,
                align: 'right',
                sortable: true,
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'zacAmount',
                width: 200,
                align: 'right',
                sortable: true,
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({zzyapcAmount}+{zdfapcAmount})'
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
                field: 'amountZjpay',
                width: 200,
                align: 'right',
                sortable: true,
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '地方安排',
                field: 'zdfappAmount',
                width: 200,
                align: 'right',
                sortable: true,
                cellRender: { name: '$vxeMoney' }
              },
              {
                title: '总金额',
                field: 'zapAmount',
                width: 200,
                align: 'right',
                sortable: true,
                cellRender: {
                  name: '$vxeMoney'
                },
                formula: '({amountZjpay}+{zdfappAmount})'
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
                field: 'zzyapPro',
                width: 200,
                align: 'right',
                sortable: true,
                cellRender: { name: '$vxeRatio' },
                formula: '{amountZjxd}-0==0?0:{amountZjpay}/{amountZjxd}*100'
              },
              {
                title: '地方安排',
                field: 'zdfappPro',
                width: 200,
                align: 'right',
                sortable: true,
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '总进度',
                field: 'zapPro',
                width: 200,
                align: 'right',
                sortable: true,
                cellRender: {
                  name: '$vxeRatio'
                },
                formula: '({zzyapPro})'
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
            sortable: true,
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSnjpay}+{amountSjpay}+{amountXjpay}+{amountZjpay}'
          },
          {
            title: '地方安排',
            field: 'zdfapAmount',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '总金额',
            field: 'zaAmount',
            width: 200,
            align: 'right',
            sortable: true,
            cellRender: {
              name: '$vxeMoney'
            },
            formula: '({zzyapAmount}+{zdfapAmount})'
          }
        ]
      }
    ],
    tableData: []
    // tableData: [
    //   {
    //     speTypeCode: '1001',
    //     speTypeName: '直达资金',
    //     aAmount: 1234436538412.99,
    //     cAmount: 72474699200,
    //     pAmount: 12042109128,
    //     pPro: 55,
    //     amountSnjxd: 787212,
    //     sdfapaAmount: 8644254,
    //     saaAmount: 34212425,
    //     szyapcAmount: 45445,
    //     sdfapcAmount: 24112,
    //     sacAmount: 454212,
    //     amountSnjpay: 753743,
    //     sdfappAmount: 4545,
    //     sapAmount: 373,
    //     szyappPro: 45,
    //     sdfappPro: 74,
    //     sapPro: 65,
    //     amountSjxd: 76546,
    //     shdfapaAmount: 464,
    //     shaaAmount: 785764,
    //     shzyapcAmount: 45646,
    //     shdfapcAmount: 45674,
    //     shacAmount: 4564,
    //     amountSjpay: 45476,
    //     shdfappAmount: 4642,
    //     shapAmount: 4657,
    //     shzyappPro: 65,
    //     shdfappPro: 75,
    //     shapPro: 45,
    //     amountXjxd: 64542,
    //     xdfapaAmount: 57476,
    //     xaaAmount: 75466,
    //     xzyapcAmount: 456485,
    //     xdfapcAmount: 464646,
    //     xacAmount: 46546,
    //     amountXjxd: 45752,
    //     xdfappAmount: 75876,
    //     xapAmount: 4646,
    //     amountXjpay: 85,
    //     xdfappPro: 45,
    //     xapPro: 65,
    //     zzyapAmount: 75478754,
    //     zdfapAmount: 6765545644,
    //     zaAmount: 546554576,
    //     children: [
    //       {
    //         speTypeCode: '10001',
    //         speTypeName: '共同财政事权转移支付',
    //         aAmount: 1234436538412.99,
    //         cAmount: 72474699200,
    //         pAmount: 12042109128,
    //         pPro: 55,
    //         amountSnjxd: 787212,
    //         sdfapaAmount: 8644254,
    //         saaAmount: 34212425,
    //         szyapcAmount: 45445,
    //         sdfapcAmount: 24112,
    //         sacAmount: 454212,
    //         amountSnjpay: 753743,
    //         sdfappAmount: 4545,
    //         sapAmount: 373,
    //         szyappPro: 45,
    //         sdfappPro: 74,
    //         sapPro: 65,
    //         amountSjxd: 76546,
    //         shdfapaAmount: 464,
    //         shaaAmount: 785764,
    //         shzyapcAmount: 45646,
    //         shdfapcAmount: 45674,
    //         shacAmount: 4564,
    //         amountSjpay: 45476,
    //         shdfappAmount: 4642,
    //         shapAmount: 4657,
    //         shzyappPro: 65,
    //         shdfappPro: 75,
    //         shapPro: 45,
    //         amountXjxd: 64542,
    //         xdfapaAmount: 57476,
    //         xaaAmount: 75466,
    //         xzyapcAmount: 456485,
    //         xdfapcAmount: 464646,
    //         xacAmount: 46546,
    //         amountXjxd: 45752,
    //         xdfappAmount: 75876,
    //         xapAmount: 4646,
    //         amountXjpay: 85,
    //         xdfappPro: 45,
    //         xapPro: 65,
    //         zzyapAmount: 75478754,
    //         zdfapAmount: 6765545644,
    //         zaAmount: 546554576,
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
